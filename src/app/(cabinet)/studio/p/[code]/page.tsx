import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteFile, deleteVersion, revokeLink, updatePremiere, updateProject, updateStages } from "@/cabinet/actions/studio";
import { requireStudio } from "@/cabinet/auth";
import { cabinetConfig } from "@/cabinet/config";
import { findProjectByCode, loadProjectState, loadStudioExtras } from "@/cabinet/data";
import { formatDateTime, formatDay, formatSize } from "@/cabinet/format";
import { kindOf, type TextKey } from "@/cabinet/kinds";
import { questionnaireFilled } from "@/cabinet/project";
import CabinetBar from "@/components/cabinet/CabinetBar";
import Uploader from "@/components/cabinet/Uploader";
import VersionChip from "@/components/cabinet/VersionChip";
import { CopyField, LinkCreator } from "@/components/cabinet/small";
import Field from "@/components/Field";

export const metadata = { title: "Проект" };

/** Удаление в два шага без JavaScript: сначала раскрыть, потом подтвердить. */
function DeleteButton({ action, code, id }: { action: (formData: FormData) => Promise<void>; code: string; id: string }) {
  return (
    <details className="text-small">
      <summary className="link-button inline-flex min-h-8 cursor-pointer list-none items-center">Удалить</summary>
      <form action={action} className="mt-2">
        <input type="hidden" name="code" value={code} />
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="btn btn--line btn--sm">
          Точно удалить
        </button>
      </form>
    </details>
  );
}

export default async function StudioProjectPage({ params }: { params: Promise<{ code: string }> }) {
  await requireStudio();
  const { code } = await params;
  const project = await findProjectByCode(code);
  if (!project) notFound();
  const [state, { links, feed }] = await Promise.all([loadProjectState(project, { forStudio: true }), loadStudioExtras(project.id)]);
  const q = state.questionnaire;
  const kind = kindOf(project.kind);
  const versionOrder = kind.stages.some((stage) => stage.key === "teaser") ? (["teaser", "film", "other"] as const) : (["film", "teaser", "other"] as const);
  const versionOptions = versionOrder.map((key): [string, string] => [key, kind.versions[key]]);
  const fileOptions = (["film", "teaser", "vertical", "recording", "other"] as const).map((key): [string, string] => [key, kind.files[key]]);
  const textKeys: TextKey[] = ["people", "shots", "music", "speeches", "notes"];
  const reviewable = state.versions.filter((version) => version.status !== "uploading");

  return (
    <>
      <CabinetBar kind="studio" />
      <div className="wrap cab-main">
        <Link href="/studio" className="link-line text-small">
          К проектам
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="display display--h2">{project.title}</h1>
            <p className="cab-hero__meta">
              {[kind.label, formatDay(project.eventDate), project.city].filter(Boolean).join(", ")} <span className="cab-code text-haze">{project.code}</span>
            </p>
          </div>
          <Link href={`/cabinet/${project.code}`} className="btn btn--line btn--sm">
            Как видит {kind.who.nom}
          </Link>
        </div>

        <div className="st-columns">
          {/* ── Левая колонка: проект, этапы, доступ ── */}
          <div className="grid gap-12">
            <section>
              <h2 className="cab-h2">Проект</h2>
              <form action={updateProject} className="form-grid form-grid--compact">
                <input type="hidden" name="code" value={project.code} />
                <Field label={kind.titleLabel} htmlFor="title" wide>
                  <input id="title" name="title" className="input" defaultValue={project.title} required />
                </Field>
                <Field label={kind.dateLabel} htmlFor="eventDate">
                  <input id="eventDate" name="eventDate" type="date" className="input" defaultValue={project.eventDate ?? ""} />
                </Field>
                <Field label="Город" htmlFor="city">
                  <input id="city" name="city" className="input" defaultValue={project.city ?? ""} />
                </Field>
                <Field label="Кругов правок" htmlFor="roundsIncluded">
                  <input id="roundsIncluded" name="roundsIncluded" type="number" min={0} max={5} className="input" defaultValue={project.roundsIncluded} />
                </Field>
                <Field label="Кадров в секунду" htmlFor="fps" hint="для маркеров">
                  <input id="fps" name="fps" type="number" min={23} max={60} className="input" defaultValue={project.fps} />
                </Field>
                <div className="field--wide">
                  <button type="submit" className="btn btn--line btn--sm">
                    Сохранить
                  </button>
                </div>
              </form>
            </section>

            <section>
              <h2 className="cab-h2">Этапы и сроки</h2>
              <form action={updateStages}>
                <input type="hidden" name="code" value={project.code} />
                {state.stages.map((stage) => (
                  <div key={stage.id} className="st-stage">
                    <span>{stage.title}</span>
                    <input type="date" name={`due_${stage.id}`} defaultValue={stage.dueOn ?? ""} className="input" aria-label={`Срок: ${stage.title}`} />
                    <label className="consent">
                      <input type="checkbox" name={`done_${stage.id}`} defaultChecked={Boolean(stage.doneAt)} />
                      <span>готово</span>
                    </label>
                  </div>
                ))}
                <button type="submit" className="btn btn--line btn--sm mt-4">
                  Сохранить этапы
                </button>
              </form>
            </section>

            <section>
              <h2 className="cab-h2">Доступ {kind.who.gen}</h2>
              <LinkCreator code={project.code} />
              {links.length ? (
                <ul className="cab-rows mt-6">
                  {links.map((item) => (
                    <li key={item.id} className="cab-row">
                      <div>
                        <p className="cab-row__title">{item.name}</p>
                        <p className="cab-row__meta">
                          <span>выдана {formatDay(item.createdAt, { withYear: false })}</span>
                          <span>{item.revokedAt ? "отозвана" : item.lastSeenAt ? `последний вход ${formatDateTime(item.lastSeenAt)}` : "ещё не открывали"}</span>
                        </p>
                      </div>
                      {!item.revokedAt ? (
                        <form action={revokeLink}>
                          <input type="hidden" name="code" value={project.code} />
                          <input type="hidden" name="id" value={item.id} />
                          <button type="submit" className="link-button">
                            Отозвать
                          </button>
                        </form>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <section>
              <h2 className="cab-h2">Лента</h2>
              <ul className="st-feed">
                {feed.map((event) => (
                  <li key={event.id}>
                    <time dateTime={event.createdAt.toISOString()}>{formatDateTime(event.createdAt)}</time>
                    {event.text}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ── Правая колонка: видео, файлы, премьера, анкета ── */}
          <div className="grid gap-12">
            <section>
              <h2 className="cab-h2">Видео для просмотра</h2>
              <Uploader code={project.code} mode="version" options={versionOptions} />
              {state.versions.length ? (
                <ul className="cab-rows mt-6">
                  {state.versions.map((version) => (
                    <li key={version.id} className="cab-row">
                      <div>
                        <p className="cab-row__title">{version.title}</p>
                        <p className="cab-row__meta">
                          <VersionChip status={version.status} studio />
                          <span>{formatDay(version.createdAt, { withYear: false })}</span>
                          <span className="num">{formatSize(version.sizeBytes)}</span>
                        </p>
                      </div>
                      <div className="cab-row__actions">
                        {version.status !== "uploading" ? (
                          <Link href={`/studio/p/${project.code}/v/${version.id}`} className="btn btn--line btn--sm">
                            Правки
                          </Link>
                        ) : null}
                        <DeleteButton action={deleteVersion} code={project.code} id={version.id} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <section>
              <h2 className="cab-h2">Файлы для скачивания</h2>
              <Uploader code={project.code} mode="file" options={fileOptions} />
              {state.files.length ? (
                <ul className="cab-rows mt-6">
                  {state.files.map((file) => (
                    <li key={file.id} className="cab-row">
                      <div>
                        <p className="cab-row__title">{file.title}</p>
                        <p className="cab-row__meta">
                          <span>{file.fileName}</span>
                          <span className="num">{file.ready ? formatSize(file.sizeBytes) : "не догрузился"}</span>
                        </p>
                      </div>
                      <DeleteButton action={deleteFile} code={project.code} id={file.id} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <section>
              <h2 className="cab-h2">{kind.premiere.title}</h2>
              <form action={updatePremiere} className="grid gap-4">
                <input type="hidden" name="code" value={project.code} />
                <label className="consent">
                  <input type="checkbox" name="enabled" defaultChecked={Boolean(project.premiereSlug)} />
                  <span>Открыть просмотр по паролю</span>
                </label>
                <label className="field">
                  <span className="field__label">Что показываем</span>
                  <select name="versionId" className="input" defaultValue={project.premiereVersionId ?? ""}>
                    <option value="">Выберите версию</option>
                    {reviewable.map((version) => (
                      <option key={version.id} value={version.id}>
                        {version.title}
                      </option>
                    ))}
                  </select>
                </label>
                {project.premiereSlug ? (
                  <label className="consent">
                    <input type="checkbox" name="newPassword" value="1" />
                    <span>Новый пароль</span>
                  </label>
                ) : null}
                <button type="submit" className="btn btn--line btn--sm justify-self-start">
                  Сохранить
                </button>
              </form>
              {project.premiereSlug && project.premierePassword ? (
                <div className="mt-6 grid gap-3">
                  <CopyField value={`${cabinetConfig.baseUrl}/premiere/${project.premiereSlug}`} label="Ссылка" />
                  <CopyField value={project.premierePassword} label="Пароль" />
                  <p className="cab-muted">Ссылка и пароль видны в кабинете {kind.who.gen}.</p>
                </div>
              ) : null}
            </section>

            <section>
              <h2 className="cab-h2">Анкета</h2>
              {q && questionnaireFilled(q) ? (
                <div className="grid gap-6 text-small">
                  {q.timeline.length ? (
                    <div>
                      <p className="field__label mb-2">{kind.questionnaire.timeline.title}</p>
                      <ul className="grid gap-1">
                        {q.timeline.map((row, index) => (
                          <li key={index}>
                            <span className="num text-led">{row.a}</span> {row.b}
                            {row.c ? <span className="text-steel">, {row.c}</span> : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {q.contacts.length ? (
                    <div>
                      <p className="field__label mb-2">{kind.questionnaire.contacts.title}</p>
                      <ul className="grid gap-1">
                        {q.contacts.map((row, index) => (
                          <li key={index}>
                            {row.a}: {row.b} <span className="num text-steel">{row.c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {textKeys
                    .filter((key) => q[key])
                    .map((key) => (
                      <div key={key}>
                        <p className="field__label mb-1">{kind.questionnaire.texts[key].title}</p>
                        <p className="whitespace-pre-line text-steel">{q[key]}</p>
                      </div>
                    ))}
                  <Link href={`/cabinet/${project.code}/anketa`} className="link-line justify-self-start">
                    Открыть для печати
                  </Link>
                </div>
              ) : (
                <p className="cab-muted">Анкета ещё не заполнена.</p>
              )}
            </section>

            {state.testimonial ? (
              <section>
                <h2 className="cab-h2">Отзыв</h2>
                <blockquote className="whitespace-pre-line">{state.testimonial.body}</blockquote>
                <p className="cab-muted mt-2">
                  {state.testimonial.authorName}, {state.testimonial.allowPublish ? "можно показать на сайте" : "только для студии"}
                </p>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

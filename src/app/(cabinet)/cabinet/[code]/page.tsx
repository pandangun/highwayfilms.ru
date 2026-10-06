import Link from "next/link";
import { requireClientAccess } from "@/cabinet/auth";
import { cabinetConfig } from "@/cabinet/config";
import { loadProjectState } from "@/cabinet/data";
import { formatDay, formatSize } from "@/cabinet/format";
import { kindOf } from "@/cabinet/kinds";
import { storage } from "@/cabinet/storage";
import { clientNextStep, questionnaireFilled, storageUntil } from "@/cabinet/project";
import CabinetBar from "@/components/cabinet/CabinetBar";
import NextStepSign from "@/components/cabinet/NextStepSign";
import RouteList from "@/components/cabinet/RouteList";
import VersionChip from "@/components/cabinet/VersionChip";
import { CopyField, TestimonialForm } from "@/components/cabinet/small";

export const metadata = { title: "Проект" };

/** Главная кабинета клиента: щит с одним действием, маршрут, видео и файлы. */
export default async function CabinetProject({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const { project, link } = await requireClientAccess(code);
  const state = await loadProjectState(project);
  const base = `/cabinet/${project.code}`;
  const step = clientNextStep(state, base);
  const filmApproved = state.versions.some((version) => version.kind === "film" && version.status === "approved");
  const keepUntil = storageUntil(project.eventDate);
  const kind = kindOf(project.kind);

  return (
    <>
      <CabinetBar kind="client" title={link ? undefined : `Просмотр глазами ${kind.who.gen}`} />
      <div className="wrap cab-main">
        <h1 className="display display--h1">{project.title}</h1>
        <p className="cab-hero__meta">{[formatDay(project.eventDate), project.city].filter(Boolean).join(", ")}</p>

        <div className="cab-grid">
          <section aria-labelledby="route">
            <h2 id="route" className="cab-h2">
              Маршрут
            </h2>
            <RouteList stages={state.stages} />
            {keepUntil ? <p className="cab-muted mt-2">Файлы храним до {formatDay(keepUntil)}.</p> : null}
          </section>

          <div>
            <NextStepSign step={step} />

            {state.versions.length ? (
              <section className="cab-section mt-10" aria-labelledby="videos">
                <h2 id="videos" className="cab-h2">
                  Видео на просмотр
                </h2>
                <ul className="cab-rows">
                  {state.versions.map((version) => (
                    <li key={version.id} className="cab-row">
                      <div>
                        <p className="cab-row__title">{version.title}</p>
                        <p className="cab-row__meta">
                          <VersionChip status={version.status} />
                          <span>{formatDay(version.createdAt, { withYear: false })}</span>
                          {state.drafts[version.id] ? <span>черновиков правок: {state.drafts[version.id]}</span> : null}
                        </p>
                      </div>
                      <div className="cab-row__actions">
                        <Link href={`${base}/v/${version.id}`} className="btn btn--line btn--sm">
                          Смотреть
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="cab-section mt-10" aria-labelledby="anketa">
              <h2 id="anketa" className="cab-h2">
                {kind.questionnaire.title}
              </h2>
              <div className="cab-row border-y border-line">
                <p className="cab-muted">
                  {questionnaireFilled(state.questionnaire) ? "Заполнена. Дополнить можно в любой момент." : kind.questionnaire.summary}
                </p>
                <Link href={`${base}/anketa`} className="btn btn--line btn--sm">
                  {questionnaireFilled(state.questionnaire) ? "Открыть" : "Заполнить"}
                </Link>
              </div>
            </section>

            {state.files.length ? (
              <section id="files" className="cab-section" aria-labelledby="files-title">
                <h2 id="files-title" className="cab-h2">
                  Файлы
                </h2>
                <ul className="cab-rows">
                  {state.files.map((file) => (
                    <li key={file.id} className="cab-row">
                      <div>
                        <p className="cab-row__title">{file.title}</p>
                        <p className="cab-row__meta">
                          <span>{file.fileName}</span>
                          <span className="num">{formatSize(file.sizeBytes)}</span>
                        </p>
                      </div>
                      <a href={storage.downloadUrl(file.storageKey, { fileName: file.fileName })} className="btn btn--line btn--sm" download>
                        Скачать
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.premiereSlug && project.premierePassword && project.premiereVersionId ? (
              <section className="cab-section" aria-labelledby="premiere">
                <h2 id="premiere" className="cab-h2">
                  {kind.premiere.title}
                </h2>
                <p className="cab-muted mb-4 max-w-[36em]">{kind.premiere.hint}</p>
                <div className="grid gap-3">
                  <CopyField value={`${cabinetConfig.baseUrl}/premiere/${project.premiereSlug}`} label="Ссылка" />
                  <CopyField value={project.premierePassword} label="Пароль" />
                </div>
              </section>
            ) : null}

            {filmApproved && link ? (
              <section className="cab-section" aria-labelledby="review">
                <h2 id="review" className="cab-h2">
                  Отзыв
                </h2>
                <TestimonialForm
                  code={project.code}
                  initial={state.testimonial ? { body: state.testimonial.body, allowPublish: state.testimonial.allowPublish } : null}
                />
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

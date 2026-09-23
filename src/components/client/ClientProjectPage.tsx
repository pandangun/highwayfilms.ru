import Link from "next/link";
import { Download } from "lucide-react";
import Credits from "@/components/Credits";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";
import { clientProjectDemo, formatProjectDate, getLocalizedText } from "@/data/clientProjectDemo";
import { contacts } from "@/content/site";
import type { Locale } from "@/components/siteNavigation";

const copy = {
  ru: {
    code: "Проект",
    updated: "Обновлён",
    status: "Статус",
    versions: "Версии монтажа",
    comments: "Правки по таймкодам",
    assets: "Файлы проекта",
    download: "Скачать",
    back: "Выйти",
    needChanges: "Нужны ещё правки?",
    support: "Напишите в Telegram или на почту: соберём следующий круг правок и покажем новую версию.",
    write: "Написать в Telegram",
    mail: "Почта",
    demo: "Это демо-проект. Скачивание отключено.",
  },
  en: {
    code: "Project",
    updated: "Updated",
    status: "Status",
    versions: "Edit versions",
    comments: "Timecoded notes",
    assets: "Project files",
    download: "Download",
    back: "Sign out",
    needChanges: "More notes?",
    support: "Message us on Telegram or by email: we'll collect the next round and show you a new cut.",
    write: "Message on Telegram",
    mail: "Email",
    demo: "This is a demo project. Downloads are disabled.",
  },
} as const;

/**
 * Проект в кабинете клиента. Устроен как съёмочный документ: шапка с
 * кодом и статусом, дальше версии, правки и файлы — строками, без коробок.
 */
export function ClientProjectPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const p = clientProjectDemo;
  const entryHref = locale === "en" ? "/en/client" : "/client";

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ProjectStatusBadge label={getLocalizedText(p.status.label, locale)} tone={p.status.tone} />
            <Link href={entryHref} className="link-line text-small">
              {t.back}
            </Link>
          </div>
          <h1 className="display display--h1 mt-10 max-w-[16ch]">{getLocalizedText(p.title, locale)}</h1>
          <p className="lead">{getLocalizedText(p.subtitle, locale)}</p>

          <Credits
            className="credits--start mt-12 max-w-[760px]"
            items={[
              { label: t.code, value: <span className="num">{p.code}</span> },
              { label: t.updated, value: formatProjectDate(p.updatedAt, locale) },
              ...p.checkpoints.map((item) => ({
                label: getLocalizedText(item.label, locale),
                value: getLocalizedText(item.value, locale),
              })),
            ]}
          />
          <p className="mt-10 max-w-[44em] text-silver">{getLocalizedText(p.summary, locale)}</p>
        </div>
      </header>

      <section className="band border-t border-line">
        <div className="wrap">
          <h2 className="display display--h2 mb-10">{t.versions}</h2>
          <ol className="doc-rows">
            {p.versions.map((version) => (
              <li key={version.name} className="doc-row">
                <p className="display display--h4">{version.name}</p>
                <p className="text-silver">{getLocalizedText(version.note, locale)}</p>
                <div className="doc-row__meta">
                  <span>{getLocalizedText(version.state, locale)}</span>
                  <span className="text-dim">{formatProjectDate(version.updatedAt, locale)}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band border-t border-line">
        <div className="wrap">
          <h2 className="display display--h2 mb-10">{t.comments}</h2>
          <ul className="doc-rows">
            {p.comments.map((comment) => (
              <li key={`${comment.timecode}-${comment.author}`} className="doc-row">
                <p className="display display--h4 num text-brass">{comment.timecode}</p>
                <p>{getLocalizedText(comment.text, locale)}</p>
                <div className="doc-row__meta">
                  <span>{getLocalizedText(comment.state, locale)}</span>
                  <span className="text-dim">{comment.author}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band border-t border-line">
        <div className="wrap">
          <h2 className="display display--h2 mb-10">{t.assets}</h2>
          <ul className="doc-rows">
            {p.assets.map((asset) => (
              <li key={asset.name} className="doc-row">
                <p className="display display--h4">{asset.name}</p>
                <p className="text-silver">{getLocalizedText(asset.note, locale)}</p>
                <div className="doc-row__meta">
                  <span className="num">
                    {asset.format}, {asset.size}
                  </span>
                  <button type="button" className="btn btn--line btn--sm" disabled title={t.demo}>
                    <Download className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    {t.download}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-micro text-dim">{t.demo}</p>
        </div>
      </section>

      <section className="invite">
        <div className="wrap">
          <h2 className="display display--h1">{t.needChanges}</h2>
          <p className="invite__text">{t.support}</p>
          <div className="invite__actions">
            <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="btn btn--ivory">
              {t.write}
            </a>
            <a href={contacts.emailHref} className="link-line">
              {contacts.email}
            </a>
          </div>
          <p className="mt-12 text-small text-silver">{getLocalizedText(p.accessNote, locale)}</p>
        </div>
      </section>
    </>
  );
}

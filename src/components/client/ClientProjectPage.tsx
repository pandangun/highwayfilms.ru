import Link from "next/link";
import { Download, Mail, MessageCircleMore, PlayCircle } from "lucide-react";
import type { Locale } from "@/data/articles";
import { clientProjectDemo, formatProjectDate, getLocalizedText } from "@/data/clientProjectDemo";
import { ProjectStatusBadge } from "@/components/client/ProjectStatusBadge";

type ClientProjectPageProps = {
  locale: Locale;
};

const copy = {
  ru: {
    eyebrow: "Project room",
    back: "Вернуться ко входу",
    versions: "Версии видео",
    comments: "Комментарии по таймкодам",
    assets: "Материалы проекта",
    checkpoints: "Текущий контур проекта",
    needChanges: "Нужны правки?",
    support: "Можно написать в Telegram или на почту проекта — соберём следующий раунд комментариев аккуратно и без потери контекста.",
    write: "Связаться",
    download: "Скачать",
  },
  en: {
    eyebrow: "Project room",
    back: "Back to access",
    versions: "Video versions",
    comments: "Timecoded comments",
    assets: "Project assets",
    checkpoints: "Current project outline",
    needChanges: "Need revisions?",
    support: "You can write on Telegram or by project email and we will collect the next feedback round without losing context.",
    write: "Contact us",
    download: "Download",
  },
} as const;

export function ClientProjectPage({ locale }: ClientProjectPageProps) {
  const t = copy[locale];
  const entryHref = locale === "en" ? "/en/client" : "/client";
  const contactHref = locale === "en" ? "/en/contacts" : "/contacts";

  return (
    <div className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <section className="pt-header-safe relative overflow-hidden pb-10 pt-6 md:pb-14 md:pt-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_32rem_at_10%_0%,rgba(124,58,237,.16),transparent_58%),radial-gradient(36rem_18rem_at_100%_0%,rgba(214,183,138,.08),transparent_52%)]" />
          <div className="container relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-white/46">{t.eyebrow}</p>
                <h1 className="font-display heading-balance mt-3 text-[clamp(2.5rem,4.6vw,4.6rem)] leading-[0.95] tracking-[-0.05em] text-white">
                  {getLocalizedText(clientProjectDemo.title, locale)}
                </h1>
                <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-white/64">
                  {getLocalizedText(clientProjectDemo.subtitle, locale)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ProjectStatusBadge
                  label={getLocalizedText(clientProjectDemo.status.label, locale)}
                  tone={clientProjectDemo.status.tone}
                />
                <Link href={entryHref} className="btn inline-flex rounded-full px-5 text-sm">
                  {t.back}
                </Link>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/54">
              <span>{clientProjectDemo.code}</span>
              <span className="h-1 w-1 rounded-full bg-white/18" />
              <span>{formatProjectDate(clientProjectDemo.updatedAt, locale)}</span>
            </div>
          </div>
        </section>

        <section className="container pb-10 md:pb-14">
          <div className="project-room project-room--content">
            <p className="max-w-4xl text-[1rem] leading-8 text-white/66">{getLocalizedText(clientProjectDemo.summary, locale)}</p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {clientProjectDemo.checkpoints.map((item) => (
                <div key={item.label.ru} className="section-card section-card--steady">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/42">{getLocalizedText(item.label, locale)}</div>
                  <div className="mt-3 text-sm leading-7 text-white/74">{getLocalizedText(item.value, locale)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container pb-10 md:pb-14">
          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-6">
              <div className="section-panel section-panel--compact">
                <p className="eyebrow text-white/44">{t.versions}</p>
                <div className="mt-5 space-y-4">
                  {clientProjectDemo.versions.map((version) => (
                    <div key={version.name} className="section-card section-card--steady flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <PlayCircle className="h-5 w-5 text-white/62" />
                          <h2 className="font-display text-[1.55rem] leading-[1] text-white">{version.name}</h2>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-white/62">{getLocalizedText(version.note, locale)}</p>
                      </div>
                      <div className="space-y-2 text-sm text-white/50 md:text-right">
                        <div>{formatProjectDate(version.updatedAt, locale)}</div>
                        <div>{getLocalizedText(version.state, locale)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-panel section-panel--compact">
                <p className="eyebrow text-white/44">{t.comments}</p>
                <div className="mt-5 space-y-4">
                  {clientProjectDemo.comments.map((comment) => (
                    <div key={`${comment.timecode}-${comment.author}`} className="section-card section-card--steady">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="status-pill status-pill--slate">{comment.timecode}</span>
                          <span className="text-sm text-white/48">{comment.author}</span>
                        </div>
                        <span className="text-xs uppercase tracking-[0.16em] text-white/44">
                          {getLocalizedText(comment.state, locale)}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-white/68">{getLocalizedText(comment.text, locale)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="section-panel section-panel--compact">
                <p className="eyebrow text-white/44">{t.assets}</p>
                <div className="mt-5 space-y-4">
                  {clientProjectDemo.assets.map((asset) => (
                    <div key={asset.name} className="section-card section-card--steady flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h2 className="font-display text-[1.55rem] leading-[1] text-white">{asset.name}</h2>
                          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/42">
                            {asset.format} · {asset.size}
                          </p>
                        </div>
                        <button type="button" className="btn inline-flex rounded-full px-4 text-sm">
                          {t.download}
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm leading-7 text-white/62">{getLocalizedText(asset.note, locale)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-panel section-panel--compact">
                <p className="eyebrow text-white/44">{t.needChanges}</p>
                <h2 className="font-display mt-3 text-[clamp(1.8rem,1.45rem+1vw,2.6rem)] leading-[0.98] text-white">
                  {locale === "en" ? "Send the next feedback round calmly" : "Соберём следующий раунд правок спокойно"}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{t.support}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={contactHref} className="btn-primary inline-flex rounded-full px-6 text-sm">
                    {t.write}
                    <Mail className="h-4 w-4" />
                  </Link>
                  <a href="https://t.me/highwayfilms" target="_blank" rel="noreferrer" className="btn inline-flex rounded-full px-6 text-sm">
                    Telegram
                    <MessageCircleMore className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-5 text-xs leading-6 text-white/42">{getLocalizedText(clientProjectDemo.accessNote, locale)}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale, ResolvedArticle } from "@/data/articles";
import { formatArticleDate } from "@/data/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { ArticleMeta } from "@/components/articles/ArticleMeta";

type ArticleDetailPageProps = {
  article: ResolvedArticle;
  related: ResolvedArticle[];
  locale: Locale;
};

const copy = {
  ru: {
    back: "Все статьи",
    more: "Другие статьи",
    ctaTitle: "Если нужен продакшн под вашу задачу, а не абстрактная теория",
    ctaLead: "Соберём формат, сроки и смету под рекламу, event, short-form или свадебный фильм.",
    primary: "Перейти к брифу",
    secondary: "Связаться",
    service: "Связанная услуга",
  },
  en: {
    back: "All articles",
    more: "More articles",
    ctaTitle: "If you need production for a real task, not abstract theory",
    ctaLead: "We can shape the format, timing, and estimate for commercials, events, short-form, or wedding films.",
    primary: "Open brief",
    secondary: "Contact us",
    service: "Related service",
  },
} as const;

export function ArticleDetailPage({ article, related, locale }: ArticleDetailPageProps) {
  const t = copy[locale];

  return (
    <div className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <section className="article-detail-hero pt-header-safe relative overflow-hidden pb-10 pt-6 md:pb-14 md:pt-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(64rem_34rem_at_10%_0%,rgba(124,58,237,.16),transparent_56%),radial-gradient(38rem_20rem_at_100%_0%,rgba(214,183,138,.1),transparent_52%)]" />
          <div className="container relative">
            <Link href={locale === "en" ? "/en/articles" : "/articles"} className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white/82">
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
            <div className="mt-6 max-w-4xl">
              <ArticleMeta
                category={article.content.category}
                date={formatArticleDate(article.publishedAt, locale)}
                readingTime={article.content.readingTime}
              />
              <h1 className="article-detail-title font-display heading-balance mt-5 text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.055em] text-white">
                {article.content.title}
              </h1>
              <p className="article-detail-lead mt-5 text-[1.05rem] leading-8 text-white/66 md:text-[1.14rem]">{article.content.excerpt}</p>
            </div>
          </div>
        </section>

        <section className="container pb-8 md:pb-10">
          <ArticleCover
            eyebrow={article.content.coverEyebrow}
            detail={article.content.coverDetail}
            tone={article.coverTone}
          />
        </section>

        <section className="container pb-10 md:pb-14">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="article-detail-body section-panel section-panel--content">
              <p className="max-w-3xl text-[1.05rem] leading-8 text-white/70 md:text-[1.12rem]">{article.content.intro}</p>
              <div className="mt-8 space-y-8">
                {article.content.sections.map((section) => (
                  <section key={section.heading} className="border-t border-white/10 pt-8">
                    <h2 className="font-display heading-balance text-[clamp(1.9rem,1.45rem+1.2vw,2.8rem)] leading-[1] text-white">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-[1rem] leading-8 text-white/64">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-5 space-y-3 text-sm leading-7 text-white/62">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-[0.7rem] h-1.5 w-1.5 rounded-full bg-white/36" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </article>

            <aside className="space-y-4">
              <div className="section-card section-card--steady">
                <p className="eyebrow text-white/44">{t.service}</p>
                <h2 className="font-display mt-3 text-[1.8rem] leading-[1] text-white">{article.serviceLabel[locale]}</h2>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  {locale === "en"
                    ? "The article connects directly to a live service page with current studio context."
                    : "Материал связан с живой сервисной страницей и не оторван от реального контекста студии."}
                </p>
                <Link href={locale === "en" ? `/en${article.serviceHref}` : article.serviceHref} className="btn mt-5 inline-flex rounded-full px-5 text-sm">
                  {locale === "en" ? "Open service page" : "Открыть страницу услуги"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="section-card section-card--steady">
                <p className="text-sm leading-7 text-white/58">
                  {locale === "en"
                    ? "This editorial layer is local for now, but the structure is ready for migration to a CMS without rebuilding the pages."
                    : "Пока editorial-раздел работает на локальных данных, но структура уже подготовлена под спокойную миграцию на CMS без пересборки страниц."}
                </p>
              </div>
            </aside>
          </div>
        </section>

        {related.length ? (
          <section className="container pb-10 md:pb-14">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="eyebrow text-white/46">{t.more}</p>
              <Link href={locale === "en" ? "/en/articles" : "/articles"} className="text-sm text-white/56 transition hover:text-white/82">
                {t.back}
              </Link>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="container pb-16 md:pb-20">
          <div className="article-detail-cta section-panel section-panel--content">
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
              <div className="max-w-3xl">
                <p className="eyebrow text-white/46">Highway Films</p>
                <h2 className="font-display heading-balance mt-3 text-[clamp(2.2rem,1.8rem+1.6vw,3.6rem)] leading-[0.96] text-white">
                  {t.ctaTitle}
                </h2>
                <p className="mt-4 text-[1rem] leading-8 text-white/64">{t.ctaLead}</p>
              </div>
              <div className="section-card section-card--steady">
                <div className="flex flex-wrap gap-3">
                  <Link href={locale === "en" ? "/en/brief" : "/brief"} className="btn-primary inline-flex rounded-full px-6 text-sm">
                    {t.primary}
                  </Link>
                  <Link href={locale === "en" ? "/en/contacts" : "/contacts"} className="btn inline-flex rounded-full px-6 text-sm">
                    {t.secondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

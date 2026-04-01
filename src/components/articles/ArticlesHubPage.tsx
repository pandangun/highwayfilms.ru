import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/data/articles";
import { getAllArticles, getFeaturedArticle } from "@/data/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";

type ArticlesHubPageProps = {
  locale: Locale;
};

const copy = {
  ru: {
    eyebrow: "Статьи Highway Films",
    title: "Статьи о видеопродакшне, рекламе и съёмке",
    lead: "Редакционный раздел студии: короткие практичные материалы о коммерческом продакшне, событийной съёмке, свадебных фильмах и short-form контенте.",
    featuredLabel: "Выделенный материал",
    listLabel: "Все статьи",
    note: "Пока это локальный editorial-раздел без CMS, но уже с нормальной структурой под будущий рост контента и SEO.",
    ctaTitle: "Нужен не текст, а проект?",
    ctaLead: "Если задача уже понятна, отправьте короткий бриф или свяжитесь с нами напрямую.",
    primary: "Перейти к брифу",
    secondary: "Связаться",
  },
  en: {
    eyebrow: "Highway Films articles",
    title: "Articles on production, commercials, and filming workflow",
    lead: "An editorial section from the studio with practical notes on commercial production, event coverage, wedding films, and short-form content.",
    featuredLabel: "Featured article",
    listLabel: "All articles",
    note: "For now this is a local editorial layer without a CMS, but the structure is already prepared for future content growth and SEO.",
    ctaTitle: "Need a project, not just an article?",
    ctaLead: "If the task is already clear, send us a short brief or contact the studio directly.",
    primary: "Open brief",
    secondary: "Contact us",
  },
} as const;

export function ArticlesHubPage({ locale }: ArticlesHubPageProps) {
  const t = copy[locale];
  const featured = getFeaturedArticle(locale);
  const articles = getAllArticles(locale).filter((article) => article.slug !== featured?.slug);

  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <section className="articles-hub-hero pt-header-safe relative overflow-hidden pb-12 pt-6 md:pb-16 md:pt-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(64rem_34rem_at_10%_0%,rgba(124,58,237,.18),transparent_56%),radial-gradient(42rem_22rem_at_100%_0%,rgba(214,183,138,.12),transparent_50%)]" />
          <div className="container relative">
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/66">
              {t.eyebrow}
            </span>
            <h1 className="articles-hub-title font-display heading-balance mt-5 max-w-5xl text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.94] tracking-[-0.055em] text-white">
              {t.title}
            </h1>
            <p className="articles-hub-lead mt-5 max-w-3xl text-[1.03rem] leading-8 text-white/64 md:text-[1.12rem]">{t.lead}</p>
            <p className="articles-hub-note mt-5 max-w-2xl text-sm leading-7 text-white/46">{t.note}</p>
          </div>
        </section>

        {featured ? (
          <section className="container pb-8 md:pb-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="eyebrow text-white/46">{t.featuredLabel}</p>
              <Link href={locale === "en" ? "/en/contacts" : "/contacts"} className="text-sm text-white/54 transition hover:text-white/78">
                {locale === "en" ? "Need a custom estimate?" : "Нужна смета под задачу?"}
              </Link>
            </div>
            <ArticleCard article={featured} locale={locale} featured />
          </section>
        ) : null}

        <section className="container pb-10 md:pb-14">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="eyebrow text-white/46">{t.listLabel}</p>
            <Link href={locale === "en" ? "/en/videoproduction" : "/videoproduction"} className="inline-flex items-center gap-2 text-sm text-white/54 transition hover:text-white/78">
              {locale === "en" ? "Studio approach" : "Подход студии"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        </section>

        <section className="container pb-16 md:pb-20">
          <div className="articles-hub-cta surface-panel px-6 py-8 md:px-8 md:py-9">
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
              <div className="max-w-3xl">
                <p className="eyebrow text-white/46">Highway Films</p>
                <h2 className="font-display heading-balance mt-3 text-[clamp(2.2rem,1.8rem+1.6vw,3.6rem)] leading-[0.96] text-white">
                  {t.ctaTitle}
                </h2>
                <p className="mt-4 text-[1rem] leading-8 text-white/64">{t.ctaLead}</p>
              </div>
              <div className="surface-quiet p-5">
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
    </main>
  );
}

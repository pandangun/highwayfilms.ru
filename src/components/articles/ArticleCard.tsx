import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale, ResolvedArticle } from "@/data/articles";
import { formatArticleDate, getArticleHref } from "@/data/articles";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { ArticleMeta } from "@/components/articles/ArticleMeta";

type ArticleCardProps = {
  article: ResolvedArticle;
  locale: Locale;
  featured?: boolean;
};

export function ArticleCard({ article, locale, featured = false }: ArticleCardProps) {
  const href = getArticleHref(article.slug, locale);

  return (
    <article className="editorial-card p-3">
      <div className={featured ? "grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" : "flex h-full flex-col gap-5"}>
        <ArticleCover
          eyebrow={article.content.coverEyebrow}
          detail={article.content.coverDetail}
          tone={article.coverTone}
          compact={!featured}
        />
        <div className="flex flex-1 flex-col justify-between gap-5 px-2 pb-2">
          <div>
            <ArticleMeta
              category={article.content.category}
              date={formatArticleDate(article.publishedAt, locale)}
              readingTime={article.content.readingTime}
            />
            <h3 className="font-display heading-balance mt-4 text-[clamp(1.8rem,1.45rem+1vw,2.8rem)] leading-[0.98] text-white">
              {article.content.title}
            </h3>
            <p className="mt-4 text-[1rem] leading-8 text-white/62">{article.content.excerpt}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={href} className="btn inline-flex rounded-full px-5 text-sm">
              {locale === "en" ? "Read article" : "Читать"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={locale === "en" ? `/en${article.serviceHref}` : article.serviceHref} className="text-sm text-white/48 transition hover:text-white/78">
              {locale === "en" ? "Related service" : "Связанная услуга"}: {article.serviceLabel[locale]}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

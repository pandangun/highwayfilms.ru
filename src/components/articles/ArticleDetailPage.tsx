import Image from "next/image";
import Link from "next/link";
import { articleStill } from "@/components/articles/articleStill";
import type { Locale, ResolvedArticle } from "@/data/articles";
import { formatArticleDate, getArticleHref } from "@/data/articles";
import { withLocalePath } from "@/components/siteNavigation";

type ArticleDetailPageProps = {
  article: ResolvedArticle;
  related: ResolvedArticle[];
  locale: Locale;
};

const copy = {
  ru: {
    back: "Все статьи",
    more: "Ещё статьи",
    read: "чтения",
    service: "Раздел",
  },
  en: {
    back: "All articles",
    more: "More articles",
    read: "read",
    service: "Section",
  },
} as const;

export function ArticleDetailPage({ article, related, locale }: ArticleDetailPageProps) {
  const t = copy[locale];
  const c = article.content;

  return (
    <>
      <header className="page-head">
        <div className="wrap wrap--text">
          <Link href={locale === "en" ? "/en/articles" : "/articles"} className="link-line text-small">
            {t.back}
          </Link>
          <p className="article-meta mt-10">
            <span>{c.category}</span>
            <span>{formatArticleDate(article.publishedAt, locale)}</span>
            <span>
              {c.readingTime} {t.read}
            </span>
          </p>
          <h1 className="display display--h1 mt-5">{c.title}</h1>
          <p className="lead">{c.excerpt}</p>
        </div>
      </header>

      <div className="wrap">
        <div className="frame">
          <Image src={articleStill(article.serviceHref)} alt="" fill priority sizes="(min-width: 1488px) 1360px, 100vw" className="object-cover" />
        </div>
      </div>

      <article className="band">
        <div className="wrap wrap--text">
          <div className="prose">
            <p className="text-moon">{c.intro}</p>
            {c.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <p className="mt-16 border-t border-line pt-8 text-small text-steel">
            {t.service}:{" "}
            <Link href={withLocalePath(article.serviceHref, locale)} className="link-line">
              {article.serviceLabel[locale]}
            </Link>
          </p>
        </div>
      </article>

      {related.length ? (
        <section className="band border-t border-line">
          <div className="wrap">
            <h2 className="display display--h2 mb-12">{t.more}</h2>
            <ul className="article-list">
              {related.map((item) => (
                <li key={item.slug} className="article-row">
                  <Link href={getArticleHref(item.slug, locale)} className="article-row__frame frame" tabIndex={-1} aria-hidden>
                    <Image src={articleStill(item.serviceHref)} alt="" fill sizes="(min-width: 960px) 360px, 100vw" className="object-cover" />
                  </Link>
                  <div>
                    <p className="article-meta">
                      <span>{item.content.category}</span>
                      <span>{formatArticleDate(item.publishedAt, locale)}</span>
                    </p>
                    <h3 className="display display--h3 mt-3">
                      <Link href={getArticleHref(item.slug, locale)}>{item.content.title}</Link>
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

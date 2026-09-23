import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Invitation from "@/components/Invitation";
import { articleStill } from "@/components/articles/articleStill";
import type { Locale } from "@/data/articles";
import { formatArticleDate, getAllArticles, getArticleHref } from "@/data/articles";

const copy = {
  ru: {
    title: "Статьи",
    lead: "Как заказать видео, из чего складывается смета и что подготовить до съёмки.",
    read: "чтения",
    inviteTitle: "Есть задача?",
    inviteText: "Опишите её в брифе. В течение рабочего дня пришлём смету и план съёмки.",
  },
  en: {
    title: "Articles",
    lead: "How to commission a video, what drives the estimate and what to prepare before the shoot.",
    read: "read",
    inviteTitle: "Have a task in mind?",
    inviteText: "Describe it in the brief. Within one working day we send an estimate and a shoot plan.",
  },
} as const;

export function ArticlesHubPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [first, ...rest] = getAllArticles(locale);

  return (
    <>
      <PageHead title={t.title} lead={t.lead} />

      <section className="pb-[var(--band)]">
        <div className="wrap">
          {first ? (
            <article className="article-lead">
              <Link href={getArticleHref(first.slug, locale)} className="frame block" tabIndex={-1} aria-hidden>
                <Image
                  src={articleStill(first.serviceHref)}
                  alt=""
                  fill
                  sizes="(min-width: 1488px) 1360px, 100vw"
                  className="object-cover"
                />
              </Link>
              <p className="article-meta mt-8">
                <span>{first.content.category}</span>
                <span>{formatArticleDate(first.publishedAt, locale)}</span>
                <span>
                  {first.content.readingTime} {t.read}
                </span>
              </p>
              <h2 className="display display--h2 mt-4 max-w-[22ch]">
                <Link href={getArticleHref(first.slug, locale)}>{first.content.title}</Link>
              </h2>
              <p className="lead mt-5">{first.content.excerpt}</p>
            </article>
          ) : null}

          <ul className="article-list mt-[clamp(72px,8vw,128px)]">
            {rest.map((article) => (
              <li key={article.slug} className="article-row">
                <Link href={getArticleHref(article.slug, locale)} className="article-row__frame frame" tabIndex={-1} aria-hidden>
                  <Image
                    src={articleStill(article.serviceHref)}
                    alt=""
                    fill
                    sizes="(min-width: 960px) 360px, 100vw"
                    className="object-cover"
                  />
                </Link>
                <div>
                  <p className="article-meta">
                    <span>{article.content.category}</span>
                    <span>{formatArticleDate(article.publishedAt, locale)}</span>
                  </p>
                  <h3 className="display display--h3 mt-3">
                    <Link href={getArticleHref(article.slug, locale)}>{article.content.title}</Link>
                  </h3>
                  <p className="mt-4 max-w-[40em] text-silver">{article.content.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Invitation locale={locale} title={t.inviteTitle} text={t.inviteText} />
    </>
  );
}

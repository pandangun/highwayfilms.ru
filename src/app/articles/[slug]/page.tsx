import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/components/articles/ArticleDetailPage";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "ru");

  if (!article) {
    return {};
  }

  return buildPageMetadata({
    title: `${article.content.title} — Highway Films`,
    description: article.content.description,
    path: `/articles/${slug}`,
    locale: "ru",
    imagePath: "/video/derived/hero-poster.jpg",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "ru");

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(slug, "ru");
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.content.title,
    description: article.content.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: `${SITE_URL}/articles/${slug}`,
    author: {
      "@type": "Organization",
      name: "Highway Films",
    },
    publisher: {
      "@type": "Organization",
      name: "Highway Films",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ArticleDetailPage article={article} related={related} locale="ru" />
    </>
  );
}

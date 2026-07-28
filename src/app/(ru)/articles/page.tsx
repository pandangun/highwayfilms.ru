import type { Metadata } from "next";
import { ArticlesHubPage } from "@/components/articles/ArticlesHubPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Статьи о видеопродакшне, рекламе и съёмке — Highway Films",
  description:
    "Editorial-раздел Highway Films: статьи о коммерческом продакшне, рекламных роликах, event-съёмке, свадебных фильмах и short-form контенте.",
  path: "/articles",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function ArticlesPage() {
  return <ArticlesHubPage locale="ru" />;
}

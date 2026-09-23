import type { Metadata } from "next";
import { ArticlesHubPage } from "@/components/articles/ArticlesHubPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Статьи о видеосъёмке и рекламе — Highway Films",
  description:
    "Как заказать видео, из чего складывается смета и что подготовить до съёмки: статьи видеостудии Highway Films.",
  path: "/articles",
  locale: "ru",
  imagePath: "/images/stills/commercials-01.jpg",
});

export default function ArticlesPage() {
  return <ArticlesHubPage locale="ru" />;
}

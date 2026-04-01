import type { Metadata } from "next";
import { ArticlesHubPage } from "@/components/articles/ArticlesHubPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Articles on production, commercials, and filming — Highway Films",
  description:
    "Editorial section by Highway Films with practical notes on commercial production, event filming, wedding films, and short-form content.",
  path: "/en/articles",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function ArticlesEnPage() {
  return <ArticlesHubPage locale="en" />;
}

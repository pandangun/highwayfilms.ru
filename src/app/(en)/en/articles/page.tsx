import type { Metadata } from "next";
import { ArticlesHubPage } from "@/components/articles/ArticlesHubPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Articles on filming and commercials — Highway Films",
  description:
    "How to commission a video, what drives the estimate and what to prepare before the shoot: articles by the Highway Films studio.",
  path: "/en/articles",
  locale: "en",
  imagePath: "/images/stills/commercials-01.jpg",
});

export default function ArticlesEnPage() {
  return <ArticlesHubPage locale="en" />;
}

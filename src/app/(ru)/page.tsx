import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { homeContent } from "@/content/home";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  ...homeContent.ru.meta,
  path: "/",
  locale: "ru",
  imagePath: "/images/stills/commercials-02.jpg",
});

export default function Page() {
  return <HomePage locale="ru" />;
}

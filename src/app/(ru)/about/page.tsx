import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { aboutContent } from "@/content/studio";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  ...aboutContent.ru.meta,
  path: "/about",
  locale: "ru",
  imagePath: "/images/stills/commercials-01.jpg",
});

export default function Page() {
  return <AboutPage locale="ru" />;
}

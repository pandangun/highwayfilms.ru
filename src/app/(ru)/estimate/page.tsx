import type { Metadata } from "next";
import EstimatePage from "@/components/pages/EstimatePage";
import { estimateContent } from "@/content/estimate";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  ...estimateContent.ru.meta,
  path: "/estimate",
  locale: "ru",
  imagePath: "/images/stills/commercials-02.jpg",
});

export default function Page() {
  return <EstimatePage locale="ru" />;
}

import type { Metadata } from "next";
import { BriefStudioPage } from "@/components/BriefStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Бриф на создание видеоролика — Highway Films",
  description:
    "Бриф на видеоролик: десять минут на ответы, смета и срок — в течение рабочего дня.",
  path: "/brief",
  locale: "ru",
  imagePath: "/images/stills/commercials-01.jpg",
  noIndex: true,
});

export default function BriefPage() {
  return <BriefStudioPage locale="ru" />;
}

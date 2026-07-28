import type { Metadata } from "next";
import { BriefStudioPage } from "@/components/BriefStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Бриф на создание видеоролика — Highway Films",
  description:
    "Заполните бриф, чтобы мы быстро поняли задачу и предложили оптимальное решение под ваш видеоролик.",
  path: "/brief",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
  noIndex: true,
});

export default function BriefPage() {
  return <BriefStudioPage locale="ru" />;
}

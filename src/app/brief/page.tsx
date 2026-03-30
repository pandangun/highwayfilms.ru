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
});

type BriefSearchParams = Promise<{ status?: string }>;

export default async function BriefPage({
  searchParams,
}: {
  searchParams?: BriefSearchParams;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <BriefStudioPage locale="ru" status={resolvedSearchParams?.status} />;
}

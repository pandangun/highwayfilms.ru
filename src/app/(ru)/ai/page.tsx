import "@/app/styles/ai.css";
import type { Metadata } from "next";
import AiStudioPage from "@/components/AiStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-видео и генерация в составе продакшна - Highway Films",
  description:
    "Highway Films использует AI как инструмент продакшна: быстрые рекламные тесты, виртуальные ведущие, гибридные ролики, персонализированные версии и генеративный визуал без лишнего технопафоса.",
  path: "/ai",
  locale: "ru",
  imagePath: "/images/ai/ai-01.jpg",
});

export default function AiPage() {
  return <AiStudioPage locale="ru" />;
}

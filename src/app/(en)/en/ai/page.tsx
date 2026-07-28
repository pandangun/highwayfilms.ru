import "@/app/styles/ai.css";
import type { Metadata } from "next";
import AiStudioPage from "@/components/AiStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI video and generative production - Highway Films",
  description:
    "Highway Films uses AI as a production tool for fast ad tests, virtual presenters, hybrid films, personalised versions, and generative visuals where they genuinely improve the brief.",
  path: "/en/ai",
  locale: "en",
  imagePath: "/images/ai/ai-01.jpg",
});

export default function AiPage() {
  return <AiStudioPage locale="en" />;
}

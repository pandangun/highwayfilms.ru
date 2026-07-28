import type { Metadata } from "next";
import MusicVideosStudioPage from "@/components/MusicVideosStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Музыкальные клипы — Highway Films",
  description:
    "Музыкальные клипы с treatment, режиссурой, съёмкой, монтажом и color. Строим визуальный мир артиста через editorial-верстку, production scale и лёгкую страницу без autoplay-видео.",
  path: "/music-videos",
  locale: "ru",
  imagePath: "/images/frames/f022.jpg",
});

export default function MusicVideosPage() {
  return <MusicVideosStudioPage locale="ru" />;
}

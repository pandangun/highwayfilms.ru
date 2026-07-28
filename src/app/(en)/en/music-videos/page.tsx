import type { Metadata } from "next";
import MusicVideosStudioPage from "@/components/MusicVideosStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Music Videos — Highway Films",
  description:
    "Music videos with treatment, direction, filming, edit, and color. A featured case hero, editorial clip wall, cinematic production still, and no autoplay video on the page.",
  path: "/en/music-videos",
  locale: "en",
  imagePath: "/images/frames/f022.jpg",
});

export default function MusicVideosEnPage() {
  return <MusicVideosStudioPage locale="en" />;
}

import type { Metadata } from "next";
import { BriefStudioPage } from "@/components/BriefStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Brief — Highway Films",
  description:
    "Video brief: ten minutes of answers, an estimate and a date within one working day.",
  path: "/en/brief",
  locale: "en",
  imagePath: "/images/stills/commercials-01.jpg",
  noIndex: true,
});

export default function BriefEnPage() {
  return <BriefStudioPage locale="en" />;
}

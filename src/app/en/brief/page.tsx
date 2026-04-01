import type { Metadata } from "next";
import { BriefStudioPage } from "@/components/BriefStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Brief — Highway Films",
  description:
    "Project brief for Highway Films: project type, script status, timing, platforms, budget range, and production inputs.",
  path: "/en/brief",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
  noIndex: true,
});

type BriefSearchParams = Promise<{ status?: string; reason?: string }>;

export default async function BriefEnPage({
  searchParams,
}: {
  searchParams?: BriefSearchParams;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <BriefStudioPage
      locale="en"
      status={resolvedSearchParams?.status}
      reason={resolvedSearchParams?.reason}
    />
  );
}

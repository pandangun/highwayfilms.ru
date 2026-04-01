import type { Metadata } from "next";
import { ClientEntryPage } from "@/components/client/ClientEntryPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Client access — Highway Films",
  description:
    "Highway Films client area: access to edit versions, feedback, project status, and delivery materials.",
  path: "/en/client",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
  noIndex: true,
});

export default function ClientEnPage() {
  return <ClientEntryPage locale="en" />;
}

import type { Metadata } from "next";
import { ClientEntryPage } from "@/components/client/ClientEntryPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Client room — Highway Films",
  description:
    "Highway Films client room: edit versions, timecoded notes and final project files.",
  path: "/en/client",
  locale: "en",
  imagePath: "/images/stills/commercials-01.jpg",
  noIndex: true,
});

export default function ClientEnPage() {
  return <ClientEntryPage locale="en" />;
}

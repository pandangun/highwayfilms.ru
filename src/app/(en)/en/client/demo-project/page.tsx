import type { Metadata } from "next";
import { ClientProjectPage } from "@/components/client/ClientProjectPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Sample project — Highway Films client room",
  description:
    "A sample project in the Highway Films client room: edit versions, timecoded notes and files.",
  path: "/en/client/demo-project",
  locale: "en",
  imagePath: "/images/stills/commercials-01.jpg",
  noIndex: true,
});

export default function ClientDemoProjectEnPage() {
  return <ClientProjectPage locale="en" />;
}

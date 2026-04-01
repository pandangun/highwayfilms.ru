import type { Metadata } from "next";
import { ClientProjectPage } from "@/components/client/ClientProjectPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Demo project — Highway Films client area",
  description:
    "Draft project room concept with edit versions, timecoded comments, and delivery materials for Highway Films clients.",
  path: "/en/client/demo-project",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
  noIndex: true,
});

export default function ClientDemoProjectEnPage() {
  return <ClientProjectPage locale="en" />;
}

import type { Metadata } from "next";
import ServiceTemplate from "@/components/pages/ServiceTemplate";
import { servicePages } from "@/content/services";
import { buildPageMetadata } from "@/lib/metadata";

const page = servicePages["commercials"].en;

export const metadata: Metadata = buildPageMetadata({
  ...page.meta,
  path: page.path,
  locale: "en",
  imagePath: "/images/stills/commercials-02.jpg",
});

export default function Page() {
  return <ServiceTemplate page={page} locale="en" />;
}

import type { Metadata } from "next";
import ServiceTemplate from "@/components/pages/ServiceTemplate";
import { servicePages } from "@/content/services";
import { buildPageMetadata } from "@/lib/metadata";

const page = servicePages["ai"].ru;

export const metadata: Metadata = buildPageMetadata({
  ...page.meta,
  path: page.path,
  locale: "ru",
  imagePath: "/images/stills/ai-01.jpg",
});

export default function Page() {
  return <ServiceTemplate page={page} locale="ru" />;
}

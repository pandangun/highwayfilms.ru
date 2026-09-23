import type { Metadata } from "next";
import WeddingsPage from "@/components/pages/WeddingsPage";
import { weddingsContent } from "@/content/weddings";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  ...weddingsContent.en.meta,
  path: "/en/weddings",
  locale: "en",
  imagePath: "/images/stills/weddings-01.jpg",
});

export default function Page() {
  return <WeddingsPage locale="en" />;
}

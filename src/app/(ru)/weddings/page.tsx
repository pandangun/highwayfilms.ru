import type { Metadata } from "next";
import WeddingsPage from "@/components/pages/WeddingsPage";
import { weddingsContent } from "@/content/weddings";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  ...weddingsContent.ru.meta,
  path: "/weddings",
  locale: "ru",
  imagePath: "/images/stills/weddings-01.jpg",
});

export default function Page() {
  return <WeddingsPage locale="ru" />;
}

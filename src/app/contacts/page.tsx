import type { Metadata } from "next";
import { ContactStudioPage } from "@/components/ContactStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты — Highway Films",
  description:
    "Контактная страница Highway Films: быстрые способы связи, география работы и переход к рабочему брифу для запуска проекта.",
  path: "/contacts",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function ContactsPage() {
  return <ContactStudioPage locale="ru" />;
}

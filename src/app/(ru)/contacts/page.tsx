import type { Metadata } from "next";
import { ContactStudioPage } from "@/components/ContactStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты Highway Films - Санкт-Петербург",
  description:
    "Контакты Highway Films: Санкт-Петербург, выездные съёмки по России, телефон, e-mail, Telegram, WhatsApp и переход к рабочему брифу.",
  path: "/contacts",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function ContactsPage() {
  return <ContactStudioPage locale="ru" />;
}

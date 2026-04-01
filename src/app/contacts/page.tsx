import type { Metadata } from "next";
import { ContactStudioPage } from "@/components/ContactStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты Highway Films — Санкт-Петербург",
  description:
    "Контакты Highway Films: Санкт-Петербург, выездные съёмки по России, телефон, e-mail, Telegram, WhatsApp и короткая заявка на съёмку.",
  path: "/contacts",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

type ContactsSearchParams = Promise<{ status?: string; reason?: string }>;

export default async function ContactsPage({
  searchParams,
}: {
  searchParams?: ContactsSearchParams;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <ContactStudioPage
      locale="ru"
      status={resolvedSearchParams?.status}
      reason={resolvedSearchParams?.reason}
    />
  );
}

import type { Metadata } from "next";
import { ContactStudioPage } from "@/components/ContactStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacts — Highway Films",
  description:
    "Highway Films contact page with direct phone, email, Telegram, WhatsApp, production geography, and a dedicated route to the working brief.",
  path: "/en/contacts",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
});

type ContactsSearchParams = Promise<{ status?: string; reason?: string }>;

export default async function ContactsEnPage({
  searchParams,
}: {
  searchParams?: ContactsSearchParams;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <ContactStudioPage
      locale="en"
      status={resolvedSearchParams?.status}
      reason={resolvedSearchParams?.reason}
    />
  );
}

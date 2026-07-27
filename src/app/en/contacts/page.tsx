import type { Metadata } from "next";
import { ContactStudioPage } from "@/components/ContactStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacts - Highway Films",
  description:
    "Highway Films contacts with direct phone, e-mail, messengers, social links, and a clean route to the brief.",
  path: "/en/contacts",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function ContactsEnPage() {
  return <ContactStudioPage locale="en" />;
}

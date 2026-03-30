import type { Metadata } from "next";
import { ContactStudioPage } from "@/components/ContactStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacts — Highway Films",
  description:
    "Highway Films contact page with fast ways to reach the team, production geography, and a dedicated route to the working brief.",
  path: "/en/contacts",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function ContactsEnPage() {
  return <ContactStudioPage locale="en" />;
}

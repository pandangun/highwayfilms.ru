import type { Metadata } from "next";
import ContactsPage from "@/components/pages/ContactsPage";
import { contactsContent } from "@/content/studio";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  ...contactsContent.ru.meta,
  path: "/contacts",
  locale: "ru",
  imagePath: "/images/stills/commercials-02.jpg",
});

export default function Page() {
  return <ContactsPage locale="ru" />;
}

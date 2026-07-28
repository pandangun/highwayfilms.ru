import type { Metadata } from "next";
import { ContactStudioPage } from "@/components/ContactStudioPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b Highway Films - \u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433",
  description:
    "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b Highway Films: \u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433, \u0432\u044b\u0435\u0437\u0434\u043d\u044b\u0435 \u0441\u044a\u0451\u043c\u043a\u0438 \u043f\u043e \u0420\u043e\u0441\u0441\u0438\u0438, \u0442\u0435\u043b\u0435\u0444\u043e\u043d, e-mail, Telegram, WhatsApp \u0438 \u043f\u0435\u0440\u0435\u0445\u043e\u0434 \u043a \u0440\u0430\u0431\u043e\u0447\u0435\u043c\u0443 \u0431\u0440\u0438\u0444\u0443.",
  path: "/contacts",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function ContactsPage() {
  return <ContactStudioPage locale="ru" />;
}

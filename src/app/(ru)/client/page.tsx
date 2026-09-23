import type { Metadata } from "next";
import { ClientEntryPage } from "@/components/client/ClientEntryPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Кабинет клиента — Highway Films",
  description:
    "Кабинет клиента Highway Films: версии монтажа, правки по таймкодам и финальные файлы проекта.",
  path: "/client",
  locale: "ru",
  imagePath: "/images/stills/commercials-01.jpg",
  noIndex: true,
});

export default function ClientPage() {
  return <ClientEntryPage locale="ru" />;
}

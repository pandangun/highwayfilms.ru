import type { Metadata } from "next";
import { ClientEntryPage } from "@/components/client/ClientEntryPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Вход для клиентов — Highway Films",
  description:
    "Клиентская зона Highway Films: доступ к версии монтажа, комментариям, статусу проекта и финальным материалам.",
  path: "/client",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
  noIndex: true,
});

export default function ClientPage() {
  return <ClientEntryPage locale="ru" />;
}

import type { Metadata } from "next";
import { ClientProjectPage } from "@/components/client/ClientProjectPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Пример проекта — кабинет клиента Highway Films",
  description:
    "Пример проекта в кабинете клиента Highway Films: версии монтажа, правки по таймкодам и файлы.",
  path: "/client/demo-project",
  locale: "ru",
  imagePath: "/images/stills/commercials-01.jpg",
  noIndex: true,
});

export default function ClientDemoProjectPage() {
  return <ClientProjectPage locale="ru" />;
}

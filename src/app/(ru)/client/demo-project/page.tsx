import type { Metadata } from "next";
import { ClientProjectPage } from "@/components/client/ClientProjectPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Demo Project — клиентская зона Highway Films",
  description:
    "Черновая проектная комната Highway Films с версиями монтажа, комментариями по таймкодам и списком материалов проекта.",
  path: "/client/demo-project",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
  noIndex: true,
});

export default function ClientDemoProjectPage() {
  return <ClientProjectPage locale="ru" />;
}

import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RuRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="ru">{children}</SiteShell>;
}

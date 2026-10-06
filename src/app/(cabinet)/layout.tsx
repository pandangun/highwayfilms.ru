import "@/app/globals.css";
import "@/app/styles/cabinet.css";
import type { Metadata } from "next";
import { display, text } from "@/components/fonts";
import { SITE_URL } from "@/lib/metadata";

/**
 * Корневой layout кабинета: без шапки, меню и подвала сайта — у клиента и
 * студии своя полоса сверху (CabinetBar). Поисковикам кабинет закрыт.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Кабинет — Highway Films", template: "%s — кабинет Highway Films" },
  robots: { index: false, follow: false },
};

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${text.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Перейти к содержанию
        </a>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}

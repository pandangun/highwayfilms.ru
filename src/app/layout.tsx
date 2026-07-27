import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionObserver from "@/components/MotionObserver";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "/";
  const lang = pathname.startsWith("/en") ? "en" : "ru";

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <Script
          id="set-site-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('highway-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:'dark';}catch(_){document.documentElement.dataset.theme='dark';}",
          }}
        />
      </head>
      <body className="bg-bgc min-h-screen text-fgc">
        <div id="site-root">
          <MotionObserver />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

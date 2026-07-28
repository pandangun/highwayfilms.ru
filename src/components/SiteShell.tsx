import "@/app/globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionObserver from "@/components/MotionObserver";

/**
 * Имена переменных намеренно не совпадают с --font-display / --font-sans:
 * те объявлены в theme.css и ссылаются сюда. Если назвать одинаково, :root
 * в theme.css перезатрёт то, что подставил next/font.
 */
const display = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

/**
 * Общая оболочка документа для обоих корневых layout'ов — (ru) и (en).
 *
 * Корневых layout'а два, потому что атрибут lang на <html> нужен серверу,
 * а определять его из headers() значит переводить весь сайт в динамический
 * рендер. Route groups дают по одному <html> на локаль без единой
 * динамической зависимости; URL от групп не меняются.
 *
 * Вся разметка живёт здесь, чтобы две обёртки не разъехались со временем.
 */
export default function SiteShell({
  lang,
  children,
}: {
  lang: "ru" | "en";
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element --
          Правило из эпохи Pages Router. В App Router <head> в корневом
          layout — штатный способ, и он нужен здесь ради скрипта ниже. */}
      <head>
        {/* Ставит тему до первой отрисовки, иначе на светлой теме мигает
            тёмный фон. Обычный инлайн-скрипт, а не next/script: в App Router
            он и так выполняется синхронно до боди, а strategy=beforeInteractive
            вне pages/_document не поддерживается. */}
        <script
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

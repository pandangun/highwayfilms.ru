import "@/app/globals.css";
import { Onest, Unbounded } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LaneLine from "@/components/road/LaneLine";
import Headlights from "@/components/road/Headlights";

/**
 * Заголовки — Unbounded: широкий гротеск, в тонком начертании читается
 * как марка дорогой машины, а жирный — как дорожный щит. Это трасса.
 * Текст — Onest.
 *
 * Имена переменных не совпадают с --ff-display / --ff-text из
 * foundation.css: те ссылаются сюда. Если назвать одинаково, :root
 * перезатрёт то, что подставил next/font.
 */
const display = Unbounded({
  subsets: ["cyrillic", "latin"],
  variable: "--font-display",
  display: "swap",
});

const text = Onest({
  subsets: ["cyrillic", "latin"],
  variable: "--font-onest",
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
 * Тема одна — синяя ночь. Ночная трасса со светлой темой перестаёт быть
 * ночной, а вторая палитра удваивала работу над каждым блоком.
 *
 * Разметка и фары — общие для всех страниц: страница читается как одна
 * поездка по трассе, от шапки до финала в подвале.
 */
export default function SiteShell({
  lang,
  children,
}: {
  lang: "ru" | "en";
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={`${display.variable} ${text.variable}`}>
      <body>
        <Header />
        <LaneLine lang={lang} />
        <Headlights />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

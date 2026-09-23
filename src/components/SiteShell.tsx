import "@/app/globals.css";
import { Noto_Serif_Display, Onest } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Заголовки — Noto Serif Display с осью ширины: узкое начертание держит
 * форму афиши даже на телефоне. Текст — Onest.
 *
 * Имена переменных не совпадают с --ff-display / --ff-text из
 * foundation.css: те ссылаются сюда. Если назвать одинаково, :root
 * перезатрёт то, что подставил next/font.
 */
const display = Noto_Serif_Display({
  subsets: ["cyrillic", "latin"],
  axes: ["wdth"],
  style: ["normal"],
  variable: "--font-serif-display",
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
 * Тема одна — тёмная. Кинозал со светлой темой перестаёт быть кинозалом,
 * а вторая палитра удваивала работу над каждым блоком.
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
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

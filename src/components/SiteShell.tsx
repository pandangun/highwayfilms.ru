import "@/app/globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LaneLine from "@/components/road/LaneLine";
import Headlights from "@/components/road/Headlights";
import NavProgress from "@/components/NavProgress";

/**
 * Заголовки — Unbounded: широкий гротеск, в тонком начертании читается
 * как марка дорогой машины, а жирный — как дорожный щит. Это трасса.
 * Текст — Onest.
 *
 * Шрифты свои, по одному файлу на семейство (src/fonts): латиница,
 * кириллица, знаки препинания, ₽ и №, вес 300–600 и 300–700. С Google
 * Fonts приходило шесть файлов на 270 КБ: знак рубля лежит в наборе
 * latin-ext, и ради одного символа браузер докачивал ещё 140 КБ уже
 * после первой отрисовки. Сейчас два файла на 106 КБ, оба в preload.
 * Как пересобрать — в src/fonts/README.md.
 *
 * Имена переменных не совпадают с --ff-display / --ff-text из
 * foundation.css: те ссылаются сюда. Если назвать одинаково, :root
 * перезатрёт то, что подставил next/font.
 */
const display = localFont({
  src: "../fonts/Unbounded.woff2",
  weight: "300 600",
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const text = localFont({
  src: "../fonts/Onest.woff2",
  weight: "300 700",
  variable: "--font-onest",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
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
        {/* Первая остановка табом: сразу к содержанию, мимо шапки и меню. */}
        <a href="#main" className="skip-link">
          {lang === "en" ? "Skip to content" : "Перейти к содержанию"}
        </a>
        <NavProgress />
        <Header />
        <LaneLine lang={lang} />
        <Headlights />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

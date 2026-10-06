import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LaneLine from "@/components/road/LaneLine";
import Headlights from "@/components/road/Headlights";
import NavProgress from "@/components/NavProgress";
import { display, text } from "@/components/fonts";

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

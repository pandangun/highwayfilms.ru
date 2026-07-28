"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeToggle from "@/components/ThemeToggle";
import {
  footerMenuLinks,
  footerServiceLinks,
  getAlternateLocaleHref,
  getLocaleFromPath,
  withLocalePath,
} from "@/components/siteNavigation";

/** Клиентский по той же причине, что и Header — см. комментарий там. */
export default function Footer() {
  const currentPath = usePathname() ?? "/";
  const locale = getLocaleFromPath(currentPath);
  const year = new Date().getFullYear();
  const ruHref = getAlternateLocaleHref(currentPath, "ru");
  const enHref = getAlternateLocaleHref(currentPath, "en");

  return (
    <footer className="footer-shell mt-16 border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]">
      <div className="container safe-px py-10 md:py-12">
        <div className="footer-panel section-panel section-panel--content">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
            <div className="max-w-sm">
              <p className="font-display text-2xl text-white">Highway Films</p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                {locale === "en"
                  ? "Full-cycle production for commercials, brand stories, corporate films, music videos, weddings, and AI visuals."
                  : "Студия полного цикла для рекламы, брендовых историй, корпоративных фильмов, клипов, свадебной съёмки и AI-визуала."}
              </p>
            </div>

            <div className="md:border-l md:border-white/8 md:pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {locale === "en" ? "Menu" : "Меню"}
              </p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-white/70">
                {footerMenuLinks.map((item) => (
                  <Link key={item.href} href={withLocalePath(item.href, locale)} className="footer-link">
                    {locale === "en" ? item.en : item.ru}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="md:border-l md:border-white/8 md:pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {locale === "en" ? "Services" : "Услуги"}
              </p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-white/70">
                {footerServiceLinks.map((item) => (
                  <Link key={item.href} href={withLocalePath(item.href, locale)} className="footer-link">
                    {locale === "en" ? item.en : item.ru}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="md:border-l md:border-white/8 md:pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {locale === "en" ? "Contacts" : "Контакты"}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
                <a href="mailto:info@highway-films.ru" className="footer-link">
                  info@highway-films.ru
                </a>
                <a href="tel:+79692141717" className="footer-link">
                  +7 969 214-17-17
                </a>
                <a
                  href="https://t.me/highwayfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Telegram
                </a>
                <p className="pt-2 text-white/42">
                  {locale === "en" ? "Moscow / Saint Petersburg / Russia" : "Москва / Санкт-Петербург / Россия"}
                </p>
              </div>
            </div>
          </div>

          <div className="footer-meta mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/42 md:flex-row md:items-center md:justify-between">
            <p>© {year} Highway Films. {locale === "en" ? "All rights reserved." : "Все права защищены."}</p>
            <div className="footer-meta-links flex flex-wrap items-center gap-4">
              <Link href={withLocalePath("/privacy", locale)} className="footer-link">
                {locale === "en" ? "Privacy policy" : "Политика конфиденциальности"}
              </Link>
              <Link href={withLocalePath("/contacts", locale)} className="footer-link">
                {locale === "en" ? "Contact" : "Связаться"}
              </Link>
            </div>
            <div className="footer-controls flex items-center gap-4">
              <div className="footer-lang flex items-center gap-2">
                <Link href={ruHref} className={clsx("footer-lang-link", locale === "ru" && "is-active")}>
                  RU
                </Link>
                <span className="footer-lang-sep" aria-hidden>
                  /
                </span>
                <Link href={enHref} className={clsx("footer-lang-link", locale === "en" && "is-active")}>
                  EN
                </Link>
              </div>

              <ThemeToggle locale={locale} variant="footer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Footer() {
  const pathname = usePathname() || "/";
  const isEN = pathname.startsWith("/en");
  const normalizedPath = isEN ? pathname.replace(/^\/en(?!\w)/, "") || "/" : pathname;
  const ruHref = isEN ? normalizedPath : pathname;
  const enHref = isEN ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;
  const year = new Date().getFullYear();

  const company = [
    { href: "/about", ru: "Компания", en: "About" },
    { href: "/contacts", ru: "Контакты", en: "Contacts" },
    { href: "/brief", ru: "Бриф", en: "Brief" },
    { href: "/privacy", ru: "Политика", en: "Privacy" },
  ];

  const services = [
    { href: "/commercials", ru: "Реклама", en: "Commercials" },
    { href: "/corporate", ru: "Корпоративное", en: "Corporate" },
    { href: "/music-videos", ru: "Клипы", en: "Music Videos" },
  ];

  const withLocale = (href: string) => (isEN ? (href === "/" ? "/en" : `/en${href}`) : href);

  return (
    <footer className="footer-shell mt-16 border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]">
      <div className="container safe-px py-10 md:py-12">
        <div className="surface-panel px-6 py-8 md:px-8 md:py-9">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
            <div className="max-w-sm">
              <p className="font-display text-2xl text-white">Highway Films</p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                {isEN
                  ? "Full-cycle production for commercials, brand stories, corporate films, music videos, and AI visuals."
                  : "Студия для рекламы, брендовых историй, корпоративных фильмов, клипов и AI-визуала."}
              </p>
            </div>

            <div className="md:border-l md:border-white/8 md:pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {isEN ? "Menu" : "Меню"}
              </p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-white/70">
                {company.map((item) => (
                  <Link key={item.href} href={withLocale(item.href)} className="footer-link">
                    {isEN ? item.en : item.ru}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="md:border-l md:border-white/8 md:pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {isEN ? "Services" : "Услуги"}
              </p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-white/70">
                {services.map((item) => (
                  <Link key={item.href} href={withLocale(item.href)} className="footer-link">
                    {isEN ? item.en : item.ru}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="md:border-l md:border-white/8 md:pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {isEN ? "Contacts" : "Контакты"}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
                <a href="mailto:info@highwayfilms.ru" className="footer-link">
                  info@highwayfilms.ru
                </a>
                <a href="tel:+79991234567" className="footer-link">
                  +7 (999) 123-45-67
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
                  {isEN ? "Moscow / Saint Petersburg" : "Москва / Санкт-Петербург"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/42 md:flex-row md:items-center md:justify-between">
            <p>© {year} Highway Films. {isEN ? "All rights reserved." : "Все права защищены."}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={withLocale("/privacy")} className="footer-link">
                {isEN ? "Privacy policy" : "Политика конфиденциальности"}
              </Link>
              <Link href={withLocale("/contacts")} className="footer-link">
                {isEN ? "Contact" : "Связаться"}
              </Link>
            </div>
            <div className="footer-lang hidden items-center gap-2 md:flex">
              <Link href={ruHref} className={clsx("footer-lang-link", !isEN && "is-active")}>
                RU
              </Link>
              <span className="footer-lang-sep" aria-hidden>
                /
              </span>
              <Link href={enHref} className={clsx("footer-lang-link", isEN && "is-active")}>
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

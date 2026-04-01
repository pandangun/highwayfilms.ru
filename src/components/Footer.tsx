"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

const menuLinks = [
  { href: "/about", ru: "О нас", en: "About" },
  { href: "/contacts", ru: "Контакты", en: "Contacts" },
  { href: "/brief", ru: "Бриф", en: "Brief" },
  { href: "/articles", ru: "Статьи", en: "Articles" },
  { href: "/client", ru: "Вход для клиентов", en: "Client access" },
];

const serviceLinks = [
  { href: "/commercials", ru: "Реклама", en: "Commercials" },
  { href: "/corporate", ru: "Корпоративное", en: "Corporate" },
  { href: "/music-videos", ru: "Клипы", en: "Music videos" },
  { href: "/ai", ru: "AI", en: "AI" },
  { href: "/weddings", ru: "Свадьбы", en: "Weddings" },
];

function FooterThemeToggle({
  theme,
  onChange,
  isEN,
}: {
  theme: "dark" | "light";
  onChange: (nextTheme: "dark" | "light") => void;
  isEN: boolean;
}) {
  return (
    <div className="footer-theme-switch" role="tablist" aria-label={isEN ? "Theme" : "Тема"}>
      <button
        type="button"
        onClick={() => onChange("dark")}
        className={clsx("footer-theme-button", theme === "dark" && "is-active")}
        aria-label={isEN ? "Dark theme" : "Тёмная тема"}
        aria-pressed={theme === "dark"}
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onChange("light")}
        className={clsx("footer-theme-button", theme === "light" && "is-active")}
        aria-label={isEN ? "Light theme" : "Светлая тема"}
        aria-pressed={theme === "light"}
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname() || "/";
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isEN = pathname.startsWith("/en");
  const normalizedPath = isEN ? pathname.replace(/^\/en(?!\w)/, "") || "/" : pathname;
  const ruHref = isEN ? normalizedPath : pathname;
  const enHref = isEN ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;
  const year = new Date().getFullYear();

  const withLocale = (href: string) => (isEN ? (href === "/" ? "/en" : `/en${href}`) : href);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setTheme(root.dataset.theme === "light" ? "light" : "dark");
    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<"dark" | "light">).detail;
      setTheme(nextTheme === "light" ? "light" : "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("site-theme-change", handleThemeChange as EventListener);

    return () => {
      observer.disconnect();
      window.removeEventListener("site-theme-change", handleThemeChange as EventListener);
    };
  }, []);

  const applyTheme = (nextTheme: "dark" | "light") => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    window.dispatchEvent(new CustomEvent("site-theme-change", { detail: nextTheme }));
  };

  return (
    <footer className="footer-shell mt-16 border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]">
      <div className="container safe-px py-10 md:py-12">
        <div className="surface-panel px-6 py-8 md:px-8 md:py-9">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
            <div className="max-w-sm">
              <p className="font-display text-2xl text-white">Highway Films</p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                {isEN
                  ? "Full-cycle production for commercials, brand stories, corporate films, music videos, weddings, and AI visuals."
                  : "Студия полного цикла для рекламы, брендовых историй, корпоративных фильмов, клипов, свадебной съёмки и AI-визуала."}
              </p>
            </div>

            <div className="md:border-l md:border-white/8 md:pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {isEN ? "Menu" : "Меню"}
              </p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-white/70">
                {menuLinks.map((item) => (
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
                {serviceLinks.map((item) => (
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
                  {isEN ? "Moscow / Saint Petersburg / Russia" : "Москва / Санкт-Петербург / Россия"}
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
            <div className="footer-controls hidden items-center gap-4 md:flex">
              <div className="footer-lang flex items-center gap-2">
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

              <FooterThemeToggle theme={theme} onChange={applyTheme} isEN={isEN} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

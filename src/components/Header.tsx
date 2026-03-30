"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/about", ru: "Компания", en: "About" },
  { href: "/commercials", ru: "Реклама", en: "Commercials" },
  { href: "/corporate", ru: "Корпоративное", en: "Corporate" },
  { href: "/music-videos", ru: "Клипы", en: "Music Videos" },
  { href: "/ai", ru: "AI", en: "AI" },
  { href: "/weddings", ru: "Свадьбы", en: "Weddings" },
  { href: "/contacts", ru: "Контакты", en: "Contacts" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);

  const isEN = pathname.startsWith("/en");
  const normalizedPath = isEN ? pathname.replace(/^\/en(?!\w)/, "") || "/" : pathname;
  const withLocale = (href: string) => (isEN ? (href === "/" ? "/en" : `/en${href}`) : href);
  const ruHref = isEN ? normalizedPath : pathname;
  const enHref = isEN ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const NavLinks = ({ vertical = false }: { vertical?: boolean }) => (
    <>
      {items.map((item) => {
        const active = item.href === "/" ? normalizedPath === "/" : normalizedPath.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={withLocale(item.href)}
            onClick={() => setIsOpen(false)}
            className={clsx("nav-link", vertical && "nav-link--vertical", active && "is-active")}
          >
            {isEN ? item.en : item.ru}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      <header className="header-shell fixed inset-x-0 top-0 z-[60] pt-safe" role="banner">
        <div className="container">
          <div className="header-rail flex h-[var(--header-h)] items-center gap-3 px-3 md:px-4">
            <Link
              href={isEN ? "/en" : "/"}
              className="brand-mark header-brand rounded-full px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label={isEN ? "Go to home" : "На главную"}
            >
              <span className="brand-mark__dot" aria-hidden />
              <span className="brand-mark__text">HIGHWAY FILMS</span>
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <nav className="header-cluster relative flex items-center gap-1.5 px-3 py-2" aria-label={isEN ? "Main menu" : "Главное меню"}>
                <NavLinks />
              </nav>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Link href={withLocale("/brief")} className="header-cta">
                {isEN ? "Brief" : "Бриф"}
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="tap-target ml-auto rounded-2xl border border-white/10 bg-white/[0.05] p-2 text-white transition hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
              aria-label={isOpen ? (isEN ? "Close menu" : "Закрыть меню") : (isEN ? "Open menu" : "Открыть меню")}
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-x-0 z-40 bg-black/72 backdrop-blur-sm transition-opacity duration-200 md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "0",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={isEN ? "Mobile menu" : "Мобильное меню"}
        className={clsx(
          "drawer-panel fixed right-0 z-[70] w-[88vw] max-w-[400px] transition-transform duration-200 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "env(safe-area-inset-bottom)",
        }}
      >
        <nav className="flex h-full flex-col p-4" aria-label={isEN ? "Main menu" : "Главное меню"}>
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <Link
              href={isEN ? "/en" : "/"}
              onClick={() => setIsOpen(false)}
              className="brand-mark header-brand rounded-full px-0 py-0 text-white"
            >
              <span className="brand-mark__dot" aria-hidden />
              <span className="brand-mark__text">HIGHWAY FILMS</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="tap-target rounded-2xl border border-white/10 bg-white/[0.05] p-2 text-white transition hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label={isEN ? "Close menu" : "Закрыть меню"}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <NavLinks vertical />
          </div>

          <Link
            href={withLocale("/brief")}
            onClick={() => setIsOpen(false)}
            className="header-cta mt-5 w-full justify-center py-3 text-sm"
          >
            {isEN ? "Open brief" : "Открыть бриф"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="mt-auto border-t border-white/10 pt-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">
              {isEN ? "Language" : "Язык"}
            </p>
            <div className="nav-locale-row mt-3">
              <Link
                href={ruHref}
                onClick={() => setIsOpen(false)}
                className={clsx("nav-locale-link", !isEN && "is-active")}
              >
                RU
              </Link>
              <Link
                href={enHref}
                onClick={() => setIsOpen(false)}
                className={clsx("nav-locale-link", isEN && "is-active")}
              >
                EN
              </Link>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

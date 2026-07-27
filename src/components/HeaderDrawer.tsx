"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { type SiteNavItem, isActivePath, withLocalePath } from "@/components/siteNavigation";

type HeaderDrawerProps = {
  locale: "ru" | "en";
  pathname: string;
  items: SiteNavItem[];
};

export default function HeaderDrawer({ locale, pathname, items }: HeaderDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const homeHref = locale === "en" ? "/en" : "/";
  const briefHref = withLocalePath("/brief", locale);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="header-mobile-toggle tap-target ml-auto p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
        aria-label={isOpen ? (locale === "en" ? "Close menu" : "Закрыть меню") : locale === "en" ? "Open menu" : "Открыть меню"}
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={clsx(
          "fixed inset-x-0 z-40 bg-black/72 backdrop-blur-sm transition-opacity duration-200 md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
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
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen || undefined}
        aria-label={locale === "en" ? "Mobile menu" : "Мобильное меню"}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={clsx(
          "drawer-panel fixed right-0 z-[var(--z-drawer)] w-[88vw] max-w-[400px] transition-[opacity,transform,visibility] duration-200 md:hidden",
          isOpen && "is-open",
          isOpen ? "visible translate-x-0 opacity-100" : "invisible pointer-events-none translate-x-0 opacity-0",
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "env(safe-area-inset-bottom)",
        }}
      >
        <nav
          className={clsx("drawer-nav flex h-full flex-col p-4", isOpen && "is-open")}
          aria-label={locale === "en" ? "Main menu" : "Главное меню"}
        >
          <div className="drawer-top mb-5 flex items-center justify-between gap-3 pb-4">
            <Link
              href={homeHref}
              onClick={() => setIsOpen(false)}
              className="brand-mark header-brand rounded-full px-0 py-0 text-white"
            >
              <span className="brand-mark__dot" aria-hidden />
              <span className="brand-mark__text">HIGHWAY FILMS</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="header-mobile-toggle tap-target p-2 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label={locale === "en" ? "Close menu" : "Закрыть меню"}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="drawer-links flex flex-col gap-1.5">
            {items.map((item, index) => {
              const active = isActivePath(item.href, pathname);

              return (
                <Link
                  key={item.href}
                  href={withLocalePath(item.href, locale)}
                  onClick={() => setIsOpen(false)}
                  className={clsx("nav-link nav-link--vertical", active && "is-active")}
                  aria-current={active ? "page" : undefined}
                  style={{ "--nav-index": index } as CSSProperties}
                >
                  {locale === "en" ? item.en : item.ru}
                </Link>
              );
            })}
          </div>

          <Link
            href={briefHref}
            onClick={() => setIsOpen(false)}
            className={clsx("header-cta drawer-cta mt-6 w-full justify-center py-3 text-sm", isOpen && "is-open")}
          >
            {locale === "en" ? "Open brief" : "Открыть бриф"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="drawer-mobile-controls">
            <ThemeToggle locale={locale} variant="header" compact />
          </div>
        </nav>
      </aside>
    </>
  );
}

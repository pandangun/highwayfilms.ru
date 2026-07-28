"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import HeaderDrawer from "@/components/HeaderDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import {
  headerNavItems,
  getLocaleFromPath,
  isActivePath,
  normalizeLocalePath,
  withLocalePath,
} from "@/components/siteNavigation";

/**
 * Клиентский компонент ради usePathname(). Раньше путь брался из заголовка
 * x-pathname через headers(), а это переводит весь layout в динамический
 * рендер — из-за чего ни одна страница сайта не могла быть статикой.
 * usePathname() работает и при пререндере, статику не ломает.
 */
export default function Header() {
  const currentPath = usePathname() ?? "/";
  const locale = getLocaleFromPath(currentPath);
  const pathname = normalizeLocalePath(currentPath);
  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <header className="header-shell fixed inset-x-0 top-0 z-[var(--z-header)] pt-safe" role="banner">
      <div className="container">
        <div className="header-rail flex min-h-[var(--header-h)] flex-wrap items-center gap-3 px-3 py-3 md:px-4 xl:h-[var(--header-h)] xl:flex-nowrap xl:py-0">
          <Link
            href={homeHref}
            className="brand-mark header-brand rounded-full px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={locale === "en" ? "Go to home" : "На главную"}
          >
            <span className="brand-mark__dot" aria-hidden />
            <span className="brand-mark__text">HIGHWAY FILMS</span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            <nav
              className="header-cluster relative flex items-center gap-1.5 px-3 py-2"
              aria-label={locale === "en" ? "Main menu" : "Главное меню"}
            >
              {headerNavItems.map((item, index) => {
                const active = isActivePath(item.href, pathname);

                return (
                  <Link
                    key={item.href}
                    href={withLocalePath(item.href, locale)}
                    className={clsx("nav-link", active && "is-active")}
                    aria-current={active ? "page" : undefined}
                    style={{ "--nav-index": index } as CSSProperties}
                  >
                    {locale === "en" ? item.en : item.ru}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <ThemeToggle locale={locale} variant="header" compact />
            <Link href={withLocalePath("/brief", locale)} className="header-cta">
              {locale === "en" ? "Brief" : "Бриф"}
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>

          <HeaderDrawer locale={locale} pathname={pathname} items={headerNavItems} />

          <div className="header-tablet-row hidden basis-full md:block xl:hidden">
            <nav
              className="header-tablet-nav relative flex flex-wrap gap-2"
              aria-label={locale === "en" ? "Main menu" : "Главное меню"}
            >
              {headerNavItems.map((item, index) => {
                const active = isActivePath(item.href, pathname);

                return (
                  <Link
                    key={item.href}
                    href={withLocalePath(item.href, locale)}
                    className={clsx("nav-link nav-link--tablet", active && "is-active")}
                    aria-current={active ? "page" : undefined}
                    style={{ "--nav-index": index } as CSSProperties}
                  >
                    {locale === "en" ? item.en : item.ru}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

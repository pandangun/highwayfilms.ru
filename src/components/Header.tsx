"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type CSSProperties } from "react";
import clsx from "clsx";
import HeaderDrawer from "@/components/HeaderDrawer";
import { siteStrings } from "@/content/site";
import {
  getLocaleFromPath,
  headerNavItems,
  isActivePath,
  normalizeLocalePath,
  withLocalePath,
} from "@/components/siteNavigation";

/** Порог, после которого шапка получает чёрную подложку. */
const SCROLL_THRESHOLD = 24;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Клиентский компонент ради usePathname(): путь из заголовков запроса
 * перевёл бы весь layout в динамический рендер, а usePathname() работает
 * и при пререндере.
 *
 * Прокрутка читается через useSyncExternalStore, а не через setState в
 * эффекте: так нет лишнего рендера при монтировании и рассинхрона при
 * гидрации — на сервере шапка всегда прозрачная.
 */
export default function Header() {
  const currentPath = usePathname() ?? "/";
  const locale = getLocaleFromPath(currentPath);
  const pathname = normalizeLocalePath(currentPath);
  const t = siteStrings[locale];

  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );

  return (
    <header className="hdr" data-scrolled={isScrolled} role="banner">
      <div className="wrap hdr__bar">
        <Link href={withLocalePath("/", locale)} className="brand" aria-label={t.home}>
          Highway Films
        </Link>

        <nav className="hdr__nav" aria-label={t.menuLabel}>
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

        <div className="hdr__actions">
          <Link
            href={withLocalePath("/client", locale)}
            className={clsx("nav-link hdr__client", isActivePath("/client", pathname) && "is-active")}
          >
            {t.client}
          </Link>
          <Link href={withLocalePath("/brief", locale)} className="btn btn--primary btn--sm hdr__cta">
            {t.brief}
          </Link>
          <HeaderDrawer locale={locale} pathname={pathname} currentPath={currentPath} />
        </div>
      </div>
    </header>
  );
}

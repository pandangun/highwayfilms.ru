"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { contacts, siteStrings } from "@/content/site";
import {
  type Locale,
  getAlternateLocaleHref,
  headerNavItems,
  isActivePath,
  withLocalePath,
} from "@/components/siteNavigation";

type HeaderDrawerProps = {
  locale: Locale;
  /** Путь без префикса /en — для подсветки активного пункта. */
  pathname: string;
  /** Путь как есть — для переключателя языка. */
  currentPath: string;
};

/**
 * Меню на телефоне и планшете (до 1280 px).
 *
 * Анимация пунктов — та же, что была: они выезжают по очереди, задержка
 * считается от --nav-index. Изменилась только сцена: вместо узкой панели
 * с подложкой — чёрный зал и пункты антиквой.
 */
export default function HeaderDrawer({ locale, pathname, currentPath }: HeaderDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = siteStrings[locale];
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    // Прокрутку под меню гасим перехватом колеса и свайпа, а не overflow:
    // hidden. Смена overflow у корня заставляла браузер заново раскладывать
    // всю длинную страницу ровно в первый кадр анимации — отсюда рывок.
    // Внутри самого меню прокрутка остаётся.
    const drawer = document.getElementById("site-drawer");
    const blockScroll = (event: Event) => {
      if (drawer && event.target instanceof Node && drawer.contains(event.target)) return;
      event.preventDefault();
    };
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    // Под меню видео не видно, а декодирование 1080p и сцена трассы
    // отнимали кадры у анимации. Ставим на паузу и возвращаем после.
    const paused: HTMLVideoElement[] = [];
    document.querySelectorAll("video").forEach((video) => {
      if (!video.paused) {
        video.pause();
        paused.push(video);
      }
    });
    window.dispatchEvent(new CustomEvent("hf:menu", { detail: true }));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      paused.forEach((video) => {
        void video.play().catch(() => {
          /* браузер вправе отказать */
        });
      });
      window.dispatchEvent(new CustomEvent("hf:menu", { detail: false }));
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="hdr__burger"
        aria-label={isOpen ? t.menuClose : t.menuOpen}
        aria-expanded={isOpen}
        aria-controls="site-drawer"
      >
        <Menu className="h-6 w-6" strokeWidth={1.25} aria-hidden />
      </button>

      <div className={clsx("drawer-scrim", isOpen && "is-open")} onClick={close} aria-hidden />

      <aside
        id="site-drawer"
        className={clsx("drawer", isOpen && "is-open")}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen || undefined}
        aria-label={t.menuLabel}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="drawer__top">
          <Link href={withLocalePath("/", locale)} onClick={close} className="brand">
            Highway Films
          </Link>
          <button type="button" onClick={close} className="hdr__burger" aria-label={t.menuClose}>
            <X className="h-6 w-6" strokeWidth={1.25} aria-hidden />
          </button>
        </div>

        <nav className="drawer__links" aria-label={t.menuLabel}>
          {headerNavItems.map((item, index) => {
            const active = isActivePath(item.href, pathname);

            return (
              <Link
                key={item.href}
                href={withLocalePath(item.href, locale)}
                onClick={close}
                className={clsx("drawer-link", active && "is-active")}
                aria-current={active ? "page" : undefined}
                style={{ "--nav-index": index } as CSSProperties}
              >
                {locale === "en" ? item.en : item.ru}
              </Link>
            );
          })}
        </nav>

        <div className="drawer__foot">
          <Link href={withLocalePath("/brief", locale)} onClick={close} className="btn btn--primary btn--block">
            {t.briefLong}
          </Link>

          <div className="drawer__row">
            <Link href={withLocalePath("/client", locale)} onClick={close} className="link-line">
              {locale === "en" ? "Client room" : "Кабинет клиента"}
            </Link>
            <div className="lang-switch">
              <Link
                href={getAlternateLocaleHref(currentPath, "ru")}
                onClick={close}
                className={clsx(locale === "ru" && "is-active")}
              >
                RU
              </Link>
              <Link
                href={getAlternateLocaleHref(currentPath, "en")}
                onClick={close}
                className={clsx(locale === "en" && "is-active")}
              >
                EN
              </Link>
            </div>
          </div>

          <div className="drawer__row">
            <a href={contacts.phoneHref} className="num">
              {contacts.phone}
            </a>
            <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

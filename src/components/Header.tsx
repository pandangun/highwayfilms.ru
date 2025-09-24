"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Текущая локаль берётся из URL
  const isEN = pathname.startsWith("/en");

  // Нормализованный путь без локали (для подсветки активных ссылок)
  const normalizedPath = useMemo(
    () => (isEN ? pathname.replace(/^\/en(?!\w)/, "") || "/" : pathname),
    [pathname, isEN]
  );

  // Автозакрытие бургер-меню при навигации
  useEffect(() => setIsOpen(false), [pathname]);

  // Блокировка скролла под шторкой (iOS-friendly)
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const y = window.scrollY;
    root.style.position = "fixed";
    root.style.width = "100%";
    root.style.top = `-${y}px`;
    return () => {
      const stored = root.style.top;
      root.style.position = "";
      root.style.width = "";
      root.style.top = "";
      const backY = stored ? Math.abs(parseInt(stored, 10)) : 0;
      window.scrollTo(0, backY);
    };
  }, [isOpen]);

  // Переключение локали: добавляем/убираем префикс /en
  const switchLocale = (target: "ru" | "en") => {
    if (target === "en" && !isEN) {
      const next = pathname === "/" ? "/en" : `/en${pathname}`;
      router.push(next);
    } else if (target === "ru" && isEN) {
      const next = pathname.replace(/^\/en(?!\w)/, "") || "/";
      router.push(next);
    }
    setIsOpen(false);
  };

  // Навигация: один набор slug'ов, подписи — по локали
  const items = [
    { href: "/about", ru: "Компания", en: "About" },
    { href: "/videoproduction", ru: "Видеопродакшн", en: "Production" },
    { href: "/commercials", ru: "Реклама", en: "Commercials" },
    { href: "/corporate", ru: "Корпоративное", en: "Corporate" },
    { href: "/music-videos", ru: "Клипы", en: "Music Videos" },
    { href: "/ai", ru: "AI", en: "AI" },
    { href: "/weddings", ru: "Свадьбы", en: "Weddings" },
    { href: "/contacts", ru: "Контакты", en: "Contacts" },
  ];

  const withLocale = (href: string) => (isEN ? (href === "/" ? "/en" : `/en${href}`) : href);

  const headerHeight = "h-14"; // 56px

  const NavLinks = ({ vertical = false }: { vertical?: boolean }) => (
    <>
      {items.map((item) => {
        const active =
          item.href === "/"
            ? normalizedPath === "/"
            : normalizedPath.startsWith(item.href);

        const label = isEN ? item.en : item.ru;
        return (
          <Link
            key={item.href}
            href={withLocale(item.href)}
            className={clsx(
              "nav-link",
              vertical && "nav-link--vertical",
              active && "is-active"
            )}
          >
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Fixed header */}
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-[60]",
          "backdrop-blur-md supports-[backdrop-filter]:bg-black/35 bg-black/75",
          "border-b border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]",
          "pt-safe",
          headerHeight
        )}
        role="banner"
      >
        <div className="container flex h-full items-center justify-between gap-3">
          {/* Логотип */}
          <Link
            href={isEN ? "/en" : "/"}
            className="rounded-lg px-1.5 py-1 text-base font-semibold tracking-wide text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={isEN ? "Go to home" : "На главную"}
          >
            HIGHWAY FILMS
          </Link>

          {/* Десктоп-меню */}
          <nav className="relative hidden items-center gap-1.5 md:flex" aria-label="Главное меню">
            <NavLinks />
          </nav>

          {/* Правый блок: язык + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Языковой переключатель */}
            <div className="rounded-xl border border-white/10 text-[12px] overflow-hidden">
              <button
                type="button"
                onClick={() => switchLocale("ru")}
                className={clsx(
                  "px-3 py-1",
                  !isEN ? "bg-white/15 text-white" : "hover:bg-white/10 text-muted"
                )}
                aria-pressed={!isEN}
                aria-label="Русская версия"
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={clsx(
                  "px-3 py-1",
                  isEN ? "bg-white/15 text-white" : "hover:bg-white/10 text-muted"
                )}
                aria-pressed={isEN}
                aria-label="English version"
              >
                EN
              </button>
            </div>

            <Link
              href={withLocale("/contacts")}
              className="btn btn-primary hidden md:inline-flex rounded-xl px-3.5 py-2 text-sm font-medium"
            >
              {isEN ? "Contact" : "Связаться"}
            </Link>
          </div>

          {/* Бургер */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="tap-target md:hidden rounded-lg p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={isOpen ? (isEN ? "Close menu" : "Закрыть меню") : (isEN ? "Open menu" : "Открыть меню")}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </header>

      {/* Мобильный оверлей */}
      <div
        className={clsx(
          "fixed inset-x-0 z-40 bg-black/70 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "0",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Мобильная шторка */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={isEN ? "Mobile menu" : "Мобильное меню"}
        className={clsx(
          "fixed right-0 z-[70] w-[86vw] max-w-[380px] bg-zinc-950 shadow-2xl transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "env(safe-area-inset-bottom)",
        }}
      >
        <nav className="flex flex-col gap-1 p-4" aria-label={isEN ? "Main menu" : "Главное меню"}>
          <NavLinks vertical />

          {/* Языковой переключатель (моб.) */}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => switchLocale("ru")}
              className={clsx("nav-link nav-link--vertical", !isEN && "is-active")}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={clsx("nav-link nav-link--vertical", isEN && "is-active")}
            >
              EN
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

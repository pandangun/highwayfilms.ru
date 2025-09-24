"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

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

  const nav = useMemo(
    () => [
      { href: "/about", label: "Компания" },
      { href: "/videoproduction", label: "Видеопродакшн" },
      { href: "/commercials", label: "Реклама" },
      { href: "/corporate", label: "Корпоративное" },
      { href: "/music-videos", label: "Клипы" },
      { href: "/ai", label: "AI" },
      { href: "/weddings", label: "Свадьбы" },
      { href: "/contacts", label: "Контакты" },
    ],
    []
  );

  const headerHeight = "h-14"; // 56px

  const NavLinks = ({ vertical = false }: { vertical?: boolean }) => (
    <>
      {nav.map((item) => {
        const active = item.href === "/"
          ? pathname === "/"
          : pathname.startsWith(item.href);

        const base = vertical ? "nav-link nav-link--vertical" : "nav-link text-sm";

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(base, active && "is-active")}
          >
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
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
        <div className="container flex h-full items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-lg px-1.5 py-1 text-base font-semibold tracking-wide text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="На главную"
          >
            HIGHWAY FILMS
          </Link>

          {/* Десктоп-меню */}
          <nav className="relative hidden items-center gap-5 md:flex" aria-label="Главное меню">
            <NavLinks />
          </nav>

          {/* Правый блок: язык + CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {/* языковой переключатель без рамок */}
            <div className="flex items-center gap-3 text-[12px]">
              <Link href="/weddings" className={clsx("nav-link", !pathname.startsWith("/en") && "is-active")}>
                RU
              </Link>
              <span aria-hidden="true" className="text-white/25">/</span>
              <Link href="/en/weddings" className={clsx("nav-link", pathname.startsWith("/en") && "is-active")}>
                EN
              </Link>
            </div>
          </div>

          {/* Бургер */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="tap-target md:hidden rounded-lg p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
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
        aria-label="Мобильное меню"
        className={clsx(
          "fixed right-0 z-[70] w-[86vw] max-w-[380px] bg-zinc-950 shadow-2xl transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "env(safe-area-inset-bottom)",
        }}
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Мобильное меню">
          <NavLinks vertical />
          <div className="mt-3 flex items-center gap-3">
            <Link href="/weddings" className={clsx("nav-link nav-link--vertical", !pathname.startsWith("/en") && "is-active")}>RU</Link>
            <Link href="/en/weddings" className={clsx("nav-link nav-link--vertical", pathname.startsWith("/en") && "is-active")}>EN</Link>
          </div>
          <Link href="/contacts" className="btn-primary mt-3 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium">
            Связаться
          </Link>
        </nav>
      </aside>
    </>
  );
}

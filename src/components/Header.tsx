"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Закрывать меню при смене роута
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Лочим скролл фона, когда открыта шторка (iOS критично)
  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      const scrollY = window.scrollY;
      root.style.position = "fixed";
      root.style.width = "100%";
      root.style.top = `-${scrollY}px`;
      root.classList.add("overflow-hidden");
      return () => {
        root.classList.remove("overflow-hidden");
        root.style.position = "";
        root.style.width = "";
        root.style.top = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const nav = [
    { href: "/about", label: "Компания" }, // первая
    { href: "/videoproduction", label: "Видеопродакшн" },
    { href: "/commercials", label: "Реклама" },
    { href: "/corporate", label: "Корпоративное" },
    { href: "/music-videos", label: "Клипы" },
    { href: "/weddings", label: "Свадьбы" },
    { href: "/contacts", label: "Контакты" },
  ];

  const headerHeight = "h-14"; // 56px

  const NavLinks = ({ vertical = false }: { vertical?: boolean }) => (
    <>
      {nav.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const base =
          "text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              base,
              vertical
                ? "block rounded-lg px-4 py-3 text-base"
                : "px-1.5 py-1",
              active ? "text-white" : "text-neutral-300 hover:text-white/90"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header
      className={clsx(
        // фиксированный, с подкладкой под safe-area
        "fixed top-0 inset-x-0 z-[60]",
        "supports-[backdrop-filter]:bg-black/40 bg-black/80", // повышаем контраст на iOS
        "backdrop-blur-md border-b border-white/10",
        "pt-safe", // см. глобальный css ниже
        headerHeight
      )}
      role="banner"
    >
      <div className="container flex h-full items-center justify-between">
        {/* Логотип — увеличим тап-таргет */}
        <Link
          href="/"
          className="font-semibold tracking-wide text-white text-base md:text-lg py-2"
          aria-label="На главную"
        >
          HIGHWAY FILMS
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden md:flex gap-6" aria-label="Главное меню">
          <NavLinks />
        </nav>

        {/* Бургер (мобилка) — делаем крупнее и с понятным aria */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden text-white text-[28px] leading-none p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Оверлей за шторкой — кликабельный, с плавной opacity */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Правая шторка-меню (ниже хедера, учитывает safe-area) */}
      <aside
        id="mobile-drawer"
        className={clsx(
          "fixed right-0 z-[70] w-[88vw] max-w-[400px] md:hidden",
          "top-[calc(theme(spacing.14)+env(safe-area-inset-top))] bottom-0", // ниже хедера с учётом челки
          "bg-zinc-950/98 border-l border-white/10",
          "transition-transform duration-300 will-change-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Мобильное меню">
          <NavLinks vertical />
        </nav>
      </aside>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Закрываем меню при смене роутов
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Лочим скролл фона (важно для iOS)
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

  const nav = [
    { href: "/about", label: "Компания" },
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
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              vertical ? "block rounded-lg px-4 py-3 text-base" : "px-1.5 py-1 text-sm",
              active ? "text-white" : "text-neutral-300 hover:text-white/90",
              "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Фикс-хедер */}
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-[60]",
          "supports-[backdrop-filter]:bg-black/40 bg-black/80 backdrop-blur-md",
          "border-b border-white/10 pt-safe",
          headerHeight
        )}
        role="banner"
      >
        <div className="container flex h-full items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-wide text-white text-base md:text-lg py-2"
            aria-label="На главную"
          >
            HIGHWAY FILMS
          </Link>

          <nav className="hidden md:flex gap-6" aria-label="Главное меню">
            <NavLinks />
          </nav>

          <button
            onClick={() => setIsOpen(v => !v)}
            className="md:hidden text-white text-[28px] leading-none p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </header>

      {/* Оверлей — начинается под шапкой */}
      <div
        className={clsx(
          "fixed inset-x-0 z-40 md:hidden bg-black/70 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "0",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Правая шторка под бургером у правой стенки */}
      <aside
        id="mobile-drawer"
        className={clsx(
          "fixed right-0 z-[70] w-[86vw] max-w-[380px] md:hidden",
          "bg-zinc-950",
          "transition-transform duration-300 will-change-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          top: "calc(var(--header-h) + env(safe-area-inset-top))",
          bottom: "env(safe-area-inset-bottom)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Мобильное меню">
          <NavLinks vertical />
        </nav>
      </aside>
    </>
  );
}

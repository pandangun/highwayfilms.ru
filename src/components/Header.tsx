"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Закрывать меню при переходе по ссылке/смене роута
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  return (
    <header className={clsx("fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10", headerHeight)}>
      <div className="container flex h-full items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="font-semibold tracking-wide text-white">
          HIGHWAY FILMS
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden md:flex gap-6">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm transition",
                  active ? "text-white" : "text-neutral-300 hover:text-white/90"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Бургер (только мобилка) */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-label="Открыть меню"
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Оверлей за шторкой */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Правая шторка-меню (начинается ниже хедера) */}
      <aside
        id="mobile-drawer"
        className={clsx(
          "fixed right-0 z-50 w-[82vw] max-w-[360px] md:hidden",
          "top-14 bottom-0", // ниже хедера
          "bg-black/95 border-l border-white/10",
          "transition-transform duration-300 will-change-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "block rounded-lg px-4 py-3 text-base",
                  active
                    ? "bg-white/10 text-white"
                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </header>
  );
}

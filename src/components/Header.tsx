"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const nav = [
    { href: "/about", label: "Компания" }, // ← первая
    { href: "/videoproduction", label: "Видеопродакшн" },
    { href: "/commercials", label: "Реклама" },
    { href: "/corporate", label: "Корпоративное" },
    { href: "/music-videos", label: "Клипы" },
    { href: "/weddings", label: "Свадьбы" }, // ← новая вкладка
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20">
      <div className="container flex h-14 items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className="font-semibold tracking-wide text-white z-50"
          onClick={() => setIsOpen(false)}
        >
          HIGHWAY FILMS
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden gap-6 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm transition",
                  active
                    ? "text-white"
                    : "text-neutral-300 hover:text-white/90"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Бургер для мобилы */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-6 text-2xl text-white md:hidden">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  active
                    ? "text-white font-semibold"
                    : "text-neutral-300 hover:text-white/90"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

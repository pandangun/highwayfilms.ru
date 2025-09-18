"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  const nav = [
    { href: "/about", label: "Компания" },                // ← первая
    { href: "/videoproduction", label: "Видеопродакшн" },
    { href: "/commercials", label: "Реклама" },
    { href: "/corporate", label: "Корпоративное" },
    { href: "/music-videos", label: "Клипы" },
    { href: "/weddings", label: "Свадьбы" },              // ← новая вкладка
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-white/10">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">
          HIGHWAY FILMS
        </Link>

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
      </div>
    </header>
  );
}

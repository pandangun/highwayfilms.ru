// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-base bg-black/10">
      <div className="container safe-px py-8 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Лево: копирайт */}
          <div className="text-sm text-muted">
            © {year} Highway Films · Москва / Санкт-Петербург
          </div>

          {/* Право: ссылки */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" aria-label="Footer">
            <Link href="/privacy" className="hover:underline">
              Политика конфиденциальности
            </Link>

            <span className="text-muted">·</span>

            <Link href="/contacts" className="hover:underline">
              Контакты
            </Link>

            <span className="text-muted">·</span>

            {/* Ненавязчивая дверь в лабораторию (там спрятаны игры и викторина) */}
            <Link
              href="/easter-egg"
              prefetch={false}
              className="text-muted hover:underline"
              aria-label="Технические заметки / лаборатория"
              rel="nofollow"
            >
              Тех-блок
            </Link>

            <span className="text-muted">·</span>

            <a
              href="https://t.me/highwayfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="Написать в Telegram"
            >
              Telegram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

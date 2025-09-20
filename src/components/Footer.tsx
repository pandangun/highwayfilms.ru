// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-base mt-16">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        {/* Лого + копирайт */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <span className="font-semibold text-fgc">© {new Date().getFullYear()} Highway Films</span>
          <span className="hidden md:inline-block">·</span>
          <span>Москва · Санкт-Петербург</span>
        </div>

        {/* Навигация */}
        <nav className="flex flex-wrap justify-center gap-3">
          <Link href="/privacy" className="hover:underline">
            Политика конфиденциальности
          </Link>
          <span className="text-muted">·</span>
          <Link href="/contacts" className="hover:underline">
            Контакты
          </Link>
          <span className="text-muted">·</span>
          <Link href="/easter-egg" className="text-muted hover:underline">
            Тех. заметки
          </Link>
        </nav>
      </div>
    </footer>
  );
}

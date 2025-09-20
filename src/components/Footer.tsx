// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-base bg-black/10">
      <div className="container py-8 md:py-10 safe-px">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Лево: копирайт */}
          <div className="text-sm text-muted">
            © {year} Highway Films
          </div>

          {/* Право: ссылки */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link href="/privacy" className="hover:underline">
              Политика конфиденциальности
            </Link>

            <span className="text-muted">·</span>

            <Link href="/contacts" className="hover:underline">
              Контакты
            </Link>

            <span className="text-muted">·</span>

            {/* Пасхалки — без явного маркетинга */}
            <Link href="/easter-egg" className="text-muted hover:underline" aria-label="Технические заметки / пасхалка">
              Тех. заметки
            </Link>

            <span className="text-muted">·</span>

            <Link
              href="/easter-egg/runner-pro"
              className="text-muted hover:underline"
              aria-label="Мини-игра Runner Pro"
              prefetch={false}
            >
              Мини-игра
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

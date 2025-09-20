// app/easter-egg/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Тех-блок — мини-игры и викторина | Highway Films",
  description:
    "Пасхалки Highway Films: Runner Pro, КиноСет и Викторина про видеопродакшн.",
  robots: { index: false, follow: true },
};

function Tile({
  title,
  desc,
  href,
  badge,
}: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="card p-5 md:p-6 hover:border-strong transition block"
      prefetch={false}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {badge && (
          <span className="rounded-md px-2 py-0.5 text-xs bg-white/10 border border-base">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-muted">{desc}</p>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Тех-блок · Мини-игры</h1>
      <p className="lead measure mt-2">
        Наши маленькие развлечения и пасхалки. Заходи, тестируй физику, делись
        скринами и идеями — будем расширять.
      </p>

      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Tile
          title="Runner Pro"
          desc="Платформер с плавной камерой: монеты, враги, чекпоинты, zoom и мобильный джойстик."
          href="/easter-egg/runner-pro"
          badge="Action"
        />
        <Tile
          title="КиноСет"
          desc="2D-аркада про площадку: собирай шоты, следи за батареей и избегай шумных зон."
          href="/easter-egg/cinema"
          badge="New"
        />
        <Tile
          title="Викторина по продакшну"
          desc="Лёгкий квиз: свет, звук, препрод, сет-термины. Проверим, кто тут «грип», а кто продюсер."
          href="/easter-egg/quiz"
          badge="Soon"
        />
      </section>

      <p className="mt-6 text-sm text-muted">
        P.S. Все проекты работают локально в Canvas, без внешних зависимостей.
      </p>
    </main>
  );
}

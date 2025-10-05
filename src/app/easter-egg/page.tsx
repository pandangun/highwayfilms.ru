import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пасхалки и мини-игры Highway Films",
  description:
    "Runner Pro, КиноСет и киновикторина — пасхалки команды Highway Films. Одностраничные игры на Canvas, адаптированные под клавиатуру и тач.",
  robots: { index: false, follow: true },
};

type TileProps = {
  title: string;
  desc: string;
  href: string;
  badge?: string;
};

function Tile({ title, desc, href, badge }: TileProps) {
  return (
    <Link
      href={href}
      className="card block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/25 hover:bg-white/8"
      prefetch={false}
    >
      <header className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {badge && (
          <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-xs uppercase tracking-wide text-white/70">
            {badge}
          </span>
        )}
      </header>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
    </Link>
  );
}

const TILES: TileProps[] = [
  {
    title: "Каталог игр",
    desc: "Все пасхалки в одном месте — 3D-карусель с Runner Pro, КиноСетом и викториной.",
    href: "/easter-egg/games",
    badge: "New",
  },
  {
    title: "Runner Pro",
    desc: "Бесконечный раннер с плавной камерой, zoom-эффектом, чекпоинтами и мобильным управлением.",
    href: "/easter-egg/runner-pro",
    badge: "Action",
  },
  {
    title: "КиноСет",
    desc: "Стелсовая аркада про съёмочную площадку: собирайте шоты, экономьте батарею и избегайте шумовых ловушек.",
    href: "/easter-egg/cinema",
  },
  {
    title: "Киновикторина",
    desc: "10 вопросов о кино и продакшене: классика, режиссёры, техника и backstage. Пройдите за пару минут.",
    href: "/easter-egg/quiz",
    badge: "Quiz",
  },
];

export default function EasterEggIndexPage() {
  return (
    <main className="container py-12 md:py-16 space-y-8">
      <header className="space-y-3">
        <h1 className="h1">Пасхалки Highway Films</h1>
        <p className="lead measure">
          Мы любим экспериментировать с Canvas и WebGL. Здесь собраны мини-игры и интерактивы, которые команда делает в свободное время.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((tile) => (
          <Tile key={tile.href} {...tile} />
        ))}
      </section>

      <p className="text-sm text-muted">
        P.S. Все проекты работают прямо в браузере, адаптированы под клавиатуру, геймпад и сенсорные экраны.
      </p>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import VideoHero from "@/components/VideoHero";
import ServiceCards from "@/components/ServiceCards";
import CTA from "@/components/CTA";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Highway Films — студия полного цикла",
  description:
    "Реклама, бренд-фильмы, корпоративные истории, клипы и AI-визуал. От идеи до финального мастера.",
  path: "/",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

const metrics = [
  { value: "24h", label: "первый ответ" },
  { value: "4K / 10-bit", label: "съёмка и мастер" },
  { value: "2", label: "Москва и Санкт-Петербург" },
];

const pillars = [
  {
    title: "Замысел",
    text: "Сначала собираем идею, ритм и визуальную логику. Потом запускаем производство.",
  },
  {
    title: "Продакшн",
    text: "Команда, техника и график под задачу. Без суеты и без лишнего веса.",
  },
  {
    title: "Пост",
    text: "Монтаж, цвет, графика и версии под площадки. Финал должен работать, а не просто выглядеть законченно.",
  },
];

export default function HomePage() {
  return (
    <>
      <VideoHero
        title="Highway Films"
        subtitle="Реклама, бренд-фильмы, корпоративные истории и клипы."
      />

      <section className="container pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="surface-panel p-6 md:p-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-end">
            <div className="max-w-5xl">
              <p className="eyebrow">Студия полного цикла</p>
              <h1 className="font-display line-accent mt-4 max-w-5xl text-[clamp(3rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.05em] text-white">
                Кадр с весом. Работа без шума.
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/68 md:text-[1.18rem]">
                Делаем рекламу, бренд-фильмы, корпоративные истории и клипы. Замысел, съёмка, пост и версии под площадки в одном контуре.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contacts" className="btn-primary h-12 rounded-full px-6">
                  Обсудить проект
                </Link>
                <a
                  href="https://t.me/highwayfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-12 rounded-full px-6"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>

            <div className="surface-tint p-5 md:p-6">
              <p className="eyebrow text-white/48">Highway Films</p>
              <h2 className="font-display mt-3 text-2xl leading-tight text-white md:text-[2rem]">
                Один визуальный язык от первой идеи до финального мастера.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/62 md:text-base">
                Собираем проект так, чтобы креатив, продакшн и пост не спорили друг с другом.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                <span className="text-sm text-white/56">Москва / Санкт-Петербург</span>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm text-white/78 transition hover:text-white">
                  О студии
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card p-5 md:p-6">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">{metric.value}</p>
                <p className="mt-3 text-sm leading-6 text-white/60">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-divider py-10 md:py-14">
        <div className="mb-7 max-w-4xl">
          <p className="eyebrow">Направления</p>
          <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
            Форматы, где важны и кадр, и попадание.
          </h2>
          <p className="mt-4 max-w-2xl text-white/62">
            Реклама, корпоративные истории, клипы, AI-визуал и свадебные фильмы.
          </p>
        </div>
        <ServiceCards locale="ru" />
      </section>

      <section className="container section-divider py-10 md:py-14">
        <div className="card-cinematic p-6 md:p-8">
          <div className="mb-7 max-w-4xl">
            <p className="eyebrow">Подход</p>
            <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
              Шоурил показывает уровень. Ниже только то, как он собирается.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <div key={pillar.title} className="surface-quiet p-6">
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-display text-3xl leading-none text-white/88">0{index + 1}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>
                <h3 className="font-display text-2xl text-white">{pillar.title}</h3>
                <p className="mt-3 text-white/64">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Контакт"
        title="Если задача уже ясна, можно сразу перейти к брифу."
        description="Короткого сообщения достаточно. Дальше соберём сроки, подход и рабочий бюджет."
        ctaLabel="Получить предложение"
        href="/brief"
        note="Обычно отвечаем в течение рабочего дня"
      />
    </>
  );
}

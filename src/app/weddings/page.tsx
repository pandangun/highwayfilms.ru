import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Свадебная видеосъёмка — Highway Films",
  description:
    "Свадебные фильмы в Москве и Санкт-Петербурге: тизер для соцсетей, полноценный фильм и архив моментов. Эпизод, Фильм, Сага. Мобильная съёмка и опция монтажа в день свадьбы.",
  path: "/weddings",
  locale: "ru",
  imagePath: "/images/frames/f001.jpg",
});

const frames = [
  "/images/frames/f001.jpg",
  "/images/frames/f002.jpg",
  "/images/frames/f003.jpg",
  "/images/frames/f004.jpg",
  "/images/frames/f005.jpg",
  "/images/frames/f006.jpg",
];

const storyFormats: Array<{
  id: string;
  label: string;
  title: string;
  price: string;
  description: string;
  bullets: string[];
  href: string;
  wrapperClassName?: string;
  accent?: boolean;
}> = [
  {
    id: "episode",
    label: "Короткая, но яркая история",
    title: "Эпизод",
    price: "60 000 ₽",
    description: "6 часов съёмки, 1 оператор. Тизер 30–45 сек + фильм 4–6 мин.",
    bullets: [
      "— Базовый монтаж, цвет и звук",
      "— Для камерных росписей",
      "— Вертикали/горизонтали под площадки",
    ],
    href: "/contacts?plan=episode",
    wrapperClassName: "md:translate-y-1",
  },
  {
    id: "film",
    label: "Полноценный рассказ о дне",
    title: "Фильм",
    price: "95 000 ₽",
    description: "10 часов съёмки, 1–2 оператора. Тизер 45–60 сек + фильм 7–12 мин.",
    bullets: [
      "— Полные версии ключевых моментов",
      "— Отдельная запись клятв и речей",
      "— Вертикальные версии для соцсетей",
    ],
    href: "/contacts?plan=film",
    wrapperClassName: "md:translate-y-[-4px]",
    accent: true,
  },
  {
    id: "saga",
    label: "Большая история в деталях",
    title: "Сага",
    price: "140 000 ₽",
    description: "Целый день, 2 оператора + дрон (по погоде). Тизер + фильм 10–15 мин.",
    bullets: [
      "— Все полные версии и обложки",
      "— Вертикали для соцсетей",
      "— Экспресс-тизер к утру следующего дня",
    ],
    href: "/contacts?plan=saga",
    wrapperClassName: "md:translate-y-2",
  },
];

const extras: Array<{ title: string; description: string; price: string; href: string }> = [
  {
    title: "Мобильная съёмка",
    description:
      "Снимаем на iPhone 16–17: 1–2 человека, минимум техники, естественная атмосфера. Быстро, бюджетно, сразу для соцсетей.",
    price: "40 000 ₽",
    href: "/contacts?extra=mobile",
  },
  {
    title: "Монтаж в день свадьбы",
    description:
      "Соберём короткий ролик в тот же день — показать на банкете или выложить вечером. Доступно для мобильной и классической съёмки.",
    price: "по запросу",
    href: "/contacts?extra=same-day",
  },
];

const faqItems: Array<{ q: string; a: ReactNode }> = [
  {
    q: "Когда будет готово видео?",
    a: <>Тизер — 3–5 дней, фильм — 3–4 недели. Опция: монтаж в день свадьбы.</>,
  },
  {
    q: "Что мы получим в итоге?",
    a: <>Минимум — тизер и фильм. В «Фильме» и «Саге» — ключевые эпизоды целиком и версии под соцсети.</>,
  },
  {
    q: "Работаете только в Москве и СПб?",
    a: <>Базируемся здесь, но выезжаем по всей России.</>,
  },
  {
    q: "Снимаете постановочно?",
    a: <>Главный акцент — живые эмоции и атмосфера. Постановку добавляем только если это нужно вам.</>,
  },
];

function Thumbs({ start = 0, count = 6 }: { start?: number; count?: number }) {
  const pics = Array.from({ length: count }, (_, i) => frames[(start + i) % frames.length]);
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6">
      {pics.map((src) => (
        <div key={src} className="relative aspect-[3/2] overflow-hidden rounded-xl border border-white/10">
          <Image
            src={src}
            alt="Wedding frame"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 16vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[12px] leading-none text-white/85">
      {children}
    </span>
  );
}

function Price({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[linear-gradient(90deg,rgba(124,58,237,.25),rgba(255,255,255,.12))] px-2.5 py-1 text-[12px] font-medium text-white/90 ring-1 ring-white/15">
      от {value}
    </span>
  );
}

function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-[1px] [background:linear-gradient(120deg,rgba(124,58,237,.6),rgba(255,255,255,.16))] ${className}`}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">{children}</div>
    </div>
  );
}

function CTAButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium">
      {children}
    </Link>
  );
}

function QA({ q, a }: { q: string; a: ReactNode }) {
  return (
    <details className="group py-8 first:pt-0 last:pb-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
        <span className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-[1.02] tracking-[-0.03em] text-white">
          {q}
        </span>
        <span className="relative mt-2 flex h-5 w-5 shrink-0 items-center justify-center text-white/72">
          <span className="absolute h-px w-5 bg-gradient-to-r from-white/70 to-white/20" />
          <span className="absolute h-5 w-px bg-white/50 transition duration-200 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="max-w-2xl pt-5 text-[1.02rem] leading-8 text-white/58 md:text-[1.08rem]">{a}</div>
    </details>
  );
}

export default function WeddingsPage() {
  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
      {/* HERO */}
      <section className="container relative grid items-start gap-8 pt-6 md:grid-cols-[1.2fr_0.8fr] md:pt-10">
        <div className="measure">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] uppercase tracking-wider text-white/80">
            Свадебные фильмы студии
          </span>
          <h1 className="h1 mt-4">Свадебная видеосъёмка в Москве и Санкт-Петербурге</h1>
          <p className="lead mt-4">
            Снимаем свадьбы как кино: живые эмоции, красивый свет и ритм монтажа. В каждом проекте — тизер для соцсетей,
            полноценный фильм и удобные версии под площадки. Работаем в Москве и Санкт-Петербурге, возможны выезды по РФ.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip>Тизер 30–60 сек</Chip>
            <Chip>Фильм 5–15 мин</Chip>
            <Chip>Полные версии</Chip>
            <Chip>Вертикали/горизонтали</Chip>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CTAButton href="/contacts">Узнать стоимость</CTAButton>
            <span className="text-xs text-white/70">Ответим в тот же день</span>
          </div>
        </div>

        <GlowCard className="md:translate-y-2">
          <div className="grid gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="stat-value">3–5 дней</div>
              <div className="stat-label">тизер после свадьбы</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="stat-value">3–4 недели</div>
              <div className="stat-label">готовый фильм</div>
            </div>
          </div>
          <Thumbs start={0} count={6} />
        </GlowCard>
      </section>

      {/* Что снимаем */}
      <section className="container grid gap-6 py-10 md:grid-cols-3">
        <GlowCard className="md:col-span-2">
          <h3 className="font-display text-base text-white">Основной фильм (5–15 минут)</h3>
          <p className="mt-2 text-sm text-neutral-200">
            Цельная история дня: утро, церемония, банкет и вечер. Живые речи, естественные моменты и монтаж, который возвращает в атмосферу.
          </p>
          <Thumbs start={2} count={6} />
        </GlowCard>
        <GlowCard>
          <h3 className="font-display text-base text-white">Тизер (30–60 секунд)</h3>
          <p className="mt-2 text-sm text-neutral-300">Клип для VK/Instagram/TikTok — чтобы поделиться эмоциями уже через несколько дней.</p>
        </GlowCard>
        <GlowCard>
          <h3 className="font-display text-base text-white">Полные версии моментов</h3>
          <p className="mt-2 text-sm text-neutral-300">Церемония, клятвы, первый танец, тосты — сохраняем целиком отдельными файлами.</p>
        </GlowCard>
        <GlowCard className="md:col-span-2">
          <h3 className="font-display text-base text-white">Форматы под площадки</h3>
          <p className="mt-2 text-sm text-neutral-300">Готовим версии под YouTube/VK (горизонталь) и Reels/Shorts/TikTok (вертикаль), чтобы делиться было удобно.</p>
        </GlowCard>
      </section>

      {/* Форматы */}
      <section className="container py-10">
        <h2 className="font-display text-2xl text-white">Выберите формат истории</h2>
        <div className="mt-6 grid gap-6 md:[grid-template-columns:1.05fr_1.2fr_1.05fr]">
          {storyFormats.map((format) => (
            <div key={format.id} className={`grid content-start gap-2 ${format.wrapperClassName ?? ""}`}>
              <div className={format.accent ? "text-sm text-white/90" : "text-sm text-white/75"}>{format.label}</div>
              {format.accent ? (
                <div className="rounded-2xl p-[1px] [background:linear-gradient(140deg,rgba(168,85,247,.7),rgba(255,255,255,.18))]">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl text-white">{format.title}</h3>
                      <Price value={format.price} />
                    </div>
                    <p className="mt-2 text-sm text-neutral-200">{format.description}</p>
                    <ul className="mt-3 space-y-1 text-sm text-neutral-200">
                      {format.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <CTAButton href={format.href}>Стоимость</CTAButton>
                    </div>
                  </div>
                </div>
              ) : (
                <GlowCard>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-white">{format.title}</h3>
                    <Price value={format.price} />
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">{format.description}</p>
                  <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                    {format.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <CTAButton href={format.href}>Стоимость</CTAButton>
                  </div>
                </GlowCard>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-transparent px-6 py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-neutral-100">Расскажите про площадку и формат — соберём точную смету и тайминг.</p>
            <CTAButton href="/contacts">Узнать стоимость</CTAButton>
          </div>
        </div>
      </section>

      {/* Кейсы */}
      <section className="container py-10">
        <h2 className="font-display text-2xl text-white">Кейсы</h2>
        <div className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4">
          <div className="flex gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="relative h-44 w-[240px] shrink-0 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={frames[i % frames.length]}
                  alt={`Wedding case ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Дополнительные варианты */}
      <section className="container grid gap-6 py-10 md:grid-cols-2">
        {extras.map((extra) => (
          <GlowCard key={extra.title}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl text-white">{extra.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{extra.description}</p>
              </div>
              <Price value={extra.price} />
            </div>
            <div className="mt-4">
              <CTAButton href={extra.href}>Уточнить</CTAButton>
            </div>
          </GlowCard>
        ))}
      </section>

      {/* FAQ */}
      <section className="container py-12">
        <div className="max-w-5xl">
          <p className="eyebrow">Часто спрашивают</p>
          <h2 className="font-display mt-3 text-[clamp(2.25rem,1.6rem+2vw,3.8rem)] leading-[0.96] tracking-[-0.04em] text-white">
            Важные детали до съёмки
          </h2>
        </div>
        <div className="mt-8 max-w-5xl">
          <div className="h-px bg-gradient-to-r from-white/40 via-white/12 to-transparent" />
          {faqItems.map((item) => (
            <QA key={item.q} q={item.q} a={item.a} />
          ))}
          <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>
      </section>

      {/* SEO-блок */}
      <section className="container pb-20">
        <div className="max-w-4xl border-t border-white/8 pt-10 text-sm leading-7 text-white/38 md:text-[0.95rem]">
          <h2 className="font-display text-xl tracking-[-0.02em] text-white/58">
            Свадебная видеосъёмка в Москве и Санкт-Петербурге
          </h2>
          <p>
            Свадебный фильм — это способ сохранить день не только в памяти, но и на экране. Наша студия делает тизеры, фильмы и архивные
            версии моментов, чтобы вы могли вернуться к важным эпизодам через годы. Мы работаем для пар, которые ценят естественные эмоции,
            стильный монтаж и современную подачу.
          </p>
          <p className="mt-4">
            Если вам нужна свадебная видеосъёмка в Москве или Санкт-Петербурге, выберите формат «Эпизод», «Фильм» или «Сага» — и мы
            подберём точный тайминг под площадку и программу дня. Возможны выезды по России, мобильная съёмка и опция показа ролика в день свадьбы.
          </p>
        </div>
      </section>

      <div className="container flex items-center justify-between gap-3 py-3 text-xs">
        <div className="text-white/60">Highway Films</div>
        <div className="flex items-center gap-3">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Link href="/weddings" className="px-3 py-1 bg-white/10 hover:bg-white/20">
              RU
            </Link>
            <Link href="/en/weddings" className="px-3 py-1 hover:bg-white/10">
              EN
            </Link>
          </div>
          <CTAButton href="/contacts">Связаться</CTAButton>
        </div>
      </div>
      </div>
    </main>
  );
}


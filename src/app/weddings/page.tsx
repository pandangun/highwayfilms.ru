import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Highway Films — Weddings Page (RU)
 * Финальная версия (киновайб + нестандартный лэйаут)
 * — Без сторонних иконок, только Tailwind + CSS-токены (globals.css)
 * — Ассиметричная сетка, цветные рамки, «чипы» с ценами
 * — Форматы: Эпизод / Фильм / Сага (без слова «пакеты»)
 * — Доп. варианты: Мобильная съёмка, Монтаж в день свадьбы (как опция)
 * — Кейсы-лента, FAQ 2-колоночный на десктопе, RU/EN-переключатель
 */

export const metadata = {
  title: "Свадебная видеосъёмка — Highway Films",
  description:
    "Свадебные фильмы в Москве и Санкт-Петербурге: тизер для соцсетей, полноценный фильм и архив моментов. Эпизод, Фильм, Сага. Мобильная съёмка и опция монтажа в день свадьбы.",
};

// Мини-галерея — подставь кадры в /public/images/frames
const frames = [
  "/images/frames/f001.jpg",
  "/images/frames/f002.jpg",
  "/images/frames/f003.jpg",
  "/images/frames/f004.jpg",
  "/images/frames/f005.jpg",
  "/images/frames/f006.jpg",
];

function Thumbs({ start = 0, count = 6 }: { start?: number; count?: number }) {
  const pics = Array.from({ length: count }, (_, i) => frames[(start + i) % frames.length]);
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6">
      {pics.map((src) => (
        <div key={src} className="relative aspect-[3/2] overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="wedding frame" className="h-full w-full object-cover" loading="lazy" />
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
    <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
      <summary className="cursor-pointer list-none text-base font-medium">{q}</summary>
      <div className="mt-2 text-sm leading-relaxed text-neutral-300">{a}</div>
    </details>
  );
}

export default function WeddingsPage() {
  return (
    <>
      {/* Topbar: язык + мини-CTA */}
      <div className="container flex items-center justify-between gap-3 py-3 text-xs">
        <div className="text-white/60">Highway Films</div>
        <div className="flex items-center gap-3">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Link href="/weddings" className="px-3 py-1 bg-white/10 hover:bg-white/20">RU</Link>
            <Link href="/en/weddings" className="px-3 py-1 hover:bg-white/10">EN</Link>
          </div>
          <CTAButton href="/contacts">Связаться</CTAButton>
        </div>
      </div>

      {/* HERO: сплит + акцентная карточка справа */}
      <section className="container relative grid items-start gap-8 pt-6 md:grid-cols-[1.2fr_0.8fr] md:pt-10">
        {/* Левый столбец */}
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

        {/* Правый столбец (акцент) */}
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

      {/* Что снимаем — ломаная сетка */}
      <section className="container grid gap-6 py-10 md:grid-cols-3">
        <GlowCard className="md:col-span-2">
          <h3 className="text-base font-semibold">Основной фильм (5–15 минут)</h3>
          <p className="mt-2 text-sm text-neutral-200">Цельная история дня: утро, церемония, банкет и вечер. Живые речи, естественные моменты и монтаж, который возвращает в атмосферу.</p>
          <Thumbs start={2} count={6} />
        </GlowCard>
        <GlowCard>
          <h3 className="text-base font-semibold">Тизер (30–60 секунд)</h3>
          <p className="mt-2 text-sm text-neutral-300">Клип для VK/Instagram/TikTok — чтобы поделиться эмоциями уже через несколько дней.</p>
        </GlowCard>
        <GlowCard>
          <h3 className="text-base font-semibold">Полные версии моментов</h3>
          <p className="mt-2 text-sm text-neutral-300">Церемония, клятвы, первый танец, тосты — сохраняем целиком отдельными файлами.</p>
        </GlowCard>
        <GlowCard className="md:col-span-2">
          <h3 className="text-base font-semibold">Форматы под площадки</h3>
          <p className="mt-2 text-sm text-neutral-300">Готовим версии под YouTube/VK (горизонталь) и Reels/Shorts/TikTok (вертикаль), чтобы делиться было удобно.</p>
        </GlowCard>
      </section>

      {/* Выберите формат истории (вместо «Пакеты») — разноуровневые карточки */}
      <section className="container py-10">
        <h2 className="text-xl font-semibold">Выберите формат истории</h2>
        <div className="mt-6 grid gap-6 md:[grid-template-columns:1.05fr_1.2fr_1.05fr]">
          {/* Эпизод */}
          <div className="grid content-start gap-2 md:translate-y-1">
            <div className="text-sm text-white/75">Короткая, но яркая история</div>
            <GlowCard>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">Эпизод</h3>
                <Price value="60 000 ₽" />
              </div>
              <p className="mt-2 text-sm text-neutral-300">6 часов съёмки, 1 оператор. Тизер 30–45 сек + фильм 4–6 мин.</p>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                <li>— Базовый монтаж, цвет и звук</li>
                <li>— Для камерных росписей</li>
                <li>— Вертикали/горизонтали под площадки</li>
              </ul>
              <div className="mt-5"><CTAButton href="/contacts?plan=episode">Стоимость</CTAButton></div>
            </GlowCard>
          </div>

          {/* Фильм (акцентный) */}
          <div className="grid content-start gap-2 md:translate-y-[-4px]">
            <div className="text-sm text-white/90">Полноценный рассказ о дне</div>
            <div className="rounded-2xl p-[1px] [background:linear-gradient(140deg,rgba(168,85,247,.7),rgba(255,255,255,.18))]">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">Фильм</h3>
                  <Price value="95 000 ₽" />
                </div>
                <p className="mt-2 text-sm text-neutral-200">10 часов съёмки, 1–2 оператора. Тизер 45–60 сек + фильм 7–12 мин.</p>
                <ul className="mt-3 space-y-1 text-sm text-neutral-200">
                  <li>— Полные версии ключевых моментов</li>
                  <li>— Отдельная запись клятв и речей</li>
                  <li>— Вертикальные версии для соцсетей</li>
                </ul>
                <div className="mt-5"><CTAButton href="/contacts?plan=film">Стоимость</CTAButton></div>
              </div>
            </div>
          </div>

          {/* Сага */}
          <div className="grid content-start gap-2 md:translate-y-2">
            <div className="text-sm text-white/75">Большая история в деталях</div>
            <GlowCard>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">Сага</h3>
                <Price value="140 000 ₽" />
              </div>
              <p className="mt-2 text-sm text-neutral-300">Целый день, 2 оператора + дрон (по погоде). Тизер + фильм 10–15 мин.</p>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                <li>— Все полные версии и обложки</li>
                <li>— Вертикали для соцсетей</li>
                <li>— Экспресс-тизер к утру следующего дня</li>
              </ul>
              <div className="mt-5"><CTAButton href="/contacts?plan=saga">Стоимость</CTAButton></div>
            </GlowCard>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-transparent px-6 py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-neutral-100">Расскажите про площадку и формат — соберём точную смету и тайминг.</p>
            <CTAButton href="/contacts">Узнать стоимость</CTAButton>
          </div>
        </div>
      </section>

      {/* Кейсы — горизонтальная лента */}
      <section className="container py-10">
        <h2 className="text-xl font-semibold">Кейсы</h2>
        <div className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4">
          <div className="flex gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="relative h-44 w-[240px] shrink-0 overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/frames/f00${(i % 6) + 1}.jpg`} alt="case" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Дополнительные варианты */}
      <section className="container grid gap-6 py-10 md:grid-cols-2">
        <GlowCard>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Мобильная съёмка</h3>
              <p className="mt-2 text-sm text-neutral-300">Снимаем на iPhone 16–17: 1–2 человека, минимум техники, естественная атмосфера. Быстро, бюджетно, сразу для соцсетей.</p>
            </div>
            <Price value="40 000 ₽" />
          </div>
          <div className="mt-4"><CTAButton href="/contacts?extra=mobile">Уточнить</CTAButton></div>
        </GlowCard>

        <GlowCard>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Монтаж в день свадьбы</h3>
              <p className="mt-2 text-sm text-neutral-300">Соберём короткий ролик в тот же день — показать на банкете или выложить вечером. Доступно для мобильной и классической съёмки.</p>
            </div>
            <Price value="по запросу" />
          </div>
          <div className="mt-4"><CTAButton href="/contacts?extra=same-day">Обсудить</CTAButton></div>
        </GlowCard>
      </section>

      {/* FAQ — 2 колонки на десктопе */}
      <section className="container py-12">
        <h2 className="mb-4 text-xl font-semibold">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <QA q="Когда будет готово видео?" a={<>Тизер — 3–5 дней, фильм — 3–4 недели. Опция: монтаж в день свадьбы.</>} />
          <QA q="Что мы получим в итоге?" a={<>Минимум — тизер и фильм. В «Фильме» и «Саге» — ключевые эпизоды целиком и версии под соцсети.</>} />
          <QA q="Работаете только в Москве и СПб?" a={<>Базируемся здесь, но выезжаем по всей России.</>} />
          <QA q="Снимаете постановочно?" a={<>Главный акцент — живые эмоции и атмосфера. Постановку добавляем только если это нужно вам.</>} />
        </div>
      </section>

      {/* SEO-блок (низ) */}
      <section className="container pb-20">
        <div className="prose prose-invert max-w-none text-sm text-neutral-300">
          <h2>Свадебная видеосъёмка в Москве и Санкт-Петербурге</h2>
          <p>
            Свадебный фильм — это способ сохранить день не только в памяти, но и на экране. Наша студия делает тизеры, фильмы и архивные
            версии моментов, чтобы вы могли вернуться к важным эпизодам через годы. Мы работаем для пар, которые ценят естественные эмоции,
            стильный монтаж и современную подачу.
          </p>
          <p>
            Если вам нужна свадебная видеосъёмка в Москве или Санкт-Петербурге, выберите формат «Эпизод», «Фильм» или «Сага» — и мы
            подберём точный тайминг под площадку и программу дня. Возможны выезды по России, мобильная съёмка и опция показа ролика в день свадьбы.
          </p>
        </div>
      </section>
    </>
  );
}
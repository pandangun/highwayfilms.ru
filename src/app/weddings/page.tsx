import Link from "next/link";
import { ArrowRight, Sparkles, Film, Clapperboard, Layers, Smartphone, Zap } from "lucide-react";

/**
 * Highway Films — Weddings Page (RU)
 * — Киновайб: «Эпизод / Фильм / Сага»
 * — Текст без технарщины, заточен под реальных клиентов и SEO
 * — Добавлены услуги: мобильная съёмка и опция «Монтаж в день свадьбы»
 * — Красивый, читабельный макет на Tailwind (globals.css подключишь отдельно)
 */

export const metadata = {
  title: "Свадебная видеосъёмка — Highway Films",
  description:
    "Свадебные фильмы в Москве и Санкт-Петербурге: тизер для соцсетей, полноценный фильм и архив моментов. Пакеты ‘Эпизод / Фильм / Сага’. Мобильная съёмка и опция монтажа в день свадьбы.",
};

// мини-галерея — подставь свои кадры из /public/images/frames или /public/weddings/*
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
    <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
      {pics.map((src) => (
        <div key={src} className="relative aspect-[3/2] overflow-hidden rounded-lg ring-1 ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="wedding frame" className="h-full w-full object-cover" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] uppercase tracking-wider text-white/80">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
      <div className="text-lg font-semibold">{value}</div>
      <div className="mt-1 text-xs text-white/70">{label}</div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[12px] leading-none text-white/80 ring-1 ring-white/15">
      {children}
    </span>
  );
}

function Card({ title, icon, children, footer }: { title: string; icon?: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-neutral-200">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

export default function WeddingsPage() {
  return (
    <>
      {/* HERO */}
      <section className="container relative pt-12 md:pt-16">
        {/* subtle gradient halo */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(120,119,198,0.25),transparent_60%)]" />

        <div className="max-w-3xl">
          <Kicker>Свадебные фильмы студии</Kicker>
          <h1 className="h1 text-[clamp(32px,5vw,56px)] font-bold mt-4">Свадебная видеосъёмка в Москве и Санкт-Петербурге</h1>
          <p className="lead mt-4 text-neutral-200">
            Мы снимаем свадьбы как кино: живые эмоции, красивый свет и ритм монтажа. В каждом проекте — тизер для соцсетей,
            полноценный фильм и удобные версии под площадки. Работаем в Москве и Санкт-Петербурге, возможны выезды по РФ.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Pill>Тизер 30–60 сек</Pill>
            <Pill>Фильм 5–15 мин</Pill>
            <Pill>Полные версии моментов</Pill>
            <Pill>Вертикали / горизонтали</Pill>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            <Stat value="> 50" label="снятых свадеб" />
            <Stat value="3–5 дней" label="тизер после дня свадьбы" />
            <Stat value="3–4 недели" label="готовый фильм" />
          </div>

          <div className="mt-8">
            <Link href="/contacts" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90">
              Узнать стоимость <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* мини-галерея */}
        <Thumbs start={0} count={6} />
      </section>

      {/* Что снимаем */}
      <section className="container py-10 md:py-12">
        <h2 className="text-xl font-semibold">Что мы снимаем</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Card title="Тизер (30–60 сек)" icon={<Clapperboard className="h-5 w-5 opacity-80" />}>
            Короткий клип для VK, Instagram или TikTok. Самые яркие эмоции дня — чтобы поделиться с близкими уже через несколько дней.
          </Card>
          <Card title="Основной фильм (5–15 мин)" icon={<Film className="h-5 w-5 opacity-80" />}>
            Цельная история: утро, церемония, банкет и вечер. Живые речи, естественные моменты и монтаж, который возвращает в атмосферу.
          </Card>
          <Card title="Полные версии моментов" icon={<Layers className="h-5 w-5 opacity-80" />}>
            Церемония и клятвы, первый танец, тосты — сохраняем целиком отдельными файлами, без сокращений.
          </Card>
          <Card title="Форматы под площадки" icon={<Smartphone className="h-5 w-5 opacity-80" />}>
            Готовим версии под YouTube/VK (горизонталь) и Reels/Shorts/TikTok (вертикаль), чтобы делиться было удобно.
          </Card>
        </div>
      </section>

      {/* Пакеты */}
      <section className="container py-10 md:py-12">
        <h2 className="text-xl font-semibold">Пакеты</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {/* Эпизод */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/80">
              <Clapperboard className="h-4 w-4" />
              <span>Короткая, но яркая история</span>
            </div>
            <h3 className="text-lg font-semibold">Эпизод</h3>
            <p className="mt-2 text-sm text-neutral-300">6 часов съёмки, 1 оператор. Тизер 30–45 сек + фильм 4–6 мин.</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>— Базовый монтаж, цвет и звук</li>
              <li>— Полезно для камерных росписей</li>
              <li>— Вертикали/горизонтали под площадки</li>
            </ul>
          </div>

          {/* Фильм */}
          <div className="relative rounded-2xl border border-violet-400/30 bg-gradient-to-b from-violet-500/10 p-6 ring-1 ring-violet-400/20">
            <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/90">
              <Film className="h-4 w-4" />
              <span>Полноценный рассказ о дне</span>
            </div>
            <h3 className="text-lg font-semibold">Фильм</h3>
            <p className="mt-2 text-sm text-neutral-200">10 часов, 1–2 оператора. Тизер 45–60 сек + фильм 7–12 мин.</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-200">
              <li>— Полные версии ключевых моментов</li>
              <li>— Отдельная запись клятв и речей</li>
              <li>— Вертикальные версии для соцсетей</li>
            </ul>
          </div>

          {/* Сага */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/80">
              <Layers className="h-4 w-4" />
              <span>Большая история в деталях</span>
            </div>
            <h3 className="text-lg font-semibold">Сага</h3>
            <p className="mt-2 text-sm text-neutral-300">Целый день, 2 оператора + дрон (по погоде). Тизер + фильм 10–15 мин.</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>— Все полные версии и обложки</li>
              <li>— Вертикали для соцсетей</li>
              <li>— Экспресс-тизер к утру следующего дня</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 px-6 py-7 ring-1 ring-white/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-neutral-100">Расскажите про площадку и формат — соберём точную смету и тайминг.</p>
            <Link href="/contacts" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium hover:opacity-95 transition">
              Узнать стоимость <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Доп. услуги */}
      <section className="container py-10 md:py-12">
        <h2 className="text-xl font-semibold">Дополнительные варианты</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Card
            title="Мобильная съёмка (iPhone 16–17)"
            icon={<Smartphone className="h-5 w-5 opacity-80" />}
            footer={<div className="mt-3 text-sm text-white/70">Подходит для камерных росписей, вечеринок и контента «здесь и сейчас».</div>}
          >
            Формат «тихо и незаметно»: 1–2 человека, минимум техники, естественная атмосфера. Быстрее по срокам и бюджетнее,
            сразу оптимально для соцсетей.
          </Card>

          <Card
            title="Опция: монтаж в день свадьбы"
            icon={<Zap className="h-5 w-5 opacity-80" />}
            footer={
              <div className="mt-3 text-xs text-white/60">
                *Доступность и стоимость зависят от площадки и тайминга. Уточняйте при бронировании пакета.
              </div>
            }
          >
            Соберём короткий ролик прямо в день события, чтобы показать гостям на банкете или опубликовать вечером.
            Возможны два уровня: быстрый монтаж с мобильной съёмки / расширенный с камер.
          </Card>
        </div>
      </section>

      {/* Как это работает */}
      <section className="container py-10 md:py-12">
        <h2 className="text-xl font-semibold">Как это работает</h2>
        <ol className="mt-4 space-y-3 text-sm text-neutral-200">
          <li><strong>Бриф.</strong> Вы делитесь площадкой, расписанием и пожеланиями.</li>
          <li><strong>Пакет.</strong> Мы подбираем подходящий вариант и фиксируем детали.</li>
          <li><strong>Съёмка.</strong> Работаем тактично и ненавязчиво, ловим живые эмоции.</li>
          <li><strong>Сдача.</strong> Тизер — 3–5 дней, фильм — 3–4 недели. Опционально: показ ролика в день свадьбы.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="container pb-16">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">Когда будет готово видео?</summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Тизер — через 3–5 дней. Полноценный фильм — в течение 3–4 недель. Есть опция монтажа в день свадьбы.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">Что входит в итоговую отдачу?</summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Тизер и основной фильм. В пакетах «Фильм» и «Сага» — также полные версии ключевых моментов и версии под соцсети.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">Работаете только в Москве и Петербурге?</summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">Базируемся в этих городах, но выезжаем по всей России.</div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">Вы снимаете постановочно?</summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Мы делаем акцент на живых эмоциях и атмосфере. Постановочные эпизоды добавляем по запросу и к месту.
            </div>
          </details>
        </div>
      </section>

      {/* SEO-блок (текстовый, низ страницы) */}
      <section className="container pb-20">
        <div className="prose prose-invert max-w-none text-sm text-neutral-300">
          <h2>Свадебная видеосъёмка в Москве и Санкт-Петербурге</h2>
          <p>
            Свадебный фильм — это способ сохранить день не только в памяти, но и на экране. Наша студия делает тизеры, фильмы и
            архивные версии моментов, чтобы вы могли вернуться к важным эпизодам через годы. Мы работаем для пар, которые ценят
            естественные эмоции, стильный монтаж и современную подачу.
          </p>
          <p>
            Если вам нужна свадебная видеосъёмка в Москве или Санкт-Петербурге, выберите пакет «Эпизод», «Фильм» или «Сага» — и мы
            подберём точный тайминг под площадку и программу дня. Возможны выезды по России, мобильная съёмка и опция показа ролика в
            день свадьбы.
          </p>
        </div>
      </section>
    </>
  );
}

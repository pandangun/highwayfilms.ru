// app/commercials/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Рекламные ролики и product-видео — Highway Films",
  description:
    "Продающие видео для брендов и маркетплейсов: packshot, lifestyle, UGC и motion. Фокус на конверсию и креатив, быстрые пакеты под задачу.",
  alternates: { canonical: "https://highwayfilms.ru/commercials" },
  openGraph: {
    type: "website",
    title: "Рекламные ролики — Highway Films",
    description:
      "Креатив → препрод → съёмка 4K/10-bit → постпрод (монтаж/цвет/VFX) → версии под площадки. Москва/СПб.",
    url: "https://highwayfilms.ru/commercials",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

/* ---------- small UI ---------- */

function SectionHeader({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header>
      {kicker && <div className="eyebrow">{kicker}</div>}
      <h2 className="mt-1 font-semibold tracking-tight text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-[1.15]">
        {title}
      </h2>
      {lead && (
        <p className="mt-2 text-muted text-[clamp(1.125rem,1rem+.6vw,1.35rem)] leading-[1.65] measure">
          {lead}
        </p>
      )}
    </header>
  );
}

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 md:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] bg-[radial-gradient(1200px_280px_at_0%_0%,rgba(124,58,237,.08),transparent_60%),radial-gradient(900px_220px_at_100%_100%,rgba(34,197,94,.08),transparent_60%),rgba(255,255,255,.03)]">
      <p className="font-semibold tracking-tight text-[clamp(2rem,1.2rem+3vw,3rem)] leading-[1.1]">
        {children}
      </p>
    </div>
  );
}

function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-6 text-center h-full">
      <div className="stat-value leading-tight">{value}</div>
      <div className="stat-label mt-1">{label}</div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-7 h-full">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="card p-6 relative flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/20 grid place-items-center font-semibold">
        {n}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="mt-1 text-muted">{text}</p>
      </div>
    </li>
  );
}

function AdTile({ src, tag, title }: { src: string; tag: string; title: string }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-base aspect-[16/10]">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover opacity-70 transition group-hover:opacity-85"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <span className="w-fit rounded-md bg-black/45 px-2 py-1 text-xs">{tag}</span>
        <h3 className="mt-2 text-lg font-medium leading-tight">{title}</h3>
      </div>
    </article>
  );
}

/* ---------- gallery tiles data ---------- */
const tiles = [
  { src: "/images/ads/a01.jpg", tag: "Packshot",  title: "Стек и фактуры для e-com" },
  { src: "/images/ads/a02.jpg", tag: "Lifestyle", title: "Продукт в реальном сценарии" },
  { src: "/images/ads/a03.jpg", tag: "UGC",      title: "Нативные ролики под перформанс" },
  { src: "/images/ads/a04.jpg", tag: "3D/Motion",title: "Акценты, разрезы, анимация" },
  { src: "/images/ads/a05.jpg", tag: "Food",     title: "Фуд-порно: пар, соус, макро" },
  { src: "/images/ads/a06.jpg", tag: "Beauty",   title: "Текстуры и блики — premium" },
];

export default function Page() {
  return (
    <main className="container pt-header-safe pb-20">
      {/* HERO */}
      <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_420px] items-start">
        <div>
          <div className="eyebrow">Commercials</div>
          <h1 className="h1 mt-2">Рекламные ролики и product-видео</h1>
          <p className="lead measure mt-3">
            Продающие видео для брендов: packshot, lifestyle, UGC и motion.
            Мы выстраиваем драматургию «смысл → польза → действие», чтобы видео не просто смотрели, а{" "}
            <strong>покупали</strong>.
          </p>

        {/* KPI — отдельным блоком, с большим зазором */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <Kpi value="200+" label="product-роликов" />
            <Kpi value="4K / 10-bit" label="картинка и цвет" />
            <Kpi value="7–10 дней" label="быстрые пакеты" />
          </div>
        </div>

        <aside className="card p-6 md:sticky md:top-[calc(var(--header-h)+16px)]">
          <div className="text-xl font-semibold">Обсудим задачу?</div>
          <p className="text-muted mt-2">
            Пришлите тезисы и ссылку на карточку — предложим три формата с бюджетами и сроками.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contacts" className="btn btn-primary">Получить КП</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Telegram
            </a>
          </div>
        </aside>
      </section>

      {/* Интерлюдия — воздух и смысл */}
      <section className="mt-12">
        <Statement>
          Не «просто красивое видео», а инструмент маркетинга: понимание → доверие → действие.
        </Statement>
      </section>

      {/* Офферы — реже сетка, больше паддингов */}
      <section className="mt-14">
        <SectionHeader
          kicker="Форматы под задачу"
          title="Три быстрых оффера"
          lead="Минимально достаточный продакшн, чтобы двигать метрики без лишних циклов."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Feature
            title="Packshot Pro"
            text="Чистый фон, стек/повороты, макро-текстуры, аккуратный motion. Идеально для карточек товара."
          />
          <Feature
            title="Lifestyle Story"
            text="Сценарий в реальном контексте: польза → триггеры → призыв. Версии 6/15/30 сек."
          />
          <Feature
            title="UGC Boost"
            text="Нативная подача/хендхелд. Быстрые тесты гипотез, серии под ретаргет."
          />
        </div>
      </section>

      {/* Галерея — ровная сетка, большой gap */}
      <section className="mt-16">
        <SectionHeader
          kicker="Подача"
          title="Как может выглядеть ваш ролик"
          lead="От стерильного e-com до насыщенного lifestyle. Любой сценарий раскладываем на A/B-версии."
        />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-5">
          {tiles.map((t, i) => (
            <AdTile key={i} src={t.src} tag={t.tag} title={t.title} />
          ))}
        </div>
      </section>

      {/* Что снимаем — реже и легче */}
      <section className="mt-16">
        <SectionHeader
          kicker="Экспертиза"
          title="Что именно снимаем"
          lead="Под каждую нишу — своя схема света, фактуры и акценты выгод."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Feature title="Фуд / напитки" text="Слоу-мо, пар, капли, пролёты. Аппетитные selling-points." />
          <Feature title="Косметика / skincare" text="Текстуры, свотчи, стек и бликовая схема — high-end premium." />
          <Feature title="Гаджеты / аксессуары" text="Анимация портов/фич, 3D-разрезы, motion-акценты." />
          <Feature title="Одежда / ткани" text="Фактура, посадка, движение. Вертикальные нарезки." />
          <Feature title="Дом / декор" text="Lifestyle-сцены: польза в быту, до/после, микросценарии." />
          <Feature title="Маркетплейс-пакеты" text="Серии 6–15 сек под карточку товара и ретаргет." />
        </div>
      </section>

      {/* Процесс — с интерлюдией */}
      <section className="mt-16">
        <Statement>Прозрачный процесс и предсказуемые сроки на каждом этапе.</Statement>
        <div className="mt-6">
          <SectionHeader title="Процесс" />
        </div>
        <ol className="mt-6 grid gap-5 lg:grid-cols-2">
          <Step n={1} title="Бриф → инсайт" text="ЦА, оффер, возражения. Складываем продающий порядок фактов." />
          <Step n={2} title="Препрод" text="Treatment, борда, свет, реквизит, тайминг, чек-лист selling-points." />
          <Step n={3} title="Съёмка" text="Packshot + lifestyle/UGC. Снимаем сериями для A/B." />
          <Step n={4} title="Постпрод" text="Монтаж → цвет → motion → субтитры. Версии 6/15/30/60, верт/гор." />
        </ol>
      </section>

      {/* Пакеты — с воздухом и финальным пояснением */}
      <section className="mt-16">
        <SectionHeader
          kicker="Прайс-подход"
          title="Готовые пакеты"
          lead="Пакуем под вашу цель; даём 2–3 опции по бюджету и срокам."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="card p-7">
            <h3 className="text-lg font-semibold">Starter</h3>
            <p className="text-muted mt-1">Packshot + 2 короткие версии</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>Студийный сетап света</li>
              <li>Версии 6/15 сек (вертикаль)</li>
              <li>Субтитры, лого, финальный тезис</li>
            </ul>
          </div>
          <div className="card p-7 ring-1 ring-white/10">
            <h3 className="text-lg font-semibold">Growth</h3>
            <p className="text-muted mt-1">Packshot + Lifestyle/UGC</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>3–5 selling-points</li>
              <li>Версии 6/15/30 сек (верт/гор.)</li>
              <li>Набор стоп-кадров для карточек</li>
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="text-lg font-semibold">Brand+</h3>
            <p className="text-muted mt-1">Сюжет + motion/3D</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>Сценарий и актёры</li>
              <li>Motion-акценты / 3D-разрезы</li>
              <li>Пакет версий под площадки</li>
            </ul>
          </div>
        </div>
        <p className="text-muted mt-3 text-sm">
          Финальная смета зависит от локаций, смен, реквизита и графики. Дадим 2–3 опции под ваш бюджет.
        </p>
      </section>

      {/* Финальный CTA */}
      <section className="mt-16">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Готовы ускорить продажи?</div>
            <p className="text-muted mt-2">Пришлите тезисы — соберём план и сроки сегодня.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contacts" className="btn btn-primary">Запросить предложение</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Чат в Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

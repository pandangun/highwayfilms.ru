// app/about/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "О компании — Highway Films: видеопродакшн полного цикла в Москве и Санкт-Петербурге",
  description:
    "Highway Films — продакшн рекламы, product-видео, корпоративных фильмов и клипов. Полный цикл: креатив, препрод, съёмка 4K/10-bit, постпрод и версии под площадки.",
  alternates: {
    canonical: "https://highwayfilms.ru/about",
    languages: {
      ru: "https://highwayfilms.ru/about",
      en: "https://highwayfilms.ru/en/about",
    },
  },
  openGraph: {
    type: "website",
    url: "https://highwayfilms.ru/about",
    title: "Highway Films — видеопродакшн полного цикла",
    description:
      "Сильный визуал, ясный сторителлинг, измеримый результат. Москва/СПб, выезды по РФ/СНГ.",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

/* ========= UI Pieces ========= */

/** KPI с мягким «киноградиентом» и контрастным числом */
function StatGlow({ value, label }: { value: string; label: string }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl p-5 md:p-6",
        "ring-1 ring-white/10 shadow-soft",
        // два встречных радиальных ореола + тонкая подложка
        "bg-[radial-gradient(140%_120%_at_0%_0%,rgba(124,58,237,.25),transparent_60%),",
        "radial-gradient(140%_120%_at_100%_100%,rgba(59,130,246,.16),transparent_60%),",
        "rgba(255,255,255,.03)]",
      ].join("")}
    >
      <div className="leading-none">
        <span
          className={[
            "block",
            "text-transparent bg-clip-text",
            "bg-gradient-to-br from-white via-white/90 to-violet-200/85",
            // размер цифры — крупнее обычной stat-value, мягкое кернингование
            "font-extrabold tracking-tight",
            "text-[clamp(2.2rem,1.2rem+2.8vw,3.25rem)]",
          ].join(" ")}
        >
          {value}
        </span>
      </div>
      <div className="mt-1 text-sm md:text-base text-muted">{label}</div>

      {/* едва заметная «линза» для глубины */}
      <span className="pointer-events-none absolute -inset-px rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,.06)]" />
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-6 h-full">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

function ListItem({
  n,
  title,
  text,
}: {
  n: number;
  title: string;
  text: string;
}) {
  return (
    <li className="card p-5 relative flex gap-4">
      <div className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-white/10 ring-1 ring-white/20 font-semibold">
        {n}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="mt-1 text-muted">{text}</p>
      </div>
    </li>
  );
}

/** Крупная «полоска»-утверждение */
function Statement({ children }: { children: React.ReactNode }) {
  return (
    <div className="band">
      <p className="statement">{children}</p>
    </div>
  );
}

/** Заголовок секции + лид (узкий кламп по центру) */
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
    <header className="mx-auto max-w-3xl">
      {kicker && <div className="eyebrow">{kicker}</div>}
      <h2 className="section-title mt-1">{title}</h2>
      {lead && <p className="section-lead mt-2 measure">{lead}</p>}
    </header>
  );
}

/* ========= Page ========= */

export default function AboutPage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Highway Films",
    url: "https://highwayfilms.ru",
    logo: "https://highwayfilms.ru/logo.png",
    sameAs: ["https://t.me/highwayfilms"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва и Санкт-Петербург",
      addressCountry: "RU",
    },
    areaServed: "RU",
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://highwayfilms.ru" },
      { "@type": "ListItem", position: 2, name: "О компании", item: "https://highwayfilms.ru/about" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Сколько длится производство ролика?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Быстрые пакеты — 7–10 дней; сюжетные проекты — от 2–3 недель в зависимости от локаций, смен и графики.",
        },
      },
      {
        "@type": "Question",
        name: "Что нужно от вас на старте?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Достаточно тезисов и ссылки на продукт/сайт. Креатив, treatment и препродакшн берём на себя.",
        },
      },
      {
        "@type": "Question",
        name: "В каких городах вы работаете?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "База — Москва и Санкт-Петербург. Выезды по России и СНГ — по запросу.",
        },
      },
    ],
  };

  return (
    <main className="container pt-header-safe pb-16">
      {/* 1) HERO — вертикальный поток (справа позже можно добавить фото/видео) */}
      <section className="section">
        <div className="eyebrow">About</div>
        <h1 className="h1 mt-2 max-w-[22ch]">
          Highway Films — видеопродакшн полного цикла
        </h1>
        <p className="lead measure mt-3">
          Делаем рекламные и корпоративные ролики, бренд-фильмы и клипы. Наш подход — сильный
          визуал, ясное повествование и измеримый результат: узнаваемость, конверсии, доверие к продукту.
        </p>

        {/* KPI — мягкие градиенты и сильные цифры */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl">
          <StatGlow value="10+ лет" label="в продакшне" />
          <StatGlow value="50+" label="выпущенных проектов" />
          <StatGlow value="4K / 10-bit" label="картинка и цвет" />
        </div>
      </section>

      {/* 2) Стейтмент-пауза */}
      <section className="section-tight">
        <Statement>
          Мы снимаем видео не «ради красоты», а ради <em>результата</em>: понимание → доверие → действие.
        </Statement>
      </section>

      {/* 3) Почему мы */}
      <section className="section">
        <SectionHeader
          kicker="Подход"
          title="Почему бренды выбирают нас"
          lead="Полный цикл, технологичный пайплайн и фокус на бизнес-результат — не просто красивое видео, а инструмент."
        />
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature
            title="Полный цикл"
            text="Идея → treatment → препрод → съёмка → пост. Прозрачные сметы и сроки, личная ответственность продюсера."
          />
          <Feature
            title="Технологичность"
            text="Съёмка до 4K/10-bit, слоумо/макро, управляемый цвет по референсам, motion/3D и чистый звук."
          />
          <Feature
            title="На результат"
            text="Видео как инструмент: структура, инсайты, CTA. Версии под площадки и A/B-пакеты."
          />
        </div>
      </section>

      {/* 4) Пауза */}
      <section className="section-tight">
        <Statement>
          Минимально достаточная продакшн-схема под задачу. Скорость без компромиссов по качеству.
        </Statement>
      </section>

      {/* 5) Что производим + перелинковка */}
      <section className="section">
        <SectionHeader
          kicker="Форматы"
          title="Что мы производим"
          lead="От стерильного packshot до насыщенного lifestyle и UGC. Под цель собираем правильный набор сцен."
        />
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <Feature
            title="Реклама / product-видео"
            text="Packshot, lifestyle, UGC, motion. Серии под карточку товара и перформанс."
          />
          <Feature
            title="Корпоративное видео"
            text="Фильмы о компании, презентации/стенды, HR и внутренние коммуникации."
          />
          <Feature
            title="Музыкальные клипы"
            text="Идея, постановка, съёмка, пост и релиз-пакеты. Сильный визуал и динамика."
          />
          <Feature
            title="Постпродакшн"
            text="Монтаж, цвет, VFX, звук, сабы. Master-версии под каналы."
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/commercials" className="btn">Реклама</Link>
          <Link href="/corporate" className="btn">Корпоративное</Link>
          <Link href="/music-videos" className="btn">Клипы</Link>
          <Link href="/videoproduction" className="btn">Видеопродакшн</Link>
        </div>
      </section>

      {/* 6) Технологический стек */}
      <section className="section">
        <SectionHeader
          kicker="Стек"
          title="Технологии и оборудование"
          lead="Контролируемые световые схемы, лог-профили, колор-менеджмент и стабильные master-версии под все каналы."
        />
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="card p-6">
            <h3 className="font-semibold">Съёмка</h3>
            <p className="text-muted mt-2">
              4K/10-bit, слоумо, макро, управляемые схемы (key/fill/rim), дым/частицы. Профиль log, нейтральные карты,
              контроль экспозиции по waveform.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold">Пост-прод</h3>
            <p className="text-muted mt-2">
              Цвет в ACES, управляемые LUT, трекинг/beauty/VFX, титры/сабы, рендер под площадки
              (вертикаль/горизонталь) и loudness-нормы. Подготовка master-версий.
            </p>
          </div>
        </div>
      </section>

      {/* 7) Процесс */}
      <section className="section">
        <Statement>
          Прозрачный процесс и предсказуемые сроки: вы понимаете, что происходит на каждом этапе.
        </Statement>
        <div className="mt-6">
          <SectionHeader title="Как мы работаем" />
        </div>
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ListItem n={1} title="Бриф → инсайт" text="ЦА, оффер, барьеры, KPI. Фиксируем продающий порядок фактов." />
          <ListItem n={2} title="Препрод" text="Treatment, борда, свет, реквизит, тайминг. Чек-лист selling-points." />
          <ListItem n={3} title="Съёмка" text="Packshot + lifestyle/UGC. Снимаем сериями — база для A/B-тестов." />
          <ListItem n={4} title="Пост" text="Монтаж → цвет → motion/3D → сабы. Версии 6/15/30/60, верт/гор." />
        </ol>
      </section>

      {/* 8) SEO + FAQ */}
      <section className="section">
        <SectionHeader
          kicker="Подход"
          title="Highway Films: что мы решаем"
          lead="Видео должно объяснять продукт, снимать возражения и вести к действию. Мы проектируем структуру так, чтобы каждый кадр работал на цель."
        />
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <article className="card p-6">
            <h3 className="font-semibold">Зачем брендам наши ролики</h3>
            <p className="text-muted mt-2">
              Для e-commerce — серии под карточку товара и ретаргет; для брендов — узнаваемость и образ.
              На старте фиксируем KPI и ключевые selling-points, собираем treatment с драматургией
              «смысл → польза → действие». Производство прозрачно: утверждаем тайминг и смету,
              снимаем сериями (packshot + lifestyle/UGC), на посте ведём цвет по референсам и готовим
              master-версии под площадки.
            </p>
          </article>

          <aside className="card p-6">
            <h3 className="font-semibold">FAQ</h3>
            <details className="mt-2">
              <summary className="cursor-pointer">Сколько длится производство?</summary>
              <p className="text-muted mt-2">Быстрые пакеты — 7–10 дней; сюжетные — от 2–3 недель.</p>
            </details>
            <details className="mt-2">
              <summary className="cursor-pointer">Что нужно от вас?</summary>
              <p className="text-muted mt-2">Тезисы и ссылка на продукт/сайт — остальное сделаем сами.</p>
            </details>
            <details className="mt-2">
              <summary className="cursor-pointer">География</summary>
              <p className="text-muted mt-2">Москва и Санкт-Петербург, выезды по РФ/СНГ.</p>
            </details>
          </aside>
        </div>
      </section>

      {/* 9) Финальный CTA */}
      <section className="section-bottom">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="mx-auto md:mx-0">
            <div className="text-2xl md:text-3xl font-semibold">Обсудим ваш проект?</div>
            <p className="text-muted mt-2 measure">
              Пришлите ссылку на продукт — соберём план и смету сегодня.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/contacts" className="btn btn-primary">Запросить предложение</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}

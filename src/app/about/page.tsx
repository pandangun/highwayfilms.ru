// app/about/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "О компании — Highway Films: видеопродакшн полного цикла в Москве и Санкт-Петербурге",
  description:
    "Highway Films — продакшн рекламы, product-видео, корпоративных фильмов и клипов. Полный цикл: креатив, препрод, съёмка 4K/10-bit, постпрод и версии под площадки.",
  alternates: { canonical: "https://highwayfilms.ru/about" },
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

/* =========================
   Small UI pieces
   ========================= */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5 text-center h-full">
      <div className="stat-value leading-tight">{value}</div>
      <div className="stat-label mt-1">{label}</div>
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

/** Большая «полоска»-утверждение между блоками */
function Statement({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 md:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] bg-[radial-gradient(1200px_280px_at_0%_0%,rgba(124,58,237,.08),transparent_60%),radial-gradient(900px_220px_at_100%_100%,rgba(34,197,94,.08),transparent_60%),rgba(255,255,255,.03)]">
      <p className="font-semibold tracking-tight text-[clamp(2rem,1.2rem+3vw,3rem)] leading-[1.1]">
        {children}
      </p>
    </div>
  );
}

/** Заголовок секции + лид */
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
      {lead && <p className="mt-2 text-muted text-[clamp(1.125rem,1rem+.6vw,1.35rem)] leading-[1.65] measure">{lead}</p>}
    </header>
  );
}

/* =========================
   Page
   ========================= */

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
      {/* HERO: двухколоночный, справа sticky CTA */}
      <section className="grid md:grid-cols-[minmax(0,1fr)_420px] gap-8 items-start md:pt-12">
        <div>
          <div className="eyebrow">About</div>
          <h1 className="h1 mt-2">Highway Films — видеопродакшн полного цикла</h1>
          <p className="lead measure mt-3">
            Делаем рекламные и корпоративные ролики, бренд-фильмы и клипы. Наш подход — сильный визуал,
            ясное повествование и измеримый результат: узнаваемость, конверсии, доверие к продукту.
          </p>

          {/* KPI */}
          <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-3">
            <Stat value="10+ лет" label="в продакшне" />
            <Stat value="50+" label="выпущенных проектов" />
            <Stat value="4K / 10-bit" label="картинка и цвет" />
          </div>
        </div>

        <aside className="card p-6 md:sticky md:top-[calc(var(--header-h)+16px)]">
          <div className="text-xl font-semibold">Нужен продакшн под задачу?</div>
          <p className="text-muted mt-2">
            Пришлите тезисы и ссылку на продукт — подготовим 2–3 формата с бюджетами и сроками.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contacts" className="btn btn-primary">Получить КП</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">Telegram</a>
          </div>
          <p className="text-muted mt-3 text-sm">Москва/СПб, выезды по РФ/СНГ.</p>
        </aside>
      </section>

      {/* Интерлюдия 1 */}
      <section className="mt-8">
        <Statement>
          Мы снимаем видео не «ради красоты», а ради <em>результата</em>: понимание → доверие → действие.
        </Statement>
      </section>

      {/* Почему мы */}
      <section className="mt-10">
        <SectionHeader
          kicker="Подход"
          title="Почему бренды выбирают нас"
          lead="Полный цикл, технологичный пайплайн и фокус на бизнес-результат — не просто красивое видео, а инструмент."
        />
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Интерлюдия 2 */}
      <section className="mt-10">
        <Statement>
          Минимально достаточная продакшн-схема под задачу. Скорость без компромиссов по качеству.
        </Statement>
      </section>

      {/* Что делаем + перелинковка */}
      <section className="mt-10">
        <SectionHeader
          kicker="Форматы"
          title="Что мы производим"
          lead="От чистого packshot до насыщенного lifestyle и UGC. Под конкретную цель собираем правильный набор сцен."
        />
        <div className="mt-5 grid md:grid-cols-4 gap-4">
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
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/commercials" className="btn">Реклама</Link>
          <Link href="/corporate" className="btn">Корпоративное</Link>
          <Link href="/music-videos" className="btn">Клипы</Link>
          <Link href="/videoproduction" className="btn">Видеопродакшн</Link>
        </div>
      </section>

      {/* Интерлюдия 3 */}
      <section className="mt-10">
        <Statement>Доверие строится деталями: свет, фактура, цвет — и чёткая драматургия кадра.</Statement>
      </section>

      {/* Технологии/оборудование */}
      <section className="mt-10">
        <SectionHeader
          kicker="Стек"
          title="Технологии и оборудование"
          lead="Контролируемые световые схемы, лог-профили, колор-менеджмент и стабильные мастер-версии под все каналы."
        />
        <div className="mt-5 grid md:grid-cols-2 gap-4">
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
              (вертикаль/горизонталь) и loudness-нормы. Подготовка мастер-версий.
            </p>
          </div>
        </div>
      </section>

      {/* Процесс */}
      <section className="mt-10">
        <Statement>Прозрачный процесс и предсказуемые сроки: вы понимаете, что происходит на каждом этапе.</Statement>
        <div className="mt-6">
          <SectionHeader title="Как мы работаем" />
        </div>
        <ol className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ListItem n={1} title="Бриф → инсайт" text="ЦА, оффер, барьеры, KPI. Фиксируем продающий порядок фактов." />
          <ListItem n={2} title="Препрод" text="Treatment, борда, свет, реквизит, тайминг. Чек-лист selling-points." />
          <ListItem n={3} title="Съёмка" text="Packshot + lifestyle/UGC. Снимаем сериями — база для A/B-тестов." />
          <ListItem n={4} title="Пост" text="Монтаж → цвет → motion/3D → сабы. Версии 6/15/30/60, верт/гор." />
        </ol>
        <div className="mt-6">
          <Link href="/contacts" className="btn btn-primary">Получить коммерческое предложение</Link>
        </div>
      </section>

      {/* SEO-текст + FAQ */}
      <section className="mt-12">
        <SectionHeader
          kicker="Подход"
          title="Highway Films: что мы решаем"
          lead="Видео должно объяснять продукт, снимать возражения и вести к действию. Мы проектируем структуру так, чтобы каждый кадр работал на цель."
        />
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <article className="card p-6">
            <h3 className="font-semibold">Зачем брендам наши ролики</h3>
            <p className="text-muted mt-2">
              Для e-commerce — серии под карточку товара и ретаргет; для брендов — узнаваемость и образ.
              На старте фиксируем KPI и ключевые selling-points, собираем treatment с драматургией
              «смысл → польза → действие». Цикл производства прозрачный: утверждаем тайминг и смету,
              снимаем сериями (packshot + lifestyle/UGC), на посте ведём цвет по референсам и готовим
              мастер-версии под площадки.
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

      {/* Финальный CTA */}
      <section className="mt-12">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Обсудим ваш проект?</div>
            <p className="text-muted mt-2">Пришлите ссылку на продукт — соберём план и смету сегодня.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contacts" className="btn btn-primary">Запросить предложение</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">Telegram</a>
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

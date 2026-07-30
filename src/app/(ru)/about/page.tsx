import type { Metadata } from "next";
import Image from "next/image";
import GenerativeField from "@/components/GenerativeField";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";

type AboutAdvantage = {
  index: string;
  title: string;
  text: string;
};

type AboutProcessStep = {
  index: string;
  title: string;
  text: string;
};

type AboutFaqItem = {
  q: string;
  a: string;
};

type BackstageStill = {
  title: string;
  note: string;
  image: string;
  sizes: string;
  className?: string;
};

type AboutFocusItem = {
  title: string;
  text: string;
  href: string;
  details: [string, string];
  accentClass: string;
};

const aboutHeroImage = "/video/derived/hero-poster.jpg";

const aboutSearchPhrases = [
  "Видеопродакшн полного цикла",
  "Рекламные ролики",
  "Бренд-фильмы",
  "Корпоративное видео",
  "Москва и Санкт-Петербург",
];

const aboutFocusItems: AboutFocusItem[] = [
  {
    title: "Реклама",
    text: "Рекламные ролики и продуктовые видео для digital, performance, сайта, запусков и презентаций.",
    href: "/commercials",
    details: ["Digital и performance", "Сайт, запуск, презентация"],
    accentClass:
      "from-[rgba(214,183,138,.18)] via-[rgba(214,183,138,.06)] to-transparent",
  },
  {
    title: "Корпоративное видео",
    text: "Интервью, имиджевые ролики, внутренние коммуникации и презентационный контент для бизнеса.",
    href: "/corporate",
    details: ["Интервью и имидж", "Бизнес и коммуникации"],
    accentClass:
      "from-[rgba(92,126,255,.18)] via-[rgba(92,126,255,.06)] to-transparent",
  },
  {
    title: "Свадьбы",
    text: "Свадебные фильмы с кинематографичной съёмкой, ритмом, атмосферой и продуманным монтажом.",
    href: "/weddings",
    details: ["Фильм о дне", "Атмосфера и эмоция"],
    accentClass:
      "from-[rgba(82,184,155,.18)] via-[rgba(82,184,155,.05)] to-transparent",
  },
  {
    title: "Клипы",
    text: "Музыкальные клипы с визуальной концепцией, сильным образом артиста и монтажным темпом.",
    href: "/music-videos",
    details: ["Образ и визуальный язык", "Ритм, атмосфера, монтаж"],
    accentClass:
      "from-[rgba(196,104,142,.18)] via-[rgba(196,104,142,.05)] to-transparent",
  },
];

const aboutAdvantages: AboutAdvantage[] = [
  {
    index: "01",
    title: "Полный цикл",
    text: "Один подрядчик на весь цикл: не приходится сводить оператора, монтажёра и колориста между собой.",
  },
  {
    index: "02",
    title: "Опыт реальных съёмок",
    text: "Наш подход собран не из презентаций, а из работы на площадках, дедлайнах и проектах разного масштаба.",
  },
  {
    index: "03",
    title: "Сильный визуал",
    text: "Свет и оптика — там, где мы тратим больше всего времени. Это видно по шоурилу, и проверить проще, чем поверить на слово.",
  },
  {
    index: "04",
    title: "Процесс без хаоса",
    text: "Список сцен согласован до съёмочного дня. На площадке не решаем заново, что снимаем — поэтому смена не растягивается.",
  },
  {
    index: "05",
    title: "Видео под задачу",
    text: "До съёмки договариваемся, что именно должен сделать ролик: объяснить продукт, поднять доверие или закрыть возражение. От этого зависит всё остальное.",
  },
];

const aboutProcessSteps: AboutProcessStep[] = [
  {
    index: "01",
    title: "Бриф и цель проекта",
    text: "Уточняем, для чего создаётся видео, кто его аудитория, где оно будет размещаться и какой результат должен дать рекламный ролик, бренд-фильм или корпоративное видео.",
  },
  {
    index: "02",
    title: "Концепция и препродакшн",
    text: "Собираем визуальный вектор, сценарную рамку, референсы, план съёмки, график, команду и локации под масштаб проекта.",
  },
  {
    index: "03",
    title: "Съёмка",
    text: "Организуем продакшн так, чтобы на площадке был темп, контроль и материал, с которым удобно работать на монтаже.",
  },
  {
    index: "04",
    title: "Постпродакшн и адаптации",
    text: "Делаем монтаж, цветокоррекцию, графику, звук, титры и версии под сайт, соцсети, рекламу, презентации и внутренние каналы бренда.",
  },
];

const aboutFaqItems: AboutFaqItem[] = [
  {
    q: "Что значит видеопродакшн полного цикла?",
    a: "Съёмка, монтаж, цвет и звук делаются одной командой, поэтому картинка не рассыпается между этапами.",
  },
  {
    q: "Какие видео вы снимаете?",
    a: "Снимаем рекламные ролики, бренд-фильмы, корпоративное видео, интервью, клипы, свадебные фильмы, AI-форматы и другие проекты, где важны визуальный уровень и понятный процесс.",
  },
  {
    q: "Можно ли заказать рекламный ролик или бренд-фильм под ключ?",
    a: "Да. Мы можем вести проект под ключ: от первого обсуждения задачи до готового пакета материалов для сайта, соцсетей, рекламы и внутренних коммуникаций.",
  },
  {
    q: "Работаете ли вы в Москве, Санкт-Петербурге и по России?",
    a: "Да. Highway Films работает как видеопродакшн в Москве и как видеопродакшн в Санкт-Петербурге, а при необходимости выезжает на съёмки в другие города России. Логистику, график и состав команды считаем заранее.",
  },
  {
    q: "Можно ли прийти без готового сценария или ТЗ?",
    a: "Да. Часто хороший видеопроект начинается не с готового документа, а с задачи бизнеса, идеи, продукта или общего направления. Мы помогаем собрать это в рабочую концепцию.",
  },
  {
    q: "Что входит в препродакшн и постпродакшн?",
    a: "В препродакшн входят бриф, концепция, референсы, сценарная рамка, локации, план съёмки и организация команды. В постпродакшн — монтаж, цвет, графика, звук, титры и подготовка финальных версий.",
  },
  {
    q: "Делаете ли вы адаптации видео под сайт, соцсети и рекламу?",
    a: "Да. При необходимости готовим вертикальные версии, cutdowns, короткие рекламные форматы, варианты под сайт, reels, stories и performance-размещения.",
  },
  {
    q: "Подходите ли вы для корпоративного видео и контента для бизнеса?",
    a: "Да. Мы работаем с брендами, компаниями и командами, когда нужен не просто красивый ролик, а видео, которое понятно решает коммуникационную, имиджевую или маркетинговую задачу.",
  },
];

const backstageStills: BackstageStill[] = [
  {
    title: "Свет выставлен, площадка собирается",
    note: "Подготовка кадра до команды «мотор».",
    image: "/images/frames/f001.jpg",
    sizes: "(max-width: 1023px) 100vw, 50vw",
    className: "md:col-span-2",
  },
  {
    title: "Не глянцевый шум, а рабочий темп",
    note: "Люди, техника и контроль по месту.",
    image: "/images/frames/f006.jpg",
    sizes: "(max-width: 1023px) 100vw, 25vw",
  },
  {
    title: "Картинка держится на подготовке",
    note: "Проверки, перестановки и короткие итерации до точного кадра.",
    image: "/images/frames/f018.jpg",
    sizes: "(max-width: 1023px) 100vw, 25vw",
  },
  {
    title: "Backstage без позы",
    note: "Реальный продакшн выглядит именно так.",
    image: "/images/frames/f031.jpg",
    sizes: "(max-width: 1023px) 100vw, 50vw",
    className: "md:col-span-2",
  },
];

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "О нас | Видеопродакшн полного цикла в Москве и Санкт-Петербурге | Highway Films",
    description:
      "Highway Films — студия видеопродакшна полного цикла. Снимаем рекламные ролики, бренд-фильмы, корпоративное видео, клипы и контент для бизнеса в Москве, Санкт-Петербурге и по России.",
    path: "/about",
    locale: "ru",
    imagePath: aboutHeroImage,
  }),
  keywords: [
    "видеопродакшн полного цикла",
    "видеопродакшн москва",
    "видеопродакшн санкт-петербург",
    "продакшн студия",
    "рекламные ролики",
    "бренд-фильмы",
    "корпоративное видео",
    "видеосъёмка для бизнеса",
    "съёмка видео для бренда",
  ],
};

function FaqItem({ item }: { item: AboutFaqItem }) {
  return (
    <details className="group border-t border-white/10 py-5 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
        <span className="font-display max-w-3xl text-xl leading-tight tracking-[-0.03em] text-ink md:text-[1.7rem]">
          {item.q}
        </span>
        <span className="relative mt-1 h-5 w-5 shrink-0 text-ink-faint">
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="max-w-3xl pt-4 text-[0.98rem] leading-7 text-ink-muted">{item.a}</div>
    </details>
  );
}

export default function AboutPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aboutFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Highway Films",
    url: `${SITE_URL}/about`,
    email: "info@highway-films.ru",
    description:
      "Highway Films — студия видеопродакшна полного цикла. Снимаем рекламные ролики, бренд-фильмы, корпоративное видео, клипы и контент для бизнеса в Москве, Санкт-Петербурге и по России.",
    sameAs: ["https://t.me/highwayfilms"],
    areaServed: [
      { "@type": "City", name: "Москва" },
      { "@type": "City", name: "Санкт-Петербург" },
      { "@type": "Country", name: "Россия" },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "О нас",
        item: `${SITE_URL}/about`,
      },
    ],
  };

  return (
    <div className="page-shell">
      <div className="page-ambient" />
      <div className="container page-content pt-header-safe pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <section className="py-8 md:py-12">
          <div className="relative min-h-[36rem] overflow-hidden rounded-none border border-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.34)] lg:min-h-[44rem]">
            <Image
              src={aboutHeroImage}
              alt="Команда Highway Films на съёмке рекламного видео"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,8,.2),rgba(7,7,8,.36)_24%,rgba(7,7,8,.68)_68%,rgba(7,7,8,.9)),radial-gradient(80%_70%_at_0%_0%,rgba(0,0,0,.16),transparent_60%),radial-gradient(70%_70%_at_100%_100%,rgba(214,183,138,.1),transparent_60%)]" />
            <div className="relative z-[1] flex min-h-[36rem] flex-col justify-between gap-10 px-6 py-6 md:px-8 md:py-8 lg:min-h-[44rem] lg:px-10 lg:py-10">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                <span>Highway Films</span>
                <span>О нас</span>
                <span>Продакшн полного цикла</span>
              </div>

              <div className="grid gap-10 xl:grid-cols-[1.16fr_0.84fr] xl:items-end">
                <div className="max-w-4xl">
                  <p className="eyebrow text-ink-faint">Видеопродакшн полного цикла</p>
                  <h1 className="font-display mt-4 max-w-5xl text-[clamp(3rem,6.3vw,6.25rem)] leading-[0.92] tracking-[-0.05em] text-ink">
                    Highway Films снимает видео, которое работает на бренд, бизнес и сильную визуальную историю.
                  </h1>
                  <p className="mt-6 max-w-3xl text-[1.08rem] leading-8 text-ink-muted md:text-[1.22rem]">
                    Мы создаём рекламные ролики, бренд-фильмы, корпоративное видео, клипы и спецпроекты. Базово
                    работаем как видеопродакшн в Москве и как видеопродакшн в Санкт-Петербурге, выезжаем на съёмки по
                    России и ведём проект от идеи до финального мастера.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contacts" className="btn-primary h-12 rounded-full px-6">
                      Обсудить проект
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="https://t.me/highwayfilms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn h-12 rounded-full px-6"
                    >
                      Telegram
                    </a>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-none border border-white/12 bg-white/[0.06] px-5 py-5 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-ink-faint">Что снимаем</p>
                    <p className="mt-3 font-display text-[1.5rem] leading-[1.02] tracking-[-0.035em] text-ink">
                      Рекламные ролики, бренд-фильмы, корпоративные видео и контент для digital.
                    </p>
                  </div>
                  <div className="rounded-none border border-white/12 bg-white/[0.06] px-5 py-5 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-ink-faint">География</p>
                    <p className="mt-3 font-display text-[1.5rem] leading-[1.02] tracking-[-0.035em] text-ink">
                      Москва, Санкт-Петербург и выездные съёмки по России.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {aboutSearchPhrases.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="rounded-none border border-white/10 bg-[radial-gradient(90rem_48rem_at_0%_0%,rgba(124,58,237,.1),transparent_56%),linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.012)),rgba(8,8,10,.72)] px-6 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:px-8 md:py-8 lg:px-10 lg:py-10">
            <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr] xl:gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <p className="eyebrow text-ink-faint">Кто мы</p>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/14 to-transparent" />
                </div>

                <div className="relative overflow-hidden rounded-none border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015)),rgba(4,4,5,.78)] px-5 py-6 md:px-7 md:py-8">
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[radial-gradient(80%_80%_at_100%_50%,rgba(214,183,138,.12),transparent_72%)]" />
                  <p className="text-[10px] uppercase tracking-[0.24em] text-ink-faint">Highway Films</p>
                  <h2 className="font-display relative z-[1] mt-5 max-w-[11ch] text-[clamp(3rem,5vw,5.4rem)] leading-[0.88] tracking-[-0.05em] text-ink">
                    Студия видеопродакшна, которая выросла из реальных съёмок, а не из красивых формулировок.
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-none border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Фокус</p>
                    <p className="mt-3 text-sm leading-6 text-ink-muted">
                      Рекламные ролики, бренд-фильмы, корпоративное видео, интервью, клипы и спецпроекты.
                    </p>
                  </div>
                  <div className="rounded-none border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">География</p>
                    <p className="mt-3 text-sm leading-6 text-ink-muted">
                      Москва, Санкт-Петербург и выездные съёмки по России с заранее просчитанной логистикой.
                    </p>
                  </div>
                </div>

                <div className="rounded-none border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.01)),rgba(4,4,5,.62)] px-5 py-6 md:px-7 md:py-7">
                  <div className="space-y-5">
                    <p className="max-w-3xl text-[1.03rem] leading-8 text-ink-muted">
                      Highway Films — продакшн студия полного цикла. Мы снимаем видео для брендов, компаний, команд и
                      проектов, которым нужен не просто визуально сильный ролик, а рабочий инструмент для коммуникации,
                      продаж, имиджа или запуска продукта.
                    </p>
                    <p className="max-w-3xl text-[1.03rem] leading-8 text-ink-muted">
                      В фокусе команды: рекламные ролики, бренд-фильмы, корпоративное видео, интервью, клипы и другие
                      форматы, где важно связать идею, съёмку и постпродакшн в одну понятную систему. Мы не отделяем
                      креатив от производства и не разрываем проект на случайные куски.
                    </p>
                    <p className="max-w-3xl text-[1.03rem] leading-8 text-ink-muted">
                      Для локальных запросов это тоже важно: мы работаем как видеопродакшн в Москве и как
                      видеопродакшн в Санкт-Петербурге, но география не ограничивается двумя городами. Если проект
                      требует выезда, заранее собираем маршрут, логистику, график и состав команды, чтобы съёмка
                      оставалась управляемой и точной.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-8 flex items-center gap-4">
              <p className="eyebrow text-ink-faint">Что снимаем</p>
              <span className="h-px flex-1 bg-gradient-to-r from-white/14 via-white/8 to-transparent" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {aboutFocusItems.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      // on-dark: фон карточки зашит тёмным rgba(6,6,8,.84) и не
                      // зависит от темы — текст поверх остаётся светлым.
                      "on-dark group relative block overflow-hidden rounded-none border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.012)),rgba(6,6,8,.84)] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.26)] transition duration-500 hover:-translate-y-1.5 hover:border-white/18 hover:shadow-[0_30px_100px_rgba(0,0,0,0.34)] md:px-6 md:py-6",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-85 transition duration-500 group-hover:opacity-100",
                        item.accentClass,
                      ].join(" ")}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_0%,rgba(255,255,255,.09),transparent_58%)] opacity-50" />
                    <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-gradient-to-r from-white/18 via-white/8 to-transparent md:inset-x-6" />
                    <div className="pointer-events-none absolute bottom-5 right-5 h-20 w-20 rounded-full border border-white/8 opacity-30 blur-[1px] transition duration-500 group-hover:scale-110 group-hover:opacity-45 md:bottom-6 md:right-6" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,.07),transparent_68%)] opacity-40" />

                    <div className="relative z-[1] flex min-h-[24rem] flex-col">
                      <div className="flex items-start justify-end">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                          Раздел
                        </span>
                      </div>

                      <div className="mt-8 min-h-[5.2rem]">
                        <h3 className="font-display max-w-[11ch] text-[1.72rem] leading-[0.94] tracking-[-0.04em] text-ink md:text-[2.08rem]">
                          {item.title}
                        </h3>
                      </div>

                      <div className="mt-4 min-h-[10.5rem]">
                        <p className="max-w-[27rem] text-[0.98rem] leading-7 text-ink-muted">
                          {item.text}
                        </p>
                      </div>

                      <div className="mt-auto pt-7">
                        <span className="block h-px w-full bg-gradient-to-r from-white/18 via-white/6 to-transparent" />
                        <div className="mt-4 min-h-[4.5rem] content-start flex flex-wrap gap-2">
                          {item.details.map((detail) => (
                            <span
                              key={detail}
                              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] leading-none text-ink-faint"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 flex items-center justify-between text-[0.82rem] uppercase tracking-[0.18em] text-ink-faint transition duration-500 group-hover:text-ink-muted">
                          <span>Перейти в раздел</span>
                          <ArrowRight className="h-4 w-4 transition duration-500 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mb-8 flex items-center gap-4">
            <p className="eyebrow text-ink-faint">Почему мы</p>
            <span className="h-px flex-1 bg-gradient-to-r from-white/14 via-white/8 to-transparent" />
          </div>

          {/* on-dark: bg-black не зависит от темы, текст остаётся светлым */}
          <div className="on-dark relative overflow-hidden rounded-none border border-white/10 bg-black px-2 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,7,.72),rgba(6,6,7,.82)_36%,rgba(6,6,7,.9)),radial-gradient(80rem_40rem_at_18%_0%,rgba(26,42,88,.18),transparent_58%),radial-gradient(56rem_26rem_at_100%_100%,rgba(122,34,64,.16),transparent_60%),radial-gradient(52rem_24rem_at_52%_42%,rgba(255,255,255,.04),transparent_64%)]" />
            <div className="pointer-events-none absolute inset-x-6 top-3 h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.16)_0_12px,transparent_12px_24px)] opacity-20" />
            <div className="pointer-events-none absolute inset-x-6 bottom-3 h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.16)_0_12px,transparent_12px_24px)] opacity-20" />
            <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/8 via-white/18 to-white/8" />

            <div className="relative z-[1] flex snap-x snap-mandatory overflow-x-auto no-scrollbar lg:min-w-0">
              {aboutAdvantages.map((item, index) => {
                return (
                  <article
                    key={item.index}
                    className="relative flex w-[17rem] shrink-0 snap-start flex-col px-5 py-10 lg:w-1/5 lg:px-6"
                  >
                    <span className="pointer-events-none absolute left-[1.35rem] top-[calc(50%-4.25rem)] h-12 w-px bg-white/12 lg:left-[1.6rem]" />
                    <span className="pointer-events-none absolute left-[1.1rem] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/14 bg-black/80 shadow-[0_0_0_6px_rgba(255,255,255,0.02)] lg:left-[1.35rem]" />
                    <span className="pointer-events-none absolute left-[1.35rem] top-[calc(50%+1rem)] h-12 w-px bg-white/12 lg:left-[1.6rem]" />

                    <div className="relative grid min-h-[20rem] grid-rows-[9.5rem_minmax(0,1fr)]">

                      <div className="flex flex-col items-start pt-1">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-ink-faint">
                          {item.index}
                        </span>
                        <h3 className="font-display mt-3 max-w-[11ch] text-[1.7rem] leading-[0.95] tracking-[-0.035em] text-ink">
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-start pt-12">
                        <p className="max-w-[16rem] text-sm leading-6 text-ink-muted">
                          {item.text}
                        </p>
                      </div>
                    </div>
                    {index < aboutAdvantages.length - 1 ? (
                      <span className="pointer-events-none absolute right-0 top-1/2 h-16 w-px -translate-y-1/2 bg-white/8" />
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mb-8 flex items-center gap-4">
            <p className="eyebrow text-ink-faint">Подход</p>
            <span className="h-px flex-1 bg-gradient-to-r from-white/14 via-white/8 to-transparent" />
          </div>

          {/* Был DarkVeil: шейдер со сканлайнами, варпом и дрожанием поверх
              чёрной панели в рамке. На экране это читалось как помеха в
              телевизоре, а не как фактура. Теперь то же генеративное поле,
              что на главной и в контактах, и никакой коробки вокруг. */}
          <div className="relative overflow-hidden">
            <GenerativeField className="opacity-60" />

            <div className="relative z-[1] py-8 md:py-10">
              <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr] xl:items-end">
                <p className="font-display max-w-5xl text-[clamp(2rem,2vw+1.2rem,4.1rem)] leading-[1.02] tracking-[-0.045em] text-ink">
                  Мы не делаем видео ради жеста. Мы создаём ролики и фильмы, у которых есть конкретная задача.
                </p>
                <p className="max-w-lg text-[1rem] leading-7 text-ink-muted">
                  Удержать внимание, усилить бренд, объяснить продукт, собрать доверие, показать команду или сохранить
                  событие. Для нас красивый кадр важен, но он должен работать на смысл и результат.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-ink-faint">Как мы работаем</p>
              <h2 className="font-display mt-3 text-3xl tracking-[-0.04em] text-ink md:text-[2.8rem]">
                От идеи до релиза без хаоса на площадке и в посте.
              </h2>
            </div>
            <p className="max-w-xl text-ink-muted">
              Каждый этап нужен для того, чтобы итоговое видео было сильнее, а процесс оставался прозрачным и
              управляемым для клиента.
            </p>
          </div>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute bottom-0 left-[1.05rem] top-0 w-px bg-gradient-to-b from-white/15 via-white/10 to-transparent md:left-[4.85rem]" />
            {aboutProcessSteps.map((step, index) => (
              <article
                key={step.index}
                className={[
                  "relative grid gap-4 border-t border-white/10 py-7 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-10",
                  index === 0 ? "border-t-0 pt-0" : "",
                ].join(" ")}
              >
                <div className="pl-10 md:pl-0">
                  <span className="absolute left-0 top-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-[11px] uppercase tracking-[0.18em] text-ink-muted md:left-[4.85rem] md:-translate-x-1/2">
                    {step.index}
                  </span>
                  <span className="font-display text-[2.8rem] leading-none tracking-[-0.05em] text-ink-ghost md:text-[4rem]">
                    {step.index}
                  </span>
                </div>
                <div className="pl-10 md:pl-0">
                  <h3 className="font-display text-[1.7rem] leading-tight tracking-[-0.03em] text-ink md:text-[2.2rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-ink-muted">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-ink-faint">За кадром / production stills</p>
              <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-[-0.04em] text-ink md:text-[2.8rem]">
                Настоящий продакшн выглядит не как витрина, а как собранная рабочая среда.
              </h2>
            </div>
            <p className="max-w-xl text-ink-muted">
              Здесь важны свет, подготовка, ритм команды, паузы между дублями и контроль над деталями. Именно это и
              держит итоговый кадр.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {backstageStills.map((item) => (
              <article
                key={item.image}
                className={[
                  "group relative min-h-[18rem] overflow-hidden rounded-none border border-white/10 bg-white/[0.03] shadow-[0_24px_70px_rgba(0,0,0,0.24)]",
                  item.className ?? "",
                ].join(" ")}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={item.sizes}
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,.06),rgba(8,8,10,.14)_34%,rgba(8,8,10,.8)_100%)]" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-ink-faint">
                  <span>Backstage</span>
                  <span>Highway Films</span>
                </div>
                <div className="absolute inset-x-5 bottom-5 max-w-md">
                  <h3 className="font-display text-[1.45rem] leading-[1.02] tracking-[-0.03em] text-ink md:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-ink-muted">{item.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-ink-faint">Локальный SEO</p>
              <h2 className="font-display mt-3 max-w-4xl text-3xl tracking-[-0.04em] text-ink md:text-[2.8rem]">
                Видеопродакшн в Москве и Санкт-Петербурге для брендов, бизнеса и рекламных задач.
              </h2>
            </div>
            <p className="max-w-xl text-ink-muted">
              Этот блок усиливает локальную релевантность страницы и при этом остаётся нормальным по тону и смыслу для
              живого сайта.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <article className="rounded-none border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015)),rgba(8,8,10,.76)] px-6 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:px-8 md:py-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-ink-faint">Москва</p>
              <h3 className="font-display mt-4 text-[clamp(2rem,3vw,3.2rem)] leading-[0.96] tracking-[-0.04em] text-ink">
                Видеопродакшн в Москве
              </h3>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-ink-muted">
                Если вам нужен видеопродакшн в Москве, мы можем взять на себя весь цикл работ: от брифа и концепции до
                съёмки, монтажа, цветокоррекции и финальных адаптаций. Работаем с рекламными роликами, бренд-фильмами,
                корпоративным видео и digital-контентом для компаний, агентств и команд.
              </p>
              <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-ink-muted">
                Москва часто требует плотной логистики, точного тайминга и собранного продакшна. Поэтому мы заранее
                планируем площадку, график, технику и съёмочную группу, чтобы проект двигался без хаоса и лишних
                потерь времени.
              </p>
            </article>

            <article className="rounded-none border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015)),rgba(8,8,10,.76)] px-6 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:px-8 md:py-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-ink-faint">Санкт-Петербург</p>
              <h3 className="font-display mt-4 text-[clamp(2rem,3vw,3.2rem)] leading-[0.96] tracking-[-0.04em] text-ink">
                Видеопродакшн в Санкт-Петербурге
              </h3>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-ink-muted">
                Как видеопродакшн в Санкт-Петербурге, мы работаем с брендами и бизнесом, которым нужен сильный визуал,
                продуманный процесс и видео под конкретную задачу. Снимаем рекламные ролики, брендовые истории,
                корпоративные фильмы, интервью и контент для сайта, соцсетей и рекламных размещений.
              </p>
              <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-ink-muted">
                Для проектов в Санкт-Петербурге нам важны не только кадр и атмосфера, но и точная организация
                продакшна: подготовка, ритм команды, работа с локациями и финальная выдача материалов под нужные
                каналы.
              </p>
            </article>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="rounded-none border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015)),rgba(8,8,10,.76)] px-6 py-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:px-8">
            {aboutFaqItems.map((item) => (
              <FaqItem key={item.q} item={item} />
            ))}
          </div>
        </section>

        <section className="pb-6 pt-14 md:pt-18">
          <div className="on-dark relative overflow-hidden rounded-none border border-white/10 bg-[radial-gradient(80rem_34rem_at_0%_0%,rgba(124,58,237,.2),transparent_56%),radial-gradient(46rem_22rem_at_100%_100%,rgba(214,183,138,.12),transparent_54%),linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.016)),rgba(8,8,10,.8)] px-6 py-8 shadow-[0_30px_84px_rgba(0,0,0,0.36)] md:px-8 md:py-10 lg:px-10">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] bg-[radial-gradient(72%_82%_at_100%_50%,rgba(255,255,255,.08),transparent_70%)] lg:block" />
            <div className="relative z-[1] flex flex-col gap-8">
              <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                <div className="max-w-3xl">
                  <p className="eyebrow text-ink-faint">Следующий шаг</p>
                  <h2 className="font-display mt-3 text-[clamp(2.2rem,4.2vw,4.4rem)] leading-[0.96] tracking-[-0.045em] text-ink">
                    Если вам нужен рекламный ролик, бренд-фильм или корпоративное видео, присылайте задачу.
                  </h2>
                  <p className="mt-5 max-w-2xl text-[1.03rem] leading-8 text-ink-muted">
                    Поможем определить формат, объём работ, состав продакшна и следующий шаг. Для хорошего старта не
                    всегда нужен готовый бриф, иногда достаточно нормального разговора по сути проекта.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
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

              <div className="flex flex-col gap-5 border-t border-white/10 pt-5 text-sm text-ink-faint md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <p className="font-display text-[1.4rem] tracking-[-0.03em] text-ink">
                    Highway Films — видеопродакшн полного цикла.
                  </p>
                  <p className="mt-2 leading-7">
                    Рекламные ролики, бренд-фильмы, корпоративное видео, клипы, свадебные фильмы, AI и спецформаты.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-ink-faint md:justify-end">
                  <span>Москва / Санкт-Петербург / выездные съёмки</span>
                  <a href="mailto:info@highway-films.ru" className="transition hover:text-ink-muted">
                    info@highway-films.ru
                  </a>
                  <a
                    href="https://t.me/highwayfilms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-ink-muted"
                  >
                    Telegram
                  </a>
                  <Link href="/brief" className="transition hover:text-ink-muted">
                    Brief
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

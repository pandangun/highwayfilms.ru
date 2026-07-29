import "@/app/styles/corporate.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReelSection from "@/components/ReelSection";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Корпоративное и презентационное видео — Highway Films",
  description:
    "Фильмы о компании, производстве, HR и презентациях. Корпоративное видео, которое объясняет ценность бизнеса без визуальной бюрократии.",
  path: "/corporate",
  locale: "ru",
  imagePath: "/images/corporate/office%20(3)_main_1.png",
});

const corporateImages = {
  hero: "/images/corporate/office%20(3)_main_1.png",
  heroMobile: "/images/corporate/office%20(3)_main_end.png",
  caseProduction: "/images/corporate/office%20(1).png",
  caseInvest: "/images/corporate/office%20(2).png",
  caseHr: "/images/corporate/office%20(4).png",
  caseExplainer: "/images/corporate/office%20(3)_main_end.png",
} as const;

const heroLabels = [
  "Фильм о компании",
  "Инвест-презентации",
  "HR видео",
  "Product explainers",
  "Видео для выставок",
  "Фильм о компании",
  "Инвест-презентации",
  "HR видео",
  "Product explainers",
  "Видео для выставок",
];

const cases = [
  {
    title: "Фильм о производстве",
    description: "Промышленная площадка, процессы и люди в одном выверенном повествовании.",
    image: corporateImages.caseProduction,
  },
  {
    title: "Инвестиционная презентация",
    description: "Чёткая структура, сильные ключевые кадры и никаких лишних слов.",
    image: corporateImages.caseInvest,
  },
  {
    title: "HR-бренд компании",
    description: "Видео, которое объясняет культуру и помогает рекрутменту.",
    image: corporateImages.caseHr,
  },
  {
    title: "Продуктовое объяснение",
    description: "Смысл, польза и отличия продукта — ясно и визуально.",
    image: corporateImages.caseExplainer,
  },
] as const;

const steps = [
  {
    index: "01",
    title: "Разбираем бизнес и задачу",
    text: "Фиксируем, что именно нужно объяснить и кому: клиенту, партнёру, команде или инвестору.",
  },
  {
    index: "02",
    title: "Формируем структуру видео",
    text: "Собираем сценарный каркас и визуальную логику, чтобы ролик работал как аргумент, а не как набор красивых кадров.",
  },
  {
    index: "03",
    title: "Снимаем ключевые сцены",
    text: "Интервью, процессы, детали и пространство — в стиле, который усиливает доверие и читает масштаб бизнеса.",
  },
  {
    index: "04",
    title: "Монтируем и упаковываем материал",
    text: "Готовим главную версию и адаптации под площадки, презентации, выставки и экраны.",
  },
] as const;

export default function CorporatePage() {
  return (
    // on-dark: фон .corporate-page зашит тёмным и не переключается по теме
    <div className="on-dark page-shell corporate-page">
      <div className="page-ambient corporate-ambient" />

      <section className="corporate-hero">
        <div className="corporate-hero__bg" aria-hidden>
          <Image
            src={corporateImages.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="corporate-hero__overlay" />
          <div className="corporate-hero__vignette" />
          <div className="corporate-hero__grain" />
        </div>

        <div className="container corporate-hero__content">
          <div className="on-dark corporate-hero__copy cinematic-reveal">
            <p className="eyebrow text-white/54">Корпоративное видео</p>
            <h1 className="corporate-hero__title font-display text-white">
              <span>Корпоративные</span>
              <span>и презентационные</span>
              <span>фильмы</span>
            </h1>
            <p className="corporate-hero__lead text-white/70">
              Видео, которое объясняет бизнес, продукт и экспертизу компании.
            </p>
            <div className="corporate-hero__actions">
              <Link href="/contacts" className="home-primary-button">
                Запросить КП
              </Link>
              <a
                href="https://t.me/highwayfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="home-secondary-link"
              >
                Telegram
              </a>
            </div>
            <div className="corporate-hero__ribbon" aria-hidden>
              <div className="corporate-hero__ribbon-track">
                {heroLabels.map((label, index) => (
                  <span key={`${label}-${index}`} className="corporate-hero__ribbon-item">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="corporate-hero__media-card cinematic-reveal delay-1">
            <div className="corporate-hero__media-frame">
              <Image
                src={corporateImages.heroMobile}
                alt="Корпоративный фильм Highway Films"
                fill
                sizes="(max-width: 768px) 92vw, 40vw"
                className="object-cover"
              />
              <div className="corporate-hero__media-overlay" />
            </div>
          </div>
        </div>
      </section>

      <ReelSection
        section="corporate"
        eyebrow="Примеры работ"
        title="Как это выглядит"
        mode="reel"
      />

      <section className="corporate-section">
        <div className="container cinematic-reveal">
          <div className="corporate-section__head">
            <p className="eyebrow text-white/50">Кейсы</p>
            <h2 className="corporate-section__title font-display text-white">
              Кинематографичная галерея корпоративных историй.
            </h2>
            <p className="corporate-section__lead text-white/64">
              Видео работает как инструмент объяснения: структура, визуальная ясность и доверие на каждом кадре.
            </p>
          </div>

          {/* Кейсы были карточками в горизонтальной прокрутке: кадр под
              затемнением, подпись поверх и появляется только при наведении —
              на телефоне её не увидеть вовсе. Теперь обычная сетка, кадр
              открыт, подпись под ним за линией. */}
          <div className="mt-9 grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((item) => (
              <article key={item.title}>
                <div className="on-dark relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 border-t border-hairline pt-4">
                  <h3 className="font-display text-display-sm leading-[var(--leading-title)] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-ink-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="corporate-section corporate-section--timeline">
        <div className="container cinematic-reveal delay-1">
          <div className="corporate-section__head">
            <p className="eyebrow text-white/50">Как работает корпоративное видео</p>
            <h2 className="corporate-section__title font-display text-white">
              Процесс построен как структура фильма, а не как набор разрозненных съёмок.
            </h2>
          </div>

          <div className="corporate-timeline">
            {steps.map((step) => (
              <article key={step.index} className="corporate-step">
                <div className="corporate-step__index">{step.index}</div>
                <div className="corporate-step__body">
                  <h3 className="corporate-step__title">{step.title}</h3>
                  <p className="corporate-step__text">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

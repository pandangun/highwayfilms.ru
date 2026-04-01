import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";
import PriceBadge from "@/components/PriceBadge";
import {
  weddingCases,
  weddingExtras,
  weddingFaqItems,
  weddingFrames,
  weddingHeroProof,
  weddingProcessSteps,
  weddingReviews,
  weddingSeoSections,
  weddingStoryFormats,
  weddingTrustReasons,
} from "@/data/weddings";

export const metadata: Metadata = buildPageMetadata({
  title: "Свадебная видеосъёмка в Москве и Санкт-Петербурге — Highway Films",
  description:
    "Свадебная видеосъёмка и свадебные фильмы Highway Films: камерные истории, большие банкетные дни, тизер, фильм, полные версии и аккуратный студийный подход в Москве, Санкт-Петербурге и по России.",
  path: "/weddings",
  locale: "ru",
  imagePath: weddingFrames[0].src,
});

function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  if (variant === "primary") {
    return (
      <Link href={href} className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm">
        {children}
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link href={href} className="btn inline-flex items-center justify-center rounded-full px-6 py-3 text-sm">
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-5 py-2.5 text-sm text-white/82 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </Link>
  );
}

function QA({ q, a }: { q: string; a: string }) {
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

function AmbientSection({
  children,
  className = "",
  ambientClassName = "",
}: {
  children: ReactNode;
  className?: string;
  ambientClassName?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className={`pointer-events-none absolute inset-0 -z-10 ${ambientClassName}`} aria-hidden />
      {children}
    </section>
  );
}

export default function WeddingsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Свадебная видеосъёмка Highway Films",
    serviceType: "Свадебная видеосъёмка",
    description:
      "Свадебная видеосъёмка, тизеры, свадебный фильм, полные версии церемонии и речей, вертикальные версии для соцсетей в Москве, Санкт-Петербурге и с выездом по России.",
    url: `${SITE_URL}/weddings`,
    image: weddingFrames.map((frame) => `${SITE_URL}${frame.src}`),
    provider: {
      "@type": "Organization",
      name: "Highway Films",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Москва" },
      { "@type": "City", name: "Санкт-Петербург" },
      { "@type": "Country", name: "Россия" },
    ],
    offers: weddingStoryFormats.map((item) => ({
      "@type": "Offer",
      name: item.title,
      url: `${SITE_URL}${item.href}`,
      priceCurrency: "RUB",
      price: Number(item.price.replace(/[^\d]/g, "")),
      description: item.description,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: weddingFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <AmbientSection
          className="pt-header-safe pb-14 md:pb-18"
          ambientClassName="bg-[radial-gradient(72rem_38rem_at_8%_0%,rgba(124,58,237,.22),transparent_58%),radial-gradient(52rem_30rem_at_100%_0%,rgba(214,183,138,.16),transparent_48%),linear-gradient(180deg,rgba(255,255,255,.03),transparent_42%)]"
        >
          <div className="container grid gap-10 pt-6 md:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="measure max-w-none">
              <span className="inline-flex rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[12px] uppercase tracking-[0.18em] text-white/76">
                Свадебные фильмы Highway Films
              </span>
              <h1 className="font-display heading-balance mt-5 max-w-5xl text-[clamp(3rem,5.9vw,6rem)] leading-[0.94] tracking-[-0.055em] text-white">
                Снимаем свадьбы так, чтобы через годы оставался не только кадр, но и ритм дня.
              </h1>
              <p className="mt-5 max-w-3xl text-[1.08rem] leading-8 text-white/68 md:text-[1.18rem]">
                Делаем свадебную видеосъёмку для пар, которым важны живые эмоции, красивый свет и спокойная работа без суеты.
                На выходе вы получаете тизер, свадебный фильм, полные версии ключевых моментов и удобные материалы для публикации.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <CTAButton href="/contacts?topic=weddings">Узнать стоимость</CTAButton>
                <CTAButton href="#wedding-cases" variant="secondary">
                  Смотреть кейсы
                </CTAButton>
                <CTAButton href="https://t.me/highwayfilms" variant="ghost">
                  Написать в Telegram
                </CTAButton>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {weddingHeroProof.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-white/52">
                <span>Ответим в день обращения</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/20 md:block" />
                <span>Поможем понять тайминг ещё до съёмки</span>
              </div>
            </div>

            <div className="surface-panel relative overflow-hidden p-3 md:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image
                  src={weddingFrames[0].src}
                  alt={weddingFrames[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,9,.08),rgba(8,8,9,.62))]" />
                <div className="absolute inset-x-5 bottom-5 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/12 bg-black/35 px-4 py-4 backdrop-blur-sm">
                    <div className="text-3xl font-semibold tracking-[-0.04em] text-white">3–5 дней</div>
                    <div className="mt-1 text-sm leading-6 text-white/64">до первого тизера после свадьбы</div>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-black/35 px-4 py-4 backdrop-blur-sm">
                    <div className="text-3xl font-semibold tracking-[-0.04em] text-white">3–4 недели</div>
                    <div className="mt-1 text-sm leading-6 text-white/64">до финального фильма и материалов</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {weddingFrames.slice(1, 4).map((frame) => (
                  <div key={frame.src} className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/10">
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/28 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="py-10 md:py-14"
          ambientClassName="bg-[radial-gradient(58rem_28rem_at_100%_50%,rgba(124,58,237,.12),transparent_54%),linear-gradient(180deg,transparent,rgba(255,255,255,.02),transparent)]"
        >
          <div className="container">
            <div className="card-cinematic overflow-hidden p-4 md:p-5">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px]">
                  <Image
                    src={weddingFrames[2].src}
                    alt={weddingFrames[2].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 54vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,8,.02),rgba(7,7,8,.55))]" />
                </div>
                <div className="surface-quiet flex flex-col justify-between p-6 md:p-7">
                  <div>
                    <p className="eyebrow text-white/42">Подход</p>
                    <h2 className="font-display heading-balance mt-3 text-[clamp(2.2rem,1.6rem+2vw,3.6rem)] leading-[0.95] tracking-[-0.04em] text-white">
                      Не ставим свадьбу заново ради красивого кадра.
                    </h2>
                    <p className="mt-4 text-base leading-8 text-white/62 md:text-[1.02rem]">
                      Нам важен живой ход дня. Поэтому мы вмешиваемся ровно настолько, чтобы усилить результат, а не забрать у
                      события естественность. Это и даёт ощущение премиальной, но спокойной работы студии.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <CTAButton href="/videoproduction" variant="secondary">
                      Посмотреть подход студии
                    </CTAButton>
                    <CTAButton href="/contacts?topic=weddings">Обсудить дату</CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="py-12 md:py-16"
          ambientClassName="bg-[radial-gradient(54rem_26rem_at_0%_12%,rgba(255,255,255,.03),transparent_58%),radial-gradient(44rem_24rem_at_100%_100%,rgba(124,58,237,.1),transparent_56%)]"
        >
          <div id="wedding-cases" className="container">
            <div className="mb-8 max-w-3xl">
              <p className="eyebrow">Кейсы</p>
              <h2 className="font-display heading-balance mt-3 text-[clamp(2.2rem,1.7rem+1.7vw,3.6rem)] leading-[0.96] tracking-[-0.04em] text-white">
                Не просто красивые кадры, а понятные сценарии результата.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/62 md:text-[1.02rem]">
                Пока часть карточек собрана как временные mock-кейсы, но структура уже взрослая: под реальные проекты, deliverables
                и формат съёмки без декоративного шума.
              </p>
            </div>
            <div className="grid gap-5 xl:grid-cols-2">
              {weddingCases.map((item) => (
                <article key={item.slug} className="surface-panel overflow-hidden p-3">
                  <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[24px]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 28vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/12 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/72">
                        {item.city}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-5 p-2">
                      <div>
                        <h3 className="font-display text-[clamp(1.7rem,1.35rem+.9vw,2.35rem)] leading-[0.98] tracking-[-0.03em] text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/46">{item.format}</p>
                        <p className="mt-4 text-sm leading-7 text-white/68">{item.description}</p>
                        <p className="mt-4 text-sm leading-7 text-white/62">{item.deliverables}</p>
                        <p className="mt-4 text-sm leading-7 text-white/54">{item.coverage}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <CTAButton href={item.href} variant="secondary">
                          {item.cta}
                        </CTAButton>
                        <span className="text-sm text-white/45">Готово под реальные свадебные проекты и публикацию кейсов</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="py-12 md:py-16"
          ambientClassName="bg-[radial-gradient(42rem_22rem_at_50%_0%,rgba(214,183,138,.08),transparent_56%),linear-gradient(180deg,rgba(255,255,255,.02),transparent)]"
        >
          <div className="container">
            <div className="mb-8 max-w-3xl">
              <p className="eyebrow">Процесс</p>
              <h2 className="font-display heading-balance mt-3 text-[clamp(2.15rem,1.7rem+1.8vw,3.6rem)] leading-[0.96] tracking-[-0.04em] text-white">
                Как проходит работа, чтобы вам было спокойно ещё до съёмки.
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {weddingProcessSteps.map((item, index) => (
                <div key={item.step} className="surface-quiet relative p-6">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="font-display text-3xl leading-none text-white/88">{item.step}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                  <h3 className="font-display text-[1.6rem] leading-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{item.description}</p>
                  {index < weddingProcessSteps.length - 1 ? (
                    <div className="pointer-events-none absolute inset-y-6 -right-2 hidden w-4 bg-gradient-to-r from-white/10 to-transparent lg:block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="py-12 md:py-16"
          ambientClassName="bg-[radial-gradient(56rem_28rem_at_100%_20%,rgba(124,58,237,.15),transparent_58%),radial-gradient(34rem_18rem_at_10%_90%,rgba(255,255,255,.025),transparent_58%)]"
        >
          <div className="container">
            <div className="mb-8 max-w-3xl">
              <p className="eyebrow">Форматы</p>
              <h2 className="font-display heading-balance mt-3 text-[clamp(2.15rem,1.7rem+1.8vw,3.6rem)] leading-[0.96] tracking-[-0.04em] text-white">
                Пакеты, которые помогают выбрать, а не оставляют вас один на один с прайсом.
              </h2>
            </div>
            <div className="grid gap-5 xl:grid-cols-[1.02fr_1.15fr_1.02fr] xl:items-start">
              {weddingStoryFormats.map((format) => (
                <div key={format.id} className={format.accent ? "xl:-translate-y-2" : ""}>
                  <article
                    className={
                      format.accent
                        ? "rounded-[30px] p-[1px] [background:linear-gradient(145deg,rgba(168,85,247,.75),rgba(255,255,255,.18))]"
                        : "surface-panel p-3"
                    }
                  >
                    <div
                      className={
                        format.accent
                          ? "rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),radial-gradient(140%_100%_at_50%_0%,rgba(124,58,237,.18),transparent_56%),rgba(9,9,11,.84)] p-7 md:p-8"
                          : "rounded-[26px] border border-transparent bg-transparent p-4 md:p-5"
                      }
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm uppercase tracking-[0.16em] text-white/54">{format.eyebrow}</p>
                        {format.tag ? (
                          <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/82">
                            {format.tag}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-5 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-[clamp(1.9rem,1.5rem+1vw,2.6rem)] leading-[0.95] tracking-[-0.03em] text-white">
                            {format.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-white/62">{format.fit}</p>
                        </div>
                        <PriceBadge value={format.price} mode={format.priceMode} />
                      </div>
                      <p className="mt-5 text-base leading-8 text-white/72">{format.description}</p>
                      <ul className="mt-6 space-y-3 text-sm leading-7 text-white/68">
                        {format.bullets.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-[0.7rem] h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <CTAButton href={format.href}>{format.cta}</CTAButton>
                        <CTAButton href="/contacts?topic=weddings" variant="ghost">
                          Обсудить дату
                        </CTAButton>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="mt-8 surface-panel px-6 py-7 md:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-base leading-8 text-white/72">
                    Если вы ещё не уверены, какой формат подходит именно под ваш день, мы соберём точную смету и спокойно объясним,
                    где реально нужна расширенная съёмка, а где достаточно более лёгкого решения.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <CTAButton href="/contacts?topic=weddings">Получить смету</CTAButton>
                  <CTAButton href="#wedding-extras" variant="secondary">
                    Посмотреть опции
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="py-12 md:py-16"
          ambientClassName="bg-[radial-gradient(44rem_24rem_at_12%_20%,rgba(124,58,237,.1),transparent_58%),linear-gradient(180deg,rgba(255,255,255,.015),transparent)]"
        >
          <div id="wedding-extras" className="container">
            <div className="mb-8 max-w-3xl">
              <p className="eyebrow">Дополнительные опции</p>
              <h2 className="font-display heading-balance mt-3 text-[clamp(2.1rem,1.7rem+1.5vw,3.2rem)] leading-[0.97] tracking-[-0.04em] text-white">
                Дополняем съёмку, когда это действительно усиливает результат.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/62">
                Здесь не случайные upsell-пункты, а опции под конкретные сценарии: быстрее отдать результат, легче зайти в камерный
                формат или собрать social-first версию дня.
              </p>
            </div>
            <div className="grid gap-5 xl:grid-cols-2">
              {weddingExtras.map((extra) => (
                <article key={extra.title} className="surface-panel p-3">
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-[clamp(1.7rem,1.35rem+.9vw,2.3rem)] leading-[0.98] text-white">
                        {extra.title}
                      </h3>
                      <PriceBadge value={extra.price} mode={extra.priceMode} />
                    </div>
                    <p className="mt-4 text-base leading-8 text-white/68">{extra.description}</p>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="surface-quiet p-4">
                        <div className="text-xs uppercase tracking-[0.16em] text-white/42">Когда уместно</div>
                        <p className="mt-2 text-sm leading-7 text-white/62">{extra.when}</p>
                      </div>
                      <div className="surface-quiet p-4">
                        <div className="text-xs uppercase tracking-[0.16em] text-white/42">Почему это полезно</div>
                        <p className="mt-2 text-sm leading-7 text-white/62">{extra.benefit}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <CTAButton href={extra.href} variant="secondary">
                        {extra.cta}
                      </CTAButton>
                      <CTAButton href="/contacts?topic=weddings" variant="ghost">
                        Написать нам
                      </CTAButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="py-12 md:py-16"
          ambientClassName="bg-[radial-gradient(52rem_30rem_at_100%_10%,rgba(214,183,138,.12),transparent_54%),radial-gradient(34rem_18rem_at_0%_100%,rgba(124,58,237,.09),transparent_58%)]"
        >
          <div className="container grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-panel p-6 md:p-8">
              <p className="eyebrow">Почему нам доверяют пары</p>
              <h2 className="font-display heading-balance mt-3 text-[clamp(2.05rem,1.7rem+1.4vw,3rem)] leading-[0.97] tracking-[-0.04em] text-white">
                Спокойная команда, понятный процесс и студийная отдача материалов.
              </h2>
              <div className="mt-6 grid gap-4">
                {weddingTrustReasons.map((item) => (
                  <div key={item} className="surface-quiet p-5 text-sm leading-7 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {weddingReviews.map((item) => (
                <blockquote key={item.author} className="surface-panel p-6 md:p-7">
                  <p className="font-display text-[clamp(1.6rem,1.35rem+.8vw,2.2rem)] leading-[1.02] tracking-[-0.03em] text-white">
                    “{item.quote}”
                  </p>
                  <footer className="mt-5 border-t border-white/10 pt-4">
                    <div className="text-sm text-white/82">{item.author}</div>
                    <div className="mt-1 text-sm text-white/46">{item.meta}</div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="py-12 md:py-16"
          ambientClassName="bg-[linear-gradient(180deg,rgba(255,255,255,.015),transparent),radial-gradient(48rem_24rem_at_50%_0%,rgba(124,58,237,.08),transparent_58%)]"
        >
          <div className="container">
            <div className="max-w-5xl">
              <p className="eyebrow">Часто спрашивают</p>
              <h2 className="font-display mt-3 text-[clamp(2.25rem,1.6rem+2vw,3.8rem)] leading-[0.96] tracking-[-0.04em] text-white">
                Важные детали до съёмки
              </h2>
            </div>
            <div className="mt-8 max-w-5xl">
              <div className="h-px bg-gradient-to-r from-white/40 via-white/12 to-transparent" />
              {weddingFaqItems.map((item) => (
                <QA key={item.q} q={item.q} a={item.a} />
              ))}
              <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="pb-10 pt-6 md:pb-12"
          ambientClassName="bg-[radial-gradient(40rem_18rem_at_15%_0%,rgba(255,255,255,.02),transparent_56%)]"
        >
          <div className="container">
            <div className="surface-panel px-6 py-8 md:px-8 md:py-9">
              <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
                <div>
                  <p className="eyebrow">О странице</p>
                  <h2 className="font-display heading-balance mt-3 text-[clamp(1.9rem,1.55rem+1.2vw,2.7rem)] leading-[0.98] text-white">
                    Живой SEO-блок, а не служебный хвост.
                  </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {weddingSeoSections.map((item) => (
                    <div key={item.title} className="surface-quiet p-5">
                      <h3 className="font-display text-[1.45rem] leading-tight text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/58">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-sm text-white/60">
                <Link href="/contacts" className="transition hover:text-white">
                  Контакты
                </Link>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <Link href="/videoproduction" className="transition hover:text-white">
                  Подход к видеопродакшну
                </Link>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <Link href="/about" className="transition hover:text-white">
                  О студии
                </Link>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <Link href="/en/weddings" className="transition hover:text-white">
                  English version
                </Link>
              </div>
            </div>
          </div>
        </AmbientSection>

        <AmbientSection
          className="pb-16 pt-6 md:pb-20"
          ambientClassName="bg-[radial-gradient(66rem_32rem_at_50%_50%,rgba(124,58,237,.18),transparent_56%),linear-gradient(180deg,rgba(255,255,255,.02),transparent)]"
        >
          <div id="wedding-closing" className="container">
            <div className="card-cinematic px-6 py-8 md:px-8 md:py-10">
              <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
                <div className="max-w-3xl">
                  <p className="eyebrow text-white/48">Контакт</p>
                  <h2 className="font-display heading-balance mt-3 text-[clamp(2.4rem,2rem+2vw,4.2rem)] leading-[0.95] tracking-[-0.05em] text-white">
                    Если дата уже есть, соберём формат и точную смету без долгой переписки.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/66 md:text-[1.02rem]">
                    Достаточно короткого сообщения: площадка, город, число гостей и что вам важно получить на выходе. Дальше
                    скажем, какой формат реально подходит и где не стоит переплачивать.
                  </p>
                </div>
                <div className="surface-quiet p-5 md:p-6">
                  <div className="flex flex-col gap-3">
                    <CTAButton href="/contacts?topic=weddings">Узнать стоимость</CTAButton>
                    <CTAButton href="https://t.me/highwayfilms" variant="secondary">
                      Написать в Telegram
                    </CTAButton>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-white/58">
                    <div>Ответим в день обращения</div>
                    <div>Соберём смету под ваш формат, а не по шаблону</div>
                    <div>Москва, Санкт-Петербург и выезд по РФ</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 py-3 text-xs">
              <div className="text-white/60">Highway Films</div>
              <div className="flex items-center gap-3">
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <Link href="/weddings" className="bg-white/10 px-3 py-1 hover:bg-white/20">
                    RU
                  </Link>
                  <Link href="/en/weddings" className="px-3 py-1 hover:bg-white/10">
                    EN
                  </Link>
                </div>
                <CTAButton href="/contacts" variant="ghost">
                  Связаться
                </CTAButton>
              </div>
            </div>
          </div>
        </AmbientSection>
      </div>
    </main>
  );
}

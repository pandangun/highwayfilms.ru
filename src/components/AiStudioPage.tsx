import Link from "next/link";
import GenerativeField from "@/components/GenerativeField";
import ReelStage from "@/components/ReelStage";

type Locale = "ru" | "en";

type LineItem = { title: string; text: string };

const TOOLS = [
  "Runway",
  "Pika",
  "Midjourney",
  "Stable Diffusion",
  "Flux",
  "HeyGen",
  "ElevenLabs",
  "DaVinci Resolve",
  "After Effects",
];

const copy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    credits: Array<{ label: string; value: string }>;
    primaryLabel: string;
    secondaryLabel: string;
    stageEyebrow: string;
    whereEyebrow: string;
    whereItems: LineItem[];
    toolsEyebrow: string;
    toolsNote: string;
    closingEyebrow: string;
    closingTitle: string;
    closingLead: string;
    closingAction: string;
    closingSecondary: string;
    faqSummary: string;
    faqItems: Array<{ question: string; answer: string }>;
  }
> = {
  ru: {
    eyebrow: "AI / Генеративное видео",
    title: "Генерация как часть съёмки, а не замена ей",
    lead: "Берём модели туда, где камера не нужна: пилот до большого бюджета, сцена, которую нерационально снимать, десять версий одного ролика.",
    credits: [
      { label: "Пилот", value: "от 20 000 ₽" },
      { label: "Срок", value: "первые прототипы за 1–5 дней" },
      { label: "Граница", value: "без чужих лиц и дипфейков" },
    ],
    primaryLabel: "Заполнить бриф",
    secondaryLabel: "Написать в Telegram",
    stageEyebrow: "AI-ролики",
    whereEyebrow: "Где это работает",
    whereItems: [
      {
        title: "Рекламный тест",
        text: "Проверить две-три визуальные идеи раньше, чем под них собирается смена.",
      },
      {
        title: "Виртуальный ведущий",
        text: "Контролируемый спикер для презентаций и внутренних коммуникаций без логистики.",
      },
      {
        title: "Персональные версии",
        text: "Много коротких вариаций под сегменты и партнёров без пересъёмки.",
      },
      {
        title: "Гибрид со съёмкой",
        text: "Живой кадр держит доверие, генерация добавляет сцены и переходы.",
      },
    ],
    toolsEyebrow: "Инструменты",
    toolsNote: "Инструмент подбираем под задачу, а не наоборот.",
    closingEyebrow: "Дальше",
    closingTitle: "Опишите задачу — скажем, нужен ли здесь AI вообще.",
    closingLead:
      "Если проще и дешевле снять — так и ответим. Натягивать генерацию ради эффекта не станем.",
    closingAction: "Заполнить бриф",
    closingSecondary: "Или просто написать",
    faqSummary: "Частые вопросы",
    faqItems: [
      {
        question: "Когда AI действительно полезен?",
        answer:
          "Когда нужно быстро проверить гипотезу, собрать пилот без тяжёлой логистики, сделать много версий или получить визуальный слой, который нерационально снимать классически.",
      },
      {
        question: "AI заменяет обычный продакшн?",
        answer:
          "Нет. Если задачу лучше решает реальная съёмка, интервью, предметка или классический пост, мы так и скажем.",
      },
      {
        question: "Можно ли совмещать съёмку и генерацию?",
        answer:
          "Да, чаще всего гибрид и даёт лучший результат: реальные кадры держат фактуру и доверие, генерация помогает с дополнительными сценами, переходами и атмосферой.",
      },
      {
        question: "Какие ограничения для вас принципиальны?",
        answer:
          "Мы не используем чужие лица без согласия, не имитируем реальных людей и не делаем вводящий в заблуждение deepfake-контент.",
      },
    ],
  },
  en: {
    eyebrow: "AI / Generative video",
    title: "Generation as part of the shoot, not a replacement for it",
    lead: "We bring models in where a camera is not needed: a pilot before the big budget, a scene that makes no sense to stage, ten versions of one film.",
    credits: [
      { label: "Pilot", value: "from 20,000 ₽" },
      { label: "Timing", value: "first prototypes in 1–5 days" },
      { label: "Limit", value: "no other people's faces, no deepfakes" },
    ],
    primaryLabel: "Fill in the brief",
    secondaryLabel: "Message on Telegram",
    stageEyebrow: "AI films",
    whereEyebrow: "Where it works",
    whereItems: [
      {
        title: "Ad concept test",
        text: "Try two or three visual ideas before a shooting day is booked against them.",
      },
      {
        title: "Virtual presenter",
        text: "A controllable speaker for presentations and internal communication, without logistics.",
      },
      {
        title: "Personalised versions",
        text: "Many short variations for segments and partners, without reshooting.",
      },
      {
        title: "Hybrid with live action",
        text: "Real footage holds the trust, generation adds scenes and transitions.",
      },
    ],
    toolsEyebrow: "Tools",
    toolsNote: "The tool follows the task, not the other way round.",
    closingEyebrow: "Next",
    closingTitle: "Send the task — we will say whether AI belongs here at all.",
    closingLead:
      "If filming it is simpler and cheaper, that is what we will tell you. We will not force generation in for effect.",
    closingAction: "Fill in the brief",
    closingSecondary: "Or just write to us",
    faqSummary: "Common questions",
    faqItems: [
      {
        question: "When is AI genuinely useful?",
        answer:
          "When you need a fast hypothesis test, a pilot without heavy logistics, many variations, or a visual layer that would be irrational to shoot conventionally.",
      },
      {
        question: "Does AI replace regular production?",
        answer:
          "No. If live action, interviews, tabletop work, or classic post solve the task better, we will say so.",
      },
      {
        question: "Can you combine filming and generation?",
        answer:
          "Yes, and hybrid projects are usually the strongest option: live action holds texture and trust, generation expands scenes, transitions, and atmosphere.",
      },
      {
        question: "What restrictions are non-negotiable?",
        answer:
          "We do not use other people's faces without consent, imitate real individuals, or make misleading deepfake content.",
      },
    ],
  },
};

/**
 * Раздел AI — три экрана.
 *
 * Было восемь секций: заявление в панели, сетка «где это работает»,
 * галерея из четырёх немых плиток, инструменты девятью чипами с рамками,
 * ещё одна сетка «сценарии применения» — почти дословный повтор первой,
 * блок про этику из трёх абзацев и врезки, FAQ и CTA. Двадцать с лишним
 * обведённых прямоугольников и ни одного играющего кадра.
 *
 * Стало: заявление, плеер во весь экран с переключением роликов,
 * разговор. Всё, что осталось от прежнего текста, — то, что отвечает на
 * вопрос клиента, а не рассказывает о нашем отношении к технологиям.
 */
export default function AiStudioPage({ locale = "ru" }: { locale?: Locale }) {
  const t = copy[locale];
  const briefHref = locale === "en" ? "/en/brief" : "/brief";
  const contactsHref = locale === "en" ? "/en/contacts" : "/contacts";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="page-shell">
      <div className="page-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* ЭКРАН 1 — ЗАЯВЛЕНИЕ */}
        <section className="section-hero">
          <GenerativeField className="opacity-70" />

          <div className="container relative">
            <p className="eyebrow reveal-up">{t.eyebrow}</p>
            <h1 className="section-hero__title font-display mt-7 max-w-5xl reveal-up delay-1">
              {t.title}
            </h1>
            <p className="section-hero__lead mt-8 max-w-2xl reveal-up delay-2">{t.lead}</p>

            {/* Обёртка ради отступа: у .hero-credits__meta объявлен
                margin: 0 в слое проекта, и он перебивает утилиту mt-*. */}
            <div className="mt-12 reveal-up delay-3">
              <dl className="hero-credits__meta">
                {t.credits.map((credit) => (
                  <div key={credit.label} className="hero-credits__row">
                    <dt>{credit.label}</dt>
                    <dd>{credit.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 reveal-up delay-4">
              <Link href={briefHref} className="home-primary-button">
                {t.primaryLabel}
              </Link>
              <a
                href="https://t.me/highwayfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="home-secondary-link"
              >
                {t.secondaryLabel}
              </a>
            </div>
          </div>
        </section>

        {/* ЭКРАН 2 — ПЛЕЕР */}
        <ReelStage section="ai" eyebrow={t.stageEyebrow} />

        {/* ЭКРАН 3 — РАЗГОВОР */}
        <section className="relative overflow-hidden py-20 md:py-24">
          <div className="container relative">
            <p className="eyebrow reveal-up">{t.whereEyebrow}</p>

            <div className="mt-8 md:mt-10">
              {t.whereItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`line-item line-item--static reveal-up delay-${Math.min(index + 1, 5)}`}
                >
                  <span className="line-item__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="line-item__title font-display">{item.title}</h2>
                  <p className="line-item__text">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 reveal-up md:mt-16">
              <p className="eyebrow">{t.toolsEyebrow}</p>
              <p className="tool-run mt-5">
                {TOOLS.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </p>
              <p className="mt-4 max-w-xl text-sm text-ink-faint">{t.toolsNote}</p>
            </div>

            <div className="mt-16 max-w-4xl md:mt-20">
              <p className="eyebrow">{t.closingEyebrow}</p>
              <h2 className="closing__title font-display mt-6 text-ink">{t.closingTitle}</h2>
              <p className="closing__lead mt-8 max-w-2xl text-ink-muted">{t.closingLead}</p>

              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
                <Link href={briefHref} className="home-primary-button">
                  {t.closingAction}
                </Link>
                <Link href={contactsHref} className="home-secondary-link">
                  {t.closingSecondary}
                </Link>
              </div>
            </div>

            {/* FAQ свёрнут: разметка FAQPage выше держится на нём, но
                отдельного экрана справка не заслуживает. */}
            <details className="faq-fold mt-16 md:mt-20">
              <summary className="faq-fold__summary">{t.faqSummary}</summary>
              <div className="faq-wrap mt-8 max-w-4xl">
                {t.faqItems.map((item) => (
                  <details key={item.question} className="faq-item group py-7 first:pt-0 last:pb-0">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                      <h3 className="faq-question text-ink">{item.question}</h3>
                      <span className="relative mt-2 flex h-5 w-5 shrink-0 items-center justify-center text-ink-muted">
                        <span className="absolute h-px w-5 bg-hairline" />
                        <span className="absolute h-5 w-px bg-hairline transition duration-200 group-open:scale-y-0" />
                      </span>
                    </summary>
                    <div className="faq-panel">
                      <div className="faq-panel__inner">
                        <p className="faq-answer max-w-3xl text-ink-muted">{item.answer}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}

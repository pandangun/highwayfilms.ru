import CTA from "@/components/CTA";
import ReelSection from "@/components/ReelSection";
import ServiceFaqSection from "@/components/ServiceFaqSection";
import StudioMasthead from "@/components/StudioMasthead";

type Locale = "ru" | "en";

type TextCard = {
  title: string;
  text: string;
};

const copy: Record<
  Locale,
  {
    hero: {
      eyebrow: string;
      title: string;
      lead: string;
      primaryLabel: string;
      secondaryLabel: string;
      chips: string[];
      metrics: Array<{ value: string; label: string }>;
      panelEyebrow: string;
      panelTitle: string;
      panelCopy: string;
      imageAlt: string;
    };
    statement: string;
    whereTitle: string;
    whereItems: TextCard[];
    galleryTitle: string;
    toolsTitle: string;
    toolsText: string;
    tools: string[];
    scenariosTitle: string;
    scenariosItems: TextCard[];
    approachTitle: string;
    approachLead: string;
    approachText: string;
    approachRulesTitle: string;
    approachRules: string[];
    approachNote: string;
    faqTitle: string;
    faqIntro: string;
    faqItems: Array<{ question: string; answer: string }>;
    closing: {
      title: string;
      description: string;
      ctaLabel: string;
      note: string;
    };
  }
> = {
  ru: {
    hero: {
      eyebrow: "AI / GENERATIVE",
      title: "AI-видео и генерация в составе продакшна",
      lead:
        "Используем генеративные модели как рабочий инструмент: для быстрых рекламных тестов, виртуальных ведущих, гибридных роликов и нестандартного визуала.",
      primaryLabel: "Запустить AI-бриф",
      secondaryLabel: "Telegram",
      chips: [
        "AI-реклама",
        "Виртуальные ведущие",
        "Гибридные ролики",
        "Генеративный визуал",
      ],
      metrics: [
        { value: "20–30k ₽", label: "быстрые пилоты" },
        { value: "1–5 дней", label: "первые прототипы" },
        { value: "Этично", label: "только допустимые сценарии" },
      ],
      panelEyebrow: "Подход",
      panelTitle: "AI — инструмент, а не самоцель",
      panelCopy:
        "Он помогает быстрее проверить идею, собрать прототип ролика, сделать необычный визуальный слой или усилить реальную съёмку там, где это рационально.",
      imageAlt: "Highway Films AI production visual",
    },
    statement:
      "AI сам по себе не делает ролик сильным. Сильным его делает задача, сценарий и то, как генерация встроена в реальный продакшн.",
    whereTitle: "Где это работает",
    whereItems: [
      {
        title: "Виртуальные ведущие",
        text: "Цифровые персонажи для презентаций, explainers и внутренних коммуникаций, когда нужен контролируемый спикер без сложной логистики.",
      },
      {
        title: "AI-рекламные тесты",
        text: "Быстрые концепты и social-ролики для проверки гипотез до полноценной съёмки и большого бюджета.",
      },
      {
        title: "Персонализированные видео",
        text: "Короткие ролики для партнёров, сотрудников, мероприятий и прямых касаний, где важно быстро собрать множество версий.",
      },
      {
        title: "Гибридные проекты",
        text: "Комбинация реальной съёмки и генерации, когда нужно удержать фактуру живого кадра и добавить визуальный слой.",
      },
    ],
    galleryTitle: "Примеры AI-видео",
    toolsTitle: "Инструменты",
    toolsText:
      "Используем сочетание генеративных моделей и классического production-пайплайна. Инструмент подбираем под задачу, а не наоборот.",
    tools: [
      "Runway",
      "Pika",
      "Midjourney",
      "Stable Diffusion",
      "Flux",
      "HeyGen",
      "ElevenLabs",
      "DaVinci Resolve",
      "After Effects",
    ],
    scenariosTitle: "Сценарии применения",
    scenariosItems: [
      {
        title: "Рекламный тест",
        text: "AI помогает быстро проверить несколько визуальных концепций и понять, стоит ли масштабировать идею в полноценный продакшн.",
      },
      {
        title: "Персонализированные версии",
        text: "Короткие поздравления, прямые сообщения и вариации под разные сегменты аудитории без полной пересъёмки.",
      },
      {
        title: "Гибридный ролик",
        text: "Реальные кадры держат доверие, а генерация усиливает атмосферу, переходы и отдельные визуальные сцены.",
      },
    ],
    approachTitle: "Разумное использование AI",
    approachLead:
      "Мы используем AI только там, где он действительно улучшает проект по сроку, бюджету или визуальному результату.",
    approachText:
      "Если задачу лучше решает обычный продакшн, так и скажем. Генерация не нужна в каждом брифе и не должна быть декоративным шумом.",
    approachRulesTitle: "Мы не",
    approachRules: [
      "используем чужие лица без согласия",
      "копируем реальные личности",
      "создаём вводящий в заблуждение deepfake-контент",
    ],
    approachNote:
      "AI — это инструмент визуального производства, а не способ подменить реальность или обмануть аудиторию.",
    faqTitle: "Что обычно спрашивают",
    faqIntro:
      "Коротко о том, где AI действительно даёт смысл, а где его лучше не притягивать в проект.",
    faqItems: [
      {
        question: "Когда AI действительно полезен для клиента?",
        answer:
          "Когда нужно быстро проверить гипотезу, собрать пилот без тяжёлой логистики, сделать несколько версий или получить визуальный слой, который нерационально собирать через классическую съёмку.",
      },
      {
        question: "AI заменяет обычный продакшн?",
        answer:
          "Нет. Если задачу лучше решает реальная съёмка, интервью, предметка или классический post-production, мы не будем натягивать генерацию ради эффекта.",
      },
      {
        question: "Можно ли совмещать съёмку и генерацию?",
        answer:
          "Да. Чаще всего именно гибрид даёт лучший результат: реальные кадры держат фактуру и доверие, а генерация помогает с дополнительными сценами, переходами и атмосферой.",
      },
      {
        question: "Какие ограничения для вас принципиальны?",
        answer:
          "Мы не работаем с чужими лицами без согласия, не имитируем реальные личности и не делаем вводящий в заблуждение deepfake-контент.",
      },
    ],
    closing: {
      title: "Нужно быстро проверить идею или собрать необычный визуал?",
      description:
        "Опишите задачу. Скажем, где AI действительно ускоряет производство, а где лучше идти классическим продакшном.",
      ctaLabel: "Запустить AI-бриф",
      note: "Подходит для пилотов, превиза, гибридных роликов и персонализированных версий.",
    },
  },
  en: {
    hero: {
      eyebrow: "AI / GENERATIVE",
      title: "AI video and generative production inside the pipeline",
      lead:
        "We use generative models as production tools: for rapid ad tests, virtual presenters, hybrid films, and visual layers that are hard to get through a normal shoot.",
      primaryLabel: "Start an AI brief",
      secondaryLabel: "Telegram",
      chips: ["AI ads", "Virtual presenters", "Hybrid films", "Generative visual"],
      metrics: [
        { value: "20–30k ₽", label: "fast pilot range" },
        { value: "1–5 days", label: "first prototypes" },
        { value: "Ethical", label: "only allowed scenarios" },
      ],
      panelEyebrow: "Approach",
      panelTitle: "AI is a tool, not the point",
      panelCopy:
        "It helps test an idea faster, prototype a film, build an unusual visual layer, or strengthen live-action footage with generation where it actually matters.",
      imageAlt: "Highway Films AI production visual",
    },
    statement:
      "AI does not make a film strong on its own. The brief, the script, and the way generation fits real production are what make it work.",
    whereTitle: "Where it works",
    whereItems: [
      {
        title: "Virtual presenters",
        text: "Digital characters for presentations, explainer videos, and internal communication.",
      },
      {
        title: "AI ad tests",
        text: "Fast concepts and social cuts to test a hypothesis before a full shoot.",
      },
      {
        title: "Personalised videos",
        text: "Short films for partners, employees, and event communication.",
      },
      {
        title: "Hybrid projects",
        text: "A combination of live-action filming and generative scenes.",
      },
    ],
    galleryTitle: "AI video examples",
    toolsTitle: "Tools",
    toolsText:
      "We combine generative models with a normal production and post-production pipeline.",
    tools: [
      "Runway",
      "Pika",
      "Midjourney",
      "Stable Diffusion",
      "Flux",
      "HeyGen",
      "ElevenLabs",
      "DaVinci Resolve",
      "After Effects",
    ],
    scenariosTitle: "Use cases",
    scenariosItems: [
      {
        title: "Ad concept test",
        text: "AI helps test several visual concepts before committing to a full production.",
      },
      {
        title: "Personalised videos",
        text: "Short greetings and direct messages for partners, employees, and events.",
      },
      {
        title: "Hybrid projects",
        text: "A mix of filming and generative visuals to push the atmosphere further.",
      },
    ],
    approachTitle: "Reasonable use of AI",
    approachLead: "We use AI only where it materially improves the project.",
    approachText:
      "If a brief is better solved with classic production, we will say that directly instead of forcing generation into the process.",
    approachRulesTitle: "We do not",
    approachRules: [
      "use other people's faces without consent",
      "copy real individuals",
      "make deceptive deepfake content",
    ],
    approachNote:
      "AI is a visual production tool, not a way to mislead the audience.",
    faqTitle: "Common questions",
    faqIntro:
      "The short version of where AI adds value and where it should stay out of the brief.",
    faqItems: [
      {
        question: "When is AI genuinely useful for a client?",
        answer:
          "When you need a fast hypothesis test, a pilot without heavy logistics, multiple variations, or a visual layer that would be irrational to build through a full shoot.",
      },
      {
        question: "Does AI replace regular production?",
        answer:
          "No. If live-action, interviews, tabletop work, or classic post-production solve the task better, we will keep it there.",
      },
      {
        question: "Can you combine filming and generation?",
        answer:
          "Yes. Hybrid projects are often the strongest option: live-action holds texture and trust, while generation expands atmosphere, transitions, and selected scenes.",
      },
      {
        question: "What restrictions are non-negotiable for you?",
        answer:
          "We do not use other people's faces without consent, imitate real individuals, or make misleading deepfake content.",
      },
    ],
    closing: {
      title: "Need to test an idea fast or build an unusual visual layer?",
      description:
        "Send the brief. We will tell you where AI genuinely speeds production up and where classic production is the better route.",
      ctaLabel: "Start an AI brief",
      note: "Suitable for pilots, previs, hybrid films, and personalised versions.",
    },
  },
};

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
          {title}
        </h2>
      </div>
      {lead ? <p className="max-w-xl text-white/62">{lead}</p> : null}
    </div>
  );
}

function TextCardGrid({ items }: { items: TextCard[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item, index) => (
        <div key={item.title} className="section-panel section-panel--card">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/34">
              0{index + 1}
            </span>
            <span className="rule-fade flex-1" />
          </div>
          <h3 className="font-display text-xl text-white">{item.title}</h3>
          <p className="mt-3 text-white/64">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function AiStudioPage({ locale = "ru" }: { locale?: Locale }) {
  const t = copy[locale];
  const contactsHref = locale === "en" ? "/en/contacts" : "/contacts";

  return (
    <div className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <StudioMasthead
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          lead={t.hero.lead}
          primaryHref={contactsHref}
          primaryLabel={t.hero.primaryLabel}
          secondaryHref="https://t.me/highwayfilms"
          secondaryLabel={t.hero.secondaryLabel}
          chips={t.hero.chips}
          metrics={t.hero.metrics}
          panelEyebrow={t.hero.panelEyebrow}
          panelTitle={t.hero.panelTitle}
          panelCopy={t.hero.panelCopy}
          imageSrc="/images/ads/a06.jpg"
          imageAlt={t.hero.imageAlt}
        />

        <section className="container pb-8">
          <div className="section-panel section-panel--statement">
            <p className="font-display max-w-5xl text-[clamp(1.8rem,2vw+1rem,2.95rem)] leading-[1.1] tracking-[-0.035em] text-white">
              {t.statement}
            </p>
          </div>
        </section>

        <section className="container section-divider py-10 md:py-14">
          <SectionHeading title={t.whereTitle} />
          <TextCardGrid items={t.whereItems} />
        </section>

        <ReelSection
          section="ai"
          eyebrow={locale === "en" ? "Examples" : "Примеры работ"}
          title={t.galleryTitle}
          mode="catalog"
        />

        <section className="container section-divider py-10 md:py-14">
          <div className="section-panel section-panel--content">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start">
              <div>
                <p className="eyebrow">{t.toolsTitle}</p>
                <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
                  {t.toolsTitle}
                </h2>
                <p className="mt-4 max-w-md text-white/64">{t.toolsText}</p>
              </div>

              <div className="ai-tools-list">
                {t.tools.map((tool) => (
                  <span key={tool} className="ai-tool-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container section-divider py-10 md:py-14">
          <SectionHeading title={t.scenariosTitle} />
          <div className="grid gap-4 xl:grid-cols-3">
            {t.scenariosItems.map((item, index) => (
              <div key={item.title} className="section-panel section-panel--card">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/34">
                    0{index + 1}
                  </span>
                  <span className="rule-fade flex-1" />
                </div>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="mt-3 text-white/64">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container section-divider py-10 md:py-14">
          <div className="section-panel section-panel--content">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(17rem,.95fr)]">
              <div>
                <p className="eyebrow">{t.approachTitle}</p>
                <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
                  {t.approachTitle}
                </h2>
                <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-white/78">
                  {t.approachLead}
                </p>
                <p className="mt-4 max-w-2xl text-white/62">{t.approachText}</p>
                <p className="mt-6 max-w-2xl text-white/72">{t.approachNote}</p>
              </div>

              <div className="surface-quiet rounded-[28px] p-6">
                <p className="eyebrow text-white/46">{t.approachRulesTitle}</p>
                <ul className="mt-5 space-y-4 text-white/72">
                  {t.approachRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgba(214,183,138,.92)]" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ServiceFaqSection
          eyebrow="FAQ"
          title={t.faqTitle}
          intro={t.faqIntro}
          items={t.faqItems}
        />

        <CTA
          title={t.closing.title}
          description={t.closing.description}
          ctaLabel={t.closing.ctaLabel}
          href={contactsHref}
          note={t.closing.note}
          locale={locale}
        />
      </div>
    </div>
  );
}

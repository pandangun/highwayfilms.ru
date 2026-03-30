import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  PhoneCall,
  Send,
  Sparkles,
} from "lucide-react";

type Locale = "ru" | "en";

const COPY = {
  ru: {
    eyebrow: "Контакты",
    title: "Связь с Highway Films без лишних кругов.",
    lead:
      "Если задача уже понятна, сразу идите в бриф. Если нужно быстро сверить формат, сроки или реалистичность запуска, отвечаем по телефону, почте и в Telegram.",
    description:
      "Страница собрана как точка входа в продакшн: короткий путь до команды, понятная география, ориентир по ответу и быстрый переход к рабочему брифу.",
    primaryCta: "Перейти к брифу",
    secondaryCta: "Написать в Telegram",
    quickTitle: "Быстрый контакт",
    quickLead: "Для короткого старта или уточняющего вопроса.",
    responseTitle: "Среднее время ответа",
    responseLead: "В рабочие дни обычно возвращаемся в течение 2-4 часов.",
    deskEyebrow: "Production desk",
    deskTitle: "Один вход для рекламы, клипов, брендовых фильмов и AI-проектов.",
    deskCopy:
      "Лучше всего работает короткий вход: что снимаем, когда, где и для каких площадок. Дальше уже докручиваем формат и масштаб.",
    geoEyebrow: "География",
    geoTitle: "Санкт-Петербург и Москва как база. Остальная география как маршрут.",
    geoLead:
      "Две основные точки позволяют быстро запускать препрод и выездные смены. Под задачи масштабируемся шире, но ядро команды и производственный ритм держим здесь.",
    cityOne: "Санкт-Петербург",
    cityOneCopy: "Подготовка, павильоны, атмосферные фактуры и спокойный продакшн-ритм.",
    cityTwo: "Москва",
    cityTwoCopy: "Быстрые брендовые задачи, агентский контур и плотные дедлайны.",
    geoNote: "Выезжаем на съёмки по России и собираем команду под формат, а не под шаблонный пакет.",
    geoMapCaption: "Базовые точки Highway Films и выездная география продакшна",
    briefEyebrow: "Бриф",
    briefTitle: "Нужен уже не диалог, а рабочий старт?",
    briefCopy:
      "На отдельной странице собран короткий intake: тип проекта, сценарий, даты, площадки, бюджетный ориентир и всё, что нужно, чтобы вернуться с предметным ответом.",
    briefCta: "Открыть бриф",
    prepEyebrow: "Что прислать",
    prepTitle: "Три вещи, которые реально ускоряют расчёт.",
    prepItems: [
      "1-2 референса или хотя бы настроение проекта.",
      "Предварительную дату или окно, в которое должен выйти материал.",
      "Список площадок: digital, соцсети, event, TV, внутренние коммуникации.",
    ],
    prepNoteTitle: "Полезно сразу указать",
    prepNote:
      "Есть ли сценарий, нужен ли кастинг, сколько версий понадобится и есть ли диапазон бюджета. Даже приблизительно.",
    methods: [
      {
        title: "Телефон",
        value: "+7 (999) 123-45-67",
        href: "tel:+79991234567",
      },
      {
        title: "E-mail",
        value: "info@highwayfilms.ru",
        href: "mailto:info@highwayfilms.ru?subject=%5B%D0%9A%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%5D%20Highway%20Films",
      },
      {
        title: "Telegram",
        value: "@highwayfilms",
        href: "https://t.me/highwayfilms",
      },
    ],
  },
  en: {
    eyebrow: "Contacts",
    title: "Reach Highway Films without extra routing.",
    lead:
      "If the project is already clear, go straight to the brief. If you need a fast reality check on format, timing, or launch scope, we answer by phone, email, and Telegram.",
    description:
      "This page is built as a production entry point: direct access to the team, clear geography, a realistic response rhythm, and a dedicated transition to the working brief.",
    primaryCta: "Open the brief",
    secondaryCta: "Message on Telegram",
    quickTitle: "Quick contact",
    quickLead: "For a fast start or one sharp question.",
    responseTitle: "Average response time",
    responseLead: "On business days we usually come back within 2-4 hours.",
    deskEyebrow: "Production desk",
    deskTitle: "One front door for commercials, music videos, brand films, and AI projects.",
    deskCopy:
      "The strongest first message is short: what we are making, when it should happen, where it shoots, and where it needs to live after delivery.",
    geoEyebrow: "Geography",
    geoTitle: "Saint Petersburg and Moscow as the base. Wider geography as the route.",
    geoLead:
      "These two cities anchor pre-production and field logistics. We scale wider when needed, but the core team and production rhythm stay grounded here.",
    cityOne: "Saint Petersburg",
    cityOneCopy: "Prep, stages, atmosphere-driven locations, and a calmer production tempo.",
    cityTwo: "Moscow",
    cityTwoCopy: "Fast brand work, agency-side sync, and tighter delivery cycles.",
    geoNote: "We travel for shoots across Russia and build the crew around the format, not around a generic package.",
    geoMapCaption: "Highway Films base cities and traveling production footprint",
    briefEyebrow: "Brief",
    briefTitle: "Need more than a conversation and want a real start?",
    briefCopy:
      "The dedicated intake page covers project type, script status, timing, deliverables, budget range, and the practical context needed for a concrete answer.",
    briefCta: "Go to brief",
    prepEyebrow: "What to send",
    prepTitle: "Three things that genuinely speed up the estimate.",
    prepItems: [
      "One or two references or at least the intended tone.",
      "A target date or a real delivery window.",
      "The platform list: digital, social, event, TV, internal, or mixed rollout.",
    ],
    prepNoteTitle: "Useful from the start",
    prepNote:
      "Tell us whether a script already exists, whether casting is needed, how many versions are expected, and whether a budget frame already exists.",
    methods: [
      {
        title: "Phone",
        value: "+7 (999) 123-45-67",
        href: "tel:+79991234567",
      },
      {
        title: "Email",
        value: "info@highwayfilms.ru",
        href: "mailto:info@highwayfilms.ru?subject=%5BContact%5D%20Highway%20Films",
      },
      {
        title: "Telegram",
        value: "@highwayfilms",
        href: "https://t.me/highwayfilms",
      },
    ],
  },
} as const;

function getMethodIcon(title: string) {
  if (title === "Телефон" || title === "Phone") return <PhoneCall className="h-4 w-4" />;
  if (title === "E-mail" || title === "Email") return <Mail className="h-4 w-4" />;
  return <Send className="h-4 w-4" />;
}

export function ContactStudioPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const briefHref = locale === "en" ? "/en/brief" : "/brief";

  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <section className="container page-content pb-10 pt-header-safe md:pb-14 md:pt-[calc(var(--header-h)+env(safe-area-inset-top)+3rem)]">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <div className="max-w-4xl">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand" />
              {copy.eyebrow}
            </p>
            <h1 className="font-display mt-4 text-[clamp(3.15rem,7vw,6.25rem)] leading-[0.92] tracking-[-0.05em] text-white">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-[1.28rem]">
              {copy.lead}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/46 md:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={briefHref} className="btn-primary h-12 rounded-full px-6">
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://t.me/highwayfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-12 rounded-full px-6"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="surface-panel relative overflow-hidden px-6 py-7 md:px-7">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/42 to-transparent" />
            <div className="grid gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">
                  {copy.quickTitle}
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/56">{copy.quickLead}</p>
                <div className="mt-6 space-y-4">
                  {copy.methods.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/78">
                          {getMethodIcon(item.title)}
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/36">{item.title}</p>
                          <p className="mt-1 text-base text-white/86">{item.value}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:text-white/72" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[auto_1fr] md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">
                    {copy.responseTitle}
                  </p>
                  <p className="mt-3 max-w-md text-base leading-7 text-white/70">{copy.responseLead}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[34px] border border-white/10 bg-black/35 shadow-[0_26px_80px_rgba(0,0,0,0.34)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[24rem]">
              <Image
                src="/video/derived/hero-poster.jpg"
                alt="Highway Films production still"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/38 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.22),transparent_40%)]" />
            </div>

            <div className="relative flex flex-col justify-between gap-8 px-6 py-7 md:px-8 md:py-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">{copy.deskEyebrow}</p>
                <h2 className="font-display mt-4 text-3xl leading-tight text-white md:text-[2.4rem]">
                  {copy.deskTitle}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/64">{copy.deskCopy}</p>
              </div>
              <div className="rule-fade max-w-36" />
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-10 md:pb-14">
        <div className="surface-panel relative overflow-hidden p-4 md:p-5">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <figure className="relative min-h-[26rem] overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src="/map-preview.svg"
                alt={copy.geoMapCaption}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 56vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/18 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm text-white/58">
                {copy.geoMapCaption}
              </figcaption>
            </figure>

            <div className="flex flex-col justify-between gap-6 px-2 py-2 md:px-4">
              <div>
                <p className="eyebrow">{copy.geoEyebrow}</p>
                <h2 className="font-display mt-4 text-3xl leading-tight text-white md:text-[2.45rem]">
                  {copy.geoTitle}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/62">{copy.geoLead}</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[26px] border border-white/10 bg-white/[0.03] px-5 py-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/78">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-2xl text-white">{copy.cityOne}</p>
                      <p className="mt-2 text-sm leading-6 text-white/58">{copy.cityOneCopy}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-black/26 px-5 py-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/78">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-2xl text-white">{copy.cityTwo}</p>
                      <p className="mt-2 text-sm leading-6 text-white/58">{copy.cityTwoCopy}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="max-w-lg text-sm leading-6 text-white/48">{copy.geoNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-quiet px-6 py-7 md:px-7">
            <p className="eyebrow">{copy.prepEyebrow}</p>
            <h2 className="font-display mt-4 text-3xl leading-tight text-white">{copy.prepTitle}</h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-white/66">
              {copy.prepItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">{copy.prepNoteTitle}</p>
              <p className="mt-3 text-sm leading-6 text-white/56">{copy.prepNote}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.3),rgba(255,255,255,0.04))] px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:px-8 md:py-9">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/44 to-transparent" />
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/46">{copy.briefEyebrow}</p>
            <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.3rem,4.4vw,4rem)] leading-[0.97] text-white">
              {copy.briefTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 md:text-lg">{copy.briefCopy}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={briefHref} className="btn-primary h-12 rounded-full px-6">
                {copy.briefCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-sm leading-6 text-white/56">
                {locale === "en"
                  ? "The brief is structured around real production inputs, not a generic contact form."
                  : "Бриф собран вокруг реальных продакшн-вводных, а не вокруг абстрактной формы связи."}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

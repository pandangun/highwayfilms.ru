import Link from "next/link";
import GenerativeField from "@/components/GenerativeField";

type ContactStudioPageProps = {
  locale?: "ru" | "en";
};

const CONTACTS = {
  phoneDisplay: "+7 969 214-17-17",
  phoneHref: "tel:+79692141717",
  emailDisplay: "info@highway-films.ru",
  emailHref: "mailto:info@highway-films.ru",
  telegramUrl: "https://t.me/highwayfilms",
  whatsappUrl: "https://wa.me/79692141717",
  youtubeUrl: "https://www.youtube.com/",
  vkUrl: "https://vk.com/",
  rutubeUrl: "https://rutube.ru/",
  briefUrl: "/brief",
} as const;

type ChannelItem = { label: string; href: string; hint: string };

const CHANNELS_RU: ChannelItem[] = [
  { label: "Telegram", href: CONTACTS.telegramUrl, hint: "Быстрее всего" },
  { label: "WhatsApp", href: CONTACTS.whatsappUrl, hint: "Если удобнее" },
  { label: "YouTube", href: CONTACTS.youtubeUrl, hint: "Работы" },
  { label: "VK", href: CONTACTS.vkUrl, hint: "Работы" },
  { label: "RuTube", href: CONTACTS.rutubeUrl, hint: "Работы" },
];

const CHANNELS_EN: ChannelItem[] = [
  { label: "Telegram", href: CONTACTS.telegramUrl, hint: "Fastest" },
  { label: "WhatsApp", href: CONTACTS.whatsappUrl, hint: "If easier" },
  { label: "YouTube", href: CONTACTS.youtubeUrl, hint: "Work" },
  { label: "VK", href: CONTACTS.vkUrl, hint: "Work" },
  { label: "RuTube", href: CONTACTS.rutubeUrl, hint: "Work" },
];

const copy = {
  ru: {
    pageTitle: "Контакты Highway Films",
    eyebrow: "Контакты",
    phoneLabel: "Телефон",
    emailLabel: "E-mail",
    channelsEyebrow: "Каналы",
    channelsTitle: "Где ещё нас найти",
    briefEyebrow: "Бриф",
    briefTitle: "Кратко о задаче",
    briefLead:
      "Достаточно трёх опорных точек, чтобы мы быстро собрали следующий шаг по проекту.",
    briefPoints: [
      "Что нужно снять: ролик, клип, бренд-фильм, ивент или свадьба",
      "Где и когда: город, дата или окно съёмки",
      "Какой нужен результат: один мастер или пакет версий под площадки",
    ],
    briefAction: "Открыть бриф",
    briefMeta: "Можно начать коротко. Детали уточним уже после первого контакта.",
    channels: CHANNELS_RU,
  },
  en: {
    pageTitle: "Highway Films contacts",
    eyebrow: "Contacts",
    phoneLabel: "Phone",
    emailLabel: "E-mail",
    channelsEyebrow: "Channels",
    channelsTitle: "Where else to find us",
    briefEyebrow: "Brief",
    briefTitle: "A short outline is enough",
    briefLead: "Three reference points are enough for us to prepare the next step.",
    briefPoints: [
      "What to shoot: commercial, music video, brand film, event, or wedding",
      "Where and when: city, date, or shooting window",
      "What you need: a single master or a package of platform versions",
    ],
    briefAction: "Open brief",
    briefMeta: "A short note is enough to start. We can clarify the rest after the first contact.",
    channels: CHANNELS_EN,
  },
} as const;

function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/**
 * Страница контактов.
 *
 * Переписана начисто. Прежняя версия была памятником старому дизайну:
 * canvas LightRays с двенадцатью параметрами, четыре вложенных слоя-обёртки,
 * полупрозрачная карта поверх, и у каждой иконки мессенджера пять вложенных
 * спанов (halo, orb, ring, sheen, core) ради свечения. На всё это уходило
 * 84 правила CSS, а на экране это читалось как артефакты и полосы поверх
 * контента.
 *
 * Теперь два экрана: контакты крупной антиквой и каналы строками. Фон —
 * то же генеративное поле, что на главной, вместо отдельной анимации,
 * которая жила только здесь.
 */
export function ContactStudioPage({ locale = "ru" }: ContactStudioPageProps) {
  const t = copy[locale];
  const briefHref = locale === "en" ? "/en/brief" : CONTACTS.briefUrl;

  return (
    <div className="page-shell">
      <div className="page-content">
        {/* ЭКРАН 1 — как связаться. Телефон и почта набраны так же крупно,
            как заголовки разделов: это и есть главное действие страницы. */}
        <section className="relative overflow-hidden pt-header-safe">
          <GenerativeField className="opacity-60" />

          <div className="container relative py-20 md:py-28">
            <h1 className="visually-hidden">{t.pageTitle}</h1>
            <p className="eyebrow reveal-up">{t.eyebrow}</p>

            <dl className="contact-lines mt-12 md:mt-16">
              <div className="contact-line reveal-up delay-1">
                <dt>{t.phoneLabel}</dt>
                <dd>
                  <a href={CONTACTS.phoneHref} className="contact-line__link font-display">
                    {CONTACTS.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="contact-line reveal-up delay-2">
                <dt>{t.emailLabel}</dt>
                <dd>
                  <a href={CONTACTS.emailHref} className="contact-line__link font-display">
                    {CONTACTS.emailDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-16 md:mt-20">
              <p className="eyebrow">{t.channelsEyebrow}</p>
              <ul className="contact-channels mt-6">
                {t.channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      className="contact-channel"
                      {...externalProps(channel.href)}
                    >
                      <span className="contact-channel__label">{channel.label}</span>
                      <span className="contact-channel__hint">{channel.hint}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ЭКРАН 2 — бриф. Три опорные точки: это лучший текст на сайте,
            он и остаётся, только без панели вокруг. */}
        <section className="container border-t border-hairline py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow">{t.briefEyebrow}</p>
              <h2 className="contact-brief__title font-display mt-6 text-ink">{t.briefTitle}</h2>
              <p className="mt-6 max-w-md text-ink-muted">{t.briefLead}</p>
            </div>

            <div>
              <ul className="contact-brief__points">
                {t.briefPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href={briefHref} className="btn-primary">
                  {t.briefAction}
                </Link>
                <p className="text-meta text-ink-faint">{t.briefMeta}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

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
    briefTitle: "Расскажите, что нужно снять",
    briefLead: "Три строчки — и мы уже понимаем, о чём разговор.",
    briefPoints: [
      "Ролик, клип, бренд-фильм, ивент или свадьба",
      "Город и дата — хотя бы примерно",
      "Один мастер или пакет версий под площадки",
    ],
    briefAction: "Заполнить бриф",
    briefMeta: "Отвечаем в течение рабочего дня.",
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
    briefTitle: "Tell us what to shoot",
    briefLead: "Three lines and we already know what the conversation is about.",
    briefPoints: [
      "Commercial, music video, brand film, event, or wedding",
      "City and date — roughly is fine",
      "A single master or a package of platform versions",
    ],
    briefAction: "Fill in the brief",
    briefMeta: "We reply within one business day.",
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
        {/* Один экран на десктопе: контакты слева, бриф справа, каналы
            рельсом внизу. Вертикальный столбец из трёх блоков подряд
            читался как «дизайна нет» — потому что его и не было, была
            просто последовательность. Две колонки и рельс дают структуру. */}
        <section className="contact-screen relative overflow-hidden">
          <GenerativeField className="opacity-60" />

          <div className="container relative contact-screen__inner">
            <h1 className="visually-hidden">{t.pageTitle}</h1>

            <div className="contact-screen__grid">
              <div className="contact-screen__col">
                <p className="eyebrow reveal-up">{t.eyebrow}</p>

                <dl className="contact-lines">
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
              </div>

              <div className="contact-screen__col contact-screen__col--brief reveal-up delay-3">
                <p className="eyebrow">{t.briefEyebrow}</p>
                <h2 className="contact-brief__title font-display mt-5 text-ink">{t.briefTitle}</h2>
                <p className="mt-4 max-w-md text-ink-muted">{t.briefLead}</p>

                <ul className="contact-brief__points">
                  {t.briefPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link href={briefHref} className="btn-primary">
                    {t.briefAction}
                  </Link>
                  <p className="text-sm text-ink-faint">{t.briefMeta}</p>
                </div>
              </div>
            </div>

            <div className="contact-screen__rail">
              <p className="eyebrow">{t.channelsEyebrow}</p>
              <ul className="contact-channels">
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
      </div>
    </div>
  );
}

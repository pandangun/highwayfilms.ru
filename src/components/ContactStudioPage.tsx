import Link from "next/link";
import type { ComponentType, CSSProperties } from "react";
import { MessageCircleMore, MessageSquareMore, MonitorPlay, Play, Send } from "lucide-react";
import LightRays from "@/components/LightRays";

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

type PlatformItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: string;
};

const MESSENGER_LINKS: PlatformItem[] = [
  {
    label: "Telegram",
    href: CONTACTS.telegramUrl,
    icon: Send,
    accent: "42 171 238",
  },
  {
    label: "WhatsApp",
    href: CONTACTS.whatsappUrl,
    icon: MessageCircleMore,
    accent: "37 211 102",
  },
];

const SOCIAL_LINKS: PlatformItem[] = [
  {
    label: "YouTube",
    href: CONTACTS.youtubeUrl,
    icon: Play,
    accent: "255 62 62",
  },
  {
    label: "VK",
    href: CONTACTS.vkUrl,
    icon: MessageSquareMore,
    accent: "76 117 163",
  },
  {
    label: "RuTube",
    href: CONTACTS.rutubeUrl,
    icon: MonitorPlay,
    accent: "138 92 246",
  },
];

const copy = {
  ru: {
    pageTitle: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b Highway Films",
    eyebrow: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
    phoneLabel: "\u0422\u0435\u043b\u0435\u0444\u043e\u043d",
    emailLabel: "E-mail",
    messengersLabel: "\u041c\u0435\u0441\u0441\u0435\u043d\u0434\u0436\u0435\u0440\u044b",
    socialsLabel: "\u0421\u043e\u0446\u0441\u0435\u0442\u0438",
    briefLabel: "\u0411\u0440\u0438\u0444",
    briefTitle: "\u041a\u0440\u0430\u0442\u043a\u043e \u043e \u0437\u0430\u0434\u0430\u0447\u0435",
    briefLead: "\u0414\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0442\u0440\u0451\u0445 \u043e\u043f\u043e\u0440\u043d\u044b\u0445 \u0442\u043e\u0447\u0435\u043a, \u0447\u0442\u043e\u0431\u044b \u043c\u044b \u0431\u044b\u0441\u0442\u0440\u043e \u0441\u043e\u0431\u0440\u0430\u043b\u0438 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0448\u0430\u0433 \u043f\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0443.",
    briefItems: [
      "\u0427\u0442\u043e \u043d\u0443\u0436\u043d\u043e \u0441\u043d\u044f\u0442\u044c: \u0440\u043e\u043b\u0438\u043a, \u043a\u043b\u0438\u043f, brand-film, \u0438\u0432\u0435\u043d\u0442 \u0438\u043b\u0438 \u0441\u0432\u0430\u0434\u044c\u0431\u0430",
      "\u0413\u0434\u0435 \u0438 \u043a\u043e\u0433\u0434\u0430: \u0433\u043e\u0440\u043e\u0434, \u0434\u0430\u0442\u0430 \u0438\u043b\u0438 \u043e\u043a\u043d\u043e \u0441\u044a\u0451\u043c\u043a\u0438",
      "\u041a\u0430\u043a\u043e\u0439 \u043d\u0443\u0436\u0435\u043d \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442: \u043e\u0434\u0438\u043d master \u0438\u043b\u0438 \u043f\u0430\u043a\u0435\u0442 \u0432\u0435\u0440\u0441\u0438\u0439 \u043f\u043e\u0434 \u043f\u043b\u043e\u0449\u0430\u0434\u043a\u0438",
    ],
    briefAction: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0431\u0440\u0438\u0444",
    briefMeta: "\u041c\u043e\u0436\u043d\u043e \u043d\u0430\u0447\u0430\u0442\u044c \u043a\u043e\u0440\u043e\u0442\u043a\u043e. \u0414\u0435\u0442\u0430\u043b\u0438 \u0443\u0442\u043e\u0447\u043d\u0438\u043c \u0443\u0436\u0435 \u043f\u043e\u0441\u043b\u0435 \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0430.",
  },
  en: {
    pageTitle: "Highway Films contacts",
    eyebrow: "Contacts",
    phoneLabel: "Phone",
    emailLabel: "E-mail",
    messengersLabel: "Messengers",
    socialsLabel: "Social",
    briefLabel: "Brief",
    briefTitle: "Short brief",
    briefLead: "Three anchors are enough for us to shape the next step and reply with a practical production route.",
    briefItems: [
      "What needs to be produced: commercial, music video, brand film, event, or wedding story",
      "Where and when: city, date, or the expected production window",
      "What should be delivered: one master or a release package for several platforms",
    ],
    briefAction: "Open brief",
    briefMeta: "A short note is enough to start. We can clarify the rest after the first contact.",
  },
} as const;

function externalProps(href: string) {
  return href.startsWith("http")
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};
}

function ContactLinkGroup({ label, items }: { label: string; items: PlatformItem[] }) {
  return (
    <div className="contact-platform-group">
      <div className="contact-quick-label">{label}</div>
      <div className="contact-platforms-grid mt-5">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              className="contact-platform-card"
              aria-label={item.label}
              title={item.label}
              style={
                {
                  "--contact-accent": item.accent,
                  "--contact-index": index,
                } as CSSProperties
              }
              {...externalProps(item.href)}
            >
              <span className="contact-platform-card__halo" aria-hidden />
              <span className="contact-platform-card__orb" aria-hidden>
                <span className="contact-platform-card__ring" />
                <span className="contact-platform-card__sheen" />
                <span className="contact-platform-card__core">
                  <span className="contact-platform-icon">
                    <Icon className="h-7 w-7" strokeWidth={1.85} />
                  </span>
                </span>
              </span>
              <span className="visually-hidden">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function ContactStudioPage({ locale = "ru" }: ContactStudioPageProps) {
  const t = copy[locale];
  const briefHref = locale === "en" ? "/en/brief" : CONTACTS.briefUrl;

  return (
    <div className="page-shell contact-page-shell">
      <div className="contact-page-ambient" />
      <div className="page-content">
        <section className="container relative pb-16 pt-header-safe md:pb-20">
          <div className="contact-page-map" aria-hidden />
          <h1 className="visually-hidden">{t.pageTitle}</h1>

          <div className="contact-first-screen">
            <div className="contact-first-screen__primary reveal-up">
              <section className="contact-quick-panel">
                <div className="contact-quick-panel__rays" aria-hidden>
                  <LightRays
                    raysOrigin="top-center"
                    raysColor="#f6efe6"
                    raysSpeed={0.58}
                    lightSpread={0.62}
                    rayLength={3.6}
                    followMouse={false}
                    mouseInfluence={0.04}
                    noiseAmount={0}
                    distortion={0.04}
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1.06}
                    className="contact-light-rays"
                  />
                </div>

                <div className="contact-quick-panel__overlay" aria-hidden />
                <div className="contact-quick-panel__content">
                  <div className="contact-quick-panel__main mx-auto w-full max-w-[1120px]">
                    <div className="contact-quick-head">
                      <p className="eyebrow">{t.eyebrow}</p>
                    </div>

                    <div className="contact-quick-list mt-6">
                      <div className="contact-quick-item">
                        <div className="contact-quick-label">{t.phoneLabel}</div>
                        <a href={CONTACTS.phoneHref} className="contact-primary-link" {...externalProps(CONTACTS.phoneHref)}>
                          {CONTACTS.phoneDisplay}
                        </a>
                      </div>

                      <div className="contact-quick-item">
                        <div className="contact-quick-label">{t.emailLabel}</div>
                        <a href={CONTACTS.emailHref} className="contact-primary-link" {...externalProps(CONTACTS.emailHref)}>
                          {CONTACTS.emailDisplay}
                        </a>
                      </div>
                    </div>

                    <div className="contact-platform-row">
                      <ContactLinkGroup label={t.messengersLabel} items={MESSENGER_LINKS} />
                      <ContactLinkGroup label={t.socialsLabel} items={SOCIAL_LINKS} />
                    </div>

                    <div className="contact-brief-stage">
                      <div className="contact-brief-stage__rail" aria-hidden />
                      <div className="contact-platform-group contact-platform-group--brief">
                        <div className="contact-quick-label">{t.briefLabel}</div>
                        <div className="contact-brief-card mt-5">
                          <p className="contact-brief-card__title">{t.briefTitle}</p>
                          <p className="contact-brief-card__lead">{t.briefLead}</p>
                          <ul className="contact-brief-list">
                            {t.briefItems.map((item) => (
                              <li key={item} className="contact-brief-list__item">
                                <span className="contact-brief-list__dot" aria-hidden />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <Link href={briefHref} className="contact-brief-link">
                            {t.briefAction}
                          </Link>
                          <p className="contact-brief-card__meta">{t.briefMeta}</p>
                        </div>
                      </div>
                      <div className="contact-brief-stage__rail" aria-hidden />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  MessageCircle,
  MessageSquare,
  Send,
  SendHorizonal,
} from "lucide-react";

type ContactStudioPageProps = {
  locale?: "ru" | "en";
  status?: string;
  reason?: string;
};

const CONTACTS = {
  phoneDisplay: "+7 969 214-17-17",
  phoneHref: "tel:+79692141717",
  emailDisplay: "info@highway-films.ru",
  emailHref: "mailto:info@highway-films.ru",
  telegramUrl: "https://t.me/highwayfilms",
  whatsappUrl: "https://wa.me/79692141717",
  briefUrl: "/brief",
  messengerIcons: {
    telegram: "/contact-icons/telegram.svg",
    whatsapp: "/contact-icons/whatsapp.svg",
    max: "/contact-icons/max.svg",
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

function StatusBanner({
  locale,
  status,
  reason,
}: {
  locale: "ru" | "en";
  status?: string;
  reason?: string;
}) {
  if (status !== "success" && status !== "error") return null;

  const isRu = locale === "ru";

  if (status === "success") {
    return (
      <div className="rounded-[22px] border border-emerald-400/20 bg-emerald-500/8 px-4 py-3 text-sm leading-6 text-emerald-100/88">
        {isRu
          ? "Заявка отправлена. Вернёмся с ответом в рабочее время."
          : "Your message has been sent. We will get back during business hours."}
      </div>
    );
  }

  const errorText = isRu
    ? reason === "contact"
      ? "Оставьте хотя бы один рабочий контакт."
      : reason === "rate-limit"
        ? "Слишком много попыток за короткое время. Попробуйте чуть позже."
        : "Не удалось отправить заявку. Проверьте поля и попробуйте ещё раз."
    : reason === "contact"
      ? "Please leave at least one working contact."
      : reason === "rate-limit"
        ? "Too many attempts in a short time. Please try again later."
        : "The message could not be sent. Please check the fields and try again.";

  return (
    <div className="rounded-[22px] border border-rose-400/20 bg-rose-500/8 px-4 py-3 text-sm leading-6 text-rose-100/88">
      {errorText}
    </div>
  );
}

function MessengerIcon({
  src,
  fallback,
}: {
  src?: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt=""
        aria-hidden
        width={20}
        height={20}
        unoptimized
        className="h-5 w-5 object-contain opacity-90"
        onError={() => setFailed(true)}
      />
    );
  }

  return <span className="inline-flex h-5 w-5 items-center justify-center text-white/86">{fallback}</span>;
}

function ContactField({
  label,
  placeholder,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-sm text-white/58">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="contact-form-input"
      />
    </label>
  );
}

type MessengerItem = {
  label: string;
  href?: string;
  iconSrc?: string;
  fallback: ReactNode;
  soon?: boolean;
};

export function ContactStudioPage({
  locale = "ru",
  status,
  reason,
}: ContactStudioPageProps) {
  const isRu = locale === "ru";
  const briefHref = isRu ? CONTACTS.briefUrl : "/en/brief";

  const messengers: MessengerItem[] = [
    {
      label: "Telegram",
      href: CONTACTS.telegramUrl,
      iconSrc: CONTACTS.messengerIcons.telegram,
      fallback: <SendHorizonal className="h-[18px] w-[18px]" />,
    },
    {
      label: "WhatsApp",
      href: CONTACTS.whatsappUrl,
      iconSrc: CONTACTS.messengerIcons.whatsapp,
      fallback: <MessageCircle className="h-[18px] w-[18px]" />,
    },
    {
      label: isRu ? "MAX (скоро)" : "MAX (soon)",
      iconSrc: CONTACTS.messengerIcons.max,
      fallback: <MessageSquare className="h-[18px] w-[18px]" />,
      soon: true,
    },
  ];

  if (!isRu) {
    return (
      <main className="page-shell contact-page-shell">
        <div className="contact-page-ambient" />
        <div className="page-content">
          <section className="container pb-16 pt-header-safe md:pb-20">
            <div className="contact-hero-copy max-w-3xl py-10">
              <p className="eyebrow">Saint Petersburg • productions across Russia</p>
              <h1 className="font-display mt-4 text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.94] tracking-[-0.05em] text-white">
                Contacts Highway Films
              </h1>
              <p className="mt-5 text-base leading-8 text-white/64 md:text-[1.05rem]">
                Reach out by phone, e-mail, or messenger. If easier, leave a short request and we
                will suggest the next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={CONTACTS.phoneHref} className="contact-primary-link" {...externalProps(CONTACTS.phoneHref)}>
                  {CONTACTS.phoneDisplay}
                </a>
                <a href={CONTACTS.emailHref} className="contact-secondary-link" {...externalProps(CONTACTS.emailHref)}>
                  {CONTACTS.emailDisplay}
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell contact-page-shell">
      <div className="contact-page-ambient" />
      <div className="page-content">
        <section className="container relative pb-16 pt-header-safe md:pb-20">
          <div className="contact-page-map" aria-hidden />

          <div className="contact-hero-copy max-w-3xl py-8 md:py-10">
            <p className="eyebrow reveal-up">Санкт-Петербург • выездные съёмки по России</p>
            <h1 className="font-display reveal-up delay-1 mt-4 text-[clamp(3rem,5.6vw,5.4rem)] leading-[0.92] tracking-[-0.055em] text-white">
              Контакты Highway Films
            </h1>
            <p className="reveal-up delay-2 mt-5 max-w-3xl text-[1rem] leading-8 text-white/64 md:text-[1.08rem]">
              Связаться с нами можно так, как вам удобно: по телефону, почте или в мессенджере.
              Если проще сразу описать задачу, оставьте короткую заявку ниже.
            </p>
          </div>

          <section className="reveal-up delay-2 max-w-4xl">
            <p className="eyebrow">Контакты</p>

            <div className="mt-6 grid gap-8 border-b border-white/10 pb-6 md:grid-cols-2 md:gap-12">
              <div className="contact-primary-block">
                <div className="text-[0.72rem] uppercase tracking-[0.18em] text-white/38">Телефон</div>
                <a href={CONTACTS.phoneHref} className="contact-primary-link mt-3" {...externalProps(CONTACTS.phoneHref)}>
                  {CONTACTS.phoneDisplay}
                </a>
              </div>

              <div className="contact-primary-block">
                <div className="text-[0.72rem] uppercase tracking-[0.18em] text-white/38">E-mail</div>
                <a href={CONTACTS.emailHref} className="contact-primary-link mt-3" {...externalProps(CONTACTS.emailHref)}>
                  {CONTACTS.emailDisplay}
                </a>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[0.72rem] uppercase tracking-[0.18em] text-white/38">Мессенджеры</div>
              <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-4 md:gap-x-9">
                {messengers.map((item) =>
                  item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="contact-messenger-link"
                      {...externalProps(item.href)}
                    >
                      <MessengerIcon src={item.iconSrc} fallback={item.fallback} />
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <div key={item.label} className="contact-messenger-link is-disabled" aria-disabled="true">
                      <MessengerIcon src={item.iconSrc} fallback={item.fallback} />
                      <span>{item.label}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          <section id="contact-form" className="mt-14 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
            <div className="reveal-up delay-3 max-w-xl">
              <p className="eyebrow">Заявка</p>
              <h2 className="font-display mt-4 text-[clamp(2.2rem,3vw,3.5rem)] leading-[0.95] tracking-[-0.04em] text-white">
                Расскажите о проекте
              </h2>
              <p className="mt-4 text-[1rem] leading-8 text-white/62">
                Напишите в двух словах, что нужно снять: рекламный ролик, корпоративное видео,
                клип, свадебный фильм, контент для бренда или съёмку мероприятия. Этого
                достаточно, чтобы мы поняли задачу и предложили следующий шаг.
              </p>
              <div className="mt-6">
                <StatusBanner locale={locale} status={status} reason={reason} />
              </div>
            </div>

            <form
              action="/api/contact"
              method="POST"
              className="contact-form-shell reveal-up delay-4"
            >
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="source" value="contacts" />
              <input type="hidden" name="agree" value="yes" />

              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-5">
                <ContactField
                  label="Ваше имя"
                  placeholder="Как к вам обращаться"
                  name="name"
                />

                <ContactField
                  label="Телефон, Telegram или e-mail"
                  placeholder="Как с вами связаться"
                  name="phone"
                  required
                />

                <label className="block">
                  <span className="mb-2.5 block text-sm text-white/58">Что нужно снять</span>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder="Коротко опишите задачу, формат или идею"
                    className="contact-form-textarea"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
                <button type="submit" className="home-primary-button">
                  Отправить заявку
                  <Send className="h-4 w-4" />
                </button>
                <Link href={briefHref} className="home-secondary-link">
                  Полный бриф
                </Link>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/46">
                Можно начать с короткого описания. Детали обсудим после первого контакта.
              </p>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}

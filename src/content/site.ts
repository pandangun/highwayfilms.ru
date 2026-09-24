import type { Locale } from "@/components/siteNavigation";

/** Контакты студии — единственное место, где они записаны. */
export const contacts = {
  phone: "+7 969 214-17-17",
  phoneHref: "tel:+79692141717",
  email: "info@highway-films.ru",
  emailHref: "mailto:info@highway-films.ru",
  telegram: "@highwayfilms",
  telegramHref: "https://t.me/highwayfilms",
} as const;

type SiteStrings = {
  brief: string;
  briefLong: string;
  client: string;
  telegram: string;
  menuOpen: string;
  menuClose: string;
  menuLabel: string;
  home: string;
  city: string;
  footerLine: string;
  rights: string;
  privacy: string;
  labels: {
    phone: string;
    telegram: string;
    email: string;
    city: string;
  };
  footer: {
    about: string;
    services: string;
    studio: string;
    contact: string;
  };
};

export const siteStrings: Record<Locale, SiteStrings> = {
  ru: {
    brief: "Бриф",
    briefLong: "Заполнить бриф",
    client: "Кабинет",
    telegram: "Написать в Telegram",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    menuLabel: "Главное меню",
    home: "На главную",
    city: "Санкт-Петербург и Москва",
    footerLine: "Видеостудия. Реклама, корпоративное видео, клипы, свадьбы и AI-ролики.",
    rights: "Highway Films",
    privacy: "Политика конфиденциальности",
    labels: {
      phone: "Телефон",
      telegram: "Telegram",
      email: "Почта",
      city: "Города",
    },
    footer: {
      about: "Видеостудия в Санкт‑Петербурге и Москве",
      services: "Направления",
      studio: "Студия",
      contact: "Связаться",
    },
  },
  en: {
    brief: "Brief",
    briefLong: "Fill in the brief",
    client: "Client room",
    telegram: "Message on Telegram",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuLabel: "Main menu",
    home: "Home",
    city: "Saint Petersburg and Moscow",
    footerLine: "Video studio. Commercials, corporate films, music videos, weddings and AI films.",
    rights: "Highway Films",
    privacy: "Privacy policy",
    labels: {
      phone: "Phone",
      telegram: "Telegram",
      email: "Email",
      city: "Cities",
    },
    footer: {
      about: "Video studio in Saint Petersburg and Moscow",
      services: "Services",
      studio: "Studio",
      contact: "Contact",
    },
  },
};

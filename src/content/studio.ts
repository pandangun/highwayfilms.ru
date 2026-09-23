import type { Locale } from "@/components/siteNavigation";
import type { Format, Meta, Pair } from "@/content/types";

export type AboutContent = {
  meta: Meta;
  title: string;
  lead: string;
  still: { src: string; alt: string };
  rules: { title: string; items: Format[] };
  directions: { title: string; items: { href: string; title: string }[] };
  geography: { title: string; items: Pair[] };
  /**
   * Команда. Пустой список — блок не выводится. Заполнить именами и
   * ролями, как в титрах: { label: "Режиссёр", value: "Имя Фамилия" }.
   */
  team: { title: string; items: Pair[] };
  invite: { title: string; text: string };
};

export type ContactsContent = {
  meta: Meta;
  title: string;
  lead: string;
  briefCta: string;
  form: {
    title: string;
    text: string;
    submit: string;
    consentBefore: string;
    consentLink: string;
    optional: string;
    oneOf: string;
    fields: {
      name: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
  };
};

export const aboutContent: Record<Locale, AboutContent> = {
  ru: {
    meta: {
      title: "О студии Highway Films — видеопродакшн в Санкт-Петербурге и Москве",
      description:
        "Highway Films — видеостудия из Петербурга. Реклама, корпоративное видео, клипы, свадьбы и AI-ролики. Как мы работаем, где снимаем, что входит в смету.",
    },
    title: "О студии",
    lead: "Highway Films — видеостудия из Петербурга. Снимаем рекламу, фильмы о компаниях, клипы и свадьбы, делаем AI-ролики.",
    still: { src: "/images/stills/commercials-01.jpg", alt: "Кадр из рекламного ролика: лазерный прибор в темноте" },
    rules: {
      title: "Как мы работаем",
      items: [
        {
          title: "Картинка",
          text: "Свет ставим под каждую сцену, цветокоррекцию делаем сами. Как это выглядит, видно в шоуриле на главной.",
        },
        {
          title: "Подготовка",
          text: "До съёмки вы видите сценарий, список сцен и раскадровку. Съёмочный день идёт по этому плану.",
        },
        {
          title: "Смета",
          text: "В смете расписана каждая строка: команда, техника, смены, монтаж. Что считается отдельно, пишем заранее.",
        },
        {
          title: "Сроки",
          text: "Дату сдачи называем в смете и держим её. Если что-то сдвигается, предупреждаем до того, как это станет проблемой.",
        },
      ],
    },
    directions: {
      title: "Что снимаем",
      items: [
        { href: "/commercials", title: "Реклама" },
        { href: "/corporate", title: "Корпоративное видео" },
        { href: "/music-videos", title: "Музыкальные клипы" },
        { href: "/weddings", title: "Свадебные фильмы" },
        { href: "/ai", title: "AI-ролики" },
        { href: "/videoproduction", title: "Полный цикл" },
      ],
    },
    geography: {
      title: "Где снимаем",
      items: [
        { label: "Основные города", value: "Санкт-Петербург и Москва" },
        { label: "Выезды", value: "по России, дорога — строкой в смете" },
        { label: "Съёмка", value: "в студии, на производстве, на площадке клиента" },
      ],
    },
    team: { title: "Съёмочная группа", items: [] },
    invite: {
      title: "Расскажите о задаче",
      text: "Бриф занимает десять минут. В течение рабочего дня пришлём смету и план съёмки.",
    },
  },
  en: {
    meta: {
      title: "About Highway Films — video production in Saint Petersburg and Moscow",
      description:
        "Highway Films is a video studio from Saint Petersburg. Commercials, corporate films, music videos, weddings and AI films. How we work, where we shoot, what the estimate covers.",
    },
    title: "Studio",
    lead: "Highway Films is a video studio from Saint Petersburg. We shoot commercials, company films, music videos and weddings, and make AI films.",
    still: { src: "/images/stills/commercials-01.jpg", alt: "Still from a commercial: a laser device in the dark" },
    rules: {
      title: "How we work",
      items: [
        {
          title: "Image",
          text: "Light is set for every scene and we grade colour ourselves. The showreel on the home page shows what that looks like.",
        },
        {
          title: "Preparation",
          text: "Before the shoot you see the script, shot list and storyboard. The shoot day follows the plan.",
        },
        {
          title: "Estimate",
          text: "Every line is spelled out: crew, equipment, shoot days, editing. Anything priced separately is named in advance.",
        },
        {
          title: "Deadlines",
          text: "The delivery date is in the estimate and we keep it. If something shifts, we tell you before it becomes a problem.",
        },
      ],
    },
    directions: {
      title: "What we shoot",
      items: [
        { href: "/commercials", title: "Commercials" },
        { href: "/corporate", title: "Corporate video" },
        { href: "/music-videos", title: "Music videos" },
        { href: "/weddings", title: "Wedding films" },
        { href: "/ai", title: "AI films" },
        { href: "/videoproduction", title: "Full production" },
      ],
    },
    geography: {
      title: "Where we shoot",
      items: [
        { label: "Base cities", value: "Saint Petersburg and Moscow" },
        { label: "Travel", value: "across Russia, travel is a line in the estimate" },
        { label: "Settings", value: "studio, factory floor, client location" },
      ],
    },
    team: { title: "Crew", items: [] },
    invite: {
      title: "Tell us about the task",
      text: "The brief takes ten minutes. Within one working day we send an estimate and a shoot plan.",
    },
  },
};

export const contactsContent: Record<Locale, ContactsContent> = {
  ru: {
    meta: {
      title: "Контакты Highway Films — видеостудия в Санкт-Петербурге и Москве",
      description: "Телефон, Telegram и почта Highway Films. Отвечаем в течение рабочего дня. Для сметы заполните бриф.",
    },
    title: "Контакты",
    lead: "Отвечаем в течение рабочего дня. Если нужна смета, быстрее всего через бриф.",
    briefCta: "Заполнить бриф",
    form: {
      title: "Написать сообщение",
      text: "Коротко о задаче и как с вами связаться.",
      submit: "Отправить",
      consentBefore: "Даю согласие на обработку данных по ",
      consentLink: "политике конфиденциальности",
      optional: "необязательно",
      oneOf: "телефон или почта",
      fields: {
        name: { label: "Имя", placeholder: "Как к вам обращаться" },
        phone: { label: "Телефон или Telegram", placeholder: "+7 999 123-45-67 или @username" },
        email: { label: "Почта", placeholder: "you@example.com" },
        message: { label: "Сообщение", placeholder: "Что нужно снять и к какой дате" },
      },
    },
  },
  en: {
    meta: {
      title: "Contacts — Highway Films, video studio in Saint Petersburg and Moscow",
      description: "Phone, Telegram and email of Highway Films. We reply within one working day. For an estimate, fill in the brief.",
    },
    title: "Contacts",
    lead: "We reply within one working day. For an estimate, the brief is the fastest way.",
    briefCta: "Fill in the brief",
    form: {
      title: "Send a message",
      text: "A few words about the task and how to reach you.",
      submit: "Send",
      consentBefore: "I agree to data processing under the ",
      consentLink: "privacy policy",
      optional: "optional",
      oneOf: "phone or email",
      fields: {
        name: { label: "Name", placeholder: "Your name" },
        phone: { label: "Phone or Telegram", placeholder: "+7 999 123-45-67 or @username" },
        email: { label: "Email", placeholder: "you@example.com" },
        message: { label: "Message", placeholder: "What you need filmed and by when" },
      },
    },
  },
};

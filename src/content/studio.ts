import type { Locale } from "@/components/siteNavigation";
import type { Format, Meta, Pair } from "@/content/types";
import type { PricedKey } from "@/lib/pricing";

export type AboutContent = {
  meta: Meta;
  title: string;
  lead: string;
  /** Описание постера первого экрана — нарезки из шоурила. */
  heroAlt: string;
  /** Главное, чем сильна студия, — картинка: показываем кадры, а не хвалим. */
  picture: { title: string; lead: string; frames: { src: string; alt: string; caption: string }[] };
  rules: { title: string; items: Format[] };
  directions: { title: string; items: { key: PricedKey; href: string; title: string; still: string }[] };
  /** Два города на концах одной трассы — отсюда и название студии. */
  geography: { title: string; from: string; to: string; road: string; items: Pair[] };
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
    heroAlt: "Девушка на ночном мосту — первый кадр нарезки из работ студии",
    picture: {
      title: "Картинка",
      lead: "Свет ставим под каждую сцену, цветокоррекцию делаем сами. Ниже — кадры из шоурила.",
      frames: [
        { src: "/images/stills/music-videos-02.jpg", alt: "Кадр из клипа: горящая лодка в море", caption: "Клип" },
        { src: "/images/stills/weddings-02.jpg", alt: "Кадр со свадьбы: жених и невеста", caption: "Свадьба" },
        { src: "/images/stills/commercials-02.jpg", alt: "Кадр из рекламы: самолёт в ангаре", caption: "Реклама" },
        {
          src: "/images/stills/corporate-03.jpg",
          alt: "Кадр из фильма о медицине: хирурги в операционной",
          caption: "Фильм о компании",
        },
      ],
    },
    rules: {
      title: "Как мы работаем",
      items: [
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
        { key: "commercials", href: "/commercials", title: "Реклама", still: "/images/stills/commercials-01.jpg" },
        { key: "corporate", href: "/corporate", title: "Корпоративное видео", still: "/images/stills/corporate-01.jpg" },
        { key: "music-videos", href: "/music-videos", title: "Музыкальные клипы", still: "/images/stills/music-videos-01.jpg" },
        { key: "weddings", href: "/weddings", title: "Свадебные фильмы", still: "/images/stills/weddings-01.jpg" },
        { key: "ai", href: "/ai", title: "AI-ролики", still: "/images/stills/ai-01.jpg" },
        { key: "videoproduction", href: "/videoproduction", title: "Полный цикл", still: "/images/stills/videoproduction-02.jpg" },
      ],
    },
    geography: {
      title: "Где снимаем",
      from: "Санкт-Петербург",
      to: "Москва",
      road: "684 км по трассе М-11",
      items: [
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
    heroAlt: "A woman on a bridge at night, the first shot of a cut from the studio's work",
    picture: {
      title: "Picture",
      lead: "Light is set for every scene and we grade colour ourselves. The frames below are from the showreel.",
      frames: [
        { src: "/images/stills/music-videos-02.jpg", alt: "Music video still: a burning boat at sea", caption: "Music video" },
        { src: "/images/stills/weddings-02.jpg", alt: "Wedding still: bride and groom", caption: "Wedding" },
        { src: "/images/stills/commercials-02.jpg", alt: "Commercial still: a plane in a hangar", caption: "Commercial" },
        {
          src: "/images/stills/corporate-03.jpg",
          alt: "Still from a medical film: surgeons in an operating room",
          caption: "Company film",
        },
      ],
    },
    rules: {
      title: "How we work",
      items: [
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
        { key: "commercials", href: "/commercials", title: "Commercials", still: "/images/stills/commercials-01.jpg" },
        { key: "corporate", href: "/corporate", title: "Corporate video", still: "/images/stills/corporate-01.jpg" },
        { key: "music-videos", href: "/music-videos", title: "Music videos", still: "/images/stills/music-videos-01.jpg" },
        { key: "weddings", href: "/weddings", title: "Wedding films", still: "/images/stills/weddings-01.jpg" },
        { key: "ai", href: "/ai", title: "AI films", still: "/images/stills/ai-01.jpg" },
        { key: "videoproduction", href: "/videoproduction", title: "Full production", still: "/images/stills/videoproduction-02.jpg" },
      ],
    },
    geography: {
      title: "Where we shoot",
      from: "Saint Petersburg",
      to: "Moscow",
      road: "684 km along the M-11",
      items: [
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

import type { Locale } from "@/components/siteNavigation";
import type { PricedKey } from "@/lib/pricing";
import type { Meta, Pair, Step } from "@/content/types";

export type ProgramItem = {
  key: PricedKey;
  href: string;
  title: string;
  text: string;
};

/** Дорожный щит над трассой: крупная строка и пояснение под ней. */
export type RoadSign = { title: string; text: string };

export type HomeContent = {
  meta: Meta;
  hero: {
    title: string;
    credits: Pair[];
    mute: string;
    unmute: string;
    fullscreen: string;
  };
  intro: { title: string; text: string };
  /** Щиты с преимуществами, которые пролетают над трассой. */
  drive: { signs: RoadSign[] };
  program: { title: string; items: ProgramItem[] };
  process: { title: string; lead: string; items: Step[] };
  invite: { title: string; text: string };
};

/**
 * Этапы работы. Общие для главной и разделов, поэтому лежат отдельно.
 * Сроки — ориентиры для одного ролика с одной сменой.
 */
export const processSteps: Record<Locale, Step[]> = {
  ru: [
    {
      title: "Бриф",
      text: "Заполняете бриф или созваниваемся на 20 минут. В течение рабочего дня присылаем смету, где расписана каждая строка.",
      time: "1 день",
    },
    {
      title: "Сценарий и список сцен",
      text: "Пишем сценарий или дорабатываем ваш. До съёмки согласуем список сцен и раскадровку, чтобы на площадке было известно, что и в каком порядке снимаем.",
      time: "3–7 дней",
    },
    {
      title: "Съёмка",
      text: "Свет ставим под каждую сцену. Актёров, локации и реквизит подбираем заранее и показываем вам до съёмочного дня.",
      time: "1–3 смены",
    },
    {
      title: "Монтаж, цвет, звук",
      text: "Первую версию показываем через 5–10 рабочих дней после съёмки. Правки принимаем списком по таймкодам, два круга входят в смету.",
      time: "1–3 недели",
    },
    {
      title: "Сдача",
      text: "Отдаём мастер-копию и нарезки под площадки: горизонтальные, вертикальные и квадратные.",
    },
  ],
  en: [
    {
      title: "Brief",
      text: "Fill in the brief or book a 20-minute call. Within one working day you get an estimate with every line spelled out.",
      time: "1 day",
    },
    {
      title: "Script and shot list",
      text: "We write the script or refine yours. Before the shoot we agree on the shot list and storyboard, so everyone on set knows what gets filmed and in what order.",
      time: "3–7 days",
    },
    {
      title: "Shoot",
      text: "Light is set for every scene. Cast, locations and props are chosen in advance and shown to you before the shoot day.",
      time: "1–3 days",
    },
    {
      title: "Edit, grade, sound",
      text: "The first cut arrives 5–10 working days after the shoot. Notes come as a timecoded list; two rounds are included in the estimate.",
      time: "1–3 weeks",
    },
    {
      title: "Delivery",
      text: "You get the master and cut-downs for every placement: horizontal, vertical and square.",
    },
  ],
};

export const homeContent: Record<Locale, HomeContent> = {
  ru: {
    meta: {
      title: "Highway Films — видеостудия в Санкт-Петербурге и Москве",
      description:
        "Снимаем рекламные ролики, корпоративное видео, музыкальные клипы и свадебные фильмы, делаем AI-ролики. Смета в течение рабочего дня после брифа.",
    },
    hero: {
      title: "Highway Films",
      credits: [
        { label: "Шоурил", value: "2026" },
        { label: "Снимаем", value: "рекламу, фильмы о компаниях, клипы и свадьбы" },
        { label: "Города", value: "Санкт-Петербург и Москва" },
      ],
      mute: "Включить звук",
      unmute: "Выключить звук",
      fullscreen: "На весь экран",
    },
    intro: {
      title: "Снимаем рекламу, фильмы о компаниях, клипы и свадьбы",
      text: "До съёмочного дня вы получаете смету и список сцен. После — мастер-копию и нарезки под площадки, включая вертикальные.",
    },
    drive: {
      signs: [
        { title: "Смета за один день", text: "с расшифровкой по строкам" },
        { title: "Раскадровка до съёмки", text: "каждую сцену видно заранее" },
        { title: "Свой свет и цвет", text: "свет под каждую сцену, цветокоррекция в студии" },
        { title: "Все форматы с одной съёмки", text: "16:9, 9:16 и 1:1" },
        { title: "Правки по таймкодам", text: "в кабинете клиента, одной лентой" },
        { title: "Срок сдачи в смете", text: "называем заранее и держим" },
      ],
    },
    program: {
      title: "Что снимаем",
      items: [
        {
          key: "commercials",
          href: "/commercials",
          title: "Реклама",
          text: "Ролики для ТВ, интернета и маркетплейсов. Из одной съёмки монтируем версии на 6, 15 и 30 секунд.",
        },
        {
          key: "corporate",
          href: "/corporate",
          title: "Корпоративное видео",
          text: "Фильмы о компании и производстве, интервью с руководителями, ролики для найма и мероприятий.",
        },
        {
          key: "music-videos",
          href: "/music-videos",
          title: "Музыкальные клипы",
          text: "Придумываем визуальную историю под трек, снимаем её за один-два дня, монтируем и делаем цвет.",
        },
        {
          key: "weddings",
          href: "/weddings",
          title: "Свадебные фильмы",
          text: "Снимаем день как он идёт, без долгих постановок. Тизер через несколько дней, фильм через 3–4 недели.",
        },
        {
          key: "ai",
          href: "/ai",
          title: "AI-ролики",
          text: "Реклама на генеративных моделях — для идей, которые дорого или невозможно снимать камерой.",
        },
        {
          key: "videoproduction",
          href: "/videoproduction",
          title: "Полный цикл",
          text: "Проект целиком: сценарий, съёмка, графика, звук и выдача всех версий. Этапы можно заказать и по отдельности.",
        },
      ],
    },
    process: {
      title: "Как идёт работа",
      lead: "У каждого этапа есть результат, который вы видите и согласуете до следующего.",
      items: processSteps.ru,
    },
    invite: {
      title: "Расскажите, что нужно снять",
      text: "Бриф занимает десять минут. В течение рабочего дня пришлём смету с расшифровкой и срок до готового ролика.",
    },
  },
  en: {
    meta: {
      title: "Highway Films — video production in Saint Petersburg and Moscow",
      description:
        "Commercials, corporate films, music videos, wedding films and AI films. An estimate within one working day after the brief.",
    },
    hero: {
      title: "Highway Films",
      credits: [
        { label: "Showreel", value: "2026" },
        { label: "We shoot", value: "commercials, company films, music videos and weddings" },
        { label: "Cities", value: "Saint Petersburg and Moscow" },
      ],
      mute: "Sound on",
      unmute: "Sound off",
      fullscreen: "Full screen",
    },
    intro: {
      title: "Commercials, company films, music videos and weddings",
      text: "Before the shoot you get an estimate and a shot list. After it, the master and cut-downs for every placement, vertical ones included.",
    },
    drive: {
      signs: [
        { title: "Estimate in one day", text: "itemised line by line" },
        { title: "Storyboard before the shoot", text: "every scene agreed in advance" },
        { title: "Our own light and grade", text: "lit for each scene, graded in-house" },
        { title: "Every format from one shoot", text: "16:9, 9:16 and 1:1" },
        { title: "Notes by timecode", text: "in the client room, in one thread" },
        { title: "Delivery date in the estimate", text: "set upfront and kept" },
      ],
    },
    program: {
      title: "What we shoot",
      items: [
        {
          key: "commercials",
          href: "/commercials",
          title: "Commercials",
          text: "Spots for TV, online and marketplaces. One shoot gives you 6, 15 and 30-second versions.",
        },
        {
          key: "corporate",
          href: "/corporate",
          title: "Corporate video",
          text: "Films about a company and its production, executive interviews, hiring and event videos.",
        },
        {
          key: "music-videos",
          href: "/music-videos",
          title: "Music videos",
          text: "We come up with a visual story for the track, shoot it in one or two days, edit and grade it.",
        },
        {
          key: "weddings",
          href: "/weddings",
          title: "Wedding films",
          text: "We film the day as it happens, without long staging. A teaser in a few days, the film in 3–4 weeks.",
        },
        {
          key: "ai",
          href: "/ai",
          title: "AI films",
          text: "Advertising made with generative models, for ideas that are too costly or impossible to film.",
        },
        {
          key: "videoproduction",
          href: "/videoproduction",
          title: "Full production",
          text: "The whole project: script, shoot, graphics, sound and every delivery version. Stages can be booked separately.",
        },
      ],
    },
    process: {
      title: "How the work goes",
      lead: "Every stage ends with something you see and approve before the next one starts.",
      items: processSteps.en,
    },
    invite: {
      title: "Tell us what you need filmed",
      text: "The brief takes ten minutes. Within one working day we send an itemised estimate and a delivery date.",
    },
  },
};

import type { Locale } from "@/components/siteNavigation";
import type { PricedKey } from "@/lib/pricing";
import type { Meta, Pair, Qa, Step } from "@/content/types";

export type ProgramItem = {
  key: PricedKey;
  href: string;
  title: string;
  text: string;
  still: string;
  alt: string;
};

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
  /** Титры, которые летят навстречу в сцене дороги. */
  drive: { credits: string[] };
  look: { alt: string };
  program: ProgramItem[];
  programLink: string;
  process: { title: string; lead: string; items: Step[] };
  invite: { title: string; text: string };
  faq: { title: string; items: Qa[] };
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
      credits: ["Реклама", "Корпоративное видео", "Музыкальные клипы", "Свадебные фильмы", "AI-ролики"],
    },
    look: { alt: "Ночная трасса с эстакады: световые следы машин уходят к городу" },
    program: [
      {
        key: "commercials",
        href: "/commercials",
        title: "Реклама",
        text: "Ролики для ТВ, интернета и маркетплейсов. Из одной съёмки монтируем версии на 6, 15 и 30 секунд.",
        still: "/images/stills/commercials-02.jpg",
        alt: "Кадр из рекламного ролика: пилот у самолёта в ангаре",
      },
      {
        key: "corporate",
        href: "/corporate",
        title: "Корпоративное видео",
        text: "Фильмы о компании и производстве, интервью с руководителями, ролики для найма и мероприятий.",
        still: "/images/stills/corporate-01.jpg",
        alt: "Кадр со съёмки на производстве: руки мастера над тканью",
      },
      {
        key: "music-videos",
        href: "/music-videos",
        title: "Музыкальные клипы",
        text: "Придумываем визуальную историю под трек, снимаем её за один-два дня, монтируем и делаем цвет.",
        still: "/images/stills/music-videos-01.jpg",
        alt: "Кадр из клипа: девушка на ночном мосту",
      },
      {
        key: "weddings",
        href: "/weddings",
        title: "Свадебные фильмы",
        text: "Снимаем день как он идёт, без долгих постановок. Тизер через несколько дней, фильм через 3–4 недели.",
        still: "/images/stills/weddings-01.jpg",
        alt: "Кадр из свадебного фильма: молодожёны и гости с бенгальскими огнями",
      },
      {
        key: "ai",
        href: "/ai",
        title: "AI-ролики",
        text: "Реклама на генеративных моделях — для идей, которые дорого или невозможно снимать камерой.",
        still: "/images/stills/ai-01.jpg",
        alt: "Кадр из AI-ролика: девушка у окна с беспроводным наушником",
      },
      {
        key: "videoproduction",
        href: "/videoproduction",
        title: "Полный цикл",
        text: "Проект целиком: сценарий, съёмка, графика, звук и выдача всех версий. Этапы можно заказать и по отдельности.",
        still: "/images/stills/videoproduction-01.jpg",
        alt: "Кадр из шоурила: шахматные фигуры на доске",
      },
    ],
    programLink: "Открыть раздел",
    process: {
      title: "Как идёт работа",
      lead: "У каждого этапа есть результат, который вы видите и согласуете до следующего.",
      items: processSteps.ru,
    },
    invite: {
      title: "Расскажите, что нужно снять",
      text: "Бриф занимает десять минут. В течение рабочего дня пришлём смету с расшифровкой и срок до готового ролика.",
    },
    faq: {
      title: "Частые вопросы",
      items: [
        {
          q: "Сколько стоит рекламный ролик?",
          a: "От 150 000 ₽ за ролик с одной съёмочной сменой и небольшой командой. Цена растёт с числом смен, актёров и локаций и с объёмом графики. Точную смету присылаем после брифа, каждая строка в ней расписана.",
        },
        {
          q: "Можно прийти без сценария?",
          a: "Да, так начинается большинство проектов. Достаточно задачи и пары роликов, которые вам нравятся. Сценарий и список сцен напишем сами и согласуем с вами до съёмки.",
        },
        {
          q: "Сколько времени занимает производство?",
          a: "Рекламный ролик — от двух недель от брифа до мастер-копии, корпоративный фильм — от трёх. Срок зависит от числа смен и объёма монтажа, точную дату называем в смете.",
        },
        {
          q: "Вы работаете только в Петербурге?",
          a: "Основные города — Петербург и Москва. По России выезжаем, дорогу и проживание команды ставим в смету отдельной строкой.",
        },
        {
          q: "Можно заказать только монтаж или цветокоррекцию?",
          a: "Да. Берём ваш материал на монтаж, цвет, звук, графику или адаптацию под площадки.",
        },
        {
          q: "Как проходит согласование?",
          a: "Показываем версию монтажа, вы присылаете правки списком по таймкодам, мы вносим их за один заход. Два круга правок входят в смету.",
        },
      ],
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
      credits: ["Commercials", "Corporate video", "Music videos", "Wedding films", "AI films"],
    },
    look: { alt: "Night highway from an overpass: car light trails running toward the city" },
    program: [
      {
        key: "commercials",
        href: "/commercials",
        title: "Commercials",
        text: "Spots for TV, online and marketplaces. One shoot gives you 6, 15 and 30-second versions.",
        still: "/images/stills/commercials-02.jpg",
        alt: "Still from a commercial: a pilot next to a jet in a hangar",
      },
      {
        key: "corporate",
        href: "/corporate",
        title: "Corporate video",
        text: "Films about a company and its production, executive interviews, hiring and event videos.",
        still: "/images/stills/corporate-01.jpg",
        alt: "Still from a production shoot: a tailor's hands over fabric",
      },
      {
        key: "music-videos",
        href: "/music-videos",
        title: "Music videos",
        text: "We come up with a visual story for the track, shoot it in one or two days, edit and grade it.",
        still: "/images/stills/music-videos-01.jpg",
        alt: "Still from a music video: a woman on a bridge at night",
      },
      {
        key: "weddings",
        href: "/weddings",
        title: "Wedding films",
        text: "We film the day as it happens, without long staging. A teaser in a few days, the film in 3–4 weeks.",
        still: "/images/stills/weddings-01.jpg",
        alt: "Still from a wedding film: the couple and guests with sparklers",
      },
      {
        key: "ai",
        href: "/ai",
        title: "AI films",
        text: "Advertising made with generative models, for ideas that are too costly or impossible to film.",
        still: "/images/stills/ai-01.jpg",
        alt: "Still from an AI film: a woman by the window with a wireless earbud",
      },
      {
        key: "videoproduction",
        href: "/videoproduction",
        title: "Full production",
        text: "The whole project: script, shoot, graphics, sound and every delivery version. Stages can be booked separately.",
        still: "/images/stills/videoproduction-01.jpg",
        alt: "Still from the showreel: chess pieces on a board",
      },
    ],
    programLink: "Open section",
    process: {
      title: "How the work goes",
      lead: "Every stage ends with something you see and approve before the next one starts.",
      items: processSteps.en,
    },
    invite: {
      title: "Tell us what you need filmed",
      text: "The brief takes ten minutes. Within one working day we send an itemised estimate and a delivery date.",
    },
    faq: {
      title: "Questions",
      items: [
        {
          q: "How much does a commercial cost?",
          a: "From RUB 150,000 for a spot with one shoot day and a small crew. The price grows with shoot days, cast, locations and the amount of graphics. After the brief we send an itemised estimate.",
        },
        {
          q: "Can we start without a script?",
          a: "Yes, most projects start that way. A task and a couple of videos you like are enough. We write the script and shot list and agree them with you before the shoot.",
        },
        {
          q: "How long does production take?",
          a: "A commercial takes two weeks or more from brief to master, a corporate film three or more. It depends on shoot days and the amount of editing; the exact date is in the estimate.",
        },
        {
          q: "Do you only work in Saint Petersburg?",
          a: "Our base cities are Saint Petersburg and Moscow. We travel across Russia; travel and accommodation are a separate line in the estimate.",
        },
        {
          q: "Can we order only editing or colour grading?",
          a: "Yes. We take your footage for editing, grading, sound, graphics or platform adaptations.",
        },
        {
          q: "How do approvals work?",
          a: "We show a cut, you send notes as a timecoded list, and we apply them in one pass. Two rounds of notes are included in the estimate.",
        },
      ],
    },
  },
};

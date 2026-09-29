import type { Locale } from "@/components/siteNavigation";
import type { Meta } from "@/content/types";
import type { EstimateExtraId, PricedKey } from "@/lib/pricing";

/** Подпись добавки; hint — что именно входит. */
type ExtraText = { label: string; hint: string };

export type EstimateContent = {
  meta: Meta;
  title: string;
  lead: string;
  steps: { service: string; level: string; extras: string; timing: string };
  services: Record<PricedKey, string>;
  /** Подписи добавок; где у направления своё название — в overrides. */
  extras: Record<EstimateExtraId, ExtraText>;
  overrides: Partial<Record<PricedKey, Partial<Record<EstimateExtraId, ExtraText>>>>;
  timing: { normal: string; normalHint: string; rush: string; rushHint: string };
  result: {
    label: string;
    base: string;
    rush: string;
    exact: string;
    payment: string;
    send: string;
    telegram: string;
    toResult: string;
  };
  none: string;
  /** «от» перед ценой уровня: переносится отдельно от суммы. */
  from: string;
};

export const estimateContent: Record<Locale, EstimateContent> = {
  ru: {
    meta: {
      title: "Смета за минуту — калькулятор видеопродакшна | Highway Films",
      description:
        "Посчитайте ориентир по смете: реклама, корпоративное видео, клипы, свадьбы, AI-ролики. Выберите масштаб и что добавить — цифра пересчитается сразу.",
    },
    title: "Смета за минуту",
    lead: "Выберите, что снимаем, масштаб и что добавить — ориентир по смете пересчитается сразу. Точную пришлём в течение рабочего дня после брифа.",
    steps: { service: "Что снимаем", level: "Масштаб", extras: "Что добавить", timing: "Сроки" },
    services: {
      commercials: "Реклама",
      corporate: "Корпоративное видео",
      "music-videos": "Клип",
      weddings: "Свадьба",
      ai: "AI-ролик",
      videoproduction: "Полный цикл",
    },
    extras: {
      day: { label: "Ещё смена", hint: "съёмочный день с той же группой" },
      location: { label: "Ещё локация", hint: "переезд, аренда и выставление света" },
      actors: { label: "Актёры", hint: "кастинг и работа на площадке" },
      graphics: { label: "Графика и VFX", hint: "композитинг, 3D, анимация" },
      aerial: { label: "Аэросъёмка", hint: "дрон с пилотом и допусками" },
      voice: { label: "Диктор", hint: "запись в студии" },
      music: { label: "Музыка по лицензии", hint: "трек с правами на показ" },
      versions: { label: "Ещё три версии", hint: "другие хронометражи и форматы" },
      language: { label: "Версия на втором языке", hint: "субтитры или перевод диктора" },
      cutdowns: { label: "Вертикальные нарезки", hint: "для соцсетей и площадок" },
      length: { label: "Ещё 15 секунд", hint: "длиннее ролик — больше генерации" },
      live: { label: "Живая съёмка", hint: "продукт или люди, совмещаем с AI" },
      mobile: { label: "Мобильная съёмка", hint: "вертикальные ролики в тот же день" },
    },
    overrides: {
      corporate: { graphics: { label: "Анимация и инфографика", hint: "цифры, схемы, титры" } },
    },
    timing: {
      normal: "Обычные",
      normalHint: "сроки из плана работ",
      rush: "Срочно",
      rushHint: "сжимаем сроки, плюс 30–50%",
    },
    result: {
      label: "Ориентир по смете",
      base: "Уровень",
      rush: "Срочность",
      exact: "Точную смету пришлём в течение рабочего дня после брифа.",
      payment: "Оплата — как удобно: целиком или по этапам. Перед съёмкой — предоплата.",
      send: "Отправить в бриф",
      telegram: "Написать в Telegram",
      toResult: "К смете",
    },
    none: "ничего",
    from: "от",
  },
  en: {
    meta: {
      title: "Estimate in a minute — video production calculator | Highway Films",
      description:
        "Get a ballpark estimate for commercials, corporate video, music videos, weddings and AI films. Pick the scale and extras — the figure updates at once.",
    },
    title: "Estimate in a minute",
    lead: "Pick what we shoot, the scale and the extras, and the ballpark updates at once. The exact estimate comes within one working day after the brief.",
    steps: { service: "What we shoot", level: "Scale", extras: "Extras", timing: "Timing" },
    services: {
      commercials: "Commercial",
      corporate: "Corporate video",
      "music-videos": "Music video",
      weddings: "Wedding",
      ai: "AI film",
      videoproduction: "Full production",
    },
    extras: {
      day: { label: "Extra shoot day", hint: "another day with the same crew" },
      location: { label: "Extra location", hint: "move, hire and lighting set-up" },
      actors: { label: "Cast", hint: "casting and work on set" },
      graphics: { label: "Graphics and VFX", hint: "compositing, 3D, animation" },
      aerial: { label: "Aerial footage", hint: "a drone with a licensed pilot" },
      voice: { label: "Voice-over", hint: "recorded in a studio" },
      music: { label: "Licensed music", hint: "a track with broadcast rights" },
      versions: { label: "Three more versions", hint: "other lengths and formats" },
      language: { label: "Second-language version", hint: "subtitles or a translated voice-over" },
      cutdowns: { label: "Vertical cutdowns", hint: "for social platforms" },
      length: { label: "15 more seconds", hint: "a longer film needs more generation" },
      live: { label: "Live-action shoot", hint: "product or people, combined with AI" },
      mobile: { label: "Mobile shooting", hint: "vertical clips on the same day" },
    },
    overrides: {
      corporate: { graphics: { label: "Animation and infographics", hint: "figures, diagrams, titles" } },
    },
    timing: {
      normal: "Standard",
      normalHint: "the schedule from the plan",
      rush: "Urgent",
      rushHint: "a compressed schedule, plus 30–50%",
    },
    result: {
      label: "Estimate ballpark",
      base: "Scale",
      rush: "Urgency",
      exact: "The exact estimate comes within one working day after the brief.",
      payment: "Payment as it suits you: in full or by stage. A prepayment is due before the shoot.",
      send: "Send with the brief",
      telegram: "Message on Telegram",
      toResult: "View estimate",
    },
    none: "nothing",
    from: "from",
  },
};

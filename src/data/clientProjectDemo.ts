import type { Locale } from "@/data/articles";

type LocalizedText = {
  ru: string;
  en: string;
};

type StatusTone = "violet" | "amber" | "emerald" | "slate";

export type ClientStatus = {
  tone: StatusTone;
  label: LocalizedText;
};

export type ClientVersion = {
  name: string;
  updatedAt: string;
  state: LocalizedText;
  note: LocalizedText;
};

export type ClientComment = {
  timecode: string;
  author: string;
  state: LocalizedText;
  text: LocalizedText;
};

export type ClientAsset = {
  name: string;
  format: string;
  size: string;
  note: LocalizedText;
};

export type ClientProjectDemo = {
  code: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  status: ClientStatus;
  updatedAt: string;
  accessNote: LocalizedText;
  versions: ClientVersion[];
  comments: ClientComment[];
  assets: ClientAsset[];
  checkpoints: Array<{
    label: LocalizedText;
    value: LocalizedText;
  }>;
};

export const clientProjectDemo: ClientProjectDemo = {
  code: "HF-274",
  title: {
    ru: "Рекламный ролик для бренда",
    en: "Brand commercial",
  },
  subtitle: {
    ru: "Пример проекта: так кабинет выглядит для клиента во время монтажа.",
    en: "A sample project: this is what the client sees during the edit.",
  },
  summary: {
    ru: "Здесь видно, на каком этапе проект, какая версия монтажа ждёт согласования и какие файлы уже готовы. Правки оставляют по таймкодам, чтобы не искать их в переписке.",
    en: "It shows the project stage, which cut is waiting for approval and which files are ready. Notes are left by timecode, so nobody has to dig through email threads.",
  },
  status: {
    tone: "amber",
    label: {
      ru: "Версия на согласовании",
      en: "Version under review",
    },
  },
  updatedAt: "2026-03-29T18:40:00.000Z",
  accessNote: {
    ru: "Доступ выдаём к конкретному проекту. Логин и пароль присылаем вместе с первой версией монтажа.",
    en: "Access is issued per project. The login and password come with the first cut.",
  },
  versions: [
    {
      name: "Version 01",
      updatedAt: "2026-03-23T11:20:00.000Z",
      state: {
        ru: "Первая сборка",
        en: "First assembly",
      },
      note: {
        ru: "Первая сборка: порядок сцен, ритм и музыка.",
        en: "Base edit with initial pacing, music, and narrative structure.",
      },
    },
    {
      name: "Version 02",
      updatedAt: "2026-03-27T15:05:00.000Z",
      state: {
        ru: "После первого раунда правок",
        en: "After round one",
      },
      note: {
        ru: "Уточнили вступление, усилили продуктовые планы и сократили центральный блок.",
        en: "Refined the opening, strengthened product coverage, and tightened the central section.",
      },
    },
    {
      name: "Final Cut",
      updatedAt: "2026-03-31T09:30:00.000Z",
      state: {
        ru: "Финальная выдача готовится",
        en: "Preparing final delivery",
      },
      note: {
        ru: "После согласования текущей версии сюда попадут master, cutdowns и вертикальные адаптации.",
        en: "Once the current cut is approved, this slot will contain the master, cutdowns, and vertical adaptations.",
      },
    },
  ],
  comments: [
    {
      timecode: "00:14",
      author: "Client",
      state: {
        ru: "Нужно обсудить",
        en: "Needs review",
      },
      text: {
        ru: "Можно чуть короче открыть сцену и быстрее перейти к продукту.",
        en: "We can probably open this scene a little faster and land on the product earlier.",
      },
    },
    {
      timecode: "00:42",
      author: "Producer",
      state: {
        ru: "Оставляем",
        en: "Keep as is",
      },
      text: {
        ru: "Этот план хорошо держит паузу перед главным акцентом, лучше не убирать.",
        en: "This shot holds the pause before the main beat well, so we should keep it.",
      },
    },
    {
      timecode: "01:10",
      author: "Client",
      state: {
        ru: "Согласовано",
        en: "Approved",
      },
      text: {
        ru: "Финальный блок работает, здесь правок не нужно.",
        en: "The final section works well. No changes needed here.",
      },
    },
  ],
  assets: [
    {
      name: "Master 4K",
      format: "ProRes",
      size: "3.8 GB",
      note: {
        ru: "Основной мастер-файл после финального согласования.",
        en: "Primary master file delivered after final approval.",
      },
    },
    {
      name: "Frame Exports",
      format: "ZIP",
      size: "186 MB",
      note: {
        ru: "Стоп-кадры для анонсов, превью и внутренних презентаций.",
        en: "Frame exports for previews, launch announcements, and internal decks.",
      },
    },
    {
      name: "Vertical Version",
      format: "H.264",
      size: "118 MB",
      note: {
        ru: "Адаптация под Reels, Shorts и Telegram.",
        en: "Adapted vertical version for Reels, Shorts, and Telegram.",
      },
    },
  ],
  checkpoints: [
    {
      label: {
        ru: "Статус проекта",
        en: "Project status",
      },
      value: {
        ru: "Монтаж и клиентское согласование",
        en: "Edit and client review",
      },
    },
    {
      label: {
        ru: "Следующий шаг",
        en: "Next step",
      },
      value: {
        ru: "Собрать финальную выдачу после текущего раунда комментариев",
        en: "Prepare final delivery after the current feedback round",
      },
    },
    {
      label: {
        ru: "Канал связи",
        en: "Contact line",
      },
      value: {
        ru: "Telegram или почта проекта",
        en: "Telegram or project email",
      },
    },
  ],
};

export function getLocalizedText(value: LocalizedText, locale: Locale) {
  return locale === "en" ? value.en : value.ru;
}

export function formatProjectDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

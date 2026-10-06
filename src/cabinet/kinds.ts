import type { FileKind, ProjectKind, VersionKind } from "@/cabinet/db/schema";

/**
 * Типы проектов кабинета. Всё, чем свадьба отличается от рекламы или
 * AI-ролика, — здесь: этапы со сроками, анкета, названия версий и слова,
 * которыми интерфейс называет клиента. Добавить тип — добавить запись.
 *
 * Сроки этапов — в днях от главной даты проекта: у свадьбы это день
 * свадьбы, у съёмочных проектов — день съёмки, у AI-ролика — срок сдачи.
 */
export type StageTemplate = { key: string; title: string; offsetDays: number | null };

export type RowSpec = {
  title: string;
  hint: string;
  labels: [string, string, string];
  placeholders: [string, string, string];
  addLabel: string;
};

export type TextKey = "people" | "shots" | "music" | "speeches" | "notes";

export type QuestionnaireSpec = {
  title: string;
  lead: string;
  /** Главная карточка: «Заполните …». */
  ask: string;
  /** Зачем она нужна — одна фраза под заголовком карточки. */
  why: string;
  /** Что внутри — в строке раздела на главной кабинета. */
  summary: string;
  timeline: RowSpec;
  contacts: RowSpec;
  texts: Record<TextKey, { title: string; hint: string }>;
};

export type KindSpec = {
  label: string;
  titleLabel: string;
  titlePlaceholder: string;
  dateLabel: string;
  /** Как интерфейс называет клиента: пара или клиент — в нужном падеже. */
  who: { nom: string; gen: string; dat: string };
  stages: StageTemplate[];
  versions: Record<VersionKind, string>;
  files: Record<FileKind, string>;
  questionnaire: QuestionnaireSpec;
  premiere: { title: string; hint: string };
  /** Главная карточка, когда основной ролик согласован. */
  doneTitle: string;
};

const CONTACTS_ON_SET: RowSpec = {
  title: "Контакты на площадке",
  hint: "Кто встречает группу, кто согласует на месте, к кому идти за пропусками.",
  labels: ["Кто", "Имя", "Телефон"],
  placeholders: ["Ответственный", "Имя", "+7 900 000-00-00"],
  addLabel: "Добавить контакт",
};

const SHOOT_TIMELINE: RowSpec = {
  title: "План съёмочного дня",
  hint: "Что, когда и где снимаем. Можно примерно — уточним на созвоне.",
  labels: ["Время", "Что снимаем", "Адрес"],
  placeholders: ["10:00", "Интервью с директором", "Офис, переговорная"],
  addLabel: "Добавить строку",
};

const SHOOT_STAGES: StageTemplate[] = [
  { key: "contract", title: "Договор и предоплата", offsetDays: null },
  { key: "questionnaire", title: "Анкета перед съёмкой", offsetDays: -7 },
  { key: "shoot", title: "Съёмка", offsetDays: 0 },
  { key: "film", title: "Монтаж и правки", offsetDays: 14 },
  { key: "delivery", title: "Финальные файлы", offsetDays: 21 },
];

const CLIENT = { nom: "клиент", gen: "клиента", dat: "клиенту" };

const SHOOT_QUESTIONNAIRE: QuestionnaireSpec = {
  title: "Анкета перед съёмкой",
  lead: "По ней группа готовится к съёмке: знает, где и когда быть, кто в кадре и что важно показать. Заполняйте, что уже известно, — дополнить можно в любой момент.",
  ask: "Заполните анкету перед съёмкой",
  why: "По ней группа готовится к съёмке.",
  summary: "План съёмочного дня, адреса, кто в кадре и что обязательно показать.",
  timeline: SHOOT_TIMELINE,
  contacts: CONTACTS_ON_SET,
  texts: {
    people: { title: "Кто в кадре", hint: "Спикеры, актёры, сотрудники: имена, должности, кто как готов к камере." },
    shots: { title: "Что обязательно показать", hint: "Продукт, процессы, детали, логотипы — всё, без чего ролик не сработает." },
    music: { title: "Музыка и голос", hint: "Пожелания по музыке, нужен ли диктор, на каком языке." },
    speeches: { title: "Материалы", hint: "Брендбук, логотипы, презентации, сценарий — ссылки на файлы." },
    notes: { title: "Что ещё важно знать", hint: "Пропуска, ограничения на съёмку, NDA, когда и где покажут ролик." },
  },
};

const BUSINESS_FILES: Record<FileKind, string> = {
  film: "Ролик",
  teaser: "Короткая версия",
  vertical: "Вертикальная версия",
  recording: "Исходники",
  other: "Другое",
};

const SHARE = { title: "Показ по ссылке", hint: "Отправьте коллегам ссылку и пароль: видео откроется в браузере без входа в кабинет." };

export const KINDS: Record<ProjectKind, KindSpec> = {
  wedding: {
    label: "Свадьба",
    titleLabel: "Имена пары",
    titlePlaceholder: "Анна и Иван",
    dateLabel: "Дата свадьбы",
    who: { nom: "пара", gen: "пары", dat: "паре" },
    stages: [
      { key: "contract", title: "Договор и предоплата", offsetDays: null },
      { key: "questionnaire", title: "Анкета перед свадьбой", offsetDays: -14 },
      { key: "shoot", title: "Съёмка", offsetDays: 0 },
      { key: "teaser", title: "Тизер", offsetDays: 14 },
      { key: "film", title: "Фильм", offsetDays: 60 },
      { key: "recordings", title: "Полные записи", offsetDays: 60 },
    ],
    versions: { teaser: "Тизер", film: "Фильм", other: "Видео" },
    files: { film: "Фильм", teaser: "Тизер", vertical: "Вертикальная версия", recording: "Полная запись", other: "Другое" },
    questionnaire: {
      title: "Анкета перед свадьбой",
      lead: "По ней съёмочная группа готовится к дню: знает, где и когда быть, кому звонить и что нельзя пропустить. Заполняйте, что уже известно, — дополнить можно в любой момент.",
      ask: "Заполните анкету перед свадьбой",
      why: "По ней группа готовится к съёмке.",
      summary: "Тайминг дня, адреса, контакты на площадке и кого обязательно снять.",
      timeline: {
        title: "Тайминг дня",
        hint: "Что, когда и где: сборы, регистрация, прогулка, банкет. Можно примерно — уточним на созвоне.",
        labels: ["Время", "Что происходит", "Адрес"],
        placeholders: ["11:00", "Сборы, фотосессия", "Отель, номер или адрес"],
        addLabel: "Добавить строку",
      },
      contacts: { ...CONTACTS_ON_SET, hint: "Организатор, ведущий, фотограф — кому звонить в день свадьбы.", placeholders: ["Организатор", "Имя", "+7 900 000-00-00"] },
      texts: {
        people: { title: "Кого обязательно снять", hint: "Родители, бабушки и дедушки, свидетели, близкие друзья. Имена и кто есть кто — так оператор никого не пропустит." },
        shots: { title: "Важные кадры и моменты", hint: "Кольца, первый танец, сюрприз от друзей, семейная реликвия — всё, что нельзя пропустить." },
        music: { title: "Музыка", hint: "Треки для тизера и фильма, если есть пожелания. И что точно не ставить." },
        speeches: { title: "Клятвы, речи, сюрпризы", hint: "Кто и когда будет говорить, что готовите: будем в нужном месте с нужным светом." },
        notes: { title: "Что ещё нам важно знать", hint: "Пожелания, опасения, особенности площадки." },
      },
    },
    premiere: { title: "Премьера для родных", hint: "Отправьте родным ссылку и пароль: фильм откроется в браузере без входа в кабинет." },
    doneTitle: "Фильм готов",
  },

  commercial: {
    label: "Реклама",
    titleLabel: "Название проекта",
    titlePlaceholder: "Ролик для бренда «Север»",
    dateLabel: "Дата съёмки",
    who: CLIENT,
    stages: SHOOT_STAGES,
    versions: { teaser: "Короткая версия", film: "Ролик", other: "Видео" },
    files: BUSINESS_FILES,
    questionnaire: SHOOT_QUESTIONNAIRE,
    premiere: SHARE,
    doneTitle: "Ролик готов",
  },

  corporate: {
    label: "Корпоративное видео",
    titleLabel: "Название проекта",
    titlePlaceholder: "Фильм о заводе",
    dateLabel: "Дата съёмки",
    who: CLIENT,
    stages: SHOOT_STAGES,
    versions: { teaser: "Тизер", film: "Фильм", other: "Видео" },
    files: { ...BUSINESS_FILES, film: "Фильм", teaser: "Тизер", recording: "Полная запись" },
    questionnaire: SHOOT_QUESTIONNAIRE,
    premiere: SHARE,
    doneTitle: "Фильм готов",
  },

  music: {
    label: "Клип",
    titleLabel: "Артист и трек",
    titlePlaceholder: "Артист — «Название трека»",
    dateLabel: "Дата съёмки",
    who: CLIENT,
    stages: SHOOT_STAGES,
    versions: { teaser: "Тизер", film: "Клип", other: "Видео" },
    files: { ...BUSINESS_FILES, film: "Клип", teaser: "Тизер" },
    questionnaire: {
      ...SHOOT_QUESTIONNAIRE,
      texts: {
        people: { title: "Кто в кадре", hint: "Артист, музыканты, актёры, танцоры." },
        shots: { title: "Образы и сцены", hint: "Что происходит в клипе, какие образы, где переодевания." },
        music: { title: "Трек", hint: "Ссылка на трек, нужная длина, версия для соцсетей." },
        speeches: { title: "Референсы", hint: "Клипы, кадры, цвета — ссылки на то, что нравится." },
        notes: { title: "Что ещё важно знать", hint: "Дата релиза, площадки, ограничения." },
      },
    },
    premiere: { ...SHARE, hint: "Отправьте команде ссылку и пароль: клип откроется в браузере без входа в кабинет." },
    doneTitle: "Клип готов",
  },

  ai: {
    label: "AI-ролик",
    titleLabel: "Название проекта",
    titlePlaceholder: "AI-ролик для запуска продукта",
    dateLabel: "Срок сдачи",
    who: CLIENT,
    stages: [
      { key: "contract", title: "Договор и предоплата", offsetDays: null },
      { key: "questionnaire", title: "Бриф и референсы", offsetDays: -21 },
      { key: "film", title: "Ролик и правки", offsetDays: -7 },
      { key: "delivery", title: "Финальные файлы", offsetDays: 0 },
    ],
    versions: { teaser: "Короткая версия", film: "Ролик", other: "Видео" },
    files: { ...BUSINESS_FILES, recording: "Кадры и генерации" },
    questionnaire: {
      title: "Бриф для AI-ролика",
      lead: "По нему мы собираем сцены, персонажей и стиль. Заполняйте, что уже известно, — дополнить можно в любой момент.",
      ask: "Заполните бриф для AI-ролика",
      why: "По нему мы собираем сцены и стиль.",
      summary: "Сцены, персонажи, стиль, тексты и кто согласует.",
      timeline: {
        title: "Сцены",
        hint: "Что происходит по порядку. Можно крупными мазками — уточним на созвоне.",
        labels: ["Сцена", "Что происходит", "Референс"],
        placeholders: ["1", "Город просыпается", "Ссылка на картинку или ролик"],
        addLabel: "Добавить сцену",
      },
      contacts: {
        title: "Кто согласует",
        hint: "Кто смотрит версии и принимает решение.",
        labels: ["Роль", "Имя", "Контакт"],
        placeholders: ["Маркетинг", "Имя", "Телефон или почта"],
        addLabel: "Добавить человека",
      },
      texts: {
        people: { title: "Персонажи", hint: "Кто в кадре: люди, маскот, продукт. Как выглядят." },
        shots: { title: "Стиль и референсы", hint: "Ссылки на кадры, ролики, художников — что нравится и что нет." },
        music: { title: "Музыка и голос", hint: "Пожелания по музыке, нужен ли диктор, на каком языке." },
        speeches: { title: "Тексты и надписи", hint: "Слоганы, титры, юридические плашки." },
        notes: { title: "Что ещё важно знать", hint: "Где покажут ролик, форматы, сроки." },
      },
    },
    premiere: SHARE,
    doneTitle: "Ролик готов",
  },

  production: {
    label: "Полный цикл",
    titleLabel: "Название проекта",
    titlePlaceholder: "Серия роликов для бренда",
    dateLabel: "Дата съёмки",
    who: CLIENT,
    stages: SHOOT_STAGES,
    versions: { teaser: "Короткая версия", film: "Ролик", other: "Видео" },
    files: BUSINESS_FILES,
    questionnaire: SHOOT_QUESTIONNAIRE,
    premiere: SHARE,
    doneTitle: "Ролик готов",
  },
};

export const PROJECT_KINDS = Object.keys(KINDS) as ProjectKind[];

export function kindOf(kind: string): KindSpec {
  return KINDS[kind as ProjectKind] ?? KINDS.production;
}

/** «пара» → «Пара»: для начала фразы. */
export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

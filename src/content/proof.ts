import type { Pair } from "@/content/types";
import type { SectionKey } from "@/lib/media";

/**
 * Работы и клиенты студии.
 *
 * СЕЙЧАС ЗДЕСЬ ТОЛЬКО ЗАГЛУШКИ: названия клиентов, пары, артисты и цифры
 * выдуманы, чтобы показать, как будут выглядеть блоки. Кадры настоящие —
 * из шоурила студии. Записи с placeholder: true на живой сайт не попадают
 * (см. src/lib/placeholders.ts). Настоящий кейс: заменить тексты и кадр,
 * убрать placeholder — и он появится на главной (featured) и в разделе.
 */

type CaseText = {
  /** Клиент или герои: компания, артист, пара. */
  client: string;
  title: string;
  /** Одна-две фразы: что снимали и как. */
  text: string;
  facts: Pair[];
};

export type CaseEntry = {
  id: string;
  section: SectionKey;
  /** Кадр 2.39:1 из работы, public/images/cases. */
  still: string;
  /** Показывать на главной в «Работах». */
  featured?: boolean;
  placeholder?: boolean;
  ru: CaseText;
  en: CaseText;
};

export const cases: CaseEntry[] = [
  {
    id: "labirint",
    section: "commercials",
    still: "/images/cases/labirint.jpg",
    featured: true,
    placeholder: true,
    ru: {
      client: "Сеть квестов «Лабиринт»",
      title: "Тизер нового квеста",
      text: "Погоня по ночной парковке: одна ночь съёмки и неделя графики.",
      facts: [
        { label: "Хронометраж", value: "30 с" },
        { label: "Съёмка", value: "1 ночь" },
        { label: "Версии", value: "16:9, 9:16, 1:1" },
      ],
    },
    en: {
      client: "Labyrinth escape rooms",
      title: "Teaser for a new quest",
      text: "A chase through a night car park: one night of shooting and a week of graphics.",
      facts: [
        { label: "Length", value: "30 s" },
        { label: "Shoot", value: "1 night" },
        { label: "Versions", value: "16:9, 9:16, 1:1" },
      ],
    },
  },
  {
    id: "nordline",
    section: "commercials",
    still: "/images/cases/nordline.jpg",
    placeholder: true,
    ru: {
      client: "NORDLINE",
      title: "Ролик о датчике вибрации",
      text: "Датчик сняли на зелёном фоне, среду вокруг собрали в 3D: в цехе такой план не снять.",
      facts: [
        { label: "Хронометраж", value: "45 с" },
        { label: "Съёмка", value: "1 день" },
        { label: "Графика", value: "3D и композитинг" },
      ],
    },
    en: {
      client: "NORDLINE",
      title: "Vibration sensor film",
      text: "The sensor was shot on a green screen and the space around it built in 3D: a factory floor would not allow that shot.",
      facts: [
        { label: "Length", value: "45 s" },
        { label: "Shoot", value: "1 day" },
        { label: "Graphics", value: "3D and compositing" },
      ],
    },
  },
  {
    id: "manufaktura",
    section: "corporate",
    still: "/images/cases/manufaktura.jpg",
    placeholder: true,
    ru: {
      client: "Балтийская мануфактура",
      title: "Фильм о швейном цехе для новых сотрудников",
      text: "Цех, люди и первый рабочий день — чтобы новичок знал, куда идти и к кому обратиться.",
      facts: [
        { label: "Хронометраж", value: "6 мин" },
        { label: "Съёмка", value: "2 дня" },
        { label: "Показ", value: "экраны в цехе и сайт" },
      ],
    },
    en: {
      client: "Baltic Manufactory",
      title: "Sewing floor film for new staff",
      text: "The floor, the people and a first day at work, so a newcomer knows where to go and whom to ask.",
      facts: [
        { label: "Length", value: "6 min" },
        { label: "Shoot", value: "2 days" },
        { label: "Shown on", value: "workshop screens and the website" },
      ],
    },
  },
  {
    id: "rostra",
    section: "corporate",
    still: "/images/cases/rostra.jpg",
    featured: true,
    placeholder: true,
    ru: {
      client: "Клиника «Ростра»",
      title: "Ролик об операционном блоке",
      text: "Снимали между операциями, со своим светом. В кадре — врачи клиники.",
      facts: [
        { label: "Хронометраж", value: "3 мин" },
        { label: "Съёмка", value: "1 день" },
        { label: "Версии", value: "русская и английская" },
      ],
    },
    en: {
      client: "Rostra Clinic",
      title: "Operating theatre film",
      text: "Shot between operations with our own lighting. The clinic's doctors are on screen.",
      facts: [
        { label: "Length", value: "3 min" },
        { label: "Shoot", value: "1 day" },
        { label: "Versions", value: "Russian and English" },
      ],
    },
  },
  {
    id: "mosty",
    section: "music-videos",
    still: "/images/cases/mosty.jpg",
    featured: true,
    placeholder: true,
    ru: {
      client: "Лиза Норд",
      title: "Клип «Мосты»",
      text: "Одна белая ночь на разводных мостах: история под трек без студийных сцен.",
      facts: [
        { label: "Хронометраж", value: "3:40" },
        { label: "Съёмка", value: "1 ночь" },
        { label: "Выдача", value: "клип и вертикальный тизер" },
      ],
    },
    en: {
      client: "Liza Nord",
      title: "“Bridges” music video",
      text: "One white night on the drawbridges: a story set to the track, with no studio scenes.",
      facts: [
        { label: "Length", value: "3:40" },
        { label: "Shoot", value: "1 night" },
        { label: "Delivery", value: "video and vertical teaser" },
      ],
    },
  },
  {
    id: "signal",
    section: "music-videos",
    still: "/images/cases/signal.jpg",
    placeholder: true,
    ru: {
      client: "Группа «Сигнал»",
      title: "Клип «Не смотри»",
      text: "Зимняя история без слов: два дня в Ленинградской области, пустой дом и снег.",
      facts: [
        { label: "Хронометраж", value: "4:10" },
        { label: "Съёмка", value: "2 дня" },
        { label: "Выдача", value: "клип и три нарезки" },
      ],
    },
    en: {
      client: "Signal (band)",
      title: "“Don't look” music video",
      text: "A winter story without words: two days in the Leningrad region, an empty house and snow.",
      facts: [
        { label: "Length", value: "4:10" },
        { label: "Shoot", value: "2 days" },
        { label: "Delivery", value: "video and three cutdowns" },
      ],
    },
  },
  {
    id: "anna-maxim",
    section: "weddings",
    still: "/images/cases/anna-maxim.jpg",
    placeholder: true,
    ru: {
      client: "Анна и Максим",
      title: "Свадьба в загородном клубе",
      text: "Весь день от сборов до бенгальских огней, без постановочных сцен.",
      facts: [
        { label: "Фильм", value: "14 мин" },
        { label: "Тизер", value: "1 мин" },
        { label: "Съёмка", value: "1 день" },
      ],
    },
    en: {
      client: "Anna and Maxim",
      title: "Wedding at a country club",
      text: "The whole day from getting ready to the sparklers, with no staged scenes.",
      facts: [
        { label: "Film", value: "14 min" },
        { label: "Teaser", value: "1 min" },
        { label: "Shoot", value: "1 day" },
      ],
    },
  },
  {
    id: "maria-dmitry",
    section: "weddings",
    still: "/images/cases/maria-dmitry.jpg",
    placeholder: true,
    ru: {
      client: "Мария и Дмитрий",
      title: "Прогулка у реки перед церемонией",
      text: "Час перед регистрацией: только пара, река и вечерний свет.",
      facts: [
        { label: "Фильм", value: "9 мин" },
        { label: "Тизер", value: "40 с" },
        { label: "Съёмка", value: "1 день" },
      ],
    },
    en: {
      client: "Maria and Dmitry",
      title: "River walk before the ceremony",
      text: "An hour before the ceremony: just the couple, the river and evening light.",
      facts: [
        { label: "Film", value: "9 min" },
        { label: "Teaser", value: "40 s" },
        { label: "Shoot", value: "1 day" },
      ],
    },
  },
  {
    id: "volna",
    section: "ai",
    still: "/images/stills/ai-01.jpg",
    placeholder: true,
    ru: {
      client: "VOLNA",
      title: "AI-ролик для наушников",
      text: "Героиню, свет и звук собрали на генеративных моделях, без съёмочного дня.",
      facts: [
        { label: "Хронометраж", value: "15 с" },
        { label: "Срок", value: "7 дней" },
        { label: "Версии", value: "16:9, 9:16" },
      ],
    },
    en: {
      client: "VOLNA",
      title: "AI ad for headphones",
      text: "The character, the light and the sound were built with generative models, without a shoot day.",
      facts: [
        { label: "Length", value: "15 s" },
        { label: "Turnaround", value: "7 days" },
        { label: "Versions", value: "16:9, 9:16" },
      ],
    },
  },
  {
    id: "orbita",
    section: "ai",
    still: "/images/cases/orbita.jpg",
    placeholder: true,
    ru: {
      client: "Технопарк «Орбита»",
      title: "Высадка на Марс для набора в кружки",
      text: "Космонавт на красных скалах Марса: такую сцену камерой не снять.",
      facts: [
        { label: "Хронометраж", value: "20 с" },
        { label: "Срок", value: "10 дней" },
        { label: "Версии", value: "9:16 для соцсетей" },
      ],
    },
    en: {
      client: "Orbita tech park",
      title: "A Mars landing for club enrolment",
      text: "An astronaut on the red rocks of Mars: a scene no camera can shoot.",
      facts: [
        { label: "Length", value: "20 s" },
        { label: "Turnaround", value: "10 days" },
        { label: "Versions", value: "9:16 for social" },
      ],
    },
  },
  {
    id: "shpil",
    section: "videoproduction",
    still: "/images/cases/shpil.jpg",
    placeholder: true,
    ru: {
      client: "Кофейня «Шпиль»",
      title: "Серия роликов к открытию",
      text: "Сценарий, съёмка, звук и двенадцать вертикальных роликов из одного съёмочного дня.",
      facts: [
        { label: "Роликов", value: "12" },
        { label: "Съёмка", value: "1 день" },
        { label: "Форматы", value: "9:16 и 1:1" },
      ],
    },
    en: {
      client: "Shpil coffee house",
      title: "Opening series",
      text: "Script, shoot, sound and twelve vertical videos from a single shoot day.",
      facts: [
        { label: "Videos", value: "12" },
        { label: "Shoot", value: "1 day" },
        { label: "Formats", value: "9:16 and 1:1" },
      ],
    },
  },
  {
    id: "aurora",
    section: "videoproduction",
    still: "/images/cases/aurora.jpg",
    placeholder: true,
    ru: {
      client: "Аврора Девелопмент",
      title: "Ролик о загородном посёлке",
      text: "Жизнь в посёлке через один день семьи: сценарий, кастинг, съёмка и графика.",
      facts: [
        { label: "Хронометраж", value: "1:30" },
        { label: "Съёмка", value: "2 дня" },
        { label: "Версии", value: "для сайта и выставки" },
      ],
    },
    en: {
      client: "Aurora Development",
      title: "Country village film",
      text: "Life in the village through one family's day: script, casting, shoot and graphics.",
      facts: [
        { label: "Length", value: "1:30" },
        { label: "Shoot", value: "2 days" },
        { label: "Versions", value: "for the website and a trade show" },
      ],
    },
  },
];

/**
 * Логотипы клиентов. Настоящий логотип — файл в public/images/clients
 * (лучше SVG, одноцветный) в поле logo. Пока их нет, стоят заглушки:
 * название, набранное в духе фирменного знака (mark — вариант рисунка).
 */
export type ClientLogo = {
  name: string;
  logo?: string;
  mark?: "nordline" | "manufaktura" | "rostra" | "labirint" | "aurora" | "shpil" | "orbita" | "volna";
  placeholder?: boolean;
};

export const clientLogos: ClientLogo[] = [
  { name: "NORDLINE", mark: "nordline", placeholder: true },
  { name: "Балтийская мануфактура", mark: "manufaktura", placeholder: true },
  { name: "Клиника «Ростра»", mark: "rostra", placeholder: true },
  { name: "Лабиринт", mark: "labirint", placeholder: true },
  { name: "Аврора Девелопмент", mark: "aurora", placeholder: true },
  { name: "Кофейня «Шпиль»", mark: "shpil", placeholder: true },
  { name: "Технопарк «Орбита»", mark: "orbita", placeholder: true },
  { name: "VOLNA", mark: "volna", placeholder: true },
];

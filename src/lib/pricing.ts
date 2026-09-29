import type { Locale } from "@/components/siteNavigation";

/**
 * ЦЕНЫ ПО НАПРАВЛЕНИЯМ — одно место на весь сайт: страницы, тексты разделов,
 * вопросы-ответы и описания для поиска берут цифры отсюда.
 *
 * Пересмотрены вверх 2026-09-29 по сверке с рынком. Ориентиры сентября 2026:
 * - Петербург, средний сегмент (рейтинг DTF, топ-10 студий): реклама от
 *   90–200 тыс. ₽, корпоративное от 80–150 тыс., клип от 150–250 тыс.;
 *   премиальные студии — от 400 тыс. (Stolet Production), масштабы у Kurban
 *   Studio: малый продакшн до 200 тыс., базовый до 500 тыс., полный до 1 млн.
 * - Москва (Humanvideo): реклама 500 тыс. / 1 млн / от 2,5 млн по уровням,
 *   корпоративный фильм 500 / 750 тыс. / от 1 млн.
 * - Свадьба у частных видеографов Петербурга — 75–110 тыс. за день, тизер
 *   и второй оператор отдельно.
 * - AI-ролик — от 50 тыс. за 30 секунд, средний проект около 100 тыс.
 * Мы встали в верх петербургского рынка и ниже московского.
 *
 * «От» — нижний уровень: одна съёмочная смена и небольшая команда. Всё, что
 * сверху, клиент видит строками в смете, поэтому цифра ничего не обещает
 * сверх того, что в ней названо.
 *
 * ⚠️ Владельцу: проверить цифры. Меняются здесь — поменяются везде.
 */
export type PricedKey =
  | "commercials"
  | "corporate"
  | "music-videos"
  | "weddings"
  | "ai"
  | "videoproduction";

/** Свадебные пакеты и опции. */
export const weddingPrices = {
  episode: 80_000,
  film: 130_000,
  saga: 190_000,
  mobile: 50_000,
} as const;

/**
 * Три масштаба проекта по направлениям — «от» каждого уровня. Первая
 * цифра — это и есть цена «от» направления. Что входит в уровень — в
 * текстах раздела (src/content/services.ts, tiers).
 */
export const priceTiers: Record<Exclude<PricedKey, "weddings">, readonly [number, number, number]> = {
  commercials: [250_000, 500_000, 1_000_000],
  corporate: [280_000, 550_000, 1_000_000],
  "music-videos": [180_000, 350_000, 700_000],
  ai: [90_000, 200_000, 400_000],
  videoproduction: [300_000, 600_000, 1_200_000],
};

export const priceFrom: Record<PricedKey, number> = {
  commercials: priceTiers.commercials[0],
  corporate: priceTiers.corporate[0],
  "music-videos": priceTiers["music-videos"][0],
  weddings: weddingPrices.episode,
  ai: priceTiers.ai[0],
  videoproduction: priceTiers.videoproduction[0],
};

/** Срочность: сроки сжимаем, к смете плюс 30–50 % (владелец подтвердил). */
export const rushMarkup = { low: 0.3, high: 0.5 } as const;

/**
 * Калькулятор сметы (/estimate): что можно добавить к уровню проекта и
 * сколько это стоит. max — добавка считается штуками (смены, локации),
 * иначе — да или нет.
 *
 * ⚠️ Владельцу: это ориентиры по рынку, а не ваши расценки. Проверить и
 * поправить — калькулятор пересчитает сам.
 */
export type EstimateExtraId =
  | "day"
  | "location"
  | "actors"
  | "graphics"
  | "aerial"
  | "voice"
  | "music"
  | "versions"
  | "language"
  | "cutdowns"
  | "length"
  | "live"
  | "mobile";

export type EstimateExtra = { id: EstimateExtraId; price: number; max?: number };

export const estimateExtras: Record<PricedKey, EstimateExtra[]> = {
  commercials: [
    { id: "day", price: 100_000, max: 4 },
    { id: "location", price: 35_000, max: 3 },
    { id: "actors", price: 60_000 },
    { id: "graphics", price: 90_000 },
    { id: "aerial", price: 30_000 },
    { id: "voice", price: 20_000 },
    { id: "music", price: 25_000 },
    { id: "versions", price: 30_000 },
  ],
  corporate: [
    { id: "day", price: 90_000, max: 4 },
    { id: "location", price: 35_000, max: 3 },
    { id: "graphics", price: 70_000 },
    { id: "aerial", price: 30_000 },
    { id: "voice", price: 20_000 },
    { id: "music", price: 25_000 },
    { id: "language", price: 40_000 },
  ],
  "music-videos": [
    { id: "day", price: 80_000, max: 3 },
    { id: "location", price: 30_000, max: 3 },
    { id: "actors", price: 50_000 },
    { id: "graphics", price: 80_000 },
    { id: "aerial", price: 30_000 },
    { id: "cutdowns", price: 25_000 },
  ],
  weddings: [{ id: "mobile", price: weddingPrices.mobile }],
  ai: [
    { id: "length", price: 40_000, max: 3 },
    { id: "voice", price: 20_000 },
    { id: "music", price: 25_000 },
    { id: "versions", price: 20_000 },
    { id: "live", price: 120_000 },
  ],
  videoproduction: [
    { id: "day", price: 110_000, max: 4 },
    { id: "location", price: 35_000, max: 3 },
    { id: "actors", price: 60_000 },
    { id: "graphics", price: 90_000 },
    { id: "aerial", price: 30_000 },
    { id: "voice", price: 20_000 },
    { id: "music", price: 25_000 },
    { id: "versions", price: 30_000 },
  ],
};

/** Три уровня для калькулятора: у свадеб это пакеты, у остальных — priceTiers. */
export const estimateLevels: Record<PricedKey, readonly [number, number, number]> = {
  ...priceTiers,
  weddings: [weddingPrices.episode, weddingPrices.film, weddingPrices.saga],
};

export function formatRub(value: number, locale: Locale) {
  if (locale === "en") {
    return `RUB ${new Intl.NumberFormat("en-US").format(value)}`;
  }
  // Неразрывные пробелы: «150 000 ₽» не должно разрываться строкой.
  return `${new Intl.NumberFormat("ru-RU").format(value).replace(/\s/g, " ")} ₽`;
}

export function formatFrom(value: number, locale: Locale) {
  return locale === "en" ? `from ${formatRub(value, locale)}` : `от ${formatRub(value, locale)}`;
}

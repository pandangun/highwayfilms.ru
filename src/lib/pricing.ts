import type { Locale } from "@/components/siteNavigation";

/**
 * ЦЕНЫ «ОТ» ПО НАПРАВЛЕНИЯМ — одно место на весь сайт.
 *
 * Выставлены по рынку Петербурга и Москвы на сентябрь 2026 года. Ориентиры:
 * малый продакшн у студий города начинается со 110–150 тыс. ₽ за ролик с
 * одной сменой; корпоративный фильм — от 180 тыс. ₽; клип — от 100 тыс. ₽;
 * AI-ролик до минуты — от 60 тыс. ₽. Свадебные пакеты — те, что уже были
 * на сайте.
 *
 * «От» — это одна съёмочная смена и небольшая команда. Всё, что сверху,
 * клиент видит строками в смете, поэтому цифра ничего не обещает сверх
 * того, что в ней названо.
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

export const priceFrom: Record<PricedKey, number> = {
  commercials: 150_000,
  corporate: 180_000,
  "music-videos": 120_000,
  weddings: 60_000,
  ai: 60_000,
  videoproduction: 150_000,
};

/** Свадебные пакеты и опции. */
export const weddingPrices = {
  episode: 60_000,
  film: 95_000,
  saga: 140_000,
  mobile: 40_000,
} as const;

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

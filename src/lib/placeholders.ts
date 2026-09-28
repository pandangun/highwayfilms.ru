/**
 * Заглушки — логотипы клиентов и кейсы с выдуманными названиями, пока нет
 * настоящих. Их видно только в сборке с SHOW_PLACEHOLDERS=1: локально и на
 * скриншотах для владельца. На живой сайт они не попадают — посетитель
 * принял бы выдуманных клиентов за настоящих, а чужие логотипы без
 * разрешения — это ещё и риск претензий.
 *
 * Как включить настоящий кейс или логотип: заменить данные в
 * src/content/proof.ts и убрать у записи placeholder: true.
 */
export const showPlaceholders = process.env.SHOW_PLACEHOLDERS === "1";

/** Настоящие записи — всегда, заглушки — только при SHOW_PLACEHOLDERS=1. */
export function published<T extends { placeholder?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.placeholder || showPlaceholders);
}

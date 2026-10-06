/** Форматирование для кабинета — общее для сервера и браузера. */

const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

/** «2026-06-14» → «14 июня 2026»; withYear: false → «14 июня». */
export function formatDay(value: string | Date | null | undefined, { withYear = true } = {}) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(`${value.slice(0, 10)}T12:00:00`) : value;
  if (Number.isNaN(date.getTime())) return "";
  const day = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  return withYear ? `${day} ${date.getFullYear()}` : day;
}

export function formatDateTime(value: Date | string | null | undefined) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  const time = date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow" });
  return `${formatDay(date)}, ${time}`;
}

/** 83 500 мс → «01:23»; час и больше → «1:02:03». */
export function formatTimecode(ms: number | null | undefined) {
  if (ms == null) return "";
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatSize(bytes: number | null | undefined) {
  if (!bytes) return "";
  const units = ["Б", "КБ", "МБ", "ГБ", "ТБ"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toLocaleString("ru-RU", { maximumFractionDigits: unit >= 3 ? 1 : 0 })} ${units[unit]}`;
}

/** «правка», «правки», «правок». */
export function plural(count: number, [one, few, many]: [string, string, string]) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

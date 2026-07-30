/**
 * РЕЕСТР МЕДИА — единственное место, где объявлены пути к видео и постерам.
 *
 * Правило проекта: реальные материалы приезжают в самом конце. До тех пор
 * здесь стоят плейсхолдеры, но структура уже боевая. Когда файлы придут,
 * работа сводится к «положить файл по объявленному пути» — код не трогаем.
 *
 * Как подключить реальный ролик:
 *   1. Положить файл в public/video/<раздел>/ под именем из `mp4`.
 *   2. Снять флаг `placeholder` (или просто удалить строку).
 * Всё. Плеер сам разберётся с постером, мобильной версией и HLS.
 *
 * Если файла нет или он битый — плеер не падает: показывает постер и
 * кнопку. Поэтому забытый флаг `placeholder` не ломает страницу, просто
 * ролик не подгрузится.
 *
 * Когда заведём стриминг (Mux / Cloudflare Stream / Bunny), у элемента
 * появляется `hls` — плеер начнёт предпочитать его, а `mp4` останется
 * фолбэком. Правок в компонентах не потребуется.
 */

export type MediaSource = {
  /** HLS-манифест (.m3u8). Приоритетнее mp4, когда браузер его тянет. */
  hls?: string;
  /** Прогрессивный mp4 — то, что лежит сейчас, и фолбэк для HLS. */
  mp4?: string;
  /** Отдельный лёгкий mp4 для узких экранов. Выбор делает JS, не <source>. */
  mp4Mobile?: string;
  /** Постер обязателен: он же первый кадр, он же фолбэк при любой ошибке. */
  poster: string;
};

export type ReelItem = {
  id: string;
  /** Подпись на плитке. */
  title: string;
  /** Короткий тег над заголовком: формат, клиент, год. */
  tag: string;
  /** Хронометраж для подписи, например «0:42». Необязательно. */
  duration?: string;
  source: MediaSource;
  /**
   * Файла ещё нет — не ходить за ним по сети, показать постер.
   * Снять, когда материал загружен.
   */
  placeholder?: boolean;
};

export type SectionKey =
  | "commercials"
  | "corporate"
  | "videoproduction"
  | "music-videos"
  | "weddings"
  | "ai";

/** Заглушка-постер, пока нет настоящих кадров. */
const PLACEHOLDER_POSTER = "/video/derived/hero-poster.jpg";

function placeholderItem(
  section: SectionKey,
  index: number,
  title: string,
  tag: string,
  poster: string = PLACEHOLDER_POSTER,
): ReelItem {
  const slug = `${section}-${String(index).padStart(2, "0")}`;

  return {
    id: slug,
    title,
    tag,
    placeholder: true,
    source: {
      mp4: `/video/${section}/${slug}.mp4`,
      mp4Mobile: `/video/${section}/${slug}-mobile.mp4`,
      poster,
    },
  };
}

/** Главный ролик на первом экране. Единственный, где файл реальный. */
export const heroMedia: MediaSource = {
  mp4: process.env.NEXT_PUBLIC_HERO_VIDEO_DESKTOP_URL || "/video/derived/hero-desktop.mp4",
  mp4Mobile: process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL || "/video/derived/hero-mobile.mp4",
  poster: "/video/derived/hero-poster.jpg",
};

/**
 * Рилы разделов. Порядок — порядок показа.
 *
 * ai-01 единственный живой; ai-02..04 сейчас битые огрызки (37–120 KB),
 * из-за них на проде три плитки из четырёх открывают пустоту. Помечены
 * плейсхолдерами, пока не приедут исходники.
 */
export const sectionReels: Record<SectionKey, ReelItem[]> = {
  commercials: [
    placeholderItem("commercials", 1, "Продуктовый ролик", "Реклама"),
    placeholderItem("commercials", 2, "Имиджевый ролик", "Реклама"),
    placeholderItem("commercials", 3, "Короткий формат", "Соцсети"),
  ],
  corporate: [
    placeholderItem("corporate", 1, "Фильм о компании", "Корпоративное"),
    placeholderItem("corporate", 2, "Презентация продукта", "Корпоративное"),
    placeholderItem("corporate", 3, "Интервью", "Корпоративное"),
  ],
  videoproduction: [
    placeholderItem("videoproduction", 1, "Полный цикл", "Продакшн"),
    placeholderItem("videoproduction", 2, "Постпродакшн", "Продакшн"),
  ],
  "music-videos": [
    placeholderItem("music-videos", 1, "Клип", "Музыка"),
    placeholderItem("music-videos", 2, "Лайв-сессия", "Музыка"),
    placeholderItem("music-videos", 3, "Тизер", "Музыка"),
  ],
  /**
   * Разбивка по типу дня, а не по типу материала: клиент выбирает похожее
   * на свою свадьбу. Названия и постеры взяты из weddingCases — раньше эти
   * же кейсы показывала отдельная карусель на 433 строки и 19 KB CSS,
   * и на странице их стало две штуки подряд.
   */
  weddings: [
    {
      ...placeholderItem("weddings", 1, "Камерная свадьба", "Санкт-Петербург",
        "/images/weddings/wedding-city-exit.png"),
      id: "wedding-intimate",
    },
    {
      ...placeholderItem("weddings", 2, "Городская свадьба", "Москва",
        "/images/weddings/wedding-city-portrait.png"),
      id: "wedding-city",
    },
    {
      ...placeholderItem("weddings", 3, "Загородная церемония", "Ленобласть",
        "/images/weddings/wedding-lakeside-portrait.png"),
      id: "wedding-country",
    },
    {
      ...placeholderItem("weddings", 4, "Большой вечерний банкет", "Москва",
        "/images/weddings/wedding-evening-sparklers.png"),
      id: "wedding-banquet",
    },
  ],
  // Названия слотов 02–04 — рабочие: файлов под ними ещё нет, а плеер на
  // /ai теперь показывает их подписью на весь экран, и четыре одинаковых
  // «AI-визуал» подряд читались как поломка. Подписи меняются вместе с
  // приездом настоящих роликов.
  ai: [
    {
      id: "ai-01",
      title: "Предметный AI-визуал",
      tag: "AI",
      source: { mp4: "/video/ai/ai-01.mp4", poster: "/images/ai/ai-01.jpg" },
    },
    { ...placeholderItem("ai", 2, "Рекламный тест", "AI", "/images/ai/ai-02.jpg"), id: "ai-02" },
    { ...placeholderItem("ai", 3, "Виртуальный ведущий", "AI", "/images/ai/ai-03.jpg"), id: "ai-03" },
    { ...placeholderItem("ai", 4, "Гибрид со съёмкой", "AI", "/images/ai/ai-04.jpg"), id: "ai-04" },
  ],
};


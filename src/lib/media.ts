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
  /** Подпись для английской версии; без неё берётся русская. */
  titleEn?: string;
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

/**
 * Где лежат ролики разделов. Пусто — берутся из public/video/ этого же
 * сайта. Если перенести их в хранилище (как шоурил, который живёт в
 * Vercel Blob), достаточно задать адрес папки в NEXT_PUBLIC_MEDIA_BASE_URL
 * и повторить внутри неё ту же структуру: <раздел>/<файл>.mp4.
 */
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").replace(/\/$/, "");

function mediaPath(path: string) {
  return MEDIA_BASE ? `${MEDIA_BASE}${path.replace(/^\/video/, "")}` : path;
}

/**
 * Ролик раздела. Файлы кладутся в public/video/<раздел>/<slug>.mp4 и
 * <slug>-mobile.mp4, постер — в public/images/stills/<slug>.jpg.
 */
function reelItem(section: SectionKey, slug: string, title: string, titleEn: string, tag: string): ReelItem {
  return {
    id: slug,
    title,
    titleEn,
    tag,
    source: {
      mp4: mediaPath(`/video/${section}/${slug}.mp4`),
      mp4Mobile: mediaPath(`/video/${section}/${slug}-mobile.mp4`),
      poster: `/images/stills/${slug}.jpg`,
    },
  };
}

/** Подпись ролика на языке страницы. */
export function reelTitle(item: ReelItem, locale: "ru" | "en") {
  return locale === "en" ? (item.titleEn ?? item.title) : item.title;
}

/**
 * Границы шоурила без белых заставок студии в начале и в конце. На чёрном
 * сайте белый кадр на весь экран читается как вспышка. Сам файл не
 * тронут: начало задаётся фрагментом #t в адресе, конец отслеживает
 * useLoopWindow. Чтобы вернуть заставки, достаточно убрать эти границы.
 */
export const heroWindow = { start: 2.52, end: 148.5 };

const heroDesktop = process.env.NEXT_PUBLIC_HERO_VIDEO_DESKTOP_URL || "/video/derived/hero-desktop.mp4";
const heroMobile = process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL || "/video/derived/hero-mobile.mp4";

/** Главный ролик — шоурил на первом экране. */
export const heroMedia: MediaSource = {
  mp4: `${heroDesktop}#t=${heroWindow.start}`,
  mp4Mobile: `${heroMobile}#t=${heroWindow.start}`,
  poster: "/images/stills/hero-open.jpg",
};

/**
 * Ролики разделов. Порядок — порядок показа на первом экране раздела.
 *
 * Сейчас это фрагменты шоурила, разрезанные ровно по склейкам и без
 * подписи рубрики в углу кадра (COMMERCIALS, VIDEO CLIPS, WEDDINGS,
 * STOCK FOOTAGES). Из стоковых съёмок студии взяты кофе и шахматы
 * (предметка), лайфстайл, медицина и наука. Когда приедут отдельные
 * работы, файл кладётся поверх под тем же именем или сюда добавляется
 * новая строка.
 *
 * ai-02..04 удалены из списка: файлы под ними битые (37–120 KB).
 */
export const sectionReels: Record<SectionKey, ReelItem[]> = {
  commercials: [
    reelItem("commercials", "commercials-01", "Электроника и графика", "Electronics and graphics", "Реклама"),
    reelItem("commercials", "commercials-02", "Экшн-сцены и VFX", "Action and VFX", "Реклама"),
    reelItem("commercials", "commercials-03", "Ролик для квестов", "Escape room ad", "Реклама"),
    reelItem("commercials", "commercials-04", "Кофе: предметная съёмка", "Coffee: product shoot", "Реклама"),
  ],
  corporate: [
    reelItem("corporate", "corporate-01", "Производство", "Manufacturing", "Корпоративное"),
    reelItem("corporate", "corporate-02", "Люди на работе", "People at work", "Корпоративное"),
    reelItem("corporate", "corporate-03", "Медицина и наука", "Medicine and science", "Корпоративное"),
  ],
  videoproduction: [
    reelItem("videoproduction", "videoproduction-01", "Лайфстайл", "Lifestyle", "Полный цикл"),
    reelItem("videoproduction", "videoproduction-02", "Предметная съёмка: шахматы", "Product shoot: chess", "Полный цикл"),
  ],
  "music-videos": [
    reelItem("music-videos", "music-videos-01", "Ночной мост", "Night bridge", "Музыка"),
    reelItem("music-videos", "music-videos-02", "Огонь и море", "Fire and sea", "Музыка"),
  ],
  weddings: [
    reelItem("weddings", "weddings-01", "День и вечер", "Day and evening", "Свадьбы"),
    reelItem("weddings", "weddings-02", "Детали", "Details", "Свадьбы"),
  ],
  ai: [
    {
      id: "ai-01",
      title: "AI-ролик для наушников",
      titleEn: "AI ad for headphones",
      tag: "AI",
      source: {
        mp4: mediaPath("/video/ai/ai-01.mp4"),
        mp4Mobile: mediaPath("/video/ai/ai-01-mobile.mp4"),
        poster: "/images/stills/ai-01.jpg",
      },
    },
  ],
};

/** Первый экран «О студии»: нарезка из шоурила по всем направлениям. */
export const aboutReel: MediaSource = {
  mp4: mediaPath("/video/about/about-01.mp4"),
  mp4Mobile: mediaPath("/video/about/about-01-mobile.mp4"),
  poster: "/images/stills/about-01.jpg",
};

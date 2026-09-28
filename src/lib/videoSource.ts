import type { MediaSource } from "@/lib/media";

type NetworkInformationLike = { effectiveType?: string; saveData?: boolean };
type NavigatorWithConnection = Navigator & { connection?: NetworkInformationLike };

/** Уже этой ширины экран получает мобильный файл: 960 px, как раньше. */
const NARROW_QUERY = "(max-width: 959px)";

/** Кодеки AV1 для проверки: Main, 8 бит, уровень 4.0 и 3.0. */
const AV1_WIDE = 'video/mp4; codecs="av01.0.08M.08"';
const AV1_NARROW = 'video/mp4; codecs="av01.0.04M.08"';

export type VideoChoice = {
  src: string;
  /** H.264 того же ролика — на случай, если AV1-файл не отдался или не завёлся. */
  fallback: string | null;
};

export function isNarrowScreen() {
  return window.matchMedia(NARROW_QUERY).matches;
}

/**
 * Тянуть ли видео вообще. Уважаем Save-Data, медленную сеть и — для
 * фонового ролика — prefers-reduced-motion: у зацикленного фона нет
 * содержательной ценности для того, кому движение мешает.
 */
export function allowsVideo({ ambient }: { ambient: boolean }) {
  if (ambient && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const connection = (navigator as NavigatorWithConnection).connection;
  if (connection?.saveData) return false;

  const effectiveType = connection?.effectiveType;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return false;

  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  if (!isDesktop && effectiveType === "3g") return false;

  return true;
}

/**
 * Брать ли AV1. На компьютере — если браузер его понимает. На телефоне —
 * только с аппаратным декодером: программный декодер AV1 заметно
 * тратит батарею, а мобильные файлы и так лёгкие.
 */
async function prefersAv1(narrow: boolean) {
  const probe = document.createElement("video");
  if (probe.canPlayType(narrow ? AV1_NARROW : AV1_WIDE) !== "probably") return false;
  if (!narrow) return true;

  try {
    const info = await navigator.mediaCapabilities.decodingInfo({
      type: "file",
      video: { contentType: AV1_NARROW, width: 960, height: 386, bitrate: 600_000, framerate: 25 },
    });
    return info.supported && info.powerEfficient;
  } catch {
    return false;
  }
}

/**
 * Какой файл ставить в <video>. Выбор делает JS, а не атрибуты <source>:
 * так учитываются и ширина экрана, и декодер, и откат на H.264.
 *
 * HLS берётся, когда браузер тянет его нативно (Safari, iOS). В Chrome
 * нативного HLS нет, там остаётся mp4 — пока не подключим hls.js: лишняя
 * зависимость появится вместе со стримингом, а не заранее.
 */
export async function chooseVideo(source: MediaSource, narrow: boolean): Promise<VideoChoice | null> {
  if (source.hls) {
    const probe = document.createElement("video");
    if (probe.canPlayType("application/vnd.apple.mpegurl")) return { src: source.hls, fallback: null };
  }

  const mobile = narrow && Boolean(source.mp4Mobile);
  const h264 = (mobile ? source.mp4Mobile : (source.mp4 ?? source.mp4Mobile)) ?? null;
  const av1 = (mobile ? source.av1Mobile : source.av1) ?? null;

  if (av1 && (await prefersAv1(narrow))) return { src: av1, fallback: h264 };
  return h264 ? { src: h264, fallback: null } : null;
}

/**
 * Остановить загрузку ролика. Просто pause() не хватает: браузер докачивает
 * файл в фоне, даже когда элемента уже нет на странице, и этот поток
 * отнимает канал у следующей страницы.
 */
export function releaseVideo(video: HTMLVideoElement) {
  video.pause();
  video.removeAttribute("src");
  video.load();
}

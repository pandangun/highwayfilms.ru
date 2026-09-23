import { useEffect, type RefObject } from "react";

/**
 * Крутит видео внутри окна [start, end] вместо всего файла.
 *
 * Нужен шоурилу: у него белые заставки в начале и в конце. Начало
 * задаётся фрагментом #t в адресе, но на повторе браузер возвращается в
 * ноль, а до конца файла доходит через заставку. Здесь и то, и другое
 * ловится по timeupdate. Сам StudioPlayer не трогаем.
 */
export function useLoopWindow(
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled: boolean,
  { start, end }: { start: number; end: number },
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;

    const keepInside = () => {
      if (video.currentTime >= end || video.currentTime < start - 0.25) {
        video.currentTime = start;
      }
    };

    keepInside();
    video.addEventListener("timeupdate", keepInside);
    return () => video.removeEventListener("timeupdate", keepInside);
  }, [videoRef, enabled, start, end]);
}

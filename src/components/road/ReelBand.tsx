"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { MediaSource } from "@/lib/media";

/** Файл докачан целиком — такой ролик можно просто ставить на паузу. */
function fullyBuffered(video: HTMLVideoElement) {
  const { duration, buffered } = video;
  if (!Number.isFinite(duration) || duration === 0 || buffered.length === 0) return false;
  return buffered.end(buffered.length - 1) >= duration - 0.25;
}

/**
 * Фоновый ролик для полосы съезда. Лёгкий: сначала показывается постер,
 * ролик начинает грузиться только после постера и только пока полоса на
 * экране. Уехала — недокачанный файл отпускается: иначе полосы, мимо
 * которых проехали, тянут файлы дальше и забивают загрузку всего, что
 * ниже (постеров, фона эстакады, финала). Докачанный ролик просто
 * встаёт на паузу.
 *
 * Без видео (reduced motion, Save-Data, нет файла) остаётся постер.
 */
export default function ReelBand({
  source,
  poster,
  alt,
  className,
}: {
  source?: MediaSource;
  poster: string;
  alt: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterReady, setPosterReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source || !posterReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const narrow = !window.matchMedia("(min-width: 960px)").matches;
    const src = (narrow && source.mp4Mobile) || source.mp4;
    if (!src) return;

    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) {
            video.src = src;
            video.load();
          }
          void video.play().catch(() => {
            /* автозапуск запрещён — остаётся постер */
          });
        } else if (video.getAttribute("src")) {
          video.pause();
          if (!fullyBuffered(video)) {
            video.classList.remove("is-playing");
            video.removeAttribute("src");
            video.load();
          }
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [source, posterReady]);

  return (
    <div className={className}>
      {/* Постер грузится сразу с открытием страницы, с низким приоритетом:
          он маленький, а когда до полосы долистают, по тому же соединению
          уже могут идти ролики — тогда ленивая загрузка ждала бы их. */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="low"
        className="object-cover"
        onLoad={() => setPosterReady(true)}
        onError={() => setPosterReady(true)}
      />
      {source ? (
        <video
          ref={videoRef}
          className="reel-band__video"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onPlaying={(event) => event.currentTarget.classList.add("is-playing")}
        />
      ) : null}
    </div>
  );
}

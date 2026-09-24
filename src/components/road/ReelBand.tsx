"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { MediaSource } from "@/lib/media";

/**
 * Фоновый ролик для полосы съезда. Лёгкий: файл начинает грузиться,
 * только когда полоса подъезжает к экрану, и встаёт на паузу, когда
 * уезжает. Шесть роликов на главной иначе тянулись бы все сразу.
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;
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
          if (!video.src) {
            video.src = src;
            video.load();
          }
          void video.play().catch(() => {
            /* автозапуск запрещён — остаётся постер */
          });
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [source]);

  return (
    <div className={className}>
      <Image src={poster} alt={alt} fill sizes="100vw" className="object-cover" />
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

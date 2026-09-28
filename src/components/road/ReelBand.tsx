"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { MediaSource } from "@/lib/media";
import { allowsVideo, chooseVideo, isNarrowScreen, releaseVideo, type VideoChoice } from "@/lib/videoSource";

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
 * Страницу закрыли или ушли в другой раздел — загрузка обрывается.
 *
 * Без видео (reduced motion, Save-Data, нет файла) остаётся постер.
 */
export default function ReelBand({
  source,
  poster,
  alt,
  className,
  sizes = "100vw",
  priority = false,
}: {
  source?: MediaSource;
  poster: string;
  alt: string;
  className?: string;
  /** Ширина постера на странице, как у next/image: по ней выбирается файл. */
  sizes?: string;
  /** Полоса — первый экран страницы: постер грузится первым, с preload. */
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterReady, setPosterReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source || !posterReady) return;
    if (!allowsVideo({ ambient: true })) return;

    let choice: VideoChoice | null = null;
    let visible = false;
    let cancelled = false;

    const release = () => {
      video.classList.remove("is-playing");
      releaseVideo(video);
    };
    const start = () => {
      if (!choice || !visible) return;
      if (!video.getAttribute("src")) {
        video.src = choice.src;
        video.load();
      }
      void video.play().catch(() => {
        /* автозапуск запрещён — остаётся постер */
      });
    };
    // AV1-копия не отдалась или не завелась — ставим H.264.
    const onError = () => {
      if (!choice?.fallback || video.getAttribute("src") !== choice.src) return;
      choice = { src: choice.fallback, fallback: null };
      release();
      start();
    };

    video.muted = true;
    video.addEventListener("error", onError);
    void chooseVideo(source, isNarrowScreen()).then((picked) => {
      if (cancelled) return;
      choice = picked;
      start();
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          start();
        } else if (video.getAttribute("src")) {
          video.pause();
          if (!fullyBuffered(video)) release();
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(video);
    return () => {
      cancelled = true;
      observer.disconnect();
      video.removeEventListener("error", onError);
      if (video.getAttribute("src")) release();
    };
  }, [source, posterReady]);

  return (
    <div className={className}>
      {/* Постер грузится сразу с открытием страницы, с низким приоритетом:
          он маленький, а когда до полосы долистают, по тому же соединению
          уже могут идти ролики — тогда ленивая загрузка ждала бы их.
          На первом экране — наоборот, первым и с preload. */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        loading="eager"
        fetchPriority={priority ? "high" : "low"}
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

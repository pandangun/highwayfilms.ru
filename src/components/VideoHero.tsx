"use client";

import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import { Expand, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";
import StudioPlayer from "@/components/StudioPlayer";
import { heroMedia } from "@/lib/media";

interface VideoHeroProps {
  title?: string;
  subtitle?: string;
  muteLabel?: string;
  unmuteLabel?: string;
  fullscreenLabel?: string;
  headingAs?: ElementType;
}

type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenCapableVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

/** Через сколько прячется подпись поверх видео, чтобы не мешать кадру. */
const CAPTION_VISIBLE_MS = 10_000;

/**
 * Первый экран главной.
 *
 * Воспроизведением занимается StudioPlayer — здесь только «обвязка» героя:
 * подпись, звук и фуллскрин. Раньше вся логика плеера жила прямо тут и
 * больше нигде не переиспользовалась, из-за чего исправления приходилось бы
 * дублировать в каждом новом месте с видео.
 */
export default function VideoHero({
  title = "Highway Films",
  subtitle = "Реклама, бренд-фильмы, клипы и свадьбы. Петербург, съёмки по России.",
  muteLabel = "Включить звук",
  unmuteLabel = "Выключить звук",
  fullscreenLabel = "Открыть видео на весь экран",
  headingAs: HeadingTag = "h1",
}: VideoHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timeout = setTimeout(() => setIsCaptionVisible(false), CAPTION_VISIBLE_MS);
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  const handleToggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);
    if (!video) return;

    video.muted = nextMuted;
    if (video.paused) {
      void video.play().catch(() => {
        /* браузер вправе отказать */
      });
    }
  };

  const handleOpenFullscreen = async () => {
    const video = videoRef.current as FullscreenCapableVideoElement | null;
    const hero = heroRef.current as FullscreenCapableElement | null;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        /* игнорируем */
      }
    }

    try {
      if (typeof video.requestFullscreen === "function") {
        await video.requestFullscreen();
        return;
      }
      if (typeof hero?.requestFullscreen === "function") {
        await hero.requestFullscreen();
        return;
      }
      if (typeof hero?.webkitRequestFullscreen === "function") {
        await hero.webkitRequestFullscreen();
        return;
      }
      if (typeof video.webkitEnterFullscreen === "function") {
        video.webkitEnterFullscreen();
      }
    } catch {
      /* браузер вправе отказать в полноэкранном режиме */
    }
  };

  return (
    // on-dark: фон здесь — видео и bg-black, он не меняется вместе с темой,
    // поэтому текст поверх обязан оставаться светлым в обеих темах.
    <section ref={heroRef} className="on-dark relative w-full hero-fill overflow-hidden bg-black">
      <StudioPlayer
        source={heroMedia}
        label={title}
        mode="ambient"
        priority
        objectFit="cover"
        // Именно h-full w-full, а НЕ absolute inset-0: корень плеера объявлен
        // как relative, и оба position-класса попадали в один элемент.
        // В сборке Tailwind .relative идёт после .absolute и побеждал —
        // контейнер оставался relative, всё содержимое внутри абсолютное,
        // высота схлопывалась в ноль, и первый экран был пустым.
        className="h-full w-full"
        videoRef={videoRef}
        onPlayingChange={setIsPlaying}
      />

      <div className="hero-video-overlay absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/22 to-black/14" />

      <div
        className={clsx(
          "hero-video-caption absolute inset-x-0 bottom-0 z-20 p-6 transition-opacity duration-700 md:p-12",
          isCaptionVisible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="container px-0">
          <div className="max-w-3xl">
            <HeadingTag className="font-display heading-balance text-[clamp(2.45rem,5.5vw,4.8rem)] leading-[0.97] tracking-[-0.04em] text-white">
              {title}
            </HeadingTag>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/74 md:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>

      {isPlaying ? (
        <>
          <button
            type="button"
            onClick={handleOpenFullscreen}
            className="hero-video-fullscreen absolute bottom-4 left-4 z-30 rounded-full border border-white/20 bg-black/55 p-3 text-white transition hover:bg-black/70 md:hidden"
            aria-label={fullscreenLabel}
          >
            <Expand className="h-4.5 w-4.5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            className="hero-video-sound absolute bottom-4 right-4 z-30 rounded-full border border-white/20 bg-black/55 p-3 text-white transition hover:bg-black/70"
            aria-label={isMuted ? muteLabel : unmuteLabel}
            aria-pressed={!isMuted}
          >
            {isMuted ? (
              <VolumeX className="h-4.5 w-4.5" aria-hidden />
            ) : (
              <Volume2 className="h-4.5 w-4.5" aria-hidden />
            )}
          </button>
        </>
      ) : null}
    </section>
  );
}

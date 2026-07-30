"use client";

import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import { Expand, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";
import StudioPlayer from "@/components/StudioPlayer";
import { heroMedia } from "@/lib/media";

type HeroCredit = { label: string; value: string };

interface VideoHeroProps {
  title?: string;
  /** Титры под работой: что, для кого, когда. */
  credits?: HeroCredit[];
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
  credits = [
    { label: "Шоурил", value: "2026" },
    { label: "Формат", value: "Реклама · Бренд-фильмы · Клипы · Свадьбы" },
    { label: "База", value: "Санкт-Петербург, 59°56′N 30°19′E" },
  ],
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

      <div // Оверлей ослаблен: он нужен только чтобы титры внизу читались.
        // Затемнять кадр целиком — значит прятать то, ради чего человек пришёл.
        className="hero-video-overlay absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div
        className={clsx(
          "hero-video-caption absolute inset-x-0 bottom-0 z-20 p-6 transition-opacity duration-700 md:p-12",
          isCaptionVisible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Титры вместо маркетингового подзаголовка.
            Международные продакшены (Partizan, RISK) на первом экране не
            объясняют себя вообще: только работа и её титры — что это, для
            кого, когда. Строка фактов читается увереннее любого слогана,
            потому что её нельзя написать, не имея работы. */}
        <div className="container px-0">
          <div className="hero-credits">
            <HeadingTag className="hero-credits__name font-display">{title}</HeadingTag>
            <dl className="hero-credits__meta">
              {credits.map((item) => (
                <div key={item.label} className="hero-credits__row">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {isPlaying ? (
        <>
          <button
            type="button"
            onClick={handleOpenFullscreen}
            className="hero-video-fullscreen absolute right-[4.5rem] top-[calc(var(--header-h)+1rem)] z-30 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/70 md:hidden"
            aria-label={fullscreenLabel}
          >
            <Expand className="h-4.5 w-4.5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            className="hero-video-sound absolute right-4 top-[calc(var(--header-h)+1rem)] z-30 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/70"
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

"use client";

import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import { Maximize2, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";
import StudioPlayer from "@/components/StudioPlayer";
import { useLoopWindow } from "@/components/useLoopWindow";
import { heroMedia, heroWindow } from "@/lib/media";

type HeroCredit = { label: string; value: string };

interface VideoHeroProps {
  title?: string;
  /** Титры под названием: что это, что снимаем, где. */
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

/** Через сколько прячутся титры поверх видео, чтобы не мешать кадру. */
const CAPTION_VISIBLE_MS = 10_000;

/**
 * Первый экран главной — шоурил на весь экран.
 *
 * Воспроизведением занимается StudioPlayer — здесь только обвязка: титры,
 * звук, полноэкранный режим и маскировка экрана при загрузке.
 */
export default function VideoHero({
  title = "Highway Films",
  credits = [],
  muteLabel = "Включить звук",
  unmuteLabel = "Выключить звук",
  fullscreenLabel = "На весь экран",
  headingAs: HeadingTag = "h1",
}: VideoHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);

  useLoopWindow(videoRef, isPlaying, heroWindow);

  useEffect(() => {
    if (!isPlaying) return;

    const timeout = setTimeout(() => setIsCaptionVisible(false), CAPTION_VISIBLE_MS);
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  const handleToggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);
    // Звук включают, чтобы смотреть: титры в этот момент только мешают.
    if (!nextMuted) setIsCaptionVisible(false);
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
    <section ref={heroRef} className="screen" data-lane="off">
      <StudioPlayer
        source={heroMedia}
        label={title}
        mode="ambient"
        priority
        objectFit="cover"
        // Именно h-full w-full, а не absolute inset-0: корень плеера сам
        // объявлен relative, и два position-класса на одном элементе
        // схлопывали высоту в ноль.
        className="screen__media h-full w-full"
        videoRef={videoRef}
        onPlayingChange={setIsPlaying}
      />

      <div className="screen__shade" aria-hidden />

      <div className="screen__caption">
        <div className="wrap">
          <div className={clsx("transition-opacity duration-700", !isCaptionVisible && "pointer-events-none opacity-0")}>
            <HeadingTag className="display display--hero screen__title screen__title--name">{title}</HeadingTag>
          </div>

          <div className="screen__foot">
            <dl
              className={clsx(
                "billing transition-opacity duration-700",
                !isCaptionVisible && "pointer-events-none opacity-0",
              )}
            >
              {credits.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            {isPlaying ? (
              <div className="screen__controls">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="screen-control"
                  aria-pressed={!isMuted}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  ) : (
                    <Volume2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  )}
                  {isMuted ? muteLabel : unmuteLabel}
                </button>
                <button type="button" onClick={handleOpenFullscreen} className="screen-control" aria-label={fullscreenLabel}>
                  <Maximize2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  <span className="hidden sm:inline">{fullscreenLabel}</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="screen-mask" aria-hidden />
    </section>
  );
}

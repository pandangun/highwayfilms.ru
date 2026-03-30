"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

interface VideoHeroProps {
  title?: string;
  subtitle?: string;
  muteLabel?: string;
  unmuteLabel?: string;
}

const HERO_VIDEO_VERSION = "20260330";
const HERO_VIDEO_READY_STATE = 2;
const HERO_VIDEO_ASSETS = {
  poster: `/video/derived/hero-poster.jpg?v=${HERO_VIDEO_VERSION}`,
  desktop: `/video/derived/hero-desktop.mp4?v=${HERO_VIDEO_VERSION}`,
  mobile: `/video/derived/hero-mobile.mp4?v=${HERO_VIDEO_VERSION}`,
} as const;

export default function VideoHero({
  title = "Highway Films",
  subtitle = "Реклама, бренд-фильмы, корпоративные истории и клипы.",
  muteLabel = "Включить звук",
  unmuteLabel = "Выключить звук",
}: VideoHeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markVideoReady = () => {
      setIsVideoReady(true);
    };

    if (video.readyState >= HERO_VIDEO_READY_STATE) {
      markVideoReady();
    } else {
      video.addEventListener("loadeddata", markVideoReady, { once: true });
    }

    void video.play().catch(() => {
      /* muted autoplay can still be rejected silently */
    });

    return () => {
      video.removeEventListener("loadeddata", markVideoReady);
    };
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (!video) return;

    video.muted = nextMuted;

    if (video.paused) {
      void video.play().catch(() => {
        /* ignore */
      });
    }
  };

  return (
    <section className="relative w-full hero-fill overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src={HERO_VIDEO_ASSETS.poster}
          alt={title}
          fill
          priority
          sizes="100vw"
          className={clsx(
            "object-cover md:object-contain transition-opacity duration-200",
            isVideoReady ? "opacity-0" : "opacity-100"
          )}
        />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster={HERO_VIDEO_ASSETS.poster}
          className={clsx(
            "hero-video absolute inset-0 h-full w-full transition-opacity duration-300",
            isVideoReady ? "opacity-100" : "opacity-0"
          )}
        >
          <source
            src={HERO_VIDEO_ASSETS.desktop}
            type="video/mp4"
            media="(min-width: 960px)"
          />
          <source src={HERO_VIDEO_ASSETS.mobile} type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/22 to-black/14" />

      <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-12">
        <div className="container px-0">
          <div className="max-w-3xl">
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em] text-white">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/74 md:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggleMute}
        className="absolute bottom-4 right-4 z-30 rounded-full border border-white/20 bg-black/55 p-3 text-white transition hover:bg-black/70"
        aria-label={isMuted ? muteLabel : unmuteLabel}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX className="h-[18px] w-[18px]" aria-hidden /> : <Volume2 className="h-[18px] w-[18px]" aria-hidden />}
      </button>
    </section>
  );
}

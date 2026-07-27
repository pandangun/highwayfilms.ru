"use client";

import Image from "next/image";
import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import { Expand, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

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

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
};

const HERO_VIDEO_VERSION = process.env.NEXT_PUBLIC_HERO_VIDEO_VERSION ?? "20260330";
const HERO_VIDEO_MODE = process.env.NEXT_PUBLIC_HERO_VIDEO_MODE ?? "auto";
const HERO_VIDEO_READY_STATE = 2;

function withVersion(url: string | undefined, version: string) {
  if (!url) return "";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${version}`;
}

const HERO_VIDEO_POSTER_SRC = withVersion("/video/derived/hero-poster.jpg", HERO_VIDEO_VERSION);

const HERO_VIDEO_REMOTE_SOURCES = {
  desktop: process.env.NEXT_PUBLIC_HERO_VIDEO_DESKTOP_URL,
  mobile: process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL,
} as const;

const HERO_VIDEO_LOCAL_SOURCES = {
  desktop: withVersion("/video/derived/hero-desktop.mp4", HERO_VIDEO_VERSION),
  mobile: withVersion("/video/derived/hero-mobile.mp4", HERO_VIDEO_VERSION),
} as const;

const HAS_REMOTE_HERO_VIDEO = Boolean(
  HERO_VIDEO_REMOTE_SOURCES.desktop && HERO_VIDEO_REMOTE_SOURCES.mobile
);

const HERO_VIDEO_SOURCES = HAS_REMOTE_HERO_VIDEO
  ? {
      desktop: withVersion(HERO_VIDEO_REMOTE_SOURCES.desktop, HERO_VIDEO_VERSION),
      mobile: withVersion(HERO_VIDEO_REMOTE_SOURCES.mobile, HERO_VIDEO_VERSION),
    }
  : HERO_VIDEO_LOCAL_SOURCES;

const SHOULD_RENDER_HERO_VIDEO = Boolean(
  HERO_VIDEO_MODE !== "poster" && HERO_VIDEO_SOURCES.desktop && HERO_VIDEO_SOURCES.mobile
);

function canAutoplayHeroVideo() {
  if (!SHOULD_RENDER_HERO_VIDEO) return false;

  const connection = (navigator as NavigatorWithConnection).connection;

  if (connection?.saveData) return false;

  const effectiveType = connection?.effectiveType;
  const isDesktopViewport = window.matchMedia("(min-width: 768px)").matches;

  if (effectiveType === "slow-2g" || effectiveType === "2g") return false;
  if (!isDesktopViewport && effectiveType === "3g") return false;

  return true;
}

export default function VideoHero({
  title = "Highway Films",
  subtitle = "Реклама, бренд-фильмы, корпоративные истории и клипы.",
  muteLabel = "Включить звук",
  unmuteLabel = "Выключить звук",
  fullscreenLabel = "Открыть видео на весь экран",
  headingAs: HeadingTag = "h1",
}: VideoHeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShouldLoadVideo(canAutoplayHeroVideo());
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    let hideOverlayTimeout: ReturnType<typeof setTimeout> | null = null;

    const markVideoReady = () => {
      setIsVideoReady(true);
    };

    const scheduleOverlayHide = () => {
      if (hideOverlayTimeout) return;

      const remainingMs = Math.max(0, 10_000 - video.currentTime * 1000);
      hideOverlayTimeout = setTimeout(() => {
        setIsOverlayVisible(false);
      }, remainingMs);
    };

    if (video.readyState >= HERO_VIDEO_READY_STATE) {
      markVideoReady();
    } else {
      video.addEventListener("loadeddata", markVideoReady, { once: true });
    }

    void video.play().catch(() => {
      /* muted autoplay can still be rejected silently */
    });

    if (!video.paused || video.currentTime > 0) {
      scheduleOverlayHide();
    } else {
      video.addEventListener("playing", scheduleOverlayHide, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", markVideoReady);
      video.removeEventListener("playing", scheduleOverlayHide);

      if (hideOverlayTimeout) {
        clearTimeout(hideOverlayTimeout);
      }
    };
  }, [shouldLoadVideo]);

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

  const handleOpenFullscreen = async () => {
    const video = videoRef.current as FullscreenCapableVideoElement | null;
    const hero = heroRef.current as FullscreenCapableElement | null;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        /* ignore */
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
      /* fullscreen requests can be rejected by the browser */
    }
  };

  return (
    <section ref={heroRef} className="relative w-full hero-fill overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src={HERO_VIDEO_POSTER_SRC}
          alt={title}
          fill
          priority
          sizes="100vw"
          className={clsx(
            "object-cover md:object-contain transition-opacity duration-200",
            isVideoReady ? "opacity-0" : "opacity-100"
          )}
        />

        {shouldLoadVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            poster={HERO_VIDEO_POSTER_SRC}
            className={clsx(
              "hero-video absolute inset-0 h-full w-full transition-opacity duration-300",
              isVideoReady ? "opacity-100" : "opacity-0"
            )}
          >
            <source
              src={HERO_VIDEO_SOURCES.desktop}
              type="video/mp4"
              media="(min-width: 960px)"
            />
            <source src={HERO_VIDEO_SOURCES.mobile} type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        ) : null}
      </div>

      <div className="hero-video-overlay absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/22 to-black/14" />

      <div
        className={clsx(
          "hero-video-caption absolute inset-x-0 bottom-0 z-20 p-6 transition-opacity duration-700 md:p-12",
          isOverlayVisible ? "opacity-100" : "pointer-events-none opacity-0"
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

      {shouldLoadVideo ? (
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
            {isMuted ? <VolumeX className="h-4.5 w-4.5" aria-hidden /> : <Volume2 className="h-4.5 w-4.5" aria-hidden />}
          </button>
        </>
      ) : null}
    </section>
  );
}

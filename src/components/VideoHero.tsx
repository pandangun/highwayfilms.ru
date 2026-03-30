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

export default function VideoHero({
  title = "Highway Films",
  subtitle = "Реклама, бренд-фильмы, корпоративные истории и клипы.",
  muteLabel = "Включить звук",
  unmuteLabel = "Выключить звук",
}: VideoHeroProps) {
  const [muted, setMuted] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setShouldLoadVideo(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch(() => {
      /* autoplay can be rejected silently */
    });
  }, [shouldLoadVideo]);

  const handleVideoReady = () => {
    setIsVideoReady(true);

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      /* ignore */
    });
  };

  return (
    <section className="relative w-full hero-fill overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/video/derived/hero-poster.jpg"
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
            muted={muted}
            playsInline
            preload="none"
            poster="/video/derived/hero-poster.jpg"
            onLoadedData={handleVideoReady}
            onCanPlay={handleVideoReady}
            className={clsx(
              "hero-video absolute inset-0 h-full w-full transition-opacity duration-300",
              isVideoReady ? "opacity-100" : "opacity-0"
            )}
          >
            <source
              src="/video/derived/hero-desktop.mp4"
              type="video/mp4"
              media="(min-width: 960px)"
            />
            <source src="/video/derived/hero-mobile.mp4" type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        ) : null}
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
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;

          const nextMuted = !muted;
          setMuted(nextMuted);
          video.muted = nextMuted;

          if (!nextMuted) {
            void video.play().catch(() => {
              /* ignore */
            });
          }
        }}
        className="absolute bottom-4 right-4 z-30 rounded-full border border-white/20 bg-black/55 p-3 text-white transition hover:bg-black/70"
        aria-label={muted ? muteLabel : unmuteLabel}
        aria-pressed={!muted}
      >
        {muted ? <VolumeX className="h-[18px] w-[18px]" aria-hidden /> : <Volume2 className="h-[18px] w-[18px]" aria-hidden />}
      </button>
    </section>
  );
}

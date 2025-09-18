"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoHero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = async () => { try { await v.play(); } catch {} };
    const onCanPlay = () => tryPlay();
    v.addEventListener("canplay", onCanPlay);
    if (v.readyState >= 2) tryPlay();
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section className="relative w-full hero-fill overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
        poster="/video/derived/hero-poster.jpg"
        className="
          hero-video
          absolute inset-0 w-full h-full
          object-cover md:object-contain   /* дублируем для нормальных браузеров */
          scale-[1.2] md:scale-100         /* чуть «заширяем» только на мобиле */
          transform-gpu
        "
      >
        <source src="/video/derived/fallback-720.mp4" type="video/mp4" />
        <source src="/video/derived/fallback-1080.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />

      <div className="absolute inset-0 flex items-end p-6 md:p-12 z-20">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Highway Films
          </h1>
          <p className="mt-3 text-neutral-200 max-w-xl text-lg">
            Bold visuals. Clear storytelling. Results on screen.
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          const v = videoRef.current;
          if (!v) return;
          const next = !muted;
          setMuted(next);
          v.muted = next;
          if (!next) v.play().catch(() => {});
        }}
        className="absolute bottom-4 right-4 p-3 rounded-full bg-black/50 border border-white/30 text-white hover:bg-black/70 transition z-30"
        aria-label={muted ? "Включить звук" : "Выключить звук"}
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </section>
  );
}

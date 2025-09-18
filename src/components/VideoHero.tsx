"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoHero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // На всякий случай «пинаем» воспроизведение, когда готовы данные
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // игнор – иногда браузер блокирует, если вкладка не активна
        });
      }
    };
    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="metadata"
        poster="/video/derived/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover z-0"
        onError={(e) => console.warn("VIDEO ERROR", e.currentTarget.error)}
      >
        {/* десктоп */}
        <source
          src="/video/derived/fallback-1080.mp4?v=1"
          type="video/mp4"
          media="(min-width:1025px)"
        />
        {/* мобайл/планшет */}
        <source
          src="/video/derived/fallback-720.mp4?v=1"
          type="video/mp4"
          media="(max-width:1024px)"
        />
        Ваш браузер не поддерживает видео.
      </video>

      {/* затемняющий градиент */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* текст поверх */}
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

      {/* кнопка mute/unmute */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-4 right-4 p-3 rounded-full bg-black/50 border border-white/30 text-white hover:bg-black/70 transition z-30"
        aria-label="Toggle sound"
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoHero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS: вручную пинаем autoplay, когда браузер уже всё смонтировал
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // на всякий случай
    v.muted = true;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch (e) {
        // если вдруг iOS всё равно не дал — просто оставим постер,
        // пользователь сможет ткнуть кнопку звука/паузы сам
        // console.warn("Autoplay was blocked:", e);
      }
    };

    // когда можно играть — пробуем
    const onCanPlay = () => tryPlay();

    v.addEventListener("canplay", onCanPlay);
    // если уже может — пробуем сразу
    if (v.readyState >= 2) tryPlay();

    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section className="relative w-full h-ios-vh overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
        poster="/video/derived/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover z-0"
        // важно: на iOS не ставим никакие controls, иначе потребует жест
        // Safari иногда забивает на <source media> — поэтому первым идёт 720p
      >
        <source src="/video/derived/fallback-720.mp4" type="video/mp4" />
        <source src="/video/derived/fallback-1080.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* затемняющий градиент — и он не перехватывает клики */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />

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
        onClick={() => {
          const v = videoRef.current;
          if (!v) return;
          const next = !muted;
          setMuted(next);
          v.muted = next;
          // если звук включили — iOS иногда ставит на паузу, пнёем play()
          if (!next) v.play().catch(() => {});
        }}
        className="absolute bottom-4 right-4 p-3 rounded-full bg-black/50 border border-white/30 text-white hover:bg-black/70 transition z-30"
        aria-label="Toggle sound"
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </section>
  );
}

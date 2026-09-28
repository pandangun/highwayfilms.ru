"use client";

import Image from "next/image";
import clsx from "clsx";
import { Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { heroMedia, type MediaSource } from "@/lib/media";
import { allowsVideo, chooseVideo, isNarrowScreen, releaseVideo } from "@/lib/videoSource";

type StudioPlayerProps = {
  source: MediaSource;
  /** Альт постера и aria-label кнопки воспроизведения. */
  label: string;
  /**
   * ambient — фоновый зацикленный рил без звука и контролов.
   * interactive — воспроизведение по клику, со звуком и контролами.
   */
  mode?: "ambient" | "interactive";
  /** Файла ещё нет: не ходить за ним по сети, показать постер. */
  placeholder?: boolean;
  /** Постер как приоритетный ресурс — только для первого экрана. */
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain";
  /** Наружу — чтобы hero мог прятать подпись, когда видео поехало. */
  onPlayingChange?: (playing: boolean) => void;
  /** Наружу — чтобы hero мог повесить свои кнопки звука и фуллскрина. */
  videoRef?: React.RefObject<HTMLVideoElement | null>;
};

/*
 * Выбор файла — src/lib/videoSource.ts. Там же откат с AV1 на H.264 и
 * правила, когда видео не тянем вовсе (Save-Data, медленная сеть,
 * prefers-reduced-motion для фона).
 *
 * Выбор делает JS, а не атрибут media у <source>: когда-то media на
 * <source> внутри <video> игнорировался Chrome, и мобильные тянули
 * десктопный файл на 70 MB. matchMedia проверяет ширину по-настоящему.
 */

export default function StudioPlayer({
  source,
  label,
  mode = "ambient",
  placeholder = false,
  priority = false,
  className,
  objectFit = "cover",
  onPlayingChange,
  videoRef: externalVideoRef,
}: StudioPlayerProps) {
  const internalRef = useRef<HTMLVideoElement>(null);
  const videoRef = externalVideoRef ?? internalRef;
  const containerRef = useRef<HTMLDivElement>(null);

  const [src, setSrc] = useState<string | null>(null);
  /** H.264 того же ролика, если сейчас стоит AV1: на него откатываемся при ошибке. */
  const fallbackRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  /** Автозапуск отклонён (iOS Low Power Mode и подобное) — нужна кнопка. */
  const [needsGesture, setNeedsGesture] = useState(false);

  // Пока у раздела нет своего материала, играет основной шоурил. Статичная
  // картинка вместо плеера на сайте видеостудии — хуже, чем «тот же ролик,
  // что на главной»: во втором случае посетитель хотя бы видит, как мы
  // снимаем. Когда приедут файлы раздела, флаг placeholder снимается и
  // подставляется свой ролик.
  // useMemo обязателен: без него объект пересоздаётся на каждом рендере,
  // эффект ниже считает зависимость изменившейся и перезапускается вхолостую.
  const effectiveSource = useMemo(
    () => (placeholder ? { ...heroMedia, poster: source.poster } : source),
    [placeholder, source],
  );

  // Решение о загрузке принимаем после монтирования: до него неизвестны ни
  // ширина, ни сеть, ни настройки движения.
  //
  // Через requestAnimationFrame, а не прямо в теле эффекта: так первый кадр
  // успевает отрисоваться с постером, и мы не даём каскад ре-рендеров.
  useEffect(() => {
    if (mode === "interactive") return; // interactive грузится по клику

    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (!allowsVideo({ ambient: true })) return;
      void chooseVideo(effectiveSource, isNarrowScreen()).then((choice) => {
        if (cancelled || !choice) return;
        fallbackRef.current = choice.fallback;
        setSrc(choice.src);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [mode, effectiveSource]);

  // Плеер убрали со страницы (переход в другой раздел, смена ролика в
  // первом экране) — обрываем загрузку. Без этого шоурил главной качался
  // в фоне ещё полминуты и отнимал канал у ролика следующей страницы.
  const hasVideo = src !== null;
  useEffect(() => {
    const video = videoRef.current;
    if (!hasVideo || !video) return;
    return () => releaseVideo(video);
  }, [hasVideo, videoRef]);

  // React исторически не проставляет свойство muted при первом рендере
  // <video>, а без него браузер блокирует автозапуск. Ставим руками.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== "ambient") return;
    video.muted = true;
    video.defaultMuted = true;
  }, [mode, src, videoRef]);

  // Зацикленное видео за пределами экрана продолжает декодироваться и жрёт
  // батарею. Останавливаем, когда уехало из вида, и возвращаем обратно.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || mode !== "ambient" || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => setNeedsGesture(true));
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [mode, src, videoRef]);

  useEffect(() => {
    onPlayingChange?.(isReady && !hasFailed);
  }, [isReady, hasFailed, onPlayingChange]);

  // Обычный обработчик, без useCallback: мемоизировать нечего, а React
  // Compiler на ручной мемоизации с внешним ref спотыкается.
  const handlePlayRequest = () => {
    setNeedsGesture(false);

    if (!src) {
      void chooseVideo(effectiveSource, isNarrowScreen()).then((choice) => {
        if (!choice) return;
        fallbackRef.current = choice.fallback;
        setSrc(choice.src);
      });
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (mode === "interactive") video.muted = false;
    void video.play().catch(() => setNeedsGesture(true));
  };

  // Постер держим под видео всегда: он же первый кадр, он же то, что
  // остаётся при любой ошибке — битом файле, 404, отказе кодека.
  const showPoster = !isReady || hasFailed || !src;

  return (
    <div ref={containerRef} className={clsx("relative overflow-hidden", className)}>
      {/* Постер первого экрана — самый важный кадр страницы: preload и
          высокий приоритет, иначе Chrome грузит его наравне со скриптами. */}
      <Image
        src={source.poster}
        alt={label}
        fill
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes="100vw"
        className={clsx(
          objectFit === "cover" ? "object-cover" : "object-contain",
          "transition-opacity duration-300",
          showPoster ? "opacity-100" : "opacity-0",
        )}
      />

      {src ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay={mode === "ambient"}
          loop={mode === "ambient"}
          muted={mode === "ambient"}
          playsInline
          preload={mode === "ambient" ? "auto" : "metadata"}
          controls={mode === "interactive"}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture={mode === "ambient"}
          onLoadedData={() => setIsReady(true)}
          onError={() => {
            // AV1-копии нет или браузер её не завёл — ставим H.264.
            const fallback = fallbackRef.current;
            if (fallback) {
              fallbackRef.current = null;
              setSrc(fallback);
              return;
            }
            // Битый или отсутствующий файл не должен превращаться в чёрный
            // прямоугольник — откатываемся на постер.
            setHasFailed(true);
            setIsReady(false);
          }}
          className={clsx(
            "absolute inset-0 h-full w-full transition-opacity duration-300",
            objectFit === "cover" ? "object-cover" : "object-contain",
            isReady && !hasFailed ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}

      {/* Кнопка нужна в трёх случаях: interactive-режим, отклонённый
          автозапуск (Low Power Mode) и отказ от загрузки по Save-Data.
          Раньше в этих случаях был просто статичный постер без всякого
          намёка, что видео вообще есть. */}
      {(mode === "interactive" || needsGesture) && !hasFailed ? (
        <button
          type="button"
          onClick={handlePlayRequest}
          aria-label={label}
          className={clsx(
            "absolute inset-0 grid place-items-center transition",
            isReady && !needsGesture && mode === "interactive" ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/60">
            <Play className="h-5 w-5 translate-x-[1px]" aria-hidden />
          </span>
        </button>
      ) : null}
    </div>
  );
}

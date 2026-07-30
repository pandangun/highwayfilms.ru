"use client";

import Image from "next/image";
import clsx from "clsx";
import { Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { heroMedia, type MediaSource } from "@/lib/media";

type NetworkInformationLike = { effectiveType?: string; saveData?: boolean };
type NavigatorWithConnection = Navigator & { connection?: NetworkInformationLike };

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

/**
 * Выбор источника делает JS, а не атрибут media у <source>.
 *
 * Это была настоящая бага: media на <source> внутри <video> выпилен из
 * спецификации и игнорируется Chrome. Из-за этого правило
 * media="(min-width: 960px)" не работало, и мобильные тянули десктопный
 * файл на 70 MB. Здесь ширина проверяется через matchMedia, то есть
 * по-настоящему.
 *
 * HLS предпочитается, когда браузер тянет его нативно (Safari, iOS).
 * В Chrome нативного HLS нет, поэтому там остаётся mp4 — до тех пор, пока
 * не подключим hls.js. Это осознанный компромисс: лишняя зависимость
 * добавляется вместе со стримингом, а не заранее.
 */
function pickSource(source: MediaSource): string | null {
  if (typeof window === "undefined") return source.mp4 ?? null;

  if (source.hls) {
    const probe = document.createElement("video");
    if (probe.canPlayType("application/vnd.apple.mpegurl")) return source.hls;
  }

  const isNarrow = !window.matchMedia("(min-width: 960px)").matches;
  if (isNarrow && source.mp4Mobile) return source.mp4Mobile;

  return source.mp4 ?? source.mp4Mobile ?? null;
}

/**
 * Тянуть ли видео вообще. Уважаем Save-Data, медленную сеть и
 * prefers-reduced-motion: у фонового зацикленного видео нет содержательной
 * ценности для того, кому движение мешает.
 */
function shouldLoadVideo(mode: "ambient" | "interactive") {
  if (typeof window === "undefined") return false;

  if (mode === "ambient" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const connection = (navigator as NavigatorWithConnection).connection;
  if (connection?.saveData) return false;

  const effectiveType = connection?.effectiveType;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return false;

  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  if (!isDesktop && effectiveType === "3g") return false;

  return true;
}

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

    const frame = requestAnimationFrame(() => {
      if (!shouldLoadVideo(mode)) return;
      setSrc(pickSource(effectiveSource));
    });

    return () => cancelAnimationFrame(frame);
  }, [mode, effectiveSource]);

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
      setSrc(pickSource(effectiveSource));
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
      <Image
        src={source.poster}
        alt={label}
        fill
        priority={priority}
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

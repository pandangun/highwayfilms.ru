"use client";

import { useEffect, useEffectEvent, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { formatTimecode } from "@/cabinet/format";

export type PlayerHandle = {
  seek: (ms: number) => void;
  pause: () => void;
  time: () => number;
};

export type Marker = { id: string; ms: number; tone: "draft" | "open" | "done" };

/**
 * Плеер для правок: своя шкала, чтобы на ней стояли точки правок.
 * Пробел — пауза, стрелки — на пять секунд. Клик по точке — к правке.
 */
export default function ReviewPlayer({
  src,
  markers,
  onTime,
  ref,
}: {
  src: string;
  markers: Marker[];
  onTime?: (ms: number) => void;
  ref?: Ref<PlayerHandle>;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const seek = (ms: number) => {
    const element = video.current;
    if (!element) return;
    element.currentTime = ms / 1000;
    setTime(ms);
  };

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) void element.play();
    else element.pause();
  };

  useImperativeHandle(ref, () => ({
    seek,
    pause: () => video.current?.pause(),
    time: () => Math.round((video.current?.currentTime ?? 0) * 1000),
  }));

  const onKey = useEffectEvent((event: KeyboardEvent) => {
    if ((event.target as HTMLElement | null)?.closest("input, textarea, select, button, [contenteditable]")) return;
    const element = video.current;
    if (!element) return;
    if (event.code === "Space") {
      event.preventDefault();
      toggle();
    } else if (event.key === "ArrowLeft") {
      seek(Math.max(0, element.currentTime * 1000 - 5000));
    } else if (event.key === "ArrowRight") {
      seek(Math.min(duration, element.currentTime * 1000 + 5000));
    }
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => onKey(event);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const fullscreen = () => {
    const element = box.current;
    if (element?.requestFullscreen) void element.requestFullscreen();
    else (video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null)?.webkitEnterFullscreen?.();
  };

  return (
    <div className="rv-player" ref={box}>
      <video
        ref={video}
        src={src}
        preload="metadata"
        playsInline
        muted={muted}
        onClick={toggle}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const ms = Math.round(event.currentTarget.currentTime * 1000);
          setTime(ms);
          onTime?.(ms);
        }}
        onLoadedMetadata={(event) => setDuration(Math.round(event.currentTarget.duration * 1000))}
      />
      {!started ? (
        <button type="button" className="rv-big-play" onClick={toggle} aria-label="Смотреть">
          <span>
            <Play className="h-7 w-7 translate-x-0.5" strokeWidth={1.8} aria-hidden />
          </span>
        </button>
      ) : null}

      <div className="rv-controls">
        <div className="rv-timeline">
          {duration
            ? markers.map((marker) => (
                <button
                  key={marker.id}
                  type="button"
                  className="rv-marker"
                  data-draft={marker.tone === "draft"}
                  data-done={marker.tone === "done"}
                  style={{ left: `${Math.min(100, (marker.ms / duration) * 100)}%` }}
                  onClick={() => seek(marker.ms)}
                  aria-label={`Правка на ${formatTimecode(marker.ms)}`}
                />
              ))
            : null}
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={40}
            value={Math.min(time, duration)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Перемотка"
            aria-valuetext={formatTimecode(time)}
          />
        </div>
        <div className="rv-controls__row">
          <button type="button" onClick={toggle} aria-label={playing ? "Пауза" : "Смотреть"}>
            {playing ? <Pause className="h-5 w-5" strokeWidth={1.8} aria-hidden /> : <Play className="h-5 w-5" strokeWidth={1.8} aria-hidden />}
          </button>
          <span className="rv-time">
            <b>{formatTimecode(time)}</b> / {formatTimecode(duration)}
          </span>
          <span className="rv-controls__spacer" />
          <button type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Включить звук" : "Выключить звук"}>
            {muted ? <VolumeX className="h-5 w-5" strokeWidth={1.8} aria-hidden /> : <Volume2 className="h-5 w-5" strokeWidth={1.8} aria-hidden />}
          </button>
          <button type="button" onClick={fullscreen} aria-label="Во весь экран">
            <Maximize className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

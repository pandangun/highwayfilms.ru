"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { heroWindow } from "@/lib/media";

/** Таймкод монтажки: часы, минуты, секунды и кадр при 25 кадрах в секунду. */
function timecode(seconds: number) {
  const frames = Math.floor(seconds * 25);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(Math.floor(frames / 90000))}:${pad(Math.floor(frames / 1500) % 60)}:${pad(Math.floor(frames / 25) % 60)}:${pad(frames % 25)}`;
}

const LENGTH = heroWindow.end - heroWindow.start;

/**
 * Обвязка кинозала поверх шоурила: уголки видоискателя, таймкод, полоса
 * хода и кнопки. Пока человек не шевелит мышью и фильм идёт, всё это
 * гаснет — остаётся кадр. Таймкод и полоса обновляются напрямую, без
 * React: перерисовывать плеер 60 раз в секунду незачем.
 */
export default function HeroCinema({
  videoRef,
  title,
  isPaused,
  isMuted,
  onTogglePause,
  onToggleMute,
  onClose,
  labels,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  title: string;
  isPaused: boolean;
  isMuted: boolean;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onClose: () => void;
  labels: { pause: string; play: string; mute: string; unmute: string; close: string };
}) {
  const tcRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const [awake, setAwake] = useState(true);

  useEffect(() => {
    playRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video) {
        const elapsed = Math.max(0, video.currentTime - heroWindow.start);
        if (tcRef.current) tcRef.current.textContent = timecode(elapsed);
        if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, elapsed / LENGTH)})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [videoRef]);

  // Мышь, касание или клавиша будят обвязку; слушаем окно целиком.
  useEffect(() => {
    const wake = () => setAwake(true);
    window.addEventListener("pointermove", wake);
    window.addEventListener("pointerdown", wake);
    window.addEventListener("keydown", wake);
    return () => {
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("pointerdown", wake);
      window.removeEventListener("keydown", wake);
    };
  }, []);

  // Две с половиной секунды без движения — обвязка гаснет.
  useEffect(() => {
    if (!awake || isPaused) return;
    const timeout = window.setTimeout(() => setAwake(false), 2500);
    return () => window.clearTimeout(timeout);
  }, [awake, isPaused]);

  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const box = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    video.currentTime = heroWindow.start + ratio * LENGTH;
  };

  return (
    <div
      className="cinema"
      data-awake={awake || isPaused}
      // Клик по кадру — пауза, как в любом плеере.
      onClick={(event) => {
        if (event.target === event.currentTarget) onTogglePause();
      }}
    >
      <span className="cinema__corner cinema__corner--tl" aria-hidden />
      <span className="cinema__corner cinema__corner--tr" aria-hidden />
      <span className="cinema__corner cinema__corner--bl" aria-hidden />
      <span className="cinema__corner cinema__corner--br" aria-hidden />

      <p className="cinema__title">{title}</p>

      <div className="cinema__bar">
        <span ref={tcRef} className="cinema__tc" aria-hidden>
          00:00:00:00
        </span>
        <div className="cinema__track" onClick={seek} aria-hidden>
          <span ref={barRef} />
        </div>
        <button ref={playRef} type="button" className="screen-control screen-control--icon" onClick={onTogglePause} aria-label={isPaused ? labels.play : labels.pause}>
          {isPaused ? <Play className="h-4 w-4" strokeWidth={1.5} aria-hidden /> : <Pause className="h-4 w-4" strokeWidth={1.5} aria-hidden />}
        </button>
        <button type="button" className="screen-control screen-control--icon" onClick={onToggleMute} aria-label={isMuted ? labels.mute : labels.unmute}>
          {isMuted ? <VolumeX className="h-4 w-4" strokeWidth={1.5} aria-hidden /> : <Volume2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />}
        </button>
        <button type="button" className="screen-control screen-control--icon" onClick={onClose} aria-label={labels.close}>
          <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}

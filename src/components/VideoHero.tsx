"use client";

import type { ElementType } from "react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";
import HeroCinema from "@/components/HeroCinema";
import StudioPlayer from "@/components/StudioPlayer";
import { useLoopWindow } from "@/components/useLoopWindow";
import { heroMedia, heroWindow } from "@/lib/media";

type HeroCredit = { label: string; value: string };

interface VideoHeroProps {
  title?: string;
  /** Титры под названием: что это, что снимаем, где. */
  credits?: HeroCredit[];
  muteLabel?: string;
  unmuteLabel?: string;
  fullscreenLabel?: string;
  pauseLabel?: string;
  playLabel?: string;
  /** Кинозал: подпись в углу и кнопка выхода. */
  cinemaLabel?: string;
  closeLabel?: string;
  headingAs?: ElementType;
}

type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenCapableVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

/** Через сколько прячутся титры поверх видео, чтобы не мешать кадру. */
const CAPTION_VISIBLE_MS = 10_000;

/**
 * Первый экран главной — шоурил на весь экран.
 *
 * Воспроизведением занимается StudioPlayer — здесь только обвязка: титры,
 * звук, кинозал и маскировка экрана при загрузке.
 *
 * Кинозал («На весь экран»): тот же видеоэлемент встаёт поверх сайта,
 * свет гаснет, шоурил идёт с начала со звуком и целиком, без обрезки
 * кадра; вокруг — уголки видоискателя и таймкод. Закончился ролик или
 * нажали Esc — экран возвращается, звук выключается, фоновый показ
 * продолжается. На iPhone полноэкранный режим для элемента не дают —
 * там, как и раньше, системный плеер.
 */
export default function VideoHero({
  title = "Highway Films",
  credits = [],
  muteLabel = "Включить звук",
  unmuteLabel = "Выключить звук",
  fullscreenLabel = "На весь экран",
  pauseLabel = "Пауза",
  playLabel = "Смотреть",
  cinemaLabel = "Шоурил",
  closeLabel = "Закрыть",
  headingAs: HeadingTag = "h1",
}: VideoHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  /** Пауза кнопкой: шоурил играет сам, и остановить его должно быть можно. */
  const [isPaused, setIsPaused] = useState(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);
  const [isCinema, setIsCinema] = useState(false);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  /** Кинозал открыт в настоящем полноэкранном режиме — выход из него закрывает и кинозал. */
  const inFullscreenRef = useRef(false);

  // В кинозале ролик идёт до конца один раз, без петли.
  useLoopWindow(videoRef, isPlaying && !isCinema, heroWindow);

  useEffect(() => {
    if (!isPlaying) return;

    const timeout = setTimeout(() => setIsCaptionVisible(false), CAPTION_VISIBLE_MS);
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  const handleToggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);
    // Звук включают, чтобы смотреть: титры в этот момент только мешают.
    if (!nextMuted) setIsCaptionVisible(false);
    if (!video) return;

    video.muted = nextMuted;
    if (video.paused) {
      setIsPaused(false);
      void video.play().catch(() => {
        /* браузер вправе отказать */
      });
    }
  };

  const closeCinema = () => {
    const video = videoRef.current;
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    inFullscreenRef.current = false;
    setIsCinema(false);
    setIsMuted(true);
    if (video) video.muted = true;
    fullscreenButtonRef.current?.focus({ preventScroll: true });
  };

  const handleOpenFullscreen = async () => {
    const video = videoRef.current as FullscreenCapableVideoElement | null;
    const hero = heroRef.current as FullscreenCapableElement | null;

    if (!video) return;

    // Кинозал — там, где элемент можно развернуть на весь экран (компьютер,
    // Android). На iPhone — системный плеер, как раньше.
    if (hero && document.fullscreenEnabled && typeof hero.requestFullscreen === "function") {
      setIsCinema(true);
      setIsPaused(false);
      setIsCaptionVisible(false);
      setIsMuted(false);
      video.muted = false;
      video.currentTime = heroWindow.start;
      void video.play().catch(() => {
        /* браузер вправе отказать */
      });
      try {
        await hero.requestFullscreen();
        inFullscreenRef.current = true;
        // Телефон в кинозале — боком: ролик широкий. Где нельзя — не страшно.
        const orientation = screen.orientation as ScreenOrientation & { lock?: (value: string) => Promise<void> };
        void orientation?.lock?.("landscape").catch(() => {});
      } catch {
        /* без полного экрана кинозал просто закрывает окно браузера */
      }
      return;
    }

    if (video.paused) {
      setIsPaused(false);
      try {
        await video.play();
      } catch {
        /* игнорируем */
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
      /* браузер вправе отказать в полноэкранном режиме */
    }
  };

  const onCinemaEvent = useEffectEvent((event: Event) => {
    const video = videoRef.current;
    if (event.type === "fullscreenchange") {
      if (inFullscreenRef.current && !document.fullscreenElement) closeCinema();
      return;
    }
    if (event.type === "timeupdate") {
      if (video && video.currentTime >= heroWindow.end - 0.1) closeCinema();
      return;
    }
    const key = event as KeyboardEvent;
    if (key.key === "Escape") {
      closeCinema();
    } else if (key.key === " " && !(key.target as HTMLElement | null)?.closest("button")) {
      key.preventDefault();
      setIsPaused((value) => !value);
    } else if (video && (key.key === "ArrowLeft" || key.key === "ArrowRight")) {
      const shift = key.key === "ArrowLeft" ? -5 : 5;
      video.currentTime = Math.min(heroWindow.end - 0.2, Math.max(heroWindow.start, video.currentTime + shift));
    }
  });

  // Пока открыт кинозал: страница под ним не прокручивается, Esc и пробел
  // работают, конец ролика и выход из полного экрана закрывают кинозал.
  useEffect(() => {
    if (!isCinema) return;
    const video = videoRef.current;
    const root = document.documentElement;
    const { overflow, scrollbarGutter } = root.style;
    root.style.overflow = "hidden";
    // Место под полосу прокрутки на время сеанса не нужно — иначе справа
    // у кинозала оставалась бы полоска страницы.
    root.style.scrollbarGutter = "auto";
    const listener = (event: Event) => onCinemaEvent(event);
    document.addEventListener("fullscreenchange", listener);
    window.addEventListener("keydown", listener);
    video?.addEventListener("timeupdate", listener);
    return () => {
      root.style.overflow = overflow;
      root.style.scrollbarGutter = scrollbarGutter;
      document.removeEventListener("fullscreenchange", listener);
      window.removeEventListener("keydown", listener);
      video?.removeEventListener("timeupdate", listener);
    };
  }, [isCinema]);

  return (
    <section ref={heroRef} className="screen" data-lane="off" data-cinema={isCinema || undefined}>
      <StudioPlayer
        source={heroMedia}
        label={title}
        mode="ambient"
        priority
        objectFit="cover"
        // Именно h-full w-full, а не absolute inset-0: корень плеера сам
        // объявлен relative, и два position-класса на одном элементе
        // схлопывали высоту в ноль.
        className="screen__media h-full w-full"
        videoRef={videoRef}
        onPlayingChange={setIsPlaying}
        paused={isPaused}
      />

      <div className="screen__shade" aria-hidden />

      <div className="screen__caption">
        <div className="wrap">
          <div className={clsx("transition-opacity duration-700", !isCaptionVisible && "pointer-events-none opacity-0")}>
            <HeadingTag className="display display--hero screen__title screen__title--name">{title}</HeadingTag>
          </div>

          <div className="screen__foot">
            <dl
              className={clsx(
                "billing transition-opacity duration-700",
                !isCaptionVisible && "pointer-events-none opacity-0",
              )}
            >
              {credits.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            {isPlaying ? (
              <div className="screen__controls">
                <button
                  type="button"
                  onClick={() => setIsPaused((value) => !value)}
                  className="screen-control"
                  aria-label={isPaused ? playLabel : pauseLabel}
                >
                  {isPaused ? (
                    <Play className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  ) : (
                    <Pause className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  )}
                  <span className="hidden sm:inline">{isPaused ? playLabel : pauseLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="screen-control"
                  aria-pressed={!isMuted}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  ) : (
                    <Volume2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  )}
                  {isMuted ? muteLabel : unmuteLabel}
                </button>
                <button ref={fullscreenButtonRef} type="button" onClick={handleOpenFullscreen} className="screen-control" aria-label={fullscreenLabel}>
                  <Maximize2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  <span className="hidden sm:inline">{fullscreenLabel}</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="screen-mask" aria-hidden />

      {isCinema ? (
        <HeroCinema
          videoRef={videoRef}
          title={cinemaLabel}
          isPaused={isPaused}
          isMuted={isMuted}
          onTogglePause={() => setIsPaused((value) => !value)}
          onToggleMute={handleToggleMute}
          onClose={closeCinema}
          labels={{ pause: pauseLabel, play: playLabel, mute: muteLabel, unmute: unmuteLabel, close: closeLabel }}
        />
      ) : null}
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, type AnimationEvent, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import StudioPlayer from "@/components/StudioPlayer";
import { useLoopWindow } from "@/components/useLoopWindow";
import { heroMedia, heroWindow, reelTitle, sectionReels, type SectionKey } from "@/lib/media";

type Fact = { label: string; value: string };

type SectionHeroProps = {
  section: SectionKey;
  title: string;
  lead: string;
  facts: Fact[];
  /** Сколько секунд держим один ролик, прежде чем перейти к следующему. */
  hold?: number;
  railLabel?: string;
  locale?: "ru" | "en";
};

/**
 * Первый экран раздела — тот же плеер, что на главной, только с роликами
 * этого раздела. Ролики сменяют друг друга; переключатель — номер с
 * линией, которая дорастает за время показа.
 *
 * Пока у раздела нет своих файлов, играет общий шоурил (так решает сам
 * StudioPlayer для элементов с placeholder). Перелистывать заглушки
 * бессмысленно: каждая смена перезапускала бы шоурил с начала. Поэтому
 * переключатель появляется, только когда настоящих роликов два и больше.
 *
 * Часы смены — сама линия под номером: CSS-анимация длиной в показ.
 * Она стоит, пока ролик не заиграл, пока первый экран прокручен или
 * вкладка свёрнута, и смена наступает по её концу. Так на медленной
 * сети ролик не сменяется раньше, чем его успели увидеть, а за экраном
 * не качаются следующие файлы.
 */
export default function SectionHero({
  section,
  title,
  lead,
  facts,
  hold = 11,
  railLabel = "Ролики раздела",
  locale = "ru",
}: SectionHeroProps) {
  const items = sectionReels[section];
  const playable = items.filter((item) => !item.placeholder);
  const list = playable.length > 0 ? playable : items.slice(0, 1);
  const canCycle = playable.length > 1;

  const [index, setIndex] = useState(0);
  // Ручной выбор останавливает автосмену: если человек выбрал ролик,
  // увозить его через десять секунд — грубость.
  const [isAuto, setIsAuto] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageShown, setPageShown] = useState(true);
  /** Пауза кнопкой: и ролик стоит, и смена роликов. */
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Своего ролика нет — играет шоурил, и ему нужны те же границы без
  // белых заставок, что и на главной.
  const playsShowreel = !list[index] || Boolean(list[index]?.placeholder);
  useLoopWindow(videoRef, isPlaying && playsShowreel, heroWindow);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !canCycle) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(section);
    const onVisibility = () => setPageShown(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [canCycle]);

  // Ручной выбор — линия просто дорастает за четверть секунды.
  const isRunning = !isAuto || (isPlaying && inView && pageShown && !isPaused);

  const handleShown = (event: AnimationEvent<HTMLButtonElement>, itemIndex: number) => {
    if (event.animationName !== "chip-fill" || !isAuto || itemIndex !== index) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIndex((current) => (current + 1) % list.length);
  };

  const active = list[index];

  return (
    <section ref={sectionRef} className="screen" data-lane="off">
      {active ? (
        // key пересобирает плеер на смене ролика: иначе останется старый src.
        <StudioPlayer
          key={active.id}
          source={active.source}
          label={active.title}
          placeholder={active.placeholder}
          mode="ambient"
          priority
          className="h-full w-full"
          videoRef={videoRef}
          onPlayingChange={setIsPlaying}
          paused={isPaused}
        />
      ) : (
        <StudioPlayer
          source={heroMedia}
          label={title}
          mode="ambient"
          priority
          className="h-full w-full"
          videoRef={videoRef}
          onPlayingChange={setIsPlaying}
          paused={isPaused}
        />
      )}

      <div className="screen__shade screen__shade--caption" aria-hidden />

      <div className="screen__caption">
        <div className="wrap">
          <h1 className="display display--h1 screen__title">{title}</h1>
          <p className="screen__lead">{lead}</p>

          <div className="screen__foot">
            <dl className="billing">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd className="num">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="screen__reels">
              {canCycle ? (
                <ul className="reel-rail" aria-label={railLabel} data-running={isRunning}>
                  {list.map((item, itemIndex) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="reel-chip"
                        aria-current={itemIndex === index}
                        aria-label={reelTitle(item, locale)}
                        onClick={() => {
                          // Выбрали ролик — значит, хотят смотреть: пауза снимается.
                          setIsAuto(false);
                          setIsPaused(false);
                          setIndex(itemIndex);
                        }}
                        onAnimationEnd={(event) => handleShown(event, itemIndex)}
                        style={
                          {
                            // Линия едет ровно столько, сколько идёт ролик.
                            "--chip-dur": itemIndex === index && isAuto ? `${hold}s` : "0.25s",
                          } as CSSProperties
                        }
                      >
                        {String(itemIndex + 1).padStart(2, "0")}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Ролик играет сам — остановить его должно быть можно. */}
              <button
                type="button"
                className="screen-control screen-control--icon"
                onClick={() => setIsPaused((value) => !value)}
                aria-label={isPaused ? (locale === "en" ? "Play" : "Смотреть") : locale === "en" ? "Pause" : "Пауза"}
              >
                {isPaused ? (
                  <Play className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                ) : (
                  <Pause className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="screen-mask" aria-hidden />
    </section>
  );
}

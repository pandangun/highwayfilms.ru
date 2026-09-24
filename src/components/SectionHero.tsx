"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Своего ролика нет — играет шоурил, и ему нужны те же границы без
  // белых заставок, что и на главной.
  const playsShowreel = !list[index] || Boolean(list[index]?.placeholder);
  useLoopWindow(videoRef, isPlaying && playsShowreel, heroWindow);

  useEffect(() => {
    if (!canCycle || !isAuto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % list.length), hold * 1000);
    return () => window.clearTimeout(timer);
  }, [index, isAuto, hold, canCycle, list.length]);

  const active = list[index];

  return (
    <section className="screen" data-lane="off">
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
        />
      )}

      <div className="screen__shade" aria-hidden />

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

            {canCycle ? (
              <ul className="reel-rail" aria-label={railLabel}>
                {list.map((item, itemIndex) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="reel-chip"
                      aria-current={itemIndex === index}
                      aria-label={reelTitle(item, locale)}
                      onClick={() => {
                        setIsAuto(false);
                        setIndex(itemIndex);
                      }}
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
          </div>
        </div>
      </div>

      <div className="screen-mask" aria-hidden />
    </section>
  );
}

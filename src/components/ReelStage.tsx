"use client";

import { useEffect, useState } from "react";
import StudioPlayer from "@/components/StudioPlayer";
import { sectionReels, type SectionKey } from "@/lib/media";

type ReelStageProps = {
  section: SectionKey;
  eyebrow: string;
  /** Сколько секунд держим один ролик, прежде чем перейти к следующему. */
  hold?: number;
};

/**
 * Экран-плеер: один кадр во всю ширину, ролики раздела сменяют друг друга.
 *
 * Отличие от ReelSection mode="catalog" — там сетка из четырёх плиток,
 * каждая размером с почтовую марку, и ни одна не играет, пока по ней не
 * ткнули. Для раздела, где смотреть нечего кроме картинки, это худший из
 * возможных способов её показать.
 *
 * Здесь наоборот: играет всегда один и всегда большой. Переключатель —
 * подчёркивание, которое дорастает до конца за время показа, поэтому
 * индикатор прогресса не нужен отдельно, он же и есть кнопка.
 */
export default function ReelStage({ section, eyebrow, hold = 11 }: ReelStageProps) {
  const items = sectionReels[section];
  const [index, setIndex] = useState(0);
  // Ручной выбор останавливает автосмену: если человек ткнул в конкретный
  // ролик, увозить его через десять секунд — грубость.
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % items.length),
      hold * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [index, isAuto, hold, items.length]);

  if (items.length === 0) return null;

  const active = items[index];

  return (
    <section className="reel-stage">
      <div className="reel-stage__media">
        {/* key заставляет плеер пересобраться на смене ролика: иначе
            останется старый src и висящий IntersectionObserver. */}
        <StudioPlayer
          key={active.id}
          source={active.source}
          label={active.title}
          placeholder={active.placeholder}
          mode="ambient"
          className="h-full w-full"
        />
      </div>

      <div className="reel-stage__ui on-dark">
        <div className="container reel-stage__bar">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <p className="reel-stage__title font-display">{active.title}</p>
          </div>

          <ul className="reel-stage__rail">
            {items.map((item, itemIndex) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="reel-stage__chip"
                  aria-current={itemIndex === index}
                  aria-label={item.title}
                  onClick={() => {
                    setIsAuto(false);
                    setIndex(itemIndex);
                  }}
                  style={
                    {
                      // Подчёркивание едет ровно столько, сколько играет
                      // ролик. У неактивных — мгновенный откат в ноль.
                      "--chip-dur": itemIndex === index && isAuto ? `${hold}s` : "0.25s",
                    } as React.CSSProperties
                  }
                >
                  {String(itemIndex + 1).padStart(2, "0")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

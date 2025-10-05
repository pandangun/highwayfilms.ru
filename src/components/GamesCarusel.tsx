// src/components/site/GamesCarousel.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type Item = { title: string; desc: string; href: string; badge?: string };
type Props = { items: Item[] };

export default function GamesCarousel({ items }: Props) {
  const N = items.length;
  const step = 360 / N;
  const [idx, setIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // глубина сцены — можно подстроить под вкус
  const radius = 420;

  const go = (next: number) => setIdx((i) => (next + N) % N);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // стрелки на клавиатуре
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, N]);

  // свайп/drag
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let x0 = 0;
    let dragging = false;

    const down = (e: PointerEvent) => {
      dragging = true;
      x0 = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - x0;
      el.style.setProperty("--drag-deg", String(dx / 8));
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      const dx = e.clientX - x0;
      el.style.setProperty("--drag-deg", "0");
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [idx]);

  const cards = useMemo(
    () =>
      items.map((it, i) => {
        const baseRot = (i - idx) * step;
        const zIndex = i === idx ? 40 : 30 - Math.abs(((i - idx + N) % N) - N / 2);
        const opacity =
          i === idx ? 1 : Math.max(0.35, 1 - Math.min(1, Math.abs(baseRot) / 120));
        const scale = i === idx ? 1 : 0.92;

        const style: React.CSSProperties = {
          transform: `rotateY(${baseRot}deg) translateZ(${radius}px) scale(${scale})`,
          zIndex,
          opacity,
          transition:
            "transform .6s cubic-bezier(.22,.9,.22,1), opacity .4s ease",
        };

        return { it, i, style };
      }),
    [items, idx, radius, step, N]
  );

  return (
    <div className="relative">
      {/* управление */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button className="btn" onClick={prev} aria-label="Предыдущая игра">←</button>
        <div className="text-sm text-muted">{idx + 1} / {N}</div>
        <button className="btn" onClick={next} aria-label="Следующая игра">→</button>
      </div>

      {/* сцена */}
      <div
        ref={wrapRef}
        className={clsx(
          "relative mx-auto",
          "w-full max-w-[980px] h-[420px]",
          "rounded-[18px] border border-base",
          "bg-[radial-gradient(1200px_280px_at_0%_0%,rgba(124,58,237,.08),transparent_60%),radial-gradient(900px_220px_at_100%_100%,rgba(34,197,94,.08),transparent_60%),rgba(255,255,255,.02)]"
        )}
        style={
          {
            perspective: "1200px",
            transformStyle: "preserve-3d",
            rotate: "y calc(var(--drag-deg, 0) * 1deg)",
            overflow: "hidden",
          } as React.CSSProperties
        }
        aria-roledescription="3D карусель игр"
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform .6s cubic-bezier(.22,.9,.22,1)",
            transform: `translateZ(-${radius}px) rotateY(${-idx * step}deg)`,
          }}
        >
          {cards.map(({ it, i, style }) => (
            <article
              key={i}
              className={clsx(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[86%] max-w-[760px] h-[320px]",
                "card p-6 md:p-8 flex flex-col"
              )}
              style={style}
              aria-hidden={i !== idx}
              onClick={() => (i !== idx ? setIdx(i) : null)}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">{it.title}</h3>
                {it.badge && (
                  <span className="rounded-md px-2 py-0.5 text-xs bg-white/10 border border-base">
                    {it.badge}
                  </span>
                )}
              </div>

              <p className="mt-3 text-muted">{it.desc}</p>

              <div className="mt-auto flex items-center gap-3">
                <Link href={it.href} className="btn btn-primary">
                  Играть
                </Link>
                <button
                  type="button"
                  className="btn"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Вперёд"
                >
                  Дальше →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* индикаторы */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Показать карточку ${i + 1}`}
            className={clsx(
              "h-2.5 w-2.5 rounded-full border border-base",
              i === idx ? "bg-white/70" : "bg-white/10 hover:bg-white/20"
            )}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}

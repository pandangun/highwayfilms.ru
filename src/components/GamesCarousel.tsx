"use client";

import Link from "next/link";
import { useRef } from "react";

export type GameCard = {
  title: string;
  desc: string;
  href: string;
  badge?: string;
};

interface GamesCarouselProps {
  items: GameCard[];
  title?: string;
}

export default function GamesCarousel({ items, title = "Игры" }: GamesCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    const node = viewportRef.current;
    if (!node) return;
    const delta = direction === "next" ? node.clientWidth : -node.clientWidth;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  const hasControls = items.length > 1;

  return (
    <section aria-label={title} className="relative">
      {hasControls && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scroll("prev")}
            className="pointer-events-auto hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
            aria-label="Прокрутить назад"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll("next")}
            className="pointer-events-auto hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
            aria-label="Прокрутить вперёд"
          >
            ›
          </button>
        </div>
      )}

      <div
        ref={viewportRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-4 pr-6 md:pr-1"
      >
        {items.map((item) => (
          <article
            key={item.href}
            className="snap-center w-[280px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/25 hover:bg-white/8 md:w-[320px]"
          >
            <header className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              {item.badge && (
                <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-xs uppercase tracking-wide text-white/80">
                  {item.badge}
                </span>
              )}
            </header>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
            <Link
              href={item.href}
              className="btn btn-primary mt-5 w-full justify-center"
              prefetch={false}
            >
              Открыть игру
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

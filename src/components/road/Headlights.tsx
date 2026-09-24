"use client";

import { useEffect } from "react";

/**
 * Фары: там, где на странице чёрный фон, курсор светит, как фара, и
 * проявляет мокрый асфальт. Работает в секциях с классом .lit и только
 * на устройствах с мышью. Стоит копейки: на движение мыши меняются две
 * CSS-переменные у одной секции, остальное делает маска в CSS.
 */
export default function Headlights() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current: HTMLElement | null = null;
    let raf = 0;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      const event = lastEvent;
      if (!event) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>(".lit") ?? null;
      if (target !== current) {
        current?.classList.remove("is-lit");
        current = target;
        current?.classList.add("is-lit");
      }
      if (current) {
        const rect = current.getBoundingClientRect();
        current.style.setProperty("--lx", `${event.clientX - rect.left}px`);
        current.style.setProperty("--ly", `${event.clientY - rect.top}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      current?.classList.remove("is-lit");
      current = null;
    };

    // Страница едет под неподвижным курсором — свет должен остаться под ним.
    const onScroll = () => {
      if (lastEvent && !raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}

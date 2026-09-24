"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Кадр финала: дорога уходит к огням города. Пока финал въезжает в экран,
 * кадр медленно наезжает — как камера, которая доезжает до города. Мышь
 * чуть поворачивает взгляд.
 */
export default function FinaleImage({ src, alt }: { src: string; alt: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const layer = layerRef.current;
    if (!box || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    let aimX = 0;
    let aimY = 0;
    let x = 0;
    let y = 0;
    let visible = false;
    let raf = 0;

    const tick = () => {
      raf = 0;
      if (!visible) return;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 — финал только показался снизу, 1 — дошёл до верха экрана.
      const arrive = Math.min(1, Math.max(0, (vh - rect.top) / vh));
      const scale = 1.18 - arrive * 0.12;
      x += (aimX - x) * 0.06;
      y += (aimY - y) * 0.06;
      layer.style.transform = `translate3d(${(-x * 3).toFixed(3)}%, ${(-y * 2).toFixed(3)}%, 0) scale(${scale.toFixed(4)})`;
      if (Math.abs(aimX - x) > 0.001 || Math.abs(aimY - y) > 0.001) raf = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (visible && !raf) raf = requestAnimationFrame(tick);
    };
    const onPointer = (event: PointerEvent) => {
      aimX = event.clientX / window.innerWidth - 0.5;
      aimY = event.clientY / window.innerHeight - 0.5;
      schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(box);
    window.addEventListener("scroll", schedule, { passive: true });
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={boxRef} className="finale__image">
      <div ref={layerRef} className="finale__layer">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}

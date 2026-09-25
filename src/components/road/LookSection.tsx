"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

/**
 * «Взгляд» — вид с эстакады на ночную трассу. Мышь поворачивает кадр:
 * картинка чуть больше экрана и смещается за курсором с инерцией, как
 * голова водителя. На телефоне то же делает наклон, а без датчика кадр
 * медленно плывёт сам.
 */
export default function LookSection({
  image,
  alt,
  title,
  lead,
  km,
}: {
  image: string;
  alt: string;
  title: string;
  lead?: string;
  km?: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let aimX = 0;
    let aimY = 0;
    let x = 0;
    let y = 0;
    let visible = false;
    let raf = 0;
    let tilted = false;
    const start = performance.now();

    const onPointer = (event: PointerEvent) => {
      aimX = event.clientX / window.innerWidth - 0.5;
      aimY = event.clientY / window.innerHeight - 0.5;
    };
    const onTilt = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;
      tilted = true;
      aimX = Math.max(-0.5, Math.min(0.5, event.gamma / 45));
      aimY = Math.max(-0.5, Math.min(0.5, (event.beta - 50) / 70));
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const time = (now - start) / 1000;
      // Без мыши и датчика кадр медленно «оглядывается» сам.
      const driftX = coarse && !tilted ? Math.sin(time * 0.18) * 0.35 : 0;
      x += (aimX + driftX - x) * 0.05;
      y += (aimY - y) * 0.05;
      // Сдвиг в процентах от лишних краёв картинки (scale 1.16).
      layer.style.transform = `translate3d(${(-x * 11).toFixed(3)}%, ${(-y * 5).toFixed(3)}%, 0) scale(1.16)`;
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    observer.observe(section);

    if (coarse) window.addEventListener("deviceorientation", onTilt);
    else window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);

  return (
    <section ref={sectionRef} className="look" data-lane="off">
      <div ref={layerRef} className="look__layer">
        {/* Сразу, но без спешки: см. постеры в ReelBand. */}
        <Image src={image} alt={alt} fill sizes="120vw" loading="eager" fetchPriority="low" className="object-cover" />
      </div>
      <div className="look__shade" aria-hidden />
      <div className="look__caption wrap">
        {km}
        <h2 className="display display--h1 max-w-[12ch]">{title}</h2>
        {lead ? <p className="lead mt-6">{lead}</p> : null}
      </div>
    </section>
  );
}

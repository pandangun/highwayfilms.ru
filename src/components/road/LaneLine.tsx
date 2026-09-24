"use client";

import { useEffect, useRef } from "react";

/** Длина М-11 «Нева» от МКАД до КАД: страница — поездка из Москвы в Петербург. */
export const ROUTE_KM = 684;

/**
 * Дорожная разметка через всю страницу.
 *
 * Пунктир стоит у левого края и бежит быстрее прокрутки — как разметка
 * под колёсами. Внизу у линии спидометр: сколько километров трассы
 * «проехано» до этого места страницы. Над сценами на весь экран (шоурил,
 * дорога, взгляд) линия гаснет: там своя разметка или своё кино.
 * Заканчивается там, где начинается финал.
 */
export default function LaneLine({ lang }: { lang: "ru" | "en" }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const km = kmRef.current;
    if (!line || !km) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const y = window.scrollY;

      line.style.setProperty("--lane-offset", `${(y * 1.6) % 96}px`);
      km.textContent = String(Math.round((y / max) * ROUTE_KM));

      let cover = 0;
      document.querySelectorAll<HTMLElement>("[data-lane='off']").forEach((el) => {
        const r = el.getBoundingClientRect();
        const overlap = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (overlap > 0) cover = Math.max(cover, overlap / vh);
      });
      line.dataset.hidden = cover > 0.55 ? "true" : "false";

      const finale = document.querySelector<HTMLElement>(".finale");
      const top = finale ? finale.getBoundingClientRect().top : vh;
      line.style.setProperty("--lane-end", `${Math.max(0, vh - top)}px`);
      // Разметка подвала едет, пока подвал на экране, и встаёт вместе
      // с прокруткой. 72 px — шаг штриха в road.css.
      if (finale && top < vh) finale.style.setProperty("--road-shift", `${(y * 0.8) % 72}px`);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={lineRef} className="lane" aria-hidden data-hidden="true">
      <span className="lane__km">
        {lang === "en" ? "km " : "км "}
        <span ref={kmRef}>0</span>
      </span>
    </div>
  );
}

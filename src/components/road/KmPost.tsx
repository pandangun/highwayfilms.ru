"use client";

import { useEffect, useRef } from "react";
import { ROUTE_KM } from "@/components/road/LaneLine";

type Post = { el: HTMLElement; num: HTMLElement };

/**
 * Все столбы страницы пересчитываются вместе, раз в кадр: один
 * ResizeObserver на всех, сначала замеры, потом записи. Когда у каждого
 * столба был свой наблюдатель, запись числа в одном столбе заставляла
 * браузер заново раскладывать страницу перед замером следующего — и так
 * при каждом изменении высоты страницы, пока она грузится.
 */
const posts = new Set<Post>();
let observer: ResizeObserver | null = null;
let frame = 0;

function measure() {
  frame = 0;
  const list = [...posts];
  const vh = window.innerHeight;
  const y = window.scrollY;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  const values = list.map(({ el }) => {
    const top = el.getBoundingClientRect().top + y - vh * 0.2;
    return String(Math.round((Math.min(max, Math.max(0, top)) / max) * ROUTE_KM));
  });
  list.forEach(({ num }, index) => {
    if (num.textContent !== values[index]) num.textContent = values[index];
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure);
}

/**
 * Километровый столб раздела. Число — то же, что покажет спидометр у
 * разметки, когда раздел доедет до верха экрана: считается по месту
 * раздела на странице, поэтому столбы и спидометр не расходятся.
 */
export default function KmPost({ lang = "ru", label }: { lang?: "ru" | "en"; label?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const num = numRef.current;
    if (!el || !num) return;

    const post = { el, num };
    posts.add(post);
    if (!observer) {
      observer = new ResizeObserver(schedule);
      observer.observe(document.body);
    }
    schedule();

    return () => {
      posts.delete(post);
      if (posts.size === 0 && observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, []);

  return (
    <p ref={ref} className="km">
      {lang === "en" ? "km " : "км "}
      <span ref={numRef} />
      {label ? `, ${label}` : null}
    </p>
  );
}

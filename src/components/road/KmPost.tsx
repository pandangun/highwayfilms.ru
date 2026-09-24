"use client";

import { useEffect, useRef } from "react";
import { ROUTE_KM } from "@/components/road/LaneLine";

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
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2;
      num.textContent = String(Math.round((Math.min(max, Math.max(0, top)) / max) * ROUTE_KM));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className="km">
      {lang === "en" ? "km " : "км "}
      <span ref={numRef} />
      {label ? `, ${label}` : null}
    </p>
  );
}

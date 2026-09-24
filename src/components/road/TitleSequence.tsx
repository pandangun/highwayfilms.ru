"use client";

import { useCallback, useEffect, useRef } from "react";
import RoadScene, { type RoadFrame } from "@/components/road/RoadScene";

type Vec3 = [number, number, number];

const LENGTH = 480;
/** Расстояние между титрами на дороге, метры. */
const SPACING = 84;
/** Базовый кегль титров в CSS. Экранный размер задаёт scale. */
const BASE_PX = 200;
/** Высота букв титра в «метрах» мира. */
const LETTER_M = 1.6;
const EYE_Y = 1.3;
const CREDIT_Y = 1.5;

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
/** smoothstep, в котором край может идти и по убыванию. */
const ramp = (from: number, to: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

/**
 * Вступление после шоурила — поездка по ночной трассе.
 *
 * Секция в три экрана высотой, сцена внутри прилипает к окну. Прокрутка
 * ведёт машину вперёд, и названия направлений летят навстречу из глубины
 * дороги, как титры «Шоссе в никуда» Линча. В конце проявляется главная
 * фраза. Титры стоят в мире сцены, поэтому поворот взгляда мышью сдвигает
 * их вместе с дорогой.
 */
export default function TitleSequence({
  credits,
  title,
  lead,
}: {
  credits: string[];
  title: string;
  lead: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const creditRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      progressRef.current = Math.min(1, Math.max(0, -rect.top / travel));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onFrame = useCallback(
    (f: RoadFrame) => {
      const cy = Math.cos(f.yaw);
      const sy = Math.sin(f.yaw);
      const cp = Math.cos(f.pitch);
      const sp = Math.sin(f.pitch);
      const fw: Vec3 = [sy * cp, sp, cy * cp];
      const rt: Vec3 = [cy, 0, -sy];
      const up = cross(fw, rt);

      credits.forEach((_, index) => {
        const el = creditRefs.current[index];
        if (!el) return;
        const worldZ = 50 + index * SPACING;
        // Титр висит над средней полосой чуть выше глаз водителя.
        const d: Vec3 = [-f.sway, CREDIT_Y - EYE_Y, worldZ - f.z];
        const zc = dot(d, fw);
        if (zc < 2.2 || zc > SPACING + 2.2) {
          el.style.opacity = "0";
          return;
        }
        const x = f.width / 2 + (dot(d, rt) / zc) * f.focal;
        const y = f.height / 2 - (dot(d, up) / zc) * f.focal;
        const scale = ((LETTER_M / zc) * f.focal) / BASE_PX;
        // Титры идут по одному: следующий проявляется, только когда
        // предыдущий уже пролетел мимо камеры.
        const opacity = ramp(SPACING + 2.2, SPACING - 30, zc) * ramp(2.2, 11, zc);
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)}) translate(-50%, -50%)`;
      });

      const card = titleRef.current;
      if (card) {
        const shown = ramp(0.8, 0.94, progressRef.current);
        card.style.opacity = shown.toFixed(3);
        card.style.transform = `translate3d(0, ${((1 - shown) * 28).toFixed(1)}px, 0)`;
      }
    },
    [credits],
  );

  return (
    <section ref={sectionRef} className="drive" data-lane="off">
      <div className="drive__stage">
        <RoadScene mode="drive" progressRef={progressRef} length={LENGTH} onFrame={onFrame} />
        <div className="drive__credits" aria-hidden>
          {credits.map((credit, index) => (
            <span
              key={credit}
              ref={(node) => {
                creditRefs.current[index] = node;
              }}
              className="drive__credit"
            >
              {credit}
            </span>
          ))}
        </div>
        <div ref={titleRef} className="drive__title">
          <div className="wrap title-card">
            <h2 className="display display--h2 mx-auto max-w-[18ch]">{title}</h2>
            <p className="lead mt-8">{lead}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import RoadScene, { type RoadFrame } from "@/components/road/RoadScene";
import type { RoadSign } from "@/content/home";

type Vec3 = [number, number, number];

/** Сколько метров трассы приходится на всю прокрутку секции. */
const LENGTH = 560;
/** Где стоит первый портал и шаг между порталами, метры. */
const FIRST = 70;
const SPACING = 74;
const EYE_Y = 1.3;
/** Центр щита над дорогой, метры: порталы высокие, как на М-11. */
const SIGN_Y = 6.4;
/** С какой дистанции щит начинает проступать из темноты. */
const FAR = 170;

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
 * Секция в несколько экранов высотой, сцена внутри прилипает к окну.
 * Прокрутка ведёт машину вперёд, над дорогой один за другим подлетают
 * синие щиты на порталах — преимущества студии. Щит проступает из
 * темноты, растёт, его высвечивают фары, и он уходит над головой.
 * Щиты стоят в мире сцены, поэтому поворот взгляда мышью сдвигает их
 * вместе с дорогой. В конце проявляется главная фраза.
 *
 * Размеры щита — в «метрах»: ширина 12 м (на телефоне 9 м, текст
 * крупнее), базовая ширина в CSS 1000 и 700 px. Порталы — по краям
 * дороги, в CSS их считают через --m (пикселей на метр).
 */
export default function TitleSequence({
  signs,
  title,
  lead,
}: {
  signs: RoadSign[];
  title: string;
  lead: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const signRefs = useRef<Array<HTMLLIElement | null>>([]);
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

      const narrow = f.width < 700;
      const signM = narrow ? 9 : 12;
      const baseW = narrow ? 700 : 1000;

      signs.forEach((_, index) => {
        const el = signRefs.current[index];
        if (!el) return;
        const worldZ = FIRST + index * SPACING;
        const d: Vec3 = [-f.sway, SIGN_Y - EYE_Y, worldZ - f.z];
        const zc = dot(d, fw);
        if (zc < 2.5 || zc > FAR) {
          el.style.opacity = "0";
          return;
        }
        const x = f.width / 2 + (dot(d, rt) / zc) * f.focal;
        const y = f.height / 2 - (dot(d, up) / zc) * f.focal;
        const scale = ((signM / zc) * f.focal) / baseW;
        const opacity = ramp(FAR, FAR - 50, zc) * ramp(3, 12, zc);
        el.style.opacity = opacity.toFixed(3);
        // Фары: чем ближе щит, тем ярче отражает.
        el.style.setProperty("--lit", ramp(90, 22, zc).toFixed(3));
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)}) translate(-50%, -50%)`;
      });

      const card = titleRef.current;
      if (card) {
        const shown = ramp(0.84, 0.96, progressRef.current);
        card.style.opacity = shown.toFixed(3);
        card.style.transform = `translate3d(0, ${((1 - shown) * 28).toFixed(1)}px, 0)`;
      }
    },
    [signs],
  );

  return (
    <section ref={sectionRef} className="drive" data-lane="off">
      <div className="drive__stage">
        <RoadScene mode="drive" progressRef={progressRef} length={LENGTH} onFrame={onFrame} />
        <ul className="drive__signs">
          {signs.map((sign, index) => (
            <li
              key={sign.title}
              ref={(node) => {
                signRefs.current[index] = node;
              }}
              className="drive__sign"
            >
              <span className="drive__gantry" aria-hidden />
              <span className="drive__panel">
                <span className="drive__sign-title">{sign.title}</span>
                <span className="drive__sign-text">{sign.text}</span>
              </span>
            </li>
          ))}
        </ul>
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

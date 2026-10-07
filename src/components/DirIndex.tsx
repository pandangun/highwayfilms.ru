"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { allowsVideo } from "@/lib/videoSource";

export type DirIndexItem = {
  key: string;
  href: string;
  title: string;
  text: string;
  price: string;
  still: string;
  /** Три секунды движения поверх кадра — на компьютере при наведении. */
  loop?: { mp4: string; av1: string };
};

/** Зазор между кадром и строкой под ним, px. */
const GAP = 14;

/**
 * Оглавление направлений на главной: название, что снимаем, цена «от».
 *
 * На компьютере над строкой под курсором всплывает кадр направления и
 * с небольшой задержкой едет за курсором по горизонтали. Кадр висит над
 * строкой, а не на ней: строку, которую читают, он не закрывает. С
 * клавиатуры кадр встаёт над выбранной строкой. На телефоне и планшете
 * наведения нет, поэтому кадр — узкой полосой над каждой строкой.
 *
 * Кадры декоративные (alt пустой): строку описывает её название.
 *
 * Кадр оживает: при наведении поверх него проявляется трёхсекундная
 * петля того же ролика. Видео подключается при первом наведении на
 * строку, не раньше; без мыши, при экономии трафика и при просьбе
 * системы меньше двигать остаётся неподвижный кадр.
 */
export default function DirIndex({ items }: { items: DirIndexItem[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  /** Строки, чьи петли уже подключены: грузятся только после наведения. */
  const [armed, setArmed] = useState<Record<string, true>>({});
  const loopsAllowed = useRef<boolean | null>(null);

  // Куда тянется кадр (aim) и где он сейчас (at), в координатах списка.
  const aim = useRef({ x: 0, y: 0 });
  const at = useRef({ x: 0, y: 0 });
  const pointerX = useRef<number | null>(null);
  /** Строка, над которой висит кадр. */
  const rowRef = useRef<HTMLElement | null>(null);
  const frame = useRef(0);
  const snap = useRef(true);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Играет только петля под курсором, остальные стоят.
  useEffect(() => {
    const videos = peekRef.current?.querySelectorAll<HTMLVideoElement>("video[data-index]");
    videos?.forEach((video) => {
      if (Number(video.dataset.index) === active) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, armed]);

  const arm = (item: DirIndexItem) => {
    if (!item.loop || armed[item.key]) return;
    loopsAllowed.current ??= window.matchMedia("(hover: hover) and (pointer: fine)").matches && allowsVideo({ ambient: true });
    if (loopsAllowed.current) setArmed((current) => ({ ...current, [item.key]: true }));
  };

  const place = () => {
    const peek = peekRef.current;
    if (!peek) return;
    peek.style.transform = `translate3d(${at.current.x.toFixed(1)}px, ${at.current.y.toFixed(1)}px, 0)`;
  };

  const run = () => {
    frame.current = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = snap.current || reduce ? 1 : 0.2;
    snap.current = false;
    at.current.x += (aim.current.x - at.current.x) * k;
    at.current.y += (aim.current.y - at.current.y) * k;
    place();
    if (Math.abs(aim.current.x - at.current.x) > 0.5 || Math.abs(aim.current.y - at.current.y) > 0.5) {
      frame.current = requestAnimationFrame(run);
    }
  };

  const schedule = () => {
    if (!frame.current) frame.current = requestAnimationFrame(run);
  };

  /** Кадр над строкой; по горизонтали — серединой у точки x, в пределах списка. */
  const aimAt = (x: number) => {
    const box = boxRef.current;
    const peek = peekRef.current;
    const row = rowRef.current;
    if (!box || !peek || !row) return;
    const w = peek.offsetWidth;
    const h = peek.offsetHeight;
    const top = row.getBoundingClientRect().top - box.getBoundingClientRect().top;
    aim.current = { x: Math.min(Math.max(x - w / 2, 0), box.clientWidth - w), y: top - h - GAP };
    schedule();
  };

  const followPointer = () => {
    const box = boxRef.current;
    if (!box || pointerX.current === null) return;
    aimAt(pointerX.current - box.getBoundingClientRect().left);
  };

  return (
    <div
      ref={boxRef}
      className="dir-index-box"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        pointerX.current = event.clientX;
        followPointer();
      }}
      onPointerLeave={() => {
        pointerX.current = null;
        snap.current = true;
        setActive(null);
      }}
    >
      <ul className="dir-index">
        {items.map((item, index) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="dir-index__row"
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                rowRef.current = event.currentTarget;
                pointerX.current = event.clientX;
                followPointer();
                setActive(index);
                arm(item);
              }}
              onFocus={(event) => {
                // С клавиатуры: кадр над серединой строки.
                const box = boxRef.current;
                if (!box) return;
                const row = event.currentTarget.getBoundingClientRect();
                rowRef.current = event.currentTarget;
                snap.current = true;
                aimAt(row.left - box.getBoundingClientRect().left + row.width * 0.5);
                setActive(index);
              }}
              onBlur={() => {
                if (pointerX.current === null) setActive(null);
              }}
            >
              <span className="dir-index__strip" aria-hidden>
                <Image src={item.still} alt="" fill sizes="100vw" loading="lazy" className="object-cover" />
              </span>
              <span className="dir-index__title">{item.title}</span>
              <span className="dir-index__text">{item.text}</span>
              <span className="dir-index__price num">{item.price}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={peekRef} className="dir-index__peek" data-on={active !== null} aria-hidden>
        {items.map((item, index) => (
          <span key={item.key} className="dir-index__shot" data-on={index === active}>
            <Image src={item.still} alt="" fill sizes="(min-width: 1725px) 500px, 29vw" loading="lazy" className="object-cover" />
            {item.loop && armed[item.key] ? (
              <video
                data-index={index}
                ref={(video) => {
                  // React не ставит muted при первом рендере, а без него нет автозапуска.
                  if (video) {
                    video.muted = true;
                    video.defaultMuted = true;
                  }
                }}
                muted
                loop
                playsInline
                autoPlay={index === active}
                preload="auto"
                disablePictureInPicture
                onPlaying={(event) => {
                  event.currentTarget.dataset.ready = "true";
                }}
              >
                <source src={item.loop.av1} type='video/mp4; codecs="av01.0.05M.08"' />
                <source src={item.loop.mp4} type="video/mp4" />
              </video>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

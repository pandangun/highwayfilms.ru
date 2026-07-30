"use client";

import { useEffect, useRef } from "react";

type GenerativeFieldProps = {
  /** Плотность зерна. Меньше — крупнее и мягче. */
  scale?: number;
  /** Скорость дрейфа. 0 — статичный кадр. */
  speed?: number;
  className?: string;
};

/**
 * Абстрактное поле-фон: медленно дрейфующие световые пятна плюс зерно.
 *
 * Canvas 2D, а не WebGL и не сцена на three.js. Причина не в лени: фон на
 * сайте студии обязан быть оправой, а не соперником кадру. Тяжёлая 3D-сцена
 * перетягивает внимание на себя и съедает кадр, ради которого человек
 * пришёл. Здесь — 60 строк, ноль зависимостей и заметно меньше расхода
 * батареи.
 *
 * Рисуем в уменьшенный буфер и растягиваем: пятна всё равно размытые,
 * а пикселей на кадр уходит в 25 раз меньше.
 */
export default function GenerativeField({
  scale = 0.2,
  speed = 1,
  className,
}: GenerativeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let time = 0;
    let visible = true;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * scale));
      canvas.height = Math.max(1, Math.floor(height * scale));
    };

    // Пятна заданы полярно: так они расходятся по кадру, а не выстраиваются
    // в сетку, и рисунок не читается как повтор.
    const blobs = [
      { r: 0.34, a: 0.0, hue: "214, 183, 138", size: 0.62, alpha: 0.3 },
      { r: 0.46, a: 2.1, hue: "124, 58, 237", size: 0.54, alpha: 0.22 },
      { r: 0.3, a: 4.2, hue: "255, 255, 255", size: 0.44, alpha: 0.1 },
    ];

    const draw = () => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);

      for (const blob of blobs) {
        const angle = blob.a + time * 0.00016 * speed;
        const cx = width * (0.5 + Math.cos(angle) * blob.r);
        const cy = height * (0.5 + Math.sin(angle * 0.8) * blob.r * 0.7);
        const radius = Math.max(width, height) * blob.size;

        const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${blob.hue}, ${blob.alpha})`);
        gradient.addColorStop(1, `rgba(${blob.hue}, 0)`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }
    };

    const loop = (now: number) => {
      time = now;
      draw();
      frame = requestAnimationFrame(loop);
    };

    resize();
    draw();

    if (!reduced) frame = requestAnimationFrame(loop);

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(parent);

    // За пределами экрана рисовать незачем — это чистый расход батареи.
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced && !frame) frame = requestAnimationFrame(loop);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    visibility.observe(parent);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
    };
  }, [scale, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

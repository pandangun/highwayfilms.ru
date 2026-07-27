"use client";

import { useEffect, useRef } from "react";
import styles from "./DarkVeil.module.css";

type DarkVeilProps = {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  resolutionScale?: number;
};

function hsla(h: number, s: number, l: number, a: number) {
  return `hsla(${h} ${s}% ${l}% / ${a})`;
}

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0.5,
  warpAmount = 0,
  resolutionScale = 0.9,
}: DarkVeilProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let ratio = 1;
    let isInViewport = true;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldAnimate = () => !reducedMotionQuery.matches && !document.hidden && isInViewport;

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      ratio = Math.max(1, Math.min(window.devicePixelRatio * resolutionScale, 1.25));

      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawBlob = (time: number, index: number) => {
      const maxSize = Math.max(width, height);
      const hue = (220 + hueShift + index * 32 + Math.sin(time * 0.18 + index) * 24 + 360) % 360;
      const x =
        width * (0.18 + index * 0.19) +
        Math.sin(time * (0.22 + index * 0.03) + index * 1.7) * (32 + warpAmount * 12);
      const y =
        height * (0.24 + (index % 2) * 0.28) +
        Math.cos(time * (0.24 + index * 0.02) + index) * (28 + warpAmount * 10);
      const radius = maxSize * (0.24 + index * 0.035 + warpAmount * 0.012);

      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, hsla(hue, 88, 66, 0.18));
      gradient.addColorStop(0.35, hsla((hue + 26) % 360, 82, 58, 0.11));
      gradient.addColorStop(0.7, hsla((hue + 54) % 360, 78, 52, 0.05));
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const drawRibbon = (time: number, index: number) => {
      const amplitude = 26 + warpAmount * 7 + index * 4;
      const y = height * (0.22 + index * 0.17);
      const hue = (250 + hueShift + index * 18 + 360) % 360;

      context.strokeStyle = hsla(hue, 76, 72, 0.08);
      context.lineWidth = 1.2 + index * 0.15;
      context.beginPath();

      for (let x = -80; x <= width + 80; x += 18) {
        const offset =
          Math.sin(x * 0.01 + time * (0.45 + index * 0.04) + index * 0.8) * amplitude +
          Math.cos(x * 0.006 - time * 0.35) * amplitude * 0.35;
        const waveY = y + offset;

        if (x === -80) context.moveTo(x, waveY);
        else context.lineTo(x, waveY);
      }

      context.stroke();
    };

    const drawScanlines = () => {
      if (scanlineIntensity <= 0) return;

      const step = Math.max(3, 8 - scanlineFrequency * 6);
      context.strokeStyle = `rgba(255,255,255,${Math.min(0.12, scanlineIntensity * 0.16)})`;
      context.lineWidth = 1;

      for (let y = 0; y < height; y += step) {
        context.beginPath();
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
        context.stroke();
      }
    };

    const drawNoise = () => {
      if (noiseIntensity <= 0) return;

      const particles = Math.floor(120 * noiseIntensity);
      for (let i = 0; i < particles; i += 1) {
        context.fillStyle = `rgba(255,255,255,${0.015 + Math.random() * 0.03 * noiseIntensity})`;
        context.fillRect(Math.random() * width, Math.random() * height, 1, 1);
      }
    };

    const drawFrame = (timestamp: number) => {
      if (width <= 0 || height <= 0) return;

      const time = (timestamp / 1000) * speed;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "rgba(4,4,6,0.96)");
      base.addColorStop(0.5, "rgba(7,8,14,0.9)");
      base.addColorStop(1, "rgba(3,3,5,0.98)");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "screen";

      for (let i = 0; i < 4; i += 1) drawBlob(time, i);
      for (let i = 0; i < 5; i += 1) drawRibbon(time, i);

      context.restore();

      const vignette = context.createRadialGradient(
        width * 0.5,
        height * 0.45,
        Math.min(width, height) * 0.18,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.72,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.38)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      drawScanlines();
      drawNoise();
    };

    const render = (timestamp: number) => {
      frameId = 0;
      drawFrame(timestamp);
      if (!shouldAnimate()) return;
      frameId = window.requestAnimationFrame(render);
    };

    const queueRender = () => {
      if (frameId !== 0 || !shouldAnimate()) return;
      frameId = window.requestAnimationFrame(render);
    };

    const stopRender = () => {
      if (frameId === 0) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const handleVisibilityChange = () => {
      if (shouldAnimate()) queueRender();
      else stopRender();
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isInViewport = entries[0]?.isIntersecting ?? true;
        if (shouldAnimate()) queueRender();
        else stopRender();
      },
      { threshold: 0.01 },
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    intersectionObserver.observe(parent);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();
    drawFrame(performance.now());
    queueRender();

    return () => {
      stopRender();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount, resolutionScale]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

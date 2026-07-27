"use client";

import { useEffect, useRef } from "react";
import styles from "./LightRays.module.css";

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
};

type AnchorSetup = {
  anchorX: number;
  anchorY: number;
  directionX: number;
  directionY: number;
};

const DEFAULT_COLOR = "#ffffff";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function hexToRgbString(hex: string, alpha: number) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) return `rgba(255,255,255,${alpha})`;

  const r = Number.parseInt(match[1], 16);
  const g = Number.parseInt(match[2], 16);
  const b = Number.parseInt(match[3], 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getAnchor(origin: RaysOrigin, width: number, height: number): AnchorSetup {
  const offsetW = width * 0.18;
  const offsetH = height * 0.18;

  switch (origin) {
    case "top-left":
      return { anchorX: width * 0.08, anchorY: -offsetH, directionX: 0.12, directionY: 1 };
    case "top-right":
      return { anchorX: width * 0.92, anchorY: -offsetH, directionX: -0.12, directionY: 1 };
    case "left":
      return { anchorX: -offsetW, anchorY: height * 0.5, directionX: 1, directionY: 0 };
    case "right":
      return { anchorX: width + offsetW, anchorY: height * 0.5, directionX: -1, directionY: 0 };
    case "bottom-left":
      return { anchorX: width * 0.1, anchorY: height + offsetH, directionX: 0.12, directionY: -1 };
    case "bottom-center":
      return { anchorX: width * 0.5, anchorY: height + offsetH, directionX: 0, directionY: -1 };
    case "bottom-right":
      return { anchorX: width * 0.9, anchorY: height + offsetH, directionX: -0.12, directionY: -1 };
    default:
      return { anchorX: width * 0.5, anchorY: -offsetH, directionX: 0, directionY: 1 };
  }
}

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 3,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  className = "",
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let frameId = 0;
    let isInViewport = true;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const shouldFollowPointer = followMouse && finePointerQuery.matches;
    const shouldAnimate = () => !reducedMotionQuery.matches && !document.hidden && isInViewport;

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      ratio = Math.max(1, Math.min(window.devicePixelRatio, 1.25));

      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawBeam = (
      anchorX: number,
      anchorY: number,
      endX: number,
      endY: number,
      widthFactor: number,
      alphaFactor: number,
      tintOffset: number,
    ) => {
      const dx = endX - anchorX;
      const dy = endY - anchorY;
      const beamLength = Math.hypot(dx, dy) || 1;
      const nx = -dy / beamLength;
      const ny = dx / beamLength;
      const beamWidth = width * widthFactor;

      const gradient = context.createLinearGradient(anchorX, anchorY, endX, endY);
      gradient.addColorStop(0, hexToRgbString(raysColor, 0.32 * alphaFactor * saturation));
      gradient.addColorStop(0.18, hexToRgbString(raysColor, 0.16 * alphaFactor * saturation));
      gradient.addColorStop(0.55, hexToRgbString(raysColor, 0.05 * alphaFactor * saturation));
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      context.fillStyle = gradient;
      context.beginPath();
      context.moveTo(anchorX + nx * beamWidth * 0.2, anchorY + ny * beamWidth * 0.2);
      context.lineTo(anchorX - nx * beamWidth * 0.2, anchorY - ny * beamWidth * 0.2);
      context.lineTo(endX - nx * beamWidth, endY - ny * beamWidth);
      context.lineTo(endX + nx * beamWidth, endY + ny * beamWidth);
      context.closePath();
      context.fill();

      const glow = context.createRadialGradient(endX, endY, 0, endX, endY, beamWidth * (1.8 + tintOffset));
      glow.addColorStop(0, hexToRgbString(raysColor, 0.055 * alphaFactor));
      glow.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(endX, endY, beamWidth * (1.8 + tintOffset), 0, Math.PI * 2);
      context.fill();
    };

    const drawNoise = () => {
      if (noiseAmount <= 0) return;

      const amount = Math.floor(180 * noiseAmount);
      for (let i = 0; i < amount; i += 1) {
        context.fillStyle = `rgba(255,255,255,${0.012 + Math.random() * 0.03 * noiseAmount})`;
        context.fillRect(Math.random() * width, Math.random() * height, 1, 1);
      }
    };

    const drawFrame = (timestamp: number) => {
      if (width <= 0 || height <= 0) return;

      const time = (timestamp / 1000) * raysSpeed;
      const pulse = pulsating ? 0.9 + Math.sin(time * 2.4) * 0.08 : 1;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const { anchorX, anchorY, directionX, directionY } = getAnchor(raysOrigin, width, height);

      if (shouldFollowPointer) {
        const easing = 0.92;
        smoothMouseRef.current.x = smoothMouseRef.current.x * easing + mouseRef.current.x * (1 - easing);
        smoothMouseRef.current.y = smoothMouseRef.current.y * easing + mouseRef.current.y * (1 - easing);
      }

      const mouseOffsetX = (smoothMouseRef.current.x - 0.5) * width * mouseInfluence;
      const mouseOffsetY = (smoothMouseRef.current.y - 0.5) * height * mouseInfluence;
      const maxReach = Math.max(width, height) * rayLength * fadeDistance;

      context.save();
      context.globalCompositeOperation = "screen";

      for (let i = 0; i < 7; i += 1) {
        const spread = (i - 3) * (0.12 + lightSpread * 0.18);
        const wobble = Math.sin(time * (0.6 + i * 0.07) + i * 1.4) * (14 + distortion * 26);
        const skew = Math.cos(time * (0.4 + i * 0.05) + i) * (10 + distortion * 22);

        const endX =
          anchorX +
          (directionX + spread + mouseOffsetX / Math.max(width, 1)) * maxReach +
          wobble +
          mouseOffsetX;
        const endY =
          anchorY +
          (directionY + spread * 0.18 + mouseOffsetY / Math.max(height, 1)) * maxReach +
          skew +
          mouseOffsetY * 0.4;

        drawBeam(
          anchorX,
          anchorY,
          endX,
          endY,
          (0.045 + i * 0.008) * pulse,
          clamp(0.92 - i * 0.09, 0.22, 0.92),
          i * 0.08,
        );
      }

      const topGlow = context.createRadialGradient(anchorX, anchorY, 0, anchorX, anchorY, maxReach * 0.32);
      topGlow.addColorStop(0, hexToRgbString(raysColor, 0.18 * pulse));
      topGlow.addColorStop(0.55, hexToRgbString(raysColor, 0.04));
      topGlow.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = topGlow;
      context.beginPath();
      context.arc(anchorX, anchorY, maxReach * 0.32, 0, Math.PI * 2);
      context.fill();

      context.restore();

      const fade = context.createLinearGradient(0, 0, 0, height);
      if (raysOrigin.startsWith("top")) {
        fade.addColorStop(0, "rgba(0,0,0,0)");
        fade.addColorStop(clamp(fadeDistance * 0.42, 0.2, 0.6), "rgba(0,0,0,0.15)");
        fade.addColorStop(1, "rgba(0,0,0,0.68)");
      } else if (raysOrigin.startsWith("bottom")) {
        fade.addColorStop(0, "rgba(0,0,0,0.68)");
        fade.addColorStop(clamp(1 - fadeDistance * 0.42, 0.4, 0.8), "rgba(0,0,0,0.15)");
        fade.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        fade.addColorStop(0, "rgba(0,0,0,0.12)");
        fade.addColorStop(1, "rgba(0,0,0,0.34)");
      }

      context.fillStyle = fade;
      context.fillRect(0, 0, width, height);

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

    const handleMouseMove = (event: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
        y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
      };
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
    if (shouldFollowPointer) window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resize();
    drawFrame(performance.now());
    queueRender();

    return () => {
      stopRender();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (shouldFollowPointer) window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    distortion,
    fadeDistance,
    followMouse,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ]);

  return (
    <div className={`${styles.container} ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

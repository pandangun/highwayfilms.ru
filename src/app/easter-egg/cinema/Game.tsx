// app/easter-egg/cinema/Game.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { TILE, level, type Level, type Guard } from "./map";

/* ========== утилиты/типы ========== */
type Vec = { x: number; y: number };
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const len = (x: number, y: number) => Math.hypot(x, y);
const norm = (x: number, y: number) => {
  const L = len(x, y) || 1;
  return { x: x / L, y: y / L };
};
const dot = (ax: number, ay: number, bx: number, by: number) => ax * bx + ay * by;

/* ========== мобильный джойстик (Pointer Events) ========== */
type Stick = { dx: number; dy: number; active: boolean };
function useJoystick() {
  const [stick, setStick] = useState<Stick>({ dx: 0, dy: 0, active: false });
  const baseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;

    let ox = 0, oy = 0;
    const R = 42;

    const rectPoint = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      el.setPointerCapture(e.pointerId);
      const p = rectPoint(e);
      ox = p.x; oy = p.y;
      setStick({ dx: 0, dy: 0, active: true });
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const p = rectPoint(e);
      const dx = p.x - ox, dy = p.y - oy;
      const L = len(dx, dy) || 1;
      const m = Math.min(1, L / R);
      setStick({ dx: (dx / L) * m, dy: (dy / L) * m, active: true });
      e.preventDefault();
    };
    const up = (e: PointerEvent) => {
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      setStick({ dx: 0, dy: 0, active: false });
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return { stick, baseRef };
}

/* ========== основная игра ========== */
export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { stick, baseRef } = useJoystick();

  // держим актуальные значения вне зависимостей эффектов
  const stickRef = useRef(stick);
  useEffect(() => { stickRef.current = stick; }, [stick]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const L: Level = level;
    const WORLD_W = L.w * TILE;
    const WORLD_H = L.h * TILE;

    /* ----- resize ----- */
    const resize = () => {
      const maxW = Math.min(1200, window.innerWidth - 32);
      const h = Math.round((maxW * 9) / 16);
      canvas.style.width = `${maxW}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(maxW * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ----- input ----- */
    const keys = new Set<string>();
    const kd = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e.key)) e.preventDefault();
      keys.add(k);
    };
    const ku = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    /* ----- camera/zoom ----- */
    let zoom = 1;
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      zoom = clamp(zoom * (e.deltaY > 0 ? 1.1 : 0.9), 0.7, 2);
    }, { passive: false });

    const cam = {
      x: 0, y: 0, lerp: 0.12,
      view: () => ({ w: canvas.width / DPR / zoom, h: canvas.height / DPR / zoom }),
    };

    /* ----- state ----- */
    const player = {
      pos: { x: L.spawn.x * TILE, y: L.spawn.y * TILE } as Vec,
      vel: { x: 0, y: 0 } as Vec,
      sz: 42,
      speed: 1800,
      friction: 0.88,
      stamina: 0,            // перезарядка рывка
      facing: 1 as 1 | -1,
    };

    // метрики: батарея, шум, шоты
    let battery = 100;
    let noise = 0;
    const shots = new Set(L.shots.map(s => `${s.x},${s.y}`));
    const batteries = new Set(L.batteries.map(b => `${b.x},${b.y}`));

    // патрули — копия
    const guards: (Guard & { t: number; target: number })[] =
      L.guards.map(g => ({ ...g, t: 0, target: 1 % g.path.length }));

    let finished = false;

    /* ----- particles ----- */
    type Particle = { x:number; y:number; vx:number; vy:number; life:number; col:string };
    const parts: Particle[] = [];
    const spark = (x:number, y:number, col:string) => {
      for (let i = 0; i < 12; i++) parts.push({ x, y, vx: (Math.random()-0.5)*250, vy: (Math.random()-0.5)*250, life: .7, col });
    };

    /* ----- helpers ----- */
    const solidAt = (px:number, py:number) => {
      const cx = Math.floor(px / TILE), cy = Math.floor(py / TILE);
      if (cx < 0 || cy < 0 || cx >= L.w || cy >= L.h) return true;
      return L.solids[cy * L.w + cx] === 1;
    };
    const collide = (x:number, y:number, s:number) =>
      solidAt(x, y) || solidAt(x + s - 1, y) || solidAt(x, y + s - 1) || solidAt(x + s - 1, y + s - 1);

    /* ----- logic ----- */
    function update(dt: number) {
      // input
      const right = keys.has("arrowright") || keys.has("d");
      const left  = keys.has("arrowleft")  || keys.has("a");
      const up    = keys.has("arrowup")    || keys.has("w");
      const boost = keys.has(" "); // «дубль» — рывок тележки

      const s = stickRef.current;
      const ax = (right ? 1 : 0) - (left ? 1 : 0) + (s.active ? s.dx : 0);
      const ay = (up ? -1 : 0) + (s.active ? -s.dy : 0) * 0.8;

      if (ax > 0) player.facing = 1;
      if (ax < 0) player.facing = -1;

      player.vel.x += ax * player.speed * dt;
      player.vel.y += ay * (player.speed * 0.75) * dt;

      player.vel.x *= player.friction;
      player.vel.y *= player.friction;

      // рывок
      if (boost && player.stamina <= 0 && battery > 3) {
        player.vel.x += (player.facing === 1 ? 1 : -1) * 900;
        player.stamina = 0.35;
        battery = Math.max(0, battery - 3);
        spark(player.pos.x + player.sz/2, player.pos.y + player.sz/2, "#fff");
      }
      if (player.stamina > 0) player.stamina -= dt;

      // перемещение + стенки
      const nx = clamp(player.pos.x + player.vel.x * dt, 0, WORLD_W - player.sz);
      const ny = clamp(player.pos.y + player.vel.y * dt, 0, WORLD_H - player.sz);

      if (!collide(nx, player.pos.y, player.sz)) player.pos.x = nx;
      if (!collide(player.pos.x, ny, player.sz)) player.pos.y = ny;

      // батарея утекает со временем
      battery = Math.max(0, battery - dt * 1.1);

      // статические шумные зоны
      const px = player.pos.x + player.sz / 2, py = player.pos.y + player.sz / 2;
      for (const z of L.noiseZones) {
        const inside = px > z.x && px < z.x + z.w && py > z.y && py < z.y + z.h;
        if (inside) noise = Math.min(100, noise + dt * 22);
      }

      // патрули: движение по путям + конусы «шума»
      for (const g of guards) {
        const dst = g.path[g.target];
        const dx = dst.x - g.x;
        const dy = dst.y - g.y;
        const d = len(dx, dy);
        if (d < 2) {
          g.target = (g.target + 1) % g.path.length;
        } else {
          const v = norm(dx, dy);
          g.x += v.x * g.speed * dt;
          g.y += v.y * g.speed * dt;
        }

        // конус чувствительности
        const toP = { x: px - g.x, y: py - g.y };
        const dist = len(toP.x, toP.y);
        if (dist < g.fov) {
          const forward = norm(dx || 1, dy || 0);
          const dir = norm(toP.x, toP.y);
          const cos = dot(forward.x, forward.y, dir.x, dir.y);
          if (cos > Math.cos(g.arc)) {
            noise = Math.min(100, noise + dt * 35);
          }
        }
      }

      // сбор «шотов» и батареек
      const cx = Math.floor((player.pos.x + player.sz / 2) / TILE);
      const cy = Math.floor((player.pos.y + player.sz / 2) / TILE);
      const key = `${cx},${cy}`;
      if (shots.has(key)) { shots.delete(key); spark(player.pos.x + 20, player.pos.y + 20, "#ffd24d"); }
      if (batteries.has(key)) { batteries.delete(key); battery = Math.min(100, battery + 25); spark(player.pos.x + 20, player.pos.y + 20, "#8fe388"); }

      // конец
      const done = shots.size === 0;
      const drained = battery <= 0;
      const tooNoisy = noise >= 100;
      finished = done || drained || tooNoisy;

      // камера → плавное слежение
      const v = cam.view();
      const tx = player.pos.x + player.sz/2 - v.w/2;
      const ty = player.pos.y + player.sz/2 - v.h/2;
      cam.x += (clamp(tx, 0, Math.max(0, WORLD_W - v.w)) - cam.x) * cam.lerp;
      cam.y += (clamp(ty, 0, Math.max(0, WORLD_H - v.h)) - cam.y) * cam.lerp;
    }

    /* ----- отрисовка ----- */
    function render() {
      const v = cam.view();
      ctx.setTransform(zoom * DPR, 0, 0, zoom * DPR, 0, 0);
      ctx.clearRect(0, 0, v.w, v.h);

      // фон/параллакс
      const g = ctx.createLinearGradient(0, 0, 0, v.h);
      g.addColorStop(0, "rgba(255,255,255,0.05)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, v.w, v.h);
      ctx.save();
      ctx.translate(-cam.x * 0.25, -cam.y * 0.25);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      for (let i = 0; i < 100; i++) ctx.fillRect((i*173)%WORLD_W, (i*97)%WORLD_H, 2, 2);
      ctx.restore();

      // мир
      ctx.save();
      ctx.translate(-cam.x, -cam.y);

      // шумные зоны
      for (const z of L.noiseZones) {
        ctx.fillStyle = "rgba(255,80,80,0.12)";
        ctx.fillRect(z.x, z.y, z.w, z.h);
        ctx.strokeStyle = "rgba(255,80,80,0.3)";
        ctx.strokeRect(z.x, z.y, z.w, z.h);
      }

      // тайлы
      for (let y = 0; y < L.h; y++) {
        for (let x = 0; x < L.w; x++) {
          if (L.solids[y * L.w + x] === 1) {
            ctx.fillStyle = "rgba(255,255,255,0.08)";
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
            ctx.strokeRect(x * TILE, y * TILE, TILE, TILE);
          }
        }
      }

      // «шоты»
      ctx.fillStyle = "#ffd24d";
      for (const s of shots) {
        const [x, y] = s.split(",").map(Number);
        ctx.beginPath();
        ctx.arc(x * TILE + TILE/2, y * TILE + TILE/2, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // батарейки
      ctx.fillStyle = "#8fe388";
      for (const b of batteries) {
        const [x, y] = b.split(",").map(Number);
        ctx.fillRect(x * TILE + TILE/2 - 8, y * TILE + TILE/2 - 5, 16, 10);
      }

      // патрули + конусы
      for (const g of guards) {
        ctx.fillStyle = "#f55";
        ctx.fillRect(g.x - 10, g.y - 10, 20, 20);

        const next = g.path[g.target];
        const dir = norm((next.x || 1) - g.x, (next.y || 0) - g.y);
        const ang = Math.atan2(dir.y, dir.x);
        ctx.fillStyle = "rgba(255,80,80,0.08)";
        ctx.beginPath();
        ctx.moveTo(g.x, g.y);
        ctx.arc(g.x, g.y, g.fov, ang - g.arc, ang + g.arc);
        ctx.closePath();
        ctx.fill();
      }

      // финиш
      ctx.strokeStyle = "rgba(140,255,140,0.9)";
      ctx.lineWidth = 3;
      ctx.strokeRect(level.finish.x * TILE + 8, level.finish.y * TILE + 8, TILE - 16, TILE - 16);
      ctx.lineWidth = 1;

      // игрок
      ctx.fillStyle = "#f3f3f2";
      ctx.fillRect(player.pos.x, player.pos.y, player.sz, player.sz);
      ctx.fillStyle = "rgba(255,255,255,0.5)"; // «трубка микрофона»
      ctx.fillRect(player.pos.x + (player.facing === 1 ? 10 : player.sz - 32), player.pos.y - 8, 22, 6);
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.strokeRect(player.pos.x + 1, player.pos.y + 1, player.sz - 2, player.sz - 2);

      // частицы
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= 1/60;
        if (p.life <= 0) { parts.splice(i,1); continue; }
        p.x += p.vx / 60; p.y += p.vy / 60;
        p.vx *= 0.96; p.vy *= 0.96;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, 3, 3);
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      // HUD
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "12px ui-sans-serif, system-ui";
      ctx.fillText(`Shots: ${level.shots.length - shots.size}/${level.shots.length}`, 12, 18);
      ctx.fillText(`Battery: ${Math.round(battery)}%`, 12, 34);
      ctx.fillText(`Noise: ${Math.round(noise)}%`, 12, 50);
      if (finished) {
        const ok = shots.size === 0 && battery > 0 && noise < 100;
        const score =
          (level.shots.length - shots.size) * 100 +
          Math.max(0, Math.round(battery)) * 2 -
          Math.max(0, Math.round(noise));
        banner(ok ? `Смена снята! 🎬  Score: ${score}` : `Стоп! Пересъём.  Score: ${score}`);
      }

      // показать джойстик на мобиле
      if (baseRef.current) baseRef.current.style.opacity = "1";
    }

    function banner(txt: string) {
      const w = canvas.width / DPR, h = canvas.height / DPR;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, h/2 - 30, w, 60);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px ui-sans-serif, system-ui";
      ctx.textAlign = "center"; ctx.fillText(txt, w/2, h/2 + 7); ctx.textAlign = "left";
    }

    /* ----- loop ----- */
    let raf = 0, last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000); last = now;
      if (!finished) update(dt);
      render();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [baseRef]);

  return (
    <div className="card p-3 relative">
      <canvas ref={canvasRef} className="w-full rounded-xl border border-base bg-black/20" />
      {/* on-screen stick */}
      <div
        ref={baseRef}
        className="absolute bottom-4 left-4 w-28 h-28 rounded-full border border-base bg-white/5"
        style={{ touchAction: "none", opacity: 0, transition: "opacity .2s" }}
      />
      <div className="mt-3 text-sm text-muted">
        Стрелки/WASD — движение, Space — «дубль» (рывок), колесо — zoom. Избегайте красных зон и конусов патрулей.
      </div>
    </div>
  );
}

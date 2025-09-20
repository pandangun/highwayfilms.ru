// app/easter-egg/runner-pro/GamePro.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { TILE, level1, type Level } from "./map";

/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ТИПЫ/УТИЛЫ
   ========================= */
type Vec = { x: number; y: number };
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/* =========================
   ДЖОЙСТИК (Pointer Events)
   ========================= */
type StickState = { dx: number; dy: number; active: boolean };

function useJoystick() {
  const [stick, setStick] = useState<StickState>({ dx: 0, dy: 0, active: false });
  const baseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;

    let originX = 0;
    let originY = 0;
    const radius = 40;

    const getPoint = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onDown = (e: PointerEvent) => {
      // только ЛКМ для мыши
      if (e.pointerType === "mouse" && e.button !== 0) return;
      el.setPointerCapture(e.pointerId);
      const p = getPoint(e);
      originX = p.x;
      originY = p.y;
      setStick({ dx: 0, dy: 0, active: true });
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const p = getPoint(e);
      const dx = p.x - originX;
      const dy = p.y - originY;
      const len = Math.hypot(dx, dy) || 1;
      const m = Math.min(1, len / radius);
      setStick({ dx: (dx / len) * m, dy: (dy / len) * m, active: true });
      e.preventDefault();
    };

    const onUp = (e: PointerEvent) => {
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      setStick({ dx: 0, dy: 0, active: false });
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return { stick, baseRef };
}

/* =========================
   ОСНОВНАЯ ИГРА
   ========================= */
export default function GamePro() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { stick, baseRef } = useJoystick();

  // чтобы не тащить stick в зависимости эффекта — читаем его через ref
  const stickRef = useRef<StickState>(stick);
  useEffect(() => {
    stickRef.current = stick;
  }, [stick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(2, window.devicePixelRatio || 1);

    /* ---- resize ---- */
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

    /* ---- level ---- */
    const L: Level = level1;
    const WORLD_W = L.w * TILE;
    const WORLD_H = L.h * TILE;

    /* ---- input ---- */
    const keys = new Set<string>();
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key)) e.preventDefault();
      if (k === "p") paused = !paused;
      keys.add(k);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    /* ---- zoom ---- */
    let zoom = 1;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = clamp(zoom * (e.deltaY > 0 ? 1.1 : 0.9), 0.6, 2);
      zoom = next;
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });

    /* ---- state ---- */
    const player = {
      pos: { x: L.spawn.x * TILE, y: L.spawn.y * TILE } as Vec,
      vel: { x: 0, y: 0 } as Vec,
      sz: 40,
      speed: 2000,
      friction: 0.86,
      jump: 760,
      onGround: false,
      hp: 3,
      coins: 0,
      dash: 0,
    };

    const camera = {
      x: 0,
      y: 0,
      lerp: 0.12,
      view(): { w: number; h: number } {
        return { w: canvas.width / DPR / zoom, h: canvas.height / DPR / zoom };
      },
    };

    type Enemy = { x: number; y: number; dir: 1 | -1; left: number; right: number; speed: number; alive: boolean };
    const enemies: Enemy[] = L.enemies.map((e) => ({
      x: e.x * TILE,
      y: e.y * TILE,
      dir: 1,
      left: e.left * TILE,
      right: e.right * TILE,
      speed: 120,
      alive: true,
    }));

    const coins = new Set(L.coins.map((c) => `${c.x},${c.y}`));
    let checkpoint = { x: L.spawn.x * TILE, y: L.spawn.y * TILE };
    let finished = false;
    let paused = false;
    let invulnSince = performance.now();

    /* ---- helpers ---- */
    const solidAt = (px: number, py: number) => {
      const cx = Math.floor(px / TILE);
      const cy = Math.floor(py / TILE);
      if (cx < 0 || cy < 0 || cx >= L.w || cy >= L.h) return true;
      return L.solids[cy * L.w + cx] === 1;
    };

    const aabb = (x: number, y: number, w: number, h: number, x2: number, y2: number, w2: number, h2: number) =>
      x < x2 + w2 && x + w > x2 && y < y2 + h2 && y + h > y2;

    /* ---- physics ---- */
    const moveAndCollide = (dt: number) => {
      // по X
      let nx = player.pos.x + player.vel.x * dt;
      const yTop = player.pos.y;
      const yBottom = player.pos.y + player.sz - 1;

      if (player.vel.x > 0) {
        if (solidAt(nx + player.sz, yTop) || solidAt(nx + player.sz, yBottom)) {
          nx = Math.floor((nx + player.sz) / TILE) * TILE - player.sz - 0.01;
          player.vel.x = 0;
        }
      } else if (player.vel.x < 0) {
        if (solidAt(nx, yTop) || solidAt(nx, yBottom)) {
          nx = Math.floor(nx / TILE + 1) * TILE + 0.01;
          player.vel.x = 0;
        }
      }
      player.pos.x = clamp(nx, 0, WORLD_W - player.sz);

      // по Y
      let ny = player.pos.y + player.vel.y * dt;
      const xLeft = player.pos.x;
      const xRight = player.pos.x + player.sz - 1;

      if (player.vel.y > 0) {
        if (solidAt(xLeft, ny + player.sz) || solidAt(xRight, ny + player.sz)) {
          ny = Math.floor((ny + player.sz) / TILE) * TILE - player.sz - 0.01;
          player.vel.y = 0;
          player.onGround = true;
        } else {
          player.onGround = false;
        }
      } else if (player.vel.y < 0) {
        if (solidAt(xLeft, ny) || solidAt(xRight, ny)) {
          ny = Math.floor(ny / TILE + 1) * TILE + 0.01;
          player.vel.y = 0;
        }
      }
      player.pos.y = clamp(ny, 0, WORLD_H - player.sz);
    };

    const damage = () => {
      if (performance.now() - invulnSince < 600) return; // i-frames
      invulnSince = performance.now();
      player.hp -= 1;
      spark(player.pos.x + 20, player.pos.y + 20, "#ff7f7f");
      if (player.hp <= 0) {
        // respawn
        player.pos.x = checkpoint.x;
        player.pos.y = checkpoint.y;
        player.vel.x = 0;
        player.vel.y = 0;
        player.hp = 3;
      }
    };

    /* ---- particles ---- */
    type Particle = { x: number; y: number; vx: number; vy: number; life: number; col: string };
    const parts: Particle[] = [];
    const spark = (x: number, y: number, col: string) => {
      for (let i = 0; i < 16; i++) {
        parts.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 300,
          vy: (Math.random() - 0.5) * 300,
          life: 0.8,
          col,
        });
      }
    };

    /* ---- game loop ---- */
    let raf = 0;
    let last = performance.now();

    const update = (dt: number) => {
      // клавиатура
      const right = keys.has("arrowright") || keys.has("d");
      const left = keys.has("arrowleft") || keys.has("a");
      const up = keys.has("arrowup") || keys.has("w");
      const dash = keys.has("x");
      const hit = keys.has("z");

      // джойстик
      const s = stickRef.current;
      const sx = s.active ? s.dx : 0;
      const sy = s.active ? s.dy : 0;

      const ax = (right ? 1 : 0) - (left ? 1 : 0) + sx;
      player.vel.x += ax * player.speed * dt;
      player.vel.x *= player.friction;

      // гравитация
      player.vel.y += 1800 * dt;

      // прыжок
      if ((up || sy < -0.6) && player.onGround) {
        player.vel.y = 2 * (-player.jump);
        player.onGround = false;
      }

      // dash
      if (dash && player.dash <= 0) {
        player.vel.x += (ax >= 0 ? 1 : -1) * 800;
        player.dash = 0.35;
      }
      if (player.dash > 0) player.dash -= dt;

      moveAndCollide(dt);

      // монеты/чекпоинт/финиш
      const cx = Math.floor((player.pos.x + player.sz / 2) / TILE);
      const cy = Math.floor((player.pos.y + player.sz / 2) / TILE);
      const key = `${cx},${cy}`;
      if (coins.has(key)) {
        coins.delete(key);
        player.coins++;
        spark(player.pos.x + 20, player.pos.y + 20, "#ffd24d");
      }

      for (const cp of L.checkpoints) {
        if (cx === cp.x && cy === cp.y) checkpoint = { x: cp.x * TILE, y: cp.y * TILE };
      }

      if (cx === L.finish.x && cy === L.finish.y && coins.size === 0) finished = true;

      // враги
      for (const e of enemies) {
        if (!e.alive) continue;
        e.x += e.dir * e.speed * dt;
        if (e.x < e.left) {
          e.x = e.left;
          e.dir = 1;
        }
        if (e.x > e.right) {
          e.x = e.right;
          e.dir = -1;
        }
        if (aabb(player.pos.x, player.pos.y, player.sz, player.sz, e.x, e.y, 44, 44)) {
          if (hit) {
            e.alive = false;
            spark(e.x + 22, e.y + 22, "#f55");
          } else {
            damage();
          }
        }
      }

      // камера
      const view = camera.view();
      const tx = player.pos.x + player.sz / 2 - view.w / 2;
      const ty = player.pos.y + player.sz / 2 - view.h / 2;
      const maxX = WORLD_W - view.w;
      const maxY = WORLD_H - view.h;
      const targetX = clamp(tx, 0, Math.max(0, maxX));
      const targetY = clamp(ty, 0, Math.max(0, maxY));
      camera.x += (targetX - camera.x) * camera.lerp;
      camera.y += (targetY - camera.y) * camera.lerp;
    };

    const drawBanner = (text: string) => {
      const w = canvas.width / DPR;
      const h = canvas.height / DPR;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, h / 2 - 30, w, 60);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText(text, w / 2, h / 2 + 7);
      ctx.textAlign = "left";
    };

    const render = () => {
      const vw = camera.view().w;
      const vh = camera.view().h;
      ctx.setTransform(zoom * DPR, 0, 0, zoom * DPR, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      // фоновый градиент
      const g = ctx.createLinearGradient(0, 0, 0, vh);
      g.addColorStop(0, "rgba(255,255,255,0.05)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);

      // параллакс "звёзды"
      ctx.save();
      ctx.translate(-camera.x * 0.3, -camera.y * 0.3);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      for (let i = 0; i < 120; i++) {
        ctx.fillRect((i * 173) % WORLD_W, (i * 97) % WORLD_H, 2, 2);
      }
      ctx.restore();

      // мир
      ctx.save();
      ctx.translate(-camera.x, -camera.y);

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

      // монеты
      ctx.fillStyle = "#ffd24d";
      for (const k of coins) {
        const [x, y] = k.split(",").map(Number);
        ctx.beginPath();
        ctx.arc(x * TILE + TILE / 2, y * TILE + TILE / 2, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // враги
      for (const e of enemies) {
        if (!e.alive) continue;
        ctx.fillStyle = "#f55";
        ctx.fillRect(e.x, e.y, 44, 44);
      }

      // чекпоинты
      ctx.strokeStyle = "rgba(100,200,255,0.7)";
      for (const cp of L.checkpoints) {
        ctx.strokeRect(cp.x * TILE + 16, cp.y * TILE + 16, TILE - 32, TILE - 32);
      }

      // финиш
      ctx.strokeStyle = "rgba(140,255,140,0.9)";
      ctx.lineWidth = 3;
      ctx.strokeRect(L.finish.x * TILE + 8, L.finish.y * TILE + 8, TILE - 16, TILE - 16);
      ctx.lineWidth = 1;

      // игрок
      ctx.fillStyle = "#f3f3f2";
      ctx.fillRect(player.pos.x, player.pos.y, player.sz, player.sz);
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.strokeRect(player.pos.x + 1, player.pos.y + 1, player.sz - 2, player.sz - 2);

      // частицы
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= 1 / 60;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        p.x += p.vx / 60;
        p.y += p.vy / 60;
        p.vx *= 0.96;
        p.vy *= 0.96;
        ctx.fillStyle = p.col;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, 3, 3);
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      // HUD
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "12px ui-sans-serif, system-ui, -apple-system";
      ctx.fillText(`Coins: ${player.coins}/${L.coins.length}`, 12, 18);
      ctx.fillText(`HP: ${player.hp}`, 12, 34);
      ctx.fillText(`Zoom: ${zoom.toFixed(2)}`, 12, 50);
      if (paused) drawBanner("PAUSED");
      if (finished) drawBanner("FINISH! 🎉");

      // показать джойстик на мобиле
      if (baseRef.current) baseRef.current.style.opacity = "1";
    };

    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!paused && !finished) update(dt);
      render();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [baseRef]); // baseRef стабильный, stick читаем через stickRef

  return (
    <div className="card p-3 relative">
      <canvas ref={canvasRef} className="w-full rounded-xl border border-base bg-black/20" />
      {/* виртуальный джойстик — полупрозрачное кольцо слева снизу */}
      <div
        ref={baseRef}
        className="absolute bottom-4 left-4 w-28 h-28 rounded-full border border-base bg-white/5"
        style={{ touchAction: "none", opacity: 0, transition: "opacity .2s" }}
        aria-hidden
      />
      <div className="mt-3 text-sm text-muted">
        WASD/стрелки — ходьба, Z — удар, X — рывок, колесо — zoom, P — пауза.
      </div>
    </div>
  );
}

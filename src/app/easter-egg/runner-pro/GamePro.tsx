// app/easter-egg/runner-pro/GamePro.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { TILE, level1, type Level } from "./map";

type Vec = { x: number; y: number };
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/* =========================
   Mobile joystick (typed)
   ========================= */
function useJoystick() {
  const [stick, setStick] = useState<{ dx: number; dy: number; active: boolean }>({
    dx: 0,
    dy: 0,
    active: false,
  });
  const baseRef = useRef<HTMLDivElement | null>(null);

  // type guards для Pointer
  type PtrEvt = MouseEvent | TouchEvent;
  const isTouch = (e: PtrEvt): e is TouchEvent => "touches" in e || "changedTouches" in e;

  function getPoint(e: PtrEvt, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    if (isTouch(e)) {
      const t = e.touches[0] ?? e.changedTouches?.[0];
      const cx = t?.clientX ?? 0;
      const cy = t?.clientY ?? 0;
      return { x: cx - rect.left, y: cy - rect.top };
    }
    const m = e as MouseEvent;
    return { x: m.clientX - rect.left, y: m.clientY - rect.top };
  }

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;

    let active = false;
    let cx = 0,
      cy = 0;
    const radius = 40;

    const start = (e: PtrEvt) => {
      active = true;
      const p = getPoint(e, el);
      cx = p.x;
      cy = p.y;
      setStick({ dx: 0, dy: 0, active: true });
      (e as any).preventDefault?.();
    };

    const move = (e: PtrEvt) => {
      if (!active) return;
      const p = getPoint(e, el);
      let dx = p.x - cx,
        dy = p.y - cy;
      const len = Math.hypot(dx, dy) || 1;
      const mag = Math.min(1, len / radius);
      setStick({ dx: (dx / len) * mag, dy: (dy / len) * mag, active: true });
      (e as any).preventDefault?.();
    };

    const end = () => {
      active = false;
      setStick({ dx: 0, dy: 0, active: false });
    };

    el.addEventListener("touchstart", start as any, { passive: false });
    el.addEventListener("touchmove", move as any, { passive: false });
    el.addEventListener("touchend", end as any);
    el.addEventListener("mousedown", start as any);
    window.addEventListener("mousemove", move as any);
    window.addEventListener("mouseup", end as any);

    return () => {
      el.removeEventListener("touchstart", start as any);
      el.removeEventListener("touchmove", move as any);
      el.removeEventListener("touchend", end as any);
      el.removeEventListener("mousedown", start as any);
      window.removeEventListener("mousemove", move as any);
      window.removeEventListener("mouseup", end as any);
    };
  }, []);

  return { stick, baseRef };
}

/* =========================
   Main Game
   ========================= */
export default function GamePro() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { stick, baseRef } = useJoystick();

  // чтобы эффект с циклом НЕ перезапускался от stick, кладём его в ref
  const stickRef = useRef(stick);
  useEffect(() => {
    stickRef.current = stick;
  }, [stick]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    /* ---- resize ---- */
    function resize() {
      const maxW = Math.min(1200, window.innerWidth - 32);
      const h = Math.round((maxW * 9) / 16);
      canvas.style.width = `${maxW}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(maxW * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    /* ---- level ---- */
    const L: Level = level1;
    const W = L.w * TILE,
      H = L.h * TILE;

    /* ---- state ---- */
    const keys = new Set<string>();
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key)) e.preventDefault();
      if (k === "p") paused = !paused;
      keys.add(k);
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let zoom = 1; // camera zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom = clamp(zoom * (e.deltaY > 0 ? 1.1 : 0.9), 0.6, 2);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });

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
      view: () => ({ w: canvas.width / DPR / zoom, h: canvas.height / DPR / zoom }),
    };

    type Enemy = {
      x: number;
      y: number;
      dir: 1 | -1;
      left: number;
      right: number;
      speed: number;
      alive: boolean;
    };
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
    let t = performance.now();

    /* ---- helpers ---- */
    function solidAt(px: number, py: number) {
      const cx = Math.floor(px / TILE),
        cy = Math.floor(py / TILE);
      if (cx < 0 || cy < 0 || cx >= L.w || cy >= L.h) return true;
      return L.solids[cy * L.w + cx] === 1;
    }

    function aabb(x: number, y: number, w: number, h: number, x2: number, y2: number, w2: number, h2: number) {
      return x < x2 + w2 && x + w > x2 && y < y2 + h2 && y + h > y2;
    }

    /* ---- loop ---- */
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!paused && !finished) update(dt);
      render();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    function moveAndCollide(dt: number) {
      // X
      let nx = player.pos.x + player.vel.x * dt;
      const yTop = player.pos.y,
        yBottom = player.pos.y + player.sz - 1;

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
      player.pos.x = clamp(nx, 0, W - player.sz);

      // Y
      let ny = player.pos.y + player.vel.y * dt;
      const xLeft = player.pos.x,
        xRight = player.pos.x + player.sz - 1;

      if (player.vel.y > 0) {
        if (solidAt(xLeft, ny + player.sz) || solidAt(xRight, ny + player.sz)) {
          ny = Math.floor((ny + player.sz) / TILE) * TILE - player.sz - 0.01;
          player.vel.y = 0;
          player.onGround = true;
        } else player.onGround = false;
      } else if (player.vel.y < 0) {
        if (solidAt(xLeft, ny) || solidAt(xRight, ny)) {
          ny = Math.floor(ny / TILE + 1) * TILE + 0.01;
          player.vel.y = 0;
        }
      }
      player.pos.y = clamp(ny, 0, H - player.sz);
    }

    function update(dt: number) {
      // клавиши
      const right = keys.has("arrowright") || keys.has("d");
      const left = keys.has("arrowleft") || keys.has("a");
      const up = keys.has("arrowup") || keys.has("w");
      const dashKey = keys.has("x");
      const hit = keys.has("z");

      // джойстик
      const sx = stickRef.current.active ? stickRef.current.dx : 0;
      const sy = stickRef.current.active ? stickRef.current.dy : 0;

      const ax = (right ? 1 : 0) - (left ? 1 : 0) + sx;
      player.vel.x += ax * player.speed * dt;
      player.vel.x *= player.friction;

      // гравитация
      player.vel.y += 1800 * dt;

      // прыжок
      if ((up || sy < -0.6) && player.onGround) {
        player.vel.y = -player.jump;
        player.onGround = false;
      }

      // dash
      if (dashKey && player.dash <= 0) {
        player.vel.x += (ax >= 0 ? 1 : -1) * 800;
        player.dash = 0.35;
      }
      if (player.dash > 0) player.dash -= dt;

      moveAndCollide(dt);

      // монеты
      const cx = Math.floor((player.pos.x + player.sz / 2) / TILE);
      const cy = Math.floor((player.pos.y + player.sz / 2) / TILE);
      const key = `${cx},${cy}`;
      if (coins.has(key)) {
        coins.delete(key);
        player.coins++;
        spark(player.pos.x + 20, player.pos.y + 20, "#ffd24d");
      }

      // чекпоинт
      for (const cp of L.checkpoints) {
        if (cx === cp.x && cy === cp.y) checkpoint = { x: cp.x * TILE, y: cp.y * TILE };
      }

      // финиш
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
          } else damage();
        }
      }

      // камера
      const view = camera.view();
      const tx = player.pos.x + player.sz / 2 - view.w / 2;
      const ty = player.pos.y + player.sz / 2 - view.h / 2;
      const maxX = W - view.w,
        maxY = H - view.h;
      const targetX = clamp(tx, 0, Math.max(0, maxX));
      const targetY = clamp(ty, 0, Math.max(0, maxY));
      camera.x += (targetX - camera.x) * camera.lerp;
      camera.y += (targetY - camera.y) * camera.lerp;
    }

    /* ---- damage/respawn ---- */
    function damage() {
      if (performance.now() - t < 600) return; // i-frames
      t = performance.now();
      player.hp -= 1;
      spark(player.pos.x + 20, player.pos.y + 20, "#ff7f7f");
      if (player.hp <= 0) {
        player.pos.x = checkpoint.x;
        player.pos.y = checkpoint.y;
        player.vel.x = 0;
        player.vel.y = 0;
        player.hp = 3;
      }
    }

    /* ---- particles ---- */
    type P = { x: number; y: number; vx: number; vy: number; life: number; col: string };
    const parts: P[] = [];
    function spark(x: number, y: number, col: string) {
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
    }

    /* ---- render ---- */
    function render() {
      const vw = camera.view().w,
        vh = camera.view().h;
      ctx.setTransform(zoom * DPR, 0, 0, zoom * DPR, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      // bg gradient
      const g = ctx.createLinearGradient(0, 0, 0, vh);
      g.addColorStop(0, "rgba(255,255,255,0.05)");
      g.addColorStop(1, "rgba(255,255,255,0.00)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);

      // parallax stars
      ctx.save();
      ctx.translate(-camera.x * 0.3, -camera.y * 0.3);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      for (let i = 0; i < 120; i++) ctx.fillRect((i * 173) % W, (i * 97) % H, 2, 2);
      ctx.restore();

      // world
      ctx.save();
      ctx.translate(-camera.x, -camera.y);

      // tiles
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

      // coins
      ctx.fillStyle = "#ffd24d";
      for (const k of coins) {
        const [x, y] = k.split(",").map(Number);
        ctx.beginPath();
        ctx.arc(x * TILE + TILE / 2, y * TILE + TILE / 2, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // enemies
      for (const e of enemies) {
        if (!e.alive) continue;
        ctx.fillStyle = "#f55";
        ctx.fillRect(e.x, e.y, 44, 44);
      }

      // checkpoints
      ctx.strokeStyle = "rgba(100,200,255,0.7)";
      for (const cp of L.checkpoints) {
        ctx.strokeRect(cp.x * TILE + 16, cp.y * TILE + 16, TILE - 32, TILE - 32);
      }

      // finish
      ctx.strokeStyle = "rgba(140,255,140,0.9)";
      ctx.lineWidth = 3;
      ctx.strokeRect(L.finish.x * TILE + 8, L.finish.y * TILE + 8, TILE - 16, TILE - 16);
      ctx.lineWidth = 1;

      // player
      ctx.fillStyle = "#f3f3f2";
      ctx.fillRect(player.pos.x, player.pos.y, player.sz, player.sz);
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.strokeRect(player.pos.x + 1, player.pos.y + 1, player.sz - 2, player.sz - 2);

      // particles
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

      // показать базу джойстика на мобилке
      const el = baseRef.current;
      if (el) el.style.opacity = "1";
    }

    function drawBanner(text: string) {
      const w = canvas.width / DPR,
        h = canvas.height / DPR;
      const pad = 30;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, h / 2 - pad, w, pad * 2);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText(text, w / 2, h / 2 + 7);
      ctx.textAlign = "left";
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("wheel", onWheel as any);
    };
  }, []); // ВАЖНО: пустой массив — цикл не пересоздаётся

  return (
    <div className="card p-3 relative">
      <canvas ref={canvasRef} className="w-full rounded-xl border border-base bg-black/20" />
      {/* виртуальный джойстик — полупрозрачное кольцо */}
      <div
        ref={baseRef}
        className="absolute bottom-4 left-4 w-28 h-28 rounded-full border border-base bg-white/5"
        style={{ touchAction: "none", opacity: 0, transition: "opacity .2s" }}
      />
      <div className="mt-3 text-sm text-muted">
        WASD/стрелки, Z — удар, X — рывок, колесо — zoom, P — пауза.
      </div>
    </div>
  );
}

// app/easter-egg/runner-pro/map.ts
export const TILE = 64;

export type Level = {
  w: number; h: number;
  solids: number[];     // 1 — блок, 0 — пусто
  coins: { x: number; y: number }[];
  enemies: { x: number; y: number; left: number; right: number }[];
  checkpoints: { x: number; y: number }[];
  finish: { x: number; y: number };
  spawn: { x: number; y: number };
};

export const level1: Level = {
  w: 40, h: 20,
  // простая платформа: пол, пары колонн и плато — 1 это тайл-стена
  solids: (() => {
    const W = 40, H = 20; const a = Array(W * H).fill(0);
    // пол
    for (let x = 0; x < W; x++) a[(H - 2) * W + x] = 1, a[(H - 1) * W + x] = 1;
    // колонны
    for (let y = H - 6; y < H - 2; y++) a[y * W + 10] = 1, a[y * W + 22] = 1, a[y * W + 30] = 1;
    // плато
    for (let x = 14; x < 19; x++) a[(H - 8) * W + x] = 1;
    for (let x = 24; x < 28; x++) a[(H - 10) * W + x] = 1;
    // лестница
    a[(H - 3) * W + 4] = 1; a[(H - 4) * W + 5] = 1; a[(H - 5) * W + 6] = 1; a[(H - 6) * W + 7] = 1;
    return a;
  })(),
  coins: [
    { x: 6, y: 12 }, { x: 7, y: 11 }, { x: 8, y: 10 },
    { x: 15, y: 11 }, { x: 17, y: 11 },
    { x: 25, y: 9 }, { x: 26, y: 9 }, { x: 27, y: 9 },
    { x: 31, y: 13 }, { x: 33, y: 13 }
  ],
  enemies: [
    { x: 12, y: 14, left: 11, right: 16 },
    { x: 23, y: 14, left: 22, right: 26 },
    { x: 31, y: 14, left: 30, right: 34 },
  ],
  checkpoints: [{ x: 18, y: 11 }, { x: 27, y: 9 }, { x: 33, y: 13 }],
  finish: { x: 38, y: 13 },
  spawn: { x: 3, y: 13 },
};

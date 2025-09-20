// app/easter-egg/cinema/map.ts
export const TILE = 64;

export type Rect = { x: number; y: number; w: number; h: number };
export type Cell = { x: number; y: number };
export type Guard = {
  x: number;           // пиксели
  y: number;           // пиксели
  path: { x: number; y: number }[]; // точки патруля в пикселях
  speed: number;       // px/s
  fov: number;         // радиус чувствительности
  arc: number;         // полуугол обзора в радианах
};

export type Level = {
  w: number;
  h: number;
  solids: number[];    // 0/1, длиной w*h
  spawn: Cell;
  finish: Cell;
  noiseZones: Rect[];  // красные зоны
  shots: Cell[];       // «шоты»
  batteries: Cell[];   // батарейки
  guards: Guard[];     // патрули
};

export const level: Level = {
  w: 30,
  h: 18,
  solids: /* заполните как у вас */ new Array(30 * 18).fill(0),
  spawn: { x: 2, y: 14 },
  finish: { x: 27, y: 2 },
  noiseZones: [
    { x: 9 * TILE, y: 10 * TILE, w: 5 * TILE, h: 2 * TILE },
    { x: 18 * TILE, y: 5 * TILE, w: 3 * TILE, h: 3 * TILE },
  ],
  shots: [
    { x: 6, y: 6 },
    { x: 10, y: 4 },
    { x: 15, y: 11 },
    { x: 22, y: 7 },
  ],
  batteries: [
    { x: 8, y: 13 },
    { x: 20, y: 9 },
  ],
  guards: [
    {
      x: 14 * TILE,
      y: 11 * TILE,
      path: [
        { x: 14 * TILE, y: 11 * TILE },
        { x: 22 * TILE, y: 11 * TILE },
        { x: 22 * TILE, y: 6 * TILE },
        { x: 14 * TILE, y: 6 * TILE },
      ],
      speed: 90,
      fov: 160,     // радиус
      arc: Math.PI / 3, // ~60°
    },
  ],
};

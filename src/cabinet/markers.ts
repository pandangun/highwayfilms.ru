import type { Comment } from "@/cabinet/db/schema";

/**
 * Правки — маркерами в монтажку.
 *
 * EDL в том виде, в каком DaVinci Resolve сам выгружает маркеры
 * (Timeline → Export → Timeline Markers to EDL) и читает обратно
 * (Import → Timeline Markers from EDL): событие длиной в кадр на
 * таймкоде правки, в комментарии — цвет и текст. Таймлайн Resolve по
 * умолчанию начинается с 01:00:00:00.
 */
const START_HOURS = 1;

function timecode(ms: number, fps: number) {
  const frames = Math.round((ms / 1000) * fps) + START_HOURS * 3600 * fps;
  const f = frames % fps;
  const totalSeconds = Math.floor(frames / fps);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor((totalSeconds % 3600) / 60))}:${pad(totalSeconds % 60)}:${pad(f)}`;
}

function plainText(value: string) {
  return value.replace(/[\r\n|]+/g, " ").replace(/\s+/g, " ").trim();
}

export function markersEdl({ title, fps, comments }: { title: string; fps: number; comments: Comment[] }) {
  const lines = [`TITLE: ${plainText(title)}`, "FCM: NON-DROP FRAME", ""];
  comments
    .filter((comment) => comment.timecodeMs != null)
    .sort((a, b) => (a.timecodeMs ?? 0) - (b.timecodeMs ?? 0))
    .forEach((comment, index) => {
      const start = timecode(comment.timecodeMs ?? 0, fps);
      const end = timecode((comment.timecodeMs ?? 0) + 1000 / fps, fps);
      const color = comment.status === "open" ? "ResolveColorRed" : "ResolveColorGreen";
      lines.push(`${String(index + 1).padStart(3, "0")}  001      V     C        ${start} ${end} ${start} ${end}  `);
      lines.push(` |C:${color} |M:${plainText(`${comment.authorName}: ${comment.body}`).slice(0, 200)} |D:1`);
      lines.push("");
    });
  return lines.join("\r\n");
}

/** Та же лента таблицей — открыть в Excel или отдать монтажёру списком. */
export function markersCsv(comments: Comment[]) {
  const cell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const rows = comments
    .sort((a, b) => (a.timecodeMs ?? 0) - (b.timecodeMs ?? 0))
    .map((comment) => {
      const seconds = Math.floor((comment.timecodeMs ?? 0) / 1000);
      const tc = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
      return [tc, comment.authorName, comment.body, comment.status, comment.reply ?? ""].map(cell).join(";");
    });
  // BOM — чтобы Excel открыл кириллицу без плясок с кодировкой.
  return `﻿${["Таймкод;Автор;Правка;Статус;Ответ студии", ...rows].join("\r\n")}`;
}

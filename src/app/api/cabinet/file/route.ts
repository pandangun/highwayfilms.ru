import { createReadStream, promises as fs } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { cabinetEnabled } from "@/cabinet/config";
import { checkSignature, localPath } from "@/cabinet/storage";

/**
 * Отдаёт файл из локального хранилища по подписанной ссылке. Понимает
 * Range: без него плеер не перематывает, а большой файл не докачать
 * после обрыва.
 */
const TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".m4v": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
};

export async function GET(request: Request) {
  if (!cabinetEnabled()) return new Response("Not found", { status: 404 });
  const url = new URL(request.url);
  const key = url.searchParams.get("k") ?? "";
  const expires = Number(url.searchParams.get("e"));
  const fileName = url.searchParams.get("n") ?? "";
  if (!checkSignature("get", key, expires, fileName, url.searchParams.get("s") ?? "")) {
    return new Response("Ссылка устарела. Обновите страницу кабинета.", { status: 403 });
  }

  let file: string;
  let size: number;
  try {
    file = localPath(key);
    size = (await fs.stat(file)).size;
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers({
    "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  });
  if (fileName) headers.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`);

  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "");
  if (range) {
    const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start >= size || start > end) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    const stream = Readable.toWeb(createReadStream(file, { start, end })) as ReadableStream;
    return new Response(stream, { status: 206, headers });
  }

  headers.set("Content-Length", String(size));
  return new Response(Readable.toWeb(createReadStream(file)) as ReadableStream, { status: 200, headers });
}

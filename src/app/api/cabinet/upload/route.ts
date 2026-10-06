import { createWriteStream, promises as fs } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { cabinetEnabled } from "@/cabinet/config";
import { checkSignature, localPath } from "@/cabinet/storage";

/**
 * Приём файла в локальное хранилище по подписанной ссылке: браузер студии
 * шлёт PUT с телом файла, мы пишем его потоком, не держа в памяти.
 * На сервере с Yandex Object Storage этот маршрут не нужен: ссылка на
 * загрузку будет ссылкой Яндекса.
 */
export async function PUT(request: Request) {
  if (!cabinetEnabled()) return new Response("Not found", { status: 404 });
  const url = new URL(request.url);
  const key = url.searchParams.get("k") ?? "";
  if (!checkSignature("put", key, Number(url.searchParams.get("e")), "", url.searchParams.get("s") ?? "")) {
    return new Response("Ссылка для загрузки устарела", { status: 403 });
  }
  if (!request.body) return new Response("Пустой файл", { status: 400 });

  const target = localPath(key);
  const partial = `${target}.part`;
  await fs.mkdir(path.dirname(target), { recursive: true });
  try {
    await pipeline(Readable.fromWeb(request.body as import("node:stream/web").ReadableStream), createWriteStream(partial));
    await fs.rename(partial, target);
  } catch (error) {
    await fs.rm(partial, { force: true });
    console.error("[cabinet] загрузка оборвалась", error);
    return new Response("Загрузка оборвалась", { status: 500 });
  }
  return new Response(null, { status: 204 });
}

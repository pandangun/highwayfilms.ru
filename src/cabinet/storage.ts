import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cabinetConfig } from "@/cabinet/config";

/**
 * Хранилище видео и файлов. Сейчас — папка .cabinet-data/files на этом же
 * компьютере; ссылки подписаны и живут несколько часов, отдаёт их
 * /api/cabinet/file. На сервере сюда встанет Yandex Object Storage с теми
 * же функциями: ссылки станут подписанными ссылками Яндекса, и файлы
 * пойдут к паре напрямую, мимо сервера.
 */
const HOUR = 3600;

function root() {
  return path.join(process.cwd(), cabinetConfig.dataDir, "files");
}

/** Путь файла на диске. Ключ не может выйти за пределы папки хранилища. */
export function localPath(key: string) {
  const base = root();
  const full = path.resolve(base, key);
  if (!full.startsWith(base + path.sep)) throw new Error("Bad storage key");
  return full;
}

function signature(kind: "get" | "put", key: string, expires: number, extra: string) {
  return createHmac("sha256", cabinetConfig.secret).update(`${kind}\n${key}\n${expires}\n${extra}`).digest("base64url");
}

export function checkSignature(kind: "get" | "put", key: string, expires: number, extra: string, given: string) {
  if (!key || !Number.isFinite(expires) || expires < Date.now() / 1000) return false;
  const expected = Buffer.from(signature(kind, key, expires, extra));
  const actual = Buffer.from(given);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/** Имя файла в хранилище: латиница, цифры, точки и дефисы. */
export function safeName(name: string) {
  const ext = path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = path.basename(name, path.extname(name)).normalize("NFKD").replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "");
  return `${(base || "file").slice(0, 60)}${ext}`;
}

export const storage = {
  /** Ссылка на просмотр или скачивание. fileName — имя, под которым файл сохранится. */
  downloadUrl(key: string, { fileName = "", ttl = 6 * HOUR }: { fileName?: string; ttl?: number } = {}) {
    const expires = Math.floor(Date.now() / 1000) + ttl;
    const query = new URLSearchParams({ k: key, e: String(expires), n: fileName, s: signature("get", key, expires, fileName) });
    return `/api/cabinet/file?${query}`;
  },

  /** Ссылка для загрузки файла браузером студии (PUT). */
  uploadUrl(key: string, ttl = 12 * HOUR) {
    const expires = Math.floor(Date.now() / 1000) + ttl;
    const query = new URLSearchParams({ k: key, e: String(expires), s: signature("put", key, expires, "") });
    return `/api/cabinet/upload?${query}`;
  },

  async size(key: string) {
    try {
      return (await fs.stat(localPath(key))).size;
    } catch {
      return null;
    }
  },

  async remove(key: string) {
    await fs.rm(localPath(key), { force: true });
  },
};

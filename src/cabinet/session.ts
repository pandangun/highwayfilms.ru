import "server-only";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { cabinetConfig } from "@/cabinet/config";

/**
 * Сессии кабинета — подписанные JWT в httpOnly-куках, без таблицы сессий.
 * Студия: одна кука на 30 дней. Пара: список личных ссылок, по которым
 * человек заходил, — на полгода; отозванная ссылка перестаёт работать
 * сразу, потому что каждую проверяем по базе.
 */
const STUDIO_COOKIE = "hf_studio";
const CLIENT_COOKIE = "hf_client";
const PREMIERE_COOKIE = "hf_premiere";

const DAY = 24 * 60 * 60;
const MAX_LINKS = 10;

function key() {
  return new TextEncoder().encode(cabinetConfig.secret);
}

async function sign(payload: JWTPayload, seconds: number) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + seconds)
    .sign(key());
}

async function verify<T extends JWTPayload>(token: string | undefined): Promise<T | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<T>(token, key(), { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}

function cookieOptions(seconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: seconds,
  };
}

export async function startStudioSession() {
  const store = await cookies();
  store.set(STUDIO_COOKIE, await sign({ role: "studio" }, 30 * DAY), cookieOptions(30 * DAY));
}

export async function hasStudioSession() {
  const store = await cookies();
  const payload = await verify<{ role?: string }>(store.get(STUDIO_COOKIE)?.value);
  return payload?.role === "studio";
}

export async function endStudioSession() {
  const store = await cookies();
  store.delete(STUDIO_COOKIE);
}

export async function readClientLinks(): Promise<string[]> {
  const store = await cookies();
  const payload = await verify<{ links?: unknown }>(store.get(CLIENT_COOKIE)?.value);
  return Array.isArray(payload?.links) ? payload.links.filter((id): id is string => typeof id === "string") : [];
}

/** Добавляет ссылку в куку пары; последняя открытая — первой. */
export async function rememberClientLink(linkId: string) {
  const links = [linkId, ...(await readClientLinks()).filter((id) => id !== linkId)].slice(0, MAX_LINKS);
  const store = await cookies();
  store.set(CLIENT_COOKIE, await sign({ links }, 180 * DAY), cookieOptions(180 * DAY));
}

/** Премьеры, для которых введён пароль: slug → да. */
export async function readPremieres(): Promise<string[]> {
  const store = await cookies();
  const payload = await verify<{ slugs?: unknown }>(store.get(PREMIERE_COOKIE)?.value);
  return Array.isArray(payload?.slugs) ? payload.slugs.filter((slug): slug is string => typeof slug === "string") : [];
}

export async function rememberPremiere(slug: string) {
  const slugs = [slug, ...(await readPremieres()).filter((item) => item !== slug)].slice(0, MAX_LINKS);
  const store = await cookies();
  store.set(PREMIERE_COOKIE, await sign({ slugs }, 30 * DAY), cookieOptions(30 * DAY));
}

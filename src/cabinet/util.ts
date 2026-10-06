import "server-only";
import { createHash, randomBytes, randomUUID } from "node:crypto";

export const newId = () => randomUUID();

/** Токен личной ссылки: 24 случайных байта, в адресе — 32 символа. */
export const newToken = () => randomBytes(24).toString("base64url");

export const hashToken = (token: string) => createHash("sha256").update(token).digest("base64url");

// Без 0/o и 1/l/i: код читают глазами и диктуют по телефону.
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

export function newCode() {
  return `hf-${[...randomBytes(6)].map((byte) => ALPHABET[byte % ALPHABET.length]).join("")}`;
}

/** Пароль премьеры: три группы по три знака, его диктуют родным. */
export function newPremierePassword() {
  const chars = [...randomBytes(9)].map((byte) => ALPHABET[byte % ALPHABET.length]).join("");
  return `${chars.slice(0, 3)}-${chars.slice(3, 6)}-${chars.slice(6, 9)}`;
}

export function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

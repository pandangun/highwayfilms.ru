import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

/**
 * Пароль студии хранится только хэшем в STUDIO_PASSWORD_HASH, формат
 * `scrypt:N:r:p:соль:хэш` (не `$`: в .env он раскрывается как переменная). Сделать хэш: `npm run cabinet:password`.
 */
function derive(password: string, salt: Buffer, N: number, r: number, p: number) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, { N, r, p, maxmem: 64 * 1024 * 1024 }, (error, key) => (error ? reject(error) : resolve(key)));
  });
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, n, r, p, salt, hash] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  const actual = await derive(password, Buffer.from(salt, "base64url"), Number(n), Number(r), Number(p));
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await derive(password, salt, 16384, 8, 1);
  return `scrypt:16384:8:1:${salt.toString("base64url")}:${key.toString("base64url")}`;
}

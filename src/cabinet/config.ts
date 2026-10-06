import "server-only";

/**
 * Настройки кабинета — из переменных окружения, список в .env.example.
 *
 * Кабинет включён, когда есть база: DATABASE_URL (Postgres на сервере)
 * или CABINET_LOCAL_DB=1 (PGlite в папке .cabinet-data — для работы на
 * своём компьютере). Без базы страницы кабинета отвечают 404, а сайт
 * работает как раньше.
 */
export const cabinetConfig = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  localDb: process.env.CABINET_LOCAL_DB === "1",
  secret: process.env.CABINET_SECRET ?? "",
  studioPasswordHash: process.env.STUDIO_PASSWORD_HASH ?? "",
  baseUrl: (process.env.CABINET_BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  telegramToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? "",
  dataDir: process.env.CABINET_DATA_DIR ?? ".cabinet-data",
};

export function cabinetEnabled() {
  return Boolean((cabinetConfig.databaseUrl || cabinetConfig.localDb) && cabinetConfig.secret.length >= 32);
}

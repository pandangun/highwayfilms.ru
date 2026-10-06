import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cabinetConfig } from "@/cabinet/config";
import * as schema from "@/cabinet/db/schema";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export type CabinetDb = NodePgDatabase<typeof schema>;

const MIGRATIONS = path.join(process.cwd(), "drizzle");

/**
 * Одно подключение на процесс. В разработке модуль перезагружается при
 * каждой правке, поэтому держим его в globalThis: второй PGlite на ту же
 * папку упал бы на блокировке.
 */
const globalForDb = globalThis as unknown as { cabinetDb?: Promise<CabinetDb> };

async function connect(): Promise<CabinetDb> {
  if (cabinetConfig.databaseUrl) {
    const { Pool } = await import("pg");
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const { migrate } = await import("drizzle-orm/node-postgres/migrator");
    const pool = new Pool({ connectionString: cabinetConfig.databaseUrl, max: 5 });
    const db = drizzle(pool, { schema });
    // Сервер один, поэтому миграции можно накатывать при первом запросе.
    await migrate(db, { migrationsFolder: MIGRATIONS });
    return db;
  }

  // Локальная база: Postgres, собранный в WebAssembly, пишет в папку проекта.
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const dir = path.join(process.cwd(), cabinetConfig.dataDir, "pglite");
  await fs.mkdir(dir, { recursive: true });
  const client = new PGlite(dir);
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: MIGRATIONS });
  // Запросы у обоих драйверов одинаковые, типы расходятся только в деталях результата.
  return db as unknown as CabinetDb;
}

export function getDb() {
  // Упавшее подключение не запоминаем: следующий запрос попробует снова.
  globalForDb.cabinetDb ??= connect().catch((error) => {
    globalForDb.cabinetDb = undefined;
    throw error;
  });
  return globalForDb.cabinetDb;
}

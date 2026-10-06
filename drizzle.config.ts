import { defineConfig } from "drizzle-kit";

/** Миграции кабинета: `npm run db:generate` пишет SQL в папку drizzle/. */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/cabinet/db/schema.ts",
  out: "./drizzle",
});

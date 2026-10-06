import { bigint, boolean, date, index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

/**
 * Схема кабинета. Статусы — текстом, а не enum базы: новый статус
 * добавляется правкой типа, без миграции.
 */

const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

/** Тип проекта: от него зависят этапы, анкета и слова интерфейса (src/cabinet/kinds.ts). */
export type ProjectKind = "wedding" | "commercial" | "corporate" | "music" | "ai" | "production";

/** Проект. title — имена пары или название; eventDate — главная дата: свадьба, съёмка или сдача. */
export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  /** Код в адресе кабинета: /cabinet/hf-7k2m9q. Не секрет — доступ даёт ссылка. */
  code: text("code").notNull().unique(),
  kind: text("kind").$type<ProjectKind>().notNull().default("wedding"),
  title: text("title").notNull(),
  eventDate: date("event_date"),
  city: text("city"),
  /** Сколько кругов правок входит в договор. */
  roundsIncluded: integer("rounds_included").notNull().default(1),
  /** Частота кадров монтажа — для маркеров DaVinci Resolve. */
  fps: integer("fps").notNull().default(25),
  /** Страница премьеры для родных: /premiere/<slug>, пароль показываем паре. */
  premiereSlug: text("premiere_slug").unique(),
  premierePassword: text("premiere_password"),
  premiereVersionId: text("premiere_version_id"),
  createdAt: createdAt(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
});

/** Этап маршрута. Текущий — первый несделанный по порядку. */
export const stages = pgTable(
  "stages",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    key: text("key").notNull(),
    position: integer("position").notNull(),
    title: text("title").notNull(),
    dueOn: date("due_on"),
    doneAt: timestamp("done_at", { withTimezone: true }),
  },
  (t) => [index("stages_project_idx").on(t.projectId, t.position)],
);

export type LinkRole = "client";

/**
 * Личная ссылка человека на проект. Храним только хэш токена: ссылку
 * студия копирует при создании, потерялась — выпускает новую.
 */
export const accessLinks = pgTable(
  "access_links",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    role: text("role").$type<LinkRole>().notNull().default("client"),
    tokenHash: text("token_hash").notNull(),
    createdAt: createdAt(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("access_links_token_idx").on(t.tokenHash), index("access_links_project_idx").on(t.projectId)],
);

/** Анкета перед свадьбой — один документ на проект. */
export const questionnaires = pgTable("questionnaires", {
  projectId: text("project_id")
    .primaryKey()
    .references(() => projects.id, { onDelete: "cascade" }),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

export type VersionKind = "teaser" | "film" | "other";
/** superseded — пришла новая версия того же ролика; старую можно открыть, но не править. */
export type VersionStatus = "uploading" | "review" | "changes" | "approved" | "superseded";

/** Версия для просмотра: тизер или фильм. Видео — ключ в хранилище. */
export const versions = pgTable(
  "versions",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    kind: text("kind").$type<VersionKind>().notNull(),
    number: integer("number").notNull(),
    title: text("title").notNull(),
    videoKey: text("video_key").notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number" }),
    status: text("status").$type<VersionStatus>().notNull().default("uploading"),
    createdAt: createdAt(),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    approvedBy: text("approved_by"),
  },
  (t) => [index("versions_project_idx").on(t.projectId)],
);

export type CommentStatus = "open" | "done" | "kept";

/**
 * Правка по таймкоду. Пока submittedAt пустой — черновик пары, студия его
 * не видит. «Отправить правки» отправляет все черновики версии разом.
 */
export const comments = pgTable(
  "comments",
  {
    id: text("id").primaryKey(),
    versionId: text("version_id")
      .notNull()
      .references(() => versions.id, { onDelete: "cascade" }),
    authorLinkId: text("author_link_id"),
    authorName: text("author_name").notNull(),
    fromStudio: boolean("from_studio").notNull().default(false),
    timecodeMs: integer("timecode_ms"),
    body: text("body").notNull(),
    status: text("status").$type<CommentStatus>().notNull().default("open"),
    reply: text("reply"),
    round: integer("round"),
    createdAt: createdAt(),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
  },
  (t) => [index("comments_version_idx").on(t.versionId)],
);

/** Круг правок: одна отправка черновиков студии. */
export const rounds = pgTable(
  "rounds",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    versionId: text("version_id")
      .notNull()
      .references(() => versions.id, { onDelete: "cascade" }),
    number: integer("number").notNull(),
    notes: integer("notes").notNull(),
    submittedBy: text("submitted_by"),
    createdAt: createdAt(),
  },
  (t) => [index("rounds_project_idx").on(t.projectId)],
);

export type FileKind = "film" | "teaser" | "vertical" | "recording" | "other";

/** Файл для скачивания: фильм, тизер, вертикальная версия, полные записи. */
export const files = pgTable(
  "files",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    kind: text("kind").$type<FileKind>().notNull(),
    title: text("title").notNull(),
    storageKey: text("storage_key").notNull(),
    fileName: text("file_name").notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number" }),
    ready: boolean("ready").notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [index("files_project_idx").on(t.projectId)],
);

/** Отзыв после сдачи и разрешение показать фильм на сайте. */
export const testimonials = pgTable("testimonials", {
  projectId: text("project_id")
    .primaryKey()
    .references(() => projects.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  allowPublish: boolean("allow_publish").notNull().default(false),
  authorName: text("author_name").notNull(),
  createdAt: createdAt(),
});

/** Лента событий проекта: из неё студия видит, что происходило. */
export const events = pgTable(
  "events",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    text: text("text").notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("events_project_idx").on(t.projectId, t.createdAt)],
);

export type Project = typeof projects.$inferSelect;
export type Stage = typeof stages.$inferSelect;
export type AccessLink = typeof accessLinks.$inferSelect;
export type Version = typeof versions.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type ProjectFile = typeof files.$inferSelect;
export type Round = typeof rounds.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type CabinetEvent = typeof events.$inferSelect;

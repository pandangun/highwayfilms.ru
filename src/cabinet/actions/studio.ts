"use server";

import path from "node:path";
import { refresh } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, inArray, max, ne } from "drizzle-orm";
import { requireCabinet, requireStudio } from "@/cabinet/auth";
import { cabinetConfig } from "@/cabinet/config";
import { findProjectByCode } from "@/cabinet/data";
import { getDb } from "@/cabinet/db";
import {
  accessLinks,
  comments,
  files,
  projects,
  stages,
  versions,
  type CommentStatus,
  type FileKind,
  type VersionKind,
} from "@/cabinet/db/schema";
import { logEvent } from "@/cabinet/notify";
import { verifyPassword } from "@/cabinet/password";
import { endStudioSession, startStudioSession } from "@/cabinet/session";
import { safeName, storage } from "@/cabinet/storage";
import { clip, hashToken, newCode, newId, newPremierePassword, newToken } from "@/cabinet/util";
import { kindOf, PROJECT_KINDS } from "@/cabinet/kinds";
import { defaultStages } from "@/cabinet/project";

/* ── Вход ── */

// Пять неверных паролей с одного адреса — пауза на десять минут.
const attempts = new Map<string, { count: number; until: number }>();

export type LoginState = { error?: string };

export async function loginStudio(_: LoginState, formData: FormData): Promise<LoginState> {
  requireCabinet();
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.until > now && entry.count >= 5) return { error: "Слишком много попыток. Попробуйте через 10 минут." };

  const password = String(formData.get("password") ?? "");
  const ok = Boolean(cabinetConfig.studioPasswordHash) && (await verifyPassword(password, cabinetConfig.studioPasswordHash));
  if (!ok) {
    attempts.set(ip, { count: (entry && entry.until > now ? entry.count : 0) + 1, until: now + 10 * 60 * 1000 });
    return { error: "Пароль не подошёл." };
  }
  attempts.delete(ip);
  await startStudioSession();
  redirect("/studio");
}

export async function logoutStudio() {
  await endStudioSession();
  redirect("/studio/login");
}

/* ── Проект ── */

function dateOrNull(value: FormDataEntryValue | null) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

function intBetween(value: FormDataEntryValue | null, min: number, maxValue: number, fallback: number) {
  const number = Number(value);
  return Number.isInteger(number) && number >= min && number <= maxValue ? number : fallback;
}

async function studioProject(code: unknown) {
  await requireStudio();
  const project = typeof code === "string" ? await findProjectByCode(code) : null;
  if (!project) throw new Error("Проект не найден");
  return project;
}

export async function createProject(formData: FormData) {
  await requireStudio();
  const title = clip(formData.get("title"), 120);
  if (!title) throw new Error("Нужно название проекта");
  const kindValue = String(formData.get("kind") ?? "");
  const kind = PROJECT_KINDS.find((item) => item === kindValue) ?? "production";
  const eventDate = dateOrNull(formData.get("eventDate"));
  const db = await getDb();
  const id = newId();
  const code = newCode();
  await db.insert(projects).values({
    id,
    code,
    kind,
    title,
    eventDate,
    city: clip(formData.get("city"), 80) || null,
    roundsIncluded: intBetween(formData.get("roundsIncluded"), 0, 5, 1),
  });
  await db.insert(stages).values(defaultStages(kind, eventDate).map((stage) => ({ id: newId(), projectId: id, ...stage })));
  await logEvent({ id, code, title }, "created", "проект создан", { notify: false });
  redirect(`/studio/p/${code}`);
}

export async function updateProject(formData: FormData) {
  const project = await studioProject(formData.get("code"));
  const db = await getDb();
  await db
    .update(projects)
    .set({
      title: clip(formData.get("title"), 120) || project.title,
      eventDate: dateOrNull(formData.get("eventDate")),
      city: clip(formData.get("city"), 80) || null,
      roundsIncluded: intBetween(formData.get("roundsIncluded"), 0, 5, project.roundsIncluded),
      fps: intBetween(formData.get("fps"), 23, 60, project.fps),
    })
    .where(eq(projects.id, project.id));
  refresh();
}

export async function updateStages(formData: FormData) {
  const project = await studioProject(formData.get("code"));
  const db = await getDb();
  const rows = await db.select().from(stages).where(eq(stages.projectId, project.id));
  for (const stage of rows) {
    const done = formData.get(`done_${stage.id}`) === "on";
    await db
      .update(stages)
      .set({ dueOn: dateOrNull(formData.get(`due_${stage.id}`)), doneAt: done ? (stage.doneAt ?? new Date()) : null })
      .where(eq(stages.id, stage.id));
  }
  refresh();
}

/* ── Личные ссылки ── */

export type LinkState = { url?: string; name?: string; error?: string };

export async function createLink(_: LinkState, formData: FormData): Promise<LinkState> {
  const project = await studioProject(formData.get("code"));
  const name = clip(formData.get("name"), 60);
  if (!name) return { error: "Как зовут человека?" };
  const token = newToken();
  const db = await getDb();
  await db.insert(accessLinks).values({ id: newId(), projectId: project.id, name, tokenHash: hashToken(token) });
  await logEvent(project, "link", `выдана ссылка: ${name}`, { notify: false });
  refresh();
  return { url: `${cabinetConfig.baseUrl}/k/${token}`, name };
}

export async function revokeLink(formData: FormData) {
  const project = await studioProject(formData.get("code"));
  const id = String(formData.get("id") ?? "");
  const db = await getDb();
  await db
    .update(accessLinks)
    .set({ revokedAt: new Date() })
    .where(and(eq(accessLinks.id, id), eq(accessLinks.projectId, project.id)));
  refresh();
}

/* ── Версии и файлы ── */

const VERSION_KINDS: VersionKind[] = ["teaser", "film", "other"];
const FILE_KINDS: FileKind[] = ["film", "teaser", "vertical", "recording", "other"];

/** Создаёт версию и выдаёт адрес, куда браузер студии зальёт видео. */
export async function startVersionUpload(code: string, kind: VersionKind, fileName: string) {
  const project = await studioProject(code);
  if (!VERSION_KINDS.includes(kind)) throw new Error("Неизвестный тип версии");
  const db = await getDb();
  const [last] = await db
    .select({ number: max(versions.number) })
    .from(versions)
    .where(and(eq(versions.projectId, project.id), eq(versions.kind, kind)));
  const number = (last?.number ?? 0) + 1;
  const id = newId();
  const key = `projects/${project.id}/versions/${id}${path.extname(safeName(fileName)) || ".mp4"}`;
  await db.insert(versions).values({
    id,
    projectId: project.id,
    kind,
    number,
    title: `${kindOf(project.kind).versions[kind]}, версия ${number}`,
    videoKey: key,
  });
  return { id, uploadUrl: storage.uploadUrl(key) };
}

export async function finishVersionUpload(code: string, versionId: string) {
  const project = await studioProject(code);
  const db = await getDb();
  const [version] = await db
    .select()
    .from(versions)
    .where(and(eq(versions.id, versionId), eq(versions.projectId, project.id)));
  if (!version) throw new Error("Версия не найдена");
  const size = await storage.size(version.videoKey);
  if (!size) throw new Error("Файл не дошёл до хранилища");
  await db.update(versions).set({ status: "review", sizeBytes: size }).where(eq(versions.id, version.id));
  // Прежние версии того же ролика, ещё не согласованные, уходят в историю.
  await db
    .update(versions)
    .set({ status: "superseded" })
    .where(
      and(
        eq(versions.projectId, project.id),
        eq(versions.kind, version.kind),
        ne(versions.id, version.id),
        inArray(versions.status, ["review", "changes"]),
      ),
    );
  await logEvent(project, "version", `загружена «${version.title}»`, { notify: false });
  refresh();
}

export async function deleteVersion(formData: FormData) {
  const project = await studioProject(formData.get("code"));
  const db = await getDb();
  const [version] = await db
    .select()
    .from(versions)
    .where(and(eq(versions.id, String(formData.get("id") ?? "")), eq(versions.projectId, project.id)));
  if (!version) return;
  await storage.remove(version.videoKey);
  await db.delete(versions).where(eq(versions.id, version.id));
  if (project.premiereVersionId === version.id) {
    await db.update(projects).set({ premiereVersionId: null }).where(eq(projects.id, project.id));
  }
  refresh();
}

export async function startFileUpload(code: string, kind: FileKind, title: string, fileName: string) {
  const project = await studioProject(code);
  if (!FILE_KINDS.includes(kind)) throw new Error("Неизвестный тип файла");
  const id = newId();
  const name = safeName(fileName);
  const key = `projects/${project.id}/files/${id}-${name}`;
  const db = await getDb();
  await db.insert(files).values({
    id,
    projectId: project.id,
    kind,
    title: clip(title, 120) || fileName,
    storageKey: key,
    fileName: clip(fileName, 200) || name,
  });
  return { id, uploadUrl: storage.uploadUrl(key) };
}

export async function finishFileUpload(code: string, fileId: string) {
  const project = await studioProject(code);
  const db = await getDb();
  const [file] = await db
    .select()
    .from(files)
    .where(and(eq(files.id, fileId), eq(files.projectId, project.id)));
  if (!file) throw new Error("Файл не найден");
  const size = await storage.size(file.storageKey);
  if (!size) throw new Error("Файл не дошёл до хранилища");
  await db.update(files).set({ ready: true, sizeBytes: size }).where(eq(files.id, file.id));
  await logEvent(project, "file", `добавлен файл «${file.title}»`, { notify: false });
  refresh();
}

export async function deleteFile(formData: FormData) {
  const project = await studioProject(formData.get("code"));
  const db = await getDb();
  const [file] = await db
    .select()
    .from(files)
    .where(and(eq(files.id, String(formData.get("id") ?? "")), eq(files.projectId, project.id)));
  if (!file) return;
  await storage.remove(file.storageKey);
  await db.delete(files).where(eq(files.id, file.id));
  refresh();
}

/* ── Правки ── */

const STATUSES: CommentStatus[] = ["open", "done", "kept"];

export async function updateComment(formData: FormData) {
  const project = await studioProject(formData.get("code"));
  const status = String(formData.get("status") ?? "") as CommentStatus;
  const db = await getDb();
  const own = db.select({ id: versions.id }).from(versions).where(eq(versions.projectId, project.id));
  await db
    .update(comments)
    .set({ status: STATUSES.includes(status) ? status : "open", reply: clip(formData.get("reply"), 1000) || null })
    .where(and(eq(comments.id, String(formData.get("id") ?? "")), inArray(comments.versionId, own)));
  refresh();
}

/* ── Премьера ── */

export async function updatePremiere(formData: FormData) {
  const project = await studioProject(formData.get("code"));
  const db = await getDb();
  if (formData.get("enabled") !== "on") {
    await db.update(projects).set({ premiereSlug: null, premierePassword: null }).where(eq(projects.id, project.id));
    refresh();
    return;
  }
  const versionId = String(formData.get("versionId") ?? "") || null;
  await db
    .update(projects)
    .set({
      premiereSlug: project.premiereSlug ?? newCode().replace("hf-", "p-"),
      premierePassword: formData.get("newPassword") === "1" || !project.premierePassword ? newPremierePassword() : project.premierePassword,
      premiereVersionId: versionId,
    })
    .where(eq(projects.id, project.id));
  refresh();
}

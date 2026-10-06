"use server";

import { timingSafeEqual } from "node:crypto";
import { refresh } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { and, count, eq, isNull, lte } from "drizzle-orm";
import { requireCabinet, requireClientLink } from "@/cabinet/auth";
import { getDb } from "@/cabinet/db";
import { comments, projects, questionnaires, rounds, stages, testimonials, versions } from "@/cabinet/db/schema";
import { plural } from "@/cabinet/format";
import { logEvent } from "@/cabinet/notify";
import { rememberPremiere } from "@/cabinet/session";
import { clip, newId } from "@/cabinet/util";
import { normalizeQuestionnaire } from "@/cabinet/project";

/* ── Анкета ── */

export async function saveQuestionnaire(code: string, input: unknown) {
  const { project, link } = await requireClientLink(code);
  const data = normalizeQuestionnaire(input);
  const db = await getDb();
  await db
    .insert(questionnaires)
    .values({ projectId: project.id, data, updatedBy: link.name })
    .onConflictDoUpdate({ target: questionnaires.projectId, set: { data, updatedAt: new Date(), updatedBy: link.name } });
  await logEvent(project, "questionnaire", `анкета обновлена (${link.name})`);
  refresh();
  return { savedAt: new Date().toISOString() };
}

/* ── Правки ── */

async function reviewVersion(projectId: string, versionId: string) {
  const db = await getDb();
  const [version] = await db
    .select()
    .from(versions)
    .where(and(eq(versions.id, versionId), eq(versions.projectId, projectId)));
  if (!version || version.status !== "review") throw new Error("Эта версия уже не на согласовании");
  return version;
}

export async function addComment(code: string, versionId: string, timecodeMs: number | null, body: string) {
  const { project, link } = await requireClientLink(code);
  const version = await reviewVersion(project.id, versionId);
  const text = clip(body, 2000);
  if (!text) throw new Error("Пустая правка");
  const db = await getDb();
  await db.insert(comments).values({
    id: newId(),
    versionId: version.id,
    authorLinkId: link.id,
    authorName: link.name,
    timecodeMs: timecodeMs != null && Number.isFinite(timecodeMs) ? Math.max(0, Math.round(timecodeMs)) : null,
    body: text,
  });
  refresh();
}

/** Удалить можно только свой черновик: отправленное уже у студии. */
export async function deleteComment(code: string, commentId: string) {
  const { project, link } = await requireClientLink(code);
  const db = await getDb();
  const [comment] = await db
    .select({ id: comments.id, versionId: comments.versionId })
    .from(comments)
    .innerJoin(versions, eq(comments.versionId, versions.id))
    .where(and(eq(comments.id, commentId), eq(versions.projectId, project.id), eq(comments.authorLinkId, link.id), isNull(comments.submittedAt)));
  if (!comment) return;
  await db.delete(comments).where(eq(comments.id, comment.id));
  refresh();
}

/** Все черновики версии — обоих — уходят студии одним кругом. */
export async function submitRound(code: string, versionId: string) {
  const { project, link } = await requireClientLink(code);
  const version = await reviewVersion(project.id, versionId);
  const db = await getDb();
  const [drafts] = await db
    .select({ n: count() })
    .from(comments)
    .where(and(eq(comments.versionId, version.id), isNull(comments.submittedAt)));
  const notes = Number(drafts?.n ?? 0);
  if (!notes) throw new Error("Нет правок для отправки");

  const [used] = await db
    .select({ n: count() })
    .from(rounds)
    .innerJoin(versions, eq(rounds.versionId, versions.id))
    .where(and(eq(rounds.projectId, project.id), eq(versions.kind, version.kind)));
  const number = Number(used?.n ?? 0) + 1;

  await db
    .update(comments)
    .set({ submittedAt: new Date(), round: number })
    .where(and(eq(comments.versionId, version.id), isNull(comments.submittedAt)));
  await db.insert(rounds).values({ id: newId(), projectId: project.id, versionId: version.id, number, notes, submittedBy: link.name });
  await db.update(versions).set({ status: "changes" }).where(eq(versions.id, version.id));
  await logEvent(
    project,
    "round",
    `${notes} ${plural(notes, ["правка", "правки", "правок"])} к «${version.title}», круг ${number} из ${project.roundsIncluded} (${link.name})`,
  );
  refresh();
}

export async function approveVersion(code: string, versionId: string) {
  const { project, link } = await requireClientLink(code);
  const version = await reviewVersion(project.id, versionId);
  const db = await getDb();
  await db.update(versions).set({ status: "approved", approvedAt: new Date(), approvedBy: link.name }).where(eq(versions.id, version.id));
  // Согласованный тизер или фильм закрывает свой этап и все до него:
  // раз фильм готов, договор, анкета и съёмка тоже позади.
  if (version.kind === "teaser" || version.kind === "film") {
    const [stage] = await db
      .select({ position: stages.position })
      .from(stages)
      .where(and(eq(stages.projectId, project.id), eq(stages.key, version.kind)));
    if (stage) {
      await db
        .update(stages)
        .set({ doneAt: new Date() })
        .where(and(eq(stages.projectId, project.id), lte(stages.position, stage.position), isNull(stages.doneAt)));
    }
  }
  await logEvent(project, "approved", `«${version.title}» согласован (${link.name})`);
  refresh();
}

/* ── Отзыв ── */

export async function saveTestimonial(code: string, body: string, allowPublish: boolean) {
  const { project, link } = await requireClientLink(code);
  const text = clip(body, 3000);
  if (!text) throw new Error("Пустой отзыв");
  const db = await getDb();
  await db
    .insert(testimonials)
    .values({ projectId: project.id, body: text, allowPublish, authorName: link.name })
    .onConflictDoUpdate({ target: testimonials.projectId, set: { body: text, allowPublish, authorName: link.name } });
  await logEvent(project, "testimonial", `оставили отзыв${allowPublish ? ", можно показать на сайте" : ""} (${link.name})`);
  refresh();
}

/* ── Премьера для родных ── */

const premiereAttempts = new Map<string, { count: number; until: number }>();

export type PremiereState = { error?: string };

export async function unlockPremiere(_: PremiereState, formData: FormData): Promise<PremiereState> {
  requireCabinet();
  const slug = clip(formData.get("slug"), 40);
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const entry = premiereAttempts.get(ip);
  if (entry && entry.until > now && entry.count >= 10) return { error: "Слишком много попыток. Попробуйте позже." };

  const db = await getDb();
  const [project] = await db.select().from(projects).where(eq(projects.premiereSlug, slug)).limit(1);
  const given = Buffer.from(clip(formData.get("password"), 40).toLowerCase());
  const expected = Buffer.from(project?.premierePassword ?? "");
  if (!project || !expected.length || given.length !== expected.length || !timingSafeEqual(given, expected)) {
    premiereAttempts.set(ip, { count: (entry && entry.until > now ? entry.count : 0) + 1, until: now + 10 * 60 * 1000 });
    return { error: "Пароль не подошёл. Спросите его у того, кто прислал ссылку." };
  }
  await rememberPremiere(slug);
  redirect(`/premiere/${slug}`);
}

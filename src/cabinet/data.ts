import "server-only";
import { and, asc, count, desc, eq, inArray, isNotNull, isNull, ne } from "drizzle-orm";
import { getDb } from "@/cabinet/db";
import {
  accessLinks,
  comments,
  events,
  files,
  projects,
  questionnaires,
  rounds,
  stages,
  testimonials,
  versions,
  type Project,
} from "@/cabinet/db/schema";
import { normalizeQuestionnaire, type ProjectState } from "@/cabinet/project";

/** Всё о проекте, что нужно маршруту и карточке «что нужно от вас». */
export async function loadProjectState(project: Project, { forStudio = false } = {}): Promise<ProjectState & { submittedOpen: number; roundsUsed: number }> {
  const db = await getDb();
  const [stageRows, versionRows, fileRows, [questionnaire], [testimonial], draftRows, [openRow], [roundRow]] = await Promise.all([
    db.select().from(stages).where(eq(stages.projectId, project.id)).orderBy(asc(stages.position)),
    db
      .select()
      .from(versions)
      .where(forStudio ? eq(versions.projectId, project.id) : and(eq(versions.projectId, project.id), ne(versions.status, "uploading")))
      .orderBy(desc(versions.createdAt)),
    db
      .select()
      .from(files)
      .where(forStudio ? eq(files.projectId, project.id) : and(eq(files.projectId, project.id), eq(files.ready, true)))
      .orderBy(asc(files.createdAt)),
    db.select().from(questionnaires).where(eq(questionnaires.projectId, project.id)),
    db.select().from(testimonials).where(eq(testimonials.projectId, project.id)),
    db
      .select({ versionId: comments.versionId, drafts: count() })
      .from(comments)
      .innerJoin(versions, eq(comments.versionId, versions.id))
      .where(and(eq(versions.projectId, project.id), isNull(comments.submittedAt)))
      .groupBy(comments.versionId),
    db
      .select({ open: count() })
      .from(comments)
      .innerJoin(versions, eq(comments.versionId, versions.id))
      .where(and(eq(versions.projectId, project.id), isNotNull(comments.submittedAt), eq(comments.status, "open"))),
    db.select({ used: count() }).from(rounds).where(eq(rounds.projectId, project.id)),
  ]);

  return {
    project,
    stages: stageRows,
    versions: versionRows,
    files: fileRows,
    questionnaire: questionnaire ? normalizeQuestionnaire(questionnaire.data) : null,
    testimonial: testimonial ?? null,
    drafts: Object.fromEntries(draftRows.map((row) => [row.versionId, Number(row.drafts)])),
    submittedOpen: Number(openRow?.open ?? 0),
    roundsUsed: Number(roundRow?.used ?? 0),
  };
}

export async function listStudioProjects() {
  const db = await getDb();
  const rows = await db.select().from(projects).where(isNull(projects.archivedAt)).orderBy(asc(projects.eventDate));
  return Promise.all(rows.map((project) => loadProjectState(project, { forStudio: true })));
}

export async function loadStudioExtras(projectId: string) {
  const db = await getDb();
  const [links, feed] = await Promise.all([
    db.select().from(accessLinks).where(eq(accessLinks.projectId, projectId)).orderBy(asc(accessLinks.createdAt)),
    db.select().from(events).where(eq(events.projectId, projectId)).orderBy(desc(events.createdAt)).limit(30),
  ]);
  return { links, feed };
}

/**
 * Версия с правками. Пара видит свои черновики и отправленные правки;
 * студия — только отправленные: черновик ещё не решение пары.
 */
export async function loadVersion(projectId: string, versionId: string, { forStudio = false } = {}) {
  const db = await getDb();
  const [version] = await db
    .select()
    .from(versions)
    .where(and(eq(versions.id, versionId), eq(versions.projectId, projectId)))
    .limit(1);
  if (!version) return null;
  const notes = await db
    .select()
    .from(comments)
    .where(forStudio ? and(eq(comments.versionId, version.id), isNotNull(comments.submittedAt)) : eq(comments.versionId, version.id))
    .orderBy(asc(comments.timecodeMs), asc(comments.createdAt));
  return { version, comments: notes };
}

export async function findProjectByCode(code: string) {
  const db = await getDb();
  const [project] = await db.select().from(projects).where(eq(projects.code, code)).limit(1);
  return project ?? null;
}

export async function findProjectsByIds(ids: string[]) {
  if (!ids.length) return [];
  const db = await getDb();
  return db.select().from(projects).where(inArray(projects.id, ids));
}

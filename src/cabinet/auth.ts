import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { cabinetEnabled } from "@/cabinet/config";
import { getDb } from "@/cabinet/db";
import { accessLinks, projects, type AccessLink, type Project } from "@/cabinet/db/schema";
import { hasStudioSession, readClientLinks } from "@/cabinet/session";

/**
 * Проверки доступа. Каждая страница и каждое действие кабинета вызывают
 * их сами: действия доступны прямым POST-запросом, мимо интерфейса.
 */
export function requireCabinet() {
  if (!cabinetEnabled()) notFound();
}

export const isStudio = cache(async () => {
  requireCabinet();
  return hasStudioSession();
});

export async function requireStudio() {
  if (!(await isStudio())) redirect("/studio/login");
}

/** link пустой — это студия смотрит кабинет глазами пары. */
export type ClientAccess = { project: Project; link: AccessLink | null };

export const getClientAccess = cache(async (code: string): Promise<ClientAccess | null> => {
  requireCabinet();
  const db = await getDb();
  const linkIds = await readClientLinks();
  if (linkIds.length) {
    const [row] = await db
      .select()
      .from(accessLinks)
      .innerJoin(projects, eq(accessLinks.projectId, projects.id))
      .where(and(inArray(accessLinks.id, linkIds), isNull(accessLinks.revokedAt), eq(projects.code, code)))
      .limit(1);
    if (row) return { project: row.projects, link: row.access_links };
  }
  if (await hasStudioSession()) {
    const [project] = await db.select().from(projects).where(eq(projects.code, code)).limit(1);
    if (project) return { project, link: null };
  }
  return null;
});

export async function requireClientAccess(code: string) {
  const access = await getClientAccess(code);
  if (!access) redirect("/cabinet");
  return access;
}

/** Для действий пары: правки и согласование — только по личной ссылке. */
export async function requireClientLink(code: string) {
  const access = await getClientAccess(code);
  if (!access?.link) throw new Error("Нет доступа к проекту");
  return { project: access.project, link: access.link };
}

import { and, eq, isNull } from "drizzle-orm";
import { cabinetEnabled } from "@/cabinet/config";
import { getDb } from "@/cabinet/db";
import { accessLinks, projects } from "@/cabinet/db/schema";
import { logEvent } from "@/cabinet/notify";
import { rememberClientLink } from "@/cabinet/session";
import { hashToken } from "@/cabinet/util";

/**
 * Личная ссылка из мессенджера: /k/<токен>. Запоминаем её в куке и
 * уводим на чистый адрес кабинета, чтобы токен не оставался в истории
 * и в закладках.
 */
export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  if (!cabinetEnabled()) return new Response("Not found", { status: 404 });
  const { token } = await params;
  const db = await getDb();
  const [row] = await db
    .select()
    .from(accessLinks)
    .innerJoin(projects, eq(accessLinks.projectId, projects.id))
    .where(and(eq(accessLinks.tokenHash, hashToken(token)), isNull(accessLinks.revokedAt)))
    .limit(1);

  if (!row) return seeOther("/cabinet?link=invalid");

  const link = row.access_links;
  await rememberClientLink(link.id);
  await db.update(accessLinks).set({ lastSeenAt: new Date() }).where(eq(accessLinks.id, link.id));
  if (!link.lastSeenAt) await logEvent(row.projects, "opened", `кабинет открыт впервые (${link.name})`);
  return seeOther(`/cabinet/${row.projects.code}`);
}

// Не Response.redirect: у него заголовки только для чтения, и Next не
// смог бы дописать к ответу куку. Адрес относительный — работает и за
// прокси сервера, и локально.
function seeOther(pathname: string) {
  return new Response(null, { status: 303, headers: { Location: pathname } });
}

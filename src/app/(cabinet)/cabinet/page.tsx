import Link from "next/link";
import { redirect } from "next/navigation";
import { and, inArray, isNull } from "drizzle-orm";
import { requireCabinet } from "@/cabinet/auth";
import { getDb } from "@/cabinet/db";
import { accessLinks } from "@/cabinet/db/schema";
import { findProjectsByIds } from "@/cabinet/data";
import { formatDay } from "@/cabinet/format";
import { readClientLinks } from "@/cabinet/session";
import CabinetBar from "@/components/cabinet/CabinetBar";
import { contacts } from "@/content/site";

export const metadata = { title: "Кабинет" };

/**
 * Кабинет без адреса проекта. Один проект — сразу туда; несколько —
 * список; ни одного — как попасть внутрь.
 */
export default async function CabinetIndex({ searchParams }: { searchParams: Promise<{ link?: string }> }) {
  requireCabinet();
  const { link } = await searchParams;
  const ids = await readClientLinks();
  const db = await getDb();
  const live = ids.length
    ? await db.select().from(accessLinks).where(and(inArray(accessLinks.id, ids), isNull(accessLinks.revokedAt)))
    : [];
  const projects = await findProjectsByIds([...new Set(live.map((item) => item.projectId))]);

  if (projects.length === 1 && link !== "invalid") redirect(`/cabinet/${projects[0].code}`);

  return (
    <>
      <CabinetBar kind="client" />
      <div className="wrap cab-main">
        <h1 className="display display--h2">Кабинет</h1>
        {link === "invalid" ? (
          <p className="notice notice--error mt-8 max-w-[40em]">Эта ссылка больше не работает: её могли заменить новой. Напишите нам — пришлём свежую.</p>
        ) : null}

        {projects.length ? (
          <ul className="cab-rows mt-10 max-w-[900px]">
            {projects.map((project) => (
              <li key={project.id} className="cab-row">
                <div>
                  <p className="cab-row__title">{project.title}</p>
                  <p className="cab-row__meta">{[formatDay(project.eventDate), project.city].filter(Boolean).join(", ")}</p>
                </div>
                <Link href={`/cabinet/${project.code}`} className="btn btn--line btn--sm">
                  Открыть
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="lead mt-6 max-w-[34em]">
            Кабинет открывается по личной ссылке, которую мы присылаем в Telegram или WhatsApp. Потерялась — напишите нам.
          </p>
        )}

        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="link-line">
            Написать в Telegram
          </a>
          <a href={contacts.phoneHref} className="link-line num">
            {contacts.phone}
          </a>
        </p>
      </div>
    </>
  );
}

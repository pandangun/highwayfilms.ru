import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { isStudio, requireCabinet } from "@/cabinet/auth";
import { loadVersion } from "@/cabinet/data";
import { getDb } from "@/cabinet/db";
import { projects } from "@/cabinet/db/schema";
import { formatDay } from "@/cabinet/format";
import { readPremieres } from "@/cabinet/session";
import { storage } from "@/cabinet/storage";
import { PremiereUnlock } from "@/components/cabinet/small";

export const metadata = { title: "Просмотр" };

/**
 * Просмотр по ссылке и паролю — премьера для родных или показ коллегам,
 * без входа в кабинет. Только просмотр: скачивают файлы в кабинете.
 */
export default async function PremierePage({ params }: { params: Promise<{ slug: string }> }) {
  requireCabinet();
  const { slug } = await params;
  const db = await getDb();
  const [project] = await db.select().from(projects).where(eq(projects.premiereSlug, slug)).limit(1);
  if (!project?.premierePassword || !project.premiereVersionId) notFound();

  const unlocked = (await readPremieres()).includes(slug) || (await isStudio());
  const film = unlocked ? await loadVersion(project.id, project.premiereVersionId) : null;

  return (
    <div className="wrap cab-main">
      <div className="premiere">
        <Link href="/" className="cab-bar__brand">
          Highway Films
        </Link>
        <h1 className="display display--h1 mt-8">{project.title}</h1>
        {project.eventDate ? <p className="cab-hero__meta mt-0">{formatDay(project.eventDate)}</p> : null}

        {film ? (
          <div className="premiere__screen">
            <video src={storage.downloadUrl(film.version.videoKey)} controls playsInline preload="metadata" controlsList="nodownload" />
          </div>
        ) : (
          <>
            <p className="lead mt-4 max-w-[30em]">Видео открывается по паролю — его знает тот, кто прислал ссылку.</p>
            <PremiereUnlock slug={slug} />
          </>
        )}
      </div>
    </div>
  );
}

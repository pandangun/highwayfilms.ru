import Link from "next/link";
import { notFound } from "next/navigation";
import { and, count, eq } from "drizzle-orm";
import { requireClientAccess } from "@/cabinet/auth";
import { loadVersion } from "@/cabinet/data";
import { getDb } from "@/cabinet/db";
import { rounds, versions } from "@/cabinet/db/schema";
import { formatDateTime } from "@/cabinet/format";
import { storage } from "@/cabinet/storage";
import CabinetBar from "@/components/cabinet/CabinetBar";
import ReviewRoom from "@/components/cabinet/ReviewRoom";
import VersionChip from "@/components/cabinet/VersionChip";

export const metadata = { title: "Просмотр" };

export default async function VersionPage({ params }: { params: Promise<{ code: string; id: string }> }) {
  const { code, id } = await params;
  const { project, link } = await requireClientAccess(code);
  const data = await loadVersion(project.id, id);
  if (!data || data.version.status === "uploading") notFound();
  const { version } = data;

  const db = await getDb();
  const [used] = await db
    .select({ n: count() })
    .from(rounds)
    .innerJoin(versions, eq(rounds.versionId, versions.id))
    .where(and(eq(rounds.projectId, project.id), eq(versions.kind, version.kind)));

  // Черновики видит только пара; студия в просмотре их не видит — как и в своём разделе.
  const notes = data.comments
    .filter((comment) => link || comment.submittedAt)
    .map((comment) => ({
      id: comment.id,
      ms: comment.timecodeMs,
      author: comment.authorName,
      body: comment.body,
      status: comment.status,
      reply: comment.reply,
      draft: !comment.submittedAt,
      mine: Boolean(link && comment.authorLinkId === link.id),
    }));

  return (
    <>
      <CabinetBar kind="client" />
      <div className="wrap cab-main">
        <Link href={`/cabinet/${project.code}`} className="link-line text-small">
          К проекту
        </Link>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="display display--h2">{version.title}</h1>
          <VersionChip status={version.status} />
        </div>
        {version.status === "approved" ? (
          <p className="cab-muted mt-3">
            Согласовано {formatDateTime(version.approvedAt)}
            {version.approvedBy ? ` (${version.approvedBy})` : ""}.
          </p>
        ) : version.status === "changes" ? (
          <p className="cab-muted mt-3">Правки у студии. Новая версия появится в кабинете, мы напишем.</p>
        ) : null}

        <ReviewRoom
          code={project.code}
          versionId={version.id}
          title={version.title}
          videoUrl={storage.downloadUrl(version.videoKey)}
          notes={notes}
          canEdit={Boolean(link) && version.status === "review"}
          rounds={{ used: Number(used?.n ?? 0), included: project.roundsIncluded }}
        />
      </div>
    </>
  );
}

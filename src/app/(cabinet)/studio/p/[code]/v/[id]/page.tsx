import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStudio } from "@/cabinet/auth";
import { findProjectByCode, loadVersion } from "@/cabinet/data";
import { formatDateTime } from "@/cabinet/format";
import { storage } from "@/cabinet/storage";
import CabinetBar from "@/components/cabinet/CabinetBar";
import StudioReview from "@/components/cabinet/StudioReview";
import VersionChip from "@/components/cabinet/VersionChip";

export const metadata = { title: "Правки" };

export default async function StudioVersionPage({ params }: { params: Promise<{ code: string; id: string }> }) {
  await requireStudio();
  const { code, id } = await params;
  const project = await findProjectByCode(code);
  const data = project ? await loadVersion(project.id, id, { forStudio: true }) : null;
  if (!project || !data) notFound();
  const { version } = data;
  const markers = `/studio/p/${project.code}/v/${version.id}/markers`;

  return (
    <>
      <CabinetBar kind="studio" />
      <div className="wrap cab-main">
        <Link href={`/studio/p/${project.code}`} className="link-line text-small">
          {project.title}
        </Link>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="display display--h2">{version.title}</h1>
          <VersionChip status={version.status} studio />
        </div>
        {version.approvedAt ? (
          <p className="cab-muted mt-3">
            Согласовано {formatDateTime(version.approvedAt)}
            {version.approvedBy ? ` (${version.approvedBy})` : ""}.
          </p>
        ) : null}

        {data.comments.length ? (
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-small">
            <a href={`${markers}?format=edl`} className="link-line">
              Маркеры для DaVinci Resolve (EDL)
            </a>
            <a href={`${markers}?format=csv`} className="link-line">
              Таблица правок (CSV)
            </a>
          </p>
        ) : null}

        <StudioReview
          code={project.code}
          videoUrl={storage.downloadUrl(version.videoKey)}
          notes={data.comments.map((comment) => ({
            id: comment.id,
            ms: comment.timecodeMs,
            author: comment.authorName,
            body: comment.body,
            status: comment.status,
            reply: comment.reply,
            round: comment.round,
          }))}
        />
      </div>
    </>
  );
}

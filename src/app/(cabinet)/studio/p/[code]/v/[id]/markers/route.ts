import { isStudio } from "@/cabinet/auth";
import { findProjectByCode, loadVersion } from "@/cabinet/data";
import { markersCsv, markersEdl } from "@/cabinet/markers";

/** Правки версии файлом: ?format=edl — маркеры для DaVinci Resolve, csv — таблица. */
export async function GET(request: Request, { params }: { params: Promise<{ code: string; id: string }> }) {
  if (!(await isStudio())) return new Response("Forbidden", { status: 403 });
  const { code, id } = await params;
  const project = await findProjectByCode(code);
  const data = project ? await loadVersion(project.id, id, { forStudio: true }) : null;
  if (!project || !data) return new Response("Not found", { status: 404 });

  const format = new URL(request.url).searchParams.get("format") === "csv" ? "csv" : "edl";
  const base = `${project.code}-${data.version.kind}-v${data.version.number}`;
  const body =
    format === "csv"
      ? markersCsv(data.comments)
      : markersEdl({ title: `${project.title} ${data.version.title}`, fps: project.fps, comments: data.comments });

  return new Response(body, {
    headers: {
      "Content-Type": format === "csv" ? "text/csv; charset=utf-8" : "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${base}.${format}"`,
      "Cache-Control": "no-store",
    },
  });
}

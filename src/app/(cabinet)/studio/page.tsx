import Link from "next/link";
import { requireStudio } from "@/cabinet/auth";
import { listStudioProjects } from "@/cabinet/data";
import { formatDay } from "@/cabinet/format";
import { kindOf } from "@/cabinet/kinds";
import { currentStage, studioTurn } from "@/cabinet/project";
import CabinetBar from "@/components/cabinet/CabinetBar";

export const metadata = { title: "Проекты" };

/** Все проекты по главной дате: тип, этап и чей сейчас ход. */
export default async function StudioHome() {
  await requireStudio();
  const list = await listStudioProjects();

  return (
    <>
      <CabinetBar kind="studio" />
      <div className="wrap cab-main">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="display display--h2">Проекты</h1>
          <Link href="/studio/new" className="btn btn--primary">
            Новый проект
          </Link>
        </div>

        {list.length ? (
          <ul className="st-list mt-10">
            {list.map((state) => {
              const turn = studioTurn(state);
              return (
                <li key={state.project.id}>
                  <Link href={`/studio/p/${state.project.code}`}>
                    <span className="cab-muted num">{formatDay(state.project.eventDate) || "без даты"}</span>
                    <span>
                      <span className="st-list__title">{state.project.title}</span>
                      <span className="cab-muted"> {[kindOf(state.project.kind).label, state.project.city].filter(Boolean).join(", ")}</span>
                    </span>
                    <span className="cab-muted">{currentStage(state.stages)?.title ?? "Всё сдано"}</span>
                    <span className="cab-chip" data-tone={turn.who === "studio" ? "wait" : "led"}>
                      {turn.text}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="lead mt-8">Проектов пока нет. Создайте первый.</p>
        )}
      </div>
    </>
  );
}

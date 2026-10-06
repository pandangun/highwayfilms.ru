import { Check } from "lucide-react";
import type { Stage } from "@/cabinet/db/schema";
import { formatDay } from "@/cabinet/format";
import { currentStage } from "@/cabinet/project";

/**
 * Маршрут проекта — узлы, как этапы на сайте: пройденные горят ровно,
 * текущий светится, впереди — тусклые.
 */
export default function RouteList({ stages }: { stages: Stage[] }) {
  const current = currentStage(stages);
  return (
    <ol className="cab-route">
      {stages.map((stage, index) => {
        const state = stage.doneAt ? "done" : stage.id === current?.id ? "current" : "next";
        return (
          <li key={stage.id} className="cab-route__item" data-state={state}>
            <span className="cab-route__node">
              <span className="route-node" aria-hidden>
                {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
              </span>
            </span>
            <span className="cab-route__title">
              {stage.title}
              {state === "current" ? <span className="visually-hidden"> — сейчас</span> : null}
              {state === "done" ? <span className="visually-hidden"> — готово</span> : null}
            </span>
            <span className="cab-route__date">
              {state === "done" ? `готово ${formatDay(stage.doneAt, { withYear: false })}` : stage.dueOn ? `до ${formatDay(stage.dueOn)}` : " "}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

import type { VersionStatus } from "@/cabinet/db/schema";

const LABELS: Record<VersionStatus, { text: string; tone: string }> = {
  uploading: { text: "Загружается", tone: "muted" },
  review: { text: "Ждёт вашего ответа", tone: "led" },
  changes: { text: "Правки у студии", tone: "wait" },
  approved: { text: "Согласовано", tone: "ok" },
  superseded: { text: "Заменена новой версией", tone: "muted" },
};

// В студии тот же статус читается с другой стороны.
const STUDIO_LABELS: Partial<Record<VersionStatus, string>> = {
  review: "На просмотре у клиента",
  changes: "Правки пришли",
};

export default function VersionChip({ status, studio = false }: { status: VersionStatus; studio?: boolean }) {
  const label = LABELS[status];
  return (
    <span className="cab-chip" data-tone={label.tone}>
      {(studio && STUDIO_LABELS[status]) || label.text}
    </span>
  );
}

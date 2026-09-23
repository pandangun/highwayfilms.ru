import clsx from "clsx";

type ProjectStatusBadgeProps = {
  label: string;
  tone: "violet" | "amber" | "emerald" | "slate";
};

/**
 * Статус проекта: точка цвета и подпись. Цвет несёт смысл —
 * латунь «ждёт вас», слоновая кость «готово», серый «в работе у нас».
 */
export function ProjectStatusBadge({ label, tone }: ProjectStatusBadgeProps) {
  return (
    <span className={clsx("status", `status--${tone}`)}>
      <span className="status__dot" aria-hidden />
      {label}
    </span>
  );
}

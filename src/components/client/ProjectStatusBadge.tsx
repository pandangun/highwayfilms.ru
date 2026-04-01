import clsx from "clsx";

type ProjectStatusBadgeProps = {
  label: string;
  tone: "violet" | "amber" | "emerald" | "slate";
};

export function ProjectStatusBadge({ label, tone }: ProjectStatusBadgeProps) {
  return <span className={clsx("status-pill", `status-pill--${tone}`)}>{label}</span>;
}

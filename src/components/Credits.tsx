import type { ReactNode } from "react";
import clsx from "clsx";

export type CreditItem = {
  label: ReactNode;
  value: ReactNode;
};

/**
 * Пары «подпись — значение», набранные как финальные титры: подпись
 * прижата к центральной оси справа, значение — слева. На телефоне
 * встают столбиком по центру, как титры, идущие вверх.
 */
export default function Credits({
  items,
  size = "md",
  className,
}: {
  items: CreditItem[];
  size?: "md" | "lg";
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <dl className={clsx("credits", size === "lg" && "credits--lg", className)}>
      {items.map((item, index) => (
        <div key={index}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

import clsx from "clsx";

type PriceBadgeProps = {
  value: string;
  mode?: "from" | "plain";
  fromLabel?: string;
  className?: string;
};

export default function PriceBadge({
  value,
  mode = "from",
  fromLabel = "от",
  className,
}: PriceBadgeProps) {
  const content = mode === "from" ? `${fromLabel} ${value}` : value;

  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[linear-gradient(90deg,rgba(124,58,237,.25),rgba(255,255,255,.12))] px-2.5 py-1 text-[12px] font-medium text-white/90 ring-1 ring-white/15",
        className
      )}
    >
      {content}
    </span>
  );
}

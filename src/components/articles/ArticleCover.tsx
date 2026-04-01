import clsx from "clsx";

type ArticleCoverProps = {
  title?: string;
  eyebrow: string;
  detail: string;
  tone: "violet" | "amber" | "blue" | "crimson" | "forest";
  compact?: boolean;
};

export function ArticleCover({ title, eyebrow, detail, tone, compact = false }: ArticleCoverProps) {
  return (
    <div className={clsx("editorial-cover", `editorial-cover--${tone}`, compact ? "min-h-[15rem]" : "min-h-[20rem] md:min-h-[26rem]")}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,.06),rgba(8,8,10,.6))]" />
      <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-white/52">
          <span>{eyebrow}</span>
          <span>{detail}</span>
        </div>
        <div className="max-w-3xl">
          <div className="mb-4 h-px w-24 bg-gradient-to-r from-white/65 via-[#d6b78a] to-transparent" />
          {title ? (
            <h2 className={clsx("font-display heading-balance text-white", compact ? "text-[clamp(1.7rem,1.4rem+1vw,2.4rem)] leading-[1]" : "text-[clamp(2.4rem,2rem+2.1vw,4.4rem)] leading-[0.96] tracking-[-0.05em]")}>
              {title}
            </h2>
          ) : null}
        </div>
      </div>
    </div>
  );
}

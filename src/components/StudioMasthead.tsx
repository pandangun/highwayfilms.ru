import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import CommercialsHeroStage from "@/components/CommercialsHeroStage";

type StudioMastheadProps = {
  eyebrow: string;
  title: string;
  lead: string;
  heroVariant?: "default" | "commercials";
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  chips?: string[];
  metrics?: Array<{ value: string; label: string }>;
  panelEyebrow: string;
  panelTitle: string;
  panelCopy: string;
  imageSrc: string;
  imageAlt: string;
  spotlight?: ReactNode;
  compactTop?: boolean;
};

export default function StudioMasthead({
  eyebrow,
  title,
  lead,
  heroVariant = "default",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  chips = [],
  metrics = [],
  panelEyebrow,
  panelTitle,
  panelCopy,
  imageSrc,
  imageAlt,
  spotlight,
  compactTop = false,
}: StudioMastheadProps) {
  const isCommercialsHero = heroVariant === "commercials";

  const mastheadInner = (
    <>
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(72rem_38rem_at_8%_0%,rgba(124,58,237,.22),transparent_58%),radial-gradient(52rem_28rem_at_100%_0%,rgba(214,183,138,.14),transparent_50%),linear-gradient(180deg,rgba(255,255,255,.02),transparent_42%)]",
          isCommercialsHero && "commercials-hero__ambient"
        )}
      />

      {isCommercialsHero ? (
        <div className="commercials-hero__stage" aria-hidden="true">
          <div className="commercials-hero__darkness" />
          <div className="commercials-hero__light commercials-hero__light--left" />
          <div className="commercials-hero__light commercials-hero__light--right" />
        </div>
      ) : null}

      <div className={clsx("service-masthead-frame container relative overflow-hidden pb-12", isCommercialsHero && "z-10")}>
        <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr] xl:items-end">
          <div className={clsx("service-masthead-copy relative", isCommercialsHero && "commercials-hero__content")}>
            <p className={clsx("eyebrow flex items-center gap-2", isCommercialsHero && "commercials-hero__eyebrow")}>
              <Sparkles className="h-4 w-4 text-brand" />
              {eyebrow}
            </p>
            <h1 className={clsx("service-masthead-title font-display mt-4 max-w-4xl text-[clamp(3rem,7vw,5.75rem)] leading-[0.94] tracking-[-0.045em] text-white", isCommercialsHero && "commercials-hero__title")}>
              {title}
            </h1>
            <p className={clsx("service-masthead-lead mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-[1.28rem]", isCommercialsHero && "commercials-hero__lead")}>
              {lead}
            </p>

            {chips.length > 0 ? (
              <div className={clsx("service-masthead-chips mt-7 flex flex-wrap gap-3", isCommercialsHero && "commercials-hero__chips")}>
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/72"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={clsx("service-masthead-actions mt-8 flex flex-col gap-3 sm:flex-row", isCommercialsHero && "commercials-hero__actions")}>
              <Link href={primaryHref} className="btn-primary h-12 rounded-full px-6">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={secondaryHref}
                target={secondaryHref.startsWith("http") ? "_blank" : undefined}
                rel={secondaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className="btn h-12 rounded-full px-6"
              >
                {secondaryLabel}
              </a>
            </div>

            {spotlight ? <div className="mt-7">{spotlight}</div> : null}
          </div>

          <div className={clsx("service-masthead-side relative", isCommercialsHero && "commercials-hero__side")}>
            <div className={clsx("service-masthead-media surface-panel overflow-hidden p-3", isCommercialsHero && "commercials-hero__visual")}>
              <div className="relative min-h-[24rem] overflow-hidden rounded-none">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 40vw"
                  priority
                />
                <div className="studio-masthead-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                    {panelEyebrow}
                  </p>
                  <h2 className="font-display mt-2 max-w-sm text-2xl leading-tight text-white">
                    {panelTitle}
                  </h2>
                  <p className="service-masthead-panel-copy mt-3 max-w-sm text-sm leading-6 text-white/68">
                    {panelCopy}
                  </p>
                </div>
              </div>
            </div>

            {metrics.length > 0 ? (
              <div className={clsx("service-masthead-metrics mt-4 grid gap-3 sm:grid-cols-3", isCommercialsHero && "commercials-hero__metrics")}>
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="surface-quiet px-5 py-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/34">0{index + 1}</span>
                      <span className="rule-fade flex-1" />
                    </div>
                    <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-5 text-white/60">{metric.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

  if (isCommercialsHero) {
    return <CommercialsHeroStage compactTop={compactTop}>{mastheadInner}</CommercialsHeroStage>;
  }

  return (
    <section
      className={clsx(
        "service-masthead relative overflow-hidden",
        compactTop ? "pt-12 md:pt-16" : "pt-header-safe pb-14"
      )}
    >
      {mastheadInner}
    </section>
  );
}

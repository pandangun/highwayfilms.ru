import clsx from "clsx";
import type { ReactNode } from "react";

type CommercialsHeroStageProps = {
  children: ReactNode;
  compactTop?: boolean;
};

export default function CommercialsHeroStage({
  children,
  compactTop = false,
}: CommercialsHeroStageProps) {
  return (
    <section
      className={clsx(
        "commercials-hero service-masthead relative overflow-hidden",
        compactTop ? "pt-12 md:pt-16" : "pt-header-safe pb-14",
        "is-revealed",
      )}
    >
      {children}
    </section>
  );
}

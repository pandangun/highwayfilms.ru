import Link from "next/link";
import type { NextStep } from "@/cabinet/project";

/** Синий щит с одним действием. Ход студии — щит тише и без кнопки. */
export default function NextStepSign({ step }: { step: NextStep }) {
  return (
    <section className={step.who === "studio" ? "cab-sign cab-sign--studio" : "cab-sign"} aria-labelledby="next-step">
      <span className="cab-sign__label">{step.who === "client" ? "Что нужно от вас сейчас" : "Ход студии"}</span>
      <h2 id="next-step" className="cab-sign__title">
        {step.title}
      </h2>
      {step.text ? <p className="cab-sign__text">{step.text}</p> : null}
      {step.href && step.cta ? (
        <Link href={step.href} className="btn btn--primary">
          {step.cta}
        </Link>
      ) : null}
    </section>
  );
}

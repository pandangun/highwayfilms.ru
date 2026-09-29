import { Suspense } from "react";
import Estimator, { type EstimatorLevels } from "@/components/Estimator";
import EstimatorFromQuery from "@/components/EstimatorFromQuery";
import ProducerCard from "@/components/ProducerCard";
import KmPost from "@/components/road/KmPost";
import { estimateContent } from "@/content/estimate";
import { servicePages } from "@/content/services";
import { weddingsContent } from "@/content/weddings";
import type { Locale } from "@/components/siteNavigation";

/** Что на выходе у уровня — одна строка под ценой в калькуляторе. */
function deliverable(facts: { label: string; value: string }[]) {
  return (facts.find((fact) => fact.label === "На выходе" || fact.label === "Delivery") ?? facts[facts.length - 1])?.value ?? "";
}

/**
 * Страница калькулятора. Уровни берутся из текстов разделов (tiers) и
 * свадебных пакетов, цены — из pricing.ts, поэтому калькулятор не может
 * разойтись с тем, что написано в разделах.
 */
export default function EstimatePage({ locale }: { locale: Locale }) {
  const text = estimateContent[locale];
  const tiers = (slug: keyof typeof servicePages) =>
    (servicePages[slug][locale].tiers?.items ?? []).map((item) => ({ name: item.name, summary: deliverable(item.facts) }));

  const levels: EstimatorLevels = {
    commercials: tiers("commercials"),
    corporate: tiers("corporate"),
    "music-videos": tiers("music-videos"),
    ai: tiers("ai"),
    videoproduction: tiers("videoproduction"),
    weddings: weddingsContent[locale].packages.items.map((item) => ({ name: item.title, summary: item.result })),
  };

  const props = { locale, text, levels, producer: <ProducerCard locale={locale} className="mt-10" /> };

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <KmPost lang={locale} />
          <h1 className="display display--h1 max-w-[14ch]">{text.title}</h1>
          <p className="lead">{text.lead}</p>
        </div>
      </header>
      <section className="band pt-0">
        <div className="wrap">
          <Suspense fallback={<Estimator {...props} />}>
            <EstimatorFromQuery {...props} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

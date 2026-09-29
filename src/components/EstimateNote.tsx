"use client";

import { useSearchParams } from "next/navigation";
import type { Locale } from "@/components/siteNavigation";

/**
 * Расчёт из калькулятора в брифе: виден над формой и уходит студии
 * скрытым полем estimate вместе с заявкой.
 */
export default function EstimateNote({ locale }: { locale: Locale }) {
  const estimate = useSearchParams().get("estimate")?.slice(0, 1000);
  if (!estimate) return null;

  return (
    <div className="notice notice--estimate">
      <input type="hidden" name="estimate" value={estimate} />
      <p className="text-led">{locale === "en" ? "Your estimate goes with the brief:" : "Ваш расчёт уйдёт вместе с брифом:"}</p>
      <p>{estimate}</p>
    </div>
  );
}

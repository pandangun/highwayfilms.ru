"use client";

import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import Estimator from "@/components/Estimator";
import type { PricedKey } from "@/lib/pricing";

const KEYS: PricedKey[] = ["commercials", "corporate", "music-videos", "weddings", "ai", "videoproduction"];

/**
 * Калькулятор, открытый из раздела: ?service=commercials выбирает
 * направление сразу. Страница статичная, поэтому параметр читается на
 * клиенте, под Suspense: до него виден калькулятор с рекламой.
 */
export default function EstimatorFromQuery(props: Omit<ComponentProps<typeof Estimator>, "initialService">) {
  const param = useSearchParams().get("service");
  const service = KEYS.find((key) => key === param) ?? "commercials";
  return <Estimator key={service} {...props} initialService={service} />;
}

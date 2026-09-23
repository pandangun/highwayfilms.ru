import type { SectionKey } from "@/lib/media";
import type { PricedKey } from "@/lib/pricing";

export type Pair = { label: string; value: string };
export type Qa = { q: string; a: string };
export type Step = { title: string; text: string; time?: string };
export type Format = { title: string; text: string };

export type Meta = {
  title: string;
  description: string;
};

/** Страница направления: реклама, корпоративное, клипы, AI, полный цикл. */
export type ServicePage = {
  section: SectionKey;
  priceKey: PricedKey;
  path: string;
  meta: Meta;
  hero: {
    title: string;
    lead: string;
    /** Титры первого экрана без цены: цена подставляется из pricing.ts. */
    facts: Pair[];
  };
  formats: { title: string; lead?: string; items: Format[] };
  included: { title: string; items: Pair[]; note: string };
  process: { title: string; items: Step[] };
  faq: { title: string; items: Qa[] };
  invite: { title: string; text: string };
};

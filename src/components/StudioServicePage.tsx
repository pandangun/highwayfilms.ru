import Image from "next/image";
import CTA from "@/components/CTA";
import ReelSection from "@/components/ReelSection";
import ServiceFaqSection from "@/components/ServiceFaqSection";
import StudioMasthead from "@/components/StudioMasthead";
import type { SectionKey } from "@/lib/media";

type HeroMetric = { value: string; label: string };
type TextCard = { title: string; text: string };
type GalleryImageItem = {
  src: string;
  tag: string;
  title: string;
  alt?: string;
};
type GalleryItem = GalleryImageItem;
type ListGroup = { title: string; items: string[] };
type FaqItem = { question: string; answer: string };
type FaqCta = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  note?: string;
};

type StudioServicePageProps = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    heroVariant?: "default" | "commercials";
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
    chips?: string[];
    metrics?: HeroMetric[];
    panelEyebrow: string;
    panelTitle: string;
    panelCopy: string;
    imageSrc: string;
    imageAlt: string;
  };
  /**
   * Второй экран раздела: сначала текст первым экраном, потом видео
   * с примерами работ. Для B2B-разделов режим reel — один зацикленный
   * ролик, а не каталог: здесь не выбирают, здесь убеждаются.
   */
  reel?: {
    section: SectionKey;
    eyebrow: string;
    title: string;
    lead?: string;
    mode?: "catalog" | "reel";
  };
  statement?: string;
  positioning?: {
    eyebrow: string;
    title: string;
    lead?: string;
    items: TextCard[];
  };
  offerings: {
    eyebrow: string;
    title: string;
    lead?: string;
    items: TextCard[];
  };
  gallery?: {
    eyebrow: string;
    title: string;
    lead?: string;
    items: GalleryItem[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    lead?: string;
    items: TextCard[];
  };
  deliverables?: {
    title: string;
    groups: ListGroup[];
  };
  faq?: {
    variant?: "default" | "enhanced";
    eyebrow?: string;
    title: string;
    intro?: string;
    items: FaqItem[];
    cta?: FaqCta;
  };
  closing: {
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
    note?: string;
  };
};

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-display mt-3 text-display-md tracking-[var(--tracking-display)] text-ink">
          {title}
        </h2>
      </div>
      {lead ? <p className="max-w-xl text-ink-muted">{lead}</p> : null}
    </div>
  );
}

export default function StudioServicePage({
  hero,
  reel,
  statement,
  positioning,
  offerings,
  gallery,
  workflow,
  deliverables,
  faq,
  closing,
}: StudioServicePageProps) {
  return (
    <div className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <StudioMasthead {...hero} />

        {reel ? <ReelSection {...reel} /> : null}

        {statement ? (
          <section className="container pb-8">
            <p className="font-display max-w-4xl border-l border-hairline pl-6 text-display-md leading-[var(--leading-title)] tracking-[var(--tracking-display)] text-ink md:pl-8">
              {statement}
            </p>
          </section>
        ) : null}

        {positioning ? (
          <section className="container section-divider py-10 md:py-14">
            <SectionHeading {...positioning} />
            <div className="rule-grid rule-grid--2">
              {positioning.items.map((item, index) => (
                <div key={item.title}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">0{index + 1}</span>
                    <span className="rule-fade flex-1" />
                  </div>
                  <h3 className="font-display text-display-sm text-ink">{item.title}</h3>
                  <p className="mt-3 text-ink-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="container section-divider py-10 md:py-14">
          <SectionHeading {...offerings} />
          <div className="rule-grid rule-grid--2">
            {offerings.items.map((item, index) => (
              <div key={item.title}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">0{index + 1}</span>
                  <span className="rule-fade flex-1" />
                </div>
                <h3 className="font-display text-display-sm text-ink">{item.title}</h3>
                <p className="mt-3 text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {gallery ? (
          <section className="container section-divider py-10 md:py-14">
            <SectionHeading {...gallery} />
            {/* Та же раскладка, что в каталоге ReelSection: скруглено только
                изображение, подпись отделена линией. Ушли панель, фиолетовое
                свечение, наезд на 3% и текст, лежавший поверх кадра. */}
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {gallery.items.map((item) => (
                <article key={`${item.src}-${item.title}`}>
                  <div className="on-dark relative aspect-[4/3] overflow-hidden rounded-none">
                    <Image
                      src={item.src}
                      alt={item.alt ?? item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-4 border-t border-hairline pt-4">
                    <p className="text-eyebrow uppercase tracking-[var(--tracking-caps)] text-ink-faint">
                      {item.tag}
                    </p>
                    <h3 className="font-display mt-1 text-display-sm leading-[var(--leading-title)] text-ink">
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="container section-divider py-10 md:py-14">
          <SectionHeading {...workflow} />
          <div className="rule-grid rule-grid--2">
            {workflow.items.map((item, index) => (
              <div key={item.title}>
                <div className="flex items-start gap-4">
                  <div className="font-display shrink-0 text-display-sm leading-none text-ink-faint">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-display-sm text-ink">{item.title}</h3>
                    <p className="mt-3 text-ink-muted">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {deliverables ? (
          <section className="container section-divider py-10 md:py-14">
            <div className="mb-7">
              <h2 className="font-display text-display-md tracking-[var(--tracking-display)] text-ink">
                {deliverables.title}
              </h2>
            </div>
            <div className="rule-grid rule-grid--2">
              {deliverables.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-display text-display-sm text-ink">{group.title}</h3>
                  <ul className="mt-4 space-y-3 text-meta leading-6 text-ink-muted">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {faq ? (
          faq.variant === "enhanced" ? (
            <ServiceFaqSection
              eyebrow={faq.eyebrow}
              title={faq.title}
              intro={faq.intro}
              items={faq.items}
              cta={faq.cta}
            />
          ) : (
            <section className="container section-divider py-10 md:py-14">
              <div className="mb-7">
                <h2 className="font-display text-display-md tracking-[var(--tracking-display)] text-ink">
                  {faq.title}
                </h2>
              </div>
              {/* Панель вокруг списка убрана: у вопросов и так есть
                  разделители, рамка снаружи была второй границей поверх
                  первой. */}
              <div>
                {faq.items.map((item) => (
                  <details
                    key={item.question}
                    className="border-b border-hairline py-5 first:border-t first:border-hairline"
                  >
                    <summary className="font-display cursor-pointer list-none text-display-sm leading-[var(--leading-title)] text-ink">
                      {item.question}
                    </summary>
                    <p className="mt-4 max-w-3xl text-ink-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )
        ) : null}

        <CTA
          title={closing.title}
          description={closing.description}
          ctaLabel={closing.ctaLabel}
          href={closing.href}
          note={closing.note}
          locale={closing.href.startsWith("/en") ? "en" : "ru"}
        />
      </div>
    </div>
  );
}

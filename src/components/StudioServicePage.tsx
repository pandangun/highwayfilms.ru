import Image from "next/image";
import CTA from "@/components/CTA";
import StudioMasthead from "@/components/StudioMasthead";

type HeroMetric = { value: string; label: string };
type TextCard = { title: string; text: string };
type GalleryItem = { src: string; tag: string; title: string };
type ListGroup = { title: string; items: string[] };
type FaqItem = { question: string; answer: string };

type StudioServicePageProps = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
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
  statement?: string;
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
    title: string;
    items: FaqItem[];
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
        <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
          {title}
        </h2>
      </div>
      {lead ? <p className="max-w-xl text-white/62">{lead}</p> : null}
    </div>
  );
}

export default function StudioServicePage({
  hero,
  statement,
  offerings,
  gallery,
  workflow,
  deliverables,
  faq,
  closing,
}: StudioServicePageProps) {
  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <StudioMasthead {...hero} />

        {statement ? (
          <section className="container pb-8">
            <div className="surface-panel px-6 py-8 md:px-8">
              <p className="font-display max-w-4xl text-[clamp(1.8rem,2vw+1rem,2.9rem)] leading-[1.1] tracking-[-0.035em] text-white">
                {statement}
              </p>
            </div>
          </section>
        ) : null}

        <section className="container section-divider py-10 md:py-14">
          <SectionHeading {...offerings} />
          <div className="grid gap-4 lg:grid-cols-2">
            {offerings.items.map((item, index) => (
              <div
                key={item.title}
                className="surface-panel p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/34">0{index + 1}</span>
                  <span className="rule-fade flex-1" />
                </div>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="mt-3 text-white/64">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {gallery ? (
          <section className="container section-divider py-10 md:py-14">
            <SectionHeading {...gallery} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gallery.items.map((item) => (
                <article
                  key={`${item.src}-${item.title}`}
                  className="group surface-panel relative min-h-[20rem] overflow-hidden"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="studio-gallery-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,9,.08),rgba(7,7,9,.18)_32%,rgba(7,7,9,.82)_100%)]" />
                  <div className="studio-gallery-glow absolute inset-0 bg-[radial-gradient(90%_70%_at_0%_0%,rgba(124,58,237,.16),transparent_58%)] opacity-90" />
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <span className="w-fit rounded-full border border-white/14 bg-black/16 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/76 backdrop-blur-sm">
                      {item.tag}
                    </span>
                    <h3 className="font-display max-w-[16rem] text-[1.9rem] leading-[0.96] tracking-[-0.03em] text-white">
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
          <div className="grid gap-4 lg:grid-cols-2">
            {workflow.items.map((item, index) => (
              <div
                key={item.title}
                className="surface-panel p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/4 text-sm text-white/80">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white">{item.title}</h3>
                    <p className="mt-3 text-white/64">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {deliverables ? (
          <section className="container section-divider py-10 md:py-14">
            <div className="mb-7">
              <h2 className="font-display text-3xl tracking-[-0.03em] text-white md:text-4xl">
                {deliverables.title}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {deliverables.groups.map((group) => (
                <div
                  key={group.title}
                  className="surface-panel p-6"
                >
                  <div className="mb-4 rule-fade" />
                  <h3 className="font-display text-xl text-white">{group.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-white/64">
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
          <section className="container section-divider py-10 md:py-14">
            <div className="mb-7">
              <h2 className="font-display text-3xl tracking-[-0.03em] text-white md:text-4xl">
                {faq.title}
              </h2>
            </div>
            <div className="surface-panel overflow-hidden">
              {faq.items.map((item) => (
                <details
                  key={item.question}
                  className="border-b border-white/8 px-6 py-5 last:border-b-0"
                >
                  <summary className="font-display cursor-pointer list-none text-[1.35rem] leading-tight text-white md:text-[1.55rem]">
                    {item.question}
                  </summary>
                  <p className="mt-4 max-w-3xl text-white/62">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
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
    </main>
  );
}

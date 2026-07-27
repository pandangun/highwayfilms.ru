import Link from "next/link";

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceFaqSectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: FaqItem[];
  cta?: {
    eyebrow?: string;
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
    note?: string;
  };
};

export default function ServiceFaqSection({
  eyebrow,
  title,
  intro,
  items,
  cta,
}: ServiceFaqSectionProps) {
  const ctaEyebrow = cta?.eyebrow ?? (cta?.href.startsWith("/en") ? "Contact" : "Контакт");

  return (
    <section className="container section-divider py-10 md:py-14">
      <div className="service-faq-shell">
        <div className="service-faq-heading">
          {eyebrow ? <p className="eyebrow service-faq-eyebrow">{eyebrow}</p> : null}
          <h2 className="service-faq-title">{title}</h2>
          {intro ? <p className="service-faq-intro">{intro}</p> : null}
        </div>

        <div className="service-faq-list" role="list">
          {items.map((item, index) => (
            <details
              key={item.question}
              className="service-faq-item"
              role="listitem"
              open={index === 0}
            >
              <summary className="service-faq-trigger">
                <h3 className="m-0">
                  <span className="service-faq-question">{item.question}</span>
                </h3>
                <span className="service-faq-icon" aria-hidden="true">
                  <span className="service-faq-icon__line service-faq-icon__line--horizontal" />
                  <span className="service-faq-icon__line service-faq-icon__line--vertical" />
                </span>
              </summary>

              <div className="service-faq-panel">
                <div className="service-faq-panel__inner">
                  <p className="service-faq-answer">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {cta ? (
          <div className="service-faq-cta surface-quiet">
            <div>
              <p className="service-faq-cta__eyebrow">{ctaEyebrow}</p>
              <h3 className="service-faq-cta__title">{cta.title}</h3>
              <p className="service-faq-cta__text">{cta.description}</p>
            </div>
            <div className="service-faq-cta__actions">
              <Link href={cta.href} className="btn-primary h-12 rounded-full px-6">
                {cta.ctaLabel}
              </Link>
              {cta.note ? <p className="service-faq-cta__note">{cta.note}</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

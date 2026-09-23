export type FaqEntry = { q: string; a: string };

/** Разметка FAQPage для поисковой выдачи. */
export function faqJsonLd(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * Вопросы и ответы. Нативный details: работает без JS и с клавиатуры.
 * Разметку FAQPage кладём рядом, потому что ради неё блок и существует.
 */
export default function FaqList({ title, items }: { title: string; items: FaqEntry[] }) {
  if (items.length === 0) return null;

  return (
    <section className="band">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="display display--h2">{title}</h2>
          <div className="faq">
            {items.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-sign" aria-hidden />
                </summary>
                <p className="faq-item__answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }} />
    </section>
  );
}

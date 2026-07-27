import { weddingFaqItems } from "@/data/weddings";

export default function WeddingFaq() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-faq-shell">
          <div className="wedding-section-head reveal-up">
            <h2 className="wedding-section-title font-display">Частые вопросы</h2>
          </div>

          <div className="wedding-faq-list">
            {weddingFaqItems.map((item, index) => (
              <details
                key={item.q}
                className={`wedding-faq-item reveal-up ${
                  index === 0
                    ? "delay-1"
                    : index === 1
                      ? "delay-2"
                      : index === 2
                        ? "delay-3"
                        : index === 3
                          ? "delay-4"
                          : "delay-5"
                }`}
              >
                <summary className="wedding-faq-summary">
                  <span className="wedding-faq-question">{item.q}</span>
                  <span className="wedding-faq-icon" aria-hidden="true" />
                </summary>
                <div className="wedding-faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

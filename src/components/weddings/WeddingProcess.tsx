import { weddingProcessSteps } from "@/data/weddings";

export default function WeddingProcess() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-process-shell">
          <div className="wedding-section-head reveal-up">
            <h2 className="wedding-section-title font-display">Этапы</h2>
          </div>

          <div className="wedding-process-grid">
            {weddingProcessSteps.map((item, index) => (
              <article
                key={item.step}
                className={`wedding-process-item reveal-up ${
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
                <span className="wedding-process-step">{item.step}</span>
                <h3 className="wedding-process-title">{item.title}</h3>
                <p className="wedding-process-text">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

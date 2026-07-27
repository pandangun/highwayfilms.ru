import WeddingActionLink from "@/components/weddings/WeddingActionLink";
import { weddingExtras } from "@/data/weddings";

export default function WeddingExtras() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-section-head reveal-up">
          <p className="eyebrow wedding-section-kicker">Дополнительные опции</p>
          <h2 className="wedding-section-title font-display">Дополнительные опции</h2>
        </div>

        <div className="wedding-extras-grid">
          {weddingExtras.map((item, index) => (
            <article key={item.id} className={`wedding-extra-card reveal-up ${index === 0 ? "delay-1" : "delay-2"}`}>
              <div className={`wedding-extra-media wedding-extra-media--${item.mediaType}`}>
                <span className="wedding-extra-media__label">Временный визуал</span>
              </div>
              <div className="wedding-extra-copy">
                <div className="wedding-extra-head">
                  <div>
                    <h3 className="wedding-extra-title font-display">{item.title}</h3>
                    <p className="wedding-extra-price">{item.price}</p>
                  </div>
                </div>
                <p className="wedding-extra-text">{item.description}</p>
                <div className="wedding-extra-when">
                  <span>Когда уместно</span>
                  <p>{item.when}</p>
                </div>
                <WeddingActionLink href={item.href} variant="secondary">
                  {item.cta}
                </WeddingActionLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

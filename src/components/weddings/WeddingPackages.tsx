import WeddingActionLink from "@/components/weddings/WeddingActionLink";
import { weddingPackages } from "@/data/weddings";

export default function WeddingPackages() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-section-head reveal-up">
          <p className="eyebrow wedding-section-kicker">Форматы</p>
          <h2 className="wedding-section-title font-display">Понятный выбор без ощущения тарифной таблицы.</h2>
        </div>

        <div className="wedding-packages-grid">
          {weddingPackages.map((item, index) => (
            <article
              key={item.id}
              className={`wedding-package-card reveal-up ${
                item.featured ? "wedding-package-card--featured" : ""
              } ${
                index === 0 ? "delay-1" : index === 1 ? "delay-2" : "delay-3"
              }`}
              data-featured={item.featured ? "true" : "false"}
            >
              <span className="wedding-package-card__glow" aria-hidden="true" />
              <span className="wedding-package-card__sheen" aria-hidden="true" />
              <div className="wedding-package-card__inner">
                <div className="wedding-package-card__head">
                  <p className="wedding-package-card__eyebrow">{item.eyebrow}</p>
                  {item.featured ? <span className="wedding-package-card__tag">Основной выбор</span> : null}
                </div>
                <h3 className="wedding-package-card__title font-display">{item.title}</h3>
                <p className="wedding-package-card__fit">{item.fit}</p>
                <div className="wedding-package-card__result">
                  <span className="wedding-package-card__label">На выходе</span>
                  <p>{item.result}</p>
                </div>
                <div className="wedding-package-card__footer">
                  <p className="wedding-package-card__price">{item.price}</p>
                  <WeddingActionLink href={item.href} variant={item.featured ? "primary" : "secondary"}>
                    Обсудить дату
                  </WeddingActionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Award } from "lucide-react";
import { weddingEditorialImages, weddingQuotes } from "@/data/weddings";

export default function WeddingQuotes() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-quotes-shell reveal-up">
          <Image
            src={weddingEditorialImages.lakesidePortrait.src}
            alt={weddingEditorialImages.lakesidePortrait.alt}
            fill
            sizes="100vw"
            className="wedding-quotes-image"
            style={{ objectPosition: weddingEditorialImages.lakesidePortrait.objectPosition }}
          />
          <div className="wedding-quotes-overlay" />

          <div className="wedding-quotes-content">
            <h2 className="wedding-section-title font-display">Цитаты из отзывов</h2>
            <div className="wedding-quotes-cloud">
              {weddingQuotes.map((item, index) => (
                <article
                  key={item.text}
                  className={`wedding-award-quote reveal-up ${
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
                  <div className="wedding-award-quote__head">
                    <span className="wedding-award-quote__icon" aria-hidden="true">
                      <Award size={16} />
                    </span>
                    <span className="wedding-award-quote__label">{item.award}</span>
                  </div>
                  <blockquote className="wedding-award-quote__text">{item.text}</blockquote>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

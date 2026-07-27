import Image from "next/image";
import WeddingActionLink from "@/components/weddings/WeddingActionLink";
import { weddingApproachPoints, weddingEditorialImages } from "@/data/weddings";

export default function WeddingApproach() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-approach-shell reveal-up">
          <div className="wedding-approach-media reveal-up delay-1">
            <Image
              src={weddingEditorialImages.cityExit.src}
              alt={weddingEditorialImages.cityExit.alt}
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1279px) 44vw, 38vw"
              className="object-cover"
              style={{ objectPosition: weddingEditorialImages.cityExit.objectPosition }}
            />
            <div className="wedding-approach-media__overlay" />
          </div>

          <div className="reveal-up delay-2">
            <p className="eyebrow wedding-section-kicker">Подход</p>
            <h2 className="wedding-section-title font-display">Не подменяем свадьбу съёмочным процессом.</h2>
            <p className="wedding-section-text">
              Наша задача — встроиться в живой ритм дня, а не устроить ещё одно событие внутри него.
            </p>
            <ul className="wedding-note-list">
              {weddingApproachPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="wedding-inline-actions">
              <WeddingActionLink href="/videoproduction" variant="secondary">
                Посмотреть подход студии
              </WeddingActionLink>
              <WeddingActionLink href="#wedding-brief">Обсудить дату</WeddingActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

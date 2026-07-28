import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { weddingPackages } from "@/data/weddings";

/**
 * Пакеты свадебной съёмки.
 *
 * Свёрстано колонками, разделёнными волосяными линиями, — без карточек,
 * рамок, подложек, свечения и бликов, которые были здесь раньше. Иерархию
 * держит типографика: номинал крупной антиквой, пояснения мелким кеглем.
 *
 * Основной вариант выделен одной акцентной линией сверху и подписью, а не
 * залитой панелью: подсветка блоком снова превратила бы это в тарифную
 * таблицу, чего заголовок раздела прямо обещает избежать.
 */
export default function WeddingPackages() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-section-head reveal-up">
          <p className="eyebrow wedding-section-kicker">Форматы</p>
          <h2 className="wedding-section-title font-display">
            Понятный выбор без ощущения тарифной таблицы.
          </h2>
        </div>

        <div className="wedding-tiers">
          {weddingPackages.map((item, index) => (
            <article
              key={item.id}
              className={`wedding-tier reveal-up delay-${index + 1}`}
              data-featured={item.featured ? "true" : "false"}
            >
              <p className="wedding-tier__eyebrow">
                {item.featured ? "Основной выбор" : item.eyebrow}
              </p>

              <h3 className="wedding-tier__title font-display">{item.title}</h3>
              <p className="wedding-tier__price font-display">{item.price}</p>

              <dl className="wedding-tier__specs">
                <dt>Когда подходит</dt>
                <dd>{item.fit}</dd>
                <dt>На выходе</dt>
                <dd>{item.result}</dd>
              </dl>

              <Link href={item.href} className="wedding-tier__action">
                Обсудить дату
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { weddingQuotes } from "@/data/weddings";

/**
 * Отзывы пар в виде номинаций кинофестиваля.
 *
 * Приём работает только вместе с подзаголовком: без него «Grand Prix» без
 * указания фестиваля читается как настоящая награда, и это уже не приём,
 * а вымышленная регалия. Поэтому шапка проговаривает шутку вслух — заодно
 * она получается обаятельнее, чем немой ряд статуэток.
 *
 * Свёрстано линиями, без карточек: рамки и подложки здесь только мешали бы
 * читать сами фразы.
 */
export default function WeddingQuotes() {
  return (
    <section className="wedding-section">
      <div className="container">
        <div className="wedding-awards reveal-up">
          <div className="wedding-awards__head">
            <p className="eyebrow wedding-section-kicker">Отзывы</p>
            <h2 className="wedding-section-title font-display">Награды, которых не существует</h2>
            <p className="wedding-awards__lead">
              Мы не возим статуэтки с фестивалей. Это то, что писали нам пары после свадьбы —
              мы просто разложили по номинациям.
            </p>
          </div>

          <ul className="wedding-awards__list">
            {weddingQuotes.map((item, index) => (
              <li
                key={item.award}
                className={`wedding-award reveal-up delay-${Math.min(index + 1, 5)}`}
              >
                <p className="wedding-award__category">{item.award}</p>
                <blockquote className="wedding-award__text font-display">{item.text}</blockquote>
                {item.author ? (
                  <p className="wedding-award__author">
                    {item.author}
                    {item.date ? <span className="wedding-award__date">{item.date}</span> : null}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

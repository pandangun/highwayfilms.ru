import KmPost from "@/components/road/KmPost";
import { testimonials } from "@/content/proof";
import { published } from "@/lib/placeholders";
import type { Locale } from "@/components/siteNavigation";

/**
 * Отзывы клиентов: цитата, имя, должность и компания. Пока отзывы —
 * заглушки, блок на сайте не выводится (src/lib/placeholders.ts).
 */
export default function Testimonials({ locale }: { locale: Locale }) {
  const items = published(testimonials);
  if (items.length === 0) return null;

  return (
    <section className="band border-t border-line">
      <div className="wrap">
        <div className="section-head">
          <KmPost lang={locale} />
          <h2 className="display display--h2">{locale === "en" ? "What clients say" : "Что говорят клиенты"}</h2>
        </div>
        <ul className="quotes">
          {items.map((item) => {
            const t = item[locale];
            return (
              <li key={item.id} className="quote">
                <blockquote className="quote__text">{t.quote}</blockquote>
                <p className="quote__author">
                  <span>{t.author}</span>
                  <span className="quote__role">{t.role}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

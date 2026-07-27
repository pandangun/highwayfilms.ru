import Image from "next/image";
import Link from "next/link";
import WeddingActionLink from "@/components/weddings/WeddingActionLink";
import { weddingEditorialImages } from "@/data/weddings";

const weddingHeroNotes = [
  "Тихая съёмка без бесконечной постановки",
  "Тизер через несколько дней после свадьбы",
  "Москва, Санкт-Петербург и выезды по России",
] as const;

export default function WeddingHero() {
  return (
    <section className="wedding-section wedding-section--hero wedding-hero-stage commercials-hero is-revealed">
      <div className="wedding-hero-background" aria-hidden="true">
        <Image
          src={weddingEditorialImages.morningPortrait.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="wedding-hero-background__image commercials-hero__ambient"
          style={{ objectPosition: weddingEditorialImages.morningPortrait.objectPosition }}
        />
        <div className="wedding-hero-background__veil" />
      </div>

      <div className="commercials-hero__stage" aria-hidden="true">
        <div className="commercials-hero__darkness" />
        <div className="commercials-hero__light commercials-hero__light--left" />
        <div className="commercials-hero__light commercials-hero__light--right" />
      </div>

      <div className="container wedding-hero-frame">
        <div className="wedding-hero-copy">
          <p className="eyebrow wedding-section-kicker wedding-hero-kicker commercials-hero__eyebrow">
            Wedding Films by Highway Films
          </p>
          <h1 className="wedding-hero-title font-display commercials-hero__title">
            Свадебные фильмы, в которых остаётся свет вашего дня.
          </h1>
          <p className="wedding-hero-subtitle commercials-hero__lead">
            Снимаем деликатно и спокойно, чтобы через годы вы возвращались не только к
            событиям, но и к тому, как всё между вами звучало.
          </p>
          <p className="wedding-hero-text commercials-hero__chips">
            Без тяжёлой постановки и суеты. Подсказываем там, где нужен мягкий свет,
            ловим взгляды, паузы и дыхание дня, а потом собираем фильм, к которому
            хочется возвращаться вместе.
          </p>

          <div className="wedding-hero-actions commercials-hero__actions">
            <WeddingActionLink href="#wedding-brief" className="wedding-hero-cta">
              Узнать стоимость
            </WeddingActionLink>
            <Link href="#wedding-cases" className="wedding-hero-inline-link">
              Посмотреть истории
            </Link>
          </div>

          <ul className="wedding-hero-notes commercials-hero__metrics">
            {weddingHeroNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="wedding-hero-aside commercials-hero__visual">
          <span className="wedding-hero-aside__eyebrow">Тихое присутствие</span>
          <p className="wedding-hero-aside__text">
            Мы рядом достаточно близко, чтобы ничего не упустить, и достаточно тихо,
            чтобы день оставался вашим.
          </p>
        </div>
      </div>
    </section>
  );
}

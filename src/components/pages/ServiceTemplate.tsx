import Image from "next/image";
import SectionHero from "@/components/SectionHero";
import Credits from "@/components/Credits";
import Steps from "@/components/Steps";
import Invitation from "@/components/Invitation";
import FaqList from "@/components/FaqList";
import type { ServicePage } from "@/content/types";
import type { Locale } from "@/components/siteNavigation";
import { sectionReels } from "@/lib/media";
import { formatFrom, priceFrom } from "@/lib/pricing";

const labels = {
  ru: { price: "Стоимость", rail: "Ролики раздела", frames: "Кадры из работ" },
  en: { price: "Price", rail: "Section films", frames: "Frames from our work" },
} as const;

/**
 * Страница направления. Порядок экранов один на все разделы:
 * ролики → что снимаем → сколько стоит и что входит → этапы →
 * приглашение → вопросы. Одинаковый порядок — чтобы человек, открывший
 * второй раздел, уже знал, где искать цену.
 */
export default function ServiceTemplate({ page, locale }: { page: ServicePage; locale: Locale }) {
  const t = labels[locale];
  const price = formatFrom(priceFrom[page.priceKey], locale);
  const facts = [...page.hero.facts, { label: t.price, value: price }];

  // Лента кадров — только когда у раздела больше одного своего ролика:
  // иначе она повторяет постер первого экрана.
  const frames = sectionReels[page.section].filter((item) => !item.placeholder);
  const showFrames = frames.length > 1;

  return (
    <>
      <SectionHero
        section={page.section}
        title={page.hero.title}
        lead={page.hero.lead}
        facts={facts}
        railLabel={t.rail}
      />

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display display--h2">{page.formats.title}</h2>
            {page.formats.lead ? <p className="lead">{page.formats.lead}</p> : null}
          </div>
          <ul className="formats">
            {page.formats.items.map((item) => (
              <li key={item.title} className="format">
                <h3 className="display display--h3">{item.title}</h3>
                <p className="format__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {showFrames ? (
        <section className="pb-[var(--band)]" aria-label={t.frames}>
          <div className="wrap grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {frames.map((item) => (
              <figure key={item.id}>
                <div className="frame">
                  <Image
                    src={item.source.poster}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 440px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="frame-caption">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* Цена — в центре, как главный титр; состав — парами у оси. */}
      <section className="band title-card border-t border-line">
        <div className="wrap">
          <h2 className="lead mx-auto">{page.included.title}</h2>
          <p className="display display--h1 num mt-6">{price}</p>
          <Credits items={page.included.items} size="lg" className="mx-auto mt-14 max-w-[920px]" />
          <p className="lead mt-14 text-small">{page.included.note}</p>
        </div>
      </section>

      <section className="band border-t border-line">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display display--h2">{page.process.title}</h2>
          </div>
          <Steps items={page.process.items} />
        </div>
      </section>

      <Invitation locale={locale} title={page.invite.title} text={page.invite.text} />

      <FaqList title={page.faq.title} items={page.faq.items} />
    </>
  );
}

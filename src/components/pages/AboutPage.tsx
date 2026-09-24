import Image from "next/image";
import Link from "next/link";
import Credits from "@/components/Credits";
import KmPost from "@/components/road/KmPost";
import ReelBand from "@/components/road/ReelBand";
import { aboutContent } from "@/content/studio";
import { aboutReel } from "@/lib/media";
import { formatFrom, priceFrom } from "@/lib/pricing";
import { type Locale, withLocalePath } from "@/components/siteNavigation";

/**
 * «О студии». Первый экран — нарезка из шоурила по всем направлениям.
 * Дальше по порядку: картинка (кадры вместо похвалы — это главное, чем
 * сильна студия), как мы работаем, что снимаем (карточки с ценой «от»),
 * где снимаем — два города на концах одной трассы. Приглашение — в финале.
 */
export default function AboutPage({ locale }: { locale: Locale }) {
  const c = aboutContent[locale];

  return (
    <>
      <section className="about-hero" data-lane="off">
        <ReelBand className="about-hero__reel" source={aboutReel} poster={aboutReel.poster} alt={c.heroAlt} />
        <div className="about-hero__shade" aria-hidden />
        <div className="about-hero__body wrap">
          <h1 className="display display--hero">{c.title}</h1>
          <p className="about-hero__lead">{c.lead}</p>
        </div>
      </section>

      <section className="band lit">
        <div className="wrap">
          <div className="section-head">
            <KmPost lang={locale} />
            <h2 className="display display--h2">{c.picture.title}</h2>
            <p className="lead">{c.picture.lead}</p>
          </div>
          <ul className="about-frames">
            {c.picture.frames.map((frame) => (
              <li key={frame.src}>
                <figure>
                  <div className="frame">
                    <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 700px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="frame-caption">{frame.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band lit border-t border-line">
        <div className="wrap">
          <div className="section-head">
            <KmPost lang={locale} />
            <h2 className="display display--h2">{c.rules.title}</h2>
          </div>
          <ul className="principles">
            {c.rules.items.map((item) => (
              <li key={item.title} className="principle">
                <h3 className="display display--h3">{item.title}</h3>
                <p className="principle__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band lit border-t border-line">
        <div className="wrap">
          <div className="section-head">
            <KmPost lang={locale} />
            <h2 className="display display--h2">{c.directions.title}</h2>
          </div>
          <ul className="dir-grid">
            {c.directions.items.map((item) => (
              <li key={item.href}>
                <Link href={withLocalePath(item.href, locale)} className="dir-tile">
                  <span className="dir-tile__media frame">
                    <Image src={item.still} alt="" fill sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </span>
                  <span className="dir-tile__row">
                    <span className="dir-tile__title">{item.title}</span>
                    <span className="dir-tile__price num">{formatFrom(priceFrom[item.key], locale)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band lit border-t border-line">
        <div className="wrap">
          <div className="section-head">
            <KmPost lang={locale} />
            <h2 className="display display--h2">{c.geography.title}</h2>
          </div>
          <p className="route">
            <span className="route__city">{c.geography.from}</span>
            <span className="route__road">
              <span className="route__label">{c.geography.road}</span>
            </span>
            <span className="route__city">{c.geography.to}</span>
          </p>
          <dl className="route__facts">
            {c.geography.items.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {c.team.items.length > 0 ? (
        <section className="band title-card border-t border-line">
          <div className="wrap">
            <h2 className="display display--h2">{c.team.title}</h2>
            <Credits items={c.team.items} size="lg" className="mx-auto mt-14 max-w-[920px]" />
          </div>
        </section>
      ) : null}
    </>
  );
}

import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import TitleSequence from "@/components/road/TitleSequence";
import ReelBand from "@/components/road/ReelBand";
import LookSection from "@/components/road/LookSection";
import KmPost from "@/components/road/KmPost";
import { homeContent } from "@/content/home";
import { type Locale, withLocalePath } from "@/components/siteNavigation";
import { sectionReels, type SectionKey } from "@/lib/media";
import { formatFrom, priceFrom } from "@/lib/pricing";
import { SITE_URL } from "@/lib/metadata";

/** Какой ролик раздела играет в полосе съезда на главной. */
const EXIT_REEL: Partial<Record<SectionKey, string>> = {
  commercials: "commercials-02",
  corporate: "corporate-01",
  "music-videos": "music-videos-01",
  weddings: "weddings-01",
  ai: "ai-01",
};

function exitReel(key: SectionKey) {
  const id = EXIT_REEL[key];
  return sectionReels[key].find((item) => item.id === id && !item.placeholder);
}

/**
 * Главная — поездка по трассе: шоурил, ночная дорога с летящими титрами,
 * съезды к направлениям, взгляд с эстакады на маршрут работы, вопросы и
 * финал с огнями города в подвале.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const c = homeContent[locale];

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Highway Films",
    url: SITE_URL,
    description: c.meta.description,
    areaServed: ["Санкт-Петербург", "Москва", "Россия"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <VideoHero
        title={c.hero.title}
        credits={c.hero.credits}
        muteLabel={c.hero.mute}
        unmuteLabel={c.hero.unmute}
        fullscreenLabel={c.hero.fullscreen}
      />

      <TitleSequence credits={c.drive.credits} title={c.intro.title} lead={c.intro.text} />

      {/* Съезды: каждое направление — полоса во всю ширину с роликом. */}
      <section className="exits" aria-label={locale === "en" ? "What we shoot" : "Что снимаем"}>
        {c.program.map((item) => {
          const href = withLocalePath(item.href, locale);
          const reel = item.key === "videoproduction" ? undefined : exitReel(item.key as SectionKey);

          return (
            <article key={item.key} className="exit">
              <ReelBand className="exit__media" source={reel?.source} poster={item.still} alt={item.alt} />
              <div className="exit__shade" aria-hidden />
              <Link href={href} className="exit__hit" tabIndex={-1} aria-hidden />
              <div className="exit__body wrap">
                <KmPost lang={locale} />
                <h3 className="display exit__title">
                  <Link href={href}>{item.title}</Link>
                </h3>
                <div className="exit__row">
                  <p className="exit__text">{item.text}</p>
                  <div className="exit__side">
                    <p className="exit__price num">{formatFrom(priceFrom[item.key], locale)}</p>
                    <Link href={href} className="link-line text-small">
                      {c.programLink}
                      <span className="visually-hidden">: {item.title}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <LookSection
        image="/images/road/overpass.jpg"
        alt={c.look.alt}
        title={c.process.title}
        lead={c.process.lead}
        km={<KmPost lang={locale} />}
      />

      <section className="band lit">
        <div className="wrap">
          <Steps items={c.process.items} />
        </div>
      </section>

      <FaqList title={c.faq.title} items={c.faq.items} km={<KmPost lang={locale} />} />
    </>
  );
}

import { preconnect } from "react-dom";
import VideoHero from "@/components/VideoHero";
import DirIndex from "@/components/DirIndex";
import CaseList from "@/components/CaseList";
import ClientStrip from "@/components/ClientStrip";
import Steps from "@/components/Steps";
import TitleSequence from "@/components/road/TitleSequence";
import KmPost from "@/components/road/KmPost";
import { homeContent } from "@/content/home";
import { type Locale, withLocalePath } from "@/components/siteNavigation";
import { formatFrom, priceFrom } from "@/lib/pricing";
import { directionStill, heroOrigin } from "@/lib/media";
import { SITE_URL } from "@/lib/metadata";

/**
 * Главная — короткая поездка: шоурил, ночная трасса со щитами-
 * преимуществами, два экрана текста (что снимаем и как идёт работа) и
 * финал с огнями города в подвале. Ролики по направлениям живут в
 * разделах — туда ведут строки «Что снимаем» и меню.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const c = homeContent[locale];

  // Шоурил лежит в Blob, на другом домене: соединение открываем сразу,
  // пока грузятся скрипты, а не после них.
  if (heroOrigin) preconnect(heroOrigin);

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
        pauseLabel={c.hero.pause}
        playLabel={c.hero.play}
      />

      <TitleSequence signs={c.drive.signs} title={c.intro.title} lead={c.intro.text} />

      <CaseList locale={locale} featured />
      <ClientStrip locale={locale} />

      {/* Что снимаем: оглавление без роликов — ролики ждут в разделах,
          здесь только кадр направления у курсора. */}
      <section className="band lit">
        <div className="wrap">
          <div className="section-head">
            <KmPost lang={locale} />
            <h2 className="display display--h2">{c.program.title}</h2>
          </div>
          <DirIndex
            items={c.program.items.map((item) => ({
              key: item.key,
              href: withLocalePath(item.href, locale),
              title: item.title,
              text: item.text,
              price: formatFrom(priceFrom[item.key], locale),
              still: directionStill[item.key],
            }))}
          />
        </div>
      </section>

      <section className="band lit border-t border-line">
        <div className="wrap">
          <div className="section-head">
            <KmPost lang={locale} />
            <h2 className="display display--h2">{c.process.title}</h2>
            <p className="lead">{c.process.lead}</p>
          </div>
          <Steps items={c.process.items} />
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import Steps from "@/components/Steps";
import Invitation from "@/components/Invitation";
import FaqList from "@/components/FaqList";
import { homeContent } from "@/content/home";
import { type Locale, withLocalePath } from "@/components/siteNavigation";
import { formatFrom, priceFrom } from "@/lib/pricing";
import { SITE_URL } from "@/lib/metadata";

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

      {/* Межтитр после шоурила: что это за студия, одной фразой. */}
      <section className="band title-card">
        <div className="wrap">
          <h2 className="display display--h2 mx-auto max-w-[18ch]">{c.intro.title}</h2>
          <p className="lead mt-8">{c.intro.text}</p>
        </div>
      </section>

      {/* Программа: направления как сеансы в зале — кадр, название, цена. */}
      <section className="pb-[var(--band)]">
        <div className="wrap program">
          {c.program.map((item) => {
            const href = withLocalePath(item.href, locale);

            return (
              <article key={item.key} className="program-item">
                <Link href={href} className="program-item__frame frame" tabIndex={-1} aria-hidden>
                  <Image src={item.still} alt="" fill sizes="(min-width: 1488px) 1360px, 100vw" className="object-cover" />
                </Link>
                <div className="program-item__body">
                  <div>
                    <h3 className="display display--h2 program-item__title">
                      <Link href={href}>{item.title}</Link>
                    </h3>
                    <p className="program-item__text mt-5">{item.text}</p>
                  </div>
                  <div className="program-item__side">
                    <p className="program-item__price num">{formatFrom(priceFrom[item.key], locale)}</p>
                    <Link href={href} className="link-line text-small">
                      {c.programLink}
                      <span className="visually-hidden">: {item.title}</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="band border-t border-line">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display display--h2">{c.process.title}</h2>
            <p className="lead">{c.process.lead}</p>
          </div>
          <Steps items={c.process.items} />
        </div>
      </section>

      <Invitation locale={locale} title={c.invite.title} text={c.invite.text} />

      <FaqList title={c.faq.title} items={c.faq.items} />
    </>
  );
}

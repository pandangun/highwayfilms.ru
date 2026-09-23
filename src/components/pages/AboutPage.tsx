import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Credits from "@/components/Credits";
import Invitation from "@/components/Invitation";
import { aboutContent } from "@/content/studio";
import { type Locale, withLocalePath } from "@/components/siteNavigation";

export default function AboutPage({ locale }: { locale: Locale }) {
  const c = aboutContent[locale];

  return (
    <>
      <PageHead title={c.title} lead={c.lead} />

      <div className="wrap">
        <div className="frame">
          <Image src={c.still.src} alt={c.still.alt} fill priority sizes="(min-width: 1488px) 1360px, 100vw" className="object-cover" />
        </div>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display display--h2">{c.rules.title}</h2>
          </div>
          <ul className="formats">
            {c.rules.items.map((item) => (
              <li key={item.title} className="format">
                <h3 className="display display--h3">{item.title}</h3>
                <p className="format__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band border-t border-line">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="display display--h2">{c.directions.title}</h2>
          <nav className="border-t border-line">
            {c.directions.items.map((item) => (
              <Link
                key={item.href}
                href={withLocalePath(item.href, locale)}
                className="display display--h3 block border-b border-line py-5 text-silver transition-colors duration-300 hover:text-ivory"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="band title-card border-t border-line">
        <div className="wrap">
          <h2 className="display display--h2">{c.geography.title}</h2>
          <Credits items={c.geography.items} size="lg" className="mx-auto mt-14 max-w-[920px]" />
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

      <Invitation locale={locale} title={c.invite.title} text={c.invite.text} />
    </>
  );
}

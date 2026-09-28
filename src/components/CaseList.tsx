import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import KmPost from "@/components/road/KmPost";
import { cases, type CaseEntry } from "@/content/proof";
import { published } from "@/lib/placeholders";
import type { SectionKey } from "@/lib/media";
import { type Locale, withLocalePath } from "@/components/siteNavigation";

const SECTION_HREF: Record<SectionKey, string> = {
  commercials: "/commercials",
  corporate: "/corporate",
  videoproduction: "/videoproduction",
  "music-videos": "/music-videos",
  weddings: "/weddings",
  ai: "/ai",
};

function CaseCard({ item, locale, linked }: { item: CaseEntry; locale: Locale; linked: boolean }) {
  const t = item[locale];
  const body = (
    <>
      <span className="case__frame">
        <Image src={item.still} alt="" fill sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
      </span>
      <span className="case__client">{t.client}</span>
      <span className="case__title">{t.title}</span>
      <span className="case__text">{t.text}</span>
      <dl className="case__facts">
        {t.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd className="num">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );

  return (
    <li className="case">
      {linked ? (
        <Link href={withLocalePath(SECTION_HREF[item.section], locale)} className="case__body case__body--link">
          {body}
        </Link>
      ) : (
        <div className="case__body">{body}</div>
      )}
    </li>
  );
}

/**
 * Работы: кадр, клиент, что снимали и сухие факты — хронометраж, съёмка,
 * версии. На главной — избранные, со ссылкой в раздел; в разделе — его
 * работы, без ссылок. Пока настоящих кейсов нет, блок на сайте не
 * выводится (см. src/lib/placeholders.ts).
 */
export default function CaseList({
  locale,
  section,
  featured = false,
  className,
}: {
  locale: Locale;
  section?: SectionKey;
  featured?: boolean;
  className?: string;
}) {
  const items = published(cases).filter((item) => (featured ? item.featured : item.section === section));
  if (items.length === 0) return null;

  return (
    <section className={clsx("band border-t border-line", className)}>
      <div className="wrap">
        <div className="section-head">
          <KmPost lang={locale} />
          <h2 className="display display--h2">{locale === "en" ? "Work" : "Работы"}</h2>
        </div>
        <ul className={clsx("cases", items.length >= 3 && "cases--three")}>
          {items.map((item) => (
            <CaseCard key={item.id} item={item} locale={locale} linked={featured} />
          ))}
        </ul>
      </div>
    </section>
  );
}

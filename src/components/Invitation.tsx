import Link from "next/link";
import Credits, { type CreditItem } from "@/components/Credits";
import { contacts, siteStrings } from "@/content/site";
import { type Locale, withLocalePath } from "@/components/siteNavigation";

type InvitationProps = {
  locale: Locale;
  title: string;
  text: string;
  /** Куда ведёт главная кнопка. По умолчанию — бриф. */
  primaryHref?: string;
  primaryLabel?: string;
  credits?: CreditItem[];
  id?: string;
};

/**
 * Приглашение — бархат зала. Единственное место на странице, где фон
 * не чёрный, поэтому его видно с любой точки прокрутки.
 */
export default function Invitation({
  locale,
  title,
  text,
  primaryHref = "/brief",
  primaryLabel,
  credits,
  id,
}: InvitationProps) {
  const t = siteStrings[locale];

  return (
    <section className="invite" id={id}>
      <div className="wrap">
        <h2 className="display display--h1">{title}</h2>
        <p className="invite__text">{text}</p>

        <div className="invite__actions">
          <Link href={withLocalePath(primaryHref, locale)} className="btn btn--ivory">
            {primaryLabel ?? t.briefLong}
          </Link>
          <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="link-line">
            {t.telegram}
          </a>
        </div>

        {credits ? <Credits items={credits} /> : null}
      </div>
    </section>
  );
}

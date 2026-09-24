"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import FinaleImage from "@/components/road/FinaleImage";
import { ROUTE_KM } from "@/components/road/LaneLine";
import { getInvite } from "@/content/invites";
import { contacts, siteStrings } from "@/content/site";
import {
  type Locale,
  type SiteNavItem,
  footerServiceItems,
  footerStudioItems,
  getAlternateLocaleHref,
  getLocaleFromPath,
  normalizeLocalePath,
  withLocalePath,
} from "@/components/siteNavigation";

function FooterLinks({ items, locale }: { items: SiteNavItem[]; locale: Locale }) {
  return (
    <ul className="finale__list">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={withLocalePath(item.href, locale)}>{locale === "en" ? item.en : item.ru}</Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Финал страницы — конец поездки. Приглашение и подвал стали одной сценой:
 * дорога уходит к огням города, над ней приглашение этой страницы.
 *
 * Ниже — подвал в обычной сетке: кто мы, направления, страницы студии,
 * контакты. Под ним прерывистая разметка и название студии в темноте:
 * свет фар проявляет буквы под курсором (Headlights), на телефоне луч
 * сам проходит по надписи, как фары встречной машины.
 */
export default function Footer() {
  const currentPath = usePathname() ?? "/";
  const locale = getLocaleFromPath(currentPath);
  const path = normalizeLocalePath(currentPath);
  const t = siteStrings[locale];
  const invite = getInvite(path, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="finale">
      <div className={clsx("finale__scene", !invite && "finale__scene--quiet")}>
        <FinaleImage
          src="/images/road/road-city.jpg"
          alt={locale === "en" ? "Night highway leading to the city lights" : "Ночная трасса уходит к огням города"}
        />
        <div className="finale__shade" aria-hidden />
        <div className="finale__head wrap">
          <p className="km">
            {locale === "en" ? `km ${ROUTE_KM}, Saint Petersburg` : `км ${ROUTE_KM}, Санкт-Петербург`}
          </p>
          {invite ? (
            <>
              <h2 className="display display--h1 finale__title">{invite.title}</h2>
              <p className="finale__text">{invite.text}</p>
              <div className="finale__actions">
                <Link href={withLocalePath("/brief", locale)} className="btn btn--primary">
                  {t.briefLong}
                </Link>
                <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="link-line">
                  {t.telegram}
                </a>
              </div>
            </>
          ) : (
            <p className="finale__text">{t.footerLine}</p>
          )}
        </div>
      </div>

      <div className="finale__body">
        <div className="wrap finale__grid">
          <p className="finale__about">{t.footer.about}</p>

          <nav className="finale__col" aria-label={t.footer.services}>
            <p className="finale__heading">{t.footer.services}</p>
            <FooterLinks items={footerServiceItems} locale={locale} />
          </nav>

          <nav className="finale__col" aria-label={t.footer.studio}>
            <p className="finale__heading">{t.footer.studio}</p>
            <FooterLinks items={footerStudioItems} locale={locale} />
          </nav>

          <div className="finale__col finale__col--contact">
            <p className="finale__heading">{t.footer.contact}</p>
            <ul className="finale__list finale__list--contact">
              <li>
                <a href={contacts.phoneHref} className="num">
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a href={contacts.emailHref}>{contacts.email}</a>
              </li>
              <li>
                <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer">
                  Telegram {contacts.telegram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <span className="finale__mark" aria-hidden />

        <div className="finale__name lit">
          <p className="finale__wordmark" aria-hidden>
            Highway Films
          </p>
        </div>
      </div>

      <div className="finale__meta wrap">
        <span>
          © {year} {t.rights}
        </span>
        <Link href={withLocalePath("/privacy", locale)}>{t.privacy}</Link>
        <div className="lang-switch" aria-label={locale === "en" ? "Language" : "Язык"}>
          <Link
            href={getAlternateLocaleHref(currentPath, "ru")}
            className={clsx(locale === "ru" && "is-active")}
            hrefLang="ru"
          >
            RU
          </Link>
          <Link
            href={getAlternateLocaleHref(currentPath, "en")}
            className={clsx(locale === "en" && "is-active")}
            hrefLang="en"
          >
            EN
          </Link>
        </div>
      </div>
    </footer>
  );
}

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

function LaneLinks({ items, locale, main }: { items: SiteNavItem[]; locale: Locale; main?: boolean }) {
  return (
    <div className="finale__lane">
      <div className="wrap">
        <ul className={clsx("finale__links", main && "finale__links--main")}>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={withLocalePath(item.href, locale)}>{locale === "en" ? item.en : item.ru}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Финал страницы — конец поездки. Приглашение и подвал стали одной сценой:
 * дорога уходит к огням города, над ней приглашение этой страницы.
 *
 * Ниже — трасса сверху, в разрезе. Строки подвала — полосы движения,
 * линии между ними — настоящая разметка: сплошные по краям, прерывистые
 * между полосами, двойная сплошная посередине. Прерывистые едут при
 * прокрутке, по разные стороны от двойной — навстречу друг другу
 * (сдвиг задаёт LaneLine), и встают, когда страница кончилась.
 * Название студии нанесено на последнюю полосу, как надпись на асфальте.
 */
export default function Footer() {
  const currentPath = usePathname() ?? "/";
  const locale = getLocaleFromPath(currentPath);
  const path = normalizeLocalePath(currentPath);
  const t = siteStrings[locale];
  const invite = getInvite(path, locale);
  const year = new Date().getFullYear();

  const cells = [
    {
      label: t.labels.phone,
      value: (
        <a href={contacts.phoneHref} className="num">
          {contacts.phone}
        </a>
      ),
    },
    {
      label: t.labels.telegram,
      value: (
        <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer">
          {contacts.telegram}
        </a>
      ),
    },
    { label: t.labels.email, value: <a href={contacts.emailHref}>{contacts.email}</a> },
    { label: t.labels.city, value: t.city },
  ];

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

      <div className="finale__road lit">
        <div className="finale__lane">
          <div className="wrap">
            <dl className="finale__contacts">
              {cells.map((cell) => (
                <div key={cell.label}>
                  <dt>{cell.label}</dt>
                  <dd>{cell.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <span className="finale__mark finale__mark--dash" aria-hidden />

        <nav aria-label={locale === "en" ? "Site map" : "Разделы сайта"}>
          <LaneLinks items={footerServiceItems} locale={locale} main />
          <span className="finale__mark finale__mark--double" aria-hidden />
          <LaneLinks items={footerStudioItems} locale={locale} />
        </nav>

        <span className="finale__mark finale__mark--dash finale__mark--oncoming" aria-hidden />

        <div className="finale__lane finale__lane--name">
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

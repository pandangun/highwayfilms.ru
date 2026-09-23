"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Credits from "@/components/Credits";
import { contacts, siteStrings } from "@/content/site";
import {
  footerNavItems,
  getAlternateLocaleHref,
  getLocaleFromPath,
  withLocalePath,
} from "@/components/siteNavigation";

/**
 * Подвал набран как финальные титры: имя студии, строка о ней и контакты
 * парами у центральной оси. Клиентский по той же причине, что и Header.
 */
export default function Footer() {
  const currentPath = usePathname() ?? "/";
  const locale = getLocaleFromPath(currentPath);
  const t = siteStrings[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="ftr">
      <div className="wrap">
        <p className="ftr__brand">Highway Films</p>
        <p className="ftr__line">{t.footerLine}</p>

        <Credits
          items={[
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
            {
              label: t.labels.email,
              value: <a href={contacts.emailHref}>{contacts.email}</a>,
            },
            { label: t.labels.city, value: t.city },
          ]}
        />

        <nav className="ftr__nav" aria-label={locale === "en" ? "Site map" : "Разделы сайта"}>
          {footerNavItems.map((item) => (
            <Link key={item.href} href={withLocalePath(item.href, locale)}>
              {locale === "en" ? item.en : item.ru}
            </Link>
          ))}
        </nav>

        <div className="ftr__meta">
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
      </div>
    </footer>
  );
}

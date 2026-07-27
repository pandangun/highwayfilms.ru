export type SiteNavItem = {
  href: string;
  ru: string;
  en: string;
};

export const headerNavItems: SiteNavItem[] = [
  { href: "/about", ru: "О нас", en: "About" },
  { href: "/commercials", ru: "Реклама", en: "Commercials" },
  { href: "/corporate", ru: "Корпоративное", en: "Corporate" },
  { href: "/music-videos", ru: "Клипы", en: "Music Videos" },
  { href: "/ai", ru: "AI", en: "AI" },
  { href: "/weddings", ru: "Свадьбы", en: "Weddings" },
  { href: "/contacts", ru: "Контакты", en: "Contacts" },
];

export const footerMenuLinks: SiteNavItem[] = [
  { href: "/about", ru: "О нас", en: "About" },
  { href: "/contacts", ru: "Контакты", en: "Contacts" },
  { href: "/brief", ru: "Бриф", en: "Brief" },
  { href: "/articles", ru: "Статьи", en: "Articles" },
  { href: "/client", ru: "Вход для клиентов", en: "Client access" },
];

export const footerServiceLinks: SiteNavItem[] = [
  { href: "/commercials", ru: "Реклама", en: "Commercials" },
  { href: "/corporate", ru: "Корпоративное", en: "Corporate" },
  { href: "/music-videos", ru: "Клипы", en: "Music videos" },
  { href: "/ai", ru: "AI", en: "AI" },
  { href: "/weddings", ru: "Свадьбы", en: "Weddings" },
];

export function getLocaleFromPath(pathname: string) {
  return pathname.startsWith("/en") ? "en" : "ru";
}

export function normalizeLocalePath(pathname: string) {
  const locale = getLocaleFromPath(pathname);
  return locale === "en" ? pathname.replace(/^\/en(?!\w)/, "") || "/" : pathname;
}

export function withLocalePath(href: string, locale: "ru" | "en") {
  return locale === "en" ? (href === "/" ? "/en" : `/en${href}`) : href;
}

export function getAlternateLocaleHref(pathname: string, locale: "ru" | "en") {
  const normalizedPath = normalizeLocalePath(pathname);
  if (locale === "ru") return normalizedPath;
  return normalizedPath === "/" ? "/en" : `/en${normalizedPath}`;
}

export function isActivePath(itemHref: string, pathname: string) {
  if (itemHref === "/") return pathname === "/";
  return pathname.startsWith(itemHref);
}

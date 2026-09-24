export type Locale = "ru" | "en";

export type SiteNavItem = {
  href: string;
  ru: string;
  en: string;
};

/** Главное меню: сначала направления, потом студия и контакты. */
export const headerNavItems: SiteNavItem[] = [
  { href: "/commercials", ru: "Реклама", en: "Commercials" },
  { href: "/corporate", ru: "Корпоративное", en: "Corporate" },
  { href: "/music-videos", ru: "Клипы", en: "Music videos" },
  { href: "/weddings", ru: "Свадьбы", en: "Weddings" },
  { href: "/ai", ru: "AI-ролики", en: "AI films" },
  { href: "/about", ru: "О студии", en: "Studio" },
  { href: "/contacts", ru: "Контакты", en: "Contacts" },
];

/** Подвал, полоса над двойной сплошной: что снимает студия. */
export const footerServiceItems: SiteNavItem[] = [
  { href: "/commercials", ru: "Реклама", en: "Commercials" },
  { href: "/corporate", ru: "Корпоративное видео", en: "Corporate video" },
  { href: "/music-videos", ru: "Клипы", en: "Music videos" },
  { href: "/weddings", ru: "Свадьбы", en: "Weddings" },
  { href: "/ai", ru: "AI-ролики", en: "AI films" },
  { href: "/videoproduction", ru: "Полный цикл", en: "Full production" },
];

/** Подвал, полоса под двойной сплошной: остальные страницы. */
export const footerStudioItems: SiteNavItem[] = [
  { href: "/about", ru: "О студии", en: "Studio" },
  { href: "/articles", ru: "Статьи", en: "Articles" },
  { href: "/brief", ru: "Бриф", en: "Brief" },
  { href: "/client", ru: "Кабинет клиента", en: "Client room" },
  { href: "/contacts", ru: "Контакты", en: "Contacts" },
];

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

export function normalizeLocalePath(pathname: string) {
  const locale = getLocaleFromPath(pathname);
  return locale === "en" ? pathname.replace(/^\/en(?!\w)/, "") || "/" : pathname;
}

export function withLocalePath(href: string, locale: Locale) {
  if (locale !== "en") return href;
  if (href === "/") return "/en";
  return href.startsWith("/") ? `/en${href}` : href;
}

export function getAlternateLocaleHref(pathname: string, locale: Locale) {
  const normalizedPath = normalizeLocalePath(pathname);
  if (locale === "ru") return normalizedPath;
  return normalizedPath === "/" ? "/en" : `/en${normalizedPath}`;
}

export function isActivePath(itemHref: string, pathname: string) {
  if (itemHref === "/") return pathname === "/";
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

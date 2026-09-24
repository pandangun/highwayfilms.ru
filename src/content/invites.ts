import type { Locale } from "@/components/siteNavigation";
import { homeContent } from "@/content/home";
import { servicePages, type ServiceSlug } from "@/content/services";
import { aboutContent } from "@/content/studio";

export type Invite = { title: string; text: string };

const articles: Record<Locale, Invite> = {
  ru: {
    title: "Есть задача?",
    text: "Опишите её в брифе. В течение рабочего дня пришлём смету и план съёмки.",
  },
  en: {
    title: "Have a task in mind?",
    text: "Describe it in the brief. Within one working day we send an estimate and a shoot plan.",
  },
};

/**
 * Приглашение в финале страницы. Финал общий для всего сайта и живёт в
 * подвале, а текст приглашения у каждой страницы свой.
 *
 * null — приглашения нет: на брифе, в контактах и в кабинете человек уже
 * там, куда его звали, а у свадеб своя форма заявки выше по странице.
 */
export function getInvite(path: string, locale: Locale): Invite | null {
  if (path === "/") return homeContent[locale].invite;
  if (path === "/about") return aboutContent[locale].invite;
  if (path === "/articles" || path.startsWith("/articles/")) return articles[locale];

  const slug = path.slice(1) as ServiceSlug;
  if (slug in servicePages) return servicePages[slug][locale].invite;

  return null;
}

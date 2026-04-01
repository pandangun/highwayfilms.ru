import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { SITE_URL } from "@/lib/metadata";

const routes = [
  "",
  "/about",
  "/ai",
  "/articles",
  "/brief",
  "/commercials",
  "/contacts",
  "/corporate",
  "/music-videos",
  "/privacy",
  "/videoproduction",
  "/weddings",
  "/en",
  "/en/about",
  "/en/ai",
  "/en/articles",
  "/en/brief",
  "/en/commercials",
  "/en/contacts",
  "/en/corporate",
  "/en/music-videos",
  "/en/privacy",
  "/en/videoproduction",
  "/en/weddings",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const excludedRoutes = new Set(["/brief", "/en/brief"]);
  const articleRoutes = articles.flatMap((article) => [`/articles/${article.slug}`, `/en/articles/${article.slug}`]);

  return routes
    .concat(articleRoutes)
    .filter((route) => !excludedRoutes.has(route))
    .map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: route === "" || route === "/en" || route.startsWith("/articles") || route.startsWith("/en/articles") ? "weekly" : "monthly",
      priority: route === "" || route === "/en" ? 1 : route.startsWith("/articles") || route.startsWith("/en/articles") ? 0.84 : 0.8,
    }));
}

import type { MetadataRoute } from "next";

const SITE_URL = "https://highwayfilms.ru";

const routes = [
  "",
  "/about",
  "/ai",
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

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/en" ? "weekly" : "monthly",
    priority: route === "" || route === "/en" ? 1 : 0.8,
  }));
}

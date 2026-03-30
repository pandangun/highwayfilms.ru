import type { Metadata } from "next";

type Locale = "ru" | "en";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  imagePath?: string;
  noIndex?: boolean;
};

const SITE_NAME = "Highway Films";

function normalizePath(path: string) {
  if (!path || path === "") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function getAlternatePaths(path: string, locale: Locale) {
  const currentPath = normalizePath(path);

  if (locale === "ru") {
    return {
      ruPath: currentPath,
      enPath: currentPath === "/" ? "/en" : `/en${currentPath}`,
    };
  }

  const ruPath = currentPath === "/en" ? "/" : currentPath.replace(/^\/en(?=\/|$)/, "") || "/";

  return {
    ruPath,
    enPath: currentPath,
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  imagePath,
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const normalizedPath = normalizePath(path);
  const { ruPath, enPath } = getAlternatePaths(normalizedPath, locale);

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
      languages: {
        ru: ruPath,
        en: enPath,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      title,
      description,
      url: normalizedPath,
      siteName: SITE_NAME,
      images: imagePath
        ? [
            {
              url: imagePath,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imagePath ? "summary_large_image" : "summary",
      title,
      description,
      images: imagePath ? [imagePath] : undefined,
    },
    robots: {
      index: !noIndex,
      follow: true,
    },
  };
}

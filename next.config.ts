import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const heroVideoOrigins = [
  process.env.NEXT_PUBLIC_HERO_VIDEO_DESKTOP_URL,
  process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL,
]
  .map((value) => {
    if (!value) return "";

    try {
      return new URL(value).origin;
    } catch {
      return "";
    }
  })
  .filter(Boolean);

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `media-src 'self' data: blob:${heroVideoOrigins.length ? ` ${heroVideoOrigins.join(" ")}` : ""}`,
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Постеры — кадры из роликов шириной 1920 px, шире исходников нет.
    // Варианты крупнее 1920 не добавляли резкости, но каждый заново
    // пережимался оптимизатором при первом запросе — это лишняя секунда.
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [256, 384],
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
  async headers() {
    if (!isProd) {
      return [];
    }

    // Картинки и ролики из public/: браузер день берёт их из кэша без
    // запроса, потом ещё месяц показывает сохранённое и тихо сверяет с
    // сервером. Без этого каждый переход между страницами заново
    // спрашивал сервер про каждый постер и ролик. Файл заменили под тем
    // же именем — посетители увидят новый не позже чем через день.
    const mediaCache = {
      key: "Cache-Control",
      value: "public, max-age=86400, stale-while-revalidate=2592000",
    };

    return [
      { source: "/images/:path*", headers: [mediaCache] },
      { source: "/video/:path*", headers: [mediaCache] },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import localFont from "next/font/local";

/**
 * Заголовки — Unbounded: широкий гротеск, в тонком начертании читается
 * как марка дорогой машины, а жирный — как дорожный щит. Это трасса.
 * Текст — Onest.
 *
 * Шрифты свои, по одному файлу на семейство (src/fonts): латиница,
 * кириллица, знаки препинания, ₽ и №, вес 300–600 и 300–700. С Google
 * Fonts приходило шесть файлов на 270 КБ: знак рубля лежит в наборе
 * latin-ext, и ради одного символа браузер докачивал ещё 140 КБ уже
 * после первой отрисовки. Сейчас два файла на 106 КБ, оба в preload.
 * Как пересобрать — в src/fonts/README.md.
 *
 * Имена переменных не совпадают с --ff-display / --ff-text из
 * foundation.css: те ссылаются сюда. Если назвать одинаково, :root
 * перезатрёт то, что подставил next/font.
 */
export const display = localFont({
  src: "../fonts/Unbounded.woff2",
  weight: "300 600",
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const text = localFont({
  src: "../fonts/Onest.woff2",
  weight: "300 700",
  variable: "--font-onest",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

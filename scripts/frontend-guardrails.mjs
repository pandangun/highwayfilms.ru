import { chromium } from "playwright";

/**
 * Сторож вёрстки. Запуск: npm run audit:frontend -- http://localhost:3000
 *
 * Проверяет каждую страницу на телефоне, планшете и компьютере:
 *   — страница отдаётся с кодом 200 и в ней есть ровно один h1;
 *   — нет горизонтальной прокрутки (самая частая поломка на телефоне);
 *   — в консоли нет ошибок;
 *   — страница выглядит одинаково при прямом заходе и при переходе с
 *     главной (CSS, подгруженный одной страницей, не должен менять другую).
 *
 * Путь к браузеру можно задать через PLAYWRIGHT_CHROMIUM, если версия
 * Playwright в проекте не совпадает с установленными браузерами.
 */
const baseUrl = process.env.AUDIT_BASE_URL ?? process.argv[2] ?? "http://localhost:3000";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "tablet", width: 768, height: 1024, isMobile: true },
  { name: "desktop", width: 1440, height: 900, isMobile: false },
];

/** Всё, что реально отдаётся посетителю. Держать в синхроне с app/sitemap.ts. */
const ROUTES = [
  "/",
  "/commercials",
  "/corporate",
  "/music-videos",
  "/weddings",
  "/ai",
  "/videoproduction",
  "/about",
  "/contacts",
  "/brief",
  "/client",
  "/client/demo-project",
  "/articles",
  "/privacy",
  "/en",
  "/en/weddings",
  "/en/commercials",
];

/** Страницы, на которые с главной есть ссылка, — для сверки переходов. */
const CLIENT_NAV_ROUTES = ["/commercials", "/weddings", "/about", "/contacts", "/brief", "/client"];

const FINGERPRINT = [".display", ".btn", ".hdr", ".ftr"];
const FINGERPRINT_PROPS = ["fontFamily", "fontSize", "lineHeight", "paddingLeft", "backgroundColor"];

const failures = [];
const fail = (message) => {
  failures.push(message);
  console.error(`FAIL ${message}`);
};
const ok = (message) => console.log(`OK   ${message}`);

function fingerprint(page) {
  return page.evaluate(
    ([selectors, props]) =>
      Object.fromEntries(
        selectors
          .map((selector) => [selector, document.querySelector(selector)])
          .filter(([, el]) => el)
          .map(([selector, el]) => {
            const style = getComputedStyle(el);
            return [selector, Object.fromEntries(props.map((prop) => [prop, style[prop]]))];
          }),
      ),
    [FINGERPRINT, FINGERPRINT_PROPS],
  );
}

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {},
);

try {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      hasTouch: viewport.isMobile,
    });

    for (const route of ROUTES) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(String(error)));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });

      const response = await page.goto(baseUrl + route, { waitUntil: "load" });
      await page.waitForTimeout(800);
      const label = `${viewport.name} ${route}`;

      if (response?.status() !== 200) fail(`${label}: HTTP ${response?.status()}`);

      const { overflow, h1Count } = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1Count: document.querySelectorAll("h1").length,
      }));

      if (overflow > 1) fail(`${label}: горизонтальная прокрутка на ${overflow}px`);
      if (h1Count !== 1) fail(`${label}: h1 на странице — ${h1Count}, нужен один`);
      if (errors.length) fail(`${label}: ошибки в консоли — ${errors.slice(0, 2).join(" | ")}`);
      if (overflow <= 1 && h1Count === 1 && !errors.length) ok(label);

      await page.close();
    }

    await context.close();
  }

  // Холодная загрузка против клиентского перехода с главной.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  for (const route of CLIENT_NAV_ROUTES) {
    const cold = await context.newPage();
    await cold.goto(baseUrl + route, { waitUntil: "load" });
    const coldPrint = await fingerprint(cold);
    await cold.close();

    const warm = await context.newPage();
    await warm.goto(baseUrl + "/", { waitUntil: "load" });
    await warm.click(`a[href="${route}"]`);
    await warm.waitForURL(`**${route}`);
    // Курсор остаётся над ссылкой, по которой кликнули, и кнопка под ним
    // в состоянии :hover. Уводим его, иначе сверка ловит цвет наведения.
    await warm.mouse.move(1, 1);
    await warm.waitForTimeout(800);
    const warmPrint = await fingerprint(warm);
    await warm.close();

    if (JSON.stringify(coldPrint) === JSON.stringify(warmPrint)) ok(`переход ${route}`);
    else fail(`переход ${route}: вёрстка отличается от прямого захода`);
  }
  await context.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`\n${failures.length} проблем(ы)`);
  process.exit(1);
}

console.log("\nВсё чисто.");

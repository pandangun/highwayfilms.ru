import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_BASE_URL ?? process.argv[2] ?? "http://localhost:3400";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
];

const DESKTOP = { width: 1366, height: 900 };

/** Всё, что реально отдаётся посетителю. Держать в синхроне с app/sitemap.ts. */
const ROUTES = [
  "/",
  "/about",
  "/commercials",
  "/corporate",
  "/music-videos",
  "/ai",
  "/weddings",
  "/videoproduction",
  "/contacts",
  "/brief",
  "/articles",
  "/client",
  "/client/demo-project",
  "/privacy",
  "/en",
  "/en/weddings",
  "/en/corporate",
];

/**
 * Общие примитивы: классы, которые используются на многих страницах и обязаны
 * жить в глобальном слое CSS. Если такой класс определён в постраничном файле
 * (например .btn в home.css), то при холодной загрузке страницы, которая этот
 * файл не импортирует, элемент останется голым — а после клиентского перехода
 * с главной внезапно оживёт. Проверка ловит именно это.
 */
const SHARED_PRIMITIVES = [
  { selector: ".btn", check: (s) => s.borderTopWidth !== "0px", expected: "ненулевая рамка" },
  { selector: ".card", check: (s) => s.borderTopWidth !== "0px", expected: "ненулевая рамка" },
  { selector: ".btn-primary", check: (s) => s.borderRadius !== "0px", expected: "скруглённые углы" },
  { selector: ".section-card", check: (s) => s.borderRadius !== "0px", expected: "скруглённые углы" },
];

/**
 * Отпечаток вёрстки для сверки «холодная загрузка против клиентского перехода».
 * Постраничный глобальный CSS не выгружается при навигации, поэтому страница,
 * открытая переходом с главной, может выглядеть иначе, чем она же по прямой
 * ссылке. Для посетителя это «вёрстка поехала», для разработчика —
 * невоспроизводимый баг.
 */
const FINGERPRINT_SELECTORS = [".btn", ".card", ".section-card", ".section-panel", "h1"];
const FINGERPRINT_PROPS = [
  "borderTopWidth",
  "borderRadius",
  "paddingLeft",
  "fontSize",
  "lineHeight",
  "backgroundImage",
];

/** Маршруты, на которые с главной есть настоящая <Link>-навигация. */
const CLIENT_NAV_ROUTES = [
  "/about",
  "/commercials",
  "/corporate",
  "/music-videos",
  "/ai",
  "/weddings",
  "/contacts",
  "/brief",
  "/articles",
  "/client",
];

/**
 * Порог контраста для светлой темы. 2.0 — это не WCAG (там 4.5:1 для текста
 * и 3:1 для крупного), а граница «текст физически не читается». Здесь нужен
 * сторож против регрессий, а не аудит доступности: полноценная работа по
 * контрасту идёт отдельным шагом, и вот тогда порог поднимаем до 4.5.
 */
const LIGHT_THEME_MIN_CONTRAST = 2.0;

/**
 * Подтверждённые баги, которые нельзя починить точечно, не увеличив долг.
 *
 * Все три — один корень: глобальные правила `html[data-theme="light"]
 * .text-white\/NN { ... !important }` в theme.css красят текст в тёмные
 * чернила независимо от того, что под ним. Над видео-hero и над тёмными
 * панелями фон остаётся чёрным, и текст исчезает.
 *
 * Лечится заменой всей этой конструкции на семантические токены — это шаг
 * «типографика и токены». Список обязан схлопнуться до нуля вместе с ним;
 * пополнять его новыми записями нельзя.
 */
const KNOWN_LIGHT_THEME_ISSUES = new Set(["/", "/en", "/about"]);

const MOTION_SELECTOR = [
  ".reveal-up",
  ".surface-panel",
  ".surface-quiet",
  ".section-panel",
  ".section-card",
  ".section-frame",
  ".service-card",
  ".editorial-card",
  ".service-faq-shell",
].join(",");

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`FAIL ${message}`);
}

function ok(message) {
  console.log(`OK   ${message}`);
}

async function collectFingerprint(page, selectors, props) {
  return page.evaluate(
    ([sels, keys]) => {
      const result = {};
      for (const sel of sels) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const computed = getComputedStyle(el);
        result[sel] = Object.fromEntries(keys.map((k) => [k, computed[k]]));
      }
      return result;
    },
    [selectors, props],
  );
}

async function checkRoute(browser, path, viewport) {
  const page = await browser.newPage({ viewport });
  const badResponses = [];
  const label = `${path} @${viewport.name}`;

  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();
    if (status >= 400 && !url.includes("/_next/webpack-hmr")) {
      badResponses.push(`${status} ${url}`);
    }
  });

  await page.goto(new URL(path, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForTimeout(1_200);

  const metrics = await page.evaluate(() => ({
    innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  if (metrics.scrollWidth > metrics.innerWidth || metrics.bodyScrollWidth > metrics.innerWidth) {
    fail(
      `${label} горизонтальный оверфлоу: innerWidth=${metrics.innerWidth}, ` +
        `scrollWidth=${metrics.scrollWidth}, bodyScrollWidth=${metrics.bodyScrollWidth}`,
    );
  } else {
    ok(`${label} ширина`);
  }

  for (const response of badResponses) {
    fail(`${label} ответ ${response}`);
  }

  await page.close();
}

async function checkSharedPrimitives(browser, path) {
  const page = await browser.newPage({ viewport: DESKTOP });
  await page.goto(new URL(path, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForTimeout(600);

  for (const primitive of SHARED_PRIMITIVES) {
    const styles = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const computed = getComputedStyle(el);
      return {
        borderTopWidth: computed.borderTopWidth,
        borderRadius: computed.borderRadius,
      };
    }, primitive.selector);

    if (styles === null) continue;

    if (!primitive.check(styles)) {
      fail(
        `${path} примитив ${primitive.selector} не стилизован при холодной загрузке ` +
          `(ожидалось: ${primitive.expected}; получено borderTopWidth=${styles.borderTopWidth}, ` +
          `borderRadius=${styles.borderRadius}). Класс определён в постраничном CSS, ` +
          `а используется на этой странице.`,
      );
    } else {
      ok(`${path} примитив ${primitive.selector}`);
    }
  }

  await page.close();
}

async function checkColdVersusClientNav(browser, path) {
  const cold = await browser.newPage({ viewport: DESKTOP });
  await cold.goto(new URL(path, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await cold.waitForTimeout(800);
  const coldPrint = await collectFingerprint(cold, FINGERPRINT_SELECTORS, FINGERPRINT_PROPS);
  await cold.close();

  const warm = await browser.newPage({ viewport: DESKTOP });
  await warm.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await warm.waitForTimeout(800);

  const link = warm.locator(`a[href="${path}"]`).first();
  if ((await link.count()) === 0) {
    await warm.close();
    console.log(`SKIP ${path} нет <Link> с главной`);
    return;
  }

  await link.click();
  await warm.waitForURL(`**${path}`, { timeout: 15_000 }).catch(() => {});
  await warm.waitForTimeout(1_200);

  const warmPrint = await collectFingerprint(warm, FINGERPRINT_SELECTORS, FINGERPRINT_PROPS);
  await warm.close();

  const diffs = [];
  for (const selector of Object.keys(coldPrint)) {
    const before = coldPrint[selector];
    const after = warmPrint[selector];
    if (!after) continue;

    for (const prop of FINGERPRINT_PROPS) {
      if (before[prop] !== after[prop]) {
        diffs.push(`${selector}.${prop}: холодная=${before[prop]} переход=${after[prop]}`);
      }
    }
  }

  if (diffs.length > 0) {
    fail(`${path} вёрстка отличается после клиентского перехода — ${diffs.join("; ")}`);
  } else {
    ok(`${path} холодная загрузка == переход с главной`);
  }
}

async function checkLightTheme(browser, path) {
  const page = await browser.newPage({ viewport: VIEWPORTS[0] });
  await page.addInitScript(() => {
    try {
      localStorage.setItem("highway-theme", "light");
    } catch {
      /* приватный режим */
    }
  });

  await page.goto(new URL(path, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForTimeout(1_000);

  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  if (theme !== "light") {
    fail(`${path} светлая тема не применилась (data-theme=${theme})`);
    await page.close();
    return;
  }

  // Ищем текст, который в светлой теме стал нечитаемым. Судим по реальному
  // контрасту с фактическим фоном, а не по «цвет почти белый»: белый текст
  // поверх тёмного кадра или фиолетовой кнопки — это норма, и ловить его
  // нельзя, иначе проверку начнут игнорировать.
  const invisible = await page.evaluate((minRatio) => {
    const parse = (value) => (value.match(/[\d.]+/g) ?? []).map(Number);

    // Первый непрозрачный фон вверх по дереву. Если по дороге встретили
    // картинку или градиент — судить не о чем, пропускаем элемент.
    const effectiveBackground = (start) => {
      let node = start;
      while (node && node !== document.documentElement) {
        const cs = getComputedStyle(node);
        if (cs.backgroundImage && cs.backgroundImage !== "none") return null;

        const parts = parse(cs.backgroundColor);
        const alpha = parts.length === 4 ? parts[3] : 1;
        if (parts.length >= 3 && alpha > 0.85) return [parts[0], parts[1], parts[2]];

        node = node.parentElement;
      }

      const bodyBg = parse(getComputedStyle(document.body).backgroundColor);
      return bodyBg.length >= 3 ? [bodyBg[0], bodyBg[1], bodyBg[2]] : null;
    };

    const luminance = ([r, g, b]) => {
      const channel = (value) => {
        const c = value / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };

    const contrast = (fg, bg) => {
      const a = luminance(fg);
      const b = luminance(bg);
      const [hi, lo] = a > b ? [a, b] : [b, a];
      return (hi + 0.05) / (lo + 0.05);
    };

    const offenders = [];

    for (const el of Array.from(document.querySelectorAll("p, h1, h2, h3, h4, span, a, li, button"))) {
      const text = el.textContent?.trim();
      if (!text) continue;

      // Только листья — иначе один контейнер даёт десяток дублей.
      if (el.querySelector("p, h1, h2, h3, h4, span, a, li, button")) continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.opacity === "0") continue;

      const color = parse(cs.color);
      if (color.length < 3) continue;

      const background = effectiveBackground(el);
      if (!background) continue;

      const alpha = color.length === 4 ? color[3] : 1;
      const blended = [
        color[0] * alpha + background[0] * (1 - alpha),
        color[1] * alpha + background[1] * (1 - alpha),
        color[2] * alpha + background[2] * (1 - alpha),
      ];

      const ratio = contrast(blended, background);
      if (ratio < minRatio) {
        const name = el.className.toString().trim().split(/\s+/)[0] || el.tagName.toLowerCase();
        offenders.push(`${name} (${ratio.toFixed(2)}:1) «${text.slice(0, 24)}»`);
      }

      if (offenders.length >= 5) break;
    }

    return offenders;
  }, LIGHT_THEME_MIN_CONTRAST);

  const known = KNOWN_LIGHT_THEME_ISSUES.has(path);

  if (invisible.length > 0 && known) {
    console.log(`KNOWN ${path} светлая тема, текст нечитаем — ${invisible.join(" | ")}`);
  } else if (invisible.length > 0) {
    fail(`${path} светлая тема, текст нечитаем — ${invisible.join(" | ")}`);
  } else if (known) {
    fail(
      `${path} числится в KNOWN_LIGHT_THEME_ISSUES, но больше не воспроизводится — ` +
        `удали его из списка, иначе список протухнет и перестанет что-либо значить`,
    );
  } else {
    ok(`${path} светлая тема`);
  }

  await page.close();
}

async function checkSaveDataHero(browser) {
  const page = await browser.newPage({ viewport: VIEWPORTS[0] });

  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: true, effectiveType: "4g" },
    });
  });

  const videoRequests = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("hero-desktop.mp4") || url.includes("hero-mobile.mp4")) {
      videoRequests.push(url);
    }
  });

  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(1_500);

  const videoCount = await page.locator("video").count();
  if (videoCount > 0 || videoRequests.length > 0) {
    fail(`Save-Data подгрузил видео: videoCount=${videoCount}, requests=${videoRequests.length}`);
  } else {
    ok("Save-Data оставляет hero на постере");
  }

  await page.close();
}

async function checkMotionReveal(browser) {
  const page = await browser.newPage({ viewport: DESKTOP });

  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(1_200);

  const hiddenByScroll = [];
  for (const scrollY of [0, 500, 1_000, 1_600, 2_400, 3_200, 4_200]) {
    await page.evaluate((nextScrollY) => window.scrollTo(0, nextScrollY), scrollY);
    await page.waitForTimeout(250);

    const hiddenInView = await page.evaluate((selector) => {
      if (!document.documentElement.classList.contains("motion-enhanced")) return [];

      return Array.from(document.querySelectorAll(selector))
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0;
        })
        .filter((element) => !element.classList.contains("is-visible"))
        .map((element) => element.className.toString())
        .slice(0, 5);
    }, MOTION_SELECTOR);

    if (hiddenInView.length > 0) {
      hiddenByScroll.push(`${scrollY}: ${hiddenInView.join(" | ")}`);
    }
  }

  if (hiddenByScroll.length > 0) {
    fail(`Reveal оставил видимые элементы скрытыми: ${hiddenByScroll.join("; ")}`);
  } else {
    ok("Reveal при скролле");
  }

  await page.close();
}

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });

  console.log("\n— ширина и ответы —");
  for (const viewport of VIEWPORTS) {
    for (const path of ROUTES) {
      await checkRoute(browser, path, viewport);
    }
  }

  console.log("\n— общие примитивы при холодной загрузке —");
  for (const path of ROUTES) {
    await checkSharedPrimitives(browser, path);
  }

  console.log("\n— холодная загрузка против клиентского перехода —");
  for (const path of CLIENT_NAV_ROUTES) {
    await checkColdVersusClientNav(browser, path);
  }

  console.log("\n— светлая тема —");
  for (const path of ROUTES) {
    await checkLightTheme(browser, path);
  }

  console.log("\n— hero и моторика —");
  await checkSaveDataHero(browser);
  await checkMotionReveal(browser);

  await browser.close();

  console.log(
    `\n${failures.length === 0 ? "Всё зелено" : `Провалов: ${failures.length}`}` +
      `, известных багов в очереди на шаг «токены»: ${KNOWN_LIGHT_THEME_ISSUES.size}`,
  );
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

await main();

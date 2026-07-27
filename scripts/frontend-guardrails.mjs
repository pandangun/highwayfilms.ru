import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_BASE_URL ?? process.argv[2] ?? "http://localhost:3400";
const mobileViewport = { width: 390, height: 844 };
const pages = ["/", "/commercials", "/contacts", "/weddings", "/brief", "/articles"];
const motionSelector = [
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

async function checkPage(browser, path) {
  const page = await browser.newPage({ viewport: mobileViewport });
  const badResponses = [];

  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();

    if (status >= 400 && !url.includes("/_next/webpack-hmr")) {
      badResponses.push(`${status} ${url}`);
    }
  });

  await page.goto(new URL(path, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 20_000,
  });
  await page.waitForTimeout(1_200);

  const metrics = await page.evaluate(() => ({
    innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    title: document.title,
  }));

  if (metrics.scrollWidth > metrics.innerWidth || metrics.bodyScrollWidth > metrics.innerWidth) {
    fail(
      `${path} has horizontal overflow: innerWidth=${metrics.innerWidth}, ` +
        `scrollWidth=${metrics.scrollWidth}, bodyScrollWidth=${metrics.bodyScrollWidth}`,
    );
  } else {
    console.log(`OK ${path} mobile width`);
  }

  for (const response of badResponses) {
    fail(`${path} returned ${response}`);
  }

  await page.close();
}

async function checkSaveDataHero(browser) {
  const page = await browser.newPage({ viewport: mobileViewport });

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

  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 20_000 });
  await page.waitForTimeout(1_500);

  const videoCount = await page.locator("video").count();
  if (videoCount > 0 || videoRequests.length > 0) {
    fail(`Save-Data hero loaded video: videoCount=${videoCount}, requests=${videoRequests.length}`);
  } else {
    console.log("OK Save-Data keeps hero on poster");
  }

  await page.close();
}

async function checkMotionReveal(browser) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 20_000 });
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
    }, motionSelector);

    if (hiddenInView.length > 0) {
      hiddenByScroll.push(`${scrollY}: ${hiddenInView.join(" | ")}`);
    }
  }

  if (hiddenByScroll.length > 0) {
    fail(`Motion reveal left visible elements hidden: ${hiddenByScroll.join("; ")}`);
  } else {
    console.log("OK motion reveal on scroll");
  }

  await page.close();
}

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });

  for (const path of pages) {
    await checkPage(browser, path);
  }

  await checkSaveDataHero(browser);
  await checkMotionReveal(browser);
  await browser.close();

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

await main();

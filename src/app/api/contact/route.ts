import { NextResponse } from "next/server";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mayzjlvy";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 160;
const MAX_CONTACT_LENGTH = 160;
const MAX_LONG_TEXT_LENGTH = 4000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 4;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const LONG_TEXT_FIELDS = [
  "background",
  "businessGoals",
  "communicationGoals",
  "marketSituation",
  "differentiation",
  "barriers",
  "audience",
  "insight",
  "keyMessage",
  "reasonToBelieve",
  "brandStyle",
  "references",
  "resultExpectation",
  "runtimeVersions",
  "technicalRequirements",
  "assets",
  "message",
];

function getStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getRedirectPath(
  locale: string,
  status: "success" | "error",
  reason?: string,
  source?: string,
) {
  const isEn = locale === "en";
  const sourceKey = source === "contacts" || source === "weddings" ? source : "brief";
  const basePath =
    sourceKey === "contacts"
      ? isEn
        ? "/en/contacts"
        : "/contacts"
      : sourceKey === "weddings"
        ? isEn
          ? "/en/weddings"
          : "/weddings"
        : isEn
          ? "/en/brief"
          : "/brief";
  const anchor = sourceKey === "weddings" ? "#wedding-brief" : "#contact-form";
  const searchParams = new URLSearchParams({ status });

  if (reason) {
    searchParams.set("reason", reason);
  }

  return `${basePath}?${searchParams.toString()}${anchor}`;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "";
  }

  return realIp?.trim() ?? "";
}

function isRateLimited(ip: string) {
  if (!ip) return false;

  const now = Date.now();

  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(ip);

  if (!current) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");

  if (origin && origin !== requestUrl.origin) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const formData = await request.formData();
  const locale = getStringValue(formData.get("locale")) === "en" ? "en" : "ru";
  const name = getStringValue(formData.get("name"));
  const email = getStringValue(formData.get("email"));
  const phone = getStringValue(formData.get("phone"));
  const agree = getStringValue(formData.get("agree"));
  const website = getStringValue(formData.get("website"));
  const sourceValue = getStringValue(formData.get("source"));
  const source =
    sourceValue === "contacts" || sourceValue === "weddings" ? sourceValue : "brief";
  const ip = getClientIp(request);

  if (website) {
    return NextResponse.redirect(new URL(getRedirectPath(locale, "error", "spam", source), request.url), {
      status: 303,
    });
  }

  if (isRateLimited(ip)) {
    return NextResponse.redirect(
      new URL(getRedirectPath(locale, "error", "rate-limit", source), request.url),
      { status: 303 },
    );
  }

  const isValidName = name.length <= MAX_NAME_LENGTH;
  const isValidEmail = email.length === 0 || (email.length <= MAX_EMAIL_LENGTH && EMAIL_RE.test(email));
  const isValidPhone = phone.length <= MAX_CONTACT_LENGTH;
  const isValidLongText = LONG_TEXT_FIELDS.every((field) => {
    const value = getStringValue(formData.get(field));
    return value.length <= MAX_LONG_TEXT_LENGTH;
  });
  const hasContact = Boolean(email || phone);

  if (!hasContact) {
    return NextResponse.redirect(new URL(getRedirectPath(locale, "error", "contact", source), request.url), {
      status: 303,
    });
  }

  if (agree !== "yes") {
    return NextResponse.redirect(new URL(getRedirectPath(locale, "error", "consent", source), request.url), {
      status: 303,
    });
  }

  if (!isValidName || !isValidEmail || !isValidPhone || !isValidLongText) {
    return NextResponse.redirect(new URL(getRedirectPath(locale, "error", "invalid", source), request.url), {
      status: 303,
    });
  }

  const payload = new FormData();
  let hasAnyUserValue = false;

  for (const [key, value] of formData.entries()) {
    if (key === "locale" || key === "website") continue;
    if (typeof value !== "string") continue;

    const normalizedValue = value.trim();
    if (!normalizedValue) continue;

    payload.append(key, normalizedValue);
    hasAnyUserValue = true;
  }

  if (!hasAnyUserValue) {
    payload.append(
      "message",
      locale === "en"
        ? "Brief submitted without detailed fields filled in."
        : "Бриф отправлен без детально заполненных полей.",
    );
  }

  payload.set(
    "_subject",
    source === "weddings"
      ? locale === "en"
        ? "Wedding page request"
        : "Заявка с сайта: свадьбы"
      : locale === "en"
        ? "Website brief request"
        : "Заявка с сайта: бриф",
  );

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: payload,
      cache: "no-store",
    });

    const status = response.ok ? "success" : "error";
    return NextResponse.redirect(new URL(getRedirectPath(locale, status, undefined, source), request.url), {
      status: 303,
    });
  } catch {
    return NextResponse.redirect(new URL(getRedirectPath(locale, "error", undefined, source), request.url), {
      status: 303,
    });
  }
}

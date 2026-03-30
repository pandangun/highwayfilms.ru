import { NextResponse } from "next/server";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mayzjlvy";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 160;
const MAX_LONG_TEXT_LENGTH = 4000;

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
  "approvals",
  "message",
];

function getStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getRedirectPath(locale: string, status: "success" | "error") {
  const basePath = locale === "en" ? "/en/brief" : "/brief";
  return `${basePath}?status=${status}#contact-form`;
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");

  if (origin && origin !== requestUrl.origin) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const formData = await request.formData();
  const locale = getStringValue(formData.get("locale")) === "en" ? "en" : "ru";
  const redirectUrl = new URL(getRedirectPath(locale, "error"), request.url);

  const name = getStringValue(formData.get("name"));
  const email = getStringValue(formData.get("email"));

  const isValidName = name.length <= MAX_NAME_LENGTH;
  const isValidEmail = email.length === 0 || (email.length <= MAX_EMAIL_LENGTH && EMAIL_RE.test(email));
  const isValidLongText = LONG_TEXT_FIELDS.every((field) => {
    const value = getStringValue(formData.get(field));
    return value.length <= MAX_LONG_TEXT_LENGTH;
  });

  if (!isValidName || !isValidEmail || !isValidLongText) {
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  const payload = new FormData();
  let hasAnyUserValue = false;

  for (const [key, value] of formData.entries()) {
    if (key === "locale") continue;
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

  payload.set("_subject", locale === "en" ? "Website brief request" : "Заявка с сайта: бриф");

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
    return NextResponse.redirect(new URL(getRedirectPath(locale, status), request.url), {
      status: 303,
    });
  } catch {
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }
}

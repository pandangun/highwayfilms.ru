"use client";

import { useSearchParams } from "next/navigation";
import type { Locale } from "@/components/siteNavigation";

type FormKind = "brief" | "contacts" | "weddings";

const copy = {
  ru: {
    success: {
      brief: "Бриф отправлен. Смету пришлём в течение рабочего дня.",
      contacts: "Сообщение отправлено. Ответим в течение рабочего дня.",
      weddings: "Заявка отправлена. Ответим в течение дня и скажем, свободна ли дата.",
    },
    contact: "Оставьте телефон, Telegram или почту — иначе нам некуда ответить.",
    consent: "Отметьте согласие на обработку данных: без него форма не отправляется.",
    spam: "Форма не прошла проверку. Отправьте её ещё раз.",
    rateLimit: "Слишком много отправок подряд. Попробуйте через 10 минут.",
    invalid: "Проверьте поля: почта с ошибкой или какой-то текст слишком длинный.",
    generic: "Не получилось отправить. Попробуйте ещё раз или напишите нам в Telegram.",
  },
  en: {
    success: {
      brief: "Brief sent. The estimate comes within one working day.",
      contacts: "Message sent. We reply within one working day.",
      weddings: "Request sent. We reply within a day and tell you if the date is free.",
    },
    contact: "Leave a phone number, Telegram or email, otherwise we can't reply.",
    consent: "Tick the data processing consent: the form can't be sent without it.",
    spam: "The form failed the check. Please send it again.",
    rateLimit: "Too many submissions in a row. Try again in 10 minutes.",
    invalid: "Check the fields: the email has a typo or some text is too long.",
    generic: "Couldn't send the form. Try again or message us on Telegram.",
  },
} as const;

/**
 * Итог отправки формы (?status=success|error&reason=...).
 *
 * Читает query на клиенте: searchParams в странице сделали бы её
 * динамической ради одной строки. Оборачивать в <Suspense>.
 */
export default function FormStatus({ locale, kind }: { locale: Locale; kind: FormKind }) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const reason = searchParams.get("reason");
  const t = copy[locale];

  if (status === "success") {
    return (
      <p className="notice notice--ok" role="status">
        {t.success[kind]}
      </p>
    );
  }

  if (status !== "error") return null;

  const text =
    reason === "contact"
      ? t.contact
      : reason === "consent"
        ? t.consent
        : reason === "spam"
          ? t.spam
          : reason === "rate-limit"
            ? t.rateLimit
            : reason === "invalid"
              ? t.invalid
              : t.generic;

  return (
    <p className="notice notice--error" role="alert">
      {text}
    </p>
  );
}

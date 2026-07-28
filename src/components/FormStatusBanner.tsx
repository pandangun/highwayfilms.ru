"use client";

import { useSearchParams } from "next/navigation";

/**
 * Баннер результата отправки формы (?status=success|error&reason=...).
 *
 * Читает query сам, на клиенте. Раньше status/reason прокидывались из
 * страницы через searchParams — а это переводит всю страницу в динамический
 * рендер. Из-за одного баннера /weddings и /brief не могли быть статикой.
 *
 * Оборачивать в <Suspense>: useSearchParams требует границы, иначе Next
 * откатит всю ветку к динамике и смысл потеряется.
 */
export type FormStatusCopy = {
  success: string;
  contact: string;
  rateLimit: string;
  generic: string;
};

export default function FormStatusBanner({
  copy,
  className,
  successClassName,
  errorClassName,
}: {
  copy: FormStatusCopy;
  className: string;
  successClassName: string;
  errorClassName: string;
}) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const reason = searchParams.get("reason");

  if (status !== "success" && status !== "error") return null;

  if (status === "success") {
    return <div className={`${className} ${successClassName}`}>{copy.success}</div>;
  }

  const errorText =
    reason === "contact" ? copy.contact : reason === "rate-limit" ? copy.rateLimit : copy.generic;

  return <div className={`${className} ${errorClassName}`}>{errorText}</div>;
}

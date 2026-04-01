"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/data/articles";

type ClientAccessFormProps = {
  locale: Locale;
};

export function ClientAccessForm({ locale }: ClientAccessFormProps) {
  const router = useRouter();
  const [projectCode, setProjectCode] = useState("HF-274");
  const [email, setEmail] = useState("");

  const labels = useMemo(
    () =>
      locale === "en"
        ? {
            code: "Project code",
            email: "E-mail or contact",
            submit: "Open project",
            placeholderCode: "HF-274",
            placeholderEmail: "name@company.com",
          }
        : {
            code: "Код проекта",
            email: "E-mail или контакт",
            submit: "Открыть проект",
            placeholderCode: "HF-274",
            placeholderEmail: "name@company.com",
          },
    [locale],
  );

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const basePath = locale === "en" ? "/en/client/demo-project" : "/client/demo-project";
        const query = new URLSearchParams();

        if (projectCode.trim()) {
          query.set("code", projectCode.trim());
        }

        if (email.trim()) {
          query.set("contact", email.trim());
        }

        router.push(query.toString() ? `${basePath}?${query.toString()}` : basePath);
      }}
    >
      <label className="block">
        <div className="mb-2 text-sm text-white/68">{labels.code}</div>
        <input
          value={projectCode}
          onChange={(event) => setProjectCode(event.target.value)}
          placeholder={labels.placeholderCode}
          className="field-shell"
          required
        />
      </label>
      <label className="block">
        <div className="mb-2 text-sm text-white/68">{labels.email}</div>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={labels.placeholderEmail}
          className="field-shell"
          required
        />
      </label>
      <button type="submit" className="btn-primary mt-2 inline-flex rounded-full px-6 text-sm">
        {labels.submit}
      </button>
    </form>
  );
}

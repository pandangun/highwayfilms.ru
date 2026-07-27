"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/data/articles";

type ClientAccessFormProps = {
  locale: Locale;
};

export function ClientAccessForm({ locale }: ClientAccessFormProps) {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const labels = useMemo(
    () =>
      locale === "en"
        ? {
            login: "Login",
            password: "Password",
            submit: "Open project",
            placeholderLogin: "client@company.com",
            placeholderPassword: "Enter your password",
            note: "Demo access opens the preview room without checking the credentials yet.",
          }
        : {
            login: "Логин",
            password: "Пароль",
            submit: "Открыть проект",
            placeholderLogin: "client@company.com",
            placeholderPassword: "Введите пароль",
            note: "Демо-вход пока открывает тестовую комнату без проверки данных.",
          },
    [locale],
  );

  return (
    <form
      className="grid gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        const basePath = locale === "en" ? "/en/client/demo-project" : "/client/demo-project";
        router.push(basePath);
      }}
    >
      <div className="grid gap-5">
        <label className="client-access-label">
          <div className="client-access-label__eyebrow">{labels.login}</div>
          <div className="client-access-line">
            <input
              type="text"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder={labels.placeholderLogin}
              autoComplete="username"
              className="client-access-input"
              required
            />
          </div>
        </label>

        <label className="client-access-label">
          <div className="client-access-label__eyebrow">{labels.password}</div>
          <div className="client-access-line">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={labels.placeholderPassword}
              autoComplete="current-password"
              className="client-access-input"
              required
            />
          </div>
        </label>
      </div>

      <p className="client-access-note">{labels.note}</p>

      <button
        type="submit"
        className="client-access-submit"
      >
        {labels.submit}
      </button>
    </form>
  );
}

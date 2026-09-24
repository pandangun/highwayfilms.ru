"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Field from "@/components/Field";
import type { Locale } from "@/components/siteNavigation";

const labels = {
  ru: {
    login: "Логин",
    password: "Пароль",
    submit: "Войти",
    placeholderLogin: "client@company.ru",
    placeholderPassword: "Пароль из письма",
    note: "Пока работает демо-вход: откроется пример проекта, данные не проверяются.",
  },
  en: {
    login: "Login",
    password: "Password",
    submit: "Sign in",
    placeholderLogin: "client@company.com",
    placeholderPassword: "Password from the email",
    note: "Demo access for now: it opens a sample project without checking the credentials.",
  },
} as const;

/**
 * Вход в кабинет. Настоящей проверки ещё нет: форма ведёт в демо-проект.
 * Когда появится авторизация, меняется только onSubmit.
 */
export function ClientAccessForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const t = labels[locale];

  return (
    <form
      className="grid gap-8"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(locale === "en" ? "/en/client/demo-project" : "/client/demo-project");
      }}
    >
      <Field label={t.login} htmlFor="client-login">
        <input
          id="client-login"
          type="text"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          placeholder={t.placeholderLogin}
          autoComplete="username"
          className="input"
          required
        />
      </Field>

      <Field label={t.password} htmlFor="client-password">
        <input
          id="client-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={t.placeholderPassword}
          autoComplete="current-password"
          className="input"
          required
        />
      </Field>

      <button type="submit" className="btn btn--primary btn--block">
        {t.submit}
      </button>

      <p className="text-micro text-haze">{t.note}</p>
    </form>
  );
}

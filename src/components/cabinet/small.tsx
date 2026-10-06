"use client";

import { useActionState, useState, useTransition } from "react";
import { saveTestimonial, unlockPremiere, type PremiereState } from "@/cabinet/actions/client";
import { createLink, loginStudio, type LinkState, type LoginState } from "@/cabinet/actions/studio";

/** Значение с кнопкой «Скопировать»: личная ссылка, пароль просмотра. */
export function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="st-inline">
      <label className="field">
        <span className="field__label">{label}</span>
        <input className="input cab-code" value={value} readOnly onFocus={(event) => event.currentTarget.select()} />
      </label>
      <button
        type="button"
        className="btn btn--line btn--sm"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? "Скопировано" : "Скопировать"}
      </button>
    </div>
  );
}

export function StudioLogin() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginStudio, {});
  return (
    <form action={action} className="grid gap-6">
      <label className="field">
        <span className="field__label">Пароль студии</span>
        <input className="input" type="password" name="password" autoComplete="current-password" required autoFocus />
      </label>
      {state.error ? (
        <p className="notice notice--error" role="alert">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn btn--primary" disabled={pending}>
        {pending ? "Проверяем…" : "Войти"}
      </button>
    </form>
  );
}

/** Новая личная ссылка: показываем её один раз — в базе только хэш. */
export function LinkCreator({ code }: { code: string }) {
  const [state, action, pending] = useActionState<LinkState, FormData>(createLink, {});
  return (
    <div className="grid gap-4">
      <form action={action} className="st-inline">
        <input type="hidden" name="code" value={code} />
        <label className="field">
          <span className="field__label">Кому ссылка</span>
          <input className="input" name="name" placeholder="Имя" required />
        </label>
        <button type="submit" className="btn btn--line btn--sm" disabled={pending}>
          Выдать ссылку
        </button>
      </form>
      {state.error ? <p className="notice notice--error">{state.error}</p> : null}
      {state.url ? (
        <div className="cab-card grid gap-3">
          <CopyField value={state.url} label={`Ссылка для: ${state.name}`} />
          <p className="cab-muted">
            Отправьте её в Telegram или WhatsApp. Она личная: по ней заходят без пароля. Ссылка показывается один раз; потеряется — выдайте новую.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function PremiereUnlock({ slug }: { slug: string }) {
  const [state, action, pending] = useActionState<PremiereState, FormData>(unlockPremiere, {});
  return (
    <form action={action} className="premiere__form">
      <input type="hidden" name="slug" value={slug} />
      <label className="field">
        <span className="field__label">Пароль</span>
        <input className="input cab-code" name="password" autoComplete="off" placeholder="abc-def-ghk" required autoFocus />
      </label>
      {state.error ? (
        <p className="notice notice--error" role="alert">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn btn--primary" disabled={pending}>
        Смотреть
      </button>
    </form>
  );
}

export function TestimonialForm({ code, initial }: { code: string; initial: { body: string; allowPublish: boolean } | null }) {
  const [body, setBody] = useState(initial?.body ?? "");
  const [allow, setAllow] = useState(initial?.allowPublish ?? true);
  const [done, setDone] = useState(Boolean(initial));
  const [pending, startTransition] = useTransition();

  if (done) {
    return (
      <div className="grid gap-3">
        <p>Спасибо! Отзыв у нас.</p>
        <button type="button" className="link-button justify-self-start" onClick={() => setDone(false)}>
          Изменить
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(async () => {
          await saveTestimonial(code, body, allow);
          setDone(true);
        });
      }}
    >
      <label className="field">
        <span className="field__label">Пара слов о нашей работе</span>
        <textarea className="input" rows={4} value={body} onChange={(event) => setBody(event.target.value)} required />
      </label>
      <label className="consent">
        <input type="checkbox" checked={allow} onChange={(event) => setAllow(event.target.checked)} />
        <span>Можно показать работу и отзыв на сайте студии</span>
      </label>
      <button type="submit" className="btn btn--line btn--sm justify-self-start" disabled={pending || !body.trim()}>
        Отправить
      </button>
    </form>
  );
}

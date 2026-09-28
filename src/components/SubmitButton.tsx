"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Кнопка отправки формы с состоянием «Отправляем…».
 *
 * Формы уходят обычным POST, и до ответа сервера страница не меняется:
 * на медленной сети казалось, что кнопка не сработала, и её жали второй
 * раз — приходило две заявки. Теперь сразу после отправки кнопка
 * меняет подпись и не принимает повторное нажатие. Вернулись на
 * страницу кнопкой «Назад» — снова активна.
 */
export default function SubmitButton({
  children,
  pendingLabel,
  className,
}: {
  children: ReactNode;
  pendingLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const form = ref.current?.form;
    if (!form) return;
    // submit приходит, только если браузер уже проверил обязательные поля.
    const onSubmit = () => setPending(true);
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) setPending(false);
    };
    form.addEventListener("submit", onSubmit);
    window.addEventListener("pageshow", onShow);
    return () => {
      form.removeEventListener("submit", onSubmit);
      window.removeEventListener("pageshow", onShow);
    };
  }, []);

  return (
    <button
      ref={ref}
      type="submit"
      className={clsx(className, pending && "is-pending")}
      aria-disabled={pending || undefined}
      onClick={(event) => {
        if (pending) event.preventDefault();
      }}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

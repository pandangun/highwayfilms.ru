import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * Графа формы: подпись, пометка «необязательно» и само поле под линией.
 * Поле передаётся детьми — input, textarea или select с классом .input.
 */
export default function Field({
  label,
  htmlFor,
  hint,
  wide = false,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={clsx("field", wide && "field--wide")}>
      <div className="field__head">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="field__label">
            {label}
          </label>
        ) : (
          <span className="field__label">{label}</span>
        )}
        {hint ? <span className="field__hint">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { saveQuestionnaire } from "@/cabinet/actions/client";
import { formatDateTime } from "@/cabinet/format";
import type { QuestionnaireSpec, RowSpec, TextKey } from "@/cabinet/kinds";
import type { Questionnaire, Row } from "@/cabinet/project";

const TEXT_KEYS: TextKey[] = ["people", "shots", "music", "speeches", "notes"];

/**
 * Анкета перед съёмкой или свадьбой. Подписи и подсказки — от типа
 * проекта (kinds.ts). Тайминг и контакты — строками, остальное —
 * свободным текстом. Сохраняется кнопкой; уйти с несохранённым браузер
 * не даст без предупреждения.
 */
export default function QuestionnaireForm({
  code,
  spec,
  initial,
  updatedAt,
  readOnly,
}: {
  code: string;
  spec: QuestionnaireSpec;
  initial: Questionnaire;
  updatedAt: string | null;
  readOnly: boolean;
}) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState(updatedAt);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = (patch: Partial<Questionnaire>) => {
    setData((current) => ({ ...current, ...patch }));
    setDirty(true);
  };

  const save = () => {
    setError("");
    startTransition(async () => {
      try {
        const result = await saveQuestionnaire(code, data);
        setSavedAt(result.savedAt);
        setDirty(false);
      } catch {
        setError("Не сохранилось. Проверьте интернет и нажмите ещё раз.");
      }
    });
  };

  return (
    <form
      className="qa"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <fieldset disabled={readOnly} className="contents">
        <RowsSection spec={spec.timeline} rows={data.timeline} onChange={(timeline) => update({ timeline })} />
        <RowsSection spec={spec.contacts} rows={data.contacts} onChange={(contacts) => update({ contacts })} />

        {TEXT_KEYS.map((key) => (
          <section key={key}>
            <label htmlFor={`qa-${key}`} className="cab-h2 block">
              {spec.texts[key].title}
            </label>
            <p className="qa-block__hint">{spec.texts[key].hint}</p>
            <textarea
              id={`qa-${key}`}
              className="input"
              rows={4}
              value={data[key]}
              onChange={(event) => update({ [key]: event.target.value } as Partial<Questionnaire>)}
            />
          </section>
        ))}
      </fieldset>

      {!readOnly ? (
        <div className="qa-save">
          <button type="submit" className="btn btn--primary" disabled={pending || !dirty}>
            {pending ? "Сохраняем…" : "Сохранить анкету"}
          </button>
          <span className="cab-muted" aria-live="polite">
            {error || (dirty ? "Есть несохранённые изменения" : savedAt ? `Сохранено ${formatDateTime(savedAt)}` : "")}
          </span>
        </div>
      ) : null}
    </form>
  );
}

function RowsSection({ spec, rows, onChange }: { spec: RowSpec; rows: Row[]; onChange: (rows: Row[]) => void }) {
  return (
    <section>
      <h2 className="cab-h2">{spec.title}</h2>
      <p className="qa-block__hint">{spec.hint}</p>
      <RowsEditor rows={rows} labels={spec.labels} placeholders={spec.placeholders} addLabel={spec.addLabel} onChange={onChange} />
    </section>
  );
}

function RowsEditor({
  rows,
  labels,
  placeholders,
  addLabel,
  onChange,
}: {
  rows: Row[];
  labels: [string, string, string];
  placeholders: [string, string, string];
  addLabel: string;
  onChange: (rows: Row[]) => void;
}) {
  const list = rows.length ? rows : [{ a: "", b: "", c: "" }];
  const set = (index: number, patch: Partial<Row>) => onChange(list.map((row, i) => (i === index ? { ...row, ...patch } : row)));

  return (
    <div className="qa-rows">
      {list.map((row, index) => (
        <div key={index} className="qa-row">
          {(["a", "b", "c"] as const).map((field, column) => (
            <label key={field} className="field">
              <span className="field__label">{labels[column]}</span>
              <input
                className="input"
                value={row[field]}
                placeholder={placeholders[column]}
                onChange={(event) => set(index, { [field]: event.target.value })}
              />
            </label>
          ))}
          <button
            type="button"
            className="link-button inline-flex h-10 w-10 items-center justify-center justify-self-start"
            onClick={() => onChange(list.filter((_, i) => i !== index))}
            aria-label={`Удалить строку ${index + 1}`}
          >
            <X className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          </button>
        </div>
      ))}
      <button type="button" className="link-button inline-flex items-center gap-1.5 justify-self-start" onClick={() => onChange([...list, { a: "", b: "", c: "" }])}>
        <Plus className="h-4 w-4" strokeWidth={1.8} aria-hidden />
        {addLabel}
      </button>
    </div>
  );
}

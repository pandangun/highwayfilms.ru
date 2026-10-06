"use client";

import { useState } from "react";
import { createProject } from "@/cabinet/actions/studio";
import type { ProjectKind } from "@/cabinet/db/schema";
import { KINDS, PROJECT_KINDS } from "@/cabinet/kinds";
import Field from "@/components/Field";

/** Новый проект: подписи полей и этапы меняются вместе с типом. */
export default function NewProjectForm() {
  const [kind, setKind] = useState<ProjectKind>("wedding");
  const spec = KINDS[kind];

  return (
    <form action={createProject} className="form-grid mt-10">
      <Field label="Тип проекта" htmlFor="kind" wide>
        <select id="kind" name="kind" className="input" value={kind} onChange={(event) => setKind(event.target.value as ProjectKind)}>
          {PROJECT_KINDS.map((item) => (
            <option key={item} value={item}>
              {KINDS[item].label}
            </option>
          ))}
        </select>
      </Field>
      <Field label={spec.titleLabel} htmlFor="title" wide>
        <input id="title" name="title" className="input" placeholder={spec.titlePlaceholder} required maxLength={120} />
      </Field>
      <Field label={spec.dateLabel} htmlFor="eventDate">
        <input id="eventDate" name="eventDate" type="date" className="input" />
      </Field>
      <Field label="Город" htmlFor="city">
        <input id="city" name="city" className="input" placeholder="Санкт-Петербург" maxLength={80} />
      </Field>
      <Field label="Кругов правок по договору" htmlFor="roundsIncluded">
        <input id="roundsIncluded" name="roundsIncluded" type="number" min={0} max={5} defaultValue={1} className="input" />
      </Field>
      <p className="field--wide cab-muted">Этапы: {spec.stages.map((stage) => stage.title.toLowerCase()).join(", ")}. Сроки встанут от даты, их можно поправить в проекте.</p>
      <div className="field--wide">
        <button type="submit" className="btn btn--primary">
          Создать проект
        </button>
      </div>
    </form>
  );
}

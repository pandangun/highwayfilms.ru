import type { Project, ProjectFile, Stage, Testimonial, Version } from "@/cabinet/db/schema";
import { formatDay } from "@/cabinet/format";
import { capitalize, kindOf } from "@/cabinet/kinds";

/**
 * Проект в кабинете: этапы маршрута, анкета и «что нужно от вас сейчас».
 * Чем типы проектов отличаются друг от друга — в kinds.ts.
 */

function shift(day: string, days: number) {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Этапы нового проекта: сроки — от главной даты, студия правит их потом. */
export function defaultStages(kind: string, eventDate: string | null) {
  return kindOf(kind).stages.map((stage, position) => ({
    key: stage.key,
    title: stage.title,
    position,
    dueOn: eventDate && stage.offsetDays !== null ? shift(eventDate, stage.offsetDays) : null,
  }));
}

/** Сколько файлы лежат после главной даты. */
export const STORAGE_MONTHS = 12;

export function storageUntil(eventDate: string | null) {
  if (!eventDate) return null;
  const date = new Date(`${eventDate}T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + STORAGE_MONTHS);
  return date.toISOString().slice(0, 10);
}

export function currentStage(stages: Stage[]) {
  return [...stages].sort((a, b) => a.position - b.position).find((stage) => !stage.doneAt) ?? null;
}

/* ── Анкета ── */

export type Row = { a: string; b: string; c: string };

export type Questionnaire = {
  /** Тайминг: время, что происходит, адрес. */
  timeline: Row[];
  /** Контакты на площадке: роль, имя, телефон. */
  contacts: Row[];
  people: string;
  shots: string;
  music: string;
  speeches: string;
  notes: string;
};

export const EMPTY_QUESTIONNAIRE: Questionnaire = {
  timeline: [],
  contacts: [],
  people: "",
  shots: "",
  music: "",
  speeches: "",
  notes: "",
};

const text = (value: unknown, max = 3000) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function rows(value: unknown): Row[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 30)
    .map((row) => ({ a: text(row?.a, 60), b: text(row?.b, 300), c: text(row?.c, 300) }))
    .filter((row) => row.a || row.b || row.c);
}

/** Всё, что пришло из формы, — к одному виду, с ограничением длины. */
export function normalizeQuestionnaire(input: unknown): Questionnaire {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    timeline: rows(data.timeline),
    contacts: rows(data.contacts),
    people: text(data.people),
    shots: text(data.shots),
    music: text(data.music),
    speeches: text(data.speeches),
    notes: text(data.notes),
  };
}

/** Заполнена, если есть хотя бы тайминг дня. */
export function questionnaireFilled(data: Questionnaire | null) {
  return Boolean(data && data.timeline.length > 0);
}

/* ── Чей ход ── */

export type ProjectState = {
  project: Project;
  stages: Stage[];
  versions: Version[];
  /** Черновики правок клиента по версиям: id версии → сколько. */
  drafts: Record<string, number>;
  questionnaire: Questionnaire | null;
  files: ProjectFile[];
  testimonial: Testimonial | null;
};

export type NextStep = {
  who: "client" | "studio";
  title: string;
  text?: string;
  href?: string;
  cta?: string;
};

const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

/** Главная карточка кабинета клиента: одно действие, остальное вторично. */
export function clientNextStep(state: ProjectState, base: string): NextStep {
  const kind = kindOf(state.project.kind);
  const review = latestInReview(state.versions);
  if (review) {
    const drafts = state.drafts[review.id] ?? 0;
    return drafts
      ? { who: "client", title: `Отправьте правки к «${review.title}»`, text: "Правки видны только вам, пока вы их не отправите.", href: `${base}/v/${review.id}`, cta: "К правкам" }
      : { who: "client", title: `Посмотрите «${review.title}»`, text: "Оставьте правки по таймкодам или согласуйте версию.", href: `${base}/v/${review.id}`, cta: "Смотреть" };
  }

  const questionnaireStage = state.stages.find((stage) => stage.key === "questionnaire");
  if (questionnaireStage && !questionnaireStage.doneAt && !questionnaireFilled(state.questionnaire)) {
    return {
      who: "client",
      title: kind.questionnaire.ask,
      text: questionnaireStage.dueOn
        ? `Лучше до ${formatDay(questionnaireStage.dueOn, { withYear: false })}: ${lowerFirst(kind.questionnaire.why)}`
        : kind.questionnaire.why,
      href: `${base}/anketa`,
      cta: "Заполнить",
    };
  }

  const filmApproved = state.versions.some((version) => version.kind === "film" && version.status === "approved");
  if (filmApproved && state.files.some((file) => file.ready) && !state.testimonial) {
    return { who: "client", title: kind.doneTitle, text: "Файлы можно скачать ниже. Будем рады паре слов о нашей работе.", href: `${base}#files`, cta: "К файлам" };
  }

  const stage = currentStage(state.stages);
  if (!stage) return { who: "studio", title: "Всё сдано", text: "Файлы ждут вас в разделе ниже." };
  return {
    who: "studio",
    title: `Сейчас: ${lowerFirst(stage.title)}`,
    text: stage.dueOn ? `Срок — ${formatDay(stage.dueOn, { withYear: false })}. Как будет готово, напишем.` : "Как будет готово, напишем.",
  };
}

/** Строка для списка проектов студии: чей сейчас ход. */
export function studioTurn(state: ProjectState & { submittedOpen: number }) {
  const who = kindOf(state.project.kind).who;
  if (state.submittedOpen > 0) return { who: "studio" as const, text: `Правки ${who.gen}: ${state.submittedOpen}` };
  const review = latestInReview(state.versions);
  if (review) return { who: "client" as const, text: `${capitalize(who.nom)} смотрит «${review.title}»` };
  const stage = currentStage(state.stages);
  if (stage?.key === "questionnaire" && !questionnaireFilled(state.questionnaire)) return { who: "client" as const, text: "Ждём анкету" };
  if (!stage) return { who: "studio" as const, text: "Всё сдано" };
  return { who: "studio" as const, text: stage.title };
}

function latestInReview(versions: Version[]) {
  return [...versions].filter((version) => version.status === "review").sort((a, b) => +b.createdAt - +a.createdAt)[0] ?? null;
}

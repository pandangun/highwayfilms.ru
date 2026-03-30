"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type Locale = "ru" | "en";
type StepKey = "contact" | "goals" | "market" | "message" | "result" | "confirm";
type StepMeta = { key: StepKey; title: string; description: string };
type Option = { value: string; label: string };

const inputClassName =
  "h-[4.5rem] w-full rounded-[26px] border border-white/10 bg-black/30 px-6 text-[1.05rem] text-white outline-none transition placeholder:text-white/28 focus:border-brand focus:ring-2 focus:ring-brand/30";

const textareaClassName =
  "min-h-[220px] w-full rounded-[30px] border border-white/10 bg-black/30 px-6 py-5 text-[1.05rem] text-white outline-none transition placeholder:text-white/28 focus:border-brand focus:ring-2 focus:ring-brand/30";

function StatusBanner({
  status,
  successText,
  errorText,
}: {
  status?: string;
  successText: string;
  errorText: string;
}) {
  if (status !== "success" && status !== "error") return null;

  return (
    <div
      className={`rounded-[24px] border px-4 py-3 text-sm ${
        status === "success"
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
          : "border-rose-400/30 bg-rose-500/10 text-rose-100"
      }`}
    >
      {status === "success" ? successText : errorText}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  optionalLabel,
  children,
}: {
  label: string;
  htmlFor?: string;
  optionalLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-black/20 px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.14)] md:px-7 md:py-7">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={htmlFor} className="text-[1.08rem] font-medium text-white/88">
          {label}
        </label>
        <span className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">{optionalLabel}</span>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function FormSection({
  step,
  badge,
  title,
  description,
  children,
}: {
  step: StepKey;
  badge: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`brief-${step}`}
      className="relative rounded-[34px] border border-white/12 bg-white/[0.04] p-6 md:p-8"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="flex items-start justify-between gap-4 text-left">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-brand px-3 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_0_0_6px_rgba(124,58,237,0.12)]">
              {badge}
            </span>
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/34">
                {step.replace("-", " ")}
              </p>
              <h3 className="mt-2 text-[1.35rem] font-medium leading-tight text-white md:text-[1.55rem]">
                {title}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-[0.98rem] leading-7 text-white/56">{description}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/36">
          {badge}
        </span>
      </div>
      <div className="mt-8 space-y-5">{children}</div>
    </section>
  );
}

export function BriefStudioPage({ locale, status }: { locale: Locale; status?: string }) {
  const isRu = locale === "ru";
  const t = (ru: string, en: string) => (isRu ? ru : en);
  const privacyHref = isRu ? "/privacy" : "/en/privacy";

  const projectTypes: Option[] = [
    { value: "commercial", label: t("Коммерческое видео", "Commercial video") },
    { value: "campaign", label: t("Кампания / digital launch", "Campaign / digital launch") },
    { value: "brand-film", label: t("Бренд-фильм", "Brand film") },
    { value: "product", label: t("Продуктовый ролик", "Product video") },
    { value: "event", label: t("Event / имиджевый ролик", "Event / image film") },
    { value: "ai", label: t("AI / CGI / mixed media", "AI / CGI / mixed media") },
  ];

  const budgetOptions: Option[] = [
    { value: "unknown", label: t("Пока без бюджета", "No budget yet") },
    { value: "under-300k", label: t("До 300 тыс. ₽", "Up to 300K RUB") },
    { value: "300-700k", label: t("300-700 тыс. ₽", "300K-700K RUB") },
    { value: "700k-1.5m", label: t("700 тыс. - 1.5 млн ₽", "700K-1.5M RUB") },
    { value: "1.5m-plus", label: t("1.5 млн ₽ и выше", "1.5M RUB and above") },
  ];

  const scriptOptions: Option[] = [
    { value: "ready", label: t("Сценарий уже есть", "Script is ready") },
    { value: "draft", label: t("Есть набросок / treatment", "Draft or treatment exists") },
    { value: "need-development", label: t("Нужна разработка с нуля", "Needs development from scratch") },
  ];

  const deliverables: Option[] = [
    { value: "social", label: t("Соцсети", "Social media") },
    { value: "youtube", label: "YouTube / online" },
    { value: "tv", label: "TV / OLV" },
    { value: "event", label: t("Event / экран", "Event / screen") },
    { value: "site", label: t("Сайт / лендинг", "Website / landing") },
    { value: "internal", label: t("Внутренние коммуникации", "Internal communications") },
  ];

  const steps: StepMeta[] = [
    {
      key: "contact",
      title: t("Контакт и рамка", "Contact and frame"),
      description: t(
        "Кто вы, какой проект запускается и в какой базовой рамке он существует.",
        "Who you are, what is launching, and what the basic frame looks like.",
      ),
    },
    {
      key: "goals",
      title: t("Контекст и цели", "Context and goals"),
      description: t(
        "Краткое описание задачи, бизнес-цели и коммуникационные цели проекта.",
        "Task background, business goals, and communication goals.",
      ),
    },
    {
      key: "market",
      title: t("Рынок и аудитория", "Market and audience"),
      description: t(
        "Рынок, конкуренты, барьеры, аудитория и инсайт для будущего креатива.",
        "Market context, competitors, barriers, audience, and insight.",
      ),
    },
    {
      key: "message",
      title: t("Сообщение и стиль", "Message and style"),
      description: t(
        "Ключевое сообщение, RTB, визуальный характер и брендовые ограничения.",
        "Core message, RTB, visual direction, and brand constraints.",
      ),
    },
    {
      key: "result",
      title: t("Результат и продакшн", "Result and production"),
      description: t(
        "Форматы, версии, хронометраж, техтребования и ожидания от этапа.",
        "Formats, versions, runtime, technical specs, and expected output.",
      ),
    },
    {
      key: "confirm",
      title: t("Финальный комментарий", "Final notes"),
      description: t(
        "Что уже есть на руках, кто согласует проект и что ещё важно не потерять.",
        "Existing assets, approval flow, and anything else that should not get lost.",
      ),
    },
  ];

  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <section className="page-content mx-auto w-full max-w-[1440px] px-4 pb-20 pt-header-safe sm:px-6 md:pb-24 md:pt-[calc(var(--header-h)+env(safe-area-inset-top)+3rem)] lg:px-8">
        <div className="surface-panel relative overflow-hidden px-6 py-7 shadow-[0_28px_90px_rgba(0,0,0,0.3)] md:px-8 md:py-8 xl:px-10 xl:py-10">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/38 to-transparent" />
          <div className="max-w-5xl">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand" />
              {t("Бриф", "Brief")}
            </p>
            <h1 className="font-display mt-4 max-w-5xl text-[clamp(2.8rem,5.5vw,5.4rem)] leading-[0.94] tracking-[-0.05em] text-white">
              {t("Бриф на создание видеоролика", "Video production brief")}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/68 md:text-[1.22rem]">
              {t(
                "Заполните, пожалуйста, бриф, чтобы мы смогли быстро и четко понять вашу задачу и предложить под нее оптимальное решение.",
                "Fill in the brief so we can quickly understand the task and suggest the right solution.",
              )}
            </p>
            <p className="mt-5 max-w-3xl rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/64">
              {t(
                "Если не знаете, что указывать в каком-то поле, просто пропустите его.",
                "If you are unsure about a field, just skip it.",
              )}
            </p>
            <div className="mt-7 max-w-3xl">
              <StatusBanner
                status={status}
                successText={t(
                  "Бриф отправлен. Вернёмся с ответом в рабочее время.",
                  "The brief has been sent. We will respond during business hours.",
                )}
                errorText={t(
                  "Не удалось отправить бриф. Проверьте e-mail и попробуйте ещё раз.",
                  "The brief could not be sent. Please check the e-mail and try again.",
                )}
              />
            </div>
          </div>

<div className="mt-10 border-t border-white/10 pt-8">
            <p className="eyebrow">{t("Что это", "What it is")}</p>
            <h2 className="font-display mt-4 max-w-4xl text-3xl leading-tight text-white md:text-4xl">
              {t(
                "Бриф — это краткое описание задачи.",
                "A brief is a short description of the task.",
              )}
            </h2>
            <p className="mt-4 max-w-3xl text-white/62">
              {t(
                "Он нужен, чтобы быстро зафиксировать цель, вводные и ограничения и сразу предложить точное решение.",
                "It helps fix the goal, context, and constraints so we can move faster to the right solution.",
              )}
            </p>

            <div className="mx-auto mt-8 w-full max-w-6xl">
              <div className="grid gap-2.5 md:grid-cols-3 xl:grid-cols-6">
                {steps.map((step, index) => {
                  return (
                    <a
                      key={step.key}
                      href={`#brief-${step.key}`}
                      className="rounded-[20px] border border-white/8 bg-white/[0.02] px-3.5 py-3 text-left transition hover:border-white/14 hover:bg-white/[0.03]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[0.68rem] uppercase tracking-[0.2em] text-white/30">
                          {index + 1}/6
                        </span>
                        <span className="text-[0.6rem] uppercase tracking-[0.18em] text-white/34">
                          {t("Открыть", "Open")}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[0.92rem] font-medium leading-6 text-white/68">{step.title}</p>
                    </a>
                  );
                })}
              </div>
            </div>

            <form id="contact-form" action="/api/contact" method="POST" className="mx-auto mt-8 w-full max-w-[980px] space-y-10">
              <input type="hidden" name="locale" value={locale} />
              <FormSection
                step="contact"
                badge="1/6"
                title={steps[0].title}
                description={steps[0].description}
              >
                <div className="space-y-5">
                  <Field label={t("Имя", "Name")} htmlFor="name" optionalLabel={t("Необязательно", "Optional")}>
                    <input
                      id="name"
                      name="name"
                      placeholder={t("Как к вам обращаться", "How should we address you?")}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label={t("Бренд / компания / продукт", "Brand / company / product")} htmlFor="company" optionalLabel={t("Необязательно", "Optional")}>
                    <input
                      id="company"
                      name="company"
                      placeholder={t("Название бренда, кампании или продукта", "Brand, campaign, or product name")}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="E-mail" htmlFor="email" optionalLabel={t("Необязательно", "Optional")}>
                    <input id="email" name="email" type="email" placeholder="you@example.com" className={inputClassName} />
                  </Field>
                  <Field label={t("Телефон / Telegram / контакт", "Phone / Telegram / contact")} htmlFor="phone" optionalLabel={t("Необязательно", "Optional")}>
                    <input
                      id="phone"
                      name="phone"
                      placeholder={t("+7 999 123-45-67 / @telegram", "+7 999 123-45-67 / @telegram")}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label={t("Тип проекта", "Project type")} htmlFor="projectType" optionalLabel={t("Необязательно", "Optional")}>
                    <select id="projectType" name="projectType" defaultValue="" className={inputClassName}>
                      <option value="">{t("Выберите, если хотите", "Select if relevant")}</option>
                      {projectTypes.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t("Бюджет или вилки", "Budget frame")} htmlFor="budget" optionalLabel={t("Необязательно", "Optional")}>
                    <select id="budget" name="budget" defaultValue="" className={inputClassName}>
                      <option value="">{t("Пока без ответа", "No answer yet")}</option>
                      {budgetOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t("Дата запуска / дедлайн", "Launch date / deadline")} htmlFor="targetDate" optionalLabel={t("Необязательно", "Optional")}>
                    <input id="targetDate" name="targetDate" type="date" className={inputClassName} />
                  </Field>
                  <Field label={t("Город / география / место съёмки", "City / geography / shoot location")} htmlFor="location" optionalLabel={t("Необязательно", "Optional")}>
                    <input
                      id="location"
                      name="location"
                      placeholder={t("Москва / несколько городов / travel shoot", "Moscow / multiple cities / travel shoot")}
                      className={inputClassName}
                    />
                  </Field>
                </div>
              </FormSection>

              <FormSection
                step="goals"
                badge="2/6"
                title={steps[1].title}
                description={steps[1].description}
              >
                <Field label={t("Краткое описание задачи", "Task background")} htmlFor="background" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="background"
                    name="background"
                    rows={6}
                    placeholder={t(
                      "Почему запускаете проект, какую бизнес-задачу он решает и что происходит вокруг запуска.",
                      "Why the project is launching, what business problem it solves, and what surrounds the launch.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <Field label={t("Бизнес-цели проекта", "Business goals")} htmlFor="businessGoals" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="businessGoals"
                    name="businessGoals"
                    rows={6}
                    placeholder={t(
                      "Каких измеримых результатов ждёте: продажи, заявки, регистрации, установки, выручка, охват.",
                      "What measurable result matters: sales, leads, registrations, installs, revenue, reach.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <Field label={t("Коммуникационные цели", "Communication goals")} htmlFor="communicationGoals" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="communicationGoals"
                    name="communicationGoals"
                    rows={6}
                    placeholder={t(
                      "Что аудитория должна понять, почувствовать или запомнить о продукте после просмотра.",
                      "What the audience should understand, feel, or remember after viewing.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
              </FormSection>

              <FormSection
                step="market"
                badge="3/6"
                title={steps[2].title}
                description={steps[2].description}
              >
                <Field label={t("Ситуация на рынке", "Market situation")} htmlFor="marketSituation" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="marketSituation"
                    name="marketSituation"
                    rows={6}
                    placeholder={t(
                      "Что делают конкуренты, как они себя позиционируют и в каком коммуникационном поле мы оказываемся.",
                      "What competitors are doing, how they position themselves, and what communication field already exists.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <Field label={t("Как хотим выделиться", "How we want to stand out")} htmlFor="differentiation" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="differentiation"
                    name="differentiation"
                    rows={5}
                    placeholder={t(
                      "В чём наше преимущество, отличие и почему зритель должен обратить внимание именно на нас.",
                      "What makes us more relevant, sharper, or more convincing than the alternatives.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <div className="space-y-5">
                  <Field label={t("Барьеры", "Barriers")} htmlFor="barriers" optionalLabel={t("Необязательно", "Optional")}>
                    <textarea
                      id="barriers"
                      name="barriers"
                      rows={6}
                      placeholder={t(
                        "Что мешает аудитории выбрать продукт: стереотипы, привычки, недоверие, цена, прошлый опыт.",
                        "What stops the audience from choosing the product: habits, stereotypes, distrust, price, prior experience.",
                      )}
                      className={textareaClassName}
                    />
                  </Field>
                  <Field label={t("Целевая аудитория", "Target audience")} htmlFor="audience" optionalLabel={t("Необязательно", "Optional")}>
                    <textarea
                      id="audience"
                      name="audience"
                      rows={6}
                      placeholder={t(
                        "Кто смотрит ролик, кто принимает решение и какие мотивации у этой аудитории.",
                        "Who the video is for, who decides, and what motivations this audience has.",
                      )}
                      className={textareaClassName}
                    />
                  </Field>
                </div>
                <Field label={t("Инсайт", "Insight")} htmlFor="insight" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="insight"
                    name="insight"
                    rows={6}
                    placeholder={t(
                      "Какая глубинная эмоция, привычка или потребность может стать опорой для креатива.",
                      "What emotional need, behavior, or tension could become the basis for the creative idea.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
              </FormSection>

              <FormSection
                step="message"
                badge="4/6"
                title={steps[3].title}
                description={steps[3].description}
              >
                <Field label={t("Главное сообщение", "Core message")} htmlFor="keyMessage" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="keyMessage"
                    name="keyMessage"
                    rows={6}
                    placeholder={t(
                      "Что именно аудитория должна унести после просмотра и какое действие или чувство мы хотим вызвать.",
                      "What should remain with the audience after viewing and what action or emotion should be triggered.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <Field label="Reason To Believe" htmlFor="reasonToBelieve" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="reasonToBelieve"
                    name="reasonToBelieve"
                    rows={6}
                    placeholder={t(
                      "Какие факты, свойства продукта или брендовые активы подтверждают сообщение.",
                      "Which concrete facts, product features, or brand assets support the message.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <Field label={t("Фирменный стиль / ToV / ограничения", "Brand style / ToV / restrictions")} htmlFor="brandStyle" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="brandStyle"
                    name="brandStyle"
                    rows={6}
                    placeholder={t(
                      "Брендбук, tone of voice, пожелания по дизайну, запреты, партнёрские ограничения, синопсисы.",
                      "Brand book, tone of voice, design wishes, no-go zones, partner restrictions, synopses.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <Field label={t("Референсы и полезные ссылки", "References and useful links")} htmlFor="references" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="references"
                    name="references"
                    rows={5}
                    placeholder={t(
                      "Ссылки на ролики, мудборды, конкурентов, брендбуки, макеты, deck, синопсисы.",
                      "Links to videos, moodboards, competitors, brand books, layouts, decks, and synopses.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
              </FormSection>

              <FormSection
                step="result"
                badge="5/6"
                title={steps[4].title}
                description={steps[4].description}
              >
                <Field label={t("Статус сценария", "Script status")} optionalLabel={t("Необязательно", "Optional")}>
                  <div className="space-y-3">
                    {scriptOptions.map((item) => (
                      <label
                        key={item.value}
                        className="flex cursor-pointer items-start gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 text-base text-white/72 transition hover:border-white/18 hover:bg-white/[0.05]"
                      >
                        <input
                          type="radio"
                          name="scriptStatus"
                          value={item.value}
                          className="mt-1 h-4 w-4 border-white/20 bg-white/5 accent-white/80"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label={t("Площадки и форматы", "Platforms and formats")} optionalLabel={t("Необязательно", "Optional")}>
                  <div className="grid gap-3 xl:grid-cols-2">
                    {deliverables.map((item) => (
                      <label
                        key={item.value}
                        className="flex cursor-pointer items-start gap-3 rounded-[24px] border border-white/10 bg-black/20 px-5 py-5 text-base text-white/70 transition hover:border-white/18 hover:bg-white/[0.04]"
                      >
                        <input
                          type="checkbox"
                          name="deliverables"
                          value={item.value}
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-white/80"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label={t("Какой результат нужен на этом этапе", "Expected result at this stage")} htmlFor="resultExpectation" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="resultExpectation"
                    name="resultExpectation"
                    rows={5}
                    placeholder={t(
                      "Что считается результатом: концепт, treatment, сценарий, смета, продакшн-план или финальный ролик.",
                      "What counts as the result: concept, treatment, script, estimate, production plan, or final video.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <div className="space-y-5">
                  <Field label={t("Хронометраж и количество версий", "Runtime and number of versions")} htmlFor="runtimeVersions" optionalLabel={t("Необязательно", "Optional")}>
                    <textarea
                      id="runtimeVersions"
                      name="runtimeVersions"
                      rows={6}
                      placeholder={t(
                        "Например: master 15 сек, cutdown 10 сек, вертикальная версия 9:16 и 3 адаптации.",
                        "Example: 15 sec master, 10 sec cutdown, 9:16 vertical, and 3 adaptations.",
                      )}
                      className={textareaClassName}
                    />
                  </Field>
                  <Field label={t("Технические требования", "Technical requirements")} htmlFor="technicalRequirements" optionalLabel={t("Необязательно", "Optional")}>
                    <textarea
                      id="technicalRequirements"
                      name="technicalRequirements"
                      rows={6}
                      placeholder={t(
                        "Safe zones, ограничения соцсетей, требования медиа-команды, текст, CTA, размещение интерфейсов.",
                        "Safe zones, platform limits, media specs, text, CTA, and interface overlays.",
                      )}
                      className={textareaClassName}
                    />
                  </Field>
                </div>
              </FormSection>

              <FormSection
                step="confirm"
                badge="6/6"
                title={steps[5].title}
                description={steps[5].description}
              >
                <div className="space-y-5">
                  <Field label={t("Что уже есть на руках", "What already exists")} htmlFor="assets" optionalLabel={t("Необязательно", "Optional")}>
                    <textarea
                      id="assets"
                      name="assets"
                      rows={6}
                      placeholder={t(
                        "Брендбук, упаковка, персонажи, исходники, локации, музыка, графика, продуктовые материалы.",
                        "Brand book, packaging, characters, footage, locations, music, graphics, product materials.",
                      )}
                      className={textareaClassName}
                    />
                  </Field>
                  <Field label={t("Кто согласует проект", "Who approves the project")} htmlFor="approvals" optionalLabel={t("Необязательно", "Optional")}>
                    <textarea
                      id="approvals"
                      name="approvals"
                      rows={6}
                      placeholder={t(
                        "Кто принимает финальное решение, сколько будет участников и сколько раундов правок ожидается.",
                        "Who makes the final call, how many reviewers exist, and how many rounds of edits are expected.",
                      )}
                      className={textareaClassName}
                    />
                  </Field>
                </div>
                <Field label={t("Что ещё важно рассказать", "Anything else worth knowing")} htmlFor="message" optionalLabel={t("Необязательно", "Optional")}>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    placeholder={t(
                      "Любые детали, которые не влезли в остальные блоки, но могут повлиять на сценарий и продакшн.",
                      "Anything not covered above that could materially affect strategy, script, or production.",
                    )}
                    className={textareaClassName}
                  />
                </Field>
                <label className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-black/20 px-5 py-5 text-sm text-white/66">
                  <input
                    type="checkbox"
                    name="agree"
                    value="yes"
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-white/80"
                  />
                  <span>
                    {t("Отправляя бриф, вы соглашаетесь с ", "By sending the brief, you agree with the ")}
                    <Link href={privacyHref} className="underline decoration-white/30 underline-offset-4">
                      {t("политикой конфиденциальности", "privacy policy")}
                    </Link>
                    .
                  </span>
                </label>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-2xl text-sm leading-6 text-white/48">
                    {t(
                      "Можно отправить даже частично заполненный бриф. Чем подробнее вводные, тем быстрее получится перейти к сценарию и смете.",
                      "You can submit a partially filled brief. Stronger input helps us move faster toward treatment and budget logic.",
                    )}
                  </p>
                  <button type="submit" className="btn-primary h-12 rounded-full px-6">
                    {t("Отправить бриф", "Send brief")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </FormSection>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

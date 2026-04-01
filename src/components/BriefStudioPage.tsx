"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

type Locale = "ru" | "en";
type Step = "project" | "audience" | "creative" | "production" | "contact";

const inputClassName =
  "h-[4.5rem] w-full rounded-[26px] border border-white/10 bg-black/30 px-6 text-[1.05rem] text-white outline-none transition placeholder:text-white/28 focus:border-brand focus:ring-2 focus:ring-brand/30";

const textareaClassName =
  "min-h-[220px] w-full rounded-[30px] border border-white/10 bg-black/30 px-6 py-5 text-[1.05rem] text-white outline-none transition placeholder:text-white/28 focus:border-brand focus:ring-2 focus:ring-brand/30";

function StatusBanner({
  locale,
  status,
  reason,
}: {
  locale: Locale;
  status?: string;
  reason?: string;
}) {
  if (status !== "success" && status !== "error") return null;

  const isRu = locale === "ru";
  const successText = isRu
    ? "Бриф отправлен. Вернёмся с ответом в рабочее время."
    : "The brief has been sent. We will respond during business hours.";

  const errorText =
    reason === "contact"
      ? isRu
        ? "Оставьте хотя бы один канал связи: e-mail или телефон / Telegram."
        : "Leave at least one contact channel: e-mail or phone / Telegram."
      : reason === "consent"
        ? isRu
          ? "Чтобы отправить бриф, нужно согласиться с политикой конфиденциальности."
          : "To send the brief, you need to accept the privacy policy."
        : reason === "spam"
          ? isRu
            ? "Форма отклонена как подозрительная. Попробуйте ещё раз."
            : "The form was rejected as suspicious. Please try again."
          : reason === "rate-limit"
            ? isRu
              ? "Слишком много попыток за короткое время. Попробуйте чуть позже."
              : "Too many attempts in a short time. Please try again later."
            : isRu
              ? "Не удалось отправить бриф. Проверьте поля и попробуйте ещё раз."
              : "The brief could not be sent. Please review the fields and try again.";

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
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="brief-field rounded-[30px] border border-white/10 bg-black/20 px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.14)] md:px-7 md:py-7">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={htmlFor} className="text-[1.08rem] font-medium text-white/88">
          {label}
        </label>
        <span className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">{hint}</span>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Section({
  step,
  badge,
  title,
  description,
  children,
}: {
  step: Step;
  badge: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={`brief-${step}`} className="brief-section-panel relative rounded-[34px] border border-white/12 bg-white/[0.04] p-6 md:p-8">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-brand px-3 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_0_0_6px_rgba(124,58,237,0.12)]">
              {badge}
            </span>
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/34">{step}</p>
              <h2 className="mt-2 text-[1.35rem] font-medium leading-tight text-white md:text-[1.55rem]">
                {title}
              </h2>
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

export function BriefStudioPage({
  locale,
  status,
  reason,
}: {
  locale: Locale;
  status?: string;
  reason?: string;
}) {
  const isRu = locale === "ru";
  const t = (ru: string, en: string) => (isRu ? ru : en);
  const privacyHref = isRu ? "/privacy" : "/en/privacy";
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const steps = [
    { key: "project" as const, title: t("Что нужно сделать", "What needs to be built"), description: t("Тип проекта, задача, сроки и базовая рамка.", "Project type, task, timing, and the basic frame.") },
    { key: "audience" as const, title: t("Для кого и зачем", "Audience and goals"), description: t("Только практический контекст: аудитория, рынок и цель.", "Only practical context: audience, market, and goal.") },
    { key: "creative" as const, title: t("Сообщение и стиль", "Message and style"), description: t("Ключевая мысль, визуальный характер и референсы.", "Core message, visual direction, and references.") },
    { key: "production" as const, title: t("Формат и продакшн", "Deliverables and production"), description: t("Что должно выйти и какие вводные уже есть.", "What has to be delivered and which inputs already exist.") },
    { key: "contact" as const, title: t("Контакты", "Contacts"), description: t("Оставьте один рабочий канал связи в самом конце.", "Leave one working contact channel at the end.") },
  ];

  const projectTypes = [
    ["commercial", t("Коммерческое видео", "Commercial video")],
    ["campaign", t("Кампания / digital launch", "Campaign / digital launch")],
    ["brand-film", t("Бренд-фильм", "Brand film")],
    ["product", t("Продуктовый ролик", "Product video")],
    ["event", t("Event / имиджевый ролик", "Event / image film")],
    ["ai", "AI / CGI / mixed media"],
  ];

  const budgetOptions = [
    ["unknown", t("Пока без бюджета", "No budget yet")],
    ["under-300k", t("До 300 тыс. ₽", "Up to 300K RUB")],
    ["300-700k", t("300-700 тыс. ₽", "300K-700K RUB")],
    ["700k-1.5m", t("700 тыс. - 1.5 млн ₽", "700K-1.5M RUB")],
    ["1.5m-plus", t("1.5 млн ₽ и выше", "1.5M RUB and above")],
  ];

  const scriptOptions = [
    ["ready", t("Сценарий уже есть", "Script is ready")],
    ["draft", t("Есть набросок / treatment", "Draft or treatment exists")],
    ["need-development", t("Нужна разработка с нуля", "Needs development from scratch")],
  ];

  const deliverables = [
    ["social", t("Соцсети", "Social media")],
    ["youtube", "YouTube / online"],
    ["tv", "TV / OLV"],
    ["event", t("Event / экран", "Event / screen")],
    ["site", t("Сайт / лендинг", "Website / landing")],
    ["internal", t("Внутренние коммуникации", "Internal communications")],
  ];

  return (
    <main className="page-shell brief-page-shell">
      <div className="brief-page-ambient" />
      <section className="page-content brief-page-section w-full pb-20 pt-header-safe md:pb-24 md:pt-[calc(var(--header-h)+env(safe-area-inset-top)+3rem)]">
        <div className="brief-page-frame mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden px-6 py-7 md:px-8 md:py-8 xl:px-10 xl:py-10">
          <div className="max-w-5xl">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand" />
              {t("Бриф", "Brief")}
            </p>
            <h1 className="brief-title font-display heading-balance mt-4 max-w-5xl text-[clamp(2.65rem,5.3vw,5rem)] leading-[0.96] tracking-[-0.05em] text-white">
              {t("Бриф на создание видеоролика", "Video production brief")}
            </h1>
            <p className="brief-lead mt-6 max-w-4xl text-lg leading-8 text-white/68 md:text-[1.18rem]">
              {t(
                "Сократили форму: сначала задача и продакшн-рамка, а контакты уже в финале.",
                "The form is shorter now: task and production frame first, contact details last.",
              )}
            </p>
            <p className="brief-top-note mt-5 max-w-3xl rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/64">
              {t(
                "Заполняйте только то, что уже известно. Пустые поля не мешают отправке.",
                "Fill only what is already known. Empty fields will not block the submission.",
              )}
            </p>
            <div className="mt-7 max-w-3xl">
              <StatusBanner locale={locale} status={status} reason={reason} />
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="brief-steps-grid grid gap-2.5 md:grid-cols-3 xl:grid-cols-5">
              {steps.map((step, index) => (
                <a
                  key={step.key}
                  href={`#brief-${step.key}`}
                  className="brief-step-link rounded-[20px] border border-white/8 bg-white/[0.02] px-3.5 py-3 text-left transition hover:border-white/14 hover:bg-white/[0.03]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.68rem] uppercase tracking-[0.2em] text-white/30">{index + 1}/5</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.18em] text-white/34">{t("Открыть", "Open")}</span>
                  </div>
                  <p className="mt-2.5 text-[0.92rem] font-medium leading-6 text-white/68">{step.title}</p>
                </a>
              ))}
            </div>

            <form id="contact-form" action="/api/contact" method="POST" className="brief-form mx-auto mt-8 w-full max-w-[980px] space-y-10">
              <input type="hidden" name="locale" value={locale} />
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <Section step="project" badge="1/5" title={steps[0].title} description={steps[0].description}>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Бренд / компания / продукт", "Brand / company / product")} htmlFor="company" hint={t("Необязательно", "Optional")}>
                    <input id="company" name="company" placeholder={t("Название бренда или продукта", "Brand or product name")} className={inputClassName} />
                  </Field>
                  <Field label={t("Тип проекта", "Project type")} htmlFor="projectType" hint={t("Необязательно", "Optional")}>
                    <select id="projectType" name="projectType" defaultValue="" className={inputClassName}>
                      <option value="">{t("Выберите, если уже понятно", "Select if already clear")}</option>
                      {projectTypes.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label={t("Что за задача", "What is the task")} htmlFor="background" hint={t("Желательно", "Recommended")}>
                  <textarea id="background" name="background" rows={6} placeholder={t("Что нужно снять, для какого запуска и почему проект появился сейчас.", "What needs to be produced, for which launch, and why the project exists now.")} className={textareaClassName} />
                </Field>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Бизнес-цель", "Business goal")} htmlFor="businessGoals" hint={t("Необязательно", "Optional")}>
                    <textarea id="businessGoals" name="businessGoals" rows={5} placeholder={t("Продажи, знание, запуск, найм или другая конкретная цель.", "Sales, awareness, launch, hiring, or another concrete goal.")} className={textareaClassName} />
                  </Field>
                  <Field label={t("Бюджетная рамка", "Budget frame")} htmlFor="budget" hint={t("Необязательно", "Optional")}>
                    <select id="budget" name="budget" defaultValue="" className={inputClassName}>
                      <option value="">{t("Пока без ответа", "No answer yet")}</option>
                      {budgetOptions.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Дата запуска / дедлайн", "Launch date / deadline")} htmlFor="targetDate" hint={t("Необязательно", "Optional")}>
                    <input id="targetDate" name="targetDate" type="date" className={inputClassName} />
                  </Field>
                  <Field label={t("География / место съёмки", "Geography / shoot location")} htmlFor="location" hint={t("Необязательно", "Optional")}>
                    <input id="location" name="location" placeholder={t("Москва / несколько городов / travel shoot", "Moscow / multiple cities / travel shoot")} className={inputClassName} />
                  </Field>
                </div>
              </Section>

              <Section step="audience" badge="2/5" title={steps[1].title} description={steps[1].description}>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Для кого это видео", "Who this video is for")} htmlFor="audience" hint={t("Желательно", "Recommended")}>
                    <textarea id="audience" name="audience" rows={6} placeholder={t("Кто смотрит ролик, кто решает и что важно для этой аудитории.", "Who watches the video, who decides, and what matters to this audience.")} className={textareaClassName} />
                  </Field>
                  <Field label={t("Коммуникационная цель", "Communication goal")} htmlFor="communicationGoals" hint={t("Необязательно", "Optional")}>
                    <textarea id="communicationGoals" name="communicationGoals" rows={6} placeholder={t("Какое действие, ощущение или сдвиг в восприятии должен дать ролик.", "What action, feeling, or perception shift the video should create.")} className={textareaClassName} />
                  </Field>
                </div>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Рынок / конкуренты", "Market / competitors")} htmlFor="marketSituation" hint={t("Необязательно", "Optional")}>
                    <textarea id="marketSituation" name="marketSituation" rows={6} placeholder={t("Кто уже говорит в категории и на каком поле мы оказываемся.", "Who already speaks in this category and what field we are entering.")} className={textareaClassName} />
                  </Field>
                  <Field label={t("Как хотим отличаться", "How we want to stand out")} htmlFor="differentiation" hint={t("Необязательно", "Optional")}>
                    <textarea id="differentiation" name="differentiation" rows={6} placeholder={t("Что должно выделить проект: тон, аргумент, визуальный код или темп.", "What should differentiate the project: tone, argument, visual code, or pace.")} className={textareaClassName} />
                  </Field>
                </div>
              </Section>

              <Section step="creative" badge="3/5" title={steps[2].title} description={steps[2].description}>
                <Field label={t("Главное сообщение", "Core message")} htmlFor="keyMessage" hint={t("Желательно", "Recommended")}>
                  <textarea id="keyMessage" name="keyMessage" rows={6} placeholder={t("Что зритель должен унести после просмотра.", "What the audience should carry away after watching.")} className={textareaClassName} />
                </Field>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Стиль / ограничения", "Style / restrictions")} htmlFor="brandStyle" hint={t("Необязательно", "Optional")}>
                    <textarea id="brandStyle" name="brandStyle" rows={6} placeholder={t("Брендбук, визуальные пожелания, no-go зоны и ограничения.", "Brand book, visual wishes, no-go zones, and restrictions.")} className={textareaClassName} />
                  </Field>
                  <Field label={t("Референсы и ссылки", "References and links")} htmlFor="references" hint={t("Необязательно", "Optional")}>
                    <textarea id="references" name="references" rows={6} placeholder={t("Ролики, moodboards, deck, сценарии или любые полезные материалы.", "Videos, moodboards, decks, scripts, or any useful materials.")} className={textareaClassName} />
                  </Field>
                </div>
              </Section>

              <Section step="production" badge="4/5" title={steps[3].title} description={steps[3].description}>
                <Field label={t("Статус сценария", "Script status")} hint={t("Необязательно", "Optional")}>
                  <div className="space-y-3">
                    {scriptOptions.map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-start gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 text-base text-white/72 transition hover:border-white/18 hover:bg-white/[0.05]">
                        <input type="radio" name="scriptStatus" value={value} className="mt-1 h-4 w-4 border-white/20 bg-white/5 accent-white/80" />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label={t("Площадки и форматы", "Platforms and formats")} hint={t("Необязательно", "Optional")}>
                  <div className="grid gap-3 xl:grid-cols-2">
                    {deliverables.map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-start gap-3 rounded-[24px] border border-white/10 bg-black/20 px-5 py-5 text-base text-white/70 transition hover:border-white/18 hover:bg-white/[0.04]">
                        <input type="checkbox" name="deliverables" value={value} className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-white/80" />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </Field>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Нужный результат", "Expected output")} htmlFor="resultExpectation" hint={t("Необязательно", "Optional")}>
                    <textarea id="resultExpectation" name="resultExpectation" rows={6} placeholder={t("Например: treatment, смета, мастер-ролик или комплект версий.", "For example: treatment, estimate, master video, or a package of versions.")} className={textareaClassName} />
                  </Field>
                  <Field label={t("Хронометраж и версии", "Runtime and versions")} htmlFor="runtimeVersions" hint={t("Необязательно", "Optional")}>
                    <textarea id="runtimeVersions" name="runtimeVersions" rows={6} placeholder={t("Например: 15 сек master, 10 сек cutdown, вертикаль 9:16.", "For example: 15 sec master, 10 sec cutdown, 9:16 vertical.")} className={textareaClassName} />
                  </Field>
                </div>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Технические требования", "Technical requirements")} htmlFor="technicalRequirements" hint={t("Необязательно", "Optional")}>
                    <textarea id="technicalRequirements" name="technicalRequirements" rows={6} placeholder={t("Safe zones, legal, CTA, титры, ограничения площадок.", "Safe zones, legal, CTA, captions, and platform limits.")} className={textareaClassName} />
                  </Field>
                  <Field label={t("Что уже есть на руках", "What already exists")} htmlFor="assets" hint={t("Необязательно", "Optional")}>
                    <textarea id="assets" name="assets" rows={6} placeholder={t("Исходники, брендбук, продукт, музыка, сценарий или другие материалы.", "Footage, brand book, product assets, music, script, or other materials.")} className={textareaClassName} />
                  </Field>
                </div>
              </Section>

              <Section step="contact" badge="5/5" title={steps[4].title} description={steps[4].description}>
                <p id="contact-note" className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-6 text-white/58">
                  {t("Достаточно e-mail или телефона / Telegram. Имя и комментарий можно добавить по желанию.", "Either an e-mail or a phone / Telegram contact is enough. Name and note are optional.")}
                </p>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Имя", "Name")} htmlFor="name" hint={t("Необязательно", "Optional")}>
                    <input id="name" name="name" placeholder={t("Как к вам обращаться", "How should we address you?")} className={inputClassName} />
                  </Field>
                  <Field label="E-mail" htmlFor="email" hint={t("Одно из двух", "One of two")}>
                    <input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required={phone.trim().length === 0} aria-describedby="contact-note" placeholder="you@example.com" className={inputClassName} />
                  </Field>
                </div>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Field label={t("Телефон / Telegram", "Phone / Telegram")} htmlFor="phone" hint={t("Одно из двух", "One of two")}>
                    <input id="phone" name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} required={email.trim().length === 0} aria-describedby="contact-note" placeholder={t("+7 999 123-45-67 / @telegram", "+7 999 123-45-67 / @telegram")} className={inputClassName} />
                  </Field>
                  <Field label={t("Комментарий", "Extra note")} htmlFor="message" hint={t("Необязательно", "Optional")}>
                    <textarea id="message" name="message" rows={5} placeholder={t("Если важно, добавьте детали по ответу, NDA или созвону.", "If useful, add details about reply format, NDA, or a call.")} className={textareaClassName} />
                  </Field>
                </div>
                <label className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-black/20 px-5 py-5 text-sm text-white/66">
                  <input type="checkbox" name="agree" value="yes" required className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-white/80" />
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
                    {t("Можно отправить и частично заполненный бриф. Главное, чтобы было понятно, как с вами связаться.", "A partially filled brief is fine. The main thing is that we know how to reach you back.")}
                  </p>
                  <button type="submit" className="btn-primary h-12 rounded-full px-6">
                    {t("Отправить бриф", "Send brief")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Section>
            </form>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}

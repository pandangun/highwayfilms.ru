"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import Field from "@/components/Field";
import FormStatus from "@/components/FormStatus";
import PageHead from "@/components/PageHead";

type Locale = "ru" | "en";
type StepKey = "project" | "audience" | "creative" | "production" | "contact";

function Section({
  index,
  stepKey,
  title,
  description,
  children,
}: {
  index: number;
  stepKey: StepKey;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={`brief-${stepKey}`} className="brief-section">
      <div className="brief-section__head">
        <span className="step__num">{index}</span>
        <div>
          <h2 className="display display--h3">{title}</h2>
          <p className="mt-3 text-silver">{description}</p>
        </div>
      </div>
      <div className="brief-section__body">{children}</div>
    </section>
  );
}

/**
 * Бриф. Поля и их имена не менялись: /api/contact ждёт именно их и
 * пересылает всё, что заполнено. Обязателен только один канал связи
 * и согласие на обработку данных.
 */
export function BriefStudioPage({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";
  const t = (ru: string, en: string) => (isRu ? ru : en);
  const privacyHref = isRu ? "/privacy" : "/en/privacy";
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const optional = t("необязательно", "optional");
  const recommended = t("желательно", "recommended");
  const oneOf = t("одно из двух", "one of two");

  const steps: { key: StepKey; title: string; description: string }[] = [
    {
      key: "project",
      title: t("Что нужно снять", "What needs filming"),
      description: t("Тип проекта, задача, сроки и бюджет, если он уже есть.", "Project type, task, timing and budget if you have one."),
    },
    {
      key: "audience",
      title: t("Для кого и зачем", "Audience and goal"),
      description: t("Кто будет смотреть и что должно измениться после просмотра.", "Who will watch and what should change after they do."),
    },
    {
      key: "creative",
      title: t("Сообщение и стиль", "Message and style"),
      description: t("Главная мысль, ограничения бренда и примеры, которые нравятся.", "The main message, brand limits and examples you like."),
    },
    {
      key: "production",
      title: t("Формат и выдача", "Format and delivery"),
      description: t("Какие версии нужны на выходе и что уже есть на руках.", "Which versions you need and what you already have."),
    },
    {
      key: "contact",
      title: t("Контакты", "Contacts"),
      description: t("Достаточно одного канала связи: почты, телефона или Telegram.", "One channel is enough: email, phone or Telegram."),
    },
  ];

  const projectTypes = [
    ["commercial", t("Рекламный ролик", "Commercial")],
    ["product", t("Продуктовый ролик", "Product video")],
    ["campaign", t("Серия для рекламной кампании", "Campaign series")],
    ["brand-film", t("Имиджевый или бренд-фильм", "Brand film")],
    ["corporate", t("Фильм о компании", "Company film")],
    ["event", t("Мероприятие", "Event")],
    ["music", t("Музыкальный клип", "Music video")],
    ["ai", t("AI-ролик или графика", "AI film or graphics")],
  ];

  const budgetOptions = [
    ["unknown", t("Пока не знаю", "Not sure yet")],
    ["under-300k", t("До 300 000 ₽", "Up to RUB 300,000")],
    ["300-700k", t("300 000 – 700 000 ₽", "RUB 300,000–700,000")],
    ["700k-1.5m", t("700 000 – 1,5 млн ₽", "RUB 700,000–1.5M")],
    ["1.5m-plus", t("Больше 1,5 млн ₽", "Over RUB 1.5M")],
  ];

  const scriptOptions = [
    ["ready", t("Сценарий готов", "The script is ready")],
    ["draft", t("Есть набросок или идея", "There is a draft or an idea")],
    ["need-development", t("Нужно придумать с нуля", "Needs to be developed from scratch")],
  ];

  const deliverables = [
    ["social", t("Соцсети", "Social media")],
    ["youtube", t("YouTube и онлайн", "YouTube and online")],
    ["tv", t("ТВ и онлайн-видео", "TV and OLV")],
    ["event", t("Экран на мероприятии", "Event screen")],
    ["site", t("Сайт или лендинг", "Website or landing page")],
    ["internal", t("Внутренние коммуникации", "Internal communications")],
  ];

  return (
    <>
      <PageHead
        title={t("Бриф", "Brief")}
        lead={t(
          "Десять минут на ответы — и в течение рабочего дня мы присылаем смету и срок. Заполняйте только то, что уже известно: пустые поля отправке не мешают.",
          "Ten minutes of answers, and within one working day we send an estimate and a date. Fill in only what you already know: empty fields won't block sending.",
        )}
      >
        <ol className="brief-index" aria-label={t("Разделы брифа", "Brief sections")}>
          {steps.map((step, index) => (
            <li key={step.key}>
              <a href={`#brief-${step.key}`}>
                <span className="num text-brass">{index + 1}</span>
                <span>{step.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </PageHead>

      <div className="wrap pb-[var(--band)]">
        <form id="contact-form" action="/api/contact" method="POST" className="brief-form">
          <input type="hidden" name="locale" value={locale} />
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <Suspense fallback={null}>
            <FormStatus locale={locale} kind="brief" />
          </Suspense>

          <Section index={1} stepKey="project" title={steps[0].title} description={steps[0].description}>
            <div className="form-grid">
              <Field label={t("Бренд, компания или продукт", "Brand, company or product")} htmlFor="company" hint={optional}>
                <input id="company" name="company" className="input" placeholder={t("Название", "Name")} />
              </Field>
              <Field label={t("Тип проекта", "Project type")} htmlFor="projectType" hint={optional}>
                <select id="projectType" name="projectType" defaultValue="" className="input">
                  <option value="">{t("Выберите, если уже понятно", "Choose if already clear")}</option>
                  {projectTypes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("Задача", "The task")} htmlFor="background" hint={recommended} wide>
                <textarea
                  id="background"
                  name="background"
                  rows={5}
                  className="input"
                  placeholder={t(
                    "Что нужно снять, для какого запуска и почему именно сейчас",
                    "What needs filming, for which launch and why now",
                  )}
                />
              </Field>
              <Field label={t("Цель для бизнеса", "Business goal")} htmlFor="businessGoals" hint={optional}>
                <textarea
                  id="businessGoals"
                  name="businessGoals"
                  rows={4}
                  className="input"
                  placeholder={t("Продажи, узнаваемость, запуск, найм", "Sales, awareness, launch, hiring")}
                />
              </Field>
              <Field label={t("Бюджет", "Budget")} htmlFor="budget" hint={optional}>
                <select id="budget" name="budget" defaultValue="" className="input">
                  <option value="">{t("Пока без ответа", "No answer yet")}</option>
                  {budgetOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("Дата запуска или дедлайн", "Launch date or deadline")} htmlFor="targetDate" hint={optional}>
                <input id="targetDate" name="targetDate" type="date" className="input" />
              </Field>
              <Field label={t("Где снимать", "Where to shoot")} htmlFor="location" hint={optional}>
                <input
                  id="location"
                  name="location"
                  className="input"
                  placeholder={t("Петербург, Москва, несколько городов", "Saint Petersburg, Moscow, several cities")}
                />
              </Field>
            </div>
          </Section>

          <Section index={2} stepKey="audience" title={steps[1].title} description={steps[1].description}>
            <div className="form-grid">
              <Field label={t("Для кого это видео", "Who the video is for")} htmlFor="audience" hint={recommended}>
                <textarea
                  id="audience"
                  name="audience"
                  rows={5}
                  className="input"
                  placeholder={t("Кто смотрит, кто принимает решение, что для них важно", "Who watches, who decides, what matters to them")}
                />
              </Field>
              <Field label={t("Что должно измениться", "What should change")} htmlFor="communicationGoals" hint={optional}>
                <textarea
                  id="communicationGoals"
                  name="communicationGoals"
                  rows={5}
                  className="input"
                  placeholder={t("Какое действие или мнение должен вызвать ролик", "Which action or opinion the video should lead to")}
                />
              </Field>
              <Field label={t("Конкуренты", "Competitors")} htmlFor="marketSituation" hint={optional}>
                <textarea
                  id="marketSituation"
                  name="marketSituation"
                  rows={5}
                  className="input"
                  placeholder={t("Кто уже говорит с этой аудиторией и как", "Who already talks to this audience and how")}
                />
              </Field>
              <Field label={t("Чем хотите отличаться", "How you want to stand out")} htmlFor="differentiation" hint={optional}>
                <textarea
                  id="differentiation"
                  name="differentiation"
                  rows={5}
                  className="input"
                  placeholder={t("Тон, аргумент, картинка или темп", "Tone, argument, look or pace")}
                />
              </Field>
            </div>
          </Section>

          <Section index={3} stepKey="creative" title={steps[2].title} description={steps[2].description}>
            <div className="form-grid">
              <Field label={t("Главная мысль", "The main message")} htmlFor="keyMessage" hint={recommended} wide>
                <textarea
                  id="keyMessage"
                  name="keyMessage"
                  rows={4}
                  className="input"
                  placeholder={t("Что зритель должен запомнить после просмотра", "What the viewer should remember afterwards")}
                />
              </Field>
              <Field label={t("Стиль и ограничения", "Style and limits")} htmlFor="brandStyle" hint={optional}>
                <textarea
                  id="brandStyle"
                  name="brandStyle"
                  rows={5}
                  className="input"
                  placeholder={t("Брендбук, цвета, что нельзя показывать", "Brand book, colours, what must not be shown")}
                />
              </Field>
              <Field label={t("Примеры и ссылки", "Examples and links")} htmlFor="references" hint={optional}>
                <textarea
                  id="references"
                  name="references"
                  rows={5}
                  className="input"
                  placeholder={t("Ролики, которые нравятся, презентации, сценарии", "Videos you like, decks, scripts")}
                />
              </Field>
            </div>
          </Section>

          <Section index={4} stepKey="production" title={steps[3].title} description={steps[3].description}>
            <div className="grid gap-10">
              <Field label={t("Сценарий", "Script")} hint={optional}>
                <div className="choices choices--3 mt-2">
                  {scriptOptions.map(([value, label]) => (
                    <label key={value} className="choice">
                      <input type="radio" name="scriptStatus" value={value} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label={t("Где будет показ", "Where it will run")} hint={optional}>
                <div className="choices choices--3 mt-2">
                  {deliverables.map(([value, label]) => (
                    <label key={value} className="choice">
                      <input type="checkbox" name="deliverables" value={value} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <div className="form-grid">
                <Field label={t("Что нужно на выходе", "What you need delivered")} htmlFor="resultExpectation" hint={optional}>
                  <textarea
                    id="resultExpectation"
                    name="resultExpectation"
                    rows={4}
                    className="input"
                    placeholder={t("Один ролик, серия, версии под площадки", "One video, a series, platform versions")}
                  />
                </Field>
                <Field label={t("Хронометраж и версии", "Length and versions")} htmlFor="runtimeVersions" hint={optional}>
                  <textarea
                    id="runtimeVersions"
                    name="runtimeVersions"
                    rows={4}
                    className="input"
                    placeholder={t("Например: 30 секунд, плюс 15 и вертикаль 9:16", "For example: 30 seconds, plus 15 and a 9:16 vertical")}
                  />
                </Field>
                <Field label={t("Технические требования", "Technical requirements")} htmlFor="technicalRequirements" hint={optional}>
                  <textarea
                    id="technicalRequirements"
                    name="technicalRequirements"
                    rows={4}
                    className="input"
                    placeholder={t("Требования площадок, субтитры, юридические титры", "Platform specs, subtitles, legal copy")}
                  />
                </Field>
                <Field label={t("Что уже есть", "What you already have")} htmlFor="assets" hint={optional}>
                  <textarea
                    id="assets"
                    name="assets"
                    rows={4}
                    className="input"
                    placeholder={t("Исходники, брендбук, музыка, образцы продукта", "Footage, brand book, music, product samples")}
                  />
                </Field>
              </div>
            </div>
          </Section>

          <Section index={5} stepKey="contact" title={steps[4].title} description={steps[4].description}>
            <div className="form-grid">
              <Field label={t("Имя", "Name")} htmlFor="name" hint={optional}>
                <input id="name" name="name" autoComplete="name" className="input" placeholder={t("Как к вам обращаться", "Your name")} />
              </Field>
              <Field label={t("Почта", "Email")} htmlFor="email" hint={oneOf}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required={phone.trim().length === 0}
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label={t("Телефон или Telegram", "Phone or Telegram")} htmlFor="phone" hint={oneOf}>
                <input
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required={email.trim().length === 0}
                  className="input"
                  placeholder={t("+7 999 123-45-67 или @username", "+7 999 123-45-67 or @username")}
                />
              </Field>
              <Field label={t("Комментарий", "Note")} htmlFor="message" hint={optional}>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="input"
                  placeholder={t("Удобное время для звонка, NDA", "A good time to call, NDA")}
                />
              </Field>
            </div>

            <div className="form-foot mt-12">
              <label className="consent">
                <input type="checkbox" name="agree" value="yes" required />
                <span>
                  {t("Даю согласие на обработку данных по ", "I agree to data processing under the ")}
                  <Link href={privacyHref}>{t("политике конфиденциальности", "privacy policy")}</Link>
                </span>
              </label>
              <button type="submit" className="btn btn--garnet">
                {t("Отправить бриф", "Send the brief")}
              </button>
            </div>
          </Section>
        </form>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Suspense, type InputHTMLAttributes } from "react";
import FormStatusBanner from "@/components/FormStatusBanner";
import { weddingEditorialImages } from "@/data/weddings";

function WeddingBriefStatusBanner() {
  return (
    <Suspense fallback={null}>
      <FormStatusBanner
        className="wedding-brief-status"
        successClassName="wedding-brief-status--success"
        errorClassName="wedding-brief-status--error"
        copy={{
          success: "Бриф отправлен. Вернёмся с ответом.",
          contact: "Оставьте контакт для связи.",
          rateLimit: "Слишком много попыток. Попробуйте позже.",
          generic: "Не удалось отправить бриф. Попробуйте ещё раз.",
        }}
      />
    </Suspense>
  );
}

type WeddingFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  rows?: number;
  options?: string[];
  type?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
};

function WeddingField({
  label,
  name,
  required = false,
  placeholder,
  as = "input",
  rows = 5,
  options,
  type = "text",
  autoComplete,
  inputMode,
}: WeddingFieldProps) {
  return (
    <label className="wedding-brief-field">
      <span className="wedding-brief-field__label">{label}</span>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className="field-shell wedding-brief-textarea"
        />
      ) : as === "select" ? (
        <select name={name} defaultValue="" className="field-shell" required={required}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className="field-shell"
        />
      )}
    </label>
  );
}

export default function WeddingBriefContact() {
  return (
    <section
      id="wedding-brief"
      className="wedding-section wedding-section--brief scroll-mt-32 md:scroll-mt-40"
    >
      <div className="container">
        <div className="wedding-brief-shell">
          <div className="wedding-brief-background" aria-hidden="true">
            <Image
              src={weddingEditorialImages.cityPortrait.src}
              alt=""
              fill
              sizes="100vw"
              className="wedding-brief-background__image"
              style={{ objectPosition: weddingEditorialImages.cityPortrait.objectPosition }}
            />
            <div className="wedding-brief-background__veil" />
          </div>

          <div className="wedding-brief-content">
            <div className="wedding-brief-head reveal-up">
              <h2 className="wedding-section-title font-display">Свадебный бриф</h2>
            </div>

            <div className="wedding-brief-layout">
              <div className="wedding-brief-rail" aria-hidden="true" />

              <div className="wedding-brief-form-wrap reveal-up delay-1">
                <WeddingBriefStatusBanner />

                <form action="/api/contact" method="POST" className="wedding-brief-form-panel">
                  <input type="hidden" name="locale" value="ru" />
                  <input type="hidden" name="source" value="weddings" />
                  <input type="hidden" name="agree" value="yes" />

                  <div className="visually-hidden" aria-hidden="true">
                    <label htmlFor="wedding-website">Website</label>
                    <input
                      id="wedding-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="wedding-brief-stack">
                    <WeddingField
                      label="Дата свадьбы"
                      name="weddingDate"
                      placeholder="14 августа 2026"
                    />
                    <WeddingField
                      label="Город / площадка"
                      name="city"
                      placeholder="Москва, особняк / загородный отель"
                    />
                    <WeddingField
                      label="Формат"
                      name="weddingFormat"
                      as="select"
                      placeholder="Выберите формат"
                      options={[
                        "Камерная свадьба",
                        "Полный свадебный день",
                        "Большой банкетный формат",
                        "Нужно помочь выбрать",
                      ]}
                    />
                    <WeddingField
                      label="Масштаб дня"
                      name="guests"
                      placeholder="Камерно / 40 гостей / большой банкет"
                    />
                    <WeddingField
                      label="Что важно сохранить в фильме"
                      name="message"
                      required
                      as="textarea"
                      rows={5}
                      placeholder="Ритм дня, атмосфера, близкие, церемония, вечер, музыка."
                    />
                    <WeddingField
                      label="Телефон / Telegram"
                      name="phone"
                      required
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+7 999 123-45-67 / @telegram"
                    />
                    <WeddingField
                      label="Имя"
                      name="name"
                      autoComplete="name"
                      placeholder="Как к вам обращаться"
                    />
                    <WeddingField
                      label="E-mail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="wedding-brief-actions">
                    <button
                      type="submit"
                      className="wedding-action wedding-action--primary wedding-brief-submit"
                    >
                      Отправить бриф
                    </button>

                    <div className="wedding-brief-meta">
                      <a
                        href="https://t.me/highwayfilms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wedding-brief-meta__link"
                      >
                        Telegram
                      </a>
                      <span className="wedding-brief-meta__sep" aria-hidden="true" />
                      <Link href="/privacy" className="wedding-brief-meta__link">
                        Политика конфиденциальности
                      </Link>
                    </div>
                  </div>
                </form>
              </div>

              <div className="wedding-brief-rail" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

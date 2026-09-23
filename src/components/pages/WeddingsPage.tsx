import { Suspense } from "react";
import Link from "next/link";
import SectionHero from "@/components/SectionHero";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import Field from "@/components/Field";
import FormStatus from "@/components/FormStatus";
import { weddingsContent } from "@/content/weddings";
import { contacts } from "@/content/site";
import { type Locale, withLocalePath } from "@/components/siteNavigation";
import { formatFrom, priceFrom, weddingPrices } from "@/lib/pricing";

export default function WeddingsPage({ locale }: { locale: Locale }) {
  const c = weddingsContent[locale];
  const f = c.form.fields;
  const facts = [
    ...c.hero.facts,
    { label: locale === "en" ? "Price" : "Стоимость", value: formatFrom(priceFrom.weddings, locale) },
  ];

  return (
    <>
      <SectionHero
        section="weddings"
        title={c.hero.title}
        lead={c.hero.lead}
        facts={facts}
        railLabel={locale === "en" ? "Wedding films" : "Свадебные ролики"}
      />

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display display--h2">{c.packages.title}</h2>
            <p className="lead">{c.packages.lead}</p>
          </div>

          <div className="packages">
            {c.packages.items.map((item) => (
              <article key={item.id} className="package">
                <h3 className="display display--h3">{item.title}</h3>
                <p className="package__price num">{formatFrom(weddingPrices[item.id], locale)}</p>
                <p className="package__fit mt-2">{item.fit}</p>
                <p>{item.result}</p>
              </article>
            ))}
          </div>

          <h3 className="display display--h3 mt-24">{c.extras.title}</h3>
          <div className="mt-8 border-t border-line">
            {c.extras.items.map((item) => (
              <div key={item.title} className="option">
                <p className="display display--h4">{item.title}</p>
                <p className="text-silver">{item.text}</p>
                <p className="option__price num">
                  {item.price === null ? c.packages.priceOnRequest : formatFrom(item.price, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band border-t border-line">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display display--h2">{c.process.title}</h2>
          </div>
          <Steps items={c.process.items} />
        </div>
      </section>

      {/* Заявка — на бархате, как приглашение на других страницах.
          id нужен /api/contact: после отправки он возвращает сюда. */}
      <section className="invite" id="wedding-brief">
        <div className="wrap">
          <h2 className="display display--h1">{c.form.title}</h2>
          <p className="invite__text">{c.form.text}</p>

          <form action="/api/contact" method="POST" className="mx-auto mt-14 max-w-[920px] text-left">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="source" value="weddings" />
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="wedding-website">Website</label>
              <input id="wedding-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mb-8">
              <Suspense fallback={null}>
                <FormStatus locale={locale} kind="weddings" />
              </Suspense>
            </div>

            <div className="form-grid">
              <Field label={f.date.label} htmlFor="weddingDate" hint={c.form.optional}>
                <input id="weddingDate" name="weddingDate" className="input" placeholder={f.date.placeholder} />
              </Field>
              <Field label={f.city.label} htmlFor="city" hint={c.form.optional}>
                <input id="city" name="city" className="input" placeholder={f.city.placeholder} />
              </Field>
              <Field label={f.format.label} htmlFor="weddingFormat" hint={c.form.optional}>
                <select id="weddingFormat" name="weddingFormat" className="input" defaultValue="">
                  <option value="">{f.format.placeholder}</option>
                  {f.format.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={f.guests.label} htmlFor="guests" hint={c.form.optional}>
                <input id="guests" name="guests" className="input" placeholder={f.guests.placeholder} />
              </Field>
              <Field label={f.message.label} htmlFor="message" hint={c.form.optional} wide>
                <textarea id="message" name="message" rows={4} className="input" placeholder={f.message.placeholder} />
              </Field>
              <Field label={f.phone.label} htmlFor="phone" hint={c.form.required}>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  autoComplete="tel"
                  className="input"
                  placeholder={f.phone.placeholder}
                />
              </Field>
              <Field label={f.name.label} htmlFor="name" hint={c.form.optional}>
                <input id="name" name="name" autoComplete="name" className="input" placeholder={f.name.placeholder} />
              </Field>
              <Field label={f.email.label} htmlFor="email" hint={c.form.optional} wide>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="input"
                  placeholder={f.email.placeholder}
                />
              </Field>
            </div>

            <div className="form-foot mt-12">
              <label className="consent">
                <input type="checkbox" name="agree" value="yes" required />
                <span>
                  {c.form.consentBefore}
                  <Link href={withLocalePath("/privacy", locale)}>{c.form.consentLink}</Link>
                </span>
              </label>
              <button type="submit" className="btn btn--ivory">
                {c.form.submit}
              </button>
            </div>
          </form>

          <p className="mt-12 text-small text-silver">
            {locale === "en" ? "Prefer to talk? " : "Удобнее поговорить? "}
            <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="link-line">
              {locale === "en" ? "Message us on Telegram" : "Напишите в Telegram"}
            </a>
          </p>
        </div>
      </section>

      <FaqList title={c.faq.title} items={c.faq.items} />
    </>
  );
}

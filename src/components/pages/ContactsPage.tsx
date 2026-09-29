import { Suspense } from "react";
import Link from "next/link";
import Field from "@/components/Field";
import FormStatus from "@/components/FormStatus";
import SubmitButton from "@/components/SubmitButton";
import KmPost from "@/components/road/KmPost";
import ProducerCard from "@/components/ProducerCard";
import { contactsContent } from "@/content/studio";
import { contacts, siteStrings, socials } from "@/content/site";
import { type Locale, withLocalePath } from "@/components/siteNavigation";

/**
 * «Контакты» — одним экраном: слева телефон, почта, соцсети и города,
 * справа короткая заявка. Брифы — отдельные большие документы, сюда
 * только ссылки на них.
 */
export default function ContactsPage({ locale }: { locale: Locale }) {
  const c = contactsContent[locale];
  const s = siteStrings[locale];
  const f = c.form.fields;

  return (
    <section className="contacts-screen">
      <div className="wrap contacts-screen__grid">
        <div>
          <KmPost lang={locale} />
          <h1 className="display display--h2">{c.title}</h1>
          <p className="lead mt-4">{c.lead}</p>

          <dl className="contact-list">
            <div>
              <dt>{s.labels.phone}</dt>
              <dd>
                <a href={contacts.phoneHref} className="num">
                  {contacts.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>{s.labels.email}</dt>
              <dd>
                <a href={contacts.emailHref}>{contacts.email}</a>
              </dd>
            </div>
            <div>
              <dt>{c.socials}</dt>
              <dd>
                {socials.map((item) => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt>{s.labels.city}</dt>
              <dd>{s.city}</dd>
            </div>
          </dl>

          <ProducerCard locale={locale} className="mt-8 border-t-0 pt-0" />

          <div className="contacts-briefs">
            <p>{c.briefs.text}</p>
            <div className="contacts-briefs__links">
              <Link href={withLocalePath("/brief", locale)} className="btn btn--line btn--sm">
                {c.briefs.project}
              </Link>
              <Link href={`${withLocalePath("/weddings", locale)}#wedding-brief`} className="btn btn--line btn--sm">
                {c.briefs.wedding}
              </Link>
            </div>
          </div>
        </div>

        <div id="contact-form">
          <h2 className="display display--h4">{c.form.title}</h2>
          <p className="mt-2 text-small text-steel">{c.form.text}</p>

          <form action="/api/contact" method="POST" className="mt-8">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="source" value="contacts" />
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <Suspense fallback={null}>
              <FormStatus locale={locale} kind="contacts" />
            </Suspense>

            <div className="form-grid form-grid--compact">
              <Field label={f.name.label} htmlFor="name" hint={c.form.optional} wide>
                <input id="name" name="name" autoComplete="name" className="input" placeholder={f.name.placeholder} />
              </Field>
              <Field label={f.phone.label} htmlFor="phone" hint={c.form.oneOf}>
                <input id="phone" name="phone" autoComplete="tel" className="input" placeholder={f.phone.placeholder} />
              </Field>
              <Field label={f.email.label} htmlFor="email" hint={c.form.oneOf}>
                <input id="email" name="email" type="email" autoComplete="email" className="input" placeholder={f.email.placeholder} />
              </Field>
              <Field label={f.message.label} htmlFor="message" hint={c.form.optional} wide>
                <textarea id="message" name="message" rows={3} className="input" placeholder={f.message.placeholder} />
              </Field>
            </div>

            <div className="form-foot mt-8">
              <label className="consent">
                <input type="checkbox" name="agree" value="yes" required />
                <span>
                  {c.form.consentBefore}
                  <Link href={withLocalePath("/privacy", locale)}>{c.form.consentLink}</Link>
                </span>
              </label>
              <SubmitButton className="btn btn--primary" pendingLabel={locale === "en" ? "Sending…" : "Отправляем…"}>
                {c.form.submit}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

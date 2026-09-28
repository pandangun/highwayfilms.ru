import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import Field from "@/components/Field";
import FormStatus from "@/components/FormStatus";
import SubmitButton from "@/components/SubmitButton";
import KmPost from "@/components/road/KmPost";
import RouteMap from "@/components/RouteMap";
import { aboutContent, contactsContent } from "@/content/studio";
import { contacts, siteStrings } from "@/content/site";
import { type Locale, withLocalePath } from "@/components/siteNavigation";

export default function ContactsPage({ locale }: { locale: Locale }) {
  const c = contactsContent[locale];
  const s = siteStrings[locale];
  const f = c.form.fields;
  const geography = aboutContent[locale].geography;

  return (
    <>
      <PageHead title={c.title} lead={c.lead}>
        <div className="mt-10">
          <Link href={withLocalePath("/brief", locale)} className="btn btn--primary">
            {c.briefCta}
          </Link>
        </div>
      </PageHead>

      {/* Контакты — главное на странице: крупно, сеткой через линии. */}
      <section className="band lit border-t border-line">
        <div className="wrap">
          <dl className="contact-grid">
            <div>
              <dt>{s.labels.phone}</dt>
              <dd>
                <a href={contacts.phoneHref} className="num">
                  {contacts.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>{s.labels.telegram}</dt>
              <dd>
                <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer">
                  {contacts.telegram}
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
              <dt>{s.labels.city}</dt>
              <dd>{s.city}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Кадр и маршрут: студия на двух концах М-11, выезды по России. */}
      <section className="band lit border-t border-line">
        <div className="wrap">
          <figure className="contacts-frame">
            <Image
              src="/images/road/night-bridge.jpg"
              alt={locale === "en" ? "Night bridge over the river, a frame from our showreel" : "Ночной мост над рекой, кадр из шоурила студии"}
              fill
              sizes="(min-width: 1488px) 1360px, 100vw"
              className="object-cover"
            />
          </figure>
          <div className="section-head mt-[var(--band)]">
            <KmPost lang={locale} />
            <h2 className="display display--h2">{geography.title}</h2>
          </div>
          <RouteMap geography={geography} />
        </div>
      </section>

      <section className="band border-t border-line" id="contact-form">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="display display--h2">{c.form.title}</h2>
            <p className="lead mt-6">{c.form.text}</p>
          </div>

          <form action="/api/contact" method="POST">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="source" value="contacts" />
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mb-8">
              <Suspense fallback={null}>
                <FormStatus locale={locale} kind="contacts" />
              </Suspense>
            </div>

            <div className="form-grid">
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
                <textarea id="message" name="message" rows={5} className="input" placeholder={f.message.placeholder} />
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
              <SubmitButton className="btn btn--primary" pendingLabel={locale === "en" ? "Sending…" : "Отправляем…"}>
                {c.form.submit}
              </SubmitButton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

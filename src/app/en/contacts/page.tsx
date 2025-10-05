import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacts — Highway Films",
  description:
    "Get in touch with Highway Films: phone, email, Telegram. Submit a brief for full-cycle production support.",
  alternates: { canonical: "https://highwayfilms.ru/en/contacts" },
};

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.6-.36l3.4 1.13c.7.23 1.1.95.9 1.65-.5 1.74-2.2 3.4-3.9 3.4C10.6 21 3 13.4 3 6.1c0-1.7 1.7-3.4 3.4-3.9.7-.2 1.4.2 1.6.9l1.1 3.4c.2.6 0 1.3-.4 1.6L6.6 10.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 2v.4l-8 5-8-5V8h16ZM4 18V9.7l7.4 4.6c.36.22.84.22 1.2 0L20 9.7V18H4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconTG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M21.6 4.2 2.7 11.5c-1 .4-.9 1.9.1 2.2l4.6 1.4 1.8 4.9c.3.8 1.4 1 2 .3l2.7-2.8 4.5 3.3c.8.6 2 .1 2.2-.9l2.7-13c.2-1-.7-1.8-1.7-1.5ZM8.2 13.8l9.7-6.4-7.8 7.4-.2 2.6-1.7-3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InfoCard({
  title,
  value,
  href,
  icon,
  ariaLabel,
}: {
  title: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-muted">{icon}</div>
      <div>
        <div className="text-sm text-muted">{title}</div>
        <div className="mt-1 text-lg">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="card p-5 md:p-6 transition border-base hover:border-strong hover:shadow-[0_0_22px_rgba(124,58,237,0.25)] hover:translate-y-[-2px]">
      {href ? (
        <a href={href} aria-label={ariaLabel || value} className="block transition hover:opacity-95">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

export default function ContactsEnPage() {
  return (
    <main className="container py-12 md:py-16">
      <header className="max-w-3xl">
        <h1 className="h1">Contacts</h1>
        <p className="lead measure mt-2">
          Share a short brief — we will respond within one business day with timing and next steps.
        </p>
        <p className="mt-3 text-sm text-muted">
          Office hours: Mon–Fri 10:00–19:00 (MSK). Outside these hours we may reply, but it is not guaranteed.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="Phone"
          value="+7 (999) 123-45-67"
          href="tel:+79991234567"
          icon={<IconPhone />}
          ariaLabel="Call +7 999 123 45 67"
        />
        <InfoCard
          title="Email"
          value="info@highwayfilms.ru"
          href="mailto:info@highwayfilms.ru?subject=%5BProject%5D%20Highway%20Films"
          icon={<IconMail />}
          ariaLabel="Write to info@highwayfilms.ru"
        />
        <InfoCard
          title="Telegram"
          value="@highwayfilms"
          href="https://t.me/highwayfilms"
          icon={<IconTG />}
          ariaLabel="Open Telegram"
        />
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Project request</h2>
          <p className="mt-2 text-sm text-muted">
            Provide a few bullet points — format, deadlines, reference links. We will prepare a detailed response with options.
          </p>
          <form className="mt-6 space-y-5" action="https://formspree.io/f/mayzjlvy" method="POST">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-muted" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none placeholder:text-neutral-500 transition focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div>
                <label className="block text-sm text-muted" htmlFor="company">
                  Company (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  placeholder="Company or brand"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none placeholder:text-neutral-500 transition focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-muted" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none placeholder:text-neutral-500 transition focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div>
                <label className="block text-sm text-muted" htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+7 999 123-45-67"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none placeholder:text-neutral-500 transition focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-muted" htmlFor="budget">
                  Budget (estimate)
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="e.g. 200–400K ₽"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none placeholder:text-neutral-500 transition focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div>
                <label className="block text-sm text-muted" htmlFor="deadline">
                  Deadline (optional)
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="text"
                  placeholder="Desired timeline"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none placeholder:text-neutral-500 transition focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Project type, scope, references, platforms, anything else we should know."
                className="mt-2 w-full rounded-xl bg-white/5 border border-base p-4 outline-none placeholder:text-neutral-500 resize-y transition focus:border-brand focus:ring-2 focus:ring-brand/40"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                name="agree"
                required
                className="mt-1 h-4 w-4 rounded border-base bg-white/5 accent-white/80"
              />
              <span>
                I agree with the{" "}
                <Link href="/en/privacy" className="underline hover:opacity-80">
                  privacy policy
                </Link>
                .
              </span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="btn-primary h-12 rounded-xl sm:flex-1 shadow-md transition hover:shadow-[0_0_20px_rgba(124,58,237,0.45)]"
              >
                Send request
              </button>
              <a href="mailto:info@highwayfilms.ru" className="btn h-12 rounded-xl sm:flex-1">
                Write an email
              </a>
            </div>

            <p className="mt-3 text-xs text-muted">We usually reply within 2–4 hours on business days.</p>
          </form>
        </div>

        <div className="space-y-4">
          <div className="card p-5 md:p-6">
            <h3 className="text-lg font-semibold">Studios</h3>
            <ul className="mt-3 space-y-2 text-muted">
              <li>Saint Petersburg — Fontanka River Emb., 100</li>
              <li>Moscow — Arbat St., 50</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="btn h-10 rounded-xl"
                href="https://yandex.ru/maps/?text=Санкт-Петербург%20набережная%20реки%20Фонтанки%20100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Map — Saint Petersburg
              </a>
              <a
                className="btn h-10 rounded-xl"
                href="https://yandex.ru/maps/?text=Москва%20Арбат%2050"
                target="_blank"
                rel="noopener noreferrer"
              >
                Map — Moscow
              </a>
            </div>
          </div>

          <figure className="card overflow-hidden">
            <img
              src="/map-preview.jpg"
              alt="Map with Highway Films offices"
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <figcaption className="px-5 py-3 text-sm text-muted">Highway Films office locations</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}

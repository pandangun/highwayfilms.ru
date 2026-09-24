// app/en/privacy/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Privacy Policy — Highway Films",
  description:
    "How we process personal data and cookies on Highway Films’ website in accordance with local regulations.",
  alternates: { canonical: `${SITE_URL}/en/privacy` },
  openGraph: {
    type: "article",
    title: "Privacy Policy — Highway Films",
    description:
      "What data we collect, why we use it, and your rights. Compliance with applicable data protection laws.",
    url: `${SITE_URL}/en/privacy`,
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

// Injected at build (e.g., from CI). Fallback — today’s date.
const UPDATED_AT = process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString().slice(0, 10);

const SECTIONS = [
  { id: "operator", title: "1. Terms and Data Controller" },
  { id: "scope", title: "2. Scope" },
  { id: "data", title: "3. Data We Process" },
  { id: "purposes", title: "4. Purposes of Processing" },
  { id: "legal", title: "5. Legal Bases" },
  { id: "sharing", title: "6. Sharing with Third Parties" },
  { id: "localization", title: "7. Data Localization & Storage" },
  { id: "security", title: "8. Security Measures" },
  { id: "cookies", title: "9. Cookies & Analytics" },
  { id: "rights", title: "10. Your Rights" },
  { id: "requests", title: "11. How to Submit a Request" },
  { id: "updates", title: "12. Policy Updates" },
];

export default function PrivacyPageEN() {
  return (
    <div className="page-head">
      <div className="wrap">
      {/* JSON-LD */}
      <Script id="ld-webpage" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy — Highway Films",
          url: `${SITE_URL}/en/privacy`,
          dateModified: UPDATED_AT,
          inLanguage: "en-US",
        })}
      </Script>
      <Script id="ld-breadcrumbs" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
            { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/en/privacy` },
          ],
        })}
      </Script>

      {/* Skip link for keyboard and screen reader users. */}
      <a href="#content" className="visually-hidden focus:not-sr-only">
        Skip to content
      </a>

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="display display--h1">Privacy Policy</h1>
        <p className="mt-6 text-small text-steel">
          Last updated: <time dateTime={UPDATED_AT}>{UPDATED_AT}</time>
        </p>
        <p className="lead">
          This policy explains what data we collect on the website, how we use it, and what rights
          you have. The document is drafted to comply with applicable data protection regulations.
        </p>
      </header>

      {/* Layout: sticky ToC + content */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
        {/* ToC */}
        <aside className="h-max lg:sticky lg:top-28">
          <nav aria-label="Contents" className="text-sm">
            <p className="mb-4 text-moon">Contents</p>
            <ol className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-steel transition-colors hover:text-moon"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Content */}
        <article id="content" className="prose legal">
          <section id="operator" className="legal-section">
            <h2>1. Terms and Data Controller</h2>
            <p>
              Data controller: <span className="text-moon">Highway Films</span> (hereinafter — “we”).
              Contact for personal data matters:{" "}
              <a href="mailto:info@highway-films.ru" >
                info@highway-films.ru
              </a>
              .
            </p>
          </section>

          <section id="scope" className="legal-section">
            <h2>2. Scope</h2>
            <p>
              This Policy applies to visitors of <strong>highway-films.ru</strong> and our contact forms.
              The site primarily targets users in the Russian Federation. We do not purposefully process
              data of residents of other jurisdictions.
            </p>
          </section>

          <section id="data" className="legal-section">
            <h2>3. Data We Process</h2>
            <ul>
              <li>Contact details from forms: name, email, phone, message text.</li>
              <li>Technical data: IP address, cookies, browser/device info, referrer URL.</li>
              <li>Messages in messengers/email (if you initiate contact).</li>
            </ul>
          </section>

          <section id="purposes" className="legal-section">
            <h2>4. Purposes of Processing</h2>
            <ul>
              <li>Handling inquiries and preparing proposals.</li>
              <li>Fulfilling agreements and providing production services.</li>
              <li>Website support, traffic analytics, and content improvement.</li>
              <li>Compliance with legal obligations (accounting, reporting, responses to requests).</li>
            </ul>
          </section>

          <section id="legal" className="legal-section">
            <h2>5. Legal Bases</h2>
            <ul>
              <li>Consent of the data subject.</li>
              <li>Performance of a contract or pre-contract steps at your request.</li>
              <li>Legitimate interests (site maintenance, security).</li>
              <li>Compliance with legal obligations under applicable law.</li>
            </ul>
          </section>

          <section id="sharing" className="legal-section">
            <h2>6. Sharing with Third Parties</h2>
            <p>We do not sell or publish your data. Sharing is possible only:</p>
            <ul>
              <li>with contractors/providers (hosting, email, analytics) — strictly as necessary;</li>
              <li>with public authorities — upon a lawful request;</li>
              <li>in case of reorganization/sale — to a successor, preserving obligations.</li>
            </ul>
          </section>

          <section id="localization" className="legal-section">
            <h2>7. Data Localization & Storage</h2>
            <p>
              Personal data of RF citizens collected via the site is recorded, systematized, accumulated
              and stored on servers located within the Russian Federation.
            </p>
          </section>

          <section id="security" className="legal-section">
            <h2>8. Security Measures</h2>
            <ul>
              <li>Access is limited to authorized personnel on a need-to-know basis.</li>
              <li>Organizational and technical safeguards are applied.</li>
              <li>Retention: until purposes are achieved or consent is withdrawn unless other grounds apply.</li>
            </ul>
          </section>

          <section id="cookies" className="legal-section">
            <h2>9. Cookies & Analytics</h2>
            <p>
              Cookies are used for proper website operation, remembering preferences and anonymous statistics.
              You can manage cookies in your browser settings.
            </p>

            <div className="overflow-x-auto">
              <table className="legal-table" role="table">
                <caption className="legal-caption">
                  Cookie categories used on the site
                </caption>
                <thead>
                  <tr className="text-left">
                    <th className="legal-cell">Category</th>
                    <th className="legal-cell">Purpose</th>
                    <th className="legal-cell">Typical duration</th>
                  </tr>
                </thead>
                <tbody className="text-steel">
                  <tr>
                    <td className="legal-cell">Technical</td>
                    <td className="legal-cell">Forms and session handling</td>
                    <td className="legal-cell">up to 12 months</td>
                  </tr>
                  <tr>
                    <td className="legal-cell">Analytics</td>
                    <td className="legal-cell">Anonymous traffic statistics</td>
                    <td className="legal-cell">up to 14 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-2">
              Cookie settings:{" "}
              <button type="button" data-cmp="open" >
                change consent
              </button>
              .
            </p>
          </section>

          <section id="rights" className="legal-section">
            <h2>10. Your Rights</h2>
            <ul>
              <li>obtain information about processing and a copy of your data;</li>
              <li>request rectification (update, correction) of your data;</li>
              <li>request blocking or deletion where processing is unlawful;</li>
              <li>withdraw consent to processing of personal data.</li>
            </ul>
          </section>

          <section id="requests" className="legal-section">
            <h2>11. How to Submit a Request</h2>
            <p>
              Send requests to{" "}
              <a href="mailto:info@highway-films.ru" >
                info@highway-films.ru
              </a>
              . Please include your name, a reply contact and the substance of your request. We’ll
              respond within the time limits set by law.
            </p>
          </section>

          <section id="updates" className="legal-section">
            <h2>12. Policy Updates</h2>
            <p>
              The current version is always available at <span className="text-moon">/en/privacy</span>.
              Last updated: <time dateTime={UPDATED_AT}>{UPDATED_AT}</time>.
            </p>
          </section>

          <p>
            <a href="#main" className="text-small">
              Back to top
            </a>
          </p>
        </article>
      </div>
      </div>
    </div>
  );
}

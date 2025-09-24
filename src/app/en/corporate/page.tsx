import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corporate & Presentation Video — Highway Films",
  description:
    "Company films, trade-show & investor presentations, onboarding and internal comms. Full cycle: idea → pre-production → shoot → post.",
  alternates: {
    canonical: "https://highwayfilms.ru/en/corporate",
    languages: {
      ru: "/corporate",
      en: "/en/corporate",
      "x-default": "/en/corporate",
    },
  },
  openGraph: {
    type: "website",
    url: "https://highwayfilms.ru/en/corporate",
    title: "Corporate Video — Highway Films",
    description:
      "Company/manufacturing films, booth loops, HR & internal comms. Full cycle: concept → shoot → post.",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card p-5 md:p-6 transition hover:-translate-y-0.5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-muted leading-relaxed">{desc}</p>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        ✓
      </span>
      <span className="text-sm text-muted leading-relaxed">{children}</span>
    </li>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5 text-center">
      <div className="stat-value">{value}</div>
      <div className="stat-label mt-1">{label}</div>
    </div>
  );
}

export default function CorporatePageEN() {
  return (
    <>
      {/* HERO */}
      <section className="container pt-header-safe section-top">
        <div className="max-w-3xl">
          <div className="eyebrow">Corporate</div>
          <h1 className="h1 mt-2">Corporate & Presentation Video</h1>
          <p className="lead mt-3">
            We help present products and processes: company and manufacturing films, trade-show and
            investor videos, onboarding, reports and internal communications. Clean visuals, clear
            structure and predictable timelines.
          </p>
        </div>

        {/* Statement */}
        <div className="band mt-8">
          <p className="statement">
            A presentation video that explains value and answers questions before the meeting.
          </p>
        </div>

        {/* Formats */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Card
            title="Company / Manufacturing films"
            desc="Brand story, factory tours, demonstrating expertise and infrastructure."
          />
          <Card
            title="Booth & presentation videos"
            desc="Looped silent videos for trade shows, concise cuts for talks."
          />
          <Card
            title="HR & internal communications"
            desc="Onboarding and welcome videos, reports, corporate events, EVP comms."
          />
          <Card
            title="Interviews & case stories"
            desc="Executives and experts on camera, client cases, success stories."
          />
        </div>
      </section>

      {/* Outcomes + Process */}
      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold">What you get</h3>
            <ul className="mt-4 space-y-3">
              <Check>Treatment and storyboard tailored to your audience</Check>
              <Check>Up to 4K/10-bit capture, drones/gimbals as needed</Check>
              <Check>Edit, color, graphics (subtitles/lower thirds), sound</Check>
              <Check>Versions for web, social and trade-show screens</Check>
              <Check>Usage guidelines and a thumbnail pack if needed</Check>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold">Process (transparent)</h3>
            <ol className="mt-4 grid gap-3 text-sm text-muted">
              <li className="border-l border-white/10 pl-4">
                <b>1. Brief</b> — goal, channels, key messages.
              </li>
              <li className="border-l border-white/10 pl-4">
                <b>2. Treatment</b> — concept, structure, references, budget & schedule.
              </li>
              <li className="border-l border-white/10 pl-4">
                <b>3. Production</b> — pre-prod, shoot, backups.
              </li>
              <li className="border-l border-white/10 pl-4">
                <b>4. Post</b> — edit, graphics/subtitles, color, sound.
              </li>
              <li className="border-l border-white/10 pl-4">
                <b>5. Delivery</b> — master files & resizes, hand-off of originals.
              </li>
            </ol>
          </div>
        </div>

        {/* Trust */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat value="10+" label="years in production" />
          <Stat value="50+" label="projects delivered" />
          <Stat value="2" label="cities we work in (SPB / Moscow)" />
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-sky-500/20 to-violet-600/20 px-6 py-7 ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-xl font-semibold">Need a video for a trade show or pitch?</h3>
              <p className="text-muted mt-1">
                Send a brief — we’ll return budget and timeline within one business day.
              </p>
            </div>
            <Link
              href="/en/contacts"
              className="btn btn-primary rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

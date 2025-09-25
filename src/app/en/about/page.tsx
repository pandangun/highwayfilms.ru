// app/en/about/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "About — Highway Films: Full-Cycle Video Production in Moscow & Saint Petersburg",
  description:
    "Highway Films produces commercials, product videos, corporate films and music videos. Full cycle: creative, pre-prod, 4K/10-bit capture, post and platform-ready masters.",
  alternates: {
    canonical: "https://highwayfilms.ru/en/about",
    languages: {
      ru: "/about",
      en: "/en/about",
      "x-default": "/en/about",
    },
  },
  openGraph: {
    type: "website",
    url: "https://highwayfilms.ru/en/about",
    title: "Highway Films — Full-Cycle Video Production",
    description:
      "Bold visuals, clear storytelling, measurable results. Moscow / Saint Petersburg. Travel across CIS on request.",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

/* =========================
   Small UI pieces
   ========================= */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5 text-center h-full">
      <div className="stat-value leading-tight">{value}</div>
      <div className="stat-label mt-1">{label}</div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-6 h-full">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

function ListItem({
  n,
  title,
  text,
}: {
  n: number;
  title: string;
  text: string;
}) {
  return (
    <li className="card p-5 relative flex gap-4">
      <div className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-white/10 ring-1 ring-white/20 font-semibold">
        {n}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="mt-1 text-muted">{text}</p>
      </div>
    </li>
  );
}

/** Big in-between “band” statement */
function Statement({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 md:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] bg-[radial-gradient(1200px_280px_at_0%_0%,rgba(124,58,237,.08),transparent_60%),radial-gradient(900px_220px_at_100%_100%,rgba(34,197,94,.08),transparent_60%),rgba(255,255,255,.03)]">
      <p className="font-semibold tracking-tight text-[clamp(2rem,1.2rem+3vw,3rem)] leading-[1.1]">
        {children}
      </p>
    </div>
  );
}

/** Section header + lead */
function SectionHeader({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header>
      {kicker && <div className="eyebrow">{kicker}</div>}
      <h2 className="mt-1 font-semibold tracking-tight text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-[1.15]">
        {title}
      </h2>
      {lead && (
        <p className="mt-2 text-muted text-[clamp(1.125rem,1rem+.6vw,1.35rem)] leading-[1.65] measure">
          {lead}
        </p>
      )}
    </header>
  );
}

/* =========================
   Page
   ========================= */

export default function AboutPageEN() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Highway Films",
    url: "https://highwayfilms.ru",
    logo: "https://highwayfilms.ru/logo.png",
    sameAs: ["https://t.me/highwayfilms"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Moscow & Saint Petersburg",
      addressCountry: "RU",
    },
    areaServed: "RU",
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://highwayfilms.ru/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://highwayfilms.ru/en/about",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does production take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fast packages — 7–10 days; story-driven projects — from 2–3 weeks depending on locations, shoot days and graphics.",
        },
      },
      {
        "@type": "Question",
        name: "What do you need from us to start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A short brief and a link to your product/site are enough. We handle creative, treatment and pre-production.",
        },
      },
      {
        "@type": "Question",
        name: "Where do you operate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Based in Moscow and Saint Petersburg. Travel across Russia and CIS on request.",
        },
      },
    ],
  };

  return (
    <main className="container pt-header-safe pb-16">
      {/* HERO: two columns, sticky CTA on the right */}
      <section className="grid md:grid-cols-[minmax(0,1fr)_420px] gap-8 items-start md:pt-12">
        <div>
          <div className="eyebrow">About</div>
          <h1 className="h1 mt-2">Highway Films — full-cycle video production</h1>
          <p className="lead measure mt-3">
            We produce commercials, corporate films, brand content and music videos. Our approach:
            bold visuals, clear storytelling and measurable outcomes — awareness, conversions, and
            trust in your product.
          </p>

          {/* KPI */}
          <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-3">
            <Stat value="10+ years" label="in production" />
            <Stat value="50+" label="projects delivered" />
            <Stat value="4K / 10-bit" label="image & color" />
          </div>
        </div>

        <aside className="card p-6 md:sticky md:top-[calc(var(--header-h)+16px)]">
          <div className="text-xl font-semibold">Need a production partner?</div>
          <p className="text-muted mt-2">
            Send a short brief and a product link — we’ll propose 2–3 formats with budgets and
            timelines.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/en/contacts" className="btn btn-primary">
              Get a quote
            </Link>
            <a
              href="https://t.me/highwayfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Telegram
            </a>
          </div>
          <p className="text-muted mt-3 text-sm">Moscow / Saint Petersburg. Travel across CIS.</p>
        </aside>
      </section>

      {/* Interlude 1 */}
      <section className="mt-8">
        <Statement>
          We don’t make videos just to look pretty — we make them to <em>perform</em>: understanding
          → trust → action.
        </Statement>
      </section>

      {/* Why us */}
      <section className="mt-10">
        <SectionHeader
          kicker="Approach"
          title="Why brands choose us"
          lead="Full cycle, a robust technical pipeline, and a focus on business outcomes — not just a beautiful video but a tool."
        />
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature
            title="Full cycle"
            text="Idea → treatment → pre-prod → shoot → post. Transparent budgets and timelines, single-point producer accountability."
          />
          <Feature
            title="Technical craft"
            text="Up to 4K/10-bit capture, slow-mo/macro, reference-driven color, motion/3D and clean sound."
          />
          <Feature
            title="Outcome-driven"
            text="Video as a tool: structure, insights, CTA. Platform-specific versions and A/B bundles."
          />
        </div>
      </section>

      {/* Interlude 2 */}
      <section className="mt-10">
        <Statement>
          The minimally sufficient production setup for your goal. Speed without compromising quality.
        </Statement>
      </section>

      {/* What we do + internal links */}
      <section className="mt-10">
        <SectionHeader
          kicker="Formats"
          title="What we produce"
          lead="From clean packshot to rich lifestyle and UGC. We assemble the right set of scenes for a specific goal."
        />
        <div className="mt-5 grid md:grid-cols-4 gap-4">
          <Feature
            title="Commercials / product video"
            text="Packshot, lifestyle, UGC, motion. Series for product pages and performance."
          />
          <Feature
            title="Corporate video"
            text="Company films, trade-show loops/presentations, HR and internal comms."
          />
          <Feature
            title="Music videos"
            text="Concept, direction, shoot, post and release assets. Strong imagery and rhythm."
          />
          <Feature
            title="Post-production"
            text="Editing, color, VFX, sound, captions. Platform-ready master versions."
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/en/commercials" className="btn">
            Commercials
          </Link>
          <Link href="/en/corporate" className="btn">
            Corporate
          </Link>
          <Link href="/en/music-videos" className="btn">
            Music Videos
          </Link>
          <Link href="/en/videoproduction" className="btn">
            Production
          </Link>
        </div>
      </section>

      {/* Interlude 3 */}
      <section className="mt-10">
        <Statement>
          Trust is built with details: lighting, texture, color — and a precise shot dramaturgy.
        </Statement>
      </section>

      {/* Tech / gear */}
      <section className="mt-10">
        <SectionHeader
          kicker="Stack"
          title="Technology & equipment"
          lead="Controlled lighting, log profiles, color management and consistent masters across channels."
        />
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div className="card p-6">
            <h3 className="font-semibold">Capture</h3>
            <p className="text-muted mt-2">
              4K/10-bit, slow-mo, macro, controlled setups (key/fill/rim), haze/particles. Log
              profile, neutral charts, exposure control via waveform.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold">Post</h3>
            <p className="text-muted mt-2">
              Color in ACES, managed LUTs, tracking/beauty/VFX, titles/captions, renders for
              platforms (vertical/horizontal) and loudness standards. Platform-ready masters.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mt-10">
        <Statement>
          A transparent process and predictable timelines: you know what’s happening at every step.
        </Statement>
        <div className="mt-6">
          <SectionHeader title="How we work" />
        </div>
        <ol className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ListItem
            n={1}
            title="Brief → insight"
            text="Audience, offer, barriers, KPIs. We lock the persuasive order of facts."
          />
          <ListItem
            n={2}
            title="Pre-prod"
            text="Treatment, boards, lighting, props, timing. Selling-points checklist."
          />
          <ListItem
            n={3}
            title="Shoot"
            text="Packshot + lifestyle/UGC. Shot in series — a base for A/B tests."
          />
          <ListItem
            n={4}
            title="Post"
            text="Edit → color → motion/3D → captions. 6/15/30/60s, vertical/horizontal."
          />
        </ol>
        <div className="mt-6">
          <Link href="/en/contacts" className="btn btn-primary">
            Request a proposal
          </Link>
        </div>
      </section>

      {/* SEO text + FAQ */}
      <section className="mt-12">
        <SectionHeader
          kicker="Approach"
          title="Highway Films: what we solve"
          lead="Video must explain the product, remove objections and lead to action. We design the structure so every shot drives the goal."
        />
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <article className="card p-6">
            <h3 className="font-semibold">Why brands hire us</h3>
            <p className="text-muted mt-2">
              For e-commerce — series for product pages and retargeting; for brands — awareness and
              image. We start by locking KPIs and key selling-points, then build a treatment with the
              “meaning → benefit → action” dramaturgy. The production cycle is transparent: we fix
              schedule and budget, shoot in series (packshot + lifestyle/UGC), grade to reference, and
              deliver platform-ready masters.
            </p>
          </article>

          <aside className="card p-6">
            <h3 className="font-semibold">FAQ</h3>
            <details className="mt-2">
              <summary className="cursor-pointer">How long does production take?</summary>
              <p className="text-muted mt-2">Fast packages — 7–10 days; story-driven — from 2–3 weeks.</p>
            </details>
            <details className="mt-2">
              <summary className="cursor-pointer">What do you need from us?</summary>
              <p className="text-muted mt-2">A short brief and a link — we’ll handle the rest.</p>
            </details>
            <details className="mt-2">
              <summary className="cursor-pointer">Where do you work?</summary>
              <p className="text-muted mt-2">Moscow & Saint Petersburg; travel across CIS on request.</p>
            </details>
          </aside>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-12">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Shall we discuss your project?</div>
            <p className="text-muted mt-2">
              Send a link to your product — we’ll assemble a plan and budget today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/en/contacts" className="btn btn-primary">
              Request a proposal
            </Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}

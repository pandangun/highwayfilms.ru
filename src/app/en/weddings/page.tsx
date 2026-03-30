import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Wedding videography - Highway Films",
  description:
    "Wedding films in Moscow and Saint Petersburg: teaser, feature film, full ceremony archives. Episode, Film, Saga packages. Mobile capture and same-day edits.",
  path: "/en/weddings",
  locale: "en",
  imagePath: "/images/frames/f001.jpg",
});

const frames = [
  "/images/frames/f001.jpg",
  "/images/frames/f002.jpg",
  "/images/frames/f003.jpg",
  "/images/frames/f004.jpg",
  "/images/frames/f005.jpg",
  "/images/frames/f006.jpg",
];

const storyFormats = [
  {
    id: "episode",
    label: "Short and vibrant",
    title: "Episode",
    price: "60 000 RUB",
    description: "6 hours, 1 cinematographer. Teaser 30-45 sec + film 4-6 min.",
    bullets: [
      "- Essential edit, colour, and sound",
      "- Perfect for intimate ceremonies",
      "- Vertical & horizontal exports",
    ],
    href: "/en/contacts?plan=episode",
    wrapperClassName: "md:translate-y-1",
  },
  {
    id: "film",
    label: "Complete narrative",
    title: "Film",
    price: "95 000 RUB",
    description: "10 hours, 1-2 cinematographers. Teaser 45-60 sec + film 7-12 min.",
    bullets: [
      "- Full-length key moments",
      "- Separate capture of vows and speeches",
      "- Vertical cuts for social media",
    ],
    href: "/en/contacts?plan=film",
    wrapperClassName: "md:translate-y-[-4px]",
    accent: true,
  },
  {
    id: "saga",
    label: "Grand story in detail",
    title: "Saga",
    price: "140 000 RUB",
    description: "Full day coverage, 2 cinematographers + drone (weather permitting). Teaser + film 10-15 min.",
    bullets: [
      "- All long-form versions and cover frames",
      "- Social-first vertical cuts",
      "- Express teaser by the next morning",
    ],
    href: "/en/contacts?plan=saga",
    wrapperClassName: "md:translate-y-2",
  },
];

const extras = [
  {
    title: "Mobile capture",
    description:
      "Shot on iPhone 16-17 by a 1-2 person crew. Minimal gear, authentic vibe. Fast, budget-friendly, built for socials.",
    price: "40 000 RUB",
    href: "/en/contacts?extra=mobile",
  },
  {
    title: "Same-day edit",
    description:
      "A short highlight cut delivered the same night for your reception or socials. Available with mobile and classic capture.",
    price: "on request",
    href: "/en/contacts?extra=same-day",
  },
];

const faqItems: Array<{ q: string; a: ReactNode }> = [
  {
    q: "When will the video be ready?",
    a: <>Teaser in 3-5 days, feature film in 3-4 weeks. Same-day edit is available as an add-on.</>,
  },
  {
    q: "What do we receive?",
    a: <>Baseline - teaser plus feature film. “Film” and “Saga” include full-length key moments and social media versions.</>,
  },
  {
    q: "Do you only work in Moscow and Saint Petersburg?",
    a: <>We’re based there, but we travel across Russia.</>,
  },
  {
    q: "Is it staged or candid?",
    a: <>The focus is on genuine emotion and atmosphere. We add staged elements only if you want them.</>,
  },
];

function Thumbs({ start = 0, count = 6 }: { start?: number; count?: number }) {
  const pics = Array.from({ length: count }, (_, i) => frames[(start + i) % frames.length]);
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6">
      {pics.map((src) => (
        <div key={src} className="relative aspect-[3/2] overflow-hidden rounded-xl border border-white/10">
          <Image
            src={src}
            alt="Wedding frame"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 16vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[12px] leading-none text-white/85">
      {children}
    </span>
  );
}

function Price({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[linear-gradient(90deg,rgba(124,58,237,.25),rgba(255,255,255,.12))] px-2.5 py-1 text-[12px] font-medium text-white/90 ring-1 ring-white/15">
      from {value}
    </span>
  );
}

function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-[1px] [background:linear-gradient(120deg,rgba(124,58,237,.6),rgba(255,255,255,.16))] ${className}`}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">{children}</div>
    </div>
  );
}

function CTAButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium">
      {children}
    </Link>
  );
}

function QA({ q, a }: { q: string; a: ReactNode }) {
  return (
    <details className="group py-8 first:pt-0 last:pb-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
        <span className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-[1.02] tracking-[-0.03em] text-white">
          {q}
        </span>
        <span className="relative mt-2 flex h-5 w-5 shrink-0 items-center justify-center text-white/72">
          <span className="absolute h-px w-5 bg-gradient-to-r from-white/70 to-white/20" />
          <span className="absolute h-5 w-px bg-white/50 transition duration-200 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="max-w-2xl pt-5 text-[1.02rem] leading-8 text-white/58 md:text-[1.08rem]">{a}</div>
    </details>
  );
}

export default function WeddingsEnPage() {
  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
      <section className="container relative grid items-start gap-8 pt-6 md:grid-cols-[1.2fr_0.8fr] md:pt-10">
        <div className="measure">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] uppercase tracking-wider text-white/80">
            Wedding films by Highway
          </span>
          <h1 className="h1 mt-4">Wedding videography in Moscow & Saint Petersburg</h1>
          <p className="lead mt-4">
            We capture weddings like cinema: true emotions, flattering light, rhythmical storytelling. Every project includes a teaser, a feature film, and versions tailored for platforms. Saint Petersburg, Moscow, and destination shoots across Russia.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip>30-60 sec teaser</Chip>
            <Chip>5-15 min film</Chip>
            <Chip>Full ceremony archives</Chip>
            <Chip>Vertical & horizontal</Chip>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CTAButton href="/en/contacts">Check availability</CTAButton>
            <span className="text-xs text-white/70">We reply the same day</span>
          </div>
        </div>

        <GlowCard className="md:translate-y-2">
          <div className="grid gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="stat-value">3-5 days</div>
              <div className="stat-label">teaser delivery</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="stat-value">3-4 weeks</div>
              <div className="stat-label">feature film delivery</div>
            </div>
          </div>
          <Thumbs start={0} count={6} />
        </GlowCard>
      </section>

      <section className="container grid gap-6 py-10 md:grid-cols-3">
        <GlowCard className="md:col-span-2">
          <h3 className="font-display text-base text-white">Feature film (5-15 minutes)</h3>
          <p className="mt-2 text-sm text-neutral-200">
            A cohesive story of the day: morning, ceremony, reception, and evening. Natural speeches, candid in-between moments, edit and sound design that bring you back.
          </p>
          <Thumbs start={2} count={6} />
        </GlowCard>
        <GlowCard>
          <h3 className="font-display text-base text-white">Teaser (30-60 seconds)</h3>
          <p className="mt-2 text-sm text-neutral-300">A social-first highlight you can share just a few days after the wedding.</p>
        </GlowCard>
        <GlowCard>
          <h3 className="font-display text-base text-white">Full-length moments</h3>
          <p className="mt-2 text-sm text-neutral-300">Ceremony, vows, first dance, speeches - documented separately in full.</p>
        </GlowCard>
        <GlowCard className="md:col-span-2">
          <h3 className="font-display text-base text-white">Versions for every platform</h3>
          <p className="mt-2 text-sm text-neutral-300">Horizontal cuts for YouTube / VK and vertical edits for Reels, Shorts, TikTok.</p>
        </GlowCard>
      </section>

      <section className="container py-10">
        <h2 className="font-display text-2xl text-white">Choose your story format</h2>
        <div className="mt-6 grid gap-6 md:[grid-template-columns:1.05fr_1.2fr_1.05fr]">
          {storyFormats.map((format) => (
            <div key={format.id} className={`grid content-start gap-2 ${format.wrapperClassName ?? ""}`}>
              <div className={format.accent ? "text-sm text-white/90" : "text-sm text-white/75"}>{format.label}</div>
              {format.accent ? (
                <div className="rounded-2xl p-[1px] [background:linear-gradient(140deg,rgba(168,85,247,.7),rgba(255,255,255,.18))]">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl text-white">{format.title}</h3>
                      <Price value={format.price} />
                    </div>
                    <p className="mt-2 text-sm text-neutral-200">{format.description}</p>
                    <ul className="mt-3 space-y-1 text-sm text-neutral-200">
                      {format.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <CTAButton href={format.href}>Get a quote</CTAButton>
                    </div>
                  </div>
                </div>
              ) : (
                <GlowCard>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-white">{format.title}</h3>
                    <Price value={format.price} />
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">{format.description}</p>
                  <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                    {format.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <CTAButton href={format.href}>Get a quote</CTAButton>
                  </div>
                </GlowCard>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-transparent px-6 py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-neutral-100">Tell us about your venue and timeline - we will build a precise schedule and estimate.</p>
            <CTAButton href="/en/contacts">Check availability</CTAButton>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="font-display text-2xl text-white">Recent weddings</h2>
        <div className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4">
          <div className="flex gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="relative h-44 w-[240px] shrink-0 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={frames[i % frames.length]}
                  alt={`Wedding case ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-6 py-10 md:grid-cols-2">
        {extras.map((extra) => (
          <GlowCard key={extra.title}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl text-white">{extra.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{extra.description}</p>
              </div>
              <Price value={extra.price} />
            </div>
            <div className="mt-4">
              <CTAButton href={extra.href}>Ask for details</CTAButton>
            </div>
          </GlowCard>
        ))}
      </section>

      <section className="container py-12">
        <div className="max-w-5xl">
          <p className="eyebrow">What couples ask</p>
          <h2 className="font-display mt-3 text-[clamp(2.25rem,1.6rem+2vw,3.8rem)] leading-[0.96] tracking-[-0.04em] text-white">
            Important details before the shoot
          </h2>
        </div>
        <div className="mt-8 max-w-5xl">
          <div className="h-px bg-gradient-to-r from-white/40 via-white/12 to-transparent" />
          {faqItems.map((item) => (
            <QA key={item.q} q={item.q} a={item.a} />
          ))}
          <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>
      </section>

      <section className="container pb-20">
        <div className="max-w-4xl border-t border-white/8 pt-10 text-sm leading-7 text-white/38 md:text-[0.95rem]">
          <h2 className="font-display text-xl tracking-[-0.02em] text-white/58">
            Wedding videography in Moscow & Saint Petersburg
          </h2>
          <p>
            A wedding film keeps the day alive far beyond memories. We craft teasers, feature edits, and full-length archives so you can revisit the key moments for years. Our couples value honest emotions, stylish edits, and modern storytelling.
          </p>
          <p className="mt-4">
            Choose Episode, Film, or Saga - we will tailor timing and coverage to your venue and schedule. We travel across Russia, offer mobile capture, and can deliver a teaser by the next morning.
          </p>
        </div>
      </section>

      <div className="container flex items-center justify-between gap-3 py-3 text-xs">
        <div className="text-white/60">Highway Films</div>
        <div className="flex items-center gap-3">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Link href="/weddings" className="px-3 py-1 hover:bg-white/10">RU</Link>
            <Link href="/en/weddings" className="px-3 py-1 bg-white/10 hover:bg-white/20">EN</Link>
          </div>
          <CTAButton href="/en/contacts">Say hi</CTAButton>
        </div>
      </div>
      </div>
    </main>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const frames = [
  { src: "/images/frames/f001.jpg", alt: "Reference: brand film, close-up", tag: "Brand" },
  { src: "/images/frames/f002.jpg", alt: "Reference: product shoot, soft light", tag: "Product" },
  { src: "/images/frames/f003.jpg", alt: "Reference: motion and sport", tag: "Sport" },
  { src: "/images/frames/f004.jpg", alt: "Reference: architecture mood", tag: "Corporate" },
  { src: "/images/frames/f005.jpg", alt: "Reference: portrait lighting", tag: "Portrait" },
  { src: "/images/frames/f006.jpg", alt: "Reference: industrial environment", tag: "Industrial" },
];

const kpis = [
  { value: "10+ years", label: "in production" },
  { value: "250+", label: "films delivered" },
  { value: "4K / 10-bit", label: "capture pipeline" },
];

const benefits = [
  {
    title: "Brand-level visuals",
    text: "Stabilised camera work, drone units, macro, timelapse, on-set QC with calibrated monitors.",
  },
  {
    title: "Post without the chaos",
    text: "Story-first edit, sound design, colour, VFX and subtitles handled by one team.",
  },
  {
    title: "Budgets by objective",
    text: "Crew, gear and locations are tailored to KPI and budget. We offer 2–3 complexity options.",
  },
];

const processSteps = [
  {
    title: "Brief → hypothesis",
    text: "Audience, narrative, success metrics. We suggest the best format and storyline.",
  },
  {
    title: "Pre-production",
    text: "Treatments, boards, casting, locations, schedule, logistics and technical breakdown.",
  },
  {
    title: "Production",
    text: "Crewed by roles with lighting, sound and backup shots. Quality control right on set.",
  },
  {
    title: "Post-production",
    text: "Edit → grade → mix → graphics. Master versions and adaptations for every platform.",
  },
];

const deliverables = [
  {
    title: "Content & versions",
    items: [
      "Master film in all required durations (YouTube, VK, TG, DOOH).",
      "Vertical and short cuts for performance media.",
      "Open assets on request: rushes, project files, LUTs/presets.",
    ],
  },
  {
    title: "Docs & extras",
    items: [
      "Contract, usage rights, detailed budget and schedule.",
      "Preview stills for announcements and cover art.",
      "Publishing guide: aspect ratios, bitrates, timecodes.",
    ],
  },
];

const formatHighlights = [
  {
    title: "Brand / Product film",
    text: "Image and product stories from 20-second teasers to narrative mini-films.",
  },
  {
    title: "Corporate video",
    text: "Company stories, HR content, manufacturing showcases and investor updates.",
  },
  {
    title: "Performance content",
    text: "Vertical edits, UGC mixes and episodic cuts for warming up and retargeting.",
  },
];

const faqItems = [
  {
    question: "Timelines?",
    answer: "Agile formats ship in 7–14 days. Full productions take 3–6 weeks. We confirm the grid after briefing.",
  },
  {
    question: "Budget?",
    answer: "Depends on crew size, shooting days, lighting, locations and post scope. Expect 2–3 budget options.",
  },
  {
    question: "Masters & rights?",
    answer: "We deliver masters and hand over source files on request. Usage rights and timing sit in the contract.",
  },
  {
    question: "Where do you shoot?",
    answer: "Based in Moscow & Saint Petersburg, travelling across Russia and the CIS when needed.",
  },
];

export const metadata: Metadata = {
  title: "Video production in Moscow & Saint Petersburg — Highway Films",
  description:
    "We craft video that moves metrics: from brand films to vertical performance assets. Concept → shoot → post → mastered deliveries.",
  alternates: { canonical: "https://highwayfilms.ru/en/videoproduction" },
};

export default function VideoproductionEnPage() {
  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="h1">Video production in Moscow & Saint Petersburg</h1>
        <p className="lead measure mt-2">
          We create films that drive both brand perception and sales — from image pieces to vertical performance edits. Full cycle, in-house.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/en/contacts" className="btn btn-primary">Discuss the project</Link>
          <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
            Chat on Telegram
          </a>
        </div>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.value} className="card p-4 text-center">
            <div className="stat-value leading-tight">{kpi.value}</div>
            <div className="stat-label mt-1">{kpi.label}</div>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="card p-5">
            <h3 className="text-lg font-medium">{benefit.title}</h3>
            <p className="mt-2 text-muted leading-relaxed">{benefit.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Visual references</h2>
        <p className="text-muted mt-2 measure">
          A glimpse into textures and moods we love. We develop a dedicated visual language and narrative arc for every brand.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {frames.map((frame, index) => (
            <figure key={frame.src} className="group relative w-full aspect-video overflow-hidden rounded-xl border border-base">
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 33vw"
                priority={index < 2}
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-sm">
                <span className="rounded-md bg-black/40 px-2 py-1">{frame.tag}</span>
              </figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">How we work</h2>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, idx) => (
            <li key={step.title} className="card p-5 flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-white/5 grid place-items-center font-semibold">{idx + 1}</div>
              <div>
                <div className="font-medium">{step.title}</div>
                <p className="mt-1 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">What you get</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {deliverables.map((group) => (
            <div key={group.title} className="card p-5">
              <div className="font-medium">{group.title}</div>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {formatHighlights.map((format) => (
          <div key={format.title} className="card p-5">
            <h3 className="text-lg font-medium">{format.title}</h3>
            <p className="mt-2 text-muted">{format.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item.question} className="card p-5">
              <div className="font-medium">{item.question}</div>
              <p className="mt-1 text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Need a film that hits KPIs?</div>
            <p className="text-muted mt-2">Share a short brief — we will respond with timing, team and cost ranges today.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/en/contacts" className="btn btn-primary">Request a proposal</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Telegram chat
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

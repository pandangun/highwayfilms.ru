import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clapperboard,
  Layers3,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";

type BackstageStill = {
  title: string;
  note: string;
  image: string;
  sizes: string;
  className?: string;
};

const backstageStills: BackstageStill[] = [
  {
    title: "Lighting goes in before the shot feels effortless",
    note: "Prep, checks, and adjustments before the take.",
    image: "/images/frames/f001.jpg",
    sizes: "(max-width: 1023px) 100vw, 50vw",
    className: "md:col-span-2",
  },
  {
    title: "Real production has texture and pace",
    note: "Crew movement, equipment, and decisions in real time.",
    image: "/images/frames/f006.jpg",
    sizes: "(max-width: 1023px) 100vw, 25vw",
  },
  {
    title: "The frame is held together by preparation",
    note: "Short iterations, resets, and technical control.",
    image: "/images/frames/f018.jpg",
    sizes: "(max-width: 1023px) 100vw, 25vw",
  },
  {
    title: "Backstage, not self-congratulation",
    note: "What the work actually looks like between finished shots.",
    image: "/images/frames/f031.jpg",
    sizes: "(max-width: 1023px) 100vw, 50vw",
    className: "md:col-span-2",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "About — Highway Films",
  description:
    "Highway Films is a full-cycle production studio for commercials, brand films, corporate video, and music videos. Strong visuals, sane production, and clear outcomes.",
  path: "/en/about",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
});

function SectionHeader({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
          {title}
        </h2>
      </div>
      {lead ? <p className="max-w-xl text-white/62">{lead}</p> : null}
    </header>
  );
}

function StatPanel({
  value,
  label,
  detail,
  featured = false,
}: {
  value: string;
  label: string;
  detail: string;
  featured?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[30px] border border-white/10 p-6 shadow-soft",
        "bg-[radial-gradient(140%_120%_at_0%_0%,rgba(124,58,237,.24),transparent_60%),radial-gradient(120%_120%_at_100%_100%,rgba(59,130,246,.14),transparent_58%),rgba(255,255,255,.03)]",
        featured ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">{label}</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-violet-200/85 font-extrabold tracking-tight text-[clamp(2.4rem,1.4rem+3vw,3.4rem)]">
        {value}
      </div>
      <p className="mt-4 max-w-md text-sm leading-6 text-white/62">{detail}</p>
    </div>
  );
}

function AdvantageCard({
  title,
  text,
  note,
  icon,
}: {
  title: string;
  text: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
          {icon}
        </div>
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/36">{note}</span>
      </div>
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <p className="mt-3 text-white/62">{text}</p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
    </div>
  );
}

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(255,255,255,0.04))] px-6 py-8 shadow-soft md:px-8">
      <p className="font-display max-w-4xl text-[clamp(1.8rem,2vw+1rem,2.9rem)] leading-[1.08] tracking-[-0.035em] text-white">
        {children}
      </p>
    </div>
  );
}

function Step({
  index,
  title,
  text,
}: {
  index: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/25 p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/80">
          {index}
        </div>
        <div>
          <h3 className="font-display text-xl text-white">{title}</h3>
          <p className="mt-3 text-white/62">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPageEn() {
  return (
    <div className="page-shell">
      <div className="page-ambient" />
      <div className="container page-content pt-header-safe pb-16">
      <section className="py-10 md:py-14">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="font-display mt-4 max-w-4xl text-[clamp(3rem,7vw,5.7rem)] leading-[0.95] tracking-[-0.045em] text-white">
              Highway Films — full-cycle video production
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-[1.28rem]">
              We create commercials, corporate films, brand content, and music videos. The point is not only to make something beautiful, but to build strong production logic and a clear outcome around the brief.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/en/contacts" className="btn-primary h-12 rounded-full px-6">
                Discuss the project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://t.me/highwayfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-12 rounded-full px-6"
              >
                Telegram
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <StatPanel
              value="10+ years"
              label="Experience"
              detail="We work across producing, filming, and post instead of acting like a loose collection of vendors."
              featured
            />
            <StatPanel
              value="50+"
              label="Releases"
              detail="Projects delivered from treatment and prep through final master."
            />
            <StatPanel
              value="4K / 10-bit"
              label="Pipeline"
              detail="Controlled capture, grade, and final delivery without quality drop-offs between stages."
            />
          </div>
        </div>
      </section>

      <section className="pb-8">
        <Statement>
          We do not make films just to look pretty. We make them to create understanding, trust, and movement toward action.
        </Statement>
      </section>

      <section className="py-10 md:py-14">
        <SectionHeader
          kicker="Advantages"
          title="Why brands choose us"
          lead="Not just production execution, but a system where concept, shoot, and post support each other instead of colliding."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <AdvantageCard
            title="Full cycle"
            text="From brief and treatment to production, edit, and delivery package. One working system instead of outsourced chaos."
            note="from start to release"
            icon={<Layers3 className="h-5 w-5" />}
          />
          <AdvantageCard
            title="Technical control"
            text="Up to 4K/10-bit, controlled lighting, reference-driven colour, motion/VFX, and clean sound without the rough edges."
            note="craft and pipeline"
            icon={<Clapperboard className="h-5 w-5" />}
          />
          <AdvantageCard
            title="Outcome focus"
            text="We build film structure so the work does more than impress. It should drive recognition, trust, and conversion."
            note="not just pretty"
            icon={<Sparkles className="h-5 w-5" />}
          />
        </div>
      </section>

      <section className="pb-8">
        <Statement>
          The minimally sufficient production setup for the job. Speed where it helps, precision where shortcuts would break the work.
        </Statement>
      </section>

      <section className="py-10 md:py-14">
        <SectionHeader
          kicker="Process"
          title="How we work"
          lead="A transparent project path where you can always see what is happening, where we are, and why the result takes this shape."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Step
            index="01"
            title="Brief and direction"
            text="We define goal, audience, offer, and constraints. This is where we decide what needs to hold attention and what needs to sell."
          />
          <Step
            index="02"
            title="Treatment and prep"
            text="We shape the visual logic, shotlist, lighting, props, schedule, and production frame around the real scale of the task."
          />
          <Step
            index="03"
            title="Production"
            text="We shoot with editorial freedom in mind: core footage, safety coverage, platform adaptations, and A/B-ready material."
          />
          <Step
            index="04"
            title="Post and release"
            text="Edit, grade, graphics, sound, and master versions prepared for web, social, paid distribution, and presentation formats."
          />
        </div>
      </section>

      <section className="py-10 md:py-14">
        <SectionHeader
          kicker="Production stills / backstage"
          title="A production floor should feel real, not over-polished."
          lead="This section is about the atmosphere of actual work: lighting passes, resets, crew rhythm, and the technical layer behind the finished frame."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {backstageStills.map((item) => (
            <article
              key={item.image}
              className={[
                "group relative min-h-[18rem] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-[0_24px_70px_rgba(0,0,0,0.24)]",
                item.className ?? "",
              ].join(" ")}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes={item.sizes}
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,.06),rgba(8,8,10,.14)_34%,rgba(8,8,10,.8)_100%)]" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-white/44">
                <span>Backstage</span>
                <span>placeholder frame</span>
              </div>
              <div className="absolute inset-x-5 bottom-5 max-w-md">
                <h3 className="font-display text-[1.45rem] leading-[1.02] tracking-[-0.03em] text-white md:text-[1.7rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/64">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-4 pt-10 md:pt-14">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(255,255,255,0.05))] px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.38)] md:px-8 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-white/55">Next move</p>
              <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
                Want to discuss your project?
              </h2>
              <p className="mt-4 text-white/68">
                Send the product, brand, or just the brief notes. We will return with treatment direction, timing, and a working estimate.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/en/contacts" className="btn-primary h-12 rounded-full px-6">
                Request a proposal
              </Link>
              <a
                href="https://t.me/highwayfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-12 rounded-full px-6"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

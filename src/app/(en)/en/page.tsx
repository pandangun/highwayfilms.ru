import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import ServiceCards from "@/components/ServiceCards";
import CTA from "@/components/CTA";
import { buildPageMetadata } from "@/lib/metadata";
import "@/app/styles/home.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Highway Films - full-cycle video production",
  description:
    "Commercials, branded stories, corporate films, music videos, and AI visuals. End-to-end production from concept to final masters.",
  path: "/en",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
});

const metrics = [
  { value: "24h", label: "typical first response" },
  { value: "4K / 10-bit", label: "capture, grade, and post" },
  { value: "2", label: "home bases: Moscow and Saint Petersburg" },
];

const pillars = [
  {
    title: "Creative development",
    text: "We build treatment, visual logic, and a practical scenario before production starts eating the budget.",
  },
  {
    title: "Production discipline",
    text: "Crew, gear, schedule, and scope are shaped around the brief, not around generic studio packages.",
  },
  {
    title: "Post that lands",
    text: "Edit, grade, sound, graphics, and delivery versions are built to keep the project alive across platforms.",
  },
];

export default function HomePageEn() {
  return (
    <>
      <VideoHero
        title="Highway Films"
        subtitle="Commercials, brand films, corporate stories, and music videos."
        muteLabel="Unmute showreel"
        unmuteLabel="Mute showreel"
        headingAs="div"
      />

      <section className="container pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div>
            <p className="eyebrow">Studio manifesto</p>
            <h1 className="font-display heading-balance mt-4 max-w-4xl text-[clamp(2.55rem,5.7vw,5.1rem)] leading-[0.98] tracking-[-0.045em] text-white">
              We build films that feel like considered studio work, not another content treadmill.
            </h1>
          </div>

          <div>
            <p className="text-lg leading-8 text-white/68 md:text-[1.2rem]">
              Highway Films produces commercials, music videos, corporate stories, and AI-driven visuals end to end. The point is not only to look sharp, but to make the project structurally strong from brief to release.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/en/contacts" className="btn-primary h-12 rounded-full px-6">
                Discuss the project
              </Link>
              <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn h-12 rounded-full px-6">
                Message on Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[26px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-soft"
            >
              <p className="text-3xl font-semibold tracking-[-0.04em] text-white">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-white/60">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="font-display heading-balance mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
              Service lines that read like a production system, not a menu.
            </h2>
          </div>
          <p className="max-w-xl text-white/62">
            From performance commercials and branded films to music videos, wedding stories, and AI experiments that do not look like generic generation.
          </p>
        </div>
        <ServiceCards locale="en" />
      </section>

      <section className="container py-10 md:py-14">
        <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.4)]">
            <div className="relative min-h-[30rem] overflow-hidden rounded-[26px]">
              <Image
                src="/images/frames/f022.jpg"
                alt="Highway Films frame"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="eyebrow text-white/55">Approach</p>
                <h3 className="font-display heading-balance mt-2 text-3xl tracking-[-0.03em] text-white">
                  Strong visuals start long before the camera gets switched on.
                </h3>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-soft"
              >
                <h3 className="font-display text-xl text-white">{pillar.title}</h3>
                <p className="mt-3 max-w-2xl text-white/64">{pillar.text}</p>
              </div>
            ))}

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(255,255,255,0.04))] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-white/55">From brief to release</p>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/82">
                We can carry the project from the first idea to the final master and social cutdown package, so the work stays alive beyond a single launch moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to build something with sharper visual intent?"
        description="Send a short brief. We will return with treatment direction, timing, and a working budget frame."
        ctaLabel="Start the brief"
        href="/en/brief"
        note="We usually reply within one business day"
        locale="en"
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import CTA from "@/components/CTA";

const services = [
  {
    title: "Commercials",
    description: "High-converting product films, packshots, lifestyle stories, and motion for paid campaigns.",
    href: "/en/commercials",
  },
  {
    title: "Corporate video",
    description: "Company narratives, HR films, and presentation content for events or investor decks.",
    href: "/en/corporate",
  },
  {
    title: "Music videos",
    description: "Concept-driven music videos with direction, choreography, and full post-production.",
    href: "/en/music-videos",
  },
  {
    title: "Production services",
    description: "End-to-end support: creative, pre-production, filming, post, and delivery.",
    href: "/en/videoproduction",
  },
];

function ServiceGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <Link key={service.title} href={service.href} className="card p-5 hover:border-strong transition">
          <h3 className="text-lg font-medium">{service.title}</h3>
          <p className="mt-2 text-muted">{service.description}</p>
        </Link>
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Highway Films - full-cycle video production",
  description:
    "Commercials, corporate films, and music videos crafted end-to-end: concept, shoot, edit. Bold visuals with clear storytelling.",
};

export default function HomePageEn() {
  return (
    <>
      <VideoHero muteLabel="Unmute showreel" unmuteLabel="Mute showreel" />

      <section className="container py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-semibold">What we do</h2>
        <p className="lead measure mt-2">
          We plan, shoot, and finish films around clear business objectives. From idea to master delivery.
        </p>
        <div className="mt-6">
          <ServiceGrid />
        </div>
      </section>

      <section className="container pb-12 md:pb-16">
        <div className="card p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-semibold">Highway Films - full-service production studio</h3>
          <p className="mt-3 text-muted measure">
            We blend creativity with production discipline: 4K/10-bit capture, colour grading, VFX, and precise deliveries for any platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/en/videoproduction" className="btn">Production</Link>
            <Link href="/en/commercials" className="btn">Commercials</Link>
            <Link href="/en/corporate" className="btn">Corporate</Link>
            <Link href="/en/music-videos" className="btn">Music videos</Link>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to talk about your project?"
        description="Drop us a brief - we will prepare a proposal with timing and budget ranges."
        ctaLabel="Contact us"
        href="/en/contacts"
      />
    </>
  );
}


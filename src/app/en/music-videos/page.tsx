// app/en/music-videos/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Music Videos — Highway Films",
  description:
    "Idea → treatment → shoot → post. We combine lighting, locations and color grading to create a cinematic vibe for your track.",
};

/**
 * Replace with actual frame names from /public/images/frames/
 */
const frames = [
  "/images/frames/f001.jpg",
  "/images/frames/f002.jpg",
  "/images/frames/f003.jpg",
  "/images/frames/f004.jpg",
  "/images/frames/f005.jpg",
  "/images/frames/f006.jpg",
];

function ThumbStrip({ start = 0 }: { start?: number }) {
  const picks = [0, 1, 2].map((i) => frames[(start + i) % frames.length]);
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {picks.map((src) => (
        <div
          key={src}
          className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-white/10"
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function Card({
  title,
  desc,
  startThumb = 0,
}: {
  title: string;
  desc: string;
  startThumb?: number;
}) {
  return (
    <div className="card rounded-xl p-5 md:p-6 hover:-translate-y-0.5 transition">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{desc}</p>
      <ThumbStrip start={startThumb} />
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
        ●
      </span>
      <span className="text-sm text-muted leading-relaxed">{children}</span>
    </li>
  );
}

export default function MusicVideosPageEN() {
  return (
    <>
      {/* HERO */}
      <section className="container pt-12 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="h1 text-[clamp(32px,5vw,56px)] font-bold">
            Music Videos
          </h1>
          <p className="lead mt-4">
            We create music videos where idea, color and rhythm work for the
            artist. Locations, lighting and post-production come together to
            build a cinematic look and atmospheric vibe for the track.
          </p>
        </div>

        {/* Formats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card
            title="Creative / Treatment"
            desc="Concept and visual idea, moodboards, references, storyboard — all tailored to the track and artist’s image."
            startThumb={0}
          />
          <Card
            title="Shooting & Direction"
            desc="Lighting setups, staging, camera movement; steadicam/drone/track. Scenes crafted for key moments in the track."
            startThumb={1}
          />
          <Card
            title="Editing & Color"
            desc="Rhythmic editing in tempo, clip-style transitions and accents, cinematic color grading (up to 4K/10-bit)."
            startThumb={2}
          />
          <Card
            title="VFX / Titles"
            desc="Tracking, compositing, graphic inserts, neon/glow, end titles and covers for platforms."
            startThumb={3}
          />
        </div>
      </section>

      {/* Process & Inclusions */}
      <section className="container py-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card rounded-xl p-6">
            <h3 className="text-lg font-semibold">Process</h3>
            <ul className="mt-4 space-y-3">
              <Bullet>
                <b>Brief + track.</b> We dive into meaning, tempo, references and
                artist’s image.
              </Bullet>
              <Bullet>
                <b>Treatment.</b> Visual storyline, moodboards, props/costumes,
                budget and timing.
              </Bullet>
              <Bullet>
                <b>Shoot.</b> Lighting/camera/staging; dedicated setups for
                hooks and chorus.
              </Bullet>
              <Bullet>
                <b>Post.</b> Editing in rhythm, clip transitions, grading, VFX,
                titles.
              </Bullet>
              <Bullet>
                <b>Delivery.</b> Master and resizes for YouTube, VK, Shorts,
                Reels, TikTok.
              </Bullet>
            </ul>
          </div>

          <div className="card rounded-xl p-6">
            <h3 className="text-lg font-semibold">What’s included</h3>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              <li className="border-l border-white/10 pl-4">
                Location & art scouting; lighting plan and shotlist
              </li>
              <li className="border-l border-white/10 pl-4">
                Capture up to 4K/10-bit, drone/steadicam as needed
              </li>
              <li className="border-l border-white/10 pl-4">
                Editing, graphics, color, sound; covers and posters
              </li>
              <li className="border-l border-white/10 pl-4">
                Versions for YouTube, VK, Shorts/Reels/TikTok
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-10">
        <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 px-6 py-7 ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-xl font-semibold">Ready to discuss a video?</h3>
              <p className="text-muted mt-1">
                Send us your track and a couple of references — we’ll prepare a
                treatment and budget.
              </p>
            </div>
            <Link
              href="/en/contacts"
              className="btn btn-primary rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Discuss a Music Video
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-16">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10">
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              How much does a video cost and what affects the budget?
            </summary>
            <div className="mt-2 text-sm text-muted leading-relaxed">
              The budget depends on concept, number of locations, staging, crew
              size and equipment (lighting, moving camera, drone), plus the
              scope of post (VFX/graphics). After the brief and track, we send a
              treatment with budget range and timeline.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              What are the production timelines?
            </summary>
            <div className="mt-2 text-sm text-muted leading-relaxed">
              Typically 2–4 weeks: treatment and pre-production 5–7 days, shoot
              1–2 days, post 7–14 days. Express production is possible with a
              simplified concept.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Can we get vertical versions?
            </summary>
            <div className="mt-2 text-sm text-muted leading-relaxed">
              Yes. We plan the shoot for both horizontal and vertical (Shorts,
              Reels, TikTok) and deliver separate crops with shortened runtime.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Music rights and release?
            </summary>
            <div className="mt-2 text-sm text-muted leading-relaxed">
              Music rights remain with the rights holder. We deliver the master
              and, if requested, raw materials, plus help with covers/titles and
              preparing release assets.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

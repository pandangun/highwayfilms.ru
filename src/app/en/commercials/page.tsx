import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Commercial videos & product films — Highway Films",
  description:
    "High-converting videos for brands and marketplaces: packshot, lifestyle, UGC, and motion design. Creative combined with performance-focused storytelling.",
  alternates: { canonical: "https://highwayfilms.ru/en/commercials" },
};

function SectionHeader({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
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

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 md:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] bg-[radial-gradient(1200px_280px_at_0%_0%,rgba(124,58,237,.08),transparent_60%),radial-gradient(900px_220px_at_100%_100%,rgba(34,197,94,.08),transparent_60%),rgba(255,255,255,.03)]">
      <p className="font-semibold tracking-tight text-[clamp(2rem,1.2rem+3vw,3rem)] leading-[1.1]">
        {children}
      </p>
    </div>
  );
}

function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-6 text-center h-full">
      <div className="stat-value leading-tight">{value}</div>
      <div className="stat-label mt-1">{label}</div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-7 h-full">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="card p-6 relative flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/20 grid place-items-center font-semibold">
        {n}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="mt-1 text-muted">{text}</p>
      </div>
    </li>
  );
}

function AdTile({ src, tag, title }: { src: string; tag: string; title: string }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-base aspect-[16/10]">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover opacity-70 transition group-hover:opacity-85"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <span className="w-fit rounded-md bg-black/45 px-2 py-1 text-xs">{tag}</span>
        <h3 className="mt-2 text-lg font-medium leading-tight">{title}</h3>
      </div>
    </article>
  );
}

const tiles = [
  { src: "/images/ads/a01.jpg", tag: "Packshot", title: "Texture and layers for e-com" },
  { src: "/images/ads/a02.jpg", tag: "Lifestyle", title: "Product in a real-life scenario" },
  { src: "/images/ads/a03.jpg", tag: "UGC", title: "Native performance creatives" },
  { src: "/images/ads/a04.jpg", tag: "3D / Motion", title: "Feature highlights and animated cut-throughs" },
  { src: "/images/ads/a05.jpg", tag: "Food", title: "Steam, sauce, macro deliciousness" },
  { src: "/images/ads/a06.jpg", tag: "Beauty", title: "Premium textures and glossy lighting" },
];

export default function CommercialsEnPage() {
  return (
    <main className="container pt-header-safe pb-20">
      <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_420px] items-start">
        <div>
          <div className="eyebrow">Commercials</div>
          <h1 className="h1 mt-2">Commercial videos & product films</h1>
          <p className="lead measure mt-3">
            We combine creative storytelling with performance metrics. Packshot, lifestyle, UGC, motion design — all tailored for marketplaces and paid media.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/en/contacts" className="btn btn-primary">Request a proposal</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Chat on Telegram
            </a>
          </div>
        </div>
        <div className="grid gap-4">
          <Kpi value="300+" label="ad creatives produced" />
          <Kpi value="7–21 days" label="average turnaround" />
          <Kpi value="6 / 15 / 30" label="ready-to-run versions" />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader
          kicker="Focus"
          title="Formats that convert"
          lead="Every niche needs its own lighting scheme, textures, and way to spotlight benefits."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Feature title="Food & beverages" text="Slow motion, steam, drips, dynamic dolly moves. Appetite triggers on point." />
          <Feature title="Beauty & skincare" text="Textures, swatches, reflective glass and high-end lighting setups." />
          <Feature title="Gadgets & accessories" text="Animated callouts, 3D breakdowns and motion-driven feature highlights." />
          <Feature title="Apparel" text="Fabric texture, fit, movement. Vertical edits for social." />
          <Feature title="Home & decor" text="Lifestyle scenes: everyday utility, before / after, micro-scenarios." />
          <Feature title="Marketplace bundles" text="Series of 6–15 sec assets for product pages and retargeting." />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader
          kicker="Moodboard"
          title="Selected frames"
          lead="A snapshot of approaches we use for different markets."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tiles.map((tile) => (
            <AdTile key={tile.src} {...tile} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <Statement>Transparent process and predictable timing at every stage.</Statement>
        <div className="mt-6">
          <SectionHeader title="Workflow" />
        </div>
        <ol className="mt-6 grid gap-5 lg:grid-cols-2">
          <Step n={1} title="Brief → insight" text="Audience, offer, objections. We build a narrative order that sells." />
          <Step n={2} title="Pre-production" text="Treatment, mood boards, lighting, props, schedule, selling-point checklist." />
          <Step n={3} title="Production" text="Packshot plus lifestyle/UGC. Shooting in batches for A/B testing." />
          <Step n={4} title="Post" text="Edit → colour → motion → subtitles. Versions 6/15/30/60 in vertical & horizontal." />
        </ol>
      </section>

      <section className="mt-16">
        <SectionHeader
          kicker="Pricing approach"
          title="Packages"
          lead="We adapt to your goal and suggest 2–3 options across budget and timing."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="card p-7">
            <h3 className="text-lg font-semibold">Starter</h3>
            <p className="text-muted mt-1">Packshot + two short edits</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>Studio lighting setup</li>
              <li>6 / 15 sec vertical versions</li>
              <li>Subtitles, logo, final CTA</li>
            </ul>
          </div>
          <div className="card p-7 ring-1 ring-white/10">
            <h3 className="text-lg font-semibold">Growth</h3>
            <p className="text-muted mt-1">Packshot + lifestyle / UGC</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>3–5 selling points</li>
              <li>6 / 15 / 30 sec (vertical & horizontal)</li>
              <li>Still frames for product cards</li>
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="text-lg font-semibold">Brand+</h3>
            <p className="text-muted mt-1">Narrative + motion / 3D</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>Script and talent</li>
              <li>Motion graphics or 3D breakdowns</li>
              <li>Full set of platform-specific versions</li>
            </ul>
          </div>
        </div>
        <p className="text-muted mt-3 text-sm">
          Final cost depends on locations, shooting days, props and motion scope. We always quote several options.
        </p>
      </section>

      <section className="mt-16">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Ready to boost conversions?</div>
            <p className="text-muted mt-2">Send us key points and we will return with plan and timing today.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/en/contacts" className="btn btn-primary">Get in touch</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

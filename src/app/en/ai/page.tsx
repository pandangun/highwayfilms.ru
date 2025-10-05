import Link from "next/link";

export const metadata = {
  title: "AI-generated video & avatars - Highway Films",
  description:
    "We build AI-driven video experiences: virtual hosts, deepfake greetings, ad creatives and social avatars. Fast production with clear ethics.",
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{children}</p>
    </div>
  );
}

export default function AiEnPage() {
  return (
    <>
      <section className="container relative pt-12 md:pt-16">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] uppercase tracking-wider text-white/80">
            AI videos & avatars
          </span>
          <h1 className="h1 font-bold mt-4">AI-generated video and content</h1>
          <p className="lead mt-4 text-neutral-200">
            We harness state-of-the-art models to create videos that used to demand large crews. Virtual hosts, deepfake greetings, personalised messages and rapid ad creatives - built around your brief.
          </p>
          <div className="mt-6">
            <Link
              href="/en/contacts"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Share your idea
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-12 grid gap-6 md:grid-cols-2">
        <Card title="Virtual hosts & avatars">
          Digital presenters for broadcasts, product explainers or corporate updates. Scripted, voiced and animated in your style.
        </Card>
        <Card title="AI greetings">
          Personalised videos for employees, partners or clients that deliver a wow-effect without heavy production.
        </Card>
        <Card title="Ad creatives">
          Concept, voiceover and visuals generated and assembled into branded ads ready for social platforms.
        </Card>
        <Card title="Ethical deepfake solutions">
          We work within legal and ethical boundaries: impactful content without infringing personal or IP rights.
        </Card>
      </section>

      <section className="container py-12">
        <h2 className="mb-4 text-xl font-semibold">Examples</h2>
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
          <div className="flex gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative h-44 w-[260px] shrink-0 overflow-hidden rounded-xl border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/ai-samples/sample${i + 1}.jpg`}
                  alt="AI generated example"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-xl font-semibold mb-4">FAQ</h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">Can these videos be used in paid media?</summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Yes. We tailor outputs for the requirements of Meta*, VK, TikTok, YouTube and other platforms. (*Meta is banned in Russia.)
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">Is it legal?</summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              We run only ethical scenarios and never use someone else’s likeness without explicit permission.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">How much does an AI video cost?</summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Pricing depends on length, complexity and tools involved. Entry-level projects start around RUB20-30K.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}


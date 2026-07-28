import type { Metadata } from "next";
import StudioServicePage from "@/components/StudioServicePage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Video production in Moscow and Saint Petersburg - Highway Films",
  description:
    "Full-cycle video production: creative development, pre-production, filming, post-production, and delivery packages across platforms.",
  path: "/en/videoproduction",
  locale: "en",
  imagePath: "/video/derived/hero-poster.jpg",
});

export default function VideoProductionEnPage() {
  return (
    <StudioServicePage
      hero={{
        eyebrow: "Highway Films",
        title: "A full-cycle studio in Moscow and Saint Petersburg",
        lead:
          "We handle the full arc: from concept and treatment through final masters, adaptations, and delivery. The process is structured so creative, filming, and post support each other instead of pulling apart.",
        primaryHref: "/en/contacts",
        primaryLabel: "Discuss the project",
        secondaryHref: "https://t.me/highwayfilms",
        secondaryLabel: "Telegram",
        chips: ["Creative", "Pre-production", "Filming", "Post-production"],
        metrics: [
          { value: "10+ years", label: "inside studio systems" },
          { value: "250+", label: "films delivered" },
          { value: "4K / 10-bit", label: "capture pipeline" },
        ],
        panelEyebrow: "Full-cycle studio",
        panelTitle: "One team, one visual logic.",
        panelCopy:
          "We structure projects so treatment, filming, and post behave like one system instead of three disconnected stages.",
        imageSrc: "/video/derived/hero-poster.jpg",
        imageAlt: "Highway Films still frame",
      }}
      statement="A strong project does not start with camera rental. It starts when the idea, timing, and budget are assembled into one workable architecture."
      offerings={{
        eyebrow: "Capabilities",
        title: "What we handle inside the cycle",
        lead: "We can join at the idea stage or pick up an already defined brief and carry it through release.",
        items: [
          {
            title: "Creative development",
            text: "Treatment, structure, moodboard, storyboard, and visual logic before the project enters pre-production.",
          },
          {
            title: "Pre-production",
            text: "Casting, locations, props, schedule, technical plan, and production design shaped to the real scale of the brief.",
          },
          {
            title: "Filming",
            text: "Crew, camera, lighting, sound, drone, staging, and quality control on set, not only after the fact.",
          },
          {
            title: "Post-production",
            text: "Edit, colour, sound, VFX, graphics, subtitles, and platform-ready versions without losing the project’s tone.",
          },
        ],
      }}
      gallery={{
        eyebrow: "Moodboard",
        title: "Range of visual outcomes",
        lead: "From brand films and interviews to industrial, lifestyle, and performance work.",
        items: [
          { src: "/images/frames/f001.jpg", tag: "Brand", title: "High-density visuals for image-driven films" },
          { src: "/images/frames/f004.jpg", tag: "Corporate", title: "Clear presentation of processes and spaces" },
          { src: "/images/frames/f022.jpg", tag: "Performance", title: "Rhythm, mood, and editorial energy" },
        ],
      }}
      workflow={{
        eyebrow: "Workflow",
        title: "How we run the project",
        lead: "Transparent process and clear control points at every stage.",
        items: [
          {
            title: "Brief and hypothesis",
            text: "We map goals, audience, KPI, and final format. This is where the narrative and working model get defined.",
          },
          {
            title: "Preparation",
            text: "We lock treatment, crew, schedule, locations, and technical logic so the process does not fall apart later.",
          },
          {
            title: "Filming",
            text: "Set, lighting, camera, sound, and safety coverage are managed with quality control built into the shoot itself.",
          },
          {
            title: "Post and delivery",
            text: "Edit, grade, sound, graphics, and final delivery packages for web, social, presentation, and media-buy use cases.",
          },
        ],
      }}
      deliverables={{
        title: "What the client gets",
        groups: [
          {
            title: "Core output",
            items: [
              "Main film or hero cut in master quality",
              "Adaptations for vertical, horizontal, and short-form use",
              "Preview assets, covers, and support materials",
            ],
          },
          {
            title: "Project structure",
            items: [
              "Budget, calendar, and production framework",
              "A sane approval path instead of chaotic revisions",
              "Final handoff of materials and files by agreement",
            ],
          },
        ],
      }}
      faq={{
        title: "FAQ",
        items: [
          {
            question: "Can you join only for post?",
            answer: "Yes. But the strongest results usually happen when treatment, filming, and post are designed as one system.",
          },
          {
            question: "How long does a full cycle take?",
            answer: "Fast formats can land in 1-2 weeks. Heavier projects usually take 3-6 weeks depending on scope.",
          },
          {
            question: "Do you only work in Moscow and Saint Petersburg?",
            answer: "Those are our bases, but we travel across Russia and scale crews to the geography of the project.",
          },
          {
            question: "Can one shoot feed several versions?",
            answer: "Yes. We plan for that in preparation so one shooting day can generate multiple durations and platform formats.",
          },
        ],
      }}
      closing={{
        title: "Need a team that won’t fall apart between concept and release?",
        description: "Send the brief and a sense of scale. We will come back with a working pipeline, timing, and budget structure.",
        ctaLabel: "Start the conversation",
        href: "/en/contacts",
        note: "You can come with a raw idea or with a fully written brief",
      }}
    />
  );
}

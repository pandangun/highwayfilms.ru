import type { Metadata } from "next";
import StudioServicePage from "@/components/StudioServicePage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Corporate and presentation video - Highway Films",
  description:
    "Company, manufacturing, HR, and presentation films. Corporate video that explains business value without looking bureaucratic.",
  path: "/en/corporate",
  locale: "en",
  imagePath: "/images/frames/f004.jpg",
});

export default function CorporateEnPage() {
  return (
    <StudioServicePage
      hero={{
        eyebrow: "Corporate",
        title: "Corporate and presentation video",
        lead:
          "We create films for companies that need to explain product, process, expertise, or brand position clearly. Not bureaucratic, not stale, but structured and visually controlled.",
        primaryHref: "/en/contacts",
        primaryLabel: "Request a quote",
        secondaryHref: "https://t.me/highwayfilms",
        secondaryLabel: "Telegram",
        chips: ["Company film", "Investor deck", "HR / EVP", "Presentation loops"],
        metrics: [
          { value: "10+ years", label: "in production-led business content" },
          { value: "50+", label: "corporate projects delivered" },
          { value: "2", label: "base cities" },
        ],
        panelEyebrow: "Structure + clarity",
        panelTitle: "Video that answers questions before the meeting starts.",
        panelCopy:
          "For presentations, investors, HR, and internal communication. Built to explain, persuade, and strengthen trust.",
        imageSrc: "/images/frames/f004.jpg",
        imageAlt: "Highway Films corporate still",
      }}
      statement="Corporate video does not have to feel dry. It should be visually clean, structurally clear, and strong enough to hold attention."
      offerings={{
        eyebrow: "Formats",
        title: "Where this works",
        lead: "We design the film around the real use case, not around a vague request for something ‘about the company’.",
        items: [
          {
            title: "Company and manufacturing films",
            text: "We show infrastructure, people, process, and expertise in a way that makes scale and competence immediately legible.",
          },
          {
            title: "Trade-show and presentation video",
            text: "Looping films for booths, screen content for talks, and concise visual assets that read clearly even in noisy environments.",
          },
          {
            title: "HR and internal communications",
            text: "Welcome videos, onboarding, EVP messaging, report films, and internal stories for teams and leadership.",
          },
          {
            title: "Interviews and case stories",
            text: "Executives, experts, clients, and partners on camera when the goal is trust, proof, and lived experience.",
          },
        ],
      }}
      gallery={{
        eyebrow: "Visual tone",
        title: "Presentation without office fatigue",
        lead: "Architecture, processes, portraits, and detail work inside one clean language.",
        items: [
          { src: "/images/frames/f004.jpg", tag: "Space", title: "Spaces and processes read immediately" },
          { src: "/images/frames/f011.jpg", tag: "Portrait", title: "People look composed instead of stiff" },
          { src: "/images/frames/f018.jpg", tag: "Details", title: "Product and infrastructure details build trust" },
        ],
      }}
      workflow={{
        eyebrow: "Workflow",
        title: "How we build a corporate project",
        lead: "Messages, narrative order, and approval points get defined before production begins.",
        items: [
          {
            title: "Brief and message",
            text: "We define who the film speaks to and what it needs to clarify: client, partner, employee, investor, or event audience.",
          },
          {
            title: "Structure and prep",
            text: "We build the narrative spine, talking points, cast list, locations, process coverage, and key inserts.",
          },
          {
            title: "Production",
            text: "Interviews, b-roll, spaces, and process footage are captured with enough flexibility to make editorial decisions later.",
          },
          {
            title: "Edit and delivery",
            text: "We assemble the hero version, short adaptations, silent-friendly cuts, subtitles, and graphics when needed.",
          },
        ],
      }}
      deliverables={{
        title: "What the company gets",
        groups: [
          {
            title: "Video package",
            items: [
              "Main version tailored to the primary use case",
              "Adaptations for web, social, presentations, or screen playback",
              "Subtitles, lower-thirds, and preview frames when needed",
            ],
          },
          {
            title: "Project clarity",
            items: [
              "Clear budget and production phases",
              "A sane approval path instead of revision chaos",
              "Shared understanding of what is being filmed and why",
            ],
          },
        ],
      }}
      faq={{
        title: "FAQ",
        items: [
          {
            question: "Can one production cycle cover interviews and process footage?",
            answer: "Yes. That is usually the most efficient model: one production closes several communication scenarios at once.",
          },
          {
            question: "Can this work for trade shows and silent screen environments?",
            answer: "Yes. We build silent-friendly versions with visual structure and graphics so the film does not rely only on voiceover.",
          },
          {
            question: "Do employees need coaching before filming?",
            answer: "Yes, but not in an overly formal way. We give a clear frame in advance and help people feel natural on camera.",
          },
          {
            question: "Can one film be adapted for both HR and external communication?",
            answer: "Yes. If planned early, one project can generate several working versions with different emphasis.",
          },
        ],
      }}
      closing={{
        title: "Need a film that explains the business without feeling like corporate wallpaper?",
        description: "Send the task, platform, and audience. We will build the film structure, timing, and estimate.",
        ctaLabel: "Discuss a corporate project",
        href: "/en/contacts",
        note: "Useful for HR, trade shows, investor decks, and internal communication",
      }}
    />
  );
}

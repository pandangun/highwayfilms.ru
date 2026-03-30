import type { Metadata } from "next";
import StudioServicePage from "@/components/StudioServicePage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI video and generative production - Highway Films",
  description:
    "AI-driven video, virtual hosts, deepfake greetings, and generative brand content. Fast production with a clear ethical framework.",
  path: "/en/ai",
  locale: "en",
  imagePath: "/images/ads/a06.jpg",
});

export default function AiEnPage() {
  return (
    <StudioServicePage
      hero={{
        eyebrow: "AI / CGI",
        title: "AI video and generative production",
        lead:
          "We use current models as production tools: for rapid ad concepts, virtual hosts, stylised visuals, personalised messages, and generative inserts inside live-action projects.",
        primaryHref: "/en/contacts",
        primaryLabel: "Discuss an AI brief",
        secondaryHref: "https://t.me/highwayfilms",
        secondaryLabel: "Telegram",
        chips: ["Virtual hosts", "AI ads", "Deepfake greetings", "Generative visuals"],
        metrics: [
          { value: "RUB20-30K", label: "entry point for starter tasks" },
          { value: "1-5 days", label: "rapid prototypes and tests" },
          { value: "Ethical", label: "we stay inside safe scenarios" },
        ],
        panelEyebrow: "Speed + experimentation",
        panelTitle: "Generation as part of production, not as a gimmick.",
        panelCopy:
          "We use AI where it materially shortens the path to a result: faster pre-production, cheaper testing, and new visual territory when it is genuinely useful.",
        imageSrc: "/images/ads/a06.jpg",
        imageAlt: "Highway Films AI visual",
      }}
      statement="AI alone does not make a project strong. The strength comes from how generation is embedded into the brief, visual logic, and real use case."
      offerings={{
        eyebrow: "Formats",
        title: "What we can build",
        lead: "From fast commercial testing to virtual characters and stylised scenes that would be expensive or awkward to shoot traditionally.",
        items: [
          {
            title: "Virtual hosts and avatars",
            text: "Digital presenters for explainers, learning content, branded messages, and internal communication.",
          },
          {
            title: "AI ad creatives",
            text: "Generative scenes, products, environments, and concept-led social assets for fast campaign launches.",
          },
          {
            title: "Personalised greetings",
            text: "Short wow-effect videos for employees, partners, or clients when you need impact without heavy production overhead.",
          },
          {
            title: "Hybrid projects and generative inserts",
            text: "We fold AI into a normal production pipeline through background plates, stylised inserts, previs, or transition systems.",
          },
        ],
      }}
      gallery={{
        eyebrow: "Examples",
        title: "The visual experimentation zone",
        lead: "We combine existing assets and generative layers into one deliberate presentation.",
        items: [
          { src: "/images/ads/a01.jpg", tag: "Ad", title: "Fast campaign prototypes and social concepts" },
          { src: "/images/ads/a05.jpg", tag: "Stylized", title: "Mood and texture without heavy physical setups" },
          { src: "/images/ads/a06.jpg", tag: "Avatar", title: "AI-led visuals that avoid the cheap-generation look" },
        ],
      }}
      workflow={{
        eyebrow: "Workflow",
        title: "How we approach AI work",
        lead: "We do not throw random prompts at the wall. We define the role of AI inside the brief first.",
        items: [
          {
            title: "Use case and frame",
            text: "We define whether AI is there for speed, personalisation, lower production cost, unusual style, or all of the above.",
          },
          {
            title: "Concept and safety",
            text: "Visual logic, references, tone, and ethical boundaries are locked before generation starts.",
          },
          {
            title: "Generation and assembly",
            text: "We create scenes, voices, characters, or inserts and then shape the results into an editorial form that actually works.",
          },
          {
            title: "Post and delivery",
            text: "Edit, sound, titling, grade, and final exports are refined so the work does not feel like a raw generative pipeline.",
          },
        ],
      }}
      faq={{
        title: "FAQ",
        items: [
          {
            question: "Is this legal?",
            answer: "We only work inside ethical scenarios and do not use someone else’s face, voice, or assets without the required rights and permissions.",
          },
          {
            question: "Is AI only useful for low-budget projects?",
            answer: "No. It is useful for rapid tests and also inside larger hybrid productions when the brief benefits from unusual visual territory.",
          },
          {
            question: "Can live-action and generation be combined?",
            answer: "Yes. That is one of the most interesting setups: real footage strengthened by generative inserts and environments.",
          },
          {
            question: "How quickly can we get a first result?",
            answer: "Prototypes and tests usually land within 1-5 days. Final timing depends on scene complexity, character work, and version count.",
          },
        ],
      }}
      closing={{
        title: "Need to test an idea fast or build a stranger AI-driven world for a brand?",
        description: "Send the scenario and the intended effect. We will tell you where AI genuinely helps and where classic production is still the better tool.",
        ctaLabel: "Start an AI brief",
        href: "/en/contacts",
        note: "Useful for campaign tests, presentations, greetings, and hybrid commercial work",
      }}
    />
  );
}

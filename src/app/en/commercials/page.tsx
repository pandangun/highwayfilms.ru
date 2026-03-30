import type { Metadata } from "next";
import StudioServicePage from "@/components/StudioServicePage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial videos and product films - Highway Films",
  description:
    "Commercial films for brands and marketplaces: packshot, lifestyle, UGC, and motion-led formats built for performance and brand value.",
  path: "/en/commercials",
  locale: "en",
  imagePath: "/images/ads/a01.jpg",
});

export default function CommercialsEnPage() {
  return (
    <StudioServicePage
      hero={{
        eyebrow: "Commercials",
        title: "Commercial videos and product films",
        lead:
          "We produce commercial content for brands and marketplaces: packshot, lifestyle, UGC, and motion-driven ad systems. The goal is not only to look polished, but to make the product legible, desirable, and launch-ready.",
        primaryHref: "/en/contacts",
        primaryLabel: "Request a proposal",
        secondaryHref: "https://t.me/highwayfilms",
        secondaryLabel: "Telegram",
        chips: ["Packshot", "Lifestyle", "UGC", "Performance edits"],
        metrics: [
          { value: "200+", label: "commercial assets delivered" },
          { value: "7-21 days", label: "typical production window" },
          { value: "6 / 15 / 30", label: "ready-to-run durations" },
        ],
        panelEyebrow: "Creative + conversion",
        panelTitle: "Visuals with commercial tension.",
        panelCopy:
          "We design films so the product reads quickly, feels premium, and performs across paid media, product pages, and launches.",
        imageSrc: "/images/ads/a01.jpg",
        imageAlt: "Highway Films commercial still",
      }}
      statement="Good advertising should not feel like generic content. It should communicate value fast and do it in a visual language the brand can actually own."
      offerings={{
        eyebrow: "Formats",
        title: "What we put into motion",
        lead: "Each product category and platform needs a different rhythm, lighting logic, and delivery system.",
        items: [
          {
            title: "Packshot and product focus",
            text: "Precise product films, textures, macro, and motion polish for e-commerce, landing pages, and brand launches.",
          },
          {
            title: "Lifestyle stories",
            text: "The product inside a believable world: utility, context, emotion, and a stronger reason to care.",
          },
          {
            title: "UGC and performance creatives",
            text: "Native-feeling assets and fast-cut variations for testing, retargeting, and social-first conversion work.",
          },
          {
            title: "Motion / 3D accents",
            text: "Animated feature highlights, explainers, and premium cues that help the product feel more engineered and more expensive.",
          },
        ],
      }}
      gallery={{
        eyebrow: "Visual language",
        title: "A few ways this can look",
        lead: "From sterile e-commerce to richer lifestyle treatment.",
        items: [
          { src: "/images/ads/a01.jpg", tag: "Packshot", title: "Texture and depth for product-led films" },
          { src: "/images/ads/a05.jpg", tag: "Food", title: "Macro detail and appetite triggers" },
          { src: "/images/ads/a06.jpg", tag: "Beauty", title: "Glossy lighting and premium surface work" },
        ],
      }}
      workflow={{
        eyebrow: "Workflow",
        title: "How we move the project",
        lead: "One working logic from the brief through exports. No split between creative ambition and delivery reality.",
        items: [
          {
            title: "Brief and positioning",
            text: "We define audience, offer, platforms, and commercial priority. This is where we decide what sells through emotion and what sells through proof.",
          },
          {
            title: "Pre-production and treatment",
            text: "Moodboards, lighting logic, shotlist, props, and platform deliverables are shaped before the camera day.",
          },
          {
            title: "Production and control",
            text: "We shoot in content batches, already accounting for verticals, horizontals, and adaptation-safe coverage.",
          },
          {
            title: "Post and delivery",
            text: "Edit, grade, graphics, subtitles, and final packages for e-commerce, social, performance media, and brand launches.",
          },
        ],
      }}
      deliverables={{
        title: "What the brand gets",
        groups: [
          {
            title: "Content package",
            items: [
              "Main film and short cutdown edits",
              "Vertical and horizontal delivery formats",
              "Still frames and cover images for product pages and social",
            ],
          },
          {
            title: "Production structure",
            items: [
              "Clear budget and working calendar",
              "Crew and gear scaled to the actual need, not to studio theatre",
              "2-3 production options across budget and timing",
            ],
          },
        ],
      }}
      faq={{
        title: "FAQ",
        items: [
          {
            question: "How much does a commercial film cost?",
            answer: "It depends on format, number of versions, locations, props, and post scope. We usually offer several budget paths.",
          },
          {
            question: "Can you deliver for marketplaces and social at the same time?",
            answer: "Yes. We specifically design shoots so the material can work across product pages, paid media, and organic distribution.",
          },
          {
            question: "Do you only work with large brands?",
            answer: "No. The important part is a clear objective and a willingness to avoid generic-looking work.",
          },
          {
            question: "Can you add motion or AI-enhanced post?",
            answer: "Yes. When it improves the idea or shortens the launch path, we integrate motion, compositing, and AI-supported post tools.",
          },
        ],
      }}
      closing={{
        title: "Need a film that works for both brand value and metrics?",
        description: "Send a few notes or the product link. We will return with a treatment direction and a practical estimate.",
        ctaLabel: "Discuss commercials",
        href: "/en/contacts",
        note: "You can include product-page links or references right away",
      }}
    />
  );
}

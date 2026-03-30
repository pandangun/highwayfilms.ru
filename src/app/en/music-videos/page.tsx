import type { Metadata } from "next";
import StudioServicePage from "@/components/StudioServicePage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Music videos — Highway Films",
  description:
    "Music videos with treatment, direction, filming, grade, and post. We build atmosphere, rhythm, and a visual world around the artist.",
  path: "/en/music-videos",
  locale: "en",
  imagePath: "/images/frames/f022.jpg",
});

export default function MusicVideosEnPage() {
  return (
    <StudioServicePage
      hero={{
        eyebrow: "Music videos",
        title: "Music videos",
        lead:
          "We create videos where concept, light, edit rhythm, and colour build one coherent world around the artist. We can join from treatment and visual concept through final master and release-ready versions.",
        primaryHref: "/en/contacts",
        primaryLabel: "Discuss a video",
        secondaryHref: "https://t.me/highwayfilms",
        secondaryLabel: "Telegram",
        chips: ["Treatment", "Direction", "Filming", "Post / VFX"],
        metrics: [
          { value: "2-4 weeks", label: "typical production cycle" },
          { value: "4K / 10-bit", label: "capture and grade" },
          { value: "Shorts / Reels", label: "release adaptations" },
        ],
        panelEyebrow: "Image + rhythm",
        panelTitle: "A video as a visual world, not just a cover performance.",
        panelCopy:
          "We build around the energy of the track and the artist’s image, not around random effects or disconnected pretty shots.",
        imageSrc: "/images/frames/f022.jpg",
        imageAlt: "Highway Films music video still",
      }}
      statement="A strong music video does more than cut nicely to the beat. It gives the artist a visual language you can read before the first chorus lands."
      offerings={{
        eyebrow: "Formats",
        title: "What we can build",
        lead: "From intimate performance pieces to staged concepts with VFX and stronger visual worldbuilding.",
        items: [
          {
            title: "Treatment and visual concept",
            text: "Moodboards, references, narrative logic, frame rhythm, and a map of visual anchors for the track.",
          },
          {
            title: "Staged production",
            text: "Locations, lighting, camera, movement, art direction, and scenography tuned to the right emotion and scale.",
          },
          {
            title: "Performance and portrait-led formats",
            text: "When presence matters more than plot: artist energy, movement, frame plasticity, and image-forward staging.",
          },
          {
            title: "Edit, grade, and VFX",
            text: "Rhythmic editing, transitions, colour worlds, graphic or VFX inserts, titles, and release-ready versions.",
          },
        ],
      }}
      gallery={{
        eyebrow: "Moodboard",
        title: "Tone and atmosphere",
        lead: "Close portraits, backlight, fashion language, and cinematic space.",
        items: [
          { src: "/images/frames/f001.jpg", tag: "Portrait", title: "Face and emotion as the magnetic centre" },
          { src: "/images/frames/f022.jpg", tag: "Performance", title: "Movement and style inside one rhythm" },
          { src: "/images/frames/f028.jpg", tag: "Atmosphere", title: "Light and environment as part of the music image" },
        ],
      }}
      workflow={{
        eyebrow: "Workflow",
        title: "How we move from track to video",
        lead: "We read the energy and the image first, then build the production logic.",
        items: [
          {
            title: "Track and brief",
            text: "We map tempo, mood, meaning, references, and the public image of the artist.",
          },
          {
            title: "Treatment and prep",
            text: "Concept, locations, styling, props, shoot structure, and budget frame are locked before production.",
          },
          {
            title: "Production",
            text: "We capture performance, narrative blocks, and enough coverage for edit rhythm, verticals, and release cutdowns.",
          },
          {
            title: "Post and release package",
            text: "Edit, grade, sound, graphics, previews, covers, and adaptations for YouTube, VK, Shorts, Reels, and TikTok.",
          },
        ],
      }}
      faq={{
        title: "FAQ",
        items: [
          {
            question: "Can this work on a smaller budget?",
            answer: "Yes. The key is deciding where to hold the focus: performance, lighting, edit rhythm, or one strong visual device.",
          },
          {
            question: "Do you only do staged concepts?",
            answer: "No. We can build around raw artist energy as well as more narrative-driven structures.",
          },
          {
            question: "Can vertical versions be planned from the start?",
            answer: "Yes. We plan the shoot so the release can live in YouTube and in short social formats at the same time.",
          },
          {
            question: "How long does a project take?",
            answer: "Usually 2-4 weeks. Faster is possible when the concept is compact and does not need heavy prep or VFX.",
          },
        ],
      }}
      closing={{
        title: "Have the track and want to build an actual visual world around it?",
        description: "Send the demo, references, or even just the mood. We will come back with treatment direction and a production frame.",
        ctaLabel: "Start the video discussion",
        href: "/en/contacts",
        note: "You can come with a track, a moodboard, or just a feeling of how it should land visually",
      }}
    />
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const items = {
  ru: [
    {
      title: "Рекламные ролики",
      desc: "Продуктовые ролики, версии для соцсетей и брендовый визуал с понятной коммерческой логикой.",
      href: "/commercials",
      image: "/images/ads/a01.jpg",
      tag: "Реклама",
    },
    {
      title: "Корпоративное видео",
      desc: "Фильмы о компании, презентационные ролики, HR-коммуникации и истории про процессы.",
      href: "/corporate",
      image: "/images/frames/f004.jpg",
      tag: "Корпоративное",
    },
    {
      title: "Музыкальные клипы",
      desc: "Концепт, постановка, атмосфера и постпродакшн, которые собирают цельный артистический мир.",
      href: "/music-videos",
      image: "/images/frames/f022.jpg",
      tag: "Клипы",
    },
    {
      title: "Полный цикл",
      desc: "Замысел, препрод, съёмка, пост и адаптации под площадки внутри одной рабочей системы.",
      href: "/contacts",
      image: "/video/derived/hero-poster.jpg",
      tag: "Студия",
    },
  ],
  en: [
    {
      title: "Commercials",
      desc: "Product films, paid-media creatives, and brand visuals with a clear commercial point.",
      href: "/en/commercials",
      image: "/images/ads/a01.jpg",
      tag: "Commercials",
    },
    {
      title: "Corporate video",
      desc: "Company stories, presentation films, HR communication, and process-led storytelling.",
      href: "/en/corporate",
      image: "/images/frames/f004.jpg",
      tag: "Corporate",
    },
    {
      title: "Music videos",
      desc: "Concept, staging, atmosphere, and post that build a consistent world around the artist.",
      href: "/en/music-videos",
      image: "/images/frames/f022.jpg",
      tag: "Music",
    },
    {
      title: "Full cycle",
      desc: "Creative development, prep, filming, post, and delivery inside one working system.",
      href: "/en/contacts",
      image: "/video/derived/hero-poster.jpg",
      tag: "Studio",
    },
  ],
} as const;

export default function ServiceCards({ locale = "ru" }: { locale?: "ru" | "en" }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items[locale].map((item, index) => (
        <Link
          key={item.title}
          href={item.href}
          className={`service-card group surface-panel relative overflow-hidden p-3 reveal-up ${
            index === 0 ? "delay-1" : index === 1 ? "delay-2" : index === 2 ? "delay-3" : "delay-4"
          }`}
        >
          <div className="relative min-h-[21rem] overflow-hidden rounded-none">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition duration-300 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            <div className="service-card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="service-card-glow absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(214,183,138,0.1),transparent_42%)] opacity-75 transition duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="w-fit rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/72 transition group-hover:border-white/25 group-hover:bg-black/30 group-hover:text-white/88">
                {item.tag}
              </span>
              <div>
                <div className="mb-3 rule-fade max-w-24" />
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl leading-tight text-white transition duration-300 group-hover:translate-y-[-1px]">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-white/45 transition duration-300 group-hover:translate-x-1 group-hover:translate-y-[-1px] group-hover:text-white/80" />
                </div>
                <p className="mt-3 max-w-[22rem] text-sm leading-6 text-white/68 transition duration-300 group-hover:text-white/78">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

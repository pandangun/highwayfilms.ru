import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

type Locale = "ru" | "en";

type ClipCard = {
  artist: string;
  title: string;
  poster: string;
  tag: string;
  alt: string;
  sizes: string;
  className?: string;
  delayClass?: string;
};

type ProcessStep = {
  index: string;
  title: string;
  text: string;
};

type MusicVideosContent = {
  eyebrow: string;
  title: string;
  lead: string;
  chips: string[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  featured: {
    kicker: string;
    artist: string;
    title: string;
    note: string;
    poster: string;
    alt: string;
    href: string;
    hrefLabel: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    lead: string;
    items: ClipCard[];
  };
  production: {
    eyebrow: string;
    title: string;
    lead: string;
    poster: string;
    alt: string;
    bullets: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    items: ProcessStep[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    label: string;
    note: string;
  };
};

const contentByLocale: Record<Locale, MusicVideosContent> = {
  ru: {
    eyebrow: "Музыкальные клипы",
    title: "Снимаем клипы, где музыка превращается в визуальный мир.",
    lead:
      "Не набрасываем случайные красивые кадры поверх трека. Собираем клип как цельную среду: образ артиста, свет, монтажный ритм, фактуру пространства и релизную логику.",
    chips: ["Концепция", "Режиссура", "Съёмка", "Монтаж", "Color"],
    primaryHref: "/contacts",
    primaryLabel: "Обсудить проект",
    secondaryHref: "https://t.me/highwayfilms",
    secondaryLabel: "Telegram",
    featured: {
      kicker: "Featured case",
      artist: "HIGHWAY SESSION",
      title: "Night Signal",
      note: "Постерный кейс. Сам ролик и private preview можно открыть по запросу без autoplay и без тяжёлой загрузки страницы.",
      poster: "/images/frames/f022.jpg",
      alt: "Постер музыкального клипа Highway Films",
      href: "/contacts",
      hrefLabel: "Запросить private preview",
    },
    gallery: {
      eyebrow: "Selected clips",
      title: "Шахматная галерея вместо ровной CMS-сетки.",
      lead:
        "Карточки работают как editorial layout: разный масштаб, воздух между постерами, тёмный overlay и акцент на артисте и названии трека.",
      items: [
        {
          artist: "Astra Vale",
          title: "Fever Glass",
          poster: "/images/frames/f001.jpg",
          tag: "Portrait",
          alt: "Постер клипа Astra Vale",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 34vw",
          className: "lg:col-span-2 lg:row-span-2",
          delayClass: "delay-1",
        },
        {
          artist: "Mira North",
          title: "Cold Bloom",
          poster: "/images/frames/f028.jpg",
          tag: "Atmosphere",
          alt: "Постер клипа Mira North",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 42vw",
          className: "lg:col-span-4 lg:row-span-1",
          delayClass: "delay-2",
        },
        {
          artist: "Vanta",
          title: "Static Skin",
          poster: "/images/frames/f006.jpg",
          tag: "Performance",
          alt: "Постер клипа Vanta",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 24vw",
          className: "lg:col-span-2 lg:row-span-1",
          delayClass: "delay-3",
        },
        {
          artist: "Nox Echo",
          title: "Red Corridor",
          poster: "/images/frames/f018.jpg",
          tag: "Light",
          alt: "Постер клипа Nox Echo",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 24vw",
          className: "lg:col-span-2 lg:row-span-2",
        },
        {
          artist: "Kite Room",
          title: "Neon Prayer",
          poster: "/images/frames/f031.jpg",
          tag: "Editorial",
          alt: "Постер клипа Kite Room",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 24vw",
          className: "lg:col-span-2 lg:col-start-2 lg:row-span-1",
        },
        {
          artist: "Silver Tide",
          title: "Slow Fire",
          poster: "/images/frames/f032.jpg",
          tag: "Release",
          alt: "Постер клипа Silver Tide",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 34vw",
          className: "lg:col-span-3 lg:row-span-1",
        },
      ],
    },
    production: {
      eyebrow: "Съёмочная площадка",
      title: "Кинематографичный продакшн строится не только в кадре, но и между дублями.",
      lead:
        "Подготовка света, перестановки, ритм команды, короткие проверки, запас под монтаж и контроль над фактурой пространства. Именно это потом чувствуется в готовом клипе.",
      poster: "/images/frames/f031.jpg",
      alt: "Съёмочная площадка музыкального клипа",
      bullets: ["Концепция", "Съёмка", "Постпродакшн"],
    },
    process: {
      eyebrow: "Process",
      title: "Короткий и понятный маршрут проекта.",
      lead:
        "Без распухшей структуры страницы и без лишних маркетинговых блоков: только то, что реально влияет на клип и на релиз.",
      items: [
        {
          index: "01",
          title: "Трек и образ",
          text: "Снимаем смысл, темп, публичный образ артиста и референсы, чтобы понять не только настроение, но и зрительский ракурс.",
        },
        {
          index: "02",
          title: "Treatment и продакшн-схема",
          text: "Собираем визуальный язык, площадку, свет, стайлинг, тайминг и объём съёмки под реальную задачу и бюджет.",
        },
        {
          index: "03",
          title: "Съёмка и запас под монтаж",
          text: "Работаем не только на один красивый проход, а на материал, который потом держит ритм, вертикали и релизные версии.",
        },
        {
          index: "04",
          title: "Монтаж, color, release package",
          text: "Собираем финальный клип, короткие версии, обложки и релизные адаптации без лишней пересборки на посте.",
        },
      ],
    },
    cta: {
      eyebrow: "Final CTA",
      title: "Есть трек, демо или просто ощущение будущего клипа?",
      description:
        "Присылай музыку, moodboard или короткий набросок. Вернёмся с treatment-направлением, производственной рамкой и следующим шагом без лишней перегрузки.",
      href: "/contacts",
      label: "Запустить обсуждение",
      note: "Видео на этой странице не автозагружаются: только постеры и лёгкие карточки, чтобы страница оставалась быстрой.",
    },
  },
  en: {
    eyebrow: "Music videos",
    title: "We shoot videos where music turns into a visual world.",
    lead:
      "Not random pretty footage layered on top of a track. We build the video as one coherent environment: artist image, lighting, editorial rhythm, spatial texture, and release logic.",
    chips: ["Treatment", "Direction", "Filming", "Edit", "Color"],
    primaryHref: "/en/contacts",
    primaryLabel: "Discuss the project",
    secondaryHref: "https://t.me/highwayfilms",
    secondaryLabel: "Telegram",
    featured: {
      kicker: "Featured case",
      artist: "HIGHWAY SESSION",
      title: "Night Signal",
      note: "Poster-first case card. The full reel or private preview can be shared on request without autoplay and without loading heavy video into the page.",
      poster: "/images/frames/f022.jpg",
      alt: "Highway Films featured music video poster",
      href: "/en/contacts",
      hrefLabel: "Request private preview",
    },
    gallery: {
      eyebrow: "Selected clips",
      title: "An editorial clip wall instead of a flat CMS grid.",
      lead:
        "Cards use uneven scale, breathing room, dark overlays, and clear hierarchy around the artist and the track title.",
      items: [
        {
          artist: "Astra Vale",
          title: "Fever Glass",
          poster: "/images/frames/f001.jpg",
          tag: "Portrait",
          alt: "Astra Vale music video poster",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 34vw",
          className: "lg:col-span-2 lg:row-span-2",
          delayClass: "delay-1",
        },
        {
          artist: "Mira North",
          title: "Cold Bloom",
          poster: "/images/frames/f028.jpg",
          tag: "Atmosphere",
          alt: "Mira North music video poster",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 42vw",
          className: "lg:col-span-4 lg:row-span-1",
          delayClass: "delay-2",
        },
        {
          artist: "Vanta",
          title: "Static Skin",
          poster: "/images/frames/f006.jpg",
          tag: "Performance",
          alt: "Vanta music video poster",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 24vw",
          className: "lg:col-span-2 lg:row-span-1",
          delayClass: "delay-3",
        },
        {
          artist: "Nox Echo",
          title: "Red Corridor",
          poster: "/images/frames/f018.jpg",
          tag: "Light",
          alt: "Nox Echo music video poster",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 24vw",
          className: "lg:col-span-2 lg:row-span-2",
        },
        {
          artist: "Kite Room",
          title: "Neon Prayer",
          poster: "/images/frames/f031.jpg",
          tag: "Editorial",
          alt: "Kite Room music video poster",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 24vw",
          className: "lg:col-span-2 lg:col-start-2 lg:row-span-1",
        },
        {
          artist: "Silver Tide",
          title: "Slow Fire",
          poster: "/images/frames/f032.jpg",
          tag: "Release",
          alt: "Silver Tide music video poster",
          sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 34vw",
          className: "lg:col-span-3 lg:row-span-1",
        },
      ],
    },
    production: {
      eyebrow: "Production floor",
      title: "Cinematic production is built not only in the shot, but between takes.",
      lead:
        "Lighting adjustments, resets, crew rhythm, quick checks, edit coverage, and control over the feel of the space. That is what the finished clip ends up carrying.",
      poster: "/images/frames/f031.jpg",
      alt: "Music video production still",
      bullets: ["Concept", "Production", "Post"],
    },
    process: {
      eyebrow: "Process",
      title: "A short and readable project path.",
      lead:
        "No bloated page structure and no filler marketing sections. Only the parts that materially affect the clip and the release.",
      items: [
        {
          index: "01",
          title: "Track and image",
          text: "We read the meaning, tempo, public image, and references so the visual angle is clear before the treatment starts.",
        },
        {
          index: "02",
          title: "Treatment and production frame",
          text: "We lock the visual language, location logic, lighting, styling, timing, and production volume around the actual task.",
        },
        {
          index: "03",
          title: "Shoot with editorial coverage",
          text: "We do not chase one pretty pass only. We gather material that can hold the cut, the verticals, and the release versions.",
        },
        {
          index: "04",
          title: "Edit, color, release package",
          text: "Final video, short versions, cover assets, and release adaptations are assembled without forcing an extra rebuild in post.",
        },
      ],
    },
    cta: {
      eyebrow: "Final CTA",
      title: "Have the track, the demo, or just the feeling of the future clip?",
      description:
        "Send the music, the moodboard, or a rough note. We will come back with treatment direction, production frame, and a practical next step.",
      href: "/en/contacts",
      label: "Start the conversation",
      note: "No autoplay video is mounted on this page: only posters and light cards, so the page stays fast.",
    },
  },
};

function ClipTile({ item, compact = false }: { item: ClipCard; compact?: boolean }) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-[0_24px_70px_rgba(0,0,0,0.24)] reveal-up",
        compact ? "min-h-[18rem]" : "min-h-[21rem]",
        item.className ?? "",
        item.delayClass ?? "",
      ].join(" ")}
    >
      <Image src={item.poster} alt={item.alt} fill sizes={item.sizes} className="object-cover transition duration-700 group-hover:scale-[1.035]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,.08),rgba(8,8,10,.18)_34%,rgba(8,8,10,.88)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(8,8,10,.14),rgba(8,8,10,.28)_34%,rgba(8,8,10,.92)_100%)]" />
      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-black/38 text-white shadow-[0_10px_30px_rgba(0,0,0,.24)] transition duration-300 group-hover:scale-105 group-hover:border-white/30 group-hover:bg-black/55">
        <Play className="ml-0.5 h-4.5 w-4.5 fill-current" />
      </div>
      <div className="absolute inset-x-5 bottom-5">
        <span className="inline-flex rounded-full border border-white/12 bg-black/28 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/54">
          {item.tag}
        </span>
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/46">{item.artist}</p>
          <h3 className="font-display mt-2 text-[1.45rem] leading-[0.98] tracking-[-0.035em] text-white md:text-[1.7rem]">
            {item.title}
          </h3>
        </div>
      </div>
    </article>
  );
}

export default function MusicVideosStudioPage({ locale = "ru" }: { locale?: Locale }) {
  const t = contentByLocale[locale];

  return (
    <div className="page-shell">
      <div className="page-ambient" />
      <div className="container page-content pt-header-safe pb-16">
        <section className="py-10 md:py-14">
          <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow reveal-up">{t.eyebrow}</p>
              <h1 className="font-display mt-4 text-[clamp(3rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.05em] text-white reveal-up delay-1">
                {t.title}
              </h1>
              <p className="mt-6 text-[1.05rem] leading-8 text-white/66 md:text-[1.18rem] reveal-up delay-2">
                {t.lead}
              </p>

              <div className="mt-7 flex flex-wrap gap-2 reveal-up delay-2">
                {t.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/64"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row reveal-up delay-3">
                <Link href={t.primaryHref} className="btn-primary h-12 rounded-full px-6">
                  {t.primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={t.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-12 rounded-full px-6"
                >
                  {t.secondaryLabel}
                </a>
              </div>
            </div>

            <article className="reveal-up delay-1 relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] shadow-[0_30px_84px_rgba(0,0,0,0.32)]">
              <div className="relative min-h-[25rem]">
                <Image
                  src={t.featured.poster}
                  alt={t.featured.alt}
                  fill
                  sizes="(max-width: 1279px) 100vw, 52vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,.06),rgba(8,8,10,.16)_34%,rgba(8,8,10,.9)_100%)]" />
                <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.24em] text-white/46">
                  <span>{t.featured.kicker}</span>
                  <span>poster only</span>
                </div>

                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                  <Link
                    href={t.featured.href}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/14 bg-black/48 text-white shadow-[0_14px_40px_rgba(0,0,0,.28)] transition hover:scale-105 hover:border-white/28 hover:bg-black/62"
                    aria-label={t.featured.hrefLabel}
                  >
                    <Play className="ml-1 h-5 w-5 fill-current" />
                  </Link>
                </div>

                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">{t.featured.artist}</p>
                  <h2 className="font-display mt-3 max-w-md text-[clamp(2rem,3vw,3.1rem)] leading-[0.94] tracking-[-0.045em] text-white">
                    {t.featured.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-white/62">{t.featured.note}</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-white/45 reveal-up">{t.gallery.eyebrow}</p>
              <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-[-0.04em] text-white md:text-[2.8rem] reveal-up delay-1">
                {t.gallery.title}
              </h2>
            </div>
            <p className="max-w-xl text-white/58 reveal-up delay-2">{t.gallery.lead}</p>
          </div>

          <div className="grid auto-rows-[15rem] gap-4 md:grid-cols-2 lg:grid-cols-6">
            {t.gallery.items.map((item) => (
              <ClipTile key={`${item.artist}-${item.title}`} item={item} />
            ))}
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="relative reveal-up overflow-hidden rounded-[38px] border border-white/10 bg-black/30 shadow-[0_30px_84px_rgba(0,0,0,0.32)]">
            <div className="relative min-h-[32rem] md:min-h-[38rem]">
              <Image
                src={t.production.poster}
                alt={t.production.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,.08),rgba(8,8,10,.26)_34%,rgba(8,8,10,.82)_72%,rgba(8,8,10,.94)_100%)]" />
              <div className="absolute inset-x-6 top-6 text-[10px] uppercase tracking-[0.24em] text-white/46 md:inset-x-8">
                {t.production.eyebrow}
              </div>
              <div className="absolute inset-x-6 bottom-6 md:inset-x-8">
                <div className="max-w-4xl">
                  <h2 className="font-display text-[clamp(2.4rem,5vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-white">
                    {t.production.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-white/66 md:text-[1.08rem]">
                    {t.production.lead}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {t.production.bullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="rounded-full border border-white/12 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/64"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-white/45 reveal-up">{t.process.eyebrow}</p>
              <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-[-0.04em] text-white md:text-[2.8rem] reveal-up delay-1">
                {t.process.title}
              </h2>
            </div>
            <p className="max-w-xl text-white/58 reveal-up delay-2">{t.process.lead}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {t.process.items.map((item, index) => (
              <article
                key={item.index}
                className={`reveal-up ${index === 0 ? "delay-1" : index === 1 ? "delay-2" : index === 2 ? "delay-3" : ""} rounded-[30px] border border-white/10 bg-white/[0.03] p-6 shadow-soft`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/82">
                    {item.index}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.35rem] leading-tight text-white">{item.title}</h3>
                    <p className="mt-3 text-white/62">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-4 pt-10 md:pt-14">
          <div className="reveal-up relative overflow-hidden rounded-[38px] border border-white/10 bg-[radial-gradient(84rem_34rem_at_0%_0%,rgba(124,58,237,.18),transparent_56%),linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.016)),rgba(8,8,10,.8)] px-6 py-8 shadow-[0_30px_84px_rgba(0,0,0,0.34)] md:px-8 md:py-10">
            <div className="relative z-[1] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow text-white/52">{t.cta.eyebrow}</p>
                <h2 className="font-display mt-3 text-[clamp(2rem,4vw,4rem)] leading-[0.96] tracking-[-0.045em] text-white">
                  {t.cta.title}
                </h2>
                <p className="mt-4 text-white/66">{t.cta.description}</p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/46">{t.cta.note}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={t.cta.href} className="btn-primary h-12 rounded-full px-6">
                  {t.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={t.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-12 rounded-full px-6"
                >
                  {t.secondaryLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

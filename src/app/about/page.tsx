import type { Metadata } from "next";
import Link from "next/link";
import {
  Clapperboard,
  Layers3,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "О компании — Highway Films",
  description:
    "Highway Films — студия полного цикла: реклама, бренд-фильмы, корпоративные истории и клипы.",
  path: "/about",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

function SectionHeader({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
          {title}
        </h2>
      </div>
      {lead ? <p className="max-w-xl text-white/62">{lead}</p> : null}
    </header>
  );
}

function StatPanel({
  value,
  label,
  detail,
  featured = false,
}: {
  value: string;
  label: string;
  detail: string;
  featured?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[30px] border border-white/10 p-6 shadow-soft",
        "bg-[radial-gradient(140%_120%_at_0%_0%,rgba(124,58,237,.24),transparent_60%),radial-gradient(120%_120%_at_100%_100%,rgba(59,130,246,.14),transparent_58%),rgba(255,255,255,.03)]",
        featured ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">{label}</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-violet-200/85 font-extrabold tracking-tight text-[clamp(2.4rem,1.4rem+3vw,3.4rem)]">
        {value}
      </div>
      <p className="mt-4 max-w-md text-sm leading-6 text-white/62">{detail}</p>
    </div>
  );
}

function AdvantageCard({
  title,
  text,
  note,
  icon,
}: {
  title: string;
  text: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
          {icon}
        </div>
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/36">{note}</span>
      </div>
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <p className="mt-3 text-white/62">{text}</p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
    </div>
  );
}

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(255,255,255,0.04))] px-6 py-8 shadow-soft md:px-8">
      <p className="font-display max-w-4xl text-[clamp(1.8rem,2vw+1rem,2.9rem)] leading-[1.08] tracking-[-0.035em] text-white">
        {children}
      </p>
    </div>
  );
}

function Step({
  index,
  title,
  text,
}: {
  index: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/25 p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/80">
          {index}
        </div>
        <div>
          <h3 className="font-display text-xl text-white">{title}</h3>
          <p className="mt-3 text-white/62">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <div className="container page-content pt-header-safe pb-16">
      <section className="py-10 md:py-14">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div>
            <p className="eyebrow">Студия</p>
            <h1 className="font-display mt-4 max-w-4xl text-[clamp(3rem,7vw,5.7rem)] leading-[0.95] tracking-[-0.045em] text-white">
              Highway Films — студия полного цикла
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-[1.28rem]">
              Делаем рекламу, бренд-фильмы, корпоративные истории и клипы. Нам важны сильный кадр, ясный процесс и результат, который работает дальше самого релиза.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contacts" className="btn-primary h-12 rounded-full px-6">
                Обсудить проект
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://t.me/highwayfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-12 rounded-full px-6"
              >
                Telegram
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <StatPanel
              value="10+ лет"
              label="Опыт"
              detail="Один контур вместо набора разрозненных подрядчиков."
              featured
            />
            <StatPanel
              value="50+"
              label="Релизы"
              detail="Проекты, доведённые от идеи до мастера."
            />
            <StatPanel
              value="4K / 10-bit"
              label="Система"
              detail="Контролируемая съёмка, цвет и финальные версии без просадки."
            />
          </div>
        </div>
      </section>

      <section className="pb-8">
        <Statement>
          Мы не делаем видео ради жеста. Мы собираем кадр, которому есть что решить.
        </Statement>
      </section>

      <section className="py-10 md:py-14">
        <SectionHeader
          kicker="Преимущества"
          title="Почему бренды выбирают нас"
          lead="Идея, съёмка и пост работают как одна система."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <AdvantageCard
            title="Полный цикл"
            text="От брифа до финального пакета. Один рабочий контур вместо хаоса."
            note="от старта до релиза"
            icon={<Layers3 className="h-5 w-5" />}
          />
          <AdvantageCard
            title="Технологический контроль"
            text="Выверенный свет, цвет, графика и звук без ощущения компромисса."
            note="ремесло и система"
            icon={<Clapperboard className="h-5 w-5" />}
          />
          <AdvantageCard
            title="Фокус на результате"
            text="Собираем ролик так, чтобы он не только нравился, но и работал на узнаваемость, доверие и действие."
            note="не просто красиво"
            icon={<Sparkles className="h-5 w-5" />}
          />
        </div>
      </section>

      <section className="pb-8">
        <Statement>
          Держим темп там, где можно ускориться, и точность там, где нельзя резать углы.
        </Statement>
      </section>

      <section className="py-10 md:py-14">
        <SectionHeader
          kicker="Процесс"
          title="Как мы работаем"
          lead="Прозрачный путь проекта без лишнего шума."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Step
            index="01"
            title="Бриф и вектор"
            text="Фиксируем цель, аудиторию и вектор. Понимаем, что должно цеплять и что должно продавать."
          />
          <Step
            index="02"
            title="Концепция и подготовка"
            text="Собираем визуальную логику, список сцен, свет, реквизит и рабочую рамку проекта."
          />
          <Step
            index="03"
            title="Съёмка"
            text="Снимаем так, чтобы у монтажа была свобода: основной материал, запас и версии под площадки."
          />
          <Step
            index="04"
            title="Пост и релиз"
            text="Монтаж, цвет, графика, звук и мастер-версии под сайт, соцсети и размещения."
          />
        </div>
      </section>

      <section className="pb-4 pt-10 md:pt-14">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(255,255,255,0.05))] px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.38)] md:px-8 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-white/55">Контакт</p>
              <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
                Обсудим ваш проект?
              </h2>
              <p className="mt-4 text-white/68">
                Пришлите ссылку, продукт или просто тезисы задачи. Соберём концепцию, сроки и рабочую смету.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contacts" className="btn-primary h-12 rounded-full px-6">
                Запросить предложение
              </Link>
              <a
                href="https://t.me/highwayfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-12 rounded-full px-6"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}

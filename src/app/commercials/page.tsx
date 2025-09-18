import Link from "next/link";

/** Метаданные */
export const metadata = {
  title: "Рекламные ролики для бизнеса — Highway Films",
  description:
    "Производим рекламные ролики под ключ: идея, тритмент, съёмка до 4K/10-bit, постпродакшн и мастер-версии под площадки. Визуал, который цепляет, и монтаж, который удерживает внимание.",
};

/* ===== UI helpers ===== */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="card h-full flex flex-col p-5 md:p-6 rounded-xl">
      <div className="text-xl mb-2">{icon}</div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({
  n,
  title,
  text,
}: {
  n: number;
  title: string;
  text: string;
}) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
        <b>{n}</b>
      </div>
      <div className="font-medium">{title}</div>
      <p className="mt-1 text-neutral-300 text-sm">{text}</p>
    </li>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        ✓
      </span>
      <span className="text-sm text-neutral-300 leading-relaxed">{children}</span>
    </li>
  );
}

/* ===== Page ===== */

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="container py-12 md:py-16">
        <div className="flex flex-wrap gap-2 mb-3">
          <Pill>🎯 Под задачу бизнеса</Pill>
          <Pill>⚙️ Полный цикл</Pill>
          <Pill>📐 Варианты под площадки</Pill>
        </div>

        <div className="max-w-3xl">
          <h1 className="h1 text-[clamp(32px,5vw,56px)] font-bold">
            Рекламные ролики для бизнеса
          </h1>
          <p className="lead mt-4">
            Делаем видео&nbsp;под ключ: от идеи и тритмента до финальной сдачи.
            Упор на сильные визуальные образы, ясный месседж и монтаж, который
            удерживает внимание. Доставляем мастер-версии под&nbsp;сайт, соцсети,
            DOOH/Indoor.
          </p>
        </div>

        {/* Форматы */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <FeatureCard
            icon={<span>📦</span>}
            title="Product / Brand films"
            desc="Короткие и средние форматы с акцентом на преимущества продукта и образ бренда."
          />
          <FeatureCard
            icon={<span>🚀</span>}
            title="Performance-ролики для соцсетей"
            desc="Чёткий call-to-action, A/B-вариации, адаптация под вертикаль, быстрый запуск."
          />
          <FeatureCard
            icon={<span>✨</span>}
            title="Имиджевые кампании"
            desc="Идея → тритмент → производство → пост. Стиль, нарратив, музыка и ритм."
          />
          <FeatureCard
            icon={<span>🛍️</span>}
            title="Retail / POS-видео"
            desc="Короткие циклические ролики для экранов точек продаж и выставок."
          />
        </div>
      </section>

      {/* Что получите + Процесс */}
      <section className="container py-8 md:py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Что получите за 2–4 недели</h3>
            <ul className="mt-4 space-y-3">
              <CheckItem>Тритмент и раскадровку под вашу задачу</CheckItem>
              <CheckItem>Съёмку до 4K/10-bit; дроны/стедикам по запросу</CheckItem>
              <CheckItem>Монтаж, цветокор, графику/титры и звук</CheckItem>
              <CheckItem>Мастера под YouTube, VK, Rutube, DOOH/Indoor</CheckItem>
              <CheckItem>Пакет ресайзов и обложек при необходимости</CheckItem>
            </ul>
          </div>

          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Процесс</h3>
            <ol className="mt-4 grid gap-3 text-sm">
              <Step n={1} title="Бриф" text="Цель, аудитория, площадки, KPI." />
              <Step n={2} title="Тритмент" text="Идея, референсы, структура, смета." />
              <Step n={3} title="Продакшн" text="Подготовка, съёмка, запись звука." />
              <Step n={4} title="Пост" text="Монтаж, цвет, графика, музыка." />
              <Step n={5} title="Доставка" text="Мастера и ресайзы под площадки." />
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-10">
        <div className="rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-500/20 px-6 py-7 ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-xl font-semibold">Нужен расчёт и тайминг?</h3>
              <p className="text-neutral-300 mt-1">
                Пришлите короткий бриф — вернём смету и сроки в течение рабочего дня.
              </p>
            </div>
            <Link
              href="/contacts"
              className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Получить предложение
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

/** Метаданные */
export const metadata = {
  title: "Рекламные ролики для бизнеса — Highway Films",
  description:
    "Разрабатываем и производим рекламное видео под ключ: от идеи и тритмента до сдачи мастеров под площадки. Кинематографичный визуал, чёткий месседж, монтаж, который держит внимание.",
};

/** Локальная карточка формата */
function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-5 md:p-6 hover:translate-y-[-2px] transition rounded-xl">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/** Маленький пункт с галочкой */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">✓</span>
      <span className="text-sm text-neutral-300 leading-relaxed">{children}</span>
    </li>
  );
}

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="h1 text-[clamp(32px,5vw,56px)] font-bold">
            Рекламные ролики для бизнеса
          </h1>
          <p className="lead mt-4">
            Разрабатываем и производим видео&nbsp;под ключ: от идеи и тритмента
            до финальной сдачи. Упор на сильные визуальные образы, чёткий месседж
            и монтаж, который удерживает внимание. Доставляем мастера под площадки:
            сайт, соцсети, DOOH/Indoor.
          </p>
        </div>

        {/* Форматы */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <FeatureCard
            title="Product / Brand films"
            desc="Короткие и средние форматы с акцентом на преимущества продукта и образ бренда."
          />
          <FeatureCard
            title="Performance-ролики для соцсетей"
            desc="Чёткий call-to-action, A/B-вариации, адаптация под вертикаль, быстрый запуск."
          />
          <FeatureCard
            title="Имиджевые кампании"
            desc="Идея → тритмент → производство → пост. Стиль, нарратив, музыка и ритм."
          />
          <FeatureCard
            title="Retail / POS-видео"
            desc="Короткие циклические ролики для экранов точек продаж и выставок."
          />
        </div>
      </section>

      {/* Что получите */}
      <section className="container py-8 md:py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Что получите за 2–4 недели</h3>
            <ul className="mt-4 space-y-3">
              <CheckItem>Тритмент и раскадровка под задачу</CheckItem>
              <CheckItem>Съёмка до 4K/10-bit, дроны/стедикам по запросу</CheckItem>
              <CheckItem>Монтаж, цветокор, графика/титры, звук</CheckItem>
              <CheckItem>Мастер-версии под площадки (YouTube, VK, Rutube, DOOH)</CheckItem>
              <CheckItem>Пакет ресайзов и обложек (при необходимости)</CheckItem>
            </ul>
          </div>

          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Процесс</h3>
            <ol className="mt-4 grid gap-3 text-sm text-neutral-300">
              <li className="border-l border-neutral-800 pl-4">
                <b>1. Бриф</b> — цель, аудитория, площадки, КПИ.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>2. Тритмент</b> — идея, референсы, структура, смета.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>3. Продакшн</b> — подготовка, съёмка, звук.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>4. Пост</b> — монтаж, цвет, графика, музыка.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>5. Доставка</b> — мастера и ресайзы под площадки.
              </li>
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

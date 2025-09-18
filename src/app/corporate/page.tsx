import Link from "next/link";

export const metadata = {
  title: "Корпоративное и презентационное видео — Highway Films",
  description:
    "Фильмы о компании, презентации для инвесторов и выставок, onboarding и внутренние коммуникации. Полный цикл: идея → препродакшн → съёмка → постпродакшн.",
};

/* Базовая карточка */
function Card({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="card rounded-xl p-5 md:p-6 hover:translate-y-[-2px] transition">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/* Пункт-галочка */
function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        ✓
      </span>
      <span className="text-sm text-neutral-300 leading-relaxed">{children}</span>
    </li>
  );
}

/* Статистика */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card rounded-xl p-5">
      <div className="stat-value">{value}</div>
      <div className="stat-label mt-1">{label}</div>
    </div>
  );
}

export default function CorporatePage() {
  return (
    <>
      {/* HERO */}
      <section className="container pt-12 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="h1 text-[clamp(32px,5vw,56px)] font-bold">
            Корпоративное и презентационное видео
          </h1>
          <p className="lead mt-4">
            Помогаем презентовывать продукты и процессы: фильмы о компании и
            производстве, видео для стендов и инвесторов, onboarding-ролики,
            отчётное видео и внутренние коммуникации. Чистый визуал, структура и
            понятные сроки.
          </p>
        </div>

        {/* Форматы */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card
            title="Фильмы о компании / производстве"
            desc="Бренд-стори, экскурсии по производству, демонстрация компетенций и инфраструктуры."
          />
          <Card
            title="Видео для стендов и презентаций"
            desc="Цикличные silent-ролики для выставок, лаконичные нарезки под выступления."
          />
          <Card
            title="HR и внутренние коммуникации"
            desc="Onboarding, welcome-ролики, отчёты, корпоративные события, EVP-коммуникация."
          />
          <Card
            title="Интервью и кейс-истории"
            desc="Съёмка руководителей и экспертов, клиентские кейсы, sucess-stories."
          />
        </div>
      </section>

      {/* Результат + процесс */}
      <section className="container py-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card rounded-xl p-6">
            <h3 className="text-lg font-semibold">Что получает компания</h3>
            <ul className="mt-4 space-y-3">
              <Check>Тритмент и раскадровка под конкретную аудиторию</Check>
              <Check>Съёмка до 4K/10-bit, дроны/стедикам по задаче</Check>
              <Check>Монтаж, цветокор, графика (сабтайтлы/плашки), звук</Check>
              <Check>Версии под площадки: сайт, соцсети, стенды/индор</Check>
              <Check>Гайды по использованию и пакет обложек при необходимости</Check>
            </ul>
          </div>

          <div className="card rounded-xl p-6">
            <h3 className="text-lg font-semibold">Процесс (прозрачно)</h3>
            <ol className="mt-4 grid gap-3 text-sm text-neutral-300">
              <li className="border-l border-neutral-800 pl-4">
                <b>1. Бриф</b> — цель, площадки, ключевые сообщения.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>2. Тритмент</b> — идея, структура, референсы, смета и тайминг.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>3. Продакшн</b> — препрод, съёмка, бэкап материалов.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>4. Пост</b> — монтаж, графика/субтитры, цвет, звук.
              </li>
              <li className="border-l border-neutral-800 pl-4">
                <b>5. Доставка</b> — мастер-версии и ресайзы, передача исходников.
              </li>
            </ol>
          </div>
        </div>

        {/* Немного доверия */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat value="10+" label="лет опыта в продакшне" />
          <Stat value="50+" label="выпущенных проектов" />
          <Stat value="2" label="города работы (СПб / Москва)" />
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-14">
        <div className="rounded-2xl bg-gradient-to-r from-sky-500/20 to-violet-600/20 px-6 py-7 ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-xl font-semibold">Нужен ролик к выставке или презентации?</h3>
              <p className="text-neutral-300 mt-1">
                Пришлите бриф — предоставим смету и сроки в течение рабочего дня.
              </p>
            </div>
            <Link
              href="/contacts"
              className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Получить КП для компании
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

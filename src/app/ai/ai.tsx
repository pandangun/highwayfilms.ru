import Link from "next/link";

/**
 * Highway Films — AI Page
 * Услуги генерации: дипфейк, виртуальные ведущие, поздравления, рекламные ролики
 * Стиль — такой же, как WeddingsPage (hero + блоки + CTA + FAQ)
 */

export const metadata = {
  title: "AI-видео и генерация — Highway Films",
  description:
    "Генерация видео с помощью AI: виртуальные ведущие, дипфейк-поздравления, рекламные ролики и аватары для соцсетей. Современный подход к креативу.",
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{children}</p>
    </div>
  );
}

export default function AiPage() {
  return (
    <>
      {/* HERO */}
      <section className="container relative pt-12 md:pt-16">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] uppercase tracking-wider text-white/80">
            AI-фильмы и ролики
          </span>
          <h1 className="h1 font-bold mt-4">
            Генерация видео и контента с помощью AI
          </h1>
          <p className="lead mt-4 text-neutral-200">
            Мы используем современные модели для создания видео, которые раньше
            требовали больших бюджетов. Виртуальные ведущие, дипфейк-эффекты,
            персонализированные поздравления и быстрые рекламные ролики —
            всё под ваши задачи.
          </p>
          <div className="mt-6">
            <Link
              href="/contacts"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Обсудить задачу
            </Link>
          </div>
        </div>
      </section>

      {/* Что делаем */}
      <section className="container py-12 grid gap-6 md:grid-cols-2">
        <Card title="Виртуальные ведущие и аватары">
          Создаём цифровых персонажей, которые могут вести трансляции,
          презентовать продукты или читать поздравления от имени компании.
        </Card>
        <Card title="AI-поздравления">
          Персонализированные ролики для сотрудников, партнёров и клиентов.
          Эффект «вау» при минимальных затратах времени.
        </Card>
        <Card title="Рекламные ролики">
          Сценарии, озвучка и визуал — генерируем и собираем под ваш бренд.
          Идеально для соцсетей и быстрого запуска кампаний.
        </Card>
        <Card title="Этические дипфейк-решения">
          Используем технологии ответственно: создаём эффектные ролики без
          нарушения авторских и личных прав.
        </Card>
      </section>

      {/* Кейсы / галерея */}
      <section className="container py-12">
        <h2 className="mb-4 text-xl font-semibold">Примеры</h2>
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
          <div className="flex gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative h-44 w-[260px] shrink-0 overflow-hidden rounded-xl border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/ai-samples/sample${i + 1}.jpg`}
                  alt="ai case"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12">
        <h2 className="text-xl font-semibold mb-4">FAQ</h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Можно ли использовать такие ролики в рекламе?
            </summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Да, мы адаптируем видео под требования площадок (Meta*, VK,
              TikTok, YouTube и др.). (*Запрещена в РФ)
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Насколько это легально?
            </summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Мы работаем только с этичными сценариями и не используем чужие
              изображения без разрешения.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Сколько стоит AI-ролик?
            </summary>
            <div className="mt-2 text-sm leading-relaxed text-neutral-300">
              Стоимость зависит от длительности, сценария и используемых
              технологий. Минимальные проекты начинаются от 20–30 тыс ₽.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

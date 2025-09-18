import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Видеопродакшн в Москве и Санкт-Петербурге — Highway Films",
  description:
    "Полный цикл видеопроизводства: креатив, препродакшн, съёмка до 4K/10-bit, звук, цветокор, VFX и мастер-версии под площадки. Сметы под задачу.",
};

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
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
    <li className="card p-5 flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-bgc/80 grid place-items-center font-semibold">
        {n}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="mt-1 text-muted">{text}</p>
      </div>
    </li>
  );
}

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      {/* HERO */}
      <h1 className="h1">Видеопродакшн в Москве и Санкт-Петербурге</h1>
      <p className="lead measure mt-2">
        Полный цикл: креатив, препродакшн, съёмка, звук, монтаж, цветокор и графика.
        Делаем видео под конкретную бизнес-задачу, с понятными сроками и сметой.
      </p>

      {/* ТРИГГЕРЫ / ПРЕИМУЩЕСТВА */}
      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Feature
          title="Съёмка до 4K/10-bit"
          text="Стабилизация, дроны, таймлапсы, макро, многоракурсная запись звука."
        />
        <Feature
          title="Постпродакшн"
          text="Монтаж, саунд-дизайн, цветокор, VFX, субтитры, мастер-версии под площадки."
        />
        <Feature
          title="Продюсирование"
          text="Локации, кастинг, реквизит, тайминг. Съёмочная команда под формат проекта."
        />
      </section>

      {/* СЕТКА ПРЕВЬЮ */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Визуальные референсы</h2>
        <p className="text-muted mt-2 measure">
          Короткая выборка кадров и настроений. Позже добавим кейсы с описанием задач и метрик.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Каждую картинку кладём в relative-блок с aspect-video и заполняем через fill */}
          {[
            { src: "/images/frames/f001.jpg", alt: "Референс кадр 1" },
            { src: "/images/frames/f002.jpg", alt: "Референс кадр 2" },
            { src: "/images/frames/f003.jpg", alt: "Референс кадр 3" },
            { src: "/images/frames/f004.jpg", alt: "Референс кадр 4" },
            { src: "/images/frames/f005.jpg", alt: "Референс кадр 5" },
            { src: "/images/frames/f020.jpg", alt: "Референс кадр 6" },
          ].map((it) => (
            <div
              key={it.src}
              className="relative w-full aspect-video overflow-hidden rounded-xl border border-base"
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                priority={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ПРОЦЕСС */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Процесс</h2>
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Step
            n={1}
            title="Бриф и смета"
            text="Цели и аудитория, KPI, форматы и площадки. Предлагаем решение и бюджетные вилки."
          />
          <Step
            n={2}
            title="Креатив и препрод"
            text="Treatment, раскадровка, локации, кастинг, график. Готовим площадку и команду."
          />
          <Step
            n={3}
            title="Съёмка"
            text="Запись видео и звука, работа со светом. Контроль качества на сет-мониторе."
          />
          <Step
            n={4}
            title="Постпродакшн"
            text="Монтаж → цветокор → графика/озвучка. Экспорт master-версий, передача исходников."
          />
        </ol>
      </section>

      {/* ФОРМАТЫ */}
      <section className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Feature
          title="Product / Brand film"
          text="Имиджевые и продуктовые ролики: от коротких анонсов до мини-фильмов."
        />
        <Feature
          title="Корпоративное видео"
          text="Фильмы о компании и процессах, HR-коммуникации, презентации и стенды."
        />
        <Feature
          title="Performance-форматы"
          text="Короткие версии под соцсети, вертикаль, нарезки и адаптации под площадки."
        />
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <div className="card p-5">
            <div className="font-medium">Сроки?</div>
            <p className="mt-1 text-muted">
              Быстрые проекты — 7–14 дней. Фильмы с препродакшном — 3–6 недель. Уточняем после брифа.
            </p>
          </div>
          <div className="card p-5">
            <div className="font-medium">Бюджет?</div>
            <p className="mt-1 text-muted">
              Смета собирается под задачу и формат. Предлагаем 2–3 опции по производственной насыщенности.
            </p>
          </div>
          <div className="card p-5">
            <div className="font-medium">Передаёте исходники?</div>
            <p className="mt-1 text-muted">
              Да. Передаём мастер-версии и исходники по запросу, включая проектные файлы.
            </p>
          </div>
          <div className="card p-5">
            <div className="font-medium">Где работаете?</div>
            <p className="mt-1 text-muted">
              Санкт-Петербург и Москва, возможны выезды. Командируем состав под площадку.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Обсудим задачу и смету?</div>
            <p className="text-muted mt-2">
              Пришлите бриф или тезисы — вернёмся с предложением и сроками.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/contacts" className="btn btn-primary">Получить КП</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener" className="btn">
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

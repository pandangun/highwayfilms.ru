import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// Если хочешь статические импорты — раскомментируй и подложи файлы в /public/images/frames
// import f001 from "@/public/images/frames/f001.jpg";
// import f002 from "@/public/images/frames/f002.jpg";
// import f003 from "@/public/images/frames/f003.jpg";
// import f004 from "@/public/images/frames/f004.jpg";
// import f005 from "@/public/images/frames/f005.jpg";
// import f006 from "@/public/images/frames/f006.jpg";

export const metadata: Metadata = {
  title: "Видеопродакшн в Москве и Санкт-Петербурге — Highway Films",
  description:
    "Производим видео, которое двигает метрики: от бренд-фильмов и рекламы до вертикальных перформанс-роликов. Чёткие сроки и сметы под задачу.",
  alternates: { canonical: "https://highwayfilms.ru/videoproduction" },
  openGraph: {
    type: "website",
    title: "Видеопродакшн — Highway Films",
    description:
      "Креатив → препрод → съёмка 4K/10-bit → постпрод (монтаж/цвет/VFX) → master-версии под площадки. Москва/СПб.",
    url: "https://highwayfilms.ru/videoproduction",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-4 text-center">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-5 hover:translate-y-[-2px] transition">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="card p-5 flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-white/5 grid place-items-center font-semibold">
        {n}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="mt-1 text-muted">{text}</p>
      </div>
    </li>
  );
}

const frames = [
  { src: "/images/frames/f001.jpg", alt: "Референс: бренд-фильм, крупный план", tag: "Brand" },
  { src: "/images/frames/f002.jpg", alt: "Референс: предметная съёмка, мягкий свет", tag: "Product" },
  { src: "/images/frames/f003.jpg", alt: "Референс: динамика, motion", tag: "Sport" },
  { src: "/images/frames/f004.jpg", alt: "Референс: архитектура, атмосфера", tag: "Corporate" },
  { src: "/images/frames/f005.jpg", alt: "Референс: портрет, контровой свет", tag: "Portrait" },
  { src: "/images/frames/f006.jpg", alt: "Референс: индустриальная съёмка", tag: "Industrial" },
];

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      {/* HERO */}
      <section className="max-w-3xl">
        <h1 className="h1">Видеопродакшн в Москве и Санкт-Петербурге</h1>
        <p className="lead measure mt-2">
          Делаем видео, которое работает на бренд и продажи: от имиджевых фильмов до вертикальных
          перформанс-роликов. Полный цикл — от идеи до master-версий под площадки.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contacts" className="btn btn-primary">Обсудить задачу</Link>
          <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
            Написать в Telegram
          </a>
        </div>
      </section>

      {/* KPIs */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi value="8+ лет" label="на продакшне" />
        <Kpi value="250+" label="выпущенных роликов" />
        <Kpi value="4K / 10-bit" label="качество съемки" />
        <Kpi value="7–14 дн." label="быстрые форматы" />
      </section>

      {/* Плюсы */}
      <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Feature
          title="Картинка уровня бренда"
          text="Стабилизация, дроны, макро, таймлапсы. Контроль качества на сет-мониторе."
        />
        <Feature
          title="Постпрод без хаоса"
          text="Монтаж со смысловой логикой, саунд-дизайн, цветокор, VFX/графика, субтитры."
        />
        <Feature
          title="Смета под задачу"
          text="Команда, техника и локации — под KPI и бюджет. 2–3 опции по насыщенности."
        />
      </section>

      {/* Галерея референсов */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Визуальные референсы</h2>
        <p className="text-muted mt-2 measure">
          Ниже — настроение и фактура. Под ваш бренд соберём персональный визуальный язык и драматургию.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {frames.map((f, i) => (
            <figure
              key={i}
              className="group relative w-full aspect-video overflow-hidden rounded-xl border border-base"
            >
              <Image
                src={f.src /* или f001 и т.д. при стат.импортах */}
                alt={f.alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 33vw"
                priority={i < 2}
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-sm">
                <span className="rounded-md bg-black/40 px-2 py-1">{f.tag}</span>
              </figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </figure>
          ))}
        </div>
      </section>

      {/* Процесс */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Как мы работаем</h2>
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Step
            n={1}
            title="Бриф → гипотеза"
            text="Цели, аудитория, ключевые сообщения, KPI. Предлагаем формат и драматургию."
          />
          <Step
            n={2}
            title="Препрод"
            text="Treatment, раскадровка, кастинг, локации, тайминг, техника, логистика."
          />
          <Step
            n={3}
            title="Съёмка"
            text="Команда по ролям, свет и звук, страховочные планы. Контроль качества на площадке."
          />
          <Step
            n={4}
            title="Постпрод"
            text="Монтаж → цвет → звук → графика. Финальные master-версии и адаптации под площадки."
          />
        </ol>
      </section>

      {/* Что вы получаете */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Что получите на выходе</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <div className="card p-5">
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>Готовый ролик в нужных длительностях (YouTube, VK, TG, DOOH).</li>
              <li>Вертикальные и короткие версии под перформанс.</li>
              <li>Open files по запросу: исходники, проект, LUT/пресеты.</li>
            </ul>
          </div>
          <div className="card p-5">
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>Правовая часть: договор, права на использование, смета и календарь.</li>
              <li>Пакет превью/стилл-кадров для анонсов и обложек.</li>
              <li>Гайд по публикации: форматы, битрейты, таймкоды.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Форматы работ */}
      <section className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Feature
          title="Brand / Product film"
          text="Имидж и продукт: от 20-сек тизеров до мини-фильмов с нарративом."
        />
        <Feature
          title="Корпоративные видео"
          text="О компании и процессах, HR-видео, производственные кейсы, презентации."
        />
        <Feature
          title="Performance-контент"
          text="Вертикаль, нарезки, UGC-миксы и сериальные подборки под прогрев/ретаргет."
        />
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <div className="card p-5">
            <div className="font-medium">Сроки?</div>
            <p className="mt-1 text-muted">
              Быстрые форматы — 7–14 дней. Фильмы с препродом — 3–6 недель. Точную сетку закрепляем после брифа.
            </p>
          </div>
          <div className="card p-5">
            <div className="font-medium">Бюджет?</div>
            <p className="mt-1 text-muted">
              Зависит от команды, смен, света, локаций и постпрода. Обычно даём 2–3 сметы с разной насыщенностью.
            </p>
          </div>
          <div className="card p-5">
            <div className="font-medium">Исходники / права?</div>
            <p className="mt-1 text-muted">
              Передаем master-версии и исходники по запросу. Права и сроки использования — в договоре.
            </p>
          </div>
          <div className="card p-5">
            <div className="font-medium">Где снимаем?</div>
            <p className="mt-1 text-muted">
              Москва и Санкт-Петербург, выезды по РФ и СНГ. Подбираем команду под площадку и задачу.
            </p>
          </div>
        </div>
      </section>

      {/* Двойной CTA */}
      <section className="mt-12">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Нужно видео под KPI?</div>
            <p className="text-muted mt-2">
              Пришлите тезисы — соберём решение, предложим сроки и бюджетные вилки.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/contacts" className="btn btn-primary">Получить КП</Link>
            <a
              href="https://t.me/highwayfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

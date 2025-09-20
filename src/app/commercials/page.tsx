// app/commercials/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Рекламные ролики и product-видео — Highway Films",
  description:
    "Продающие видео для брендов и маркетплейсов: packshot, lifestyle, UGC, 3D/моушн. Фокус на конверсию и креатив, быстрые пакеты под задачу.",
  alternates: { canonical: "https://highwayfilms.ru/commercials" },
  openGraph: {
    type: "website",
    title: "Рекламные ролики — Highway Films",
    description:
      "Креатив → препрод → съёмка 4K/10-bit → постпрод (монтаж/цвет/VFX) → версии под площадки. Москва/СПб.",
    url: "https://highwayfilms.ru/commercials",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-4 text-center">
      <div className="stat-value leading-tight">{value}</div>
      <div className="stat-label mt-1 break-words">{label}</div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-5 transition hover:-translate-y-0.5 hover:border-strong">
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

/* Полупрозрачный тайл с фоном и фильтром */
function AdTile({ src, tag, title }: { src: string; tag: string; title: string }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-base h-48 md:h-56">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover opacity-60 transition group-hover:opacity-75"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <span className="w-fit rounded-md bg-black/40 px-2 py-1 text-xs">{tag}</span>
        <h3 className="mt-2 text-lg font-medium leading-tight">{title}</h3>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition group-hover:ring-1 group-hover:ring-white/15" />
    </article>
  );
}

/* Заглушки — замени файлами в /public/images/ads/ и убери игнор для них */
const tiles = [
  { src: "/images/ads/a01.jpg", tag: "Packshot",  title: "Стек и фактуры для e-com" },
  { src: "/images/ads/a02.jpg", tag: "Lifestyle", title: "Продукт в реальном сценарии" },
  { src: "/images/ads/a03.jpg", tag: "UGC",      title: "Нативные ролики под перформанс" },
  { src: "/images/ads/a04.jpg", tag: "3D/Motion",title: "Акценты, разрезы, анимация" },
  { src: "/images/ads/a05.jpg", tag: "Food",     title: "Фуд-порно: пар, соус, макро" },
  { src: "/images/ads/a06.jpg", tag: "Beauty",   title: "Текстуры и блики — premium" },
];

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      {/* HERO */}
      <section className="max-w-3xl">
        <h1 className="h1">Рекламные ролики и product-видео</h1>
        <p className="lead measure mt-2">
          Продающие видео для брендов и маркетплейсов: packshot, lifestyle, UGC и motion.
          Выстраиваем драматургию «смысл → польза → действие», чтобы видео не просто смотрели, а{" "}
          <strong>покупали</strong>.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contacts" className="btn btn-primary">Получить КП</Link>
          <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
            Обсудить в Telegram
          </a>
        </div>
      </section>

      {/* KPI — короткий value, понятный label */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi value="200+" label="product-роликов" />
        <Kpi value="4K / 10-bit" label="картинка и цвет" />
        <Kpi value="7–10 дней" label="быстрые пакеты" />
        <Kpi value="Ozon · WB · Я.Маркет" label="Маркетплейс" />
      </section>

      {/* Продуктовые офферы */}
      <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Feature
          title="Packshot Pro"
          text="Чистый фон, стек/повороты, макро-текстуры, аккуратный motion. Идеально для карточек товара."
        />
        <Feature
          title="Lifestyle Story"
          text="Сценарий в реальном контексте: польза → триггеры → призыв. Версии 6/15/30 сек."
        />
        <Feature
          title="UGC Boost"
          text="Нативная подача/хендхелд. Быстрые тесты гипотез, серии под ретаргет."
        />
      </section>

      {/* Галерея тайлов */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Варианты подачи</h2>
        <p className="text-muted mt-2 measure">
          От «стерильно-чистого» e-commerce до насыщенного lifestyle. Любой тайл можно разложить на серию для A/B.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {tiles.map((t, i) => (
            <AdTile key={i} src={t.src} tag={t.tag} title={t.title} />
          ))}
        </div>
      </section>

      {/* Что снимаем */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Что снимаем</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Feature title="Фуд / напитки" text="Слоу-мо, пар, капли, пролёты. Аппетитные selling-points." />
          <Feature title="Косметика / skincare" text="Текстуры, свотчи, стек и бликовая схема — high-end premium." />
          <Feature title="Гаджеты / аксессуары" text="Анимация портов/фич, 3D-разрезы, motion-акценты." />
          <Feature title="Одежда / ткани" text="Фактура, посадка, движение. Вертикальные нарезки." />
          <Feature title="Дом / декор" text="Lifestyle-сцены: польза в быту, до/после, микросценарии." />
          <Feature title="Маркетплейс-пакеты" text="Серии 6–15 сек под карточку товара и ретаргет." />
        </div>
      </section>

      {/* Процесс */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Процесс</h2>
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Step n={1} title="Бриф → инсайт" text="ЦА, оффер, возражения. Складываем продающий порядок фактов." />
          <Step n={2} title="Препрод" text="Treatment, борда, свет, реквизит, тайминг, чек-лист selling-points." />
          <Step n={3} title="Съёмка" text="Packshot + lifestyle/UGC. Снимаем сериями для A/B." />
          <Step n={4} title="Постпрод" text="Монтаж → цвет → motion → субтитры. Версии 6/15/30/60, верт/гор." />
        </ol>
      </section>

      {/* Пакеты */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Готовые пакеты</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Starter</h3>
            <p className="text-muted mt-1">Packshot + 2 короткие версии</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>Студийный сетап света</li>
              <li>Версии 6/15 сек (вертикаль)</li>
              <li>Субтитры, лого, финальный тезис</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Growth</h3>
            <p className="text-muted mt-1">Packshot + Lifestyle/UGC</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>3–5 selling-points</li>
              <li>Версии 6/15/30 сек (верт/гор.)</li>
              <li>Набор стоп-кадров для карточек</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Brand+</h3>
            <p className="text-muted mt-1">Сюжет + motion/3D</p>
            <ul className="mt-3 list-disc pl-5 text-muted space-y-1">
              <li>Сценарий и актёры</li>
              <li>Motion-акценты / 3D-разрезы</li>
              <li>Пакет версий под площадки</li>
            </ul>
          </div>
        </div>
        <p className="text-muted mt-3 text-sm">
          Финальная смета зависит от локаций, смен, реквизита и графики. Дадим 2–3 опции под ваш бюджет.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Готовы ускорить продажи?</div>
            <p className="text-muted mt-2">
              Пришлите тезисы и ссылки на карточку — соберём план и сроки сегодня.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/contacts" className="btn btn-primary">Запросить предложение</Link>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener noreferrer" className="btn">
              Чат в Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

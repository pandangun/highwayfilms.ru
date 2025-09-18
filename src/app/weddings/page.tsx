import Link from "next/link";

export const metadata = {
  title: "Свадебная видеосъёмка — Highway Films",
  description:
    "Кинематографичные свадебные фильмы: от тизера до полного фильма. Съёмка в Москве и Санкт-Петербурге, выезды по РФ.",
};

// мини-галерея — подставь свои кадры из /public/images/frames или /public/weddings/*
const frames = [
  "/images/frames/f001.jpg",
  "/images/frames/f002.jpg",
  "/images/frames/f003.jpg",
  "/images/frames/f004.jpg",
  "/images/frames/f005.jpg",
  "/images/frames/f006.jpg",
];

function Thumbs({ start = 0, count = 6 }: { start?: number; count?: number }) {
  const pics = Array.from({ length: count }, (_, i) => frames[(start + i) % frames.length]);
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
      {pics.map((src) => (
        <div key={src} className="relative aspect-[3/2] overflow-hidden rounded-lg ring-1 ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function Card({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="card rounded-xl p-6">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 text-sm text-neutral-300 leading-relaxed">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

export default function WeddingsPage() {
  return (
    <>
      {/* HERO */}
      <section className="container pt-12 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="h1 text-[clamp(32px,5vw,56px)] font-bold">Свадебная видеосъёмка</h1>
          <p className="lead mt-4">
            Киноязык, свет и ритм монтажа — чтобы день сохранился как красивый фильм.
            Работаем в Москве и Санкт-Петербурге, возможны выезды.
          </p>
        </div>

        {/* Что снимаем */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card title="Тизер (30–60 сек)">
            Идеален для соцсетей — динамичный ролик с самыми сильными моментами и акцентами
            на эмоции пары.
            <Thumbs start={0} count={6} />
          </Card>
          <Card title="Основной фильм (5–15 мин)">
            Небанальный рассказ с логикой дня: утро, церемония, банкет и вечер.
            Чистый звук клятв и речи, красивые перебивки, цветокор под ваш стиль.
            <Thumbs start={3} count={6} />
          </Card>
          <Card title="Полные версии моментов">
            Церемония/клятвы, первый танец, тосты — отданы целиком отдельными файлами.
          </Card>
          <Card title="Доставки под площадки">
            Горизонталь (YouTube/VK), вертикали (Reels/Shorts/TikTok), обложки и титры.
          </Card>
        </div>
      </section>

      {/* Пакеты */}
      <section className="container py-10 md:py-12">
        <h2 className="text-xl font-semibold">Пакеты</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="card rounded-xl p-6 ring-1 ring-white/10">
            <h3 className="font-semibold">Mini</h3>
            <p className="mt-2 text-sm text-neutral-300">
              6 часов съёмки, 1 оператор. Тизер 30–45 сек + фильм 4–6 мин.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>— Цветокор/звук</li>
              <li>— 1 правка по фильму</li>
            </ul>
          </div>

          <div className="card rounded-xl p-6 ring-1 ring-violet-400/30 bg-gradient-to-b from-violet-500/10">
            <h3 className="font-semibold">Standard</h3>
            <p className="mt-2 text-sm text-neutral-300">
              10 часов, 1–2 оператора. Тизер 45–60 сек + фильм 7–12 мин + полные версии ключевых моментов.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>— Отдельная запись клятв/речей</li>
              <li>— 2 итерации правок</li>
              <li>— Вертикальные версии</li>
            </ul>
          </div>

          <div className="card rounded-xl p-6 ring-1 ring-white/10">
            <h3 className="font-semibold">Premium</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Полный день, 2 оператора + аэро (по погоде). Тизер, фильм 10–15 мин, все полные
              версии, вертикали, обложки, экспресс-тизер на следующее утро.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>— Доп. смена монтажа на правки</li>
              <li>— Доставка в 4K/10-bit по запросу</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 px-6 py-7 ring-1 ring-white/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-neutral-100">
              Расскажите про площадку и формат — соберём точную смету и тайминг.
            </p>
            <Link
              href="/contacts"
              className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Узнать стоимость
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-16">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10">
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Сколько ждать готовые материалы?
            </summary>
            <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
              Тизер — 3–5 дней, основной фильм — до 3–4 недель (в сезон может быть дольше).
              Экспресс-варианты обсуждаем заранее.
            </div>
          </details>

          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Передаёте исходники?
            </summary>
            <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
              Да, по желанию пары передаём исходные материалы на диск/облако. В базовые пакеты
              входит мастер-фильм и ключевые полные версии.
            </div>
          </details>

          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Можно ли внести правки?
            </summary>
            <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
              В пакетах есть 1–2 итерации правок. Мы фиксируем ожидания на этапе брифа,
              чтобы итог был «в точку».
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

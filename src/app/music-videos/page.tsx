import Link from "next/link";

export const metadata = {
  title: "Музыкальные клипы — Highway Films",
  description:
    "Идея → тритмент → съёмка → постпродакшн. Комбинируем свет, локации и цветокор, чтобы собрать кинематографичный вайб под трек.",
};

/** 
 * Положи сюда реальные имена кадров из /public/images/frames/.
 * Если у тебя f1.jpg... — просто замени список ниже.
 */
const frames = [
  "/images/frames/f001.jpg",
  "/images/frames/f002.jpg",
  "/images/frames/f003.jpg",
  "/images/frames/f004.jpg",
  "/images/frames/f005.jpg",
  "/images/frames/f006.jpg",
];

function ThumbStrip({ start = 0 }: { start?: number }) {
  // берём 3 подряд (по кругу), чтобы встроить в карточку
  const picks = [0, 1, 2].map((i) => frames[(start + i) % frames.length]);
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {picks.map((src) => (
        <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function Card({
  title,
  desc,
  startThumb = 0,
}: {
  title: string;
  desc: string;
  startThumb?: number;
}) {
  return (
    <div className="card rounded-xl p-5 md:p-6 hover:translate-y-[-2px] transition">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{desc}</p>
      <ThumbStrip start={startThumb} />
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
        ●
      </span>
      <span className="text-sm text-neutral-300 leading-relaxed">{children}</span>
    </li>
  );
}

export default function MusicVideosPage() {
  return (
    <>
      {/* HERO */}
      <section className="container pt-12 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="h1 text-[clamp(32px,5vw,56px)] font-bold">
            Музыкальные клипы
          </h1>
          <p className="lead mt-4">
            Создаём клипы, где идея, цвет и ритм работают на артиста. Сочетаем
            локации, свет и постпродакшн, чтобы добиться «киношной» картинки и атмосферного вайба под трек.
          </p>
        </div>

        {/* Направления / Форматы — со встроенными стоп-кадрами */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card
            title="Creative / Treatment"
            desc="Идея и визуальная концепция, мудборды, референсы, сториборд. Под трек и образ артиста."
            startThumb={0}
          />
          <Card
            title="Съёмка и постановка"
            desc="Свет, постановка, движение камеры; steadicam/дрон/трек. Сцены под «ударные» моменты трека."
            startThumb={1}
          />
          <Card
            title="Монтаж и цветокор"
            desc="Ритмический монтаж в темп, клиповые переходы и акценты, cine-цветокор (до 4K/10-bit)."
            startThumb={2}
          />
          <Card
            title="VFX / титры"
            desc="Треккинг, композ, графические вставки, неон/глоу, пост-титры и обложки для площадок."
            startThumb={3}
          />
        </div>
      </section>

      {/* Как делаем — тоже с мини-превью внизу каждой карты */}
      <section className="container py-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card rounded-xl p-6">
            <h3 className="text-lg font-semibold">Процесс</h3>
            <ul className="mt-4 space-y-3">
              <Bullet>
                <b>Бриф + трек.</b> Разбираем смысл, темп, референсы и образ.
              </Bullet>
              <Bullet>
                <b>Тритмент.</b> Визуальная драматургия, мудборды, пропсы/костюмы, смета и тайминг.
              </Bullet>
              <Bullet>
                <b>Съёмка.</b> Свет/камера/постановка; отдельные сетапы под хуки и припев.
              </Bullet>
              <Bullet>
                <b>Пост.</b> Монтаж в ритм, клиповые переходы, цветокор, VFX, титры.
              </Bullet>
              <Bullet>
                <b>Доставки.</b> Мастер-версия и ресайзы под YouTube/VK/Shorts/Reels/TikTok.
              </Bullet>
            </ul>
           
          </div>

          <div className="card rounded-xl p-6">
            <h3 className="text-lg font-semibold">Что входит</h3>
            <ul className="mt-4 grid gap-3 text-sm text-neutral-300">
              <li className="border-l border-neutral-800 pl-4">Подбор локаций и арта; световая схема и шотлист</li>
              <li className="border-l border-neutral-800 pl-4">Съёмка до 4K/10-bit, дрон/стедикам по задаче</li>
              <li className="border-l border-neutral-800 pl-4">Монтаж, графика, цвет, звук; обложки и постеры</li>
              <li className="border-l border-neutral-800 pl-4">Версии под площадки: YouTube, VK, Shorts/Reels/TikTok</li>
            </ul>
            
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-10">
        <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 px-6 py-7 ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-xl font-semibold">Готов обсудить клип?</h3>
              <p className="text-neutral-300 mt-1">
                Пришлите трек и пару референсов — соберём тритмент и смету.
              </p>
            </div>
            <Link
              href="/contacts"
              className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium hover:opacity-95 transition"
            >
              Обсудить клип
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
              Сколько стоит клип и от чего зависит смета?
            </summary>
            <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
              Бюджет зависит от концепции, смен локаций, постановки, состава команды и техники
              (свет, движущаяся камера, дрон), а также объёма поста (VFX/графика). После брифа и трека
              мы присылаем тритмент с вилкой сметы и сроками.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Сроки производства?
            </summary>
            <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
              В среднем 2–4 недели: тритмент и препродакшн 5–7 дней, съёмка 1–2 смены,
              постпродакшн 7–14 дней. Экспресс-производство возможно при упрощении концепции.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Можно ли получить вертикальные версии?
            </summary>
            <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
              Да. Сразу планируем съёмку под горизонталь и вертикали (Shorts/Reels/TikTok),
              делаем отдельные кадрирования и версии с укороченным хроном.
            </div>
          </details>
          <details className="group p-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              Права на музыку и релиз?
            </summary>
            <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
              Права на трек остаются у правообладателя. Мы предоставляем мастер и исходники (по
              запросу), помогаем с обложками/титрами и подготовкой материалов под релиз.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

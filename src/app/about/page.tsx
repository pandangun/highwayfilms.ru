import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О компании — Highway Films",
  description:
    "Highway Films — видеопродакшн полного цикла: идея, съёмка, постпродакшн. Рекламные и корпоративные ролики, музыкальные клипы.",
};

/* ——— UI helpers ——— */

function GradientCard({
  title,
  text,
  icon,
  from = "from-purple-500/20",
  to = "to-cyan-500/15",
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
  from?: string;
  to?: string;
}) {
  return (
    <div
      className={[
        "relative rounded-2xl p-6",
        "bg-gradient-to-br", from, to,
        "ring-1 ring-white/10",
      ].join(" ")}
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl p-6",
        "bg-white/5 backdrop-blur-sm",
        "ring-1 ring-white/10",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="text-center">
      <div className="stat-value">{value}</div>
      <div className="stat-label mt-1">{label}</div>
    </GlassCard>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300">
      {children}
    </span>
  );
}

/* ——— Page ——— */

export default function AboutPage() {
  return (
    <>
      {/* HERO с мягким фоном */}
      <section className="container py-12 md:py-16">
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          <div className="absolute inset-0 bg-[url('/images/frames/f020.jpg')] opacity-20 bg-cover bg-center" />
          <div className="relative p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill>🎬 Полный цикл</Pill>
              <Pill>⚙️ Технологичность</Pill>
              <Pill>📈 Результат</Pill>
            </div>
            <h1 className="h1">
              Highway Films — видеопродакшн полного цикла
            </h1>
            <p className="lead measure mt-3">
              Создаём рекламные и корпоративные ролики, бренд-фильмы и клипы.
              Фокус — на визуальной силе, чётком повествовании и измеримом
              результате: узнаваемость, конверсии, доверие к продукту.
            </p>
          </div>
        </div>
      </section>

      {/* Ценности: разноцветные градиентные карточки */}
      <section className="container">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <GradientCard
            icon={<span>🎯</span>}
            title="Полный цикл"
            text="Идея → treatment → препрод → съёмка → пост. Прозрачные сметы и сроки."
            from="from-fuchsia-500/20"
            to="to-rose-500/15"
          />
          <GradientCard
            icon={<span>⚙️</span>}
            title="Технологичность"
            text="Съёмка до 4K/10-bit, продакшн-пайплайн, колор-менеджмент, мастера под площадки."
            from="from-cyan-400/20"
            to="to-blue-500/15"
          />
          <GradientCard
            icon={<span>📈</span>}
            title="Результат"
            text="Видео как инструмент: структура, инсайты, CTA и измеримые KPI."
            from="from-emerald-400/20"
            to="to-teal-500/15"
          />
        </div>
      </section>

      {/* Цифры/факты — крупно и воздушно */}
      <section className="container py-10 md:py-12">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat value="10+" label="лет опыта в продакшне" />
          <Stat value="50+" label="выпущенных проектов" />
          <Stat value="2" label="города работы" />
        </div>
        <p className="mt-3 text-xs text-muted">
          * Локации — Санкт-Петербург и Москва, возможны выезды.
        </p>
      </section>

      {/* Чем занимаемся — mix: стеклянные карточки с кнопками */}
      <section className="container">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard>
            <h3 className="text-lg font-semibold">Рекламные ролики</h3>
            <p className="mt-2 text-muted">
              Product/brand films, performance-форматы, имиджевые кампании.
            </p>
            <Link href="/commercials" className="btn mt-4">
              Подробнее
            </Link>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold">Корпоративное видео</h3>
            <p className="mt-2 text-muted">
              Фильмы о компании, презентации/стенды, HR и внутренние коммуникации.
            </p>
            <Link href="/corporate" className="btn mt-4">
              Подробнее
            </Link>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold">Музыкальные клипы</h3>
            <p className="mt-2 text-muted">
              Идея, постановка, съёмка, постпродакшн и релиз.
            </p>
            <Link href="/music-videos" className="btn mt-4">
              Подробнее
            </Link>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold">Постпродакшн</h3>
            <p className="mt-2 text-muted">
              Монтаж, цветокор, VFX, озвучание, субтитры, мастер-версии.
            </p>
            <Link href="/videoproduction" className="btn mt-4">
              Подробнее
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Процесс — компактный timeline */}
      <section className="container py-12 md:py-16">
        <GlassCard>
          <h2 className="text-2xl md:text-3xl font-semibold">Как мы работаем</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-4 text-sm">
            {[
              {
                n: 1,
                title: "Бриф и цели",
                text: "Задача, аудитория, сообщения, KPI.",
              },
              {
                n: 2,
                title: "Креатив и план",
                text: "Treatment, смета, таймлайн, команда и локации.",
              },
              {
                n: 3,
                title: "Продакшн",
                text: "Съёмка и звук. Контроль качества на площадке.",
              },
              {
                n: 4,
                title: "Постпродакшн",
                text: "Монтаж, цвет, графика. Master-версии под каналы.",
              },
            ].map((s) => (
              <li key={s.n} className="relative rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <b>{s.n}</b>
                </div>
                <div className="font-medium">{s.title}</div>
                <p className="mt-1 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <Link href="/contacts" className="btn btn-primary">
              Получить коммерческое предложение
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Команда — placeholder */}
      <section className="container pb-16">
        <GlassCard>
          <h2 className="text-2xl md:text-3xl font-semibold">Команда</h2>
          <p className="mt-2 text-muted measure">
            Под каждый проект собираем компактную продакшн-группу:
            режиссёр, продюсер, операторы, свет, звук, арт и постпродакшн.
            Фото и расширенный состав добавим позже.
          </p>
        </GlassCard>
      </section>
    </>
  );
}

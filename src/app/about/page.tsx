import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О компании — Highway Films",
  description:
    "Highway Films — видеопродакшн полного цикла: креатив, съёмка, постпродакшн. Рекламные и корпоративные ролики, музыкальные клипы.",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="text-3xl md:text-4xl font-semibold">{value}</div>
      <div className="mt-1 text-muted">{label}</div>
    </div>
  );
}

function ValueItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero-заголовок */}
      <section className="container py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-semibold">Highway Films — видеопродакшн полного цикла</h1>
        <p className="mt-4 text-muted max-w-3xl">
          Создаём рекламные и корпоративные ролики, бренд-фильмы и музыкальные клипы. Фокус — на визуальной силе,
          чётком повествовании и измеримом результате: рост узнаваемости, конверсий и доверия к продукту.
        </p>
      </section>

      {/* Ценности/подход */}
      <section className="container pb-8 md:pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ValueItem
            title="Полный цикл"
            text="Идея → treatment → препродакшн → съёмка → постпродакшн. Прозрачные сметы и сроки."
          />
          <ValueItem
            title="Технологичность"
            text="Съёмка до 4K/10-bit, надёжный продакшн-пайплайн, колор-менеджмент, мастер-версии под площадки."
          />
          <ValueItem
            title="Результат"
            text="Видео как инструмент: чётко под задачу бизнеса. Внимание к структуре, инсайтам и call-to-action."
          />
        </div>
      </section>

      {/* Цифры/факты */}
      <section className="container pb-8 md:pb-12">
        <div className="grid sm:grid-cols-3 gap-3">
          <Stat label="лет опыта в продакшне" value="10+" />
          <Stat label="выпущенных проектов" value="50+" />
          <Stat label="городов работы" value="2" />
        </div>
        <p className="mt-3 text-xs text-muted">
          * Цифры уточняются по мере пополнения портфолио. Локации — Санкт-Петербург и Москва, возможны выезды.
        </p>
      </section>

      {/* Чем занимаемся (коротко) */}
      <section className="container pb-12 md:pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="card p-5">
            <h3 className="text-lg font-medium">Рекламные ролики</h3>
            <p className="mt-2 text-muted">Product/brand films, performance-форматы, имиджевые кампании.</p>
            <Link href="/commercials" className="btn mt-4">Подробнее</Link>
          </div>
          <div className="card p-5">
            <h3 className="text-lg font-medium">Корпоративное видео</h3>
            <p className="mt-2 text-muted">Фильмы о компании, стенды/презентации, HR и внутренние коммуникации.</p>
            <Link href="/corporate" className="btn mt-4">Подробнее</Link>
          </div>
          <div className="card p-5">
            <h3 className="text-lg font-medium">Музыкальные клипы</h3>
            <p className="mt-2 text-muted">Идея, постановка, съёмка, постпродакшн и релиз.</p>
            <Link href="/music-videos" className="btn mt-4">Подробнее</Link>
          </div>
          <div className="card p-5">
            <h3 className="text-lg font-medium">Постпродакшн</h3>
            <p className="mt-2 text-muted">Монтаж, цветокор, VFX, озвучание, субтитры, мастер-версии.</p>
            <Link href="/videoproduction" className="btn mt-4">Подробнее</Link>
          </div>
        </div>
      </section>

      {/* Процесс (короткий) */}
      <section className="container pb-12 md:pb-16">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Как мы работаем</h2>
          <ol className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <li className="card p-4">
              <div className="font-medium">1. Бриф и цели</div>
              <p className="mt-1 text-muted">Бизнес-задача, аудитория, ключевые сообщения, KPI.</p>
            </li>
            <li className="card p-4">
              <div className="font-medium">2. Креатив и план</div>
              <p className="mt-1 text-muted">Treatment, смета, таймлайн, команда и локации.</p>
            </li>
            <li className="card p-4">
              <div className="font-medium">3. Продакшн</div>
              <p className="mt-1 text-muted">Съёмка и запись звука. Контроль качества на площадке.</p>
            </li>
            <li className="card p-4">
              <div className="font-medium">4. Постпродакшн</div>
              <p className="mt-1 text-muted">Монтаж, цвет, графика. Экспорт master-версий под каналы.</p>
            </li>
          </ol>
          <div className="mt-6">
            <Link href="/contacts" className="btn btn-primary">Получить коммерческое предложение</Link>
          </div>
        </div>
      </section>

      {/* Плейсхолдер под фото/команду */}
      <section className="container pb-16">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Команда</h2>
          <p className="mt-2 text-muted">
            Небольшая продакшн-группа под каждый проект. Режиссёр, продюсер, операторы, свет, звук, арт-департамент,
            постпродакшн. Фото и расширенный состав добавим позже.
          </p>
        </div>
      </section>
    </>
  );
}

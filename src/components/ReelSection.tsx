import StudioPlayer from "@/components/StudioPlayer";
import { sectionReels, type SectionKey } from "@/lib/media";

type ReelSectionProps = {
  section: SectionKey;
  eyebrow: string;
  title: string;
  lead?: string;
  /**
   * catalog — сетка роликов, клиент выбирает похожее на свою задачу.
   *   Для /weddings и /ai, где сравнение уместно.
   * reel — один зацикленный фоновый ролик без контролов.
   *   Для B2B-разделов: там не выбирают из шести корпоративных фильмов,
   *   там за двадцать секунд решают, умеем ли мы снимать.
   */
  mode?: "catalog" | "reel";
};

/**
 * Второй экран раздела — видео с примерами работ.
 *
 * Заменяет четыре несовместимых способа показа кейсов, которые
 * расползлись по проекту: AiVideoGallery, галерею-картинки в
 * StudioServicePage, WeddingCasesCarousel и логику внутри VideoHero.
 *
 * Пути к роликам берутся из lib/media.ts. Пока файлов нет, элементы помечены
 * placeholder — плеер показывает постер и не ходит по сети.
 */
export default function ReelSection({
  section,
  eyebrow,
  title,
  lead,
  mode = "catalog",
}: ReelSectionProps) {
  const items = sectionReels[section];
  if (items.length === 0) return null;

  return (
    <section className="container section-divider py-10 md:py-14">
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl">
            {title}
          </h2>
        </div>
        {lead ? <p className="max-w-xl text-white/62">{lead}</p> : null}
      </div>

      {mode === "reel" ? (
        <div className="on-dark surface-panel relative overflow-hidden rounded-[30px]">
          <StudioPlayer
            source={items[0].source}
            label={items[0].title}
            placeholder={items[0].placeholder}
            mode="ambient"
            className="aspect-[16/9] w-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/62">{items[0].tag}</p>
            <p className="font-display mt-2 text-[1.8rem] leading-[1] text-white">{items[0].title}</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="on-dark surface-panel overflow-hidden rounded-[26px]">
              <StudioPlayer
                source={item.source}
                label={item.title}
                placeholder={item.placeholder}
                mode="interactive"
                className="aspect-[16/9] w-full"
              />
              <div className="flex items-baseline justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/54">{item.tag}</p>
                  <h3 className="font-display mt-1 text-[1.35rem] leading-tight text-white">
                    {item.title}
                  </h3>
                </div>
                {item.duration ? (
                  <span className="text-xs text-white/48">{item.duration}</span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

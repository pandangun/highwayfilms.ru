import StudioPlayer from "@/components/StudioPlayer";
import { sectionReels, type SectionKey } from "@/lib/media";
import { sectionPricing } from "@/lib/pricing";

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

  const price = sectionPricing[section];

  return (
    <section className="container section-divider py-10 md:py-14">
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="font-display mt-3 text-display-md tracking-[var(--tracking-display)] text-ink">
            {title}
          </h2>
        </div>
        <div className="max-w-xl">
          {lead ? <p className="text-ink-muted">{lead}</p> : null}
          {/* Вилка рядом с примерами, а не отдельным прайс-блоком: цифра
              читается вместе с тем, за что она. У свадеб её нет — там цены
              показаны пакетами ниже по странице. */}
          {price ? (
            <p className="mt-3 text-meta leading-6 text-ink-faint">
              <span className="font-display text-display-sm text-ink">от {price.from}</span>
              <span className="mt-1 block">В стоимость входит: {price.includes}.</span>
            </p>
          ) : null}
        </div>
      </div>

      {/* Медиа скруглено, обвязка — нет: рамка вокруг подписи вернула бы
          карточку, а скругление у самого кадра читается как объект, не как
          коробка вокруг контента. */}
      {mode === "reel" ? (
        <div className="on-dark relative overflow-hidden rounded-lg">
          <StudioPlayer
            source={items[0].source}
            label={items[0].title}
            placeholder={items[0].placeholder}
            mode="ambient"
            className="aspect-[16/9] w-full"
          />
          <div className="on-dark pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 to-transparent p-6 md:p-8">
            <p className="text-eyebrow uppercase tracking-[var(--tracking-caps)] text-ink-muted">
              {items[0].tag}
            </p>
            <p className="font-display mt-2 text-display-sm leading-[var(--leading-title)] text-ink">
              {items[0].title}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id}>
              <StudioPlayer
                source={item.source}
                label={item.title}
                placeholder={item.placeholder}
                mode="interactive"
                className="on-dark aspect-[16/9] w-full rounded-md"
              />
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-hairline pt-4">
                <div>
                  <p className="text-eyebrow uppercase tracking-[var(--tracking-caps)] text-ink-faint">
                    {item.tag}
                  </p>
                  <h3 className="font-display mt-1 text-display-sm leading-[var(--leading-title)] text-ink">
                    {item.title}
                  </h3>
                </div>
                {item.duration ? (
                  <span className="text-meta text-ink-faint">{item.duration}</span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

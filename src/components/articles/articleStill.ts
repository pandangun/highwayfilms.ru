/**
 * Обложка статьи — кадр из раздела, к которому она относится. Раньше
 * обложки были цветными градиентами-заглушками; кадр из работы студии
 * говорит о теме больше, чем любая плашка.
 */
const stills: Record<string, string> = {
  "/commercials": "/images/stills/commercials-01.jpg",
  "/corporate": "/images/stills/corporate-01.jpg",
  "/music-videos": "/images/stills/music-videos-01.jpg",
  "/weddings": "/images/stills/weddings-01.jpg",
  "/ai": "/images/stills/ai-01.jpg",
  "/videoproduction": "/images/stills/videoproduction-01.jpg",
};

/**
 * Свой кадр у статей, которые делят один раздел: иначе в списке две
 * статьи подряд с одной и той же картинкой.
 */
const bySlug: Record<string, string> = {
  "kak-brendu-ispolzovat-korotkie-video-dlya-socsetey": "/images/stills/commercials-04.jpg",
  "backstage-kommercheskogo-prodakshna": "/images/stills/commercials-02.jpg",
};

export function articleStill(serviceHref: string, slug?: string) {
  return (slug && bySlug[slug]) ?? stills[serviceHref] ?? "/images/stills/commercials-02.jpg";
}

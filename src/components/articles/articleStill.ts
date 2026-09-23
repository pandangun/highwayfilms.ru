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

export function articleStill(serviceHref: string) {
  return stills[serviceHref] ?? "/images/stills/commercials-02.jpg";
}

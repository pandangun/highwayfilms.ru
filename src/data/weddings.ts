export type WeddingEditorialImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export type WeddingCase = {
  id: string;
  city: string;
  title: string;
  deliverable: string;
  summary: string;
  details: string[];
  image: WeddingEditorialImage;
  href: string;
};

export type WeddingProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type WeddingPackage = {
  id: string;
  eyebrow: string;
  title: string;
  fit: string;
  result: string;
  price: string;
  href: string;
  featured?: boolean;
};

export type WeddingExtra = {
  id: string;
  title: string;
  price: string;
  description: string;
  when: string;
  href: string;
  cta: string;
  mediaType: "phone" | "edit";
  image?: WeddingEditorialImage;
};

export type WeddingFaqItem = {
  q: string;
  a: string;
};

export type WeddingQuote = {
  award: string;
  text: string;
};

export const weddingEditorialImages = {
  cityPortrait: {
    src: "/images/weddings/wedding-city-portrait.png",
    alt: "Свадебный портрет пары на городской прогулке",
    objectPosition: "50% 42%",
  },
  cityExit: {
    src: "/images/weddings/wedding-city-exit.png",
    alt: "Выход пары после церемонии под лепестками цветов",
    objectPosition: "50% 46%",
  },
  morningPortrait: {
    src: "/images/weddings/wedding-morning-portrait.png",
    alt: "Утро невесты и подготовка к свадебному дню",
    objectPosition: "50% 40%",
  },
  lakesidePortrait: {
    src: "/images/weddings/wedding-lakeside-portrait.png",
    alt: "Портрет пары у воды в мягком дневном свете",
    objectPosition: "50% 44%",
  },
  eveningSparklers: {
    src: "/images/weddings/wedding-evening-sparklers.png",
    alt: "Вечерний свадебный банкет с бенгальскими огнями",
    objectPosition: "50% 52%",
  },
} as const satisfies Record<string, WeddingEditorialImage>;

export const weddingHeroChips = [
  "Без лишней постановки",
  "Помогаем с таймингом",
  "Тизер через несколько дней",
  "Москва / Санкт-Петербург / Россия",
] as const;

export const weddingApproachPoints = [
  "Подсказываем, где нужна короткая пауза для света и портретов.",
  "Не превращаем день в бесконечную постановку.",
] as const;

// TODO: replace placeholder VK links with real wedding case URLs.
export const weddingCases: WeddingCase[] = [
  {
    id: "saint-petersburg-intimate",
    city: "Санкт-Петербург",
    title: "Камерная свадьба",
    deliverable: "Тизер + фильм",
    summary: "Небольшой день с близкими, тихим ритмом и акцентом на интонациях между вами.",
    details: ["интимный формат", "день с близкими", "тихий ритм"],
    image: weddingEditorialImages.cityExit,
    href: "https://vk.com/",
  },
  {
    id: "moscow-city",
    city: "Москва",
    title: "Городская свадьба",
    deliverable: "Фильм + тизер",
    summary: "Прогулка по городу, церемония и энергия дня, собранная в мягкий кинематографичный монтаж.",
    details: ["городская прогулка", "живой тайминг", "мягкий свет"],
    image: weddingEditorialImages.cityPortrait,
    href: "https://vk.com/",
  },
  {
    id: "lenoblast-country",
    city: "Ленобласть",
    title: "Загородная церемония",
    deliverable: "Фильм + церемония",
    summary: "Воздух, пространство и длинный дневной свет. В центре атмосфера и живые паузы.",
    details: ["воздух и простор", "дневная церемония", "длинные паузы"],
    image: weddingEditorialImages.lakesidePortrait,
    href: "https://vk.com/",
  },
  {
    id: "moscow-evening-banquet",
    city: "Москва",
    title: "Большой вечерний банкет",
    deliverable: "Фильм + банкетный блок",
    summary: "Насыщенная вечерняя программа, тёплый свет и отдельный фокус на эмоциях зала.",
    details: ["вечерний свет", "большой зал", "динамичный финал"],
    image: weddingEditorialImages.eveningSparklers,
    href: "https://vk.com/",
  },
] as const;

export const weddingProcessSteps: WeddingProcessStep[] = [
  {
    step: "01",
    title: "Первый созвон и дата",
    description: "Уточняем дату, площадку, формат дня и сразу понимаем, какой объём съёмки вам действительно нужен.",
  },
  {
    step: "02",
    title: "Тайминг и логика съёмки",
    description: "Собираем день так, чтобы всё снималось спокойно, без лишних остановок и без давления камерой на вас и гостей.",
  },
  {
    step: "03",
    title: "Съёмка свадебного дня",
    description: "Работаем тихо, держим дистанцию и вмешиваемся только там, где это реально помогает свету, ритму и портретам.",
  },
  {
    step: "04",
    title: "Тизер через несколько дней",
    description: "Первое короткое видео приходит быстро, пока ощущение дня ещё живое и хочется сразу чем-то поделиться.",
  },
  {
    step: "05",
    title: "Фильм и финальная выдача",
    description: "Передаём фильм, тизер и дополнительные версии в понятной структуре, без хаоса в папках и без потерянных файлов.",
  },
] as const;

export const weddingPackages: WeddingPackage[] = [
  {
    id: "episode",
    eyebrow: "Для камерного дня",
    title: "Эпизод",
    fit: "Подходит для city hall, камерной церемонии или короткого свадебного дня.",
    result: "Тизер и короткий фильм без лишнего продакшн-размаха.",
    price: "от 60 000 ₽",
    href: "#wedding-brief",
  },
  {
    id: "film",
    eyebrow: "Основной выбор",
    title: "Фильм",
    fit: "Оптимален для полного свадебного дня с прогулкой, церемонией и вечерней частью.",
    result: "Тизер, фильм и ключевые полные эпизоды в одной собранной выдаче.",
    price: "от 95 000 ₽",
    href: "#wedding-brief",
    featured: true,
  },
  {
    id: "saga",
    eyebrow: "Для большого масштаба",
    title: "Сага",
    fit: "Когда у дня несколько локаций, насыщенная программа и важен расширенный комплект материалов.",
    result: "Расширенный фильм и полный набор версий под большое событие.",
    price: "от 140 000 ₽",
    href: "#wedding-brief",
  },
] as const;

export const weddingExtras: WeddingExtra[] = [
  {
    id: "mobile-shoot",
    title: "Мобильная съёмка",
    price: "от 40 000 ₽",
    description: "Лёгкий mobile-first формат для вертикалей, быстрых публикаций и спокойной работы без большого сетапа.",
    when: "Когда важны скорость, естественность и минимум техники вокруг.",
    href: "#wedding-brief",
    cta: "Обсудить опцию",
    mediaType: "phone",
  },
  {
    id: "same-day-edit",
    title: "Монтаж в день свадьбы",
    price: "по запросу",
    description: "Короткий ролик, собранный в день события для вечернего показа или публикации в тот же день.",
    when: "Когда хочется показать live-результат гостям прямо на банкете.",
    href: "#wedding-brief",
    cta: "Обсудить опцию",
    mediaType: "edit",
  },
] as const;

export const weddingQuotes: WeddingQuote[] = [
  {
    award: "Grand Prix",
    text: "Спокойно с первого созвона.",
  },
  {
    award: "Jury Prize",
    text: "Очень естественно и без суеты.",
  },
  {
    award: "Best Atmosphere",
    text: "Красиво, элегантно, с чувством.",
  },
  {
    award: "Special Mention",
    text: "Оператор почти невидим.",
  },
  {
    award: "Audience Award",
    text: "Фильм хочется пересматривать.",
  },
] as const;

export const weddingFaqItems: WeddingFaqItem[] = [
  {
    q: "Когда будет готово видео?",
    a: "Тизер обычно отдаём через несколько дней, финальный фильм — в среднем через 3-4 недели. Точный срок фиксируем заранее.",
  },
  {
    q: "Что мы получим в итоге?",
    a: "Базово это тизер и фильм. В расширенных форматах добавляем полные эпизоды, вертикальные версии и дополнительные cutdowns.",
  },
  {
    q: "Работаете только в Москве и Санкт-Петербурге?",
    a: "Нет. Базируемся между Москвой и Санкт-Петербургом, но спокойно выезжаем по России и заранее считаем всю логистику.",
  },
  {
    q: "Будет ли много постановки?",
    a: "Нет. Мы подсказываем только там, где это реально помогает свету, ритму и портретам. В остальном день остаётся живым.",
  },
  {
    q: "Можно ли заранее понять бюджет?",
    a: "Да. После короткого разговора быстро собираем ориентир по смете под ваш тайминг, масштаб и нужный комплект выдачи.",
  },
  {
    q: "Когда лучше бронировать дату?",
    a: "Чем раньше, тем спокойнее. Популярные летние субботы обычно уходят первыми, поэтому лучше писать сразу, как только у вас появилась дата.",
  },
  {
    q: "Снимаете ли вы полный день?",
    a: "Да. Можем снять и камерный формат на несколько часов, и полный свадебный день от утра до вечерней части.",
  },
  {
    q: "Можно ли добавить вертикальные ролики для соцсетей?",
    a: "Да. Вертикальные версии и короткие cutdowns можно заложить сразу в пакет или добавить отдельно.",
  },
  {
    q: "Что если в день свадьбы плохая погода?",
    a: "Мы заранее думаем о запасных сценариях по свету и локациям. Плохая погода не ломает съёмку, если к ней подготовиться.",
  },
  {
    q: "Помогаете ли вы с таймингом дня?",
    a: "Да. Подскажем, где лучше заложить время на портреты, сборы, церемонию и переезды, чтобы день ощущался спокойно и без перегруза.",
  },
  {
    q: "Можно ли обсудить всё без длинной анкеты?",
    a: "Да. Для старта достаточно короткого брифа или сообщения в Telegram. Остальное соберём уже в разговоре.",
  },
] as const;

export const weddingContactHighlights = [
  "Ответим в день обращения",
  "Соберём смету под ваш тайминг",
  "Сразу скажем, где можно упростить продакшн",
] as const;

export type Locale = "ru" | "en";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LocalizedArticleContent = {
  title: string;
  excerpt: string;
  description: string;
  category: string;
  readingTime: string;
  intro: string;
  coverEyebrow: string;
  coverDetail: string;
  sections: ArticleSection[];
};

export type Article = {
  slug: string;
  publishedAt: string;
  featured?: boolean;
  related: string[];
  coverTone: "violet" | "amber" | "blue" | "crimson" | "forest";
  serviceHref: string;
  serviceLabel: { ru: string; en: string };
  ru: LocalizedArticleContent;
  en: LocalizedArticleContent;
};

export const articles: Article[] = [
  {
    slug: "kak-zakazat-reklamnyy-rolik-dlya-biznesa",
    publishedAt: "2026-03-12",
    featured: true,
    related: ["backstage-kommercheskogo-prodakshna", "kak-brendu-ispolzovat-korotkie-video-dlya-socsetey"],
    coverTone: "violet",
    serviceHref: "/commercials",
    serviceLabel: { ru: "Рекламные ролики", en: "Commercial production" },
    ru: {
      title: "Как заказать рекламный ролик для бизнеса без расплывчатого продакшна",
      excerpt: "Что стоит подготовить до первого звонка, чтобы ролик работал на бренд, а не превращался в дорогую неопределённость.",
      description: "Задача, референсы, KPI, deliverables и бюджетные рамки перед заказом рекламного ролика.",
      category: "Реклама",
      readingTime: "6 мин",
      intro: "У рекламного ролика проблема редко начинается на съёмке. Чаще всего всё ломается раньше: когда задача сформулирована слишком общо, а продакшн отвечает красивыми, но пустыми обещаниями.",
      coverEyebrow: "Editorial",
      coverDetail: "Бриф · KPI · Продакшн",
      sections: [
        {
          heading: "Что должно быть ясно до старта",
          paragraphs: [
            "Полезно сразу понимать, где ролик будет жить: на сайте, в рекламе, в презентации продукта или в соцсетях. От этого зависит длина, драматургия, команда и пакет адаптаций.",
            "Второй слой — ограничения: сроки, диапазон бюджета, площадка, нужен ли каст, графика и voice-over. Чем меньше тумана в начале, тем спокойнее препрод.",
          ],
          bullets: ["Одна бизнес-задача на один ролик", "Реальный диапазон бюджета", "Список выходных материалов ещё до съёмки"],
        },
        {
          heading: "Зачем нужны deliverables",
          paragraphs: [
            "Часто бренду нужен не один master, а пакет: короткие cutdowns, вертикальные версии, clean-версии и превью для публикации. Если это обсуждается заранее, съёмка начинает работать в несколько каналов сразу.",
          ],
        },
      ],
    },
    en: {
      title: "How to commission a commercial without drifting into vague production",
      excerpt: "What to prepare before the first call so the video serves the brand instead of turning into expensive ambiguity.",
      description: "Business task, references, KPIs, deliverables, and budget frame before commissioning a commercial.",
      category: "Commercials",
      readingTime: "6 min",
      intro: "Commercials rarely fail because of the camera package. They usually fail earlier, when the brief is vague and production answers with beautiful but unfocused promises.",
      coverEyebrow: "Editorial",
      coverDetail: "Brief · KPI · Production",
      sections: [
        {
          heading: "What should be clear before the project starts",
          paragraphs: [
            "It helps to know where the film will live: website, paid ads, product launch, deck, or social. That single choice affects runtime, tone, crew size, and edit logic.",
            "The second layer is constraints: timing, budget window, location, casting, graphics, and voice-over. The less fog at the start, the cleaner the prep becomes.",
          ],
          bullets: ["One business task per film", "A real budget range", "A clear delivery list before the shoot"],
        },
        {
          heading: "Why deliverables matter",
          paragraphs: [
            "Brands rarely need just one master. They usually need cutdowns, vertical edits, clean versions, and publishing assets. If those are defined in advance, one shoot day can feed several channels at once.",
          ],
        },
      ],
    },
  },
  {
    slug: "skolko-stoit-videosemka-meropriyatiya",
    publishedAt: "2026-03-06",
    related: ["kak-zakazat-reklamnyy-rolik-dlya-biznesa", "backstage-kommercheskogo-prodakshna"],
    coverTone: "blue",
    serviceHref: "/corporate",
    serviceLabel: { ru: "Корпоративные и event-проекты", en: "Corporate and event coverage" },
    ru: {
      title: "Сколько стоит видеосъёмка мероприятия и от чего реально зависит смета",
      excerpt: "Почему стоимость event-видеосъёмки зависит не только от часов съёмки, но и от формата выдачи, команды и логистики.",
      description: "Камеры, звук, монтаж, графика, адаптации и сроки в смете на видеосъёмку мероприятия.",
      category: "Мероприятия",
      readingTime: "7 мин",
      intro: "Фраза «снять мероприятие» звучит просто, но внутри неё могут скрываться очень разные задачи: от компактного aftermovie до многокамерной записи с отдельным звуком и серией адаптаций.",
      coverEyebrow: "Production Notes",
      coverDetail: "Crew · Coverage · Delivery",
      sections: [
        {
          heading: "Цена начинается с результата",
          paragraphs: [
            "Если нужен только aftermovie, акцент идёт на репортаж и ритм. Если клиенту нужны ещё полные записи, интервью, графика и короткие версии для диджитала, проект резко усложняется.",
          ],
        },
        {
          heading: "Что чаще всего двигает бюджет вверх",
          paragraphs: [
            "Многокамерная схема, отдельный звук, сложная площадка, выездная логистика и быстрый дедлайн на монтаж — самые частые факторы роста сметы.",
          ],
          bullets: ["Несколько зон съёмки одновременно", "Отдача в 24–48 часов", "Дополнительные digital-версии"],
        },
      ],
    },
    en: {
      title: "How much event video production costs and what actually drives the estimate",
      excerpt: "Why event video budgets depend on much more than the number of shooting hours.",
      description: "Cameras, audio, editing, graphics, digital adaptations, and turnaround windows in event video budgets.",
      category: "Events",
      readingTime: "7 min",
      intro: "“Shoot the event” sounds simple, but it may describe very different scopes: from a concise aftermovie to full multi-camera coverage with isolated sound and several final versions.",
      coverEyebrow: "Production Notes",
      coverDetail: "Crew · Coverage · Delivery",
      sections: [
        {
          heading: "The budget starts with the output",
          paragraphs: [
            "A compact aftermovie is one thing. A package with full recordings, interviews, graphics, and short digital edits is another. The delivery logic changes the whole estimate.",
          ],
        },
        {
          heading: "What usually pushes the number up",
          paragraphs: [
            "Multi-camera setups, separate audio, difficult venues, travel logistics, and fast post-production are the most common factors that move event budgets upward.",
          ],
          bullets: ["Several capture zones", "24–48 hour turnaround", "Extra social edits"],
        },
      ],
    },
  },
  {
    slug: "kak-podgotovitsya-k-semke-svadebnogo-filma",
    publishedAt: "2026-02-27",
    related: ["skolko-stoit-videosemka-meropriyatiya", "backstage-kommercheskogo-prodakshna"],
    coverTone: "amber",
    serviceHref: "/weddings",
    serviceLabel: { ru: "Свадебные фильмы", en: "Wedding films" },
    ru: {
      title: "Как подготовиться к съёмке свадебного фильма без стресса и постановочной суеты",
      excerpt: "Спокойный материал для пар: что обсудить заранее, как собрать тайминг и что реально помогает видео выглядеть живым.",
      description: "Тайминг, свет, логистика и коммуникация перед съёмкой свадебного фильма.",
      category: "Свадьбы",
      readingTime: "5 мин",
      intro: "Подготовка к свадебной видеосъёмке не должна превращать день в production set. Хорошая схема работает наоборот: немного ясности до съёмки — и дальше команда двигается спокойно и почти незаметно.",
      coverEyebrow: "Wedding Notes",
      coverDetail: "Тайминг · Свет · Спокойствие",
      sections: [
        {
          heading: "Тайминг важнее длинного moodboard",
          paragraphs: [
            "Полезнее всего заранее собрать живой ход дня: сборы, дорога, ceremony, банкет, first dance и ключевые паузы. Даже приблизительный тайминг лучше хаоса.",
          ],
        },
        {
          heading: "Что особенно влияет на картинку",
          paragraphs: [
            "Хороший свет, небольшой запас между блоками дня и заранее согласованная коммуникация с площадкой, координатором и фотографом дают видео гораздо больше, чем постоянная постановка.",
          ],
          bullets: ["Буфер между крупными блоками", "Понятный свет в комнате сборов", "Спокойная координация команды"],
        },
      ],
    },
    en: {
      title: "How to prepare for a wedding film without stress or staged chaos",
      excerpt: "A practical guide for couples who want a calm wedding film and a crew that does not take over the day.",
      description: "Timing, light, logistics, and calm communication before a wedding film.",
      category: "Weddings",
      readingTime: "5 min",
      intro: "Preparing for a wedding film should not turn the day into a film set. A good setup works in the opposite direction: a little clarity in advance, then a calm and almost invisible crew on the day itself.",
      coverEyebrow: "Wedding Notes",
      coverDetail: "Timing · Light · Ease",
      sections: [
        {
          heading: "A timeline matters more than a huge moodboard",
          paragraphs: [
            "The most useful thing is a living schedule: prep, transfer, ceremony, reception, first dance, and the natural pauses in between. Even a rough timeline is better than chaos.",
          ],
        },
        {
          heading: "What really shapes the footage",
          paragraphs: [
            "Good light, small buffers between major parts of the day, and calm alignment with the venue, coordinator, and photographer matter more than constant staging.",
          ],
          bullets: ["Buffers between major blocks", "Clean light during prep", "Calm crew coordination"],
        },
      ],
    },
  },
  {
    slug: "backstage-kommercheskogo-prodakshna",
    publishedAt: "2026-02-18",
    related: ["kak-zakazat-reklamnyy-rolik-dlya-biznesa", "skolko-stoit-videosemka-meropriyatiya"],
    coverTone: "crimson",
    serviceHref: "/videoproduction",
    serviceLabel: { ru: "Подход студии", en: "Studio approach" },
    ru: {
      title: "Backstage коммерческого продакшна: что клиент обычно не видит, но за что платит",
      excerpt: "Treatment, логистика, продюсерская сборка, сменный план и контроль финальной отдачи — невидимый слой, который делает проект зрелым.",
      description: "Препрод, съёмка, пост и доставка материалов в коммерческом продакшне.",
      category: "Процессы",
      readingTime: "6 мин",
      intro: "Со стороны коммерческий продакшн часто выглядит как один съёмочный день. На деле главное качество проекта рождается в подготовке, в логистике и в том, как команда собирает финальную выдачу.",
      coverEyebrow: "Backstage",
      coverDetail: "Prep · Shoot · Post",
      sections: [
        {
          heading: "Препрод решает почти всё",
          paragraphs: [
            "Treatment, moodboard, список сцен, команда и продюсерская логика смены — это не формальности, а способ сделать съёмку управляемой ещё до выхода на площадку.",
          ],
        },
        {
          heading: "Пост — это не магическая кнопка",
          paragraphs: [
            "Монтаж, звук, цвет и графика работают лучше всего тогда, когда они усиливают уже правильно собранный материал. Тогда финальная отдача ощущается дорогой не из-за эффекта, а из-за дисциплины.",
          ],
        },
      ],
    },
    en: {
      title: "Commercial production backstage: what clients rarely see but actually pay for",
      excerpt: "Treatment, logistics, producer structure, schedule control, and delivery discipline are the hidden layer that makes production feel mature.",
      description: "Prep, shoot, post, and delivery in commercial production.",
      category: "Process",
      readingTime: "6 min",
      intro: "Commercial production often looks like a single shoot day from the outside. In reality, the deeper quality of the project is built in preparation, logistics, and the final delivery structure.",
      coverEyebrow: "Backstage",
      coverDetail: "Prep · Shoot · Post",
      sections: [
        {
          heading: "Prep decides almost everything",
          paragraphs: [
            "Treatment, moodboard, scene list, crew structure, and producer logic are not formalities. They are the reason a shoot feels controlled before the first frame is captured.",
          ],
        },
        {
          heading: "Post is not a magic button",
          paragraphs: [
            "Edit, sound, grade, and graphics work best when they strengthen material that was already captured with intention. That is what makes the delivery feel premium.",
          ],
        },
      ],
    },
  },
  {
    slug: "kak-brendu-ispolzovat-korotkie-video-dlya-socsetey",
    publishedAt: "2026-02-05",
    related: ["kak-zakazat-reklamnyy-rolik-dlya-biznesa", "backstage-kommercheskogo-prodakshna"],
    coverTone: "forest",
    serviceHref: "/ai",
    serviceLabel: { ru: "AI и short-form визуал", en: "AI and short-form visuals" },
    ru: {
      title: "Как бренду использовать короткие видео для соцсетей без ощущения случайного контента",
      excerpt: "Short-form работает лучше, когда у бренда есть визуальная система, а не поток разрозненных роликов.",
      description: "Серийность, hooks, адаптации и единый визуальный язык коротких видео для бренда.",
      category: "Short-form",
      readingTime: "5 мин",
      intro: "Короткие видео уже стали базовым языком digital-коммуникации. Из-за этого рынок заполнен случайным контентом. Чтобы short-form работал на бренд, ему нужна система.",
      coverEyebrow: "Social Video",
      coverDetail: "Hooks · Series · Adaptations",
      sections: [
        {
          heading: "Один ролик не заменяет серию",
          paragraphs: [
            "Разовый удачный клип может дать всплеск, но не строит визуальное присутствие. Бренду полезнее мыслить сериями и повторяемым ритмом публикаций.",
          ],
        },
        {
          heading: "Что делает короткий ролик рабочим",
          paragraphs: [
            "Сильный вход, одна ясная мысль и понятный пакет вертикальных адаптаций дают short-form больше пользы, чем хаотичная гонка за вирусностью.",
          ],
          bullets: ["Hook в первые секунды", "Одна идея на ролик", "Вертикальные версии сразу после съёмки"],
        },
      ],
    },
    en: {
      title: "How brands can use short videos for social without looking random",
      excerpt: "Short-form works better when the brand has a visual system instead of a stream of disconnected clips.",
      description: "Series logic, hooks, adaptations, and a unified visual language for brand short-form video.",
      category: "Short-form",
      readingTime: "5 min",
      intro: "Short video is already a core language of digital communication. That is exactly why the market is full of random-looking content. For short-form to work for a brand, it needs system.",
      coverEyebrow: "Social Video",
      coverDetail: "Hooks · Series · Adaptations",
      sections: [
        {
          heading: "One clip is not a strategy",
          paragraphs: [
            "A single successful clip can spike reach, but it does not build a visual presence. Brands benefit more from thinking in series and recurring formats.",
          ],
        },
        {
          heading: "What makes short-form effective",
          paragraphs: [
            "A strong hook, one clear idea, and vertical adaptations prepared in advance make short-form more useful than chasing randomness.",
          ],
          bullets: ["A fast hook", "One idea per video", "Vertical edits planned from the start"],
        },
      ],
    },
  },
];

export type ResolvedArticle = Article & { content: LocalizedArticleContent };

export function resolveArticle(article: Article, locale: Locale): ResolvedArticle {
  return { ...article, content: locale === "en" ? article.en : article.ru };
}

export function getAllArticles(locale: Locale): ResolvedArticle[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((article) => resolveArticle(article, locale));
}

export function getFeaturedArticle(locale: Locale): ResolvedArticle | undefined {
  return getAllArticles(locale).find((article) => article.featured);
}

export function getArticleBySlug(slug: string, locale: Locale): ResolvedArticle | undefined {
  const article = articles.find((item) => item.slug === slug);
  return article ? resolveArticle(article, locale) : undefined;
}

export function getRelatedArticles(slug: string, locale: Locale): ResolvedArticle[] {
  const base = articles.find((item) => item.slug === slug);

  if (!base) {
    return [];
  }

  return base.related
    .map((relatedSlug) => getArticleBySlug(relatedSlug, locale))
    .filter((item): item is ResolvedArticle => Boolean(item));
}

export function getArticleHref(slug: string, locale: Locale): string {
  return locale === "en" ? `/en/articles/${slug}` : `/articles/${slug}`;
}

export function formatArticleDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

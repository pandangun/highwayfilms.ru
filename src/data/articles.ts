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
  sections: ArticleSection[];
};

export type Article = {
  slug: string;
  publishedAt: string;
  featured?: boolean;
  related: string[];
  /** Раздел сайта, к которому относится статья. По нему же выбирается обложка. */
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
    serviceHref: "/commercials",
    serviceLabel: { ru: "Реклама", en: "Commercials" },
    ru: {
      title: "Как заказать рекламный ролик: что подготовить до первого звонка",
      excerpt: "Пять вопросов, на которые стоит ответить заранее. С ними смета будет точной, а ролик — тем, который нужен.",
      description: "Что подготовить перед заказом рекламного ролика: задача, площадки, бюджет, список версий и примеры.",
      category: "Реклама",
      readingTime: "4 мин",
      intro: "Большинство проблем с рекламным роликом начинаются задолго до съёмки: в момент, когда задачу описали одной фразой. Вот что стоит решить до первого разговора со студией.",
      sections: [
        {
          heading: "Где будут показывать ролик",
          paragraphs: [
            "Сайт, реклама в соцсетях, карточка на маркетплейсе, экран на выставке — у каждой площадки свой хронометраж и формат кадра. Вертикальный ролик для рекламы и горизонтальный для сайта лучше снимать за одну смену, чем переснимать потом.",
            "Составьте список площадок заранее. Студия заложит нужные кадры в список сцен, и одна съёмка даст все версии.",
          ],
        },
        {
          heading: "Что ещё решить до звонка",
          paragraphs: [
            "Ориентир по бюджету экономит время обеим сторонам: студия сразу предложит формат, который в него помещается. Дата запуска определяет, сколько времени останется на подготовку.",
          ],
          bullets: [
            "Одна задача на один ролик: продать, познакомить или объяснить",
            "Диапазон бюджета, пусть даже примерный",
            "Список версий: длина, формат кадра, площадки",
            "Два-три ролика, которые вам нравятся, и чем именно",
          ],
        },
      ],
    },
    en: {
      title: "How to commission a commercial: what to prepare before the first call",
      excerpt: "Five questions worth answering in advance. With them the estimate is accurate and the spot is the one you need.",
      description: "What to prepare before commissioning a commercial: the task, placements, budget, list of versions and examples.",
      category: "Commercials",
      readingTime: "4 min",
      intro: "Most problems with a commercial start long before the shoot, at the moment the task is described in a single sentence. Here is what to decide before your first talk with a studio.",
      sections: [
        {
          heading: "Where the spot will run",
          paragraphs: [
            "Website, social ads, a marketplace listing, a screen at a trade show: each placement has its own length and frame format. It is cheaper to shoot the vertical ad and the horizontal website version on one day than to reshoot later.",
            "Make a list of placements in advance. The studio will put the right shots into the shot list, and one shoot will give you every version.",
          ],
        },
        {
          heading: "What else to decide before the call",
          paragraphs: [
            "A budget range saves time for both sides: the studio can suggest a format that fits it right away. The launch date sets how much time is left for preparation.",
          ],
          bullets: [
            "One task per spot: sell, introduce or explain",
            "A budget range, even a rough one",
            "A list of versions: length, frame format, placements",
            "Two or three videos you like, and what exactly you like about them",
          ],
        },
      ],
    },
  },
  {
    slug: "skolko-stoit-videosemka-meropriyatiya",
    publishedAt: "2026-03-06",
    related: ["kak-zakazat-reklamnyy-rolik-dlya-biznesa", "backstage-kommercheskogo-prodakshna"],
    serviceHref: "/corporate",
    serviceLabel: { ru: "Корпоративное видео", en: "Corporate video" },
    ru: {
      title: "Сколько стоит видеосъёмка мероприятия и из чего складывается смета",
      excerpt: "Часы съёмки — только часть цены. Сильнее всего на неё влияет то, что вы хотите получить на выходе.",
      description: "Из чего складывается смета на видеосъёмку мероприятия: камеры, звук, монтаж, короткие версии и сроки.",
      category: "Мероприятия",
      readingTime: "4 мин",
      intro: "Просьба «снять мероприятие» может означать очень разное: короткий ролик-отчёт на минуту или полную запись каждого выступления с отдельным звуком. От этого и зависит смета.",
      sections: [
        {
          heading: "Цена начинается с результата",
          paragraphs: [
            "Ролик-отчёт на одну-две минуты снимает один оператор. Полные записи выступлений требуют нескольких камер, отдельного звука со сцены и дольше монтируются. Интервью со спикерами и графика с цифрами — ещё отдельные строки.",
          ],
        },
        {
          heading: "Что чаще всего увеличивает смету",
          paragraphs: [
            "Сама площадка на цену влияет мало. Дороже выходят сжатые сроки и параллельные события: ролик к утру следующего дня или съёмка в нескольких залах сразу.",
          ],
          bullets: [
            "Несколько залов одновременно",
            "Монтаж за 24–48 часов",
            "Короткие версии для соцсетей в тот же день",
            "Выезд в другой город",
          ],
        },
      ],
    },
    en: {
      title: "How much event filming costs and what goes into the estimate",
      excerpt: "Hours of filming are only part of the price. What matters most is what you want to get in the end.",
      description: "What goes into an event filming estimate: cameras, sound, editing, short versions and deadlines.",
      category: "Events",
      readingTime: "4 min",
      intro: "“Film our event” can mean very different things: a one-minute recap or a full recording of every talk with separate sound. The estimate depends on which one you need.",
      sections: [
        {
          heading: "The price starts with the result",
          paragraphs: [
            "A one or two-minute recap needs one camera operator. Full recordings of the talks need several cameras, separate sound from the stage and a longer edit. Speaker interviews and graphics with figures are separate lines.",
          ],
        },
        {
          heading: "What usually raises the estimate",
          paragraphs: [
            "The venue itself rarely makes it more expensive. Deadlines and parallel sessions do: a video needed by the next morning, or events running in several halls at once.",
          ],
          bullets: ["Several halls at once", "Editing within 24–48 hours", "Same-day social cuts", "Travel to another city"],
        },
      ],
    },
  },
  {
    slug: "kak-podgotovitsya-k-semke-svadebnogo-filma",
    publishedAt: "2026-02-27",
    related: ["skolko-stoit-videosemka-meropriyatiya", "backstage-kommercheskogo-prodakshna"],
    serviceHref: "/weddings",
    serviceLabel: { ru: "Свадебные фильмы", en: "Wedding films" },
    ru: {
      title: "Как подготовиться к съёмке свадебного фильма",
      excerpt: "Что обсудить с видеографом заранее, как собрать план дня и почему запас времени важнее идеального сценария.",
      description: "Подготовка к свадебной видеосъёмке: план дня, свет в комнате сборов, запас времени, связь с площадкой и фотографом.",
      category: "Свадьбы",
      readingTime: "4 мин",
      intro: "Хорошему свадебному фильму не нужна постановка. Ему нужен понятный план дня и немного свободного времени между его частями.",
      sections: [
        {
          heading: "План дня важнее мудборда",
          paragraphs: [
            "Самое полезное, что можно сделать заранее, — расписать день по часам: сборы, дорога, церемония, прогулка, банкет, первый танец. Даже примерный план помогает оператору быть в нужном месте вовремя.",
          ],
        },
        {
          heading: "Что сильнее всего влияет на картинку",
          paragraphs: [
            "Свет и время. Сборы у большого окна выглядят лучше, чем в тёмной комнате с верхним светом. Пятнадцать минут между блоками дня дают спокойные портреты вместо снятых на бегу.",
          ],
          bullets: [
            "Запас 10–15 минут между частями дня",
            "Комната для сборов с окном",
            "Контакты площадки, координатора и фотографа заранее",
          ],
        },
      ],
    },
    en: {
      title: "How to prepare for a wedding film",
      excerpt: "What to agree with the videographer in advance, how to plan the day and why spare time matters more than a perfect script.",
      description: "Preparing for wedding filming: the plan of the day, light in the getting-ready room, spare time, coordination with the venue and photographer.",
      category: "Weddings",
      readingTime: "4 min",
      intro: "A good wedding film doesn't need staging. It needs a clear plan of the day and a little free time between its parts.",
      sections: [
        {
          heading: "A plan of the day matters more than a moodboard",
          paragraphs: [
            "The most useful thing to do in advance is to write the day down hour by hour: getting ready, travel, ceremony, walk, reception, first dance. Even a rough plan helps the camera operator be in the right place on time.",
          ],
        },
        {
          heading: "What affects the image most",
          paragraphs: [
            "Light and time. Getting ready by a large window looks better than in a dark room with ceiling lights. Fifteen minutes between parts of the day give calm portraits instead of rushed ones.",
          ],
          bullets: [
            "10–15 spare minutes between parts of the day",
            "A getting-ready room with a window",
            "Contacts of the venue, coordinator and photographer in advance",
          ],
        },
      ],
    },
  },
  {
    slug: "backstage-kommercheskogo-prodakshna",
    publishedAt: "2026-02-18",
    related: ["kak-zakazat-reklamnyy-rolik-dlya-biznesa", "skolko-stoit-videosemka-meropriyatiya"],
    serviceHref: "/videoproduction",
    serviceLabel: { ru: "Полный цикл", en: "Full production" },
    ru: {
      title: "За что вы платите в смете на рекламный ролик",
      excerpt: "Съёмочный день — самая заметная часть работы, но не самая большая. Разбираем, что происходит до и после него.",
      description: "Из чего состоит производство рекламного ролика: подготовка, съёмочный день, монтаж, цвет, звук и выдача версий.",
      category: "Производство",
      readingTime: "4 мин",
      intro: "Со стороны кажется, что ролик — это один съёмочный день. На деле половина работы делается до него, а ещё треть — после.",
      sections: [
        {
          heading: "Подготовка",
          paragraphs: [
            "Сценарий, раскадровка, список сцен, подбор актёров и локаций, план смены по часам. Благодаря этому съёмочный день идёт без остановок и никто не решает на площадке, что снимать дальше. Лишняя смена стоит дороже, чем день подготовки.",
          ],
        },
        {
          heading: "Монтаж, цвет и звук",
          paragraphs: [
            "Монтаж собирает историю, цветокоррекция приводит все кадры к одному виду, звук делает ролик дорогим на слух. Хорошая подготовка сокращает и эту часть: когда материал снят по плану, монтаж не превращается в поиск удачных дублей.",
          ],
        },
      ],
    },
    en: {
      title: "What you pay for in a commercial's estimate",
      excerpt: "The shoot day is the most visible part of the work, but not the largest. Here is what happens before and after it.",
      description: "What producing a commercial involves: preparation, the shoot day, editing, grading, sound and delivery.",
      category: "Production",
      readingTime: "4 min",
      intro: "From the outside a commercial looks like one shoot day. In fact half the work happens before it and another third after it.",
      sections: [
        {
          heading: "Preparation",
          paragraphs: [
            "Script, storyboard, shot list, casting and locations, an hour-by-hour plan of the day. Thanks to this the shoot day runs without stops and nobody on set has to decide what to film next. An extra shoot day costs more than a day of preparation.",
          ],
        },
        {
          heading: "Edit, grade and sound",
          paragraphs: [
            "The edit builds the story, the grade brings every shot to one look, and the sound makes the spot feel expensive. Good preparation shortens this part too: when the footage follows the plan, the edit stops being a hunt for lucky takes.",
          ],
        },
      ],
    },
  },
  {
    slug: "kak-brendu-ispolzovat-korotkie-video-dlya-socsetey",
    publishedAt: "2026-02-05",
    related: ["kak-zakazat-reklamnyy-rolik-dlya-biznesa", "backstage-kommercheskogo-prodakshna"],
    serviceHref: "/commercials",
    serviceLabel: { ru: "Реклама", en: "Commercials" },
    ru: {
      title: "Короткие видео для соцсетей: почему серия работает лучше одного ролика",
      excerpt: "Один удачный ролик даёт всплеск охвата. Серия с общим стилем приучает зрителя узнавать бренд.",
      description: "Как бренду снимать короткие видео для соцсетей: серия вместо разовых роликов, первые секунды, вертикальные версии.",
      category: "Соцсети",
      readingTime: "3 мин",
      intro: "Короткие вертикальные видео смотрят больше всего, поэтому в ленте их больше всего. Чтобы ролик бренда не потерялся среди остальных, его стоит снимать как часть серии.",
      sections: [
        {
          heading: "Серия вместо разового ролика",
          paragraphs: [
            "Пять–десять роликов, снятых за одну смену в одном стиле, стоят немногим дороже одного. Зато их можно выкладывать месяц и проверять в рекламе, какая идея работает лучше.",
          ],
        },
        {
          heading: "Что делает короткий ролик рабочим",
          paragraphs: [
            "Первые две секунды решают, досмотрят ли ролик. В каждом ролике — одна мысль. Вертикальный кадр лучше сразу заложить в список сцен: вырезанный потом из горизонтального, он теряет половину картинки.",
          ],
          bullets: ["Главное — в первые две секунды", "Одна мысль на ролик", "Вертикальный кадр с самого начала"],
        },
      ],
    },
    en: {
      title: "Short social videos: why a series works better than a single video",
      excerpt: "One lucky video gives a spike in reach. A series with a shared style teaches viewers to recognise the brand.",
      description: "How a brand should shoot short social videos: a series instead of one-offs, the first seconds, vertical versions.",
      category: "Social",
      readingTime: "3 min",
      intro: "Short vertical videos get the most views, which is why feeds are full of them. For a brand's video not to get lost, it is worth shooting it as part of a series.",
      sections: [
        {
          heading: "A series instead of a one-off",
          paragraphs: [
            "Five to ten videos shot in one day and in one style cost little more than a single one. You can post them for a month and test in ads which idea works best.",
          ],
        },
        {
          heading: "What makes a short video work",
          paragraphs: [
            "The first two seconds decide whether people keep watching. Each video should carry one thought, and the vertical frame is better planned in the shot list from the start than cropped later from a horizontal one.",
          ],
          bullets: ["The key point in the first two seconds", "One thought per video", "Vertical framing from the start"],
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

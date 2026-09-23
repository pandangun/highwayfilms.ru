import type { Locale } from "@/components/siteNavigation";
import { processSteps } from "@/content/home";
import type { ServicePage } from "@/content/types";

export type ServiceSlug = "commercials" | "corporate" | "music-videos" | "ai" | "videoproduction";

/**
 * Тексты разделов. Правило для правок: каждая фраза отвечает на вопрос
 * «что именно получит клиент». Атмосферу оставляем видео.
 */
export const servicePages: Record<ServiceSlug, Record<Locale, ServicePage>> = {
  commercials: {
    ru: {
      section: "commercials",
      priceKey: "commercials",
      path: "/commercials",
      meta: {
        title: "Рекламные ролики — съёмка в Санкт-Петербурге и Москве | Highway Films",
        description:
          "Снимаем рекламные ролики для ТВ, интернета и маркетплейсов. Версии на 6, 15 и 30 секунд из одной съёмки. От 150 000 ₽.",
      },
      hero: {
        title: "Рекламные ролики",
        lead: "Для ТВ, интернета и маркетплейсов. Из одного съёмочного дня собираем мастер и версии под каждую площадку.",
        facts: [
          { label: "Хронометраж", value: "6–60 секунд" },
          { label: "Срок", value: "от 2 недель" },
        ],
      },
      formats: {
        title: "Что снимаем",
        items: [
          {
            title: "Имиджевый ролик",
            text: "Бренд, настроение, история. Для запуска продукта, ТВ и экранов в торговых центрах.",
          },
          {
            title: "Продуктовый ролик",
            text: "Продукт крупным планом: фактура, детали, как он работает. Для сайта, карточки на маркетплейсе и рекламы в соцсетях.",
          },
          {
            title: "Серия для соцсетей",
            text: "Пять–десять вертикальных роликов с одной съёмки, чтобы проверить в рекламе разные идеи.",
          },
          {
            title: "Ролик с графикой и VFX",
            text: "Хромакей, композитинг и 3D там, где камерой не показать. В шоуриле есть пример: кадр на зелёном фоне и финальная версия.",
          },
        ],
      },
      included: {
        title: "Что входит в цену «от»",
        items: [
          { label: "Подготовка", value: "сценарий, список сцен, раскадровка" },
          { label: "Съёмка", value: "одна смена, оператор, свет, звук" },
          { label: "Постпродакшн", value: "монтаж, цветокоррекция, звук, титры" },
          { label: "Выдача", value: "мастер-копия и версии на 6, 15 и 30 секунд" },
        ],
        note: "Отдельно считаем актёров, аренду локаций и реквизит, сложную графику и права на музыку. Всё это видно в смете до старта.",
      },
      process: { title: "Как идёт работа", items: processSteps.ru },
      faq: {
        title: "Вопросы о рекламе",
        items: [
          {
            q: "Сколько стоит рекламный ролик?",
            a: "От 150 000 ₽ за ролик с одной сменой и небольшой командой. Цену двигают число смен, актёры, локации, графика и количество версий. Смету присылаем в течение рабочего дня после брифа.",
          },
          {
            q: "Можно сразу получить версии для маркетплейса, соцсетей и ТВ?",
            a: "Да, и так дешевле, чем переснимать потом. Кадры под вертикаль и короткие версии закладываем ещё в списке сцен, до съёмки.",
          },
          {
            q: "Нужен ролик для одного товара. Возьмётесь?",
            a: "Да. Один товар, одна карточка, один запуск — нормальная задача. Для неё обычно хватает одной смены в студии.",
          },
          {
            q: "Что нужно от нас для старта?",
            a: "Что за продукт, где будет реклама, для кого она и к какой дате нужна. Если есть ссылки на сайт, карточку товара или ролики, которые нравятся, — пришлите их тоже.",
          },
          {
            q: "Добавите графику или 3D?",
            a: "Да: анимацию характеристик, разрез устройства, композитинг. Предложим графику там, где камерой это не показать.",
          },
        ],
      },
      invite: {
        title: "Обсудим ролик",
        text: "Расскажите, что за продукт и где будет реклама. В течение рабочего дня пришлём смету и план съёмки.",
      },
    },
    en: {
      section: "commercials",
      priceKey: "commercials",
      path: "/en/commercials",
      meta: {
        title: "Commercials — production in Saint Petersburg and Moscow | Highway Films",
        description:
          "Commercials for TV, online and marketplaces. 6, 15 and 30-second versions from one shoot. From RUB 150,000.",
      },
      hero: {
        title: "Commercials",
        lead: "For TV, online and marketplaces. One shoot day gives you a master and a version for every placement.",
        facts: [
          { label: "Length", value: "6–60 seconds" },
          { label: "Timing", value: "from 2 weeks" },
        ],
      },
      formats: {
        title: "What we shoot",
        items: [
          { title: "Brand spot", text: "Brand, mood, story. For launches, TV and screens in shopping centres." },
          {
            title: "Product video",
            text: "The product up close: texture, details, how it works. For the website, marketplace listings and social ads.",
          },
          { title: "Social series", text: "Five to ten vertical videos from one shoot to test different ideas in ads." },
          {
            title: "Graphics and VFX",
            text: "Green screen, compositing and 3D where a camera can't show it. The showreel has an example: the green-screen frame and the final shot.",
          },
        ],
      },
      included: {
        title: "What the starting price includes",
        items: [
          { label: "Pre-production", value: "script, shot list, storyboard" },
          { label: "Shoot", value: "one day, DoP, lighting, sound" },
          { label: "Post", value: "edit, colour grade, sound, titles" },
          { label: "Delivery", value: "master plus 6, 15 and 30-second versions" },
        ],
        note: "Cast, location hire, props, complex graphics and music licences are priced separately. You see all of it in the estimate before we start.",
      },
      process: { title: "How the work goes", items: processSteps.en },
      faq: {
        title: "About commercials",
        items: [
          {
            q: "How much does a commercial cost?",
            a: "From RUB 150,000 for a spot with one shoot day and a small crew. Shoot days, cast, locations, graphics and the number of versions move the price. The estimate comes within one working day after the brief.",
          },
          {
            q: "Can we get marketplace, social and TV versions at once?",
            a: "Yes, and it costs less than reshooting later. Vertical framing and short versions go into the shot list before the shoot.",
          },
          {
            q: "We need a video for one product. Will you take it?",
            a: "Yes. One product, one listing, one launch is a normal brief. It usually takes one day in the studio.",
          },
          {
            q: "What do you need from us to start?",
            a: "What the product is, where the ad will run, who it is for and the deadline. Links to the site, the listing or videos you like help too.",
          },
          {
            q: "Can you add graphics or 3D?",
            a: "Yes: animated specs, product cutaways, compositing. We suggest graphics where a camera can't show the thing.",
          },
        ],
      },
      invite: {
        title: "Let's talk about your spot",
        text: "Tell us about the product and where the ad will run. Within one working day we send an estimate and a shoot plan.",
      },
    },
  },

  corporate: {
    ru: {
      section: "corporate",
      priceKey: "corporate",
      path: "/corporate",
      meta: {
        title: "Корпоративное видео и фильмы о компании | Highway Films",
        description:
          "Фильмы о компании и производстве, интервью, ролики для найма и мероприятий. Санкт-Петербург и Москва. От 180 000 ₽.",
      },
      hero: {
        title: "Корпоративное видео",
        lead: "Фильмы о компании и производстве, интервью с командой, ролики для найма и мероприятий.",
        facts: [
          { label: "Хронометраж", value: "1–7 минут" },
          { label: "Срок", value: "от 3 недель" },
        ],
      },
      formats: {
        title: "Что снимаем",
        items: [
          {
            title: "Фильм о компании",
            text: "История, люди, производство. Его показывают на сайте, выставках и встречах с партнёрами.",
          },
          {
            title: "Ролик для найма",
            text: "Как устроена работа изнутри: команда, офис, цех. Для карьерного сайта и вакансий.",
          },
          {
            title: "Интервью и экспертные ролики",
            text: "Руководители и специалисты в кадре. Заранее готовим вопросы, а свет и звук ставим так, чтобы человек говорил спокойно.",
          },
          {
            title: "Мероприятия",
            text: "Конференции, презентации, корпоративы: короткий ролик-отчёт и полная запись выступлений.",
          },
        ],
      },
      included: {
        title: "Что входит в цену «от»",
        items: [
          { label: "Подготовка", value: "сценарий, вопросы для интервью, план съёмки" },
          { label: "Съёмка", value: "одна смена, до трёх интервью, съёмка процессов" },
          { label: "Постпродакшн", value: "монтаж, цвет, звук, титры, графика с цифрами компании" },
          { label: "Выдача", value: "фильм и короткие версии для соцсетей" },
        ],
        note: "Отдельно считаем дополнительные смены, аэросъёмку, диктора и анимацию.",
      },
      process: { title: "Как идёт работа", items: processSteps.ru },
      faq: {
        title: "Вопросы о корпоративном видео",
        items: [
          {
            q: "Сколько стоит фильм о компании?",
            a: "От 180 000 ₽ за фильм с одной сменой и тремя интервью. Если производство в нескольких городах или нужна аэросъёмка, это отдельные строки в смете.",
          },
          {
            q: "Наши сотрудники никогда не снимались. Это проблема?",
            a: "Нет. Вопросы присылаем заранее, снимаем интервью как разговор, лишнее вырезаем при монтаже. В кадр попадает человек, который просто рассказывает о своей работе.",
          },
          {
            q: "Сможете снимать на режимном производстве?",
            a: "Да. Согласуем со службой безопасности список зон и техники, подписываем NDA, если он нужен.",
          },
          {
            q: "Из одного фильма можно сделать ролики для соцсетей?",
            a: "Да. Короткие вертикальные версии закладываем в план съёмки сразу.",
          },
        ],
      },
      invite: {
        title: "Расскажите о компании",
        text: "Что за фильм нужен и где его будут показывать. Смету и сценарный план пришлём в течение рабочего дня.",
      },
    },
    en: {
      section: "corporate",
      priceKey: "corporate",
      path: "/en/corporate",
      meta: {
        title: "Corporate video and company films | Highway Films",
        description:
          "Company and production films, interviews, hiring and event videos. Saint Petersburg and Moscow. From RUB 180,000.",
      },
      hero: {
        title: "Corporate video",
        lead: "Films about a company and its production, team interviews, hiring and event videos.",
        facts: [
          { label: "Length", value: "1–7 minutes" },
          { label: "Timing", value: "from 3 weeks" },
        ],
      },
      formats: {
        title: "What we shoot",
        items: [
          {
            title: "Company film",
            text: "History, people, production. Shown on the website, at trade shows and partner meetings.",
          },
          { title: "Hiring video", text: "What the work looks like from inside: team, office, shop floor. For careers pages and job ads." },
          {
            title: "Interviews and expert videos",
            text: "Executives and specialists on camera. Questions are prepared in advance; light and sound are set so people talk calmly.",
          },
          { title: "Events", text: "Conferences, presentations, company parties: a short recap and full recordings of the talks." },
        ],
      },
      included: {
        title: "What the starting price includes",
        items: [
          { label: "Pre-production", value: "script, interview questions, shoot plan" },
          { label: "Shoot", value: "one day, up to three interviews, process footage" },
          { label: "Post", value: "edit, grade, sound, titles, graphics with company figures" },
          { label: "Delivery", value: "the film plus short versions for social media" },
        ],
        note: "Extra shoot days, aerial footage, voice-over and animation are priced separately.",
      },
      process: { title: "How the work goes", items: processSteps.en },
      faq: {
        title: "About corporate video",
        items: [
          {
            q: "How much does a company film cost?",
            a: "From RUB 180,000 for a film with one shoot day and three interviews. Several cities or aerial footage are separate lines in the estimate.",
          },
          {
            q: "Our people have never been on camera. Is that a problem?",
            a: "No. We send the questions in advance, film the interview as a conversation and cut the rest in the edit. On screen you get a person talking about their work.",
          },
          {
            q: "Can you film at a restricted facility?",
            a: "Yes. We agree zones and equipment with your security team and sign an NDA if needed.",
          },
          {
            q: "Can one film also give us social videos?",
            a: "Yes. Short vertical versions go into the shoot plan from the start.",
          },
        ],
      },
      invite: {
        title: "Tell us about the company",
        text: "What film you need and where it will be shown. The estimate and script plan come within one working day.",
      },
    },
  },

  "music-videos": {
    ru: {
      section: "music-videos",
      priceKey: "music-videos",
      path: "/music-videos",
      meta: {
        title: "Съёмка музыкальных клипов | Highway Films",
        description:
          "Клипы с сюжетом, перформанс, лайв-сессии. Концепция, съёмка, монтаж и цвет. Санкт-Петербург и Москва. От 120 000 ₽.",
      },
      hero: {
        title: "Музыкальные клипы",
        lead: "Придумываем визуальную историю под трек и снимаем её за один-два дня.",
        facts: [
          { label: "Съёмка", value: "1–2 дня" },
          { label: "Срок", value: "3–4 недели" },
        ],
      },
      formats: {
        title: "Что снимаем",
        items: [
          { title: "Клип с сюжетом", text: "История с актёрами и локациями. Раскадровку показываем до съёмки." },
          { title: "Перформанс", text: "Артист в кадре: свет, движение камеры, монтаж в ритм трека." },
          { title: "Лайв-сессия", text: "Живое исполнение в студии или на площадке, несколько камер." },
          { title: "Тизеры и вертикали", text: "Короткие версии для анонса релиза в соцсетях." },
        ],
      },
      included: {
        title: "Что входит в цену «от»",
        items: [
          { label: "Концепция", value: "идея, раскадровка, референсы" },
          { label: "Съёмка", value: "одна смена, свет, камера" },
          { label: "Постпродакшн", value: "монтаж и цветокоррекция" },
          { label: "Выдача", value: "клип 16:9 и два вертикальных тизера" },
        ],
        note: "Отдельно считаем актёров, аренду локаций, хореографа и спецэффекты.",
      },
      process: { title: "Как идёт работа", items: processSteps.ru },
      faq: {
        title: "Вопросы о клипах",
        items: [
          {
            q: "Сколько стоит клип?",
            a: "От 120 000 ₽ за клип с одной сменой. Сюжет с актёрами, несколько локаций и спецэффекты увеличивают смету, каждая позиция в ней расписана.",
          },
          {
            q: "У меня нет идеи, только трек. Что дальше?",
            a: "Пришлите трек и пару клипов, которые нравятся. Предложим два-три варианта идеи, выберем один и нарисуем раскадровку.",
          },
          {
            q: "Можно снять клип и тизеры за один день?",
            a: "Да. Кадры для вертикальных тизеров снимаем в ту же смену.",
          },
        ],
      },
      invite: {
        title: "Пришлите трек",
        text: "Послушаем и вернёмся с идеей клипа и сметой.",
      },
    },
    en: {
      section: "music-videos",
      priceKey: "music-videos",
      path: "/en/music-videos",
      meta: {
        title: "Music video production | Highway Films",
        description:
          "Narrative videos, performance, live sessions. Concept, shoot, edit and grade. Saint Petersburg and Moscow. From RUB 120,000.",
      },
      hero: {
        title: "Music videos",
        lead: "We come up with a visual story for the track and film it in one or two days.",
        facts: [
          { label: "Shoot", value: "1–2 days" },
          { label: "Timing", value: "3–4 weeks" },
        ],
      },
      formats: {
        title: "What we shoot",
        items: [
          { title: "Narrative video", text: "A story with actors and locations. You see the storyboard before the shoot." },
          { title: "Performance", text: "The artist on camera: light, camera movement, an edit cut to the beat." },
          { title: "Live session", text: "A live performance in a studio or on location, several cameras." },
          { title: "Teasers and verticals", text: "Short versions to announce the release on social media." },
        ],
      },
      included: {
        title: "What the starting price includes",
        items: [
          { label: "Concept", value: "idea, storyboard, references" },
          { label: "Shoot", value: "one day, lighting, camera" },
          { label: "Post", value: "edit and colour grade" },
          { label: "Delivery", value: "16:9 video and two vertical teasers" },
        ],
        note: "Cast, location hire, a choreographer and special effects are priced separately.",
      },
      process: { title: "How the work goes", items: processSteps.en },
      faq: {
        title: "About music videos",
        items: [
          {
            q: "How much does a music video cost?",
            a: "From RUB 120,000 for a video with one shoot day. A story with actors, several locations and effects raise the estimate; every item is spelled out.",
          },
          {
            q: "I only have the track, no idea yet. What next?",
            a: "Send the track and a couple of videos you like. We suggest two or three ideas, pick one together and draw the storyboard.",
          },
          {
            q: "Can we shoot the video and teasers in one day?",
            a: "Yes. Footage for vertical teasers is filmed on the same day.",
          },
        ],
      },
      invite: {
        title: "Send us the track",
        text: "We'll listen and come back with an idea for the video and an estimate.",
      },
    },
  },

  ai: {
    ru: {
      section: "ai",
      priceKey: "ai",
      path: "/ai",
      meta: {
        title: "AI-ролики на заказ — реклама на нейросетях | Highway Films",
        description:
          "Рекламные и имиджевые ролики на генеративных моделях: предметка, персонажи, миры. От 60 000 ₽, срок 5–10 дней.",
      },
      hero: {
        title: "AI-ролики",
        lead: "Рекламные и имиджевые ролики на генеративных моделях. Для идей, которые дорого, долго или невозможно снимать камерой.",
        facts: [
          { label: "Хронометраж", value: "до 60 секунд" },
          { label: "Срок", value: "5–10 дней" },
        ],
      },
      formats: {
        title: "Что делаем",
        lead: "Если задачу проще и дешевле снять камерой, так и скажем.",
        items: [
          {
            title: "Предметный ролик",
            text: "Продукт в любом окружении: космос, подводный мир, мастерская. Без аренды студии и реквизита.",
          },
          { title: "Персонажи и ведущие", text: "Цифровой ведущий, маскот бренда, говорящий герой." },
          {
            title: "Гибрид со съёмкой",
            text: "Снятые кадры с продуктом плюс сгенерированные фоны, объекты и переходы. Так продукт остаётся точным.",
          },
          { title: "Тест идеи", text: "Несколько вариантов ролика до дорогой съёмки, чтобы проверить их в рекламе." },
        ],
      },
      included: {
        title: "Что входит в цену «от»",
        items: [
          { label: "Сценарий", value: "идея и раскадровка" },
          { label: "Генерация", value: "отбор и доработка кадров" },
          { label: "Постпродакшн", value: "монтаж, звук, музыка" },
          { label: "Выдача", value: "версии 16:9 и 9:16" },
        ],
        note: "Логотип, упаковку и лица сотрудников генерация пока передаёт неточно. Их снимаем камерой и совмещаем с AI-кадрами.",
      },
      process: {
        title: "Как идёт работа",
        items: [
          { title: "Бриф", text: "Идея, продукт, площадка. В течение рабочего дня присылаем смету и срок.", time: "1 день" },
          { title: "Раскадровка", text: "Собираем кадры-ориентиры и согласуем их с вами до генерации.", time: "1–2 дня" },
          {
            title: "Генерация",
            text: "Генерируем, отбираем лучшие варианты и дорабатываем их до одного визуального стиля.",
            time: "3–5 дней",
          },
          { title: "Монтаж и звук", text: "Собираем ролик, пишем звук и подбираем музыку. Правки — по таймкодам.", time: "1–2 дня" },
          { title: "Сдача", text: "Горизонтальная и вертикальная версии." },
        ],
      },
      faq: {
        title: "Вопросы об AI-роликах",
        items: [
          {
            q: "AI заменяет обычную съёмку?",
            a: "Нет. Он полезен, когда нужно быстро проверить идею, сделать много версий или показать то, что нерационально снимать. Если задачу лучше решает камера, скажем об этом сразу.",
          },
          {
            q: "Можно совместить съёмку и генерацию?",
            a: "Да, чаще всего так и получается лучший результат: снятые кадры держат фактуру продукта, генерация добавляет сцены, фоны и переходы.",
          },
          {
            q: "Что вы не делаете?",
            a: "Не используем чужие лица без согласия, не имитируем реальных людей и не делаем дипфейки.",
          },
        ],
      },
      invite: {
        title: "Опишите идею",
        text: "Пришлите описание или референсы. В течение рабочего дня вернёмся с раскадровкой и сметой.",
      },
    },
    en: {
      section: "ai",
      priceKey: "ai",
      path: "/en/ai",
      meta: {
        title: "AI video production — generative commercials | Highway Films",
        description:
          "Commercials and brand films made with generative models: products, characters, worlds. From RUB 60,000, 5–10 days.",
      },
      hero: {
        title: "AI films",
        lead: "Commercials and brand films made with generative models, for ideas that are costly, slow or impossible to film.",
        facts: [
          { label: "Length", value: "up to 60 seconds" },
          { label: "Timing", value: "5–10 days" },
        ],
      },
      formats: {
        title: "What we make",
        lead: "If a camera does the job cheaper and simpler, we'll tell you.",
        items: [
          {
            title: "Product film",
            text: "The product in any setting: space, underwater, a workshop. No studio hire, no props.",
          },
          { title: "Characters and presenters", text: "A digital presenter, a brand mascot, a talking character." },
          {
            title: "Hybrid with a shoot",
            text: "Filmed product shots plus generated backgrounds, objects and transitions. The product stays accurate.",
          },
          { title: "Idea test", text: "Several versions of a spot before an expensive shoot, to test them in ads." },
        ],
      },
      included: {
        title: "What the starting price includes",
        items: [
          { label: "Script", value: "idea and storyboard" },
          { label: "Generation", value: "selection and refinement of shots" },
          { label: "Post", value: "edit, sound, music" },
          { label: "Delivery", value: "16:9 and 9:16 versions" },
        ],
        note: "Generation still gets logos, packaging and real employees' faces wrong. We film those and combine them with AI shots.",
      },
      process: {
        title: "How the work goes",
        items: [
          { title: "Brief", text: "Idea, product, placement. Within one working day you get an estimate and a date.", time: "1 day" },
          { title: "Storyboard", text: "We assemble reference frames and agree them with you before generating.", time: "1–2 days" },
          {
            title: "Generation",
            text: "We generate, pick the best takes and refine them to one visual style.",
            time: "3–5 days",
          },
          { title: "Edit and sound", text: "We cut the film, design the sound and choose music. Notes come by timecode.", time: "1–2 days" },
          { title: "Delivery", text: "Horizontal and vertical versions." },
        ],
      },
      faq: {
        title: "About AI films",
        items: [
          {
            q: "Does AI replace a regular shoot?",
            a: "No. It helps when you need to test an idea fast, make many versions or show something that makes no sense to film. If a camera does the job better, we say so right away.",
          },
          {
            q: "Can you combine filming and generation?",
            a: "Yes, and that usually gives the best result: filmed shots keep the product's texture, generation adds scenes, backgrounds and transitions.",
          },
          {
            q: "What won't you do?",
            a: "We don't use people's faces without consent, imitate real people or make deepfakes.",
          },
        ],
      },
      invite: {
        title: "Describe the idea",
        text: "Send a description or references. Within one working day we come back with a storyboard and an estimate.",
      },
    },
  },

  videoproduction: {
    ru: {
      section: "videoproduction",
      priceKey: "videoproduction",
      path: "/videoproduction",
      meta: {
        title: "Видеопродакшн полного цикла в Санкт-Петербурге | Highway Films",
        description:
          "Сценарий, съёмка, монтаж, графика и звук в одной студии. Реклама, корпоративное видео, клипы. От 150 000 ₽.",
      },
      hero: {
        title: "Видеопродакшн полного цикла",
        lead: "Берём проект целиком: сценарий, съёмка, монтаж, графика, звук и выдача всех версий.",
        facts: [
          { label: "Города", value: "Петербург и Москва" },
          { label: "Срок", value: "от 2 недель" },
        ],
      },
      formats: {
        title: "Этапы, которые можно заказать отдельно",
        items: [
          { title: "Сценарий и раскадровка", text: "Если снимать будете сами или с другой командой." },
          { title: "Съёмочный день", text: "Оператор, свет, звук и техника на вашей площадке." },
          { title: "Монтаж и цветокоррекция", text: "Собираем ролик из вашего материала и доводим цвет." },
          { title: "Графика и адаптации", text: "Титры, анимация, субтитры и версии под площадки." },
        ],
      },
      included: {
        title: "Что входит в полный цикл",
        items: [
          { label: "Подготовка", value: "бриф, сценарий, список сцен, локации и актёры" },
          { label: "Съёмка", value: "смены с командой, светом и звуком" },
          { label: "Постпродакшн", value: "монтаж, цвет, звук, графика" },
          { label: "Выдача", value: "мастер-копия и все нарезки" },
        ],
        note: "Цена «от» — ролик с одной сменой. Остальное считаем строками в смете: смены, актёры, локации, графика.",
      },
      process: { title: "Как идёт работа", items: processSteps.ru },
      faq: {
        title: "Вопросы о продакшне",
        items: [
          {
            q: "Можно подключить вас только на постпродакшн?",
            a: "Да. Берём ваш материал на монтаж, цвет, звук и графику.",
          },
          {
            q: "Сколько длится полный цикл?",
            a: "Короткий ролик — от двух недель от брифа до мастер-копии. Проекты с несколькими сменами, актёрами и графикой занимают 3–6 недель.",
          },
          {
            q: "Можно сделать несколько версий из одной съёмки?",
            a: "Да. Закладываем это в список сцен, чтобы одна смена дала ролики разной длины и формата.",
          },
        ],
      },
      invite: {
        title: "Обсудим проект",
        text: "Опишите задачу в брифе. В течение рабочего дня пришлём смету и план по этапам.",
      },
    },
    en: {
      section: "videoproduction",
      priceKey: "videoproduction",
      path: "/en/videoproduction",
      meta: {
        title: "Full-cycle video production in Saint Petersburg | Highway Films",
        description:
          "Script, shoot, edit, graphics and sound in one studio. Commercials, corporate films, music videos. From RUB 150,000.",
      },
      hero: {
        title: "Full-cycle production",
        lead: "We take the whole project: script, shoot, edit, graphics, sound and every delivery version.",
        facts: [
          { label: "Cities", value: "Saint Petersburg and Moscow" },
          { label: "Timing", value: "from 2 weeks" },
        ],
      },
      formats: {
        title: "Stages you can book separately",
        items: [
          { title: "Script and storyboard", text: "If you plan to shoot yourself or with another crew." },
          { title: "Shoot day", text: "DoP, lighting, sound and equipment at your location." },
          { title: "Edit and grade", text: "We cut the film from your footage and finish the colour." },
          { title: "Graphics and adaptations", text: "Titles, animation, subtitles and versions for every placement." },
        ],
      },
      included: {
        title: "What full production includes",
        items: [
          { label: "Pre-production", value: "brief, script, shot list, locations and cast" },
          { label: "Shoot", value: "shoot days with crew, lighting and sound" },
          { label: "Post", value: "edit, grade, sound, graphics" },
          { label: "Delivery", value: "master and every cut-down" },
        ],
        note: "The starting price is a spot with one shoot day. The rest is itemised: shoot days, cast, locations, graphics.",
      },
      process: { title: "How the work goes", items: processSteps.en },
      faq: {
        title: "About production",
        items: [
          { q: "Can we hire you for post-production only?", a: "Yes. We take your footage for editing, grading, sound and graphics." },
          {
            q: "How long does full production take?",
            a: "A short spot takes two weeks or more from brief to master. Projects with several shoot days, cast and graphics take 3–6 weeks.",
          },
          {
            q: "Can one shoot give several versions?",
            a: "Yes. We plan it in the shot list so one shoot day gives videos of different lengths and formats.",
          },
        ],
      },
      invite: {
        title: "Let's talk about the project",
        text: "Describe the task in the brief. Within one working day we send an estimate and a stage-by-stage plan.",
      },
    },
  },
};

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";
import VideoHero from "@/components/VideoHero";
import "@/app/styles/home.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Highway Films — видеостудия в Санкт-Петербурге",
  description:
    "Highway Films — видеостудия в Санкт-Петербурге. Снимаем рекламные ролики, корпоративное видео, клипы, свадебные фильмы и видео для бизнеса.",
  path: "/",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

const studioCards = [
  {
    title: "Картинка — то, за чем к нам приходят",
    text: "Свет, композиция, оптика и цвет — на это уходит больше всего времени. Проверить проще всего по шоурилу выше: если картинка нравится, дальше есть о чём говорить.",
  },
  {
    title: "Понятно, за что вы платите",
    text: "Смета складывается из съёмочных дней, состава команды и объёма постпродакшна. Без «зависит от задачи»: после короткого разговора называем вилку и говорим, что в неё входит.",
  },
  {
    title: "Больше 10 лет на площадках",
    text: "Опыт собран не из презентаций, а из съёмок — реклама, корпоративные фильмы, клипы, свадьбы. Знаем, где проект обычно ломается, и закладываем это в план заранее.",
  },
] as const;

const serviceCards = [
  {
    title: "Рекламные ролики",
    text: "Продуктовые и имиджевые ролики, короткие форматы под соцсети и маркетплейсы. Сразу отдаём версии под каждую площадку, а не один файл на всё.",
    href: "/commercials",
  },
  {
    title: "Корпоративное видео",
    text: "Фильмы о компании, презентации продукта, интервью с командой, съёмка мероприятий. То, что показывают клиентам, партнёрам и кандидатам.",
    href: "/corporate",
  },
  {
    title: "Музыкальные клипы",
    text: "Концепция, съёмка, монтаж, цвет. Задача — дать треку визуальную форму, которую запомнят отдельно от музыки.",
    href: "/music-videos",
  },
  {
    title: "Свадебные фильмы",
    text: "Съёмка без постановки и без липкого пафоса. Фильм, который пересматривают через пять лет, а не один раз на следующий день.",
    href: "/weddings",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Бриф",
    text: "Уточняем задачу, сроки, площадки и рабочую рамку проекта.",
  },
  {
    step: "02",
    title: "Идея",
    text: "Собираем подачу, структуру и сценарный ход под задачу.",
  },
  {
    step: "03",
    title: "Подготовка",
    text: "Подбираем команду, технику, локации и понятный план съёмки.",
  },
  {
    step: "04",
    title: "Съёмка",
    text: "Работаем спокойно на площадке и держим темп проекта без суеты.",
  },
  {
    step: "05",
    title: "Монтаж",
    text: "Собираем ритм, смысл и версии по длительности и площадкам.",
  },
  {
    step: "06",
    title: "Финал",
    text: "Доводим цвет, звук, графику и отдаём готовый материал.",
  },
] as const;

const faqItems = [
  {
    q: "Сколько стоит заказать рекламный ролик в Санкт-Петербурге?",
    a: "Смету двигают четыре вещи: количество съёмочных дней, состав команды на площадке, сложность локаций и объём постпродакшна. Всё остальное — детали. Опишите задачу в брифе или на созвоне, и мы назовём вилку с расшифровкой, что в неё входит, а что считается отдельно.",
  },
  {
    q: "Вы работаете только в Санкт-Петербурге?",
    a: "Основная база Highway Films находится в Санкт-Петербурге, но при необходимости мы выезжаем на съёмки в другие города и локации.",
  },
  {
    q: "Можно ли обратиться без готового сценария?",
    a: "Да, так начинается большинство проектов. Обычно на входе есть задача и пара референсов — из них мы собираем список сцен и согласуем его до съёмочного дня, чтобы на площадке не решать заново, что снимаем.",
  },
  {
    q: "Какие видео вы снимаете для бизнеса?",
    a: "Мы снимаем рекламные ролики, корпоративное видео, презентационные материалы, интервью, видео для команды, продуктовые ролики и материалы для сайта, соцсетей и других площадок.",
  },
  {
    q: "Можно ли заказать только монтаж и финальную сборку?",
    a: "Да. В зависимости от проекта можем подключиться только к монтажу, цвету, графике, звуку, адаптациям и финальной сборке материала.",
  },
  {
    q: "Сколько времени занимает производство видео?",
    a: "Срок зависит от формата и объёма работы. Небольшие ролики можно сделать быстрее, более сложные проекты требуют времени на подготовку, съёмку и финальную сборку.",
  },
  {
    q: "Где посмотреть примеры работ?",
    a: "Шоурил — на первом экране этой страницы. В разделах «Реклама», «Корпоративное», «Клипы» и «Свадьбы» примеры разложены по направлениям: там видно не только картинку, но и формат выдачи.",
  },
  {
    q: "Как начать работу с Highway Films?",
    a: "Самый простой вариант — нажать кнопку «Заказать ролик» или перейти в контакты. После этого можно обсудить задачу и выбрать удобный следующий шаг.",
  },
] as const;

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="home-faq-item group py-7 first:pt-0 last:pb-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
        <h3 className="home-faq-question text-white">
          {question}
        </h3>
        <span className="relative mt-2 flex h-5 w-5 shrink-0 items-center justify-center text-white/72">
          <span className="absolute h-px w-5 bg-gradient-to-r from-white/70 to-white/20" />
          <span className="absolute h-5 w-px bg-white/50 transition duration-200 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="home-faq-panel">
        <div className="home-faq-panel__inner">
          <p className="home-faq-answer max-w-3xl text-white/60">{answer}</p>
        </div>
      </div>
    </details>
  );
}

export default function HomePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Highway Films",
    serviceType: "Видеостудия",
    description:
      "Видеостудия в Санкт-Петербурге: рекламные ролики, корпоративное видео, музыкальные клипы, свадебные фильмы, монтаж, цвет, звук и финальная сборка.",
    provider: {
      "@type": "Organization",
      name: "Highway Films",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Санкт-Петербург" },
      { "@type": "Country", name: "Россия" },
    ],
    url: SITE_URL,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <VideoHero
        title="Highway Films"
        subtitle="Реклама, бренд-фильмы, клипы и свадьбы. Петербург, съёмки по России."
        headingAs="div"
      />

      <section className="container pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="home-intro-panel p-6 md:p-10 lg:p-12">
          <div className="home-center-copy max-w-5xl">
            <p className="eyebrow reveal-up delay-1">Highway Films</p>
            <h1 className="home-display-xl reveal-up delay-2 mt-4 text-white">
              Видеостудия в Санкт-Петербурге
            </h1>
            <p className="home-lead reveal-up delay-3 mt-6">
              Мы студия, а не агентство: снимаем и монтируем сами, поэтому за картинку отвечаем
              от первого созвона до финального мастера. Больше 10 лет работаем с брендами,
              бизнесом и артистами — в Петербурге и на выездах по России.
            </p>
            <div className="home-cta-row reveal-up delay-4 mt-9">
              <Link href="/brief" className="home-primary-button">
                Заказать ролик
              </Link>
              <Link href="/contacts" className="home-secondary-link">
                Контакты
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <h2 className="home-section-title reveal-up text-center text-white">
              За что мы отвечаем
            </h2>
          </div>

          <div className="rule-grid rule-grid--3 mt-8">
            {studioCards.map((card, index) => (
              <article
                key={card.title}
                className={`home-feature-card reveal-up ${
                  index === 0 ? "delay-1" : index === 1 ? "delay-2" : "delay-3"
                }`}
              >
                <h3 className="home-card-title text-ink">{card.title}</h3>
                <p className="home-card-copy mt-3 text-ink-muted">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-divider py-10 md:py-14">
        <div className="home-center-copy max-w-4xl">
          <h2 className="home-section-title reveal-up text-white">
            Что мы снимаем
          </h2>
          <p className="home-lead reveal-up delay-1 mt-4 max-w-3xl">
            Четыре направления, за каждым — свои примеры работ. Если материал уже отснят, можем
            подключиться только к монтажу, цвету, графике и звуку.
          </p>
        </div>

        <div className="rule-grid rule-grid--4 mt-8">
          {serviceCards.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={`service-card home-service-card reveal-up ${
                index === 0
                  ? "delay-1"
                  : index === 1
                    ? "delay-2"
                    : index === 2
                      ? "delay-3"
                      : "delay-4"
              }`}
            >
              <h3 className="home-card-title text-ink">{service.title}</h3>
              <p className="home-card-copy mt-3 text-ink-muted">{service.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-divider py-10 md:py-14">
        <div className="home-center-copy max-w-4xl">
          <h2 className="home-section-title reveal-up text-white">
            Как мы работаем
          </h2>
        </div>

        <div className="rule-grid rule-grid--3 mt-10">
          {processSteps.map((item, index) => (
            <article
              key={item.step}
              className={`home-process-card reveal-up ${
                index === 0
                  ? "delay-1"
                  : index === 1
                    ? "delay-2"
                    : index === 2
                      ? "delay-3"
                      : index === 3
                        ? "delay-4"
                        : index === 4
                          ? "delay-5"
                          : "delay-6"
              }`}
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="font-display text-3xl leading-none text-ink">{item.step}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <h3 className="home-card-title text-ink">{item.title}</h3>
              <p className="home-card-copy mt-3 text-ink-muted">{item.text}</p>
              {index < processSteps.length - 1 ? (
                <span
                  className={`home-process-arrow ${
                    index === 0
                      ? "hidden md:flex xl:flex"
                      : index === 1
                        ? "hidden xl:flex"
                        : index === 2
                          ? "hidden md:flex xl:hidden"
                          : index === 3
                            ? "hidden xl:flex"
                            : "hidden md:flex xl:flex"
                  }`}
                  aria-hidden
                >
                  <ArrowRight className="h-5 w-5" />
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="container section-divider py-10 md:py-14">
        <div className="home-center-copy max-w-4xl">
          <h2 className="font-display heading-balance text-[clamp(2.5rem,2rem+2.4vw,4.8rem)] leading-[0.95] tracking-[-0.05em] text-white">
            Обсудим ваш проект
          </h2>
          <p className="home-lead mt-5 max-w-3xl">
            Если вам нужен рекламный ролик, корпоративное видео, клип, свадебный фильм или видео
            для сайта и соцсетей, напишите нам. Обсудим задачу, формат съёмки, сроки и предложим
            понятный вариант работы.
          </p>
          <div className="home-cta-row mt-8">
            <Link href="/brief" className="home-primary-button">
              Заказать ролик
            </Link>
            <Link href="/contacts" className="home-secondary-link">
              Контакты
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-divider py-10 md:py-14">
        <div className="home-center-copy max-w-5xl">
          <h2 className="home-section-title text-white">
            Частые вопросы
          </h2>
        </div>

        <div className="home-faq-wrap mt-8 max-w-5xl">
          <div className="h-px bg-gradient-to-r from-white/40 via-white/12 to-transparent" />
          {faqItems.map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
          <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";
import VideoHero from "@/components/VideoHero";
import GenerativeField from "@/components/GenerativeField";
import "@/app/styles/home.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Highway Films — видеостудия в Санкт-Петербурге",
  description:
    "Highway Films — видеостудия в Санкт-Петербурге. Снимаем рекламные ролики, корпоративное видео, клипы, свадебные фильмы и видео для бизнеса.",
  path: "/",
  locale: "ru",
  imagePath: "/video/derived/hero-poster.jpg",
});

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

      {/* ЭКРАН 1 — ПОРТФОЛИО.
          Шоурил и есть портфолио: он продаёт сам, без пояснений. Поэтому
          первый экран отдан ему целиком, а текста ровно столько, чтобы
          человек понял, куда попал. */}
      <VideoHero
        title="Highway Films"
        headingAs="h1"
      />

      {/* ЭКРАН 2 — ЧТО СНИМАЕМ.
          Резко другой по характеру: светлый, воздушный, крупная антиква,
          абстрактное поле вместо фотографии. Никаких карточек — только
          типографика и линии. */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <GenerativeField className="opacity-70" />

        <div className="container relative">
          <p className="eyebrow reveal-up">Что снимаем</p>

          <div className="mt-10 md:mt-16">
            {serviceCards.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className={`home-line-item reveal-up delay-${Math.min(index + 1, 5)}`}
              >
                <span className="home-line-item__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="home-line-item__title font-display">{service.title}</span>
                <span className="home-line-item__text">{service.text}</span>
                <ArrowRight className="home-line-item__arrow h-6 w-6" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ЭКРАН 3 — РАЗГОВОР.
          Снова тёмный и плотный, после воздуха второго экрана. Одно
          действие, одна цифра, никаких карточек. */}
      <section className="home-closing relative overflow-hidden py-24 md:py-32">
        <div className="container relative">
          <div className="max-w-4xl">
            <p className="eyebrow">Дальше</p>
            <h2 className="home-closing__title font-display mt-6 text-ink">
              Посмотрели шоурил — напишите, что нужно снять.
            </h2>
            <p className="home-closing__lead mt-8 max-w-2xl text-ink-muted">
              Опишите задачу в двух абзацах. В ответ пришлём вилку по бюджету с расшифровкой,
              что в неё входит, и срок до финальной версии. Отвечаем в течение рабочего дня.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              <Link href="/brief" className="home-primary-button">
                Заполнить бриф
              </Link>
              <Link href="/contacts" className="home-secondary-link">
                Или просто написать
              </Link>
            </div>
          </div>

          {/* FAQ оставлен ради поисковой выдачи, но свёрнут: это справка,
              а не экран. Разметка FAQPage выше на нём и держится. */}
          <details className="home-faq-fold mt-20 md:mt-28">
            <summary className="home-faq-fold__summary">Частые вопросы</summary>
            <div className="home-faq-wrap mt-8 max-w-4xl">
              {faqItems.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </details>
        </div>
      </section>

    </>
  );
}

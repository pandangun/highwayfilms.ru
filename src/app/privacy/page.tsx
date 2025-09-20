// app/privacy/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Highway Films",
  description:
    "Политика обработки персональных данных и cookies на сайте Highway Films в соответствии с 152-ФЗ.",
  alternates: { canonical: "https://highwayfilms.ru/privacy" },
  openGraph: {
    type: "article",
    title: "Политика конфиденциальности — Highway Films",
    description:
      "Как и зачем мы обрабатываем ваши персональные данные. Соответствие 152-ФЗ.",
    url: "https://highwayfilms.ru/privacy",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

// Подставляется на билде (например, из CI). Фолбэк — сегодняшняя дата.
const UPDATED_AT = process.env.NEXT_PUBLIC_BUILD_DATE || "2025-09-18";

const SECTIONS = [
  { id: "operator", title: "1. Термины и оператор" },
  { id: "scope", title: "2. Область действия" },
  { id: "data", title: "3. Какие данные мы обрабатываем" },
  { id: "purposes", title: "4. Цели обработки" },
  { id: "legal", title: "5. Правовые основания (152-ФЗ)" },
  { id: "sharing", title: "6. Передача третьим лицам" },
  { id: "localization", title: "7. Локализация и хранение данных (242-ФЗ)" },
  { id: "security", title: "8. Меры безопасности" },
  { id: "cookies", title: "9. Cookies и аналитика" },
  { id: "rights", title: "10. Права субъекта ПДн" },
  { id: "requests", title: "11. Как отправить запрос" },
  { id: "updates", title: "12. Обновления политики" },
];

export default function PrivacyPage() {
  return (
    <main className="container py-12 md:py-16">
      {/* JSON-LD */}
      <Script id="ld-webpage" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Политика конфиденциальности — Highway Films",
          url: "https://highwayfilms.ru/privacy",
          dateModified: UPDATED_AT,
          inLanguage: "ru-RU",
        })}
      </Script>
      <Script id="ld-breadcrumbs" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "https://highwayfilms.ru" },
            { "@type": "ListItem", position: 2, name: "Политика конфиденциальности", item: "https://highwayfilms.ru/privacy" },
          ],
        })}
      </Script>

      {/* Skip-link для a11y, класс есть в твоём globals.css */}
      <a href="#content" className="visually-hidden focus:not-sr-only">
        Перейти к содержимому
      </a>

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="h1">Политика конфиденциальности</h1>
        <p className="mt-2 text-sm text-muted">
          Дата обновления: <time dateTime={UPDATED_AT}>{UPDATED_AT}</time>
          <a href="/privacy.pdf" className="underline hover:no-underline ml-2">
            Скачать PDF
          </a>
        </p>
        <p className="lead measure mt-4">
          Эта политика описывает, какие данные мы получаем на сайте, с какой целью используем
          и какие у вас есть права. Документ подготовлен в соответствии с Федеральным законом
          № 152-ФЗ «О персональных данных».
        </p>
      </header>

      {/* Макет: липкий ToC + контент */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* ToC */}
        <aside className="md:sticky md:top-24 h-max">
          <nav aria-label="Содержание" className="text-sm">
            <p className="mb-2 font-semibold text-fgc">Содержание</p>
            <ol className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-muted hover:text-fgc underline-offset-2 hover:underline"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Content */}
        <article id="content" className="space-y-10">
          <section id="operator" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">1. Термины и оператор</h2>
            <p>
              Оператор персональных данных: <span className="text-fgc">Highway Films</span> (далее — «мы»).
              Контакт по вопросам персональных данных:{" "}
              <a href="mailto:info@highwayfilms.ru" className="underline hover:no-underline">
                info@highwayfilms.ru
              </a>.
            </p>
          </section>

          <section id="scope" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">2. Область действия</h2>
            <p>
              Политика действует для посетителей сайта <strong>highwayfilms.ru</strong> и форм обратной связи.
              Сайт ориентирован на пользователей в Российской Федерации. Мы не ведём целенаправленную
              обработку данных резидентов иных юрисдикций.
            </p>
          </section>

          <section id="data" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">3. Какие данные мы обрабатываем</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Контактные данные из формы: имя, e-mail, телефон, текст сообщения.</li>
              <li>Технические данные: IP-адрес, cookies, сведения о браузере/устройстве, URL-реферер.</li>
              <li>Переписка в мессенджерах/почте (если вы инициировали контакт).</li>
            </ul>
          </section>

          <section id="purposes" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">4. Цели обработки</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Обработка заявок и подготовка коммерческих предложений.</li>
              <li>Исполнение договорённостей и оказание услуг продакшна.</li>
              <li>Поддержка сайта, аналитика посещаемости, улучшение контента.</li>
              <li>Соблюдение требований законодательства (учёт, отчётность, ответы на запросы).</li>
            </ul>
          </section>

          <section id="legal" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">5. Правовые основания (152-ФЗ)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Согласие субъекта персональных данных.</li>
              <li>Исполнение договора или действий по вашей инициативе до его заключения.</li>
              <li>Законные интересы оператора (поддержка сайта, безопасность).</li>
              <li>Исполнение обязанностей, возложенных законодательством РФ.</li>
            </ul>
          </section>

          <section id="sharing" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">6. Передача третьим лицам</h2>
            <p>Мы не продаём и не публикуем ваши данные. Передача возможна только:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>подрядчикам/провайдерам (хостинг, почта, аналитика) — строго по необходимости;</li>
              <li>госорганам — по законному запросу;</li>
              <li>при реорганизации/продаже бизнеса — правопреемнику с сохранением обязательств.</li>
            </ul>
          </section>

          <section id="localization" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">7. Локализация и хранение данных (242-ФЗ)</h2>
            <p>
              Персональные данные граждан РФ, собираемые через сайт, регистрируются, систематизируются,
              накапливаются и хранятся на серверах, расположенных на территории Российской Федерации.
            </p>
          </section>

          <section id="security" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">8. Меры безопасности</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Доступ к данным ограничен уполномоченными лицами по принципу необходимости.</li>
              <li>Применяются организационные и технические меры защиты.</li>
              <li>Срок хранения — до достижения целей или отзыва согласия, если нет иных оснований.</li>
            </ul>
          </section>

          <section id="cookies" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">9. Cookies и аналитика</h2>
            <p>
              Cookies используются для корректной работы сайта, запоминания настроек и анонимной статистики.
              Управлять cookies можно в настройках браузера.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-base" role="table">
                <caption className="text-sm text-muted text-left pb-2">
                  Категории cookies, применяемые на сайте
                </caption>
                <thead>
                  <tr className="text-left">
                    <th className="py-2 pr-4 border-base border-b">Категория</th>
                    <th className="py-2 pr-4 border-base border-b">Назначение</th>
                    <th className="py-2 pr-0 border-base border-b">Пример срока</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr>
                    <td className="py-2 pr-4 border-base border-b">Технические</td>
                    <td className="py-2 pr-4 border-base border-b">Работа форм и сессий</td>
                    <td className="py-2 pr-0 border-base border-b">до 12 месяцев</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 border-base border-b">Аналитические</td>
                    <td className="py-2 pr-4 border-base border-b">Анонимная статистика посещаемости</td>
                    <td className="py-2 pr-0 border-base border-b">до 14 месяцев</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-2">
              Настройки cookies:{" "}
              <button type="button" data-cmp="open" className="underline hover:no-underline">
                изменить согласие
              </button>
              .
            </p>
          </section>

          <section id="rights" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">10. Права субъекта ПДн</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>получить сведения об обработке и копию данных;</li>
              <li>требовать уточнения (обновления, исправления) данных;</li>
              <li>блокирования или уничтожения данных при незаконной обработке;</li>
              <li>отозвать согласие на обработку персональных данных.</li>
            </ul>
          </section>

          <section id="requests" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">11. Как отправить запрос</h2>
            <p>
              Направляйте запросы на{" "}
              <a href="mailto:info@highwayfilms.ru" className="underline hover:no-underline">
                info@highwayfilms.ru
              </a>. Укажите ФИО, контакт для ответа и суть обращения. Ответим в срок, установленный законом.
            </p>
          </section>

          <section id="updates" className="measure space-y-3">
            <h2 className="text-xl font-semibold text-fgc">12. Обновления политики</h2>
            <p>
              Актуальная версия всегда доступна по адресу <span className="text-fgc">/privacy</span>.
              Дата обновления: <time dateTime={UPDATED_AT}>{UPDATED_AT}</time>.
            </p>
          </section>

          <p className="measure">
            <a href="#top" className="text-sm underline hover:no-underline">
              Вернуться наверх ↑
            </a>
          </p>
        </article>
      </div>
    </main>
  );
}

// app/privacy/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Highway Films",
  description:
    "Политика обработки персональных данных и cookies на сайте Highway Films в соответствии с 152-ФЗ.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    type: "article",
    title: "Политика конфиденциальности — Highway Films",
    description:
      "Как и зачем мы обрабатываем ваши персональные данные. Соответствие 152-ФЗ.",
    url: `${SITE_URL}/privacy`,
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

// Подставляется на билде (например, из CI). Фолбэк — сегодняшняя дата.
const UPDATED_AT = process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString().slice(0, 10);

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
    <div className="page-head">
      <div className="wrap">
      {/* JSON-LD */}
      <Script id="ld-webpage" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Политика конфиденциальности — Highway Films",
          url: `${SITE_URL}/privacy`,
          dateModified: UPDATED_AT,
          inLanguage: "ru-RU",
        })}
      </Script>
      <Script id="ld-breadcrumbs" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Политика конфиденциальности", item: `${SITE_URL}/privacy` },
          ],
        })}
      </Script>

      {/* Переход к тексту для клавиатуры и скринридеров. */}
      <a href="#content" className="visually-hidden focus:not-sr-only">
        Перейти к содержимому
      </a>

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="display display--h1">Политика конфиденциальности</h1>
        <p className="mt-6 text-small text-silver">
          Дата обновления: <time dateTime={UPDATED_AT}>{UPDATED_AT}</time>
        </p>
        <p className="lead">
          Эта политика описывает, какие данные мы получаем на сайте, с какой целью используем
          и какие у вас есть права. Документ подготовлен в соответствии с Федеральным законом
          № 152-ФЗ «О персональных данных».
        </p>
      </header>

      {/* Макет: липкий ToC + контент */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
        {/* ToC */}
        <aside className="h-max lg:sticky lg:top-28">
          <nav aria-label="Содержание" className="text-sm">
            <p className="mb-4 text-ivory">Содержание</p>
            <ol className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-silver transition-colors hover:text-ivory"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Content */}
        <article id="content" className="prose legal">
          <section id="operator" className="legal-section">
            <h2>1. Термины и оператор</h2>
            <p>
              Оператор персональных данных: <span className="text-ivory">Highway Films</span> (далее — «мы»).
              Контакт по вопросам персональных данных:{" "}
              <a href="mailto:info@highway-films.ru" >
                info@highway-films.ru
              </a>.
            </p>
          </section>

          <section id="scope" className="legal-section">
            <h2>2. Область действия</h2>
            <p>
              Политика действует для посетителей сайта <strong>highway-films.ru</strong> и форм обратной связи.
              Сайт ориентирован на пользователей в Российской Федерации. Мы не ведём целенаправленную
              обработку данных резидентов иных юрисдикций.
            </p>
          </section>

          <section id="data" className="legal-section">
            <h2>3. Какие данные мы обрабатываем</h2>
            <ul>
              <li>Контактные данные из формы: имя, e-mail, телефон, текст сообщения.</li>
              <li>Технические данные: IP-адрес, cookies, сведения о браузере/устройстве, URL-реферер.</li>
              <li>Переписка в мессенджерах/почте (если вы инициировали контакт).</li>
            </ul>
          </section>

          <section id="purposes" className="legal-section">
            <h2>4. Цели обработки</h2>
            <ul>
              <li>Обработка заявок и подготовка коммерческих предложений.</li>
              <li>Исполнение договорённостей и оказание услуг продакшна.</li>
              <li>Поддержка сайта, аналитика посещаемости, улучшение контента.</li>
              <li>Соблюдение требований законодательства (учёт, отчётность, ответы на запросы).</li>
            </ul>
          </section>

          <section id="legal" className="legal-section">
            <h2>5. Правовые основания (152-ФЗ)</h2>
            <ul>
              <li>Согласие субъекта персональных данных.</li>
              <li>Исполнение договора или действий по вашей инициативе до его заключения.</li>
              <li>Законные интересы оператора (поддержка сайта, безопасность).</li>
              <li>Исполнение обязанностей, возложенных законодательством РФ.</li>
            </ul>
          </section>

          <section id="sharing" className="legal-section">
            <h2>6. Передача третьим лицам</h2>
            <p>Мы не продаём и не публикуем ваши данные. Передача возможна только:</p>
            <ul>
              <li>подрядчикам/провайдерам (хостинг, почта, аналитика) — строго по необходимости;</li>
              <li>госорганам — по законному запросу;</li>
              <li>при реорганизации/продаже бизнеса — правопреемнику с сохранением обязательств.</li>
            </ul>
          </section>

          <section id="localization" className="legal-section">
            <h2>7. Локализация и хранение данных (242-ФЗ)</h2>
            <p>
              Персональные данные граждан РФ, собираемые через сайт, регистрируются, систематизируются,
              накапливаются и хранятся на серверах, расположенных на территории Российской Федерации.
            </p>
          </section>

          <section id="security" className="legal-section">
            <h2>8. Меры безопасности</h2>
            <ul>
              <li>Доступ к данным ограничен уполномоченными лицами по принципу необходимости.</li>
              <li>Применяются организационные и технические меры защиты.</li>
              <li>Срок хранения — до достижения целей или отзыва согласия, если нет иных оснований.</li>
            </ul>
          </section>

          <section id="cookies" className="legal-section">
            <h2>9. Cookies и аналитика</h2>
            <p>
              Cookies используются для корректной работы сайта, запоминания настроек и анонимной статистики.
              Управлять cookies можно в настройках браузера.
            </p>

            <div className="overflow-x-auto">
              <table className="legal-table" role="table">
                <caption className="legal-caption">
                  Категории cookies, применяемые на сайте
                </caption>
                <thead>
                  <tr className="text-left">
                    <th className="legal-cell">Категория</th>
                    <th className="legal-cell">Назначение</th>
                    <th className="legal-cell">Пример срока</th>
                  </tr>
                </thead>
                <tbody className="text-silver">
                  <tr>
                    <td className="legal-cell">Технические</td>
                    <td className="legal-cell">Работа форм и сессий</td>
                    <td className="legal-cell">до 12 месяцев</td>
                  </tr>
                  <tr>
                    <td className="legal-cell">Аналитические</td>
                    <td className="legal-cell">Анонимная статистика посещаемости</td>
                    <td className="legal-cell">до 14 месяцев</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-2">
              Настройки cookies:{" "}
              <button type="button" data-cmp="open" >
                изменить согласие
              </button>
              .
            </p>
          </section>

          <section id="rights" className="legal-section">
            <h2>10. Права субъекта ПДн</h2>
            <ul>
              <li>получить сведения об обработке и копию данных;</li>
              <li>требовать уточнения (обновления, исправления) данных;</li>
              <li>блокирования или уничтожения данных при незаконной обработке;</li>
              <li>отозвать согласие на обработку персональных данных.</li>
            </ul>
          </section>

          <section id="requests" className="legal-section">
            <h2>11. Как отправить запрос</h2>
            <p>
              Направляйте запросы на{" "}
              <a href="mailto:info@highway-films.ru" >
                info@highway-films.ru
              </a>. Укажите ФИО, контакт для ответа и суть обращения. Ответим в срок, установленный законом.
            </p>
          </section>

          <section id="updates" className="legal-section">
            <h2>12. Обновления политики</h2>
            <p>
              Актуальная версия всегда доступна по адресу <span className="text-ivory">/privacy</span>.
              Дата обновления: <time dateTime={UPDATED_AT}>{UPDATED_AT}</time>.
            </p>
          </section>

          <p>
            <a href="#main" className="text-small">
              Наверх
            </a>
          </p>
        </article>
      </div>
      </div>
    </div>
  );
}

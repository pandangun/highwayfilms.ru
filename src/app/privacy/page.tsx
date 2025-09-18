import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Highway Films",
  description:
    "Политика обработки персональных данных и cookies на сайте Highway Films.",
};

export default function PrivacyPage() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Политика конфиденциальности</h1>
      <p className="lead measure mt-2">
        Настоящая политика описывает, какие данные мы получаем на сайте, с какой целью их
        используем и какие у вас есть права. Документ подготовлен в соответствии с 152-ФЗ
        «О персональных данных».
      </p>

      <section className="measure mt-10 space-y-6 text-muted">
        <div>
          <h2 className="text-xl font-semibold text-fgc">1. Термины и оператор</h2>
          <p className="mt-2">
            Оператор персональных данных: <span className="text-fgc">Highway Films</span> (далее — «мы»).
            Связь по вопросам персональных данных:{" "}
            <a href="mailto:info@highwayfilms.ru" className="text-accent hover:underline">
              info@highwayfilms.ru
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">2. Какие данные мы обрабатываем</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Контактные данные из формы: имя, e-mail, телефон, текст сообщения.</li>
            <li>Технические данные при посещении сайта: IP-адрес, cookies, сведения о браузере и устройстве, URL реферера.</li>
            <li>Переписка в мессенджерах (если вы инициировали контакт в Telegram/почте).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">3. Цели обработки</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Обработка заявок и обратной связи, подготовка коммерческих предложений.</li>
            <li>Исполнение договорённостей и оказание услуг продакшна.</li>
            <li>Поддержка работы сайта, аналитика посещаемости и улучшение контента.</li>
            <li>Соблюдение требований законодательства (учёт, отчётность, ответы на запросы госорганов).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">4. Правовые основания</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Ваше согласие (отправка формы, сообщение в мессенджере, подписка).</li>
            <li>Исполнение договора или шагов к его заключению по вашей инициативе.</li>
            <li>Законные интересы оператора (поддержка сайта, защита прав и собственности).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">5. Передача третьим лицам</h2>
          <p className="mt-2">
            Мы не продаём и не публикуем ваши данные. Передача возможна только:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>подрядчикам/провайдерам (хостинг, почта, аналитика) — в объёме, необходимом для работы сервиса;</li>
            <li>госорганам — по законному запросу;</li>
            <li>при реорганизации/продаже бизнеса — правопреемнику с сохранением обязательств по защите данных.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">6. Хранение и безопасность</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Срок хранения — до достижения целей обработки или отзыва согласия, если нет иных оснований хранения.</li>
            <li>Доступ ограничен уполномоченными лицами, применяются организационные и технические меры защиты.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">7. Cookies и аналитика</h2>
          <p className="mt-2">
            Cookies используются для корректной работы сайта, запоминания настроек и анонимной статистики.
            Вы можете управлять cookies в настройках браузера. На сайте может использоваться системная
            аналитика (напр., Яндекс.Метрика/Google Analytics) с обезличенными метриками.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">8. Ваши права</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>получить сведения об обработке данных и копию данных;</li>
            <li>исправить данные, ограничить обработку, возразить против обработки;</li>
            <li>отозвать согласие, потребовать удаление, подать жалобу в уполномоченный орган.</li>
          </ul>
          <p className="mt-2">
            Запрос направляйте на{" "}
            <a href="mailto:info@highwayfilms.ru" className="text-accent hover:underline">
              info@highwayfilms.ru
            </a>. Мы ответим в установленный законом срок.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fgc">9. Обновления политики</h2>
          <p className="mt-2">
            Политика может обновляться. Актуальная версия всегда расположена по адресу{" "}
            <span className="text-fgc">/privacy</span>. Дата обновления: 18.09.2025.
          </p>
        </div>
      </section>
    </main>
  );
}

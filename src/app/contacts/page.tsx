import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты — Highway Films",
  description: "Свяжитесь с Highway Films: телефон, почта, Telegram. Форма обратной связи для заказа съёмки и сотрудничества.",
};

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Контакты</h1>
      <p className="lead mt-2 measure">
        Мы открыты для сотрудничества: пишите, звоните или оставьте заявку через форму.
      </p>

      {/* Основные контакты */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Телефон</h3>
          <p className="text-muted">+7 (999) 123-45-67</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">E-mail</h3>
          <p>
            <a href="mailto:info@highwayfilms.ru" className="text-accent hover:underline">
              info@highwayfilms.ru
            </a>
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Telegram</h3>
          <p>
            <a href="https://t.me/highwayfilms" target="_blank" rel="noopener" className="text-accent hover:underline">
              @highwayfilms
            </a>
          </p>
        </div>
      </div>

      {/* Форма обратной связи */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Оставить заявку</h2>
        <form className="grid gap-4 max-w-xl">
          <input
            type="text"
            placeholder="Ваше имя"
            className="input"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="input"
            required
          />
          <textarea
            placeholder="Сообщение"
            className="input min-h-[120px]"
            required
          />
          <button type="submit" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </section>

      {/* Адрес */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Офис</h2>
        <p className="measure">
          Санкт-Петербург, наб. реки Фонтанки, д. 100<br />
          Москва, ул. Арбат, д. 50
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты — Highway Films",
  description:
    "Свяжитесь с Highway Films: телефон, почта, Telegram. Форма обратной связи для заказа съёмки и сотрудничества.",
};

function InfoCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="text-sm text-muted">{title}</div>
      <div className="mt-1 text-lg">{value}</div>
    </>
  );
  return (
    <div className="card p-5 md:p-6">
      {href ? (
        <a href={href} className="block hover:opacity-90 transition">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Контакты</h1>
      <p className="lead measure mt-2">
        Коротко опишите задачу — вернёмся в течение рабочего дня с предложением и сроками.
      </p>

      {/* Быстрые контакты */}
      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Телефон" value="+7 (999) 123-45-67" href="tel:+79991234567" />
        <InfoCard title="E-mail" value="info@highwayfilms.ru" href="mailto:info@highwayfilms.ru" />
        <InfoCard title="Telegram" value="@highwayfilms" href="https://t.me/highwayfilms" />
      </section>

      {/* Форма */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Оставить заявку</h2>

        <form
          className="mt-6 grid gap-4 max-w-2xl"
          method="POST"
          action="https://formspree.io/f/your-id" /* <- замени на свой endpoint или убери и обрабатывай сам */
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-muted">Ваше имя</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Как к вам обращаться"
                className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none focus:border-white/30 placeholder:text-neutral-500"
              />
            </div>
            <div>
              <label className="block text-sm text-muted">E-mail</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none focus:border-white/30 placeholder:text-neutral-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted">Сообщение</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Коротко о задаче: формат, сроки, площадки, ориентир по бюджету."
              className="mt-2 w-full rounded-xl bg-white/5 border border-base p-4 outline-none focus:border-white/30 placeholder:text-neutral-500 resize-y"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              name="agree"
              required
              className="mt-1 h-4 w-4 rounded border-base bg-white/5 accent-white/80"
            />
            <span>
              Я согласен(а) с{" "}
              <Link href="/privacy" className="underline hover:opacity-80">
                политикой конфиденциальности
              </Link>
              .
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" className="btn-primary h-12 px-5 rounded-xl">
              Отправить заявку
            </button>
            <a href="mailto:info@highwayfilms.ru" className="btn h-12 rounded-xl">
              Написать на e-mail
            </a>
          </div>
        </form>

        <p className="mt-6 text-sm text-muted measure">
          Срочно? Позвоните или напишите в Telegram — так быстрее.
        </p>
      </section>

      {/* Офисы (коротко) */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Офисы</h2>
        <p className="mt-2 measure text-muted">
          Санкт-Петербург, наб. реки Фонтанки, 100 · Москва, ул. Арбат, 50
        </p>
      </section>
    </main>
  );
}

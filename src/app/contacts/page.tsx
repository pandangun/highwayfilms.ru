// app/contacts/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты — Highway Films",
  description:
    "Свяжитесь с Highway Films: телефон, почта, Telegram. Форма обратной связи для заказа съёмки и сотрудничества.",
  alternates: { canonical: "https://highwayfilms.ru/contacts" },
  openGraph: {
    type: "website",
    title: "Контакты — Highway Films",
    description:
      "Телефон, e-mail, Telegram и форма заявки. Отвечаем оперативно в рабочие часы.",
    url: "https://highwayfilms.ru/contacts",
    siteName: "Highway Films",
  },
  robots: { index: true, follow: true },
};

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.6-.36l3.4 1.13c.7.23 1.1.95.9 1.65-.5 1.74-2.2 3.4-3.9 3.4C10.6 21 3 13.4 3 6.1c0-1.7 1.7-3.4 3.4-3.9.7-.2 1.4.2 1.6.9l1.1 3.4c.2.6 0 1.3-.4 1.6L6.6 10.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 2v.4l-8 5-8-5V8h16ZM4 18V9.7l7.4 4.6c.36.22.84.22 1.2 0L20 9.7V18H4Z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconTG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M21.6 4.2 2.7 11.5c-1 .4-.9 1.9.1 2.2l4.6 1.4 1.8 4.9c.3.8 1.4 1 2 .3l2.7-2.8 4.5 3.3c.8.6 2 .1 2.2-.9l2.7-13c.2-1-.7-1.8-1.7-1.5ZM8.2 13.8l9.7-6.4-7.8 7.4-.2 2.6-1.7-3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InfoCard({
  title,
  value,
  href,
  icon,
  ariaLabel,
}: {
  title: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-muted">{icon}</div>
      <div>
        <div className="text-sm text-muted">{title}</div>
        <div className="mt-1 text-lg">{value}</div>
      </div>
    </div>
  );
  return (
    <div className="card p-5 md:p-6">
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel || value}
          className="block transition hover:opacity-90"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      {/* Шапка */}
      <header className="max-w-3xl">
        <h1 className="h1">Контакты</h1>
        <p className="lead measure mt-2">
          Коротко опишите задачу — вернёмся в течение рабочего дня с предложением и сроками.
        </p>
        <p className="mt-3 text-sm text-muted">
          График: пн–пт 10:00–19:00 (МСК). Вне графика часто отвечаем, но без гарантий.
        </p>
      </header>

      {/* Быстрые контакты */}
      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="Телефон"
          value="+7 (999) 123-45-67"
          href="tel:+79991234567"
          icon={<IconPhone />}
          ariaLabel="Позвонить +7 999 123 45 67"
        />
        <InfoCard
          title="E-mail"
          value="info@highwayfilms.ru"
          href="mailto:info@highwayfilms.ru?subject=%5BЗаявка%5D%20Highway%20Films"
          icon={<IconMail />}
          ariaLabel="Написать письмо на info@highwayfilms.ru"
        />
        <InfoCard
          title="Telegram"
          value="@highwayfilms"
          href="https://t.me/highwayfilms"
          icon={<IconTG />}
          ariaLabel="Открыть Telegram @highwayfilms"
        />
      </section>

      {/* Разделитель */}
      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Форма */}
      <section className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Оставить заявку</h2>
          <form
            className="mt-6 grid gap-4 max-w-xl"
            method="POST"
            action="https://formspree.io/f/your-id" // замени или обрабатывай на своей стороне
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-muted">Телефон (необязательно)</label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  placeholder="+7 999 123-45-67"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none focus:border-white/30 placeholder:text-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm text-muted">Бюджет (ориентир)</label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Напр.: 200–400 тыс ₽"
                  className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-base px-4 outline-none focus:border-white/30 placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted">Сообщение</label>
              <textarea
                name="message"
                required
                rows={6}
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

            <p className="mt-3 text-xs text-muted">
              Отвечаем обычно в течение 2–4 часов в рабочие дни.
            </p>
          </form>
        </div>

        {/* Колонка справа: адреса + мини-карта */}
        <div className="space-y-4">
          <div className="card p-5 md:p-6">
            <h3 className="text-lg font-semibold">Офисы</h3>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                Санкт-Петербург — наб. реки Фонтанки, 100
              </li>
              <li>
                Москва — ул. Арбат, 50
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="btn h-10 rounded-xl"
                href="https://yandex.ru/maps/?text=Санкт-Петербург%20набережная%20реки%20Фонтанки%20100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть на карте СПб
              </a>
              <a
                className="btn h-10 rounded-xl"
                href="https://yandex.ru/maps/?text=Москва%20Арбат%2050"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть на карте Москва
              </a>
            </div>
          </div>

          {/* Мини-карта как превью (без скриптов) — поставь свой PNG/JPG в /public */}
          <div className="card overflow-hidden">
            <img
              src="/map-preview.jpg"
              alt="Карта расположения офисов Highway Films"
              className="w-full h-56 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

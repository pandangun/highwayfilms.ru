import Link from "next/link";
import Credits from "@/components/Credits";
import PageHead from "@/components/PageHead";
import { type Locale, withLocalePath } from "@/components/siteNavigation";

const copy = {
  ru: {
    title: "Кабинет клиента",
    lead: "Версии монтажа, правки по таймкодам и финальные файлы проекта в одном месте.",
    accessTitle: "Как попасть в кабинет",
    access: "Ссылку на кабинет присылаем в Telegram или WhatsApp, когда начинаем проект. Пароль не нужен: ссылка личная.",
    demo: "Посмотреть пример проекта",
    inside: [
      { label: "Версии", value: "каждая сборка монтажа с датой и статусом" },
      { label: "Правки", value: "комментарии по таймкодам в одной ленте" },
      { label: "Файлы", value: "мастер-копия и нарезки после согласования" },
    ],
    note: "Ссылка потерялась? ",
    noteLink: "Напишите нам",
  },
  en: {
    title: "Client room",
    lead: "Edit versions, timecoded notes and final project files in one place.",
    accessTitle: "How to get in",
    access: "We send the link to your room on Telegram or WhatsApp when the project starts. No password: the link is personal.",
    demo: "See a sample project",
    inside: [
      { label: "Versions", value: "every cut with its date and status" },
      { label: "Notes", value: "timecoded comments in one thread" },
      { label: "Files", value: "master and cut-downs after approval" },
    ],
    note: "Lost the link? ",
    noteLink: "Message us",
  },
} as const;

/**
 * Вход в кабинет. Своего входа по логину и паролю нет: пара или клиент
 * получает личную ссылку в мессенджере. Здесь — что внутри и пример.
 */
export function ClientEntryPage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <>
      <PageHead title={t.title} lead={t.lead} />

      <section className="border-t border-line pb-[var(--band)]">
        <div className="wrap grid gap-16 pt-[clamp(56px,6vw,96px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-24">
          <div>
            <Credits items={[...t.inside]} size="lg" className="credits--start" />
          </div>

          <div className="client-login">
            <h2 className="display display--h3">{t.accessTitle}</h2>
            <p className="mt-6 text-steel">{t.access}</p>
            <Link href={withLocalePath("/client/demo-project", locale)} className="btn btn--primary mt-10">
              {t.demo}
            </Link>
            <p className="mt-8 text-small text-steel">
              {t.note}
              <Link href={withLocalePath("/contacts", locale)} className="link-line">
                {t.noteLink}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

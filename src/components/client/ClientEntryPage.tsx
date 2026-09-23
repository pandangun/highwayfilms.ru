import Link from "next/link";
import Credits from "@/components/Credits";
import PageHead from "@/components/PageHead";
import { ClientAccessForm } from "@/components/client/ClientAccessForm";
import type { Locale } from "@/components/siteNavigation";

const copy = {
  ru: {
    title: "Кабинет клиента",
    lead: "Версии монтажа, правки по таймкодам и финальные файлы проекта в одном месте.",
    formTitle: "Вход",
    inside: [
      { label: "Версии", value: "каждая сборка монтажа с датой и статусом" },
      { label: "Правки", value: "комментарии по таймкодам в одной ленте" },
      { label: "Файлы", value: "мастер-копия и нарезки после согласования" },
    ],
    note: "Доступ выдаём к конкретному проекту. Если доступа ещё нет, ",
    noteLink: "напишите нам",
  },
  en: {
    title: "Client room",
    lead: "Edit versions, timecoded notes and final project files in one place.",
    formTitle: "Sign in",
    inside: [
      { label: "Versions", value: "every cut with its date and status" },
      { label: "Notes", value: "timecoded comments in one thread" },
      { label: "Files", value: "master and cut-downs after approval" },
    ],
    note: "Access is issued per project. If you don't have it yet, ",
    noteLink: "message us",
  },
} as const;

export function ClientEntryPage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <>
      <PageHead title={t.title} lead={t.lead} />

      <section className="border-t border-line pb-[var(--band)]">
        <div className="wrap grid gap-16 pt-[clamp(56px,6vw,96px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-24">
          <div>
            <Credits items={[...t.inside]} size="lg" className="credits--start" />
            <p className="mt-12 max-w-[34em] text-silver">
              {t.note}
              <Link href={locale === "en" ? "/en/contacts" : "/contacts"} className="link-line">
                {t.noteLink}
              </Link>
              .
            </p>
          </div>

          <div className="client-login">
            <h2 className="display display--h3 mb-10">{t.formTitle}</h2>
            <ClientAccessForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}

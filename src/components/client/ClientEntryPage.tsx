import Link from "next/link";
import { FolderLock, MessageSquareMore, MonitorPlay, Send } from "lucide-react";
import type { Locale } from "@/data/articles";
import { ClientAccessForm } from "@/components/client/ClientAccessForm";

type ClientEntryPageProps = {
  locale: Locale;
};

const copy = {
  ru: {
    eyebrow: "Client area",
    title: "Вход для клиентов",
    lead: "Доступ к версии монтажа, комментариям по таймкодам, статусу проекта и финальным материалам.",
    note: "Клиентская зона находится в ранней версии. Доступ выдаётся по конкретному проекту. Если у вас ещё нет доступа, свяжитесь с нами — подключим правильный маршрут.",
    features: [
      "Версии монтажа и текущий статус проекта",
      "Комментарии по таймкодам в одной ленте",
      "Финальные материалы и структура выдачи",
    ],
    sideTitle: "Что здесь будет",
    sideLead: "Это не большая SaaS-панель, а аккуратная проектная комната студии для согласования и выдачи материалов.",
    support: "Если нет доступа — написать нам",
  },
  en: {
    eyebrow: "Client area",
    title: "Client access",
    lead: "Access to edit versions, timecoded comments, project status, and final delivery materials.",
    note: "The client area is currently in an early version. Access is issued per project. If you do not have access yet, contact us and we will route you properly.",
    features: [
      "Edit versions and current project status",
      "Timecoded feedback in one place",
      "Final materials with a clean delivery structure",
    ],
    sideTitle: "What this becomes",
    sideLead: "Not a heavy SaaS dashboard, but a refined project room for approvals, review, and delivery.",
    support: "Need access? Contact us",
  },
} as const;

export function ClientEntryPage({ locale }: ClientEntryPageProps) {
  const t = copy[locale];
  const contactsHref = locale === "en" ? "/en/contacts" : "/contacts";

  return (
    <main className="page-shell">
      <div className="page-ambient" />
      <div className="page-content">
        <section className="pt-header-safe relative overflow-hidden pb-16 pt-6 md:pb-20 md:pt-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(62rem_34rem_at_8%_0%,rgba(124,58,237,.18),transparent_58%),radial-gradient(40rem_20rem_at_100%_0%,rgba(214,183,138,.12),transparent_50%)]" />
          <div className="container relative grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/66">
                {t.eyebrow}
              </span>
              <h1 className="font-display heading-balance mt-5 text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.055em] text-white">
                {t.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-white/66 md:text-[1.14rem]">{t.lead}</p>
              <div className="mt-7 grid gap-3">
                {t.features.map((item, index) => {
                  const Icon = [MonitorPlay, MessageSquareMore, FolderLock][index] ?? MonitorPlay;
                  return (
                    <div key={item} className="surface-quiet flex items-center gap-4 px-4 py-4">
                      <div className="contact-node__icon h-12 w-12">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm leading-7 text-white/72">{item}</div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/46">{t.note}</p>
            </div>

            <div className="project-room p-4 md:p-5">
              <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="surface-quiet p-5 md:p-6">
                  <p className="eyebrow text-white/44">{locale === "en" ? "Access form" : "Форма доступа"}</p>
                  <h2 className="font-display mt-3 text-[clamp(1.8rem,1.45rem+1vw,2.6rem)] leading-[0.98] text-white">
                    {locale === "en" ? "Open a project room" : "Открыть проектную комнату"}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/58">
                    {locale === "en"
                      ? "Enter the project code and the contact e-mail associated with the production."
                      : "Введите код проекта и контакт, который связан с производством или согласованием."}
                  </p>
                  <div className="mt-6">
                    <ClientAccessForm locale={locale} />
                  </div>
                </div>

                <div className="surface-quiet p-5 md:p-6">
                  <p className="eyebrow text-white/44">{t.sideTitle}</p>
                  <h2 className="font-display mt-3 text-[clamp(1.8rem,1.45rem+1vw,2.6rem)] leading-[0.98] text-white">
                    {locale === "en" ? "A studio-side project interface" : "Спокойный студийный интерфейс проекта"}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/58">{t.sideLead}</p>
                  <div className="mt-6 rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-white/42">HF-274</div>
                        <div className="mt-2 font-display text-[1.6rem] leading-[1] text-white">
                          {locale === "en" ? "Demo project" : "Демо-проект"}
                        </div>
                      </div>
                      <div className="status-pill status-pill--amber">
                        {locale === "en" ? "Review" : "Согласование"}
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm leading-7 text-white/58">
                      <div>Version 02 · {locale === "en" ? "current client cut" : "текущая версия для клиента"}</div>
                      <div>00:14 · {locale === "en" ? "comment pending" : "комментарий на обсуждении"}</div>
                      <div>Master 4K · {locale === "en" ? "delivery prepared after approval" : "выдача после финального согласования"}</div>
                    </div>
                  </div>
                  <Link href={contactsHref} className="btn mt-6 inline-flex rounded-full px-5 text-sm">
                    {t.support}
                    <Send className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

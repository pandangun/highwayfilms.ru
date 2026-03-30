import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  href?: string;
  eyebrow?: string;
  note?: string;
  locale?: "ru" | "en";
}

export default function CTA({
  title = "Готовы собрать проект с сильной визуальной логикой?",
  description = "Отправьте короткий бриф. Вернёмся с treatment, сроками и рабочей рамкой по бюджету.",
  ctaLabel = "Получить КП",
  href,
  locale = "ru",
  eyebrow,
  note = "Обычно отвечаем в течение одного рабочего дня",
}: CTAProps) {
  const resolvedEyebrow = eyebrow ?? (locale === "en" ? "Contact" : "Контакт");
  const resolvedHref = href ?? (locale === "en" ? "/en/brief" : "/brief");

  return (
    <section className="container py-14 md:py-16">
      <div className="surface-panel relative overflow-hidden px-6 py-8 md:px-8 md:py-10">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        <div className="relative flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,24rem)] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/55">{resolvedEyebrow}</p>
            <h3 className="font-display mt-3 text-3xl leading-tight tracking-[-0.03em] text-white md:text-4xl">
              {title}
            </h3>
            <p className="mt-4 text-base leading-7 text-white/68 md:text-lg">{description}</p>
          </div>

          <div className="surface-quiet p-4 md:p-5">
            <div className="rule-fade" />
            <div className="mt-4 flex flex-col gap-3">
              <Link href={resolvedHref} className="btn-primary h-12 rounded-full px-6 text-center">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-sm leading-6 text-white/58">{note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

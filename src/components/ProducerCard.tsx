import Image from "next/image";
import { producer } from "@/content/proof";
import { contacts } from "@/content/site";
import { published } from "@/lib/placeholders";
import type { Locale } from "@/components/siteNavigation";

/**
 * Живой человек рядом с расчётом и в контактах: фото, имя, как связаться.
 * Пока продюсер — заглушка, на сайте карточки нет (src/lib/placeholders.ts).
 */
export default function ProducerCard({ locale, className }: { locale: Locale; className?: string }) {
  if (published([producer]).length === 0) return null;

  return (
    <div className={["producer", className].filter(Boolean).join(" ")}>
      <span className="producer__photo" aria-hidden>
        {producer.photo ? (
          <Image src={producer.photo} alt="" fill sizes="64px" className="object-cover" />
        ) : (
          producer.initials
        )}
      </span>
      <span className="producer__text">
        <span className="producer__name">{producer.name[locale]}</span>
        <span className="producer__role">{producer.role[locale]}</span>
        <span className="producer__links">
          <a href={contacts.phoneHref} className="num">
            {contacts.phone}
          </a>
          <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </span>
      </span>
    </div>
  );
}

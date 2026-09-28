import Image from "next/image";
import KmPost from "@/components/road/KmPost";
import PlaceholderLogo from "@/components/PlaceholderLogo";
import { clientLogos } from "@/content/proof";
import { published } from "@/lib/placeholders";
import type { Locale } from "@/components/siteNavigation";

/**
 * Клиенты — логотипы сеткой через линии, одним цветом. Пока настоящих
 * логотипов нет, блок на сайте не выводится (см. src/lib/placeholders.ts).
 */
export default function ClientStrip({ locale }: { locale: Locale }) {
  const items = published(clientLogos);
  if (items.length === 0) return null;

  return (
    <section className="band border-t border-line">
      <div className="wrap">
        <div className="section-head">
          <KmPost lang={locale} />
          <h2 className="display display--h2">{locale === "en" ? "Clients" : "Клиенты"}</h2>
        </div>
        <ul className="clients">
          {items.map((item) => (
            <li key={item.name} className="client">
              {item.logo ? (
                <Image src={item.logo} alt={item.name} width={180} height={60} className="client__logo" />
              ) : item.mark ? (
                <>
                  <PlaceholderLogo mark={item.mark} />
                  <span className="visually-hidden">{item.name}</span>
                </>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

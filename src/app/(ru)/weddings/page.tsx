import "@/app/styles/weddings.css";
import type { Metadata } from "next";
import ReelSection from "@/components/ReelSection";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";
import WeddingApproach from "@/components/weddings/WeddingApproach";
import WeddingBriefContact from "@/components/weddings/WeddingBriefContact";
import WeddingCasesCarousel from "@/components/weddings/WeddingCasesCarousel";
import WeddingExtras from "@/components/weddings/WeddingExtras";
import WeddingFaq from "@/components/weddings/WeddingFaq";
import WeddingHero from "@/components/weddings/WeddingHero";
import WeddingPackages from "@/components/weddings/WeddingPackages";
import WeddingProcess from "@/components/weddings/WeddingProcess";
import WeddingQuotes from "@/components/weddings/WeddingQuotes";
import { weddingEditorialImages, weddingFaqItems, weddingPackages } from "@/data/weddings";

export const metadata: Metadata = buildPageMetadata({
  title: "Свадебные фильмы Highway Films — Москва, Санкт-Петербург, Россия",
  description:
    "Свадебные фильмы Highway Films: спокойная съёмка, короткий тизер, фильм, понятная выдача и аккуратный студийный подход для свадеб в Москве, Санкт-Петербурге и по России.",
  path: "/weddings",
  locale: "ru",
  imagePath: weddingEditorialImages.morningPortrait.src,
});

export default function WeddingsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Свадебные фильмы Highway Films",
    serviceType: "Свадебная видеосъёмка",
    description:
      "Свадебные фильмы, тизеры и спокойная видеосъёмка в Москве, Санкт-Петербурге и по России.",
    url: `${SITE_URL}/weddings`,
    image: Object.values(weddingEditorialImages).map((image) => `${SITE_URL}${image.src}`),
    provider: {
      "@type": "Organization",
      name: "Highway Films",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Москва" },
      { "@type": "City", name: "Санкт-Петербург" },
      { "@type": "Country", name: "Россия" },
    ],
    offers: weddingPackages.map((item) => ({
      "@type": "Offer",
      name: item.title,
      url: `${SITE_URL}/weddings${item.href}`,
      priceCurrency: "RUB",
      price: Number(item.price.replace(/[^\d]/g, "")),
      description: `${item.fit} ${item.result}`,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: weddingFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="page-shell wedding-page-shell">
      <div className="page-ambient wedding-page-ambient" />
      <div className="page-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <WeddingHero />
        <WeddingApproach />
        <ReelSection
          section="weddings"
          eyebrow="Примеры работ"
          title="Фильмы, которые мы сняли"
          lead="Выберите похожее на ваш день: город, загород, камерная церемония, большой вечер."
          mode="catalog"
        />
        <WeddingCasesCarousel />
        <WeddingProcess />
        <WeddingPackages />
        <WeddingExtras />
        <WeddingQuotes />
        <WeddingFaq />
        <WeddingBriefContact />
      </div>
    </div>
  );
}

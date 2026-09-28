import type { ClientLogo } from "@/content/proof";

/**
 * Заглушка логотипа клиента: название, набранное в духе фирменного знака,
 * и простой рисунок-знак. Одним цветом (currentColor), как настоящие
 * логотипы в полосе клиентов. Уйдёт, когда в src/content/proof.ts
 * появятся настоящие файлы логотипов.
 */
export default function PlaceholderLogo({ mark }: { mark: NonNullable<ClientLogo["mark"]> }) {
  switch (mark) {
    case "nordline":
      return (
        <span className="ph-logo ph-logo--row">
          <svg viewBox="0 0 24 24" className="ph-logo__mark" aria-hidden>
            <path d="M7 21 15 3M13 21 21 3" stroke="currentColor" strokeWidth="2.4" fill="none" />
          </svg>
          <span className="ph-logo__word ph-logo__word--nordline">NORDLINE</span>
        </span>
      );
    case "manufaktura":
      return (
        <span className="ph-logo ph-logo--stack">
          <span className="ph-logo__kicker">Балтийская</span>
          <span className="ph-logo__word ph-logo__word--manufaktura">Мануфактура</span>
        </span>
      );
    case "rostra":
      return (
        <span className="ph-logo ph-logo--row">
          <svg viewBox="0 0 24 24" className="ph-logo__mark" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <path d="M12 6.5v11M6.5 12h11" stroke="currentColor" strokeWidth="2.2" />
          </svg>
          <span className="ph-logo__word ph-logo__word--rostra">ростра</span>
        </span>
      );
    case "labirint":
      return (
        <span className="ph-logo ph-logo--row">
          <svg viewBox="0 0 24 24" className="ph-logo__mark" aria-hidden>
            <path d="M3 3h18v18H6V6h12v12H9V9h6v6h-3" stroke="currentColor" strokeWidth="1.8" fill="none" />
          </svg>
          <span className="ph-logo__word ph-logo__word--labirint">ЛАБИРИНТ</span>
        </span>
      );
    case "aurora":
      return (
        <span className="ph-logo ph-logo--stack">
          <span className="ph-logo__word ph-logo__word--aurora">Aurora</span>
          <span className="ph-logo__kicker ph-logo__kicker--wide">Development</span>
        </span>
      );
    case "shpil":
      return (
        <span className="ph-logo ph-logo--stack">
          <svg viewBox="0 0 24 24" className="ph-logo__spire" aria-hidden>
            <path d="M12 1 13.6 17h-3.2z" fill="currentColor" />
            <path d="M8.5 20h7" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="ph-logo__word ph-logo__word--shpil">Шпиль</span>
          <span className="ph-logo__kicker">кофейня</span>
        </span>
      );
    case "orbita":
      return (
        <span className="ph-logo ph-logo--row">
          <svg viewBox="0 0 28 24" className="ph-logo__mark ph-logo__mark--wide" aria-hidden>
            <circle cx="14" cy="12" r="5.5" fill="currentColor" />
            <ellipse cx="14" cy="12" rx="12.5" ry="4.2" transform="rotate(-18 14 12)" stroke="currentColor" strokeWidth="1.3" fill="none" />
          </svg>
          <span className="ph-logo__word ph-logo__word--orbita">орбита</span>
        </span>
      );
    case "volna":
      return (
        <span className="ph-logo ph-logo--row">
          <svg viewBox="0 0 32 24" className="ph-logo__mark ph-logo__mark--wide" aria-hidden>
            <path d="M1 14c3.5-6 6.5-6 10 0s6.5 6 10 0 6.5-6 10 0" stroke="currentColor" strokeWidth="2.2" fill="none" />
          </svg>
          <span className="ph-logo__word ph-logo__word--volna">VOLNA</span>
        </span>
      );
  }
}

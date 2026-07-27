"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { weddingCases } from "@/data/weddings";

const DESKTOP_MEDIA_QUERY = "(min-width: 900px)";

function formatSlideNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function getWrappedIndex(index: number) {
  const total = weddingCases.length;
  return (index + total) % total;
}

export default function WeddingCasesCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [motionKey, setMotionKey] = useState(0);

  const activeCase = weddingCases[activeIndex];
  const previousIndex = getWrappedIndex(activeIndex - 1);
  const nextIndex = getWrappedIndex(activeIndex + 1);
  const previousCase = weddingCases[previousIndex];
  const nextCase = weddingCases[nextIndex];
  const formattedIndex = formatSlideNumber(activeIndex);
  const formattedTotal = String(weddingCases.length).padStart(2, "0");
  const progress = (activeIndex + 1) / weddingCases.length;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const syncMode = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMode);
      return () => mediaQuery.removeEventListener("change", syncMode);
    }

    mediaQuery.addListener(syncMode);
    return () => mediaQuery.removeListener(syncMode);
  }, []);

  function scrollMobileToIndex(index: number, behavior: ScrollBehavior = "smooth") {
    const card = cardRefs.current[index];
    if (!card) return;

    card.scrollIntoView({
      behavior,
      block: "nearest",
      inline: "center",
    });

    setActiveIndex(index);
  }

  useEffect(() => {
    if (isDesktop) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = cardRefs.current.filter(
      (card): card is HTMLAnchorElement => card instanceof HTMLAnchorElement
    );

    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!nextEntry) return;

        const nextIndexValue = Number((nextEntry.target as HTMLElement).dataset.index);
        if (Number.isNaN(nextIndexValue)) return;

        setActiveIndex(nextIndexValue);
      },
      {
        root: viewport,
        threshold: [0.55, 0.7, 0.85],
      }
    );

    cards.forEach((card) => observer.observe(card));

    const frame = window.requestAnimationFrame(() => {
      scrollMobileToIndex(activeIndexRef.current, "auto");
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [isDesktop]);

  function goToDesktopIndex(index: number, nextDirection: "next" | "prev") {
    setDirection(nextDirection);
    setMotionKey((current) => current + 1);
    setActiveIndex(index);
  }

  function getDirectionForIndex(index: number) {
    const delta = (index - activeIndex + weddingCases.length) % weddingCases.length;
    return delta === 0 ? direction : delta <= weddingCases.length / 2 ? "next" : "prev";
  }

  function handleDesktopKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToDesktopIndex(previousIndex, "prev");
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToDesktopIndex(nextIndex, "next");
    }
  }

  return (
    <section id="wedding-cases" className="wedding-section">
      <div className="container">
        <div className="wedding-cases-shell">
          <div className="wedding-cases-head reveal-up">
            <div className="wedding-section-head">
              <p className="eyebrow wedding-section-kicker">Кейсы</p>
              <h2 className="wedding-section-title font-display">
                Истории, которые можно листать как сцену.
              </h2>
              <p className="wedding-section-text">
                На телефоне всё остаётся простым и нативным. На компьютере галерея
                превращается в 3D-просмотр с мягким перелистыванием, чтобы кейсы
                ощущались как отдельные миры, а не как лента карточек.
              </p>
            </div>

            <div className="wedding-cases-controls reveal-up delay-1">
              <div className="wedding-cases-progress" aria-live="polite">
                <span className="wedding-cases-index">{formattedIndex}</span>
                <span className="wedding-cases-progress__track" aria-hidden="true">
                  <span
                    className="wedding-cases-progress__fill"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                </span>
                <span className="wedding-cases-total">{formattedTotal}</span>
              </div>
            </div>
          </div>

          <div
            className="wedding-cases-desktop reveal-up delay-2"
            onKeyDown={handleDesktopKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Галерея свадебных кейсов"
          >
            <div className="wedding-cases-stage" data-direction={direction}>
              <div className="wedding-cases-stage__ambient" aria-hidden="true" />

              <button
                type="button"
                className="wedding-cases-stage__nav wedding-cases-stage__nav--prev"
                onClick={() => goToDesktopIndex(previousIndex, "prev")}
                aria-label="Показать предыдущий кейс"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="wedding-cases-stage__deck">
                <button
                  key={`prev-${previousCase.id}-${motionKey}`}
                  type="button"
                  className="wedding-cases-stage__side wedding-cases-stage__side--prev"
                  onClick={() => goToDesktopIndex(previousIndex, "prev")}
                  aria-label={`Открыть предыдущий кейс: ${previousCase.title}`}
                >
                  <span className="wedding-cases-stage__side-media">
                    <Image
                      src={previousCase.image.src}
                      alt=""
                      fill
                      sizes="28vw"
                      className="object-cover"
                      style={{ objectPosition: previousCase.image.objectPosition }}
                    />
                  </span>
                  <span className="wedding-cases-stage__side-overlay" />
                  <span className="wedding-cases-stage__side-copy">
                    <span className="wedding-cases-stage__side-kicker">
                      <span>{formatSlideNumber(previousIndex)}</span>
                      <span aria-hidden="true">/</span>
                      <span>{previousCase.city}</span>
                    </span>
                    <span className="wedding-cases-stage__side-city">{previousCase.deliverable}</span>
                    <strong className="wedding-cases-stage__side-title">{previousCase.title}</strong>
                    <span className="wedding-cases-stage__side-note">{previousCase.details[0]}</span>
                  </span>
                </button>

                <a
                  key={`active-${activeCase.id}-${motionKey}`}
                  href={activeCase.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wedding-case-feature wedding-case-feature--stage"
                >
                  <span className="wedding-case-feature__glow" aria-hidden="true" />
                  <span className="wedding-case-feature__frame" aria-hidden="true" />
                  <div className="wedding-case-feature__media">
                    <Image
                      src={activeCase.image.src}
                      alt={activeCase.image.alt}
                      fill
                      fetchPriority="low"
                      sizes="(max-width: 1279px) 100vw, 58vw"
                      className="object-cover"
                      style={{ objectPosition: activeCase.image.objectPosition }}
                    />
                  </div>
                  <div className="wedding-case-feature__overlay" />

                  <div className="wedding-case-feature__copy">
                    <div className="wedding-case-feature__topline">
                      <div className="wedding-case-feature__meta">
                        <span>{activeCase.city}</span>
                        <span className="wedding-case-feature__dot" aria-hidden="true" />
                        <span>{activeCase.deliverable}</span>
                      </div>
                      <span className="wedding-case-feature__serial">
                        {formattedIndex} / {formattedTotal}
                      </span>
                    </div>

                    <div className="wedding-case-feature__body">
                      <h3 className="wedding-case-feature__title font-display">
                        {activeCase.title}
                      </h3>
                      <p className="wedding-case-feature__summary">{activeCase.summary}</p>
                      <div className="wedding-case-feature__details">
                        {activeCase.details.map((detail) => (
                          <span key={detail} className="wedding-case-feature__detail">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span className="wedding-case-feature__link">
                      Открыть кейс
                      <ExternalLink size={16} />
                    </span>
                  </div>
                </a>

                <button
                  key={`next-${nextCase.id}-${motionKey}`}
                  type="button"
                  className="wedding-cases-stage__side wedding-cases-stage__side--next"
                  onClick={() => goToDesktopIndex(nextIndex, "next")}
                  aria-label={`Открыть следующий кейс: ${nextCase.title}`}
                >
                  <span className="wedding-cases-stage__side-media">
                    <Image
                      src={nextCase.image.src}
                      alt=""
                      fill
                      sizes="28vw"
                      className="object-cover"
                      style={{ objectPosition: nextCase.image.objectPosition }}
                    />
                  </span>
                  <span className="wedding-cases-stage__side-overlay" />
                  <span className="wedding-cases-stage__side-copy">
                    <span className="wedding-cases-stage__side-kicker">
                      <span>{formatSlideNumber(nextIndex)}</span>
                      <span aria-hidden="true">/</span>
                      <span>{nextCase.city}</span>
                    </span>
                    <span className="wedding-cases-stage__side-city">{nextCase.deliverable}</span>
                    <strong className="wedding-cases-stage__side-title">{nextCase.title}</strong>
                    <span className="wedding-cases-stage__side-note">{nextCase.details[0]}</span>
                  </span>
                </button>
              </div>

              <button
                type="button"
                className="wedding-cases-stage__nav wedding-cases-stage__nav--next"
                onClick={() => goToDesktopIndex(nextIndex, "next")}
                aria-label="Показать следующий кейс"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="wedding-cases-selector" aria-label="Выбор кейса">
              {weddingCases.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="wedding-cases-selector__item"
                  data-active={activeIndex === index ? "true" : "false"}
                  onClick={() => goToDesktopIndex(index, getDirectionForIndex(index))}
                  aria-pressed={activeIndex === index}
                >
                  <span className="wedding-cases-selector__index">
                    {formatSlideNumber(index)}
                  </span>
                  <span className="wedding-cases-selector__title">{item.title}</span>
                  <span className="wedding-cases-selector__meta">
                    {item.city} / {item.details[0]}
                  </span>
                  <span className="wedding-cases-selector__note">{item.summary}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="wedding-cases-mobile reveal-up delay-2">
            <div
              ref={viewportRef}
              className="wedding-cases-viewport no-scrollbar"
              role="region"
              aria-roledescription="carousel"
              aria-label="Свайп-галерея свадебных кейсов"
            >
              <div className="wedding-cases-track">
                {weddingCases.map((item, index) => (
                  <a
                    key={item.id}
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    data-index={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wedding-case-card"
                    data-active={activeIndex === index ? "true" : "false"}
                  >
                    <div className="wedding-case-card__media">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        fetchPriority="low"
                        sizes="(max-width: 767px) 84vw, 40vw"
                        className="object-cover"
                        style={{ objectPosition: item.image.objectPosition }}
                      />
                    </div>
                    <div className="wedding-case-card__overlay" />
                    <div className="wedding-case-card__topline">
                      <span className="wedding-case-card__serial">
                        {formatSlideNumber(index)}
                      </span>
                    </div>

                    <div className="wedding-case-card__copy">
                      <div className="wedding-case-card__meta">
                        <span>{item.city}</span>
                        <span className="wedding-case-card__dot" aria-hidden="true" />
                        <span>{item.deliverable}</span>
                      </div>
                      <h3 className="wedding-case-card__title font-display">{item.title}</h3>
                      <p className="wedding-case-card__summary">{item.summary}</p>
                      <div className="wedding-case-card__details">
                        {item.details.slice(0, 2).map((detail) => (
                          <span key={detail} className="wedding-case-card__detail">
                            {detail}
                          </span>
                        ))}
                      </div>
                      <span className="wedding-case-card__cta">
                        Открыть кейс
                        <ExternalLink size={15} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="wedding-cases-mobile__footer reveal-up delay-3">
              <div className="wedding-cases-mobile__status">
                <span className="wedding-cases-mobile__current">{activeCase.title}</span>
                <span className="wedding-cases-mobile__hint">Свайпайте по историям</span>
              </div>

              <div className="wedding-cases-dots" aria-label="Переключение кейсов">
                {weddingCases.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className="wedding-cases-dot"
                    data-active={activeIndex === index ? "true" : "false"}
                    aria-label={`Показать кейс ${formatSlideNumber(index)}: ${item.title}`}
                    onClick={() => scrollMobileToIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

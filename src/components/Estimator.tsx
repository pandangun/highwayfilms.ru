"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import type { EstimateContent } from "@/content/estimate";
import { contacts } from "@/content/site";
import { type Locale, withLocalePath } from "@/components/siteNavigation";
import {
  estimateExtras,
  estimateLevels,
  formatFrom,
  formatRub,
  rushMarkup,
  type EstimateExtraId,
  type PricedKey,
} from "@/lib/pricing";

/** Уровень проекта в калькуляторе: название и что на выходе. */
export type EstimatorLevel = { name: string; summary: string };
export type EstimatorLevels = Record<PricedKey, EstimatorLevel[]>;

const ORDER: PricedKey[] = ["commercials", "corporate", "music-videos", "weddings", "ai", "videoproduction"];
/** Запас сверху: смета редко совпадает с ориентиром до рубля. */
const SPREAD = 1.15;
const roundTo = (value: number) => Math.round(value / 10_000) * 10_000;

function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "ru-RU").format(value).replace(/\s/g, " ");
}

/** «320 000 – 380 000 ₽» / «RUB 320,000 – 380,000». */
function formatRange(low: number, high: number, locale: Locale) {
  // Тире держится за первой суммой; не влезает — вторая уходит на новую строку.
  const range = `${formatNumber(low, locale)} – ${formatNumber(high, locale)}`;
  return locale === "en" ? `RUB ${range}` : `${range} ₽`;
}

/** Число плавно доезжает до нового значения, как стрелка спидометра. */
function useTween(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const began = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const k = reduce ? 1 : Math.min(1, (now - began) / 450);
      const eased = 1 - (1 - k) ** 3;
      const next = start + (value - start) * eased;
      from.current = next;
      setShown(next);
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return Math.round(shown / 1000) * 1000;
}

/**
 * Калькулятор сметы: что снимаем → масштаб → что добавить → сроки.
 * Справа (на телефоне — полосой внизу) ориентир на синем дорожном щите,
 * как указатели на трассе главной, и строки сметы под ним. Кнопка
 * уносит расчёт в бриф: он приходит студии вместе с заявкой.
 *
 * Цифры — src/lib/pricing.ts (уровни, добавки, срочность).
 */
export default function Estimator({
  locale,
  text,
  levels,
  initialService = "commercials",
  producer,
}: {
  locale: Locale;
  text: EstimateContent;
  levels: EstimatorLevels;
  initialService?: PricedKey;
  /** Карточка продюсера под расчётом — приходит с сервера. */
  producer?: ReactNode;
}) {
  const [service, setService] = useState<PricedKey>(initialService);
  const [level, setLevel] = useState(0);
  const [extras, setExtras] = useState<Partial<Record<EstimateExtraId, number>>>({});
  const [rush, setRush] = useState(false);
  const resultRef = useRef<HTMLElement>(null);
  const [barHidden, setBarHidden] = useState(false);

  const available = estimateExtras[service];
  const base = estimateLevels[service][level];
  const chosen = available.filter((extra) => (extras[extra.id] ?? 0) > 0);
  const subtotal = base + chosen.reduce((sum, extra) => sum + (extras[extra.id] ?? 0) * extra.price, 0);
  const low = roundTo(subtotal * (rush ? 1 + rushMarkup.low : 1));
  const high = roundTo(subtotal * SPREAD * (rush ? 1 + rushMarkup.high : 1));
  const shownLow = useTween(low);
  const shownHigh = useTween(high);

  const labelOf = (id: EstimateExtraId) => text.overrides[service]?.[id] ?? text.extras[id];
  const levelName = levels[service][level]?.name ?? "";

  // Расчёт для брифа, по строке на шаг: студия видит, что человек насчитал.
  const extrasText =
    chosen
      .map((extra) => (extra.max ? `${labelOf(extra.id).label} ×${extras[extra.id] ?? 0}` : labelOf(extra.id).label))
      .join(", ") || text.none;
  const summary = [
    `${text.services[service]} — ${levelName}`,
    `${text.steps.extras}: ${extrasText}`,
    `${text.steps.timing}: ${(rush ? text.timing.rush : text.timing.normal).toLocaleLowerCase(locale)}`,
    `${text.result.label}: ${formatRange(low, high, locale)}`,
  ].join("\n");
  const briefHref = `${withLocalePath("/brief", locale)}?estimate=${encodeURIComponent(summary)}#contact-form`;

  const chooseService = (key: PricedKey) => {
    setService(key);
    setLevel(0);
    setExtras({});
  };

  const setCount = (id: EstimateExtraId, count: number) => {
    setExtras((current) => ({ ...current, [id]: count }));
  };

  // Полоса с итогом на телефоне — пока расчёт ещё ниже экрана. Когда он
  // на экране или уже пролистан, полоса уезжает и не закрывает подвал.
  useEffect(() => {
    const result = resultRef.current;
    if (!result) return;
    const observer = new IntersectionObserver(
      ([entry]) => setBarHidden(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { threshold: 0.2 },
    );
    observer.observe(result);
    return () => observer.disconnect();
  }, []);

  const rangeText = formatRange(low, high, locale);

  return (
    <div className="estimator">
      <div className="estimator__form">
        <fieldset className="est-step">
          <legend className="est-step__title">
            <span className="route-node">1</span> {text.steps.service}
          </legend>
          <div className="est-options est-options--services">
            {ORDER.map((key) => (
              <label key={key} className="est-option">
                <input
                  type="radio"
                  name="est-service"
                  className="visually-hidden"
                  checked={service === key}
                  onChange={() => chooseService(key)}
                />
                <span className="est-option__name">{text.services[key]}</span>
                <span className="est-option__meta num">{formatFrom(estimateLevels[key][0], locale)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="est-step">
          <legend className="est-step__title">
            <span className="route-node">2</span> {text.steps.level}
          </legend>
          <div className="est-options est-options--levels">
            {levels[service].map((item, index) => (
              <label key={`${service}-${item.name}`} className="est-option est-option--level">
                <input
                  type="radio"
                  name="est-level"
                  className="visually-hidden"
                  checked={level === index}
                  onChange={() => setLevel(index)}
                />
                <span className="est-option__name">{item.name}</span>
                <span className="est-option__price">
                  <span className="est-option__from">{text.from}</span>{" "}
                  <span className="num">{formatRub(estimateLevels[service][index], locale)}</span>
                </span>
                <span className="est-option__meta">{item.summary}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="est-step">
          <legend className="est-step__title">
            <span className="route-node">3</span> {text.steps.extras}
          </legend>
          <ul className="est-extras">
            {available.map((extra) => {
              const label = labelOf(extra.id);
              const count = extras[extra.id] ?? 0;
              return (
                <li key={`${service}-${extra.id}`} className="est-extra" data-on={count > 0}>
                  {extra.max ? (
                    <>
                      <span className="est-extra__text">
                        <span className="est-extra__label">{label.label}</span>
                        <span className="est-extra__hint">{label.hint}</span>
                      </span>
                      <span className="est-extra__price num">+{formatNumber(extra.price, locale)}</span>
                      <span className="est-stepper">
                        <button
                          type="button"
                          aria-label={`${label.label}: −1`}
                          disabled={count === 0}
                          onClick={() => setCount(extra.id, Math.max(0, count - 1))}
                        >
                          <Minus className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                        </button>
                        <output className="num" aria-live="polite">
                          {count}
                        </output>
                        <button
                          type="button"
                          aria-label={`${label.label}: +1`}
                          disabled={count >= extra.max}
                          onClick={() => setCount(extra.id, Math.min(extra.max ?? 1, count + 1))}
                        >
                          <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                        </button>
                      </span>
                    </>
                  ) : (
                    <label className="est-extra__toggle">
                      <input
                        type="checkbox"
                        checked={count > 0}
                        onChange={(event) => setCount(extra.id, event.target.checked ? 1 : 0)}
                      />
                      <span className="est-extra__text">
                        <span className="est-extra__label">{label.label}</span>
                        <span className="est-extra__hint">{label.hint}</span>
                      </span>
                      <span className="est-extra__price num">+{formatNumber(extra.price, locale)}</span>
                    </label>
                  )}
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset className="est-step">
          <legend className="est-step__title">
            <span className="route-node">4</span> {text.steps.timing}
          </legend>
          <div className="est-options est-options--timing">
            {[
              [false, text.timing.normal, text.timing.normalHint],
              [true, text.timing.rush, text.timing.rushHint],
            ].map(([value, name, hint]) => (
              <label key={String(value)} className="est-option">
                <input
                  type="radio"
                  name="est-timing"
                  className="visually-hidden"
                  checked={rush === value}
                  onChange={() => setRush(Boolean(value))}
                />
                <span className="est-option__name">{name}</span>
                <span className="est-option__meta">{hint}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside ref={resultRef} className="estimator__result" id="estimate-result">
        <div className="est-sign">
          <span className="est-sign__label">{text.result.label}</span>
          <span key={`${low}-${high}`} className="est-sign__value num" aria-hidden>
            {formatRange(shownLow, shownHigh, locale)}
          </span>
          <span className="visually-hidden" aria-live="polite">
            {rangeText}
          </span>
        </div>

        <ul className="est-lines">
          <li>
            <span>
              {text.services[service]}, {levelName}
            </span>
            <span className="num">{formatNumber(base, locale)}</span>
          </li>
          {chosen.map((extra) => {
            const count = extras[extra.id] ?? 0;
            return (
              <li key={extra.id}>
                <span>
                  {labelOf(extra.id).label}
                  {extra.max ? ` ×${count}` : ""}
                </span>
                <span className="num">{formatNumber(extra.price * count, locale)}</span>
              </li>
            );
          })}
          {rush ? (
            <li>
              <span>{text.result.rush}</span>
              <span className="num">+30–50%</span>
            </li>
          ) : null}
        </ul>

        <p className="est-note">{text.result.exact}</p>
        <p className="est-note">{text.result.payment}</p>

        <div className="est-actions">
          <Link href={briefHref} className="btn btn--primary">
            {text.result.send}
          </Link>
          <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="link-line">
            {text.result.telegram}
          </a>
        </div>

        {producer}
      </aside>

      <div className="est-bar" data-hidden={barHidden} aria-hidden={barHidden}>
        <span className="est-bar__value num">{formatRange(shownLow, shownHigh, locale)}</span>
        <a href="#estimate-result" className="btn btn--primary btn--sm" tabIndex={barHidden ? -1 : undefined}>
          {text.result.toResult}
        </a>
      </div>
    </div>
  );
}

import type { AboutContent } from "@/content/studio";

/**
 * Два города на концах одной трассы — отсюда и название студии. Схема
 * маршрута «Петербург — М-11 — Москва» и факты о выездах; стоит на
 * страницах «О студии» и «Контакты».
 */
export default function RouteMap({ geography }: { geography: AboutContent["geography"] }) {
  return (
    <>
      <p className="route">
        <span className="route__city">{geography.from}</span>
        <span className="route__road">
          <span className="route__label">{geography.road}</span>
        </span>
        <span className="route__city">{geography.to}</span>
      </p>
      <dl className="route__facts">
        {geography.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

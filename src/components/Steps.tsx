export type StepEntry = { title: string; text: string; time?: string };

/**
 * Этапы работы. Номера здесь уместны: это последовательность, и порядок
 * в ней не переставить.
 */
export default function Steps({ items }: { items: StepEntry[] }) {
  return (
    <ol className="steps">
      {items.map((item, index) => (
        <li key={item.title} className="step">
          <span className="step__num">{index + 1}</span>
          <h3 className="step__title">{item.title}</h3>
          <p className="step__text">{item.text}</p>
          {item.time ? <p className="step__time num">{item.time}</p> : null}
        </li>
      ))}
    </ol>
  );
}

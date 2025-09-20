
// app/easter-egg/cinema/page.tsx
import type { Metadata } from "next";
import Game from "./Game"; // ← относительный путь

export const metadata: Metadata = {
  title: "Кино-смена — мини-игра",
  description:
    "Собери шоты, береги батарею и избегай шумных зон и патрулей.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Кино-смена — мини-игра</h1>
      <p className="lead measure mt-2">
        Собери все&nbsp;шоты, экономь батарею и не попадай в «красные» зоны и конусы патрулей.
      </p>
      <section className="mt-8">
        <Game />
      </section>
    </main>
  );
}

// app/easter-egg/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Тех. заметки — Highway Films",
  description: "Пасхалка с мини-игрой: баланс картинка/сроки/бюджет.",
  robots: { index: false, follow: true },
};

// ВАЖНО: указываем расширение, чтобы TS не психовал в app/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error — tsserver иногда не резолвит локальные .tsx в app/
const Game = dynamic(() => import("./Game.tsx"), { ssr: false });

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Тех. заметки</h1>
      <p className="lead measure mt-2">
        Мини-симулятор продакшна. Выбирай стратегию и смотри, как меняются картинка, сроки и бюджет.
      </p>

      <section className="mt-8">
        <Game />
      </section>
    </main>
  );
}

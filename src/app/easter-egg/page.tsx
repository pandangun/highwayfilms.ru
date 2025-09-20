import type { Metadata } from "next";
import ClientGame from "./ClientGame";

export const metadata: Metadata = {
  title: "Тех. заметки — Highway Films",
  description: "Пасхалка с мини-игрой: баланс картинка/сроки/бюджет.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Тех. заметки</h1>
      <p className="lead measure mt-2">
        Мини-симулятор продакшна. Выбирай стратегию и смотри, как меняются картинка, сроки и бюджет.
      </p>

      <section className="mt-8">
        <ClientGame />
      </section>
    </main>
  );
}

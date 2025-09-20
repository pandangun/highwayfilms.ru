// app/easter-egg/runner-pro/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Мини-игра — Runner Pro",
  description: "2D-раннер: камера, зум, монеты, враги и чекпоинты.",
  robots: { index: false, follow: true },
};

const GamePro = dynamic(() => import("./GamePro"), { ssr: false });

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Runner Pro</h1>
      <p className="lead measure mt-2">WASD/стрелки — движение, Z — удар, X — рывок, колесо — zoom, P — пауза.</p>
      <section className="mt-8">
        <GamePro />
      </section>
    </main>
  );
}

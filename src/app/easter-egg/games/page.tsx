// app/easter-egg/games/page.tsx
import type { Metadata } from "next";
import GamesCarousel from "@/components/GamesCarousel";

export const metadata: Metadata = {
  title: "Мини-игры — Highway Films",
  description:
    "Runner Pro, КиноСет и Викторина — пасхалки Highway Films. Листай карусель и выбирай.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Мини-игры</h1>
      <p className="lead measure mt-2">
        Листай 3D-карусель: карточки вращаются по кругу. Кликни, чтобы перейти в игру.
      </p>

      <div className="mt-8">
        <GamesCarousel
          items={[
            {
              title: "Runner Pro",
              desc:
                "Платформер с плавной камерой: монеты, враги, чекпоинты, zoom и мобильный джойстик.",
              href: "/easter-egg/runner-pro",
              badge: "Action",
            },
            {
              title: "КиноСет",
              desc:
                "2D-аркада про площадку: собирай шоты, следи за батареей и избегай шумных зон.",
              href: "/easter-egg/cinema",
              badge: "New",
            },
            {
              title: "Викторина",
              desc:
                "10 вопросов по видеопродакшну: свет, звук, препрод и сет-термины.",
              href: "/easter-egg/quiz",
              badge: "Quiz",
            },
          ]}
          autoPlay
          interval={4500}
        />
      </div>
    </main>
  );
}

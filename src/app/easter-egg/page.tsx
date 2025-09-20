// app/easter-egg/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Game from "./Game";

export const metadata: Metadata = {
  title: "Снимай! — мини-игра Highway Films",
  description:
    "Мини-симулятор видеопродакшна: выберите нишу продукта, соберите команду, балансируйте картинку, сроки и бюджет.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Снимай! — мини-симулятор продакшна</h1>
      <p className="lead measure mt-2">
        Поиграем в продюсера. Выберите нишу, сложность и решения на этапах —
        получите вердикт и подсказки.
      </p>

      <div className="mt-6">
        <Game />
      </div>

      <div className="mt-10 text-sm text-muted">
        <p>
          P.S. Настоящие проекты мы собираем глубже: раскадровки, биды, расчёт смен и версии под площадки.
        </p>
        <p className="mt-2">
          Вернуться к сайту:{" "}
          <Link href="/contacts" className="hover:underline">
            оставить заявку
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

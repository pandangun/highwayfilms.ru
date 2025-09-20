// app/easter-egg/quiz/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Викторина по продакшну — скоро | Highway Films",
  robots: { index: false, follow: true },
};

export default function QuizStub() {
  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Викторина по продакшну</h1>
      <p className="lead measure mt-2">
        Здесь будет небольшой квиз по свету, звуку, препродакшну и сет-терминам.
        Готовим вопросы — скоро запустим.
      </p>
      <div className="card p-6 mt-8">
        <div className="text-muted">
          Если есть идеи по вопросам — черканите нам в{" "}
          <a
            href="https://t.me/highwayfilms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Telegram
          </a>
          .
        </div>
      </div>
    </main>
  );
}

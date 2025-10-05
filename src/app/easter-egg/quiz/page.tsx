"use client";
import { useMemo, useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Киновикторина — Highway Films",
  description: "10 вопросов о кино с четырьмя вариантами ответов. Проверьте себя и узнайте любопытные факты.",
  robots: { index: false, follow: true },
};

type Question = {
  prompt: string;
  options: string[];
  correct: number;
  fact: string;
};

const questions: Question[] = [
  {
    prompt: "Какой фильм получил первый «Оскар» за лучший фильм в 1929 году?",
    options: ["Крылья", "Касабланка", "Унесенные ветром", "Гражданин Кейн"],
    correct: 0,
    fact: "На первой церемонии Американской киноакадемии победила военная драма «Крылья» Уильяма Уэллмана.",
  },
  {
    prompt: "Кто поставил фильм «Семь самураев»?",
    options: ["Акира Куросава", "Такэси Китано", "Хаяо Миядзаки", "Кэндзо Мицуготи"],
    correct: 0,
    fact: "Эпическая лента Акиры Куросавы 1954 года стала основой для множества ремейков, включая «Великолепную семерку».",
  },
  {
    prompt: "Какой композитор написал основную тему к «Звездные войны»?",
    options: ["Джон Уильямс", "Ханс Циммер", "Алан Сильвестри", "Дэнни Элфман"],
    correct: 0,
    fact: "Джон Уильямс сочинил музыку, мгновенно ставшую культовой. Он получил за нее «Оскар» в 1977 году.",
  },
  {
    prompt: "Как зовут героя, которого играет Аль Пачино в «Крестный отец»?",
    options: ["Майкл Корлеоне", "Сонни Корлеоне", "Фредо Корлеоне", "Том Хэйген"],
    correct: 0,
    fact: "Майкл Корлеоне проходит путь от дистанцированного сына к главе криминальной семьи в трилогии Копполы.",
  },
  {
    prompt: "Какой фильм Стэнли Кубрика снят полностью по роману Стивена Кинга?",
    options: ["Сияние", "С широко закрытыми глазами", "Заводной апельсин", "Цельнометаллическая оболочка"],
    correct: 0,
    fact: "«Сияние» (1980) основано на романе Кинга, хотя режиссер заметно изменил сюжет.",
  },
  {
    prompt: "Кто стал первой женщиной-режиссером, получившей «Оскар» за лучшую режиссуру?",
    options: ["Кэтрин Бигелоу", "Грета Гервиг", "София Коппола", "Джейн Кэмпион"],
    correct: 0,
    fact: "Кэтрин Бигелоу победила в 2010 году с фильмом «Повелитель бури».",
  },
  {
    prompt: "Какой киноклассик заканчивается фразой «Это начало прекрасной дружбы»?",
    options: ["Касабланка", "В джазе только девушки", "Укрощение строптивой", "Хороший, плохой, злой"],
    correct: 0,
    fact: "Иконічная реплика завершает романтическую драму «Касабланка» 1942 года.",
  },
  {
    prompt: "Как называется студия, основавшая кинематографическую вселенную Marvel?",
    options: ["Marvel Studios", "Paramount Pictures", "20th Century Fox", "Universal Pictures"],
    correct: 0,
    fact: "Marvel Studios запустила MCU с «Железного человека» в 2008 году.",
  },
  {
    prompt: "Кто сыграл Джокера в фильме «Темный рыцарь» (2008)?",
    options: ["Хит Леджер", "Джаред Лето", "Хоакин Феникс", "Джек Николсон"],
    correct: 0,
    fact: "Хит Леджер получил посмертный «Оскар» за роль Джокера в фильме Крістофера Нолана.",
  },
  {
    prompt: "Какой фильм стал первым полнометражным анимационным проектом Disney?",
    options: ["Белоснежка и семь гномов", "Пиноккио", "Бэмби", "Диснеевские истории"],
    correct: 0,
    fact: "В 1937 году «Белоснежка и семь гномов» стала первой полнометражной цветной анимацией.",
  },
];

const initialAnswers = Array(questions.length).fill(null) as Array<number | null>;

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [showResults, setShowResults] = useState(false);

  const score = useMemo(
    () => answers.reduce((acc, answer, index) => (answer === questions[index].correct ? acc + 1 : acc), 0),
    [answers]
  );

  const currentQuestion = questions[current];
  const selected = answers[current];
  const isAnswered = selected !== null;

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered || showResults) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (!isAnswered) return;
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setAnswers(initialAnswers);
    setCurrent(0);
    setShowResults(false);
  };

  return (
    <main className="container py-12 md:py-16 space-y-8">
      <header className="space-y-3">
        <h1 className="h1">Киновикторина</h1>
        <p className="lead measure">
          10 вопросов, каждый с четырьмя вариантами ответа. Выберите вариант и нажмите «Дальше».
          В конце покажем результат и интересный факт по каждому вопросу.
        </p>
        <div className="text-sm text-muted">
          Правильных ответов: {score} из {questions.length}
        </div>
      </header>

      {!showResults ? (
        <section className="card p-6 md:p-8 space-y-6">
          <div className="text-sm uppercase tracking-wide text-muted">
            Вопрос {current + 1} из {questions.length}
          </div>
          <h2 className="text-2xl font-semibold leading-tight">{currentQuestion.prompt}</h2>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correct;
              const isChosen = selected === index;
              const status = isAnswered
                ? isCorrect
                  ? "border-emerald-400 bg-emerald-400/10"
                  : isChosen
                  ? "border-rose-400 bg-rose-400/10"
                  : "opacity-70"
                : "hover:border-white/40";

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(index)}
                  className={`text-left rounded-xl border border-white/12 px-4 py-3 transition ${status}`}
                  disabled={isAnswered}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span>{" "}
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-neutral-200">
              {currentQuestion.fact}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              disabled={!isAnswered}
            >
              {current + 1 === questions.length ? "Завершить" : "Дальше"}
            </button>
            <button type="button" onClick={handleRestart} className="btn">
              Начать заново
            </button>
          </div>
        </section>
      ) : (
        <section className="card p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Итого: {score} из {questions.length}</h2>
          <p className="text-muted">
            Ниже — ваши ответы и правильные варианты. Можно перепройти, чтобы улучшить результат.
          </p>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const answer = answers[index];
              const isCorrect = answer === question.correct;
              return (
                <div key={question.prompt} className="rounded-xl border border-white/10 p-4 bg-white/5">
                  <div className="text-sm text-muted">Вопрос {index + 1}</div>
                  <div className="font-medium mt-1">{question.prompt}</div>
                  <div className="mt-2 text-sm">
                    Вы ответили: {answer !== null ? question.options[answer] : "—"}
                  </div>
                  <div className="text-sm text-emerald-300 mt-1">
                    Правильно: {question.options[question.correct]}
                  </div>
                  <div className="text-xs text-neutral-300 mt-2">{question.fact}</div>
                  <div className={`mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs ${isCorrect ? "bg-emerald-500/20 text-emerald-200" : "bg-rose-500/20 text-rose-200"}`}>
                    {isCorrect ? "Зачет!" : "Не угадали"}
                  </div>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={handleRestart} className="btn btn-primary">
            Пройти еще раз
          </button>
        </section>
      )}
    </main>
  );
}

// app/shoot-game/page.tsx
"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";

export const metadata: Metadata = {
  title: "Снимай! — мини-игра Highway Films",
  description:
    "Мини-симулятор видеопродакшна: соберите команду, снимите ролик, уложитесь в сроки и бюджет.",
  robots: { index: false, follow: true },
} as any; // Next ругается на metadata в client — игнорируем типом.

type Choice = { id: string; title: string; desc: string; score: { img: number; time: number; money: number } };

const STAGES: { key: string; title: string; choices: Choice[] }[] = [
  {
    key: "pre",
    title: "Препрод",
    choices: [
      { id: "story", title: "Treatment + раскадровка", desc: "Чёткая драматургия.", score: { img: +2, time: +1, money: -1 } },
      { id: "cast",  title: "Кастинг быстро",          desc: "Экономим время, рискуем качеством.", score: { img: 0, time: +2, money: +1 } },
      { id: "loc",   title: "Локация-хэлпер",          desc: "Одна универсальная локация.", score: { img: +1, time: +1, money: +2 } },
    ],
  },
  {
    key: "shoot",
    title: "Съёмка",
    choices: [
      { id: "light",  title: "Сильный свет",       desc: "Глубина и фактуры.", score: { img: +3, time: -1, money: -2 } },
      { id: "handy",  title: "Хэндхелд/UGC",       desc: "Нативная подача.",   score: { img: +1, time: +1, money: +2 } },
      { id: "drone",  title: "Дрон/стаб",          desc: "Кинодвижение.",      score: { img: +2, time: 0,  money: -1 } },
    ],
  },
  {
    key: "post",
    title: "Постпродакшн",
    choices: [
      { id: "color", title: "Плотный цветокор",    desc: "Премиальная картинка.", score: { img: +2, time: -1, money: -1 } },
      { id: "motion",title: "Motion-акценты",      desc: "Продающие подсветки.",   score: { img: +2, time: -1, money: -1 } },
      { id: "subs",  title: "Саб/версии 6/15/30",  desc: "Готово под площадки.",   score: { img: +1, time: 0,  money: -1 } },
    ],
  },
];

function cls(...a: (string | false | null | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

export default function ShootGame() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Record<string, string | null>>({
    pre: null, shoot: null, post: null,
  });

  const current = STAGES[step];

  const totals = useMemo(() => {
    const base = { img: 0, time: 0, money: 0 };
    for (const s of STAGES) {
      const id = picked[s.key];
      const ch = s.choices.find(c => c.id === id);
      if (ch) {
        base.img += ch.score.img;
        base.time += ch.score.time;
        base.money += ch.score.money;
      }
    }
    return base;
  }, [picked]);

  const verdict = useMemo(() => {
    const img = totals.img;
    const time = totals.time;   // чем больше, тем быстрее
    const money = totals.money; // чем больше, тем экономнее
    let title = "Норм — можно выкатывать";
    let tip = "Доработай пару акцентов в цвете или motion — будет конфетка.";
    if (img >= 6 && time >= 1 && money >= 0) {
      title = "Конфетка! Продающая картинка";
      tip = "Собери версии 6/15/30 и добьём перформанс.";
    }
    if (img <= 2 || money < -3) {
      title = "Есть риск мыла/перерасхода";
      tip = "Добавь свет или упростим сцену; субтитры и версии под площадки обязательны.";
    }
    if (time < -2) {
      title = "Сроки горят";
      tip = "Срежь сложные сцены, переведи часть motion в графику, собери UGC-версии.";
    }
    return { title, tip };
  }, [totals]);

  function choose(stageKey: string, id: string) {
    setPicked(prev => ({ ...prev, [stageKey]: prev[stageKey] === id ? null : id }));
  }

  const finished = step >= STAGES.length;

  return (
    <main className="container py-12 md:py-16">
      <h1 className="h1">Снимай! — мини-симулятор продакшна</h1>
      <p className="lead measure mt-2">
        Выбирай стратегию на каждом этапе. Балансируй <strong>картинку</strong>, <strong>сроки</strong> и <strong>бюджет</strong>.
      </p>

      {/* индикатор прогресса */}
      <div className="mt-6 grid grid-cols-3 gap-2 max-w-xl">
        {STAGES.map((s, i) => (
          <div
            key={s.key}
            className={cls(
              "h-2 rounded bg-white/10",
              i < step ? "bg-white/30" : ""
            )}
          />
        ))}
      </div>

      {!finished ? (
        <>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">{current.title}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {current.choices.map(ch => {
                const active = picked[current.key] === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => choose(current.key, ch.id)}
                    className={cls(
                      "card p-5 text-left transition rounded-xl",
                      active ? "border-strong ring-1 ring-white/15" : "hover:border-strong"
                    )}
                  >
                    <div className="font-medium">{ch.title}</div>
                    <p className="text-muted mt-1">{ch.desc}</p>
                    <div className="mt-3 text-sm text-muted">
                      Картинка: {fmt(ch.score.img)} · Сроки: {fmt(ch.score.time)} · Бюджет: {fmt(ch.score.money)}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                disabled={!picked[current.key]}
                onClick={() => setStep(s => s + 1)}
                className="btn btn-primary rounded-xl disabled:opacity-50"
              >
                Далее
              </button>
              {step > 0 && (
                <button
                  onClick={() => setStep(s => Math.max(0, s - 1))}
                  className="btn rounded-xl"
                >
                  Назад
                </button>
              )}
            </div>
          </section>

          {/* текущие суммарные очки */}
          <section className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
            <Stat label="Картинка" value={totals.img} />
            <Stat label="Сроки" value={totals.time} />
            <Stat label="Бюджет" value={totals.money} />
          </section>
        </>
      ) : (
        <>
          <section className="mt-10 card p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold">{verdict.title}</h2>
            <p className="text-muted mt-2">{verdict.tip}</p>

            <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
              <Stat label="Картинка" value={totals.img} big />
              <Stat label="Сроки" value={totals.time} big />
              <Stat label="Бюджет" value={totals.money} big />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contacts" className="btn btn-primary rounded-xl">Запросить КП</Link>
              <Link href="/easter-egg" className="btn rounded-xl">Сыграть ещё</Link>
            </div>
          </section>

          <p className="text-muted mt-6 text-sm">
            P.S. настоящие проекты мы собираем глубже: раскадровки, биды, расчёт смен и версии под площадки.
          </p>
        </>
      )}
    </main>
  );
}

function Stat({ label, value, big = false }: { label: string; value: number; big?: boolean }) {
  return (
    <div className="card p-4 text-center">
      <div className={cls(big ? "text-3xl font-semibold" : "text-xl font-semibold")}>
        {value > 0 ? `+${value}` : value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function fmt(n: number) {
  if (n > 0) return `+${n}`;
  return `${n}`;
}

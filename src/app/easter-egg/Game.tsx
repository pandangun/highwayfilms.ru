// app/easter-egg/Game.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* =========================
   Типы и утилиты
   ========================= */
type Score = { img: number; time: number; money: number };
type Choice = { id: string; title: string; desc: string; score: Score };
type Stage = { key: "pre" | "shoot" | "post"; title: string; choices: Choice[] };
type NicheKey = "food" | "beauty" | "gadgets";
type Difficulty = "easy" | "normal" | "hard";

function cls(...a: (string | false | null | undefined)[]) {
  return a.filter(Boolean).join(" ");
}
const fmt = (n: number) => (n > 0 ? `+${n}` : `${n}`);

const KEY = "hf_game_v2";

/* =========================
   Параметры ниш / сложности
   ========================= */
const NICHE_MOD: Record<NicheKey, Partial<Score>> = {
  food: { img: +1, money: -1 },     // фуд любит свет/реквизит
  beauty: { img: +1, time: -1 },    // бьюти дольше (свотчи/свет), картинка ↑
  gadgets: { img: 0, time: 0, money: 0 }, // базовый
};

const DIFF_MOD: Record<Difficulty, Partial<Score>> = {
  easy: { time: +1, money: +1 },    // легче уложиться
  normal: { },
  hard: { time: -1, money: -1 },    // жестче сроки/бюджет
};

/* =========================
   Стадии и выборы
   ========================= */
const STAGES_BASE: Stage[] = [
  {
    key: "pre",
    title: "Препрод",
    choices: [
      { id: "story", title: "Treatment + раскадровка", desc: "Чёткая драматургия.", score: { img: +2, time: +1, money: -1 } },
      { id: "cast",  title: "Кастинг быстро",          desc: "Экономим время, рискуем качеством.", score: { img: 0, time: +2, money: +1 } },
      { id: "loc",   title: "Одна универсальная локация", desc: "Просто и бюджетно.", score: { img: +1, time: +1, money: +2 } },
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
      { id: "color",  title: "Плотный цветокор",  desc: "Премиальная картинка.", score: { img: +2, time: -1, money: -1 } },
      { id: "motion", title: "Motion-акценты",    desc: "Подсветка selling-points.", score: { img: +2, time: -1, money: -1 } },
      { id: "subs",   title: "Версии 6/15/30 + саб", desc: "Готово под площадки.", score: { img: +1, time: 0, money: -1 } },
    ],
  },
];

/* =========================
   Рандом-события
   ========================= */
type EventCard = { id: string; when: Stage["key"]; text: string; impact: Score };

const EVENTS: EventCard[] = [
  { id: "battery", when: "shoot", text: "Сел аккум у дрона — перестановка сетапа", impact: { img: 0, time: -1, money: -1 } },
  { id: "actor",   when: "shoot", text: "Актёр опоздал, но сыграл отлично",       impact: { img: +1, time: -1, money: 0 } },
  { id: "client",  when: "pre",   text: "Клиент прислал референсы вовремя",       impact: { img: +1, time: +1, money: 0 } },
  { id: "render",  when: "post",  text: "Рендеры тяжелые — оптимизируем графику", impact: { img: 0, time: -1, money: +1 } },
];

/* =========================
   Компонент игры
   ========================= */
export default function Game() {
  const [niche, setNiche] = useState<NicheKey>("gadgets");
  const [diff, setDiff] = useState<Difficulty>("normal");
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Record<Stage["key"], string | null>>({ pre: null, shoot: null, post: null });
  const [log, setLog] = useState<string[]>([]);

  // загрузка из localStorage (если есть)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setNiche(s.niche ?? "gadgets");
        setDiff(s.diff ?? "normal");
        setStep(s.step ?? 0);
        setPicked(s.picked ?? { pre: null, shoot: null, post: null });
        setLog(s.log ?? []);
      }
    } catch {}
  }, []);

  // сохранение
  useEffect(() => {
    const state = { niche, diff, step, picked, log };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [niche, diff, step, picked, log]);

  const stages = STAGES_BASE;

  const totals = useMemo(() => {
    const base: Score = { img: 0, time: 0, money: 0 };
    // модификаторы ниши/сложности
    const nm = NICHE_MOD[niche] || {};
    const dm = DIFF_MOD[diff] || {};
    // выборы
    for (const s of stages) {
      const id = picked[s.key];
      const ch = s.choices.find(c => c.id === id);
      if (ch) {
        base.img += ch.score.img;
        base.time += ch.score.time;
        base.money += ch.score.money;
      }
    }
    // суммируем модификаторы
    base.img += (nm.img ?? 0) + (dm.img ?? 0);
    base.time += (nm.time ?? 0) + (dm.time ?? 0);
    base.money += (nm.money ?? 0) + (dm.money ?? 0);
    return base;
  }, [picked, niche, diff, stages]);

  const current = stages[step];
  const finished = step >= stages.length;

  // триггерим случайное событие после выбора на каждом шаге (10–40% шанс)
  function maybeEvent(stageKey: Stage["key"]) {
    const roll = Math.random();
    const need = roll < 0.25; // 25%
    if (!need) return;
    const pool = EVENTS.filter(e => e.when === stageKey);
    if (!pool.length) return;
    const ev = pool[Math.floor(Math.random() * pool.length)];
    // применяем эффект
    setLog(prev => [...prev, `Событие: ${ev.text} ${impactStr(ev.impact)}`]);
    // «влияем» на суммарные очки через «виртуальный» выбор — просто пишем в лог; подсчёт учтём отдельно
    // быстрый способ: временно записать эффект в скрытое поле состояния
    setPicked(p => ({ ...p, [`__${ev.id}` as any]: "1" } as any));
    // но чтобы реально учесть очки, проще хранить отдельный накопитель
    setEventImpact(e => ({
      img: e.img + ev.impact.img,
      time: e.time + ev.impact.time,
      money: e.money + ev.impact.money,
    }));
  }

  // накопитель эффектов событий
  const [eventImpact, setEventImpact] = useState<Score>({ img: 0, time: 0, money: 0 });

  const grand = {
    img: totals.img + eventImpact.img,
    time: totals.time + eventImpact.time,
    money: totals.money + eventImpact.money,
  };

  function choose(stageKey: Stage["key"], id: string) {
    setPicked(prev => ({ ...prev, [stageKey]: prev[stageKey] === id ? null : id }));
  }

  function next() {
    if (!current) return;
    if (!picked[current.key]) return;
    maybeEvent(current.key);
    setStep(s => s + 1);
  }

  function resetAll() {
    setStep(0);
    setPicked({ pre: null, shoot: null, post: null });
    setLog([]);
    setEventImpact({ img: 0, time: 0, money: 0 });
  }

  /* ===== Вердикт ===== */
  const verdict = useMemo(() => {
    const { img, time, money } = grand;
    let title = "Норм — можно выкатывать";
    let tip = "Добавь пару motion-акцентов или подчисти цвет — станет премиальнее.";
    if (img >= 7 && time >= 1 && money >= 0) {
      title = "Конфетка! Продающая картинка";
      tip = "Собери версии 6/15/30 и пакет вертикалок — перформанс полетит.";
    }
    if (img <= 2 || money < -3) {
      title = "Риск слабой картинки/перерасхода";
      tip = "Упростим сцену или усилим свет. Версии под площадки и сабы — маст хэв.";
    }
    if (time < -2) {
      title = "Сроки горят";
      tip = "Режем сложные сцены, переносим часть motion в графику, добавим UGC-серии.";
    }
    // нюанс для ниш
    const nicheNote: Record<NicheKey, string> = {
      food: "Для фуда — крупные планы, пар/соус, слоу-мо + чистая звуковая фактура.",
      beauty: "Для бьюти — ровная кожа, бликовая схема, свотчи/текстуры в макро.",
      gadgets: "Для гаджетов — разъёмы/фичи крупно, 3D-разрезы и понятный call-to-action.",
    };
    return { title, tip, note: nicheNote[niche] };
  }, [grand, niche]);

  /* ===== Рендер ===== */
  return (
    <div className="grid gap-8">
      {/* Панель настроек */}
      <section className="card p-5 md:p-6">
        <h2 className="text-lg font-semibold">Параметры</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {/* Ниша */}
          <div>
            <div className="text-sm text-muted">Ниша продукта</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["food", "beauty", "gadgets"] as NicheKey[]).map(k => (
                <button
                  key={k}
                  className={cls(
                    "btn h-10 rounded-xl",
                    niche === k && "btn-primary"
                  )}
                  onClick={() => setNiche(k)}
                  type="button"
                >
                  {k === "food" ? "Фуд" : k === "beauty" ? "Бьюти" : "Гаджеты"}
                </button>
              ))}
            </div>
          </div>
          {/* Сложность */}
          <div>
            <div className="text-sm text-muted">Сложность</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["easy", "normal", "hard"] as Difficulty[]).map(d => (
                <button
                  key={d}
                  className={cls(
                    "btn h-10 rounded-xl",
                    diff === d && "btn-primary"
                  )}
                  onClick={() => setDiff(d)}
                  type="button"
                >
                  {d === "easy" ? "Лёгкая" : d === "normal" ? "Обычная" : "Жёсткая"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted mt-3">
          Ниша и сложность влияют на картинку/сроки/бюджет. Можно менять до старта (сбросит прогресс).
        </p>
      </section>

      {/* Прогресс */}
      <div className="grid grid-cols-3 gap-2 max-w-xl">
        {STAGES_BASE.map((s, i) => (
          <div key={s.key} className={cls("h-2 rounded bg-white/10", i < step && "bg-white/30")} />
        ))}
      </div>

      {!finished ? (
        <section>
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

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              disabled={!picked[current.key]}
              onClick={next}
              className="btn btn-primary rounded-xl disabled:opacity-50"
              type="button"
            >
              Далее
            </button>
            {step > 0 && (
              <button onClick={() => setStep(s => Math.max(0, s - 1))} className="btn rounded-xl" type="button">
                Назад
              </button>
            )}
            <button onClick={resetAll} className="btn rounded-xl" type="button">
              Сбросить
            </button>
          </div>

          {/* Текущие суммарные очки */}
          <section className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
            <Stat label="Картинка" value={grand.img} />
            <Stat label="Сроки" value={grand.time} />
            <Stat label="Бюджет" value={grand.money} />
          </section>

          {/* Лог событий */}
          {log.length > 0 && (
            <div className="card p-4 mt-6 text-sm">
              <div className="font-semibold">События</div>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted">
                {log.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
          )}
        </section>
      ) : (
        <section className="card p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{verdict.title}</h2>
          <p className="text-muted mt-2">{verdict.tip}</p>
          <p className="text-muted mt-2">{verdict.note}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <Stat label="Картинка" value={grand.img} big />
            <Stat label="Сроки" value={grand.time} big />
            <Stat label="Бюджет" value={grand.money} big />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contacts" className="btn btn-primary rounded-xl">Запросить КП</Link>
            <button onClick={resetAll} className="btn rounded-xl" type="button">Сыграть ещё</button>
          </div>
        </section>
      )}
    </div>
  );
}

/* ===== Вспомогательные ===== */
function impactStr(s: Score) {
  const parts = [
    `Картинка ${fmt(s.img)}`,
    `Сроки ${fmt(s.time)}`,
    `Бюджет ${fmt(s.money)}`
  ];
  return `(${parts.join(" · ")})`;
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

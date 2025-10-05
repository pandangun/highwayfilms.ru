import type { Metadata } from "next";
import GamesCarousel from "@/components/GamesCarousel";

export const metadata: Metadata = {
  title: "Мини-игры — Highway Films",
  description:
    "Runner Pro, КиноСет и киновикторина — пасхалки Highway Films. Листайте 3D-карусель и запускайте игру прямо на сайте.",
  robots: { index: false, follow: true },
};

const GAMES = [
  {
    title: "Runner Pro",
    desc: "Бесконечный раннер с плавной камерой, зумом, чекпоинтами и мобильным джойстиком.",
    href: "/easter-egg/runner-pro",
    badge: "Action",
  },
  {
    title: "КиноСет",
    desc: "Стелс-аркада про площадку: собирайте шоты, следите за батареей и избегайте шумных зон.",
    href: "/easter-egg/cinema",
    badge: "New",
  },
  {
    title: "Киновикторина",
    desc: "10 вопросов о кино — от классики до продакшен-нюансов. Проверка знаний за пару минут.",
    href: "/easter-egg/quiz",
    badge: "Quiz",
  },
];

export default function GamesPage() {
  return (
    <main className="container py-12 md:py-16 space-y-8">
      <header className="space-y-3">
        <h1 className="h1">Мини-игры Highway Films</h1>
        <p className="lead measure">
          Три пасхалки — раннер, аркада и викторина. Листайте карусель, выбирайте игру и запускайте прямо в браузере.
        </p>
      </header>

      <GamesCarousel items={GAMES} title="Пасхальные игры" />

      <p className="text-sm text-muted">
        Все мини-игры работают на Canvas с адаптивным управлением для клавиатуры, геймпада и сенсорных экранов.
      </p>
    </main>
  );
}

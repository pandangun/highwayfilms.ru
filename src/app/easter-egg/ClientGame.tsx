"use client";

import dynamic from "next/dynamic";

// поднимаем dynamic в клиентский компонент
const Game = dynamic(() => import("./Game"), { ssr: false });

export default function ClientGame() {
  return <Game />;
}

"use client";

import dynamic from "next/dynamic";

const GamePro = dynamic(() => import("./GamePro"), { ssr: false });

export default function ClientGamePro() {
  return <GamePro />;
}

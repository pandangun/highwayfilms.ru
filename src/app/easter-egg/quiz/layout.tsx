import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Киновикторина — Highway Films",
  description:
    "10 вопросов о кино с четырьмя вариантами ответа. Проверьте себя и узнайте любопытные факты.",
  robots: { index: false, follow: true },
};

export default function QuizLayout({ children }: { children: ReactNode }) {
  return children;
}

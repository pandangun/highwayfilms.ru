import type { Metadata } from "next";
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import ServiceCards from "@/components/ServiceCards";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Highway Films — видеопродакшн полного цикла",
  description:
    "Реклама, корпоративное видео и музыкальные клипы. Полный цикл: идея, съёмка, постпродакшн. Bold visuals. Clear storytelling.",
};

export default function HomePage() {
  return (
    <>
      {/* 1) HERO: полноэкранный шоурил с автоплеем и mute/unmute */}
      <VideoHero />

      {/* 2) Направления (услуги) */}
      <section className="container py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-semibold">Направления</h2>
        <p className="lead measure mt-2">
          Видеопродакшн под бизнес-задачи. Кинематографичный визуал и полный цикл: идея → продакшн → пост.
        </p>
        <div className="mt-6">
          <ServiceCards />
        </div>
      </section>

      {/* 3) Короткий блок о компании */}
      <section className="container pb-12 md:pb-16">
        <div className="card p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Highway Films — видеопродакшн полного цикла
          </h3>
          <p className="mt-3 text-muted measure">
            Создаём рекламные ролики, корпоративные фильмы и музыкальные клипы. Совмещаем креатив и
            технологичное производство: съёмка до 4K/10-bit, цветокор, VFX, мастер-версии под любые площадки.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/videoproduction" className="btn">Видеопродакшн</Link>
            <Link href="/commercials" className="btn">Реклама</Link>
            <Link href="/corporate" className="btn">Корпоративное</Link>
            <Link href="/music-videos" className="btn">Клипы</Link>
          </div>
        </div>
      </section>

      {/* 4) Призыв к действию */}
      <CTA />
    </>
  );
}

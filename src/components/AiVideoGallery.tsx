"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import VideoLightbox from "@/components/VideoLightbox";

export type AiVideoItem = {
  tag: string;
  title: string;
  video: string;
  poster: string;
};

type AiVideoGalleryProps = {
  items: AiVideoItem[];
  locale?: "ru" | "en";
};

export default function AiVideoGallery({
  items,
  locale = "ru",
}: AiVideoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];
  const openLabel = locale === "en" ? "Open case video" : "Открыть видео-кейс";

  return (
    <>
      <div className="ai-gallery-grid">
        {items.map((item, index) => (
          <button
            key={item.video}
            type="button"
            className={`ai-gallery-tile reveal-up ${index === 0 ? "delay-1" : index === 1 ? "delay-2" : index === 2 ? "delay-3" : "delay-4"}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${item.title}. ${openLabel}`}
          >
            <div className="ai-gallery-tile__media">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="ai-gallery-tile__overlay" />
              <div className="ai-gallery-tile__glow" />

              <div className="ai-gallery-tile__content">
                <span className="ai-gallery-tile__tag">{item.tag}</span>

                <div className="ai-gallery-tile__footer">
                  <h3 className="ai-gallery-tile__title">{item.title}</h3>
                  <span className="ai-gallery-tile__play" aria-hidden>
                    <Play className="h-4.5 w-4.5 translate-x-[1px]" />
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeItem ? (
        <VideoLightbox
          video={{
            tag: activeItem.tag,
            title: activeItem.title,
            src: activeItem.video,
            poster: activeItem.poster,
          }}
          locale={locale}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </>
  );
}

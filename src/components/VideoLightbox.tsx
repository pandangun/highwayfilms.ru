"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

type VideoLightboxItem = {
  tag: string;
  title: string;
  src: string;
  poster?: string;
};

type VideoLightboxProps = {
  video: VideoLightboxItem;
  locale?: "ru" | "en";
  onClose: () => void;
};

export default function VideoLightbox({
  video,
  locale = "ru",
  onClose,
}: VideoLightboxProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const closeLabel = locale === "en" ? "Close video" : "Закрыть видео";

  return (
    <div className="ai-video-lightbox" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="ai-video-lightbox__backdrop"
        aria-label={closeLabel}
        onClick={onClose}
      />

      <div ref={panelRef} className="ai-video-lightbox__panel" tabIndex={-1}>
        <div className="ai-video-lightbox__toolbar">
          <button
            type="button"
            className="ai-video-lightbox__control"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X className="h-4.5 w-4.5" aria-hidden />
          </button>
        </div>

        <div className="ai-video-lightbox__media">
          <video
            className="ai-video-lightbox__video"
            playsInline
            preload="none"
            controls
            poster={video.poster}
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
          >
            <source src={video.src} type="video/mp4" />
          </video>
        </div>

        <div className="ai-video-lightbox__meta">
          <span className="ai-video-lightbox__tag">{video.tag}</span>
          <h3 id={titleId} className="ai-video-lightbox__title">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

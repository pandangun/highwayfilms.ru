"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

/**
 * Ссылка, которая подгружает страницу заранее только тогда, когда к ней
 * потянулись: навели мышь, коснулись пальцем или перешли табом. Раньше
 * Next.js сразу при загрузке тянул все видимые ссылки шапки, меню и
 * подвала — 45–58 фоновых запросов, которые делили канал с роликом
 * первого экрана. Наведение даёт фору в 100–300 мс: переход всё равно
 * мгновенный.
 *
 * Для ссылок в тексте страницы и главных кнопок остаётся обычный Link:
 * их предзагрузка, пока они на экране, оправдана.
 */
export default function IntentLink({ onPointerEnter, onTouchStart, onFocus, ...props }: ComponentProps<typeof Link>) {
  const [armed, setArmed] = useState(false);

  return (
    <Link
      {...props}
      prefetch={armed ? null : false}
      onPointerEnter={(event) => {
        setArmed(true);
        onPointerEnter?.(event);
      }}
      onTouchStart={(event) => {
        setArmed(true);
        onTouchStart?.(event);
      }}
      onFocus={(event) => {
        setArmed(true);
        onFocus?.(event);
      }}
    />
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Если переход занял меньше, линию не показываем — не мигаем зря. */
const SHOW_AFTER = 150;
/** Страховка: переход сорвался — линия всё равно уходит. */
const GIVE_UP_AFTER = 10_000;

/**
 * Линия загрузки у верхнего края при переходе по сайту. Next.js держит
 * старую страницу, пока грузит новую, и на медленной сети клик по меню
 * казался неработающим. Теперь через 150 мс после клика по внутренней
 * ссылке вдоль шапки бежит голубая линия, а когда новая страница на месте,
 * дотягивается до конца и гаснет.
 *
 * Состояние выводится из адреса: линия горит, пока адрес тот же, с которого
 * начали переход. Сменился адрес — линия гаснет сама, без отдельного
 * «завершить».
 */
export default function NavProgress() {
  const pathname = usePathname();
  const [leaving, setLeaving] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };

    // В фазе перехвата: Link отменяет клик своим обработчиком, а нам нужно
    // увидеть его раньше.
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      const from = window.location.pathname;
      clear();
      timers.current.push(
        window.setTimeout(() => {
          if (window.location.pathname === from) setLeaving(from);
        }, SHOW_AFTER),
        window.setTimeout(() => setLeaving(null), GIVE_UP_AFTER),
      );
    };

    // «Назад» и «Вперёд» линию не зажигают и гасят начатую.
    const onHistory = () => {
      clear();
      setLeaving(null);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onHistory);
    return () => {
      clear();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onHistory);
    };
  }, []);

  const loading = leaving !== null && leaving === pathname;

  return <div className="nav-progress" data-loading={loading} aria-hidden />;
}

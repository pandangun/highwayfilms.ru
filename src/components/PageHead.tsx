import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * Заголовок страницы без видео: крупная антиква на чёрном и короткий лид.
 * Выравнивание — по левому краю: центр оставлен титульным карточкам и
 * титрам, иначе он перестаёт что-то значить.
 */
export default function PageHead({
  title,
  lead,
  children,
  className,
}: {
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={clsx("page-head", className)}>
      <div className="wrap">
        <h1 className="display display--h1 max-w-[14ch]">{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}

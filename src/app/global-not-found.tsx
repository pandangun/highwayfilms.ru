import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import KmPost from "@/components/road/KmPost";

export const metadata: Metadata = {
  title: "Страница не найдена — Highway Films",
};

/**
 * 404 для любого адреса: корневых layout'ов несколько, поэтому страница
 * сама собирает оболочку сайта — шапку, разметку и подвал.
 */
export default function GlobalNotFound() {
  return (
    <SiteShell lang="ru">
      <header className="page-head">
        <div className="wrap">
          <KmPost lang="ru" />
          <h1 className="display display--h1 max-w-[14ch]">Такой страницы нет</h1>
          <p className="lead">
            Адрес набран с ошибкой или страница переехала. Начните с главной или напишите нам.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn btn--primary">
              На главную
            </Link>
            <Link href="/contacts" className="btn btn--line">
              Контакты
            </Link>
          </div>
        </div>
      </header>
    </SiteShell>
  );
}

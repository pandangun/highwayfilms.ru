import Link from "next/link";
import { logoutStudio } from "@/cabinet/actions/studio";
import { contacts } from "@/content/site";

/** Полоса сверху: марка, чей это кабинет и как связаться со студией. */
export default function CabinetBar({ kind, title }: { kind: "client" | "studio"; title?: string }) {
  return (
    <div className="wrap">
      <header className="cab-bar">
        <Link href={kind === "studio" ? "/studio" : "/"} className="cab-bar__brand">
          Highway Films <span>{kind === "studio" ? "студия" : "кабинет"}</span>
        </Link>
        <nav className="cab-bar__nav" aria-label={kind === "studio" ? "Студия" : "Связь со студией"}>
          {title ? <span>{title}</span> : null}
          {kind === "studio" ? (
            <>
              <Link href="/studio">Проекты</Link>
              <form action={logoutStudio}>
                <button type="submit">Выйти</button>
              </form>
            </>
          ) : (
            <>
              <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer">
                Написать студии
              </a>
              <a href={contacts.phoneHref} className="num">
                {contacts.phone}
              </a>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

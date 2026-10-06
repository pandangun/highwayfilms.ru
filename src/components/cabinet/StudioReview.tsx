"use client";

import { useRef } from "react";
import { updateComment } from "@/cabinet/actions/studio";
import { formatTimecode } from "@/cabinet/format";
import ReviewPlayer, { type Marker, type PlayerHandle } from "@/components/cabinet/ReviewPlayer";

export type StudioNote = {
  id: string;
  ms: number | null;
  author: string;
  body: string;
  status: "open" | "done" | "kept";
  reply: string | null;
  round: number | null;
};

/** Версия глазами студии: правки клиента с таймкодами, у каждой — статус и ответ. */
export default function StudioReview({ code, videoUrl, notes }: { code: string; videoUrl: string; notes: StudioNote[] }) {
  const player = useRef<PlayerHandle>(null);
  const markers: Marker[] = notes
    .filter((note) => note.ms != null)
    .map((note) => ({ id: note.id, ms: note.ms ?? 0, tone: note.status === "open" ? "open" : "done" }));

  return (
    <div className="rv">
      <ReviewPlayer ref={player} src={videoUrl} markers={markers} />
      <aside className="rv-panel" aria-label="Правки клиента">
        {notes.length ? (
          <ul className="rv-notes mt-0">
            {notes.map((note) => (
              <li key={note.id} className="rv-note">
                {note.ms != null ? (
                  <button type="button" className="rv-note__time" onClick={() => player.current?.seek(note.ms ?? 0)}>
                    {formatTimecode(note.ms)}
                  </button>
                ) : (
                  <span className="rv-note__time text-haze">общая</span>
                )}
                <p className="rv-note__body">{note.body}</p>
                <p className="rv-note__meta">
                  <span>{note.author}</span>
                  {note.round ? <span>круг {note.round}</span> : null}
                </p>
                <form action={updateComment} className="col-start-2 grid gap-2">
                  <input type="hidden" name="code" value={code} />
                  <input type="hidden" name="id" value={note.id} />
                  <div className="flex flex-wrap items-center gap-3">
                    <select name="status" defaultValue={note.status} className="input w-auto py-1 text-small" aria-label="Статус правки">
                      <option value="open">В работе</option>
                      <option value="done">Сделано</option>
                      <option value="kept">Оставили как было</option>
                    </select>
                    <button type="submit" className="link-button">
                      Сохранить
                    </button>
                  </div>
                  <input name="reply" defaultValue={note.reply ?? ""} className="input py-1 text-small" placeholder="Ответ, если нужен" />
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cab-muted">Правок к этой версии пока нет.</p>
        )}
      </aside>
    </div>
  );
}

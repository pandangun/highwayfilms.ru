"use client";

import { useRef, useState, useTransition } from "react";
import { addComment, approveVersion, deleteComment, submitRound } from "@/cabinet/actions/client";
import { formatTimecode, plural } from "@/cabinet/format";
import ReviewPlayer, { type Marker, type PlayerHandle } from "@/components/cabinet/ReviewPlayer";

export type Note = {
  id: string;
  ms: number | null;
  author: string;
  body: string;
  status: "open" | "done" | "kept";
  reply: string | null;
  draft: boolean;
  mine: boolean;
};

const STATUS_TEXT = { open: "у студии", done: "сделано", kept: "оставили как было" } as const;

/**
 * Просмотр версии парой. Фокус в поле правки ставит видео на паузу и
 * запоминает таймкод. Правки копятся черновиками и уходят студии одной
 * кнопкой — одним кругом.
 */
export default function ReviewRoom({
  code,
  versionId,
  title,
  videoUrl,
  notes,
  canEdit,
  rounds,
}: {
  code: string;
  versionId: string;
  title: string;
  videoUrl: string;
  notes: Note[];
  canEdit: boolean;
  rounds: { used: number; included: number };
}) {
  const player = useRef<PlayerHandle>(null);
  const [now, setNow] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const [whole, setWhole] = useState(false);
  const [text, setText] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const drafts = notes.filter((note) => note.draft);
  const sent = notes.filter((note) => !note.draft);
  const at = pinned ?? now;
  const markers: Marker[] = notes
    .filter((note) => note.ms != null)
    .map((note) => ({ id: note.id, ms: note.ms ?? 0, tone: note.draft ? "draft" : note.status === "open" ? "open" : "done" }));

  const run = (action: () => Promise<unknown>, after?: () => void) => {
    setError("");
    startTransition(async () => {
      try {
        await action();
        after?.();
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : "Не получилось. Обновите страницу и попробуйте ещё раз.");
      }
    });
  };

  const add = () => {
    if (!text.trim()) return;
    run(
      () => addComment(code, versionId, whole ? null : at, text),
      () => {
        setText("");
        setPinned(null);
        setWhole(false);
      },
    );
  };

  const roundNumber = rounds.used + 1;
  const roundsLeft = rounds.included - rounds.used;

  return (
    <div className="rv">
      <div>
        <ReviewPlayer ref={player} src={videoUrl} markers={markers} onTime={setNow} />
        <p className="mt-3 text-micro text-haze">Пробел — пауза, стрелки — на 5 секунд назад и вперёд. Точки на шкале — правки.</p>
      </div>

      <aside className="rv-panel" aria-label={`Правки к «${title}»`}>
        {canEdit ? (
          <>
            <div className="rv-compose">
              <div className="rv-compose__head">
                <label htmlFor="note">{whole ? "Правка ко всему ролику" : <>Правка на <b>{formatTimecode(at)}</b></>}</label>
                <span>
                  {roundsLeft > 0 ? `Круг правок ${roundNumber} из ${rounds.included}` : "Включённые круги использованы"}
                </span>
              </div>
              <textarea
                id="note"
                className="input"
                rows={3}
                value={text}
                placeholder="Что поправить в этом месте?"
                onFocus={() => {
                  player.current?.pause();
                  if (pinned == null) setPinned(player.current?.time() ?? now);
                }}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) add();
                }}
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="consent">
                  <input type="checkbox" checked={whole} onChange={(event) => setWhole(event.target.checked)} />
                  <span>Без таймкода, ко всему ролику</span>
                </label>
                <button type="button" className="btn btn--line btn--sm" onClick={add} disabled={pending || !text.trim()}>
                  Добавить правку
                </button>
              </div>
              {pinned != null && !whole ? (
                <button type="button" className="link-button justify-self-start" onClick={() => setPinned(null)}>
                  Взять таймкод из плеера
                </button>
              ) : null}
            </div>
          </>
        ) : null}

        {error ? (
          <p className="notice notice--error mt-4" role="alert">
            {error}
          </p>
        ) : null}

        {drafts.length ? (
          <>
            <h2 className="cab-h2 mt-8">Черновики, видны только вам</h2>
            <NoteList notes={drafts} onSeek={(ms) => player.current?.seek(ms)} onDelete={canEdit ? (id) => run(() => deleteComment(code, id)) : undefined} />
          </>
        ) : null}

        {canEdit ? (
          <div className="rv-actions">
            {drafts.length ? (
              <button type="button" className="btn btn--primary" disabled={pending} onClick={() => run(() => submitRound(code, versionId))}>
                Отправить студии {drafts.length} {plural(drafts.length, ["правку", "правки", "правок"])}
              </button>
            ) : confirming ? (
              <div className="rv-confirm" role="group" aria-label="Подтверждение">
                <p>Согласовать «{title}»? После этого правки к этой версии не принимаются.</p>
                <div className="rv-confirm__buttons">
                  <button type="button" className="btn btn--primary btn--sm" disabled={pending} onClick={() => run(() => approveVersion(code, versionId))}>
                    Согласовать
                  </button>
                  <button type="button" className="btn btn--line btn--sm" onClick={() => setConfirming(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" className="btn btn--line" onClick={() => setConfirming(true)}>
                Всё нравится, согласовать
              </button>
            )}
          </div>
        ) : null}

        {sent.length ? (
          <>
            <h2 className="cab-h2 mt-10">Отправлено студии</h2>
            <NoteList notes={sent} onSeek={(ms) => player.current?.seek(ms)} />
          </>
        ) : null}
      </aside>
    </div>
  );
}

function NoteList({ notes, onSeek, onDelete }: { notes: Note[]; onSeek: (ms: number) => void; onDelete?: (id: string) => void }) {
  return (
    <ul className="rv-notes">
      {notes.map((note) => (
        <li key={note.id} className="rv-note">
          {note.ms != null ? (
            <button type="button" className="rv-note__time" onClick={() => onSeek(note.ms ?? 0)} aria-label={`Перейти к ${formatTimecode(note.ms)}`}>
              {formatTimecode(note.ms)}
            </button>
          ) : (
            <span className="rv-note__time text-haze">общая</span>
          )}
          <p className="rv-note__body">{note.body}</p>
          <p className="rv-note__meta">
            <span>{note.author}</span>
            {!note.draft ? <span>{STATUS_TEXT[note.status]}</span> : null}
            {onDelete && note.mine ? (
              <button type="button" className="link-button" onClick={() => onDelete(note.id)}>
                Удалить
              </button>
            ) : null}
          </p>
          {note.reply ? <p className="rv-note__reply">Студия: {note.reply}</p> : null}
        </li>
      ))}
    </ul>
  );
}

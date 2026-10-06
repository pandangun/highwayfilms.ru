"use client";

import { useEffect, useRef, useState } from "react";
import { finishFileUpload, finishVersionUpload, startFileUpload, startVersionUpload } from "@/cabinet/actions/studio";
import type { FileKind, VersionKind } from "@/cabinet/db/schema";

/** Файл уходит PUT-запросом прямо в хранилище, с полосой прогресса. */
function put(url: string, file: File, onProgress: (percent: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("PUT", url);
    request.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    request.onload = () => (request.status < 300 ? resolve() : reject(new Error(request.responseText || `Ошибка ${request.status}`)));
    request.onerror = () => reject(new Error("Связь оборвалась"));
    request.send(file);
  });
}

/**
 * Загрузка видео для просмотра (mode="version") или файла для скачивания
 * (mode="file"). Большие мастера на сервере удобнее класть программой
 * вроде Cyberduck — это следующий шаг, когда подключим Object Storage.
 */
export default function Uploader({ code, mode, options }: { code: string; mode: "version" | "file"; options: [string, string][] }) {
  const input = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<string>(options[0]?.[0] ?? "other");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const busy = progress !== null;

  useEffect(() => {
    if (!busy) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [busy]);

  const upload = async () => {
    const file = input.current?.files?.[0];
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      if (mode === "version") {
        const started = await startVersionUpload(code, kind as VersionKind, file.name);
        await put(started.uploadUrl, file, setProgress);
        await finishVersionUpload(code, started.id);
      } else {
        const started = await startFileUpload(code, kind as FileKind, title, file.name);
        await put(started.uploadUrl, file, setProgress);
        await finishFileUpload(code, started.id);
      }
      if (input.current) input.current.value = "";
      setFileName("");
      setTitle("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не загрузилось");
    } finally {
      setProgress(null);
    }
  };


  return (
    <div className="grid gap-4">
      <div className="st-inline">
        <label className="field">
          <span className="field__label">{mode === "version" ? "Что это" : "Тип файла"}</span>
          <select className="input" value={kind} onChange={(event) => setKind(event.target.value)} disabled={busy}>
            {options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        {mode === "file" ? (
          <label className="field">
            <span className="field__label">Название в кабинете</span>
            <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={`${options[0]?.[1] ?? "Файл"}, 4K`} disabled={busy} />
          </label>
        ) : null}
      </div>
      <div className="st-inline">
        {/* Своя кнопка вместо системного поля: то подписано на языке браузера. */}
        <label className="btn btn--line btn--sm file-pick">
          <input
            ref={input}
            type="file"
            className="visually-hidden"
            accept={mode === "version" ? "video/mp4,video/quicktime,video/webm" : undefined}
            disabled={busy}
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
          />
          Выбрать файл
        </label>
        <span className="cab-muted min-w-0 flex-1 truncate">{fileName || "файл не выбран"}</span>
        <button type="button" className="btn btn--primary btn--sm" onClick={upload} disabled={busy || !fileName}>
          {busy ? `Загружается ${progress}%` : "Загрузить"}
        </button>
      </div>
      {busy ? (
        <div className="up-bar" role="progressbar" aria-valuenow={progress ?? 0} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${progress}%` }} />
        </div>
      ) : null}
      {error ? (
        <p className="notice notice--error" role="alert">
          {error}
        </p>
      ) : null}
      <p className="cab-muted">
        {mode === "version"
          ? "Для просмотра хватит MP4 в 1080p: он быстро грузится и на телефоне."
          : "Файлы до 5 ГБ можно загрузить здесь. Больше — через хранилище, подключим его вместе с сервером."}
      </p>
    </div>
  );
}

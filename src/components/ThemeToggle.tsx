"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";

type ThemeName = "dark" | "light";

type ThemeToggleProps = {
  locale?: "ru" | "en";
  variant?: "header" | "footer";
  compact?: boolean;
};

const THEME_STORAGE_KEY = "highway-theme";

function readTheme(): ThemeName {
  if (typeof document === "undefined") return "dark";

  const rootTheme = document.documentElement.dataset.theme;
  if (rootTheme === "light" || rootTheme === "dark") {
    return rootTheme;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(nextTheme: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = nextTheme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    /* ignore storage write errors */
  }

  window.dispatchEvent(new CustomEvent<ThemeName>("site-theme-change", { detail: nextTheme }));
}

export default function ThemeToggle({
  locale = "ru",
  variant = "footer",
  compact = false,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeName>("dark");

  useEffect(() => {
    const syncTheme = () => {
      setTheme(readTheme());
    };

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<ThemeName>).detail;
      setTheme(nextTheme === "light" ? "light" : "dark");
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        syncTheme();
      }
    };

    syncTheme();
    window.addEventListener("site-theme-change", handleThemeChange as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("site-theme-change", handleThemeChange as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const switchClassName = variant === "header" ? "header-theme-switch" : "footer-theme-switch";
  const buttonClassName = variant === "header" ? "header-theme-button" : "footer-theme-button";
  const themeLabel = locale === "en" ? "Theme" : "Тема";
  const darkLabel = locale === "en" ? "Dark theme" : "Тёмная тема";
  const lightLabel = locale === "en" ? "Light theme" : "Светлая тема";

  return (
    <div
      className={clsx(switchClassName, compact && variant === "header" && "is-compact")}
      role="tablist"
      aria-label={themeLabel}
    >
      <button
        type="button"
        onClick={() => applyTheme("dark")}
        className={clsx(buttonClassName, theme === "dark" && "is-active")}
        aria-label={darkLabel}
        aria-pressed={theme === "dark"}
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => applyTheme("light")}
        className={clsx(buttonClassName, theme === "light" && "is-active")}
        aria-label={lightLabel}
        aria-pressed={theme === "light"}
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

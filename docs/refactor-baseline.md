# Refactor baseline — шаг 1

Снято 2026-07-28 на коммите `74713b3` (ветка `refactor/step1-baseline`).

Это точка отсчёта. Любой следующий шаг рефакторинга сверяется с ней: если
что-то из зафиксированного здесь ухудшилось — это регресс, а не «так и было».

## Окружение

| | |
|---|---|
| Next.js | 16.2.4 |
| React | 19.2.4 |
| Бандлер (dev) | Turbopack |
| Бандлер (build) | Turbopack |
| Node | см. `node -v` на машине сборки |
| Хостинг | Vercel |

Бандлеры выровнены в этом же шаге. До него `dev` был принудительно на webpack
(`next dev --webpack`), а `build` — на Turbopack (дефолт Next 16). Разный
бандлер между dev и прод не гарантирует одинаковый порядок CSS-чанков, что
даёт баги класса «на локале норм, на проде поехало».

Webpack оставлен под `npm run dev:webpack` — на случай, если понадобится
развести баг по бандлерам.

## Результат `npm run build`

Компиляция 6.8s, TypeScript 9.7s, 44 страницы сгенерированы за 831ms. Ошибок нет.

**Статических маршрутов: 2 из 34.**

```
○ (Static)   /robots.txt, /sitemap.xml
ƒ (Dynamic)  всё остальное — 32 маршрута
```

Причина: `await headers()` в `src/app/layout.tsx` и `src/components/Header.tsx`
(чтение `x-pathname`, который проставляет `middleware.ts`). Пока он там —
ни одна страница не может быть отдана статикой с CDN, каждый запрос идёт
в серверную функцию.

Это целевая метрика шага «route groups»: число `○` должно вырасти с 2 до
большинства публичных страниц.

## Результат `npm run audit:frontend`

Прогон: dev на `http://localhost:3400`, Playwright + Edge, вьюпорт 390×844.

```
OK / mobile width
OK /commercials mobile width
OK /contacts mobile width
OK /weddings mobile width
OK /brief mobile width
OK /articles mobile width
OK Save-Data keeps hero on poster
OK motion reveal on scroll
```

8 из 8. Горизонтального оверфлоу на 390px нет, hero под `Save-Data` остаётся
на постере, reveal-анимации не оставляют контент невидимым.

### Чего этот аудит НЕ покрывает

Важно для честности baseline — зелёный прогон не значит «вёрстка в порядке»:

1. **Проверяются 6 страниц из 34.** Вне покрытия: `/about`, `/corporate`,
   `/ai`, `/music-videos`, `/videoproduction`, `/client`, `/client/demo-project`
   и вся локаль `/en/*`.
2. **Только hard navigation** (`page.goto`). Утечка глобального CSS между
   страницами (`import "../styles/weddings.css"` — 57 KB) проявляется только
   при клиентской навигации по меню и здесь не ловится в принципе.
3. **Только тёмная тема.** Светлая держится на 35 `!important` в
   `theme.css:442-476` и не проверяется ничем.
4. **Только 390px.** Планшетная раскладка хедера (`xl:hidden` ряд) не покрыта.
5. **Только оверфлоу и видимость.** Контраст, конфликты z-index, CLS — нет.

Расширение покрытия — задача шага 2, вместе со скоупингом постраничного CSS.

## Веса, за которыми следим

| Что | Сейчас |
|---|---|
| Рукописный CSS в `src/app/styles/` | ~170 KB (9 файлов, `weddings.css` — 57 KB) |
| `public/video/derived/hero-desktop.mp4` | 70 MB |
| `public/video/derived/hero-mobile.mp4` | 21.6 MB |
| `public/images/` | 37 MB (свадебные PNG по 2.5–2.7 MB) |
| Вхождений `text-white*` в JSX | 367 в 25 файлах |
| `!important` под светлую тему | 35 правил |
| `position: fixed/absolute/sticky` в CSS | 75 |

## Как воспроизвести

```bash
npm run build
npm run dev -- -p 3400
npm run audit:frontend
```

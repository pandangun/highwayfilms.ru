# Шрифты сайта

Unbounded (заголовки) и Onest (текст) — из репозитория Google Fonts
(`ofl/unbounded/Unbounded[wght].ttf`, `ofl/onest/Onest[wght].ttf`),
лицензия SIL OFL 1.1 — тексты лицензий лежат рядом.

Каждый файл — вариативный шрифт, урезанный до того, что есть на сайте:

- ось веса: Unbounded 300–600, Onest 300–700;
- знаки: латиница с Latin-1, кириллица, общая пунктуация, ₽, €, №, ™,
  стрелки, минус.

Пересборка (нужны `pip install fonttools brotli`):

```bash
fonttools varLib.instancer "Unbounded[wght].ttf" wght=300:600 -o Unbounded-300-600.ttf
fonttools varLib.instancer "Onest[wght].ttf" wght=300:700 -o Onest-300-700.ttf

U="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+0400-045F,U+0490-0491,U+2000-206F,U+20AC,U+20BD,U+2116,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
pyftsubset Unbounded-300-600.ttf --unicodes="$U" --layout-features+=tnum,lnum,case,pnum,onum --name-IDs='*' --flavor=woff2 --output-file=Unbounded.woff2
pyftsubset Onest-300-700.ttf --unicodes="$U" --layout-features+=tnum,lnum,case,pnum,onum --name-IDs='*' --flavor=woff2 --output-file=Onest.woff2

# Неразрывный дефис (U+2011): своего знака в шрифтах нет, рисуем обычным дефисом.
python scripts/font-nbhyphen.py Unbounded.woff2 Onest.woff2
```

Если на сайте появится знак не из этого списка, браузер возьмёт его из
системного шрифта. Тогда его код добавляется в `U` и файлы пересобираются.

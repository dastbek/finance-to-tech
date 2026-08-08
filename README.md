# Finance to Tech

A map of the tech world for finance students in Vietnam and Southeast Asia — what the words
actually mean, which jobs want a finance degree, and what to learn first.

**Read it: <https://dastbek.github.io/finance-to-tech>**

## Why

Finance is a crowded degree. The students who get through a hiring season often have one thing
extra, and it is usually not a second degree — it is a handful of concrete, checkable skills.
The hard part is not learning them. It is knowing which ones matter and in what order.

The site is built around one constraint: **not being daunting.** Every page opens with a boxed
summary, pages are capped near 700 words, everything carries a time estimate, and the
self-assessment never returns more than three next actions.

## Run it locally

```bash
python -m http.server 8000
```

Open <http://localhost:8000>. There is no install step and no dependencies.

## How it is built

Plain HTML, CSS and vanilla JavaScript. **No Node, no npm, no framework** — GitHub Pages serves
static files natively, and a site about demystifying tech should be readable in its own source.

| File | Role |
|---|---|
| `index.html` | Shell only — rail, main, footer |
| `styles.css` | Design tokens, then components |
| `content.js` | **All prose lives here** as plain data — edit content without touching code |
| `app.js` | Hash router and page rendering |
| `build.py` | Inlines CSS and JS into `dist/bundle.html` as a single self-contained file |

`build.py` exists because the site also publishes as a single-file page, where every external
request is blocked. Standard library only:

```bash
python build.py
```

## Contributing a correction

The salary figures and role descriptions are the most likely things to go stale. If a number here
is wrong, please open an issue or a pull request — it is better for a student to read nothing than
to read something out of date.

Content lives in `content.js` and needs no build step to change.

## Licence

Free to use, copy and adapt.

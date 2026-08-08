# Finance to Tech

A static site teaching finance students in Vietnam / Southeast Asia what "tech" means, which jobs
their degree already reaches, and what to learn first. Ships to GitHub Pages **and** as a Claude Artifact.

## Run it

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. No install step, no dependencies.

## Stack — do not add a build system

Plain HTML + CSS + vanilla JS. **No Node, no npm, no framework.** This was decided deliberately:

- GitHub Pages serves static files natively.
- `node_modules` is the one real performance hit on this Windows machine.
- A site about demystifying tech should be readable in its own source.

Revisit only if the site passes ~15 pages or Markdown authoring becomes the bottleneck (then: Astro).

**No ES modules.** Scripts are plain `<script>` tags with globals, because the bundled single-file build
has to work when opened directly from disk (`file://`), where module loading is blocked.

## Files

| File | Role |
|---|---|
| `index.html` | Shell only — rail, main, footer. No content. |
| `styles.css` | Design tokens then components. Every color goes through a custom property. |
| `content.js` | **All prose lives here** as the `CONTENT` global. Edit content without touching code. |
| `app.js` | Hash router + page renderers. Reads from `CONTENT`, never hardcodes copy. |
| `build.py` | Inlines css/js into `dist/bundle.html` for the Artifact. Stdlib only. |

## Design system

Concept: **"the ledger and the terminal."** The site is about translation between two worlds, so the
typography encodes it — serif for the human/finance voice, **monospace (`.term`) for every tech term**.
Structure borrows finance's own discipline: hairline rules, column grids, tabular figures, ledger row banding.

- **Amber (`--amber`) is the only bold accent and is reserved for "you are here."** Do not use it decoratively.
- Semantic color (`--good`) is separate from the accent.
- Neutrals are biased green-teal, never pure grey.
- Both themes are first-class. `:root[data-theme="dark"|"light"]` must override the
  `prefers-color-scheme` media query in **both** directions — style through tokens, never inside the query.
- All text clears **4.5:1** contrast in both themes. Verify after any palette change.

## Content rules

These exist because the site's hardest constraint is not being daunting:

1. Every page opens with a `.tldr` "short version" box. Reading only those must still convey the map.
2. Cap pages near 700 words. Depth goes behind disclosure, collapsed by default.
3. Put a time estimate on everything. Unknown duration is most of the fear.
4. Never present more than three next actions at once.
5. The four steps are a **sequence**, so they are numbered. Don't number things that aren't sequences.
6. Salary figures carry a "last reviewed" date and a source note. Stale numbers on a careers site
   destroy its credibility — these need verifying against ITviec / VietnamWorks / TopDev before publishing.

## Verify before shipping

- Walk every route, including a bad hash (404 path).
- Resize to 375px — the page body must never scroll horizontally. Wide tables scroll inside
  `.table-wrap`, not the body.
- Toggle both themes and re-check contrast.
- Run `build.py`, open `dist/bundle.html` from disk — it must render fully with **zero** network requests.

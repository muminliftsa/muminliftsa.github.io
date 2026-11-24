# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static bilingual (TR/EN) portfolio site for Mümin Hasanoğlu (UI/UX + brand identity). Plain HTML/CSS/JS: no framework, bundler, package manager, linter or tests. `PLAN.md` holds the original design spec (Turkish); `README.md` explains content editing and hosting.

## Running locally

Node and Python are not installed on this machine. Use the PowerShell static server (port 5173):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1
```

`.claude/launch.json` defines `portfolio` (main site) and `fikret-preview` (serves the `.claude/fikret-preview` worktree via `SITE_DIR`) for the preview pane. `file://` previews do not load CSS/JS, so always use the server. The `.claude/` folder is gitignored.

## Deployment / git

- Remote `origin` is `muminliftsa/muminliftsa.github.io` (public); GitHub Pages serves `main` at https://muminliftsa.github.io, so pushing to `main` is a production deploy.
- `git` and `gh` are installed under `C:\Program Files\Git\cmd` and `C:\Program Files\GitHub CLI`, which may be missing from PATH in an already-open shell; prepend them to `$env:Path`.
- Commits use the identity `muminliftsa <muminliftsa@users.noreply.github.com>` (repo-local config).
- Collaborator "fikret" pushes feature branches (e.g. `fiyatlar-2x`); fetch before assuming `main` is the only branch.

## Architecture

Script load order in `index.html` matters: `data.js` → `i18n.js` → `main.js`. The first two define globals (`CONFIG`, `PROJECTS`, `I18N`) consumed by `main.js`; there are no modules.

- **All visible text lives in `js/i18n.js`** (`I18N.tr` / `I18N.en`). HTML elements carry `data-i18n="key"`, and `applyLang()` in `main.js` sets `textContent` from the active dictionary, so markup inside translated strings is not supported. Prices are just per-language keys (`plan1_p`, …: ₺ in TR, $ in EN). A new key must be added to **both** languages.
- **Project content lives in `js/data.js`** as bilingual `{tr, en}` fields, not in `i18n.js`. Project cards and the modal are rendered by JS (`renderProjects`, `fillModal`), and placeholder visuals are generated as inline SVG by `mock(p)` in `main.js` keyed on `type` (`app`, `dash`, `logoA`, `logoB`); a project `image` path overrides it. `applyLang()` re-renders the cards and refills an open modal on language change.
- **Contact links** (mailto, WhatsApp, pricing "Get a quote" buttons, socials) are built at runtime in `updateLinks()` from `CONFIG`; the WhatsApp message templates are `wa_msg*` keys in `i18n.js`. `CONFIG` still holds placeholder email/phone.
- **Theme transitions:** each section has `data-theme` (`cream|orange|ink|red`); a per-frame `updateTheme()` sets `body[data-theme]`, which swaps `--bg`/`--fg` in CSS. The fixed header colour follows `--fg`, so new sections need a `data-theme`.
- **Single `requestAnimationFrame` loop** in `main.js` drives marquee speed (scroll velocity), hero parallax, the sticky horizontal "process" scroll (`procUpdate`, desktop only; ≤900px falls back to a vertical stack) and theme updates.
- **Reveal animations:** `.reveal` / `.reveal-lines` elements get `.in` from an IntersectionObserver. Do not use `clip-path` for hidden states: the observer then never fires on the clipped element (an earlier bug).
- **Motion/pointer gating:** custom cursor, magnetic buttons and tilt only run when `useCursor` is true (not touch, not `prefers-reduced-motion`); reduced-motion also disables CSS animations.
- The footer legal links (KVKK/Privacy/Cookie) are intentionally dead (`href="#"` + `preventDefault`); real pages are not written yet.

# Saving of Swedovia — website rules

The owner (Joel Martinsson, PI) has no coding experience. Explain things in plain language.

## How the site is set up

- **GitHub Pages** (`jjmartinsson.github.io/Saving-of-Swedovia/`, branch `claude/swedovia-game-website-mKeKT`) is the **test environment**. All edits happen here.
- **One.com** (`savingofswedovia.com`) is the **live site**. Joel copies files over manually after checking the test page.
- Do NOT add a `CNAME` file to this repo. The domain is hosted on One.com, not GitHub Pages.

## The game, the database and the graphs — NEVER TOUCH

These exist only on One.com (not in this repo) and were built by Henrik Nilsson:

| One.com path | What it is |
|---|---|
| `build/` | The game itself (shown in an iframe on `/game`) |
| `backend/`, `.config/` | Data engine + database settings (may contain passwords) |
| `export/` | Data export |
| `pages/` | The `/game` and `/graphs` pages |
| `.htaccess` | Routes `/game`, `/graphs` and `/api/v1/...` to the right files |
| `css/game.css`, `css/graphs.css`, `js/charts.js` | Styling and chart code for game/graphs pages |

Data flow: game → backend → database ← backend (`/api/v1/charts/...`) ← graphs page.

Rules:
1. Never create, edit, move, rename or recreate any of the files above, and never suggest Joel changes them on One.com.
2. Never put `backend/` or `.config/` content in this repo (possible credentials).
3. Link to the game and graphs only by URL: `/game`, `/graphs` (or `/build/index.html` if embedding). Never move them.
4. If a request would require touching any of the above, stop and tell Joel to ask Henrik instead.

## Shared files — be careful

`css/style.css` and `js/main.js` are ALSO loaded by the `/game` and `/graphs` pages.
- In `style.css`: only ADD new, uniquely named classes. Do not rename/remove existing classes or change `.navbar`, `.nav-*`, `.footer*`, `.funded-*`, `.lang-switch`, `.section-dark`, `.hide`, `.btn*` or `body` styles without warning Joel that it also changes the game/graphs pages.
- In `main.js`: never change the `sos-lang` localStorage key, the `data-en`/`data-sv` switching (including `select option[data-en]`), or the element IDs `navbar`, `navLinks`, `mobileToggle`, `langSwitch`. `js/charts.js` depends on them.

## What Joel copies to One.com

Only individual files, never whole folders (the One.com `css/` and `js/` folders contain Henrik's files that are not in this repo):
- `index.html`
- `css/style.css` (if changed)
- `js/main.js` (if changed)
- new files in `images/` (if added)

## Handoff checklist — REQUIRED after every finished update

When Joel says we are done updating the test page (or a change is finished and pushed), always give him this, step by step, in plain language, listing ONLY the files that actually changed:

**Step 1 — Save backups (before transferring anything)**
For each file that will be replaced, tell him exactly where it is in One.com's file manager and to download it to his computer first, e.g.:
- In One.com's file manager, at the top level (the folder that contains `index.html`, `css`, `js`, `images`, `backend`...): download `index.html`
- Open the `css` folder: download `style.css`
- Open the `js` folder: download `main.js`
Suggest saving them in a folder on his computer named with today's date (e.g. `Swedovia backup 2026-11-23`).
For new images, there is nothing to back up.

**Step 2 — Get the new files from GitHub**
Tell him which files to download from the repo (branch `claude/swedovia-game-website-mKeKT`) and their path in the repo.

**Step 3 — Transfer, one file at a time, to the exact location**
| Repo file | Upload to on One.com | Action |
|---|---|---|
| `index.html` | top level (next to `backend`, `build`, `css`...) | replace existing `index.html` |
| `css/style.css` | inside the `css` folder | replace existing `style.css` only — leave `game.css` and `graphs.css` alone |
| `js/main.js` | inside the `js` folder | replace existing `main.js` only — leave `charts.js` alone |
| `images/<name>` | inside the `images` folder | add the new file |
Only include rows for files that changed. Never tell him to upload or replace a whole folder.

**Step 4 — Check the live site** (private window: Cmd+Shift+N)
1. `savingofswedovia.com` — the change is visible, EN/SV switch works
2. `savingofswedovia.com/game` — the game loads
3. `savingofswedovia.com/graphs` — pick something under "Select Data" and a chart appears

**If something breaks:** upload the backup file(s) from Step 1 to the same place to restore the old version, then tell Claude what went wrong.

Never include `CLAUDE.md`, `.nojekyll`, `README`, `sitemap.xml` or `robots.txt` in the transfer unless Joel asks (they're not part of the live homepage update).

## Plan: new homepage with the game and graphs (agreed 2026-11-23)

Joel wants a new homepage design where the game and graphs are more visible. Work happens in two stages:

**Stage 1 — Design (test page).** Build the new design on the test page. Placeholders are allowed here, e.g. a frame saying "The game will appear here" and an example chart marked "Example – not real data". Placeholders must NOT link to or load `/game`, `/graphs`, `/build/...` or `/api/...`. While placeholders are in `index.html`, remind Joel not to copy `index.html` to One.com (unless he asks for a placeholder-free version for another change).

**Stage 2 — Go live (only when Joel says the design is done and asks to "update the files" / "make it ready for the real site").**
1. Replace every placeholder with the real thing:
   - Game: an iframe pointing to `/build/index.html` (same method as One.com's `/game` page, which uses `<iframe frameborder="0" allowfullscreen="true" scrolling="no" src="../build/index.html">`). Use the root path `/build/index.html` on the homepage.
   - Graphs: links/buttons/cards to `/graphs` (do not try to copy the PHP graphs code into `index.html`; embedding `/graphs` in an iframe is possible but it has its own menu/footer).
   - Any menu/hero buttons: link to `/game` and `/graphs` or to the on-page sections.
2. Search the final files and remove ALL placeholder text, example data and preview labels (e.g. "will appear here", "placeholder", "Example", "not real data", "Preview"). Nothing like that may remain in the final code.
3. Tell Joel clearly that on the test page the game area will now look empty/broken and `/graphs` links will give an error — that is expected, because the game and graphs only exist on One.com.
4. Give the full handoff checklist (backup → download → upload one file at a time → check homepage, `/game`, `/graphs`), and tell him to also check that the game appears on the homepage itself. If it doesn't, restore the backup `index.html`.
5. Never change `build/`, `backend/`, `pages/`, `.htaccess` or Henrik's files to make this work.
6. The new design adds a `downloads/` folder (educator guide PDF `downloads/saving-of-swedovia-educator-guide.pdf`). In the handoff, tell Joel to create a `downloads` folder at the top level on One.com and upload the PDF into it (new folder, nothing to back up).
6b. New images used by the design must also be uploaded to One.com's `images/` folder: `game-ethos.webp`, `game-patrols.webp`, `game-forest.webp`, `game-oskar.webp`, `game-ake.webp`, `game-fire-dilemma.webp`, `game-layla.webp` (cut from Joel's screenshots; swap for clean originals if Joel provides them).
6e. Role cards in About ("Inside the game") for Healthcare and Politicians & civil servants are "Picture coming" placeholders (`.sos-role--ph`) until Joel sends character art; before go-live, replace them or ask Joel whether to hide them.
6g. Education examples: Distribution = police patrols (`game-patrols.webp`), Dilemma = firefighters (`game-fire-dilemma.webp`). Roles: Oskar, Åke, Layla (`game-layla.webp`, medical commander); Politicians & civil servants is still a "Picture coming" placeholder.
6h. Scenario process (About, `#made`): identify dilemmas → interviews → update scenarios → interviews again (repeated) → finished scenarios → into the survey AND into the game. The scenario method is under development and will be presented in Research (`#method`).
6f. The survey went to a representative sample of the Swedish population (about 4,000 people per profession survey), NOT to practitioners. Interviews were with practitioners.
6d. Front page picture `images/game-forest.webp` (in `.sos-hero-screen`) is a stand-in; Joel will send a better "game picture" later. Page order: Hero → Play → About → Education → Research and Data (`#research`, incl. `#survey`) → Data (`#data`) → Presentations & News (`#news`) → Creators (`#team`, last).
6c. The game-inspired look (paper colours, 'Special Elite' typewriter headings, paper cards) is scoped to `<body class="sos-home">` in `style.css`, so `/game` and `/graphs` are unaffected. Keep new homepage styling inside `.sos-home` / `sos-` classes.
7. Placeholders to replace are marked in `index.html` with `<!-- STAGE 2: ... -->` comments (game frame in `#play`; the example chart, its "Example – not real data" note and the "Open the data explorer" link in the Data section `#data`, which is its own section after `#research`). The example chart should become a clear link/card to `/graphs` (no fake numbers).

Section IDs `home`, `about`, `team`, `research`, `news` must always exist in `index.html`: Henrik's `/game` and `/graphs` pages link to `/#home`, `/#about`, `/#team`, `/#research`, `/#news`.

## Change log: manual edits Joel made directly on One.com

These were made by Joel himself on One.com, not through this repo. If something breaks, check these first.

- **2026-11-23: `js/charts.js` (Henrik's graph file).** Joel changed the line `const minimumEntiries = 2;` to `const minimumEntiries = 5;` so charts show "Not enough data" unless at least 5 answers match. Nothing else in the file was meant to change.
  - **To undo:** on One.com open `js/charts.js` and change `5` back to `2` on that line (or upload Joel's backup copy of the file).
  - **If `/graphs` stops working after this edit**, likely causes: a character other than the number was changed or deleted (e.g. the `;`), or the file was saved with a different name or in the wrong folder. Compare with the original line exactly: `const minimumEntiries = 2;` (note the misspelling "Entiries", which is correct and must stay).
  - Note: this limit only hides charts on the page; the backend API (`/api/v1/charts/...`) still sends every answer line. Changing that would need Henrik.

## Content conventions

- Whenever `css/style.css` or `js/main.js` changes, bump the `?v=N` number on their links in `index.html` (otherwise browsers show the new page with old cached styles and it looks broken).

- Every visible text needs `data-en` and `data-sv` attributes.
- Make small, targeted changes. Never redesign the whole site unless asked.

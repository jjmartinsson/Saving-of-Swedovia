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

Always tell Joel exactly which files changed, remind him to download a backup of the One.com version first, and to check the homepage, `/game` and `/graphs` (pick a data option) after uploading.

## Content conventions

- Every visible text needs `data-en` and `data-sv` attributes.
- Make small, targeted changes. Never redesign the whole site unless asked.

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
6. The new design adds a `downloads/` folder with the educator guide in English (`downloads/saving-of-swedovia-educator-guide.pdf`) and Swedish (`downloads/saving-of-swedovia-lararhandledning.pdf`, added 2026-11-25). Education links to both, plus the two in-depth material PDFs (`saving-of-swedovia-in-depth-material.pdf`, `saving-of-swedovia-fordjupningsmaterial.pdf`). In the handoff, tell Joel to create a `downloads` folder at the top level on One.com and upload ALL FOUR PDFs into it (new folder, nothing to back up).
6b. New images used by the design must also be uploaded to One.com's `images/` folder: `game-patrols.webp`, `game-forest.webp`, `game-fire-dilemma.webp`, and the cast cut-outs `cast-ethos.webp`, `cast-oskar.webp`, `cast-ake.webp`, `cast-layla.webp`, `cast-anna.webp`, `cast-johan.webp` (cut from Joel's screenshots; swap for clean originals if Joel provides them).
6j. (2026-11-25) "How a mission works" and "Ten ethical principles" were removed from the homepage at Joel's request (principle icons deleted). The two example cards (Dilemma = firefighters, Distribution = police patrols) now sit in About ("What is Saving of Swedovia?") right after the first paragraph. Education highlights the educator guide as a card with its cover (`images/guide-cover.webp`, made from page 1 of the PDF; upload it to One.com `images/` at go-live, and remake it if the guide cover changes), with free workshops 2027–2028 as a smaller add-on note below. `#news` is titled "Outreach" (menu too), with Presentations and Swedovia in the News as sub-headings; previous presentations are listed newest first. Show at most 5 presentations and 5 news cards; older ones go inside a `<details class="sos-more">` "+ Show more" block (no JavaScript needed). The About example cards are `.sos-ex` cards with an "Example from the game" badge on the picture.
6e. About has a cast row "Some of the people you will meet in the game" (`.sos-cast`): Ethos (Professor), Oskar (Police chief, clean picture from Joel), Åke (Rescue commander; Swedish: Insatsledare), Layla (Medical commander), Anna (Politician), Johan (Civil servant) — confirmed by Joel.
6g. Example cards (now in About): Distribution = police patrols (`game-patrols.webp`), Dilemma = firefighters (`game-fire-dilemma.webp`).
6h. Scenario process (About, `#made`): identify dilemmas → interviews → update scenarios → interviews again (repeated) → finished scenarios → into the survey AND into the game. The method is presented under Publications in Research (there is no separate Method row any more; agreed 2026-11-25). Research rows: Publications, Survey of Swedish citizens (`#survey`), Data. Do not mention the 5-answer minimum on the website.
6i. Swedovia is a fictional TOWN (Swedish: staden), not a country. Survey results (what Swedish citizens thought should be done) were built into the game itself.
6f. The survey went to a representative sample of the Swedish population (about 4,000 people per profession survey), NOT to practitioners. Interviews were with practitioners.
6d. Front page picture is `images/cover-title.webp` (with title + "When every choice has a cost / what will you do?"; untitled version `images/cover.webp` also kept) (cover made by Claude from the cast cut-outs + burning house, ambulance helicopter and car crash scenes; Joel approved version R1). Upload it to One.com `images/` at go-live. Page order: Hero → Play → About → Education → Research and Data (`#research`, incl. `#survey`) → Data (`#data`) → Outreach: Presentations & News (`#news`) → Creators (`#team`, last).
6c. The game-inspired look (paper colours, 'Special Elite' typewriter headings, paper cards) is scoped to `<body class="sos-home">` in `style.css`, so `/game` and `/graphs` are unaffected. Keep new homepage styling inside `.sos-home` / `sos-` classes.
7. Placeholders to replace are marked in `index.html` with `<!-- STAGE 2: ... -->` comments (game frame in `#play`; the example chart, its "Example – not real data" note and the "Open the data explorer" link in the Data section `#data`, which is its own section after `#research`). The example chart should become a clear link/card to `/graphs` (no fake numbers).

Section IDs `home`, `about`, `team`, `research`, `news` must always exist in `index.html`: Henrik's `/game` and `/graphs` pages link to `/#home`, `/#about`, `/#team`, `/#research`, `/#news`.

## Educator guide (in progress, agreed 2026-11-24; Swedish version made 2026-11-25)

Built with scratchpad scripts (build_guide8.py + guide_content8.py; Swedish via GLANG=sv and sv_map.json). If the English text changes, the Swedish PDF must be regenerated too. Closing section uses layout B3. Revision 2026-11-26 (Joel's brief): checklist "Checklist before the session"/"Checklista inför passet" as a sub-heading at the end of part 3 "How to use" (parts 1–6; changed 2026-11-26), "How Swedish citizens answered" row on every dilemma in part 5 (data from scratchpad `survey_results.json`, shared by both languages; null = placeholder), back page "About the project" (funding VR 2025-04386 + Crafoord, LNU with BTH; ethics dnr 2025-06037-01 and 2026-03516-02; contact row). Terms: dilemma (not situation), uppdrag/mission, utfall/outcome, sammanställning/summary, profil/profile; no "utvärdering". Survey = 16,000 citizens, 4,000 per mission. Placeholders still open: survey numbers, risk per trip/run, helicopter places. Citation (Martinsson, Sundstedt, Henriksson & Bremer 2027), licence CC BY-NC 4.0 and an "Open material" row were added 2026-11-27 to the back pages of BOTH the guide and the in-depth material; **`[OSF-DOI]` is a placeholder in both (How to cite + Open material rows, EN and SV) — remind Joel to send the OSF DOI when he has published on OSF.** Keep "Draft" until Joel says otherwise.

New, longer educator guide replacing the draft at `downloads/saving-of-swedovia-educator-guide.pdf`. English first; Swedish translation later when Joel asks. One shared guide with a table of contents and a section per profession (police, rescue services, healthcare, politicians & civil servants). Usable for practitioners, students of those professions and upper secondary (gymnasium) pupils.
Contents: what the game is + how it was developed; research-game note (data used for research, nothing collected that can identify individuals, read the information at the start of the game); players under 18 can play but their data is not saved; teacher as facilitator (guides with suggested follow-up questions, does not give answers); 2-hour session (~45 min play individually or in groups, break, discussion from the results screen per main decision with sub-decisions + questions, closing discussion); shorter variant (play in groups ~60 min, no discussion or discussion later); printable handout with follow-up questions per scenario for small-group discussion; one page of additional material (data explorer, survey results, research on the website); only Joel's email for feedback/questions (joel.martinsson@lnu.se). Skip: learning goals, audience adaptations, curriculum links, psychological safety section, practical checklist.
Dilemmas = adapted versions of the survey dilemmas. Four missions (uppdrag): Police (PS1-6), Healthcare (SV1-6), Rescue services (RT1-6), Politics = politicians + civil servants combined (PT1-6, treat as existing). Game start: meet Professor Ethos at VERITAS -> some background questions (keep vague) -> intro to Swedovia -> choose mission. Under-18s can play, no data saved.

## In-depth material / Fördjupningsmaterial (started 2026-11-27)

Companion PDF to the educator guide: "Fördjupningsmaterial Saving of Swedovia" / "In-depth material". Parts: 1 About the principles, 2 The ten principles, 3 Ethical directives, 4 The profile and Swedish citizens, 5 The principles dilemma by dilemma, back page. Source: Joel's docs SOS_Principer_20261126 + Kodningsschema_Principer_20261126 (all "ÄNDRAS I SPELET" changes treated as done). Built with scratchpad `build_princ.py` (PLANG=sv|en) from `princ_content_sv.json` / `princ_content_en.json`. On the website since 2026-11-27: Education guide card has an "Also available / Finns också" row (`.sos-indepth`) linking `downloads/saving-of-swedovia-in-depth-material.pdf` (EN) and `downloads/saving-of-swedovia-fordjupningsmaterial.pdf` (SV); upload both into One.com `downloads/` at go-live. If the in-depth PDFs are rebuilt, copy them to these paths again.

**Open questions Joel will come back to (do not resolve on your own; remind him):**
- Furudalen (all missions): if the player sent 0, does keeping 0 in the follow-up count Loyalty again, or does the follow-up not count at all? What if the player raises the number after the news? (Text now: follow-up does not count for Responsibility.)
- Police, first dilemma: if the main decision counted as e.g. both Safety and Responsibility and the player keeps the distribution, does only Safety count again? (Text now: "main decision's principle counts again, except Responsibility".)
- Rescue, animals: when the player withdraws, is the principle set aside for all remaining animal groups or one? Is the first run "risk-free" or "almost risk-free"? (Text now: principle for the animals left behind; first run risk-free.)
Answered 2026-11-27: title "Vem ska bäras ut först genom skottlinjen?"; rescue first dilemma 3 units to Djurgården with no other pattern = no principle (intended); healthcare rescue-chief asymmetry intended; cordoned zones requested by police AND rescue services.

## Guide symbols

The educator guide now uses the game's real mission pins and principle icons (sent by Joel 2026-11-25). The Ansvar/Responsibility handshake icon was cut from a screenshot; ask Joel for the original file.

## In-game screens (from Joel, 2026-11-25)

After each dilemma: an evaluation (what the advice led to + which principles were prioritised). Some dilemmas, not all, end with an ethical directive (slider between two principles). Between dilemmas the player can open their profile at any time: agreement with Swedish citizens (Medborgaröverensstämmelse), mission outcome (dead, survivors, injured, unharmed) and meters for the ten principles.

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

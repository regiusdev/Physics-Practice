# Siena Physics Study Hub

A free, no-login study site for our physics class (Giancoli, *Physics*, 7th ed.).
Each unit has four tabs: **Notes**, **Examples**, **Quiz**, and **Problems**, plus a printable **Formula Sheet**.

Plain HTML/CSS/JS. No build step, so it runs straight on GitHub Pages.

## Turning on the website (one time)

1. On GitHub, open the repo → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, then **Save**.
3. After a minute the site is live at `https://regiusdev.github.io/physics-practice/`.

## Files

```
index.html            home page (unit cards)
kinematics-1d.html    unit pages (each one is a thin shell)
kinematics-2d.html
forces.html
formulas.html         formula sheet, built from every unit's formulas
assets/style.css      all styling, including dark mode
assets/app.js         nav, tabs, quiz + problem logic, and the list of units
data/<unit>.js        ALL the content for a unit lives here
```

## Editing content

Open `data/<unit>.js`. Each unit has five lists:

| Field       | What it is |
|-------------|------------|
| `formulas`  | `{ name, tex, note }`, shown on the Notes tab and the Formula Sheet |
| `concepts`  | `{ title, body }`, short summaries (body is HTML) |
| `examples`  | `{ title, problem, steps: [...], answer }`, solution hidden until tapped |
| `quiz`      | `{ question, choices: [...], answer: <index starting at 0>, explain }` |
| `problems`  | `{ question, parts: [{ label, value, unit, tolerance? }], steps: [...] }` |

Math uses LaTeX between `$...$`. **Backslashes must be doubled** in these files: write `\\frac{1}{2}`, not `\frac{1}{2}`.

A problem answer counts as correct if it's within 2% of `value` (set `tolerance: 0.05` on a part for 5%, etc.).
Remove `placeholder: true` from a unit once its content is real, which hides the "Skeleton" banner.

## Adding a new unit

1. Copy `data/forces.js` to `data/<new-id>.js` and change the key `window.UNIT_DATA['<new-id>']`.
2. Copy `forces.html` to `<new-id>.html` and change `data-page`, the `<title>`, and the `data/...js` script.
3. Add the unit to the `UNITS` list at the top of `assets/app.js`.
4. Add its `<script defer src="data/<new-id>.js">` line to `formulas.html`.

## Previewing locally

```
python3 -m http.server
```
Then open http://localhost:8000.

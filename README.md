# Siena Physics Study Hub

A free, no-login study site for our physics class (Giancoli, *Physics*, 7th ed.).
Plain HTML/CSS/JS. No build step, no framework, so it runs straight on GitHub Pages and loads fast on phones.

## What's on it

- **Unit pages** (1D Kinematics, 2D Kinematics & Vectors, Forces), each with four tabs:
  - **Notes**: key formulas, concept summaries with diagrams, interactive simulations, common mistakes
  - **Examples**: worked problems from class, solutions hidden until tapped
  - **Quiz**: 10 random multiple-choice questions per round, explanation after every answer
  - **Problems**: randomized numbers every time; check your answer, get a hint, reveal steps one at a time
- **Test Prep**: pick units → mixed MC + problems, optional timer, graded at the end
- **Formula Sheet**: every unit's formulas on one printable page
- **Units & Sig Figs**: converter, sig-fig counter, calculation rules, quick drill
- **Search** across everything
- **Progress** (quiz bests, solved problems, "unit done" checkmarks) saved in the browser, no accounts
- Dark mode (remembers your choice); respects reduced-motion settings

## Turning on the website (one time)

1. Merge this into `main`.
2. On GitHub: repo → **Settings** → **Pages** → **Source**: *Deploy from a branch*, `main`, `/ (root)` → **Save**.
3. In a minute the site is live at `https://regiusdev.github.io/physics-practice/`.

## Files

```
index.html, kinematics-1d.html, kinematics-2d.html, forces.html,
formulas.html, test.html, tools.html, search.html   thin page shells
assets/style.css      all styling (colors are CSS variables; dark mode swaps them)
assets/app.js         header/nav, dark mode, progress storage, on-demand math loading, unit list
assets/diagrams.js    SVG figures (free-body diagrams, inclines, pulleys, graphs, vectors…)
assets/practice.js    problem cards (answer checking, hints, steps) and quiz cards
assets/unit.js        unit page tabs
assets/sims.js        interactive simulations
assets/test.js        Test Prep
assets/tools.js       converter + sig figs
assets/search.js      search
data/<unit>.js        ALL of a unit's content
docs/CONTENT-GUIDE.md how to write content (formulas, quiz questions, problem templates, figures)
```

## Editing content

Everything for a unit is in `data/<unit>.js`. Read **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)** first:
it shows the exact format for formulas, concepts, mistakes, examples, quiz questions, randomized problem templates and figures.

## Adding a new unit

1. Copy `data/forces.js` to `data/<new-id>.js`, change the key `window.UNIT_DATA['<new-id>']`, replace the content.
2. Copy `forces.html` to `<new-id>.html`; change `data-page`, the `<title>`, and the `data/...js` script.
3. Add the unit to the `UNITS` list at the top of `assets/app.js`.
4. Add `<script defer src="data/<new-id>.js">` to `formulas.html`, `test.html` and `search.html`.

## Previewing locally

```
python3 -m http.server
```
Then open http://localhost:8000.

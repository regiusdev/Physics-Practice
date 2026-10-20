# Content guide

All of a unit's content lives in `data/<unit-id>.js`. The site engine (`assets/app.js`) renders it.
This file is the contract between the two: if you follow it, the page just works.

## File shape

```js
(() => {
  const T = String.raw; // lets you write TeX with single backslashes
  window.UNIT_DATA = window.UNIT_DATA || {};
  window.UNIT_DATA['kinematics-1d'] = {
    summary: 'One sentence shown under the unit title.',
    formulas: [ /* Formula */ ],
    concepts: [ /* Concept */ ],
    sims: ['motion-graphs'],      // ids of interactive simulations (see list below)
    mistakes: [ /* Mistake */ ],
    examples: [ /* Example */ ],
    quiz: [ /* QuizQuestion */ ],
    problems: [ /* ProblemTemplate */ ],
  };
})();
```

## Writing math

- Inline math: `\( ... \)`. Display math: `\[ ... \]`. **Do not use `$`** for math.
- Write strings with the `T` tag so backslashes stay single: ``T`\(v = v_0 + at\)` ``.
  Inside a `T` template you can still interpolate numbers: ``T`\(v_0 = ${f(v0)}\ \text{m/s}\)` ``.
- Units: `\text{m/s}`, `\text{m/s}^2`, `\text{N}`, `\text{kg}`. Put `\ ` (backslash-space) between number and unit.
- Plain HTML is allowed in text fields (`<strong>`, `<em>`, `<br>`, `<ul>`). Keep it light.
- Use g = 9.80 m/s² everywhere (class keys use 9.8/9.80; the 2% answer tolerance also accepts 9.81).

## Formula

```js
{ name: 'Velocity–time', tex: T`v = v_0 + at`, note: 'Constant acceleration only.' }
```
`tex` is TeX **without** delimiters. Shown on the Notes tab and the Formula Sheet.

## Concept

```js
{ title: 'Free fall', body: T`<p>...</p>`, fig: ['graph', {...}] }   // fig optional
```

## Mistake (Common mistakes section)

```js
{ title: 'Mixing up speed and velocity', wrong: 'What people do or think', right: 'What to do instead' }
```

## Example (worked, solution hidden until tapped)

```js
{
  title: 'Jet landing on a carrier',
  source: 'Kinematics Quiz 2',     // optional; shown as a small "From class" tag
  problem: T`...`,
  fig: [...],                      // optional
  steps: [T`...`, T`...`],         // Equation → Substitution (numbers + units) → Answer (with units)
  answer: T`\(a = -31.5\ \text{m/s}^2\)`,
}
```

## QuizQuestion (multiple choice)

```js
{
  q: T`question text`,
  choices: [T`...`, T`...`, T`...`, T`...`],
  answer: 1,                       // index into choices (0-based)
  explain: T`Why the right answer is right.`,           // always shown after answering
  why: { 0: 'Why A is tempting but wrong', 2: '...' },  // optional, shown if they picked that wrong choice
  keepOrder: true,                 // optional: don't shuffle choices (use for "all of the above", A–E numeric ladders, etc.)
  source: 'Forces review test',    // optional
  fig: [...],                      // optional
}
```
Choices are shuffled per attempt unless `keepOrder`. Each quiz attempt draws 10 random questions from the bank.

## ProblemTemplate (randomized numbers)

```js
{
  id: 'drop-from-cliff',           // unique within the unit, kebab-case, never change it (progress is saved by id)
  title: 'Dropped from a cliff',
  gen(r) {
    const h = r.num(20, 80, 0);    // random number 20..80 rounded to 0 decimals
    const t = Math.sqrt(2 * h / r.g);
    const v = r.g * t;
    return {
      question: T`A stone is dropped from rest off a cliff \(${h}\ \text{m}\) high...`,
      fig: [...],                  // optional
      parts: [
        { label: '(a) Time to hit the ground', value: t, unit: 's' },
        { label: '(b) Speed just before impact', value: v, unit: 'm/s' },
      ],
      hint: T`Take down as positive. Which Big 3 equation has \(\Delta y\), \(a\), \(t\) and \(v_0\)?`,
      steps: [
        T`Knowns: \(v_0 = 0\), \(a = g = 9.80\ \text{m/s}^2\), \(\Delta y = ${h}\ \text{m}\).`,
        T`Equation: \(\Delta y = v_0 t + \tfrac12 g t^2\)`,
        T`Substitute: \(${h} = \tfrac12(9.80)t^2 \Rightarrow t = ${r.f(t)}\ \text{s}\)`,
        // ...
      ],
    };
  },
}
```

`r` helpers:

| helper | does |
|---|---|
| `r.num(min, max, decimals)` | random number in [min, max], rounded to `decimals` places |
| `r.int(min, max)` | random integer, inclusive |
| `r.pick(array)` | random element |
| `r.f(x, sf = 3)` | format a number for display to `sf` significant figures (string, e.g. `"3.03"`, `"-31.5"`, `"1.20e4"` style avoided for normal ranges) |
| `r.g` | 9.80 |
| `r.deg(x)` / `r.rad(x)` | degrees ↔ radians |
| `r.sin/cos/tan(deg)` | trig in **degrees** |
| `r.atan(y, x)` | angle in degrees (atan2) |

Part options: `value` is the exact computed number (don't pre-round). Answers within 2% count (`tol: 0.05` for 5%).
Use `whole: true` for counts (e.g. number of bricks) so the answer shows as `7`, not `7.00`. `unit: ''` is fine for unitless answers like μ.
Signs matter by default: if a student types the right size with the wrong sign they're told so. When the question asks
for a magnitude, make `value` positive. Use `sign: 'any'` only when either sign is genuinely acceptable.

Pick ranges so every generated version is physically sensible (no negative times, block actually slides when the
problem says it slides, etc.). If a setup needs a condition, loop inside `gen` until it holds.

## Figures

`fig: [type, params]`. Labels accept `F_N`, `F_{fr}`, `F_{G\parallel}`-style subscripts written as `F_N` / `F_fr`
(underscore = subscript, rest of the word), plus unicode (θ, μ, ·).

| type | params |
|---|---|
| `fbd` | `{ forces: [{ label: 'F_N', angle: 90, mag: 1 }], object: 'box' \| 'dot' }`; angle in degrees CCW from +x; `mag` 0.3–1 (relative arrow length) |
| `incline` | `{ angle: 30, label: '5 kg', show: ['mg', 'N', 'f', 'T', 'F'], friction: 'up' \| 'down', components: true }` |
| `pulley-table` | `{ m1: '10 kg', m2: '63 kg', friction: false }` (m1 on table, m2 hanging) |
| `atwood` | `{ m1: '3 kg', m2: '5 kg' }` |
| `incline-pulley` | `{ angle: 20, m1: '15 kg', m2: '19 kg' }` (m1 on ramp, m2 hanging off the top) |
| `blocks` | `{ labels: ['3 kg', '5 kg'], force: '32 N', from: 'left' \| 'right' }` (boxes touching, pushed) |
| `train` | `{ labels: ['70,000 kg', '50,000 kg', '80,000 kg'], force: '100,000 N' }` (cars linked by couplings, pulled from the right) |
| `elevator` | `{ a: 'up' \| 'down' \| 'none', v: 'up' \| 'down' \| 'none', label: '60 kg' }` |
| `box-force` | `{ angle: 30, label: 'P', mode: 'push' \| 'pull' }`; push = directed down into the box at angle below horizontal, pull = up-and-away |
| `graph` | `{ type: 'x-t' \| 'v-t' \| 'a-t', points: [[t, y], ...] }` or `{ type, fn: t => ..., t: [0, 10] }`; optional `yLabel`, `ticks: true` |
| `vectors` | `{ vectors: [{ x: 3, y: 4, label: 'A', tail: [0, 0], kind: 'a' \| 'b' \| 'r' }], grid: true }`; `kind: 'r'` = resultant style |
| `projectile` | `{ v0: 20, angle: 37, h: 0, components: true }` |
| `river` | `{ across: 4, down: 3, width: '120 m' }` (boat crossing a current) |

## Simulation ids (for `sims`)

- `motion-graphs`: 1D: sliders for x₀, v₀, a; live x–t, v–t, a–t graphs and a moving car.
- `free-fall`: not separate; use motion-graphs presets.
- `projectile`: 2D: v₀, angle, launch height; path, readouts, velocity components.
- `vector-add`: 2D: two vectors by magnitude and angle; tip-to-tail with resultant.
- `friction-push`: Forces: applied force vs friction (static rises to max, then kinetic).
- `incline`: Forces: angle, μs, μk; does it slide, and how fast.

/* ============================================================
   Siena Physics: practice widgets (unit pages + test prep)
   - Practice.makeR(): random-number helpers handed to problem templates
   - Practice.problem(): a randomized problem card (check / hint / steps / new numbers)
   - Practice.question(): a multiple-choice question card
   ============================================================ */
(function () {
  'use strict';

  const { el, shuffle, typeset } = window.SP;
  const D2R = Math.PI / 180;
  const LETTERS = 'ABCDEFGH';

  // ---------- numbers ----------

  // Format to sf significant figures without scientific notation for everyday sizes.
  function fmt(x, sf = 3) {
    if (typeof x !== 'number' || !isFinite(x)) return String(x);
    if (x === 0) return '0';
    let s = x.toPrecision(sf);
    if (s.includes('e')) {
      const abs = Math.abs(x);
      if (abs >= 1e-4 && abs < 1e15) s = String(Number(s));
    }
    return s;
  }

  // Display a part's answer: whole-number answers (counts) stay whole.
  const show = part => (part.whole ? String(Math.round(part.value)) : fmt(part.value));

  function makeR() {
    return {
      g: 9.8,
      num(min, max, dec = 0) {
        const f = Math.pow(10, dec);
        return Math.round((min + Math.random() * (max - min)) * f) / f;
      },
      int(min, max) { return Math.floor(min + Math.random() * (max - min + 1)); },
      pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
      f: fmt,
      deg: x => x / D2R,
      rad: x => x * D2R,
      sin: d => Math.sin(d * D2R),
      cos: d => Math.cos(d * D2R),
      tan: d => Math.tan(d * D2R),
      atan: (y, x) => (x === undefined ? Math.atan(y) : Math.atan2(y, x)) / D2R,
    };
  }

  // Accepts "29.7", "29.7 m/s", "-3", "1.2e4", "1.2 x 10^4", "1,200".
  function parseNum(str) {
    const s = String(str).trim().replace(/,/g, '').replace(/[−–]/g, '-');
    const m = s.match(/^([-+]?(?:\d+\.?\d*|\.\d+))(?:\s*(?:[x×*]\s*10\s*\^\s*([-+]?\d+)|e([-+]?\d+)))?/i);
    if (!m) return NaN;
    let v = parseFloat(m[1]);
    const e = m[2] != null ? m[2] : m[3];
    if (e != null) v *= Math.pow(10, Number(e));
    return v;
  }

  // Common slips, checked when an answer is wrong: [factor, message].
  const SLIPS = [
    [3.6, 'Looks like a km/h vs m/s mix-up (factor of 3.6).'],
    [1 / 3.6, 'Looks like a km/h vs m/s mix-up (factor of 3.6).'],
    [1000, 'Off by 1000: check m vs km or g vs kg.'],
    [0.001, 'Off by 1000: check m vs km or g vs kg.'],
    [100, 'Off by 100: check cm vs m.'],
    [0.01, 'Off by 100: check cm vs m.'],
    [2, 'Off by a factor of 2: missing a ½ (or an extra 2)?'],
    [0.5, 'Off by a factor of 2: missing a 2 (or an extra ½)?'],
    [9.8, 'Off by a factor of g: did you mix up mass (kg) and weight (N)?'],
    [1 / 9.8, 'Off by a factor of g: did you mix up mass (kg) and weight (N)?'],
  ];

  function grade(raw, part) {
    if (!String(raw).trim()) return { status: 'empty', msg: '' };
    const got = parseNum(raw);
    if (Number.isNaN(got)) return { status: 'bad', msg: 'Enter a number (units are optional).' };
    const want = part.value;
    const tol = part.tol != null ? part.tol : 0.02;
    const close = (a, b) => (Math.abs(b) < 1e-9 ? Math.abs(a) <= 0.01 : Math.abs(a - b) <= Math.abs(b) * tol);
    const shown = `${show(part)}${part.unit ? ` ${part.unit}` : ''}`;
    if (close(got, want) || (part.sign === 'any' && close(-got, want))) {
      return { status: 'good', msg: part.whole ? '✓ Correct!' : `✓ Correct! To 3 sig figs: ${shown}` };
    }
    if (close(-got, want)) return { status: 'warn', msg: 'Right size, wrong sign. Check which way is positive.' };
    for (const [f, msg] of SLIPS) {
      if (close(got, want * f)) return { status: 'bad', msg: `✗ ${msg}` };
    }
    return { status: 'bad', msg: '✗ Not quite. Try a hint or the next step.' };
  }

  // ---------- problem card ----------

  function generate(tpl) {
    // Retry a few times in case a template throws on an unlucky draw.
    for (let i = 0; i < 5; i++) {
      try {
        const inst = tpl.gen(makeR());
        if (inst && inst.parts && inst.parts.every(p => isFinite(p.value))) return inst;
      } catch (e) {
        console.error(`Problem "${tpl.id}" failed to generate`, e);
      }
    }
    return null;
  }

  /**
   * opts: { mode: 'practice' | 'test', number, unitLabel, solved, onSolved(id) }
   * returns { node, grade() } (grade is used by test prep)
   */
  function problem(tpl, opts = {}) {
    const mode = opts.mode || 'practice';
    const node = el(`
      <article class="card problem" id="prob-${tpl.id}">
        <div class="problem-head">
          <h3>${opts.number ? `${opts.number}. ` : ''}${tpl.title}</h3>
          <span class="solved-badge"${opts.solved ? '' : ' hidden'}>✓ Solved</span>
        </div>
        ${opts.unitLabel ? `<p class="q-num"><span class="tag green">${opts.unitLabel}</span></p>` : ''}
        <div class="p-body"></div>
      </article>
    `);
    const body = node.querySelector('.p-body');
    let inst = null;
    let parts = [];

    function draw() {
      inst = generate(tpl);
      if (!inst) { body.innerHTML = '<p class="muted">This problem could not be generated. Try another one.</p>'; return; }
      const uid = `${tpl.id}-${Math.random().toString(36).slice(2, 7)}`;
      body.innerHTML = `
        <div class="p-question">${inst.question}</div>
        ${window.Fig ? window.Fig.render(inst.fig) : ''}
        ${inst.parts.map((p, j) => `
          <div class="part">
            <label class="part-label" for="${uid}-${j}">${p.label || 'Answer'}</label>
            <span class="input-row">
              <input id="${uid}-${j}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="Your answer">
              ${p.unit ? `<span class="unit">${p.unit}</span>` : ''}
            </span>
            <span class="feedback" aria-live="polite"></span>
          </div>`).join('')}
        ${mode === 'practice' ? `
          <div class="actions">
            <button class="btn check" type="button">Check</button>
            <button class="btn secondary hint" type="button">Hint</button>
            <button class="btn secondary step" type="button">Show step 1 of ${inst.steps.length}</button>
            <button class="btn ghost new" type="button" title="Same problem, new numbers">↻ New numbers</button>
          </div>` : ''}
        <div class="hint-box" hidden>${inst.hint || 'Start by listing what you know and what you want, then pick the equation that connects them.'}</div>
        <ol class="steps">${inst.steps.map(s => `<li hidden>${s}</li>`).join('')}</ol>
        <div class="answer-box" hidden>${inst.parts.map(p => `${p.label ? `${p.label.replace(/^(\([a-z]\)).*/, '$1')} ` : ''}${show(p)}${p.unit ? ` ${p.unit}` : ''}`).join(' · ')}</div>
      `;
      parts = [...body.querySelectorAll('.part')].map((elm, j) => ({ elm, part: inst.parts[j], input: elm.querySelector('input'), fb: elm.querySelector('.feedback') }));
      if (mode === 'practice') wire();
      typeset(body);
    }

    function checkAll() {
      let correct = 0;
      parts.forEach(({ part, input, fb }) => {
        const res = grade(input.value, part);
        fb.className = `feedback ${res.status === 'empty' ? '' : res.status}`;
        fb.textContent = res.status === 'empty' && mode === 'test' ? 'No answer.' : res.msg;
        if (res.status === 'empty' && mode === 'test') fb.className = 'feedback bad';
        input.classList.toggle('good', res.status === 'good');
        input.classList.toggle('bad', res.status === 'bad' || res.status === 'warn');
        if (res.status === 'good') correct++;
      });
      return correct;
    }

    function revealSolution() {
      body.querySelectorAll('.steps li').forEach(li => { li.hidden = false; });
      body.querySelector('.answer-box').hidden = false;
    }

    function wire() {
      const steps = body.querySelectorAll('.steps li');
      const stepBtn = body.querySelector('.step');
      let shown = 0;

      const check = () => {
        const correct = checkAll();
        if (correct === parts.length && opts.onSolved) {
          opts.onSolved(tpl.id);
          node.querySelector('.solved-badge').hidden = false;
        }
      };
      body.querySelector('.check').addEventListener('click', check);
      parts.forEach(({ input }) => input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); }));

      body.querySelector('.hint').addEventListener('click', e => {
        body.querySelector('.hint-box').hidden = false;
        e.currentTarget.disabled = true;
      });

      stepBtn.addEventListener('click', () => {
        if (shown < steps.length) steps[shown++].hidden = false;
        if (shown >= steps.length) {
          body.querySelector('.answer-box').hidden = false;
          stepBtn.textContent = 'All steps shown';
          stepBtn.disabled = true;
        } else {
          stepBtn.textContent = `Show step ${shown + 1} of ${steps.length}`;
        }
      });

      body.querySelector('.new').addEventListener('click', () => {
        draw();
        const first = body.querySelector('input');
        if (first) first.focus({ preventScroll: true });
      });
    }

    draw();

    return {
      node,
      grade() {
        const correct = checkAll();
        parts.forEach(({ input }) => { input.readOnly = true; });
        revealSolution();
        return { correct, total: parts.length };
      },
    };
  }

  // ---------- multiple-choice card ----------

  /**
   * opts: { mode: 'instant' | 'test', number, total, unitLabel, onAnswer(correct) }
   * returns { node, grade(), answered() }
   */
  function question(q, opts = {}) {
    const mode = opts.mode || 'instant';
    const order = q.keepOrder ? q.choices.map((_, i) => i) : shuffle(q.choices.map((_, i) => i));
    const node = el(`
      <article class="card question">
        <p class="q-num">
          ${opts.number ? `Question ${opts.number}${opts.total ? ` of ${opts.total}` : ''}` : ''}
          ${opts.unitLabel ? `<span class="tag green">${opts.unitLabel}</span>` : ''}
          ${q.source ? `<span class="tag">From class</span>` : ''}
        </p>
        <div class="q-text">${q.q}</div>
        ${window.Fig ? window.Fig.render(q.fig) : ''}
        <div class="choices" role="group">
          ${order.map((orig, i) => `<button class="choice" type="button" data-orig="${orig}"><span class="letter">${LETTERS[i]}</span><span>${q.choices[orig]}</span></button>`).join('')}
        </div>
        <div class="explain" hidden></div>
      </article>
    `);
    const buttons = [...node.querySelectorAll('.choice')];
    const explain = node.querySelector('.explain');
    let picked = null;
    let graded = false;

    function showResult() {
      graded = true;
      buttons.forEach(b => {
        b.disabled = true;
        b.classList.remove('picked');
        const orig = Number(b.dataset.orig);
        if (orig === q.answer) b.classList.add('correct');
        else if (orig === picked) b.classList.add('wrong');
      });
      const ok = picked === q.answer;
      const why = !ok && picked != null && q.why && q.why[picked] ? `<p><strong>Why not that one?</strong> ${q.why[picked]}</p>` : '';
      explain.innerHTML = `
        <span class="verdict ${ok ? 'good' : 'bad'}">${ok ? '✓ Correct!' : picked == null ? 'Not answered.' : '✗ Not quite.'}</span>
        ${why}
        <p>${q.explain || ''}</p>`;
      explain.hidden = false;
      typeset(explain);
      return ok;
    }

    buttons.forEach(b => {
      b.addEventListener('click', () => {
        if (graded) return;
        picked = Number(b.dataset.orig);
        if (mode === 'instant') {
          const ok = showResult();
          if (opts.onAnswer) opts.onAnswer(ok);
        } else {
          buttons.forEach(x => x.classList.toggle('picked', x === b));
        }
      });
    });

    typeset(node);
    return {
      node,
      grade: () => showResult(),
      answered: () => picked != null,
    };
  }

  window.Practice = { makeR, fmt, parseNum, grade, problem, question, generate };
})();

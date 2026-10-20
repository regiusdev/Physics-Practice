/* ============================================================
   Siena Physics: Test Prep
   Builds a mixed practice test from the selected units: multiple
   choice + randomized problems, no hints, graded at the end.
   ============================================================ */
(function () {
  'use strict';

  const { UNITS, el, shuffle, typeset, Progress } = window.SP;
  const main = document.querySelector('main');
  const units = UNITS.filter(u => window.UNIT_DATA[u.id]);
  const settings = { units: units.map(u => u.id), mc: 10, problems: 4, minutes: 0 };
  let timerId = null;

  // Take n items, alternating between units so every selected unit is represented.
  function roundRobin(lists, n) {
    const decks = lists.map(l => shuffle(l)).filter(d => d.length);
    const out = [];
    while (out.length < n && decks.some(d => d.length)) {
      for (const d of decks) {
        if (out.length >= n) break;
        if (d.length) out.push(d.pop());
      }
    }
    return shuffle(out);
  }

  // ---------- setup screen ----------

  function setup() {
    clearInterval(timerId);
    const history = Progress.tests();
    main.innerHTML = `
      <p class="eyebrow">Mixed practice</p>
      <h1>Test Prep</h1>
      <p class="lede">Pick the units your test covers. You'll get a mix of multiple choice and fresh problems with new numbers every time. No hints until you submit, just like the real thing.</p>
      <form class="card setup-grid" id="setup">
        <fieldset style="border:0;padding:0;margin:0">
          <legend class="part-label">Units</legend>
          ${units.map(u => `
            <label class="check-row"><input type="checkbox" name="unit" value="${u.id}" ${settings.units.includes(u.id) ? 'checked' : ''}> ${u.title} <span class="muted small">(${u.chapter})</span></label>`).join('')}
        </fieldset>
        <div class="num-row">
          <label class="part-label" for="mc-count" style="margin:0">Multiple choice</label>
          <select id="mc-count">${[0, 5, 10, 15, 20].map(n => `<option ${n === settings.mc ? 'selected' : ''}>${n}</option>`).join('')}</select>
          <label class="part-label" for="pr-count" style="margin:0">Problems</label>
          <select id="pr-count">${[0, 2, 4, 6, 8].map(n => `<option ${n === settings.problems ? 'selected' : ''}>${n}</option>`).join('')}</select>
        </div>
        <div class="num-row">
          <label class="part-label" for="minutes" style="margin:0">Timer</label>
          <select id="minutes">
            ${[[0, 'No timer'], [15, '15 min'], [30, '30 min'], [45, '45 min'], [60, '60 min']].map(([v, l]) => `<option value="${v}" ${v === settings.minutes ? 'selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
        <p class="feedback bad" id="setup-error" aria-live="polite"></p>
        <div><button class="btn" type="submit">Start test →</button></div>
      </form>
      ${history.length ? `
        <h2>Recent tests on this device</h2>
        <div class="card"><ul class="history">
          ${history.map(h => `<li><span>${new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · ${h.units.map(id => (UNITS.find(u => u.id === id) || {}).short || id).join(', ')}</span><strong>${h.score}/${h.total} (${h.pct}%)</strong></li>`).join('')}
        </ul></div>` : ''}
    `;
    main.querySelector('#setup').addEventListener('submit', e => {
      e.preventDefault();
      settings.units = [...main.querySelectorAll('input[name="unit"]:checked')].map(i => i.value);
      settings.mc = Number(main.querySelector('#mc-count').value);
      settings.problems = Number(main.querySelector('#pr-count').value);
      settings.minutes = Number(main.querySelector('#minutes').value);
      const err = main.querySelector('#setup-error');
      if (!settings.units.length) { err.textContent = 'Pick at least one unit.'; return; }
      if (!settings.mc && !settings.problems) { err.textContent = 'Add some questions or problems.'; return; }
      run();
    });
  }

  // ---------- the test ----------

  function run() {
    const chosen = units.filter(u => settings.units.includes(u.id));
    const tag = (u, item) => ({ unit: u, item });
    const mcs = roundRobin(chosen.map(u => window.UNIT_DATA[u.id].quiz.map(q => tag(u, q))), settings.mc);
    const probs = roundRobin(chosen.map(u => window.UNIT_DATA[u.id].problems.map(p => tag(u, p))), settings.problems);
    const total = mcs.length + probs.length;

    main.innerHTML = `
      <div class="card test-bar">
        <strong>${total} question${total === 1 ? '' : 's'}</strong>
        <span class="timer" aria-live="off"></span>
        <button class="btn small submit-top" type="button">Submit</button>
      </div>
      <div class="result-slot"></div>
      ${mcs.length ? '<h2>Part 1 · Multiple choice</h2><div class="mc-list"></div>' : ''}
      ${probs.length ? `<h2>Part ${mcs.length ? 2 : 1} · Problems</h2><p class="muted">Type numbers only; units are shown. Answers within 2% count.</p><div class="pr-list"></div>` : ''}
      <div class="actions"><button class="btn submit-bottom" type="button">Submit test</button></div>
    `;
    const mcCards = mcs.map((x, i) => {
      const c = window.Practice.question(x.item, { mode: 'test', number: i + 1, total: mcs.length, unitLabel: x.unit.short });
      main.querySelector('.mc-list').append(c.node);
      return { ...x, card: c };
    });
    const prCards = probs.map((x, i) => {
      const c = window.Practice.problem(x.item, { mode: 'test', number: i + 1, unitLabel: x.unit.short });
      main.querySelector('.pr-list').append(c.node);
      return { ...x, card: c };
    });
    window.scrollTo({ top: 0 });

    // timer
    const timerEl = main.querySelector('.timer');
    const start = Date.now();
    const fmtTime = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    let submitted = false;
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      if (settings.minutes) {
        const left = settings.minutes * 60 - elapsed;
        timerEl.textContent = `⏱ ${fmtTime(Math.max(0, left))} left`;
        if (left <= 0) submit(true);
      } else {
        timerEl.textContent = `⏱ ${fmtTime(elapsed)}`;
      }
    };
    tick();
    timerId = setInterval(tick, 1000);

    function submit(timeUp) {
      if (submitted) return;
      const blanks = mcCards.filter(c => !c.card.answered()).length +
        prCards.reduce((n, c) => n + [...c.card.node.querySelectorAll('input')].filter(i => !i.value.trim()).length, 0);
      if (!timeUp && blanks && !confirm(`${blanks} answer${blanks === 1 ? ' is' : 's are'} blank. Submit anyway?`)) return;
      submitted = true;
      clearInterval(timerId);

      // score: 1 point per MC question, 1 point per problem part
      const byUnit = {};
      const bump = (u, got, of) => { byUnit[u.id] = byUnit[u.id] || { u, got: 0, of: 0 }; byUnit[u.id].got += got; byUnit[u.id].of += of; };
      let score = 0, max = 0;
      mcCards.forEach(c => { const ok = c.card.grade() ? 1 : 0; score += ok; max += 1; bump(c.unit, ok, 1); });
      prCards.forEach(c => { const r = c.card.grade(); score += r.correct; max += r.total; bump(c.unit, r.correct, r.total); });
      const pct = Math.round((score / max) * 100);
      Progress.addTest({ date: Date.now(), units: settings.units, score, total: max, pct });

      main.querySelectorAll('.submit-top, .submit-bottom').forEach(b => { b.hidden = true; });
      timerEl.textContent = timeUp ? "Time's up!" : `Finished in ${fmtTime((Date.now() - start) / 1000)}`;
      const slot = main.querySelector('.result-slot');
      slot.innerHTML = `
        <div class="card result">
          <p class="eyebrow">${timeUp ? "Time's up · " : ''}Your score</p>
          <div class="big">${pct}%</div>
          <p>${score} of ${max} points · multiple choice is 1 point each, problems are 1 point per part</p>
          <div class="unit-progress" style="justify-content:center">
            ${Object.values(byUnit).map(b => `<span class="tag ${b.got / b.of >= 0.7 ? 'green' : ''}">${b.u.short}: ${b.got}/${b.of}</span>`).join('')}
          </div>
          <p class="muted small" style="margin-top:10px">Scroll down to see every answer, explanation, and full solution.</p>
          <div class="actions">
            <button class="btn again" type="button">New test, same settings</button>
            <button class="btn secondary change" type="button">Change settings</button>
          </div>
        </div>`;
      slot.querySelector('.again').addEventListener('click', run);
      slot.querySelector('.change').addEventListener('click', setup);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    main.querySelectorAll('.submit-top, .submit-bottom').forEach(b => b.addEventListener('click', () => submit(false)));
  }

  setup();
  typeset(main);
})();

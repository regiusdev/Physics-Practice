/* ============================================================
   Siena Physics: unit pages
   Tabs: Notes · Examples · Quiz · Problems. Each tab renders the
   first time it's opened, so pages load fast.
   ============================================================ */
(function () {
  'use strict';

  const { UNITS, el, shuffle, typeset, Progress } = window.SP;
  const QUIZ_LENGTH = 10;

  const TABS = [
    { id: 'notes', label: 'Notes' },
    { id: 'examples', label: 'Examples' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'problems', label: 'Problems' },
  ];
  // Which tab owns a deep-link id like #ex-2 or #prob-drop-from-cliff.
  const PREFIX = { 'notes-': 'notes', 'ex-': 'examples', 'prob-': 'problems' };

  const unitId = document.body.dataset.page;
  const meta = UNITS.find(u => u.id === unitId);
  const data = window.UNIT_DATA[unitId];
  const main = document.querySelector('main');

  if (!meta || !data) {
    main.innerHTML = '<p>Sorry, this unit could not be loaded.</p>';
    return;
  }

  Progress.update(unitId, p => { p.problemCount = (data.problems || []).length; });

  // ---------- page shell ----------

  main.classList.add('unit');
  main.innerHTML = `
    <header class="unit-head">
      <p class="eyebrow">Giancoli ${meta.chapter}</p>
      <h1>${meta.title}</h1>
      <p class="lede">${data.summary || meta.blurb}</p>
      <div class="unit-progress">
        <span class="tag green" data-stat="quiz" hidden></span>
        <span class="tag" data-stat="solved" hidden></span>
        <label class="done-toggle"><input type="checkbox" id="done-toggle"> Mark unit done</label>
      </div>
    </header>
    <div class="unit-layout">
      <aside class="unit-side">
        <div class="tabs" role="tablist" aria-label="Unit sections">
          ${TABS.map(t => `<button class="tab" type="button" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="false">${t.label}</button>`).join('')}
        </div>
        <nav class="toc" aria-label="On this tab"></nav>
      </aside>
      <div class="unit-main">
        ${TABS.map(t => `<section class="panel" id="panel-${t.id}" role="tabpanel" aria-labelledby="tab-${t.id}" hidden></section>`).join('')}
      </div>
    </div>
  `;
  typeset(main.querySelector('.lede'));

  const toc = main.querySelector('.toc');
  const doneToggle = main.querySelector('#done-toggle');
  doneToggle.checked = Progress.unit(unitId).done;
  doneToggle.addEventListener('change', () => Progress.update(unitId, p => { p.done = doneToggle.checked; }));

  function refreshStats() {
    const p = Progress.unit(unitId);
    const quiz = main.querySelector('[data-stat="quiz"]');
    const solved = main.querySelector('[data-stat="solved"]');
    const n = Object.keys(p.solved).length;
    quiz.hidden = p.quizBest == null;
    quiz.textContent = `Quiz best ${p.quizBest}%`;
    solved.hidden = !n;
    solved.textContent = `${n} / ${data.problems.length} problems solved`;
  }
  refreshStats();

  // ---------- tabs ----------

  const rendered = {};
  const tocItems = {};
  const RENDER = { notes: renderNotes, examples: renderExamples, quiz: renderQuiz, problems: renderProblems };

  function select(id, opts = {}) {
    TABS.forEach(t => {
      const on = t.id === id;
      main.querySelector(`#tab-${t.id}`).setAttribute('aria-selected', String(on));
      main.querySelector(`#panel-${t.id}`).hidden = !on;
    });
    const panel = main.querySelector(`#panel-${id}`);
    if (!rendered[id]) {
      rendered[id] = true;
      tocItems[id] = RENDER[id](panel) || [];
    }
    toc.innerHTML = tocItems[id].map(i => `<a href="#${i.id}">${i.label}</a>`).join('');
    typeset(toc);
    if (opts.updateHash) history.replaceState(null, '', `#${id}`);
    if (opts.scrollTop) {
      const top = main.querySelector('.unit-layout').getBoundingClientRect().top + window.scrollY - 70;
      if (window.scrollY > top) window.scrollTo({ top });
    }
  }

  main.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => select(btn.id.slice(4), { updateHash: true, scrollTop: true }));
  });

  // TOC / jump links: scroll inside the current tab without changing the tab hash.
  main.addEventListener('click', e => {
    const a = e.target.closest('.toc a, .jump a');
    if (!a) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function openFromHash() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (TABS.some(t => t.id === hash)) { select(hash); return; }
    const prefix = Object.keys(PREFIX).find(p => hash.startsWith(p));
    if (!prefix) { select('notes'); return; }
    select(PREFIX[prefix]);
    const target = document.getElementById(hash);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
      if (target.tagName === 'DETAILS') target.open = true;
      const details = target.querySelector('details');
      if (details) details.open = true;
    }
  }

  // ---------- Notes ----------

  function renderNotes(panel) {
    const items = [{ id: 'notes-formulas', label: 'Key formulas' }, { id: 'notes-concepts', label: 'Concepts' }];
    if (data.sims && data.sims.length && window.Sims) items.push({ id: 'notes-sims', label: 'Try it: simulations' });
    if (data.mistakes && data.mistakes.length) items.push({ id: 'notes-mistakes', label: 'Common mistakes' });

    panel.innerHTML = `
      <nav class="jump" aria-label="Jump to">${items.map(i => `<a href="#${i.id}">${i.label}</a>`).join('')}</nav>
      <h2 id="notes-formulas">Key formulas</h2>
      <div class="formula-list">
        ${data.formulas.map(f => `
          <div class="card formula">
            <p class="name">${f.name}</p>
            \\[${f.tex}\\]
            ${f.note ? `<p class="note">${f.note}</p>` : ''}
          </div>`).join('')}
      </div>
      <h2 id="notes-concepts">Concepts</h2>
      ${data.concepts.map((c, i) => `
        <div class="card concept" id="notes-c${i + 1}">
          <h3>${c.title}</h3>
          ${c.body}
          ${window.Fig ? window.Fig.render(c.fig) : ''}
        </div>`).join('')}
      ${items.some(i => i.id === 'notes-sims') ? `<h2 id="notes-sims">Try it: simulations</h2><div class="sims"></div>` : ''}
      ${data.mistakes && data.mistakes.length ? `
        <h2 id="notes-mistakes">Common mistakes</h2>
        <p class="muted">These cost people points on every test.</p>
        ${data.mistakes.map(m => `
          <div class="card mistake">
            <h3>${m.title}</h3>
            <div class="wrong"><p>${m.wrong}</p></div>
            <div class="right"><p>${m.right}</p></div>
          </div>`).join('')}` : ''}
    `;
    const simWrap = panel.querySelector('.sims');
    if (simWrap) data.sims.forEach(id => window.Sims.mount(id, simWrap));
    typeset(panel);
    return items;
  }

  // ---------- Examples ----------

  function renderExamples(panel) {
    panel.innerHTML = `
      <p class="lede">Try each one on paper first, then open the solution and compare step by step.</p>
      ${data.examples.map((ex, i) => `
        <article class="card example" id="ex-${i + 1}">
          <p class="q-num">Example ${i + 1}${ex.source ? ` <span class="tag">From class: ${ex.source}</span>` : ''}</p>
          <h3>${ex.title}</h3>
          <div>${ex.problem}</div>
          ${window.Fig ? window.Fig.render(ex.fig) : ''}
          <details>
            <summary>Show solution</summary>
            <ol class="steps">${ex.steps.map(s => `<li>${s}</li>`).join('')}</ol>
            <div class="answer-box">${ex.answer}</div>
          </details>
        </article>`).join('')}
    `;
    typeset(panel);
    return data.examples.map((ex, i) => ({ id: `ex-${i + 1}`, label: ex.title }));
  }

  // ---------- Quiz ----------

  function renderQuiz(panel) {
    let deck, idx, correct, missed;

    function start() {
      deck = shuffle(data.quiz).slice(0, Math.min(QUIZ_LENGTH, data.quiz.length));
      idx = 0;
      correct = 0;
      missed = [];
      next();
    }

    function next() {
      if (idx >= deck.length) return finish();
      const q = deck[idx];
      panel.innerHTML = `
        <div class="quiz-top">
          <strong>Question ${idx + 1} of ${deck.length}</strong>
          <span class="muted">${correct} correct</span>
        </div>
        <div class="meter" aria-hidden="true"><span style="width:${(idx / deck.length) * 100}%"></span></div>
        <div class="q-slot"></div>
        <div class="actions" hidden><button class="btn next-q" type="button">${idx + 1 < deck.length ? 'Next question →' : 'See results'}</button></div>
      `;
      const card = window.Practice.question(q, {
        mode: 'instant',
        onAnswer(ok) {
          if (ok) correct++;
          else missed.push(q);
          panel.querySelector('.quiz-top .muted').textContent = `${correct} correct`;
          const actions = panel.querySelector('.actions');
          actions.hidden = false;
          actions.querySelector('button').focus({ preventScroll: true });
        },
      });
      panel.querySelector('.q-slot').append(card.node);
      panel.querySelector('.next-q').addEventListener('click', () => {
        idx++;
        next();
        const top = panel.getBoundingClientRect().top + window.scrollY - 140;
        if (window.scrollY > top) window.scrollTo({ top });
      });
    }

    function finish() {
      const pct = Math.round((correct / deck.length) * 100);
      let best;
      Progress.update(unitId, p => {
        p.quizRuns = (p.quizRuns || 0) + 1;
        p.quizBest = Math.max(p.quizBest || 0, pct);
        best = p.quizBest;
      });
      refreshStats();
      const msg = pct >= 90 ? 'Excellent. You know this.' : pct >= 70 ? 'Solid! Review the ones you missed.' : 'Keep going. Read the explanations below, then try a fresh quiz.';
      panel.innerHTML = `
        <div class="card result">
          <p class="eyebrow">Quiz complete</p>
          <div class="big">${correct} / ${deck.length}</div>
          <p>${msg}</p>
          <p class="muted small">Best on this device: ${best}%</p>
          <div class="actions"><button class="btn again" type="button">New quiz (different questions)</button></div>
        </div>
        ${missed.length ? '<h2>Review what you missed</h2><div class="missed"></div>' : ''}
      `;
      panel.querySelector('.again').addEventListener('click', start);
      const wrap = panel.querySelector('.missed');
      missed.forEach(q => {
        const card = window.Practice.question(q, { mode: 'test' });
        card.grade();
        wrap.append(card.node);
      });
    }

    start();
    return [];
  }

  // ---------- Problems ----------

  function renderProblems(panel) {
    const solved = Progress.unit(unitId).solved;
    panel.innerHTML = `
      <div class="problems-top">
        <p class="muted" style="margin:0">Numbers change every time you hit <strong>↻ New numbers</strong>, so you can practice forever. Answers within 2% count.</p>
        <button class="btn gold small random" type="button">Random problem</button>
      </div>
      <div class="problem-list"></div>
    `;
    const list = panel.querySelector('.problem-list');
    data.problems.forEach((tpl, i) => {
      const card = window.Practice.problem(tpl, {
        number: i + 1,
        solved: !!solved[tpl.id],
        onSolved(id) {
          Progress.update(unitId, p => { p.solved[id] = true; });
          refreshStats();
        },
      });
      list.append(card.node);
    });
    panel.querySelector('.random').addEventListener('click', () => {
      const s = Progress.unit(unitId).solved;
      const pool = data.problems.filter(t => !s[t.id]);
      const tpl = (pool.length ? pool : data.problems)[Math.floor(Math.random() * (pool.length || data.problems.length))];
      const target = document.getElementById(`prob-${tpl.id}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const input = target.querySelector('input');
      if (input) setTimeout(() => input.focus({ preventScroll: true }), 400);
    });
    return data.problems.map((t, i) => ({ id: `prob-${t.id}`, label: `${i + 1}. ${t.title}` }));
  }

  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();

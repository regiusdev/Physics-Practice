/* ============================================================
   Siena Physics — shared page logic
   - builds the header/nav on every page
   - dark mode toggle
   - renders unit pages (Notes / Examples / Quiz / Problems)
     from the data files in /data
   - renders the home page and the formula sheet
   ============================================================ */
(function () {
  'use strict';

  // The list of units. Add a new unit here AND create its data file + page.
  const UNITS = [
    {
      id: 'kinematics-1d',
      href: 'kinematics-1d.html',
      title: '1D Kinematics',
      chapter: 'Chapter 2',
      blurb: 'Displacement, velocity, acceleration, and free fall in a straight line.',
    },
    {
      id: 'kinematics-2d',
      href: 'kinematics-2d.html',
      title: '2D Kinematics & Vectors',
      chapter: 'Chapter 3',
      blurb: 'Vector components, adding vectors, and projectile motion.',
    },
    {
      id: 'forces',
      href: 'forces.html',
      title: "Forces & Newton's Laws",
      chapter: 'Chapter 4',
      blurb: "Newton's three laws, free-body diagrams, friction, and inclines.",
    },
  ];

  const TABS = [
    { id: 'notes', label: 'Notes' },
    { id: 'examples', label: 'Examples' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'problems', label: 'Problems' },
  ];

  // Unit data files register themselves here.
  window.UNIT_DATA = window.UNIT_DATA || {};

  // ---------- helpers ----------

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  // Render $...$ and $$...$$ with KaTeX (if it loaded).
  function typeset(node) {
    if (typeof window.renderMathInElement !== 'function') return;
    window.renderMathInElement(node, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });
  }

  const LETTERS = 'ABCDEFGH';

  // ---------- theme ----------

  function currentTheme() {
    const set = document.documentElement.dataset.theme;
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
  }

  // ---------- header / nav ----------

  function renderHeader(page) {
    const links = [
      { id: 'home', href: 'index.html', label: 'Home' },
      ...UNITS.map(u => ({ id: u.id, href: u.href, label: u.title })),
      { id: 'formulas', href: 'formulas.html', label: 'Formula Sheet' },
    ];

    const header = el(`
      <header class="site-header">
        <div class="bar">
          <a class="brand" href="index.html">Siena Physics</a>
          <button class="icon-btn theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>
          </button>
          <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        <nav id="site-nav" class="site-nav" aria-label="Main">
          ${links.map(l => `<a href="${l.href}"${l.id === page ? ' aria-current="page"' : ''}>${l.label}</a>`).join('')}
        </nav>
      </header>
    `);

    header.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

    const menuBtn = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.site-nav');
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    document.body.prepend(header);

    // Let sticky elements (the unit tabs) sit just below the header, whatever its height.
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    };
    setHeaderHeight();
    if ('ResizeObserver' in window) new ResizeObserver(setHeaderHeight).observe(header);
    document.body.append(el(`<footer class="site-footer">Made for Siena physics · Giancoli, <em>Physics</em> 7th ed.</footer>`));
  }

  // ---------- home ----------

  function renderHome(main) {
    const grid = main.querySelector('#unit-grid');
    UNITS.forEach(u => {
      grid.append(el(`
        <a class="card unit-card" href="${u.href}">
          <p class="eyebrow">${u.chapter}</p>
          <h3>${u.title}</h3>
          <p>${u.blurb}</p>
        </a>
      `));
    });
    grid.append(el(`
      <a class="card unit-card" href="formulas.html">
        <p class="eyebrow">All units</p>
        <h3>Formula Sheet</h3>
        <p>Every key equation on one page. Printable.</p>
      </a>
    `));
  }

  // ---------- formula sheet ----------

  function renderFormulaSheet(main) {
    const wrap = main.querySelector('#sheet');
    UNITS.forEach(u => {
      const data = window.UNIT_DATA[u.id];
      if (!data) return;
      const rows = data.formulas.map(f => `
        <tr>
          <td>${f.name}${f.note ? `<span class="note">${f.note}</span>` : ''}</td>
          <td>$${f.tex}$</td>
        </tr>`).join('');
      wrap.append(el(`
        <section class="sheet-section">
          <h2><a href="${u.href}">${u.title}</a> <span class="eyebrow">${u.chapter}</span></h2>
          <table class="sheet-table"><tbody>${rows}</tbody></table>
        </section>
      `));
    });
    typeset(main);
  }

  // ---------- unit page ----------

  function renderUnit(main, unitId) {
    const meta = UNITS.find(u => u.id === unitId);
    const data = window.UNIT_DATA[unitId];
    if (!meta || !data) {
      main.innerHTML = '<p>Unit not found.</p>';
      return;
    }
    document.title = `${meta.title} · Siena Physics`;

    main.innerHTML = `
      <p class="eyebrow">Giancoli ${meta.chapter}</p>
      <h1>${meta.title}</h1>
      <p class="lede">${data.summary || meta.blurb}</p>
      <div class="tabs" role="tablist" aria-label="Unit sections">
        ${TABS.map(t => `<button class="tab" type="button" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="false">${t.label}</button>`).join('')}
      </div>
      ${TABS.map(t => `<section class="panel" id="panel-${t.id}" role="tabpanel" aria-labelledby="tab-${t.id}" hidden></section>`).join('')}
    `;

    renderNotes(main.querySelector('#panel-notes'), data);
    renderExamples(main.querySelector('#panel-examples'), data);
    renderQuiz(main.querySelector('#panel-quiz'), data);
    renderProblems(main.querySelector('#panel-problems'), data);
    typeset(main);

    // Tab switching; the URL hash (e.g. #quiz) remembers the open tab.
    function select(id, updateHash) {
      TABS.forEach(t => {
        const on = t.id === id;
        main.querySelector(`#tab-${t.id}`).setAttribute('aria-selected', String(on));
        main.querySelector(`#panel-${t.id}`).hidden = !on;
      });
      if (updateHash) history.replaceState(null, '', `#${id}`);
    }
    main.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => select(btn.id.replace('tab-', ''), true));
    });
    const fromHash = location.hash.slice(1);
    select(TABS.some(t => t.id === fromHash) ? fromHash : 'notes', false);
  }

  function placeholder(data) {
    return data.placeholder
      ? `<div class="placeholder-note">Skeleton: the content below is sample material and will be replaced with notes and problems from class.</div>`
      : '';
  }

  function renderNotes(panel, data) {
    panel.innerHTML = `
      ${placeholder(data)}
      <h2>Key formulas</h2>
      <div class="formula-list">
        ${data.formulas.map(f => `
          <div class="card formula">
            <p class="name">${f.name}</p>
            $$${f.tex}$$
            ${f.note ? `<p class="note">${f.note}</p>` : ''}
          </div>`).join('')}
      </div>
      <h2>Concepts</h2>
      ${data.concepts.map(c => `
        <div class="card concept">
          <h3>${c.title}</h3>
          ${c.body}
        </div>`).join('')}
    `;
  }

  function renderExamples(panel, data) {
    panel.innerHTML = `
      ${placeholder(data)}
      <p class="lede">Try each one yourself first, then tap to check the solution.</p>
      ${data.examples.map((ex, i) => `
        <div class="card example">
          <p class="q-num">Example ${i + 1}${ex.title ? ` · ${ex.title}` : ''}</p>
          <p>${ex.problem}</p>
          <details>
            <summary>Show solution</summary>
            <ol class="steps">${ex.steps.map(s => `<li>${s}</li>`).join('')}</ol>
            <div class="answer">${ex.answer}</div>
          </details>
        </div>`).join('')}
    `;
  }

  function renderQuiz(panel, data) {
    const total = data.quiz.length;
    panel.innerHTML = `
      ${placeholder(data)}
      <div class="quiz-bar">
        <span class="score" aria-live="polite">0 / ${total} correct</span>
        <button class="btn ghost reset" type="button">Start over</button>
      </div>
      <ol class="question-list">
        ${data.quiz.map((q, i) => `
          <li class="card question" data-answer="${q.answer}">
            <p class="q-num">Question ${i + 1} of ${total}</p>
            <p>${q.question}</p>
            <div class="choices">
              ${q.choices.map((c, j) => `<button class="choice" type="button" data-index="${j}"><strong>${LETTERS[j]}.</strong> ${c}</button>`).join('')}
            </div>
            <div class="explain" hidden>${q.explain || ''}</div>
          </li>`).join('')}
      </ol>
    `;

    const scoreEl = panel.querySelector('.score');
    let correct = 0;

    panel.querySelectorAll('.question').forEach(qEl => {
      const answer = Number(qEl.dataset.answer);
      const buttons = qEl.querySelectorAll('.choice');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const picked = Number(btn.dataset.index);
          buttons.forEach(b => { b.disabled = true; });
          buttons[answer].classList.add('correct');
          if (picked === answer) {
            correct++;
          } else {
            btn.classList.add('wrong');
          }
          qEl.querySelector('.explain').hidden = false;
          scoreEl.textContent = `${correct} / ${total} correct`;
        });
      });
    });

    panel.querySelector('.reset').addEventListener('click', () => {
      correct = 0;
      scoreEl.textContent = `0 / ${total} correct`;
      panel.querySelectorAll('.choice').forEach(b => {
        b.disabled = false;
        b.classList.remove('correct', 'wrong');
      });
      panel.querySelectorAll('.explain').forEach(e => { e.hidden = true; });
    });
  }

  // Pull the first number out of what someone typed ("29.7 m/s" -> 29.7).
  function parseNumber(str) {
    const m = String(str).replace(/,/g, '').replace(/−/g, '-').match(/[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?/i);
    return m ? parseFloat(m[0]) : NaN;
  }

  function isClose(got, want, tol) {
    if (want === 0) return Math.abs(got) <= 0.01;
    return Math.abs(got - want) <= Math.abs(want) * tol;
  }

  function renderProblems(panel, data) {
    panel.innerHTML = `
      ${placeholder(data)}
      <p class="lede">Type your answer (numbers only, units are shown). Answers within about 2% count, so rounding is fine. Stuck? Reveal one step at a time.</p>
      <ol class="question-list">
        ${data.problems.map((p, i) => `
          <li class="card problem">
            <p class="q-num">Problem ${i + 1}</p>
            <p>${p.question}</p>
            ${p.parts.map((part, j) => `
              <div class="part" data-value="${part.value}" data-tol="${part.tolerance ?? 0.02}">
                <label class="part-label" for="p${i}-${j}">${part.label}</label>
                <span class="input-row">
                  <input id="p${i}-${j}" type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer">
                  ${part.unit ? `<span class="unit">${part.unit}</span>` : ''}
                </span>
                <span class="feedback" aria-live="polite"></span>
              </div>`).join('')}
            <div class="actions">
              <button class="btn check" type="button">Check</button>
              <button class="btn secondary step" type="button">Show step 1 of ${p.steps.length}</button>
              <button class="btn ghost reset" type="button">Reset</button>
            </div>
            <ol class="steps">${p.steps.map(s => `<li hidden>${s}</li>`).join('')}</ol>
          </li>`).join('')}
      </ol>
    `;

    panel.querySelectorAll('.problem').forEach(pEl => {
      const parts = pEl.querySelectorAll('.part');
      const steps = pEl.querySelectorAll('.steps li');
      const stepBtn = pEl.querySelector('.step');
      let shown = 0;

      function check() {
        parts.forEach(part => {
          const fb = part.querySelector('.feedback');
          const raw = part.querySelector('input').value.trim();
          fb.className = 'feedback';
          if (!raw) { fb.textContent = ''; return; }
          const got = parseNumber(raw);
          if (Number.isNaN(got)) {
            fb.textContent = 'Enter a number.';
            fb.classList.add('bad');
          } else if (isClose(got, Number(part.dataset.value), Number(part.dataset.tol))) {
            fb.textContent = '✓ Correct!';
            fb.classList.add('good');
          } else {
            fb.textContent = '✗ Not quite. Check your signs and units, or reveal a step.';
            fb.classList.add('bad');
          }
        });
      }

      pEl.querySelector('.check').addEventListener('click', check);
      parts.forEach(part => {
        part.querySelector('input').addEventListener('keydown', e => {
          if (e.key === 'Enter') check();
        });
      });

      stepBtn.addEventListener('click', () => {
        if (shown >= steps.length) return;
        steps[shown].hidden = false;
        shown++;
        if (shown >= steps.length) {
          stepBtn.textContent = 'All steps shown';
          stepBtn.disabled = true;
        } else {
          stepBtn.textContent = `Show step ${shown + 1} of ${steps.length}`;
        }
      });

      pEl.querySelector('.reset').addEventListener('click', () => {
        shown = 0;
        steps.forEach(s => { s.hidden = true; });
        stepBtn.disabled = false;
        stepBtn.textContent = `Show step 1 of ${steps.length}`;
        parts.forEach(part => {
          part.querySelector('input').value = '';
          const fb = part.querySelector('.feedback');
          fb.textContent = '';
          fb.className = 'feedback';
        });
      });
    });
  }

  // ---------- boot ----------

  const page = document.body.dataset.page;
  const main = document.querySelector('main');
  renderHeader(page);

  if (page === 'home') renderHome(main);
  else if (page === 'formulas') renderFormulaSheet(main);
  else renderUnit(main, page);
})();

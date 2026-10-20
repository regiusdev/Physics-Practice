/* ============================================================
   Siena Physics: core (loaded on every page)
   - unit registry, header/nav/footer, dark mode
   - progress saved in localStorage
   - KaTeX loaded on demand the first time a page shows math
   - home page + formula sheet rendering
   Exposes window.SP for the page scripts.
   ============================================================ */
(function () {
  'use strict';

  // The list of units. Add a new unit here AND create its data file + page.
  const UNITS = [
    {
      id: 'kinematics-1d',
      href: 'kinematics-1d.html',
      title: '1D Kinematics',
      short: '1D Motion',
      chapter: 'Chapter 2',
      num: '2',
      blurb: 'Displacement, velocity, acceleration, the Big 3, and free fall.',
    },
    {
      id: 'kinematics-2d',
      href: 'kinematics-2d.html',
      title: '2D Kinematics & Vectors',
      short: '2D Motion',
      chapter: 'Chapter 3',
      num: '3',
      blurb: 'Vector components, relative velocity, and projectile motion.',
    },
    {
      id: 'forces',
      href: 'forces.html',
      title: "Forces & Newton's Laws",
      short: 'Forces',
      chapter: 'Chapter 4',
      num: '4',
      blurb: 'Free-body diagrams, friction, inclines, tension, and elevators.',
    },
  ];

  const PAGES = [
    { id: 'formulas', href: 'formulas.html', title: 'Formula Sheet', short: 'Formulas' },
    { id: 'test', href: 'test.html', title: 'Test Prep', short: 'Test Prep' },
    { id: 'tools', href: 'tools.html', title: 'Units & Sig Figs', short: 'Tools' },
  ];

  window.UNIT_DATA = window.UNIT_DATA || {};

  // ---------- small helpers ----------

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- math (KaTeX, loaded only when needed) ----------

  const KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/';
  const mathQueue = [];
  let mathState = 'idle';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.append(s);
    });
  }

  function loadCss(href) {
    return new Promise(resolve => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      l.onload = resolve;
      l.onerror = resolve;
      document.head.append(l);
    });
  }

  function renderMath(node) {
    window.renderMathInElement(node, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
      ],
      throwOnError: false,
    });
  }

  function typeset(node) {
    if (!node) return;
    if (mathState === 'ready') { renderMath(node); return; }
    mathQueue.push(node);
    if (mathState !== 'idle') return;
    mathState = 'loading';
    Promise.all([
      loadCss(KATEX + 'katex.min.css'),
      loadScript(KATEX + 'katex.min.js').then(() => loadScript(KATEX + 'contrib/auto-render.min.js')),
    ]).then(() => {
      mathState = 'ready';
      mathQueue.splice(0).forEach(renderMath);
    }).catch(() => { mathState = 'failed'; });
  }

  // ---------- progress (this device only) ----------

  const KEY = 'sp-progress-v1';
  let progress = null;

  function loadProgress() {
    if (progress) return progress;
    try { progress = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { progress = {}; }
    progress.units = progress.units || {};
    progress.tests = progress.tests || [];
    return progress;
  }

  function saveProgress() {
    try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) { /* storage blocked */ }
  }

  const Progress = {
    unit(id) {
      const p = loadProgress();
      p.units[id] = p.units[id] || { done: false, quizBest: null, quizRuns: 0, solved: {}, problemCount: 0 };
      return p.units[id];
    },
    update(id, fn) {
      fn(this.unit(id));
      saveProgress();
    },
    tests() { return loadProgress().tests; },
    addTest(entry) {
      const p = loadProgress();
      p.tests.unshift(entry);
      p.tests = p.tests.slice(0, 10);
      saveProgress();
    },
    reset() {
      progress = { units: {}, tests: [] };
      saveProgress();
    },
  };

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

  // ---------- header / footer ----------

  const ICONS = {
    logo: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke="#c8961f" stroke-width="2"/><path d="M6 25 Q16 -1 26 25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="0.01 4.4"/><circle cx="16" cy="12" r="3.2" fill="#c8961f"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  };

  function renderHeader(page) {
    const link = (p, label) => `<li><a href="${p.href}"${p.id === page ? ' aria-current="page"' : ''}>${label}</a></li>`;
    const header = el(`
      <header class="site-header">
        <div class="bar">
          <a class="brand" href="index.html">${ICONS.logo}<span>Siena Physics</span></a>
          <nav id="site-nav" class="site-nav inline" aria-label="Main">
            <ul>
              ${link({ id: 'home', href: 'index.html' }, 'Home')}
              <li class="nav-group">Units</li>
              ${UNITS.map(u => link(u, `<span class="full">${u.title}</span>`)).join('')}
              <li class="nav-group">Study</li>
              ${PAGES.map(p => link(p, p.title)).join('')}
            </ul>
          </nav>
          <a class="icon-btn" href="search.html" aria-label="Search" title="Search">${ICONS.search}</a>
          <button class="icon-btn theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">${ICONS.theme}</button>
          <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav-mobile">${ICONS.menu}</button>
        </div>
      </header>
    `);

    // On desktop the nav sits inline in the bar using short labels; on phones it drops down full-width.
    const inlineNav = header.querySelector('.site-nav');
    const mobileNav = inlineNav.cloneNode(true);
    mobileNav.id = 'site-nav-mobile';
    mobileNav.classList.remove('inline');
    header.append(mobileNav);
    inlineNav.querySelectorAll('a').forEach(a => {
      const match = [...UNITS, ...PAGES].find(x => x.href === a.getAttribute('href'));
      if (match) a.textContent = match.short;
    });
    const wide = window.matchMedia('(min-width: 1000px)');
    const syncNav = () => { inlineNav.hidden = !wide.matches; mobileNav.hidden = wide.matches; };
    syncNav();
    wide.addEventListener('change', syncNav);

    header.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    const menuBtn = header.querySelector('.menu-toggle');
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    document.body.prepend(header);
    document.body.append(el(`
      <footer class="site-footer">
        Made for Siena physics · Giancoli, <em>Physics</em> 7th ed.<br>
        Progress is saved on this device only. No accounts, no tracking.
      </footer>
    `));

    // Sticky elements sit just below the header, whatever its height.
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${header.querySelector('.bar').offsetHeight}px`);
    };
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight, { passive: true });
  }

  // ---------- home ----------

  function renderHome(main) {
    const grid = main.querySelector('#unit-grid');
    UNITS.forEach(u => {
      const p = Progress.unit(u.id);
      const solved = Object.keys(p.solved).length;
      const stats = [];
      if (p.quizBest != null) stats.push(`<span class="tag green">Quiz best ${p.quizBest}%</span>`);
      if (solved) stats.push(`<span class="tag">${solved}${p.problemCount ? ` / ${p.problemCount}` : ''} problems solved</span>`);
      grid.append(el(`
        <a class="card unit-card" href="${u.href}">
          <span class="num" aria-hidden="true">${u.num}</span>
          <span>
            <p class="eyebrow">${u.chapter}</p>
            <h3>${u.title}</h3>
            <p>${u.blurb}</p>
            ${stats.length ? `<span class="stats">${stats.join('')}</span>` : ''}
          </span>
          ${p.done ? '<span class="check" title="Marked done" aria-label="Marked done">✓</span>' : ''}
        </a>
      `));
    });

    const reset = main.querySelector('#reset-progress');
    if (reset) {
      reset.addEventListener('click', () => {
        if (confirm('Clear all saved quiz scores, solved problems and checkmarks on this device?')) {
          Progress.reset();
          location.reload();
        }
      });
    }
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
          <td>\\(${f.tex}\\)</td>
        </tr>`).join('');
      wrap.append(el(`
        <section class="sheet-section">
          <h2><a href="${u.href}">${u.title}</a> <span class="tag">${u.chapter}</span></h2>
          <table class="sheet-table"><tbody>${rows}</tbody></table>
        </section>
      `));
    });
    typeset(main);
  }

  // ---------- boot ----------

  window.SP = { UNITS, PAGES, el, esc, shuffle, typeset, Progress };

  const page = document.body.dataset.page;
  const main = document.querySelector('main');
  renderHeader(page);
  if (page === 'home') renderHome(main);
  if (page === 'formulas') renderFormulaSheet(main);
})();

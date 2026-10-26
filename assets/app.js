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
    {
      id: 'statics',
      href: 'statics.html',
      title: 'Torque & Statics',
      short: 'Statics',
      chapter: 'Chapter 9',
      num: '9',
      blurb: 'Torque and lever arms, center of mass, and beams, ladders and arms in balance.',
    },
    {
      id: 'circular',
      href: 'circular.html',
      title: 'Circular Motion & Gravity',
      short: 'Circular',
      chapter: 'Chapter 5',
      num: '5',
      blurb: "Centripetal force, curves and loops, Newton's gravitation, orbits and Kepler.",
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

  // ---------- themes ----------

  // Colors live in style.css; this list drives the picker. base = which neutral palette to use.
  const THEMES = [
    { id: 'siena', name: 'Siena', base: 'light', bg: '#f6f5ef', panel: '#ffffff', accent: '#0f6a4a' },
    { id: 'siena-night', name: 'Siena Night', base: 'dark', bg: '#0b100e', panel: '#111815', accent: '#4fc28e' },
    { id: 'dark', name: 'Dark', base: 'dark', bg: '#0b0c0f', panel: '#121418', accent: '#5b6cff' },
    { id: 'light', name: 'Light', base: 'light', bg: '#f6f7f9', panel: '#ffffff', accent: '#4f5dff' },
    { id: 'dusk', name: 'Dusk', base: 'dark', bg: '#11121f', panel: '#171829', accent: '#6d7dff' },
    { id: 'astro', name: 'Astro', base: 'dark', bg: '#0d0a16', panel: '#140f20', accent: '#8b5cf6' },
    { id: 'neo', name: 'Neo', base: 'dark', bg: '#0a0d0b', panel: '#101411', accent: '#52d68a' },
    { id: 'crimson', name: 'Crimson', base: 'dark', bg: '#090909', panel: '#111111', accent: '#ff3b3b' },
    { id: 'stealth', name: 'Stealth Blue', base: 'dark', bg: '#05070a', panel: '#0b0f14', accent: '#00e1ff' },
    { id: 'orange', name: 'Orange', base: 'dark', bg: '#0c0b09', panel: '#13110e', accent: '#ff9f1c' },
    { id: 'nord', name: 'Nord', base: 'dark', bg: '#2e3440', panel: '#3b4252', accent: '#88c0d0' },
  ];

  function applyTheme(id) {
    const t = THEMES.find(x => x.id === id) || THEMES[0];
    const root = document.documentElement;
    root.dataset.theme = t.id;
    root.dataset.base = t.base;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t.bg;
    try {
      localStorage.setItem('theme', t.id);
      localStorage.setItem('theme-base', t.base);
    } catch (e) { /* storage blocked */ }
  }

  function themePanel(button) {
    const panel = el(`
      <div class="theme-panel" id="theme-panel" role="dialog" aria-label="Theme" hidden>
        <h2>Theme</h2>
        <div class="theme-grid" role="radiogroup" aria-label="Theme">
          ${THEMES.map(t => `
            <button class="swatch" type="button" role="radio" data-theme-id="${t.id}">
              <span class="preview" style="background:linear-gradient(135deg, ${t.accent}, color-mix(in srgb, ${t.accent} 70%, #fff))">
                <span class="win" style="background:${t.bg}"></span>
                <span class="pills"><i style="background:${t.base === 'light' ? '#d5d8de' : '#3a3f4a'}"></i><i style="background:${t.accent}"></i></span>
              </span>
              ${t.name}
            </button>`).join('')}
        </div>
      </div>
    `);
    const sync = () => panel.querySelectorAll('.swatch').forEach(b => {
      b.setAttribute('aria-checked', String(b.dataset.themeId === document.documentElement.dataset.theme));
    });
    const close = () => { panel.hidden = true; button.setAttribute('aria-expanded', 'false'); };
    panel.addEventListener('click', e => {
      const b = e.target.closest('.swatch');
      if (!b) return;
      applyTheme(b.dataset.themeId);
      sync();
    });
    button.addEventListener('click', e => {
      e.stopPropagation();
      const open = panel.hidden;
      panel.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (open) { sync(); panel.querySelector('[aria-checked="true"]')?.focus({ preventScroll: true }); }
    });
    document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { close(); button.focus(); } });
    return panel;
  }

  // ---------- header / footer ----------

  const ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="10.5" cy="7" r="1.2" fill="currentColor"/><circle cx="15" cy="7.5" r="1.2" fill="currentColor"/></svg>',
    chevron: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  };

  function renderHeader(page) {
    const link = (p, label) => `<li><a href="${p.href}"${p.id === page ? ' aria-current="page"' : ''}>${label}</a></li>`;
    const onUnit = UNITS.some(u => u.id === page);
    const header = el(`
      <header class="site-header">
        <div class="bar">
          <a class="brand" href="index.html"><span class="dot" aria-hidden="true"></span><span>Siena <span class="light">Physics</span></span></a>
          <nav class="site-nav inline" aria-label="Main">
            <ul>
              <li class="dd">
                <button class="dd-btn" type="button" aria-expanded="false" aria-controls="units-menu"${onUnit ? ' aria-current="page"' : ''}>
                  Units ${ICONS.chevron}
                </button>
                <div class="dd-menu" id="units-menu" hidden>
                  ${UNITS.map(u => `
                    <a href="${u.href}"${u.id === page ? ' aria-current="page"' : ''}>
                      <span class="dd-num">${u.num}</span>
                      <span><span class="dd-title">${u.title}</span><span class="dd-sub">${u.chapter}</span></span>
                    </a>`).join('')}
                </div>
              </li>
              ${PAGES.map(p => link(p, p.short)).join('')}
            </ul>
          </nav>
          <a class="icon-btn" href="search.html" aria-label="Search" title="Search">${ICONS.search}</a>
          <button class="icon-btn theme-toggle" type="button" aria-label="Choose theme" title="Theme" aria-expanded="false" aria-controls="theme-panel">${ICONS.theme}</button>
          <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav-mobile">${ICONS.menu}</button>
        </div>
        <nav id="site-nav-mobile" class="site-nav" aria-label="Main">
          <ul>
            ${link({ id: 'home', href: 'index.html' }, 'Home')}
            <li class="nav-group">Units</li>
            ${UNITS.map(u => link(u, u.title)).join('')}
            <li class="nav-group">Study</li>
            ${PAGES.map(p => link(p, p.title)).join('')}
          </ul>
        </nav>
      </header>
    `);

    // Desktop: links sit inline in the bar, units in a dropdown. Phones: one full-width menu.
    const inlineNav = header.querySelector('.site-nav.inline');
    const mobileNav = header.querySelector('#site-nav-mobile');
    const wide = window.matchMedia('(min-width: 1000px)');
    const syncNav = () => { inlineNav.hidden = !wide.matches; mobileNav.hidden = wide.matches; };
    syncNav();
    wide.addEventListener('change', syncNav);

    const ddBtn = header.querySelector('.dd-btn');
    const ddMenu = header.querySelector('.dd-menu');
    const setDd = open => { ddMenu.hidden = !open; ddBtn.setAttribute('aria-expanded', String(open)); };
    ddBtn.addEventListener('click', e => {
      e.stopPropagation();
      setDd(ddMenu.hidden);
      if (!ddMenu.hidden) ddMenu.querySelector('a').focus({ preventScroll: true });
    });
    document.addEventListener('click', e => { if (!ddMenu.hidden && !ddMenu.contains(e.target)) setDd(false); });
    header.addEventListener('keydown', e => {
      if (ddMenu.hidden) return;
      const items = [...ddMenu.querySelectorAll('a')];
      const i = items.indexOf(document.activeElement);
      if (e.key === 'Escape') { setDd(false); ddBtn.focus(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });

    header.append(themePanel(header.querySelector('.theme-toggle')));
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
        Progress is saved on this device only. No accounts, no tracking.<br>
        © ${new Date().getFullYear()} Newt Tonne & Axel Eration
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

  window.SP = { UNITS, PAGES, THEMES, el, esc, shuffle, typeset, Progress, applyTheme };

  const page = document.body.dataset.page;
  const main = document.querySelector('main');
  const current = THEMES.find(t => t.id === document.documentElement.dataset.theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (current && meta) meta.content = current.bg;
  renderHeader(page);
  if (page === 'home') renderHome(main);
  if (page === 'formulas') renderFormulaSheet(main);
})();

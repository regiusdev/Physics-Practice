/* ============================================================
   Siena Physics: search across every unit
   Builds a small in-memory index from the unit data files. No
   library needed; the whole site is only a few hundred items.
   ============================================================ */
(function () {
  'use strict';

  const { UNITS, esc } = window.SP;
  const input = document.getElementById('q');
  const out = document.getElementById('results');

  // Turn HTML + TeX into plain searchable text.
  function plain(s) {
    return String(s || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\\[()[\]]/g, ' ')
      .replace(/\\(?:text|mathrm|mathbf|operatorname)\{([^}]*)\}/g, '$1')
      .replace(/\\Delta/g, 'Δ').replace(/\\theta/g, 'θ').replace(/\\mu/g, 'μ').replace(/\\Sigma/g, 'Σ')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/[{}^_$\\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const index = [];
  const add = (kind, title, body, href, unit) => index.push({
    kind, href, unit,
    title: plain(title),
    text: plain(body),
    hay: `${plain(title)} ${plain(body)} ${kind}`.toLowerCase(),
  });

  UNITS.forEach(u => {
    const d = window.UNIT_DATA[u.id];
    if (!d) return;
    const h = hash => `${u.href}#${hash}`;
    (d.formulas || []).forEach(f => add('Formula', f.name, `${f.note || ''} ${f.tex}`, h('notes-formulas'), u));
    (d.concepts || []).forEach((c, i) => add('Concept', c.title, c.body, h(`notes-c${i + 1}`), u));
    (d.mistakes || []).forEach(m => add('Common mistake', m.title, `${m.wrong} ${m.right}`, h('notes-mistakes'), u));
    (d.examples || []).forEach((e, i) => add('Worked example', e.title, e.problem, h(`ex-${i + 1}`), u));
    (d.problems || []).forEach(p => {
      let q = '';
      try { q = p.gen(window.Practice.makeR()).question; } catch (e) { /* skip text */ }
      add('Practice problem', p.title, q, h(`prob-${p.id}`), u);
    });
    (d.quiz || []).forEach(q => add('Quiz question', q.q, q.explain, h('quiz'), u));
  });
  add('Tool', 'Unit converter', 'convert km/h to m/s, miles, feet, pounds, newtons, units conversion', 'tools.html#converter');
  add('Tool', 'Significant figures', 'sig figs counter rounding scientific notation rules', 'tools.html#sigfigs');
  add('Page', 'Formula sheet', 'every equation printable', 'formulas.html');
  add('Page', 'Test prep', 'mixed practice test timer', 'test.html');

  const SYNONYMS = { fbd: 'free-body', 'free body': 'free-body', sigfigs: 'significant', 'sig figs': 'significant', n3l: 'third law', n2l: 'second law' };
  const KIND_WEIGHT = { Concept: 3, Formula: 3, 'Common mistake': 2, Tool: 3, Page: 2, 'Worked example': 2, 'Practice problem': 1.5, 'Quiz question': 1 };

  function highlight(s, tokens) {
    let h = esc(s);
    tokens.forEach(t => {
      const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      h = h.replace(re, '<mark>$1</mark>');
    });
    return h;
  }

  function snippet(text, tokens) {
    const low = text.toLowerCase();
    const at = Math.min(...tokens.map(t => low.indexOf(t)).filter(i => i >= 0), text.length);
    const start = Math.max(0, at - 50);
    return (start ? '…' : '') + text.slice(start, start + 170) + (start + 170 < text.length ? '…' : '');
  }

  function search(q) {
    let query = q.toLowerCase().trim();
    Object.entries(SYNONYMS).forEach(([k, v]) => { if (query === k || query.includes(k)) query = query.replace(k, v); });
    const tokens = query.split(/\s+/).filter(t => t.length > 0);
    if (!tokens.length) {
      out.innerHTML = '<p class="muted">Try “friction”, “projectile”, “free fall”, “km/h”, or “incline”.</p>';
      return;
    }
    const hits = index
      .filter(e => tokens.every(t => e.hay.includes(t)))
      .map(e => ({ e, score: tokens.reduce((s, t) => s + (e.title.toLowerCase().includes(t) ? 3 : 1), 0) * (KIND_WEIGHT[e.kind] || 1) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
    out.innerHTML = hits.length
      ? `<p class="muted small">${hits.length}${hits.length === 40 ? '+' : ''} result${hits.length === 1 ? '' : 's'}</p>` + hits.map(({ e }) => `
        <a class="card result-item" href="${e.href}">
          <span class="q-num"><span class="tag ${e.unit ? 'green' : ''}">${e.unit ? e.unit.short : e.kind}</span>${e.unit ? ` ${e.kind}` : ''}</span>
          <span class="title">${highlight(e.title.length > 140 ? `${e.title.slice(0, 140)}…` : e.title, tokens)}</span>
          ${e.text ? `<p class="snippet">${highlight(snippet(e.text, tokens), tokens)}</p>` : ''}
        </a>`).join('')
      : `<p>No results for “${esc(q)}”. Try a shorter or different word.</p>`;
  }

  let timer = null;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      search(input.value);
      const url = new URL(location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      else url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }, 80);
  });
  input.value = new URLSearchParams(location.search).get('q') || '';
  search(input.value);
  input.focus();
})();

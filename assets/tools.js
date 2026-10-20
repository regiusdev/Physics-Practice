/* ============================================================
   Siena Physics: unit converter + significant-figure helpers
   ============================================================ */
(function () {
  'use strict';

  const { typeset } = window.SP;

  // ---------- unit converter ----------

  // Every unit is stored as "how many SI base units is one of these".
  const CATEGORIES = {
    Speed: { 'm/s': 1, 'km/h': 1 / 3.6, 'mi/h': 0.44704, 'ft/s': 0.3048 },
    Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, ft: 0.3048, in: 0.0254 },
    Time: { s: 1, min: 60, h: 3600 },
    Mass: { kg: 1, g: 0.001, 'lb (mass)': 0.45359237 },
    Force: { N: 1, kN: 1000, lb: 4.4482216 },
    Acceleration: { 'm/s²': 1, "g's": 9.8, 'ft/s²': 0.3048 },
  };
  const DEFAULTS = { Speed: ['km/h', 'm/s'], Length: ['km', 'm'], Time: ['min', 's'], Mass: ['lb (mass)', 'kg'], Force: ['lb', 'N'], Acceleration: ["g's", 'm/s²'] };

  const nice = x => {
    if (!isFinite(x)) return '';
    if (x === 0) return '0';
    const a = Math.abs(x);
    if (a >= 1e9 || a < 1e-6) return x.toExponential(4);
    return String(Number(x.toPrecision(6)));
  };
  const texUnit = u => `\\text{${u.replace('²', '}^2\\text{')}}`;

  const cat = document.getElementById('conv-cat');
  const fromVal = document.getElementById('conv-from');
  const toVal = document.getElementById('conv-to');
  const fromUnit = document.getElementById('conv-from-unit');
  const toUnit = document.getElementById('conv-to-unit');
  const how = document.getElementById('conv-how');

  cat.innerHTML = Object.keys(CATEGORIES).map(c => `<option>${c}</option>`).join('');

  function fillUnits() {
    const units = Object.keys(CATEGORIES[cat.value]);
    const opts = units.map(u => `<option>${u}</option>`).join('');
    fromUnit.innerHTML = opts;
    toUnit.innerHTML = opts;
    [fromUnit.value, toUnit.value] = DEFAULTS[cat.value];
  }

  function convert(direction) {
    const table = CATEGORIES[cat.value];
    const a = table[fromUnit.value], b = table[toUnit.value];
    const src = direction === 'back' ? toVal : fromVal;
    const dst = direction === 'back' ? fromVal : toVal;
    const v = parseFloat(String(src.value).replace(/,/g, ''));
    if (!isFinite(v)) { dst.value = ''; how.innerHTML = ''; return; }
    const out = direction === 'back' ? (v * b) / a : (v * a) / b;
    dst.value = nice(out);
    const fv = parseFloat(fromVal.value), tv = parseFloat(toVal.value);
    const factor = a / b;
    how.innerHTML = `
      \\[${nice(fv)}\\ ${texUnit(fromUnit.value)} \\times \\dfrac{${nice(factor)}\\ ${texUnit(toUnit.value)}}{1\\ ${texUnit(fromUnit.value)}} = ${nice(tv)}\\ ${texUnit(toUnit.value)}\\]
      ${cat.value === 'Speed' && /km\/h/.test(fromUnit.value + toUnit.value) && /m\/s/.test(fromUnit.value + toUnit.value)
        ? '<p class="muted small">Shortcut: km/h ÷ 3.6 = m/s, and m/s × 3.6 = km/h.</p>' : ''}`;
    typeset(how);
  }

  cat.addEventListener('change', () => { fillUnits(); convert('fwd'); });
  fromUnit.addEventListener('change', () => convert('fwd'));
  toUnit.addEventListener('change', () => convert('fwd'));
  fromVal.addEventListener('input', () => convert('fwd'));
  toVal.addEventListener('input', () => convert('back'));
  document.getElementById('conv-swap').addEventListener('click', () => {
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
    convert('fwd');
  });
  fillUnits();
  fromVal.value = '100';
  convert('fwd');

  // ---------- significant figures ----------

  // Splits a typed number into digits marked significant or not.
  function analyze(raw) {
    const s = String(raw).trim().replace(/,/g, '');
    const m = s.match(/^[-+]?(\d*\.?\d*)(?:\s*(?:[eE]|[x×*]\s*10\s*\^)\s*([-+]?\d+))?$/);
    if (!m || !/\d/.test(m[1])) return null;
    const mant = m[1];
    const hasDot = mant.includes('.');
    const chars = [...mant];
    const digitPos = chars.map((c, i) => (c === '.' ? -1 : i)).filter(i => i >= 0);
    const firstNZ = digitPos.find(i => chars[i] !== '0');
    const lastNZ = [...digitPos].reverse().find(i => chars[i] !== '0');
    let ambiguous = false;
    const marks = chars.map((c, i) => {
      if (c === '.') return { c, k: 'point' };
      if (firstNZ === undefined) return { c, k: hasDot ? 'sig' : 'not' };
      if (i < firstNZ) return { c, k: 'not' };
      if (i <= lastNZ) return { c, k: 'sig' };
      if (hasDot) return { c, k: 'sig' };
      ambiguous = true;
      return { c, k: 'not' };
    });
    const count = marks.filter(x => x.k === 'sig').length || 1;
    return { marks, count, ambiguous, exp: m[2], value: Number(mant) * Math.pow(10, Number(m[2] || 0)), mant };
  }

  function roundSig(x, n) {
    if (!isFinite(x) || x === 0) return '0';
    const p = x.toPrecision(n);
    if (!p.includes('e')) return p;
    const [mm, e] = p.split('e');
    return `${mm} × 10^${Number(e)}`;
  }

  function sci(x, n) {
    if (!isFinite(x) || x === 0) return '0';
    const [mm, e] = x.toExponential(n - 1).split('e');
    return `${mm} × 10^${Number(e)}`;
  }

  const sfInput = document.getElementById('sf-input');
  const sfOut = document.getElementById('sf-out');
  const sfRound = document.getElementById('sf-round');

  function showSf() {
    const r = analyze(sfInput.value);
    if (!r) { sfOut.innerHTML = '<p class="muted">Type a number like 0.00450, 1200, 3.00e8 or 4.05 x 10^3.</p>'; return; }
    const digits = r.marks.map(x => `<span class="${x.k === 'sig' ? 'sig' : x.k === 'not' ? 'not' : ''}">${x.c}</span>`).join('') +
      (r.exp ? `<span class="not"> × 10^${r.exp}</span>` : '');
    const n = Number(sfRound.value);
    sfOut.innerHTML = `
      <div class="digits" aria-label="Significant digits underlined">${digits}</div>
      <p><strong>${r.count} significant figure${r.count === 1 ? '' : 's'}</strong>${r.ambiguous ? ' (the trailing zeros are ambiguous: write it in scientific notation, or add a decimal point like "1200.", to show they count)' : ''}.</p>
      <p>Rounded to ${n}: <strong>${roundSig(r.value, n)}</strong> · Scientific notation: <strong>${sci(r.value, n)}</strong></p>`;
  }
  sfInput.addEventListener('input', showSf);
  sfRound.addEventListener('change', showSf);
  showSf();

  // ---------- calculation rules ----------

  const opA = document.getElementById('op-a');
  const opB = document.getElementById('op-b');
  const op = document.getElementById('op');
  const opOut = document.getElementById('op-out');

  const decimals = mant => (mant.includes('.') ? mant.split('.')[1].length : -((mant.match(/0+$/) || [''])[0].length));

  function showOp() {
    const a = analyze(opA.value), b = analyze(opB.value);
    if (!a || !b) { opOut.innerHTML = '<p class="muted">Enter two numbers.</p>'; return; }
    let raw, text;
    if (op.value === '×' || op.value === '÷') {
      raw = op.value === '×' ? a.value * b.value : a.value / b.value;
      const n = Math.min(a.count, b.count);
      text = `For × and ÷, keep the <strong>fewest significant figures</strong> (${a.count} vs ${b.count} → ${n}).<br>Calculator says ${nice(raw)} → write <strong>${roundSig(raw, n)}</strong>`;
    } else {
      raw = op.value === '+' ? a.value + b.value : a.value - b.value;
      if (a.exp || b.exp) {
        text = 'For + and −, write both numbers without scientific notation first, then keep the fewest decimal places.';
      } else {
        const d = Math.min(decimals(a.mant), decimals(b.mant));
        const rounded = d >= 0 ? raw.toFixed(d) : String(Math.round(raw / Math.pow(10, -d)) * Math.pow(10, -d));
        text = `For + and −, keep the <strong>fewest decimal places</strong> (${Math.max(0, decimals(a.mant))} vs ${Math.max(0, decimals(b.mant))}).<br>Calculator says ${nice(raw)} → write <strong>${rounded}</strong>`;
      }
    }
    opOut.innerHTML = `<p>${text}</p>`;
  }
  [opA, opB, op].forEach(x => x.addEventListener('input', showOp));
  showOp();

  // ---------- drill ----------

  const drillQ = document.getElementById('drill-q');
  const drillIn = document.getElementById('drill-in');
  const drillFb = document.getElementById('drill-fb');
  const drillScore = document.getElementById('drill-score');
  let drillAnswer = 0, right = 0, tries = 0;

  function newDrill() {
    const forms = [
      () => `0.${'0'.repeat(1 + Math.floor(Math.random() * 3))}${Math.floor(Math.random() * 900 + 100)}`.replace(/(\d)$/, d => (Math.random() < 0.5 ? `${d}0` : d)),
      () => `${Math.floor(Math.random() * 9 + 1)}0${Math.floor(Math.random() * 10)}${Math.random() < 0.5 ? '.0' : ''}`,
      () => `${(Math.random() * 90 + 10).toFixed(Math.floor(Math.random() * 3))}`,
      () => `${(Math.random() * 9 + 1).toFixed(Math.floor(Math.random() * 3) + 1)} x 10^${Math.floor(Math.random() * 8) - 3}`,
      () => `${Math.floor(Math.random() * 9 + 1)}${'0'.repeat(Math.floor(Math.random() * 3) + 1)}.`,
      () => `${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 10)}0${Math.floor(Math.random() * 9 + 1)}`,
    ];
    let s, r;
    do { s = forms[Math.floor(Math.random() * forms.length)](); r = analyze(s); } while (!r || r.ambiguous);
    drillAnswer = r.count;
    drillQ.textContent = s;
    drillIn.value = '';
    drillFb.textContent = '';
    drillFb.className = 'feedback';
  }

  function checkDrill() {
    const v = parseInt(drillIn.value, 10);
    if (!isFinite(v)) return;
    tries++;
    if (v === drillAnswer) { right++; drillFb.textContent = '✓ Correct!'; drillFb.className = 'feedback good'; setTimeout(newDrill, 900); }
    else { drillFb.textContent = `✗ It has ${drillAnswer}. Paste it in the counter above to see which digits count.`; drillFb.className = 'feedback bad'; }
    drillScore.textContent = `${right} / ${tries}`;
  }
  document.getElementById('drill-check').addEventListener('click', checkDrill);
  document.getElementById('drill-next').addEventListener('click', newDrill);
  drillIn.addEventListener('keydown', e => { if (e.key === 'Enter') checkDrill(); });
  newDrill();
})();

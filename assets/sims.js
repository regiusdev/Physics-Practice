/* ============================================================
   Siena Physics: interactive simulations
   Sims.mount(id, container). Everything is SVG redrawn only when a
   slider moves (or while "Play" runs), so it stays light on phones.
   ============================================================ */
(function () {
  'use strict';

  const { el, typeset } = window.SP;
  const { plot, arrow, text, svg, niceStep } = window.Fig;
  const D2R = Math.PI / 180;
  const G = 9.8;
  const f1 = x => (Math.abs(x) < 0.005 ? '0.00' : x.toFixed(2));
  const f0 = x => (Math.abs(x) < 0.5 ? '0' : x.toFixed(0));

  // ---------- shared bits ----------

  function slider(key, label, min, max, step, value, unit = '') {
    return `
      <label class="slider">
        <span>${label} <output data-out="${key}">${value}${unit ? ` ${unit}` : ''}</output></span>
        <input type="range" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}">
      </label>`;
  }

  // Wire sliders to a state object; calls draw() at most once per frame.
  function bind(card, state, units, draw) {
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; draw(); });
    };
    card.querySelectorAll('input[type="range"]').forEach(inp => {
      inp.addEventListener('input', () => {
        state[inp.dataset.key] = Number(inp.value);
        schedule();
      });
    });
    const sync = () => {
      card.querySelectorAll('input[type="range"]').forEach(inp => {
        const k = inp.dataset.key;
        inp.value = state[k];
        const out = card.querySelector(`[data-out="${k}"]`);
        if (out) out.textContent = `${state[k]}${units[k] ? ` ${units[k]}` : ''}`;
      });
    };
    return { schedule, sync };
  }

  function readout(items) {
    return items.map(([k, v]) => `<div><b>${k}</b><span>${v}</span></div>`).join('');
  }

  // Simple play loop for a time scrubber (t from 0 to tEnd over `seconds`).
  function player(state, getEnd, onFrame, seconds = 4) {
    let raf = null;
    let last = 0;
    function step(now) {
      const dt = (now - last) / 1000;
      last = now;
      state.t = Math.min(getEnd(), state.t + dt * getEnd() / seconds);
      onFrame();
      if (state.t < getEnd()) raf = requestAnimationFrame(step);
      else raf = null;
    }
    return {
      toggle() {
        if (raf) { cancelAnimationFrame(raf); raf = null; return; }
        if (state.t >= getEnd() - 1e-6) state.t = 0;
        last = performance.now();
        raf = requestAnimationFrame(step);
      },
      stop() { if (raf) cancelAnimationFrame(raf); raf = null; },
      running: () => !!raf,
    };
  }

  // ---------- 1D: motion graphs ----------

  function motionGraphs(container) {
    const T = 10;
    const state = { x0: 0, v0: 0, a: 2, t: 0 };
    const units = { x0: 'm', v0: 'm/s', a: 'm/s²', t: 's' };
    const card = el(`
      <div class="card sim">
        <h3>Motion graphs: change a, watch the graphs</h3>
        <p class="muted small">Constant acceleration for 10 s. Slide the time bar or press play. Notice: the slope of x–t is v, the slope of v–t is a, and the area under v–t is the displacement.</p>
        <div class="presets">
          <button class="btn ghost small" data-preset="0,0,2">Car from rest</button>
          <button class="btn ghost small" data-preset="0,20,-4">Braking car</button>
          <button class="btn ghost small" data-preset="0,15,-9.8">Ball thrown up</button>
          <button class="btn ghost small" data-preset="-20,5,0">Constant velocity</button>
        </div>
        <div class="track"></div>
        <div class="controls">
          ${slider('x0', 'Start position x₀', -30, 30, 1, state.x0, 'm')}
          ${slider('v0', 'Start velocity v₀', -20, 20, 0.5, state.v0, 'm/s')}
          ${slider('a', 'Acceleration a', -10, 10, 0.2, state.a, 'm/s²')}
          <div style="display:flex;gap:10px;align-items:end">
            <button class="btn small play" type="button" style="flex:none">▶ Play</button>
            <div style="flex:1">${slider('t', 'Time t', 0, T, 0.1, state.t, 's')}</div>
          </div>
        </div>
        <div class="graphs" style="display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))"></div>
        <div class="readout"></div>
      </div>`);
    container.append(card);

    const x = t => state.x0 + state.v0 * t + 0.5 * state.a * t * t;
    const v = t => state.v0 + state.a * t;
    const track = card.querySelector('.track');
    const graphs = card.querySelector('.graphs');
    const out = card.querySelector('.readout');

    function draw() {
      const pts = n => Array.from({ length: 61 }, (_, i) => { const t = (T * i) / 60; return [t, n(t)]; });
      const xs = pts(x), vs = pts(v);
      // track: where the object is along the line
      const lo = Math.min(...xs.map(p => p[1]), 0), hi = Math.max(...xs.map(p => p[1]), 0);
      const span = Math.max(hi - lo, 10);
      const W = 640, pad = 30;
      const X = val => pad + ((val - lo) / span) * (W - 2 * pad);
      const step = niceStep(span, 6);
      let body = `<line x1="${pad}" y1="40" x2="${W - pad}" y2="40" class="s-ink" stroke-width="2"/>`;
      for (let m = Math.ceil(lo / step) * step; m <= lo + span + 1e-9; m += step) {
        body += `<line x1="${X(m)}" y1="35" x2="${X(m)}" y2="45" class="s-ink" stroke-width="1.5"/>` + text(X(m), 60, `${+m.toFixed(4)}`, { size: 12 });
      }
      const cx = X(x(state.t));
      const vel = v(state.t);
      body += `<rect x="${cx - 14}" y="18" width="28" height="16" rx="5" class="f-a"/>`;
      if (Math.abs(vel) > 0.05) body += arrow(cx, 10, cx + Math.max(-90, Math.min(90, vel * 4)), 10, 'b', { head: 8, width: 2 });
      body += text(W - pad, 74, 'x (m)', { anchor: 'end', size: 12, bold: true });
      track.innerHTML = svg(W, 82, body, 'Object moving along a line', 0, 0);

      const m = state.t;
      graphs.innerHTML =
        plot([{ points: xs, color: 'a' }], { yLabel: 'x (m)', marker: [m, x(m)], w: 300, h: 170, title: 'Position vs time' }).svg +
        plot([{ points: vs, color: 'b' }], { yLabel: 'v (m/s)', marker: [m, v(m)], w: 300, h: 170, title: 'Velocity vs time' }).svg +
        plot([{ points: [[0, state.a], [T, state.a]], color: 'r' }], { yLabel: 'a (m/s²)', marker: [m, state.a], w: 300, h: 170, title: 'Acceleration vs time' }).svg;
      out.innerHTML = readout([
        ['time', `${state.t.toFixed(1)} s`],
        ['position x', `${f1(x(state.t))} m`],
        ['velocity v', `${f1(v(state.t))} m/s`],
        ['displacement', `${f1(x(state.t) - state.x0)} m`],
      ]);
      ui.sync();
      playBtn.textContent = play.running() ? '❚❚ Pause' : '▶ Play';
    }

    const ui = bind(card, state, units, draw);
    const playBtn = card.querySelector('.play');
    const play = player(state, () => T, draw, 5);
    playBtn.addEventListener('click', () => { play.toggle(); draw(); });
    card.querySelectorAll('[data-preset]').forEach(b => b.addEventListener('click', () => {
      [state.x0, state.v0, state.a] = b.dataset.preset.split(',').map(Number);
      state.t = 0;
      play.stop();
      draw();
    }));
    draw();
  }

  // ---------- 2D: projectile ----------

  function projectile(container) {
    const state = { v0: 20, angle: 45, h: 0, t: 0 };
    const units = { v0: 'm/s', angle: '°', h: 'm', t: 's' };
    const card = el(`
      <div class="card sim">
        <h3>Projectile launcher</h3>
        <p class="muted small">The horizontal velocity (green) never changes. The vertical velocity (blue) shrinks by 9.8 m/s every second, hits zero at the top, then grows downward.</p>
        <div class="stage"></div>
        <div class="controls">
          ${slider('v0', 'Launch speed v₀', 5, 50, 1, state.v0, 'm/s')}
          ${slider('angle', 'Launch angle θ', 0, 90, 1, state.angle, '°')}
          ${slider('h', 'Launch height', 0, 80, 1, state.h, 'm')}
          <div style="display:flex;gap:10px;align-items:end">
            <button class="btn small play" type="button" style="flex:none">▶ Launch</button>
            <div style="flex:1">${slider('t', 'Time t', 0, 10, 0.01, state.t, 's')}</div>
          </div>
        </div>
        <div class="readout"></div>
      </div>`);
    container.append(card);
    const stage = card.querySelector('.stage');
    const out = card.querySelector('.readout');
    const tSlider = card.querySelector('input[data-key="t"]');

    const comps = () => ({ vx: state.v0 * Math.cos(state.angle * D2R), vy: state.v0 * Math.sin(state.angle * D2R) });
    const flight = () => { const { vy } = comps(); return (vy + Math.sqrt(vy * vy + 2 * G * state.h)) / G; };

    function draw() {
      const { vx, vy } = comps();
      const T = flight();
      state.t = Math.min(state.t, T);
      tSlider.max = T.toFixed(2);
      const R = vx * T, H = state.h + (vy * vy) / (2 * G);
      // fixed-ish frame so the path visibly grows and shrinks as sliders move
      const spanX = Math.max(R, 20), spanY = Math.max(H, 10);
      const W = 640, Hpx = 300, pad = { l: 46, r: 16, t: 16, b: 34 };
      const S = Math.min((W - pad.l - pad.r) / spanX, (Hpx - pad.t - pad.b) / spanY);
      const P = (xm, ym) => [pad.l + xm * S, Hpx - pad.b - ym * S];
      let body = '';
      const sx = niceStep(spanX, 6), sy = niceStep(spanY, 4);
      for (let gx = 0; gx <= spanX + 1e-9; gx += sx) { const [a] = P(gx, 0); body += `<line x1="${a}" y1="${pad.t}" x2="${a}" y2="${Hpx - pad.b}" class="grid"/>` + text(a, Hpx - pad.b + 14, `${+gx.toFixed(3)}`, { size: 11 }); }
      for (let gy = 0; gy <= spanY + 1e-9; gy += sy) { const [, b] = P(0, gy); body += `<line x1="${pad.l}" y1="${b}" x2="${W - pad.r}" y2="${b}" class="grid"/>` + text(pad.l - 6, b, `${+gy.toFixed(3)}`, { size: 11, anchor: 'end' }); }
      if (state.h > 0) { const [a, b] = P(0, state.h); body += `<rect x="${pad.l - 14}" y="${b}" width="14" height="${Hpx - pad.b - b}" class="ramp"/>`; void a; }
      const [g0x, g0y] = P(0, 0);
      body += `<line x1="${g0x - 14}" y1="${g0y}" x2="${W - pad.r}" y2="${g0y}" class="s-ink" stroke-width="2"/>`;
      let d = '';
      for (let i = 0; i <= 60; i++) {
        const t = (T * i) / 60;
        const [a, b] = P(vx * t, state.h + vy * t - 0.5 * G * t * t);
        d += `${i ? 'L' : 'M'}${a.toFixed(1)} ${b.toFixed(1)}`;
      }
      body += `<path d="${d}" fill="none" class="s-ink" stroke-width="1.8" stroke-dasharray="5 5"/>`;
      const t = state.t;
      const vyt = vy - G * t;
      const [bx, by] = P(vx * t, state.h + vy * t - 0.5 * G * t * t);
      const k = 3;
      body += arrow(bx, by, bx + vx * k, by, 'a', { head: 8 });
      if (Math.abs(vyt) > 0.2) body += arrow(bx, by, bx, by - vyt * k, 'b', { head: 8 });
      body += `<circle cx="${bx}" cy="${by}" r="7" class="f-r"/>`;
      body += text(W - pad.r, Hpx - 6, 'x (m)', { anchor: 'end', size: 12, bold: true }) + text(4, 10, 'y (m)', { anchor: 'start', size: 12, bold: true });
      stage.innerHTML = svg(W, Hpx, body, 'Projectile path', 0, 0);
      const vImpY = vy - G * T;
      out.innerHTML = readout([
        ['time in air', `${f1(T)} s`],
        ['range', `${f1(R)} m`],
        ['max height', `${f1(H)} m`],
        ['v<sub>x</sub> (always)', `${f1(vx)} m/s`],
        [`v<sub>y</sub> at t = ${t.toFixed(2)} s`, `${f1(vyt)} m/s`],
        ['impact speed', `${f1(Math.hypot(vx, vImpY))} m/s`],
      ]);
      ui.sync();
      playBtn.textContent = play.running() ? '❚❚ Pause' : '▶ Launch';
    }

    const ui = bind(card, state, units, draw);
    const playBtn = card.querySelector('.play');
    const play = player(state, flight, draw, 3);
    playBtn.addEventListener('click', () => { play.toggle(); draw(); });
    draw();
  }

  // ---------- 2D: vector addition ----------

  function compass(deg) {
    const a = ((deg % 360) + 360) % 360;
    if (a < 0.5 || a > 359.5) return 'due East';
    if (Math.abs(a - 90) < 0.5) return 'due North';
    if (Math.abs(a - 180) < 0.5) return 'due West';
    if (Math.abs(a - 270) < 0.5) return 'due South';
    if (a < 90) return `${a.toFixed(1)}° N of E`;
    if (a < 180) return `${(180 - a).toFixed(1)}° N of W`;
    if (a < 270) return `${(a - 180).toFixed(1)}° S of W`;
    return `${(360 - a).toFixed(1)}° S of E`;
  }

  function vectorAdd(container) {
    const state = { A: 6, a: 0, B: 5, b: 60 };
    const units = { A: '', a: '°', B: '', b: '°' };
    const card = el(`
      <div class="card sim">
        <h3>Vector addition: tip to tail</h3>
        <p class="muted small">Angles are measured counterclockwise from +x (East). The resultant R (gold) goes from the tail of A to the tip of B. Its components are just A<sub>x</sub> + B<sub>x</sub> and A<sub>y</sub> + B<sub>y</sub>.</p>
        <div class="stage"></div>
        <div class="controls">
          ${slider('A', 'Magnitude of A', 0, 10, 0.5, state.A)}
          ${slider('a', 'Angle of A', 0, 360, 5, state.a, '°')}
          ${slider('B', 'Magnitude of B', 0, 10, 0.5, state.B)}
          ${slider('b', 'Angle of B', 0, 360, 5, state.b, '°')}
        </div>
        <div class="readout"></div>
      </div>`);
    container.append(card);
    const stage = card.querySelector('.stage');
    const out = card.querySelector('.readout');

    function draw() {
      const Ax = state.A * Math.cos(state.a * D2R), Ay = state.A * Math.sin(state.a * D2R);
      const Bx = state.B * Math.cos(state.b * D2R), By = state.B * Math.sin(state.b * D2R);
      const Rx = Ax + Bx, Ry = Ay + By;
      const R = Math.hypot(Rx, Ry);
      const ang = (Math.atan2(Ry, Rx) / D2R + 360) % 360;
      const S = 14, C = 20 * S; // 20 units each way
      const P = (x, y) => [C + x * S, C - y * S];
      let body = '';
      for (let i = -20; i <= 20; i += 5) {
        body += `<line x1="${P(i, -20)[0]}" y1="0" x2="${P(i, -20)[0]}" y2="${2 * C}" class="grid"/>`;
        body += `<line x1="0" y1="${P(0, i)[1]}" x2="${2 * C}" y2="${P(0, i)[1]}" class="grid"/>`;
      }
      body += `<line x1="0" y1="${C}" x2="${2 * C}" y2="${C}" class="s-ink" stroke-width="1.2" opacity="0.6"/><line x1="${C}" y1="0" x2="${C}" y2="${2 * C}" class="s-ink" stroke-width="1.2" opacity="0.6"/>`;
      body += text(2 * C - 4, C - 10, 'E', { anchor: 'end', size: 12, bold: true }) + text(C + 8, 10, 'N', { anchor: 'start', size: 12, bold: true });
      const [ox, oy] = P(0, 0), [ax, ay] = P(Ax, Ay), [rx, ry] = P(Rx, Ry);
      if (R > 0.1) {
        body += `<line x1="${ox}" y1="${oy}" x2="${rx}" y2="${oy}" class="s-r" stroke-width="1.4" stroke-dasharray="4 4"/><line x1="${rx}" y1="${oy}" x2="${rx}" y2="${ry}" class="s-r" stroke-width="1.4" stroke-dasharray="4 4"/>`;
      }
      if (state.A > 0) body += arrow(ox, oy, ax, ay, 'a') + text((ox + ax) / 2 - 8, (oy + ay) / 2 - 10, 'A', { cls: 't-a', bold: true });
      if (state.B > 0) body += arrow(ax, ay, rx, ry, 'b') + text((ax + rx) / 2 + 10, (ay + ry) / 2 - 8, 'B', { cls: 't-b', bold: true });
      if (R > 0.1) body += arrow(ox, oy, rx, ry, 'r', { width: 3.2 }) + text((ox + rx) / 2 + 12, (oy + ry) / 2 + 14, 'R', { cls: 't-r', bold: true });
      stage.innerHTML = `<div style="max-width:420px;margin:0 auto">${svg(2 * C, 2 * C, body, 'Vector addition diagram')}</div>`;
      out.innerHTML = readout([
        ['A<sub>x</sub>, A<sub>y</sub>', `${f1(Ax)}, ${f1(Ay)}`],
        ['B<sub>x</sub>, B<sub>y</sub>', `${f1(Bx)}, ${f1(By)}`],
        ['R<sub>x</sub>, R<sub>y</sub>', `${f1(Rx)}, ${f1(Ry)}`],
        ['|R|', f1(R)],
        ['direction', R > 0.05 ? compass(ang) : 'n/a'],
      ]);
      ui.sync();
    }
    const ui = bind(card, state, units, draw);
    draw();
  }

  // ---------- Forces: friction vs applied force ----------

  function frictionPush(container) {
    const state = { m: 20, us: 0.5, uk: 0.35, F: 60 };
    const units = { m: 'kg', us: '', uk: '', F: 'N' };
    const FMAX = 300;
    const card = el(`
      <div class="card sim">
        <h3>Push a box: static vs kinetic friction</h3>
        <p class="muted small">Static friction matches your push (it only uses what it needs) up to its max μ<sub>s</sub>F<sub>N</sub>. Push harder than that and the box breaks free; then kinetic friction μ<sub>k</sub>F<sub>N</sub> takes over and stays constant. Never add the two.</p>
        <div class="stage" style="display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))"></div>
        <div class="controls">
          ${slider('F', 'Applied force F', 0, FMAX, 1, state.F, 'N')}
          ${slider('m', 'Mass m', 1, 50, 1, state.m, 'kg')}
          ${slider('us', 'Static μₛ', 0.05, 1, 0.05, state.us)}
          ${slider('uk', 'Kinetic μₖ', 0.05, 1, 0.05, state.uk)}
        </div>
        <p class="verdict-line" aria-live="polite"></p>
        <div class="readout"></div>
      </div>`);
    container.append(card);
    const stage = card.querySelector('.stage');
    const out = card.querySelector('.readout');
    const verdict = card.querySelector('.verdict-line');

    function draw() {
      if (state.uk > state.us) state.uk = state.us; // kinetic is never bigger than static
      const N = state.m * G;
      const fsMax = state.us * N, fk = state.uk * N;
      const moving = state.F > fsMax;
      const f = moving ? fk : state.F;
      const a = moving ? (state.F - fk) / state.m : 0;

      // FBD with arrows scaled to the forces
      const k = 70 / Math.max(N, state.F, 1);
      const cx = 150, cy = 90;
      let body = `<line x1="20" y1="${cy + 26}" x2="280" y2="${cy + 26}" class="s-ink" stroke-width="2"/>`;
      body += `<rect x="${cx - 26}" y="${cy - 26}" width="52" height="52" rx="3" class="body"/>` + text(cx, cy, `${state.m} kg`, { size: 12, bold: true });
      if (state.F > 0) body += arrow(cx + 26, cy, cx + 26 + state.F * k + 4, cy, 'r') + text(cx + 30 + state.F * k + 8, cy, 'F', { anchor: 'start', cls: 't-r', bold: true });
      if (f > 0) body += arrow(cx - 26, cy + 14, cx - 26 - f * k - 4, cy + 14, 'f') + text(cx - 30 - f * k - 8, cy + 14, 'F_fr', { anchor: 'end', cls: 't-f', bold: true });
      body += arrow(cx, cy - 26, cx, cy - 26 - N * k * 0.6, 'a') + text(cx + 8, cy - 30 - N * k * 0.6, 'F_N', { anchor: 'start', cls: 't-a', bold: true });
      body += arrow(cx, cy + 26, cx, cy + 26 + N * k * 0.6, 'b') + text(cx + 8, cy + 30 + N * k * 0.6, 'mg', { anchor: 'start', cls: 't-b', bold: true });
      const fbd = svg(300, 200, body, 'Free-body diagram of the pushed box', 0, -20);

      // friction vs applied force graph
      const g = plot([
        { points: [[0, 0], [fsMax, fsMax]], color: 'a' },
        { points: [[fsMax, fk], [FMAX, fk]], color: 'f' },
      ], { yLabel: 'friction (N)', tRange: [0, FMAX], yRange: [0, Math.max(fsMax * 1.15, 10)], marker: [state.F, f], w: 300, h: 200, title: 'Friction force vs applied force' });
      const graph = g.svg.replace(/>t \(s\)</, '>applied F (N)<');
      stage.innerHTML = fbd + graph;

      verdict.innerHTML = moving
        ? `Sliding! F > μ<sub>s</sub>F<sub>N</sub>, so kinetic friction (${f0(fk)} N) acts and a = (F − μ<sub>k</sub>F<sub>N</sub>)/m = ${f1(a)} m/s².`
        : `Stays put. Static friction matches your push: ${f0(f)} N (max available ${f0(fsMax)} N).`;
      verdict.style.color = moving ? 'var(--bad)' : 'var(--good)';
      out.innerHTML = readout([
        ['normal force', `${f0(N)} N`],
        ['max static μ<sub>s</sub>F<sub>N</sub>', `${f0(fsMax)} N`],
        ['kinetic μ<sub>k</sub>F<sub>N</sub>', `${f0(fk)} N`],
        ['friction now', `${f0(f)} N`],
        ['acceleration', `${f1(a)} m/s²`],
      ]);
      ui.sync();
    }
    const ui = bind(card, state, units, draw);
    draw();
  }

  // ---------- Forces: incline stay-or-go ----------

  function incline(container) {
    const state = { angle: 25, us: 0.5, uk: 0.3, m: 10 };
    const units = { angle: '°', us: '', uk: '', m: 'kg' };
    const card = el(`
      <div class="card sim">
        <h3>Incline: does it stay or go?</h3>
        <p class="muted small">Gravity's pull along the ramp is mg sinθ. The most static friction can hold is μₛ·mg cosθ. It slides once tanθ &gt; μₛ, no matter the mass.</p>
        <div class="stage" style="max-width:460px;margin:0 auto"></div>
        <div class="controls">
          ${slider('angle', 'Ramp angle θ', 0, 60, 1, state.angle, '°')}
          ${slider('m', 'Mass m', 1, 50, 1, state.m, 'kg')}
          ${slider('us', 'Static μₛ', 0.05, 1, 0.05, state.us)}
          ${slider('uk', 'Kinetic μₖ', 0.05, 1, 0.05, state.uk)}
        </div>
        <p class="verdict-line" aria-live="polite"></p>
        <div class="readout"></div>
      </div>`);
    container.append(card);
    const stage = card.querySelector('.stage');
    const out = card.querySelector('.readout');
    const verdict = card.querySelector('.verdict-line');

    function draw() {
      if (state.uk > state.us) state.uk = state.us;
      const th = state.angle * D2R;
      const along = state.m * G * Math.sin(th), perp = state.m * G * Math.cos(th);
      const fsMax = state.us * perp;
      const slides = along > fsMax + 1e-9;
      const f = slides ? state.uk * perp : along;
      const a = slides ? G * (Math.sin(th) - state.uk * Math.cos(th)) : 0;
      stage.innerHTML = state.angle >= 1
        ? window.Fig.render(['incline', { angle: state.angle, label: `${state.m} kg`, show: ['mg', 'N', 'f'], friction: 'up', components: true }])
        : '<p class="muted">Flat ground: nothing pulls it along the surface.</p>';
      const crit = Math.atan(state.us) / D2R;
      verdict.innerHTML = slides
        ? `Slides! tanθ = ${Math.tan(th).toFixed(2)} > μₛ = ${state.us}. a = g(sinθ − μₖcosθ) = ${f1(a)} m/s² down the ramp.`
        : `Stays put. Static friction holds with ${f1(f)} N (it could give up to ${f1(fsMax)} N).`;
      verdict.style.color = slides ? 'var(--bad)' : 'var(--good)';
      out.innerHTML = readout([
        ['mg sinθ (along)', `${f1(along)} N`],
        ['mg cosθ = F<sub>N</sub>', `${f1(perp)} N`],
        ['max static', `${f1(fsMax)} N`],
        ['slips at θ =', `${crit.toFixed(1)}°`],
        ['acceleration', `${f1(a)} m/s²`],
      ]);
      ui.sync();
    }
    const ui = bind(card, state, units, draw);
    draw();
  }

  const SIMS = {
    'motion-graphs': motionGraphs,
    projectile,
    'vector-add': vectorAdd,
    'friction-push': frictionPush,
    incline,
  };

  window.Sims = {
    mount(id, container) {
      const fn = SIMS[id];
      if (!fn) return;
      try { fn(container); } catch (e) { console.error(`Simulation "${id}" failed`, e); }
      typeset(container);
    },
  };
})();

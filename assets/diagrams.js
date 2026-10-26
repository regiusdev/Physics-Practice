/* ============================================================
   Siena Physics: figures
   Fig.render(['incline', { angle: 30, ... }]) -> HTML string with an inline SVG.
   See docs/CONTENT-GUIDE.md for every figure type and its params.
   Colors come from CSS classes, so figures follow light/dark mode.
   ============================================================ */
(function () {
  'use strict';

  const D2R = Math.PI / 180;
  const n1 = x => Math.round(x * 10) / 10;

  function escText(s) {
    return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  // "F_N" -> F with subscript N; "F_{G||}" style braces allowed. Rest of the string stays normal.
  function label(s) {
    return escText(s).replace(/([^_\s]*)_\{?([^\s}]+)\}?/g,
      (m, base, sub) => `${base}<tspan dy="4" font-size="0.75em">${sub}</tspan><tspan dy="-4"></tspan>`);
  }

  function text(x, y, s, opts = {}) {
    const anchor = opts.anchor || 'middle';
    const cls = opts.cls ? ` class="${opts.cls}"` : '';
    const size = opts.size ? ` font-size="${opts.size}"` : '';
    const weight = opts.bold ? ' font-weight="700"' : '';
    return `<text x="${n1(x)}" y="${n1(y)}" text-anchor="${anchor}" dominant-baseline="middle"${cls}${size}${weight}>${label(s)}</text>`;
  }

  // Arrow from (x1,y1) to (x2,y2) with a filled head. color: a | b | r | f | ink
  function arrow(x1, y1, x2, y2, color = 'a', opts = {}) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < 1) return '';
    const ux = dx / len, uy = dy / len;
    const head = Math.min(opts.head || 10, len * 0.6);
    const w = head * 0.55;
    const bx = x2 - ux * head, by = y2 - uy * head;
    const dash = opts.dash ? ' stroke-dasharray="5 4"' : '';
    const width = opts.width || 2.4;
    return `<line x1="${n1(x1)}" y1="${n1(y1)}" x2="${n1(bx)}" y2="${n1(by)}" class="s-${color}" stroke-width="${width}"${dash} stroke-linecap="round"/>` +
      `<polygon points="${n1(x2)},${n1(y2)} ${n1(bx - uy * w)},${n1(by + ux * w)} ${n1(bx + uy * w)},${n1(by - ux * w)}" class="f-${color}"/>`;
  }

  // Label placed just past the tip of an arrow, pushed away along its direction.
  function tipLabel(x1, y1, x2, y2, s, color, gap = 14) {
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
    const anchor = ux > 0.35 ? 'start' : ux < -0.35 ? 'end' : 'middle';
    return text(x2 + ux * gap, y2 + uy * gap, s, { anchor, cls: color ? `t-${color}` : '', bold: true });
  }

  function svg(w, h, body, title, minX = 0, minY = 0) {
    return `<svg viewBox="${n1(minX)} ${n1(minY)} ${n1(w)} ${n1(h)}" width="${Math.round(w)}" role="img" aria-label="${escText(title || 'Diagram')}">${body}</svg>`;
  }

  // Fit a list of points into a viewBox with padding.
  function bounds(points, pad) {
    const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
    const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad;
    return { minX, minY, w: Math.max(...xs) + pad - minX, h: Math.max(...ys) + pad - minY };
  }

  function isGravity(l) { return /^(mg|W|F_?g|F_?G|weight)/i.test(l) && !/sin|cos|\|\||⊥/.test(l); }

  // ---------- figure types ----------

  const FIGS = {};

  FIGS.fbd = ({ forces = [], object = 'box' }) => {
    const cx = 0, cy = 0, half = object === 'box' ? 24 : 4;
    let body = object === 'box'
      ? `<rect x="${-half}" y="${-half}" width="${half * 2}" height="${half * 2}" rx="3" class="body"/>`
      : `<circle cx="0" cy="0" r="5" class="f-ink"/>`;
    const pts = [[-half, -half], [half, half]];
    forces.forEach(f => {
      const a = (f.angle || 0) * D2R;
      const ux = Math.cos(a), uy = -Math.sin(a);
      // start on the edge of the box in that direction
      const edge = object === 'box' ? half / Math.max(Math.abs(ux), Math.abs(uy)) : 4;
      const L = 34 + 62 * (f.mag == null ? 1 : f.mag);
      const x1 = cx + ux * edge, y1 = cy + uy * edge, x2 = cx + ux * (edge + L), y2 = cy + uy * (edge + L);
      const color = isGravity(f.label || '') ? 'b' : 'a';
      body += arrow(x1, y1, x2, y2, color) + tipLabel(x1, y1, x2, y2, f.label || '', color);
      pts.push([x2 + ux * 46, y2 + uy * 22]);
    });
    const b = bounds(pts, 14);
    return svg(b.w, b.h, body, 'Free-body diagram', b.minX, b.minY);
  };

  // Ramp rising to the right. Returns geometry for reuse by incline-pulley.
  function rampGeometry(angle, L = 280) {
    const t = Math.min(Math.max(angle, 5), 65) * D2R; // keep extreme angles drawable
    const A = [0, 0], B = [L * Math.cos(t), 0], C = [L * Math.cos(t), -L * Math.sin(t)];
    const u = [Math.cos(t), -Math.sin(t)]; // up the slope
    const nrm = [-Math.sin(t), -Math.cos(t)]; // out of the surface
    return { t, A, B, C, u, nrm, L };
  }

  function rampSvg(g, angle) {
    const r = 46;
    return `<polygon points="${g.A.join(',')} ${n1(g.B[0])},${n1(g.B[1])} ${n1(g.C[0])},${n1(g.C[1])}" class="ramp"/>` +
      `<path d="M ${r} 0 A ${r} ${r} 0 0 0 ${n1(r * Math.cos(g.t))} ${n1(-r * Math.sin(g.t))}" class="s-ink" fill="none" stroke-width="1.5"/>` +
      text(-8, 4, `θ = ${angle}°`, { anchor: 'end', size: 13 });
  }

  function blockOnRamp(g, at, w, h, lbl) {
    const P = [g.A[0] + g.u[0] * at + g.nrm[0] * h / 2, g.A[1] + g.u[1] * at + g.nrm[1] * h / 2];
    const c = (su, sn) => [P[0] + g.u[0] * su * w / 2 + g.nrm[0] * sn * h / 2, P[1] + g.u[1] * su * w / 2 + g.nrm[1] * sn * h / 2];
    const pts = [c(-1, -1), c(1, -1), c(1, 1), c(-1, 1)].map(p => `${n1(p[0])},${n1(p[1])}`).join(' ');
    return {
      P,
      svg: `<polygon points="${pts}" class="body"/>` +
        // mass label sits just off the block's upper corner, clear of the force arrows
        (lbl ? text(P[0] + g.u[0] * (w / 2 + 6) + g.nrm[0] * (h / 2 + 10), P[1] + g.u[1] * (w / 2 + 6) + g.nrm[1] * (h / 2 + 10), lbl, { size: 12, bold: true, anchor: 'start' }) : ''),
    };
  }

  FIGS.incline = ({ angle = 30, label: lbl = '', show = ['mg', 'N'], friction = 'up', components = false }) => {
    const g = rampGeometry(angle);
    const blk = blockOnRamp(g, g.L * 0.5, 54, 36, lbl);
    const [px, py] = blk.P;
    let body = rampSvg(g, angle) + blk.svg;
    const pts = [g.A, g.B, g.C, [-70, 10]];
    // side: where the label sits relative to the arrow tip ('tip' = straight past it, 'left'/'right' = beside it)
    const add = (vx, vy, len, lab, color, opts = {}) => {
      const x2 = px + vx * len, y2 = py + vy * len;
      body += arrow(px, py, x2, y2, color, opts);
      if (lab && opts.side === 'left') body += text(x2 - 8, y2 + 4, lab, { anchor: 'end', cls: `t-${color}`, bold: true });
      else if (lab && opts.side === 'right') body += text(x2 + 8, y2 + 4, lab, { anchor: 'start', cls: `t-${color}`, bold: true });
      else if (lab) body += tipLabel(px, py, x2, y2, lab, color);
      const room = opts.side === 'left' ? -75 : opts.side === 'right' ? 85 : vx < -0.35 ? -80 : vx > 0.35 ? 80 : 0;
      pts.push([x2 + vx * 20 + room, y2 + vy * 22]);
    };
    const mgLen = 92;
    if (show.includes('N')) add(g.nrm[0], g.nrm[1], mgLen * Math.cos(g.t) + 10, 'F_N', 'a');
    if (show.includes('mg')) add(0, 1, mgLen, 'mg', 'b', { side: components ? 'left' : 'tip' });
    if (components) {
      add(-g.u[0], -g.u[1], Math.max(mgLen * Math.sin(g.t), 30), 'mg sinθ', 'b', { dash: true });
      add(-g.nrm[0], -g.nrm[1], mgLen * Math.cos(g.t), 'mg cosθ', 'b', { dash: true, side: 'right' });
    }
    if (show.includes('f')) {
      const s = friction === 'down' ? -1 : 1;
      add(g.u[0] * s, g.u[1] * s, 58, 'F_fr', 'f');
    }
    if (show.includes('T')) add(g.u[0], g.u[1], 80, 'T', 'r');
    if (show.includes('F')) add(g.u[0], g.u[1], 80, 'F', 'r');
    const b = bounds(pts, 18);
    return svg(b.w, b.h, body, `Block on a ${angle}° incline`, b.minX, b.minY);
  };

  function hangingBlock(x, yTop, lbl, w = 48, h = 40) {
    return `<rect x="${n1(x - w / 2)}" y="${n1(yTop)}" width="${w}" height="${h}" rx="3" class="body"/>` +
      text(x, yTop + h / 2, lbl, { size: 12, bold: true });
  }

  function pulley(x, y, r = 12) {
    return `<circle cx="${x}" cy="${y}" r="${r}" class="body"/><circle cx="${x}" cy="${y}" r="2.5" class="f-ink"/>`;
  }

  FIGS['pulley-table'] = ({ m1 = 'm₁', m2 = 'm₂', friction = false }) => {
    const top = 60, pr = 12, px = 236;
    let body = `<rect x="0" y="${top}" width="${px - 6}" height="14" class="ramp"/>` +
      `<line x1="20" y1="${top + 14}" x2="20" y2="200" class="s-ink" stroke-width="3"/><line x1="${px - 26}" y1="${top + 14}" x2="${px - 26}" y2="200" class="s-ink" stroke-width="3"/>`;
    body += `<rect x="70" y="${top - 40}" width="62" height="40" rx="3" class="body"/>` + text(101, top - 20, m1, { size: 12, bold: true });
    body += `<line x1="132" y1="${top - 20 + 0}" x2="${px}" y2="${top - 20 + 0}" class="s-ink" stroke-width="1.6"/>`;
    // pulley sits at the table corner, string leaves its top and right side
    body = body.replace(`y1="${top - 20}" x2="${px}" y2="${top - 20}"`, `y1="${top - pr}" x2="${px}" y2="${top - pr}"`);
    body += pulley(px, top, pr);
    body += `<line x1="${px + pr}" y1="${top}" x2="${px + pr}" y2="${top + 70}" class="s-ink" stroke-width="1.6"/>`;
    body += hangingBlock(px + pr, top + 70, m2);
    if (friction) body += arrow(80, top - 46, 40, top - 46, 'f') + text(36, top - 46, 'F_fr', { anchor: 'end', cls: 't-f', bold: true });
    return svg(300, 210, body, 'Block on a table connected over a pulley to a hanging block', -10, -10);
  };

  FIGS.atwood = ({ m1 = 'm₁', m2 = 'm₂' }) => {
    const px = 120, py = 40, r = 24;
    let body = `<line x1="60" y1="4" x2="180" y2="4" class="s-ink" stroke-width="3"/><line x1="${px}" y1="4" x2="${px}" y2="${py}" class="s-ink" stroke-width="1.6"/>`;
    body += `<line x1="${px - r}" y1="${py}" x2="${px - r}" y2="110" class="s-ink" stroke-width="1.6"/>`;
    body += `<line x1="${px + r}" y1="${py}" x2="${px + r}" y2="150" class="s-ink" stroke-width="1.6"/>`;
    body += pulley(px, py, r);
    body += hangingBlock(px - r, 110, m1) + hangingBlock(px + r, 150, m2);
    return svg(240, 210, body, 'Atwood machine: two masses hanging over a pulley', 0, 0);
  };

  FIGS['incline-pulley'] = ({ angle = 30, m1 = 'm₁', m2 = 'm₂' }) => {
    const g = rampGeometry(angle, 250);
    const blk = blockOnRamp(g, g.L * 0.45, 52, 34, m1);
    const pr = 11;
    const pc = [g.C[0] + g.nrm[0] * pr, g.C[1] + g.nrm[1] * pr];
    // string from block (parallel to slope) to top of pulley
    const s1 = [blk.P[0] + g.u[0] * 26, blk.P[1] + g.u[1] * 26];
    const s2 = [pc[0] + g.nrm[0] * pr, pc[1] + g.nrm[1] * pr];
    let body = rampSvg(g, angle) + blk.svg;
    body += `<line x1="${n1(s1[0])}" y1="${n1(s1[1])}" x2="${n1(s2[0])}" y2="${n1(s2[1])}" class="s-ink" stroke-width="1.6"/>`;
    body += pulley(n1(pc[0]), n1(pc[1]), pr);
    const hx = pc[0] + pr;
    body += `<line x1="${n1(hx)}" y1="${n1(pc[1])}" x2="${n1(hx)}" y2="${n1(pc[1] + 60)}" class="s-ink" stroke-width="1.6"/>`;
    body += hangingBlock(hx, pc[1] + 60, m2, 44, 38);
    const b = bounds([g.A, g.B, g.C, [-70, 10], [hx + 30, pc[1] + 100], [pc[0], pc[1] - 20]], 12);
    return svg(b.w, b.h, body, 'Block on an incline connected over a pulley to a hanging block', b.minX, b.minY);
  };

  FIGS.blocks = ({ labels = ['m₁', 'm₂'], force = 'F', from = 'left' }) => {
    let x = 70, body = '';
    const floor = 110;
    labels.forEach((l, i) => {
      const w = 58 + i * 6, h = 40 + i * 10;
      body += `<rect x="${x}" y="${floor - h}" width="${w}" height="${h}" rx="2" class="body"/>` + text(x + w / 2, floor - h / 2, l, { size: 12, bold: true });
      x += w;
    });
    body = `<line x1="0" y1="${floor}" x2="${x + 70}" y2="${floor}" class="s-ink" stroke-width="2"/>` + body;
    if (from === 'left') body += arrow(10, floor - 20, 68, floor - 20, 'r') + text(10, floor - 38, force, { anchor: 'start', cls: 't-r', bold: true });
    else body += arrow(x + 62, floor - 20, x + 2, floor - 20, 'r') + text(x + 62, floor - 38, force, { anchor: 'end', cls: 't-r', bold: true });
    return svg(x + 70, floor + 12, body, 'Blocks touching on a floor, pushed by a force', 0, 0);
  };

  FIGS.train = ({ labels = [], force = 'F' }) => {
    let x = 0, body = '';
    const floor = 80, w = 92, h = 42, gap = 16;
    labels.forEach((l, i) => {
      if (i) body += `<line x1="${x - gap}" y1="${floor - 16}" x2="${x}" y2="${floor - 16}" class="s-ink" stroke-width="3"/>`;
      body += `<rect x="${x}" y="${floor - h - 6}" width="${w}" height="${h}" rx="4" class="body"/>` +
        `<circle cx="${x + 18}" cy="${floor - 4}" r="5" class="f-ink"/><circle cx="${x + w - 18}" cy="${floor - 4}" r="5" class="f-ink"/>` +
        text(x + w / 2, floor - h / 2 - 6, l, { size: 11.5, bold: true });
      x += w + gap;
    });
    x -= gap;
    body = `<line x1="-6" y1="${floor + 1}" x2="${x + 96}" y2="${floor + 1}" class="s-ink" stroke-width="2"/>` + body;
    body += `<line x1="${x}" y1="${floor - 16}" x2="${x + 12}" y2="${floor - 16}" class="s-ink" stroke-width="3"/>`;
    body += arrow(x + 12, floor - 16, x + 84, floor - 16, 'r') + text(x + 48, floor - 34, force, { cls: 't-r', bold: true });
    return svg(x + 112, floor + 20, body, 'Train cars pulled by a locomotive', -10, 0);
  };

  FIGS.elevator = ({ a = 'up', v = 'none', label: lbl = 'm' }) => {
    let body = `<rect x="10" y="10" width="110" height="180" rx="4" class="s-ink" fill="none" stroke-width="2" stroke-dasharray="6 5"/>`;
    body += `<line x1="65" y1="0" x2="65" y2="50" class="s-ink" stroke-width="1.6"/>`;
    body += `<rect x="25" y="50" width="80" height="100" rx="4" class="body"/>`;
    body += `<circle cx="65" cy="82" r="9" class="s-ink" fill="none" stroke-width="2"/><line x1="65" y1="91" x2="65" y2="122" class="s-ink" stroke-width="2"/><line x1="65" y1="122" x2="56" y2="146" class="s-ink" stroke-width="2"/><line x1="65" y1="122" x2="74" y2="146" class="s-ink" stroke-width="2"/><line x1="52" y1="102" x2="78" y2="102" class="s-ink" stroke-width="2"/>`;
    body += `<rect x="45" y="146" width="40" height="4" class="f-ink"/>`;
    if (a !== 'none') body += (a === 'up' ? arrow(140, 125, 140, 75, 'r') : arrow(140, 75, 140, 125, 'r')) + text(152, 100, 'a', { anchor: 'start', cls: 't-r', bold: true });
    if (v !== 'none') body += (v === 'up' ? arrow(170, 125, 170, 75, 'b') : arrow(170, 75, 170, 125, 'b')) + text(182, 100, 'v', { anchor: 'start', cls: 't-b', bold: true });
    // FBD of the rider
    const fx = 250, fy = 100;
    const nLen = a === 'up' ? 70 : a === 'down' ? 34 : 52;
    body += `<rect x="${fx - 16}" y="${fy - 16}" width="32" height="32" rx="3" class="body"/>` + text(fx, fy, lbl, { size: 11, bold: true });
    body += arrow(fx, fy - 16, fx, fy - 16 - nLen, 'a') + text(fx + 8, fy - 16 - nLen, 'F_N', { anchor: 'start', cls: 't-a', bold: true });
    body += arrow(fx, fy + 16, fx, fy + 68, 'b') + text(fx + 8, fy + 64, 'mg', { anchor: 'start', cls: 't-b', bold: true });
    body += text(fx, 12, 'FBD of rider', { size: 11 });
    return svg(310, 200, body, `Elevator accelerating ${a}`, 0, 0);
  };

  FIGS['box-force'] = ({ angle = 30, label: lbl = 'F', mode = 'push' }) => {
    const t = angle * D2R;
    const floor = 120;
    let body = `<line x1="0" y1="${floor}" x2="320" y2="${floor}" class="s-ink" stroke-width="2"/>`;
    body += `<rect x="130" y="${floor - 60}" width="80" height="60" rx="3" class="body"/>` + text(170, floor - 30, 'm', { bold: true });
    if (mode === 'push') {
      const tip = [130, floor - 60], L = 100;
      const tail = [tip[0] - L * Math.cos(t), tip[1] - L * Math.sin(t)];
      body += arrow(tail[0], tail[1], tip[0], tip[1], 'r') + text(tail[0] - 4, tail[1] - 10, lbl, { anchor: 'end', cls: 't-r', bold: true });
      body += `<line x1="${tail[0]}" y1="${n1(tail[1])}" x2="${tip[0]}" y2="${n1(tail[1])}" class="s-ink" stroke-dasharray="4 4" stroke-width="1.2"/>`;
      body += text(tail[0] + 40, tail[1] + 12, 'θ', { size: 13 });
    } else {
      const tail = [210, floor - 30], L = 100;
      const tip = [tail[0] + L * Math.cos(t), tail[1] - L * Math.sin(t)];
      body += arrow(tail[0], tail[1], tip[0], tip[1], 'r') + text(tip[0] + 6, tip[1] - 8, lbl, { anchor: 'start', cls: 't-r', bold: true });
      body += `<line x1="${tail[0]}" y1="${tail[1]}" x2="${tail[0] + 80}" y2="${tail[1]}" class="s-ink" stroke-dasharray="4 4" stroke-width="1.2"/>`;
      body += text(tail[0] + 48, tail[1] - 10, 'θ', { size: 13 });
    }
    return svg(340, floor + 12, body, mode === 'push' ? `Box pushed at ${angle}° below horizontal` : `Box pulled at ${angle}° above horizontal`, -10, 0);
  };

  // ---------- graphs ----------

  function niceStep(range, target = 5) {
    const raw = range / target;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const f = raw / mag;
    return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag;
  }

  const AXIS = { 'x-t': ['x (m)', 'position'], 'v-t': ['v (m/s)', 'velocity'], 'a-t': ['a (m/s²)', 'acceleration'] };

  // Shared plotting routine (also used by the motion-graphs simulation).
  function plot(series, opts = {}) {
    const W = opts.w || 320, H = opts.h || 190;
    const m = { l: 44, r: 12, t: 26, b: 34 };
    const all = series.flatMap(s => s.points);
    const ts = all.map(p => p[0]), ys = all.map(p => p[1]);
    let t0 = opts.tRange ? opts.tRange[0] : Math.min(0, ...ts), t1 = opts.tRange ? opts.tRange[1] : Math.max(...ts);
    let y0 = opts.yRange ? opts.yRange[0] : Math.min(0, ...ys), y1 = opts.yRange ? opts.yRange[1] : Math.max(0, ...ys);
    if (y1 - y0 < 1e-9) { y0 -= 1; y1 += 1; }
    if (!opts.yRange) { const pad = (y1 - y0) * 0.08; y1 += pad; if (y0 < 0) y0 -= pad; }
    if (t1 - t0 < 1e-9) t1 = t0 + 1;
    const X = t => m.l + (t - t0) / (t1 - t0) * (W - m.l - m.r);
    const Y = y => H - m.b - (y - y0) / (y1 - y0) * (H - m.t - m.b);
    let body = '';
    // grid + ticks
    const ty = niceStep(y1 - y0, 4), tt = niceStep(t1 - t0, 5);
    for (let y = Math.ceil(y0 / ty) * ty; y <= y1 + 1e-9; y += ty) {
      body += `<line x1="${m.l}" y1="${n1(Y(y))}" x2="${W - m.r}" y2="${n1(Y(y))}" class="grid"/>`;
      if (opts.ticks !== false) body += `<text x="${m.l - 6}" y="${n1(Y(y))}" text-anchor="end" dominant-baseline="middle" font-size="11">${+y.toFixed(6)}</text>`;
    }
    for (let t = Math.ceil(t0 / tt) * tt; t <= t1 + 1e-9; t += tt) {
      body += `<line x1="${n1(X(t))}" y1="${m.t}" x2="${n1(X(t))}" y2="${H - m.b}" class="grid"/>`;
      if (opts.ticks !== false) body += `<text x="${n1(X(t))}" y="${H - m.b + 14}" text-anchor="middle" font-size="11">${+t.toFixed(6)}</text>`;
    }
    // axes (t-axis drawn at y = 0)
    const zeroY = Y(Math.min(Math.max(0, y0), y1));
    body += `<line x1="${m.l}" y1="${n1(zeroY)}" x2="${W - m.r}" y2="${n1(zeroY)}" class="s-ink" stroke-width="1.6"/>`;
    body += `<line x1="${m.l}" y1="${m.t}" x2="${m.l}" y2="${H - m.b}" class="s-ink" stroke-width="1.6"/>`;
    body += `<text x="${W - m.r}" y="${H - 6}" text-anchor="end" font-size="12" font-weight="700">t (s)</text>`;
    body += `<text x="4" y="2" text-anchor="start" font-size="12" font-weight="700" dominant-baseline="hanging">${escText(opts.yLabel || '')}</text>`;
    series.forEach(s => {
      const d = s.points.map((p, i) => `${i ? 'L' : 'M'}${n1(X(p[0]))} ${n1(Y(p[1]))}`).join(' ');
      body += `<path d="${d}" fill="none" class="s-${s.color || 'a'}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`;
    });
    if (opts.marker) {
      const [mt, my] = opts.marker;
      body += `<line x1="${n1(X(mt))}" y1="${m.t}" x2="${n1(X(mt))}" y2="${H - m.b}" class="s-r" stroke-width="1.4" stroke-dasharray="3 3"/>`;
      body += `<circle cx="${n1(X(mt))}" cy="${n1(Y(my))}" r="4.5" class="f-r"/>`;
    }
    return { svg: svg(W, H, body, opts.title || 'Graph'), X, Y };
  }

  FIGS.graph = ({ type = 'x-t', points, fn, t = [0, 10], yLabel, ticks = true }) => {
    let pts = points;
    if (!pts && fn) {
      pts = [];
      for (let i = 0; i <= 60; i++) { const tt = t[0] + (t[1] - t[0]) * i / 60; pts.push([tt, fn(tt)]); }
    }
    const lbl = yLabel || (AXIS[type] || [type])[0];
    return plot([{ points: pts || [[0, 0]], color: type === 'v-t' ? 'b' : type === 'a-t' ? 'r' : 'a' }],
      { yLabel: lbl, ticks, title: `${(AXIS[type] || ['', type])[1]} vs. time graph` }).svg;
  };

  // ---------- vectors ----------

  FIGS.vectors = ({ vectors = [], grid = true }) => {
    const segs = vectors.map(v => {
      const tail = v.tail || [0, 0];
      return { ...v, x1: tail[0], y1: tail[1], x2: tail[0] + v.x, y2: tail[1] + v.y };
    });
    const xs = segs.flatMap(s => [s.x1, s.x2, 0]), ys = segs.flatMap(s => [s.y1, s.y2, 0]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const span = Math.max(maxX - minX, maxY - minY, 1);
    const S = 240 / span;
    const P = (x, y) => [x * S, -y * S];
    let body = '';
    if (grid) {
      const step = niceStep(span, 6);
      for (let x = Math.floor(minX / step) * step; x <= maxX + 1e-9; x += step) { const [a] = P(x, 0); body += `<line x1="${n1(a)}" y1="${n1(-maxY * S)}" x2="${n1(a)}" y2="${n1(-minY * S)}" class="grid"/>`; }
      for (let y = Math.floor(minY / step) * step; y <= maxY + 1e-9; y += step) { const [, b] = P(0, y); body += `<line x1="${n1(minX * S)}" y1="${n1(b)}" x2="${n1(maxX * S)}" y2="${n1(b)}" class="grid"/>`; }
    }
    body += `<line x1="${n1(minX * S)}" y1="0" x2="${n1(maxX * S)}" y2="0" class="s-ink" stroke-width="1.2" opacity="0.6"/>`;
    body += `<line x1="0" y1="${n1(-maxY * S)}" x2="0" y2="${n1(-minY * S)}" class="s-ink" stroke-width="1.2" opacity="0.6"/>`;
    const colorOf = k => k === 'r' ? 'r' : k === 'b' ? 'b' : k === 'f' ? 'f' : 'a';
    segs.forEach(s => {
      const [a, b] = P(s.x1, s.y1), [c, d] = P(s.x2, s.y2);
      const col = colorOf(s.kind);
      body += arrow(a, b, c, d, col, { dash: s.dash, width: s.kind === 'r' ? 3 : 2.4 });
      if (s.label) {
        const len = Math.hypot(c - a, d - b) || 1;
        const nx = -(d - b) / len, ny = (c - a) / len; // left-hand normal
        body += text((a + c) / 2 + nx * 14, (b + d) / 2 + ny * 14, s.label, { cls: `t-${col}`, bold: true });
      }
    });
    const pad = 30;
    return svg((maxX - minX) * S + pad * 2, (maxY - minY) * S + pad * 2, body, 'Vector diagram', minX * S - pad, -maxY * S - pad);
  };

  // ---------- projectile ----------

  FIGS.projectile = ({ v0 = 20, angle = 45, h = 0, components = true, g = 9.8 }) => {
    const vx = v0 * Math.cos(angle * D2R), vy = v0 * Math.sin(angle * D2R);
    const T = (vy + Math.sqrt(vy * vy + 2 * g * h)) / g;
    const R = vx * T, H = h + vy * vy / (2 * g);
    const span = Math.max(R, H, 1);
    const S = 260 / span;
    const P = (x, y) => [x * S, -y * S];
    let pathD = '';
    for (let i = 0; i <= 40; i++) {
      const t = T * i / 40;
      const [a, b] = P(vx * t, h + vy * t - 0.5 * g * t * t);
      pathD += `${i ? 'L' : 'M'}${n1(a)} ${n1(b)}`;
    }
    let body = '';
    if (h > 0) body += `<rect x="${n1(-40)}" y="${n1(-h * S)}" width="40" height="${n1(h * S)}" class="ramp"/>`;
    body += `<line x1="-40" y1="0" x2="${n1(R * S + 20)}" y2="0" class="s-ink" stroke-width="2"/>`;
    body += `<path d="${pathD}" fill="none" class="s-ink" stroke-width="1.8" stroke-dasharray="5 5"/>`;
    const [lx, ly] = P(0, h);
    if (components) {
      const k = 70 / v0;
      body += arrow(lx, ly, lx + vx * k, ly - vy * k, 'r') + text(lx + vx * k + 6, ly - vy * k - 6, 'v_0', { anchor: 'start', cls: 't-r', bold: true });
      body += arrow(lx, ly, lx + vx * k, ly, 'a', { dash: true }) + text(lx + vx * k / 2, ly + 14, 'v_0x', { cls: 't-a', bold: true });
      body += arrow(lx, ly, lx, ly - vy * k, 'b', { dash: true }) + text(lx - 6, ly - vy * k / 2, 'v_0y', { anchor: 'end', cls: 't-b', bold: true });
    }
    body += `<circle cx="${n1(lx)}" cy="${n1(ly)}" r="5" class="f-ink"/>`;
    const top = -H * S;
    return svg(R * S + 120, H * S + 60, body, 'Projectile path', -60, top - 30);
  };

  FIGS.river = ({ across = 4, down = 3, width = '' }) => {
    const W = 300, Hh = 150;
    const k = 100 / Math.max(across, down);
    let body = `<rect x="0" y="0" width="${W}" height="16" class="ramp"/><rect x="0" y="${Hh - 16}" width="${W}" height="16" class="ramp"/>`;
    for (let i = 0; i < 3; i++) body += arrow(30 + i * 90, 40, 70 + i * 90, 40, 'b', { head: 7, width: 1.6 });
    body += text(W - 6, 56, 'current', { anchor: 'end', size: 11, cls: 't-b' });
    const sx = 70, sy = Hh - 22;
    body += arrow(sx, sy, sx, sy - across * k, 'a') + text(sx - 8, sy - across * k / 2, 'v_boat', { anchor: 'end', cls: 't-a', bold: true });
    body += arrow(sx, sy, sx + down * k, sy, 'b') + text(sx + down * k / 2, sy + 12, 'v_water', { cls: 't-b', bold: true });
    body += arrow(sx, sy, sx + down * k, sy - across * k, 'r', { width: 3 }) + text(sx + down * k + 6, sy - across * k, 'v_net', { anchor: 'start', cls: 't-r', bold: true });
    if (width) body += text(W - 20, Hh / 2 + 10, `width ${width}`, { anchor: 'end', size: 12 });
    return svg(W, Hh, body, 'Boat crossing a river with a current');
  };

  // ---------- statics ----------

  const fmtLen = v => String(Math.round(v * 100) / 100);

  FIGS.beam = ({ length = 1, supports = [], loads = [], wall = null, strut = null, dims = false, unit = 'm' }) => {
    const W = 300, S = W / length, X = x => x * S;
    const pts = [[0, -20], [W, 40]];
    let body = '';
    const ceilY = -96;
    if (wall) {
      const wx = wall === 'left' ? -14 : W;
      body += `<rect x="${wx}" y="-130" width="14" height="190" class="ramp"/>`;
      pts.push([wx - 4, -130], [wx + 18, 60]);
    }
    if (strut) {
      const bx = X(strut.x), wx = wall === 'right' ? W : 0;
      const dy = Math.abs(bx - wx) * Math.tan((strut.angle || 30) * D2R);
      const top = Math.max(-dy, -125);
      body += `<line x1="${n1(bx)}" y1="0" x2="${wx}" y2="${n1(top)}" class="s-ink" stroke-width="1.8"/>`;
      // label near the wall end of the wire, angle just inside the corner it makes with the beam
      const lx = wx + (bx - wx) * 0.22, ly = top * 0.78;
      body += text(lx + (wx < bx ? 4 : -4), ly - 12, strut.label || 'T', { anchor: wx < bx ? 'start' : 'end', cls: 't-a', bold: true });
      body += text(bx + (wx < bx ? -40 : 40), -9, `${strut.angle}°`, { size: 12 });
      pts.push([wx, top]);
    }
    supports.forEach(sp => {
      const x = X(sp.x);
      if (sp.kind === 'cable') {
        body += `<line x1="${n1(x)}" y1="0" x2="${n1(x)}" y2="${ceilY}" class="s-ink" stroke-width="1.8"/>` +
          `<line x1="${n1(x - 18)}" y1="${ceilY}" x2="${n1(x + 18)}" y2="${ceilY}" class="s-ink" stroke-width="3"/>`;
        const right = x > W / 2;
        if (sp.label) body += text(x + (right ? -7 : 7), ceilY / 2, sp.label, { anchor: right ? 'end' : 'start', cls: 't-a', bold: true });
        pts.push([x, ceilY - 6]);
      } else if (sp.kind === 'hinge') {
        body += `<circle cx="${n1(x)}" cy="5" r="5" class="f-ink"/>`;
        if (sp.label) body += text(x + (x < W / 2 ? 10 : -10), 26, sp.label, { anchor: x < W / 2 ? 'start' : 'end', size: 12, bold: true });
      } else {
        body += `<polygon points="${n1(x)},10 ${n1(x - 12)},32 ${n1(x + 12)},32" class="body"/>`;
        if (sp.label) body += text(x, 46, sp.label, { size: 12, bold: true });
        pts.push([x, 52]);
      }
    });
    body += `<rect x="0" y="0" width="${W}" height="10" rx="2" class="body"/>`;
    loads.forEach(ld => {
      const x = X(ld.x), kind = ld.kind || 'mass';
      if (kind === 'arrow') {
        const up = ld.dir === 'up';
        body += up ? arrow(x, -4, x, -58, 'r') + text(x, -70, ld.label || '', { cls: 't-r', bold: true })
          : arrow(x, -58, x, -2, 'r') + text(x, -70, ld.label || '', { cls: 't-r', bold: true });
        pts.push([x - 30, -80], [x + 30, -80]);
      } else if (kind === 'person') {
        body += `<circle cx="${n1(x)}" cy="-52" r="7" class="s-ink" fill="none" stroke-width="2"/><line x1="${n1(x)}" y1="-45" x2="${n1(x)}" y2="-22" class="s-ink" stroke-width="2"/><line x1="${n1(x)}" y1="-22" x2="${n1(x - 7)}" y2="0" class="s-ink" stroke-width="2"/><line x1="${n1(x)}" y1="-22" x2="${n1(x + 7)}" y2="0" class="s-ink" stroke-width="2"/><line x1="${n1(x - 10)}" y1="-38" x2="${n1(x + 10)}" y2="-38" class="s-ink" stroke-width="2"/>`;
        if (ld.label) body += text(x, -70, ld.label, { size: 12, bold: true });
        pts.push([x - 30, -80], [x + 30, -80]);
      } else {
        body += `<line x1="${n1(x)}" y1="10" x2="${n1(x)}" y2="34" class="s-ink" stroke-width="1.5"/>` +
          `<rect x="${n1(x - 22)}" y="34" width="44" height="26" rx="3" class="body"/>` + text(x, 47, ld.label || '', { size: 11, bold: true });
        pts.push([x - 26, 64], [x + 26, 64]);
      }
    });
    if (dims) {
      const xs = [...new Set([0, length, ...loads.map(l => l.x), ...supports.map(sp => sp.x), ...(strut ? [strut.x] : [])])].sort((a, b) => a - b);
      const dy = 84;
      body += `<line x1="0" y1="${dy}" x2="${W}" y2="${dy}" class="s-ink" stroke-width="1" opacity="0.7"/>`;
      xs.forEach((v, i) => {
        body += `<line x1="${n1(X(v))}" y1="${dy - 5}" x2="${n1(X(v))}" y2="${dy + 5}" class="s-ink" stroke-width="1"/>`;
        if (i && X(v) - X(xs[i - 1]) > 22) body += text((X(v) + X(xs[i - 1])) / 2, dy + 14, `${fmtLen(v - xs[i - 1])} ${unit}`, { size: 11 });
      });
      pts.push([0, dy + 24]);
    }
    const b = bounds(pts, 16);
    return svg(b.w, b.h, body, 'Beam in static equilibrium', b.minX, b.minY);
  };

  FIGS.ladder = ({ angle = 60, person = null, forces = true }) => {
    const L = 230, t = angle * D2R;
    const top = [L * Math.cos(t), -L * Math.sin(t)];
    let body = `<line x1="-40" y1="0" x2="${n1(top[0] + 14)}" y2="0" class="s-ink" stroke-width="2"/>` +
      `<rect x="${n1(top[0] + 2)}" y="${n1(top[1] - 30)}" width="12" height="${n1(-top[1] + 30)}" class="ramp"/>`;
    const ux = Math.cos(t), uy = -Math.sin(t), nx = -uy * 5, ny = ux * 5;
    body += `<line x1="${n1(nx)}" y1="${n1(ny)}" x2="${n1(top[0] + nx)}" y2="${n1(top[1] + ny)}" class="s-ink" stroke-width="2"/><line x1="${n1(-nx)}" y1="${n1(-ny)}" x2="${n1(top[0] - nx)}" y2="${n1(top[1] - ny)}" class="s-ink" stroke-width="2"/>`;
    for (let i = 1; i < 10; i++) { const px = top[0] * i / 10, py = top[1] * i / 10; body += `<line x1="${n1(px + nx)}" y1="${n1(py + ny)}" x2="${n1(px - nx)}" y2="${n1(py - ny)}" class="s-ink" stroke-width="1.5"/>`; }
    body += `<path d="M 40 0 A 40 40 0 0 0 ${n1(40 * Math.cos(t))} ${n1(-40 * Math.sin(t))}" class="s-ink" fill="none" stroke-width="1.4"/>` + text(48, -12, `θ = ${angle}°`, { anchor: 'start', size: 12 });
    if (person != null) {
      const px = top[0] * person, py = top[1] * person;
      body += `<circle cx="${n1(px)}" cy="${n1(py - 34)}" r="6" class="f-r"/><line x1="${n1(px)}" y1="${n1(py - 28)}" x2="${n1(px)}" y2="${n1(py - 8)}" class="s-r" stroke-width="2.4"/>`;
      if (forces) body += arrow(px + 12, py - 16, px + 12, py + 40, 'b') + text(px + 18, py + 34, 'Mg', { anchor: 'start', cls: 't-b', bold: true });
    }
    if (forces) {
      const mx = top[0] / 2, my = top[1] / 2;
      body += arrow(mx, my, mx, my + 56, 'b') + text(mx - 8, my + 50, 'mg', { anchor: 'end', cls: 't-b', bold: true });
      body += arrow(top[0], top[1], top[0] - 56, top[1], 'a') + text(top[0] - 62, top[1], 'F_W', { anchor: 'end', cls: 't-a', bold: true });
      body += arrow(0, 0, 0, -62, 'a') + text(-8, -60, 'F_N', { anchor: 'end', cls: 't-a', bold: true });
      body += arrow(0, 4, 50, 4, 'f') + text(26, 20, 'F_fr', { cls: 't-f', bold: true });
    }
    const b = bounds([[-60, 30], [top[0] + 20, top[1] - 34], [-60, top[1] - 34]], 14);
    return svg(b.w, b.h, body, `Ladder leaning at ${angle}° against a wall`, b.minX, b.minY);
  };

  // ---------- circular motion ----------

  FIGS.circle = ({ show = ['v', 'a'], label = 'F_c' }) => {
    const R = 90, phi = 35 * D2R;
    const P = [R * Math.cos(phi), -R * Math.sin(phi)];
    const tx = -Math.sin(phi), ty = -Math.cos(phi); // CCW tangent in SVG coords
    let body = `<circle cx="0" cy="0" r="${R}" fill="none" class="s-ink" stroke-width="1.5" stroke-dasharray="5 5"/><circle cx="0" cy="0" r="3" class="f-ink"/>` +
      text(0, 14, 'center', { size: 11 });
    body += `<path d="M ${n1(R * Math.cos(-60 * D2R))} ${n1(-R * Math.sin(-60 * D2R))} A ${R} ${R} 0 0 0 ${n1(R * Math.cos(-20 * D2R))} ${n1(-R * Math.sin(-20 * D2R))}" fill="none" class="s-ink" stroke-width="2"/>`;
    body += arrow(R * Math.cos(-25 * D2R) - 3, -R * Math.sin(-25 * D2R) - 6, R * Math.cos(-20 * D2R) + 1, -R * Math.sin(-20 * D2R) - 2, 'ink', { head: 8, width: 2 });
    if (show.includes('v')) body += arrow(P[0], P[1], P[0] + tx * 62, P[1] + ty * 62, 'b') + tipLabel(P[0], P[1], P[0] + tx * 62, P[1] + ty * 62, 'v', 'b');
    const inward = show.includes('a') || show.includes('F');
    if (inward) {
      const lab = show.includes('a') && show.includes('F') ? `${label}, a_c` : show.includes('F') ? label : 'a_c';
      const ex = P[0] * 0.42, ey = P[1] * 0.42;
      body += arrow(P[0], P[1], ex, ey, 'r') + text(ex + 4, ey + 16, lab, { anchor: 'start', cls: 't-r', bold: true });
    }
    body += `<circle cx="${n1(P[0])}" cy="${n1(P[1])}" r="8" class="f-a"/>`;
    return svg(260, 250, body, 'Object moving in a circle: velocity tangent, acceleration toward the center', -130, -125);
  };

  FIGS.banked = ({ angle = 20, friction = 'none' }) => {
    const g = rampGeometry(angle, 260);
    const blk = blockOnRamp(g, g.L * 0.55, 56, 30, '');
    const [px, py] = blk.P;
    let body = rampSvg(g, angle) + blk.svg;
    const N = 80;
    body += arrow(px, py, px + g.nrm[0] * N, py + g.nrm[1] * N, 'a') + tipLabel(px, py, px + g.nrm[0] * N, py + g.nrm[1] * N, 'F_N', 'a');
    body += arrow(px, py, px, py + 72, 'b') + text(px + 8, py + 70, 'mg', { anchor: 'start', cls: 't-b', bold: true });
    if (friction !== 'none') {
      const s = friction === 'up' ? 1 : -1;
      body += arrow(px, py, px + g.u[0] * 52 * s, py + g.u[1] * 52 * s, 'f') + tipLabel(px, py, px + g.u[0] * 52 * s, py + g.u[1] * 52 * s, 'F_fr', 'f');
    }
    const cy = 30;
    body += arrow(g.B[0] - 20, cy, 30, cy, 'r', { dash: true }) + text(26, cy, 'to center of turn', { anchor: 'end', size: 11, cls: 't-r' });
    const b = bounds([g.A, g.B, g.C, [-130, cy + 12], [px - 70, py + g.nrm[1] * N - 20]], 14);
    return svg(b.w, b.h, body, `Car on a curve banked at ${angle}°`, b.minX, b.minY);
  };

  FIGS.loop = () => {
    const R = 90;
    let body = `<circle cx="0" cy="0" r="${R}" fill="none" class="s-ink" stroke-width="3"/><circle cx="0" cy="0" r="3" class="f-ink"/>`;
    // car at the top (inside the loop, upside down) and at the bottom
    body += `<rect x="-14" y="${-R + 3}" width="28" height="14" rx="4" class="body"/><rect x="-14" y="${R - 17}" width="28" height="14" rx="4" class="body"/>`;
    body += arrow(-8, -R + 17, -8, -R + 62, 'a') + text(-14, -R + 54, 'F_N', { anchor: 'end', cls: 't-a', bold: true });
    body += arrow(8, -R + 17, 8, -R + 62, 'b') + text(14, -R + 54, 'mg', { anchor: 'start', cls: 't-b', bold: true });
    body += text(0, -R - 14, 'top: both point down (to center)', { size: 11 });
    body += arrow(-8, R - 17, -8, R - 72, 'a') + text(-14, R - 64, 'F_N', { anchor: 'end', cls: 't-a', bold: true });
    body += arrow(8, R - 3, 8, R + 40, 'b') + text(14, R + 36, 'mg', { anchor: 'start', cls: 't-b', bold: true });
    body += text(0, R + 58, 'bottom: F_N up, mg down', { size: 11 });
    return svg(300, 300, body, 'Vertical loop: forces at the top and bottom', -150, -130);
  };

  FIGS.conical = ({ angle = 30 }) => {
    const L = 170, t = angle * D2R;
    const bx = L * Math.sin(t), by = L * Math.cos(t);
    let body = `<line x1="-60" y1="0" x2="120" y2="0" class="s-ink" stroke-width="3"/>`;
    body += `<line x1="0" y1="0" x2="0" y2="${n1(by + 10)}" class="s-ink" stroke-width="1.2" stroke-dasharray="4 4"/>`;
    body += `<ellipse cx="0" cy="${n1(by)}" rx="${n1(bx)}" ry="14" fill="none" class="s-ink" stroke-width="1.2" stroke-dasharray="5 4"/>`;
    body += `<line x1="0" y1="${n1(by)}" x2="${n1(bx)}" y2="${n1(by)}" class="s-ink" stroke-width="1.2" stroke-dasharray="4 4"/>` + text(bx / 2, by + 26, 'r', { bold: true });
    body += `<line x1="0" y1="0" x2="${n1(bx)}" y2="${n1(by)}" class="s-ink" stroke-width="1.8"/>` + text(bx / 2 - 8, by / 2 + 4, 'L', { anchor: 'end', bold: true });
    body += `<path d="M 0 40 A 40 40 0 0 0 ${n1(40 * Math.sin(t))} ${n1(40 * Math.cos(t))}" fill="none" class="s-ink" stroke-width="1.3"/>` + text(14, 56, 'θ', { anchor: 'start', size: 13 });
    const tx = -Math.sin(t), ty = -Math.cos(t);
    body += arrow(bx, by, bx + tx * 64, by + ty * 64, 'a') + text(bx + tx * 64 + 10, by + ty * 64, 'T', { anchor: 'start', cls: 't-a', bold: true });
    body += arrow(bx, by, bx, by + 60, 'b') + text(bx + 8, by + 56, 'mg', { anchor: 'start', cls: 't-b', bold: true });
    body += `<circle cx="${n1(bx)}" cy="${n1(by)}" r="9" class="f-r"/>`;
    const b = bounds([[-70, -6], [bx + 50, by + 70], [-bx - 10, by + 20]], 10);
    return svg(b.w, b.h, body, 'Conical pendulum', b.minX, b.minY);
  };

  FIGS.orbit = ({ label: lbl = 'satellite', planet = 'Earth' }) => {
    const R = 105, phi = 40 * D2R;
    const P = [R * Math.cos(phi), -R * Math.sin(phi)];
    let body = `<circle cx="0" cy="0" r="${R}" fill="none" class="s-ink" stroke-width="1.4" stroke-dasharray="5 5"/>`;
    body += `<circle cx="0" cy="0" r="38" class="f-b" opacity="0.28"/><circle cx="0" cy="0" r="38" fill="none" class="s-b" stroke-width="2"/>` + text(0, 0, planet, { size: 12, bold: true });
    const tx = -Math.sin(phi), ty = -Math.cos(phi);
    body += arrow(P[0], P[1], P[0] + tx * 60, P[1] + ty * 60, 'b') + tipLabel(P[0], P[1], P[0] + tx * 60, P[1] + ty * 60, 'v', 'b');
    body += arrow(P[0], P[1], P[0] * 0.5, P[1] * 0.5, 'a') + text(P[0] * 0.5 + 8, P[1] * 0.5 + 12, 'F_g', { anchor: 'start', cls: 't-a', bold: true });
    body += `<rect x="${n1(P[0] - 7)}" y="${n1(P[1] - 7)}" width="14" height="14" rx="2" class="f-r"/>` + text(P[0] + 12, P[1] - 14, lbl, { anchor: 'start', size: 11 });
    return svg(300, 270, body, 'Satellite in a circular orbit', -140, -135);
  };

  // ---------- public ----------

  function render(spec) {
    if (!spec) return '';
    const [type, params] = spec;
    const fn = FIGS[type];
    if (!fn) return '';
    try {
      return `<div class="fig">${fn(params || {})}</div>`;
    } catch (e) {
      console.error('Figure failed', spec, e);
      return '';
    }
  }

  window.Fig = { render, plot, arrow, text, svg, label, niceStep };
})();

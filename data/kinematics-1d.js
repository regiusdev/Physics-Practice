// 1D Kinematics (Giancoli Ch. 2)
// Format: see docs/CONTENT-GUIDE.md. Math goes in \( ... \) or \[ ... \]; strings use the T tag.
(() => {
  const T = String.raw;
  window.UNIT_DATA = window.UNIT_DATA || {};
  window.UNIT_DATA['kinematics-1d'] = {
    summary: 'Describing motion along a straight line: where something is, how fast it is going, and how that speed changes.',

    // ------------------------------------------------------------------
    formulas: [
      { name: 'Average velocity', tex: T`\bar{v} = \frac{\Delta x}{\Delta t}`, note: 'Displacement ÷ time. Has a sign (direction).' },
      { name: 'Average speed', tex: T`\text{avg speed} = \frac{\text{total distance}}{\text{total time}}`, note: 'Always positive. Not the average of the speeds!' },
      { name: 'Average acceleration', tex: T`\bar{a} = \frac{\Delta v}{\Delta t} = \frac{v - v_0}{t}` },
      { name: 'Big 3 #1: no Δx', tex: T`v = v_0 + at`, note: 'Constant acceleration only.' },
      { name: 'Big 3 #2: no v', tex: T`\Delta x = v_0 t + \tfrac{1}{2}at^2`, note: 'Constant acceleration only.' },
      { name: 'Big 3 #3: no t', tex: T`v^2 = v_0^2 + 2a\,\Delta x`, note: 'Use when time is not given or asked for.' },
      { name: 'Average-velocity form: no a', tex: T`\Delta x = \tfrac{1}{2}(v_0 + v)\,t`, note: 'Constant acceleration only.' },
      { name: 'Free fall', tex: T`a = -g = -9.80\ \text{m/s}^2`, note: 'Taking up as positive. Same on the way up, at the top, and on the way down.' },
      { name: 'Unit conversion', tex: T`1\ \text{m/s} = 3.6\ \text{km/h}`, note: 'km/h ÷ 3.6 = m/s.' },
    ],

    // ------------------------------------------------------------------
    concepts: [
      {
        title: 'Distance vs. displacement',
        body: T`<p><strong>Distance</strong> is the total path length you traveled. It is always positive. <strong>Displacement</strong> \(\Delta x = x - x_0\) is the straight-line change in position, and its sign tells you the direction.</p><p>Run one full lap of a 400 m track: distance = 400 m, displacement = 0.</p>`,
      },
      {
        title: 'Velocity vs. speed',
        body: T`<p><strong>Velocity</strong> is a vector: it has a size <em>and</em> a direction (in 1D, a sign). <strong>Speed</strong> is just the size. A car going 20 m/s west has velocity \(-20\ \text{m/s}\) (if east is +) but speed \(20\ \text{m/s}\).</p><p>Average velocity uses displacement; average speed uses distance. That is why a full lap has zero average velocity but a non-zero average speed.</p>`,
      },
      {
        title: 'What the sign of acceleration means',
        body: T`<p>Acceleration tells you how velocity is <em>changing</em>. Negative acceleration does <strong>not</strong> automatically mean slowing down.</p><ul><li>\(v\) and \(a\) have the <strong>same sign</strong> → speeding up.</li><li>\(v\) and \(a\) have <strong>opposite signs</strong> → slowing down.</li></ul><p>A ball falling down (\(v < 0\)) with \(a = -9.80\ \text{m/s}^2\) is speeding up.</p>`,
      },
      {
        title: 'Reading position–time (x–t) graphs',
        body: T`<p>The <strong>slope</strong> of an x–t graph is the velocity. Steeper means faster; a flat line means stopped; a downward slope means moving in the − direction. A curved line means the velocity is changing (there is acceleration).</p><p>Below: moves forward at 2 m/s, sits still from 2 s to 4 s, then comes back to the start at −2 m/s.</p>`,
        fig: ['graph', { type: 'x-t', points: [[0, 0], [2, 4], [4, 4], [6, 0]], yLabel: 'x (m)', ticks: true }],
      },
      {
        title: 'Reading velocity–time (v–t) graphs',
        body: T`<p>The <strong>slope</strong> of a v–t graph is the acceleration. The <strong>area</strong> between the line and the time axis is the displacement (area below the axis counts as negative).</p><p>Below: speeds up at \(2\ \text{m/s}^2\) for 4 s, cruises at 8 m/s, then brakes to a stop. Displacement = area = \(16 + 32 + 8 = 56\ \text{m}\).</p>`,
        fig: ['graph', { type: 'v-t', points: [[0, 0], [4, 8], [8, 8], [10, 0]], yLabel: 'v (m/s)', ticks: true }],
      },
      {
        title: 'Free fall and the top of the path',
        body: T`<p>Anything moving only under gravity has \(a = -9.80\ \text{m/s}^2\) the whole time: going up, at the very top, and coming down. At the top, the velocity is momentarily <strong>zero</strong>, but the acceleration is still \(-g\).</p><p>The motion is symmetric: a ball thrown up at 15 m/s comes back down past the same height at 15 m/s, and the time up equals the time down.</p>`,
        fig: ['graph', { type: 'v-t', points: [[0, 15], [1.53, 0], [3.06, -15]], yLabel: 'v (m/s)', ticks: true }],
      },
      {
        title: 'Choosing a Big 3 equation',
        body: T`<p>Write down your knowns and your unknown: \(v_0\), \(v\), \(a\), \(t\), \(\Delta x\). Each Big 3 equation leaves one of them out, so pick the one that is missing the quantity you <em>don't know and don't want</em>.</p><ul><li>No \(\Delta x\)? → \(v = v_0 + at\)</li><li>No final \(v\)? → \(\Delta x = v_0 t + \tfrac12 at^2\)</li><li>No \(t\)? → \(v^2 = v_0^2 + 2a\,\Delta x\)</li></ul><p>Hidden knowns: "from rest" means \(v_0 = 0\); "comes to a stop" or "at the top" means \(v = 0\); "dropped" means \(v_0 = 0\) and \(a = -g\).</p>`,
      },
    ],

    sims: ['motion-graphs'],

    // ------------------------------------------------------------------
    mistakes: [
      {
        title: 'Mixing sign conventions mid-problem',
        wrong: 'Taking up as positive for the velocity but plugging in a = +9.80 m/s² for gravity, or calling a drop "−30 m" in one equation and "+30 m" in another.',
        right: 'Pick a positive direction at the start and write it down. Every vector (Δx, v₀, v, a) gets a sign from that choice. If up is +, gravity is −9.80 m/s² and landing below the start is a negative Δy.',
      },
      {
        title: 'Thinking "v = 0 at the top, so a = 0"',
        wrong: 'At the highest point the ball stops, so the acceleration must be zero too.',
        right: 'Velocity is zero for an instant, but gravity never turns off. a = −9.80 m/s² at the top, which is exactly why the ball starts coming back down.',
      },
      {
        title: 'Mixing up speed and velocity',
        wrong: 'Reporting a negative speed, or saying average velocity of a full lap is "400 m / 100 s = 4 m/s".',
        right: 'Speed is never negative. Average velocity uses displacement (0 for a full lap); average speed uses total distance (4 m/s here).',
      },
      {
        title: 'Averaging the speeds instead of using total distance ÷ total time',
        wrong: '3.0 h at 80 km/h then 2.0 h at 100 km/h → "average is (80 + 100)/2 = 90 km/h".',
        right: 'Find total distance (240 + 200 = 440 km) and divide by total time (5.0 h): 88 km/h. You spent more time going 80, so it counts more.',
      },
      {
        title: 'Using one Big 3 equation across different phases',
        wrong: 'A rocket accelerates at 20 m/s² for 4 s, then coasts. Plugging a = 20 m/s² into one equation for the whole flight.',
        right: 'The Big 3 only work while acceleration is constant. Split the motion into phases. The final velocity of one phase is the initial velocity of the next.',
      },
      {
        title: 'Forgetting to convert km/h (or mi/h) to m/s',
        wrong: 'Plugging 80 km/h straight into v = v₀ + at with a in m/s².',
        right: 'Convert first: 80 km/h ÷ 3.6 = 22.2 m/s. Units must match before you substitute. Check: does your answer have the units you expect?',
      },
      {
        title: 'Dropping the ½ (or the square)',
        wrong: 'Writing Δx = v₀t + at², or Δx = v₀t + ½at.',
        right: 'It is ½at². A quick sanity check: every term in an equation must have the same units. at has units of m/s, not m, so it cannot be added to v₀t.',
      },
      {
        title: 'Calling the starting height "Δy"',
        wrong: 'A ball thrown up from a 20 m roof lands on the ground, so "Δy = 20 m".',
        right: 'Δy is final minus initial position. From the roof to the ground, with up as +, Δy = 0 − 20 = −20 m.',
      },
    ],

    // ------------------------------------------------------------------
    examples: [
      {
        title: 'Jet landing on a carrier',
        source: 'Kinematics Quiz 2',
        problem: T`A jet lands on an aircraft carrier at \(63\ \text{m/s}\) (about 140 mi/h) and stops in \(2.0\ \text{s}\). (a) What is its acceleration? (b) How far does it travel while stopping?`,
        steps: [
          T`Knowns (forward is +): \(v_0 = 63\ \text{m/s}\), \(v = 0\), \(t = 2.0\ \text{s}\).`,
          T`(a) Equation: \(v = v_0 + at \Rightarrow a = \dfrac{v - v_0}{t}\)`,
          T`Substitution: \(a = \dfrac{0 - 63\ \text{m/s}}{2.0\ \text{s}} = -31.5\ \text{m/s}^2\)`,
          T`(b) Equation (no \(a\) needed): \(\Delta x = \tfrac12(v_0 + v)\,t\)`,
          T`Substitution: \(\Delta x = \tfrac12(63\ \text{m/s} + 0)(2.0\ \text{s}) = 63\ \text{m}\)`,
        ],
        answer: T`\(a = -31.5\ \text{m/s}^2\) (negative = opposite the motion), \(\Delta x = 63\ \text{m}\)`,
      },
      {
        title: 'Crossing an intersection',
        source: 'Kinematics Quiz 2',
        problem: T`How long does it take a car to cross a \(30.0\ \text{m}\) wide intersection after the light turns green, if it accelerates from rest at a constant \(5.0\ \text{m/s}^2\)?`,
        steps: [
          T`Knowns: \(v_0 = 0\), \(a = 5.0\ \text{m/s}^2\), \(\Delta x = 30.0\ \text{m}\). Unknown: \(t\). No final \(v\) needed.`,
          T`Equation: \(\Delta x = v_0 t + \tfrac12 a t^2\), and with \(v_0 = 0\): \(t = \sqrt{\dfrac{2\Delta x}{a}}\)`,
          T`Substitution: \(t = \sqrt{\dfrac{2(30.0\ \text{m})}{5.0\ \text{m/s}^2}} = \sqrt{12\ \text{s}^2}\)`,
        ],
        answer: T`\(t \approx 3.46\ \text{s}\)`,
      },
      {
        title: 'Ball thrown downward',
        source: 'Kinematics Quiz 2',
        problem: T`A ball is thrown straight down with an initial speed of \(8.00\ \text{m/s}\) from a height of \(30.0\ \text{m}\). How many seconds later does it strike the ground?`,
        steps: [
          T`Take <strong>down as positive</strong> so everything is positive: \(v_0 = 8.00\ \text{m/s}\), \(a = 9.80\ \text{m/s}^2\), \(\Delta y = 30.0\ \text{m}\).`,
          T`Equation: \(\Delta y = v_0 t + \tfrac12 a t^2\)`,
          T`Substitution: \(30.0 = 8.00t + 4.90t^2 \Rightarrow 4.90t^2 + 8.00t - 30.0 = 0\)`,
          T`Quadratic formula (keep the positive root): \(t = \dfrac{-8.00 + \sqrt{8.00^2 + 4(4.90)(30.0)}}{2(4.90)} = \dfrac{-8.00 + 25.5}{9.80}\)`,
          T`Shortcut that avoids the quadratic: find \(v\) first with \(v^2 = v_0^2 + 2a\Delta y = 64 + 588 = 652 \Rightarrow v = 25.5\ \text{m/s}\), then \(t = (v - v_0)/a = 17.5/9.80\).`,
        ],
        answer: T`\(t \approx 1.79\ \text{s}\)`,
      },
      {
        title: 'Where do the two balls meet?',
        source: 'Kinematics Quiz 2',
        problem: T`A ball is dropped from a window \(40.0\ \text{m}\) above the ground. At the same instant, a second ball is thrown straight up from the ground at \(20.0\ \text{m/s}\). At what height above the ground do they meet?`,
        steps: [
          T`Up is +, ground is \(y = 0\). Write a position equation for each ball: \(y = y_0 + v_0 t + \tfrac12 a t^2\).`,
          T`Dropped ball: \(y_1 = 40.0 - 4.90t^2\). Thrown ball: \(y_2 = 20.0t - 4.90t^2\).`,
          T`They meet when \(y_1 = y_2\): \(40.0 - 4.90t^2 = 20.0t - 4.90t^2\). The \(4.90t^2\) cancels! \(\Rightarrow t = \dfrac{40.0\ \text{m}}{20.0\ \text{m/s}} = 2.00\ \text{s}\)`,
          T`Height: \(y = 40.0 - 4.90(2.00)^2 = 40.0 - 19.6\)`,
        ],
        answer: T`They meet \(20.4\ \text{m}\) above the ground, \(2.00\ \text{s}\) after release.`,
      },
      {
        title: 'Rocket that runs out of fuel',
        source: 'Linear Motion Practice Ch. 2',
        problem: T`A test rocket is fired straight up from rest with a net upward acceleration of \(20\ \text{m/s}^2\). After \(4.0\ \text{s}\) the motor turns off, but the rocket keeps coasting upward. What maximum height does it reach?`,
        steps: [
          T`Two phases with different accelerations, so do them separately. Up is +.`,
          T`Phase 1 (motor on): \(v = v_0 + at = 0 + (20\ \text{m/s}^2)(4.0\ \text{s}) = 80\ \text{m/s}\)`,
          T`\(\Delta y_1 = v_0 t + \tfrac12 a t^2 = 0 + \tfrac12(20\ \text{m/s}^2)(4.0\ \text{s})^2 = 160\ \text{m}\)`,
          T`Phase 2 (coasting): now \(v_0 = 80\ \text{m/s}\), \(a = -9.80\ \text{m/s}^2\), and \(v = 0\) at the top. Use \(v^2 = v_0^2 + 2a\Delta y\):`,
          T`\(0 = (80)^2 + 2(-9.80)\Delta y_2 \Rightarrow \Delta y_2 = \dfrac{6400}{19.6} = 327\ \text{m}\)`,
          T`Total: \(160\ \text{m} + 327\ \text{m} = 487\ \text{m}\)`,
        ],
        answer: T`\(\approx 490\ \text{m}\) (choice A on the practice test)`,
      },
      {
        title: 'Water balloon off the roof',
        source: 'Test 1 makeup',
        problem: T`A water balloon is thrown straight up at \(15\ \text{m/s}\) from the roof of HSE, \(20\ \text{m}\) above the ground. (a) What maximum height above the ground does it reach? (b) How long until it hits the ground? (c) What is its velocity when it hits? (d) If a second balloon were thrown <em>down</em> at 15 m/s, what would its final velocity be?`,
        steps: [
          T`Up is +, origin at the roof. \(v_0 = +15\ \text{m/s}\), \(a = -9.80\ \text{m/s}^2\). The ground is at \(\Delta y = -20\ \text{m}\).`,
          T`(a) At the top \(v = 0\): \(0 = 15^2 + 2(-9.80)\Delta y \Rightarrow \Delta y = \dfrac{225}{19.6} = 11.5\ \text{m}\) above the roof, so \(20 + 11.5 = 31.5\ \text{m}\) above the ground.`,
          T`(c) (easier before (b)): \(v^2 = v_0^2 + 2a\Delta y = 15^2 + 2(-9.80)(-20) = 617 \Rightarrow v = -24.8\ \text{m/s}\) (negative: moving down).`,
          T`(b) \(v = v_0 + at \Rightarrow t = \dfrac{v - v_0}{a} = \dfrac{-24.8 - 15}{-9.80} = 4.07\ \text{s}\)`,
          T`(d) Thrown down: \(v_0 = -15\ \text{m/s}\), but \(v_0^2\) is still 225, so \(v^2 = 617\) again → \(v = -24.8\ \text{m/s}\). Same speed! The up-thrown balloon passes the roof on the way down at 15 m/s anyway.`,
        ],
        answer: T`(a) \(31.5\ \text{m}\) (b) \(4.07\ \text{s}\) (c) \(24.8\ \text{m/s}\) downward (d) also \(24.8\ \text{m/s}\) downward`,
      },
    ],

    // ------------------------------------------------------------------
    quiz: [
      {
        source: 'Linear Motion Practice',
        q: T`A motorist travels for 3.0 h at 80 km/h and 2.0 h at 100 km/h. What is her average speed for the trip?`,
        choices: ['88 km/h', '85 km/h', '90 km/h', '92 km/h'],
        answer: 0,
        explain: T`Total distance = \(240 + 200 = 440\ \text{km}\). Total time = 5.0 h. \(440/5.0 = 88\ \text{km/h}\).`,
        why: { 2: 'That is the average of the two speeds. She drove longer at 80 km/h, so the true average is closer to 80.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`An airplane starts from rest and accelerates at a constant \(10.8\ \text{m/s}^2\). What is its speed at the end of a 400 m runway?`,
        choices: ['4320 m/s', '37.0 m/s', '93.0 m/s', '65.7 m/s', '186 m/s'],
        answer: 2,
        explain: T`No time given → \(v^2 = v_0^2 + 2a\Delta x = 0 + 2(10.8)(400) = 8640\), so \(v = 93.0\ \text{m/s}\).`,
        why: { 0: 'That is a × Δx without the square root (and without the 2).', 3: 'That is √(aΔx): you dropped the 2 in 2aΔx.', 4: 'Check your work: that is 2 × 93, as if you forgot to take the square root properly.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`Abby throws a ball straight up. It passes the top of a flagpole on the way up after 0.50 s and passes it again on the way down at 4.1 s. How fast was the ball moving as it passed the top of the pole?`,
        choices: ['16 m/s', '18 m/s', '6.4 m/s', '29 m/s', '33 m/s'],
        answer: 1,
        explain: T`The ball spends \(4.1 - 0.50 = 3.6\ \text{s}\) above the pole, so 1.8 s going up from the pole to the top. Going up from the pole, \(v\) drops to 0 in 1.8 s: \(v = g t = 9.80(1.8) \approx 18\ \text{m/s}\).`,
        why: { 4: 'That would be the launch speed if you used the whole 3.6 s... but the ball only rises for half of the time it spends above the pole.', 3: 'That is close to the launch speed (v at t = 0), not the speed at the pole.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`You drive home from school at 55 mi/h for 110 miles. Then it starts to snow and you slow to 35 mi/h. You arrive home after driving 4 hours and 15 minutes in total. How far is home from school?`,
        choices: ['180 mi', '190 mi', '210 mi', '200 mi'],
        answer: 1,
        explain: T`First leg takes \(110/55 = 2.0\ \text{h}\). That leaves \(4.25 - 2.0 = 2.25\ \text{h}\) at 35 mi/h = 78.75 mi. Total = 188.75 ≈ 190 mi.`,
        why: { 3: '4 h 15 min is 4.25 h, not 4.15 h. Also double-check the leftover time is 2.25 h.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`The graph shows the position of a particle moving along the x-axis. What is the magnitude of its average velocity between \(t = 1.0\ \text{s}\) and \(t = 4.0\ \text{s}\)?`,
        fig: ['graph', { type: 'x-t', points: [[0, 0], [1, 1], [2, 3], [3, 3], [4, 3]], yLabel: 'x (m)', ticks: true }],
        choices: ['1.3 m/s', '0.25 m/s', '1.0 m/s', '0.67 m/s', '0.50 m/s'],
        answer: 3,
        explain: T`Average velocity = \(\Delta x / \Delta t\). From the graph \(x(1) = 1\ \text{m}\) and \(x(4) = 3\ \text{m}\), so \(\Delta x = 2\ \text{m}\) over \(3\ \text{s}\): \(0.67\ \text{m/s}\).`,
        why: { 0: 'That is 4 m / 3 s. Use the change in position between the two times, not the final position alone.', 4: 'Δt is 4.0 − 1.0 = 3.0 s, not 4.0 s.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`A car starting from rest accelerates at \(2.0\ \text{m/s}^2\) for 10 s, cruises at that speed for another 10 s, then slows to a stop at \(2.0\ \text{m/s}^2\). How far does it travel in total?`,
        choices: ['300 m', '500 m', '200 m', '400 m'],
        answer: 3,
        explain: T`Speed-up: \(\tfrac12(2.0)(10)^2 = 100\ \text{m}\), reaching 20 m/s. Cruise: \(20 \times 10 = 200\ \text{m}\). Braking: \(v^2/(2a) = 400/4 = 100\ \text{m}\). Total 400 m.`,
        why: { 0: 'You probably left out the braking phase (100 + 200).' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`What must your average speed be to travel 350 km in 5.15 h?`,
        choices: ['69.0 km/h', '67.0 km/h', '68.0 km/h', '66.0 km/h'],
        answer: 2,
        explain: T`\(350\ \text{km} / 5.15\ \text{h} = 67.96 \approx 68.0\ \text{km/h}\).`,
      },
      {
        source: 'Linear Motion Practice',
        q: T`A test rocket is fired straight up from rest with a net acceleration of \(20\ \text{m/s}^2\). After 4.0 s the motor turns off and it coasts upward. What maximum elevation does it reach?`,
        choices: ['490 m', '160 m', '410 m', '330 m', '320 m'],
        answer: 0,
        explain: T`Motor phase: \(v = 80\ \text{m/s}\), height 160 m. Coasting: \(80^2/(2 \cdot 9.80) = 327\ \text{m}\) more. Total ≈ 490 m.`,
        why: { 1: 'That is only the height when the motor shuts off. The rocket keeps going up at 80 m/s!', 3: 'That is only the coasting part. Add the 160 m from the motor phase.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`An airplane increases its speed at an average rate of \(15\ \text{m/s}^2\). How long does it take to go from 100 m/s to 160 m/s?`,
        choices: ['4.0 s', '0.058 s', '17 s', '0.25 s'],
        answer: 0,
        explain: T`\(t = \Delta v / a = (160 - 100)/15 = 4.0\ \text{s}\).`,
        why: { 3: 'That is a/Δv, upside down. Check units: (m/s) ÷ (m/s²) = s.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`A car traveling at 28.0 m/s brakes with constant acceleration and stops in 120 m. How fast is it moving 60.0 m after the brakes were applied?`,
        choices: ['19.8 m/s', '9.20 m/s', '12.1 m/s', '22.5 m/s', '15.0 m/s'],
        answer: 0,
        explain: T`\(a = -\dfrac{28.0^2}{2(120)} = -3.27\ \text{m/s}^2\). Then \(v^2 = 28.0^2 + 2(-3.27)(60.0) = 392\), so \(v = 19.8\ \text{m/s}\). (It is \(28/\sqrt2\), not half of 28.)`,
        why: { 4: 'Halfway in distance is not halfway in speed. The car spends more time on the second half, so it has lost less than half its speed at the midpoint.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`You leave on a 538-mile trip for a meeting that starts 10.9 h after you leave. If the fastest you can safely drive is 65 mi/h, what is the longest you can stop for dinner and still arrive just in time?`,
        choices: ['2.1 h', '2.6 h', '2.9 h', "You can't stop at all."],
        answer: 1,
        keepOrder: true,
        explain: T`Driving time at 65 mi/h: \(538/65 = 8.28\ \text{h}\). Spare time: \(10.9 - 8.28 = 2.6\ \text{h}\).`,
      },
      {
        source: 'Linear Motion Practice',
        q: T`A runner completes one lap of a track (two 96 m straightaways joined by semicircles of radius 49 m) in 100 s. What is her average velocity for the lap?`,
        choices: ['0 m/s', '10 m/s', '1.3 m/s', '2.5 m/s', '5.0 m/s'],
        answer: 0,
        explain: T`She ends where she started, so displacement is 0 and average velocity is 0. (Her average <em>speed</em> is about 5.0 m/s.)`,
        why: { 4: 'That is her average speed (≈ 500 m / 100 s). Average velocity uses displacement, which is zero for a full lap.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`You run a complete loop around a 400 m track in 100 s. What is your average speed?`,
        choices: ['0 m/s', '4 m/s', '400 m/s', '0.25 m/s'],
        answer: 1,
        explain: T`Average speed = total distance / time = 400 m / 100 s = 4 m/s. (Average velocity would be 0.)`,
        why: { 0: 'That is the average velocity. Speed uses the total distance traveled, not the displacement.', 3: 'Upside down: it is distance ÷ time.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`The graph shows the velocity of a particle moving along the x-axis. In which direction is its acceleration at \(t = 0.5\ \text{s}\) and at \(t = 3.0\ \text{s}\)?`,
        fig: ['graph', { type: 'v-t', fn: (t) => 0.375 * (t - 1) * (t - 1) - 0.375, t: [0, 4], yLabel: 'v (m/s)', ticks: true }],
        choices: ['−x at 0.5 s, +x at 3.0 s', '+x at 0.5 s, −x at 3.0 s', '−x at both times', '+x at both times'],
        answer: 0,
        explain: T`Acceleration is the slope of the v–t graph. At 0.5 s the curve is sloping down (negative slope → −x). At 3.0 s it is sloping up (positive slope → +x).`,
        why: { 2: 'At 3.0 s the v–t curve is rising. A rising v–t curve means positive acceleration, whatever the sign of v.', 1: 'You may be reading the sign of the velocity. Acceleration is the slope of the curve, not its height.' },
      },
      {
        source: 'Linear Motion Practice',
        q: T`Using the same velocity graph, what is the average acceleration between \(t = 2.0\ \text{s}\) and \(t = 4.0\ \text{s}\), and when is the instantaneous acceleration zero?`,
        fig: ['graph', { type: 'v-t', fn: (t) => 0.375 * (t - 1) * (t - 1) - 0.375, t: [0, 4], yLabel: 'v (m/s)', ticks: true }],
        choices: [T`\(1.5\ \text{m/s}^2\); at \(t = 1.0\ \text{s}\)`, T`\(3.0\ \text{m/s}^2\); at \(t = 1.0\ \text{s}\)`, T`\(1.5\ \text{m/s}^2\); at \(t = 0\) and \(t = 2.0\ \text{s}\)`, T`\(0.75\ \text{m/s}^2\); never`],
        answer: 0,
        explain: T`From the graph \(v(2) = 0\) and \(v(4) = 3.0\ \text{m/s}\): \(\bar a = 3.0/2.0 = 1.5\ \text{m/s}^2\). The acceleration (slope) is zero at the bottom of the curve, \(t = 1.0\ \text{s}\).`,
        why: { 1: 'That is Δv; divide by Δt = 2.0 s.', 2: 'At t = 0 and t = 2.0 s the velocity is zero, not the acceleration. Acceleration is zero where the slope is flat.' },
      },
      {
        source: 'Kinematics Quiz 2',
        q: T`A ball is thrown straight up. At its maximum height, what are its vertical velocity and acceleration?`,
        choices: [T`\(v = 0\), \(a = 0\)`, T`\(v = 0\), \(a = 9.80\ \text{m/s}^2\) downward`, T`\(v = 9.80\ \text{m/s}\) downward, \(a = 0\)`, T`\(v = 0\), \(a\) is momentarily upward`],
        answer: 1,
        explain: T`The ball stops for an instant, but gravity is still pulling, so \(a = 9.80\ \text{m/s}^2\) downward the whole time.`,
        why: { 0: 'If a were 0 at the top, the ball would stay there forever. Gravity never turns off.' },
      },
      {
        q: T`On a position vs. time graph, the slope represents:`,
        choices: ['Acceleration', 'Displacement', 'Velocity', 'Distance traveled'],
        answer: 2,
        explain: T`Slope = rise/run = \(\Delta x/\Delta t\), which is velocity.`,
        why: { 0: 'Acceleration is the slope of a v–t graph, not an x–t graph.' },
      },
      {
        q: T`On a velocity vs. time graph, the area between the line and the time axis represents:`,
        choices: ['Displacement', 'Acceleration', 'Average speed', 'Time'],
        answer: 0,
        explain: T`Area = (m/s) × (s) = m. It is the displacement; area under the axis counts as negative.`,
        why: { 1: 'Acceleration is the slope of the v–t graph, not the area.' },
      },
      {
        q: T`An object has a negative velocity and a negative acceleration. It is:`,
        choices: ['Slowing down', 'Speeding up', 'At rest', 'Moving at constant speed'],
        answer: 1,
        explain: T`Same signs → speeding up. (Example: a ball falling downward with up as +.)`,
        why: { 0: '"Negative acceleration" only means slowing down when the velocity is positive. Here they point the same way.' },
      },
      {
        q: T`Two balls are released from the same height at the same time: one is dropped, the other is thrown straight down. Ignoring air resistance, which has the larger acceleration?`,
        choices: ['The dropped ball', 'The thrown ball', 'Both have the same acceleration', 'Depends on their masses'],
        answer: 2,
        explain: T`Once released, both are in free fall with \(a = g = 9.80\ \text{m/s}^2\). The thrown one is faster, but its acceleration is the same.`,
        why: { 1: 'It has a larger velocity, not a larger acceleration. Throwing only changes v₀.', 3: 'In free fall every object has the same acceleration, regardless of mass.' },
      },
      {
        q: T`A ball is thrown straight up at 12 m/s and caught at the same height. Ignoring air resistance, how fast is it moving when caught?`,
        choices: ['0 m/s', '6 m/s', '12 m/s', '24 m/s'],
        answer: 2,
        explain: T`Free-fall motion is symmetric: it returns to the launch height with the same speed it left with (now moving down).`,
      },
      {
        q: T`Which Big 3 equation should you use when the problem gives \(v_0\), \(v\), and \(a\), and asks for the distance?`,
        choices: [T`\(v = v_0 + at\)`, T`\(\Delta x = v_0 t + \tfrac12 a t^2\)`, T`\(v^2 = v_0^2 + 2a\,\Delta x\)`, 'You need the time first; there is no direct equation'],
        answer: 2,
        explain: T`Time is neither given nor asked for, so use the equation without \(t\): \(v^2 = v_0^2 + 2a\Delta x\).`,
        why: { 3: 'v² = v₀² + 2aΔx skips time entirely. That is exactly what it is for.' },
      },
      {
        q: T`A car's speed changes from 10 m/s to 30 m/s in 4.0 s. Its average acceleration is:`,
        choices: [T`\(2.5\ \text{m/s}^2\)`, T`\(5.0\ \text{m/s}^2\)`, T`\(7.5\ \text{m/s}^2\)`, T`\(10\ \text{m/s}^2\)`],
        answer: 1,
        explain: T`\(\bar a = \Delta v/\Delta t = (30 - 10)/4.0 = 5.0\ \text{m/s}^2\).`,
        why: { 2: 'That is the final speed ÷ time. Use the change in speed (30 − 10).' },
      },
      {
        q: T`A ball rolls up a ramp, stops, and rolls back down. Taking up the ramp as positive, the acceleration is:`,
        choices: ['Positive going up, negative coming down', 'Negative going up, positive coming down', 'Negative the whole time', 'Zero at the top'],
        answer: 2,
        explain: T`Gravity pulls down the ramp the whole time, so the acceleration always points down the ramp (negative). The velocity flips sign at the top; the acceleration does not.`,
        why: { 3: 'Velocity is zero at the top, not acceleration.' },
      },
    ],

    // ------------------------------------------------------------------
    problems: [
      {
        id: 'accel-from-rest',
        title: 'Speeding up from rest',
        gen(r) {
          const a = r.num(1.5, 6, 1);
          const t = r.num(3, 12, 1);
          const v = a * t;
          const d = 0.5 * a * t * t;
          return {
            question: T`A car starts from rest and accelerates at a constant \(${a}\ \text{m/s}^2\) for \(${t}\ \text{s}\).`,
            parts: [
              { label: '(a) Final speed', value: v, unit: 'm/s' },
              { label: '(b) Distance traveled', value: d, unit: 'm' },
            ],
            hint: T`"From rest" means \(v_0 = 0\). For (a) use the equation without \(\Delta x\); for (b) the one without \(v\).`,
            steps: [
              T`Knowns: \(v_0 = 0\), \(a = ${a}\ \text{m/s}^2\), \(t = ${t}\ \text{s}\).`,
              T`(a) Equation: \(v = v_0 + at\)`,
              T`Substitution: \(v = 0 + (${a}\ \text{m/s}^2)(${t}\ \text{s}) = ${r.f(v)}\ \text{m/s}\)`,
              T`(b) Equation: \(\Delta x = v_0 t + \tfrac12 a t^2\)`,
              T`Substitution: \(\Delta x = 0 + \tfrac12(${a}\ \text{m/s}^2)(${t}\ \text{s})^2 = ${r.f(d)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'braking-distance',
        title: 'Braking to a stop',
        gen(r) {
          const v0 = r.num(15, 35, 0);
          const a = r.num(3, 8, 1);
          const d = (v0 * v0) / (2 * a);
          const t = v0 / a;
          return {
            question: T`A car moving at \(${v0}\ \text{m/s}\) brakes and slows down at \(${a}\ \text{m/s}^2\) until it stops.`,
            parts: [
              { label: '(a) Stopping distance', value: d, unit: 'm' },
              { label: '(b) Time to stop', value: t, unit: 's' },
            ],
            hint: T`Slowing down while moving forward means \(a\) is negative. "Stops" means \(v = 0\). For (a) time isn't given, so use the equation without \(t\).`,
            steps: [
              T`Forward is +. Knowns: \(v_0 = ${v0}\ \text{m/s}\), \(v = 0\), \(a = -${a}\ \text{m/s}^2\).`,
              T`(a) Equation: \(v^2 = v_0^2 + 2a\,\Delta x \Rightarrow \Delta x = \dfrac{v^2 - v_0^2}{2a}\)`,
              T`Substitution: \(\Delta x = \dfrac{0 - (${v0}\ \text{m/s})^2}{2(-${a}\ \text{m/s}^2)} = ${r.f(d)}\ \text{m}\)`,
              T`(b) Equation: \(v = v_0 + at \Rightarrow t = \dfrac{v - v_0}{a}\)`,
              T`Substitution: \(t = \dfrac{0 - ${v0}\ \text{m/s}}{-${a}\ \text{m/s}^2} = ${r.f(t)}\ \text{s}\)`,
            ],
          };
        },
      },
      {
        id: 'stopping-scaling',
        title: 'Stopping distance at a higher speed',
        gen(r) {
          const v1 = r.num(15, 22, 0);
          const d1 = r.num(15, 30, 0);
          const v2 = r.num(28, 45, 0);
          const a = (v1 * v1) / (2 * d1);
          const d2 = d1 * (v2 / v1) ** 2;
          return {
            question: T`The minimum distance needed to stop a car moving at \(${v1}\ \text{m/s}\) is \(${d1}\ \text{m}\). Assuming the same braking acceleration, find:`,
            parts: [
              { label: '(a) Magnitude of the braking acceleration', value: a, unit: 'm/s²' },
              { label: `(b) Minimum stopping distance at ${v2} m/s`, value: d2, unit: 'm' },
            ],
            hint: T`With \(v = 0\), \(v^2 = v_0^2 + 2a\Delta x\) gives \(\Delta x = v_0^2 / (2|a|)\). Stopping distance grows with the <em>square</em> of the speed.`,
            steps: [
              T`(a) Equation: \(0 = v_0^2 + 2a\,\Delta x \Rightarrow |a| = \dfrac{v_0^2}{2\Delta x}\)`,
              T`Substitution: \(|a| = \dfrac{(${v1}\ \text{m/s})^2}{2(${d1}\ \text{m})} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`(b) Same equation with the new speed: \(\Delta x = \dfrac{v_0^2}{2|a|} = \dfrac{(${v2}\ \text{m/s})^2}{2(${r.f(a)}\ \text{m/s}^2)}\)`,
              T`Answer: \(\Delta x = ${r.f(d2)}\ \text{m}\). Shortcut: \(\Delta x_2 = \Delta x_1 \left(\dfrac{v_2}{v_1}\right)^2 = ${d1}\left(\dfrac{${v2}}{${v1}}\right)^2\).`,
            ],
          };
        },
      },
      {
        id: 'dropped-object',
        title: 'Dropped from a height',
        gen(r) {
          const h = r.num(15, 90, 0);
          const t = Math.sqrt((2 * h) / r.g);
          const v = r.g * t;
          return {
            question: T`A stone is dropped from rest off a cliff \(${h}\ \text{m}\) high. Ignore air resistance.`,
            parts: [
              { label: '(a) Time to hit the ground', value: t, unit: 's' },
              { label: '(b) Speed just before impact', value: v, unit: 'm/s' },
            ],
            hint: T`"Dropped" means \(v_0 = 0\). Taking <strong>down</strong> as positive keeps every number positive.`,
            steps: [
              T`Down is +. Knowns: \(v_0 = 0\), \(a = 9.80\ \text{m/s}^2\), \(\Delta y = ${h}\ \text{m}\).`,
              T`(a) Equation: \(\Delta y = v_0 t + \tfrac12 a t^2 \Rightarrow t = \sqrt{\dfrac{2\Delta y}{a}}\)`,
              T`Substitution: \(t = \sqrt{\dfrac{2(${h}\ \text{m})}{9.80\ \text{m/s}^2}} = ${r.f(t)}\ \text{s}\)`,
              T`(b) Equation: \(v = v_0 + at\)`,
              T`Substitution: \(v = 0 + (9.80\ \text{m/s}^2)(${r.f(t)}\ \text{s}) = ${r.f(v)}\ \text{m/s}\)`,
              T`Check with \(v^2 = 2a\Delta y = 2(9.80)(${h}) \Rightarrow v = ${r.f(v)}\ \text{m/s}\) ✓`,
            ],
          };
        },
      },
      {
        id: 'thrown-down',
        title: 'Thrown straight down',
        gen(r) {
          const v0 = r.num(4, 15, 1);
          const h = r.num(15, 60, 0);
          const v = Math.sqrt(v0 * v0 + 2 * r.g * h);
          const t = (v - v0) / r.g;
          return {
            question: T`A ball is thrown straight down with an initial speed of \(${v0}\ \text{m/s}\) from a height of \(${h}\ \text{m}\).`,
            parts: [
              { label: '(a) Speed just before it hits the ground', value: v, unit: 'm/s' },
              { label: '(b) Time to hit the ground', value: t, unit: 's' },
            ],
            hint: T`Take down as + so \(v_0\), \(a\), and \(\Delta y\) are all positive. Finding \(v\) first (no-time equation) lets you skip the quadratic.`,
            steps: [
              T`Down is +. Knowns: \(v_0 = ${v0}\ \text{m/s}\), \(a = 9.80\ \text{m/s}^2\), \(\Delta y = ${h}\ \text{m}\).`,
              T`(a) Equation: \(v^2 = v_0^2 + 2a\,\Delta y\)`,
              T`Substitution: \(v^2 = (${v0})^2 + 2(9.80)(${h}) = ${r.f(v * v, 4)}\ \text{m}^2/\text{s}^2 \Rightarrow v = ${r.f(v)}\ \text{m/s}\)`,
              T`(b) Equation: \(v = v_0 + at \Rightarrow t = \dfrac{v - v_0}{a}\)`,
              T`Substitution: \(t = \dfrac{${r.f(v)} - ${v0}}{9.80} = ${r.f(t)}\ \text{s}\)`,
            ],
          };
        },
      },
      {
        id: 'thrown-up',
        title: 'Thrown straight up',
        gen(r) {
          const v0 = r.num(8, 30, 1);
          const h = (v0 * v0) / (2 * r.g);
          const T2 = (2 * v0) / r.g;
          return {
            question: T`A ball is thrown straight up at \(${v0}\ \text{m/s}\) and caught at the same height it was released.`,
            parts: [
              { label: '(a) Maximum height above the release point', value: h, unit: 'm' },
              { label: '(b) Total time in the air', value: T2, unit: 's' },
            ],
            hint: T`At the top \(v = 0\). The trip is symmetric: time up = time down.`,
            steps: [
              T`Up is +. Knowns: \(v_0 = ${v0}\ \text{m/s}\), \(a = -9.80\ \text{m/s}^2\), \(v = 0\) at the top.`,
              T`(a) Equation: \(v^2 = v_0^2 + 2a\,\Delta y \Rightarrow \Delta y = \dfrac{-v_0^2}{2a}\)`,
              T`Substitution: \(\Delta y = \dfrac{-(${v0}\ \text{m/s})^2}{2(-9.80\ \text{m/s}^2)} = ${r.f(h)}\ \text{m}\)`,
              T`(b) Time to the top: \(v = v_0 + at \Rightarrow t_{up} = \dfrac{0 - ${v0}}{-9.80} = ${r.f(T2 / 2)}\ \text{s}\)`,
              T`Total time = \(2 t_{up} = ${r.f(T2)}\ \text{s}\)`,
            ],
          };
        },
      },
      {
        id: 'caught-after',
        title: 'Caught after a few seconds',
        gen(r) {
          const tt = r.num(1.5, 6, 1);
          const v0 = (r.g * tt) / 2;
          const h = (v0 * v0) / (2 * r.g);
          return {
            question: T`A ball thrown straight up is caught by the thrower \(${tt}\ \text{s}\) later, at the same height it was released.`,
            parts: [
              { label: '(a) Initial velocity (up is +)', value: v0, unit: 'm/s' },
              { label: '(b) Maximum height above the release point', value: h, unit: 'm' },
            ],
            hint: T`The ball spends half the time going up and half coming down. At the top, \(v = 0\).`,
            steps: [
              T`Time to the top is half the total: \(t_{up} = ${tt}/2 = ${r.f(tt / 2)}\ \text{s}\), and \(v = 0\) there.`,
              T`(a) Equation: \(v = v_0 + at \Rightarrow 0 = v_0 - g t_{up}\)`,
              T`Substitution: \(v_0 = (9.80\ \text{m/s}^2)(${r.f(tt / 2)}\ \text{s}) = ${r.f(v0)}\ \text{m/s}\)`,
              T`(b) Equation: \(v^2 = v_0^2 + 2a\,\Delta y \Rightarrow \Delta y = \dfrac{v_0^2}{2g}\)`,
              T`Substitution: \(\Delta y = \dfrac{(${r.f(v0)}\ \text{m/s})^2}{2(9.80\ \text{m/s}^2)} = ${r.f(h)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'jet-landing',
        title: 'Jet landing on a carrier',
        gen(r) {
          const v0 = r.num(55, 75, 0);
          const t = r.num(1.5, 3, 1);
          const a = -v0 / t;
          const d = 0.5 * v0 * t;
          return {
            question: T`A jet lands on an aircraft carrier at \(${v0}\ \text{m/s}\) and is brought to a stop in \(${t}\ \text{s}\). Take the jet's direction of motion as positive.`,
            parts: [
              { label: '(a) Acceleration (with sign)', value: a, unit: 'm/s²' },
              { label: '(b) Stopping distance', value: d, unit: 'm' },
            ],
            hint: T`It ends at \(v = 0\). Since it is slowing while moving +, the acceleration should come out negative.`,
            steps: [
              T`Knowns: \(v_0 = ${v0}\ \text{m/s}\), \(v = 0\), \(t = ${t}\ \text{s}\).`,
              T`(a) Equation: \(v = v_0 + at \Rightarrow a = \dfrac{v - v_0}{t}\)`,
              T`Substitution: \(a = \dfrac{0 - ${v0}\ \text{m/s}}{${t}\ \text{s}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`(b) Equation: \(\Delta x = \tfrac12(v_0 + v)\,t\)`,
              T`Substitution: \(\Delta x = \tfrac12(${v0}\ \text{m/s} + 0)(${t}\ \text{s}) = ${r.f(d)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'two-leg-average',
        title: 'Average speed of a two-part trip',
        gen(r) {
          let v1, v2;
          do {
            v1 = r.int(50, 90);
            v2 = r.int(60, 110);
          } while (Math.abs(v1 - v2) < 15);
          const t1 = r.num(1, 4, 1);
          const t2 = r.num(1, 3, 1);
          const d = v1 * t1 + v2 * t2;
          const avg = d / (t1 + t2);
          return {
            question: T`A motorist drives for \(${t1}\ \text{h}\) at \(${v1}\ \text{km/h}\), then for \(${t2}\ \text{h}\) at \(${v2}\ \text{km/h}\).`,
            parts: [
              { label: '(a) Total distance', value: d, unit: 'km' },
              { label: '(b) Average speed for the whole trip', value: avg, unit: 'km/h' },
            ],
            hint: T`Average speed is total distance ÷ total time, <em>not</em> the average of the two speeds.`,
            steps: [
              T`Distance for each leg: \(d = vt\). Leg 1: \((${v1})(${t1}) = ${r.f(v1 * t1, 4)}\ \text{km}\). Leg 2: \((${v2})(${t2}) = ${r.f(v2 * t2, 4)}\ \text{km}\).`,
              T`(a) Total: \(${r.f(d, 4)}\ \text{km}\)`,
              T`(b) Equation: \(\text{avg speed} = \dfrac{\text{total distance}}{\text{total time}}\)`,
              T`Substitution: \(\dfrac{${r.f(d, 4)}\ \text{km}}{${t1}\ \text{h} + ${t2}\ \text{h}} = ${r.f(avg)}\ \text{km/h}\)`,
              T`Notice this is not \((${v1} + ${v2})/2 = ${r.f((v1 + v2) / 2)}\) unless both legs take equal time.`,
            ],
          };
        },
      },
      {
        id: 'three-phase',
        title: 'Speed up, cruise, brake',
        gen(r) {
          const a1 = r.num(1.5, 3, 1);
          const t1 = r.int(5, 12);
          const t2 = r.int(5, 15);
          const a3 = r.num(1.5, 4, 1);
          const v = a1 * t1;
          const d1 = 0.5 * a1 * t1 * t1;
          const d2 = v * t2;
          const d3 = (v * v) / (2 * a3);
          const total = d1 + d2 + d3;
          return {
            question: T`A car starts from rest and accelerates at \(${a1}\ \text{m/s}^2\) for \(${t1}\ \text{s}\). It then cruises at that speed for \(${t2}\ \text{s}\), and finally brakes to a stop at \(${a3}\ \text{m/s}^2\).`,
            parts: [
              { label: '(a) Top speed', value: v, unit: 'm/s' },
              { label: '(b) Total distance traveled', value: total, unit: 'm' },
            ],
            hint: T`Three phases, three different accelerations. Solve each phase separately; the final speed of one phase is the starting speed of the next.`,
            steps: [
              T`(a) Phase 1: \(v = v_0 + at = 0 + (${a1})(${t1}) = ${r.f(v)}\ \text{m/s}\)`,
              T`Phase 1 distance: \(\Delta x_1 = \tfrac12 a t^2 = \tfrac12(${a1})(${t1})^2 = ${r.f(d1)}\ \text{m}\)`,
              T`Phase 2 (constant speed): \(\Delta x_2 = vt = (${r.f(v)})(${t2}) = ${r.f(d2)}\ \text{m}\)`,
              T`Phase 3 (\(v = 0\) at the end): \(0 = v^2 + 2(-${a3})\Delta x_3 \Rightarrow \Delta x_3 = \dfrac{(${r.f(v)})^2}{2(${a3})} = ${r.f(d3)}\ \text{m}\)`,
              T`(b) Total: \(${r.f(d1)} + ${r.f(d2)} + ${r.f(d3)} = ${r.f(total)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'rocket-coast',
        title: 'Rocket: motor, then coast',
        gen(r) {
          const a = r.num(10, 30, 0);
          const t = r.int(3, 8);
          const v = a * t;
          const h1 = 0.5 * a * t * t;
          const h2 = (v * v) / (2 * r.g);
          const H = h1 + h2;
          return {
            question: T`A test rocket is fired straight up from rest with a net upward acceleration of \(${a}\ \text{m/s}^2\). After \(${t}\ \text{s}\) the motor shuts off and the rocket coasts upward (ignore air resistance).`,
            parts: [
              { label: '(a) Speed when the motor shuts off', value: v, unit: 'm/s' },
              { label: '(b) Height when the motor shuts off', value: h1, unit: 'm' },
              { label: '(c) Maximum height reached', value: H, unit: 'm' },
            ],
            hint: T`Two phases. While coasting the only acceleration is gravity, and \(v = 0\) at the top.`,
            steps: [
              T`Up is +. Phase 1: \(v = v_0 + at = 0 + (${a})(${t}) = ${r.f(v)}\ \text{m/s}\)`,
              T`\(\Delta y_1 = \tfrac12 a t^2 = \tfrac12(${a})(${t})^2 = ${r.f(h1)}\ \text{m}\)`,
              T`Phase 2: \(v_0 = ${r.f(v)}\ \text{m/s}\), \(a = -9.80\ \text{m/s}^2\), \(v = 0\). Equation: \(v^2 = v_0^2 + 2a\Delta y\)`,
              T`Substitution: \(0 = (${r.f(v)})^2 + 2(-9.80)\Delta y_2 \Rightarrow \Delta y_2 = ${r.f(h2)}\ \text{m}\)`,
              T`Max height: \(${r.f(h1)} + ${r.f(h2)} = ${r.f(H)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'partway-braking',
        title: 'Speed partway through braking',
        gen(r) {
          const v0 = r.num(20, 35, 1);
          const d = r.num(80, 160, 0);
          const frac = r.pick([0.25, 0.5, 0.75]);
          const x = d * frac;
          const a = -(v0 * v0) / (2 * d);
          const v = Math.sqrt(v0 * v0 + 2 * a * x);
          return {
            question: T`A car traveling at \(${v0}\ \text{m/s}\) brakes with constant acceleration and stops in \(${d}\ \text{m}\). Take the direction of motion as positive.`,
            parts: [
              { label: '(a) Acceleration (with sign)', value: a, unit: 'm/s²' },
              { label: `(b) Speed ${r.f(x)} m after the brakes are applied`, value: v, unit: 'm/s' },
            ],
            hint: T`No times anywhere, so it's \(v^2 = v_0^2 + 2a\Delta x\) twice: once for the whole stop, then again for the partial distance.`,
            steps: [
              T`(a) Whole stop: \(0 = v_0^2 + 2a\,\Delta x \Rightarrow a = -\dfrac{v_0^2}{2\Delta x}\)`,
              T`Substitution: \(a = -\dfrac{(${v0}\ \text{m/s})^2}{2(${d}\ \text{m})} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`(b) Equation: \(v^2 = v_0^2 + 2a\,\Delta x\) with \(\Delta x = ${r.f(x)}\ \text{m}\)`,
              T`Substitution: \(v^2 = (${v0})^2 + 2(${r.f(a)})(${r.f(x)}) = ${r.f(v * v)} \Rightarrow v = ${r.f(v)}\ \text{m/s}\)`,
              T`Notice it is not simply ${r.f(1 - frac)} × ${v0}: speed and distance aren't proportional when braking.`,
            ],
          };
        },
      },
      {
        id: 'kmh-to-ms',
        title: 'Convert km/h, then find the time',
        gen(r) {
          const vk = r.pick([54, 60, 72, 80, 90, 100, 108]);
          const a = r.num(2, 5, 1);
          const v = vk / 3.6;
          const t = v / a;
          const d = (v * v) / (2 * a);
          return {
            question: T`A car accelerates from rest at a uniform \(${a}\ \text{m/s}^2\) until it reaches \(${vk}\ \text{km/h}\).`,
            parts: [
              { label: '(a) Final speed in m/s', value: v, unit: 'm/s' },
              { label: '(b) Time to reach that speed', value: t, unit: 's' },
              { label: '(c) Distance covered', value: d, unit: 'm' },
            ],
            hint: T`Convert first: 1 m/s = 3.6 km/h, so divide km/h by 3.6.`,
            steps: [
              T`(a) \(${vk}\ \dfrac{\text{km}}{\text{h}} \times \dfrac{1000\ \text{m}}{1\ \text{km}} \times \dfrac{1\ \text{h}}{3600\ \text{s}} = ${r.f(v)}\ \text{m/s}\)`,
              T`(b) Equation: \(v = v_0 + at \Rightarrow t = \dfrac{v}{a}\)`,
              T`Substitution: \(t = \dfrac{${r.f(v)}\ \text{m/s}}{${a}\ \text{m/s}^2} = ${r.f(t)}\ \text{s}\)`,
              T`(c) Equation: \(v^2 = v_0^2 + 2a\Delta x \Rightarrow \Delta x = \dfrac{v^2}{2a}\)`,
              T`Substitution: \(\Delta x = \dfrac{(${r.f(v)})^2}{2(${a})} = ${r.f(d)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'two-balls-meet',
        title: 'Two balls meet in the air',
        gen(r) {
          let H, v0, t, y;
          do {
            H = r.num(25, 60, 0);
            v0 = r.num(12, 25, 0);
            t = H / v0;
            y = H - 0.5 * r.g * t * t;
          } while (y < 2 || v0 - r.g * t < -15);
          return {
            question: T`A ball is dropped from a window \(${H}\ \text{m}\) above the ground. At the same instant a second ball is thrown straight up from the ground at \(${v0}\ \text{m/s}\), directly below.`,
            parts: [
              { label: '(a) Time until they meet', value: t, unit: 's' },
              { label: '(b) Height above the ground where they meet', value: y, unit: 'm' },
            ],
            hint: T`Write \(y(t) = y_0 + v_0 t + \tfrac12 a t^2\) for each ball (same \(a\)!), set them equal, and watch the \(t^2\) terms cancel.`,
            steps: [
              T`Up is +, ground at 0. Ball 1: \(y_1 = ${H} - 4.90t^2\). Ball 2: \(y_2 = ${v0}t - 4.90t^2\).`,
              T`(a) Set equal: \(${H} - 4.90t^2 = ${v0}t - 4.90t^2 \Rightarrow t = \dfrac{${H}\ \text{m}}{${v0}\ \text{m/s}} = ${r.f(t)}\ \text{s}\)`,
              T`(b) Plug into either: \(y = ${H} - 4.90(${r.f(t)})^2 = ${r.f(y)}\ \text{m}\)`,
            ],
          };
        },
      },
    ],
  };
})();

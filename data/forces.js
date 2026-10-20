// Forces & Newton's Laws (Giancoli Ch. 4)
// Format: see docs/CONTENT-GUIDE.md. Math goes in \( \) or \[ \] inside T`...` strings.
(() => {
  const T = String.raw;
  // Big numbers in math mode: 60000 -> 60{,}000 so KaTeX doesn't add a space after the comma.
  const big = x => Math.round(x).toLocaleString('en-US').replace(/,/g, '{,}');
  const bigText = x => Math.round(x).toLocaleString('en-US');

  window.UNIT_DATA = window.UNIT_DATA || {};
  window.UNIT_DATA['forces'] = {
    summary: "Why things move the way they do: forces, free-body diagrams, friction, inclines, and connected objects, all tied together by Newton's laws.",

    formulas: [
      { name: "Newton's 2nd law (by components)", tex: T`\Sigma F_x = ma_x \qquad \Sigma F_y = ma_y`, note: 'Draw the FBD first, then sum forces along each axis.' },
      { name: 'Weight (force due to gravity)', tex: T`F_G = mg`, note: 'g = 9.80 N/kg on Earth, 1.62 N/kg on the Moon. Weight is in newtons, mass in kilograms.' },
      { name: "Newton's 3rd law", tex: T`\vec F_{AB} = -\vec F_{BA}`, note: 'Equal size, opposite direction, acting on different objects.' },
      { name: 'Normal force (flat, nothing else vertical)', tex: T`F_N = mg`, note: 'Only true when no other force has a vertical part and a_y = 0.' },
      { name: 'Normal force with an angled force', tex: T`F_N = mg + F\sin\theta \ \ (\text{push down}) \qquad F_N = mg - F\sin\theta \ \ (\text{pull up})` },
      { name: 'Static friction', tex: T`F_{fs} \le \mu_s F_N`, note: 'Only as big as needed to stop sliding. μsF_N is the maximum.' },
      { name: 'Kinetic friction', tex: T`F_{fk} = \mu_k F_N`, note: 'Use once the object is sliding. Never add static and kinetic friction.' },
      { name: 'Incline components of gravity', tex: T`F_{G\parallel} = mg\sin\theta \qquad F_{G\perp} = mg\cos\theta`, note: 'On a plain incline, F_N = mg cos θ.' },
      { name: 'Frictionless incline', tex: T`a = g\sin\theta` },
      { name: 'Sliding down an incline with friction', tex: T`a = g(\sin\theta - \mu_k\cos\theta)` },
      { name: 'Stay or go (incline, no other forces)', tex: T`\text{slides if } \tan\theta > \mu_s`, note: 'At the angle where it just starts to slip, μs = tan θ.' },
      { name: 'Elevator / apparent weight', tex: T`F_N = m(g + a)`, note: 'Take up as positive: a > 0 when accelerating up (or moving down and slowing).' },
      { name: 'Connected objects (whole system)', tex: T`a = \frac{F_{\text{net, external}}}{m_{\text{total}}}`, note: 'Tensions and contact forces between the objects cancel out for the system.' },
      { name: "Atwood machine", tex: T`a = \frac{(m_2 - m_1)g}{m_1 + m_2} \qquad T = \frac{2m_1m_2g}{m_1+m_2}` },
    ],

    concepts: [
      {
        title: "Newton's three laws",
        body: T`<ol>
          <li><strong>1st law (inertia):</strong> an object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless an <em>unbalanced</em> (net) force acts on it.</li>
          <li><strong>2nd law:</strong> \(\Sigma \vec F = m\vec a\). Acceleration is directly proportional to net force and inversely proportional to mass. If \(\Sigma F = 0\), then \(a = 0\) (equilibrium).</li>
          <li><strong>3rd law:</strong> for every force A exerts on B, B exerts an equal and opposite force on A. Be careful: the two forces act on <em>different</em> objects, so they never cancel each other.</li>
        </ol>`,
      },
      {
        title: 'Mass vs. weight',
        body: T`<p><strong>Mass</strong> (kg) is the amount of matter and a measure of <em>inertia</em>, meaning how hard it is to change the object's motion. It is the same everywhere: \(m_{\text{here}} = m_{\text{there}} = m_{\text{everywhere}}\). Use kilograms, not grams.</p>
          <p><strong>Weight</strong> is the force due to gravity, \(F_G = mg\), measured in newtons. It changes with location: \(g = 9.80\ \text{N/kg}\) on Earth, \(9.79\) on top of Everest, and \(1.62\ \text{N/kg}\) on the Moon. (N/kg and m/s² are the same unit.)</p>
          <p>Example: a 30 kg object weighs \(F_G = (30\ \text{kg})(9.8\ \text{N/kg}) = 294\ \text{N}\). Quick conversion: 1 kg ≈ 2.2 lb.</p>`,
      },
      {
        title: 'Free-body diagrams (FBDs)',
        body: T`<p>A good picture is how you sum forces. For every problem:</p>
          <ol>
            <li>Draw the object as a box or dot.</li>
            <li>Draw every force acting <strong>on</strong> it, starting where it touches: weight \(mg\) (always), normal \(F_N\) (if touching a surface), tension \(T\) (ropes), friction \(F_f\) (opposes sliding), and any applied push or pull.</li>
            <li>Pick axes. Point one along the acceleration (along the ramp for inclines).</li>
            <li>Write \(\Sigma F_x = ma_x\) and \(\Sigma F_y = ma_y\). Equation → substitution (numbers and units) → answer (with units).</li>
          </ol>`,
        fig: ['fbd', { object: 'box', forces: [
          { label: 'F_N', angle: 90, mag: 0.8 },
          { label: 'mg', angle: 270, mag: 0.8 },
          { label: 'F_app', angle: 0, mag: 1 },
          { label: 'F_f', angle: 180, mag: 0.55 },
        ] }],
      },
      {
        title: 'Equilibrium: at rest OR constant velocity',
        body: T`<p>\(\Sigma F = 0\) means \(a = 0\). That includes an object sitting still <em>and</em> an object cruising at constant velocity. A box pushed across the floor at constant speed has the push exactly equal to kinetic friction; you are not "winning" against friction, just matching it.</p>
          <p>Forces don't cause motion; <strong>net</strong> forces cause <strong>changes</strong> in motion.</p>`,
        fig: ['fbd', { object: 'box', forces: [
          { label: 'F_N', angle: 90, mag: 0.8 },
          { label: 'mg', angle: 270, mag: 0.8 },
          { label: 'F_app', angle: 0, mag: 0.7 },
          { label: 'F_fk', angle: 180, mag: 0.7 },
        ] }],
      },
      {
        title: 'Normal force is not always mg',
        body: T`<p>The normal force is a <strong>perpendicular support force</strong> from a surface. It is whatever it needs to be to keep the object from sinking into the surface. Find it from \(\Sigma F_y = ma_y\), not by assuming:</p>
          <ul>
            <li>Flat floor, nothing else vertical: \(F_N = mg\).</li>
            <li>Pushing down at an angle: \(F_N = mg + F\sin\theta\) (bigger, so more friction).</li>
            <li>Pulling up at an angle: \(F_N = mg - F\sin\theta\) (smaller, so less friction).</li>
            <li>On an incline: \(F_N = mg\cos\theta\).</li>
            <li>In an accelerating elevator: \(F_N = m(g + a)\).</li>
          </ul>`,
        fig: ['box-force', { angle: 30, label: 'P', mode: 'push' }],
      },
      {
        title: 'Tension and connected objects',
        body: T`<p>A light rope pulls with the same tension \(T\) on both ends. For objects tied or touching together:</p>
          <ol>
            <li><strong>System first:</strong> treat everything as one object. Internal forces (tension, contact forces) cancel, so \(a = F_{\text{net, external}} / m_{\text{total}}\).</li>
            <li><strong>Then one object:</strong> draw the FBD of just one piece to find the tension or contact force.</li>
          </ol>
          <p>Example: a 10 kg block on a frictionless table tied to a 63 kg hanging block: \(a = \dfrac{(63)(9.8)}{10 + 63} = 8.46\ \text{m/s}^2\). Then for the table block, \(T = (10)(8.46) = 84.6\ \text{N}\).</p>`,
        fig: ['pulley-table', { m1: '10 kg', m2: '63 kg', friction: false }],
      },
      {
        title: 'Friction: static vs. kinetic',
        body: T`<p>Friction opposes sliding (or the start of sliding). It comes from microscopic bumps between surfaces and depends on the <strong>materials</strong> (\(\mu\)), the <strong>normal force</strong>, and <strong>whether it's sliding</strong>. It does not depend on surface area.</p>
          <ul>
            <li><strong>Static</strong> (not slipping): \(F_{fs} \le \mu_s F_N\). It only uses what it needs. Push with 10 N and it pushes back 10 N, up to the max \(\mu_s F_N\).</li>
            <li><strong>Kinetic</strong> (sliding): \(F_{fk} = \mu_k F_N\), a fixed value. Usually \(\mu_k < \mu_s\), so it's harder to get something moving than to keep it moving.</li>
          </ul>
          <p>Desk-pusher demo: not moving means \(F_{app} = F_{fs}\). Accelerating means \(F_{app} > F_{fk}\). Constant velocity means \(F_{app} = F_{fk}\). <strong>Never, ever add static and kinetic friction.</strong> Only one acts at a time.</p>`,
      },
      {
        title: 'Inclines: tilt your axes',
        body: T`<p>On a ramp, put the x-axis <strong>along the incline</strong> and the y-axis <strong>perpendicular</strong> to it. Then only gravity needs to be broken into components:</p>
          <ul>
            <li>Along the ramp (pulls it down the slope): \(mg\sin\theta\)</li>
            <li>Into the ramp (balanced by the normal force): \(mg\cos\theta\), so \(F_N = mg\cos\theta\)</li>
          </ul>
          <p><strong>Stay or go?</strong> Compare \(mg\sin\theta\) to the maximum static friction \(\mu_s mg\cos\theta\). It slides on its own when \(\tan\theta > \mu_s\). If it slides: \(a = g(\sin\theta - \mu_k\cos\theta)\).</p>`,
        fig: ['incline', { angle: 30, label: 'm', show: ['mg', 'N', 'f'], friction: 'up', components: true }],
      },
      {
        title: 'Elevators and apparent weight',
        body: T`<p>A scale reads the <strong>normal force</strong>, not your weight. Take up as positive: \(F_N - mg = ma \Rightarrow F_N = m(g + a)\).</p>
          <ul>
            <li>Accelerating up, <em>or moving down and slowing down</em>: \(a\) is up, so the scale reads <strong>more</strong> than \(mg\).</li>
            <li>Accelerating down, <em>or moving up and slowing down</em>: \(a\) is down, so the scale reads <strong>less</strong>.</li>
            <li>Constant velocity (either direction): scale reads exactly \(mg\).</li>
            <li>Free fall (\(a = -9.8\ \text{m/s}^2\)): scale reads 0. You feel "weightless."</li>
          </ul>
          <p>What matters is the direction of the <strong>acceleration</strong>, not the direction of motion.</p>`,
        fig: ['elevator', { a: 'up', v: 'down', label: 'm' }],
      },
      {
        title: 'Atwood machines',
        body: T`<p>Two masses hang on either side of a pulley. The heavier side accelerates down and the lighter side up, with the same size of acceleration and the same tension.</p>
          <p>System: the only unbalanced force is the difference in weights, \((m_2 - m_1)g\), pulling the total mass: \[a = \frac{(m_2 - m_1)g}{m_1 + m_2}\] Then use one block's FBD to get \(T\), e.g. \(T - m_1g = m_1a\).</p>`,
        fig: ['atwood', { m1: 'm₁', m2: 'm₂' }],
      },
      {
        title: 'Accelerometers and "fictitious" forces',
        body: T`<p>Fuzzy dice hanging from a car mirror tilt <strong>backward</strong> when the car speeds up. There is no "backward force." The dice's inertia means the string has to drag them forward, so the string tilts toward the direction of acceleration and the dice lag behind.</p>
          <p>Rule: a hanging object tilts <strong>opposite</strong> to the acceleration. Luggage sliding toward the front of a train means the train is <strong>slowing down</strong>: the luggage keeps going while the train slows.</p>`,
      },
    ],

    sims: ['friction-push', 'incline'],

    mistakes: [
      {
        title: 'Adding static and kinetic friction',
        wrong: 'Using μs F_N + μk F_N, or subtracting both from the applied force.',
        right: 'Only one acts at a time. Not sliding: static, which matches the push up to μs F_N. Sliding: kinetic, μk F_N. Never ever add them.',
      },
      {
        title: 'Assuming F_N = mg every time',
        wrong: 'Writing F_N = mg on an incline, in an elevator, or with an angled push or pull.',
        right: 'Get F_N from ΣF_y = ma_y. Incline: mg cos θ. Push down at angle: mg + F sin θ. Pull up at angle: mg − F sin θ. Elevator: m(g + a).',
      },
      {
        title: 'Putting both 3rd-law forces on one FBD',
        wrong: '"The normal force and weight are an action–reaction pair, so they cancel."',
        right: "3rd-law pairs act on different objects. The pair to Earth pulling the book down is the book pulling Earth up. N and mg on the book can be equal, but that's the 2nd law (a = 0), not the 3rd.",
      },
      {
        title: 'Using μs when it is already sliding',
        wrong: 'Using μs to find the acceleration of a moving object.',
        right: 'μs is only for "will it start to move?" / "maximum force before slipping." Once it moves, use μk. Check: is the push bigger than μs F_N? If yes, it slides, so switch to μk.',
      },
      {
        title: 'Using mg instead of its components on a ramp',
        wrong: 'Writing ma = mg − f on an incline, or F_N = mg.',
        right: 'Along the ramp use mg sin θ; perpendicular use mg cos θ. Check: at θ = 0, sin = 0 (no slope pull) and cos = 1 (F_N = mg). Is your calculator in degree mode?',
      },
      {
        title: 'Mixing up mass and weight (kg vs N)',
        wrong: '"The scale reads 650 N, so m = 650 kg," or plugging grams into F = ma.',
        right: 'Weight is a force in newtons: F_G = mg. Divide by 9.80 to get mass in kg. Convert grams to kg before using F = ma.',
      },
      {
        title: 'Forgetting the whole system accelerates',
        wrong: 'For blocks pushed together or a hanging mass pulling a cart, using only one block\'s mass in a = F/m.',
        right: 'Find a with the total mass of everything that moves together. Then use one block\'s FBD to find the tension or contact force.',
      },
      {
        title: 'Thinking motion needs a net force',
        wrong: '"It\'s moving to the right, so the net force must be to the right."',
        right: 'Net force tells you the acceleration, not the velocity. Constant velocity means ΣF = 0. A car moving forward while braking has a net force backward.',
      },
      {
        title: 'Friction pointing the wrong way',
        wrong: 'Always drawing friction to the left, or always down the ramp.',
        right: 'Friction opposes sliding (or the tendency to slide) relative to the surface. A block pulled up a ramp has friction pointing down the ramp; a block about to slide down has friction pointing up the ramp.',
      },
    ],

    examples: [
      {
        title: 'Elevator: what does the scale read?',
        source: 'Class slides',
        problem: T`AE weighs 147 lb (650 N) at rest. What does the scale read if the elevator (a) accelerates up at \(9.8\ \text{m/s}^2\)? (b) accelerates down at \(9.8\ \text{m/s}^2\)?`,
        fig: ['elevator', { a: 'up', v: 'none', label: '650 N' }],
        steps: [
          T`Draw the FBD: \(F_N\) (the scale) up, \(mg\) down. Take up as positive.`,
          T`Mass: \(m = \dfrac{F_G}{g} = \dfrac{650\ \text{N}}{9.80\ \text{m/s}^2} = 66.3\ \text{kg}\)`,
          T`Equation: \(F_N - mg = ma \Rightarrow F_N = m(g + a)\)`,
          T`(a) \(F_N = (66.3\ \text{kg})(9.80 + 9.80)\ \text{m/s}^2 = 1300\ \text{N}\). The scale reads double his weight.`,
          T`(b) \(F_N = (66.3\ \text{kg})(9.80 - 9.80)\ \text{m/s}^2 = 0\ \text{N}\). That's free fall, so he feels weightless.`,
        ],
        answer: T`(a) \(1300\ \text{N}\) (b) \(0\ \text{N}\)`,
      },
      {
        title: 'Three blocks pushed together',
        source: 'Class slides',
        problem: T`Three blocks sit side by side on a frictionless floor: \(m_1 = 20\ \text{kg}\), \(m_2 = 50\ \text{kg}\), \(m_3 = 30\ \text{kg}\). You push block 1 with \(F = 100\ \text{N}\). What is the force between the blocks?`,
        fig: ['blocks', { labels: ['20 kg', '50 kg', '30 kg'], force: '100 N', from: 'left' }],
        steps: [
          T`System: \(a = \dfrac{F}{m_{\text{total}}} = \dfrac{100\ \text{N}}{100\ \text{kg}} = 1.00\ \text{m/s}^2\)`,
          T`Block 1 pushes blocks 2 and 3 together (80 kg): \(F_{12} = (m_2 + m_3)a = (80\ \text{kg})(1.00\ \text{m/s}^2) = 80\ \text{N}\)`,
          T`Block 2 pushes block 3 only: \(F_{23} = m_3 a = (30\ \text{kg})(1.00\ \text{m/s}^2) = 30\ \text{N}\)`,
          T`Check block 2: \(\Sigma F = 80 - 30 = 50\ \text{N} = (50\ \text{kg})(1.00\ \text{m/s}^2)\) ✓`,
        ],
        answer: T`\(F_{12} = 80\ \text{N}\), \(F_{23} = 30\ \text{N}\)`,
      },
      {
        title: 'Crane: shortest safe lift',
        source: 'Class practice problems',
        problem: T`A crane lifts a \(500\ \text{kg}\) load of building materials. The cable breaks above \(12{,}000\ \text{N}\) of tension. What is the shortest time to safely raise the load \(40\ \text{m}\) from rest?`,
        steps: [
          T`FBD: \(T\) up, \(mg\) down. Shortest time means maximum acceleration, so use the maximum tension.`,
          T`\(\Sigma F = T - mg = ma \Rightarrow a = \dfrac{T - mg}{m} = \dfrac{12{,}000 - (500)(9.80)}{500} = \dfrac{7100\ \text{N}}{500\ \text{kg}} = 14.2\ \text{m/s}^2\)`,
          T`Kinematics from rest: \(\Delta y = \tfrac12 a t^2 \Rightarrow t = \sqrt{\dfrac{2\Delta y}{a}} = \sqrt{\dfrac{2(40\ \text{m})}{14.2\ \text{m/s}^2}}\)`,
          T`\(t = 2.37\ \text{s}\)`,
        ],
        answer: T`\(t \approx 2.4\ \text{s}\)`,
      },
      {
        title: 'Elsie the Wonder Mutt',
        source: 'Forces test, part II',
        problem: T`Elsie pulls a \(100\ \text{kg}\) sled up a \(20^\circ\) hill with a force of \(1200\ \text{N}\) parallel to the slope, starting from rest. \(\mu_s = 0.35\), \(\mu_k = 0.25\). (b) Does she move the sled? (c) If so, what is its acceleration?`,
        fig: ['incline', { angle: 20, label: '100 kg', show: ['mg', 'N', 'f', 'F'], friction: 'down', components: true }],
        steps: [
          T`FBD: \(F = 1200\ \text{N}\) up the slope; \(mg\sin\theta\) and friction down the slope; \(F_N\) balances \(mg\cos\theta\).`,
          T`\(mg\sin 20^\circ = (100)(9.80)(0.342) = 335\ \text{N}\); \(F_N = mg\cos 20^\circ = (100)(9.80)(0.940) = 921\ \text{N}\)`,
          T`(b) To start it moving she must beat \(mg\sin\theta + \mu_s F_N = 335 + (0.35)(921) = 335 + 322 = 657\ \text{N}\). Since \(1200\ \text{N} > 657\ \text{N}\), yes, it moves.`,
          T`(c) Now it slides, so switch to kinetic: \(F_{fk} = \mu_k F_N = (0.25)(921) = 230\ \text{N}\)`,
          T`\(\Sigma F = F - mg\sin\theta - F_{fk} = 1200 - 335 - 230 = 635\ \text{N}\)`,
          T`\(a = \dfrac{\Sigma F}{m} = \dfrac{635\ \text{N}}{100\ \text{kg}} = 6.35\ \text{m/s}^2\) up the hill`,
          T`(d, bonus) Alone on the hill it would slip if \(\tan\theta > \mu_s\), i.e. \(\theta > \tan^{-1}(0.35) = 19.3^\circ\). At \(20^\circ\) it would actually start sliding down on its own!`,
        ],
        answer: T`(b) Yes (1200 N > 657 N) (c) \(a \approx 6.35\ \text{m/s}^2\)`,
      },
      {
        title: 'Locomotive pulling three cars',
        source: 'Forces test practice',
        problem: T`A locomotive pulls three cars along a level track with \(100{,}000\ \text{N}\). From the locomotive back, the cars have masses \(80{,}000\ \text{kg}\), \(50{,}000\ \text{kg}\), and \(70{,}000\ \text{kg}\). Ignore friction. (a) What force does the 80,000 kg car exert on the 50,000 kg car? (b) What force does the 50,000 kg car exert on the 70,000 kg car?`,
        fig: ['train', { labels: ['70,000 kg', '50,000 kg', '80,000 kg'], force: '100,000 N' }],
        steps: [
          T`System: \(a = \dfrac{100{,}000\ \text{N}}{200{,}000\ \text{kg}} = 0.50\ \text{m/s}^2\)`,
          T`(a) The 80,000 kg car pulls everything behind it (120,000 kg): \(F = (120{,}000\ \text{kg})(0.50\ \text{m/s}^2) = 60{,}000\ \text{N}\)`,
          T`(b) The 50,000 kg car pulls only the last car: \(F = (70{,}000\ \text{kg})(0.50\ \text{m/s}^2) = 35{,}000\ \text{N}\)`,
        ],
        answer: T`(a) \(60{,}000\ \text{N}\) (b) \(35{,}000\ \text{N}\)`,
      },
      {
        title: 'Minimum hanging mass to start sliding up a ramp',
        source: 'Forces test practice',
        problem: T`Package A (\(3.0\ \text{kg}\)) sits on a rough \(30^\circ\) incline with \(\mu_s = 0.40\). A string parallel to the ramp runs over a pulley at the top to hanging package B. What minimum mass must B have to start A sliding up the ramp?`,
        fig: ['incline-pulley', { angle: 30, m1: 'A 3.0 kg', m2: 'B' }],
        steps: [
          T`FBDs: B has \(T\) up and \(m_Bg\) down. A has \(T\) up the ramp; \(m_Ag\sin\theta\) and static friction down the ramp (it would slide up).`,
          T`"Just starts" means \(a = 0\) with friction at its max: \(m_Bg = m_Ag\sin\theta + \mu_s m_Ag\cos\theta\)`,
          T`\(g\) cancels: \(m_B = m_A(\sin\theta + \mu_s\cos\theta) = (3.0)(\sin 30^\circ + 0.40\cos 30^\circ)\)`,
          T`\(m_B = (3.0)(0.500 + 0.346) = 2.54\ \text{kg}\)`,
        ],
        answer: T`\(m_B = 2.54\ \text{kg}\)`,
      },
      {
        title: 'Snowboarder: incline then flat',
        source: 'Class slides (Giancoli 4-75)',
        problem: T`A \(75\ \text{kg}\) snowboarder starts down a \(28^\circ\) incline at \(5.0\ \text{m/s}\). The slope is \(110\ \text{m}\) long with \(\mu_k = 0.18\). She then slides onto flat snow with \(\mu_k = 0.15\). How far does she glide on the flat before stopping?`,
        steps: [
          T`Incline: \(a_1 = g(\sin\theta - \mu_k\cos\theta) = 9.80(\sin 28^\circ - 0.18\cos 28^\circ) = 9.80(0.469 - 0.159) = 3.04\ \text{m/s}^2\)`,
          T`Speed at the bottom: \(v^2 = v_0^2 + 2a_1\Delta x = (5.0)^2 + 2(3.04)(110) = 695 \Rightarrow v = 26.4\ \text{m/s}\)`,
          T`Flat: friction is the only horizontal force, so \(a_2 = -\mu_k g = -(0.15)(9.80) = -1.47\ \text{m/s}^2\)`,
          T`Stopping distance: \(0 = v^2 + 2a_2 x \Rightarrow x = \dfrac{695}{2(1.47)} = 236\ \text{m}\)`,
        ],
        answer: T`\(x \approx 240\ \text{m}\) (she reaches \(26\ \text{m/s}\) at the bottom)`,
      },
    ],

    quiz: [
      // ---- Forces review test (class) ----
      {
        q: 'In a collision between a huge SUV and a small hybrid car, the SUV exerts a larger force on the hybrid than the hybrid exerts on the SUV.',
        choices: ['True', 'False', 'It depends on whether the collision is head-on or rear-end.'],
        answer: 1,
        keepOrder: true,
        source: 'Forces review test',
        explain: "Newton's 3rd law: the two forces are always equal in size and opposite in direction. The hybrid gets wrecked more because its smaller mass gives it a larger acceleration.",
        why: { 0: 'The forces are equal (3rd law). It is the accelerations that differ: a = F/m is larger for the lighter car.', 2: 'The 3rd law holds for every interaction, no matter the direction of the crash.' },
      },
      {
        q: 'If you pound a feather with a hammer, which one feels a greater force?',
        choices: ['Always the feather', 'The size of the force is always exactly the same on both of them.', 'Always the hammer', 'If the feather moves, then it felt the greater force. Otherwise the force was the same on both.'],
        answer: 1,
        keepOrder: true,
        source: 'Forces review test',
        explain: "Newton's 3rd law pair: hammer on feather and feather on hammer are equal and opposite.",
        why: { 0: 'The feather reacts more because of its tiny mass (bigger acceleration), not a bigger force.', 3: 'Whether something moves depends on its mass and the other forces on it, not on which side of a 3rd-law pair it is.' },
      },
      {
        q: 'You are in a train traveling on a horizontal track and notice that a piece of luggage starts to slide directly toward the front of the train. From this observation, you can conclude that this train is',
        choices: ['changing direction.', 'speeding up.', 'speeding up and changing direction.', 'slowing down and changing direction.', 'slowing down.'],
        answer: 4,
        keepOrder: true,
        source: 'Forces review test',
        explain: "Newton's 1st law: the luggage wants to keep moving at the train's old speed. If it moves forward relative to the train, the train must be slowing down. Straight toward the front means no turning.",
        why: { 1: 'If the train sped up, the luggage would lag behind and slide toward the back.', 0: 'A turn would make the luggage slide sideways, not straight forward.', 3: 'It slid directly toward the front, so there is no sideways (turning) part.' },
      },
      {
        q: 'While flying horizontally in an airplane, you notice that a string dangling from the overhead luggage compartment hangs at rest at 15° away from the vertical toward the front of the plane. Using this observation, you can conclude that the airplane is',
        choices: ['moving forward.', 'moving backward.', 'accelerating backward.', 'not accelerating because the string is at rest.', 'accelerating forward.'],
        answer: 2,
        keepOrder: true,
        source: 'Forces review test',
        explain: 'A hanging object tilts opposite to the acceleration (like fuzzy dice). Swinging toward the front means the plane is accelerating backward, i.e. slowing down.',
        why: { 4: 'Accelerating forward would make the string tilt toward the back, like the dice in a car speeding up.', 0: 'The string tells you about acceleration, not velocity. At constant velocity it would hang straight down.', 3: 'At rest relative to the plane, but tilted. A tilted string means there is a horizontal net force, so the plane is accelerating.' },
      },
      {
        q: 'An elevator suspended by a vertical cable is moving downward but slowing down. The tension in the cable must be',
        choices: ['greater than the weight of the elevator.', 'equal to the weight of the elevator.', 'less than the weight of the elevator.'],
        answer: 0,
        keepOrder: true,
        source: 'Forces review test',
        explain: 'Moving down and slowing down means the acceleration points up. \\(T - F_G = ma\\) with a > 0 gives \\(T = F_G + ma\\), which is greater than the weight.',
        why: { 2: 'Moving down is about velocity. Slowing down while moving down means the acceleration is up, so the tension must win.', 1: 'Equal tension and weight would mean constant velocity, but it is slowing down.' },
      },
      {
        q: 'A 10-lb weight hangs from two spring scales hooked one below the other (each scale has negligible weight). Which statement about the readings is true?',
        choices: ['The top scale will read zero, the lower scale will read 10 lb.', 'The lower scale will read zero, the top scale will read 10 lb.', 'Each scale will show a reading between one and 10 lb, such that the sum of the two is 10 lb. However, exact readings cannot be determined without more information.', 'Each scale will read 5 lb.', 'None of these is true.'],
        answer: 4,
        keepOrder: true,
        source: 'Forces review test',
        explain: 'Each scale reads 10 lb. The lower scale holds the 10-lb weight. The top scale holds the lower scale plus the weight, which is still 10 lb since the scales are weightless. Scales in series do not split the load.',
        why: { 3: 'Scales in series each carry the full load. Splitting it would only happen if they held the weight side by side.', 2: 'Both scales carry everything hanging below them, so both read the full 10 lb.' },
      },
      {
        q: T`A push of magnitude \(P\) acts on a box of weight \(W\). The push is directed at an angle \(\theta\) below the horizontal, and the box remains at rest on a floor with some friction. The normal force on the box from the floor is`,
        choices: [T`\(W + P\sin\theta\)`, T`\(W - P\sin\theta\)`, T`\(W + P\)`, T`\(W + P\cos\theta\)`, T`\(W\)`],
        answer: 0,
        keepOrder: true,
        source: 'Forces review test',
        fig: ['box-force', { angle: 30, label: 'P', mode: 'push' }],
        explain: T`Vertical forces balance: \(F_N - W - P\sin\theta = 0\), so \(F_N = W + P\sin\theta\). The downward part of the push presses the box into the floor.`,
        why: { 1: T`That's for a pull <em>upward</em> at an angle, which lifts some of the weight off the floor.`, 3: T`\(P\cos\theta\) is the horizontal part of the push. Only the vertical part \(P\sin\theta\) changes \(F_N\).`, 4: 'The push has a downward component, so the floor must push back harder than just W.' },
      },
      {
        q: 'A 200-N sled slides down a frictionless hillside that rises at 37° above the horizontal. What is the magnitude of the force that the surface of the hill exerts on the sled?',
        choices: ['0 N', '160 N', '200 N', '150 N', '120 N'],
        answer: 1,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`With no friction, the surface only exerts the normal force: \(F_N = F_G\cos\theta = (200\ \text{N})\cos 37^\circ = 160\ \text{N}\).`,
        why: { 2: 'F_N = weight only on flat ground. On a slope it is mg cos θ.', 4: T`\(120\ \text{N} = 200\sin 37^\circ\) is the component pulling it down the slope, not the surface force.`, 0: 'The sled is pressing on the hill, so the hill pushes back with a normal force.' },
      },
      {
        q: T`What is the mass of an object that experiences a gravitational force of \(685\ \text{N}\) near Earth's surface where \(g = 9.80\ \text{m/s}^2\)?`,
        choices: ['72.7 kg', '68.5 kg', '71.3 kg', '69.9 kg'],
        answer: 3,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`\(F_G = mg \Rightarrow m = \dfrac{685\ \text{N}}{9.80\ \text{m/s}^2} = 69.9\ \text{kg}\)`,
        why: { 1: 'That is 685 ÷ 10. Use g = 9.80, not 10.' },
      },
      {
        q: T`If a net force accelerates a \(4.5\ \text{kg}\) tool at \(40\ \text{m/s}^2\), what acceleration would that same net force give an \(18\ \text{kg}\) tool?`,
        choices: [T`\(160\ \text{m/s}^2\)`, T`\(32\ \text{m/s}^2\)`, T`\(10\ \text{m/s}^2\)`, T`\(180\ \text{m/s}^2\)`, T`\(9.8\ \text{m/s}^2\)`],
        answer: 2,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`\(F_{net} = (4.5)(40) = 180\ \text{N}\). Then \(a = \dfrac{180\ \text{N}}{18\ \text{kg}} = 10\ \text{m/s}^2\). Four times the mass gives one quarter of the acceleration.`,
        why: { 0: 'Acceleration is inversely proportional to mass. More mass means less acceleration, not more.', 3: '180 N is the net force, not the acceleration.' },
      },
      {
        q: T`A \(450\ \text{kg}\) sports car accelerates from rest to \(100\ \text{km/h}\) in \(4.80\ \text{s}\). What magnitude force does a \(68.0\ \text{kg}\) passenger experience during the acceleration?`,
        choices: [T`\(82.0\ \text{N}\)`, T`\(394\ \text{N}\)`, T`\(342\ \text{N}\)`, T`\(311\ \text{N}\)`],
        answer: 1,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`Convert: \(100\ \text{km/h} = 27.8\ \text{m/s}\). \(a = \dfrac{27.8}{4.80} = 5.79\ \text{m/s}^2\). The passenger's net force: \(F = ma = (68.0)(5.79) = 394\ \text{N}\). The car's 450 kg doesn't matter.`,
      },
      {
        q: T`A \(45.0\ \text{kg}\) person steps on a scale in an elevator. The scale reads \(460\ \text{N}\). What is the magnitude of the acceleration of the elevator?`,
        choices: [T`\(4.91\ \text{m/s}^2\)`, T`\(0.206\ \text{m/s}^2\)`, T`\(46.9\ \text{m/s}^2\)`, T`\(9.81\ \text{m/s}^2\)`, T`\(0.422\ \text{m/s}^2\)`],
        answer: 4,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`Weight: \(mg = (45.0)(9.80) = 441\ \text{N}\). \(F_N - mg = ma \Rightarrow 460 - 441 = 45.0a \Rightarrow a = 0.422\ \text{m/s}^2\) (upward, since the scale reads heavy).`,
        why: { 3: 'That is just g. The scale reading is close to the weight, so the acceleration is small.' },
      },
      {
        q: T`A \(3.0\ \text{kg}\) and a \(5.0\ \text{kg}\) box rest side by side on a smooth, level floor. A horizontal force of \(32\ \text{N}\) is applied to the 5.0 kg box, pushing it against the 3.0 kg box. How hard do the two boxes push against each other?`,
        choices: [T`\(32\ \text{N}\)`, T`\(20\ \text{N}\)`, T`\(24\ \text{N}\)`, T`\(12\ \text{N}\)`, T`\(0\ \text{N}\)`],
        answer: 3,
        keepOrder: true,
        source: 'Forces review test',
        fig: ['blocks', { labels: ['3.0 kg', '5.0 kg'], force: '32 N', from: 'right' }],
        explain: T`System: \(a = \dfrac{32}{8.0} = 4.0\ \text{m/s}^2\). The contact force is the only horizontal force on the 3.0 kg box: \(F = (3.0)(4.0) = 12\ \text{N}\).`,
        why: { 0: 'The 32 N acts on the 5 kg box. The 3 kg box only needs enough force to give itself a = 4.0 m/s².', 1: T`\(20\ \text{N} = (5.0)(4.0)\) is the <em>net</em> force on the 5 kg box, not the contact force.`, 4: 'They are touching and accelerating together, so they must push on each other.' },
      },
      {
        q: 'A 10 kg block on a perfectly smooth horizontal table is connected by a horizontal string to a 63 kg block hanging over the edge. What is the magnitude of the acceleration of the 10 kg block when the other block is gently released?',
        choices: [T`\(8.5\ \text{m/s}^2\)`, T`\(8.1\ \text{m/s}^2\)`, T`\(9.0\ \text{m/s}^2\)`, T`\(7.5\ \text{m/s}^2\)`],
        answer: 0,
        keepOrder: true,
        source: 'Forces review test',
        fig: ['pulley-table', { m1: '10 kg', m2: '63 kg', friction: false }],
        explain: T`The only unbalanced force on the system is the hanging weight: \(a = \dfrac{m_2 g}{m_1 + m_2} = \dfrac{(63)(9.8)}{73} = 8.46\ \text{m/s}^2\).`,
      },
      {
        q: T`During a hockey game, a puck is given an initial speed of \(10\ \text{m/s}\). It slides \(50\ \text{m}\) on the horizontal ice before it stops due to friction. What is the coefficient of kinetic friction between the puck and the ice?`,
        choices: ['0.10', '0.12', '0.090', '0.11'],
        answer: 0,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`Kinematics: \(0 = v_0^2 + 2a\Delta x \Rightarrow a = -\dfrac{10^2}{2(50)} = -1.0\ \text{m/s}^2\). Friction is the net force: \(\mu_k mg = m|a| \Rightarrow \mu_k = \dfrac{1.0}{9.8} = 0.10\). The mass cancels.`,
      },
      {
        q: 'A 15 kg block is on a frictionless ramp inclined at 20° above the horizontal. It is connected by a light string over an ideal pulley at the top of the ramp to a hanging 19 kg block. Find the magnitude of the acceleration of the 19 kg block after the system is released.',
        choices: [T`\(4.5\ \text{m/s}^2\)`, T`\(4.0\ \text{m/s}^2\)`, T`\(4.2\ \text{m/s}^2\)`, T`\(3.8\ \text{m/s}^2\)`],
        answer: 1,
        keepOrder: true,
        source: 'Forces review test',
        fig: ['incline-pulley', { angle: 20, m1: '15 kg', m2: '19 kg' }],
        explain: T`System along the string: \(m_2g - m_1g\sin 20^\circ = (m_1 + m_2)a\). So \(a = \dfrac{(19)(9.8) - (15)(9.8)(0.342)}{34} = \dfrac{186.2 - 50.3}{34} = 4.0\ \text{m/s}^2\).`,
      },
      {
        q: T`A \(6.0\ \text{kg}\) box slides down an inclined plane that makes an angle of \(39^\circ\) with the horizontal. If \(\mu_k = 0.40\), at what rate does the box accelerate down the slope?`,
        choices: [T`\(3.7\ \text{m/s}^2\)`, T`\(3.4\ \text{m/s}^2\)`, T`\(4.1\ \text{m/s}^2\)`, T`\(3.1\ \text{m/s}^2\)`],
        answer: 3,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`\(a = g(\sin\theta - \mu_k\cos\theta) = 9.8(\sin 39^\circ - 0.40\cos 39^\circ) = 9.8(0.629 - 0.311) = 3.1\ \text{m/s}^2\). The mass cancels.`,
      },
      {
        q: T`The coefficients of static and kinetic friction between a \(3.0\ \text{kg}\) box and a desk are 0.40 and 0.30. What is the force of friction on the box when a \(15\ \text{N}\) horizontal push is applied?`,
        choices: [T`\(8.8\ \text{N}\)`, T`\(6.0\ \text{N}\)`, T`\(15\ \text{N}\)`, T`\(4.5\ \text{N}\)`, T`\(12\ \text{N}\)`],
        answer: 0,
        keepOrder: true,
        source: 'Forces review test',
        explain: T`Max static: \(\mu_s F_N = (0.40)(3.0)(9.8) = 11.8\ \text{N}\). The 15 N push beats it, so the box slides and friction is kinetic: \(\mu_k F_N = (0.30)(29.4) = 8.8\ \text{N}\).`,
        why: { 4: T`About \(12\ \text{N}\) is the <em>maximum static</em> friction. The push exceeds it, so the box slides and kinetic friction takes over.`, 2: 'Friction equals the push only if the box stays at rest. 15 N is more than static friction can hold.' },
      },

      // ---- Class slide questions ----
      {
        q: T`To find the coefficient of friction between a \(1.0\ \text{kg}\) block and a \(100\ \text{cm}\) long surface, an experimenter lifts one end. The block just begins to slip when that end is \(60\ \text{cm}\) above the other end. The static coefficient of friction is most nearly`,
        choices: ['0.60', '0.75', '0.90', '1.05', '1.20'],
        answer: 1,
        keepOrder: true,
        source: 'Class slides',
        explain: T`At the slipping point, \(\mu_s = \tan\theta\). With hypotenuse 100 cm and height 60 cm, the base is 80 cm, so \(\tan\theta = 60/80 = 0.75\).`,
        why: { 0: T`\(0.60 = \sin\theta\) (60/100). You need \(\tan\theta\), opposite over adjacent: 60/80.` },
      },
      {
        q: T`Three blocks of mass \(m\), \(2m\), and \(3m\) sit side by side on a frictionless surface. A force \(F\) pushes on block \(m\). Which statement is true?`,
        choices: [
          'The acceleration of the blocks will vary according to their mass.',
          T`The acceleration of each block will be the same: \(F/m\).`,
          'The net force acting on each block is the same.',
          T`The force on block \(3m\) from \(2m\) is greater than the force back on \(2m\) from \(3m\).`,
          T`The net force acting on block \(3m\) is three times greater than the net force acting on \(m\).`,
        ],
        answer: 4,
        keepOrder: true,
        source: 'Class slides',
        fig: ['blocks', { labels: ['m', '2m', '3m'], force: 'F', from: 'left' }],
        explain: T`They move together with \(a = F/6m\). Net force on each block is \(ma\), so block \(3m\) gets three times the net force of block \(m\).`,
        why: { 1: T`Same acceleration, yes, but it's \(F/6m\) because all the mass is pushed together.`, 3: "3rd law: the 2m–3m forces are an action–reaction pair, so they are equal.", 2: 'Same acceleration but different masses means different net forces (F = ma).' },
      },
      {
        q: T`Mars exerts a gravitational force \(F_{\text{Mars}}\) on its moon Phobos. Phobos, which has a smaller mass, also exerts a gravitational force \(F_{\text{Phobos}}\) on Mars. Which is true?`,
        choices: [
          T`\(F_{\text{Mars}} > F_{\text{Phobos}}\)`,
          T`\(F_{\text{Phobos}} > F_{\text{Mars}}\)`,
          T`\(F_{\text{Mars}} = F_{\text{Phobos}}\)`,
          'Which one attracts more strongly depends on the distance between the two bodies.',
          "Which one attracts more strongly depends on how close Mars's second moon, Deimos, is located.",
        ],
        answer: 2,
        keepOrder: true,
        source: 'Class slides',
        explain: "Newton's 3rd law applies to gravity too: the forces are equal and opposite. Phobos accelerates more because it has less mass.",
        why: { 0: "Mars's bigger mass doesn't give it a bigger force. The pair is always equal.", 3: 'Distance changes the size of both forces equally. They stay equal to each other.' },
      },
      {
        q: 'A rope is tied to a wall through a spring scale. Now the scale is placed between two ropes, and two students each pull on an end with 25 N in opposite directions. What does the spring scale read?',
        choices: ['0 N', '12.5 N', '25 N', '50 N'],
        answer: 2,
        keepOrder: true,
        source: 'Class slides',
        explain: 'Same as tying it to a wall: the wall pulls back with 25 N (3rd law) and the scale reads 25 N. Replacing the wall with a second student pulling 25 N changes nothing.',
        why: { 3: "The two 25 N pulls don't add. A scale reads the tension, which is the force on one end.", 0: 'The scale is in equilibrium (net force zero), but it still reads the 25 N tension pulling on it.' },
      },
      {
        q: 'The FBD shows the forces on a box on a horizontal floor. The arrow lengths are proportional to the forces. Which statement is correct?',
        fig: ['fbd', { object: 'box', forces: [
          { label: 'F_N', angle: 90, mag: 0.75 },
          { label: 'F_G', angle: 270, mag: 0.75 },
          { label: 'F_app', angle: 0, mag: 1 },
          { label: 'F_f', angle: 180, mag: 0.45 },
        ] }],
        choices: [
          'The box is accelerating to the right, because the applied force is greater than friction.',
          'The box must be moving at constant velocity.',
          'The box must not be moving, because the vertical forces are balanced.',
          'The box is accelerating downward, because gravity is greater than the normal force.',
        ],
        answer: 0,
        source: 'Based on class slides',
        explain: 'Vertical forces cancel (F_N = F_G). Horizontally, the applied force beats friction, so the net force and acceleration point right.',
        why: { 1: 'Constant velocity needs ΣF = 0, but the horizontal forces are unbalanced.', 2: 'Balanced vertical forces only mean no vertical acceleration. The horizontal forces are unbalanced.', 3: 'The F_N and F_G arrows are the same length, so they are balanced.' },
      },

      // ---- Additional concept checks ----
      {
        q: 'A book rests on a table. According to Newton\'s 3rd law, what is the reaction force to Earth\'s gravitational pull on the book?',
        choices: ['The normal force of the table on the book', 'The book pulling up on Earth', 'The book pushing down on the table', 'There is no reaction force because the book is at rest'],
        answer: 1,
        explain: 'A 3rd-law pair swaps the two objects: "Earth pulls book" ↔ "book pulls Earth." Both are gravitational forces.',
        why: { 0: 'N and mg are equal here because of the 2nd law (a = 0), but they act on the same object and are different types of force, so they are not a 3rd-law pair.', 2: 'The book pushing on the table is the pair to the table pushing on the book (the normal force).' },
      },
      {
        q: 'A spaceship far from any planet is coasting with its engines off. What happens to its motion?',
        choices: ['It slows down and eventually stops.', 'It keeps moving at constant velocity.', 'It speeds up.', 'It starts to curve.'],
        answer: 1,
        explain: "Newton's 1st law: with no net force, velocity stays constant. Nothing is needed to keep it moving.",
        why: { 0: 'Things on Earth slow down because of friction and air resistance. In empty space there is nothing to slow it.' },
      },
      {
        q: 'You push a heavy box across the floor at a constant speed. How does your push compare to the kinetic friction on the box?',
        choices: ['Your push is greater than friction.', 'Your push equals friction.', 'Your push is less than friction.', 'It depends on how fast the box is moving.'],
        answer: 1,
        explain: 'Constant velocity means a = 0, so ΣF = 0: the push exactly matches kinetic friction.',
        why: { 0: 'A bigger push would make the box speed up. You only need the extra push to get it started.' },
      },
      {
        q: 'A car speeds up from a red light. A fuzzy die hanging from the rearview mirror will',
        choices: ['hang straight down', 'tilt toward the front of the car', 'tilt toward the back of the car', 'swing side to side'],
        answer: 2,
        explain: 'The die\'s inertia makes it lag behind as the car accelerates forward, so it tilts backward. A hanging object tilts opposite to the acceleration.',
      },
      {
        q: 'As the angle of an incline increases (block still on it), what happens to the normal force on the block?',
        choices: ['It increases.', 'It decreases.', 'It stays equal to mg.', 'It becomes zero at 45°.'],
        answer: 1,
        explain: T`\(F_N = mg\cos\theta\), and \(\cos\theta\) gets smaller as \(\theta\) grows. At \(90^\circ\) it would be zero.`,
        why: { 2: 'F_N = mg only on a flat surface (θ = 0).', 3: T`\(\cos 45^\circ \approx 0.71\), not zero. \(F_N\) only reaches 0 at \(90^\circ\).` },
      },
      {
        q: 'Why is it usually harder to get a heavy box moving than to keep it moving?',
        choices: ['Kinetic friction increases once it moves.', 'μs is usually larger than μk.', 'The normal force gets smaller once it moves.', 'Static and kinetic friction add together at the start.'],
        answer: 1,
        explain: 'Maximum static friction μs F_N is usually bigger than kinetic friction μk F_N, so you need a bigger push to break it loose.',
        why: { 3: 'Never add static and kinetic friction. Only one acts at a time.', 2: 'On a flat floor, F_N = mg whether it moves or not.' },
      },
      {
        q: 'Which unit is the same as a newton?',
        choices: [T`\(\text{kg}\cdot\text{m/s}\)`, T`\(\text{kg}\cdot\text{m/s}^2\)`, T`\(\text{kg/m}\)`, T`\(\text{m/s}^2\)`],
        answer: 1,
        explain: T`\(F = ma\): kilograms times meters per second squared. That's also why g can be written as \(9.80\ \text{N/kg} = 9.80\ \text{m/s}^2\).`,
      },
      {
        q: 'An astronaut has a mass of 70 kg on Earth. What are their mass and weight on the Moon (g = 1.62 N/kg)?',
        choices: ['70 kg and 113 N', '11.6 kg and 113 N', '70 kg and 686 N', '11.6 kg and 18.8 N'],
        answer: 0,
        explain: T`Mass doesn't change: still 70 kg. Weight: \(F_G = (70)(1.62) = 113\ \text{N}\).`,
        why: { 1: 'Mass is the amount of matter, which is the same everywhere. Only weight changes.', 2: T`\(686\ \text{N}\) is the weight on <em>Earth</em>.` },
      },
    ],

    problems: [
      {
        id: 'mass-weight-moon',
        title: 'Mass and weight (Earth and Moon)',
        gen(r) {
          const mode = r.pick(['mass', 'weight']);
          if (mode === 'mass') {
            const m = r.num(5, 150, 0);
            const WE = m * r.g, WM = m * 1.62;
            return {
              question: T`An astronaut's gear has a mass of \(${m}\ \text{kg}\). (\(g_{\text{Moon}} = 1.62\ \text{N/kg}\))`,
              parts: [
                { label: '(a) Weight on Earth', value: WE, unit: 'N' },
                { label: '(b) Weight on the Moon', value: WM, unit: 'N' },
                { label: '(c) Mass on the Moon', value: m, unit: 'kg' },
              ],
              hint: T`Weight is \(F_G = mg\). What changes between Earth and the Moon: m or g?`,
              steps: [
                T`Equation: \(F_G = mg\)`,
                T`(a) \(F_G = (${m}\ \text{kg})(9.80\ \text{N/kg}) = ${r.f(WE)}\ \text{N}\)`,
                T`(b) \(F_G = (${m}\ \text{kg})(1.62\ \text{N/kg}) = ${r.f(WM)}\ \text{N}\)`,
                T`(c) Mass is the amount of matter and doesn't change: \(${m}\ \text{kg}\).`,
              ],
            };
          }
          const W = r.num(150, 1200, 0);
          const m = W / r.g, WM = m * 1.62;
          return {
            question: T`A bathroom scale on Earth shows that a person weighs \(${W}\ \text{N}\). (\(g_{\text{Moon}} = 1.62\ \text{N/kg}\))`,
            parts: [
              { label: '(a) Mass', value: m, unit: 'kg' },
              { label: '(b) Weight on the Moon', value: WM, unit: 'N' },
            ],
            hint: T`Newtons are a force. Divide by \(g\) to get kilograms.`,
            steps: [
              T`Equation: \(F_G = mg \Rightarrow m = \dfrac{F_G}{g}\)`,
              T`(a) \(m = \dfrac{${W}\ \text{N}}{9.80\ \text{N/kg}} = ${r.f(m)}\ \text{kg}\)`,
              T`(b) Same mass, Moon's g: \(F_G = (${r.f(m)}\ \text{kg})(1.62\ \text{N/kg}) = ${r.f(WM)}\ \text{N}\)`,
            ],
          };
        },
      },

      {
        id: 'box-pull-friction',
        title: 'Pulling a box with friction',
        gen(r) {
          const m = r.num(5, 40, 0);
          const mu = r.pick([0.15, 0.20, 0.25, 0.30, 0.35, 0.40]);
          const fk = mu * m * r.g;
          const F = r.num(Math.ceil(fk * 1.2), Math.ceil(fk * 2.5) + 10, 0);
          const a = (F - fk) / m;
          return {
            question: T`A \(${m}\ \text{kg}\) box is pulled across a level floor by a horizontal rope with \(${F}\ \text{N}\) of force. The coefficient of kinetic friction is \(${mu}\).`,
            fig: ['fbd', { object: 'box', forces: [
              { label: 'F_N', angle: 90, mag: 0.75 }, { label: 'mg', angle: 270, mag: 0.75 },
              { label: 'F', angle: 0, mag: 1 }, { label: 'F_fk', angle: 180, mag: 0.55 },
            ] }],
            parts: [
              { label: '(a) Kinetic friction force', value: fk, unit: 'N' },
              { label: '(b) Acceleration of the box', value: a, unit: 'm/s²' },
            ],
            hint: T`Find \(F_N\) first (flat floor, no other vertical forces). Then \(\Sigma F_x = F - F_{fk} = ma\).`,
            steps: [
              T`FBD: \(F\) right, \(F_{fk}\) left, \(F_N\) up, \(mg\) down.`,
              T`Vertical: \(F_N = mg = (${m})(9.80) = ${r.f(m * r.g)}\ \text{N}\)`,
              T`(a) \(F_{fk} = \mu_k F_N = (${mu})(${r.f(m * r.g)}\ \text{N}) = ${r.f(fk)}\ \text{N}\)`,
              T`Horizontal: \(\Sigma F_x = F - F_{fk} = ${F} - ${r.f(fk)} = ${r.f(F - fk)}\ \text{N}\)`,
              T`(b) \(a = \dfrac{\Sigma F}{m} = \dfrac{${r.f(F - fk)}\ \text{N}}{${m}\ \text{kg}} = ${r.f(a)}\ \text{m/s}^2\)`,
            ],
          };
        },
      },

      {
        id: 'push-at-angle',
        title: 'Pushing down at an angle',
        gen(r) {
          const m = r.num(10, 40, 0);
          const th = r.pick([20, 25, 30, 35, 40]);
          const mu = r.pick([0.15, 0.20, 0.25, 0.30]);
          const pMin = mu * m * r.g / (r.cos(th) - mu * r.sin(th));
          const P = Math.round(pMin * r.num(1.3, 2.2, 2));
          const N = m * r.g + P * r.sin(th);
          const fk = mu * N;
          const a = (P * r.cos(th) - fk) / m;
          return {
            question: T`You push a \(${m}\ \text{kg}\) box across the floor with \(${P}\ \text{N}\) directed \(${th}^\circ\) below the horizontal (like pushing a lawn mower). \(\mu_k = ${mu}\).`,
            fig: ['box-force', { angle: th, label: `${P} N`, mode: 'push' }],
            parts: [
              { label: '(a) Normal force', value: N, unit: 'N' },
              { label: '(b) Acceleration', value: a, unit: 'm/s²' },
            ],
            hint: T`Split the push into components. The downward part \(P\sin\theta\) adds to the normal force, which increases friction.`,
            steps: [
              T`Components: \(P_x = P\cos\theta = ${P}\cos ${th}^\circ = ${r.f(P * r.cos(th))}\ \text{N}\); \(P_y = P\sin\theta = ${r.f(P * r.sin(th))}\ \text{N}\) (down)`,
              T`Vertical (\(a_y = 0\)): \(F_N - mg - P_y = 0 \Rightarrow F_N = (${m})(9.80) + ${r.f(P * r.sin(th))} = ${r.f(N)}\ \text{N}\)`,
              T`Friction: \(F_{fk} = \mu_k F_N = (${mu})(${r.f(N)}) = ${r.f(fk)}\ \text{N}\)`,
              T`Horizontal: \(ma = P_x - F_{fk} \Rightarrow a = \dfrac{${r.f(P * r.cos(th))} - ${r.f(fk)}}{${m}} = ${r.f(a)}\ \text{m/s}^2\)`,
            ],
          };
        },
      },

      {
        id: 'elevator-scale',
        title: 'Elevator: scale reading',
        gen(r) {
          const m = r.num(45, 95, 0);
          const a = r.num(1.0, 4.0, 1);
          const sc = r.pick([
            { text: T`accelerating upward at \(${a}\ \text{m/s}^2\)`, s: 1 },
            { text: T`moving downward and slowing down at \(${a}\ \text{m/s}^2\)`, s: 1 },
            { text: T`accelerating downward at \(${a}\ \text{m/s}^2\)`, s: -1 },
            { text: T`moving upward and slowing down at \(${a}\ \text{m/s}^2\)`, s: -1 },
          ]);
          const N = m * (r.g + sc.s * a);
          const aS = sc.s * a;
          return {
            question: T`A \(${m}\ \text{kg}\) student stands on a scale in an elevator that is ${sc.text}. What does the scale read?`,
            fig: ['elevator', { a: sc.s > 0 ? 'up' : 'down', v: 'none', label: `${m} kg` }],
            parts: [{ label: 'Scale reading', value: N, unit: 'N' }],
            hint: T`The scale reads \(F_N\). Which way does the <em>acceleration</em> point? Slowing down means acceleration is opposite the motion.`,
            steps: [
              T`FBD: \(F_N\) up, \(mg\) down. Take up as positive.`,
              sc.s > 0
                ? T`The acceleration points <strong>up</strong>, so \(a = +${a}\ \text{m/s}^2\).`
                : T`The acceleration points <strong>down</strong>, so \(a = -${a}\ \text{m/s}^2\).`,
              T`Equation: \(F_N - mg = ma \Rightarrow F_N = m(g + a)\)`,
              T`Substitute: \(F_N = (${m}\ \text{kg})(9.80 ${aS >= 0 ? '+' : '-'} ${a})\ \text{m/s}^2 = ${r.f(N)}\ \text{N}\)`,
              T`Check: true weight is \(${r.f(m * r.g)}\ \text{N}\), so the scale reads ${sc.s > 0 ? 'heavy' : 'light'}. ✓`,
            ],
          };
        },
      },

      {
        id: 'elevator-find-a',
        title: 'Elevator: find the acceleration',
        gen(r) {
          const m = r.num(45, 95, 0);
          const aTrue = r.num(0.5, 3.5, 1) * r.pick([1, -1]);
          const N = Math.round(m * (r.g + aTrue));
          const a = N / m - r.g;
          return {
            question: T`A \(${m}\ \text{kg}\) person stands on a scale in an elevator. The scale reads \(${N}\ \text{N}\). What is the elevator's acceleration? (Take up as positive, so enter a negative number if it points down.)`,
            parts: [{ label: 'Acceleration (up is +)', value: a, unit: 'm/s²' }],
            hint: T`Compare the reading to the true weight \(mg\). Then use \(F_N - mg = ma\).`,
            steps: [
              T`True weight: \(mg = (${m})(9.80) = ${r.f(m * r.g)}\ \text{N}\). The scale reads ${N > m * r.g ? 'more' : 'less'}, so \(a\) points ${N > m * r.g ? 'up' : 'down'}.`,
              T`Equation: \(F_N - mg = ma \Rightarrow a = \dfrac{F_N - mg}{m}\)`,
              T`Substitute: \(a = \dfrac{${N} - ${r.f(m * r.g)}}{${m}} = ${r.f(a)}\ \text{m/s}^2\)`,
            ],
          };
        },
      },

      {
        id: 'blocks-contact',
        title: 'Blocks pushed together',
        gen(r) {
          const m1 = r.num(2, 30, 0), m2 = r.num(2, 30, 0), m3 = r.num(2, 30, 0);
          const F = r.num(20, 200, 0);
          const M = m1 + m2 + m3;
          const a = F / M;
          const F12 = (m2 + m3) * a, F23 = m3 * a;
          return {
            question: T`Three blocks sit side by side on a frictionless floor: \(m_1 = ${m1}\ \text{kg}\), \(m_2 = ${m2}\ \text{kg}\), \(m_3 = ${m3}\ \text{kg}\). A \(${F}\ \text{N}\) push is applied to block 1.`,
            fig: ['blocks', { labels: [`${m1} kg`, `${m2} kg`, `${m3} kg`], force: `${F} N`, from: 'left' }],
            parts: [
              { label: '(a) Acceleration', value: a, unit: 'm/s²' },
              { label: '(b) Force between blocks 1 and 2', value: F12, unit: 'N' },
              { label: '(c) Force between blocks 2 and 3', value: F23, unit: 'N' },
            ],
            hint: T`System first: all three share one acceleration. Then ask: what does each contact force have to push?`,
            steps: [
              T`System: \(a = \dfrac{F}{m_1 + m_2 + m_3} = \dfrac{${F}\ \text{N}}{${M}\ \text{kg}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`Block 1 pushes blocks 2 and 3: \(F_{12} = (m_2 + m_3)a = (${m2 + m3})(${r.f(a)}) = ${r.f(F12)}\ \text{N}\)`,
              T`Block 2 pushes only block 3: \(F_{23} = m_3 a = (${m3})(${r.f(a)}) = ${r.f(F23)}\ \text{N}\)`,
            ],
          };
        },
      },

      {
        id: 'train-cars',
        title: 'Locomotive and train cars',
        gen(r) {
          const m1 = r.num(40, 90, 0) * 1000, m2 = r.num(40, 90, 0) * 1000, m3 = r.num(40, 90, 0) * 1000;
          const F = r.num(60, 200, 0) * 1000;
          const a = F / (m1 + m2 + m3);
          const F12 = (m2 + m3) * a, F23 = m3 * a;
          return {
            question: T`A locomotive pulls three cars along a level track with a force of \(${big(F)}\ \text{N}\). From the locomotive back, the cars have masses \(${big(m1)}\ \text{kg}\), \(${big(m2)}\ \text{kg}\), and \(${big(m3)}\ \text{kg}\). Ignore friction.`,
            fig: ['train', { labels: [`${bigText(m3)} kg`, `${bigText(m2)} kg`, `${bigText(m1)} kg`], force: `${bigText(F)} N` }],
            parts: [
              { label: '(a) Acceleration', value: a, unit: 'm/s²' },
              { label: `(b) Force the ${bigText(m1)} kg car exerts on the ${bigText(m2)} kg car`, value: F12, unit: 'N' },
              { label: `(c) Force the ${bigText(m2)} kg car exerts on the last car`, value: F23, unit: 'N' },
            ],
            hint: T`Each coupling only has to pull the cars <em>behind</em> it.`,
            steps: [
              T`System: \(a = \dfrac{F}{m_{\text{total}}} = \dfrac{${big(F)}}{${big(m1 + m2 + m3)}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`(b) First coupling pulls the last two cars: \(F = (${big(m2 + m3)}\ \text{kg})(${r.f(a)}\ \text{m/s}^2) = ${big(F12)}\ \text{N}\)`,
              T`(c) Second coupling pulls only the last car: \(F = (${big(m3)}\ \text{kg})(${r.f(a)}\ \text{m/s}^2) = ${big(F23)}\ \text{N}\)`,
            ],
          };
        },
      },

      {
        id: 'table-hanging',
        title: 'Block on a table pulled by a hanging mass',
        gen(r) {
          let m1, m2, mu;
          const fric = r.pick([true, false]);
          do {
            m1 = r.num(5, 60, 0);
            m2 = r.num(3, 40, 0);
            mu = fric ? r.pick([0.10, 0.15, 0.20, 0.25, 0.30, 0.40]) : 0;
          } while (m2 <= mu * m1 * 1.3);
          const a = (m2 * r.g - mu * m1 * r.g) / (m1 + m2);
          const T_ = m2 * (r.g - a);
          const fricText = fric ? T`The coefficient of kinetic friction between the block and table is \(${mu}\).` : 'The table is frictionless.';
          return {
            question: T`A \(${m1}\ \text{kg}\) block on a table is tied by a string over a pulley to a \(${m2}\ \text{kg}\) block hanging off the edge. ${fricText} The system is released.`,
            fig: ['pulley-table', { m1: `${m1} kg`, m2: `${m2} kg`, friction: fric }],
            parts: [
              { label: '(a) Acceleration', value: a, unit: 'm/s²' },
              { label: '(b) Tension in the string', value: T_, unit: 'N' },
            ],
            hint: T`System: the hanging weight pulls${fric ? ', friction on the table block resists' : ''}, and the total mass accelerates. Then use the hanging block's FBD for \(T\).`,
            steps: [
              T`Driving force: \(m_2 g = (${m2})(9.80) = ${r.f(m2 * r.g)}\ \text{N}\)`,
              fric
                ? T`Friction on the table block: \(F_{fk} = \mu_k m_1 g = (${mu})(${m1})(9.80) = ${r.f(mu * m1 * r.g)}\ \text{N}\)`
                : T`No friction, so nothing resists on the table.`,
              T`System: \(a = \dfrac{m_2 g${fric ? ' - F_{fk}' : ''}}{m_1 + m_2} = \dfrac{${r.f(m2 * r.g - mu * m1 * r.g)}}{${m1 + m2}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`Hanging block: \(m_2 g - T = m_2 a \Rightarrow T = m_2(g - a) = (${m2})(9.80 - ${r.f(a)}) = ${r.f(T_)}\ \text{N}\)`,
            ],
          };
        },
      },

      {
        id: 'atwood',
        title: 'Atwood machine',
        gen(r) {
          const m1 = r.num(1, 10, 1);
          const m2 = Math.round((m1 + r.num(0.5, 5, 1)) * 10) / 10;
          const a = (m2 - m1) * r.g / (m1 + m2);
          const T_ = 2 * m1 * m2 * r.g / (m1 + m2);
          return {
            question: T`An Atwood machine has \(m_1 = ${m1}\ \text{kg}\) on one side of a light, frictionless pulley and \(m_2 = ${m2}\ \text{kg}\) on the other. The system is released from rest.`,
            fig: ['atwood', { m1: `${m1} kg`, m2: `${m2} kg` }],
            parts: [
              { label: '(a) Acceleration', value: a, unit: 'm/s²' },
              { label: '(b) Tension in the string', value: T_, unit: 'N' },
            ],
            hint: T`The unbalanced force is the difference in weights, and it has to accelerate both masses.`,
            steps: [
              T`System: \(a = \dfrac{(m_2 - m_1)g}{m_1 + m_2} = \dfrac{(${r.f(m2 - m1)})(9.80)}{${r.f(m1 + m2)}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`Lighter block (accelerates up): \(T - m_1 g = m_1 a\)`,
              T`\(T = m_1(g + a) = (${m1})(9.80 + ${r.f(a)}) = ${r.f(T_)}\ \text{N}\)`,
              T`Check: \(T\) is between \(m_1 g = ${r.f(m1 * r.g)}\) and \(m_2 g = ${r.f(m2 * r.g)}\). ✓`,
            ],
          };
        },
      },

      {
        id: 'incline-frictionless',
        title: 'Frictionless incline',
        gen(r) {
          const th = r.int(10, 50);
          const m = r.num(2, 30, 0);
          const L = r.num(2, 15, 1);
          const a = r.g * r.sin(th);
          const N = m * r.g * r.cos(th);
          const v = Math.sqrt(2 * a * L);
          return {
            question: T`A \(${m}\ \text{kg}\) block is released from rest at the top of a frictionless ramp tilted \(${th}^\circ\). The ramp is \(${L}\ \text{m}\) long.`,
            fig: ['incline', { angle: th, label: `${m} kg`, show: ['mg', 'N'], components: true }],
            parts: [
              { label: '(a) Acceleration down the ramp', value: a, unit: 'm/s²' },
              { label: '(b) Normal force', value: N, unit: 'N' },
              { label: '(c) Speed at the bottom', value: v, unit: 'm/s' },
            ],
            hint: T`Tilt your axes. Along the ramp only \(mg\sin\theta\) acts; perpendicular, \(F_N\) balances \(mg\cos\theta\).`,
            steps: [
              T`Along the ramp: \(ma = mg\sin\theta \Rightarrow a = g\sin\theta = 9.80\sin ${th}^\circ = ${r.f(a)}\ \text{m/s}^2\)`,
              T`Perpendicular: \(F_N = mg\cos\theta = (${m})(9.80)\cos ${th}^\circ = ${r.f(N)}\ \text{N}\)`,
              T`Kinematics: \(v^2 = v_0^2 + 2aL = 0 + 2(${r.f(a)})(${L}) \Rightarrow v = ${r.f(v)}\ \text{m/s}\)`,
            ],
          };
        },
      },

      {
        id: 'incline-friction-slide',
        title: 'Sliding down an incline with friction',
        gen(r) {
          let th, mu;
          do {
            th = r.int(25, 50);
            mu = r.pick([0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45]);
          } while (r.tan(th) - mu < 0.12);
          const m = r.num(2, 25, 0);
          const N = m * r.g * r.cos(th);
          const fk = mu * N;
          const a = r.g * (r.sin(th) - mu * r.cos(th));
          return {
            question: T`A \(${m}\ \text{kg}\) box slides down a \(${th}^\circ\) incline. The coefficient of kinetic friction is \(${mu}\).`,
            fig: ['incline', { angle: th, label: `${m} kg`, show: ['mg', 'N', 'f'], friction: 'up', components: true }],
            parts: [
              { label: '(a) Friction force', value: fk, unit: 'N' },
              { label: '(b) Acceleration down the slope', value: a, unit: 'm/s²' },
            ],
            hint: T`Friction points up the slope (opposite the sliding). \(F_N = mg\cos\theta\), not \(mg\).`,
            steps: [
              T`Perpendicular: \(F_N = mg\cos\theta = (${m})(9.80)\cos ${th}^\circ = ${r.f(N)}\ \text{N}\)`,
              T`(a) \(F_{fk} = \mu_k F_N = (${mu})(${r.f(N)}) = ${r.f(fk)}\ \text{N}\)`,
              T`Along the slope: \(ma = mg\sin\theta - F_{fk}\)`,
              T`(b) \(a = g(\sin\theta - \mu_k\cos\theta) = 9.80(\sin ${th}^\circ - ${mu}\cos ${th}^\circ) = ${r.f(a)}\ \text{m/s}^2\)`,
            ],
          };
        },
      },

      {
        id: 'stay-or-go',
        title: 'Incline: stay or go?',
        gen(r) {
          let th, muS;
          do {
            th = r.int(10, 45);
            muS = r.num(0.20, 0.80, 2);
          } while (Math.abs(r.tan(th) - muS) < 0.06);
          const muK = Math.round(muS * r.num(0.6, 0.85, 2) * 100) / 100;
          const slides = r.tan(th) > muS;
          const a = slides ? r.g * (r.sin(th) - muK * r.cos(th)) : 0;
          return {
            question: T`A crate is placed at rest on a ramp tilted \(${th}^\circ\). Between the crate and ramp, \(\mu_s = ${muS}\) and \(\mu_k = ${muK}\).`,
            fig: ['incline', { angle: th, label: 'crate', show: ['mg', 'N', 'f'], friction: 'up', components: true }],
            parts: [
              { label: '(a) Smallest μs that would hold the crate in place', value: r.tan(th), unit: '' },
              { label: '(b) Acceleration down the ramp (enter 0 if it stays put)', value: a, unit: 'm/s²' },
            ],
            hint: T`At the slipping point, \(mg\sin\theta = \mu_s mg\cos\theta\), so \(\mu_s = \tan\theta\). Compare that with the actual \(\mu_s\).`,
            steps: [
              T`Pulling it down the slope: \(mg\sin\theta\). Max static friction holding it: \(\mu_s mg\cos\theta\).`,
              T`(a) Just holds when \(\mu_s = \tan\theta = \tan ${th}^\circ = ${r.f(r.tan(th))}\)`,
              slides
                ? T`Actual \(\mu_s = ${muS} < ${r.f(r.tan(th))}\), so static friction can't hold it. <strong>It slides</strong>, so switch to \(\mu_k\).`
                : T`Actual \(\mu_s = ${muS} > ${r.f(r.tan(th))}\), so static friction holds it. <strong>It stays</strong>, so \(a = 0\).`,
              slides
                ? T`(b) \(a = g(\sin\theta - \mu_k\cos\theta) = 9.80(\sin ${th}^\circ - ${muK}\cos ${th}^\circ) = ${r.f(a)}\ \text{m/s}^2\)`
                : T`(b) \(a = 0\ \text{m/s}^2\). (Static friction is only \(mg\sin\theta\), just what it needs.)`,
            ],
          };
        },
      },

      {
        id: 'static-or-kinetic',
        title: 'Static or kinetic friction?',
        gen(r) {
          const m = r.num(2, 20, 1);
          const muS = r.num(0.30, 0.70, 2);
          const muK = Math.max(0.10, Math.round((muS - r.num(0.05, 0.20, 2)) * 100) / 100);
          const N = m * r.g;
          const fsMax = muS * N;
          let F = r.pick([true, false]) ? fsMax * r.num(0.4, 0.9, 2) : fsMax * r.num(1.15, 1.8, 2);
          F = Math.round(F * 10) / 10;
          const slides = F > fsMax;
          const fk = muK * N;
          const friction = slides ? fk : F;
          const a = slides ? (F - fk) / m : 0;
          return {
            question: T`A \(${m}\ \text{kg}\) box rests on a level desk. \(\mu_s = ${muS}\) and \(\mu_k = ${muK}\). You push it horizontally with \(${F}\ \text{N}\).`,
            fig: ['fbd', { object: 'box', forces: [
              { label: 'F_N', angle: 90, mag: 0.75 }, { label: 'mg', angle: 270, mag: 0.75 },
              { label: 'F_app', angle: 0, mag: 0.8 }, { label: 'F_f', angle: 180, mag: 0.6 },
            ] }],
            parts: [
              { label: '(a) Friction force on the box', value: friction, unit: 'N' },
              { label: '(b) Acceleration (enter 0 if it stays put)', value: a, unit: 'm/s²' },
            ],
            hint: T`First check: is the push bigger than the <em>maximum</em> static friction \(\mu_s F_N\)? Static friction only uses what it needs.`,
            steps: [
              T`\(F_N = mg = (${m})(9.80) = ${r.f(N)}\ \text{N}\)`,
              T`Max static: \(\mu_s F_N = (${muS})(${r.f(N)}) = ${r.f(fsMax)}\ \text{N}\)`,
              slides
                ? T`\(${F}\ \text{N} > ${r.f(fsMax)}\ \text{N}\), so it <strong>slides</strong>. Kinetic friction: \(F_{fk} = \mu_k F_N = (${muK})(${r.f(N)}) = ${r.f(fk)}\ \text{N}\)`
                : T`\(${F}\ \text{N} < ${r.f(fsMax)}\ \text{N}\), so it <strong>stays put</strong>. Static friction matches the push: \(F_{fs} = ${F}\ \text{N}\)`,
              slides
                ? T`\(a = \dfrac{F - F_{fk}}{m} = \dfrac{${F} - ${r.f(fk)}}{${m}} = ${r.f(a)}\ \text{m/s}^2\)`
                : T`\(\Sigma F = 0 \Rightarrow a = 0\)`,
            ],
          };
        },
      },

      {
        id: 'crane-min-time',
        title: 'Crane: shortest safe lift',
        gen(r) {
          const m = r.num(200, 900, 0);
          const Tmax = Math.round(m * r.g * r.num(1.3, 2.5, 2) / 100) * 100;
          const h = r.num(10, 60, 0);
          const a = Tmax / m - r.g;
          const t = Math.sqrt(2 * h / a);
          return {
            question: T`A crane lifts a \(${m}\ \text{kg}\) load from rest. The cable breaks if the tension exceeds \(${big(Tmax)}\ \text{N}\). What is the shortest time to raise the load \(${h}\ \text{m}\)?`,
            parts: [
              { label: '(a) Maximum safe acceleration', value: a, unit: 'm/s²' },
              { label: '(b) Shortest time', value: t, unit: 's' },
            ],
            hint: T`Shortest time means biggest acceleration, which means maximum tension. Then it's a kinematics problem from rest.`,
            steps: [
              T`FBD: \(T\) up, \(mg\) down. \(\Sigma F = T - mg = ma\)`,
              T`(a) \(a = \dfrac{T - mg}{m} = \dfrac{${big(Tmax)} - ${r.f(m * r.g)}}{${m}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`From rest: \(\Delta y = \tfrac12 at^2 \Rightarrow t = \sqrt{\dfrac{2\Delta y}{a}} = \sqrt{\dfrac{2(${h})}{${r.f(a)}}}\)`,
              T`(b) \(t = ${r.f(t)}\ \text{s}\)`,
            ],
          };
        },
      },

      {
        id: 'incline-pulley-min-mass',
        title: 'Minimum hanging mass to start sliding up',
        gen(r) {
          const mA = r.num(1, 10, 1);
          const th = r.int(15, 45);
          const mu = r.num(0.10, 0.60, 2);
          const mB = mA * (r.sin(th) + mu * r.cos(th));
          return {
            question: T`Package A (\(${mA}\ \text{kg}\)) rests on a rough \(${th}^\circ\) ramp with \(\mu_s = ${mu}\). A string parallel to the ramp runs over a frictionless pulley at the top to hanging package B. What minimum mass must B have to start A sliding <em>up</em> the ramp?`,
            fig: ['incline-pulley', { angle: th, m1: `A ${mA} kg`, m2: 'B' }],
            parts: [{ label: 'Minimum mass of B', value: mB, unit: 'kg' }],
            hint: T`About to slide up means friction points <em>down</em> the ramp and is at its maximum, with \(a = 0\) still.`,
            steps: [
              T`A: \(T = m_A g\sin\theta + \mu_s m_A g\cos\theta\) (friction down the ramp). B: \(T = m_B g\)`,
              T`Set equal; \(g\) cancels: \(m_B = m_A(\sin\theta + \mu_s\cos\theta)\)`,
              T`\(m_B = ${mA}(\sin ${th}^\circ + ${mu}\cos ${th}^\circ) = ${mA}(${r.f(r.sin(th))} + ${r.f(mu * r.cos(th))})\)`,
              T`\(m_B = ${r.f(mB)}\ \text{kg}\)`,
            ],
          };
        },
      },

      {
        id: 'incline-pulley-accel',
        title: 'Ramp block pulled by a hanging block',
        gen(r) {
          let m1, m2, th;
          do {
            m1 = r.num(5, 30, 0);
            m2 = r.num(5, 30, 0);
            th = r.int(15, 45);
          } while (m2 <= m1 * r.sin(th) * 1.15);
          const a = (m2 - m1 * r.sin(th)) * r.g / (m1 + m2);
          const T_ = m2 * (r.g - a);
          return {
            question: T`A \(${m1}\ \text{kg}\) block on a frictionless \(${th}^\circ\) ramp is tied by a string over a pulley at the top of the ramp to a hanging \(${m2}\ \text{kg}\) block. The system is released from rest.`,
            fig: ['incline-pulley', { angle: th, m1: `${m1} kg`, m2: `${m2} kg` }],
            parts: [
              { label: '(a) Acceleration', value: a, unit: 'm/s²' },
              { label: '(b) Tension', value: T_, unit: 'N' },
            ],
            hint: T`Along the string, the hanging weight \(m_2g\) pulls one way and \(m_1g\sin\theta\) pulls the other.`,
            steps: [
              T`Hanging block: \(m_2 g = ${r.f(m2 * r.g)}\ \text{N}\). Ramp block's down-slope pull: \(m_1 g\sin\theta = ${r.f(m1 * r.g * r.sin(th))}\ \text{N}\). The hanging block wins, so it moves down.`,
              T`System: \(a = \dfrac{m_2 g - m_1 g\sin\theta}{m_1 + m_2} = \dfrac{${r.f(m2 * r.g - m1 * r.g * r.sin(th))}}{${m1 + m2}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`Hanging block: \(m_2 g - T = m_2 a \Rightarrow T = (${m2})(9.80 - ${r.f(a)}) = ${r.f(T_)}\ \text{N}\)`,
            ],
          };
        },
      },

      {
        id: 'puck-friction',
        title: 'Coefficient of friction from stopping distance',
        gen(r) {
          let v0, d, mu;
          do {
            v0 = r.num(4, 20, 1);
            d = r.num(15, 80, 0);
            mu = v0 * v0 / (2 * d * r.g);
          } while (mu < 0.02 || mu > 0.6);
          const a = v0 * v0 / (2 * d);
          return {
            question: T`A hockey puck slides across level ice with an initial speed of \(${v0}\ \text{m/s}\) and comes to rest after \(${d}\ \text{m}\) because of friction.`,
            parts: [
              { label: '(a) Magnitude of the deceleration', value: a, unit: 'm/s²' },
              { label: '(b) Coefficient of kinetic friction', value: mu, unit: '' },
            ],
            hint: T`Kinematics first (no time given). Then friction is the only horizontal force: \(\mu_k mg = ma\), and the mass cancels.`,
            steps: [
              T`Kinematics: \(v^2 = v_0^2 + 2a\Delta x \Rightarrow 0 = (${v0})^2 + 2a(${d})\)`,
              T`(a) \(|a| = \dfrac{(${v0})^2}{2(${d})} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`Forces: \(F_{fk} = ma \Rightarrow \mu_k mg = ma \Rightarrow \mu_k = \dfrac{a}{g}\)`,
              T`(b) \(\mu_k = \dfrac{${r.f(a)}}{9.80} = ${r.f(mu)}\)`,
            ],
          };
        },
      },

      {
        id: 'pull-up-incline',
        title: 'Pulling a sled up a hill',
        gen(r) {
          let m, th, muS, muK, need, F;
          do {
            m = r.num(40, 150, 0);
            th = r.int(10, 30);
            muS = r.num(0.25, 0.50, 2);
            muK = Math.round((muS - r.num(0.05, 0.15, 2)) * 100) / 100;
            need = m * r.g * (r.sin(th) + muS * r.cos(th));
            F = Math.round(need * r.num(1.2, 2.0, 2) / 10) * 10;
          } while (muK < 0.1 || F <= need);
          const N = m * r.g * r.cos(th);
          const a = (F - m * r.g * r.sin(th) - muK * N) / m;
          return {
            question: T`A dog pulls a \(${m}\ \text{kg}\) sled up a \(${th}^\circ\) hill with a force of \(${F}\ \text{N}\) parallel to the slope, starting from rest. \(\mu_s = ${muS}\) and \(\mu_k = ${muK}\).`,
            fig: ['incline', { angle: th, label: `${m} kg`, show: ['mg', 'N', 'f', 'F'], friction: 'down', components: true }],
            parts: [
              { label: '(a) Minimum force needed to start the sled moving', value: need, unit: 'N' },
              { label: '(b) Acceleration of the sled', value: a, unit: 'm/s²' },
            ],
            hint: T`To start it: beat \(mg\sin\theta\) plus <em>maximum static</em> friction. Once moving, friction becomes kinetic. Never use both.`,
            steps: [
              T`\(mg\sin\theta = ${r.f(m * r.g * r.sin(th))}\ \text{N}\); \(F_N = mg\cos\theta = ${r.f(N)}\ \text{N}\)`,
              T`(a) \(F_{\text{start}} = mg\sin\theta + \mu_s F_N = ${r.f(m * r.g * r.sin(th))} + (${muS})(${r.f(N)}) = ${r.f(need)}\ \text{N}\). Since \(${F} > ${r.f(need)}\), it moves.`,
              T`Moving: \(F_{fk} = \mu_k F_N = (${muK})(${r.f(N)}) = ${r.f(muK * N)}\ \text{N}\)`,
              T`(b) \(a = \dfrac{F - mg\sin\theta - F_{fk}}{m} = \dfrac{${F} - ${r.f(m * r.g * r.sin(th))} - ${r.f(muK * N)}}{${m}} = ${r.f(a)}\ \text{m/s}^2\)`,
            ],
          };
        },
      },

      {
        id: 'hanging-bricks',
        title: 'How many bricks can the wire hold?',
        gen(r) {
          let mb, Tmax, ratio;
          do {
            mb = r.num(2, 12, 1);
            Tmax = r.num(100, 800, 0);
            ratio = Tmax / (mb * r.g);
          } while (ratio < 2 || ratio > 15 || ratio % 1 < 0.1 || ratio % 1 > 0.9);
          const n = Math.floor(ratio);
          return {
            question: T`A light wire hangs a column of \(${mb}\ \text{kg}\) bricks, each tied below the one above. Every piece of wire breaks if its tension exceeds \(${Tmax}\ \text{N}\). How many whole bricks can hang without breaking the wire? (If you add one more, which piece breaks?)`,
            parts: [{ label: 'Maximum number of bricks', value: n, unit: 'bricks', tol: 0.001, whole: true }],
            hint: T`The top piece of wire holds up <em>every</em> brick below it, so it has the most tension.`,
            steps: [
              T`Weight per brick: \(mg = (${mb})(9.80) = ${r.f(mb * r.g)}\ \text{N}\)`,
              T`Top wire tension with \(n\) bricks: \(T = n\,mg \le ${Tmax}\ \text{N}\)`,
              T`\(n \le \dfrac{${Tmax}}{${r.f(mb * r.g)}} = ${r.f(ratio)}\), so at most <strong>${n} bricks</strong>.`,
              T`Add one more and the <strong>top</strong> piece of wire breaks first, since it carries the most weight.`,
            ],
          };
        },
      },
    ],
  };
})();

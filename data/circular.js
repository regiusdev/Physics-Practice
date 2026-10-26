// Circular Motion & Gravity (Giancoli Ch. 5)
// Format: see docs/CONTENT-GUIDE.md. Math goes in \( \) or \[ \] inside T`...` strings.
(() => {
  const T = String.raw;
  const G = 6.67e-11;
  const ME = 5.97e24;
  const RE = 6.37e6;
  // Scientific notation for math mode: 1.98e20 -> 1.98\times 10^{20}
  const sci = (x, sf = 3) => {
    const [m, e] = x.toExponential(sf - 1).split('e');
    return `${m}\\times 10^{${Number(e)}}`;
  };

  window.UNIT_DATA = window.UNIT_DATA || {};
  window.UNIT_DATA['circular'] = {
    summary: 'Moving in a circle at constant speed still means accelerating: toward the center. Then the same idea scaled up to planets, moons and satellites with Newton\'s law of gravity.',

    formulas: [
      { name: 'Speed around a circle', tex: T`v = \frac{2\pi r}{T}`, note: 'One lap = one circumference (2πr) in one period T.' },
      { name: 'Period and frequency', tex: T`f = \frac{1}{T}`, note: 'f in rev/s (Hz). rpm ÷ 60 = rev/s.' },
      { name: 'Centripetal acceleration', tex: T`a_c = \frac{v^2}{r}`, note: 'Points toward the center of the circle.' },
      { name: 'Centripetal (net) force', tex: T`F_{net} = F_c = ma_c = \frac{mv^2}{r}`, note: 'F_c is the NET force toward the center. Never draw it on an FBD.' },
      { name: 'Flat curve (friction provides F_c)', tex: T`\mu_s mg = \frac{mv_{max}^2}{r} \ \Rightarrow\ v_{max} = \sqrt{\mu_s g r}` },
      { name: 'Top of a vertical loop', tex: T`F_N + mg = \frac{mv^2}{r} \qquad v_{min} = \sqrt{gr}\ \ (F_N = 0)` },
      { name: 'Bottom of a loop / dip', tex: T`F_N - mg = \frac{mv^2}{r}`, note: 'You feel heavier at the bottom, lighter at the top.' },
      { name: 'Banked curve, no friction', tex: T`\tan\theta = \frac{v^2}{rg}`, note: 'The "design speed". F_N is NOT mg cos θ here: ΣF_y = 0 gives F_N cos θ = mg.' },
      { name: 'Conical pendulum', tex: T`\tan\theta = \frac{v^2}{rg} \qquad T_{string} = \frac{mg}{\cos\theta}`, note: 'θ measured from the vertical; r = L sin θ.' },
      { name: "Newton's law of gravitation", tex: T`F_g = G\frac{m_1 m_2}{r^2} \qquad G = 6.67\times 10^{-11}\ \tfrac{\text{N·m}^2}{\text{kg}^2}`, note: 'r is center-to-center distance.' },
      { name: 'g from gravitation', tex: T`g = \frac{GM}{r^2}`, note: 'M_E = 5.97×10²⁴ kg, R_E = 6.37×10⁶ m gives 9.81 m/s². At altitude h, r = R_E + h.' },
      { name: 'Circular orbit speed', tex: T`G\frac{Mm}{r^2} = \frac{mv^2}{r} \ \Rightarrow\ v = \sqrt{\frac{GM}{r}}` },
      { name: "Kepler's 3rd law", tex: T`\frac{T_1^2}{r_1^3} = \frac{T_2^2}{r_2^3}`, note: 'Same central body (e.g. everything orbiting the Sun). T ∝ r^{3/2}.' },
    ],

    concepts: [
      {
        title: 'Accelerating at constant speed',
        body: T`<p>Acceleration is any change in <em>velocity</em>, and velocity has a direction. Going around a circle at a steady speed, your direction changes every instant, so you <strong>are</strong> accelerating, and something must be pushing or pulling you toward the center.</p>`,
      },
      {
        title: 'Center, center, tangent',
        body: T`<p>For uniform circular motion:</p>
          <ul>
            <li>Acceleration \(a_c = v^2/r\) points to the <strong>center</strong>.</li>
            <li>Net force \(F_c = mv^2/r\) points to the <strong>center</strong>.</li>
            <li>Velocity is <strong>tangent</strong> to the circle.</li>
          </ul>
          <p>If the force suddenly disappears (string snaps, car hits ice), the object flies off along the tangent in a straight line, not outward.</p>`,
        fig: ['circle', { show: ['v', 'a'] }],
      },
      {
        title: 'Rotational vs. tangential speed',
        body: T`<p><strong>Rotational speed</strong> is how many turns per second (rev/s or rpm). <strong>Tangential speed</strong> is how many meters per second a point actually travels: \(v = 2\pi r/T\).</p>
          <p>On a spinning turntable every point has the same rotational speed, but a point twice as far out moves twice as fast. Two wheels linked by a chain have the <em>same</em> rim speed, so the smaller wheel must spin faster (half the radius → twice the rpm).</p>`,
      },
      {
        title: 'F_c is not a new force',
        body: T`<p>The centripetal force is the <strong>net force</strong> toward the center, supplied by real forces: tension (ball on a string), friction (car on a flat curve), gravity (satellite), normal force (rotor ride, loop), or a combination.</p>
          <p>So <strong>never draw "F_c" on a free-body diagram</strong>. Draw the real forces, then set their sum toward the center equal to \(mv^2/r\). The "outward" centrifugal force you feel is fictitious: it's your own inertia trying to go straight.</p>`,
        fig: ['fbd', { object: 'dot', forces: [{ label: 'T', angle: 180, mag: 0.9 }] }],
      },
      {
        title: 'How to solve any circular-motion problem',
        body: T`<ol>
            <li>Draw the FBD with real forces only.</li>
            <li>Pick "toward the center" as positive. Add up the force components in that direction: that's \(F_{net}\).</li>
            <li>Set \(F_{net} = \dfrac{mv^2}{r}\) and solve for what you want (\(v_{max}\), tension, \(\mu\), \(F_N\)…).</li>
          </ol>`,
      },
      {
        title: 'Vertical loops and Ferris wheels',
        body: T`<p>At the <strong>top</strong>, gravity and the normal force both point down, toward the center: \(F_N + mg = mv^2/r\). The slowest you can go is when \(F_N = 0\), so \(mg = mv^2/r\) and \(v_{min} = \sqrt{gr}\).</p>
          <p>At the <strong>bottom</strong>, the center is up: \(F_N - mg = mv^2/r\), so \(F_N\) is bigger than \(mg\). That's why you feel heavy at the bottom of a Ferris wheel or roller-coaster dip and light at the top.</p>`,
        fig: ['loop', {}],
      },
      {
        title: 'Flat curves and banked curves',
        body: T`<p>On a <strong>flat</strong> curve, static friction is the only horizontal force, so \(\mu_s mg = mv^2/r\) sets the max speed.</p>
          <p>On a <strong>banked</strong> curve, the normal force tilts toward the center and supplies some (or all) of \(F_c\). With no friction at all, the "design speed" satisfies \(\tan\theta = v^2/(rg)\). Careful: the car is <em>not</em> in equilibrium like a block on an incline, so \(F_N \ne mg\cos\theta\). Use \(\Sigma F_y = 0\): \(F_N\cos\theta = mg\).</p>`,
        fig: ['banked', { angle: 25, friction: 'none' }],
      },
      {
        title: 'Conical pendulum (flying pig lab)',
        body: T`<p>A mass on a string swinging in a horizontal circle. Vertically: \(T\cos\theta = mg\). Horizontally (toward center): \(T\sin\theta = mv^2/r\). Divide them: \(\tan\theta = v^2/(rg)\), the same relation as a frictionless banked curve.</p>`,
        fig: ['conical', { angle: 30 }],
      },
      {
        title: "Newton's law of gravitation",
        body: T`<p>Every mass attracts every other mass: \(F_g = G\dfrac{m_1m_2}{r^2}\). Double one mass → double the force. Double the distance → \(\tfrac{1}{4}\) the force (inverse square). Triple the distance → \(\tfrac19\).</p>
          <p>The \(r\) is measured <strong>center to center</strong>. For a satellite at altitude \(h\), \(r = R_E + h\).</p>
          <p>Setting \(mg = GMm/r^2\) gives \(g = GM/r^2\): plug in Earth's mass and radius and you get 9.81 m/s². Go higher and \(g\) drops.</p>`,
      },
      {
        title: 'Satellites and Kepler',
        body: T`<p>For a circular orbit, gravity <em>is</em> the centripetal force: \(GMm/r^2 = mv^2/r\), so \(v = \sqrt{GM/r}\). The satellite's own mass cancels.</p>
          <p>Kepler's laws: (1) orbits are ellipses with the Sun at one focus; (2) a planet sweeps out equal areas in equal times (faster when closer); (3) \(T^2 \propto r^3\), so \(T_1^2/r_1^3 = T_2^2/r_2^3\) for anything orbiting the same body.</p>`,
        fig: ['orbit', { label: 'satellite' }],
      },
      {
        title: 'Simulated gravity',
        body: T`<p>A spinning space station pushes on your feet (the normal force from the outer wall) to keep you moving in a circle. Make \(v^2/r = 9.8\ \text{m/s}^2\) and it feels exactly like standing on Earth. Salad spinners, washing-machine spin cycles and centrifuges use the same idea: the wall pushes the stuff in, the water doesn't get pushed and flies off along the tangent.</p>`,
      },
    ],

    sims: ['circular-motion'],

    mistakes: [
      {
        title: 'Drawing F_c on the free-body diagram',
        wrong: 'Adding an extra arrow labeled F_c (or F_net) next to tension, gravity and the normal force.',
        right: 'F_c is the net of the real forces. Draw only real forces (T, mg, F_N, f), then set their sum toward the center equal to mv²/r.',
      },
      {
        title: 'Believing in an outward force',
        wrong: 'Saying "centrifugal force pushes you outward" and drawing an arrow away from the center.',
        right: 'There is no outward force on you. You feel pressed outward because your inertia wants to go straight (tangent) and the car/wall pushes you inward.',
      },
      {
        title: 'Thinking it flies straight outward when released',
        wrong: 'A ball on a string that snaps flies directly away from the center.',
        right: 'It leaves along the tangent, in the direction its velocity pointed at that instant.',
      },
      {
        title: 'Using the diameter instead of the radius',
        wrong: 'Plugging the 20 m diameter of a Ferris wheel in for r.',
        right: 'r is the radius. Halve the diameter first.',
      },
      {
        title: 'Using altitude instead of center-to-center distance',
        wrong: 'For a satellite 400 km up, using r = 400 km in GMm/r² or √(GM/r).',
        right: 'r is measured from Earth\'s center: r = R_E + h = 6.37×10⁶ m + 4.00×10⁵ m. And convert km to m.',
      },
      {
        title: 'Forgetting to square r (or squaring v twice)',
        wrong: 'Writing F = Gm₁m₂/r, or tripling the distance and dividing the force by 3.',
        right: 'Gravity is inverse-SQUARE: 3× the distance gives 1/9 the force. Centripetal acceleration is v²/r: double v → 4× a_c.',
      },
      {
        title: 'Using F_N = mg cos θ on a banked curve',
        wrong: 'Copying the incline rule from the forces unit.',
        right: 'The car accelerates horizontally toward the center, so it is not in equilibrium along the incline. Use vertical balance: F_N cos θ = mg (no friction), and horizontal F_N sin θ = mv²/r.',
      },
      {
        title: 'Mixing up period and frequency (and rpm)',
        wrong: 'Using 30 rpm as the period, or plugging rpm straight into v = 2πr/T.',
        right: 'Convert rpm → rev/s (÷ 60), then T = 1/f. 30 rpm = 0.5 rev/s → T = 2 s.',
      },
      {
        title: 'Leaving speeds in km/h',
        wrong: 'Plugging 85 km/h into v²/r.',
        right: 'Divide by 3.6 first: 85 km/h = 23.6 m/s.',
      },
    ],

    examples: [
      {
        title: 'Max speed on a flat curve',
        source: 'Class example',
        problem: T`The coefficient of static friction acting on a car is \(0.850\). The car is making a 180° turn around a curve with a radius of \(35.0\ \text{m}\). Determine the maximum speed with which the car can make the turn without sliding.`,
        fig: ['circle', { show: ['v', 'F'], label: 'F_fs' }],
        steps: [
          T`FBD: \(mg\) down, \(F_N\) up, static friction toward the center. Vertical: \(F_N = mg\).`,
          T`Friction is the net force toward the center: \(F_{net} = \mu_s mg = \dfrac{mv^2}{r}\)`,
          T`Mass cancels: \(v_{max} = \sqrt{\mu_s g r}\)`,
          T`Substitute: \(v_{max} = \sqrt{(0.850)(9.80\ \text{m/s}^2)(35.0\ \text{m})} = \sqrt{291.6}\)`,
        ],
        answer: T`\(v_{max} = 17.1\ \text{m/s}\) (about 61 km/h). The 180° part doesn't matter.`,
      },
      {
        title: 'Pulling 1 g in a jet',
        source: 'Class example (simulated gravity)',
        problem: T`A jet flying at \(134.1\ \text{m/s}\) turns along a circular path level with the ground. What radius gives a centripetal acceleration of \(1g\) on the pilot?`,
        steps: [
          T`Equation: \(a_c = \dfrac{v^2}{r}\), set \(a_c = g = 9.8\ \text{m/s}^2\)`,
          T`Solve: \(r = \dfrac{v^2}{a_c} = \dfrac{(134.1\ \text{m/s})^2}{9.8\ \text{m/s}^2}\)`,
          T`\(r = \dfrac{17\,983}{9.8} = 1835\ \text{m}\)`,
          T`For more than 1 g the jet needs a smaller radius or a higher speed.`,
        ],
        answer: T`\(r = 1835\ \text{m} = 1.835\ \text{km}\)`,
      },
      {
        title: 'Rotor ride',
        source: 'Class example (Giancoli Ch. 5)',
        problem: T`In a "Rotor-ride" people rotate in a vertical cylindrical room of radius \(5.5\ \text{m}\) at \(0.50\) revolutions per second. When the floor drops out, what minimum coefficient of static friction keeps them from sliding down?`,
        steps: [
          T`FBD of a rider: \(mg\) down, friction up, normal force from the wall toward the center. Vertical: \(F_{fs} = mg\). Toward center: \(F_N = \dfrac{mv^2}{r}\).`,
          T`Speed: \(T = \dfrac{1}{0.50} = 2.0\ \text{s}\), \(v = \dfrac{2\pi r}{T} = \dfrac{2\pi(5.5)}{2.0} = 17.3\ \text{m/s}\)`,
          T`Friction needed: \(\mu_s F_N \ge mg \Rightarrow \mu_s \ge \dfrac{mg}{mv^2/r} = \dfrac{gr}{v^2}\)`,
          T`Substitute: \(\mu_s = \dfrac{(9.80)(5.5)}{(17.3)^2} = \dfrac{53.9}{298} = 0.18\)`,
        ],
        answer: T`\(\mu_s \ge 0.18\). Nobody is "pressed outward": the wall pushes them inward (F_N is the centripetal force).`,
      },
      {
        title: 'No-friction speed at Talladega',
        source: 'Class example (banked turn)',
        problem: T`Talladega Motor Speedway has turns with radius \(335\ \text{m}\) banked at \(33^\circ\). What is the "no friction" speed for a car on these turns?`,
        fig: ['banked', { angle: 33, friction: 'none' }],
        steps: [
          T`FBD: only \(F_N\) (perpendicular to the track) and \(mg\). Not in equilibrium along the slope, so \(F_N \ne mg\cos\theta\).`,
          T`Vertical: \(F_N\cos\theta = mg\). Toward center: \(F_N\sin\theta = \dfrac{mv^2}{r}\).`,
          T`Divide: \(\tan\theta = \dfrac{v^2}{rg} \Rightarrow v = \sqrt{rg\tan\theta}\)`,
          T`Substitute: \(v = \sqrt{(335\ \text{m})(9.80\ \text{m/s}^2)\tan 33^\circ} = \sqrt{2132}\)`,
        ],
        answer: T`\(v = 46.2\ \text{m/s}\) (about 166 km/h)`,
      },
      {
        title: 'Safe speed range on a banked curve with friction',
        source: 'Class example (Giancoli 5-23)',
        problem: T`A curve of radius \(78\ \text{m}\) is banked for a design speed of \(85\ \text{km/h}\). If \(\mu_s = 0.30\), at what range of speeds can a car safely make the curve?`,
        fig: ['banked', { angle: 36, friction: 'down' }],
        steps: [
          T`Design speed: \(85/3.6 = 23.6\ \text{m/s}\). Bank angle: \(\tan\theta = \dfrac{v^2}{rg} = \dfrac{(23.6)^2}{(78)(9.80)} = 0.729 \Rightarrow \theta = 36.1^\circ\)`,
          T`Too fast: friction points <em>down</em> the slope (helps pull the car in). Solving both directions gives \(v_{max}^2 = rg\dfrac{\tan\theta + \mu_s}{1 - \mu_s\tan\theta}\)`,
          T`\(v_{max}^2 = (78)(9.80)\dfrac{0.729 + 0.30}{1 - (0.30)(0.729)} = 1007 \Rightarrow v_{max} = 31.7\ \text{m/s}\)`,
          T`Too slow: friction points <em>up</em> the slope: \(v_{min}^2 = rg\dfrac{\tan\theta - \mu_s}{1 + \mu_s\tan\theta} = (764)\dfrac{0.429}{1.219} = 269 \Rightarrow v_{min} = 16.4\ \text{m/s}\)`,
        ],
        answer: T`From about \(16\ \text{m/s}\) (59 km/h) to \(32\ \text{m/s}\) (114 km/h)`,
      },
      {
        title: 'g at the surface of the Earth',
        source: 'Class example ("Try this!")',
        problem: T`Set your weight \(mg\) equal to Newton's gravitation \(G\dfrac{Mm}{r^2}\) and solve for \(g\). Use \(M_E = 5.97\times10^{24}\ \text{kg}\) and \(R_E = 6.37\times10^{6}\ \text{m}\).`,
        steps: [
          T`Equation: \(mg = G\dfrac{Mm}{r^2}\). The \(m\) cancels: \(g = \dfrac{GM}{r^2}\)`,
          T`Substitute: \(g = \dfrac{(6.67\times10^{-11})(5.97\times10^{24})}{(6.37\times10^{6})^2}\)`,
          T`\(g = \dfrac{3.98\times10^{14}}{4.06\times10^{13}}\)`,
        ],
        answer: T`\(g = 9.81\ \text{m/s}^2\)`,
      },
      {
        title: 'GPS satellites',
        source: 'Class example (Giancoli Ch. 5)',
        problem: T`GPS satellites orbit at an altitude of about 11,000 nautical miles (1 nautical mile = 1.852 km). Find (a) the speed of each satellite and (b) its period.`,
        fig: ['orbit', { label: 'GPS' }],
        steps: [
          T`Altitude: \(h = 11\,000 \times 1.852\ \text{km} = 20\,372\ \text{km}\). Center-to-center: \(r = R_E + h = 6.37\times10^6 + 2.037\times10^7 = 2.674\times10^{7}\ \text{m}\)`,
          T`Gravity is the centripetal force: \(G\dfrac{Mm}{r^2} = \dfrac{mv^2}{r} \Rightarrow v = \sqrt{\dfrac{GM}{r}}\)`,
          T`(a) \(v = \sqrt{\dfrac{(6.67\times10^{-11})(5.97\times10^{24})}{2.674\times10^{7}}} = 3.86\times10^{3}\ \text{m/s}\)`,
          T`(b) \(T = \dfrac{2\pi r}{v} = \dfrac{2\pi(2.674\times10^7)}{3860} = 4.35\times10^{4}\ \text{s}\)`,
        ],
        answer: T`(a) \(3.86\ \text{km/s}\) (b) \(4.35\times10^4\ \text{s} \approx 12.1\ \text{h}\): two orbits a day.`,
      },
    ],

    quiz: [
      {
        q: 'Is it possible to accelerate while moving at a constant speed?',
        choices: ['Yes, if your direction changes', 'No, acceleration always changes speed', 'Only if friction is zero', 'Only in outer space'],
        answer: 0,
        explain: 'Acceleration is a change in velocity, and velocity includes direction. Going around a curve at steady speed is accelerating (toward the center).',
        why: { 1: 'Acceleration changes velocity, which can mean just a change of direction.', 3: 'Any car taking a curve at constant speed is accelerating.' },
      },
      {
        q: 'An object moves counter-clockwise in uniform circular motion. Which directions are its velocity, acceleration and net force?',
        choices: ['v tangent; a toward center; F toward center', 'v toward center; a tangent; F tangent', 'v tangent; a outward; F outward', 'v tangent; a toward center; F outward'],
        answer: 0,
        fig: ['circle', { show: ['v', 'a'] }],
        explain: '"Center, center, tangent": acceleration and net force point to the center, velocity is tangent to the circle.',
        why: { 2: 'Nothing points outward. The outward feeling is inertia, not a force.', 3: 'Newton\'s 2nd law: F_net and a always point the same way.' },
      },
      {
        q: 'A ball whirled in a horizontal circle on a string. The string snaps. Which way does the ball go (seen from above)?',
        choices: ['Straight along the tangent, in the direction it was moving', 'Straight outward, away from the center', 'It keeps curving in a circle', 'Toward the center'],
        answer: 0,
        explain: 'With no net force, the ball continues in a straight line with the velocity it had at that instant: tangent to the circle.',
        why: { 1: 'There is no outward force to send it outward. It just stops being pulled in.', 2: 'Curving needs a center-directed force; the string was providing it.' },
      },
      {
        q: 'A car rounds a flat, unbanked curve at constant speed. What force provides the centripetal force?',
        choices: ['Static friction between the tires and the road', 'The normal force', 'Gravity', 'Centrifugal force'],
        answer: 0,
        explain: 'Only friction acts horizontally on the car, so static friction toward the center is the net force: F_c = F_f.',
        why: { 1: 'On a flat road the normal force is vertical, so it can\'t point toward the center.', 3: 'Centrifugal force is fictitious; it never goes in an FBD.' },
      },
      {
        q: 'What provides the centripetal force on a satellite orbiting Earth?',
        choices: ['Gravity', 'The satellite\'s engines', 'Tension', 'Nothing; satellites float freely'],
        answer: 0,
        explain: 'Earth\'s gravitational pull toward its center is the centripetal force, which is why GMm/r² = mv²/r.',
        why: { 3: 'Without gravity the satellite would fly off in a straight line.', 1: 'Satellites coast; no engine is needed to stay in orbit.' },
      },
      {
        q: 'Should you draw "F_c" as one of the forces on a free-body diagram?',
        choices: ['No, it is the net of the real forces', 'Yes, always pointing toward the center', 'Yes, pointing outward', 'Only for objects on strings'],
        answer: 0,
        explain: 'F_c is the name for the net force toward the center. Draw the real forces (T, mg, F_N, friction); their sum toward the center equals mv²/r.',
        why: { 1: 'Adding F_c would count the same force twice.', 2: 'There is no outward force at all.' },
      },
      {
        q: 'Two wheels are connected by a chain. The small wheel has half the radius of the big wheel. Which is true?',
        choices: ['The small wheel spins twice as fast; the rim speeds are equal', 'Both spin at the same rpm', 'The big wheel spins twice as fast', 'The small wheel has twice the rim speed'],
        answer: 0,
        explain: 'The chain moves at one speed, so both rims have the same tangential speed. v = 2πr/T: half the radius means half the period, so twice the rotational speed.',
        why: { 3: 'The chain links the rims, so their tangential speeds must match.' },
      },
      {
        q: 'A ladybug sits halfway out on a spinning turntable and another sits on the edge. Compared to the inner bug, the outer bug has',
        choices: ['the same rotational speed and twice the tangential speed', 'twice the rotational speed and the same tangential speed', 'the same rotational and tangential speed', 'half the tangential speed'],
        answer: 0,
        explain: 'Every point on the turntable completes a turn in the same time (same rpm), but the outer bug travels a circle twice as big in that time.',
      },
      {
        q: 'An object moves in a circle at constant radius. If its speed doubles, the centripetal force needed',
        choices: ['becomes 4 times as large', 'doubles', 'stays the same', 'is cut in half'],
        answer: 0,
        explain: 'F_c = mv²/r. Speed is squared, so 2× speed → 4× force.',
        why: { 1: 'v is squared in mv²/r.' },
      },
      {
        q: 'Two masses are a distance r apart. If the distance is doubled, the gravitational force between them becomes',
        choices: ['one fourth as large', 'one half as large', 'twice as large', 'four times as large'],
        answer: 0,
        keepOrder: true,
        explain: 'Inverse square: F ∝ 1/r². (1/2)² = 1/4.',
        why: { 1: 'Gravity depends on 1/r², not 1/r.' },
      },
      {
        q: 'If both masses are doubled and the distance stays the same, the gravitational force becomes',
        choices: ['4 times as large', '2 times as large', 'the same', 'one fourth as large'],
        answer: 0,
        explain: 'F = Gm₁m₂/r². Doubling each mass gives 2 × 2 = 4× the force.',
        why: { 1: 'Each mass doubling doubles the force separately: 2 × 2 = 4.' },
      },
      {
        q: 'Your weight on Earth\'s surface is 600 N. What would it be at a distance of 3 Earth radii from Earth\'s center?',
        choices: ['67 N', '200 N', '1800 N', '600 N'],
        answer: 0,
        explain: '3× the distance → 1/9 the force: 600/9 = 67 N.',
        why: { 1: 'That divides by 3, but gravity is inverse-square: divide by 3² = 9.' },
      },
      {
        q: 'As a satellite moves to a higher circular orbit, the value of g at its location',
        choices: ['decreases', 'increases', 'stays 9.8 m/s²', 'becomes zero'],
        answer: 0,
        explain: 'g = GM/r². Larger r gives smaller g. It never reaches exactly zero; even the Moon feels Earth\'s gravity.',
        why: { 3: 'Astronauts in orbit still feel almost 90% of surface g; they float because they are in free fall.' },
      },
      {
        q: 'In Newton\'s law of gravitation, the distance r is measured',
        choices: ['between the centers of the two objects', 'from the surface of the Earth', 'between the closest surfaces', 'along the orbit'],
        answer: 0,
        explain: 'r is center-to-center. For a satellite at altitude h: r = R_E + h.',
      },
      {
        q: 'According to Kepler\'s 3rd law, a planet twice as far from the Sun as another has a period that is',
        choices: ['2^{3/2} ≈ 2.8 times as long', 'twice as long', '4 times as long', 'the same'],
        answer: 0,
        explain: 'T² ∝ r³, so T ∝ r^{3/2}. 2^{1.5} = 2.83.',
        why: { 1: 'Period grows faster than distance: T ∝ r^{3/2}.', 2: 'That would be T ∝ r²; Kepler says T² ∝ r³.' },
      },
      {
        q: 'Kepler\'s 2nd law (equal areas in equal times) means a planet in an elliptical orbit moves',
        choices: ['fastest when it is closest to the Sun', 'fastest when it is farthest from the Sun', 'at constant speed', 'fastest halfway between'],
        answer: 0,
        explain: 'Near the Sun the "triangle" it sweeps is short and fat, so it must cover more of its path in the same time: it moves faster.',
      },
      {
        q: 'Riding a Ferris wheel at constant speed, where do you feel heaviest (largest normal force from the seat)?',
        choices: ['At the bottom', 'At the top', 'Halfway up', 'The same everywhere'],
        answer: 0,
        explain: 'At the bottom the center is above you: F_N − mg = mv²/r, so F_N > mg. At the top, mg − F_N = mv²/r, so F_N < mg.',
        why: { 1: 'At the top, gravity helps provide the inward force, so the seat pushes less: you feel lighter.', 3: 'The net force points to the center, which is up at the bottom and down at the top, so F_N must change.' },
      },
      {
        q: 'A roller-coaster car is going around the top of a vertical loop at exactly the minimum speed. At that moment the normal force from the track is',
        choices: ['zero, and gravity alone provides F_c', 'equal to mg, upward', 'twice mg', 'equal to mg, downward'],
        answer: 0,
        fig: ['loop', {}],
        explain: 'At the top, F_N + mg = mv²/r. The minimum speed is when the track just stops pushing: F_N = 0, so mg = mv²/r and v_min = √(gr).',
        why: { 1: 'At the top the center is below; nothing pushes up on the car.' },
      },
      {
        q: 'On a frictionless banked curve, what provides the centripetal force on the car?',
        choices: ['The horizontal component of the normal force', 'Static friction', 'The vertical component of the normal force', 'Gravity along the slope'],
        answer: 0,
        fig: ['banked', { angle: 25, friction: 'none' }],
        explain: 'F_N is tilted toward the center of the turn. Its horizontal part, F_N sin θ, equals mv²/r; its vertical part, F_N cos θ, balances mg.',
        why: { 1: 'The question says frictionless.', 2: 'The vertical component balances the weight.' },
      },
      {
        q: 'For a car on a frictionless banked curve, the normal force is',
        choices: ['greater than mg cos θ (F_N = mg/cos θ)', 'equal to mg cos θ, like an incline', 'equal to mg', 'less than mg cos θ'],
        answer: 0,
        explain: 'The car isn\'t in equilibrium along the slope; it accelerates horizontally. Vertical balance gives F_N cos θ = mg, so F_N = mg/cos θ, bigger than both mg and mg cos θ.',
        why: { 1: 'That incline result assumes no acceleration perpendicular to the slope. The car does accelerate toward the center.' },
      },
      {
        q: 'In a conical pendulum (mass on a string swinging in a horizontal circle), what supplies the centripetal force?',
        choices: ['The horizontal component of the tension', 'The vertical component of the tension', 'Gravity', 'The full tension'],
        answer: 0,
        fig: ['conical', { angle: 30 }],
        explain: 'T sin θ points toward the center of the circle and equals mv²/r. T cos θ balances mg.',
      },
      {
        q: 'In the Rotor ride, riders stick to the wall when the floor drops. What holds them up, and what is the centripetal force?',
        choices: ['Friction holds them up; the normal force from the wall is the centripetal force', 'Centrifugal force holds them up', 'The normal force holds them up; friction is the centripetal force', 'Gravity is the centripetal force'],
        answer: 0,
        explain: 'Vertically, static friction balances mg. Horizontally, the wall pushes inward (F_N), and that is the net force toward the center.',
        why: { 1: 'Centrifugal force is fictitious and never appears on an FBD.', 2: 'Friction is vertical (along the wall), so it can\'t point to the center.' },
      },
      {
        q: 'A pilot pulls "4 g\'s" in a turn. That means',
        choices: ['the centripetal acceleration is 4 × 9.8 = 39 m/s²', 'the plane is 4 times heavier', 'the speed is 4 times 9.8 m/s', 'gravity is 4 times stronger there'],
        answer: 0,
        explain: '"g\'s" measure acceleration in units of g: a_c = v²/r = 4(9.8) m/s².',
      },
      {
        q: 'A satellite orbits Earth. If it were moved to an orbit with twice the radius, its orbital speed would',
        choices: ['decrease by a factor of √2', 'double', 'stay the same', 'decrease by a factor of 4'],
        answer: 0,
        explain: 'v = √(GM/r). Doubling r divides v by √2 ≈ 1.41. Higher satellites are slower.',
        why: { 1: 'Farther out, gravity is weaker, so the satellite needs less speed, not more.' },
      },
      {
        q: 'An astronaut "floats" in the International Space Station, about 400 km up. Why?',
        choices: ['She and the station are both in free fall around Earth', 'There is no gravity in space', 'Gravity is cancelled by centrifugal force', 'The station\'s engines cancel gravity'],
        answer: 0,
        explain: 'At 400 km, g is still about 8.7 m/s². Everything is falling together around Earth (that\'s an orbit), so nothing pushes on her: apparent weightlessness.',
        why: { 1: 'g = GM/r² is about 89% of surface g there.', 2: 'No outward force exists; gravity is the centripetal force keeping it in orbit.' },
      },
    ],

    problems: [
      {
        id: 'speed-from-period',
        title: 'Speed and acceleration from the period',
        gen(r) {
          const ctx = r.pick([
            ['A child rides on the edge of a merry-go-round of radius', 1.5, 4, 3, 10],
            ['A ball on a string swings in a horizontal circle of radius', 0.4, 1.5, 0.4, 2],
            ['A point on the rim of a spinning wheel of radius', 0.25, 0.8, 0.1, 0.8],
          ]);
          const rad = r.num(ctx[1], ctx[2], 2);
          const per = r.num(ctx[3], ctx[4], 1);
          const v = 2 * Math.PI * rad / per;
          const a = v * v / rad;
          return {
            question: T`${ctx[0]} \(${rad}\ \text{m}\) and makes one full revolution every \(${per}\ \text{s}\).`,
            fig: ['circle', { show: ['v', 'a'] }],
            parts: [
              { label: '(a) Tangential speed', value: v, unit: 'm/s' },
              { label: '(b) Centripetal acceleration', value: a, unit: 'm/s²' },
            ],
            hint: T`One lap is a circumference, \(2\pi r\), in one period. Then \(a_c = v^2/r\).`,
            steps: [
              T`Equation: \(v = \dfrac{2\pi r}{T}\)`,
              T`(a) \(v = \dfrac{2\pi(${rad}\ \text{m})}{${per}\ \text{s}} = ${r.f(v)}\ \text{m/s}\)`,
              T`Equation: \(a_c = \dfrac{v^2}{r}\)`,
              T`(b) \(a_c = \dfrac{(${r.f(v)})^2}{${rad}} = ${r.f(a)}\ \text{m/s}^2\), toward the center`,
            ],
          };
        },
      },
      {
        id: 'rodeo-lasso',
        title: 'Rodeo lasso (horizontal circle)',
        gen(r) {
          const m = r.num(0.3, 1.5, 1);
          const rad = r.num(1.0, 3.0, 1);
          const revs = r.int(2, 5);
          const time = r.num(2, 6, 1);
          const per = time / revs;
          const v = 2 * Math.PI * rad / per;
          const a = v * v / rad;
          const Tn = m * a;
          return {
            question: T`A rodeo rider twirls a lasso loop of mass \(${m}\ \text{kg}\) in a horizontal circle of radius \(${rad}\ \text{m}\). It makes \(${revs}\) revolutions in \(${time}\ \text{s}\). Treat the circle as horizontal and ignore gravity's effect on the rope.`,
            fig: ['circle', { show: ['v', 'F'], label: 'T' }],
            parts: [
              { label: '(a) Centripetal acceleration', value: a, unit: 'm/s²' },
              { label: '(b) Tension in the rope', value: Tn, unit: 'N' },
            ],
            hint: T`Find the period first: time ÷ number of revolutions. Tension is the only force toward the center.`,
            steps: [
              T`Period: \(T = \dfrac{${time}\ \text{s}}{${revs}} = ${r.f(per)}\ \text{s}\)`,
              T`Speed: \(v = \dfrac{2\pi r}{T} = \dfrac{2\pi(${rad})}{${r.f(per)}} = ${r.f(v)}\ \text{m/s}\)`,
              T`(a) \(a_c = \dfrac{v^2}{r} = \dfrac{(${r.f(v)})^2}{${rad}} = ${r.f(a)}\ \text{m/s}^2\)`,
              T`(b) Tension is the net force: \(T = ma_c = (${m})(${r.f(a)}) = ${r.f(Tn)}\ \text{N}\)`,
            ],
          };
        },
      },
      {
        id: 'flat-curve-max',
        title: 'Max speed on a flat curve',
        gen(r) {
          const mu = r.num(0.3, 1.0, 2);
          const rad = r.num(20, 200, 0);
          const v = Math.sqrt(mu * r.g * rad);
          return {
            question: T`A car takes a flat (unbanked) curve of radius \(${rad}\ \text{m}\). The coefficient of static friction between the tires and road is \(${mu}\). What is the maximum speed before the car slides?`,
            fig: ['circle', { show: ['v', 'F'], label: 'F_fs' }],
            parts: [
              { label: '(a) Maximum speed', value: v, unit: 'm/s' },
              { label: '(b) Maximum speed in km/h', value: v * 3.6, unit: 'km/h' },
            ],
            hint: T`Static friction is the only horizontal force, so it is the centripetal force: \(\mu_s mg = mv^2/r\).`,
            steps: [
              T`FBD: \(F_N = mg\) vertically; friction toward the center.`,
              T`Equation: \(\mu_s mg = \dfrac{mv^2}{r} \Rightarrow v_{max} = \sqrt{\mu_s g r}\)`,
              T`(a) \(v_{max} = \sqrt{(${mu})(9.80)(${rad})} = ${r.f(v)}\ \text{m/s}\)`,
              T`(b) \(${r.f(v)} \times 3.6 = ${r.f(v * 3.6)}\ \text{km/h}\)`,
            ],
          };
        },
      },
      {
        id: 'flat-curve-min-mu',
        title: 'Friction needed for a curve',
        gen(r) {
          let kmh, rad, mu;
          do {
            kmh = r.int(30, 100);
            rad = r.num(25, 250, 0);
            mu = (kmh / 3.6) ** 2 / (rad * r.g);
          } while (mu < 0.1 || mu > 1.2);
          const v = kmh / 3.6;
          return {
            question: T`A car rounds a flat curve of radius \(${rad}\ \text{m}\) at \(${kmh}\ \text{km/h}\). What minimum coefficient of static friction is needed so it doesn't slide?`,
            parts: [{ label: 'Minimum μs', value: mu, unit: '' }],
            hint: T`Convert to m/s, then set the maximum friction \(\mu_s mg\) equal to \(mv^2/r\).`,
            steps: [
              T`Convert: \(v = \dfrac{${kmh}}{3.6} = ${r.f(v)}\ \text{m/s}\)`,
              T`Equation: \(F_c = F_f \Rightarrow \dfrac{mv^2}{r} = \mu_s mg \Rightarrow \mu_s = \dfrac{v^2}{rg}\)`,
              T`Substitute: \(\mu_s = \dfrac{(${r.f(v)})^2}{(${rad})(9.80)} = ${r.f(mu)}\)`,
            ],
          };
        },
      },
      {
        id: 'vertical-loop',
        title: 'Loop-de-loop',
        gen(r) {
          const m = r.int(60, 500);
          const rad = r.num(4, 15, 1);
          const vmin = Math.sqrt(r.g * rad);
          const vt = Math.round(vmin * r.num(1.15, 1.6, 2) * 10) / 10;
          const vb = Math.round(Math.sqrt(vt * vt + 4 * r.g * rad) * 10) / 10;
          const Nt = m * (vt * vt / rad - r.g);
          const Nb = m * (vb * vb / rad + r.g);
          return {
            question: T`A \(${m}\ \text{kg}\) roller-coaster car goes around a vertical loop of radius \(${rad}\ \text{m}\). It moves at \(${vt}\ \text{m/s}\) at the top and \(${vb}\ \text{m/s}\) at the bottom.`,
            fig: ['loop', {}],
            parts: [
              { label: '(a) Minimum speed at the top to stay on the track', value: vmin, unit: 'm/s' },
              { label: '(b) Normal force from the track at the top', value: Nt, unit: 'N' },
              { label: '(c) Normal force from the track at the bottom', value: Nb, unit: 'N' },
            ],
            hint: T`Take "toward the center" as positive. At the top, both \(F_N\) and \(mg\) point down (toward center). At the bottom, \(F_N\) points up (toward center) and \(mg\) points away.`,
            steps: [
              T`(a) Minimum speed: \(F_N = 0\), so \(mg = \dfrac{mv^2}{r} \Rightarrow v_{min} = \sqrt{gr} = \sqrt{(9.80)(${rad})} = ${r.f(vmin)}\ \text{m/s}\)`,
              T`(b) Top: \(F_N + mg = \dfrac{mv^2}{r} \Rightarrow F_N = m\left(\dfrac{v^2}{r} - g\right) = ${m}\left(\dfrac{(${vt})^2}{${rad}} - 9.80\right) = ${r.f(Nt)}\ \text{N}\)`,
              T`(c) Bottom: \(F_N - mg = \dfrac{mv^2}{r} \Rightarrow F_N = m\left(\dfrac{v^2}{r} + g\right) = ${m}\left(\dfrac{(${vb})^2}{${rad}} + 9.80\right) = ${r.f(Nb)}\ \text{N}\)`,
            ],
          };
        },
      },
      {
        id: 'ferris-wheel',
        title: 'Ferris wheel apparent weight',
        gen(r) {
          let m, rad, per, v, ac;
          do {
            m = r.int(40, 95);
            rad = r.num(6, 30, 0);
            per = r.int(12, 60);
            v = 2 * Math.PI * rad / per;
            ac = v * v / rad;
          } while (ac > 0.8 * r.g || ac < 0.5);
          const Nt = m * (r.g - ac), Nb = m * (r.g + ac);
          return {
            question: T`A \(${m}\ \text{kg}\) rider sits on a Ferris wheel of radius \(${rad}\ \text{m}\) that turns once every \(${per}\ \text{s}\). What does a scale under the rider read (the normal force) at the top and at the bottom?`,
            parts: [
              { label: '(a) Speed of the rider', value: v, unit: 'm/s' },
              { label: '(b) Normal force at the top', value: Nt, unit: 'N' },
              { label: '(c) Normal force at the bottom', value: Nb, unit: 'N' },
            ],
            hint: T`Find \(v\) and \(a_c = v^2/r\). At the top the center is below you; at the bottom it's above you.`,
            steps: [
              T`(a) \(v = \dfrac{2\pi r}{T} = \dfrac{2\pi(${rad})}{${per}} = ${r.f(v)}\ \text{m/s}\), so \(a_c = \dfrac{v^2}{r} = ${r.f(ac)}\ \text{m/s}^2\)`,
              T`(b) Top (down is toward center): \(mg - F_N = ma_c \Rightarrow F_N = m(g - a_c) = ${m}(9.80 - ${r.f(ac)}) = ${r.f(Nt)}\ \text{N}\)`,
              T`(c) Bottom (up is toward center): \(F_N - mg = ma_c \Rightarrow F_N = m(g + a_c) = ${m}(9.80 + ${r.f(ac)}) = ${r.f(Nb)}\ \text{N}\)`,
              T`Compare with the true weight \(mg = ${r.f(m * r.g)}\ \text{N}\): lighter at the top, heavier at the bottom.`,
            ],
          };
        },
      },
      {
        id: 'rotor-ride',
        title: 'Rotor ride minimum friction',
        gen(r) {
          let rad, f, mu;
          do {
            rad = r.num(2.5, 6.0, 1);
            f = r.num(0.3, 0.8, 2);
            mu = r.g / (4 * Math.PI * Math.PI * f * f * rad);
          } while (mu < 0.05 || mu > 0.9);
          const v = 2 * Math.PI * rad * f;
          return {
            question: T`In a Rotor ride, riders stand against the wall of a cylinder of radius \(${rad}\ \text{m}\) spinning at \(${f}\ \text{rev/s}\). The floor drops away. What minimum coefficient of static friction keeps the riders from sliding down?`,
            parts: [
              { label: '(a) Speed of a rider', value: v, unit: 'm/s' },
              { label: '(b) Minimum μs', value: mu, unit: '' },
            ],
            hint: T`Vertically, friction balances \(mg\). Horizontally, the wall's normal force is the centripetal force: \(F_N = mv^2/r\).`,
            steps: [
              T`Period: \(T = \dfrac{1}{f} = \dfrac{1}{${f}} = ${r.f(1 / f)}\ \text{s}\)`,
              T`(a) \(v = \dfrac{2\pi r}{T} = ${r.f(v)}\ \text{m/s}\)`,
              T`Vertical: \(\mu_s F_N = mg\). Toward center: \(F_N = \dfrac{mv^2}{r}\). So \(\mu_s = \dfrac{gr}{v^2}\)`,
              T`(b) \(\mu_s = \dfrac{(9.80)(${rad})}{(${r.f(v)})^2} = ${r.f(mu)}\)`,
            ],
          };
        },
      },
      {
        id: 'conical-pendulum',
        title: 'Conical pendulum',
        gen(r) {
          const L = r.num(0.5, 2.0, 2);
          const th = r.int(15, 60);
          const m = r.num(0.1, 2.0, 2);
          const rad = L * r.sin(th);
          const v = Math.sqrt(rad * r.g * r.tan(th));
          const Tn = m * r.g / r.cos(th);
          const per = 2 * Math.PI * rad / v;
          return {
            question: T`A \(${m}\ \text{kg}\) toy plane hangs from a \(${L}\ \text{m}\) string and flies in a horizontal circle. The string makes an angle of \(${th}^\circ\) with the vertical.`,
            fig: ['conical', { angle: th }],
            parts: [
              { label: '(a) Tension in the string', value: Tn, unit: 'N' },
              { label: '(b) Speed of the plane', value: v, unit: 'm/s' },
              { label: '(c) Period of one revolution', value: per, unit: 's' },
            ],
            hint: T`The radius of the circle is \(L\sin\theta\), not \(L\). Vertically \(T\cos\theta = mg\); horizontally \(T\sin\theta = mv^2/r\).`,
            steps: [
              T`Radius: \(r = L\sin\theta = (${L})\sin ${th}^\circ = ${r.f(rad)}\ \text{m}\)`,
              T`(a) Vertical: \(T\cos\theta = mg \Rightarrow T = \dfrac{(${m})(9.80)}{\cos ${th}^\circ} = ${r.f(Tn)}\ \text{N}\)`,
              T`(b) Divide horizontal by vertical: \(\tan\theta = \dfrac{v^2}{rg} \Rightarrow v = \sqrt{rg\tan\theta} = \sqrt{(${r.f(rad)})(9.80)\tan ${th}^\circ} = ${r.f(v)}\ \text{m/s}\)`,
              T`(c) \(T_{period} = \dfrac{2\pi r}{v} = \dfrac{2\pi(${r.f(rad)})}{${r.f(v)}} = ${r.f(per)}\ \text{s}\)`,
            ],
          };
        },
      },
      {
        id: 'g-force-radius',
        title: "Pulling g's in a turn",
        gen(r) {
          const v = r.int(100, 320);
          const n = r.int(2, 8);
          const rad = v * v / (n * r.g);
          return {
            question: T`A jet flies at \(${v}\ \text{m/s}\) and makes a level circular turn. The pilot can safely handle \(${n}\) g's (\(a_c = ${n}g\)). What is the smallest radius of turn?`,
            parts: [
              { label: '(a) Centripetal acceleration', value: n * r.g, unit: 'm/s²' },
              { label: '(b) Minimum radius', value: rad, unit: 'm' },
            ],
            hint: T`"\(n\) g's" means \(a_c = n \times 9.80\ \text{m/s}^2\). Then solve \(a_c = v^2/r\) for \(r\).`,
            steps: [
              T`(a) \(a_c = ${n}(9.80) = ${r.f(n * r.g)}\ \text{m/s}^2\)`,
              T`Equation: \(a_c = \dfrac{v^2}{r} \Rightarrow r = \dfrac{v^2}{a_c}\)`,
              T`(b) \(r = \dfrac{(${v})^2}{${r.f(n * r.g)}} = ${r.f(rad)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'gravitation-two-masses',
        title: 'Gravitational force between two objects',
        gen(r) {
          const ctx = r.pick([
            ['two students', 45, 110, 0.5, 3],
            ['two bowling balls', 4, 7, 0.2, 1],
            ['two cars parked side by side', 900, 2200, 2, 6],
          ]);
          const m1 = r.int(ctx[1], ctx[2]);
          const m2 = r.int(ctx[1], ctx[2]);
          const d = r.num(ctx[3], ctx[4], 1);
          const F = G * m1 * m2 / (d * d);
          return {
            question: T`Find the gravitational force between ${ctx[0]} of mass \(${m1}\ \text{kg}\) and \(${m2}\ \text{kg}\) whose centers are \(${d}\ \text{m}\) apart. (Enter scientific notation like 3.2e-7.)`,
            parts: [{ label: 'Gravitational force', value: F, unit: 'N' }],
            hint: T`Use \(F = G\dfrac{m_1m_2}{r^2}\) with \(G = 6.67\times10^{-11}\). Don't forget to square \(r\).`,
            steps: [
              T`Equation: \(F_g = G\dfrac{m_1 m_2}{r^2}\)`,
              T`Substitute: \(F_g = \dfrac{(6.67\times10^{-11})(${m1})(${m2})}{(${d})^2}\)`,
              T`\(F_g = ${sci(F)}\ \text{N}\). Tiny! Gravity only gets big when one mass is planet-sized.`,
            ],
          };
        },
      },
      {
        id: 'inverse-square-whatif',
        title: 'Gravity "what ifs"',
        gen(r) {
          const F0 = r.int(200, 900);
          const k = r.pick([2, 3, 4, 5, 1.5, 0.5]);
          const mf = r.pick([1, 1, 2, 3, 0.5]);
          const F = F0 * mf / (k * k);
          const massText = mf === 1 ? '' : T` and the object's mass is multiplied by \(${mf}\)`;
          return {
            question: T`An object weighs \(${F0}\ \text{N}\) on Earth's surface (one Earth radius from the center). What is the gravitational force on it if its distance from Earth's center becomes \(${k}\) Earth radii${massText}?`,
            parts: [{ label: 'New gravitational force', value: F, unit: 'N' }],
            hint: T`\(F \propto \dfrac{m}{r^2}\). Multiply by the mass factor and divide by the distance factor squared.`,
            steps: [
              T`Ratio: \(\dfrac{F_{new}}{F_{old}} = \dfrac{m_{new}/m_{old}}{(r_{new}/r_{old})^2} = \dfrac{${mf}}{(${k})^2} = ${r.f(mf / (k * k))}\)`,
              T`\(F_{new} = (${F0}\ \text{N})(${r.f(mf / (k * k))}) = ${r.f(F)}\ \text{N}\)`,
            ],
          };
        },
      },
      {
        id: 'g-at-altitude',
        title: 'g at altitude',
        gen(r) {
          const hkm = r.pick([r.int(200, 2000), r.int(2000, 20000), r.int(20000, 40000)]);
          const m = r.int(50, 1500);
          const rad = RE + hkm * 1000;
          const g = G * ME / (rad * rad);
          return {
            question: T`What is the value of \(g\) at an altitude of \(${hkm}\ \text{km}\) above Earth's surface? What is the weight of a \(${m}\ \text{kg}\) object there? (\(M_E = 5.97\times10^{24}\ \text{kg}\), \(R_E = 6.37\times10^6\ \text{m}\))`,
            parts: [
              { label: '(a) g at that altitude', value: g, unit: 'm/s²' },
              { label: '(b) Weight there', value: m * g, unit: 'N' },
            ],
            hint: T`\(g = GM/r^2\) where \(r = R_E + h\), measured from Earth's center, in meters.`,
            steps: [
              T`Center-to-center distance: \(r = R_E + h = 6.37\times10^6 + ${sci(hkm * 1000)} = ${sci(rad)}\ \text{m}\)`,
              T`Equation: \(g = \dfrac{GM_E}{r^2} = \dfrac{(6.67\times10^{-11})(5.97\times10^{24})}{(${sci(rad)})^2}\)`,
              T`(a) \(g = ${r.f(g)}\ \text{m/s}^2\)`,
              T`(b) \(F_g = mg = (${m})(${r.f(g)}) = ${r.f(m * g)}\ \text{N}\)`,
            ],
          };
        },
      },
      {
        id: 'satellite-orbit',
        title: 'Satellite speed and period',
        gen(r) {
          const hkm = r.pick([r.int(250, 1500), r.int(2000, 20000), r.int(20000, 36000)]);
          const rad = RE + hkm * 1000;
          const v = Math.sqrt(G * ME / rad);
          const per = 2 * Math.PI * rad / v;
          return {
            question: T`A satellite is in a circular orbit \(${hkm}\ \text{km}\) above Earth's surface. Find (a) its orbital speed and (b) its period in hours. (\(M_E = 5.97\times10^{24}\ \text{kg}\), \(R_E = 6.37\times10^6\ \text{m}\))`,
            fig: ['orbit', { label: 'satellite' }],
            parts: [
              { label: '(a) Orbital speed', value: v, unit: 'm/s' },
              { label: '(b) Period', value: per / 3600, unit: 'h' },
            ],
            hint: T`Gravity is the centripetal force: \(GMm/r^2 = mv^2/r\). Use \(r = R_E + h\) in meters.`,
            steps: [
              T`\(r = R_E + h = 6.37\times10^6 + ${sci(hkm * 1000)} = ${sci(rad)}\ \text{m}\)`,
              T`Equation: \(G\dfrac{Mm}{r^2} = \dfrac{mv^2}{r} \Rightarrow v = \sqrt{\dfrac{GM}{r}}\)`,
              T`(a) \(v = \sqrt{\dfrac{(6.67\times10^{-11})(5.97\times10^{24})}{${sci(rad)}}} = ${r.f(v)}\ \text{m/s}\)`,
              T`(b) \(T = \dfrac{2\pi r}{v} = \dfrac{2\pi(${sci(rad)})}{${r.f(v)}} = ${sci(per)}\ \text{s} = ${r.f(per / 3600)}\ \text{h}\)`,
            ],
          };
        },
      },
      {
        id: 'kepler-period',
        title: "Kepler's 3rd law",
        gen(r) {
          const a = r.num(0.3, 40, 2);
          const per = Math.pow(a, 1.5);
          return {
            question: T`Earth orbits the Sun at \(1.00\ \text{AU}\) with a period of \(1.00\ \text{year}\). A planet (or asteroid) orbits the Sun at an average distance of \(${a}\ \text{AU}\). What is its period?`,
            parts: [{ label: 'Period', value: per, unit: 'years' }],
            hint: T`Same central body (the Sun), so \(\dfrac{T_1^2}{r_1^3} = \dfrac{T_2^2}{r_2^3}\). With Earth's values in years and AU, this becomes \(T^2 = r^3\).`,
            steps: [
              T`Equation: \(\dfrac{T_2^2}{r_2^3} = \dfrac{T_1^2}{r_1^3} = \dfrac{(1.00)^2}{(1.00)^3}\)`,
              T`So \(T_2^2 = r_2^3 = (${a})^3 = ${r.f(a ** 3)}\)`,
              T`\(T_2 = \sqrt{${r.f(a ** 3)}} = ${r.f(per)}\ \text{years}\)`,
            ],
          };
        },
      },
      {
        id: 'banked-design',
        title: 'Banked curve design speed (no friction)',
        gen(r) {
          const rad = r.int(50, 400);
          if (r.pick([0, 1])) {
            const th = r.int(8, 40);
            const v = Math.sqrt(rad * r.g * r.tan(th));
            return {
              question: T`A curve of radius \(${rad}\ \text{m}\) is banked at \(${th}^\circ\). At what speed can a car take the curve with no friction needed at all?`,
              fig: ['banked', { angle: th, friction: 'none' }],
              parts: [
                { label: '(a) Design speed', value: v, unit: 'm/s' },
                { label: '(b) Design speed in km/h', value: v * 3.6, unit: 'km/h' },
              ],
              hint: T`Only \(F_N\) and \(mg\). Vertical: \(F_N\cos\theta = mg\). Toward center: \(F_N\sin\theta = mv^2/r\). Divide them.`,
              steps: [
                T`Vertical: \(F_N\cos\theta = mg\). Horizontal: \(F_N\sin\theta = \dfrac{mv^2}{r}\)`,
                T`Divide: \(\tan\theta = \dfrac{v^2}{rg} \Rightarrow v = \sqrt{rg\tan\theta}\)`,
                T`(a) \(v = \sqrt{(${rad})(9.80)\tan ${th}^\circ} = ${r.f(v)}\ \text{m/s}\)`,
                T`(b) \(${r.f(v)} \times 3.6 = ${r.f(v * 3.6)}\ \text{km/h}\)`,
              ],
            };
          }
          let kmh, v, th;
          do {
            kmh = r.int(40, 160);
            v = kmh / 3.6;
            th = r.atan(v * v / (rad * r.g), 1);
          } while (th < 5 || th > 45);
          return {
            question: T`Engineers want cars to take a curve of radius \(${rad}\ \text{m}\) at \(${kmh}\ \text{km/h}\) without relying on friction. At what angle should the curve be banked?`,
            fig: ['banked', { angle: Math.round(th), friction: 'none' }],
            parts: [{ label: 'Bank angle', value: th, unit: '°' }],
            hint: T`Convert to m/s, then use \(\tan\theta = \dfrac{v^2}{rg}\).`,
            steps: [
              T`Convert: \(v = \dfrac{${kmh}}{3.6} = ${r.f(v)}\ \text{m/s}\)`,
              T`Equation: \(\tan\theta = \dfrac{v^2}{rg} = \dfrac{(${r.f(v)})^2}{(${rad})(9.80)} = ${r.f(v * v / (rad * r.g))}\)`,
              T`\(\theta = \tan^{-1}(${r.f(v * v / (rad * r.g))}) = ${r.f(th)}^\circ\)`,
            ],
          };
        },
      },
      {
        id: 'banked-friction-range',
        title: 'Banked curve with friction: safe speed range',
        gen(r) {
          let rad, th, mu, t;
          do {
            rad = r.int(50, 300);
            th = r.int(15, 40);
            mu = r.num(0.1, 0.5, 2);
            t = r.tan(th);
          } while (t <= mu + 0.05 || mu * t >= 0.9);
          const rg = rad * r.g;
          const vmin = Math.sqrt(rg * (t - mu) / (1 + mu * t));
          const vmax = Math.sqrt(rg * (t + mu) / (1 - mu * t));
          return {
            question: T`A curve of radius \(${rad}\ \text{m}\) is banked at \(${th}^\circ\). The coefficient of static friction between tires and road is \(${mu}\). Find the slowest and fastest speeds at which a car can take the curve without sliding.`,
            fig: ['banked', { angle: th, friction: 'down' }],
            parts: [
              { label: '(a) Minimum speed', value: vmin, unit: 'm/s' },
              { label: '(b) Maximum speed', value: vmax, unit: 'm/s' },
            ],
            hint: T`Too slow → the car slides down, so friction points UP the slope. Too fast → it slides up, so friction points DOWN the slope. Write \(\Sigma F_y = 0\) and \(\Sigma F_x = mv^2/r\) for each case.`,
            steps: [
              T`Fast case (friction down the slope): \(F_N\cos\theta - \mu_s F_N\sin\theta = mg\) and \(F_N\sin\theta + \mu_s F_N\cos\theta = \dfrac{mv^2}{r}\). Divide: \(v_{max}^2 = rg\dfrac{\tan\theta + \mu_s}{1 - \mu_s\tan\theta}\)`,
              T`Slow case (friction up the slope): \(v_{min}^2 = rg\dfrac{\tan\theta - \mu_s}{1 + \mu_s\tan\theta}\)`,
              T`Here \(rg = (${rad})(9.80) = ${r.f(rg)}\) and \(\tan ${th}^\circ = ${r.f(t)}\)`,
              T`(a) \(v_{min} = \sqrt{${r.f(rg)}\cdot\dfrac{${r.f(t)} - ${mu}}{1 + (${mu})(${r.f(t)})}} = ${r.f(vmin)}\ \text{m/s}\)`,
              T`(b) \(v_{max} = \sqrt{${r.f(rg)}\cdot\dfrac{${r.f(t)} + ${mu}}{1 - (${mu})(${r.f(t)})}} = ${r.f(vmax)}\ \text{m/s}\)`,
            ],
          };
        },
      },
    ],
  };
})();

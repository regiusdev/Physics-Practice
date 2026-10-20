// 2D Kinematics & Vectors (Giancoli Ch. 3)
// Format: see docs/CONTENT-GUIDE.md. Math goes in \( \) or \[ \]; the T tag keeps backslashes single.
(() => {
  const T = String.raw;
  window.UNIT_DATA = window.UNIT_DATA || {};
  window.UNIT_DATA['kinematics-2d'] = {
    summary: 'Motion in a plane: break every vector into x and y components, solve each direction separately, and let time connect them.',

    formulas: [
      { name: 'Vector components', tex: T`A_x = A\cos\theta, \quad A_y = A\sin\theta`, note: 'θ measured from the +x axis (or the axis you name, like "N of E").' },
      { name: 'Magnitude and direction', tex: T`A = \sqrt{A_x^2 + A_y^2}, \quad \theta = \tan^{-1}\!\left(\frac{|A_y|}{|A_x|}\right)`, note: 'Then name the quadrant from the signs of Aₓ and A_y.' },
      { name: 'Adding vectors', tex: T`R_x = A_x + B_x, \quad R_y = A_y + B_y`, note: 'Add components, never magnitudes.' },
      { name: 'Relative velocity', tex: T`\vec v_{\text{obj, ground}} = \vec v_{\text{obj, medium}} + \vec v_{\text{medium, ground}}`, note: 'Plane in wind, boat in a current.' },
      { name: 'Projectile: horizontal', tex: T`x = v_{0x}t, \quad v_x = v_{0x} = v_0\cos\theta`, note: 'No horizontal acceleration (ignore air).' },
      { name: 'Projectile: vertical', tex: T`y = y_0 + v_{0y}t - \tfrac12 g t^2, \quad v_y = v_{0y} - gt`, note: 'Up is positive; v₀y = v₀ sin θ.' },
      { name: 'Vertical, no time', tex: T`v_y^2 = v_{0y}^2 - 2g\,\Delta y` },
      { name: 'Time to the top', tex: T`t_{\text{top}} = \frac{v_{0y}}{g}`, note: 'At the top v_y = 0.' },
      { name: 'Maximum height', tex: T`h_{\max} = \frac{v_{0y}^2}{2g}`, note: 'Height above the launch point.' },
      { name: 'Range (level ground only)', tex: T`R = \frac{v_0^2\sin 2\theta}{g}`, note: 'Only when launch and landing heights are equal.' },
      { name: 'Horizontal launch from height h', tex: T`t = \sqrt{\frac{2h}{g}}, \quad x = v_0 t`, note: 'v₀y = 0, so the fall time depends only on h.' },
    ],

    concepts: [
      {
        title: 'Vectors vs. scalars',
        body: T`<p>A <strong>vector</strong> has size and direction: displacement, velocity, acceleration, force. A <strong>scalar</strong> only has size: distance, speed, time, mass.</p><p>Always give a direction with a vector answer, like "60.8 m at 25.3° N of E" or "46.8 m/s at 57.7° below horizontal".</p>`,
      },
      {
        title: 'Components and angle language',
        body: T`<p>Break a vector into the part along x and the part along y. The component <em>next to</em> the angle uses cosine; the one <em>across from</em> it uses sine.</p><ul><li>"30° N of E": start pointing East, rotate 30° toward North. \(A_x = A\cos 30^\circ\) (East), \(A_y = A\sin 30^\circ\) (North).</li><li>"30° N of W": start pointing West, rotate toward North. \(A_x = -A\cos 30^\circ\), \(A_y = +A\sin 30^\circ\).</li></ul>`,
        fig: ['vectors', { vectors: [{ x: 4.33, y: 2.5, label: 'A', kind: 'a' }, { x: 4.33, y: 0, label: 'A_x', kind: 'b' }, { x: 0, y: 2.5, label: 'A_y', kind: 'b', tail: [4.33, 0] }], grid: true }],
      },
      {
        title: 'Adding vectors by components',
        body: T`<p>Tip-to-tail drawings show <em>what</em> happens; components tell you the <em>numbers</em>.</p><ol><li>Break each vector into x and y (with signs).</li><li>Add all the x's: \(R_x\). Add all the y's: \(R_y\).</li><li>\(R = \sqrt{R_x^2 + R_y^2}\), \(\theta = \tan^{-1}(|R_y|/|R_x|)\).</li><li>Use the signs of \(R_x\) and \(R_y\) to name the direction (which quadrant).</li></ol>`,
        fig: ['vectors', { vectors: [{ x: 40, y: 0, label: 'A', kind: 'a' }, { x: 15, y: 26, label: 'B', kind: 'b', tail: [40, 0] }, { x: 55, y: 26, label: 'R', kind: 'r' }], grid: true }],
      },
      {
        title: 'Relative velocity: wind and currents',
        body: T`<p>A plane flies <em>through the air</em>, and the air moves over the ground. A boat moves <em>through the water</em>, and the water moves past the shore. Add the two velocities as vectors:</p>\[\vec v_{\text{boat, shore}} = \vec v_{\text{boat, water}} + \vec v_{\text{water, shore}}\]<p>If a boat points straight across, the current doesn't slow the crossing at all. The time to cross uses only the across-river speed, and the current just carries the boat downstream.</p>`,
        fig: ['river', { across: 4, down: 3, width: '120 m' }],
      },
      {
        title: 'Horizontal and vertical are independent',
        body: T`<p>In projectile motion (no air resistance):</p><ul><li><strong>Horizontal:</strong> no acceleration, so \(v_x\) is constant and \(x = v_{0x}t\).</li><li><strong>Vertical:</strong> free fall, \(a_y = -g\), so it's just Chapter 2 again.</li></ul><p><strong>Time is the only thing the two directions share.</strong> Find \(t\) from one direction and use it in the other.</p>`,
        fig: ['projectile', { v0: 20, angle: 50, h: 0, components: true }],
      },
      {
        title: 'Horizontally launched projectiles',
        body: T`<p>Launched sideways off a table, cliff or helicopter: \(v_{0y} = 0\). The fall time comes only from the height:</p>\[h = \tfrac12 g t^2 \;\Rightarrow\; t = \sqrt{2h/g}\]<p>A ball dropped from the same height lands at the same instant. Launch speed only changes <em>how far</em> it goes, not <em>how long</em> it falls.</p>`,
        fig: ['projectile', { v0: 25, angle: 0, h: 80, components: true }],
      },
      {
        title: 'Angled launches: level vs. non-level ground',
        body: T`<p><strong>Level ground</strong> (lands at launch height): time of flight \(= 2v_{0y}/g\), and the range formula \(R = v_0^2\sin 2\theta/g\) works. Complementary angles (30° and 60°) give the same range; 45° gives the most.</p><p><strong>Different heights</strong> (off a cliff, into a hoop): the range formula does <em>not</em> apply. Use \(y = y_0 + v_{0y}t - \tfrac12 gt^2\) with the real final height, which is usually a quadratic in \(t\). Take the positive root.</p>`,
        fig: ['projectile', { v0: 30, angle: 40, h: 150, components: false }],
      },
      {
        title: 'At the top of the path',
        body: T`<p>At maximum height \(v_y = 0\), but \(v_x\) is still \(v_0\cos\theta\). So the speed at the top is \(v_0\cos\theta\), <strong>not zero</strong>, and the acceleration is still \(g\) downward.</p><p>Speed is smallest at the top, and the path is symmetric on level ground: same speed at equal heights going up and coming down.</p>`,
      },
    ],

    sims: ['projectile', 'vector-add'],

    mistakes: [
      {
        title: 'Adding magnitudes instead of components',
        wrong: '40 m east plus 30 m at 60° N of E = 70 m.',
        right: T`Only vectors pointing the same direction add like plain numbers. Break both into components, add x's and y's separately, then use Pythagoras: \(\sqrt{55.0^2 + 26.0^2} = 60.8\ \text{m}\).`,
      },
      {
        title: 'Calculator in radians',
        wrong: T`\(\cos 30 = 0.154\), so the component is tiny.`,
        right: 'Check that your calculator says DEG before every test. Quick check: cos(60) must be 0.5.',
      },
      {
        title: 'Wrong quadrant from tan⁻¹',
        wrong: T`\(R_x = -4.33\), \(R_y = -5.50\), so \(\theta = \tan^{-1}(5.50/4.33) = 51.8^\circ\) and you're done.`,
        right: T`\(\tan^{-1}\) only gives an angle between 0° and 90°. Use the <em>signs</em> to name the direction: both negative means South of West, so the answer is 51.8° S of W. Sketch it to be sure.`,
      },
      {
        title: 'Using v₀ instead of v₀y in vertical equations',
        wrong: T`Max height \(= v_0^2/2g\) with the full launch speed.`,
        right: T`Vertical equations only use the vertical part: \(v_{0y} = v_0\sin\theta\). Horizontal ones use \(v_{0x} = v_0\cos\theta\).`,
      },
      {
        title: 'Thinking v = 0 at the top',
        wrong: 'At the highest point the ball stops, so its speed is zero.',
        right: T`Only \(v_y\) is zero at the top. The ball is still moving sideways at \(v_{0x}\) (unless it was launched straight up).`,
      },
      {
        title: 'Using the range formula when heights differ',
        wrong: T`Boulder launched from a 150 m cliff: \(R = v_0^2 \sin 2\theta / g\).`,
        right: T`The range formula assumes landing at launch height. For cliffs, hoops and walls, solve \(y = y_0 + v_{0y}t - \tfrac12 gt^2\) for \(t\), then \(x = v_{0x}t\).`,
      },
      {
        title: 'Sign of y for launches above the ground',
        wrong: T`Off a 150 m cliff: \(150 = v_{0y}t - 4.9t^2\).`,
        right: T`With up as positive and the origin at the launch point, the ground is <em>below</em> you: \(\Delta y = -150\ \text{m}\). Or put the origin on the ground: \(0 = 150 + v_{0y}t - 4.9t^2\).`,
      },
      {
        title: 'Sine vs. cosine when the angle is from vertical or North',
        wrong: T`"25° East of North", so the east component is \(A\cos 25^\circ\).`,
        right: T`Cosine goes with the axis the angle is measured <em>from</em>. Measured from North means North \(= A\cos 25^\circ\) and East \(= A\sin 25^\circ\). Draw it every time.`,
      },
    ],

    examples: [
      {
        title: 'Surveyor: two-leg displacement',
        source: '2D Kinematics Practice Test Q1',
        problem: T`A land surveyor walks \(40.0\ \text{m}\) due East, then \(30.0\ \text{m}\) at \(60.0^\circ\) North of East. Find the magnitude and direction of the total displacement.`,
        fig: ['vectors', { vectors: [{ x: 40, y: 0, label: 'd_1', kind: 'a' }, { x: 15, y: 25.98, label: 'd_2', kind: 'b', tail: [40, 0] }, { x: 55, y: 25.98, label: 'R', kind: 'r' }], grid: true }],
        steps: [
          T`Components: \(d_{1x} = 40.0\ \text{m}\), \(d_{1y} = 0\). \(d_{2x} = 30.0\cos 60.0^\circ = 15.0\ \text{m}\), \(d_{2y} = 30.0\sin 60.0^\circ = 25.98\ \text{m}\).`,
          T`Add: \(R_x = 40.0 + 15.0 = 55.0\ \text{m}\), \(R_y = 0 + 25.98 = 25.98\ \text{m}\).`,
          T`Magnitude: \(R = \sqrt{R_x^2 + R_y^2} = \sqrt{(55.0\ \text{m})^2 + (25.98\ \text{m})^2} = 60.8\ \text{m}\).`,
          T`Direction: \(\theta = \tan^{-1}(R_y/R_x) = \tan^{-1}(25.98/55.0) = 25.3^\circ\) N of E.`,
        ],
        answer: T`\(R = 60.8\ \text{m}\) at \(25.3^\circ\) North of East`,
      },
      {
        title: 'Hiker: answer in Quadrant III',
        source: '2D Kinematics Practice Test Q2',
        problem: T`A hiker walks \(5.00\ \text{km}\) at \(30.0^\circ\) North of West, then turns and walks \(8.00\ \text{km}\) due South. Find the net displacement.`,
        fig: ['vectors', { vectors: [{ x: -4.33, y: 2.5, label: 'd_1', kind: 'a' }, { x: 0, y: -8, label: 'd_2', kind: 'b', tail: [-4.33, 2.5] }, { x: -4.33, y: -5.5, label: 'R', kind: 'r' }], grid: true }],
        steps: [
          T`Signs: East +, North +. Leg 1: \(d_{1x} = -5.00\cos 30.0^\circ = -4.330\ \text{km}\), \(d_{1y} = +5.00\sin 30.0^\circ = +2.500\ \text{km}\).`,
          T`Leg 2 (due South): \(d_{2x} = 0\), \(d_{2y} = -8.000\ \text{km}\).`,
          T`Add: \(R_x = -4.330\ \text{km}\), \(R_y = 2.500 - 8.000 = -5.500\ \text{km}\).`,
          T`Magnitude: \(R = \sqrt{(-4.330)^2 + (-5.500)^2} = \sqrt{49.00} = 7.00\ \text{km}\).`,
          T`Direction: both components negative means Quadrant III (South of West). \(\theta = \tan^{-1}(5.500/4.330) = 51.8^\circ\) S of W.`,
        ],
        answer: T`\(R = 7.00\ \text{km}\) at \(51.8^\circ\) South of West`,
      },
      {
        title: 'Airplane in a crosswind',
        source: '2D Kinematics Practice Test Q3',
        problem: T`A plane heads due North at an airspeed of \(250\ \text{km/h}\). A wind blows East at \(60.0\ \text{km/h}\). (a) Find the groundspeed and direction. (b) How long does it take to move \(500\ \text{km}\) North?`,
        fig: ['vectors', { vectors: [{ x: 0, y: 250, label: 'v_{PA}', kind: 'a' }, { x: 60, y: 0, label: 'v_{AG}', kind: 'b', tail: [0, 250] }, { x: 60, y: 250, label: 'v_{PG}', kind: 'r' }], grid: false }],
        steps: [
          T`Add the velocities: \(\vec v_{PG} = \vec v_{PA} + \vec v_{AG}\). North part \(= 250\ \text{km/h}\), East part \(= 60.0\ \text{km/h}\).`,
          T`Groundspeed: \(v = \sqrt{(250\ \text{km/h})^2 + (60.0\ \text{km/h})^2} = \sqrt{66100} = 257\ \text{km/h}\).`,
          T`Direction: \(\theta = \tan^{-1}(60.0/250) = 13.5^\circ\) East of North.`,
          T`(b) Only the northward velocity moves the plane north: \(t = \Delta y / v_N = 500\ \text{km} / 250\ \text{km/h} = 2.00\ \text{h}\).`,
        ],
        answer: T`(a) \(257\ \text{km/h}\) at \(13.5^\circ\) E of N; (b) \(2.00\ \text{h}\)`,
      },
      {
        title: 'Boat crossing a river',
        source: '2D Kinematics Practice Test Q4',
        problem: T`A boat points straight across a \(120\ \text{m}\) wide river at \(4.00\ \text{m/s}\) relative to the water. The current flows at \(3.00\ \text{m/s}\). Find (a) the crossing time, (b) how far downstream it lands, (c) its velocity relative to the shore.`,
        fig: ['river', { across: 4, down: 3, width: '120 m' }],
        steps: [
          T`(a) Across: \(t = w / v_{\text{across}} = 120\ \text{m} / 4.00\ \text{m/s} = 30.0\ \text{s}\). The current doesn't change this.`,
          T`(b) Downstream: \(x = v_{\text{current}}\, t = (3.00\ \text{m/s})(30.0\ \text{s}) = 90.0\ \text{m}\).`,
          T`(c) \(v = \sqrt{(4.00)^2 + (3.00)^2} = 5.00\ \text{m/s}\); \(\theta = \tan^{-1}(3.00/4.00) = 36.9^\circ\) downstream from straight across.`,
        ],
        answer: T`(a) \(30.0\ \text{s}\); (b) \(90.0\ \text{m}\); (c) \(5.00\ \text{m/s}\) at \(36.9^\circ\) downstream`,
      },
      {
        title: 'Relief package drop (horizontal launch)',
        source: '2D Kinematics Practice Test Q5',
        problem: T`A helicopter flying horizontally at \(25.0\ \text{m/s}\) drops a package from \(80.0\ \text{m}\) above the water. Find (a) the time in the air, (b) the horizontal distance, (c) the impact velocity.`,
        fig: ['projectile', { v0: 25, angle: 0, h: 80, components: true }],
        steps: [
          T`Horizontal launch: \(v_{0x} = 25.0\ \text{m/s}\), \(v_{0y} = 0\). Take down as positive for the fall.`,
          T`(a) \(h = \tfrac12 g t^2 \Rightarrow 80.0\ \text{m} = \tfrac12(9.80\ \text{m/s}^2)t^2 \Rightarrow t = 4.04\ \text{s}\).`,
          T`(b) \(x = v_{0x}t = (25.0\ \text{m/s})(4.04\ \text{s}) = 101\ \text{m}\).`,
          T`(c) \(v_x = 25.0\ \text{m/s}\), \(v_y = gt = (9.80)(4.04) = 39.6\ \text{m/s}\) down. \(v = \sqrt{25.0^2 + 39.6^2} = 46.8\ \text{m/s}\), \(\theta = \tan^{-1}(39.6/25.0) = 57.7^\circ\) below horizontal.`,
        ],
        answer: T`(a) \(4.04\ \text{s}\); (b) \(101\ \text{m}\); (c) \(46.8\ \text{m/s}\) at \(57.7^\circ\) below horizontal`,
      },
      {
        title: 'Volcano boulder: landing lower than launch',
        source: '2D Kinematics Practice Test Q10',
        problem: T`A boulder is launched at \(30.0\ \text{m/s}\), \(40.0^\circ\) above horizontal, from a crater rim \(150\ \text{m}\) above the valley floor. Find (a) the time in the air, (b) the range, (c) the impact velocity.`,
        fig: ['projectile', { v0: 30, angle: 40, h: 150, components: false }],
        steps: [
          T`Components: \(v_{0x} = 30.0\cos 40.0^\circ = 22.98\ \text{m/s}\), \(v_{0y} = 30.0\sin 40.0^\circ = 19.28\ \text{m/s}\).`,
          T`(a) Ground at \(y = 0\), launch at \(y_0 = 150\ \text{m}\): \(0 = 150 + 19.28t - 4.90t^2\).`,
          T`Quadratic: \(t = \dfrac{19.28 + \sqrt{19.28^2 + 4(4.90)(150)}}{2(4.90)} = \dfrac{19.28 + 57.55}{9.80} = 7.84\ \text{s}\) (take the positive root).`,
          T`(b) \(x = v_{0x}t = (22.98\ \text{m/s})(7.84\ \text{s}) = 180\ \text{m}\).`,
          T`(c) \(v_y = v_{0y} - gt = 19.28 - (9.80)(7.84) = -57.55\ \text{m/s}\). \(v = \sqrt{22.98^2 + 57.55^2} = 62.0\ \text{m/s}\), \(\theta = \tan^{-1}(57.55/22.98) = 68.2^\circ\) below horizontal.`,
        ],
        answer: T`(a) \(7.84\ \text{s}\); (b) \(180\ \text{m}\); (c) \(62.0\ \text{m/s}\) at \(68.2^\circ\) below horizontal`,
      },
    ],

    quiz: [
      {
        q: 'Ball A is dropped and ball B is launched horizontally from the same height at the same moment. Which hits the ground first? (No air resistance.)',
        choices: ['Ball A', 'Ball B', 'They land at the same time', 'It depends on how fast B is launched'],
        answer: 2,
        explain: T`Both start with \(v_{0y} = 0\) and fall with the same \(g\). Horizontal speed doesn't affect vertical motion.`,
        why: { 0: 'B moves farther, but it falls the same height with the same vertical motion.', 3: 'Launch speed changes how far B goes, not how long it falls.' },
      },
      {
        q: "At the highest point of a projectile's path (launched at 40°), its velocity is:",
        choices: ['Zero', 'Purely horizontal', 'Purely vertical', 'Equal to the launch velocity'],
        answer: 1,
        explain: T`\(v_y = 0\) at the top, but \(v_x = v_0\cos\theta\) never changes.`,
        why: { 0: 'Only the vertical component is zero; it is still moving sideways.' },
      },
      {
        q: "At the highest point of a projectile's path, its acceleration is:",
        choices: ['Zero', T`\(9.80\ \text{m/s}^2\) downward`, 'Horizontal', T`\(9.80\ \text{m/s}^2\) upward`],
        answer: 1,
        explain: 'Gravity never switches off. The acceleration is g downward for the whole flight.',
        why: { 0: 'Velocity (vertical part) is zero at the top, but acceleration is not.' },
      },
      {
        q: 'On level ground with no air resistance, which launch angle gives the greatest range?',
        choices: [T`\(30^\circ\)`, T`\(45^\circ\)`, T`\(60^\circ\)`, T`\(90^\circ\)`],
        answer: 1,
        keepOrder: true,
        explain: T`\(R = v_0^2\sin 2\theta/g\) is largest when \(\sin 2\theta = 1\), i.e. \(\theta = 45^\circ\).`,
        why: { 3: 'Straight up gives the most height but zero range.' },
      },
      {
        q: 'A ball launched at 30° lands 40 m away on level ground. At the same speed, which other angle also gives 40 m?',
        choices: [T`\(15^\circ\)`, T`\(45^\circ\)`, T`\(60^\circ\)`, T`\(75^\circ\)`],
        answer: 2,
        keepOrder: true,
        explain: T`Complementary angles (adding to 90°) give the same range because \(\sin 2(30^\circ) = \sin 2(60^\circ)\).`,
        why: { 1: '45° gives the maximum range, which is more than 40 m.' },
      },
      {
        q: 'Which quantity stays constant during projectile motion (no air resistance)?',
        choices: ['Vertical velocity', 'Horizontal velocity', 'Speed', 'Height'],
        answer: 1,
        explain: 'There is no horizontal force, so the horizontal velocity never changes.',
        why: { 2: 'Speed changes because v_y changes; it is smallest at the top.' },
      },
      {
        q: T`A vector of magnitude \(20\ \text{m}\) points \(30^\circ\) North of East. Its East component is:`,
        choices: [T`\(10.0\ \text{m}\)`, T`\(17.3\ \text{m}\)`, T`\(20.0\ \text{m}\)`, T`\(11.5\ \text{m}\)`],
        answer: 1,
        explain: T`The angle is measured from East, so East \(= 20\cos 30^\circ = 17.3\ \text{m}\).`,
        why: { 0: T`That's \(20\sin 30^\circ\), the North component.` },
      },
      {
        q: T`A vector has components \(R_x = -3.0\) and \(R_y = +4.0\). Which direction does it point?`,
        choices: ['53° North of East', '53° North of West', '53° South of West', '37° South of East'],
        answer: 1,
        explain: T`\(R_x < 0\) (West) and \(R_y > 0\) (North), so Quadrant II. \(\tan^{-1}(4.0/3.0) = 53^\circ\) from the West axis toward North.`,
        why: { 0: 'tan⁻¹ gave 53°, but the negative x means it points West, not East.' },
      },
      {
        q: T`You walk \(3.0\ \text{km}\) East then \(4.0\ \text{km}\) North. Your displacement magnitude is:`,
        choices: [T`\(7.0\ \text{km}\)`, T`\(5.0\ \text{km}\)`, T`\(1.0\ \text{km}\)`, T`\(12\ \text{km}\)`],
        answer: 1,
        explain: T`\(\sqrt{3.0^2 + 4.0^2} = 5.0\ \text{km}\). 7.0 km is the distance walked, not the displacement.`,
        why: { 0: 'That adds magnitudes; it is the distance you walked, not the straight-line displacement.' },
      },
      {
        q: 'A boat points straight across a river. If the current gets faster, the time to cross:',
        choices: ['Increases', 'Decreases', 'Stays the same', 'Depends on the river width only if the current is fast'],
        answer: 2,
        explain: 'Crossing time uses only the across-river velocity. The current is perpendicular, so it only changes how far downstream the boat lands.',
        why: { 0: 'The boat travels a longer path, but it also goes faster; the across part is unchanged.' },
      },
      {
        q: T`A plane flies North at \(200\ \text{km/h}\) through air that moves East at \(50\ \text{km/h}\). Its ground speed is about:`,
        choices: [T`\(250\ \text{km/h}\)`, T`\(150\ \text{km/h}\)`, T`\(206\ \text{km/h}\)`, T`\(200\ \text{km/h}\)`],
        answer: 2,
        explain: T`Perpendicular velocities add like legs of a right triangle: \(\sqrt{200^2 + 50^2} = 206\ \text{km/h}\).`,
        why: { 0: 'You can only add speeds directly when they point the same way (tailwind).' },
      },
      {
        q: 'A hunter aims a dart gun directly at a monkey hanging from a branch. The monkey lets go the instant the dart is fired. The dart:',
        choices: ['Passes above the monkey', 'Hits the monkey', 'Passes below the monkey', 'Depends on the dart speed (if fast enough to reach before hitting the ground)'],
        answer: 1,
        explain: 'Both the dart and the monkey fall the same distance ½gt² below where they would have been without gravity, so the dart still lines up with the monkey (as long as it reaches it before landing).',
        why: { 2: 'The dart does fall below its aim line, but the monkey falls by exactly the same amount.' },
      },
      {
        q: 'A ball rolls off a 1.25 m table at 2.0 m/s. If it rolled off at 4.0 m/s instead, its time in the air would:',
        choices: ['Double', 'Halve', 'Stay the same', 'Increase by √2'],
        answer: 2,
        explain: T`Fall time depends only on the height: \(t = \sqrt{2h/g}\). Faster launch means the same time, twice the distance.`,
      },
      {
        q: T`A projectile is launched at \(v_0 = 20\ \text{m/s}\) at \(30^\circ\). Its initial vertical velocity is:`,
        choices: [T`\(10\ \text{m/s}\)`, T`\(17.3\ \text{m/s}\)`, T`\(20\ \text{m/s}\)`, T`\(0\ \text{m/s}\)`],
        answer: 0,
        explain: T`\(v_{0y} = v_0\sin\theta = 20\sin 30^\circ = 10\ \text{m/s}\).`,
        why: { 1: T`That's \(v_{0x} = 20\cos 30^\circ\), the horizontal part.` },
      },
      {
        q: 'A ball is launched at an angle on level ground. Compared with its launch speed, its landing speed is:',
        choices: ['Greater', 'Less', 'The same', 'Zero'],
        answer: 2,
        explain: T`On level ground the path is symmetric: \(v_x\) is unchanged and \(v_y\) lands with the same size it started with (pointing down).`,
      },
      {
        q: 'Two balls are launched at the same speed, one at 30° and one at 60°. Which stays in the air longer?',
        choices: ['The 30° ball', 'The 60° ball', 'Same time, since they have the same range', 'Not enough information'],
        answer: 1,
        explain: T`Time in the air \(= 2v_0\sin\theta/g\), and \(\sin 60^\circ > \sin 30^\circ\). Same range, but the 60° ball goes higher and stays up longer.`,
        why: { 2: 'Same range does not mean same time; the 60° ball moves slower horizontally but stays up longer.' },
      },
      {
        q: 'A package is dropped from a plane flying horizontally at constant velocity. Seen from the ground (no air resistance), the package lands:',
        choices: ['Behind the plane', 'Directly below the plane', 'Ahead of the plane', 'Directly below the drop point'],
        answer: 1,
        explain: 'The package keeps the plane\'s horizontal velocity, so it stays directly under the plane the whole way down.',
        why: { 3: 'That would only happen if the package lost its horizontal velocity when released.' },
      },
      {
        q: 'Which statement about the range formula R = v₀² sin 2θ / g is true?',
        choices: ['It works for any projectile', 'It only works when the landing height equals the launch height', 'It only works for horizontal launches', 'It gives the maximum height'],
        answer: 1,
        explain: 'It was derived assuming the projectile lands at the height it started. For cliffs, walls and hoops, use the full y-equation.',
      },
    ],

    problems: [
      {
        id: 'two-leg-east-angle',
        title: 'Two-leg displacement (East, then N of E)',
        gen(r) {
          const f = (x) => r.f(x);
          const d1 = r.num(20, 80, 0);
          const d2 = r.num(10, 60, 0);
          const th = r.num(20, 75, 0);
          const d2x = d2 * r.cos(th), d2y = d2 * r.sin(th);
          const Rx = d1 + d2x, Ry = d2y;
          const R = Math.hypot(Rx, Ry);
          const ang = r.atan(Ry, Rx);
          return {
            question: T`A surveyor walks \(${d1}\ \text{m}\) due East, then \(${d2}\ \text{m}\) at \(${th}^\circ\) North of East. Find the magnitude and direction of the total displacement.`,
            fig: ['vectors', { vectors: [{ x: d1, y: 0, label: 'd_1', kind: 'a' }, { x: d2x, y: d2y, label: 'd_2', kind: 'b', tail: [d1, 0] }, { x: Rx, y: Ry, label: 'R', kind: 'r' }], grid: true }],
            parts: [
              { label: '(a) Magnitude of displacement', value: R, unit: 'm' },
              { label: '(b) Direction (degrees North of East)', value: ang, unit: '°' },
            ],
            hint: 'Break the second leg into East and North components, add all the East parts and all the North parts, then use Pythagoras and tan⁻¹.',
            steps: [
              T`Leg 2 components: \(d_{2x} = ${d2}\cos ${th}^\circ = ${f(d2x)}\ \text{m}\), \(d_{2y} = ${d2}\sin ${th}^\circ = ${f(d2y)}\ \text{m}\).`,
              T`Add: \(R_x = ${d1} + ${f(d2x)} = ${f(Rx)}\ \text{m}\), \(R_y = 0 + ${f(d2y)} = ${f(Ry)}\ \text{m}\).`,
              T`Magnitude: \(R = \sqrt{R_x^2 + R_y^2} = \sqrt{(${f(Rx)})^2 + (${f(Ry)})^2} = ${f(R)}\ \text{m}\).`,
              T`Direction: \(\theta = \tan^{-1}(R_y/R_x) = \tan^{-1}(${f(Ry)}/${f(Rx)}) = ${f(ang)}^\circ\) N of E.`,
            ],
          };
        },
      },
      {
        id: 'nw-then-south',
        title: 'Hiker: N of W, then South',
        gen(r) {
          const f = (x) => r.f(x);
          let d1, th, d2, Ry;
          do {
            d1 = r.num(3, 9, 1);
            th = r.num(20, 60, 0);
            d2 = r.num(4, 12, 1);
            Ry = d1 * r.sin(th) - d2;
          } while (Ry > -1);
          const d1x = -d1 * r.cos(th), d1y = d1 * r.sin(th);
          const Rx = d1x;
          const R = Math.hypot(Rx, Ry);
          const ang = r.atan(-Ry, -Rx);
          return {
            question: T`A hiker walks \(${d1}\ \text{km}\) at \(${th}^\circ\) North of West, then turns and walks \(${d2}\ \text{km}\) due South. Find the hiker's net displacement.`,
            fig: ['vectors', { vectors: [{ x: d1x, y: d1y, label: 'd_1', kind: 'a' }, { x: 0, y: -d2, label: 'd_2', kind: 'b', tail: [d1x, d1y] }, { x: Rx, y: Ry, label: 'R', kind: 'r' }], grid: true }],
            parts: [
              { label: '(a) Magnitude of displacement', value: R, unit: 'km' },
              { label: '(b) Direction (degrees South of West)', value: ang, unit: '°' },
            ],
            hint: 'Use East = +x, North = +y. "N of W" means x is negative and y is positive. After adding, check the signs to see which quadrant you end up in.',
            steps: [
              T`Leg 1: \(d_{1x} = -${d1}\cos ${th}^\circ = ${f(d1x)}\ \text{km}\), \(d_{1y} = +${d1}\sin ${th}^\circ = ${f(d1y)}\ \text{km}\).`,
              T`Leg 2 (South): \(d_{2x} = 0\), \(d_{2y} = -${d2}\ \text{km}\).`,
              T`Add: \(R_x = ${f(Rx)}\ \text{km}\), \(R_y = ${f(d1y)} - ${d2} = ${f(Ry)}\ \text{km}\).`,
              T`Magnitude: \(R = \sqrt{(${f(Rx)})^2 + (${f(Ry)})^2} = ${f(R)}\ \text{km}\).`,
              T`Both components negative means Quadrant III. \(\theta = \tan^{-1}(|R_y|/|R_x|) = \tan^{-1}(${f(-Ry)}/${f(-Rx)}) = ${f(ang)}^\circ\) S of W.`,
            ],
          };
        },
      },
      {
        id: 'plane-crosswind',
        title: 'Airplane in a crosswind',
        gen(r) {
          const f = (x) => r.f(x);
          const va = r.num(150, 400, 0);
          const w = r.num(20, 90, 0);
          const d = r.int(3, 9) * 100;
          const vg = Math.hypot(va, w);
          const head = r.atan(w, va);
          const t = d / va;
          return {
            question: T`A pilot heads due North with an airspeed of \(${va}\ \text{km/h}\). A wind blows toward the East at \(${w}\ \text{km/h}\). (a) What is the plane's groundspeed? (b) What is its direction of travel? (c) How long does it take to travel \(${d}\ \text{km}\) North?`,
            fig: ['vectors', { vectors: [{ x: 0, y: va, label: 'v_{PA}', kind: 'a' }, { x: w, y: 0, label: 'v_{AG}', kind: 'b', tail: [0, va] }, { x: w, y: va, label: 'v_{PG}', kind: 'r' }], grid: false }],
            parts: [
              { label: '(a) Groundspeed', value: vg, unit: 'km/h' },
              { label: '(b) Direction (degrees East of North)', value: head, unit: '°' },
              { label: '(c) Time to go the distance North', value: t, unit: 'h' },
            ],
            hint: 'The plane\'s velocity relative to the ground is (plane relative to air) + (air relative to ground). These are perpendicular. For (c), which component moves you North?',
            steps: [
              T`North component \(= ${va}\ \text{km/h}\), East component \(= ${w}\ \text{km/h}\).`,
              T`(a) \(v = \sqrt{(${va})^2 + (${w})^2} = ${f(vg)}\ \text{km/h}\).`,
              T`(b) \(\theta = \tan^{-1}(v_E/v_N) = \tan^{-1}(${w}/${va}) = ${f(head)}^\circ\) East of North.`,
              T`(c) Only the North component matters: \(t = \Delta y/v_N = ${d}\ \text{km} / ${va}\ \text{km/h} = ${f(t)}\ \text{h}\).`,
            ],
          };
        },
      },
      {
        id: 'river-crossing',
        title: 'Boat crossing a river',
        gen(r) {
          const f = (x) => r.f(x);
          const w = r.num(60, 200, 0);
          const vb = r.num(2, 6, 1);
          const vc = r.num(1, 5, 1);
          const t = w / vb;
          const drift = vc * t;
          const v = Math.hypot(vb, vc);
          const ang = r.atan(vc, vb);
          return {
            question: T`A motorboat points straight across a \(${w}\ \text{m}\) wide river at \(${vb}\ \text{m/s}\) relative to the water. The current flows downstream at \(${vc}\ \text{m/s}\). Find (a) the time to cross, (b) how far downstream it lands, (c) its speed relative to the shore, and (d) the angle of its path measured from straight across.`,
            fig: ['river', { across: vb, down: vc, width: `${w} m` }],
            parts: [
              { label: '(a) Time to cross', value: t, unit: 's' },
              { label: '(b) Distance downstream', value: drift, unit: 'm' },
              { label: '(c) Speed relative to shore', value: v, unit: 'm/s' },
              { label: '(d) Angle downstream from straight across', value: ang, unit: '°' },
            ],
            hint: 'The two motions are independent. Crossing time uses only the across-river speed; the current just carries the boat downstream during that time.',
            steps: [
              T`(a) \(t = w / v_{\text{across}} = ${w}\ \text{m} / ${vb}\ \text{m/s} = ${f(t)}\ \text{s}\).`,
              T`(b) \(x = v_{\text{current}}\,t = (${vc}\ \text{m/s})(${f(t)}\ \text{s}) = ${f(drift)}\ \text{m}\).`,
              T`(c) \(v = \sqrt{(${vb})^2 + (${vc})^2} = ${f(v)}\ \text{m/s}\).`,
              T`(d) \(\theta = \tan^{-1}(v_{\text{current}}/v_{\text{across}}) = \tan^{-1}(${vc}/${vb}) = ${f(ang)}^\circ\).`,
            ],
          };
        },
      },
      {
        id: 'horizontal-launch',
        title: 'Horizontal launch from a height',
        gen(r) {
          const f = (x) => r.f(x);
          const v0 = r.num(10, 35, 1);
          const h = r.num(20, 150, 0);
          const t = Math.sqrt(2 * h / r.g);
          const x = v0 * t;
          const vy = r.g * t;
          const v = Math.hypot(v0, vy);
          const ang = r.atan(vy, v0);
          const what = r.pick([
            T`A rescue helicopter flying horizontally at \(${v0}\ \text{m/s}\) drops a relief package from \(${h}\ \text{m}\) above the sea.`,
            T`A car traveling at \(${v0}\ \text{m/s}\) drives straight off the edge of a \(${h}\ \text{m}\) high cliff.`,
            T`A ball is thrown horizontally at \(${v0}\ \text{m/s}\) from the top of a building \(${h}\ \text{m}\) tall.`,
          ]);
          return {
            question: T`${what} Ignore air resistance. Find (a) the time in the air, (b) the horizontal distance traveled, (c) the speed just before impact, and (d) the angle of the impact velocity below the horizontal.`,
            fig: ['projectile', { v0, angle: 0, h, components: true }],
            parts: [
              { label: '(a) Time in the air', value: t, unit: 's' },
              { label: '(b) Horizontal distance', value: x, unit: 'm' },
              { label: '(c) Impact speed', value: v, unit: 'm/s' },
              { label: '(d) Angle below horizontal', value: ang, unit: '°' },
            ],
            hint: T`Horizontal launch means \(v_{0y} = 0\). Get the time from the vertical drop alone, then use it for the horizontal distance.`,
            steps: [
              T`Knowns: \(v_{0x} = ${v0}\ \text{m/s}\), \(v_{0y} = 0\), drop \(h = ${h}\ \text{m}\), \(g = 9.80\ \text{m/s}^2\).`,
              T`(a) Equation: \(h = \tfrac12 g t^2\). Substitute: \(${h} = \tfrac12(9.80)t^2 \Rightarrow t = \sqrt{2(${h})/9.80} = ${f(t)}\ \text{s}\).`,
              T`(b) \(x = v_{0x}t = (${v0}\ \text{m/s})(${f(t)}\ \text{s}) = ${f(x)}\ \text{m}\).`,
              T`(c) \(v_x = ${v0}\ \text{m/s}\), \(v_y = gt = (9.80)(${f(t)}) = ${f(vy)}\ \text{m/s}\) down. \(v = \sqrt{${v0}^2 + ${f(vy)}^2} = ${f(v)}\ \text{m/s}\).`,
              T`(d) \(\theta = \tan^{-1}(v_y/v_x) = \tan^{-1}(${f(vy)}/${v0}) = ${f(ang)}^\circ\) below horizontal.`,
            ],
          };
        },
      },
      {
        id: 'dart-drop',
        title: 'Horizontal dart throw',
        gen(r) {
          const f = (x) => r.f(x);
          const d = r.num(2.5, 8, 1);
          const drop = r.num(0.10, 0.40, 2);
          const t = Math.sqrt(2 * drop / r.g);
          const v0 = d / t;
          return {
            question: T`A dart is thrown horizontally at a target \(${d}\ \text{m}\) away. It hits the board \(${drop}\ \text{m}\) below the point it was aimed at (the level line of release). Find (a) the time of flight and (b) the dart's launch speed.`,
            parts: [
              { label: '(a) Time of flight', value: t, unit: 's' },
              { label: '(b) Launch speed', value: v0, unit: 'm/s' },
            ],
            hint: 'The vertical drop tells you the time (it starts with no vertical velocity). Then the horizontal distance and time give the speed.',
            steps: [
              T`(a) Vertical: \(\Delta y = \tfrac12 g t^2 \Rightarrow ${drop}\ \text{m} = \tfrac12(9.80\ \text{m/s}^2)t^2\).`,
              T`\(t = \sqrt{2(${drop})/9.80} = ${f(t)}\ \text{s}\).`,
              T`(b) Horizontal: \(v_0 = x/t = ${d}\ \text{m} / ${f(t)}\ \text{s} = ${f(v0)}\ \text{m/s}\).`,
            ],
          };
        },
      },
      {
        id: 'level-kick',
        title: 'Angled launch on level ground',
        gen(r) {
          const f = (x) => r.f(x);
          const v0 = r.num(12, 30, 1);
          const th = r.num(20, 70, 0);
          const vx = v0 * r.cos(th), vy = v0 * r.sin(th);
          const H = vy * vy / (2 * r.g);
          const tt = 2 * vy / r.g;
          const R = vx * tt;
          const who = r.pick(['A soccer player kicks a ball', 'A golfer chips a ball', 'A student launches a water balloon']);
          return {
            question: T`${who} from level ground at \(${v0}\ \text{m/s}\), \(${th}^\circ\) above the horizontal. Find (a) the maximum height, (b) the total time in the air, and (c) the horizontal range.`,
            fig: ['projectile', { v0, angle: th, h: 0, components: true }],
            parts: [
              { label: '(a) Maximum height', value: H, unit: 'm' },
              { label: '(b) Time in the air', value: tt, unit: 's' },
              { label: '(c) Range', value: R, unit: 'm' },
            ],
            hint: T`Find \(v_{0x}\) and \(v_{0y}\) first. At max height \(v_y = 0\). On level ground the flight time is twice the time to the top.`,
            steps: [
              T`Components: \(v_{0x} = ${v0}\cos ${th}^\circ = ${f(vx)}\ \text{m/s}\), \(v_{0y} = ${v0}\sin ${th}^\circ = ${f(vy)}\ \text{m/s}\).`,
              T`(a) \(h_{\max} = \dfrac{v_{0y}^2}{2g} = \dfrac{(${f(vy)})^2}{2(9.80)} = ${f(H)}\ \text{m}\).`,
              T`(b) \(t = \dfrac{2v_{0y}}{g} = \dfrac{2(${f(vy)})}{9.80} = ${f(tt)}\ \text{s}\).`,
              T`(c) \(R = v_{0x}t = (${f(vx)}\ \text{m/s})(${f(tt)}\ \text{s}) = ${f(R)}\ \text{m}\).`,
            ],
          };
        },
      },
      {
        id: 'arrow-velocity',
        title: 'Arrow: apex distance and velocity mid-flight',
        gen(r) {
          const f = (x) => r.f(x);
          const v0 = r.num(30, 60, 1);
          const th = r.num(35, 65, 0);
          const vx = v0 * r.cos(th), vy0 = v0 * r.sin(th);
          const ttop = vy0 / r.g;
          let t;
          do { t = r.num(1, 3, 2); } while (t > 0.9 * ttop);
          const xtop = vx * ttop;
          const vy = vy0 - r.g * t;
          const v = Math.hypot(vx, vy);
          const ang = r.atan(vy, vx);
          return {
            question: T`An archer launches an arrow from ground level at \(${v0}\ \text{m/s}\), \(${th}^\circ\) above horizontal. (a) How far has it traveled horizontally when it reaches its maximum height? (b) Find the magnitude and (c) direction of its velocity at \(t = ${t}\ \text{s}\).`,
            fig: ['projectile', { v0, angle: th, h: 0, components: true }],
            parts: [
              { label: '(a) Horizontal distance at max height', value: xtop, unit: 'm' },
              { label: `(b) Speed at t = ${t} s`, value: v, unit: 'm/s' },
              { label: `(c) Angle above horizontal at t = ${t} s`, value: ang, unit: '°' },
            ],
            hint: T`Time to the top is \(v_{0y}/g\). For the velocity at a time, \(v_x\) never changes and \(v_y = v_{0y} - gt\).`,
            steps: [
              T`Components: \(v_{0x} = ${v0}\cos ${th}^\circ = ${f(vx)}\ \text{m/s}\), \(v_{0y} = ${v0}\sin ${th}^\circ = ${f(vy0)}\ \text{m/s}\).`,
              T`(a) \(t_{\text{top}} = v_{0y}/g = ${f(vy0)}/9.80 = ${f(ttop)}\ \text{s}\); \(x = v_{0x}t_{\text{top}} = (${f(vx)})(${f(ttop)}) = ${f(xtop)}\ \text{m}\).`,
              T`(b) \(v_x = ${f(vx)}\ \text{m/s}\); \(v_y = v_{0y} - gt = ${f(vy0)} - (9.80)(${t}) = ${f(vy)}\ \text{m/s}\) (still going up).`,
              T`\(v = \sqrt{(${f(vx)})^2 + (${f(vy)})^2} = ${f(v)}\ \text{m/s}\).`,
              T`(c) \(\theta = \tan^{-1}(v_y/v_x) = \tan^{-1}(${f(vy)}/${f(vx)}) = ${f(ang)}^\circ\) above horizontal.`,
            ],
          };
        },
      },
      {
        id: 'shot-landing-higher',
        title: 'Jump shot: landing higher than launch',
        gen(r) {
          const f = (x) => r.f(x);
          const x = r.num(4, 8, 2);
          const y = r.num(0.3, 1.2, 2);
          const th = r.num(40, 60, 0);
          const c = r.cos(th);
          const xt = x * r.tan(th);
          const v0sq = r.g * x * x / (2 * c * c * (xt - y));
          const v0 = Math.sqrt(v0sq);
          const t = x / (v0 * c);
          return {
            question: T`A basketball player shoots from a horizontal distance of \(${x}\ \text{m}\) from the hoop. The release point is \(${y}\ \text{m}\) below the rim. The ball is launched at \(${th}^\circ\) above horizontal. Find (a) the launch speed needed for the ball to go through the rim and (b) the flight time.`,
            parts: [
              { label: '(a) Required launch speed', value: v0, unit: 'm/s' },
              { label: '(b) Flight time', value: t, unit: 's' },
            ],
            hint: T`Write \(t = x/(v_0\cos\theta)\) from the horizontal motion and substitute it into \(y = v_0\sin\theta\,t - \tfrac12 g t^2\). Then solve for \(v_0\).`,
            steps: [
              T`Horizontal: \(t = \dfrac{x}{v_0\cos\theta}\). Substitute into the vertical equation: \(y = x\tan\theta - \dfrac{g x^2}{2v_0^2\cos^2\theta}\).`,
              T`Solve for \(v_0\): \(v_0^2 = \dfrac{g x^2}{2\cos^2\theta\,(x\tan\theta - y)}\).`,
              T`Numbers: \(x\tan\theta = ${x}\tan ${th}^\circ = ${f(xt)}\ \text{m}\); \(x\tan\theta - y = ${f(xt - y)}\ \text{m}\); \(\cos^2\theta = ${f(c * c)}\).`,
              T`\(v_0^2 = \dfrac{(9.80)(${x})^2}{2(${f(c * c)})(${f(xt - y)})} = ${f(v0sq)} \Rightarrow v_0 = ${f(v0)}\ \text{m/s}\).`,
              T`(b) \(t = \dfrac{x}{v_0\cos\theta} = \dfrac{${x}}{(${f(v0)})(${f(c)})} = ${f(t)}\ \text{s}\).`,
            ],
          };
        },
      },
      {
        id: 'cliff-landing-lower',
        title: 'Launch from a cliff, landing lower',
        gen(r) {
          const f = (x) => r.f(x);
          const v0 = r.num(15, 40, 1);
          const th = r.num(20, 60, 0);
          const h = r.num(50, 200, 0);
          const vx = v0 * r.cos(th), vy0 = v0 * r.sin(th);
          const disc = Math.sqrt(vy0 * vy0 + 2 * r.g * h);
          const t = (vy0 + disc) / r.g;
          const X = vx * t;
          const vy = vy0 - r.g * t;
          const v = Math.hypot(vx, vy);
          const ang = r.atan(-vy, vx);
          const what = r.pick([
            T`During an eruption, a boulder is launched from a crater rim \(${h}\ \text{m}\) above the valley floor`,
            T`A ball is kicked off the top of a \(${h}\ \text{m}\) cliff`,
          ]);
          return {
            question: T`${what} at \(${v0}\ \text{m/s}\), \(${th}^\circ\) above horizontal. Find (a) the time in the air, (b) the horizontal range, (c) the impact speed, and (d) the angle of impact below horizontal.`,
            fig: ['projectile', { v0, angle: th, h, components: false }],
            parts: [
              { label: '(a) Time in the air', value: t, unit: 's' },
              { label: '(b) Horizontal range', value: X, unit: 'm' },
              { label: '(c) Impact speed', value: v, unit: 'm/s' },
              { label: '(d) Angle below horizontal', value: ang, unit: '°' },
            ],
            hint: T`The range formula doesn't work here. Put the ground at \(y = 0\) and the launch at \(y_0 = ${h}\ \text{m}\), then solve \(0 = y_0 + v_{0y}t - 4.90t^2\) with the quadratic formula.`,
            steps: [
              T`Components: \(v_{0x} = ${v0}\cos ${th}^\circ = ${f(vx)}\ \text{m/s}\), \(v_{0y} = ${v0}\sin ${th}^\circ = ${f(vy0)}\ \text{m/s}\).`,
              T`(a) \(0 = ${h} + ${f(vy0)}t - 4.90t^2 \Rightarrow 4.90t^2 - ${f(vy0)}t - ${h} = 0\).`,
              T`\(t = \dfrac{${f(vy0)} + \sqrt{(${f(vy0)})^2 + 4(4.90)(${h})}}{2(4.90)} = \dfrac{${f(vy0)} + ${f(disc)}}{9.80} = ${f(t)}\ \text{s}\) (positive root).`,
              T`(b) \(x = v_{0x}t = (${f(vx)})(${f(t)}) = ${f(X)}\ \text{m}\).`,
              T`(c) \(v_y = v_{0y} - gt = ${f(vy0)} - (9.80)(${f(t)}) = ${f(vy)}\ \text{m/s}\). \(v = \sqrt{(${f(vx)})^2 + (${f(vy)})^2} = ${f(v)}\ \text{m/s}\).`,
              T`(d) \(\theta = \tan^{-1}(|v_y|/v_x) = \tan^{-1}(${f(-vy)}/${f(vx)}) = ${f(ang)}^\circ\) below horizontal.`,
            ],
          };
        },
      },
      {
        id: 'drone-cart',
        title: 'Drone interception',
        gen(r) {
          const f = (x) => r.f(x);
          const v0 = r.num(20, 40, 0);
          const th = r.num(40, 75, 0);
          const vx = v0 * r.cos(th), vy = v0 * r.sin(th);
          const t = 2 * vy / r.g;
          const R = vx * t;
          const D = Math.ceil(R / 10) * 10 + 10 * r.int(1, 4);
          const gap = D - R;
          const a = 2 * gap / (t * t);
          return {
            question: T`A stunt drone is launched from the ground at the origin at \(${th}^\circ\) above horizontal with speed \(${v0}\ \text{m/s}\). At the same instant, a cart starts from rest at \(x = ${D}\ \text{m}\) and accelerates toward the launch site. Find (a) the drone's time in the air, (b) its horizontal range, and (c) the cart's acceleration needed to arrive exactly as the drone lands.`,
            fig: ['projectile', { v0, angle: th, h: 0, components: false }],
            parts: [
              { label: '(a) Drone time in the air', value: t, unit: 's' },
              { label: '(b) Drone horizontal range', value: R, unit: 'm' },
              { label: '(c) Cart acceleration (magnitude)', value: a, unit: 'm/s²' },
            ],
            hint: T`Solve the drone like any level-ground launch. The cart starts from rest and has to cover \(${D}\ \text{m} - R\) in the same time: \(\Delta x = \tfrac12 a t^2\).`,
            steps: [
              T`Components: \(v_{0x} = ${v0}\cos ${th}^\circ = ${f(vx)}\ \text{m/s}\), \(v_{0y} = ${v0}\sin ${th}^\circ = ${f(vy)}\ \text{m/s}\).`,
              T`(a) \(t = 2v_{0y}/g = 2(${f(vy)})/9.80 = ${f(t)}\ \text{s}\).`,
              T`(b) \(R = v_{0x}t = (${f(vx)})(${f(t)}) = ${f(R)}\ \text{m}\).`,
              T`(c) Cart distance: \(\Delta x = ${D} - ${f(R)} = ${f(gap)}\ \text{m}\). From rest: \(\Delta x = \tfrac12 a t^2 \Rightarrow a = \dfrac{2(${f(gap)})}{(${f(t)})^2} = ${f(a)}\ \text{m/s}^2\).`,
            ],
          };
        },
      },
      {
        id: 'baseball-wall',
        title: 'Baseball vs. the outfield wall',
        gen(r) {
          const f = (x) => r.f(x);
          const v0 = r.num(35, 55, 0);
          const th = r.num(25, 40, 0);
          const vx = v0 * r.cos(th), vy = v0 * r.sin(th);
          const Rng = vx * 2 * vy / r.g;
          const D = r.num(0.5 * Rng, 0.9 * Rng, 0);
          const t = D / vx;
          const y = vy * t - 0.5 * r.g * t * t;
          return {
            question: T`A baseball is hit from ground level at \(${v0}\ \text{m/s}\), \(${th}^\circ\) above horizontal. A wall is \(${D}\ \text{m}\) away. (a) How long does the ball take to reach the plane of the wall? (b) How high above the base of the wall is the ball at that moment?`,
            fig: ['projectile', { v0, angle: th, h: 0, components: false }],
            parts: [
              { label: '(a) Time to reach the wall', value: t, unit: 's' },
              { label: '(b) Height at the wall', value: y, unit: 'm' },
            ],
            hint: T`Horizontal motion is constant velocity, so \(t = x/v_{0x}\). Plug that time into the vertical equation.`,
            steps: [
              T`Components: \(v_{0x} = ${v0}\cos ${th}^\circ = ${f(vx)}\ \text{m/s}\), \(v_{0y} = ${v0}\sin ${th}^\circ = ${f(vy)}\ \text{m/s}\).`,
              T`(a) \(t = x/v_{0x} = ${D}\ \text{m} / ${f(vx)}\ \text{m/s} = ${f(t)}\ \text{s}\).`,
              T`(b) \(y = v_{0y}t - \tfrac12 g t^2 = (${f(vy)})(${f(t)}) - 4.90(${f(t)})^2 = ${f(y)}\ \text{m}\).`,
            ],
          };
        },
      },
    ],
  };
})();

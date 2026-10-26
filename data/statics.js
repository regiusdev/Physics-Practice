// Torque & Statics (Giancoli Ch. 9, plus rotational inertia and angular momentum ideas from class)
// Format: see docs/CONTENT-GUIDE.md. Math goes in \( \) or \[ \] inside T`...` strings.
(() => {
  const T = String.raw;

  window.UNIT_DATA = window.UNIT_DATA || {};
  window.UNIT_DATA['statics'] = {
    summary: 'Why things turn, and how to keep them from turning: torque, lever arms, center of mass, and objects in static equilibrium.',

    formulas: [
      { name: 'Torque', tex: T`\tau = rF\sin\theta`, note: 'θ is the angle between r (pivot to where the force acts) and the force.' },
      { name: 'Torque with the lever arm', tex: T`\tau = F\,r_\perp \qquad r_\perp = r\sin\theta`, note: 'Lever arm = perpendicular distance from the pivot to the line of the force.' },
      { name: 'Static equilibrium', tex: T`\Sigma F_x = 0 \qquad \Sigma F_y = 0 \qquad \Sigma \tau = 0`, note: 'Three equations, so you can solve for up to three unknowns.' },
      { name: 'Sign convention', tex: T`\text{CCW} \Rightarrow +\tau \qquad \text{CW} \Rightarrow -\tau`, note: 'Or just set (sum of CW torques) = (sum of CCW torques).' },
      { name: 'Center of mass', tex: T`x_{cm} = \frac{m_1x_1 + m_2x_2 + \dots}{m_1 + m_2 + \dots}`, note: "A uniform beam's weight acts at its center." },
      { name: "Newton's 2nd law for rotation", tex: T`\tau_{net} = I\alpha`, note: 'Unbalanced torque causes angular acceleration (conceptual for us).' },
      { name: 'Rotational inertia', tex: T`I = \Sigma\, m r^2`, note: 'Mass farther from the axis counts more (distance squared).' },
      { name: 'Angular velocity and acceleration', tex: T`\omega = \frac{v}{r} \qquad \alpha = \frac{a_t}{r}` },
      { name: 'Angular momentum', tex: T`L = I\omega` },
      { name: 'Conservation of angular momentum', tex: T`I_1\omega_1 = I_2\omega_2`, note: 'When no outside torque acts (skater pulling arms in).' },
    ],

    concepts: [
      {
        title: 'Rotational inertia: mass AND where it is',
        body: T`<p>Mass measures how hard it is to change straight-line motion. <strong>Rotational inertia</strong> \(I\) measures how hard it is to change spinning. It depends on the total mass <em>and</em> how far that mass sits from the axis: \(I\) goes as (mass)·(distance)².</p>
          <p>A wood bat is harder to swing than a wiffle bat; choking up on a bat makes it easier. A tightrope walker's long pole has a huge \(I\), so the walker tips over slowly enough to correct. A hoop and a disk of the same mass race down a ramp: the hoop (all mass at the rim) has more \(I\), so it rolls slower and the disk wins.</p>`,
      },
      {
        title: 'Torque: force × lever arm',
        body: T`<p>A force makes something rotate only if it has a <strong>lever arm</strong>. Torque depends on the size of the force, its direction, and where it's applied:</p>
          \[\tau = rF\sin\theta = F\,r_\perp\]
          <p>Push a door near the knob and straight in: big torque. Push right next to the hinge, or push straight toward the hinge: zero lever arm, zero torque, the door doesn't move. A 120 N push at the end of a 20 cm wrench gives \((120)(0.20) = 24\ \text{N·m}\).</p>`,
        fig: ['beam', { length: 1, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: 1, label: 'F', kind: 'arrow' }], dims: true }],
      },
      {
        title: 'Balanced torques: the seesaw',
        body: T`<p>Just like \(\Sigma F = 0\) means no linear acceleration, \(\Sigma\tau = 0\) means no angular acceleration. On a seesaw the clockwise torque from one kid must equal the counterclockwise torque from the other:</p>
          \[m_1 g\,d_1 = m_2 g\,d_2\]
          <p>A heavier person balances by sitting closer to the pivot.</p>`,
        fig: ['beam', { length: 4, supports: [{ x: 2, kind: 'pivot' }], loads: [{ x: 0.5, label: 'm₁', kind: 'person' }, { x: 3, label: 'm₂', kind: 'person' }], dims: true }],
      },
      {
        title: 'Static equilibrium: three equations',
        body: T`<p>An object in static equilibrium has no linear and no angular acceleration, so</p>
          \[\Sigma F_x = 0 \qquad \Sigma F_y = 0 \qquad \Sigma\tau = 0\]
          <p>Recipe: <strong>draw the FBD</strong> (include the beam's own weight at its center), <strong>pick a pivot</strong>, write the torque equation, then use the force equations for whatever is left. Equation → substitution (numbers and units) → answer (with units).</p>`,
        fig: ['beam', { length: 4, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: 2, label: 'm_rod g', kind: 'arrow' }, { x: 3.2, label: 'Mg', kind: 'mass' }], strut: { x: 4, angle: 30, label: 'T' }, dims: true }],
      },
      {
        title: 'Picking the pivot point',
        body: T`<p>In static equilibrium the torques add to zero about <em>any</em> point, so you get to choose. Pick the point where an <strong>unknown force acts</strong> (a hinge, a support cable, the foot of a ladder). That force has zero lever arm there and drops out of the torque equation, leaving fewer unknowns.</p>
          <p>For a hinge, remember the hinge force has <strong>two components</strong> (horizontal and vertical). Putting the pivot at the hinge kills both at once.</p>`,
      },
      {
        title: 'Center of mass and center of gravity',
        body: T`<p>The <strong>center of mass</strong> is the average position of all the mass; the <strong>center of gravity</strong> is where the weight effectively acts. Near Earth they're the same spot. Balance an object on your finger and your finger is right under the CG.</p>
          \[x_{cm} = \frac{\Sigma\, m x}{\Sigma\, m}\]
          <p>The CG is pulled toward the heavier side, so it's usually <em>not</em> the midpoint.</p>`,
        fig: ['beam', { length: 1, supports: [{ x: 0.62, kind: 'finger' }], loads: [{ x: 0.2, label: 'm₁', kind: 'mass' }, { x: 0.5, label: 'm₂', kind: 'mass' }, { x: 0.9, label: 'm₃', kind: 'mass' }] }],
      },
      {
        title: 'Stability',
        body: T`<p>An object is stable as long as its center of gravity is above its base. Tip it until a vertical line through the CG falls outside the base and gravity's torque tips it the rest of the way over.</p>
          <p>That's why athletes stay low with a wide stance: low CG, big base. Trucks parked on a slope tip over when the CG is high enough that its vertical line misses the wheels.</p>`,
      },
      {
        title: 'Ladders against a wall',
        body: T`<p>A classic statics setup. Forces on the ladder: weight at its center, the person's weight, the wall's push \(F_W\) (horizontal if the wall is frictionless), and the floor's normal force and friction. Take torques about the <strong>foot</strong> of the ladder: the floor forces drop out.</p>
          <p>Friction at the floor must equal \(F_W\). The higher someone climbs, the bigger \(F_W\) gets, so the more friction is needed; that's when ladders slip. For a uniform ladder alone: \(\theta_{min} = \tan^{-1}\!\left(\frac{1}{2\mu_s}\right)\).</p>`,
        fig: ['ladder', { angle: 60, person: 0.7, forces: true }],
      },
      {
        title: 'Angular momentum',
        body: T`<p>Linear momentum is \(mv\); angular momentum is \(L = I\omega\). With no outside torque, \(L\) stays constant.</p>
          <p>A spinning skater pulls in her arms: \(I\) drops, so \(\omega\) rises (spins faster). A helicopter's main rotor spins one way, so the body would spin the other way; the small tail rotor pushes sideways to make a balancing torque.</p>`,
      },
    ],

    sims: ['torque-balance'],

    mistakes: [
      {
        title: 'Using the full distance instead of the lever arm',
        wrong: T`Multiplying force by the distance along the beam even when the force pulls at an angle.`,
        right: T`Only the perpendicular part counts: \(\tau = rF\sin\theta\). A wire at 30° to a beam gives \(rT\sin30^\circ\), half of \(rT\).`,
      },
      {
        title: "Forgetting the beam's own weight",
        wrong: T`Only drawing the hanging masses and cables on the beam.`,
        right: T`A uniform beam has weight \(m_{beam}g\) acting at its center. Put it on the FBD and in the torque sum.`,
      },
      {
        title: 'Mixing up CW and CCW',
        wrong: T`Adding all torques as positive.`,
        right: T`Pick a convention (CCW +, CW −), or write (sum of CW torques) = (sum of CCW torques). A cable holding a beam up and the weights pulling it down turn it opposite ways.`,
      },
      {
        title: 'Choosing a pivot with two unknowns on it',
        wrong: T`Taking torques about the middle of the beam, so both cable tensions are still in the equation.`,
        right: T`Put the pivot where an unknown acts (a cable, hinge, or ladder foot). That force drops out of the torque equation.`,
      },
      {
        title: 'sin vs. cos for the angle',
        wrong: T`Using \(\cos\theta\) in the torque because "that's what the horizontal part uses".`,
        right: T`Find the angle between the force and the beam (r). Torque uses \(\sin\) of <em>that</em> angle. If the angle you're given is measured from the other direction, use \(\cos\).`,
      },
      {
        title: 'Forgetting the hinge pushes in two directions',
        wrong: T`Treating a hinge or pivot force as purely vertical.`,
        right: T`A hinge can push horizontally and vertically. Solve \(\Sigma F_x = 0\) and \(\Sigma F_y = 0\) for both parts, then combine: \(F = \sqrt{F_x^2 + F_y^2}\).`,
      },
      {
        title: 'Calling torque "work" (joules)',
        wrong: T`Writing torque in joules because N·m looks like work.`,
        right: T`Torque is written in N·m (newton-meters), never joules. Same units, totally different idea.`,
      },
      {
        title: 'Assuming the center of mass is the midpoint',
        wrong: T`Balancing a stick with unequal masses at its middle.`,
        right: T`The CM shifts toward the heavier mass: \(x_{cm} = \Sigma mx / \Sigma m\). Only a uniform object with nothing attached balances at its middle.`,
      },
    ],

    examples: [
      {
        title: 'Balancing a stick with two masses',
        source: 'Torque practice',
        problem: T`A thin, light wooden stick 2.00 m long has a \(0.15\ \text{kg}\) mass at one end and a \(0.90\ \text{kg}\) mass at the other. Where should a string be attached so the stick hangs level?`,
        fig: ['beam', { length: 2, supports: [{ x: 1.71, kind: 'cable', label: 'T' }], loads: [{ x: 0, label: '0.15 kg', kind: 'mass' }, { x: 2, label: '0.90 kg', kind: 'mass' }] }],
        steps: [
          T`Pick the origin at the 0.15 kg end. The string must be at the center of mass.`,
          T`Equation: \(x_{cm} = \dfrac{m_1x_1 + m_2x_2}{m_1 + m_2}\)`,
          T`Substitution: \(x_{cm} = \dfrac{(0.15\ \text{kg})(0) + (0.90\ \text{kg})(2.00\ \text{m})}{0.15\ \text{kg} + 0.90\ \text{kg}}\)`,
          T`Answer: \(x_{cm} = 1.71\ \text{m}\) from the light end (0.29 m from the heavy end).`,
        ],
        answer: T`\(1.71\ \text{m}\) from the 0.15 kg end`,
      },
      {
        title: 'Pole with a support wire',
        source: 'Statics practice',
        problem: T`A uniform 4.0 m pole of mass \(120\ \text{kg}\) is hinged to a wall at A and held level by a wire attached to its far end at \(30^\circ\) above the horizontal. A \(200\ \text{kg}\) mass hangs 3.2 m from the wall. Find (a) the tension in the wire and (b) the magnitude and direction of the force on the pivot.`,
        fig: ['beam', { length: 4, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: 2, label: '120 kg', kind: 'arrow' }, { x: 3.2, label: '200 kg', kind: 'mass' }], strut: { x: 4, angle: 30, label: 'T' }, dims: true }],
        steps: [
          T`FBD: wire tension \(T\) at the end, pole weight at 2.0 m, the 200 kg weight at 3.2 m, hinge force \((F_x, F_y)\) at A. Pivot at A.`,
          T`\(\Sigma\tau_A = 0\): \(T\sin30^\circ(4.0) = (120)(9.80)(2.0) + (200)(9.80)(3.2)\)`,
          T`\(2.0\,T = 2352 + 6272 = 8624 \Rightarrow T = 4312\ \text{N} \approx 4.3\times10^3\ \text{N}\)`,
          T`\(\Sigma F_x = 0\): \(F_x = T\cos30^\circ = 3734\ \text{N}\) (pushing away from the wall).`,
          T`\(\Sigma F_y = 0\): \(F_y = (320)(9.80) - T\sin30^\circ = 3136 - 2156 = 980\ \text{N}\) (up).`,
          T`\(F = \sqrt{3734^2 + 980^2} = 3861\ \text{N}\), at \(\tan^{-1}(980/3734) = 14.7^\circ\) above horizontal.`,
        ],
        answer: T`(a) \(T \approx 4310\ \text{N}\); (b) \(F \approx 3860\ \text{N}\) at \(14.7^\circ\) above horizontal, away from the wall`,
      },
      {
        title: 'Scaffold with two cables',
        source: 'Statics practice',
        problem: T`A uniform 40.0 kg scaffold 6.0 m long hangs from a cable at each end. An 80.0 kg painter stands 1.0 m from the left end, and his equipment is 1.5 m from the right end. The tension in the left cable is twice that in the right cable. Find both tensions and the mass of the equipment.`,
        fig: ['beam', { length: 6, supports: [{ x: 0, kind: 'cable', label: 'T_L' }, { x: 6, kind: 'cable', label: 'T_R' }], loads: [{ x: 1, label: '80 kg', kind: 'person' }, { x: 3, label: '40 kg', kind: 'arrow' }, { x: 4.5, label: 'm', kind: 'mass' }], dims: true }],
        steps: [
          T`Unknowns: \(T_R\) and \(m\) (with \(T_L = 2T_R\)). Pivot at the left cable.`,
          T`\(\Sigma F_y = 0\): \(2T_R + T_R = (40 + 80 + m)g \Rightarrow 3T_R = (120 + m)g\)`,
          T`\(\Sigma\tau_{left} = 0\): \(T_R(6.0) = (40g)(3.0) + (80g)(1.0) + (mg)(4.5)\)`,
          T`Sub \(T_R = (120+m)g/3\): \(2(120 + m) = 200 + 4.5m \Rightarrow m = 16.0\ \text{kg}\)`,
          T`\(T_R = (136)(9.80)/3 = 444\ \text{N}\), \(T_L = 2T_R = 889\ \text{N}\)`,
        ],
        answer: T`\(T_L \approx 889\ \text{N}\), \(T_R \approx 444\ \text{N}\), \(m = 16.0\ \text{kg}\)`,
      },
      {
        title: 'Holding your arm out (deltoid)',
        source: 'Giancoli 9-34',
        problem: T`Your 3.3 kg arm is held straight out. Its center of mass is 24 cm from the shoulder joint. The deltoid muscle attaches 12 cm from the shoulder and pulls at \(15^\circ\) above the arm. Find (a) the muscle force \(F_M\) and (b) the force \(F_J\) from the shoulder joint.`,
        fig: ['beam', { length: 0.6, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: 0.24, label: 'mg', kind: 'arrow' }], strut: { x: 0.12, angle: 15, label: 'F_M' }, dims: true }],
        steps: [
          T`Pivot at the shoulder joint, so \(F_J\) drops out.`,
          T`\(\Sigma\tau = 0\): \(F_M\sin15^\circ(0.12\ \text{m}) = (3.3\ \text{kg})(9.80\ \text{m/s}^2)(0.24\ \text{m})\)`,
          T`\(F_M = \dfrac{7.76}{0.0311} = 250\ \text{N}\) (more than 7× the arm's weight!)`,
          T`\(F_{Jx} = F_M\cos15^\circ = 241\ \text{N}\); \(F_{Jy} = F_M\sin15^\circ - mg = 64.7 - 32.3 = 32.3\ \text{N}\)`,
          T`\(F_J = \sqrt{241^2 + 32.3^2} = 244\ \text{N}\)`,
        ],
        answer: T`(a) \(F_M \approx 250\ \text{N}\); (b) \(F_J \approx 240\ \text{N}\)`,
      },
      {
        title: 'Mobile in balance',
        source: 'Giancoli 9-78',
        problem: T`A mobile is in equilibrium. Object B has mass 0.748 kg. Top bar: A hangs 30.00 cm left of the string; the lower part hangs 7.50 cm right. Middle bar: the bottom bar hangs 15.00 cm left of its string, B hangs 5.00 cm right. Bottom bar: D hangs 17.50 cm left, C hangs 5.00 cm right. Find the masses of A, C, and D (ignore the bars' weights).`,
        steps: [
          T`Each bar is a seesaw: (mass on left)(left distance) = (mass on right)(right distance).`,
          T`Middle bar: \((m_C + m_D)(15.00) = (0.748)(5.00) \Rightarrow m_C + m_D = 0.2493\ \text{kg}\)`,
          T`Bottom bar: \(m_D(17.50) = m_C(5.00) \Rightarrow m_C = 3.5\,m_D\), so \(4.5\,m_D = 0.2493\)`,
          T`\(m_D = 0.0554\ \text{kg}\), \(m_C = 0.194\ \text{kg}\)`,
          T`Top bar: \(m_A(30.00) = (0.748 + 0.2493)(7.50) \Rightarrow m_A = 0.249\ \text{kg}\)`,
        ],
        answer: T`\(m_A = 0.249\ \text{kg}\), \(m_C = 0.194\ \text{kg}\), \(m_D = 0.0554\ \text{kg}\)`,
      },
      {
        title: 'Painter on a ladder',
        source: 'Giancoli Fig. 9-94',
        problem: T`A uniform 12.0 kg ladder leans against a frictionless wall. Its foot is 3.0 m from the wall and its top touches the wall 4.0 m up. It begins to slip when a 55.0 kg painter is 70% of the way up (2.1 m horizontally from the foot). What is \(\mu_s\) between the ladder and the floor?`,
        fig: ['ladder', { angle: 53, person: 0.7, forces: true }],
        steps: [
          T`Forces: wall push \(F_W\) (horizontal), floor normal \(F_N\) and friction \(F_{fr}\), ladder weight at its middle (1.5 m out), painter's weight 2.1 m out. Pivot at the foot.`,
          T`\(\Sigma\tau = 0\): \(F_W(4.0) = (12.0)(9.80)(1.5) + (55.0)(9.80)(2.1)\) → \(F_W = 327\ \text{N}\)`,
          T`\(\Sigma F_x = 0\): \(F_{fr} = F_W = 327\ \text{N}\). \(\Sigma F_y = 0\): \(F_N = (67.0)(9.80) = 657\ \text{N}\)`,
          T`About to slip, so friction is at its max: \(\mu_s = \dfrac{F_{fr}}{F_N} = \dfrac{327}{657} = 0.50\)`,
        ],
        answer: T`\(\mu_s \approx 0.50\)`,
      },
      {
        title: 'Door on two hinges',
        source: 'Door question',
        problem: T`A uniform 400.0 N door, 1.0 m wide, hangs on hinges A (top) and B (bottom) that are 2.00 m apart. Each hinge holds half the weight. Find the force on each hinge.`,
        steps: [
          T`Vertical: each hinge holds half: \(F_{Ay} = F_{By} = 200\ \text{N}\).`,
          T`The door's weight acts 0.50 m out from the hinge line and tries to swing the top away from the wall. Pivot at B.`,
          T`\(\Sigma\tau_B = 0\): \(F_{Ax}(2.00) = (400.0)(0.50) \Rightarrow F_{Ax} = 100\ \text{N}\) (pulling the door toward the wall).`,
          T`\(\Sigma F_x = 0\): \(F_{Bx} = 100\ \text{N}\) (pushing the door away from the wall).`,
          T`Each hinge: \(F = \sqrt{200^2 + 100^2} = 224\ \text{N}\)`,
        ],
        answer: T`Each hinge: 200 N up and 100 N sideways (top pulls in, bottom pushes out), total \(\approx 224\ \text{N}\)`,
      },
      {
        title: 'Classroom rod and wire lab',
        source: 'Tension in Strings lab',
        problem: T`A 0.90 m rod (0.692 kg, uniform) is hinged to a wall. A 0.0842 kg clamp sits 0.64 m out, and a wire runs from the clamp to the wall 0.575 m above the rod. A 1.00 kg mass hangs 0.79 m out. Find the wire tension.`,
        fig: ['beam', { length: 0.9, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: 0.45, label: 'rod', kind: 'arrow' }, { x: 0.79, label: '1 kg', kind: 'mass' }], strut: { x: 0.64, angle: 42, label: 'T' }, dims: true }],
        steps: [
          T`Wire angle: \(\theta = \tan^{-1}(0.575/0.64) = 41.9^\circ\) above the rod.`,
          T`Pivot at the hinge: \(T\sin\theta(0.64) = g[(0.692)(0.45) + (0.0842)(0.64) + (1.00)(0.79)]\)`,
          T`\(T(0.668)(0.64) = (9.80)(1.155) = 11.32\ \text{N·m}\)`,
          T`\(T = 11.32 / 0.428 = 26.5\ \text{N}\). Does physics work? Compare to your spring scale!`,
        ],
        answer: T`\(T \approx 26.5\ \text{N}\)`,
      },
    ],

    quiz: [
      {
        q: T`Where should you push on a door to open it with the least force?`,
        choices: ['Near the hinges', 'In the middle', 'At the edge farthest from the hinges', "It doesn't matter"],
        answer: 2,
        explain: T`Torque = force × lever arm. The farthest point gives the biggest lever arm, so the same torque needs the least force.`,
        why: { 0: 'Near the hinge the lever arm is tiny, so you need a huge force.', 3: 'Same force, different lever arm, different torque.' },
      },
      {
        q: T`You push hard on the edge of a door, but straight toward the hinges. What happens?`,
        choices: ['It opens quickly', 'It opens slowly', 'Nothing: the torque is zero', 'It closes'],
        answer: 2,
        explain: T`The force's line passes through the hinge, so the lever arm is zero and \(\tau = 0\).`,
        why: { 0: 'A big force with zero lever arm still makes zero torque.' },
      },
      {
        q: T`A 120 N force is applied perpendicular to the end of a 20 cm wrench. What is the torque?`,
        choices: [T`\(6\ \text{N·m}\)`, T`\(24\ \text{N·m}\)`, T`\(2400\ \text{N·m}\)`, T`\(600\ \text{N·m}\)`],
        answer: 1,
        explain: T`\(\tau = rF = (0.20\ \text{m})(120\ \text{N}) = 24\ \text{N·m}\).`,
        why: { 2: 'Convert 20 cm to 0.20 m first.', 0: 'Multiply, don’t divide: τ = rF.' },
      },
      {
        q: T`The same 120 N force on the same 20 cm wrench now acts at \(30^\circ\) to the wrench. The torque is now`,
        choices: [T`\(24\ \text{N·m}\)`, T`\(20.8\ \text{N·m}\)`, T`\(12\ \text{N·m}\)`, T`\(0\)`],
        answer: 2,
        explain: T`\(\tau = rF\sin\theta = (0.20)(120)\sin30^\circ = 12\ \text{N·m}\). Only the perpendicular part of the force turns the wrench.`,
        why: { 1: T`That used \(\cos30^\circ\). The angle is between the force and the wrench, so use sine.`, 0: 'Angling the force cuts the torque.' },
      },
      {
        q: T`The lever arm of a force is`,
        choices: ['The length of the object', 'The distance from the pivot to where the force acts', 'The perpendicular distance from the pivot to the line of the force', 'The size of the force'],
        answer: 2,
        explain: T`Lever arm \(r_\perp = r\sin\theta\): the perpendicular distance from the axis to the force's line of action.`,
        why: { 1: T`That's \(r\). The lever arm is only the perpendicular part, \(r\sin\theta\).` },
      },
      {
        q: T`A 30 kg child sits 2.0 m from a seesaw's pivot. Where must a 60 kg parent sit on the other side to balance?`,
        choices: ['4.0 m', '2.0 m', '1.0 m', '0.5 m'],
        answer: 2,
        explain: T`\(m_1d_1 = m_2d_2\): \((30)(2.0) = (60)d \Rightarrow d = 1.0\ \text{m}\). Twice the mass, half the distance.`,
        why: { 0: 'Farther out would make the parent’s torque even bigger.' },
      },
      {
        q: T`Rotational inertia depends on`,
        choices: ['Only the mass', 'Only the shape', 'The mass and how it is distributed relative to the axis', 'Only how fast it spins'],
        answer: 2,
        explain: T`\(I = \Sigma mr^2\): both how much mass and how far it is from the axis.`,
      },
      {
        q: T`Why do batters "choke up" (grip higher) on a bat?`,
        choices: ['To make the bat lighter', 'To reduce its rotational inertia so it swings faster', 'To increase its rotational inertia', 'To lower its center of mass'],
        answer: 1,
        explain: T`Moving your hands toward the heavy end puts more of the mass closer to the pivot, lowering \(I\), so the bat is easier to rotate.`,
        why: { 0: 'The mass is the same; only the axis moves.' },
      },
      {
        q: T`A tightrope walker carries a long pole because it`,
        choices: ['Lowers their weight', 'Increases their rotational inertia, so they tip more slowly', 'Decreases their rotational inertia', 'Moves the center of gravity above the rope by magic'],
        answer: 1,
        explain: T`Mass spread far from the axis means large \(I\). A large \(I\) means a small angular acceleration for the same torque, giving the walker time to correct.`,
      },
      {
        q: T`A hoop and a solid disk with the same mass and radius roll down the same ramp. Which reaches the bottom first?`,
        choices: ['The hoop', 'The disk', 'They tie', 'Depends on the mass'],
        answer: 1,
        explain: T`The hoop's mass is all at the rim, so it has more rotational inertia and spins up more slowly. The disk wins.`,
        why: { 2: 'They would tie if they slid without rolling. Rolling makes I matter.' },
      },
      {
        q: T`It's easier to balance a hammer upright on your finger with`,
        choices: ['The heavy head on top', 'The heavy head on your finger', 'No difference', 'The hammer held horizontally'],
        answer: 0,
        explain: T`Head on top puts the mass far from the pivot (your finger): larger rotational inertia, so it tips more slowly and you have time to react.`,
      },
      {
        q: T`A spinning ice skater pulls her arms in. What happens?`,
        choices: ['She spins slower; L decreases', 'She spins faster; L stays the same', 'She spins faster; L increases', 'Nothing changes'],
        answer: 1,
        explain: T`No outside torque, so \(L = I\omega\) is constant. Pulling in lowers \(I\), so \(\omega\) goes up.`,
        why: { 2: 'Angular momentum is conserved; it is ω that increases, not L.' },
      },
      {
        q: T`A skater's rotational inertia drops to half its original value. Her spin rate`,
        choices: ['Halves', 'Stays the same', 'Doubles', 'Quadruples'],
        answer: 2,
        explain: T`\(I_1\omega_1 = I_2\omega_2\): halving \(I\) doubles \(\omega\).`,
      },
      {
        q: T`What is the job of a helicopter's small tail rotor?`,
        choices: ['Extra lift', 'Steering forward', "Producing a torque that stops the body from spinning opposite the main rotor", 'Cooling the engine'],
        answer: 2,
        explain: T`Spinning the main rotor one way would spin the body the other way (angular momentum). The tail rotor's sideways push makes a balancing torque.`,
      },
      {
        q: T`An object resting on a base will tip over when`,
        choices: ['Its mass is too large', 'A vertical line through its center of gravity falls outside its base', 'Its center of gravity is above the base', 'It is on any slope'],
        answer: 1,
        explain: T`As long as the CG is over the base, gravity's torque pushes it back. Once the CG line misses the base, gravity tips it over.`,
      },
      {
        q: T`Three identical-looking trucks are parked on a slope, each loaded so its CG is at a different height. Which tips over?`,
        choices: ['The one with the lowest CG', 'The one whose CG line falls outside its wheels', 'All of them', 'None of them'],
        answer: 1,
        explain: T`On a slope, a high CG shifts its vertical line downhill. If that line falls outside the wheelbase, that truck tips.`,
      },
      {
        q: T`To be more stable, an athlete should`,
        choices: ['Stand tall with feet together', 'Stay low with a wide stance', 'Lean forward on toes', 'Hold arms up high'],
        answer: 1,
        explain: T`Lower CG and wider base: the CG has to move much farther before it leaves the base.`,
      },
      {
        q: T`The conditions for static equilibrium are`,
        choices: [T`\(\Sigma F = 0\) only`, T`\(\Sigma\tau = 0\) only`, T`\(\Sigma F = 0\) and \(\Sigma\tau = 0\)`, T`\(v = 0\) only`],
        answer: 2,
        explain: T`No linear acceleration (\(\Sigma F = 0\)) and no angular acceleration (\(\Sigma\tau = 0\)).`,
        why: { 0: 'Two equal, opposite forces at different points can still spin an object.' },
      },
      {
        q: T`When solving a statics problem, the smartest place to put the pivot for the torque equation is`,
        choices: ['At the center of the object', 'Where an unknown force acts', 'Where the biggest known force acts', 'Anywhere off the object'],
        answer: 1,
        explain: T`An unknown force at the pivot has zero lever arm, so it drops out of the torque equation.`,
      },
      {
        q: T`For a uniform beam, its own weight acts`,
        choices: ['At the left end', 'At its center', 'Wherever it is supported', 'It can be ignored'],
        answer: 1,
        explain: T`Uniform means mass is spread evenly, so the center of gravity is at the middle.`,
        why: { 3: 'Only if the problem says the beam is light or massless.' },
      },
      {
        q: T`A ladder leans against a frictionless wall. What keeps the bottom from sliding out?`,
        choices: ['The wall', 'Friction from the floor', 'The ladder’s weight', 'Nothing'],
        answer: 1,
        explain: T`The wall pushes the ladder outward horizontally; only floor friction can balance that horizontal force.`,
      },
      {
        q: T`As a painter climbs higher on a ladder, the friction needed at the floor`,
        choices: ['Decreases', 'Stays the same', 'Increases', 'Becomes zero'],
        answer: 2,
        explain: T`Higher up means a bigger lever arm for the painter's weight about the foot, so the wall must push harder, and friction must match it. That's why ladders slip when you're near the top.`,
      },
      {
        q: T`A 2 N balloon pulls straight up on the end of a 1.0 m stick pivoted at its other end. The torque is largest when the stick is`,
        choices: ['Horizontal', 'At 45° above horizontal', 'Vertical', 'Same at all angles'],
        answer: 0,
        explain: T`The force is vertical, so its lever arm is the horizontal distance \(L\cos\theta\). That's biggest (1.0 m, so 2.0 N·m) when the stick is horizontal and zero when vertical.`,
      },
      {
        q: T`The units of torque are`,
        choices: ['Joules', 'N·m (newton-meters)', 'N/m', 'kg·m/s'],
        answer: 1,
        explain: T`Torque = force × distance, in N·m. Even though J = N·m too, torque is never written in joules.`,
        why: { 0: 'Same base units, but joules are reserved for energy/work.' },
      },
    ],

    problems: [
      {
        id: 'torque-angle',
        title: 'Torque from a force at an angle',
        gen(r) {
          const L = r.num(0.15, 0.6, 2), F = r.num(40, 250, 0), th = r.int(20, 80);
          const tau = L * F * r.sin(th);
          return {
            question: T`A mechanic pushes with \(${F}\ \text{N}\) on the end of a \(${L}\ \text{m}\) wrench. The force makes a \(${th}^\circ\) angle with the wrench.`,
            parts: [
              { label: '(a) Torque if the push were perpendicular', value: L * F, unit: 'N·m' },
              { label: '(b) Torque at the actual angle', value: tau, unit: 'N·m' },
            ],
            hint: T`Only the perpendicular part of the force turns the wrench: \(\tau = rF\sin\theta\).`,
            steps: [
              T`Perpendicular: \(\tau = rF = (${L}\ \text{m})(${F}\ \text{N}) = ${r.f(L * F)}\ \text{N·m}\)`,
              T`At an angle: \(\tau = rF\sin\theta = (${L})(${F})\sin${th}^\circ = ${r.f(tau)}\ \text{N·m}\)`,
            ],
          };
        },
      },
      {
        id: 'force-needed',
        title: 'Force needed to loosen a bolt',
        gen(r) {
          const tau = r.int(30, 120), L = r.num(0.2, 0.5, 2), th = r.int(35, 75);
          const F1 = tau / L, F2 = tau / (L * r.sin(th));
          return {
            question: T`A rusty bolt needs \(${tau}\ \text{N·m}\) of torque to loosen. You use a \(${L}\ \text{m}\) wrench.`,
            parts: [
              { label: '(a) Force needed, pushing perpendicular at the end', value: F1, unit: 'N' },
              { label: `(b) Force needed if you push at ${th}° to the wrench`, value: F2, unit: 'N' },
            ],
            hint: T`Rearrange \(\tau = rF\sin\theta\) for \(F\).`,
            steps: [
              T`(a) \(F = \dfrac{\tau}{r} = \dfrac{${tau}\ \text{N·m}}{${L}\ \text{m}} = ${r.f(F1)}\ \text{N}\)`,
              T`(b) \(F = \dfrac{\tau}{r\sin\theta} = \dfrac{${tau}}{(${L})\sin${th}^\circ} = ${r.f(F2)}\ \text{N}\). Pushing at an angle wastes effort.`,
            ],
          };
        },
      },
      {
        id: 'seesaw',
        title: 'Balancing a seesaw',
        gen(r) {
          const m1 = r.int(20, 45), d1 = r.num(1.0, 2.0, 1);
          let m2 = r.int(30, 80);
          while (m2 <= m1) m2 = r.int(30, 80);
          const d2 = m1 * d1 / m2;
          return {
            question: T`A \(${m1}\ \text{kg}\) child sits \(${d1}\ \text{m}\) from the pivot of a seesaw. Where must a \(${m2}\ \text{kg}\) person sit on the other side to balance it? (Ignore the board's weight; it is pivoted at its center.)`,
            fig: ['beam', { length: 4, supports: [{ x: 2, kind: 'pivot' }], loads: [{ x: 2 - d1, label: `${m1} kg`, kind: 'person' }, { x: 2 + d2, label: `${m2} kg`, kind: 'person' }] }],
            parts: [{ label: 'Distance from the pivot', value: d2, unit: 'm' }],
            hint: T`Clockwise torque = counterclockwise torque: \(m_1 g d_1 = m_2 g d_2\). Notice g cancels.`,
            steps: [
              T`Equation: \(m_1 g d_1 = m_2 g d_2\)`,
              T`Substitution: \((${m1})(9.80)(${d1}) = (${m2})(9.80)\,d_2\)`,
              T`Answer: \(d_2 = \dfrac{(${m1})(${d1})}{${m2}} = ${r.f(d2)}\ \text{m}\)`,
            ],
          };
        },
      },
      {
        id: 'stick-balance',
        title: 'Where to hang a stick with two end masses',
        gen(r) {
          const L = r.num(1.0, 3.0, 1), ms = r.num(0.1, 0.6, 2), m1 = r.num(0.1, 0.5, 2);
          let m2 = r.num(0.4, 1.5, 2);
          while (m2 <= m1) m2 = r.num(0.4, 1.5, 2);
          const x = (m2 * L + ms * L / 2) / (m1 + m2 + ms);
          return {
            question: T`A uniform \(${L}\ \text{m}\) stick of mass \(${ms}\ \text{kg}\) has a \(${m1}\ \text{kg}\) mass on its left end and a \(${m2}\ \text{kg}\) mass on its right end. How far from the left end should a string be tied so it hangs level?`,
            fig: ['beam', { length: L, supports: [{ x, kind: 'cable', label: 'T' }], loads: [{ x: 0, label: `${m1} kg`, kind: 'mass' }, { x: L / 2, label: `${ms} kg`, kind: 'arrow' }, { x: L, label: `${m2} kg`, kind: 'mass' }] }],
            parts: [{ label: 'Distance from the left end', value: x, unit: 'm' }],
            hint: T`The string goes at the center of mass. The stick's own mass counts at its middle.`,
            steps: [
              T`Origin at the left end. Equation: \(x_{cm} = \dfrac{\Sigma mx}{\Sigma m}\)`,
              T`Substitution: \(x_{cm} = \dfrac{(${m1})(0) + (${ms})(${r.f(L / 2)}) + (${m2})(${L})}{${m1} + ${ms} + ${m2}}\)`,
              T`Answer: \(x_{cm} = ${r.f(x)}\ \text{m}\) from the left end (closer to the heavier side).`,
            ],
          };
        },
      },
      {
        id: 'com-meter-stick',
        title: 'Center of mass of three masses (lab)',
        gen(r) {
          const ms = [r.int(50, 300), r.int(50, 300), r.int(50, 300)];
          const xs = [r.int(5, 30), r.int(35, 65), r.int(70, 95)];
          const stick = r.int(80, 150);
          const num = ms.reduce((s, m, i) => s + m * xs[i], 0) + stick * 50;
          const x = num / (ms[0] + ms[1] + ms[2] + stick);
          return {
            question: T`In the center-of-mass lab, a \(${stick}\ \text{g}\) meter stick (uniform) holds three masses: \(${ms[0]}\ \text{g}\) at the \(${xs[0]}\ \text{cm}\) mark, \(${ms[1]}\ \text{g}\) at \(${xs[1]}\ \text{cm}\), and \(${ms[2]}\ \text{g}\) at \(${xs[2]}\ \text{cm}\). Where should the fulcrum go so it balances?`,
            fig: ['beam', { length: 100, supports: [{ x, kind: 'pivot' }], loads: xs.map((xi, i) => ({ x: xi, label: `${ms[i]} g`, kind: 'mass' })) }],
            parts: [{ label: 'Fulcrum position (cm mark)', value: x, unit: 'cm' }],
            hint: T`Include the meter stick itself as a mass at the 50 cm mark. Grams are fine here; the units cancel.`,
            steps: [
              T`Equation: \(x_{cm} = \dfrac{\Sigma mx}{\Sigma m}\), stick counted at 50 cm.`,
              T`Numerator: \((${ms[0]})(${xs[0]}) + (${ms[1]})(${xs[1]}) + (${ms[2]})(${xs[2]}) + (${stick})(50) = ${num}\ \text{g·cm}\)`,
              T`Denominator: \(${ms[0]} + ${ms[1]} + ${ms[2]} + ${stick} = ${ms[0] + ms[1] + ms[2] + stick}\ \text{g}\)`,
              T`Answer: \(x_{cm} = ${r.f(x)}\ \text{cm}\)`,
            ],
          };
        },
      },
      {
        id: 'balloon-stick',
        title: 'Balloon pulling on a meter stick',
        gen(r) {
          const F = r.num(1.0, 5.0, 1), L = r.pick([0.5, 1.0, 1.5]), th = r.int(20, 70);
          return {
            question: T`A helium balloon pulls straight up with \(${F}\ \text{N}\) on the end of a \(${L}\ \text{m}\) stick that can rotate about its other end. Find the torque on the stick when it is (a) horizontal and (b) tilted \(${th}^\circ\) above horizontal.`,
            parts: [
              { label: '(a) Torque, stick horizontal', value: F * L, unit: 'N·m' },
              { label: `(b) Torque, stick at ${th}°`, value: F * L * r.cos(th), unit: 'N·m' },
            ],
            hint: T`The force is vertical. The lever arm is the horizontal distance from the pivot to the end: \(L\cos\theta\).`,
            steps: [
              T`(a) Force perpendicular to the stick: \(\tau = FL = (${F})(${L}) = ${r.f(F * L)}\ \text{N·m}\)`,
              T`(b) The angle between the stick and the vertical force is \(90^\circ - ${th}^\circ\), so \(\tau = FL\sin(90^\circ - ${th}^\circ) = FL\cos${th}^\circ\)`,
              T`\(\tau = (${F})(${L})\cos${th}^\circ = ${r.f(F * L * r.cos(th))}\ \text{N·m}\)`,
            ],
          };
        },
      },
      {
        id: 'scaffold',
        title: 'Scaffold held by two cables',
        gen(r) {
          const M = r.int(20, 60), L = r.num(4, 8, 1), m = r.int(55, 95), d = r.num(0.5, 2.0, 1), me = r.int(5, 30), e = r.num(0.5, 2.0, 1);
          const g = r.g;
          const TR = g * (M * L / 2 + m * d + me * (L - e)) / L;
          const TL = (M + m + me) * g - TR;
          return {
            question: T`A uniform \(${M}\ \text{kg}\) scaffold \(${L}\ \text{m}\) long hangs from a vertical cable at each end. A \(${m}\ \text{kg}\) painter stands \(${d}\ \text{m}\) from the left end, and \(${me}\ \text{kg}\) of equipment sits \(${e}\ \text{m}\) from the right end.`,
            fig: ['beam', { length: L, supports: [{ x: 0, kind: 'cable', label: 'T_L' }, { x: L, kind: 'cable', label: 'T_R' }], loads: [{ x: d, label: `${m} kg`, kind: 'person' }, { x: L / 2, label: `${M} kg`, kind: 'arrow' }, { x: L - e, label: `${me} kg`, kind: 'mass' }] }],
            parts: [
              { label: '(a) Tension in the left cable', value: TL, unit: 'N' },
              { label: '(b) Tension in the right cable', value: TR, unit: 'N' },
            ],
            hint: T`Pivot at the left cable: then only \(T_R\) is unknown in the torque equation. Don't forget the scaffold's weight at its middle.`,
            steps: [
              T`FBD: \(T_L\), \(T_R\) up; painter, scaffold (at \(${r.f(L / 2)}\ \text{m}\)) and equipment (at \(${r.f(L - e)}\ \text{m}\)) down. Pivot at the left end.`,
              T`\(\Sigma\tau = 0\): \(T_R(${L}) = (${M})(9.80)(${r.f(L / 2)}) + (${m})(9.80)(${d}) + (${me})(9.80)(${r.f(L - e)})\)`,
              T`\(T_R = ${r.f(TR)}\ \text{N}\)`,
              T`\(\Sigma F_y = 0\): \(T_L = (${M} + ${m} + ${me})(9.80) - T_R = ${r.f((M + m + me) * g)} - ${r.f(TR)} = ${r.f(TL)}\ \text{N}\)`,
            ],
          };
        },
      },
      {
        id: 'pole-wire',
        title: 'Hinged pole with a support wire',
        gen(r) {
          const L = r.num(2.0, 5.0, 1), mp = r.int(20, 150), M = r.int(50, 250), x = r.num(0.5 * L, L, 1), th = r.int(25, 60);
          const g = r.g;
          const Tn = g * (mp * L / 2 + M * x) / (L * r.sin(th));
          const Fx = Tn * r.cos(th), Fy = (mp + M) * g - Tn * r.sin(th);
          const F = Math.hypot(Fx, Fy), ang = r.atan(Math.abs(Fy), Fx);
          return {
            question: T`A uniform \(${L}\ \text{m}\) pole of mass \(${mp}\ \text{kg}\) is hinged to a wall and held horizontal by a wire from its far end to the wall, making \(${th}^\circ\) with the pole. A \(${M}\ \text{kg}\) mass hangs \(${x}\ \text{m}\) from the wall.`,
            fig: ['beam', { length: L, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: L / 2, label: `${mp} kg`, kind: 'arrow' }, { x, label: `${M} kg`, kind: 'mass' }], strut: { x: L, angle: th, label: 'T' }, dims: true }],
            parts: [
              { label: '(a) Tension in the wire', value: Tn, unit: 'N' },
              { label: '(b) Magnitude of the hinge force', value: F, unit: 'N' },
              { label: '(c) Angle of the hinge force from horizontal', value: ang, unit: '°' },
            ],
            hint: T`Pivot at the hinge. Only the vertical part of the tension, \(T\sin\theta\), has a lever arm along the pole.`,
            steps: [
              T`\(\Sigma\tau_{hinge} = 0\): \(T\sin${th}^\circ(${L}) = (${mp})(9.80)(${r.f(L / 2)}) + (${M})(9.80)(${x})\)`,
              T`\(T = ${r.f(Tn)}\ \text{N}\)`,
              T`\(\Sigma F_x = 0\): \(F_x = T\cos${th}^\circ = ${r.f(Fx)}\ \text{N}\) (away from the wall)`,
              T`\(\Sigma F_y = 0\): \(F_y = (${mp} + ${M})(9.80) - T\sin${th}^\circ = ${r.f(Fy)}\ \text{N}\) (${Fy >= 0 ? 'up' : 'down'})`,
              T`\(F = \sqrt{F_x^2 + F_y^2} = ${r.f(F)}\ \text{N}\), at \(\tan^{-1}(|F_y|/F_x) = ${r.f(ang)}^\circ\) ${Fy >= 0 ? 'above' : 'below'} horizontal`,
            ],
          };
        },
      },
      {
        id: 'shelf-boom',
        title: 'Rod with a cable and a hanging mass at the end',
        gen(r) {
          const M = r.num(2, 30, 1), mr = r.num(1, 10, 1), L = r.num(0.8, 2.5, 1), th = r.int(20, 60);
          const g = r.g;
          const Tn = g * (M + mr / 2) / r.sin(th);
          const Hx = Tn * r.cos(th), Hy = mr * g / 2;
          return {
            question: T`A uniform horizontal rod (mass \(${mr}\ \text{kg}\), length \(${L}\ \text{m}\)) is hinged to a wall. A cable from the rod's far end to the wall makes \(${th}^\circ\) with the rod, and a \(${M}\ \text{kg}\) mass hangs from the far end.`,
            fig: ['beam', { length: L, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: L / 2, label: 'm_rod g', kind: 'arrow' }, { x: L, label: `${M} kg`, kind: 'mass' }], strut: { x: L, angle: th, label: 'T' } }],
            parts: [
              { label: '(a) Cable tension', value: Tn, unit: 'N' },
              { label: '(b) Horizontal hinge force', value: Hx, unit: 'N' },
              { label: '(c) Vertical hinge force', value: Hy, unit: 'N' },
            ],
            hint: T`Pivot at the hinge. Notice the length \(L\) cancels!`,
            steps: [
              T`\(\Sigma\tau_{hinge} = 0\): \(T\sin\theta\,L = MgL + m_{rod}g\frac{L}{2}\)`,
              T`\(T = \dfrac{g(M + m_{rod}/2)}{\sin\theta} = \dfrac{(9.80)(${M} + ${r.f(mr / 2)})}{\sin${th}^\circ} = ${r.f(Tn)}\ \text{N}\)`,
              T`\(\Sigma F_x = 0\): \(H_x = T\cos${th}^\circ = ${r.f(Hx)}\ \text{N}\)`,
              T`\(\Sigma F_y = 0\): \(H_y = (M + m_{rod})g - T\sin\theta = ${r.f(Hy)}\ \text{N}\) (up). It works out to exactly half the rod's weight.`,
            ],
          };
        },
      },
      {
        id: 'deltoid',
        title: 'Holding your arm straight out',
        gen(r) {
          const m = r.num(2.8, 4.5, 1), D = r.int(20, 30), d = r.int(10, 15), th = r.int(12, 20);
          const g = r.g;
          const FM = m * g * D / (d * r.sin(th));
          const Jx = FM * r.cos(th), Jy = FM * r.sin(th) - m * g;
          const FJ = Math.hypot(Jx, Jy);
          return {
            question: T`An outstretched \(${m}\ \text{kg}\) arm has its center of mass \(${D}\ \text{cm}\) from the shoulder. The deltoid muscle attaches \(${d}\ \text{cm}\) from the shoulder and pulls at \(${th}^\circ\) above the arm.`,
            fig: ['beam', { length: 60, supports: [{ x: 0, kind: 'hinge' }], wall: 'left', loads: [{ x: D, label: 'mg', kind: 'arrow' }], strut: { x: d, angle: th, label: 'F_M' }, dims: true }],
            parts: [
              { label: '(a) Muscle force F_M', value: FM, unit: 'N' },
              { label: '(b) Force from the shoulder joint F_J', value: FJ, unit: 'N' },
            ],
            hint: T`Pivot at the shoulder joint. Convert cm to m (or keep cm on both sides; it cancels).`,
            steps: [
              T`\(\Sigma\tau = 0\): \(F_M\sin${th}^\circ(${d}\ \text{cm}) = (${m})(9.80)(${D}\ \text{cm})\)`,
              T`\(F_M = ${r.f(FM)}\ \text{N}\)`,
              T`\(F_{Jx} = F_M\cos${th}^\circ = ${r.f(Jx)}\ \text{N}\); \(F_{Jy} = F_M\sin${th}^\circ - mg = ${r.f(Jy)}\ \text{N}\)`,
              T`\(F_J = \sqrt{F_{Jx}^2 + F_{Jy}^2} = ${r.f(FJ)}\ \text{N}\)`,
            ],
          };
        },
      },
      {
        id: 'forearm',
        title: 'Biceps holding a weight',
        gen(r) {
          const M = r.num(2, 10, 1), m = r.num(2, 4, 1), Lc = r.num(12, 18, 1), Lh = r.num(30, 38, 1), d = r.num(3, 5, 1), th = r.int(40, 120);
          const g = r.g;
          const FB = (m * g * Lc + M * g * Lh) / d;
          const FE = FB - (m + M) * g;
          return {
            question: T`A forearm makes \(${th}^\circ\) with the vertical upper arm and holds a \(${M}\ \text{kg}\) mass in the hand, \(${Lh}\ \text{cm}\) from the elbow. The forearm and hand have mass \(${m}\ \text{kg}\) with center of mass \(${Lc}\ \text{cm}\) from the elbow. The biceps attaches \(${d}\ \text{cm}\) from the elbow and pulls straight up (parallel to the upper arm).`,
            parts: [
              { label: '(a) Biceps force', value: FB, unit: 'N' },
              { label: '(b) Force on the elbow joint (magnitude)', value: Math.abs(FE), unit: 'N' },
            ],
            hint: T`Every force here is vertical, so every lever arm is (distance)·\(\sin${th}^\circ\). The angle cancels out!`,
            steps: [
              T`Pivot at the elbow: \(F_B(${d})\sin\theta = (${m})(9.80)(${Lc})\sin\theta + (${M})(9.80)(${Lh})\sin\theta\)`,
              T`\(\sin\theta\) cancels: \(F_B = \dfrac{${r.f(m * g * Lc)} + ${r.f(M * g * Lh)}}{${d}} = ${r.f(FB)}\ \text{N}\)`,
              T`\(\Sigma F_y = 0\): \(F_{elbow} = F_B - (m + M)g = ${r.f(FB)} - ${r.f((m + M) * g)} = ${r.f(FE)}\ \text{N}\) (pushing down on the forearm)`,
              T`Neither force depends on the angle, as long as the biceps stays parallel to the upper arm.`,
            ],
          };
        },
      },
      {
        id: 'ladder-min-angle',
        title: 'Steepest a ladder can lean without slipping',
        gen(r) {
          const mu = r.num(0.25, 0.8, 2);
          const th = r.atan(1, 2 * mu);
          return {
            question: T`A uniform ladder leans against a frictionless wall. The coefficient of static friction between the ladder and the floor is \(${mu}\). What is the smallest angle (from the floor) at which the ladder will not slip?`,
            fig: ['ladder', { angle: Math.round(th), forces: true }],
            parts: [{ label: 'Minimum angle from the floor', value: th, unit: '°' }],
            hint: T`Torques about the foot give \(F_W = \frac{mg}{2\tan\theta}\). Friction needed = \(F_W\) and must be \(\le \mu_s mg\).`,
            steps: [
              T`\(\Sigma\tau_{foot} = 0\): \(F_W\,\ell\sin\theta = mg\,\frac{\ell}{2}\cos\theta \Rightarrow F_W = \dfrac{mg}{2\tan\theta}\)`,
              T`\(\Sigma F_x\): \(F_{fr} = F_W\); \(\Sigma F_y\): \(F_N = mg\)`,
              T`No slip: \(\dfrac{mg}{2\tan\theta} \le \mu_s mg \Rightarrow \tan\theta \ge \dfrac{1}{2\mu_s}\)`,
              T`\(\theta_{min} = \tan^{-1}\!\left(\dfrac{1}{2(${mu})}\right) = ${r.f(th)}^\circ\)`,
            ],
          };
        },
      },
      {
        id: 'ladder-painter',
        title: 'Painter on a ladder: how much friction?',
        gen(r) {
          const ml = r.num(8, 20, 1), mp = r.int(45, 90), b = r.num(2.0, 3.5, 1), h = r.num(3.5, 6.0, 1), frac = r.pick([0.5, 0.6, 0.7, 0.8]);
          const g = r.g;
          const xp = frac * b;
          const FW = g * (ml * b / 2 + mp * xp) / h;
          const mu = FW / ((ml + mp) * g);
          return {
            question: T`A uniform \(${ml}\ \text{kg}\) ladder leans against a frictionless wall. Its foot is \(${b}\ \text{m}\) from the wall and its top is \(${h}\ \text{m}\) up the wall. A \(${mp}\ \text{kg}\) painter stands ${Math.round(frac * 100)}% of the way up. The ladder is just about to slip.`,
            fig: ['ladder', { angle: Math.round(r.atan(h, b)), person: frac, forces: true }],
            parts: [
              { label: '(a) Force from the wall', value: FW, unit: 'N' },
              { label: '(b) Coefficient of static friction', value: mu, unit: '' },
            ],
            hint: T`Pivot at the foot. The painter is ${Math.round(frac * 100)}% of the way up, so \(${r.f(xp)}\ \text{m}\) horizontally from the foot; the ladder's weight acts \(${r.f(b / 2)}\ \text{m}\) out.`,
            steps: [
              T`\(\Sigma\tau_{foot} = 0\): \(F_W(${h}) = (${ml})(9.80)(${r.f(b / 2)}) + (${mp})(9.80)(${r.f(xp)})\)`,
              T`\(F_W = ${r.f(FW)}\ \text{N}\)`,
              T`\(F_{fr} = F_W\) and \(F_N = (${ml} + ${mp})(9.80) = ${r.f((ml + mp) * g)}\ \text{N}\)`,
              T`About to slip: \(\mu_s = \dfrac{F_{fr}}{F_N} = ${r.f(mu)}\)`,
            ],
          };
        },
      },
      {
        id: 'mobile',
        title: 'Balancing a mobile',
        gen(r) {
          const mB = r.num(0.2, 1.2, 3);
          const a1 = r.int(20, 35), b1 = r.int(5, 12), a2 = r.int(10, 20), b2 = r.int(4, 8), a3 = r.int(10, 20), b3 = r.int(4, 8);
          const mCD = mB * b2 / a2;
          const mD = mCD * b3 / (a3 + b3), mC = mCD - mD;
          const mA = (mB + mCD) * b1 / a1;
          return {
            question: T`A mobile hangs in equilibrium (ignore the bars). Top bar: A hangs \(${a1}\ \text{cm}\) left of its string, everything below hangs \(${b1}\ \text{cm}\) right. Middle bar: the bottom bar hangs \(${a2}\ \text{cm}\) left, B (\(${mB}\ \text{kg}\)) hangs \(${b2}\ \text{cm}\) right. Bottom bar: D hangs \(${a3}\ \text{cm}\) left, C hangs \(${b3}\ \text{cm}\) right.`,
            parts: [
              { label: '(a) Mass of A', value: mA, unit: 'kg' },
              { label: '(b) Mass of C', value: mC, unit: 'kg' },
              { label: '(c) Mass of D', value: mD, unit: 'kg' },
            ],
            hint: T`Start in the middle: that bar has only one unknown, \(m_C + m_D\). Each bar is a seesaw.`,
            steps: [
              T`Middle bar: \((m_C + m_D)(${a2}) = (${mB})(${b2}) \Rightarrow m_C + m_D = ${r.f(mCD)}\ \text{kg}\)`,
              T`Bottom bar: \(m_D(${a3}) = m_C(${b3})\). With the sum: \(m_D = ${r.f(mCD)}\cdot\dfrac{${b3}}{${a3 + b3}} = ${r.f(mD)}\ \text{kg}\), \(m_C = ${r.f(mC)}\ \text{kg}\)`,
              T`Top bar: \(m_A(${a1}) = (${mB} + ${r.f(mCD)})(${b1}) \Rightarrow m_A = ${r.f(mA)}\ \text{kg}\)`,
            ],
          };
        },
      },
      {
        id: 'skater-spin',
        title: 'Spinning skater pulls in her arms',
        gen(r) {
          const I1 = r.num(2.5, 5.0, 1), w1 = r.num(0.8, 2.0, 1);
          let I2 = r.num(0.8, 2.0, 1);
          while (I2 >= I1) I2 = r.num(0.8, 2.0, 1);
          const w2 = I1 * w1 / I2;
          return {
            question: T`A skater spins at \(${w1}\ \text{rev/s}\) with arms out (\(I = ${I1}\ \text{kg·m}^2\)). She pulls her arms in, reducing her rotational inertia to \(${I2}\ \text{kg·m}^2\). Ignore friction with the ice.`,
            parts: [
              { label: '(a) New spin rate', value: w2, unit: 'rev/s' },
              { label: '(b) Factor by which her spin rate increases', value: I1 / I2, unit: '' },
            ],
            hint: T`No outside torque, so angular momentum is conserved: \(I_1\omega_1 = I_2\omega_2\). You can keep rev/s; units match on both sides.`,
            steps: [
              T`Equation: \(I_1\omega_1 = I_2\omega_2\)`,
              T`Substitution: \((${I1})(${w1}) = (${I2})\,\omega_2\)`,
              T`Answer: \(\omega_2 = ${r.f(w2)}\ \text{rev/s}\), which is \(${r.f(I1)}/${r.f(I2)} = ${r.f(I1 / I2)}\) times faster.`,
            ],
          };
        },
      },
    ],
  };
})();

// Forces & Newton's Laws (Giancoli Ch. 4)
// Math goes between $...$ (inline) or in "tex" fields. Backslashes must be doubled: \\Sigma, \\mu.
window.UNIT_DATA = window.UNIT_DATA || {};
window.UNIT_DATA['forces'] = {
  placeholder: true,
  summary: 'Why things move the way they do: forces, free-body diagrams, and Newton\'s three laws.',

  formulas: [
    { name: "Newton's 2nd law", tex: '\\Sigma \\vec{F} = m\\vec{a}', note: 'Apply separately in x and y.' },
    { name: 'Weight', tex: 'F_G = mg' },
    { name: "Newton's 3rd law", tex: '\\vec{F}_{AB} = -\\vec{F}_{BA}', note: 'Pairs act on different objects.' },
    { name: 'Kinetic friction', tex: 'F_{fr} = \\mu_k F_N' },
    { name: 'Static friction', tex: 'F_{fr} \\le \\mu_s F_N', note: 'Only as large as needed to prevent sliding.' },
    { name: 'Incline components', tex: 'F_{G\\parallel} = mg\\sin\\theta, \\quad F_{G\\perp} = mg\\cos\\theta' },
  ],

  concepts: [
    {
      title: "Newton's three laws",
      body: '<ol><li><strong>Inertia:</strong> with zero net force, an object keeps its velocity (which could be zero).</li><li><strong>$\\Sigma F = ma$:</strong> net force causes acceleration.</li><li><strong>Action–reaction:</strong> forces come in equal and opposite pairs acting on <em>different</em> objects.</li></ol>',
    },
    {
      title: 'Free-body diagrams',
      body: '<p>Draw only the forces acting <em>on</em> the object: weight, normal, tension, friction, applied pushes and pulls. Pick axes (tilt them along an incline), then write $\\Sigma F_x = ma_x$ and $\\Sigma F_y = ma_y$.</p>',
    },
    {
      title: 'Normal force is not always mg',
      body: '<p>$F_N$ is whatever the surface must push to keep you from sinking in. It changes on inclines ($mg\\cos\\theta$), in elevators, and when other forces push or pull at an angle.</p>',
    },
  ],

  examples: [
    {
      title: 'Box with friction',
      problem: 'A $10\\ \\text{kg}$ box is pulled across the floor with a horizontal $40\\ \\text{N}$ force. $\\mu_k = 0.20$. Find its acceleration.',
      steps: [
        'Vertical: $F_N = mg = (10)(9.80) = 98\\ \\text{N}$.',
        'Friction: $F_{fr} = \\mu_k F_N = (0.20)(98) = 19.6\\ \\text{N}$.',
        'Horizontal: $\\Sigma F_x = 40 - 19.6 = 20.4\\ \\text{N}$.',
        '$a = \\Sigma F / m = 20.4 / 10 = 2.04\\ \\text{m/s}^2$.',
      ],
      answer: '$a \\approx 2.0\\ \\text{m/s}^2$',
    },
    {
      title: 'Elevator',
      problem: 'A $60\\ \\text{kg}$ person stands on a scale in an elevator accelerating upward at $2.0\\ \\text{m/s}^2$. What does the scale read?',
      steps: [
        'Forces on the person: $F_N$ up, $mg$ down. Take up as positive.',
        '$F_N - mg = ma \\Rightarrow F_N = m(g + a)$.',
        '$F_N = 60(9.80 + 2.0) = 708\\ \\text{N}$.',
      ],
      answer: '$F_N \\approx 710\\ \\text{N}$ (more than their weight of 588 N)',
    },
  ],

  quiz: [
    {
      question: 'A truck hits a bug. Compared to the force the truck exerts on the bug, the force the bug exerts on the truck is:',
      choices: ['Much smaller', 'Exactly equal in size', 'Much larger', 'Zero'],
      answer: 1,
      explain: "Newton's 3rd law: the forces are equal and opposite. The bug has a much bigger <em>acceleration</em> because its mass is tiny.",
    },
    {
      question: 'A hockey puck slides across frictionless ice at constant velocity. The net force on it is:',
      choices: ['In the direction of motion', 'Opposite the motion', 'Zero', 'Equal to its weight'],
      answer: 2,
      explain: 'Constant velocity means $a = 0$, so $\\Sigma F = 0$.',
    },
    {
      question: 'An astronaut goes from Earth to the Moon. What happens to their mass and weight?',
      choices: ['Both decrease', 'Mass stays the same, weight decreases', 'Mass decreases, weight stays the same', 'Both stay the same'],
      answer: 1,
      explain: 'Mass is the amount of matter and does not change. Weight $= mg$, and $g$ is smaller on the Moon.',
    },
  ],

  problems: [
    {
      question: 'A block slides down a frictionless ramp tilted at $30.0^\\circ$. What is its acceleration?',
      parts: [
        { label: 'Acceleration down the ramp', value: 4.9, unit: 'm/s²' },
      ],
      steps: [
        'Tilt your axes: x along the ramp (down is positive), y perpendicular to it.',
        'The only force along the ramp is the parallel part of gravity: $mg\\sin\\theta$.',
        '$ma = mg\\sin\\theta \\Rightarrow a = g\\sin\\theta$ (mass cancels).',
        '$a = 9.80 \\sin 30.0^\\circ = 4.90\\ \\text{m/s}^2$.',
      ],
    },
    {
      question: 'A $5.0\\ \\text{kg}$ crate is pushed across the floor by a horizontal $30\\ \\text{N}$ force. $\\mu_k = 0.25$.',
      parts: [
        { label: '(a) Friction force', value: 12.25, unit: 'N' },
        { label: '(b) Acceleration', value: 3.55, unit: 'm/s²' },
      ],
      steps: [
        'Draw the FBD: push $30\\ \\text{N}$ right, friction left, $F_N$ up, $mg$ down.',
        'Vertical: $F_N = mg = (5.0)(9.80) = 49\\ \\text{N}$.',
        'Friction: $F_{fr} = \\mu_k F_N = (0.25)(49) = 12.25\\ \\text{N}$.',
        'Horizontal: $ma = 30 - 12.25 \\Rightarrow a = 17.75 / 5.0 = 3.55\\ \\text{m/s}^2$.',
      ],
    },
  ],
};

// 2D Kinematics & Vectors (Giancoli Ch. 3)
// Math goes between $...$ (inline) or in "tex" fields. Backslashes must be doubled: \\frac, \\theta.
window.UNIT_DATA = window.UNIT_DATA || {};
window.UNIT_DATA['kinematics-2d'] = {
  placeholder: true,
  summary: 'Motion in a plane: breaking vectors into components and treating horizontal and vertical motion separately.',

  formulas: [
    { name: 'Vector components', tex: 'A_x = A\\cos\\theta, \\quad A_y = A\\sin\\theta', note: '$\\theta$ measured from the +x axis.' },
    { name: 'Magnitude and direction', tex: 'A = \\sqrt{A_x^2 + A_y^2}, \\quad \\theta = \\tan^{-1}\\frac{A_y}{A_x}' },
    { name: 'Projectile: horizontal', tex: 'x = v_{0x}t', note: 'No horizontal acceleration.' },
    { name: 'Projectile: vertical', tex: 'y = v_{0y}t - \\tfrac{1}{2}gt^2, \\quad v_y = v_{0y} - gt' },
    { name: 'Range (level ground)', tex: 'R = \\frac{v_0^2 \\sin 2\\theta_0}{g}', note: 'Only when launch and landing heights match.' },
    { name: 'Relative velocity', tex: '\\vec{v}_{AC} = \\vec{v}_{AB} + \\vec{v}_{BC}' },
  ],

  concepts: [
    {
      title: 'Vectors vs. scalars',
      body: '<p>Vectors (displacement, velocity, acceleration) have magnitude and direction; scalars (time, distance, speed) only have size. Add vectors by adding components, never by adding magnitudes.</p>',
    },
    {
      title: 'Horizontal and vertical are independent',
      body: '<p>In projectile motion, $v_x$ stays constant and $v_y$ changes at $-g$. Time is the only quantity shared between the two directions. Find it from one direction and use it in the other.</p>',
    },
    {
      title: 'At the top of the path',
      body: '<p>$v_y = 0$ but $v_x$ is unchanged, so the speed at the top is $v_{0x}$, not zero.</p>',
    },
  ],

  examples: [
    {
      title: 'Rolling off a table',
      problem: 'A ball rolls off a $1.25\\ \\text{m}$ high table at $2.0\\ \\text{m/s}$. How far from the table does it land?',
      steps: [
        'Horizontal launch: $v_{0x} = 2.0\\ \\text{m/s}$, $v_{0y} = 0$.',
        'Vertical (take down as positive): $1.25 = \\tfrac{1}{2}(9.80)t^2 \\Rightarrow t = 0.505\\ \\text{s}$.',
        'Horizontal: $x = v_{0x}t = (2.0)(0.505) = 1.01\\ \\text{m}$.',
      ],
      answer: '$x \\approx 1.0\\ \\text{m}$',
    },
    {
      title: 'Components',
      problem: 'A displacement of $20\\ \\text{m}$ points $30^\\circ$ above the +x axis. Find its components.',
      steps: [
        '$A_x = 20\\cos 30^\\circ = 17.3\\ \\text{m}$',
        '$A_y = 20\\sin 30^\\circ = 10.0\\ \\text{m}$',
      ],
      answer: '$A_x = 17.3\\ \\text{m}$, $A_y = 10.0\\ \\text{m}$',
    },
  ],

  quiz: [
    {
      question: 'One ball is dropped and another is launched horizontally from the same height at the same moment. Which lands first?',
      choices: ['The dropped ball', 'The launched ball', 'They land at the same time', 'Depends on the launch speed'],
      answer: 2,
      explain: 'Both start with $v_{0y} = 0$ and fall with the same $g$, so the vertical motion, and therefore the time, is identical.',
    },
    {
      question: 'At the highest point of a projectile\'s path, its velocity is:',
      choices: ['Zero', 'Purely horizontal', 'Purely vertical', 'Equal to the launch speed'],
      answer: 1,
      explain: '$v_y = 0$ at the top, but $v_x$ never changes, so only the horizontal component is left.',
    },
    {
      question: 'On level ground (no air resistance), which launch angle gives the longest range?',
      choices: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'],
      answer: 1,
      explain: '$R \\propto \\sin 2\\theta$, which is largest when $2\\theta = 90^\\circ$.',
    },
  ],

  problems: [
    {
      question: 'A soccer ball is kicked at $20.0\\ \\text{m/s}$ at $37.0^\\circ$ above the horizontal on level ground.',
      parts: [
        { label: '(a) Maximum height', value: 7.39, unit: 'm' },
        { label: '(b) Time in the air', value: 2.46, unit: 's' },
        { label: '(c) Horizontal range', value: 39.2, unit: 'm' },
      ],
      steps: [
        'Components: $v_{0x} = 20.0\\cos 37^\\circ = 16.0\\ \\text{m/s}$, $v_{0y} = 20.0\\sin 37^\\circ = 12.0\\ \\text{m/s}$.',
        'Max height (where $v_y = 0$): $0 = v_{0y}^2 - 2gh \\Rightarrow h = \\dfrac{(12.04)^2}{2(9.80)} = 7.39\\ \\text{m}$.',
        'Time in air (lands at $y = 0$): $0 = v_{0y}t - \\tfrac{1}{2}gt^2 \\Rightarrow t = \\dfrac{2v_{0y}}{g} = \\dfrac{2(12.04)}{9.80} = 2.46\\ \\text{s}$.',
        'Range: $x = v_{0x}t = (15.97)(2.46) = 39.2\\ \\text{m}$.',
      ],
    },
    {
      question: 'You walk $3.0\\ \\text{km}$ east, then $4.0\\ \\text{km}$ north. Find your displacement.',
      parts: [
        { label: '(a) Magnitude', value: 5.0, unit: 'km' },
        { label: '(b) Angle north of east', value: 53.1, unit: '°' },
      ],
      steps: [
        'Components: $D_x = 3.0\\ \\text{km}$, $D_y = 4.0\\ \\text{km}$.',
        'Magnitude: $D = \\sqrt{3.0^2 + 4.0^2} = 5.0\\ \\text{km}$.',
        'Angle: $\\theta = \\tan^{-1}(4.0/3.0) = 53.1^\\circ$ north of east.',
      ],
    },
  ],
};

// 1D Kinematics (Giancoli Ch. 2)
// Math goes between $...$ (inline) or in "tex" fields. Backslashes must be doubled: \\frac, \\Delta.
window.UNIT_DATA = window.UNIT_DATA || {};
window.UNIT_DATA['kinematics-1d'] = {
  placeholder: true,
  summary: 'Describing motion along a straight line: where something is, how fast it moves, and how its speed changes.',

  formulas: [
    { name: 'Average velocity', tex: '\\bar{v} = \\frac{\\Delta x}{\\Delta t}', note: 'Displacement over time, not distance over time.' },
    { name: 'Average acceleration', tex: '\\bar{a} = \\frac{\\Delta v}{\\Delta t}' },
    { name: 'Velocity vs. time', tex: 'v = v_0 + at', note: 'Constant acceleration only.' },
    { name: 'Position vs. time', tex: 'x = x_0 + v_0 t + \\tfrac{1}{2}at^2', note: 'Constant acceleration only.' },
    { name: 'No time', tex: 'v^2 = v_0^2 + 2a(x - x_0)', note: 'Use when t is not given or asked for.' },
    { name: 'Average velocity (constant a)', tex: '\\bar{v} = \\frac{v + v_0}{2}' },
    { name: 'Free fall', tex: 'a = -g = -9.80\\ \\text{m/s}^2', note: 'Taking up as positive.' },
  ],

  concepts: [
    {
      title: 'Distance vs. displacement',
      body: '<p>Distance is the total path length (always positive). Displacement $\\Delta x = x - x_0$ is the change in position and has a sign that shows direction.</p>',
    },
    {
      title: 'Velocity vs. speed',
      body: '<p>Velocity has a direction (sign); speed is just the magnitude. On an $x$ vs. $t$ graph, velocity is the <strong>slope</strong>.</p>',
    },
    {
      title: 'Acceleration',
      body: '<p>Acceleration is how fast velocity changes. Negative acceleration does not always mean slowing down. It means slowing down only when $v$ and $a$ have opposite signs. On a $v$ vs. $t$ graph, acceleration is the slope and displacement is the <strong>area</strong> under the curve.</p>',
    },
    {
      title: 'Free fall',
      body: '<p>Anything moving only under gravity has $a = -9.80\\ \\text{m/s}^2$ the whole time, going up, at the top, and coming down. At the top, $v = 0$ but $a$ is still $-g$.</p>',
    },
  ],

  examples: [
    {
      title: 'Speeding up from rest',
      problem: 'A car starts from rest and accelerates at $2.0\\ \\text{m/s}^2$ for $5.0\\ \\text{s}$. How fast is it going, and how far did it travel?',
      steps: [
        'Knowns: $v_0 = 0$, $a = 2.0\\ \\text{m/s}^2$, $t = 5.0\\ \\text{s}$.',
        'Speed: $v = v_0 + at = 0 + (2.0)(5.0) = 10\\ \\text{m/s}$.',
        'Distance: $x = v_0 t + \\tfrac{1}{2}at^2 = 0 + \\tfrac{1}{2}(2.0)(5.0)^2 = 25\\ \\text{m}$.',
      ],
      answer: '$v = 10\\ \\text{m/s}$, $x = 25\\ \\text{m}$',
    },
    {
      title: 'Ball thrown upward',
      problem: 'A ball is thrown straight up at $15\\ \\text{m/s}$. How high does it go?',
      steps: [
        'At the top, $v = 0$. Take up as positive, so $a = -9.80\\ \\text{m/s}^2$.',
        'No time is given, so use $v^2 = v_0^2 + 2a\\,\\Delta y$.',
        '$0 = (15)^2 + 2(-9.80)\\,\\Delta y \\Rightarrow \\Delta y = \\dfrac{225}{19.6}$.',
      ],
      answer: '$\\Delta y \\approx 11.5\\ \\text{m}$',
    },
  ],

  quiz: [
    {
      question: 'A ball is thrown straight up. At the very top of its path, what are its velocity and acceleration?',
      choices: [
        '$v = 0$, $a = 0$',
        '$v = 0$, $a = 9.80\\ \\text{m/s}^2$ downward',
        '$v = 9.80\\ \\text{m/s}$ downward, $a = 0$',
        'Both point upward',
      ],
      answer: 1,
      explain: 'Velocity is momentarily zero, but gravity never turns off, so the acceleration is still $9.80\\ \\text{m/s}^2$ downward.',
    },
    {
      question: 'On a position vs. time graph, the slope represents:',
      choices: ['Acceleration', 'Displacement', 'Velocity', 'Distance'],
      answer: 2,
      explain: 'Slope of $x$ vs. $t$ is $\\Delta x / \\Delta t$, which is velocity.',
    },
    {
      question: 'On a velocity vs. time graph, the area under the curve represents:',
      choices: ['Displacement', 'Acceleration', 'Speed', 'Jerk'],
      answer: 0,
      explain: 'Area under $v$ vs. $t$ is $v \\cdot \\Delta t$, which is displacement.',
    },
  ],

  problems: [
    {
      question: 'A stone is dropped from rest off a cliff $45.0\\ \\text{m}$ high. Ignore air resistance.',
      parts: [
        { label: '(a) How long does it take to hit the ground?', value: 3.03, unit: 's' },
        { label: '(b) How fast is it moving just before impact?', value: 29.7, unit: 'm/s' },
      ],
      steps: [
        'Take down as positive so everything is positive: $v_0 = 0$, $a = g = 9.80\\ \\text{m/s}^2$, $y = 45.0\\ \\text{m}$.',
        'For time, use $y = v_0 t + \\tfrac{1}{2}gt^2$. With $v_0 = 0$: $45.0 = \\tfrac{1}{2}(9.80)t^2$.',
        '$t^2 = \\dfrac{2(45.0)}{9.80} = 9.18 \\Rightarrow t = 3.03\\ \\text{s}$.',
        'For speed, use $v = v_0 + gt = 0 + (9.80)(3.03) = 29.7\\ \\text{m/s}$.',
        'Check with $v^2 = 2gy = 2(9.80)(45.0) = 882 \\Rightarrow v = 29.7\\ \\text{m/s}$ ✓',
      ],
    },
    {
      question: 'A car moving at $25\\ \\text{m/s}$ brakes with a constant acceleration of $-5.0\\ \\text{m/s}^2$. How far does it travel before stopping?',
      parts: [
        { label: 'Stopping distance', value: 62.5, unit: 'm' },
      ],
      steps: [
        'Knowns: $v_0 = 25\\ \\text{m/s}$, $v = 0$, $a = -5.0\\ \\text{m/s}^2$. Time is not needed.',
        'Use $v^2 = v_0^2 + 2a\\,\\Delta x$.',
        '$0 = 25^2 + 2(-5.0)\\,\\Delta x \\Rightarrow \\Delta x = \\dfrac{625}{10} = 62.5\\ \\text{m}$.',
      ],
    },
  ],
};

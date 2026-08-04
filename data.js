/* ==========================================================================
   STEMIFY HIGH — SHARED CONTENT DATA
   --------------------------------------------------------------------------
   All article text, sample-paper questions, weekly MCQs, NCERT content and
   badges are MANUALLY INJECTED here (not AI-generated) so the UI stays fast
   and content stays curriculum-accurate. KaTeX is supported in article and
   solver content via standard \( ... \) inline / $$ ... $$ display math.
   ========================================================================== */

/* ---------------- ARTICLES (Suggested reading grid) ---------------- */
const STEMIFY_ARTICLES = [
  {
    id: "geometry-overview",
    title: "Geometry — The Science of Shape & Space",
    tag: "GEOMETRY",
    tagClass: "geometry",
    readTime: "9 min",
    level: "Class 8–12",
    excerpt: "From Euclid's axioms to GPS satellites — the complete story of the branch of mathematics that measures the world around you.",
    body: `
      <h2>What is Geometry?</h2>
      <p>Geometry (from the Greek <i>geo</i> — "earth" — and <i>metron</i> — "measure") is the branch of mathematics that studies the properties, measurements, and relationships of points, lines, angles, surfaces, and solids. It is one of the oldest branches of mathematics — so old that its roots stretch back before written history.</p>
      <p>Think of it as the language of shape and space: every map, blueprint, screen, and building is a geometry problem waiting to be solved.</p>

      <h2>A Brief History</h2>
      <ul>
        <li><b>Babylonians &amp; Egyptians (c. 3000–1500 BCE):</b> practical geometry for land surveying after Nile floods, construction of pyramids, and astronomy. The Rhind Papyrus contains early area and volume problems.</li>
        <li><b>Thales of Miletus (c. 600 BCE):</b> first to turn geometry into a system of logical deduction — credited with proving that a diameter bisects a circle and the angle-in-a-semicircle theorem.</li>
        <li><b>Euclid of Alexandria (c. 300 BCE):</b> wrote the <i>Elements</i>, 13 books that became the most influential textbook ever — a complete, axiomatic treatment of geometry used for 2,000+ years.</li>
        <li><b>René Descartes (1637):</b> introduced <b>coordinate geometry</b>, fusing algebra and geometry so shapes could be described by equations.</li>
        <li><b>19th century:</b> Gauss, Bolyai and Lobachevsky discovered <b>non-Euclidean geometry</b>, showing curved spaces follow different rules — the math behind GPS and relativity.</li>
      </ul>

      <h2>Building Blocks</h2>
      <ul>
        <li><b>Point</b> — a position in space with no size or dimension.</li>
        <li><b>Line</b> — a straight collection of points extending infinitely in both directions.</li>
        <li><b>Line segment</b> — a part of a line with two endpoints; <b>ray</b> — one endpoint extending infinitely.</li>
        <li><b>Plane</b> — a flat, two-dimensional surface extending infinitely.</li>
        <li><b>Angle</b> — formed by two rays sharing a common endpoint (vertex), measured in degrees or radians.</li>
      </ul>
      <blockquote>Angles come in families you'll meet constantly: acute (&lt; 90°), right (90°), obtuse (&gt; 90° but &lt; 180°), straight (180°) and reflex (&gt; 180°).</blockquote>

      <h2>Polygons</h2>
      <p>A <b>polygon</b> is a closed plane figure made of straight line segments. A polygon with n sides has interior angles that always add up to:</p>
      <p>$$ \\text{Sum of interior angles} = (n - 2) \\times 180° $$</p>
      <ul>
        <li>Triangle (n = 3) → 180°</li>
        <li>Quadrilateral (n = 4) → 360°</li>
        <li>Pentagon (n = 5) → 540°</li>
        <li>Hexagon (n = 6) → 720°</li>
      </ul>
      <p>In a <b>regular polygon</b> (all sides and angles equal), each exterior angle is $ \\frac{360°}{n} $, and each interior angle is $ 180° - \\frac{360°}{n} $.</p>

      <h2>Circles — The Perfect Shape</h2>
      <p>A circle is the set of all points at a fixed distance (the <b>radius</b>) from a fixed point (the <b>centre</b>). Its key measurements:</p>
      <p>$$ \\text{Circumference} = 2\\pi r, \\qquad \\text{Area} = \\pi r^2 $$</p>
      <ul>
        <li><b>Chord</b> — line segment joining two points on the circle; the longest chord is the <b>diameter</b> (d = 2r).</li>
        <li><b>Arc &amp; sector</b> — a piece of the circumference and the slice of area it spans.</li>
        <li><b>Tangent</b> — a line touching the circle at exactly one point; it is always <b>perpendicular to the radius</b> at the point of contact.</li>
        <li><b>Inscribed angle theorem</b> — the angle subtended by a chord at the centre is twice the angle subtended at any point on the remaining circumference.</li>
      </ul>
      <p>Note that π ≈ 3.14159… is irrational — its decimal never repeats and never ends.</p>

      <h2>Famous Theorems You Must Know</h2>
      <ul>
        <li><b>Pythagoras:</b> in a right triangle, $ a^2 + b^2 = c^2 $.</li>
        <li><b>Thales:</b> the angle in a semicircle is always a right angle (90°).</li>
        <li><b>Euclid:</b> vertically opposite angles are equal; base angles of an isosceles triangle are equal; the sum of triangle angles is 180°.</li>
        <li><b>Basic Proportionality Theorem:</b> a line parallel to one side of a triangle divides the other two sides proportionally.</li>
      </ul>

      <h2>Euclid's Axioms — The Foundation</h2>
      <p>Euclid built all of classical geometry on a handful of self-evident truths called <b>axioms</b> and <b>postulates</b>:</p>
      <blockquote>Things equal to the same thing are equal to each other. · If equals are added to equals, the wholes are equal. · A straight line may be drawn from any point to any other point. · All right angles are equal. · Through a point not on a line, exactly one parallel line can be drawn (the famous Fifth Postulate).</blockquote>
      <p>The Fifth Postulate's stubborn refusal to be proven was what eventually led mathematicians to invent non-Euclidean geometry.</p>

      <h2>Coordinate Geometry</h2>
      <p>Descartes' fusion of algebra and geometry lets every shape be an equation. The distance between two points is:</p>
      <p>$$ d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} $$</p>
      <p>and the midpoint is $ \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right) $. A straight line has the general form $ y = mx + c $, where m is the slope — a measure of steepness.</p>

      <h2>Modern Geometry &amp; Everyday Applications</h2>
      <ul>
        <li><b>Architecture &amp; engineering</b> — every truss, dome and bridge is a geometry calculation.</li>
        <li><b>Computer graphics &amp; games</b> — 3D models are thousands of triangles transformed in space.</li>
        <li><b>GPS navigation</b> — satellites use spherical (non-Euclidean) geometry to locate you on Earth's curved surface.</li>
        <li><b>Art &amp; design</b> — from the golden ratio in paintings to tessellations like Escher's.</li>
      </ul>

      <h3>Further Reading</h3>
      <p>For deeper study and practice sets, these references cover the same material in great detail: <b>Wikipedia — "Geometry"</b> (history &amp; branches), <b>Encyclopaedia Britannica — "Geometry"</b> (curves, solids and topology), and <b>BYJU'S — Geometry</b> (formulas, definitions and solved examples for CBSE/ICSE boards).</p>
    `
  },
  {
    id: "quadratics",
    title: "Quadratic Equations — The Gateway to Parabolas",
    tag: "ALGEBRA",
    tagClass: "algebra",
    readTime: "6 min",
    level: "Class 9–10",
    excerpt: "Why every equation of the form ax² + bx + c = 0 traces a perfect U-shaped curve, and how the discriminant decides everything.",
    body: `
      <h2>What is a Quadratic Equation?</h2>
      <p>A quadratic equation is a polynomial equation of degree 2, written in the standard form:</p>
      <p>$$ ax^2 + bx + c = 0, \\quad a \\neq 0 $$</p>
      <p>Because the highest power of the variable is 2, its graph is always a <b>parabola</b>. When a > 0, the parabola opens upward (like a cup); when a < 0, it opens downward (like a cap).</p>

      <h2>The Discriminant: A Magic Number</h2>
      <p>The expression inside the square root of the quadratic formula decides how many real roots an equation has:</p>
      <p>$$ D = b^2 - 4ac $$</p>
      <ul>
        <li><b>D > 0</b> → two distinct real roots</li>
        <li><b>D = 0</b> → one repeated real root (the parabola just touches the x-axis)</li>
        <li><b>D < 0</b> → no real roots (the curve never crosses the x-axis)</li>
      </ul>

      <h2>The Quadratic Formula</h2>
      <p>Every quadratic equation can be solved using this universal formula, derived by completing the square:</p>
      <p>$$ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>
      <blockquote>Memorize the formula, but also memorise the derivation — examiners love asking for it in 'prove' questions.</blockquote>

      <h2>Example</h2>
      <p>Solve $ x^2 - 5x + 6 = 0 $:</p>
      <ol>
        <li>Here a = 1, b = −5, c = 6, so D = 25 − 24 = 1.</li>
        <li>Substituting: $ x = \\frac{5 \\pm 1}{2} $, giving x = 3 or x = 2.</li>
      </ol>
      <p>Quick check: the sum of roots is 5 = −b/a and the product is 6 = c/a. This check catches silly arithmetic errors instantly.</p>
    `
  },
  {
    id: "pythagoras",
    title: "Pythagoras' Theorem — Beyond Triangles",
    tag: "GEOMETRY",
    tagClass: "geometry",
    readTime: "5 min",
    level: "Class 8–10",
    excerpt: "From right triangles to distances on a grid — the one theorem you will use in almost every math topic.",
    body: `
      <h2>The Statement</h2>
      <p>In any right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides:</p>
      <p>$$ a^2 + b^2 = c^2 $$</p>

      <h2>Why It Matters Everywhere</h2>
      <ul>
        <li><b>Coordinate geometry:</b> distance between two points is $ \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} $.</li>
        <li><b>Trigonometry:</b> the identity $ \\sin^2\\theta + \\cos^2\\theta = 1 $ is Pythagoras in disguise.</li>
        <li><b>Real life:</b> ladders against walls, TV screen sizes, and even GPS triangulation.</li>
      </ul>

      <h2>Triples to Memorise</h2>
      <p>Knowing common Pythagorean triples saves precious exam time: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17), (9, 40, 41).</p>

      <h2>Converse Theorem</h2>
      <p>If $ a^2 + b^2 = c^2 $ for the three sides of a triangle, the triangle is right-angled — this works backwards too, and it is a favourite exam question.</p>
    `
  },
  {
    id: "trigonometry",
    title: "Trigonometry — The Language of Angles",
    tag: "TRIGONOMETRY",
    tagClass: "trig",
    readTime: "7 min",
    level: "Class 10–12",
    excerpt: "Sine, cosine and tangent: how ratios of right-triangle sides unlock heights you can never measure directly.",
    body: `
      <h2>Defining the Ratios</h2>
      <p>For a right triangle with angle $ \\theta $:</p>
      <p>$$ \\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}, \\quad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}, \\quad \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}} $$</p>

      <h2>The Famous Table</h2>
      <p>Memorise these — they appear in almost every board paper:</p>
      <ul>
        <li>$ \\sin 0° = 0,\\; \\sin 30° = \\tfrac12,\\; \\sin 45° = \\tfrac{1}{\\sqrt2},\\; \\sin 60° = \\tfrac{\\sqrt3}{2},\\; \\sin 90° = 1 $</li>
        <li>Cosine runs the same list in reverse order.</li>
        <li>$ \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} $</li>
      </ul>

      <h2>Key Identities</h2>
      <p>$$ \\sin^2\\theta + \\cos^2\\theta = 1 $$</p>
      <p>$$ 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta $$</p>

      <h2>Applications: Heights and Distances</h2>
      <p>Standing d meters from a tower, you measure the angle of elevation as $ \\theta $. Then the tower's height is:</p>
      <p>$$ h = d \\cdot \\tan\\theta $$</p>
      <blockquote>Pro-tip: draw the triangle first, label everything, then choose the ratio — never start solving without a diagram.</blockquote>
    `
  },
  {
    id: "probability",
    title: "Probability — Measuring Uncertainty",
    tag: "STATISTICS",
    tagClass: "stats",
    readTime: "5 min",
    level: "Class 9–12",
    excerpt: "Coin tosses, dice rolls and card decks: the math of 'how likely', from fair experiments to real-world odds.",
    body: `
      <h2>The Core Definition</h2>
      <p>For equally likely outcomes:</p>
      <p>$$ P(E) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}} $$</p>

      <h2>Golden Rules</h2>
      <ul>
        <li>Probability always lies between 0 and 1: $ 0 \\le P(E) \\le 1 $.</li>
        <li>$ P(\\text{event}) + P(\\text{not event}) = 1 $</li>
        <li>Two events are <b>mutually exclusive</b> if they can't happen together.</li>
        <li>Two events are <b>independent</b> if one doesn't affect the other.</li>
      </ul>

      <h2>Classic Examples</h2>
      <ul>
        <li>Tossing 2 coins → 4 outcomes: HH, HT, TH, TT. P(exactly one head) = 2/4 = 1/2.</li>
        <li>Rolling 2 dice → 36 outcomes. P(sum = 7) = 6/36 = 1/6 — the most common sum!</li>
        <li>Drawing a card: P(king) = 4/52 = 1/13.</li>
      </ul>

      <h2>Complement Trick</h2>
      <p>When 'at least one' appears, solve the complement: P(at least one six in two rolls) = 1 − P(no six) = $ 1 - \\frac{25}{36} = \\frac{11}{36} $.</p>
    `
  },
  {
    id: "ap-series",
    title: "Arithmetic Progressions — Patterns Made Predictable",
    tag: "ALGEBRA",
    tagClass: "algebra",
    readTime: "6 min",
    level: "Class 10",
    excerpt: "Every sequence that adds the same number each step — from seating plans to stadium rows — compressed into two formulas.",
    body: `
      <h2>What is an A.P.?</h2>
      <p>A sequence where the difference between consecutive terms is constant is an Arithmetic Progression:</p>
      <p>$$ a,\\; a+d,\\; a+2d,\\; a+3d, \\dots $$</p>

      <h2>The nth Term</h2>
      <p>$$ a_n = a + (n-1)d $$</p>

      <h2>Sum of n Terms</h2>
      <p>$$ S_n = \\frac{n}{2}\\left[ 2a + (n-1)d \\right] = \\frac{n}{2}(a + a_n) $$</p>

      <h2>Example</h2>
      <p>Find the sum of the first 20 natural numbers. Here a = 1, d = 1, n = 20:</p>
      <p>$$ S_{20} = \\frac{20}{2}[2 + 19] = 10 \\times 21 = 210 $$</p>
      <blockquote>Remember: the average of the first and last term times the count of terms gives the total sum. That is the heart of the formula.</blockquote>
    `
  },
  {
    id: "statistics",
    title: "Statistics — Mean, Median, Mode & More",
    tag: "STATISTICS",
    tagClass: "stats",
    readTime: "5 min",
    level: "Class 9–10",
    excerpt: "Three numbers that summarise any dataset — and when each one lies to you.",
    body: `
      <h2>Mean (Average)</h2>
      <p>$$ \\bar{x} = \\frac{\\sum x_i}{n} $$</p>
      <p>The balance point of the data. Sensitive to extreme values (one huge score drags it up).</p>

      <h2>Median (Middle Value)</h2>
      <p>Sort the data; the median is the middle term. For n terms: median position is $ \\frac{n+1}{2} $.</p>
      <p>Robust to outliers — this is why salaries are usually reported by median.</p>

      <h2>Mode (Most Frequent)</h2>
      <p>The value appearing most often. Useful for categorical data like 'most popular subject'.</p>

      <h2>Empirical Relation</h2>
      <p>For a moderately skewed distribution:</p>
      <p>$$ \\text{Mode} \\approx 3\\text{Median} - 2\\text{Mean} $$</p>
      <blockquote>In grouped data, all three formulas are just weighted versions of these ideas. Understand the concept, not the memorised formula.</blockquote>
    `
  },
  {
    id: "exponents",
    title: "Exponents & Logarithms — Growth on Steroids",
    tag: "CALCULUS",
    tagClass: "calculus",
    readTime: "7 min",
    level: "Class 9–12",
    excerpt: "How repeated multiplication becomes smooth curves, and how logarithms undo it — the gateway to calculus.",
    body: `
      <h2>The Laws of Exponents</h2>
      <ul>
        <li>$ a^m \\times a^n = a^{m+n} $</li>
        <li>$ a^m \\div a^n = a^{m-n} $</li>
        <li>$ (a^m)^n = a^{mn} $</li>
        <li>$ a^{-m} = \\frac{1}{a^m} $ and $ a^0 = 1 $</li>
      </ul>

      <h2>Logarithms: The Inverse</h2>
      <p>If $ a^x = b $, then $ \\log_a b = x $. The logarithm answers: 'what power of the base gives this number?'</p>
      <p>$$ \\log_b (mn) = \\log_b m + \\log_b n, \\quad \\log_b \\frac{m}{n} = \\log_b m - \\log_b n $$</p>

      <h2>Exponential Growth</h2>
      <p>Population, bacteria and compound interest all follow:</p>
      <p>$$ A = P \\left(1 + \\frac{r}{100}\\right)^t $$</p>
      <blockquote>Exponential functions grow faster than every polynomial — this fact quietly powers most of calculus.</blockquote>
    `
  },
  {
    id: "triangles",
    title: "Triangles — Congruence & Similarity",
    tag: "GEOMETRY",
    tagClass: "geometry",
    readTime: "6 min",
    level: "Class 9–10",
    excerpt: "Four letters that prove two triangles are identical, and how similar triangles shrink maps to scale.",
    body: `
      <h2>Congruence Rules (Same Size & Shape)</h2>
      <ul>
        <li><b>SSS</b> — all three sides equal</li>
        <li><b>SAS</b> — two sides and the included angle equal</li>
        <li><b>ASA</b> — two angles and the included side equal</li>
        <li><b>RHS</b> — right angle, hypotenuse and one side equal</li>
      </ul>
      <p>Note: <b>AAA is NOT a congruence rule</b> — it only proves similarity.</p>

      <h2>Similarity (Same Shape)</h2>
      <p>Triangles are similar if corresponding angles are equal and sides are proportional:</p>
      <p>$$ \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF} = k $$</p>

      <h2>BPT (Basic Proportionality Theorem)</h2>
      <p>A line parallel to one side of a triangle divides the other two sides proportionally:</p>
      <p>$$ \\frac{AD}{DB} = \\frac{AE}{EC} $$</p>
      <blockquote>Exam tip: when you see 'prove that', always list what's given, what's common, and which rule applies — marks are awarded stepwise.</blockquote>
    `
  }
];

/* ---------------- SAMPLE QUESTION PAPERS (by class) ---------------- */
const STEMIFY_PAPERS = {
  9: {
    subject: "Mathematics (NCERT Pattern)",
    sections: [
      { name: "Section A — MCQ", marksPer: 1, total: 6, questions: [
        "Which of the following is an irrational number?  (a) 3.14  (b) √2  (c) 22/7  (d) 0.5",
        "The number of zeros of the polynomial x² + 2x + 1 is:  (a) 1  (b) 2  (c) 0  (d) 3",
        "In a parallelogram, opposite angles are:  (a) supplementary  (b) equal  (c) complementary  (d) always 90°",
        "The mean of 4, 8, 12, 16, 20 is:  (a) 10  (b) 12  (c) 14  (d) 16",
        "If p(x) = 2x³ − 3x² + 4x − 1, then p(0) equals:  (a) −1  (b) 0  (c) 1  (d) 2",
        "Two angles of a triangle are 45° and 55°. The third angle is:  (a) 70°  (b) 80°  (c) 90°  (d) 100°"
      ] },
      { name: "Section B — Short Answer", marksPer: 2, total: 4, questions: [
        "Find the value of k if the polynomial x² − kx + 6 has a zero at x = 2.",
        "Simplify: (√5 + √3)(√5 − √3) and state whether the result is rational or irrational.",
        "Prove that the sum of the angles of a quadrilateral is 360°.",
        "In the figure, AB ∥ CD. If one angle of the transversal is 70°, find the remaining three angles."
      ] },
      { name: "Section C — Long Answer", marksPer: 4, total: 2, questions: [
        "A triangle has sides 13 cm, 14 cm and 15 cm. Find its area using Heron's formula and the length of the altitude to the longest side.",
        "The median of 10 observations is 15. If two more observations, 8 and 22, are added, what happens to the median? Justify with steps."
      ] }
    ]
  },
  10: {
    subject: "Mathematics (NCERT Pattern)",
    sections: [
      { name: "Section A — MCQ", marksPer: 1, total: 6, questions: [
        "If sin θ = 3/5, then tan θ equals:  (a) 3/4  (b) 4/3  (c) 5/4  (d) 5/3",
        "The nth term of A.P. 5, 8, 11, ... is:  (a) 3n + 2  (b) 2n + 3  (c) 5n  (d) 3n + 5",
        "The discriminant of x² − 4x + 4 = 0 is:  (a) 0  (b) 4  (c) −4  (d) 16",
        "A tangent drawn to a circle is:  (a) parallel to the radius  (b) perpendicular to the radius at the point of contact  (c) longer than the diameter  (d) none of these",
        "If P(E) = 0.65, then P(not E) equals:  (a) 0.25  (b) 0.35  (c) 0.45  (d) 0.75",
        "Two dice are rolled together. The probability of getting a doublet is:  (a) 1/36  (b) 1/6  (c) 1/18  (d) 1/12"
      ] },
      { name: "Section B — Short Answer", marksPer: 2, total: 4, questions: [
        "Find the value of k for which the equation 2x² + kx + 3 = 0 has equal roots.",
        "In an A.P., the 7th term is 28 and the 12th term is 48. Find the first term and common difference.",
        "Prove that the tangents drawn from an external point to a circle are equal in length.",
        "A ladder 13 m long reaches a window 12 m above the ground. Find the distance of the foot of the ladder from the wall."
      ] },
      { name: "Section C — Long Answer", marksPer: 4, total: 2, questions: [
        "A motor boat whose speed in still water is 18 km/h takes 1 hour more to go 24 km upstream than to return downstream. Find the speed of the stream.",
        "The angle of elevation of the top of a tower from a point on the ground is 45°. On walking 40 m towards the tower, it becomes 60°. Find the height of the tower and the distance of the point from the tower."
      ] }
    ]
  },
  11: {
    subject: "Mathematics (NCERT Pattern)",
    sections: [
      { name: "Section A — MCQ", marksPer: 1, total: 6, questions: [
        "The value of i⁵ is:  (a) i  (b) −i  (c) 1  (d) −1",
        "lim(x→0) sin x / x equals:  (a) 0  (b) 1  (c) ∞  (d) −1",
        "The number of terms in the expansion of (x + y)²⁰ is:  (a) 20  (b) 21  (c) 19  (d) 22",
        "If P(A) = 1/3 and P(B) = 1/4 with A, B mutually exclusive, then P(A ∪ B) is:  (a) 7/12  (b) 1/12  (c) 1/7  (d) 3/4",
        "The derivative of x³ + 2x² − x + 5 at x = 1 is:  (a) 4  (b) 6  (c) 8  (d) 10",
        "The slope of the line 3x − 4y + 7 = 0 is:  (a) 3/4  (b) −3/4  (c) 4/3  (d) −4/3"
      ] },
      { name: "Section B — Short Answer", marksPer: 2, total: 4, questions: [
        "Find the 12th term in the expansion of (2x − 3)¹².",
        "Evaluate: lim(x→2) (x² − 4) / (x − 2).",
        "If A = {1, 2, 3} and B = {2, 3, 4}, verify that n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",
        "A die is thrown twice. Find the probability that the sum is at least 10."
      ] },
      { name: "Section C — Long Answer", marksPer: 4, total: 2, questions: [
        "Prove by the principle of mathematical induction that 1 + 2 + 3 + ... + n = n(n+1)/2 for all positive integers n.",
        "Find the equation of the circle passing through the points (0, 0), (2, 0) and (0, 4), and state its centre and radius."
      ] }
    ]
  },
  12: {
    subject: "Mathematics (NCERT Pattern)",
    sections: [
      { name: "Section A — MCQ", marksPer: 1, total: 6, questions: [
        "If A = [[1, 2],[3, 4]], then |A| equals:  (a) 2  (b) −2  (c) 10  (d) −10",
        "∫ 1/x dx equals:  (a) x + c  (b) ln|x| + c  (c) eˣ + c  (d) 1/x² + c",
        "The order of the differential equation (y')² + y'' = 0 is:  (a) 1  (b) 2  (c) 3  (d) 0",
        "If the vectors a and b are perpendicular, then a·b equals:  (a) 1  (b) |a||b|  (c) 0  (d) −1",
        "P(A|B) when P(A ∩ B) = 0.2 and P(B) = 0.5 is:  (a) 0.1  (b) 0.4  (c) 0.6  (d) 0.7",
        "The inverse of matrix [[1, 0],[0, 1]] is:  (a) itself  (b) null matrix  (c) undefined  (d) [[1, 1],[1, 1]]"
      ] },
      { name: "Section B — Short Answer", marksPer: 2, total: 4, questions: [
        "Evaluate ∫₀¹ x eˣ dx.",
        "Find the angle between the vectors a = i + 2j − k and b = 2i − j + k.",
        "If y = sin⁻¹ x, prove that dy/dx = 1/√(1 − x²).",
        "A bag contains 4 red and 6 blue balls. Two balls are drawn without replacement. Find the probability that both are red."
      ] },
      { name: "Section C — Long Answer", marksPer: 4, total: 2, questions: [
        "Solve the differential equation: dy/dx + y tan x = sec x, given that y = 0 when x = 0.",
        "Find the shortest distance between the lines r = (i + 2j + k) + λ(i − j + k) and r = (2i − j − k) + μ(2i + j + 2k)."
      ] }
    ]
  }
};

/* ---------------- WEEKLY MCQ TEST (auto-generated UI feed) ---------------- */
const STEMIFY_WEEKLY_MCQ = [
  { q: "If x² + 6x + k = 0 has equal roots, then k = ?", opts: ["6", "9", "12", "36"], ans: 1 },
  { q: "The next term of the A.P. 2, 5, 8, 11, ... is?", opts: ["12", "13", "14", "15"], ans: 2 },
  { q: "sin 60° + cos 30° equals?", opts: ["√3", "1", "2√3", "√3/2"], ans: 0 },
  { q: "A coin is tossed 3 times. Probability of exactly two heads?", opts: ["1/8", "3/8", "1/2", "5/8"], ans: 1 },
  { q: "The slope of the line joining (1, 2) and (3, 6) is?", opts: ["1", "2", "3", "4"], ans: 1 },
  { q: "∫ 2x dx equals?", opts: ["x² + c", "x³ + c", "2x² + c", "ln x + c"], ans: 0 },
  { q: "How many diagonals does a hexagon have?", opts: ["6", "9", "12", "15"], ans: 1 },
  { q: "log₂ 32 equals?", opts: ["4", "5", "6", "16"], ans: 1 }
];

/* ---------------- CBSE / NCERT HUB (Class 9 solved) ---------------- */
const STEMIFY_NCERT = [
  {
    chapter: "Ch 1 — Number Systems",
    qa: [
      { q: "Prove that √2 is irrational.", a: "Assume √2 = p/q in lowest terms. Then 2q² = p², so p² is even → p is even → p = 2k. Then 2q² = 4k² ⇒ q² = 2k² ⇒ q is even, contradicting lowest terms. Hence √2 is irrational." },
      { q: "Classify 0.123123123... as rational or irrational.", a: "Rational — it is a repeating decimal, expressible as 123/999 = 41/333." },
      { q: "Simplify: √72 + √32.", a: "√72 = 6√2 and √32 = 4√2, so the sum is 10√2." }
    ],
    tips: "Rationalise denominators using the conjugate (√a + √b)(√a − √b) = a − b. Memorise squares up to 20 to speed up simplification."
  },
  {
    chapter: "Ch 4 — Linear Equations in Two Variables",
    qa: [
      { q: "Find four solutions of x + 2y = 6.", a: "Fix x = 0 → y = 3; x = 2 → y = 2; x = 4 → y = 1; x = 6 → y = 0. Solutions: (0,3), (2,2), (4,1), (6,0)." },
      { q: "Where does the line 3x − y = 6 cut the x-axis?", a: "At the x-axis, y = 0 → 3x = 6 → x = 2. It cuts at (2, 0)." },
      { q: "Is (1, 1) a solution of 2x + y = 3?", a: "LHS = 2(1) + 1 = 3 = RHS. Yes, it is a solution." }
    ],
    tips: "Every linear equation in two variables has infinitely many solutions and its graph is always a straight line. Always check both coordinates."
  },
  {
    chapter: "Ch 6 — Lines and Angles",
    qa: [
      { q: "Prove that the sum of the angles of a triangle is 180°.", a: "Draw a line through a vertex parallel to the opposite side. Alternate interior angles plus the angle at the vertex form a straight line, giving 180°." },
      { q: "If two lines intersect, prove vertically opposite angles are equal.", a: "Let angles be a, b, c, d. Since a + b = 180° (linear pair) and b + c = 180°, a = c. Similarly b = d." },
      { q: "One angle of a linear pair is 55°. Find the other.", a: "Linear pair sums to 180°, so the other angle is 125°." }
    ],
    tips: "Practise angle-chasing: label every angle on the diagram with variables before writing any equation."
  },
  {
    chapter: "Ch 7 — Triangles",
    qa: [
      { q: "State and prove the Basic Proportionality Theorem.", a: "If a line parallel to one side of a triangle intersects the other two sides, it divides them proportionally. Proof uses areas: triangles with same base and between same parallels have equal areas." },
      { q: "In △ABC, AB = AC. Prove ∠B = ∠C.", a: "Draw the altitude from A to BC. The two right triangles have equal hypotenuse and a common side, so they are congruent by RHS, giving ∠B = ∠C." }
    ],
    tips: "SSS, SAS, ASA, RHS are your congruence toolkit. AAA never proves congruence — only similarity."
  },
  {
    chapter: "Ch 12 — Heron's Formula",
    qa: [
      { q: "Find the area of a triangle with sides 5, 6, 7 cm.", a: "s = (5+6+7)/2 = 9. Area = √(9·4·3·2) = √216 = 6√6 cm²." },
      { q: "When do you prefer Heron's formula?", a: "When the height is not given — i.e., when you only know the three sides." }
    ],
    tips: "For isosceles triangles, drop the altitude first — it often splits the problem into a 3-4-5 style right triangle."
  }
];

/* ---------------- GAMIFICATION DATA ---------------- */
const STEMIFY_BADGES = [
  { ic: "🚀", name: "First Launch", desc: "Create your account", unlocked: true },
  { ic: "📚", name: "Reader", desc: "Read 5 articles", unlocked: true },
  { ic: "⚡", name: "Quiz Slayer", desc: "Score 80%+ on a weekly test", unlocked: true },
  { ic: "🔥", name: "7-Day Streak", desc: "Study 7 days in a row", unlocked: true },
  { ic: "🧠", name: "Problem Solver", desc: "Solve 10 questions", unlocked: false },
  { ic: "🏆", name: "Top 10", desc: "Reach the leaderboard top 10", unlocked: false },
  { ic: "👑", name: "Champion", desc: "Win a weekly test", unlocked: false },
  { ic: "💎", name: "Premium", desc: "Upgrade to Premium", unlocked: false }
];

const STEMIFY_LEADERBOARD = [
  { name: "Ananya S.", pts: 2840, rank: 1 },
  { name: "Rahul V.", pts: 2715, rank: 2 },
  { name: "Sneha K.", pts: 2560, rank: 3 },
  { name: "Arjun M.", pts: 2420, rank: 4 },
  { name: "You", pts: 2310, rank: 5, me: true },
  { name: "Priya T.", pts: 2250, rank: 6 },
  { name: "Kabir D.", pts: 2105, rank: 7 },
  { name: "Ishita G.", pts: 1980, rank: 8 }
];

/* ---------------- STUDY PLAN (AI-generated weekly goals) ---------------- */
const STEMIFY_PLAN = [
  { day: "MON", goal: "Quadratic Equations — 20 practice questions", pct: 100, done: true },
  { day: "TUE", goal: "Trigonometry ratios table + 15 questions", pct: 100, done: true },
  { day: "WED", goal: "A.P. — nth term & sum formulas", pct: 65, done: false },
  { day: "THU", goal: "Probability — dice & card problems", pct: 40, done: false },
  { day: "FRI", goal: "Coordinate Geometry — distance formula drills", pct: 10, done: false },
  { day: "SAT", goal: "Weekly MCQ test + error review", pct: 0, done: false },
  { day: "SUN", goal: "Full mock paper under timed conditions", pct: 0, done: false }
];

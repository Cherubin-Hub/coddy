export const cssLessons = [
  // ==========================================
  // TIER 1: BEGINNER (Foundations & Mechanics)
  // ==========================================
  {
    id: "c1",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "CSS Architecture",
    track: "css",
    title: "1. The Cascade Algorithm, Origin & Specificity",
    estimatedTime: "10 min",
    summary: "Understand how CSS resolves rule conflicts via the Cascade, calculate specificity mathematically, and avoid `!important` antipatterns.",
    content: `
      <h2>The Cascade Algorithm</h2>
      <p>CSS stands for <strong>Cascading Style Sheets</strong>. When multiple declarations target the same property on an element, the browser resolves conflicts using three criteria:</p>
      <ol>
        <li><strong>Origin &amp; Importance:</strong> User-agent styles &lt; User styles &lt; Author styles &lt; <code>!important</code></li>
        <li><strong>Specificity Score:</strong> A mathematical weight calculated from selector types</li>
        <li><strong>Source Order:</strong> When specificity is equal, the last declared rule wins</li>
      </ol>

      <h3>Specificity Calculator</h3>
      <div class="code-table">
        <div class="table-row header"><span>Selector Category</span><span>Score Weight</span><span>Example</span></div>
        <div class="table-row"><code>Inline Styles</code><span>1-0-0-0</span><span><code>style="color: red;"</code></span></div>
        <div class="table-row"><code>ID Selectors</code><span>0-1-0-0</span><span><code>#main-nav</code></span></div>
        <div class="table-row"><code>Classes / Attributes / Pseudo-classes</code><span>0-0-1-0</span><span><code>.btn, [type="text"], :hover</code></span></div>
        <div class="table-row"><code>Type Elements / Pseudo-elements</code><span>0-0-0-1</span><span><code>p, div, ::before</code></span></div>
      </div>
    `,
    starterCode: `<style>
  p { color: #64748b; font-size: 16px; font-family: sans-serif; }
  .highlight { color: #2563eb; font-weight: bold; }
  #special { color: #f43f5e; text-decoration: underline; }
</style>

<div style="padding: 20px;">
  <p>Standard paragraph text (Type selector: 0-0-0-1)</p>
  <p class="highlight">Class paragraph (Class selector: 0-0-1-0)</p>
  <p id="special" class="highlight">ID paragraph (ID selector: 0-1-0-0 wins!)</p>
</div>`,
    solutionCode: `<style>
  p { color: #64748b; font-size: 16px; font-family: sans-serif; }
  .highlight { color: #2563eb; font-weight: bold; }
  #special { color: #f43f5e; text-decoration: underline; }
</style>

<div style="padding: 20px;">
  <p>Standard paragraph text (Type selector: 0-0-0-1)</p>
  <p class="highlight">Class paragraph (Class selector: 0-0-1-0)</p>
  <p id="special" class="highlight">ID paragraph (ID selector: 0-1-0-0 wins!)</p>
</div>`,
    quiz: [
      {
        question: "Which selector has higher specificity: `.card.featured` (two classes) or `#main-card` (one ID)?",
        options: [
          "`#main-card` (ID is 0-1-0-0 vs Class 0-0-2-0)",
          "`.card.featured` because it has two classes",
          "They are equal in specificity",
          "Whichever is declared first in the stylesheet"
        ],
        answer: 0,
        explanation: "One ID selector (0-1-0-0) always beats any number of class selectors (0-0-2-0)."
      },
      {
        question: "When two rules target the exact same element with identical specificity, which rule wins?",
        options: [
          "The rule that appears later (last) in the stylesheet source order",
          "The first rule",
          "The rule with more properties",
          "The browser picks at random"
        ],
        answer: 0,
        explanation: "By the Cascade's source order rule, when specificity is tied, the declaration declared last wins."
      }
    ],
    exercise: {
      instruction: "Write a CSS rule targeting `.banner` that sets `background-color: #3b82f6;` and `color: white;`.",
      starter: `<style>
  /* Write .banner rule here */
</style>
<div class="banner">Announcement Message</div>`,
      solution: `<style>
  .banner {
    background-color: #3b82f6;
    color: white;
  }
</style>
<div class="banner">Announcement Message</div>`,
      hint: ".banner { background-color: #3b82f6; color: white; }",
      validate: (code) => {
        return code.includes(".banner") && code.includes("background-color") && code.includes("color");
      }
    }
  },
  {
    id: "c2",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Selectors",
    track: "css",
    title: "2. Modern Selectors: Pseudo-classes & Pseudo-elements",
    estimatedTime: "12 min",
    summary: "Leverage `:hover`, `:focus-visible`, `::before`, `::after`, and modern grouping pseudo-classes `:is()` and `:where()`.",
    content: `
      <h2>Beyond Simple Classes</h2>
      <p>Pseudo-classes select elements based on state, while pseudo-elements generate virtual content.</p>

      <h3>Modern Grouping with <code>:is()</code> and <code>:where()</code></h3>
      <pre><code class="language-css">/* Grouping selectors cleanly with :is() */
:is(header, main, footer) h1 {
  color: #3b82f6;
}

/* :where() is identical but has ZERO specificity (0-0-0-0)! */
:where(button, input, select) {
  font-family: inherit;
}</code></pre>

      <h3>Virtual DOM Nodes with <code>::before</code> &amp; <code>::after</code></h3>
      <pre><code class="language-css">.badge::before {
  content: "★ ";
  color: #f59e0b;
}</code></pre>
    `,
    starterCode: `<style>
  .btn {
    padding: 10px 18px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 14px;
    transition: background 0.2s;
  }
  .btn:hover { background: #1d4ed8; }
  .btn:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
</style>

<div style="padding: 20px;">
  <button class="btn">Hover or Tab to Focus</button>
</div>`,
    solutionCode: `<style>
  .btn {
    padding: 10px 18px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 14px;
    transition: background 0.2s;
  }
  .btn:hover { background: #1d4ed8; }
  .btn:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
</style>

<div style="padding: 20px;">
  <button class="btn">Hover or Tab to Focus</button>
</div>`,
    quiz: [
      {
        question: "Why is `:focus-visible` preferred over `:focus` for button styling?",
        options: [
          "It only displays focus rings when navigating via keyboard (tabbing), avoiding annoying outlines on mouse clicks",
          "It works faster on mobile",
          "`:focus` is deprecated",
          "It forces high-contrast mode"
        ],
        answer: 0,
        explanation: "`:focus-visible` intelligently displays focus indicators for keyboard navigation while suppressing them for mouse clicks."
      },
      {
        question: "What is required for a `::before` or `::after` pseudo-element to render on screen?",
        options: [
          "The `content` property must be specified (e.g. `content: ''`)",
          "A JavaScript event listener",
          "A z-index value of 100",
          "An ID selector"
        ],
        answer: 0,
        explanation: "Without a `content` property (even an empty string `content: ''`), generated pseudo-elements will not render in the DOM."
      }
    ],
    exercise: {
      instruction: "Add a hover state `.btn:hover` that sets `background: #10b981;`.",
      starter: `<style>
  .btn { background: #3b82f6; color: white; padding: 8px 14px; border: none; }
  /* Add :hover here */
</style>
<button class="btn">Action</button>`,
      solution: `<style>
  .btn { background: #3b82f6; color: white; padding: 8px 14px; border: none; }
  .btn:hover { background: #10b981; }
</style>
<button class="btn">Action</button>`,
      hint: ".btn:hover { background: #10b981; }",
      validate: (code) => {
        return code.includes(".btn:hover") && code.includes("#10b981");
      }
    }
  },
  {
    id: "c3",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Box Model",
    track: "css",
    title: "3. The Box Model Decoded & Margin Collapsing",
    estimatedTime: "12 min",
    summary: "Master content, padding, border, margin, margin collapsing rules, and understand why every project sets `box-sizing: border-box`.",
    content: `
      <h2>The Layers of Every Box</h2>
      <p>Every HTML element is rendered as a rectangular box composed of four concentric layers:</p>

      <div class="diagram-card">
        <div class="pipeline-step"><code>Margin</code><span class="sub">Spacing outside the box</span></div>
        <div class="pipeline-arrow">➔</div>
        <div class="pipeline-step"><code>Border</code><span class="sub">Stroke around padding</span></div>
        <div class="pipeline-arrow">➔</div>
        <div class="pipeline-step"><code>Padding</code><span class="sub">Clear space inside box</span></div>
        <div class="pipeline-arrow">➔</div>
        <div class="pipeline-step highlight"><code>Content</code><span class="sub">Text, images, children</span></div>
      </div>

      <h3>The Universal Reset: <code>box-sizing: border-box</code></h3>
      <p>By default (<code>content-box</code>), adding padding expands the element beyond its declared width. <code>border-box</code> keeps the width fixed:</p>
      <pre><code class="language-css">*, *::before, *::after {
  box-sizing: border-box;
}</code></pre>
    `,
    starterCode: `<style>
  .card-box {
    box-sizing: border-box;
    width: 280px;
    padding: 20px;
    border: 4px solid #3b82f6;
    background: #eff6ff;
    border-radius: 8px;
    font-family: sans-serif;
  }
</style>

<div class="card-box">
  <h4>border-box Component</h4>
  <p>Padding & border are included inside the 280px width!</p>
</div>`,
    solutionCode: `<style>
  .card-box {
    box-sizing: border-box;
    width: 280px;
    padding: 20px;
    border: 4px solid #3b82f6;
    background: #eff6ff;
    border-radius: 8px;
    font-family: sans-serif;
  }
</style>

<div class="card-box">
  <h4>border-box Component</h4>
  <p>Padding & border are included inside the 280px width!</p>
</div>`,
    quiz: [
      {
        question: "With `box-sizing: border-box`, if an element has `width: 200px`, `padding: 20px`, and `border: 2px`, what is its total rendered width?",
        options: ["200px", "244px", "222px", "160px"],
        answer: 0,
        explanation: "`border-box` guarantees the declared width encompasses content, padding, and border, keeping the total width exactly 200px."
      },
      {
        question: "What is margin collapsing in CSS?",
        options: [
          "When adjacent vertical block margins combine into a single margin equal to the largest margin",
          "When margins disappear on mobile screens",
          "When padding overrides margins",
          "A bug in CSS grid"
        ],
        answer: 0,
        explanation: "In standard document flow, adjacent vertical margins collapse into a single margin equal to the maximum of the two."
      }
    ],
    exercise: {
      instruction: "Apply `box-sizing: border-box;`, `padding: 16px;`, and `border-radius: 8px;` to `.panel`.",
      starter: `<style>
  .panel {
    background: #f1f5f9;
    /* Add properties here */
  }
</style>
<div class="panel">Panel Content</div>`,
      solution: `<style>
  .panel {
    background: #f1f5f9;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 8px;
  }
</style>
<div class="panel">Panel Content</div>`,
      hint: "box-sizing: border-box; padding: 16px; border-radius: 8px;",
      validate: (code) => {
        return code.includes("box-sizing: border-box") && code.includes("padding: 16px") && code.includes("border-radius");
      }
    }
  },
  {
    id: "c4",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Display Modes",
    track: "css",
    title: "4. Display Properties & Visual Formatting Contexts",
    estimatedTime: "10 min",
    summary: "Understand the core display behaviors: `block`, `inline`, `inline-block`, `none`, and the difference between `display: none` and `visibility: hidden`.",
    content: `
      <h2>The Flow of Elements</h2>
      <p>How an element participates in document flow is controlled by its <code>display</code> property:</p>

      <div class="code-table">
        <div class="table-row header"><span>Value</span><span>Line Behavior</span><span>Width / Height Respect</span></div>
        <div class="table-row"><code>block</code><span>Takes full line width, stacks vertically</span><span>✅ Responds to width &amp; height</span></div>
        <div class="table-row"><code>inline</code><span>Flows inline with text</span><span>❌ Ignores width, height, top/bottom margin</span></div>
        <div class="table-row"><code>inline-block</code><span>Flows inline with text</span><span>✅ Responds to width &amp; height!</span></div>
        <div class="table-row"><code>none</code><span>Completely removed from DOM layout</span><span>Occupies 0px space</span></div>
      </div>
    `,
    starterCode: `<style>
  .inline-badge {
    display: inline-block;
    padding: 4px 10px;
    background: #3b82f6;
    color: white;
    border-radius: 4px;
    font-family: sans-serif;
    font-size: 13px;
  }
</style>

<p style="font-family: sans-serif;">
  Here is regular text with an <span class="inline-badge">inline-block badge</span> placed neatly inside the paragraph.
</p>`,
    solutionCode: `<style>
  .inline-badge {
    display: inline-block;
    padding: 4px 10px;
    background: #3b82f6;
    color: white;
    border-radius: 4px;
    font-family: sans-serif;
    font-size: 13px;
  }
</style>

<p style="font-family: sans-serif;">
  Here is regular text with an <span class="inline-badge">inline-block badge</span> placed neatly inside the paragraph.
</p>`,
    quiz: [
      {
        question: "What is the difference between `display: none` and `visibility: hidden`?",
        options: [
          "`display: none` removes the element completely from layout; `visibility: hidden` hides it visually while still preserving its physical space",
          "`visibility: hidden` deletes the DOM node",
          "There is no difference",
          "`display: none` is only for mobile"
        ],
        answer: 0,
        explanation: "`display: none` causes the element to occupy no space; `visibility: hidden` makes it transparent but preserves its layout dimensions."
      },
      {
        question: "Can standard `inline` elements (like `<span>`) accept custom `width` and `height` properties?",
        options: [
          "No, inline elements ignore width and height; use `inline-block` or `block` instead",
          "Yes, always",
          "Only if they have an ID",
          "Only in strict mode"
        ],
        answer: 0,
        explanation: "Pure inline elements calculate their dimensions solely from their text/child content and ignore declared width/height."
      }
    ],
    exercise: {
      instruction: "Convert `.nav-item` to `display: inline-block;` with `padding: 8px 12px;`.",
      starter: `<style>
  .nav-item {
    /* Add display and padding */
  }
</style>
<span class="nav-item">Link 1</span>
<span class="nav-item">Link 2</span>`,
      solution: `<style>
  .nav-item {
    display: inline-block;
    padding: 8px 12px;
  }
</style>
<span class="nav-item">Link 1</span>
<span class="nav-item">Link 2</span>`,
      hint: "display: inline-block; padding: 8px 12px;",
      validate: (code) => {
        return code.includes("display: inline-block") && code.includes("padding: 8px 12px");
      }
    }
  },
  {
    id: "c5",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Units & Math",
    track: "css",
    title: "5. Modern CSS Units: `rem`, `ch`, `dvh` & `clamp()`",
    estimatedTime: "12 min",
    summary: "Move beyond rigid pixels: master relative units (`rem`, `em`), viewport units (`vw`, `vh`, dynamic `dvh`), and math functions (`calc()`, `min()`, `clamp()`).",
    content: `
      <h2>The Fluid Web: Units Matter</h2>
      <p>Hardcoding pixels (<code>px</code>) breaks when users change their operating system font size preferences. Modern CSS uses relative units:</p>

      <div class="code-table">
        <div class="table-row header"><span>Unit</span><span>Relative To</span><span>Ideal Use Case</span></div>
        <div class="table-row"><code>rem</code><span>Root (<code>&lt;html&gt;</code>) font size (typically 16px)</span><span>Typography, padding, spacing</span></div>
        <div class="table-row"><code>em</code><span>Current element's font size</span><span>Component-scoped padding, icons</span></div>
        <div class="table-row"><code>ch</code><span>Width of the "0" (zero) character</span><span>Constraining line length (e.g. <code>max-width: 65ch</code>)</span></div>
        <div class="table-row"><code>dvh</code><span>Dynamic viewport height (accounts for mobile address bars)</span><span>Full-screen hero sections</span></div>
      </div>

      <h3>Fluid Sizing with <code>clamp(min, preferred, max)</code></h3>
      <pre><code class="language-css">/* Scales smoothly from 1.5rem on mobile up to 3rem on large displays! */
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}</code></pre>
    `,
    starterCode: `<style>
  .fluid-heading {
    font-family: sans-serif;
    font-size: clamp(1.25rem, 3vw + 0.5rem, 2.5rem);
    color: #1e293b;
    margin: 0;
  }
  .readable-text {
    font-family: sans-serif;
    max-width: 65ch; /* Optimal reading measure */
    line-height: 1.7;
    color: #475569;
  }
</style>

<div style="padding: 20px;">
  <h2 class="fluid-heading">Fluid Responsive Typography</h2>
  <p class="readable-text">
    Limiting line length to approximately 65ch ensures text is effortless to read without straining eyes across ultra-wide desktop monitors.
  </p>
</div>`,
    solutionCode: `<style>
  .fluid-heading {
    font-family: sans-serif;
    font-size: clamp(1.25rem, 3vw + 0.5rem, 2.5rem);
    color: #1e293b;
    margin: 0;
  }
  .readable-text {
    font-family: sans-serif;
    max-width: 65ch;
    line-height: 1.7;
    color: #475569;
  }
</style>

<div style="padding: 20px;">
  <h2 class="fluid-heading">Fluid Responsive Typography</h2>
  <p class="readable-text">
    Limiting line length to approximately 65ch ensures text is effortless to read without straining eyes across ultra-wide desktop monitors.
  </p>
</div>`,
    quiz: [
      {
        question: "What is `1rem` equal to by default in most standard browser configurations?",
        options: ["16px", "10px", "12px", "20px"],
        answer: 0,
        explanation: "Browsers default to a base root font-size of 16px, so `1rem = 16px` unless the user has scaled their default settings."
      },
      {
        question: "Why is `100dvh` preferred over `100vh` on mobile browsers?",
        options: [
          "`dvh` dynamically adjusts when the mobile browser's address/navigation bar expands or retracts",
          "`dvh` renders in 60fps",
          "`100vh` does not work on iOS",
          "It forces dark mode"
        ],
        answer: 0,
        explanation: "`dvh` (Dynamic Viewport Height) accounts for dynamic browser UI chrome (like address bars) that appear and disappear during scrolling."
      }
    ],
    exercise: {
      instruction: "Set `max-width: 60ch;` and `font-size: 1.25rem;` on `.article-body`.",
      starter: `<style>
  .article-body {
    /* Add max-width and font-size */
  }
</style>
<p class="article-body">Text content goes here.</p>`,
      solution: `<style>
  .article-body {
    max-width: 60ch;
    font-size: 1.25rem;
  }
</style>
<p class="article-body">Text content goes here.</p>`,
      hint: "max-width: 60ch; font-size: 1.25rem;",
      validate: (code) => {
        return code.includes("max-width: 60ch") && code.includes("font-size: 1.25rem");
      }
    }
  },
  {
    id: "c6",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Typography",
    track: "css",
    title: "6. Typography, Web Fonts & `font-display`",
    estimatedTime: "10 min",
    summary: "Load web fonts efficiently, eliminate Flash of Invisible Text (FOIT) with `font-display: swap`, and master line heights and letter spacing.",
    content: `
      <h2>Web Typography Mastery</h2>
      <p>Typography is 90% of web design. Proper font-stacking and loading strategies guarantee great performance and visual polish.</p>

      <h3>Loading Custom Fonts Efficiently with <code>@font-face</code></h3>
      <pre><code class="language-css">@font-face {
  font-family: "CustomSans";
  src: url("/fonts/custom-sans.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Immediately renders fallback font while downloading */
}</code></pre>
    `,
    starterCode: `<style>
  .hero-text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 24px;
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: #0f172a;
  }
  .sub-text {
    font-family: inherit;
    font-size: 16px;
    line-height: 1.6;
    color: #475569;
  }
</style>

<div style="padding: 20px;">
  <div class="hero-text">Crafting Modern Digital Experiences</div>
  <p class="sub-text">Proper line-height and letter-spacing elevate ordinary text into readable prose.</p>
</div>`,
    solutionCode: `<style>
  .hero-text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 24px;
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: #0f172a;
  }
  .sub-text {
    font-family: inherit;
    font-size: 16px;
    line-height: 1.6;
    color: #475569;
  }
</style>

<div style="padding: 20px;">
  <div class="hero-text">Crafting Modern Digital Experiences</div>
  <p class="sub-text">Proper line-height and letter-spacing elevate ordinary text into readable prose.</p>
</div>`,
    quiz: [
      {
        question: "What problem does `font-display: swap` solve?",
        options: [
          "Prevents blank invisible text while custom web fonts are downloading over the network",
          "Converts fonts to bold automatically",
          "Compresses font files by 90%",
          "Swaps dark and light themes"
        ],
        answer: 0,
        explanation: "`font-display: swap` tells the browser to immediately render a system fallback font until the custom web font is downloaded, eliminating blank text."
      },
      {
        question: "Why should `line-height` generally be set as a unitless multiplier (e.g. `line-height: 1.6`) rather than pixels?",
        options: [
          "Unitless line-height scales proportionally whenever child elements inherit different font sizes",
          "Pixels are not supported in CSS typography",
          "Unitless line-height runs faster in the GPU",
          "It forces center alignment"
        ],
        answer: 0,
        explanation: "Unitless multipliers inherit as proportions (e.g. `1.6 * current font size`), avoiding clipping when child elements have larger font sizes."
      }
    ],
    exercise: {
      instruction: "Set `line-height: 1.7;` and `letter-spacing: -0.01em;` on `.readable`.",
      starter: `<style>
  .readable {
    /* Add line-height and letter-spacing */
  }
</style>
<p class="readable">Typography exercise content.</p>`,
      solution: `<style>
  .readable {
    line-height: 1.7;
    letter-spacing: -0.01em;
  }
</style>
<p class="readable">Typography exercise content.</p>`,
      hint: "line-height: 1.7; letter-spacing: -0.01em;",
      validate: (code) => {
        return code.includes("line-height: 1.7") && code.includes("letter-spacing");
      }
    }
  },

  // ========================================================
  // TIER 2: INTERMEDIATE (Layout Engines & Visual Crafting)
  // ========================================================
  {
    id: "c7",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Positioning",
    track: "css",
    title: "7. CSS Positioning & Stacking Contexts (`z-index`)",
    estimatedTime: "14 min",
    summary: "Control exact element placement with `relative`, `absolute`, `fixed`, `sticky`, and debug 3D layer bugs with Stacking Contexts.",
    content: `
      <h2>The Positioning Schemes</h2>
      <div class="code-table">
        <div class="table-row header"><span>Position</span><span>Positioned Relative To</span><span>In Document Flow?</span></div>
        <div class="table-row"><code>static</code> (default)<span>Normal flow</span><span>✅ Yes</span></div>
        <div class="table-row"><code>relative</code><span>Its own natural position</span><span>✅ Yes (leaves gap)</span></div>
        <div class="table-row"><code>absolute</code><span>Nearest non-static ancestor</span><span>❌ No (removed from flow)</span></div>
        <div class="table-row"><code>fixed</code><span>The browser viewport</span><span>❌ No (stays pinned on scroll)</span></div>
        <div class="table-row"><code>sticky</code><span>Flow until threshold reached, then pins</span><span>✅ Yes</span></div>
      </div>

      <h3>Why <code>z-index: 99999</code> Fails: Stacking Contexts</h3>
      <p>An element cannot appear above another element if its parent creates a lower stacking context! Properties like <code>opacity &lt; 1</code>, <code>transform</code>, and <code>filter</code> trigger new stacking contexts.</p>
    `,
    starterCode: `<div style="position: relative; height: 160px; background: #f1f5f9; border-radius: 8px; padding: 16px; font-family: sans-serif;">
  <p>Parent container with <code>position: relative;</code></p>
  
  <div style="position: absolute; bottom: 12px; right: 12px; background: #2563eb; color: white; padding: 6px 12px; border-radius: 4px; font-size: 13px;">
    Pinned to Bottom-Right
  </div>
</div>`,
    solutionCode: `<div style="position: relative; height: 160px; background: #f1f5f9; border-radius: 8px; padding: 16px; font-family: sans-serif;">
  <p>Parent container with <code>position: relative;</code></p>
  
  <div style="position: absolute; bottom: 12px; right: 12px; background: #2563eb; color: white; padding: 6px 12px; border-radius: 4px; font-size: 13px;">
    Pinned to Bottom-Right
  </div>
</div>`,
    quiz: [
      {
        question: "What must a parent element have so that an `absolute` child positions relative to it?",
        options: [
          "Any `position` value other than `static` (such as `position: relative`)",
          "`display: flex`",
          "`overflow: hidden`",
          "A specified z-index"
        ],
        answer: 0,
        explanation: "`position: absolute` positions relative to the nearest positioned ancestor (an ancestor whose position is anything other than `static`)."
      },
      {
        question: "When does `position: sticky` stick to the screen?",
        options: [
          "Once the user scrolls past its defined offset (e.g. `top: 0`) within its parent container",
          "Immediately on page load",
          "Only when hovering",
          "Only on mobile devices"
        ],
        answer: 0,
        explanation: "`sticky` acts as normal document flow until the scroll position reaches the specified offset threshold."
      }
    ],
    exercise: {
      instruction: "Make `.sticky-header` stick to the top with `position: sticky;` and `top: 0;`.",
      starter: `<style>
  .sticky-header {
    background: #1e293b;
    color: white;
    padding: 12px;
    /* Add sticky positioning */
  }
</style>
<header class="sticky-header">Sticky Header</header>`,
      solution: `<style>
  .sticky-header {
    background: #1e293b;
    color: white;
    padding: 12px;
    position: sticky;
    top: 0;
  }
</style>
<header class="sticky-header">Sticky Header</header>`,
      hint: "position: sticky; top: 0;",
      validate: (code) => {
        return code.includes("position: sticky") && code.includes("top: 0");
      }
    }
  },
  {
    id: "c8",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Flexbox",
    track: "css",
    title: "8. Flexbox 1D Layout System",
    estimatedTime: "14 min",
    summary: "Distribute space and align items along 1D axes with `display: flex`, `justify-content`, `align-items`, and `gap`.",
    content: `
      <h2>The Flexbox Model</h2>
      <p>Flexbox simplifies distributing space between navigation bars, cards, and toolbars.</p>
      <pre><code class="language-css">.toolbar {
  display: flex;
  justify-content: space-between; /* Space out ends */
  align-items: center;            /* Center cross-axis */
  gap: 16px;
}</code></pre>
    `,
    starterCode: `<nav style="display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: white; padding: 14px 20px; border-radius: 8px; font-family: sans-serif;">
  <span style="font-weight: bold; font-size: 18px;">⚡ Academy</span>
  <div style="display: flex; gap: 14px;">
    <a href="#" style="color: #38bdf8; text-decoration: none;">Courses</a>
    <a href="#" style="color: #38bdf8; text-decoration: none;">Community</a>
  </div>
</nav>`,
    solutionCode: `<nav style="display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: white; padding: 14px 20px; border-radius: 8px; font-family: sans-serif;">
  <span style="font-weight: bold; font-size: 18px;">⚡ Academy</span>
  <div style="display: flex; gap: 14px;">
    <a href="#" style="color: #38bdf8; text-decoration: none;">Courses</a>
    <a href="#" style="color: #38bdf8; text-decoration: none;">Community</a>
  </div>
</nav>`,
    quiz: [
      {
        question: "Which flex property controls spacing along the main axis?",
        options: ["`justify-content`", "`align-items`", "`flex-wrap`", "`align-content`"],
        answer: 0,
        explanation: "`justify-content` aligns and distributes items along the main axis."
      },
      {
        question: "How do you allow flex items to wrap onto a second row if space overflows?",
        options: ["`flex-wrap: wrap;`", "`flex-direction: wrap;`", "`wrap: true;`", "`display: flex-wrap;`"],
        answer: 0,
        explanation: "`flex-wrap: wrap` permits flex children to spill into new lines when overflowing."
      }
    ],
    exercise: {
      instruction: "Create a flex container on `.flex-bar` with `display: flex;` and `justify-content: space-between;`.",
      starter: `<style>
  .flex-bar {
    /* Add flex styles */
  }
</style>
<div class="flex-bar">
  <div>Left Item</div>
  <div>Right Item</div>
</div>`,
      solution: `<style>
  .flex-bar {
    display: flex;
    justify-content: space-between;
  }
</style>
<div class="flex-bar">
  <div>Left Item</div>
  <div>Right Item</div>
</div>`,
      hint: "display: flex; justify-content: space-between;",
      validate: (code) => {
        return code.includes("display: flex") && code.includes("justify-content: space-between");
      }
    }
  },
  {
    id: "c9",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Flexbox",
    track: "css",
    title: "9. Flexbox Item Sizing: `grow`, `shrink` & `basis`",
    estimatedTime: "12 min",
    summary: "Control how items expand and contract with the `flex` shorthand (`flex: 1 0 auto`), preventing overflow bugs.",
    content: `
      <h2>The Three Flex Sizing Controls</h2>
      <ul>
        <li><code>flex-grow: 1</code>: Consumes leftover space proportionally.</li>
        <li><code>flex-shrink: 0</code>: Forbids the item from compressing smaller than its basis.</li>
        <li><code>flex-basis: 200px</code>: The initial starting size before growing or shrinking.</li>
      </ul>
      <pre><code class="language-css">/* Shorthand: flex: grow shrink basis */
.sidebar { flex: 0 0 250px; } /* Fixed 250px width, never grows or shrinks */
.main    { flex: 1 1 0; }     /* Stretches to fill all remaining space */</code></pre>
    `,
    starterCode: `<div style="display: flex; gap: 12px; font-family: sans-serif; background: #f1f5f9; padding: 12px; border-radius: 8px;">
  <div style="flex: 0 0 100px; background: #3b82f6; color: white; padding: 16px; border-radius: 4px; text-align: center;">
    Fixed 100px
  </div>
  <div style="flex: 1; background: #10b981; color: white; padding: 16px; border-radius: 4px; text-align: center;">
    Flexible (flex: 1)
  </div>
</div>`,
    solutionCode: `<div style="display: flex; gap: 12px; font-family: sans-serif; background: #f1f5f9; padding: 12px; border-radius: 8px;">
  <div style="flex: 0 0 100px; background: #3b82f6; color: white; padding: 16px; border-radius: 4px; text-align: center;">
    Fixed 100px
  </div>
  <div style="flex: 1; background: #10b981; color: white; padding: 16px; border-radius: 4px; text-align: center;">
    Flexible (flex: 1)
  </div>
</div>`,
    quiz: [
      {
        question: "What does setting `flex-shrink: 0` on an avatar image inside a flex container achieve?",
        options: [
          "Guarantees the avatar will never be squished or compressed on narrow viewports",
          "Expands it to 100% width",
          "Hides it on mobile",
          "Centers it horizontally"
        ],
        answer: 0,
        explanation: "`flex-shrink: 0` instructs the layout engine never to reduce this element's dimensions."
      },
      {
        question: "What does the shorthand `flex: 1;` expand to?",
        options: [
          "`flex: 1 1 0%;` (grows equally, shrinks equally, starting from 0)",
          "`flex: 1 0 auto;`",
          "`flex: 0 1 100%;`",
          "`flex: none;`"
        ],
        answer: 0,
        explanation: "`flex: 1` sets `flex-grow: 1; flex-shrink: 1; flex-basis: 0%;` allowing items to share free space equally."
      }
    ],
    exercise: {
      instruction: "Apply `flex-grow: 1;` and `flex-shrink: 0;` to `.fill-item`.",
      starter: `<style>
  .fill-item {
    /* Add grow and shrink */
  }
</style>
<div class="fill-item">Full Width Item</div>`,
      solution: `<style>
  .fill-item {
    flex-grow: 1;
    flex-shrink: 0;
  }
</style>
<div class="fill-item">Full Width Item</div>`,
      hint: "flex-grow: 1; flex-shrink: 0;",
      validate: (code) => {
        return code.includes("flex-grow: 1") && code.includes("flex-shrink: 0");
      }
    }
  },
  {
    id: "c10",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "CSS Grid",
    track: "css",
    title: "10. CSS Grid: 2D Layout Foundations",
    estimatedTime: "15 min",
    summary: "Construct two-dimensional grid layouts with columns, rows, fractional `fr` units, and gap spacing.",
    content: `
      <h2>Two Dimensions: Columns &amp; Rows</h2>
      <p>CSS Grid is the ultimate layout engine for structured layouts, cards, and complex application UIs.</p>
      <pre><code class="language-css">.grid-layout {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 60px 1fr;
  gap: 16px;
}</code></pre>
    `,
    starterCode: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-family: sans-serif;">
  <div style="background: #e0e7ff; padding: 20px; border-radius: 6px; text-align: center;">Col 1</div>
  <div style="background: #e0e7ff; padding: 20px; border-radius: 6px; text-align: center;">Col 2</div>
  <div style="background: #e0e7ff; padding: 20px; border-radius: 6px; text-align: center;">Col 3</div>
</div>`,
    solutionCode: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-family: sans-serif;">
  <div style="background: #e0e7ff; padding: 20px; border-radius: 6px; text-align: center;">Col 1</div>
  <div style="background: #e0e7ff; padding: 20px; border-radius: 6px; text-align: center;">Col 2</div>
  <div style="background: #e0e7ff; padding: 20px; border-radius: 6px; text-align: center;">Col 3</div>
</div>`,
    quiz: [
      {
        question: "What does the `1fr` unit represent in CSS Grid?",
        options: [
          "One fraction of the available free space in the grid container",
          "One frame in an animation",
          "One fixed rem unit",
          "One font ratio"
        ],
        answer: 0,
        explanation: "`fr` is a fractional unit representing a share of the leftover space inside the grid container."
      },
      {
        question: "Which property sets the gutter space between rows and columns simultaneously?",
        options: ["`gap: 16px;`", "`margin: 16px;`", "`gutter: 16px;`", "`spacing: 16px;`"],
        answer: 0,
        explanation: "The `gap` property sets both row and column gutters cleanly without margins."
      }
    ],
    exercise: {
      instruction: "Create a 2-column grid with `display: grid;` and `grid-template-columns: 1fr 2fr;` on `.split`.",
      starter: `<style>
  .split {
    /* Add grid styles */
  }
</style>
<div class="split">
  <div>Sidebar (1fr)</div>
  <div>Content (2fr)</div>
</div>`,
      solution: `<style>
  .split {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
</style>
<div class="split">
  <div>Sidebar (1fr)</div>
  <div>Content (2fr)</div>
</div>`,
      hint: "display: grid; grid-template-columns: 1fr 2fr;",
      validate: (code) => {
        return code.includes("display: grid") && code.includes("grid-template-columns: 1fr 2fr");
      }
    }
  },
  {
    id: "c11",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "CSS Grid",
    track: "css",
    title: "11. Auto-Fit Responsive Grids (No Media Queries!)",
    estimatedTime: "14 min",
    summary: "Build fully responsive card grids that adapt from mobile to 4K displays using `repeat(auto-fit, minmax(260px, 1fr))`.",
    content: `
      <h2>The Zero-Media-Query Grid</h2>
      <pre><code class="language-css">.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}</code></pre>
      <p>This single line dynamically determines the number of columns based on container width, gracefully wrapping on smaller devices.</p>
    `,
    starterCode: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; font-family: sans-serif;">
  <div style="background: white; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">Card A</div>
  <div style="background: white; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">Card B</div>
  <div style="background: white; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">Card C</div>
</div>`,
    solutionCode: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; font-family: sans-serif;">
  <div style="background: white; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">Card A</div>
  <div style="background: white; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">Card B</div>
  <div style="background: white; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">Card C</div>
</div>`,
    quiz: [
      {
        question: "What is the difference between `auto-fit` and `auto-fill` in CSS Grid?",
        options: [
          "`auto-fit` collapses empty tracks to 0px so existing items stretch to fill space; `auto-fill` preserves empty tracks",
          "`auto-fit` only works with pixels",
          "`auto-fill` is deprecated",
          "There is no difference"
        ],
        answer: 0,
        explanation: "`auto-fit` drops empty grid tracks, allowing items to stretch across the full available row."
      },
      {
        question: "What does `minmax(200px, 1fr)` enforce?",
        options: [
          "Columns can never shrink below 200px, but will expand proportionally to fill available space",
          "Limits columns to exactly 200px",
          "Limits row height to 200px",
          "Requires 200 child elements"
        ],
        answer: 0,
        explanation: "`minmax(min, max)` sets a lower bound of 200px and an upper bound of 1 fraction of free space."
      }
    ],
    exercise: {
      instruction: "Apply `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` on `.responsive-grid`.",
      starter: `<style>
  .responsive-grid {
    display: grid;
    /* Add auto-fit grid columns */
  }
</style>
<div class="responsive-grid">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`,
      solution: `<style>
  .responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
</style>
<div class="responsive-grid">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`,
      hint: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));",
      validate: (code) => {
        return code.includes("repeat(auto-fit, minmax(200px, 1fr))");
      }
    }
  },
  {
    id: "c12",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Responsive",
    track: "css",
    title: "12. Responsive Strategies & Modern Media Queries",
    estimatedTime: "12 min",
    summary: "Write mobile-first CSS with `min-width` media queries, and support user preferences with `prefers-color-scheme` and `prefers-reduced-motion`.",
    content: `
      <h2>User-Centric Media Queries</h2>
      <p>Modern media queries adapt not just to screen widths, but to user device preferences:</p>

      <pre><code class="language-css">/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  body { background: #0b0f19; color: #f8fafc; }
}

/* Reduced motion preference (Accessibility!) */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}</code></pre>
    `,
    starterCode: `<style>
  .responsive-box {
    background: #3b82f6;
    color: white;
    padding: 16px;
    border-radius: 8px;
    font-family: sans-serif;
    text-align: center;
  }
  @media (min-width: 600px) {
    .responsive-box { background: #10b981; }
  }
</style>

<div class="responsive-box">
  Resize browser window: Blue on Mobile, Green on &ge; 600px!
</div>`,
    solutionCode: `<style>
  .responsive-box {
    background: #3b82f6;
    color: white;
    padding: 16px;
    border-radius: 8px;
    font-family: sans-serif;
    text-align: center;
  }
  @media (min-width: 600px) {
    .responsive-box { background: #10b981; }
  }
</style>

<div class="responsive-box">
  Resize browser window: Blue on Mobile, Green on &ge; 600px!
</div>`,
    quiz: [
      {
        question: "Why is a 'Mobile-First' approach using `min-width` queries recommended over desktop-first `max-width`?",
        options: [
          "Mobile devices process lighter base styles without overriding complex desktop rules, improving rendering speed",
          "Desktop computers ignore media queries",
          "Mobile screens cannot parse CSS",
          "It compresses images"
        ],
        answer: 0,
        explanation: "Mobile-first ensures lower-powered mobile devices load lean base CSS, layering on desktop enhancements only when wider viewports exist."
      },
      {
        question: "What does `@media (prefers-reduced-motion: reduce)` protect against?",
        options: [
          "Vestibular disorders, dizziness, and motion sickness triggered by aggressive animations",
          "Low battery drain",
          "Slow CPU clock speeds",
          "Overheating laptops"
        ],
        answer: 0,
        explanation: "Respecting `prefers-reduced-motion` is a crucial accessibility requirement to prevent dizziness or nausea in users with vestibular disorders."
      }
    ],
    exercise: {
      instruction: "Add a media query `@media (min-width: 768px)` that sets `.card { display: flex; }`.",
      starter: `<style>
  .card { display: block; }
  /* Add media query here */
</style>
<div class="card">Card</div>`,
      solution: `<style>
  .card { display: block; }
  @media (min-width: 768px) {
    .card { display: flex; }
  }
</style>
<div class="card">Card</div>`,
      hint: "@media (min-width: 768px) { .card { display: flex; } }",
      validate: (code) => {
        return code.includes("@media (min-width: 768px)") && code.includes("display: flex");
      }
    }
  },

  // ========================================================
  // TIER 3: ADVANCED (Architecture, Variables & Modern CSS)
  // ========================================================
  {
    id: "c13",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Theming",
    track: "css",
    title: "13. CSS Custom Properties & Multi-Theme Architecture",
    estimatedTime: "15 min",
    summary: "Harness CSS Variables (`--name`) with runtime updates, cascade inheritance, and seamless Light/Dark theme switching.",
    content: `
      <h2>The Advantage of Native CSS Variables</h2>
      <p>CSS Custom Properties exist at runtime in the browser DOM, inherit down the tree, and update dynamically with JavaScript:</p>
      <pre><code class="language-css">:root {
  --primary: #3b82f6;
  --bg: #ffffff;
}

[data-theme="dark"] {
  --bg: #0f172a;
}

.box { background: var(--bg); color: var(--primary); }</code></pre>
    `,
    starterCode: `<style>
  :root {
    --accent-color: #10b981;
  }
  .accent-box {
    border-left: 4px solid var(--accent-color);
    padding: 14px;
    background: #f8fafc;
    font-family: sans-serif;
  }
</style>

<div class="accent-box">
  Styled with CSS Custom Properties!
</div>`,
    solutionCode: `<style>
  :root {
    --accent-color: #10b981;
  }
  .accent-box {
    border-left: 4px solid var(--accent-color);
    padding: 14px;
    background: #f8fafc;
    font-family: sans-serif;
  }
</style>

<div class="accent-box">
  Styled with CSS Custom Properties!
</div>`,
    quiz: [
      {
        question: "How do you define a fallback default in `var()` if the variable is not defined?",
        options: [
          "`color: var(--theme-color, #000000);`",
          "`color: var(--theme-color || #000000);`",
          "`color: var(--theme-color) default(#000000);`",
          "`color: var(--theme-color : #000000);`"
        ],
        answer: 0,
        explanation: "The second argument to `var()` provides a fallback value: `var(--my-var, fallbackValue)`."
      },
      {
        question: "Can CSS variables be updated dynamically on a specific element via JavaScript?",
        options: [
          "Yes, using `element.style.setProperty('--var-name', value)`",
          "No, CSS variables are immutable at runtime",
          "Only in Firefox",
          "Only with jQuery"
        ],
        answer: 0,
        explanation: "`element.style.setProperty('--name', val)` updates the variable immediately at runtime, triggering re-renders."
      }
    ],
    exercise: {
      instruction: "Declare `--brand: #6366f1;` on `:root` and apply `color: var(--brand);` to `.title`.",
      starter: `<style>
  :root {
    /* Declare variable */
  }
  .title {
    /* Use variable */
  }
</style>
<h3 class="title">Brand Title</h3>`,
      solution: `<style>
  :root {
    --brand: #6366f1;
  }
  .title {
    color: var(--brand);
  }
</style>
<h3 class="title">Brand Title</h3>`,
      hint: "--brand: #6366f1; and color: var(--brand);",
      validate: (code) => {
        return code.includes("--brand: #6366f1") && code.includes("var(--brand)");
      }
    }
  },
  {
    id: "c14",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Animation",
    track: "css",
    title: "14. CSS Transitions & 3D Transforms",
    estimatedTime: "15 min",
    summary: "Create fluid 60fps micro-interactions using hardware-accelerated transforms (`translate3d`, `rotate`, `scale`) and custom transition timing curves.",
    content: `
      <h2>Hardware Acceleration: Transforms vs Layout</h2>
      <p>Animating properties like <code>top</code>, <code>left</code>, or <code>width</code> triggers expensive CPU layout recalculations and repaints. Animating <code>transform</code> and <code>opacity</code> runs directly on the GPU at 60fps!</p>

      <pre><code class="language-css">.card {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}</code></pre>
    `,
    starterCode: `<style>
  .interactive-card {
    width: 220px;
    padding: 20px;
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-family: sans-serif;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .interactive-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.1);
  }
</style>

<div style="padding: 30px;">
  <div class="interactive-card">
    <strong>Hover over me!</strong>
    <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">Smooth GPU-accelerated transition.</p>
  </div>
</div>`,
    solutionCode: `<style>
  .interactive-card {
    width: 220px;
    padding: 20px;
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-family: sans-serif;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .interactive-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.1);
  }
</style>

<div style="padding: 30px;">
  <div class="interactive-card">
    <strong>Hover over me!</strong>
    <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">Smooth GPU-accelerated transition.</p>
  </div>
</div>`,
    quiz: [
      {
        question: "Which properties are GPU-accelerated and cheapest to animate in CSS?",
        options: [
          "`transform` and `opacity`",
          "`width` and `height`",
          "`top` and `left`",
          "`margin` and `padding`"
        ],
        answer: 0,
        explanation: "`transform` and `opacity` can be composited directly on the GPU without triggering layout or paint cycles."
      },
      {
        question: "What does `will-change: transform` tell the browser?",
        options: [
          "Prepares a dedicated GPU compositor layer for that element in advance",
          "Disables animations",
          "Animates infinitely",
          "Reverses the transform"
        ],
        answer: 0,
        explanation: "`will-change` hints to the rendering engine to promote the element to its own layer ahead of time."
      }
    ],
    exercise: {
      instruction: "Add `transition: transform 0.3s ease;` and on `:hover` apply `transform: scale(1.05);` to `.zoom-btn`.",
      starter: `<style>
  .zoom-btn {
    background: #2563eb; color: white; padding: 10px; border: none;
    /* Add transition */
  }
  /* Add hover scale */
</style>
<button class="zoom-btn">Hover</button>`,
      solution: `<style>
  .zoom-btn {
    background: #2563eb; color: white; padding: 10px; border: none;
    transition: transform 0.3s ease;
  }
  .zoom-btn:hover {
    transform: scale(1.05);
  }
</style>
<button class="zoom-btn">Hover</button>`,
      hint: "transition: transform 0.3s ease; and transform: scale(1.05);",
      validate: (code) => {
        return code.includes("transition: transform 0.3s") && code.includes("scale(1.05)");
      }
    }
  },
  {
    id: "c15",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Animation",
    track: "css",
    title: "15. Keyframe Animations & Micro-interactions",
    estimatedTime: "15 min",
    summary: "Author multi-step animations using `@keyframes`, control fill modes (`forwards`), infinite pulses, and loading spinners.",
    content: `
      <h2>Multi-Step Animation with <code>@keyframes</code></h2>
      <p>Keyframes allow continuous or looped animations across multiple progress percentages:</p>

      <pre><code class="language-css">@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}</code></pre>
    `,
    starterCode: `<style>
  @keyframes pulseGlow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.08); }
  }
  .live-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #10b981;
    border-radius: 50%;
    animation: pulseGlow 1.5s ease-in-out infinite;
  }
</style>

<div style="font-family: sans-serif; padding: 20px; display: flex; align-items: center; gap: 8px;">
  <span class="live-dot"></span>
  <span>System Status: <strong>Operational</strong></span>
</div>`,
    solutionCode: `<style>
  @keyframes pulseGlow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.08); }
  }
  .live-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #10b981;
    border-radius: 50%;
    animation: pulseGlow 1.5s ease-in-out infinite;
  }
</style>

<div style="font-family: sans-serif; padding: 20px; display: flex; align-items: center; gap: 8px;">
  <span class="live-dot"></span>
  <span>System Status: <strong>Operational</strong></span>
</div>`,
    quiz: [
      {
        question: "What does `animation-fill-mode: forwards` do?",
        options: [
          "Retains the computed styles of the last keyframe after the animation finishes",
          "Loops the animation forward and backward",
          "Reverses the animation",
          "Accelerates playback"
        ],
        answer: 0,
        explanation: "`animation-fill-mode: forwards` preserves the final styles (e.g. 100% keyframe state) after the animation ends."
      },
      {
        question: "What value of `animation-iteration-count` runs an animation continuously?",
        options: ["`infinite`", "`loop`", "`always`", "`forever`"],
        answer: 0,
        explanation: "`infinite` causes the animation to replay indefinitely."
      }
    ],
    exercise: {
      instruction: "Define `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }` and attach it to `.fade` as `animation: fadeIn 1s;`.",
      starter: `<style>
  /* Define @keyframes fadeIn here */
  .fade {
    /* Add animation */
  }
</style>
<div class="fade">Faded In</div>`,
      solution: `<style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .fade {
    animation: fadeIn 1s;
  }
</style>
<div class="fade">Faded In</div>`,
      hint: "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } and animation: fadeIn 1s;",
      validate: (code) => {
        return code.includes("@keyframes fadeIn") && code.includes("animation: fadeIn");
      }
    }
  },
  {
    id: "c16",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Modern CSS",
    track: "css",
    title: "16. Container Queries: Component-Driven Layouts",
    estimatedTime: "16 min",
    summary: "Style components based on the size of their parent container (`@container`) rather than the global browser viewport.",
    content: `
      <h2>The Container Query Revolution</h2>
      <p>Instead of relying on the global window viewport width, <strong>Container Queries</strong> allow components to adapt according to their parent's width:</p>

      <pre><code class="language-css">.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 450px) {
  .card {
    display: flex;
    gap: 16px;
  }
}</code></pre>
    `,
    starterCode: `<style>
  .resizable-container {
    container-type: inline-size;
    resize: horizontal;
    overflow: auto;
    border: 2px dashed #94a3b8;
    padding: 14px;
    border-radius: 8px;
  }
  .card {
    background: #f8fafc;
    border-radius: 6px;
    padding: 16px;
    font-family: sans-serif;
  }
  @container (min-width: 400px) {
    .card {
      background: #e0e7ff;
      border: 1px solid #6366f1;
    }
  }
</style>

<div class="resizable-container">
  <div class="card">
    <h4>Container Query Component</h4>
    <p>Resize this container horizontally from the bottom-right corner to see it adapt!</p>
  </div>
</div>`,
    solutionCode: `<style>
  .resizable-container {
    container-type: inline-size;
    resize: horizontal;
    overflow: auto;
    border: 2px dashed #94a3b8;
    padding: 14px;
    border-radius: 8px;
  }
  .card {
    background: #f8fafc;
    border-radius: 6px;
    padding: 16px;
    font-family: sans-serif;
  }
  @container (min-width: 400px) {
    .card {
      background: #e0e7ff;
      border: 1px solid #6366f1;
    }
  }
</style>

<div class="resizable-container">
  <div class="card">
    <h4>Container Query Component</h4>
    <p>Resize this container horizontally from the bottom-right corner to see it adapt!</p>
  </div>
</div>`,
    quiz: [
      {
        question: "Which property must be declared on an element before descendant container queries can measure it?",
        options: [
          "`container-type: inline-size;` (or `normal` / `size`)",
          "`position: relative;`",
          "`display: flex;`",
          "`content: '';`"
        ],
        answer: 0,
        explanation: "`container-type: inline-size` establishes the element as a containment context for `@container` queries."
      },
      {
        question: "What unit represents 1% of a query container's width?",
        options: ["`cqw` (Container Query Width)", "`vw`", "`rem`", "`ch`"],
        answer: 0,
        explanation: "`cqw` represents 1% of the query container's inline size (similar to `vw` for viewports)."
      }
    ],
    exercise: {
      instruction: "Establish a container query context on `.box` using `container-type: inline-size;`.",
      starter: `<style>
  .box {
    /* Set container-type */
  }
</style>
<div class="box">Container</div>`,
      solution: `<style>
  .box {
    container-type: inline-size;
  }
</style>
<div class="box">Container</div>`,
      hint: "container-type: inline-size;",
      validate: (code) => {
        return code.includes("container-type: inline-size");
      }
    }
  },
  {
    id: "c17",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Modern CSS",
    track: "css",
    title: "17. The Relational Parent Selector: `:has()`",
    estimatedTime: "16 min",
    summary: "Select parent elements conditionally based on their children, siblings, or form validation states using the game-changing `:has()` selector.",
    content: `
      <h2>The CSS Holy Grail: The Parent Selector</h2>
      <p>For over 20 years, CSS could only select downwards or laterally. The <code>:has()</code> relational selector lets you style a parent based on its children!</p>

      <pre><code class="language-css">/* Style card if it contains a featured badge */
.card:has(.badge-featured) {
  border: 2px solid #f59e0b;
}

/* Style label when sibling input is checked */
label:has(+ input:checked) {
  font-weight: bold;
  color: #10b981;
}</code></pre>
    `,
    starterCode: `<style>
  .card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 16px;
    font-family: sans-serif;
    margin-bottom: 12px;
  }
  /* Style card specifically if it contains an image */
  .card:has(img) {
    border-color: #3b82f6;
    background: #eff6ff;
  }
</style>

<div class="card">
  <p>Standard text card</p>
</div>

<div class="card">
  <img src="https://via.placeholder.com/60" alt="Avatar" style="border-radius: 50%;" />
  <p>Card containing an image (styled via :has!)</p>
</div>`,
    solutionCode: `<style>
  .card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 16px;
    font-family: sans-serif;
    margin-bottom: 12px;
  }
  .card:has(img) {
    border-color: #3b82f6;
    background: #eff6ff;
  }
</style>

<div class="card">
  <p>Standard text card</p>
</div>

<div class="card">
  <img src="https://via.placeholder.com/60" alt="Avatar" style="border-radius: 50%;" />
  <p>Card containing an image (styled via :has!)</p>
</div>`,
    quiz: [
      {
        question: "What does `form:has(input:invalid)` match?",
        options: [
          "Any `<form>` that currently contains at least one invalid input element",
          "Only the invalid inputs",
          "All forms on the page",
          "Forms without inputs"
        ],
        answer: 0,
        explanation: "`:has(input:invalid)` targets the parent `<form>` whenever any descendant input fails validation."
      },
      {
        question: "Can `:has()` be chained with other pseudo-classes like `:not()` (e.g. `section:not(:has(h2))` )?",
        options: [
          "Yes, `:has()` can be freely combined and nested with other selectors",
          "No, `:has()` cannot be combined with `:not()`",
          "Only in WebKit",
          "Only with IDs"
        ],
        answer: 0,
        explanation: "`:has()` is fully composable with `:not()`, `:is()`, and standard pseudo-classes."
      }
    ],
    exercise: {
      instruction: "Write a rule `article:has(h1)` that sets `border-top: 3px solid #3b82f6;`.",
      starter: `<style>
  /* Add article:has(h1) rule here */
</style>
<article><h1>Main Title</h1></article>`,
      solution: `<style>
  article:has(h1) {
    border-top: 3px solid #3b82f6;
  }
</style>
<article><h1>Main Title</h1></article>`,
      hint: "article:has(h1) { border-top: 3px solid #3b82f6; }",
      validate: (code) => {
        return code.includes("article:has(h1)") && code.includes("border-top");
      }
    }
  },
  {
    id: "c18",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Modern Architecture",
    track: "css",
    title: "18. Native CSS Nesting & Subgrid",
    estimatedTime: "16 min",
    summary: "Write clean nested CSS without Sass preprocessors, and align nested child components to ancestor grids using `grid-template-columns: subgrid`.",
    content: `
      <h2>Native CSS Nesting (Zero Build Step!)</h2>
      <p>Modern browsers natively support CSS nesting like Sass, without needing any compiler:</p>

      <pre><code class="language-css">.card {
  padding: 16px;
  background: white;

  &amp; h3 {
    color: #3b82f6;
  }

  &amp;:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}</code></pre>

      <h3>CSS Subgrid</h3>
      <p>Subgrid allows nested children to align perfectly to tracks defined on an outer ancestor grid:</p>
      <pre><code class="language-css">.card {
  grid-row: span 3;
  display: grid;
  grid-template-rows: subgrid; /* Header, body, and footer align across all cards! */
}</code></pre>
    `,
    starterCode: `<style>
  .modern-nav {
    background: #0f172a;
    padding: 14px 20px;
    border-radius: 8px;
    font-family: sans-serif;

    /* Native CSS Nesting */
    & a {
      color: #38bdf8;
      text-decoration: none;
      margin-right: 12px;

      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
    }
  }
</style>

<nav class="modern-nav">
  <a href="#">Home</a>
  <a href="#">Features</a>
  <a href="#">Pricing</a>
</nav>`,
    solutionCode: `<style>
  .modern-nav {
    background: #0f172a;
    padding: 14px 20px;
    border-radius: 8px;
    font-family: sans-serif;

    & a {
      color: #38bdf8;
      text-decoration: none;
      margin-right: 12px;

      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
    }
  }
</style>

<nav class="modern-nav">
  <a href="#">Home</a>
  <a href="#">Features</a>
  <a href="#">Pricing</a>
</nav>`,
    quiz: [
      {
        question: "What does the `&` symbol represent in Native CSS Nesting?",
        options: [
          "The parent selector",
          "A JavaScript variable",
          "An intersection type",
          "An HTML entity"
        ],
        answer: 0,
        explanation: "`&` represents the parent nesting selector, allowing you to attach pseudo-classes (like `&:hover`) or modify context."
      },
      {
        question: "What problem does `grid-template-rows: subgrid;` solve for multi-card layouts?",
        options: [
          "Allows card headers and footers to line up with neighboring cards even when content lengths vary",
          "Compresses CSS code",
          "Eliminates media queries",
          "Creates automatic borders"
        ],
        answer: 0,
        explanation: "`subgrid` inherits the outer grid's row/column tracks, aligning child items across separate cards."
      }
    ],
    exercise: {
      instruction: "Use native nesting inside `.btn` to define `&:hover { opacity: 0.8; }`.",
      starter: `<style>
  .btn {
    background: #2563eb; color: white; padding: 8px 14px;
    /* Add nested &:hover here */
  }
</style>
<button class="btn">Button</button>`,
      solution: `<style>
  .btn {
    background: #2563eb; color: white; padding: 8px 14px;
    &:hover {
      opacity: 0.8;
    }
  }
</style>
<button class="btn">Button</button>`,
      hint: "&:hover { opacity: 0.8; }",
      validate: (code) => {
        return code.includes("&:hover") && code.includes("opacity: 0.8");
      }
    }
  }
];

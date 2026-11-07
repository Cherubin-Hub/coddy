export const htmlLessons = [
  // ==========================================
  // TIER 1: BEGINNER (Foundations & Semantics)
  // ==========================================
  {
    id: "h1",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "HTML Anatomy",
    track: "html",
    title: "1. HTML Anatomy, Standards & Quirks Mode",
    estimatedTime: "8 min",
    summary: "Understand the foundational skeleton of modern web pages: DOCTYPE, html, head, body tags, character encoding, and viewport configuration.",
    content: `
      <h2>The Skeleton of Every Web Page</h2>
      <p>HTML (HyperText Markup Language) describes the <em>structure and semantic meaning</em> of web content. Modern browsers follow the Living HTML Standard maintained by the WHATWG.</p>

      <div class="callout tip">
        <strong>The Mental Model:</strong> If a website is a house, HTML is the concrete foundation and wooden framing, CSS is the paint and interior design, and JavaScript is the electrical wiring and plumbing that makes it interactive!
      </div>

      <h3>Standard HTML5 Document Template</h3>
      <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Modern Web Development&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, Web!&lt;/h1&gt;
    &lt;p&gt;Every tag tells the browser what kind of content it is displaying.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

      <h3>Key Document Components</h3>
      <div class="code-table">
        <div class="table-row header"><span>Element</span><span>Placement</span><span>Purpose</span></div>
        <div class="table-row"><code>&lt;!DOCTYPE html&gt;</code><span>Line 1</span><span>Tells the browser to render in standard HTML5 mode (prevents legacy quirks mode)</span></div>
        <div class="table-row"><code>&lt;html lang="en"&gt;</code><span>Root</span><span>The root container; <code>lang</code> is crucial for screen readers and search engines</span></div>
        <div class="table-row"><code>&lt;head&gt;</code><span>Metadata</span><span>Contains non-visible metadata: character encoding, page title, linked stylesheets</span></div>
        <div class="table-row"><code>&lt;body&gt;</code><span>Visible content</span><span>Contains all headings, paragraphs, images, buttons, and visible elements</span></div>
      </div>
    `,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Practice Webpage</title>
</head>
<body>
  <h1>Welcome to Web Development!</h1>
  <p>HTML provides the structure of every website you browse.</p>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Practice Webpage</title>
</head>
<body>
  <h1>Welcome to Web Development!</h1>
  <p>HTML provides the structure of every website you browse.</p>
</body>
</html>`,
    quiz: [
      {
        question: "What is the primary purpose of the `<!DOCTYPE html>` declaration at line 1?",
        options: [
          "To instruct the browser to render using modern HTML5 standard mode",
          "To import external HTML libraries",
          "To link JavaScript to the document",
          "To enable dark mode styling"
        ],
        answer: 0,
        explanation: "`<!DOCTYPE html>` ensures the browser uses modern standard rendering mode and prevents legacy quirks mode."
      },
      {
        question: "Where should the `<title>` tag and `<meta charset='UTF-8'>` be located?",
        options: [
          "Inside the `<head>` element",
          "Inside the `<body>` element",
          "Before the `<!DOCTYPE>` declaration",
          "At the very end of the file"
        ],
        answer: 0,
        explanation: "Document metadata such as the page title, character set, and viewport settings belong in the `<head>` section."
      }
    ],
    exercise: {
      instruction: "Add an `<h2>` subtitle element with text 'Foundations Course' and a paragraph `<p>` with text 'Building modern web pages' inside the `<body>`.",
      starter: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Exercise</title>
</head>
<body>
  <h1>HTML Mastery</h1>
  <!-- Add h2 and p here -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Exercise</title>
</head>
<body>
  <h1>HTML Mastery</h1>
  <h2>Foundations Course</h2>
  <p>Building modern web pages</p>
</body>
</html>`,
      hint: "Use <h2>Foundations Course</h2> and <p>Building modern web pages</p>",
      validate: (code) => {
        return code.includes("<h2>Foundations Course</h2>") && code.includes("<p>Building modern web pages</p>");
      }
    }
  },
  {
    id: "h2",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Semantic HTML",
    track: "html",
    title: "2. Semantic Elements & Document Landmarks",
    estimatedTime: "10 min",
    summary: "Move beyond endless `<div>` soup: master semantic elements like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>` for accessibility and SEO.",
    content: `
      <h2>Why Semantic HTML Matters</h2>
      <p>Semantic HTML means using elements that clearly describe their meaning to both the browser and assistive technologies, rather than using generic <code>&lt;div&gt;</code> everywhere.</p>

      <div class="comparison-grid">
        <div class="comparison-box js">
          <div class="box-badge">❌ Bad: Non-Semantic Div Soup</div>
          <pre><code class="language-html">&lt;div class="header"&gt;
  &lt;div class="nav"&gt;...&lt;/div&gt;
&lt;/div&gt;
&lt;div class="content"&gt;
  &lt;div class="post"&gt;...&lt;/div&gt;
&lt;/div&gt;
&lt;div class="footer"&gt;...&lt;/div&gt;</code></pre>
        </div>
        <div class="comparison-box ts">
          <div class="box-badge">✅ Clean: Modern Semantic HTML</div>
          <pre><code class="language-html">&lt;header&gt;
  &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;...&lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>
        </div>
      </div>

      <h3>Core Semantic Landmarks</h3>
      <ul>
        <li><code>&lt;header&gt;</code>: Introductory content, brand logos, or site title.</li>
        <li><code>&lt;nav&gt;</code>: Major navigation blocks containing links.</li>
        <li><code>&lt;main&gt;</code>: The central, unique content of the page (only one per page!).</li>
        <li><code>&lt;article&gt;</code>: Self-contained composition (blog post, news story, comment).</li>
        <li><code>&lt;section&gt;</code>: A thematic grouping of content, typically with a heading.</li>
        <li><code>&lt;aside&gt;</code>: Content tangentially related (sidebars, callout boxes).</li>
        <li><code>&lt;footer&gt;</code>: Author, copyright, legal links, or back-to-top links.</li>
      </ul>
    `,
    starterCode: `<header>
  <h1>Tech Today</h1>
  <nav>
    <a href="#home">Home</a> | <a href="#articles">Articles</a>
  </nav>
</header>

<main>
  <article>
    <h2>Understanding Semantic Markup</h2>
    <p>Semantic markup enables screen readers to navigate effortlessly.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 Tech Today. All rights reserved.</p>
</footer>`,
    solutionCode: `<header>
  <h1>Tech Today</h1>
  <nav>
    <a href="#home">Home</a> | <a href="#articles">Articles</a>
  </nav>
</header>

<main>
  <article>
    <h2>Understanding Semantic Markup</h2>
    <p>Semantic markup enables screen readers to navigate effortlessly.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 Tech Today. All rights reserved.</p>
</footer>`,
    quiz: [
      {
        question: "How many `<main>` elements should be visible on a single HTML document?",
        options: [
          "Only one `<main>` element representing the primary unique content",
          "One for every article on the page",
          "As many as needed, it has no restrictions",
          "None, `<main>` is deprecated"
        ],
        answer: 0,
        explanation: "The `<main>` landmark element must represent the unique content of the document, so there should only be one per page."
      },
      {
        question: "Which element is best suited for an independent, reusable blog post or card?",
        options: ["`<article>`", "`<aside>`", "`<div>`", "`<span>`"],
        answer: 0,
        explanation: "`<article>` is explicitly designed for self-contained content that could be distributed or reused independently."
      }
    ],
    exercise: {
      instruction: "Wrap the paragraph inside a `<main>` landmark element, and add a `<footer>` containing `<p>Copyright 2026</p>`.",
      starter: `<h1>My Portfolio</h1>
<p>Welcome to my developer portfolio.</p>`,
      solution: `<h1>My Portfolio</h1>
<main>
  <p>Welcome to my developer portfolio.</p>
</main>
<footer>
  <p>Copyright 2026</p>
</footer>`,
      hint: "Use <main><p>...</p></main> and <footer><p>Copyright 2026</p></footer>",
      validate: (code) => {
        return code.includes("<main>") && code.includes("</main>") &&
          code.includes("<footer>") && code.includes("Copyright 2026");
      }
    }
  },
  {
    id: "h3",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Text Formatting",
    track: "html",
    title: "3. Text Formatting, Hierarchies & Quotes",
    estimatedTime: "10 min",
    summary: "Structure headings (`h1` through `h6`), convey emphasis (`<strong>` vs `<em>`), and format citations, blockquotes, and code snippets.",
    content: `
      <h2>The Heading Ladder: H1 to H6</h2>
      <p>Headings form the table of contents of your document. Never skip heading levels (e.g., from <code>&lt;h1&gt;</code> directly to <code>&lt;h3&gt;</code>) purely for aesthetic sizing—use CSS for styling instead!</p>

      <h3>Semantic Text Elements</h3>
      <div class="code-table">
        <div class="table-row header"><span>Element</span><span>Semantic Meaning</span><span>Visual Default</span></div>
        <div class="table-row"><code>&lt;strong&gt;</code><span>Great importance, urgency, or seriousness</span><span>Bold text</span></div>
        <div class="table-row"><code>&lt;em&gt;</code><span>Stress emphasis (alters spoken inflection)</span><span>Italicized text</span></div>
        <div class="table-row"><code>&lt;blockquote&gt;</code><span>Section quoted from an external source</span><span>Indented block</span></div>
        <div class="table-row"><code>&lt;cite&gt;</code><span>Title of a creative work (book, article, paper)</span><span>Italics</span></div>
        <div class="table-row"><code>&lt;time datetime="..."&gt;</code><span>Machine-readable date and time timestamp</span><span>Standard text</span></div>
      </div>
    `,
    starterCode: `<h2>Quotes from Pioneers</h2>
<blockquote cite="https://en.wikipedia.org/wiki/Grace_Hopper">
  <p>The most dangerous phrase in the language is, <em>"We've always done it this way."</em></p>
  <footer>— <cite>Grace Hopper</cite>, <time datetime="1976">1976</time></footer>
</blockquote>`,
    solutionCode: `<h2>Quotes from Pioneers</h2>
<blockquote cite="https://en.wikipedia.org/wiki/Grace_Hopper">
  <p>The most dangerous phrase in the language is, <em>"We've always done it this way."</em></p>
  <footer>— <cite>Grace Hopper</cite>, <time datetime="1976">1976</time></footer>
</blockquote>`,
    quiz: [
      {
        question: "Why should you use `<strong>` instead of `<b>` for important text?",
        options: [
          "`<strong>` conveys semantic importance to screen readers, whereas `<b>` is purely visual styling",
          "`<strong>` makes the text red",
          "`<b>` is not valid HTML5",
          "`<strong>` compiles to JavaScript"
        ],
        answer: 0,
        explanation: "`<strong>` has semantic weight indicating importance or seriousness. Screen readers will alter their vocal tone for `<strong>`."
      },
      {
        question: "What is the purpose of the `datetime` attribute on the `<time>` element?",
        options: [
          "Provides a machine-readable ISO 8601 date format for search engines and calendars",
          "Controls the timezone of the browser",
          "Automatically updates the clock",
          "Enables countdown timers"
        ],
        answer: 0,
        explanation: "The `datetime` attribute provides standard machine-readable timestamps (e.g. `2026-11-07`) regardless of how the date is presented visually."
      }
    ],
    exercise: {
      instruction: "Create a `<blockquote cite='https://quote.com'>` containing a `<p>` with text 'Code is poetry' and a `<footer>— <cite>Anonymous</cite></footer>`.",
      starter: `<!-- Write blockquote here -->`,
      solution: `<blockquote cite="https://quote.com">
  <p>Code is poetry</p>
  <footer>— <cite>Anonymous</cite></footer>
</blockquote>`,
      hint: "<blockquote cite='https://quote.com'><p>Code is poetry</p><footer>— <cite>Anonymous</cite></footer></blockquote>",
      validate: (code) => {
        return code.includes("<blockquote") && code.includes("<cite>Anonymous</cite>") && code.includes("Code is poetry");
      }
    }
  },
  {
    id: "h4",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Navigation",
    track: "html",
    title: "4. Hyperlinks, Fragment Identifiers & Navigation",
    estimatedTime: "10 min",
    summary: "Master anchor tags (`<a>`), deep-linking with fragment identifiers (`#`), target behaviors (`_blank`), and security attributes (`rel='noopener'`).",
    content: `
      <h2>The 'Hyper' in HyperText: Anchor Tags</h2>
      <p>The anchor tag <code>&lt;a&gt;</code> is the glue of the World Wide Web. It connects documents, files, and deep sections within pages.</p>

      <h3>Targeting New Tabs Safely</h3>
      <p>When opening links in a new window or tab, you must protect your users against <em>tab-nabbing</em> security vulnerabilities:</p>
      <pre><code class="language-html">&lt;!-- Always pair target="_blank" with rel="noopener noreferrer" --&gt;
&lt;a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer"&gt;
  Visit MDN Web Docs
&lt;/a&gt;</code></pre>

      <h3>Internal Page Bookmarks (Fragment Identifiers)</h3>
      <p>Use the hash symbol <code>#</code> matching an element's <code>id</code> attribute to jump directly to any section on the page:</p>
      <pre><code class="language-html">&lt;a href="#pricing"&gt;Jump to Pricing Plans&lt;/a&gt;

&lt;!-- Target element somewhere down the page --&gt;
&lt;section id="pricing"&gt;
  &lt;h2&gt;Our Pricing Plans&lt;/h2&gt;
&lt;/section&gt;</code></pre>
    `,
    starterCode: `<nav style="padding: 12px; background: #f1f5f9; border-radius: 6px;">
  <a href="#about" style="margin-right: 12px;">About Us</a>
  <a href="#contact" style="margin-right: 12px;">Contact</a>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
</nav>

<div style="margin-top: 20px;">
  <section id="about">
    <h3>About Us</h3>
    <p>We build accessible modern web applications.</p>
  </section>
  <section id="contact" style="margin-top: 20px;">
    <h3>Contact</h3>
    <p>Email: hello@example.com</p>
  </section>
</div>`,
    solutionCode: `<nav style="padding: 12px; background: #f1f5f9; border-radius: 6px;">
  <a href="#about" style="margin-right: 12px;">About Us</a>
  <a href="#contact" style="margin-right: 12px;">Contact</a>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
</nav>

<div style="margin-top: 20px;">
  <section id="about">
    <h3>About Us</h3>
    <p>We build accessible modern web applications.</p>
  </section>
  <section id="contact" style="margin-top: 20px;">
    <h3>Contact</h3>
    <p>Email: hello@example.com</p>
  </section>
</div>`,
    quiz: [
      {
        question: "Why should `target='_blank'` always be paired with `rel='noopener noreferrer'`?",
        options: [
          "To prevent the new page from accessing `window.opener` and redirecting the source page maliciously",
          "To speed up page loading by 50%",
          "To prevent CSS styles from leaking",
          "It is required by the JavaScript compiler"
        ],
        answer: 0,
        explanation: "Without `noopener`, the newly opened page gains access to `window.opener.location`, enabling malicious phishing attacks."
      },
      {
        question: "What does an anchor with `href='#top'` do?",
        options: [
          "Scrolls the page to the element with `id='top'`",
          "Refreshes the current tab",
          "Opens a file named top.html",
          "Logs out the user"
        ],
        answer: 0,
        explanation: "Hash fragments link directly to any HTML element possessing a matching `id`."
      }
    ],
    exercise: {
      instruction: "Create an external link to `https://google.com` with `target='_blank'`, `rel='noopener noreferrer'`, and text 'Search Google'.",
      starter: `<!-- Create safe external link here -->`,
      solution: `<a href="https://google.com" target="_blank" rel="noopener noreferrer">Search Google</a>`,
      hint: "<a href='https://google.com' target='_blank' rel='noopener noreferrer'>Search Google</a>",
      validate: (code) => {
        return code.includes("target=\"_blank\"") && code.includes("rel=\"noopener noreferrer\"") && code.includes("Search Google");
      }
    }
  },
  {
    id: "h5",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Lists & Data",
    track: "html",
    title: "5. Accessible Lists & Description Lists",
    estimatedTime: "8 min",
    summary: "Choose between unordered lists (`<ul>`), ordered lists (`<ol>`), and description lists (`<dl>`, `<dt>`, `<dd>`) for semantic data structuring.",
    content: `
      <h2>The Three HTML List Types</h2>
      <p>Lists are essential for grouping related items. Screen readers announce list item counts to blind users, aiding navigation.</p>

      <h3>1. Unordered Lists (<code>&lt;ul&gt;</code>)</h3>
      <p>Used when the order of items does not matter (e.g. navigation menus, ingredient lists):</p>
      <pre><code class="language-html">&lt;ul&gt;
  &lt;li&gt;HTML5&lt;/li&gt;
  &lt;li&gt;CSS3&lt;/li&gt;
  &lt;li&gt;JavaScript&lt;/li&gt;
&lt;/ul&gt;</code></pre>

      <h3>2. Ordered Lists (<code>&lt;ol&gt;</code>)</h3>
      <p>Used when the sequence is meaningful (e.g. recipe steps, ranking boards):</p>
      <pre><code class="language-html">&lt;ol type="1" start="1"&gt;
  &lt;li&gt;Prepare ingredients&lt;/li&gt;
  &lt;li&gt;Preheat oven to 375°F&lt;/li&gt;
  &lt;li&gt;Bake for 25 minutes&lt;/li&gt;
&lt;/ol&gt;</code></pre>

      <h3>3. Description Lists (<code>&lt;dl&gt;</code>)</h3>
      <p>Perfect for glossaries, key-value metadata, and FAQ question-answer pairs:</p>
      <pre><code class="language-html">&lt;dl&gt;
  &lt;dt&gt;DOM&lt;/dt&gt;
  &lt;dd&gt;Document Object Model&lt;/dd&gt;

  &lt;dt&gt;API&lt;/dt&gt;
  &lt;dd&gt;Application Programming Interface&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
    `,
    starterCode: `<dl style="font-family: sans-serif; background: #f8fafc; padding: 16px; border-radius: 8px;">
  <dt style="font-weight: bold; color: #2563eb;">Semantic Markup</dt>
  <dd style="margin: 4px 0 12px 16px; color: #475569;">HTML tags that communicate meaning and intent.</dd>

  <dt style="font-weight: bold; color: #2563eb;">Accessibility (a11y)</dt>
  <dd style="margin: 4px 0 0 16px; color: #475569;">Designing websites usable by people of all abilities.</dd>
</dl>`,
    solutionCode: `<dl style="font-family: sans-serif; background: #f8fafc; padding: 16px; border-radius: 8px;">
  <dt style="font-weight: bold; color: #2563eb;">Semantic Markup</dt>
  <dd style="margin: 4px 0 12px 16px; color: #475569;">HTML tags that communicate meaning and intent.</dd>

  <dt style="font-weight: bold; color: #2563eb;">Accessibility (a11y)</dt>
  <dd style="margin: 4px 0 0 16px; color: #475569;">Designing websites usable by people of all abilities.</dd>
</dl>`,
    quiz: [
      {
        question: "Which list element is best suited for metadata key-value pairs (like product specifications)?",
        options: [
          "`<dl>` (Description List) with `<dt>` (terms) and `<dd>` (descriptions)",
          "`<ol>` (Ordered List)",
          "`<ul>` (Unordered List)",
          "`<table>` only"
        ],
        answer: 0,
        explanation: "`<dl>` is specifically designed for term-description or name-value groupings."
      },
      {
        question: "Can an ordered list start at a number other than 1?",
        options: [
          "Yes, using the `start` attribute (e.g. `<ol start='5'>`)",
          "No, ordered lists always start at 1",
          "Only with JavaScript",
          "Only in XML"
        ],
        answer: 0,
        explanation: "The `start` attribute defines the integer starting value for an ordered list."
      }
    ],
    exercise: {
      instruction: "Create an ordered list `<ol>` with three `<li>` elements: 'Step 1', 'Step 2', and 'Step 3'.",
      starter: `<!-- Create ordered list here -->`,
      solution: `<ol>
  <li>Step 1</li>
  <li>Step 2</li>
  <li>Step 3</li>
</ol>`,
      hint: "<ol><li>Step 1</li><li>Step 2</li><li>Step 3</li></ol>",
      validate: (code) => {
        return code.includes("<ol>") && code.includes("<li>Step 1</li>") && code.includes("<li>Step 2</li>") && code.includes("</ol>");
      }
    }
  },
  {
    id: "h6",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Media & Images",
    track: "html",
    title: "6. Responsive Images: `srcset`, `sizes` & `<picture>`",
    estimatedTime: "12 min",
    summary: "Serve the right image size to the right device: master resolution switching with `srcset` and art-direction with `<picture>`.",
    content: `
      <h2>The Modern Responsive Image</h2>
      <p>Never serve a massive 4000px desktop hero banner to a mobile phone on a 3G connection! Modern HTML gives you fine-grained tools for responsive imagery.</p>

      <h3>1. Resolution Switching with <code>srcset</code></h3>
      <pre><code class="language-html">&lt;img 
  src="photo-800.jpg" 
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Scenic mountain valley at sunrise"
  loading="lazy"&gt;</code></pre>

      <h3>2. Art Direction with the <code>&lt;picture&gt;</code> Element</h3>
      <p>Serve modern AVIF or WebP formats with fallback to JPEG for older browsers:</p>
      <pre><code class="language-html">&lt;picture&gt;
  &lt;source srcset="banner.avif" type="image/avif"&gt;
  &lt;source srcset="banner.webp" type="image/webp"&gt;
  &lt;img src="banner.jpg" alt="Developer conference auditorium" loading="lazy"&gt;
&lt;/picture&gt;</code></pre>
    `,
    starterCode: `<picture>
  <source srcset="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" media="(min-width: 600px)" />
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" 
    alt="Laptop displaying code" 
    style="max-width: 100%; border-radius: 8px;"
    loading="lazy" />
</picture>`,
    solutionCode: `<picture>
  <source srcset="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" media="(min-width: 600px)" />
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" 
    alt="Laptop displaying code" 
    style="max-width: 100%; border-radius: 8px;"
    loading="lazy" />
</picture>`,
    quiz: [
      {
        question: "What does the `loading='lazy'` attribute on an `<img>` tag accomplish?",
        options: [
          "Defers loading of offscreen images until the user scrolls near them",
          "Downscales image resolution",
          "Converts images to WebP automatically",
          "Disables user click events"
        ],
        answer: 0,
        explanation: "`loading='lazy'` tells the browser to defer downloading image bytes until it is near the viewport, saving user bandwidth."
      },
      {
        question: "When should you choose `<picture>` over `<img srcset>`?",
        options: [
          "When you need different crops/aspect ratios on mobile vs desktop (Art Direction) or next-gen format fallbacks",
          "Whenever you have more than 2 images",
          "Only for transparent PNGs",
          "Picture is deprecated"
        ],
        answer: 0,
        explanation: "`<picture>` is used for Art Direction (different crops for different screens) or format negotiation (AVIF -> WebP -> JPG)."
      }
    ],
    exercise: {
      instruction: "Write an `<img>` element with `src='profile.jpg'`, `alt='Sarah Connor'`, and `loading='lazy'`.",
      starter: `<!-- Insert responsive img element here -->`,
      solution: `<img src="profile.jpg" alt="Sarah Connor" loading="lazy" />`,
      hint: "<img src='profile.jpg' alt='Sarah Connor' loading='lazy' />",
      validate: (code) => {
        return code.includes("src=\"profile.jpg\"") && code.includes("alt=\"Sarah Connor\"") && code.includes("loading=\"lazy\"");
      }
    }
  },

  // ========================================================
  // TIER 2: INTERMEDIATE (Interactive, Forms & Graphics)
  // ========================================================
  {
    id: "h7",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Native Media",
    track: "html",
    title: "7. Native Video & Audio APIs with Captions",
    estimatedTime: "12 min",
    summary: "Deliver accessible audio and video using `<video>`, `<audio>`, and subtitle tracks with `<track kind='subtitles'>` in WebVTT format.",
    content: `
      <h2>The HTML5 Media Revolution</h2>
      <p>Before HTML5, web video required proprietary plugins like Adobe Flash. Today, browsers natively play video and audio with hardware decoding and accessibility support.</p>

      <h3>Accessible Video with Closed Captions</h3>
      <pre><code class="language-html">&lt;video controls width="640" poster="poster.jpg" preload="metadata"&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
  &lt;source src="video.webm" type="video/webm"&gt;
  
  &lt;!-- Subtitles / Captions track --&gt;
  &lt;track 
    label="English" 
    kind="subtitles" 
    srclang="en" 
    src="captions.vtt" 
    default&gt;

  &lt;p&gt;Your browser does not support HTML5 video.&lt;/p&gt;
&lt;/video&gt;</code></pre>
    `,
    starterCode: `<div style="text-align: center; padding: 20px;">
  <h3>Native Audio Player</h3>
  <audio controls style="width: 100%; max-width: 400px;">
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
</div>`,
    solutionCode: `<div style="text-align: center; padding: 20px;">
  <h3>Native Audio Player</h3>
  <audio controls style="width: 100%; max-width: 400px;">
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
</div>`,
    quiz: [
      {
        question: "What element is used to attach captions or subtitles to a `<video>` element?",
        options: ["`<track>`", "`<caption>`", "`<subtitle>`", "`<source>`"],
        answer: 0,
        explanation: "The `<track>` element attaches timed text tracks (such as WebVTT subtitles and captions) to media elements."
      },
      {
        question: "What does the `controls` boolean attribute do on `<video>` and `<audio>`?",
        options: [
          "Displays standard browser playback controls (play, pause, volume, scrub bar)",
          "Prevents users from pausing",
          "Hides the video on mobile",
          "Restricts playback to 10 seconds"
        ],
        answer: 0,
        explanation: "The `controls` attribute displays the browser's native playback interface."
      }
    ],
    exercise: {
      instruction: "Create a `<video controls width='400'>` element containing a `<source src='sample.mp4' type='video/mp4'>`.",
      starter: `<!-- Insert video element here -->`,
      solution: `<video controls width="400">
  <source src="sample.mp4" type="video/mp4" />
</video>`,
      hint: "<video controls width='400'><source src='sample.mp4' type='video/mp4'></video>",
      validate: (code) => {
        return code.includes("<video") && code.includes("controls") && code.includes("src=\"sample.mp4\"");
      }
    }
  },
  {
    id: "h8",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Tables",
    track: "html",
    title: "8. Accessible Data Tables",
    estimatedTime: "12 min",
    summary: "Structure tabular data accessibly using `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th scope='col/row'>`, and cell spanning.",
    content: `
      <h2>Data Tables Done Right</h2>
      <p>Tables should strictly be used for <em>tabular data</em> (never for page layout!). Proper accessibility attributes ensure screen reader users can navigate complex grid relations.</p>

      <h3>The Accessible Table Template</h3>
      <pre><code class="language-html">&lt;table&gt;
  &lt;caption&gt;Monthly Sales Performance 2026&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Quarter&lt;/th&gt;
      &lt;th scope="col"&gt;Units Sold&lt;/th&gt;
      &lt;th scope="col"&gt;Revenue&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Q1&lt;/th&gt;
      &lt;td&gt;1,240&lt;/td&gt;
      &lt;td&gt;$62,000&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Total&lt;/th&gt;
      &lt;td&gt;1,240&lt;/td&gt;
      &lt;td&gt;$62,000&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</code></pre>
    `,
    starterCode: `<table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">
  <caption style="margin-bottom: 8px; font-weight: bold;">Employee Roster</caption>
  <thead>
    <tr style="background: #1e293b; color: white;">
      <th scope="col" style="padding: 8px; text-align: left;">ID</th>
      <th scope="col" style="padding: 8px; text-align: left;">Name</th>
      <th scope="col" style="padding: 8px; text-align: left;">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #cbd5e1;">
      <th scope="row" style="padding: 8px; text-align: left;">101</th>
      <td style="padding: 8px;">Alice Smith</td>
      <td style="padding: 8px;">Lead Engineer</td>
    </tr>
  </tbody>
</table>`,
    solutionCode: `<table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">
  <caption style="margin-bottom: 8px; font-weight: bold;">Employee Roster</caption>
  <thead>
    <tr style="background: #1e293b; color: white;">
      <th scope="col" style="padding: 8px; text-align: left;">ID</th>
      <th scope="col" style="padding: 8px; text-align: left;">Name</th>
      <th scope="col" style="padding: 8px; text-align: left;">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #cbd5e1;">
      <th scope="row" style="padding: 8px; text-align: left;">101</th>
      <td style="padding: 8px;">Alice Smith</td>
      <td style="padding: 8px;">Lead Engineer</td>
    </tr>
  </tbody>
</table>`,
    quiz: [
      {
        question: "What does `scope='col'` on a `<th>` cell communicate to assistive technologies?",
        options: [
          "Identifies this header as applying to all cells in that vertical column",
          "Collapses the column width",
          "Sorts the column alphabetically",
          "Hides the header on mobile"
        ],
        answer: 0,
        explanation: "`scope='col'` explicitly associates the header text with every subsequent cell in that column."
      },
      {
        question: "What is the role of the `<caption>` element in an HTML table?",
        options: [
          "Provides an accessible title/summary of the table contents",
          "Controls the font size of all rows",
          "Creates table borders",
          "Formats cells as currency"
        ],
        answer: 0,
        explanation: "The `<caption>` describes the purpose and contents of the table, announced first by screen readers."
      }
    ],
    exercise: {
      instruction: "Create a simple table with a `<caption>Scores</caption>`, a `<tr>` containing `<th scope='col'>Player</th>`, and `<th scope='col'>Score</th>`.",
      starter: `<!-- Insert table here -->`,
      solution: `<table>
  <caption>Scores</caption>
  <tr>
    <th scope="col">Player</th>
    <th scope="col">Score</th>
  </tr>
</table>`,
      hint: "<table><caption>Scores</caption><tr><th scope='col'>Player</th><th scope='col'>Score</th></tr></table>",
      validate: (code) => {
        return code.includes("<caption>Scores</caption>") && code.includes("scope=\"col\"");
      }
    }
  },
  {
    id: "h9",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Forms",
    track: "html",
    title: "9. Modern Forms Architecture & Input Types",
    estimatedTime: "14 min",
    summary: "Architect accessible forms with `<fieldset>`, `<legend>`, `<label for>`, and modern inputs: `email`, `tel`, `url`, `date`, `color`, and `range`.",
    content: `
      <h2>The Core of Web Interactivity: Forms</h2>
      <p>Modern HTML5 features rich input controls that automatically provide specialized mobile keyboards (e.g. numeric keypad for <code>type="tel"</code>) and native pickers.</p>

      <pre><code class="language-html">&lt;form action="/api/submit" method="POST"&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;Account Information&lt;/legend&gt;
    
    &lt;label for="user-email"&gt;Email Address:&lt;/label&gt;
    &lt;input type="email" id="user-email" name="email" required&gt;

    &lt;label for="user-dob"&gt;Date of Birth:&lt;/label&gt;
    &lt;input type="date" id="user-dob" name="dob"&gt;
  &lt;/fieldset&gt;
&lt;/form&gt;</code></pre>
    `,
    starterCode: `<form style="max-width: 380px; margin: 20px auto; font-family: sans-serif; display: flex; flex-direction: column; gap: 12px;">
  <fieldset style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px;">
    <legend style="font-weight: bold; color: #1e293b;">Preferences</legend>
    <label for="fav-color" style="display: block; margin-bottom: 4px;">Brand Color:</label>
    <input type="color" id="fav-color" name="color" value="#3b82f6" style="margin-bottom: 12px; cursor: pointer;" />

    <label for="volume" style="display: block; margin-bottom: 4px;">Volume:</label>
    <input type="range" id="volume" name="volume" min="0" max="100" value="75" />
  </fieldset>
</form>`,
    solutionCode: `<form style="max-width: 380px; margin: 20px auto; font-family: sans-serif; display: flex; flex-direction: column; gap: 12px;">
  <fieldset style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px;">
    <legend style="font-weight: bold; color: #1e293b;">Preferences</legend>
    <label for="fav-color" style="display: block; margin-bottom: 4px;">Brand Color:</label>
    <input type="color" id="fav-color" name="color" value="#3b82f6" style="margin-bottom: 12px; cursor: pointer;" />

    <label for="volume" style="display: block; margin-bottom: 4px;">Volume:</label>
    <input type="range" id="volume" name="volume" min="0" max="100" value="75" />
  </fieldset>
</form>`,
    quiz: [
      {
        question: "Why should related form controls (like radio button sets or address fields) be wrapped in `<fieldset>` with a `<legend>`?",
        options: [
          "It provides semantic context that assistive technologies announce when navigating into the group",
          "It styles the form automatically",
          "It prevents form submission",
          "It converts the fields into JSON"
        ],
        answer: 0,
        explanation: "`<fieldset>` and `<legend>` group related inputs semantically, which screen readers announce to users entering the group."
      },
      {
        question: "How does setting `type='email'` benefit smartphone users?",
        options: [
          "The mobile virtual keyboard automatically reveals the `@` symbol and `.com` key",
          "It encrypts the text",
          "It auto-fills their password",
          "It checks their Gmail account"
        ],
        answer: 0,
        explanation: "Appropriate input types trigger dedicated mobile keyboards optimized for entering emails, phone numbers, or dates."
      }
    ],
    exercise: {
      instruction: "Create a `<fieldset>` with `<legend>Contact</legend>`, a `<label for='phone'>Phone:</label>`, and `<input type='tel' id='phone' name='phone'>`.",
      starter: `<!-- Insert fieldset here -->`,
      solution: `<fieldset>
  <legend>Contact</legend>
  <label for="phone">Phone:</label>
  <input type="tel" id="phone" name="phone" />
</fieldset>`,
      hint: "<fieldset><legend>Contact</legend><label for='phone'>Phone:</label><input type='tel' id='phone'></fieldset>",
      validate: (code) => {
        return code.includes("<fieldset>") && code.includes("<legend>Contact</legend>") && code.includes("type=\"tel\"");
      }
    }
  },
  {
    id: "h10",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Forms",
    track: "html",
    title: "10. Native Constraint Validation API",
    estimatedTime: "12 min",
    summary: "Validate form inputs before submitting using `required`, `pattern`, `minlength`, `maxlength`, and inspect the JavaScript `validity` object.",
    content: `
      <h2>Zero-JavaScript Client Validation</h2>
      <p>HTML5 browsers can validate forms automatically before sending requests to the server:</p>

      <div class="code-table">
        <div class="table-row header"><span>Attribute</span><span>Description</span><span>Example</span></div>
        <div class="table-row"><code>required</code><span>Prevents blank submissions</span><span><code>&lt;input required&gt;</code></span></div>
        <div class="table-row"><code>pattern="[A-Z]{3}"</code><span>Validates with regex</span><span><code>pattern="[A-Z]{3}"</code></span></div>
        <div class="table-row"><code>minlength / maxlength</code><span>String length bounds</span><span><code>minlength="8"</code></span></div>
        <div class="table-row"><code>min / max / step</code><span>Numeric / date bounds</span><span><code>min="0" max="100"</code></span></div>
      </div>

      <h3>Inspecting the <code>validity</code> State</h3>
      <pre><code class="language-javascript">const input = document.querySelector("#user-code");
if (input.validity.patternMismatch) {
  input.setCustomValidity("Code must be 3 uppercase letters!");
}</code></pre>
    `,
    starterCode: `<form style="max-width: 360px; margin: 20px auto; font-family: sans-serif;">
  <label for="coupon" style="display: block; margin-bottom: 6px;">Coupon Code (3 Letters):</label>
  <input 
    type="text" 
    id="coupon" 
    name="coupon" 
    pattern="[A-Za-z]{3}" 
    title="Exactly 3 letters" 
    required 
    style="padding: 8px; width: 100%; margin-bottom: 12px;" />
  <button type="submit" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px;">
    Apply Coupon
  </button>
</form>`,
    solutionCode: `<form style="max-width: 360px; margin: 20px auto; font-family: sans-serif;">
  <label for="coupon" style="display: block; margin-bottom: 6px;">Coupon Code (3 Letters):</label>
  <input 
    type="text" 
    id="coupon" 
    name="coupon" 
    pattern="[A-Za-z]{3}" 
    title="Exactly 3 letters" 
    required 
    style="padding: 8px; width: 100%; margin-bottom: 12px;" />
  <button type="submit" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px;">
    Apply Coupon
  </button>
</form>`,
    quiz: [
      {
        question: "What does `input.validity.valueMissing` return when a required input is left empty?",
        options: ["`true`", "`false`", "`undefined`", "`null`"],
        answer: 0,
        explanation: "`validity.valueMissing` is a boolean that evaluates to `true` whenever an input with `required` has no value upon submission."
      },
      {
        question: "How do you customize the browser's built-in validation tooltip message via JavaScript?",
        options: [
          "`input.setCustomValidity('Your message here')`",
          "`input.errorMessage = 'message'`",
          "`input.alert('message')`",
          "`input.title = 'message'`"
        ],
        answer: 0,
        explanation: "`element.setCustomValidity(message)` sets a custom error message that the browser displays in its native validation bubble."
      }
    ],
    exercise: {
      instruction: "Add a password input with `id='pass'`, `name='password'`, `required`, and `minlength='8'`.",
      starter: `<form>
  <!-- Add password input here -->
</form>`,
      solution: `<form>
  <input type="password" id="pass" name="password" required minlength="8" />
</form>`,
      hint: "<input type='password' id='pass' name='password' required minlength='8'>",
      validate: (code) => {
        return code.includes("type=\"password\"") && code.includes("minlength=\"8\"") && code.includes("required");
      }
    }
  },
  {
    id: "h11",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Graphics",
    track: "html",
    title: "11. HTML5 Canvas 2D API Fundamentals",
    estimatedTime: "15 min",
    summary: "Draw 2D shapes, gradients, paths, and dynamic animations in real-time using the `<canvas>` element and JavaScript rendering context.",
    content: `
      <h2>Immediate-Mode Graphics: The <code>&lt;canvas&gt;</code> Element</h2>
      <p>The <code>&lt;canvas&gt;</code> element is a resolution-dependent bitmap canvas used for charts, visual effects, and 2D games.</p>

      <pre><code class="language-html">&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Draw a blue rectangle
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(20, 20, 150, 100);

  // Draw a red circle
  ctx.beginPath();
  ctx.arc(260, 70, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#ef4444";
  ctx.fill();
&lt;/script&gt;</code></pre>
    `,
    starterCode: `<div style="text-align: center; padding: 20px;">
  <canvas id="demoCanvas" width="300" height="150" style="border: 1px solid #cbd5e1; border-radius: 8px;"></canvas>
</div>

<script>
  const canvas = document.getElementById("demoCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#10b981";
  ctx.fillRect(30, 30, 90, 90);

  ctx.beginPath();
  ctx.arc(200, 75, 45, 0, Math.PI * 2);
  ctx.fillStyle = "#6366f1";
  ctx.fill();
</script>`,
    solutionCode: `<div style="text-align: center; padding: 20px;">
  <canvas id="demoCanvas" width="300" height="150" style="border: 1px solid #cbd5e1; border-radius: 8px;"></canvas>
</div>

<script>
  const canvas = document.getElementById("demoCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#10b981";
  ctx.fillRect(30, 30, 90, 90);

  ctx.beginPath();
  ctx.arc(200, 75, 45, 0, Math.PI * 2);
  ctx.fillStyle = "#6366f1";
  ctx.fill();
</script>`,
    quiz: [
      {
        question: "Why should `width` and `height` be set directly as attributes on `<canvas>` rather than via CSS?",
        options: [
          "Setting dimensions via CSS scales the bitmap like an image, causing blurry graphics",
          "CSS cannot style canvas elements",
          "Canvas width in CSS throws a TypeError",
          "It disables GPU acceleration"
        ],
        answer: 0,
        explanation: "The HTML `width` and `height` attributes set the internal drawing buffer coordinate resolution. CSS dimensions merely stretch that buffer."
      },
      {
        question: "Which method clears a rectangular region of the canvas?",
        options: ["`ctx.clearRect(x, y, w, h)`", "`ctx.deleteRect()`", "`ctx.reset()`", "`ctx.erase()`"],
        answer: 0,
        explanation: "`clearRect(x, y, width, height)` sets all pixels in the rectangle to transparent black."
      }
    ],
    exercise: {
      instruction: "Create a `<canvas id='gameCanvas' width='320' height='240'>`.",
      starter: `<!-- Insert canvas element here -->`,
      solution: `<canvas id="gameCanvas" width="320" height="240"></canvas>`,
      hint: "<canvas id='gameCanvas' width='320' height='240'></canvas>",
      validate: (code) => {
        return code.includes("<canvas") && code.includes("id=\"gameCanvas\"") && code.includes("width=\"320\"");
      }
    }
  },
  {
    id: "h12",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Graphics",
    track: "html",
    title: "12. Inline SVG: Scalable Vector Graphics",
    estimatedTime: "12 min",
    summary: "Embed scalable vector graphics directly in HTML with `<svg>`, `<circle>`, `<path>`, and style vector strokes and fills with CSS.",
    content: `
      <h2>The Scalable Magic of SVG</h2>
      <p>Unlike Canvas (which is raster bitmap pixels), <strong>SVG</strong> is XML-based vector markup. It scales infinitely to any screen resolution (Retina/4K) with zero pixelation or file bloat.</p>

      <pre><code class="language-html">&lt;svg width="100" height="100" viewBox="0 0 100 100" fill="none"&gt;
  &lt;circle cx="50" cy="50" r="40" stroke="#3b82f6" stroke-width="4" fill="#dbeafe" /&gt;
&lt;/svg&gt;</code></pre>
    `,
    starterCode: `<div style="text-align: center; padding: 20px;">
  <svg width="120" height="120" viewBox="0 0 120 120">
    <rect x="10" y="10" width="100" height="100" rx="16" fill="#f43f5e" />
    <path d="M45 35 L85 60 L45 85 Z" fill="white" />
  </svg>
</div>`,
    solutionCode: `<div style="text-align: center; padding: 20px;">
  <svg width="120" height="120" viewBox="0 0 120 120">
    <rect x="10" y="10" width="100" height="100" rx="16" fill="#f43f5e" />
    <path d="M45 35 L85 60 L45 85 Z" fill="white" />
  </svg>
</div>`,
    quiz: [
      {
        question: "What does the `viewBox='0 0 100 100'` attribute define on an `<svg>` element?",
        options: [
          "The internal coordinate system and aspect ratio of the SVG viewport",
          "The maximum file size",
          "The color palette",
          "The number of vector paths"
        ],
        answer: 0,
        explanation: "`viewBox` defines the virtual coordinate system (`min-x, min-y, width, height`) which maps to whatever width/height the SVG element occupies."
      },
      {
        question: "Can inline `<svg>` elements be styled and animated using CSS?",
        options: [
          "Yes, CSS properties like `fill`, `stroke`, and `stroke-dasharray` apply directly to SVG nodes",
          "No, SVG requires Flash",
          "Only in WebGL",
          "Only if exported as PNG"
        ],
        answer: 0,
        explanation: "Inline SVGs exist in the DOM, so you can style vector paths with CSS `fill`, `stroke`, transitions, and keyframe animations."
      }
    ],
    exercise: {
      instruction: "Create an `<svg width='50' height='50'>` containing a `<circle cx='25' cy='25' r='20' fill='red' />`.",
      starter: `<!-- Insert SVG circle here -->`,
      solution: `<svg width="50" height="50">
  <circle cx="25" cy="25" r="20" fill="red" />
</svg>`,
      hint: "<svg width='50' height='50'><circle cx='25' cy='25' r='20' fill='red'></circle></svg>",
      validate: (code) => {
        return code.includes("<svg") && code.includes("<circle") && code.includes("r=\"20\"");
      }
    }
  },

  // ========================================================
  // TIER 3: ADVANCED (Accessibility, Web Components & APIs)
  // ========================================================
  {
    id: "h13",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Accessibility",
    track: "html",
    title: "13. Web Accessibility (a11y) & ARIA Specification",
    estimatedTime: "16 min",
    summary: "Build universally accessible interfaces: master ARIA roles, states, live regions (`aria-live`), and keyboard navigation patterns.",
    content: `
      <h2>The Accessible Web: WCAG &amp; ARIA</h2>
      <p>ARIA (Accessible Rich Internet Applications) bridges gaps in HTML when building complex custom widgets like dropdown menus, accordions, and modals.</p>

      <h3>Essential ARIA Attributes</h3>
      <ul>
        <li><code>aria-label="Search"</code>: Provides an accessible name when an element has no visible text label.</li>
        <li><code>aria-expanded="true | false"</code>: Informs screen readers if a collapsible drawer or menu is open.</li>
        <li><code>aria-hidden="true"</code>: Instructs assistive tools to ignore purely decorative icons.</li>
        <li><code>aria-live="polite | assertive"</code>: Announces dynamic content changes without a page refresh.</li>
      </ul>
    `,
    starterCode: `<button 
  type="button" 
  aria-label="Add item to shopping cart" 
  style="padding: 10px 18px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 15px;">
  🛒 <span style="margin-left: 6px;">Add to Cart</span>
</button>`,
    solutionCode: `<button 
  type="button" 
  aria-label="Add item to shopping cart" 
  style="padding: 10px 18px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 15px;">
  🛒 <span style="margin-left: 6px;">Add to Cart</span>
</button>`,
    quiz: [
      {
        question: "When should you use `aria-hidden='true'` on an element?",
        options: [
          "When the element is purely decorative/visual and has no semantic meaning for screen readers",
          "To hide secret passwords in forms",
          "To delete an element from the DOM",
          "To disable button clicks"
        ],
        answer: 0,
        explanation: "`aria-hidden='true'` tells assistive technologies to ignore purely visual assets like decorative icons."
      },
      {
        question: "What is the First Rule of ARIA?",
        options: [
          "Do not use ARIA if a native HTML element already exists with the semantic behavior you need",
          "Always add aria-label to every div",
          "Use role='button' instead of `<button>`",
          "ARIA must only be written in JavaScript"
        ],
        answer: 0,
        explanation: "Native HTML elements (like `<button>` or `<dialog>`) come with built-in accessibility and keyboard handling that ARIA can only simulate."
      }
    ],
    exercise: {
      instruction: "Add an icon button with `type='button'`, `aria-label='Close dialog'`, containing `<span aria-hidden='true'>✕</span>`.",
      starter: `<!-- Insert accessible icon button -->`,
      solution: `<button type="button" aria-label="Close dialog">
  <span aria-hidden="true">✕</span>
</button>`,
      hint: "<button type='button' aria-label='Close dialog'><span aria-hidden='true'>✕</span></button>",
      validate: (code) => {
        return code.includes("aria-label=\"Close dialog\"") && code.includes("aria-hidden=\"true\"");
      }
    }
  },
  {
    id: "h14",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Metadata & SEO",
    track: "html",
    title: "14. Document Head Mastery, OpenGraph & SEO",
    estimatedTime: "12 min",
    summary: "Control how search engines index your site and how link previews render across Slack, Twitter, and LinkedIn using OpenGraph meta tags.",
    content: `
      <h2>The Control Room: The <code>&lt;head&gt;</code> Element</h2>
      <p>Social cards and rich search snippets are generated by the metadata defined inside your document's <code>&lt;head&gt;</code>.</p>

      <pre><code class="language-html">&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Full-Stack Web Mastery Academy&lt;/title&gt;
  &lt;meta name="description" content="Comprehensive web development academy."&gt;

  &lt;!-- OpenGraph Metadata (Facebook, Slack, LinkedIn) --&gt;
  &lt;meta property="og:title" content="Web Mastery Academy"&gt;
  &lt;meta property="og:description" content="Master HTML5, CSS3, JavaScript, and TypeScript."&gt;
  &lt;meta property="og:image" content="https://example.com/banner.jpg"&gt;
  &lt;meta property="og:type" content="website"&gt;

  &lt;!-- Twitter Card Metadata --&gt;
  &lt;meta name="twitter:card" content="summary_large_image"&gt;
&lt;/head&gt;</code></pre>
    `,
    starterCode: `<div style="font-family: sans-serif; padding: 20px; background: #f8fafc; border-radius: 8px;">
  <h3>Social Share Card Simulation</h3>
  <div style="border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; max-width: 400px; background: white;">
    <div style="height: 140px; background: #3b82f6; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
      og:image Preview
    </div>
    <div style="padding: 14px;">
      <div style="font-weight: bold;">og:title: Full-Stack Web Academy</div>
      <div style="font-size: 13px; color: #64748b; margin-top: 4px;">og:description: Master modern web development from zero to pro.</div>
    </div>
  </div>
</div>`,
    solutionCode: `<div style="font-family: sans-serif; padding: 20px; background: #f8fafc; border-radius: 8px;">
  <h3>Social Share Card Simulation</h3>
  <div style="border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; max-width: 400px; background: white;">
    <div style="height: 140px; background: #3b82f6; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
      og:image Preview
    </div>
    <div style="padding: 14px;">
      <div style="font-weight: bold;">og:title: Full-Stack Web Academy</div>
      <div style="font-size: 13px; color: #64748b; margin-top: 4px;">og:description: Master modern web development from zero to pro.</div>
    </div>
  </div>
</div>`,
    quiz: [
      {
        question: "Which metadata protocol generates preview cards when links are shared on Slack, iMessage, and social media?",
        options: [
          "The Open Graph Protocol (`og:title`, `og:image`)",
          "HTTP/2 Push",
          "WebSocket headers",
          "JSON-LD only"
        ],
        answer: 0,
        explanation: "The Open Graph protocol (`property='og:...'`) is the industry standard for link preview rich summaries."
      },
      {
        question: "What does `<meta name='viewport' content='width=device-width, initial-scale=1.0'>` prevent?",
        options: [
          "Mobile browsers from rendering the page at a default tiny 980px desktop resolution",
          "Users from zooming in",
          "Screen rotation",
          "CSS animations"
        ],
        answer: 0,
        explanation: "Without the viewport meta tag, mobile browsers render desktop-sized pages and scale them down into unreadable viewports."
      }
    ],
    exercise: {
      instruction: "Write a meta tag with `property='og:title'` and `content='Mastering HTML5'`.",
      starter: `<!-- Insert OpenGraph title meta tag here -->`,
      solution: `<meta property="og:title" content="Mastering HTML5" />`,
      hint: "<meta property='og:title' content='Mastering HTML5'>",
      validate: (code) => {
        return code.includes("property=\"og:title\"") && code.includes("content=\"Mastering HTML5\"");
      }
    }
  },
  {
    id: "h15",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Modern Elements",
    track: "html",
    title: "15. Native `<dialog>` Modals & Popovers",
    estimatedTime: "14 min",
    summary: "Eliminate complex modal libraries: build accessible modals and popovers natively using `<dialog>`, `.showModal()`, and `::backdrop` styling.",
    content: `
      <h2>The Browser-Native Dialog Element</h2>
      <p>Before HTML5's <code>&lt;dialog&gt;</code>, accessible modals required complex focus traps, z-index hacks, and escape-key event listeners. Native <code>&lt;dialog&gt;</code> does all of this out of the box!</p>

      <pre><code class="language-html">&lt;dialog id="confirmModal"&gt;
  &lt;h3&gt;Confirm Deletion&lt;/h3&gt;
  &lt;p&gt;Are you sure you want to delete this file?&lt;/p&gt;
  &lt;button id="closeBtn"&gt;Cancel&lt;/button&gt;
&lt;/dialog&gt;

&lt;button onclick="document.getElementById('confirmModal').showModal()"&gt;
  Open Modal
&lt;/button&gt;</code></pre>

      <h3>Styling the Native Backdrop</h3>
      <pre><code class="language-css">dialog::backdrop {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}</code></pre>
    `,
    starterCode: `<button onclick="document.getElementById('infoDialog').showModal()" style="padding: 10px 18px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">
  Open Native Modal
</button>

<dialog id="infoDialog" style="border: none; border-radius: 12px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); font-family: sans-serif;">
  <h3 style="margin-top: 0;">Native Dialog Element</h3>
  <p>The browser automatically traps keyboard focus and handles the Escape key!</p>
  <button onclick="document.getElementById('infoDialog').close()" style="padding: 8px 16px; background: #64748b; color: white; border: none; border-radius: 4px; cursor: pointer;">
    Close Modal
  </button>
</dialog>`,
    solutionCode: `<button onclick="document.getElementById('infoDialog').showModal()" style="padding: 10px 18px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">
  Open Native Modal
</button>

<dialog id="infoDialog" style="border: none; border-radius: 12px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); font-family: sans-serif;">
  <h3 style="margin-top: 0;">Native Dialog Element</h3>
  <p>The browser automatically traps keyboard focus and handles the Escape key!</p>
  <button onclick="document.getElementById('infoDialog').close()" style="padding: 8px 16px; background: #64748b; color: white; border: none; border-radius: 4px; cursor: pointer;">
    Close Modal
  </button>
</dialog>`,
    quiz: [
      {
        question: "What is the difference between `dialog.show()` and `dialog.showModal()`?",
        options: [
          "`showModal()` opens the dialog in the browser top-layer with automatic focus trapping and dim backdrop; `show()` opens a non-modal inline box",
          "`showModal()` only works on mobile",
          "`show()` is deprecated",
          "There is no difference"
        ],
        answer: 0,
        explanation: "`showModal()` activates true modal behavior (backdrop, focus trapping, Escape key dismiss), while `show()` opens a modeless dialog."
      },
      {
        question: "Which pseudo-element styles the dark overlay background behind a modal dialog?",
        options: ["`dialog::backdrop`", "`dialog::overlay`", "`dialog::before`", "`dialog::screen`"],
        answer: 0,
        explanation: "`::backdrop` targets the full-viewport layer rendered directly beneath top-layer dialog elements."
      }
    ],
    exercise: {
      instruction: "Create a `<dialog id='myDialog'>` containing `<p>Modal Content</p>`.",
      starter: `<!-- Insert dialog element here -->`,
      solution: `<dialog id="myDialog">
  <p>Modal Content</p>
</dialog>`,
      hint: "<dialog id='myDialog'><p>Modal Content</p></dialog>",
      validate: (code) => {
        return code.includes("<dialog id=\"myDialog\"") && code.includes("Modal Content");
      }
    }
  },
  {
    id: "h16",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Web Components",
    track: "html",
    title: "16. Web Components: Custom Elements Lifecycle & Slots",
    estimatedTime: "16 min",
    summary: "Write framework-agnostic modular UI with Custom Elements, observe attribute changes, and distribute light DOM using `<slot>` elements.",
    content: `
      <h2>Building Native Custom HTML Tags</h2>
      <p>Custom Elements allow developers to define their own HTML tags with full DOM lifecycle hooks:</p>

      <div class="code-table">
        <div class="table-row header"><span>Lifecycle Hook</span><span>Invoked When</span></div>
        <div class="table-row"><code>connectedCallback()</code><span>Element is inserted into document DOM</span></div>
        <div class="table-row"><code>disconnectedCallback()</code><span>Element is removed from document DOM</span></div>
        <div class="table-row"><code>attributeChangedCallback()</code><span>An observed attribute is added, removed, or changed</span></div>
      </div>

      <pre><code class="language-javascript">class UserCard extends HTMLElement {
  static get observedAttributes() { return ["username"]; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  render() {
    this.innerHTML = \`&lt;div class="card"&gt;User: \${this.getAttribute("username")}&lt;/div&gt;\`;
  }
}

customElements.define("user-card", UserCard);</code></pre>
    `,
    starterCode: `<script>
  class StatusBadge extends HTMLElement {
    connectedCallback() {
      const status = this.getAttribute("status") || "online";
      this.innerHTML = \`<span style="padding: 4px 10px; border-radius: 999px; font-weight: bold; font-family: sans-serif; background: #dcfce7; color: #15803d;">\${status.toUpperCase()}</span>\`;
    }
  }
  if (!customElements.get("status-badge")) {
    customElements.define("status-badge", StatusBadge);
  }
</script>

<div style="padding: 20px; text-align: center;">
  <status-badge status="active"></status-badge>
</div>`,
    solutionCode: `<script>
  class StatusBadge extends HTMLElement {
    connectedCallback() {
      const status = this.getAttribute("status") || "online";
      this.innerHTML = \`<span style="padding: 4px 10px; border-radius: 999px; font-weight: bold; font-family: sans-serif; background: #dcfce7; color: #15803d;">\${status.toUpperCase()}</span>\`;
    }
  }
  if (!customElements.get("status-badge")) {
    customElements.define("status-badge", StatusBadge);
  }
</script>

<div style="padding: 20px; text-align: center;">
  <status-badge status="active"></status-badge>
</div>`,
    quiz: [
      {
        question: "Why must custom element names always contain a hyphen (like `<profile-badge>`)?",
        options: [
          "To guarantee custom tags will never collide with future native HTML specification elements",
          "Because CSS requires hyphens",
          "It is required by the JavaScript parser",
          "To enable Shadow DOM automatically"
        ],
        answer: 0,
        explanation: "The HTML standard enforces hyphens in Custom Element names to prevent collisions with future native additions."
      },
      {
        question: "Which callback fires when a Custom Element is attached to the document DOM?",
        options: ["`connectedCallback()`", "`mounted()`", "`onInit()`", "`render()`"],
        answer: 0,
        explanation: "`connectedCallback()` is the official lifecycle hook called when the element is inserted into the DOM."
      }
    ],
    exercise: {
      instruction: "Register a custom element `info-pill` by calling `customElements.define('info-pill', InfoPill)`.",
      starter: `class InfoPill extends HTMLElement {}
// Call customElements.define here:`,
      solution: `class InfoPill extends HTMLElement {}
customElements.define("info-pill", InfoPill);`,
      hint: "customElements.define('info-pill', InfoPill);",
      validate: (code) => {
        return code.includes("customElements.define(\"info-pill\"") || code.includes("customElements.define('info-pill'");
      }
    }
  },
  {
    id: "h17",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Web Components",
    track: "html",
    title: "17. Web Components: Shadow DOM Encapsulation",
    estimatedTime: "16 min",
    summary: "Achieve 100% scoped styling and encapsulation using `attachShadow({ mode: 'open' })`, CSS `:host`, and `::slotted` pseudo-classes.",
    content: `
      <h2>True Style Encapsulation: The Shadow DOM</h2>
      <p>In standard HTML, global CSS leaks everywhere. Shadow DOM isolates the component's internal markup and CSS so outside styles cannot break it, and internal styles never pollute the page.</p>

      <pre><code class="language-javascript">class IsolatedWidget extends HTMLElement {
  connectedCallback() {
    // Attach Shadow DOM root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = \`
      &lt;style&gt;
        :host { display: inline-block; }
        p { color: #f43f5e; font-weight: bold; } /* Won't affect any p outside! */
      &lt;/style&gt;
      &lt;p&gt;Scoped encapsulated content&lt;/p&gt;
    \`;
  }
}
customElements.define("isolated-widget", IsolatedWidget);</code></pre>
    `,
    starterCode: `<script>
  class ScopedCard extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = \`
        <style>
          :host { display: block; max-width: 300px; margin: 10px auto; }
          .card { background: #1e293b; color: white; padding: 16px; border-radius: 8px; font-family: sans-serif; }
          h4 { margin: 0 0 8px 0; color: #38bdf8; }
        </style>
        <div class="card">
          <h4>Shadow DOM Card</h4>
          <p>These styles are 100% isolated!</p>
        </div>
      \`;
    }
  }
  if (!customElements.get('scoped-card')) {
    customElements.define('scoped-card', ScopedCard);
  }
</script>

<scoped-card></scoped-card>`,
    solutionCode: `<script>
  class ScopedCard extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = \`
        <style>
          :host { display: block; max-width: 300px; margin: 10px auto; }
          .card { background: #1e293b; color: white; padding: 16px; border-radius: 8px; font-family: sans-serif; }
          h4 { margin: 0 0 8px 0; color: #38bdf8; }
        </style>
        <div class="card">
          <h4>Shadow DOM Card</h4>
          <p>These styles are 100% isolated!</p>
        </div>
      \`;
    }
  }
  if (!customElements.get('scoped-card')) {
    customElements.define('scoped-card', ScopedCard);
  }
</script>

<scoped-card></scoped-card>`,
    quiz: [
      {
        question: "What does the `:host` CSS selector target inside a Shadow DOM stylesheet?",
        options: [
          "The custom element itself (the host containing the shadow root)",
          "The global window object",
          "The body tag",
          "All child elements"
        ],
        answer: 0,
        explanation: "`:host` selects and styles the custom element container that hosts the Shadow DOM tree."
      },
      {
        question: "What does `attachShadow({ mode: 'open' })` allow?",
        options: [
          "Allows outside JavaScript to access the shadow root via `element.shadowRoot`",
          "Leaves the styles unencrypted",
          "Shares cookies with other tabs",
          "Enables camera access"
        ],
        answer: 0,
        explanation: "`mode: 'open'` exposes `element.shadowRoot`, making internal nodes accessible to external JavaScript if needed."
      }
    ],
    exercise: {
      instruction: "Attach an open shadow root to `this` inside a class by calling `this.attachShadow({ mode: 'open' })`.",
      starter: `class MyComponent extends HTMLElement {
  connectedCallback() {
    // Attach open shadow root:
  }
}`,
      solution: `class MyComponent extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
  }
}`,
      hint: "this.attachShadow({ mode: 'open' });",
      validate: (code) => {
        return code.includes("attachShadow") && (code.includes("mode: 'open'") || code.includes("mode: \"open\""));
      }
    }
  },
  {
    id: "h18",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Platform APIs",
    track: "html",
    title: "18. Web Storage & Progressive Web Apps (PWA)",
    estimatedTime: "16 min",
    summary: "Transform websites into installable offline apps: Web App Manifest (`manifest.json`), Service Workers lifecycle, and client storage comparisons.",
    content: `
      <h2>The PWA Standard: Web Apps with Native Superpowers</h2>
      <p>Progressive Web Apps (PWAs) leverage web app manifests, service workers, and client-side storage to install onto devices and work completely offline.</p>

      <h3>Web App Manifest (<code>manifest.json</code>)</h3>
      <pre><code class="language-json">{
  "name": "Web Mastery Academy",
  "short_name": "WebAcademy",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0b0f19",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" }
  ]
}</code></pre>

      <h3>Storage Comparison</h3>
      <div class="code-table">
        <div class="table-row header"><span>Storage API</span><span>Capacity</span><span>Characteristics</span></div>
        <div class="table-row"><code>localStorage</code><span>~5 MB</span><span>Synchronous, string key-value, persists across tabs</span></div>
        <div class="table-row"><code>sessionStorage</code><span>~5 MB</span><span>Synchronous, isolated per browser tab, cleared on close</span></div>
        <div class="table-row"><code>IndexedDB</code><span>Hundreds of MB+</span><span>Asynchronous, transactional NoSQL database for structured data &amp; blobs</span></div>
      </div>
    `,
    starterCode: `<div style="font-family: sans-serif; padding: 20px; background: #f8fafc; border-radius: 8px;">
  <h3>Client-Side Storage Demo</h3>
  <input type="text" id="demoNote" placeholder="Type a note..." style="padding: 8px; width: 220px;" />
  <button onclick="localStorage.setItem('user_note', document.getElementById('demoNote').value); alert('Saved to localStorage!');" style="padding: 8px 14px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
    Save
  </button>
</div>`,
    solutionCode: `<div style="font-family: sans-serif; padding: 20px; background: #f8fafc; border-radius: 8px;">
  <h3>Client-Side Storage Demo</h3>
  <input type="text" id="demoNote" placeholder="Type a note..." style="padding: 8px; width: 220px;" />
  <button onclick="localStorage.setItem('user_note', document.getElementById('demoNote').value); alert('Saved to localStorage!');" style="padding: 8px 14px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
    Save
  </button>
</div>`,
    quiz: [
      {
        question: "What is the primary difference between `localStorage` and `sessionStorage`?",
        options: [
          "`localStorage` persists indefinitely until cleared; `sessionStorage` is cleared whenever the browser tab is closed",
          "`localStorage` is encrypted",
          "`sessionStorage` can store gigabytes of data",
          "`localStorage` only works in Firefox"
        ],
        answer: 0,
        explanation: "`localStorage` persists across sessions and restarts, whereas `sessionStorage` is scoped to a single tab session."
      },
      {
        question: "What file gives a PWA its installable name, standalone display mode, and home screen icons?",
        options: [
          "The Web App Manifest (`manifest.json`) linked in the `<head>`",
          "The package.json file",
          "The index.html title tag",
          "The robots.txt file"
        ],
        answer: 0,
        explanation: "The Web App Manifest (`<link rel='manifest' href='/manifest.json'>`) provides browser installation metadata."
      }
    ],
    exercise: {
      instruction: "Link a web app manifest by creating `<link rel='manifest' href='/manifest.json' />`.",
      starter: `<!-- Insert link manifest tag here -->`,
      solution: `<link rel="manifest" href="/manifest.json" />`,
      hint: "<link rel='manifest' href='/manifest.json'>",
      validate: (code) => {
        return code.includes("rel=\"manifest\"") && code.includes("href=\"/manifest.json\"");
      }
    }
  }
];

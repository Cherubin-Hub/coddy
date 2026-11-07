export const jsLessons = [
  // ==========================================
  // TIER 1: BEGINNER (Foundations & Core JS)
  // ==========================================
  {
    id: "j1",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "JS Core",
    track: "javascript",
    title: "1. Variables, Block Scope & Temporal Dead Zone",
    estimatedTime: "10 min",
    summary: "Master modern variable declarations with `const` and `let`, understand block scope `{}` vs function scope, and avoid hoisting traps with the TDZ.",
    content: `
      <h2>The Evolution of Variables in JavaScript</h2>
      <p>Before ES2015 (ES6), JavaScript only had <code>var</code>, which led to subtle hoisting bugs and scope leaks. Modern JavaScript gives us block-scoped <code>const</code> and <code>let</code>.</p>

      <div class="code-table">
        <div class="table-row header"><span>Keyword</span><span>Scope</span><span>Hoisting &amp; TDZ</span><span>Reassignable?</span></div>
        <div class="table-row"><code>const</code><span>Block <code>{}</code></span><span>Hoisted into Temporal Dead Zone (TDZ)</span><span>❌ No (Binding is immutable)</span></div>
        <div class="table-row"><code>let</code><span>Block <code>{}</code></span><span>Hoisted into Temporal Dead Zone (TDZ)</span><span>✅ Yes</span></div>
        <div class="table-row"><code>var</code> (legacy)<span>Function / Global</span><span>Hoisted with <code>undefined</code> (No TDZ)</span><span>✅ Yes</span></div>
      </div>

      <h3>The Temporal Dead Zone (TDZ)</h3>
      <p>Accessing a <code>let</code> or <code>const</code> variable before its declaration line throws a <code>ReferenceError</code>:</p>
      <pre><code class="language-javascript">// TDZ for 'name' starts here
// console.log(name); // ❌ ReferenceError!
let name = "Grace Hopper"; // TDZ ends here
console.log(name); // ✅ Grace Hopper</code></pre>
    `,
    starterCode: `const maxCapacity = 50;
let currentCount = 38;

// Add 4 participants
currentCount += 4;

console.log("Current count:", currentCount);
console.log("Spaces left:", maxCapacity - currentCount);
`,
    solutionCode: `const maxCapacity = 50;
let currentCount = 38;

currentCount += 4;

console.log("Current count:", currentCount);
console.log("Spaces left:", maxCapacity - currentCount);
`,
    quiz: [
      {
        question: "Can properties of an object assigned to a `const` variable be modified (e.g. `const config = {}; config.port = 80;`)?",
        options: [
          "Yes, because `const` prevents reassigning the variable identifier, but does not freeze object contents",
          "No, `const` deeply freezes the entire object",
          "Only in non-strict mode",
          "It throws a TypeError"
        ],
        answer: 0,
        explanation: "`const` prevents reassigning the variable binding itself. Internal object mutation is permitted unless frozen with `Object.freeze()`."
      },
      {
        question: "What is the Temporal Dead Zone (TDZ)?",
        options: [
          "The period between entering block scope and the variable declaration where accessing the variable throws a ReferenceError",
          "The duration of garbage collection",
          "A timeout in `setTimeout`",
          "A network latency metric"
        ],
        answer: 0,
        explanation: "The TDZ begins when execution enters the enclosing block scope and lasts until the line where `let` or `const` is declared."
      }
    ],
    exercise: {
      instruction: "Declare a `const MAX = 100` and a `let counter = 0`. Increment `counter` by 1 and log both.",
      starter: `// Declare MAX and counter:


`,
      solution: `const MAX = 100;
let counter = 0;
counter += 1;

console.log("MAX:", MAX, "Counter:", counter);
`,
      hint: "const MAX = 100; let counter = 0; counter += 1;",
      validate: (code) => {
        return code.includes("const MAX = 100") && code.includes("counter");
      }
    }
  },
  {
    id: "j2",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Types & Coercion",
    track: "javascript",
    title: "2. Primitive Data Types & Implicit Coercion",
    estimatedTime: "12 min",
    summary: "Understand the 7 primitives in JS, truthiness/falsiness, and why you must always use strict equality (`===`) over loose equality (`==`).",
    content: `
      <h2>The 7 JavaScript Primitives</h2>
      <p>Primitives are immutable values compared by value, not reference:</p>
      <div class="code-table">
        <div class="table-row header"><span>Type</span><span>typeof Output</span><span>Example</span></div>
        <div class="table-row"><code>string</code><span>"string"</span><span><code>"hello", \`sum: \${x}\`</code></span></div>
        <div class="table-row"><code>number</code><span>"number"</span><span><code>42, 3.14, NaN, Infinity</code></span></div>
        <div class="table-row"><code>bigint</code><span>"bigint"</span><span><code>9007199254740991n</code></span></div>
        <div class="table-row"><code>boolean</code><span>"boolean"</span><span><code>true, false</code></span></div>
        <div class="table-row"><code>undefined</code><span>"undefined"</span><span>Unassigned variables</span></div>
        <div class="table-row"><code>symbol</code><span>"symbol"</span><span><code>Symbol("id")</code></span></div>
        <div class="table-row"><code>null</code><span>"object" (historical JS bug)</span><span>Explicit absence of value</span></div>
      </div>

      <h3>Strict (<code>===</code>) vs Loose (<code>==</code>) Equality</h3>
      <p>Loose equality performs implicit type coercion, leading to notorious bugs:</p>
      <pre><code class="language-javascript">0 == false;       // true (coerced!)
"" == false;      // true (coerced!)
null == undefined; // true

// Always use strict equality (===), which checks BOTH type and value:
0 === false;      // false
"" === false;     // false</code></pre>
    `,
    starterCode: `const a = "42";
const b = 42;

console.log("Loose equality (==):", a == b);   // true
console.log("Strict equality (===):", a === b); // false
`,
    solutionCode: `const a = "42";
const b = 42;

console.log("Loose equality (==):", a == b);
console.log("Strict equality (===):", a === b);
`,
    quiz: [
      {
        question: "What is `typeof null` in JavaScript?",
        options: ["`'object'` (a historical bug preserved for compatibility)", "`'null'`", "`'undefined'`", "`'boolean'`"],
        answer: 0,
        explanation: "`typeof null` returns `'object'` due to an implementation artifact from the initial version of JavaScript in 1995."
      },
      {
        question: "Which of the following values is TRUTHY in JavaScript?",
        options: ["`'0'` (a non-empty string)", "`0` (number zero)", "`''` (empty string)", "`NaN`"],
        answer: 0,
        explanation: "Any non-empty string, including `'0'` and `'false'`, evaluates to truthy in boolean contexts."
      }
    ],
    exercise: {
      instruction: "Write a function `isStrictEqual(x, y)` that returns `x === y`.",
      starter: `function isStrictEqual(x, y) {
  // Return strict equality check
}

console.log(isStrictEqual(5, "5")); // false
console.log(isStrictEqual(5, 5));   // true
`,
      solution: `function isStrictEqual(x, y) {
  return x === y;
}

console.log(isStrictEqual(5, "5"));
console.log(isStrictEqual(5, 5));
`,
      hint: "return x === y;",
      validate: (code) => {
        return code.includes("x === y");
      }
    }
  },
  {
    id: "j3",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Control Flow",
    track: "javascript",
    title: "3. Control Flow, Errors & Custom Exceptions",
    estimatedTime: "12 min",
    summary: "Handle runtime exceptions gracefully with `try...catch...finally`, throw custom `Error` instances, and master control flow.",
    content: `
      <h2>Graceful Error Handling</h2>
      <p>Uncaught exceptions crash your script. Wrapping dangerous operations in <code>try...catch</code> allows graceful degradation:</p>

      <pre><code class="language-javascript">function parseConfig(jsonStr) {
  try {
    const config = JSON.parse(jsonStr);
    return config;
  } catch (err) {
    console.error("Failed to parse JSON:", err.message);
    return { fallback: true };
  } finally {
    console.log("Parsing attempt finished.");
  }
}</code></pre>
    `,
    starterCode: `function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero is not permitted.");
    }
    return a / b;
  } catch (e) {
    console.warn("Handled error:", e.message);
    return null;
  }
}

console.log("Result 1:", safeDivide(10, 2));
console.log("Result 2:", safeDivide(10, 0));
`,
    solutionCode: `function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero is not permitted.");
    }
    return a / b;
  } catch (e) {
    console.warn("Handled error:", e.message);
    return null;
  }
}

console.log("Result 1:", safeDivide(10, 2));
console.log("Result 2:", safeDivide(10, 0));
`,
    quiz: [
      {
        question: "When does code inside a `finally` block execute?",
        options: [
          "Always, regardless of whether an error was thrown or caught",
          "Only when an error occurs",
          "Only when no error occurs",
          "Only in async functions"
        ],
        answer: 0,
        explanation: "The `finally` block runs unconditionally after the `try` and `catch` blocks complete, ideal for cleanup tasks."
      },
      {
        question: "What built-in object should always be passed to `throw`?",
        options: [
          "An instance of `Error` (e.g. `throw new Error('msg')`) to preserve the call stack trace",
          "A plain string",
          "A number code",
          "A boolean"
        ],
        answer: 0,
        explanation: "Throwing an `Error` object preserves the file and line stack trace, critical for debugging."
      }
    ],
    exercise: {
      instruction: "Write a function `validateAge(age)` that throws `new Error('Underage')` if `age < 18`, otherwise returns `'Approved'`.",
      starter: `function validateAge(age) {
  // Implement here
}

console.log(validateAge(21));
`,
      solution: `function validateAge(age) {
  if (age < 18) {
    throw new Error("Underage");
  }
  return "Approved";
}

console.log(validateAge(21));
`,
      hint: "if (age < 18) throw new Error('Underage'); return 'Approved';",
      validate: (code) => {
        return code.includes("throw new Error") && code.includes("age < 18");
      }
    }
  },
  {
    id: "j4",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Functions",
    track: "javascript",
    title: "4. Modern Functions, Arrow Syntax & Rest Parameters",
    estimatedTime: "12 min",
    summary: "Understand function declarations vs expressions, arrow functions lexical `this`, default parameters, and rest parameters (`...args`).",
    content: `
      <h2>Arrow Functions vs Declarations</h2>
      <p>Arrow functions provide concise syntax and do NOT bind their own <code>this</code>, <code>arguments</code>, or <code>super</code>.</p>

      <pre><code class="language-javascript">// Concise arrow function
const multiply = (x, y = 1) =&gt; x * y;

// Rest parameters collect arbitrary arguments into a true Array
function sumAll(...numbers) {
  return numbers.reduce((acc, n) =&gt; acc + n, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10</code></pre>
    `,
    starterCode: `const calculateTotal = (taxRate = 0.08, ...prices) => {
  const subtotal = prices.reduce((acc, p) => acc + p, 0);
  return subtotal + (subtotal * taxRate);
};

console.log("Total: $" + calculateTotal(0.10, 25, 45, 30));
`,
    solutionCode: `const calculateTotal = (taxRate = 0.08, ...prices) => {
  const subtotal = prices.reduce((acc, p) => acc + p, 0);
  return subtotal + (subtotal * taxRate);
};

console.log("Total: $" + calculateTotal(0.10, 25, 45, 30));
`,
    quiz: [
      {
        question: "How do arrow functions handle the `this` keyword differently from regular functions?",
        options: [
          "Arrow functions inherit `this` lexically from their enclosing scope",
          "Arrow functions have their own dynamic `this`",
          "`this` is always null in arrow functions",
          "Arrow functions cannot access outer variables"
        ],
        answer: 0,
        explanation: "Arrow functions do not bind their own `this`; they capture the `this` value of the enclosing lexical execution context."
      },
      {
        question: "What data type does a rest parameter (`...args`) produce inside a function?",
        options: [
          "A real JavaScript `Array` with `.map()`, `.filter()`, etc.",
          "An array-like object without array methods",
          "A string",
          "A tuple"
        ],
        answer: 0,
        explanation: "Unlike legacy `arguments`, rest parameters produce genuine `Array` instances with all standard array methods available."
      }
    ],
    exercise: {
      instruction: "Write an arrow function `doubleAll(...nums)` that returns an array with each number multiplied by 2 using `.map()`.",
      starter: `// Write doubleAll arrow function:


console.log(doubleAll(1, 2, 3)); // [2, 4, 6]
`,
      solution: `const doubleAll = (...nums) => nums.map(n => n * 2);

console.log(doubleAll(1, 2, 3));
`,
      hint: "const doubleAll = (...nums) => nums.map(n => n * 2);",
      validate: (code) => {
        return code.includes("...nums") && code.includes(".map(") && code.includes("* 2");
      }
    }
  },
  {
    id: "j5",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Objects",
    track: "javascript",
    title: "5. Objects, Destructuring & Optional Chaining",
    estimatedTime: "14 min",
    summary: "Manipulate objects cleanly with destructuring, computed keys, optional chaining (`?.`), and the nullish coalescing operator (`??`).",
    content: `
      <h2>Modern Object Superpowers</h2>
      <p>Modern JavaScript eliminates repetitive checks for nested object nullability:</p>

      <pre><code class="language-javascript">const user = {
  id: "u1",
  profile: {
    address: { city: "Tokyo" }
  }
};

// 1. Destructuring with defaults
const { id, role = "member" } = user;

// 2. Optional Chaining (?. prevents 'Cannot read properties of undefined' crashes!)
const zip = user.profile?.address?.zipCode; // undefined (No crash!)

// 3. Nullish Coalescing (?? falls back ONLY on null or undefined, unlike ||)
const activeTheme = user.theme ?? "system-default";</code></pre>
    `,
    starterCode: `const apiData = {
  user: {
    name: "Alex",
    preferences: {
      theme: "dark"
    }
  }
};

// Safe access with optional chaining and nullish coalescing:
const userTheme = apiData.user?.preferences?.theme ?? "light";
const userAvatar = apiData.user?.profile?.avatar ?? "default-avatar.png";

console.log("Theme:", userTheme);
console.log("Avatar:", userAvatar);
`,
    solutionCode: `const apiData = {
  user: {
    name: "Alex",
    preferences: {
      theme: "dark"
    }
  }
};

const userTheme = apiData.user?.preferences?.theme ?? "light";
const userAvatar = apiData.user?.profile?.avatar ?? "default-avatar.png";

console.log("Theme:", userTheme);
console.log("Avatar:", userAvatar);
`,
    quiz: [
      {
        question: "What is the key difference between the nullish coalescing operator (`??`) and the logical OR operator (`||`)?",
        options: [
          "`??` falls back ONLY on `null` or `undefined`, whereas `||` falls back on all falsy values (including `0`, `false`, `''`)",
          "`??` is synchronous and `||` is async",
          "There is no difference",
          "`??` only works on numbers"
        ],
        answer: 0,
        explanation: "If a value is `0` or `false`, `||` incorrectly treats it as missing and replaces it with the fallback; `??` correctly preserves `0` and `false`."
      },
      {
        question: "What does `user?.profile?.avatar` return if `user.profile` is `undefined`?",
        options: [
          "`undefined` (short-circuits safely without throwing a TypeError)",
          "Throws a TypeError",
          "`null`",
          "`false`"
        ],
        answer: 0,
        explanation: "Optional chaining (`?.`) short-circuits and returns `undefined` as soon as any link in the chain is `null` or `undefined`."
      }
    ],
    exercise: {
      instruction: "Given `const data = { server: { port: 3000 } }`, extract `port` using object destructuring: `const { server: { port } } = data;`.",
      starter: `const data = { server: { port: 3000 } };
// Destructure port here:

console.log("Port:", port);
`,
      solution: `const data = { server: { port: 3000 } };
const { server: { port } } = data;

console.log("Port:", port);
`,
      hint: "const { server: { port } } = data;",
      validate: (code) => {
        return code.includes("{ server: { port } }");
      }
    }
  },
  {
    id: "j6",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Array Methods",
    track: "javascript",
    title: "6. Modern Array Transformations: `map`, `filter`, `reduce`",
    estimatedTime: "14 min",
    summary: "Transform, filter, and accumulate array data immutably using modern higher-order functions (`map`, `filter`, `reduce`, `flat`, `toSorted`).",
    content: `
      <h2>Declarative Data Pipelines</h2>
      <pre><code class="language-javascript">const users = [
  { name: "Ada", active: true, score: 95 },
  { name: "Alan", active: false, score: 80 },
  { name: "Grace", active: true, score: 98 }
];

// Chain methods cleanly
const topScores = users
  .filter(u => u.active)
  .map(u => u.score)
  .reduce((sum, score) => sum + score, 0); // 193</code></pre>
    `,
    starterCode: `const numbers = [10, 25, 40, 55, 70];

const evens = numbers.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const total = doubled.reduce((acc, n) => acc + n, 0);

console.log("Evens doubled:", doubled);
console.log("Sum:", total);
`,
    solutionCode: `const numbers = [10, 25, 40, 55, 70];

const evens = numbers.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const total = doubled.reduce((acc, n) => acc + n, 0);

console.log("Evens doubled:", doubled);
console.log("Sum:", total);
`,
    quiz: [
      {
        question: "Do `.map()` and `.filter()` mutate the original array?",
        options: [
          "No, they return a brand new array, leaving the original array untouched",
          "Yes, they mutate in-place",
          "Only in strict mode",
          "Only if the array contains objects"
        ],
        answer: 0,
        explanation: "`.map()` and `.filter()` are pure immutable methods that return a new array."
      },
      {
        question: "What is the modern immutable alternative to `.sort()` introduced in ECMAScript 2023?",
        options: ["`arr.toSorted()`", "`arr.sortCopy()`", "`arr.immutableSort()`", "`arr.order()`"],
        answer: 0,
        explanation: "`toSorted()` sorts elements and returns a new array without mutating the source array."
      }
    ],
    exercise: {
      instruction: "Filter `[5, 12, 8, 130, 44]` for values greater than 10 using `.filter(n => n > 10)`.",
      starter: `const arr = [5, 12, 8, 130, 44];
// Write filtered here:
const filtered = null;

console.log(filtered); // [12, 130, 44]
`,
      solution: `const arr = [5, 12, 8, 130, 44];
const filtered = arr.filter(n => n > 10);

console.log(filtered);
`,
      hint: "const filtered = arr.filter(n => n > 10);",
      validate: (code) => {
        return code.includes("arr.filter(") && code.includes("> 10");
      }
    }
  },

  // ========================================================
  // TIER 2: INTERMEDIATE (DOM, Events, Scope & Async)
  // ========================================================
  {
    id: "j7",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "DOM API",
    track: "javascript",
    title: "7. DOM Manipulation & Element Selection",
    estimatedTime: "14 min",
    summary: "Select, traverse, create, and modify DOM elements dynamically using `querySelector`, `classList`, and document fragments.",
    content: `
      <h2>The Document Object Model (DOM)</h2>
      <p>JavaScript interacts with web pages by traversing and manipulating the tree of DOM element nodes.</p>

      <pre><code class="language-javascript">// Querying
const btn = document.querySelector("#submit-btn");

// Manipulating classes
btn.classList.add("active");
btn.classList.toggle("loading");

// Creating nodes dynamically
const item = document.createElement("li");
item.textContent = "New Item";
document.querySelector("#list").appendChild(item);</code></pre>
    `,
    starterCode: `// Example DOM manipulation logic
function updateBadge(selector, label, color) {
  const el = document.querySelector(selector);
  if (el) {
    el.textContent = label;
    el.style.backgroundColor = color;
  }
}

console.log("DOM utility function defined successfully!");
`,
    solutionCode: `function updateBadge(selector, label, color) {
  const el = document.querySelector(selector);
  if (el) {
    el.textContent = label;
    el.style.backgroundColor = color;
  }
}

console.log("DOM utility function defined successfully!");
`,
    quiz: [
      {
        question: "Why is `document.querySelector` preferred over legacy `document.getElementById`?",
        options: [
          "It accepts any valid CSS selector (classes, attributes, pseudo-classes, combinations)",
          "It runs 10x faster in V8",
          "`getElementById` is deprecated",
          "It returns an array of elements"
        ],
        answer: 0,
        explanation: "`querySelector` allows querying with full CSS selector syntax (`.class[data-role='admin'] > span`)."
      },
      {
        question: "What is `textContent` safer to use than `innerHTML` when displaying user input?",
        options: [
          "`textContent` automatically escapes text, preventing Cross-Site Scripting (XSS) injection attacks",
          "`textContent` parses HTML tags faster",
          "`innerHTML` is not supported on mobile",
          "There is no difference"
        ],
        answer: 0,
        explanation: "`textContent` treats all input strictly as plain text, ensuring malicious `<script>` tags cannot execute."
      }
    ],
    exercise: {
      instruction: "Write a function `toggleActive(element)` that calls `element.classList.toggle('active')`.",
      starter: `function toggleActive(element) {
  // Implement here
}
`,
      solution: `function toggleActive(element) {
  element.classList.toggle("active");
}
`,
      hint: "element.classList.toggle('active');",
      validate: (code) => {
        return code.includes("element.classList.toggle(\"active\")") || code.includes("element.classList.toggle('active')");
      }
    }
  },
  {
    id: "j8",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "DOM Events",
    track: "javascript",
    title: "8. DOM Event Propagation & Event Delegation",
    estimatedTime: "14 min",
    summary: "Master event capturing, event bubbling, `event.stopPropagation()`, `event.preventDefault()`, and the high-performance Event Delegation pattern.",
    content: `
      <h2>The Event Propagation Pipeline</h2>
      <p>When an element is clicked, the event travels in three distinct phases:</p>
      <ol>
        <li><strong>Capturing Phase:</strong> Travels down from <code>window</code> to the target element.</li>
        <li><strong>Target Phase:</strong> Reaches the clicked target element.</li>
        <li><strong>Bubbling Phase:</strong> Bubbles back up to <code>window</code> (listeners fire here by default!).</li>
      </ol>

      <h3>Event Delegation: Single Listener for Infinite Items</h3>
      <p>Instead of attaching 1,000 click listeners to 1,000 list items, attach a single listener to the parent container:</p>
      <pre><code class="language-javascript">document.querySelector("#item-list").addEventListener("click", (event) => {
  const item = event.target.closest(".list-item");
  if (item) {
    console.log("Clicked item ID:", item.dataset.id);
  }
});</code></pre>
    `,
    starterCode: `function setupDelegation(containerSelector) {
  const container = document.querySelector(containerSelector);
  container?.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (btn) {
      console.log("Delegated button click:", btn.textContent);
    }
  });
}

console.log("Event delegation handler defined!");
`,
    solutionCode: `function setupDelegation(containerSelector) {
  const container = document.querySelector(containerSelector);
  container?.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (btn) {
      console.log("Delegated button click:", btn.textContent);
    }
  });
}

console.log("Event delegation handler defined!");
`,
    quiz: [
      {
        question: "What does `event.stopPropagation()` do?",
        options: [
          "Prevents the event from bubbling up (or capturing down) the DOM tree to parent listeners",
          "Cancels the default browser action (like following a link)",
          "Deletes the element",
          "Pauses JavaScript execution"
        ],
        answer: 0,
        explanation: "`stopPropagation()` halts the event's journey through the DOM hierarchy."
      },
      {
        question: "Why is Event Delegation better for dynamically rendered lists?",
        options: [
          "Newly added child elements automatically work without having to attach new listeners to them",
          "It saves memory by using only 1 listener",
          "Both of the above reasons",
          "Neither of the above"
        ],
        answer: 2,
        explanation: "Event delegation saves memory by using a single listener and seamlessly supports elements added dynamically later."
      }
    ],
    exercise: {
      instruction: "Attach a click listener to `button` that calls `event.preventDefault()`.",
      starter: `function attachHandler(button) {
  button.addEventListener("click", (event) => {
    // Prevent default action:
  });
}`,
      solution: `function attachHandler(button) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
  });
}`,
      hint: "event.preventDefault();",
      validate: (code) => {
        return code.includes("event.preventDefault()");
      }
    }
  },
  {
    id: "j9",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Closures",
    track: "javascript",
    title: "9. Scope, Execution Context & Closures",
    estimatedTime: "15 min",
    summary: "Master lexical scope, how closures preserve state across function calls, and build practical private state factories.",
    content: `
      <h2>What is a Closure?</h2>
      <p>A <strong>closure</strong> is the combination of a function bundled together with references to its surrounding state (its lexical environment). In JavaScript, closures are created every time a function is created.</p>

      <h3>Encapsulating Private State</h3>
      <pre><code class="language-javascript">function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable!

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter(10);
counter.increment();
console.log(counter.getValue()); // 11
// 'count' cannot be accessed or manipulated from the outside!</code></pre>
    `,
    starterCode: `function createStore(initialValue) {
  let state = initialValue;

  return {
    getState: () => state,
    setState: (newVal) => { state = newVal; }
  };
}

const store = createStore("Hello");
console.log("Initial state:", store.getState());
store.setState("Updated State");
console.log("Next state:", store.getState());
`,
    solutionCode: `function createStore(initialValue) {
  let state = initialValue;

  return {
    getState: () => state,
    setState: (newVal) => { state = newVal; }
  };
}

const store = createStore("Hello");
console.log("Initial state:", store.getState());
store.setState("Updated State");
console.log("Next state:", store.getState());
`,
    quiz: [
      {
        question: "What keeps variables accessible inside a returned inner function after the outer function has finished executing?",
        options: [
          "A Closure referencing the outer function's lexical environment",
          "Global window storage",
          "DOM caching",
          "The garbage collector ignores all functions"
        ],
        answer: 0,
        explanation: "The inner function holds a closure reference to its lexical environment, preventing the outer variables from being garbage collected."
      },
      {
        question: "Can outside code directly modify a variable encapsulated in a closure without using exposed methods?",
        options: [
          "No, the variable is completely private and encapsulated",
          "Yes, via `window`",
          "Yes, using prototype reflection",
          "Only in non-strict mode"
        ],
        answer: 0,
        explanation: "Closures provide true encapsulation: variables in lexical scope cannot be accessed from outside without returned methods."
      }
    ],
    exercise: {
      instruction: "Write a function `createMultiplier(factor)` that returns a function taking `x` and returning `x * factor`.",
      starter: `// Implement createMultiplier here:


const triple = createMultiplier(3);
console.log(triple(5)); // 15
`,
      solution: `function createMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const triple = createMultiplier(3);
console.log(triple(5));
`,
      hint: "function createMultiplier(factor) { return (x) => x * factor; }",
      validate: (code) => {
        return code.includes("createMultiplier") && code.includes("x * factor");
      }
    }
  },
  {
    id: "j10",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Async JS",
    track: "javascript",
    title: "10. Asynchronous JavaScript: Callbacks to Promises",
    estimatedTime: "15 min",
    summary: "Escape callback hell: master the Promise lifecycle (`pending`, `fulfilled`, `rejected`), chaining `.then()`, and error catching with `.catch()`.",
    content: `
      <h2>The Promise Lifecycle</h2>
      <p>A Promise represents an asynchronous operation's eventual completion (or failure):</p>
      <ul>
        <li><code>Pending</code>: Initial state (operation in progress).</li>
        <li><code>Fulfilled</code>: Operation completed successfully (resolves value).</li>
        <li><code>Rejected</code>: Operation failed (rejects error).</li>
      </ul>

      <pre><code class="language-javascript">function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id &gt; 0) resolve({ id, name: "Alice" });
      else reject(new Error("Invalid ID"));
    }, 100);
  });
}

fetchUser(1)
  .then(user =&gt; console.log("User:", user.name))
  .catch(err =&gt; console.error("Error:", err.message))
  .finally(() =&gt; console.log("Completed."));</code></pre>
    `,
    starterCode: `function fakeAsyncOperation(shouldSucceed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) resolve("Operation succeeded!");
      else reject(new Error("Operation failed!"));
    }, 50);
  });
}

fakeAsyncOperation(true)
  .then(msg => console.log(msg))
  .catch(err => console.error(err.message));
`,
    solutionCode: `function fakeAsyncOperation(shouldSucceed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) resolve("Operation succeeded!");
      else reject(new Error("Operation failed!"));
    }, 50);
  });
}

fakeAsyncOperation(true)
  .then(msg => console.log(msg))
  .catch(err => console.error(err.message));
`,
    quiz: [
      {
        question: "Once a Promise has fulfilled or rejected, can its state or value change again?",
        options: [
          "No, a Promise is settled and immutable once resolved or rejected",
          "Yes, calling resolve() a second time overwrites it",
          "Only in Web Workers",
          "Yes, if reset() is called"
        ],
        answer: 0,
        explanation: "A Promise can only settle once. Subsequent calls to `resolve()` or `reject()` are ignored."
      },
      {
        question: "What does returning a value inside a `.then()` handler do?",
        options: [
          "Wraps the value in a new Promise resolved to that value, enabling chaining",
          "Terminates the promise chain",
          "Converts it to JSON",
          "Prints it to console"
        ],
        answer: 0,
        explanation: "Returning a value in `.then()` resolves a new Promise, allowing seamless `.then().then()` chaining."
      }
    ],
    exercise: {
      instruction: "Write a function `resolveValue(val)` that returns `Promise.resolve(val)`.",
      starter: `function resolveValue(val) {
  // Return resolved promise
}

resolveValue("Success").then(console.log);
`,
      solution: `function resolveValue(val) {
  return Promise.resolve(val);
}

resolveValue("Success").then(console.log);
`,
      hint: "return Promise.resolve(val);",
      validate: (code) => {
        return code.includes("Promise.resolve(val)");
      }
    }
  },
  {
    id: "j11",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Async JS",
    track: "javascript",
    title: "11. `async / await` & Concurrent Combinators",
    estimatedTime: "16 min",
    summary: "Write synchronous-looking async code with `async/await`, and orchestrate concurrent tasks with `Promise.all()`, `Promise.allSettled()`, and `Promise.race()`.",
    content: `
      <h2>The Async / Await Paradigm</h2>
      <p><code>async / await</code> is syntax sugar on top of Promises, enabling standard <code>try...catch</code> control flow:</p>

      <pre><code class="language-javascript">async function loadDashboard() {
  try {
    // Run both network requests in parallel!
    const [user, posts] = await Promise.all([
      fetchUser(),
      fetchPosts()
    ]);
    return { user, posts };
  } catch (err) {
    console.error("Dashboard failed:", err);
  }
}</code></pre>

      <h3>Promise Combinators</h3>
      <div class="code-table">
        <div class="table-row header"><span>Combinator</span><span>Fulfills When</span><span>Rejects When</span></div>
        <div class="table-row"><code>Promise.all()</code><span>ALL promises succeed</span><span>First promise rejects</span></div>
        <div class="table-row"><code>Promise.allSettled()</code><span>ALL promises settle (never rejects!)</span><span>Never</span></div>
        <div class="table-row"><code>Promise.race()</code><span>First promise settles (fastest wins)</span><span>First promise rejects</span></div>
        <div class="table-row"><code>Promise.any()</code><span>First promise fulfills</span><span>ALL promises reject</span></div>
      </div>
    `,
    starterCode: `const delay = (ms, val) => new Promise(r => setTimeout(() => r(val), ms));

async function runConcurrent() {
  console.log("Starting parallel tasks...");
  const results = await Promise.all([
    delay(50, "Task 1 Done"),
    delay(30, "Task 2 Done")
  ]);
  console.log("All finished:", results);
}

runConcurrent();
`,
    solutionCode: `const delay = (ms, val) => new Promise(r => setTimeout(() => r(val), ms));

async function runConcurrent() {
  console.log("Starting parallel tasks...");
  const results = await Promise.all([
    delay(50, "Task 1 Done"),
    delay(30, "Task 2 Done")
  ]);
  console.log("All finished:", results);
}

runConcurrent();
`,
    quiz: [
      {
        question: "Why is `await Promise.all([fetchA(), fetchB()])` faster than `await fetchA(); await fetchB();`?",
        options: [
          "`Promise.all` fires both requests simultaneously in parallel, rather than waiting for A to finish before starting B",
          "`Promise.all` uses WebSockets",
          "`Promise.all` skips network verification",
          "There is no difference"
        ],
        answer: 0,
        explanation: "Sequential awaits execute in series (time = A + B). `Promise.all` executes concurrently in parallel (time = max(A, B))."
      },
      {
        question: "Which combinator guarantees you get results for every promise even if some fail with errors?",
        options: ["`Promise.allSettled()`", "`Promise.all()`", "`Promise.race()`", "`Promise.any()`"],
        answer: 0,
        explanation: "`Promise.allSettled()` returns an array of status objects (`{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`) for every task."
      }
    ],
    exercise: {
      instruction: "Write an `async function addAsync(a, b)` that returns the sum `a + b`.",
      starter: `// Write addAsync function here:


addAsync(5, 7).then(res => console.log("Sum:", res));
`,
      solution: `async function addAsync(a, b) {
  return a + b;
}

addAsync(5, 7).then(res => console.log("Sum:", res));
`,
      hint: "async function addAsync(a, b) { return a + b; }",
      validate: (code) => {
        return code.includes("async function addAsync") && code.includes("return a + b");
      }
    }
  },
  {
    id: "j12",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "HTTP & Fetch",
    track: "javascript",
    title: "12. The Fetch API, HTTP Headers & AbortController",
    estimatedTime: "15 min",
    summary: "Interact with REST APIs using `fetch()`, configure request headers, handle HTTP status codes, and cancel in-flight requests with `AbortController`.",
    content: `
      <h2>Making Network Requests with <code>fetch()</code></h2>
      <p>The native <code>fetch()</code> API replaces legacy XMLHttpRequest with a Promise-based interface:</p>

      <pre><code class="language-javascript">async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }

  return response.json();
}</code></pre>

      <h3>Cancelling Requests with <code>AbortController</code></h3>
      <p>Cancel pending requests (e.g., when a user types a new search query or navigates away):</p>
      <pre><code class="language-javascript">const controller = new AbortController();
fetch("/api/search?q=js", { signal: controller.signal });

// Cancel the request!
controller.abort();</code></pre>
    `,
    starterCode: `async function checkStatus(url) {
  console.log("Simulating fetch to:", url);
  // Example of inspecting response.ok:
  const mockResponse = { ok: true, status: 200, json: async () => ({ message: "Success" }) };
  if (mockResponse.ok) {
    const data = await mockResponse.json();
    console.log("Received data:", data.message);
  }
}

checkStatus("https://api.example.com/health");
`,
    solutionCode: `async function checkStatus(url) {
  console.log("Simulating fetch to:", url);
  const mockResponse = { ok: true, status: 200, json: async () => ({ message: "Success" }) };
  if (mockResponse.ok) {
    const data = await mockResponse.json();
    console.log("Received data:", data.message);
  }
}

checkStatus("https://api.example.com/health");
`,
    quiz: [
      {
        question: "Does `fetch()` reject its Promise when a server returns an HTTP 404 or 500 error code?",
        options: [
          "No! `fetch` only rejects on network failures or CORS errors; you must check `response.ok` manually",
          "Yes, it rejects automatically on 4xx and 5xx",
          "Only in Chrome",
          "Only when using POST"
        ],
        answer: 0,
        explanation: "A common pitfall: `fetch()` considers 404 or 500 responses successful HTTP transactions. Always verify `if (!response.ok)`."
      },
      {
        question: "Which browser API cancels an in-flight network request?",
        options: ["`AbortController`", "`CancelToken`", "`fetch.cancel()`", "`window.stopNetwork()`"],
        answer: 0,
        explanation: "`AbortController` provides a `signal` object that can abort fetches, timeouts, and event listeners."
      }
    ],
    exercise: {
      instruction: "Instantiate an `AbortController` and pass its signal into a dummy options object: `{ signal: controller.signal }`.",
      starter: `// Create controller and options object:
const controller = null;
const options = null;
`,
      solution: `const controller = new AbortController();
const options = { signal: controller.signal };
`,
      hint: "const controller = new AbortController(); const options = { signal: controller.signal };",
      validate: (code) => {
        return code.includes("new AbortController()") && code.includes("signal: controller.signal");
      }
    }
  },

  // ========================================================
  // TIER 3: ADVANCED (Runtime, Architecture & Performance)
  // ========================================================
  {
    id: "j13",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Event Loop",
    track: "javascript",
    title: "13. The JavaScript Event Loop & Concurrency Model",
    estimatedTime: "18 min",
    summary: "Demystify JavaScript's concurrency: explore the Call Stack, Web APIs, Microtask Queue (Promises), and Macrotask Queue (`setTimeout`).",
    content: `
      <h2>The Single Thread Concurrency Model</h2>
      <p>JavaScript executes synchronously on a single Call Stack. Asynchronous tasks queue into two distinct priority buffers:</p>

      <div class="diagram-card">
        <div class="pipeline-step"><code>Call Stack</code><span class="sub">Sync Execution</span></div>
        <div class="pipeline-arrow">➔ Empty ➔</div>
        <div class="pipeline-step highlight"><code>Microtasks</code><span class="sub">Promises (Drained 100%)</span></div>
        <div class="pipeline-arrow">➔ Next ➔</div>
        <div class="pipeline-step"><code>Macrotasks</code><span class="sub">setTimeout, DOM, I/O</span></div>
      </div>

      <pre><code class="language-javascript">console.log("1. Sync Start");

setTimeout(() => console.log("4. Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

console.log("2. Sync End");

// Output:
// 1. Sync Start
// 2. Sync End
// 3. Microtask (Promise)
// 4. Macrotask (setTimeout)</code></pre>
    `,
    starterCode: `console.log("Start");

setTimeout(() => console.log("Timeout (Macrotask)"), 0);

Promise.resolve().then(() => console.log("Promise (Microtask)"));

console.log("End");
`,
    solutionCode: `console.log("Start");

setTimeout(() => console.log("Timeout (Macrotask)"), 0);

Promise.resolve().then(() => console.log("Promise (Microtask)"));

console.log("End");
`,
    quiz: [
      {
        question: "Between a `setTimeout(..., 0)` macrotask and a `Promise.resolve().then(...)` microtask queued at the same time, which executes first?",
        options: [
          "The Promise microtask executes first because the microtask queue has higher priority than macrotasks",
          "The setTimeout macrotask",
          "They run in random order",
          "Both run simultaneously in multi-threading"
        ],
        answer: 0,
        explanation: "Microtasks (Promises, `queueMicrotask`) always drain completely before the event loop advances to the next macrotask."
      },
      {
        question: "What happens if a microtask recursively queues another microtask infinitely?",
        options: [
          "It starves the event loop, completely freezing UI rendering and user interactions",
          "The browser automatically terminates the script after 10ms",
          "It converts the microtask to a Web Worker",
          "Nothing, it runs in the background"
        ],
        answer: 0,
        explanation: "Because the event loop will not proceed until the microtask queue is completely empty, infinite microtasks freeze the thread."
      }
    ],
    exercise: {
      instruction: "Use `queueMicrotask(() => console.log('Immediate microtask'));` to queue an urgent microtask.",
      starter: `// Queue microtask here:


`,
      solution: `queueMicrotask(() => {
  console.log("Immediate microtask");
});
`,
      hint: "queueMicrotask(() => { console.log('Immediate microtask'); });",
      validate: (code) => {
        return code.includes("queueMicrotask") && code.includes("Immediate microtask");
      }
    }
  },
  {
    id: "j14",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "OOP & Classes",
    track: "javascript",
    title: "14. Prototypes, Inheritance & ES6 Classes",
    estimatedTime: "16 min",
    summary: "Understand JavaScript's prototypal inheritance, prototype chain lookups, ES6 classes (`extends`, `super`), and true `#` private fields.",
    content: `
      <h2>Prototypal Inheritance Under the Hood</h2>
      <p>JavaScript does not have traditional classical inheritance—every object has an internal link to another object called its <strong>prototype</strong>.</p>

      <h3>Modern ES6 Classes &amp; <code>#</code> Hard Private Fields</h3>
      <pre><code class="language-javascript">class BankAccount {
  #balance = 0; // True private runtime field!

  constructor(owner, initialDeposit) {
    this.owner = owner;
    this.#balance = initialDeposit;
  }

  deposit(amount) {
    if (amount &gt; 0) this.#balance += amount;
  }

  get balance() {
    return this.#balance;
  }
}

const acc = new BankAccount("Sarah", 1000);
// acc.#balance; // ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class</code></pre>
    `,
    starterCode: `class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  getInfo() {
    return \`\${this.make} \${this.model}\`;
  }
}

class ElectricVehicle extends Vehicle {
  #batteryKwh;
  constructor(make, model, batteryKwh) {
    super(make, model);
    this.#batteryKwh = batteryKwh;
  }
  getBattery() {
    return this.#batteryKwh + " kWh";
  }
}

const car = new ElectricVehicle("Tesla", "Model 3", 75);
console.log("Car:", car.getInfo(), "| Battery:", car.getBattery());
`,
    solutionCode: `class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  getInfo() {
    return \`\${this.make} \${this.model}\`;
  }
}

class ElectricVehicle extends Vehicle {
  #batteryKwh;
  constructor(make, model, batteryKwh) {
    super(make, model);
    this.#batteryKwh = batteryKwh;
  }
  getBattery() {
    return this.#batteryKwh + " kWh";
  }
}

const car = new ElectricVehicle("Tesla", "Model 3", 75);
console.log("Car:", car.getInfo(), "| Battery:", car.getBattery());
`,
    quiz: [
      {
        question: "What is the key difference between JavaScript's `#` private fields and TypeScript's `private` keyword?",
        options: [
          "`#` is enforced by the JavaScript engine at runtime, whereas TypeScript's `private` is purely compile-time and stripped in JS",
          "There is no difference",
          "`#` is deprecated",
          "`#` only works in Node.js"
        ],
        answer: 0,
        explanation: "Native ECMAScript `#` fields are enforced by the JavaScript runtime engine; accessing them outside the class throws a hard SyntaxError."
      },
      {
        question: "What must be called first inside the constructor of a derived class that `extends` a parent class?",
        options: ["`super()`", "`this.init()`", "`parent.constructor()`", "`Object.create()`"],
        answer: 0,
        explanation: "`super(...args)` must be called before accessing `this` in a subclass constructor."
      }
    ],
    exercise: {
      instruction: "Write a class `Counter` with a private `#count = 0` field, a method `increment()`, and a getter `get count()`.",
      starter: `class Counter {
  // Implement here
}

const c = new Counter();
c.increment();
console.log(c.count); // 1
`,
      solution: `class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  get count() {
    return this.#count;
  }
}

const c = new Counter();
c.increment();
console.log(c.count);
`,
      hint: "class Counter { #count = 0; increment() { this.#count++; } get count() { return this.#count; } }",
      validate: (code) => {
        return code.includes("#count") && code.includes("increment()") && code.includes("get count()");
      }
    }
  },
  {
    id: "j15",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Functional JS",
    track: "javascript",
    title: "15. Functional Programming: Pure Functions & Currying",
    estimatedTime: "16 min",
    summary: "Write predictable bug-free code with pure functions, referential transparency, currying, and functional pipe/compose utilities.",
    content: `
      <h2>The Core Pillars of Functional JavaScript</h2>
      <ul>
        <li><strong>Pure Functions:</strong> Given the same arguments, always return the exact same output, with zero observable side effects.</li>
        <li><strong>Immutability:</strong> Data structures are never mutated in place.</li>
      </ul>

      <h3>Currying: Converting N-ary Functions into Unary Chains</h3>
      <pre><code class="language-javascript">// Standard function: f(a, b, c)
const add = (a, b) =&gt; a + b;

// Curried function: f(a)(b)
const curriedAdd = a =&gt; b =&gt; a + b;

const addFive = curriedAdd(5);
console.log(addFive(10)); // 15
console.log(addFive(20)); // 25</code></pre>
    `,
    starterCode: `// Curried discount calculator
const applyDiscount = rate => price => price - (price * rate);

const blackFriday = applyDiscount(0.30); // 30% discount
const memberDiscount = applyDiscount(0.10); // 10% discount

console.log("Laptop ($1000): $" + blackFriday(1000));
console.log("Mouse ($50): $" + memberDiscount(50));
`,
    solutionCode: `const applyDiscount = rate => price => price - (price * rate);

const blackFriday = applyDiscount(0.30);
const memberDiscount = applyDiscount(0.10);

console.log("Laptop ($1000): $" + blackFriday(1000));
console.log("Mouse ($50): $" + memberDiscount(50));
`,
    quiz: [
      {
        question: "Which of the following is a characteristic of a PURE function?",
        options: [
          "It produces no side effects (like mutating global variables or making network requests) and returns identical output for identical inputs",
          "It uses async/await",
          "It modifies arguments directly",
          "It accesses the DOM"
        ],
        answer: 0,
        explanation: "Pure functions depend exclusively on their inputs, produce no side effects, and are 100% deterministic."
      },
      {
        question: "What is Currying in JavaScript?",
        options: [
          "Translating a function callable as `f(a, b)` into a sequence of functions callable as `f(a)(b)`",
          "Converting code to TypeScript",
          "Compressing functions for minification",
          "Adding try/catch blocks automatically"
        ],
        answer: 0,
        explanation: "Currying transforms a multi-argument function into a chain of single-argument functions."
      }
    ],
    exercise: {
      instruction: "Write a curried function `multiply(a)` that returns a function taking `b` and returning `a * b`.",
      starter: `// Implement curried multiply:
const multiply = null;

const double = multiply(2);
console.log(double(4)); // 8
`,
      solution: `const multiply = a => b => a * b;

const double = multiply(2);
console.log(double(4));
`,
      hint: "const multiply = a => b => a * b;",
      validate: (code) => {
        return code.includes("a => b => a * b") || code.includes("return function(b)");
      }
    }
  },
  {
    id: "j16",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Generators",
    track: "javascript",
    title: "16. Iterators, Iterables & Generator Functions",
    estimatedTime: "16 min",
    summary: "Harness custom iterable protocols (`Symbol.iterator`) and build lazy data streams with Generator Functions (`function*`, `yield`).",
    content: `
      <h2>The Iteration Protocols</h2>
      <p>Any object implementing the <code>[Symbol.iterator]</code> method can be iterated with <code>for...of</code> loops and spread syntax (<code>...</code>).</p>

      <h3>Generator Functions (<code>function*</code> and <code>yield</code>)</h3>
      <p>Generators are functions that can pause execution midway and resume later, yielding values lazily on demand:</p>
      <pre><code class="language-javascript">function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++; // Pauses here until .next() is called!
  }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3</code></pre>
    `,
    starterCode: `function* fibonacciSequence(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacciSequence(6);
for (const num of fib) {
  console.log("Fibonacci:", num);
}
`,
    solutionCode: `function* fibonacciSequence(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacciSequence(6);
for (const num of fib) {
  console.log("Fibonacci:", num);
}
`,
    quiz: [
      {
        question: "What keyword pauses execution inside a generator function and returns a value to the caller?",
        options: ["`yield`", "`return`", "`pause`", "`await`"],
        answer: 0,
        explanation: "The `yield` keyword pauses generator execution and emits an object `{ value, done: false }`."
      },
      {
        question: "What well-known symbol must an object implement to be iterable by `for...of` loops?",
        options: ["`Symbol.iterator`", "`Symbol.asyncIterator`", "`Symbol.hasInstance`", "`Symbol.toStringTag`"],
        answer: 0,
        explanation: "`[Symbol.iterator]` is the standard protocol hook expected by `for...of` and array spread."
      }
    ],
    exercise: {
      instruction: "Write a generator function `function* countUp()` that yields `1`, then yields `2`.",
      starter: `// Implement countUp here:


const c = countUp();
console.log(c.next().value); // 1
console.log(c.next().value); // 2
`,
      solution: `function* countUp() {
  yield 1;
  yield 2;
}

const c = countUp();
console.log(c.next().value);
console.log(c.next().value);
`,
      hint: "function* countUp() { yield 1; yield 2; }",
      validate: (code) => {
        return code.includes("function* countUp()") && code.includes("yield 1") && code.includes("yield 2");
      }
    }
  },
  {
    id: "j17",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Memory",
    track: "javascript",
    title: "17. Memory Management & Eliminating Memory Leaks",
    estimatedTime: "18 min",
    summary: "Understand V8's Mark-and-Sweep garbage collection, detect memory leaks, and prevent uncollected closures, detached DOM nodes, and lingering listeners.",
    content: `
      <h2>The V8 Garbage Collector: Mark and Sweep</h2>
      <p>JavaScript manages memory automatically. An object is eligible for garbage collection when it is no longer <strong>reachable</strong> from the root execution context.</p>

      <h3>The 3 Most Common Memory Leaks in Web Apps</h3>
      <ol>
        <li><strong>Dangling Event Listeners:</strong> Attaching listeners to elements that are later removed from the DOM without calling <code>removeEventListener()</code>.</li>
        <li><strong>Forgotten Timers:</strong> Leaving <code>setInterval()</code> running in unmounted components.</li>
        <li><strong>Accidental Global Variables:</strong> Assigning to undeclared variables in non-strict mode.</li>
      </ol>

      <pre><code class="language-javascript">// Best Practice: WeakRef and WeakMap for non-leaking caches
const cache = new WeakMap(); // Keys are held weakly and can be garbage collected!</code></pre>
    `,
    starterCode: `class SafeSubscription {
  constructor() {
    this.intervalId = setInterval(() => {
      console.log("Heartbeat ping...");
    }, 1000);
  }

  // Prevent memory leaks: always provide a dispose/cleanup method!
  dispose() {
    clearInterval(this.intervalId);
    console.log("Cleaned up interval safely.");
  }
}

const sub = new SafeSubscription();
setTimeout(() => sub.dispose(), 2100);
`,
    solutionCode: `class SafeSubscription {
  constructor() {
    this.intervalId = setInterval(() => {
      console.log("Heartbeat ping...");
    }, 1000);
  }

  dispose() {
    clearInterval(this.intervalId);
    console.log("Cleaned up interval safely.");
  }
}

const sub = new SafeSubscription();
setTimeout(() => sub.dispose(), 2100);
`,
    quiz: [
      {
        question: "Why does a `WeakMap` help avoid memory leaks compared to a regular `Map` when caching object data?",
        options: [
          "`WeakMap` holds keys as weak references, meaning if no other references exist to the key object, it is automatically garbage collected",
          "`WeakMap` stores data in browser cookies",
          "`WeakMap` deletes data after 10 seconds",
          "`WeakMap` is smaller in byte size"
        ],
        answer: 0,
        explanation: "`WeakMap` allows key objects to be collected by garbage collection when no longer referenced elsewhere."
      },
      {
        question: "What is a 'Detached DOM Node' memory leak?",
        options: [
          "An element removed from the HTML page, but still referenced by a JavaScript variable in memory",
          "A broken CSS selector",
          "An HTML file saved on disk",
          "An iframe without an src"
        ],
        answer: 0,
        explanation: "Detached DOM nodes occur when elements are removed from the page DOM, but JavaScript variables still hold references to them."
      }
    ],
    exercise: {
      instruction: "Instantiate a `WeakMap` named `cache = new WeakMap()`.",
      starter: `// Instantiate WeakMap:
const cache = null;
`,
      solution: `const cache = new WeakMap();
`,
      hint: "const cache = new WeakMap();",
      validate: (code) => {
        return code.includes("new WeakMap()");
      }
    }
  },
  {
    id: "j18",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Optimization",
    track: "javascript",
    title: "18. Performance: Debouncing, Throttling & Web Workers",
    estimatedTime: "18 min",
    summary: "Optimize high-frequency UI events with Debouncing and Throttling, and offload CPU-heavy computation off the main thread with Web Workers.",
    content: `
      <h2>Taming High-Frequency Events</h2>
      <p>Scroll, resize, and keystroke events can fire hundreds of times per second, causing severe UI lag (jank):</p>

      <h3>Debounce vs Throttle</h3>
      <div class="code-table">
        <div class="table-row header"><span>Technique</span><span>Behavior</span><span>Use Case</span></div>
        <div class="table-row"><code>Debounce</code><span>Waits until silence for N milliseconds before executing</span><span>Search autocomplete, window resize</span></div>
        <div class="table-row"><code>Throttle</code><span>Executes at most once every N milliseconds</span><span>Infinite scroll, game loop update</span></div>
      </div>

      <pre><code class="language-javascript">function debounce(fn, delayMs = 300) {
  let timerId;
  return (...args) =&gt; {
    clearTimeout(timerId);
    timerId = setTimeout(() =&gt; fn(...args), delayMs);
  };
}</code></pre>
    `,
    starterCode: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching API for:", query);
}, 200);

handleSearch("t");
handleSearch("ty");
handleSearch("typescript"); // Only this final call executes!
`,
    solutionCode: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching API for:", query);
}, 200);

handleSearch("t");
handleSearch("ty");
handleSearch("typescript");
`,
    quiz: [
      {
        question: "When should you choose Debouncing over Throttling?",
        options: [
          "When you only want the function to execute after the user has finished typing or paused their activity (e.g. search input)",
          "For 60fps scrolling animations",
          "For game loops",
          "For WebSocket heartbeats"
        ],
        answer: 0,
        explanation: "Debouncing postpones execution until activity pauses for a specified cooldown window."
      },
      {
        question: "What is the primary benefit of using a Web Worker (`new Worker('worker.js')`)?",
        options: [
          "Runs CPU-intensive JavaScript on a background thread without freezing the UI or main thread",
          "Loads npm packages faster",
          "Bypasses CORS restrictions",
          "Enables offline storage"
        ],
        answer: 0,
        explanation: "Web Workers run tasks on true parallel OS background threads, preventing CPU-intensive calculations from blocking the main UI thread."
      }
    ],
    exercise: {
      instruction: "Implement a basic `throttle(fn, wait)` function that uses an `inThrottle` boolean flag.",
      starter: `function throttle(fn, wait) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
}

const log = throttle(console.log, 100);
log("Throttled");
`,
      solution: `function throttle(fn, wait) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
}

const log = throttle(console.log, 100);
log("Throttled");
`,
      hint: "function throttle(fn, wait) { let inThrottle; return (...args) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, wait); } }; }",
      validate: (code) => {
        return code.includes("inThrottle") && code.includes("setTimeout");
      }
    }
  }
];

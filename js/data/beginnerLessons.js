export const beginnerLessons = [
  {
    id: "b1",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "TS Foundations",
    title: "1. Why TypeScript? The Mental Model",
    estimatedTime: "8 min",
    summary: "Discover why TypeScript exists, how it sits on top of JavaScript, and how static type checking eliminates entire classes of bugs before runtime.",
    content: `
      <h2>The JavaScript Superpower: TypeScript</h2>
      <p>JavaScript is dynamically typed: types are evaluated at runtime, meaning bugs like <code>TypeError: Cannot read properties of undefined</code> only reveal themselves when a user actually hits the broken path in production.</p>
      
      <div class="callout tip">
        <strong>The Mental Model:</strong> TypeScript is a <em>compile-time linter and type analyzer</em>. At runtime, TypeScript completely disappears — only clean, standard JavaScript remains!
      </div>

      <h3>JavaScript vs TypeScript: Side-by-Side</h3>
      <div class="comparison-grid">
        <div class="comparison-box js">
          <div class="box-badge">Plain JavaScript</div>
          <pre><code class="language-javascript">// No warnings while coding
function calculateDiscount(price, discount) {
  return price - (price * discount);
}

// Runtime bug: returns NaN!
calculateDiscount(100, "20%");</code></pre>
        </div>
        <div class="comparison-box ts">
          <div class="box-badge">TypeScript</div>
          <pre><code class="language-typescript">function calculateDiscount(price: number, discount: number): number {
  return price - (price * discount);
}

// ❌ TypeScript Error caught INSTANTLY in your editor:
// Argument of type 'string' is not assignable to parameter of type 'number'.
calculateDiscount(100, "20%");</code></pre>
        </div>
      </div>

      <h3>The TypeScript Compilation Pipeline</h3>
      <div class="diagram-card">
        <div class="pipeline-step"><code>Your .ts Code</code> <span class="sub">Types + JS syntax</span></div>
        <div class="pipeline-arrow">➔ Type Checker (tsc) ➔</div>
        <div class="pipeline-step"><code>Type Diagnostics</code> <span class="sub">Catches bugs before running</span></div>
        <div class="pipeline-arrow">➔ Code Stripping ➔</div>
        <div class="pipeline-step highlight"><code>Vanilla .js Code</code> <span class="sub">Runs in Node, Chrome, Safari</span></div>
      </div>

      <h3>Key Advantages</h3>
      <ul>
        <li><strong>Self-Documenting Code:</strong> Functions and data structures explicitly declare their contracts.</li>
        <li><strong>Fearless Refactoring:</strong> Renaming properties or restructuring data updates everywhere with automatic compiler feedback.</li>
        <li><strong>Rich Autocomplete (IntelliSense):</strong> Your IDE knows every field, method, and argument available on any object.</li>
      </ul>
    `,
    starterCode: `// Welcome to the Live TypeScript Playground!
// Try fixing the compiler error below by passing proper numbers.

function calculateTotal(price: number, taxRate: number): number {
  const tax = price * taxRate;
  return price + tax;
}

// Fix this call:
const result = calculateTotal(150, "0.08");

console.log("Total with tax: $" + result);
`,
    solutionCode: `function calculateTotal(price: number, taxRate: number): number {
  const tax = price * taxRate;
  return price + tax;
}

// Solution: pass 0.08 as a number
const result = calculateTotal(150, 0.08);

console.log("Total with tax: $" + result);
`,
    quiz: [
      {
        question: "When does TypeScript check your types?",
        options: [
          "At compile time / while typing in your editor",
          "At runtime when your website is loaded in the browser",
          "Inside the database during network requests",
          "Only when running unit tests with Jest"
        ],
        answer: 0,
        explanation: "TypeScript performs static type checking during compilation or editor time. It strips all types away, producing standard JavaScript for runtime."
      },
      {
        question: "What happens to TypeScript type annotations in the final built JavaScript bundle?",
        options: [
          "They are converted to runtime typeof if-conditions",
          "They are completely erased and not present in the runtime JavaScript",
          "They are stored in a special __types__ global object",
          "They are minified into JSON metadata files"
        ],
        answer: 1,
        explanation: "TypeScript types are purely compile-time constructs. They are completely erased ('type erasure') during compilation."
      }
    ],
    exercise: {
      instruction: "Define a function named `formatUser` that takes `username` (string) and `age` (number), and returns a string in the format `'User [username] is [age] years old.'`. Then call it with `'Alice'` and `28`.",
      starter: `// Write your formatUser function here:


// Test with 'Alice' and 28:
`,
      solution: `function formatUser(username: string, age: number): string {
  return \`User \${username} is \${age} years old.\`;
}

const message = formatUser("Alice", 28);
console.log(message);
`,
      hint: "Use parameter annotations: (username: string, age: number): string",
      validate: (code) => {
        return /function\s+formatUser\s*\(\s*username\s*:\s*string\s*,\s*age\s*:\s*number\s*\)\s*:\s*string/.test(code) &&
          code.includes("Alice") && code.includes("28");
      }
    }
  },
  {
    id: "b2",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "TS Foundations",
    title: "2. Primitive & Special Types (`any`, `unknown`, `never`)",
    estimatedTime: "12 min",
    summary: "Master all JavaScript primitives in TypeScript, plus the critical difference between `any`, `unknown`, and the impossible `never` type.",
    content: `
      <h2>The Standard Primitives</h2>
      <p>TypeScript supports all JavaScript primitive types directly:</p>
      <div class="code-table">
        <div class="table-row header"><span>Type</span><span>Example Literal</span><span>Description</span></div>
        <div class="table-row"><code>string</code><span><code>"hello", \`count: \${n}\`</code></span><span>UTF-16 text sequences</span></div>
        <div class="table-row"><code>number</code><span><code>42, 3.14, 0xff, -7</code></span><span>Double-precision IEEE 754 floats</span></div>
        <div class="table-row"><code>boolean</code><span><code>true, false</code></span><span>Truth values</span></div>
        <div class="table-row"><code>bigint</code><span><code>100n, 9007199254740991n</code></span><span>Arbitrary-precision integers</span></div>
        <div class="table-row"><code>symbol</code><span><code>Symbol("id")</code></span><span>Unique, immutable primitive tokens</span></div>
        <div class="table-row"><code>null</code> &amp; <code>undefined</code><span><code>null, undefined</code></span><span>Missing or uninitialized values</span></div>
      </div>

      <h3>Type Inference</h3>
      <p>You don't have to annotate everything! TypeScript is smart enough to infer types automatically:</p>
      <pre><code class="language-typescript">let count = 10;        // Inferred as number!
let username = "neo";  // Inferred as string!
// count = "ten";      // ❌ Error: Type 'string' is not assignable to type 'number'.</code></pre>

      <h3>The Big Three Special Types: <code>any</code> vs <code>unknown</code> vs <code>never</code></h3>
      <div class="types-trio-grid">
        <div class="trio-card card-any">
          <div class="trio-badge danger">any (The Escape Hatch)</div>
          <p>Disables all type checking. You can access any property, call it as a function, or assign anything to it without compiler errors.</p>
          <pre><code class="language-typescript">let value: any = "hello";
value.nonExistentMethod(); // 💥 Compiles, but crashes at runtime!</code></pre>
          <div class="tag warning">⚠️ Avoid in modern TypeScript!</div>
        </div>

        <div class="trio-card card-unknown">
          <div class="trio-badge safe">unknown (Type-Safe Any)</div>
          <p>Represents any value, but TypeScript forbids doing <em>anything</em> with it until you check its type first via narrowing.</p>
          <pre><code class="language-typescript">let data: unknown = JSON.parse(apiResponse);
// data.trim(); // ❌ Compiler stops you!

if (typeof data === "string") {
  console.log(data.trim()); // ✅ Safe!
}</code></pre>
          <div class="tag success">✨ Recommended for APIs & dynamic input</div>
        </div>

        <div class="trio-card card-never">
          <div class="trio-badge special">never (The Impossible Type)</div>
          <p>Represents values that can never occur. Used for functions that always throw, infinite loops, or exhaustive switch checks.</p>
          <pre><code class="language-typescript">function throwError(msg: string): never {
  throw new Error(msg);
}</code></pre>
          <div class="tag info">Bottom of type hierarchy</div>
        </div>
      </div>
    `,
    starterCode: `// Try using 'unknown' safely with type narrowing:
function processUserData(input: unknown) {
  // Uncomment and complete the safe check:
  // if (typeof input === "string") {
  //   console.log("Input in uppercase:", input.toUpperCase());
  // } else if (typeof input === "number") {
  //   console.log("Input doubled:", input * 2);
  // }
}

processUserData("welcome to typescript");
processUserData(42);
`,
    solutionCode: `function processUserData(input: unknown) {
  if (typeof input === "string") {
    console.log("Input in uppercase:", input.toUpperCase());
  } else if (typeof input === "number") {
    console.log("Input doubled:", input * 2);
  } else {
    console.log("Unknown type:", typeof input);
  }
}

processUserData("welcome to typescript");
processUserData(42);
`,
    quiz: [
      {
        question: "Why is 'unknown' preferred over 'any' when handling untyped external data?",
        options: [
          "'unknown' is faster to execute at runtime",
          "'unknown' forces you to perform type checks before using properties or methods",
          "'unknown' automatically converts strings to numbers",
          "'unknown' can only hold primitive values"
        ],
        answer: 1,
        explanation: "'unknown' is type-safe: TypeScript prevents you from calling methods or accessing properties on it until you narrow its type (e.g. using typeof or instanceof)."
      },
      {
        question: "What is the return type of a function that always throws an Error?",
        options: ["void", "undefined", "never", "null"],
        answer: 2,
        explanation: "Functions that never return normally (because they throw an exception or run an endless loop) have the return type 'never'."
      }
    ],
    exercise: {
      instruction: "Create a safe parsing function `safeStringify(val: unknown): string`. If `val` is a string, return it trimmed. If it's a number, return `val.toString()`. For anything else, return `\"[unsupported]\"`.",
      starter: `function safeStringify(val: unknown): string {
  // Implement here
}

console.log(safeStringify("   typescript   "));
console.log(safeStringify(999));
console.log(safeStringify(true));
`,
      solution: `function safeStringify(val: unknown): string {
  if (typeof val === "string") {
    return val.trim();
  }
  if (typeof val === "number") {
    return val.toString();
  }
  return "[unsupported]";
}

console.log(safeStringify("   typescript   "));
console.log(safeStringify(999));
console.log(safeStringify(true));
`,
      hint: "Use `typeof val === 'string'` and `typeof val === 'number'`.",
      validate: (code) => {
        return code.includes("typeof val === \"string\"") || code.includes("typeof val === 'string'");
      }
    }
  },
  {
    id: "b3",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "TS Foundations",
    title: "3. Arrays, Tuples & Readonly Modifiers",
    estimatedTime: "10 min",
    summary: "Understand typed arrays, fixed-length typed tuples, and how `readonly` and `as const` lock data structures from accidental mutation.",
    content: `
      <h2>Typed Arrays</h2>
      <p>There are two equivalent ways to declare array types in TypeScript:</p>
      <pre><code class="language-typescript">const scores: number[] = [88, 92, 100];
const cities: Array&lt;string&gt; = ["Tokyo", "Berlin", "Toronto"];</code></pre>

      <h2>Tuples: Fixed Length &amp; Positional Types</h2>
      <p>A tuple is an array with a fixed number of elements where each element can have a distinct type at specific index positions:</p>
      <pre><code class="language-typescript">// Represents [latitude, longitude, cityLabel]
let location: [number, number, string];

location = [35.6762, 139.6503, "Tokyo"]; // ✅ Correct
// location = ["Tokyo", 35.6762, 139.6503]; // ❌ Error: Type mismatch!
// location = [35.6762, 139.6503];         // ❌ Error: Source has 2 elements, target needs 3</code></pre>

      <div class="callout note">
        <strong>Named Tuple Elements (TS 4.0+):</strong> You can label tuple positions for better documentation:
        <pre><code class="language-typescript">type HttpResult = [statusCode: number, message: string];</code></pre>
      </div>

      <h2>Protecting Data: <code>readonly</code> &amp; <code>as const</code></h2>
      <p>Prevent accidental mutations using the <code>readonly</code> modifier or const assertions:</p>
      <pre><code class="language-typescript">const readonlyScores: readonly number[] = [10, 20, 30];
// readonlyScores.push(40); // ❌ Property 'push' does not exist on type 'readonly number[]'

// 'as const' creates deeply readonly literals:
const config = {
  endpoint: "https://api.domain.com",
  timeout: 5000
} as const;

// config.timeout = 10000; // ❌ Cannot assign to 'timeout' because it is a read-only property</code></pre>
    `,
    starterCode: `// Define a tuple representing a user state: [userId: number, username: string, isAdmin: boolean]
type UserTuple = [number, string, boolean];

const adminUser: UserTuple = [101, "dev_sarah", true];

console.log("User:", adminUser[1], "| Admin?", adminUser[2]);

// Try changing index 0 to a string to see the TypeScript error:
// adminUser[0] = "invalid_id";
`,
    solutionCode: `type UserTuple = [number, string, boolean];

const adminUser: UserTuple = [101, "dev_sarah", true];

console.log("User:", adminUser[1], "| Admin?", adminUser[2]);
`,
    quiz: [
      {
        question: "What is the key difference between `number[]` and `[number, string]`?",
        options: [
          "`number[]` can only have two items, while tuples have unlimited items",
          "`[number, string]` is a tuple with a fixed length of 2 and specified types at each index",
          "Tuples run faster in V8 than standard arrays",
          "`number[]` is immutable by default"
        ],
        answer: 1,
        explanation: "A tuple specifies an exact number of elements with explicit types for each positional index."
      },
      {
        question: "What happens when you use `as const` on an array literal: `const colors = ['red', 'blue'] as const`?",
        options: [
          "It converts the array into a Set",
          "The type becomes `readonly ['red', 'blue']` with literal string types",
          "It forces the array to only contain numbers",
          "It removes duplicates from the array"
        ],
        answer: 1,
        explanation: "`as const` narrows string primitives to their exact literal values and marks the tuple as `readonly`."
      }
    ],
    exercise: {
      instruction: "Define a tuple type `Coordinate` that holds exactly three numbers `[x, y, z]`. Then write a function `getMagnitude(coord: Coordinate): number` that returns `Math.sqrt(x*x + y*y + z*z)`.",
      starter: `// 1. Define Coordinate tuple type:


// 2. Define getMagnitude function:


// Test coordinate:
const origin = [3, 4, 12] as const;
`,
      solution: `type Coordinate = [number, number, number];

function getMagnitude(coord: Coordinate): number {
  const [x, y, z] = coord;
  return Math.sqrt(x * x + y * y + z * z);
}

const point: Coordinate = [3, 4, 12];
console.log("Magnitude:", getMagnitude(point)); // 13
`,
      hint: "type Coordinate = [number, number, number];",
      validate: (code) => {
        return /type\s+Coordinate\s*=\s*\[\s*number\s*,\s*number\s*,\s*number\s*\]/.test(code) &&
          code.includes("getMagnitude");
      }
    }
  },
  {
    id: "b4",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "TS Foundations",
    title: "4. Functions, Signatures & Optional Parameters",
    estimatedTime: "12 min",
    summary: "Learn parameter typing, return types, optional arguments, default values, rest parameters, and function type signatures.",
    content: `
      <h2>Typing Function Parameters & Return Types</h2>
      <p>Always specify what parameters a function expects and what type it returns:</p>
      <pre><code class="language-typescript">function add(x: number, y: number): number {
  return x + y;
}

// Arrow function syntax:
const multiply = (a: number, b: number): number => a * b;</code></pre>

      <h3>Optional Parameters (<code>?</code>) and Default Values</h3>
      <p>Use the question mark <code>?</code> to mark parameters that callers may omit. Optional parameters must always come <em>after</em> required parameters:</p>
      <pre><code class="language-typescript">function greet(name: string, title?: string): string {
  if (title) {
    return \`Hello, \${title} \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

// Or with default values (which automatically infer the type!):
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}</code></pre>

      <h3>Function Type Signatures</h3>
      <p>You can define the type of a function variable or callback independently:</p>
      <pre><code class="language-typescript">// Type alias for a callback
type Formatter = (input: string) => string;

function printLabel(text: string, formatter: Formatter): void {
  console.log(formatter(text));
}</code></pre>

      <h3>Rest Parameters (<code>...args</code>)</h3>
      <pre><code class="language-typescript">function sumAll(...numbers: number[]): number {
  return numbers.reduce((sum, current) => sum + current, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15</code></pre>
    `,
    starterCode: `// Write a function 'createEmail' with:
// - recipient: string (required)
// - subject: string (required)
// - priority: "low" | "normal" | "high" (optional, defaults to "normal")
// Returns formatted string

function createEmail(recipient: string, subject: string, priority = "normal") {
  return \`To: \${recipient} | Subj: \${subject} | Priority: \${priority}\`;
}

console.log(createEmail("alex@work.com", "Project Status"));
`,
    solutionCode: `type Priority = "low" | "normal" | "high";

function createEmail(recipient: string, subject: string, priority: Priority = "normal"): string {
  return \`To: \${recipient} | Subj: \${subject} | Priority: \${priority}\`;
}

console.log(createEmail("alex@work.com", "Project Status", "high"));
`,
    quiz: [
      {
        question: "Where must optional parameters (e.g. `title?: string`) be positioned in a parameter list?",
        options: [
          "Anywhere in the parameter list",
          "Always before required parameters",
          "Always after required parameters",
          "They must be wrapped in an object"
        ],
        answer: 2,
        explanation: "In TypeScript and JavaScript, optional parameters must follow all required parameters."
      },
      {
        question: "What is the return type of a function that performs a side effect (like `console.log`) and does not return a value?",
        options: ["never", "void", "null", "empty"],
        answer: 1,
        explanation: "`void` represents the return value of functions that do not return a value."
      }
    ],
    exercise: {
      instruction: "Declare a type alias `MathOperation` for a function taking two numbers `(a: number, b: number)` and returning a `number`. Then create a variable `divide: MathOperation` that implements division.",
      starter: `// 1. Declare MathOperation type alias:


// 2. Implement divide using MathOperation:

`,
      solution: `type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
};

console.log("10 / 2 =", divide(10, 2));
`,
      hint: "type MathOperation = (a: number, b: number) => number;",
      validate: (code) => {
        return /type\s+MathOperation\s*=\s*\(\s*a\s*:\s*number\s*,\s*b\s*:\s*number\s*\)\s*=>\s*number/.test(code) &&
          code.includes("divide");
      }
    }
  },
  {
    id: "b5",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "TS Foundations",
    title: "5. Objects, Type Aliases vs Interfaces",
    estimatedTime: "15 min",
    summary: "Model complex object structures, master optional and readonly properties, and discover the practical differences between `type` and `interface`.",
    content: `
      <h2>Modeling Objects</h2>
      <p>Objects are the bread and butter of JavaScript applications. TypeScript lets you define the exact shape of your objects:</p>
      <pre><code class="language-typescript">interface UserProfile {
  id: string;
  readonly email: string;     // Cannot be modified after initialization
  displayName: string;
  avatarUrl?: string;          // Optional property!
}

const user: UserProfile = {
  id: "usr_42",
  email: "dev@company.com",
  displayName: "Dev Sarah"
};

// user.email = "new@mail.com"; // ❌ Error: Cannot assign to 'email' because it is a read-only property</code></pre>

      <h2>Type vs Interface: The Showdown</h2>
      <p>Both define object shapes, but have subtle superpowers:</p>

      <div class="comparison-grid">
        <div class="comparison-box ts">
          <div class="box-badge"><code>interface</code> (Extensible Shapes)</div>
          <ul>
            <li>Ideal for object shapes and OOP classes</li>
            <li>Supports <strong>Declaration Merging</strong> (auto-merges if declared multiple times)</li>
            <li>Extended with <code>extends</code> keyword</li>
          </ul>
          <pre><code class="language-typescript">interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}</code></pre>
        </div>

        <div class="comparison-box ts">
          <div class="box-badge"><code>type</code> (Flexible Compositions)</div>
          <ul>
            <li>Can represent primitives, unions, tuples, functions, AND objects</li>
            <li>Extended using intersection (<code>&</code>)</li>
            <li>Cannot be reopened / merged</li>
          </ul>
          <pre><code class="language-typescript">type Status = "draft" | "published"; // Unions!
type Point = { x: number; y: number };
type 3DPoint = Point & { z: number };</code></pre>
        </div>
      </div>

      <div class="callout tip">
        <strong>Rule of Thumb:</strong> Use <code>interface</code> for public APIs, object shapes, and library definitions where extension or merging might be useful. Use <code>type</code> for unions, primitives, tuples, and complex type transformations.
      </div>
    `,
    starterCode: `// Define a Product interface with:
// - id: number (readonly)
// - name: string
// - price: number
// - description?: string (optional)

interface Product {
  readonly id: number;
  name: string;
  price: number;
  description?: string;
}

const laptop: Product = {
  id: 1001,
  name: "Pro Laptop 16",
  price: 2499
};

console.log("Product:", laptop.name, "Price: $" + laptop.price);
`,
    solutionCode: `interface Product {
  readonly id: number;
  name: string;
  price: number;
  description?: string;
}

const laptop: Product = {
  id: 1001,
  name: "Pro Laptop 16",
  price: 2499,
  description: "High performance workstation"
};

console.log("Product:", laptop.name, "Price: $" + laptop.price);
`,
    quiz: [
      {
        question: "What unique ability does an `interface` have that a `type` alias does not?",
        options: [
          "Interfaces can model union types like `string | number`",
          "Interfaces support Declaration Merging across multiple declarations",
          "Interfaces can be instantiated directly at runtime with `new`",
          "Interfaces are faster to transpile"
        ],
        answer: 1,
        explanation: "Declaration Merging allows multiple interface declarations with the same name in the same scope to merge their properties into a single interface."
      },
      {
        question: "How do you mark a property in an interface as optional?",
        options: [
          "By prefixing with `optional prop: string`",
          "By appending a question mark: `prop?: string`",
          "By specifying `prop: undefined | string`",
          "By wrapping it in brackets `[prop: string]`"
        ],
        answer: 1,
        explanation: "Placing a `?` right after the property name (e.g. `avatarUrl?: string`) marks it as optional."
      }
    ],
    exercise: {
      instruction: "Create an interface `Vehicle` with `make: string` and `model: string`. Then create an interface `ElectricCar` that extends `Vehicle` with an added `batteryCapacityKwh: number` property.",
      starter: `// Define Vehicle and ElectricCar here:


// Create an example Tesla car:
`,
      solution: `interface Vehicle {
  make: string;
  model: string;
}

interface ElectricCar extends Vehicle {
  batteryCapacityKwh: number;
}

const myCar: ElectricCar = {
  make: "Tesla",
  model: "Model 3",
  batteryCapacityKwh: 75
};

console.log(myCar);
`,
      hint: "Use `interface ElectricCar extends Vehicle { ... }`",
      validate: (code) => {
        return /interface\s+Vehicle\s*\{/.test(code) &&
          /interface\s+ElectricCar\s+extends\s+Vehicle\s*\{/.test(code) &&
          code.includes("batteryCapacityKwh");
      }
    }
  },
  {
    id: "b6",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "TS Foundations",
    title: "6. Union & Intersection Types (`|`, `&`)",
    estimatedTime: "12 min",
    summary: "Compose flexible types using Unions (OR) and combine multiple structures into one using Intersections (AND).",
    content: `
      <h2>Union Types: The 'OR' Operator (<code>|</code>)</h2>
      <p>A union type describes a value that can be one of several types. Think of it as: <em>\"This value can be type A OR type B\"</em>.</p>
      <pre><code class="language-typescript">type ID = string | number;

function printId(id: ID) {
  console.log("ID is:", id);
}

printId(101);       // ✅ Allowed!
printId("usr_202"); // ✅ Allowed!
// printId(true);   // ❌ Error: boolean not assignable to ID</code></pre>

      <h3>String Literal Unions (Power Pattern)</h3>
      <p>Instead of arbitrary strings, restrict values to an exact set of allowed words:</p>
      <pre><code class="language-typescript">type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

function updateOrder(status: OrderStatus) {
  // TypeScript guarantees only valid statuses can ever be passed!
}

updateOrder("shipped");
// updateOrder("in_flight"); // ❌ Type error!</code></pre>

      <h2>Intersection Types: The 'AND' Operator (<code>&</code>)</h2>
      <p>An intersection type combines multiple types into one. The resulting value must satisfy <strong>all</strong> combined types:</p>
      <pre><code class="language-typescript">type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type Post = {
  id: string;
  title: string;
  content: string;
};

// Merged database record:
type DbPost = Post & Timestamped;

const article: DbPost = {
  id: "post_1",
  title: "Mastering TypeScript",
  content: "Unions are awesome...",
  createdAt: new Date(),
  updatedAt: new Date()
};</code></pre>
    `,
    starterCode: `type NetworkSuccess = {
  status: "success";
  data: string[];
};

type NetworkError = {
  status: "error";
  errorMessage: string;
};

// Combine into a Union:
type NetworkState = NetworkSuccess | NetworkError;

function handleResponse(response: NetworkState) {
  if (response.status === "success") {
    console.log("Items loaded:", response.data.length);
  } else {
    console.error("Failed:", response.errorMessage);
  }
}

handleResponse({ status: "success", data: ["TypeScript", "Rust", "Go"] });
`,
    solutionCode: `type NetworkSuccess = {
  status: "success";
  data: string[];
};

type NetworkError = {
  status: "error";
  errorMessage: string;
};

type NetworkState = NetworkSuccess | NetworkError;

function handleResponse(response: NetworkState) {
  if (response.status === "success") {
    console.log("Items loaded:", response.data.length);
  } else {
    console.error("Failed:", response.errorMessage);
  }
}

handleResponse({ status: "success", data: ["TypeScript", "Rust", "Go"] });
handleResponse({ status: "error", errorMessage: "500 Internal Server Error" });
`,
    quiz: [
      {
        question: "If type A is `{ name: string }` and type B is `{ age: number }`, what properties does `type C = A & B` require?",
        options: [
          "Either `name` or `age`, but not both",
          "Both `name` AND `age`",
          "Neither `name` nor `age`",
          "Only `name`"
        ],
        answer: 1,
        explanation: "Intersection (`&`) requires the resulting value to satisfy all combined types, so both `name` and `age` are mandatory."
      },
      {
        question: "What is the common name for a union of objects that each share a common literal discriminator property (like `status: 'success' | 'error'`)?",
        options: [
          "Discriminated Union / Tagged Union",
          "Recursive Interface",
          "Open Tuple",
          "Polymorphic Enum"
        ],
        answer: 0,
        explanation: "Discriminated Unions (or Tagged Unions) share a common literal discriminator field, enabling TypeScript to narrow types inside if/switch statements cleanly."
      }
    ],
    exercise: {
      instruction: "Create a type `ThemeMode` that allows only `'light'`, `'dark'`, or `'system'`. Then write a function `applyTheme(mode: ThemeMode): string` that returns `'Applied theme: ' + mode`.",
      starter: `// Define ThemeMode:


// Define applyTheme:

`,
      solution: `type ThemeMode = "light" | "dark" | "system";

function applyTheme(mode: ThemeMode): string {
  return "Applied theme: " + mode;
}

console.log(applyTheme("dark"));
`,
      hint: "type ThemeMode = 'light' | 'dark' | 'system';",
      validate: (code) => {
        return /type\s+ThemeMode\s*=\s*("light"|'light')\s*\|\s*("dark"|'dark')\s*\|\s*("system"|'system')/.test(code) &&
          code.includes("applyTheme");
      }
    }
  },
  {
    id: "b7",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "TS Foundations",
    title: "7. Type Narrowing & Control Flow Analysis",
    estimatedTime: "14 min",
    summary: "Discover how TypeScript follows your conditional code flow to narrow broad types down into specific, safe types.",
    content: `
      <h2>What is Type Narrowing?</h2>
      <p>When a variable can hold multiple types (like <code>string | number</code>), you cannot call string methods directly because it might be a number. <strong>Narrowing</strong> is the process of refining a broad type to a more specific type using runtime guards.</p>

      <h3>1. <code>typeof</code> Type Guards</h3>
      <pre><code class="language-typescript">function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    // Inside this block, padding is strictly 'number'!
    return " ".repeat(padding) + input;
  }
  // Here, TypeScript knows padding MUST be 'string'!
  return padding + input;
}</code></pre>

      <h3>2. Truthiness &amp; Null Checks</h3>
      <pre><code class="language-typescript">function printAll(strings: string[] | null | undefined) {
  if (strings) {
    // strings is narrowed to string[] (null and undefined are filtered out!)
    for (const s of strings) {
      console.log(s);
    }
  }
}</code></pre>

      <h3>3. The <code>in</code> Operator (Object Property Check)</h3>
      <pre><code class="language-typescript">type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // TypeScript knows this is Fish!
  } else {
    animal.fly();  // TypeScript knows this is Bird!
  }
}</code></pre>

      <h3>4. <code>instanceof</code> Type Guards</h3>
      <pre><code class="language-typescript">function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}</code></pre>
    `,
    starterCode: `function formatInput(input: string | number | boolean): string {
  // Use typeof narrowing to return:
  // - string: trimmed input in quotes e.g. '"hello"'
  // - number: currency format e.g. '$' + input.toFixed(2)
  // - boolean: 'Active: yes' or 'Active: no'
  
  if (typeof input === "string") {
    return \`"\${input.trim()}"\`;
  }
  // Complete number and boolean checks:
  return "";
}

console.log(formatInput("   TypeScript Guide   "));
`,
    solutionCode: `function formatInput(input: string | number | boolean): string {
  if (typeof input === "string") {
    return \`"\${input.trim()}"\`;
  }
  if (typeof input === "number") {
    return "$" + input.toFixed(2);
  }
  return input ? "Active: yes" : "Active: no";
}

console.log(formatInput("   TypeScript Guide   "));
console.log(formatInput(49.9));
console.log(formatInput(true));
`,
    quiz: [
      {
        question: "Which operator is ideal for checking if a property exists on an object to narrow between two interface types?",
        options: [
          "The `typeof` operator",
          "The `in` operator",
          "The `as` operator",
          "The `keyof` operator"
        ],
        answer: 1,
        explanation: "`\"property\" in object` acts as a type guard that narrows union types based on whether the property exists."
      },
      {
        question: "What type does a variable have in an exhaustive switch default branch when all cases are handled?",
        options: ["any", "unknown", "never", "void"],
        answer: 2,
        explanation: "When all possible union members have been handled in previous cases, the remaining type is narrowed to `never`."
      }
    ],
    exercise: {
      instruction: "Write a function `getStringLength(value: string | string[]): number` that returns `value.length` for strings, or the sum of all string lengths for an array of strings.",
      starter: `function getStringLength(value: string | string[]): number {
  // Implement narrowing here:
}

console.log(getStringLength("hello")); // 5
console.log(getStringLength(["ts", "is", "awesome"])); // 11
`,
      solution: `function getStringLength(value: string | string[]): number {
  if (Array.isArray(value)) {
    return value.reduce((sum, str) => sum + str.length, 0);
  }
  return value.length;
}

console.log(getStringLength("hello"));
console.log(getStringLength(["ts", "is", "awesome"]));
`,
      hint: "Use `Array.isArray(value)` to differentiate arrays from strings.",
      validate: (code) => {
        return code.includes("Array.isArray(value)") || code.includes("typeof value === 'string'") || code.includes("typeof value === \"string\"");
      }
    }
  }
];

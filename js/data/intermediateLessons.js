export const intermediateLessons = [
  {
    id: "i1",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "8. Generics Foundations: Reusable Type Logic",
    estimatedTime: "15 min",
    summary: "Write reusable, flexible functions, interfaces, and classes that work with any type while preserving 100% type safety.",
    content: `
      <h2>The Problem: The 'Any' Trap</h2>
      <p>Suppose you want a function that returns the first element of an array. If you use <code>any</code>, you lose all type information:</p>
      <pre><code class="language-typescript">function getFirstBad(arr: any[]): any {
  return arr[0];
}
const item = getFirstBad(["apple", "banana"]); // item is 'any' - autocomplete is dead!</code></pre>

      <h2>The Solution: Type Variables (<code>&lt;T&gt;</code>)</h2>
      <p>Generics allow you to capture the caller's type like a variable:</p>
      <pre><code class="language-typescript">function getFirst&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0];
}

const num = getFirst([10, 20, 30]);      // TypeScript infers T as number -> returns number!
const str = getFirst(["alpha", "beta"]); // TypeScript infers T as string -> returns string!</code></pre>

      <h3>Generic Interfaces</h3>
      <p>Generics aren't limited to functions — you can model generic API responses, state wrappers, and queues:</p>
      <pre><code class="language-typescript">interface ApiResponse&lt;TData&gt; {
  status: 200 | 400 | 500;
  timestamp: number;
  data: TData;
}

interface User {
  id: string;
  name: string;
}

type UserResponse = ApiResponse&lt;User&gt;;
// UserResponse.data is strictly typed as User!</code></pre>
    `,
    starterCode: `// Create a generic wrapper function 'wrapInBox' that wraps any value in an object { content: T, boxedAt: Date }

function wrapInBox<T>(content: T) {
  return {
    content,
    boxedAt: new Date()
  };
}

const stringBox = wrapInBox("Quantum Laptop");
const numberBox = wrapInBox(999);

console.log("Box 1:", stringBox.content, "| At:", stringBox.boxedAt.toISOString());
`,
    solutionCode: `interface Box<T> {
  content: T;
  boxedAt: Date;
}

function wrapInBox<T>(content: T): Box<T> {
  return {
    content,
    boxedAt: new Date()
  };
}

const stringBox = wrapInBox("Quantum Laptop");
const numberBox = wrapInBox(999);

console.log("Box 1:", stringBox.content);
console.log("Box 2:", numberBox.content);
`,
    quiz: [
      {
        question: "What does `<T>` in a function declaration `function identity<T>(arg: T): T` signify?",
        options: [
          "It imports a module named T",
          "It declares a generic type parameter named T to capture the argument's type",
          "It forces the argument to be a TypeScript interface",
          "It compiles to an HTML `<template>` tag"
        ],
        answer: 1,
        explanation: "`<T>` defines a type variable that allows the function to remember and reuse the caller's passed type."
      },
      {
        question: "Can you provide default type arguments to generics?",
        options: [
          "No, generics can never have defaults",
          "Yes, using syntax like `<T = string>`",
          "Only in classes, not in functions",
          "Only when using `any`"
        ],
        answer: 1,
        explanation: "TypeScript supports default generic type arguments: `interface Response<T = Record<string, unknown>> { ... }`"
      }
    ],
    exercise: {
      instruction: "Write a generic function `reverseArray<T>(items: T[]): T[]` that returns a new reversed copy of the input array without mutating the original.",
      starter: `function reverseArray<T>(items: T[]): T[] {
  // Implement without mutating items
}

const fruits = ["apple", "banana", "cherry"];
console.log(reverseArray(fruits));
`,
      solution: `function reverseArray<T>(items: T[]): T[] {
  return [...items].reverse();
}

const fruits = ["apple", "banana", "cherry"];
console.log(reverseArray(fruits));
console.log("Original untouched:", fruits);
`,
      hint: "Use `[...items].reverse()` to create a shallow copy and reverse it.",
      validate: (code) => {
        return /function\s+reverseArray\s*<\s*T\s*>\s*\(\s*items\s*:\s*T\s*\[\s*\]\s*\)\s*:\s*T\s*\[\s*\]/.test(code) &&
          code.includes("reverse");
      }
    }
  },
  {
    id: "i2",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "9. Generic Constraints & the `keyof` Operator",
    estimatedTime: "18 min",
    summary: "Restrict what types can be passed to generics with `extends`, and safely access object properties using `keyof` and lookup types `T[K]`.",
    content: `
      <h2>Generic Constraints: <code>extends</code></h2>
      <p>Sometimes you need a generic type that is flexible, but you also need to know it has specific properties (like <code>.length</code>):</p>
      <pre><code class="language-typescript">interface HasLength {
  length: number;
}

// T must satisfy HasLength!
function logLength&lt;T extends HasLength&gt;(item: T): number {
  console.log("Length:", item.length);
  return item.length;
}

logLength("Hello World");   // ✅ Strings have length
logLength([1, 2, 3, 4]);    // ✅ Arrays have length
logLength({ length: 10 });  // ✅ Custom object has length
// logLength(123);          // ❌ Error: number does not have .length!</code></pre>

      <h2>The <code>keyof</code> Operator</h2>
      <p><code>keyof</code> produces a union of string or numeric literal keys of an object type:</p>
      <pre><code class="language-typescript">interface User {
  id: string;
  name: string;
  email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"</code></pre>

      <h2>The Ultimate Safe Property Lookup: <code>getProperty&lt;T, K&gt;</code></h2>
      <pre><code class="language-typescript">function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: "u101", username: "sarah_connor", level: 99 };

const username = getProperty(user, "username"); // Inferred as string!
const level = getProperty(user, "level");       // Inferred as number!
// getProperty(user, "password");               // ❌ Argument of type '"password"' is not assignable to '"id" | "username" | "level"'</code></pre>
    `,
    starterCode: `// Write a generic function 'pluck' that takes an array of objects and a key name,
// returning an array of values for that key:

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

const users = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" }
];

const names = pluck(users, "name");
console.log("Names:", names);
`,
    solutionCode: `function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

const users = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" }
];

const names = pluck(users, "name");
const roles = pluck(users, "role");
console.log("Names:", names);
console.log("Roles:", roles);
`,
    quiz: [
      {
        question: "If `type Person = { name: string; age: number }`, what is `keyof Person`?",
        options: [
          "`string | number`",
          "`\"name\" | \"age\"`",
          "`[name, age]`",
          "`PersonKeys`"
        ],
        answer: 1,
        explanation: "`keyof Person` generates a union of literal string keys: `\"name\" | \"age\"`."
      },
      {
        question: "What does `<T, K extends keyof T>` guarantee in a function definition?",
        options: [
          "`K` is guaranteed to be a valid property key that exists on type `T`",
          "`T` must be a subclass of `K`",
          "`K` must be an integer index",
          "`T` can only be a string or number"
        ],
        answer: 0,
        explanation: "`K extends keyof T` ensures that the argument passed for `K` is constrained to the known keys of object `T`."
      }
    ],
    exercise: {
      instruction: "Write a function `hasKey<T extends object>(obj: T, key: PropertyKey): boolean` that safely returns whether `key` is an owned property of `obj` using `Object.prototype.hasOwnProperty.call(obj, key)`.",
      starter: `function hasKey<T extends object>(obj: T, key: PropertyKey): boolean {
  // Implement here
}

const car = { brand: "Porsche", model: 911 };
console.log(hasKey(car, "brand")); // true
console.log(hasKey(car, "color")); // false
`,
      solution: `function hasKey<T extends object>(obj: T, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

const car = { brand: "Porsche", model: 911 };
console.log(hasKey(car, "brand"));
console.log(hasKey(car, "color"));
`,
      hint: "Use `Object.prototype.hasOwnProperty.call(obj, key)`.",
      validate: (code) => {
        return code.includes("hasOwnProperty.call") && code.includes("hasKey");
      }
    }
  },
  {
    id: "i3",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "10. Advanced Interfaces & Index Signatures",
    estimatedTime: "12 min",
    summary: "Handle dynamic dictionary objects with Index Signatures, use Declaration Merging, and manage property accessibility.",
    content: `
      <h2>Index Signatures: Dynamic Property Names</h2>
      <p>When you don't know all property names ahead of time, but you know their value types (e.g., an in-memory dictionary or cache):</p>
      <pre><code class="language-typescript">interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  welcome: "Welcome",
  farewell: "Goodbye",
  error: "An error occurred"
};</code></pre>

      <div class="callout warning">
        <strong>Gotcha:</strong> Accessing an index signature like <code>translations["missing"]</code> returns <code>string</code> by default, not <code>string | undefined</code>, unless <code>noUncheckedIndexedAccess: true</code> is enabled in your tsconfig!
      </div>

      <h2>Declaration Merging (Interface Magic)</h2>
      <p>If two interfaces share the exact same name, TypeScript automatically merges their declarations into one:</p>
      <pre><code class="language-typescript">interface WindowState {
  title: string;
}

// Later in your codebase or plugin:
interface WindowState {
  isOpen: boolean;
}

// Resulting WindowState has BOTH: title AND isOpen!
const windowConfig: WindowState = {
  title: "Editor",
  isOpen: true
};</code></pre>
    `,
    starterCode: `// Create a CacheStore interface with an index signature where keys are string IDs
// and values are numbers (e.g. timestamps):

interface CacheStore {
  [id: string]: number;
}

const pageCache: CacheStore = {
  "/home": 1700000000,
  "/docs": 1700001000
};

console.log("Cached /home timestamp:", pageCache["/home"]);
`,
    solutionCode: `interface CacheStore {
  [id: string]: number;
}

const pageCache: CacheStore = {
  "/home": 1700000000,
  "/docs": 1700001000
};

console.log("Cached /home timestamp:", pageCache["/home"]);
`,
    quiz: [
      {
        question: "What tsconfig setting adds `undefined` to index signature access for safer code?",
        options: [
          "`noUncheckedIndexedAccess`",
          "`strictNullChecks`",
          "`noImplicitAny`",
          "`allowSyntheticDefaultImports`"
        ],
        answer: 0,
        explanation: "`noUncheckedIndexedAccess` automatically appends `undefined` to types accessed via index signatures."
      },
      {
        question: "What happens if you define two `interface Person` declarations in the same scope?",
        options: [
          "Compiler throws 'Duplicate identifier Person'",
          "TypeScript merges their fields together",
          "The second declaration overwrites the first",
          "The first declaration is locked and immutable"
        ],
        answer: 1,
        explanation: "Interfaces support Declaration Merging in TypeScript."
      }
    ],
    exercise: {
      instruction: "Define an interface `ScoreBoard` that has a required property `season: number` and an index signature allowing any player name (`string`) to map to their score (`number`).",
      starter: `// Define ScoreBoard:


// Create a sample 2026 score board:
`,
      solution: `interface ScoreBoard {
  season: number;
  [player: string]: number;
}

const currentSeason: ScoreBoard = {
  season: 2026,
  "Alice": 1450,
  "Bob": 1320
};

console.log(currentSeason);
`,
      hint: "interface ScoreBoard { season: number; [player: string]: number; }",
      validate: (code) => {
        return /interface\s+ScoreBoard\s*\{/.test(code) &&
          code.includes("season: number") &&
          /\[\s*\w+\s*:\s*string\s*\]\s*:\s*number/.test(code);
      }
    }
  },
  {
    id: "i4",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "11. Classes & Object-Oriented TypeScript",
    estimatedTime: "15 min",
    summary: "Leverage access modifiers (`private`, `protected`, `public`), parameter properties, abstract classes, and interface implementation.",
    content: `
      <h2>Access Modifiers</h2>
      <div class="code-table">
        <div class="table-row header"><span>Modifier</span><span>Accessibility</span></div>
        <div class="table-row"><code>public</code> (default)<span>Accessible everywhere (outside and inside class)</span></div>
        <div class="table-row"><code>protected</code><span>Accessible inside the class AND subclasses</span></div>
        <div class="table-row"><code>private</code><span>Accessible ONLY inside the declaring class (compile-time)</span></div>
        <div class="table-row"><code>#private</code> (ECMAScript)<span>Hard runtime private field (cannot be accessed even via JS inspection)</span></div>
      </div>

      <h2>Parameter Properties: Clean Constructors</h2>
      <p>Instead of declaring fields and manually assigning them in constructors, use parameter property shortcuts:</p>
      <pre><code class="language-typescript">// Concise TypeScript syntax:
class BankAccount {
  constructor(
    public readonly accountNumber: string,
    private balance: number
  ) {}

  public deposit(amount: number): void {
    if (amount &gt; 0) this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("ACC-90210", 500);
account.deposit(250);
console.log(account.getBalance()); // 750
// account.balance; // ❌ Error: Property 'balance' is private</code></pre>

      <h2>Abstract Classes</h2>
      <p>Abstract classes cannot be instantiated directly; they serve as base classes that define contracts for derived subclasses:</p>
      <pre><code class="language-typescript">abstract class PaymentProcessor {
  constructor(protected apiKey: string) {}

  // Subclasses MUST implement this method
  abstract processPayment(amount: number): boolean;

  // Shared implementation
  logTransaction(txId: string) {
    console.log(\`Logging TX \${txId}\`);
  }
}</code></pre>
    `,
    starterCode: `class UserAccount {
  constructor(
    public username: string,
    private email: string,
    protected role: string = "member"
  ) {}

  public getMaskedEmail(): string {
    const [name, domain] = this.email.split("@");
    return name[0] + "***@" + domain;
  }
}

const user = new UserAccount("coder101", "dev.master@example.com");
console.log("User:", user.username, "| Masked:", user.getMaskedEmail());
`,
    solutionCode: `class UserAccount {
  constructor(
    public username: string,
    private email: string,
    protected role: string = "member"
  ) {}

  public getMaskedEmail(): string {
    const [name, domain] = this.email.split("@");
    return name[0] + "***@" + domain;
  }
}

const user = new UserAccount("coder101", "dev.master@example.com");
console.log("User:", user.username, "| Masked:", user.getMaskedEmail());
`,
    quiz: [
      {
        question: "What is the key difference between TypeScript's `private` keyword and JavaScript's `#` private fields?",
        options: [
          "`private` is enforced at runtime, while `#` is only checked at compile time",
          "`private` is compile-time only (stripped in JS), while `#` is hard private enforced by the JavaScript engine at runtime",
          "There is no difference",
          "`#` is deprecated in modern ECMAScript"
        ],
        answer: 1,
        explanation: "TypeScript's `private` keyword is purely a compile-time check. Native ECMAScript `#field` is enforced by the JavaScript engine at runtime."
      },
      {
        question: "Can an `abstract class` be instantiated with `new AbstractClass()`?",
        options: [
          "Yes, if it has default constructor parameters",
          "No, abstract classes cannot be directly instantiated",
          "Yes, in strict mode only",
          "Only if all abstract methods are implemented via prototype"
        ],
        answer: 1,
        explanation: "Abstract classes cannot be directly instantiated using `new`; they must be extended by concrete subclasses."
      }
    ],
    exercise: {
      instruction: "Write a class `Counter` with a private property `count: number = 0`, a method `increment(): void`, a method `decrement(): void`, and a getter `currentCount: number` that returns `this.count`.",
      starter: `class Counter {
  // Implement here
}

const c = new Counter();
c.increment();
c.increment();
console.log(c.currentCount); // 2
`,
      solution: `class Counter {
  private count: number = 0;

  public increment(): void {
    this.count++;
  }

  public decrement(): void {
    this.count--;
  }

  public get currentCount(): number {
    return this.count;
  }
}

const c = new Counter();
c.increment();
c.increment();
console.log(c.currentCount);
`,
      hint: "Use `private count: number = 0;` and getter `get currentCount(): number { return this.count; }`",
      validate: (code) => {
        return code.includes("private count") && code.includes("increment") && code.includes("get currentCount");
      }
    }
  },
  {
    id: "i5",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "12. Custom Type Guards (`is`) & Exhaustive Checks",
    estimatedTime: "15 min",
    summary: "Write custom user-defined type guard predicates (`value is Type`) and enforce exhaustive compiler checks with `never`.",
    content: `
      <h2>User-Defined Type Predicates: <code>value is Type</code></h2>
      <p>Sometimes built-in guards (like <code>typeof</code> or <code>instanceof</code>) aren't enough. You can define your own type guard functions returning <code>arg is SpecificType</code>:</p>
      <pre><code class="language-typescript">interface AdminUser {
  id: string;
  role: "admin";
  permissions: string[];
}

interface StandardUser {
  id: string;
  role: "standard";
}

type AppUser = AdminUser | StandardUser;

// Custom Type Guard:
function isAdmin(user: AppUser): user is AdminUser {
  return user.role === "admin" &amp;&amp; Array.isArray((user as AdminUser).permissions);
}

function processUser(user: AppUser) {
  if (isAdmin(user)) {
    // Inside here, TypeScript knows user is DEFINITELY AdminUser!
    console.log("Admin permissions:", user.permissions.join(", "));
  } else {
    // TypeScript knows user is StandardUser!
    console.log("Standard user ID:", user.id);
  }
}</code></pre>

      <h2>Exhaustive Checking with <code>never</code></h2>
      <p>Ensure that whenever you add a new member to a union, the TypeScript compiler refuses to build until you handle that new case everywhere:</p>
      <pre><code class="language-typescript">type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      // Exhaustiveness check!
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}</code></pre>
    `,
    starterCode: `type Notification = 
  | { type: "email"; emailAddress: string; message: string }
  | { type: "sms"; phoneNumber: string; message: string }
  | { type: "push"; deviceToken: string; message: string };

function dispatchNotification(n: Notification): string {
  switch (n.type) {
    case "email":
      return "Sent email to " + n.emailAddress;
    case "sms":
      return "Sent SMS to " + n.phoneNumber;
    case "push":
      return "Sent push to " + n.deviceToken;
    default:
      const _exhaustive: never = n;
      throw new Error("Unhandled notification type: " + JSON.stringify(_exhaustive));
  }
}

console.log(dispatchNotification({ type: "email", emailAddress: "dev@test.io", message: "Hi!" }));
`,
    solutionCode: `type Notification = 
  | { type: "email"; emailAddress: string; message: string }
  | { type: "sms"; phoneNumber: string; message: string }
  | { type: "push"; deviceToken: string; message: string };

function dispatchNotification(n: Notification): string {
  switch (n.type) {
    case "email":
      return "Sent email to " + n.emailAddress;
    case "sms":
      return "Sent SMS to " + n.phoneNumber;
    case "push":
      return "Sent push to " + n.deviceToken;
    default:
      const _exhaustive: never = n;
      throw new Error("Unhandled notification type: " + JSON.stringify(_exhaustive));
  }
}

console.log(dispatchNotification({ type: "email", emailAddress: "dev@test.io", message: "Hi!" }));
`,
    quiz: [
      {
        question: "What does the return signature `val is string` communicate to the TypeScript compiler?",
        options: [
          "It forces `val` to be coerced to a string at runtime",
          "If the function returns `true`, TypeScript narrows the argument `val` to `string` in calling scopes",
          "It throws a TypeError if `val` is not a string",
          "It registers a new string prototype method"
        ],
        answer: 1,
        explanation: "A type predicate `arg is Type` informs the compiler that when the function returns `true`, the argument is of that specific type."
      },
      {
        question: "Why assign the variable to type `never` in a switch default block: `const _check: never = value`?",
        options: [
          "To cause a compile error if a developer adds a new union case and forgets to handle it",
          "To free memory in garbage collection",
          "To convert null to undefined",
          "To prevent infinite recursion"
        ],
        answer: 0,
        explanation: "If you add a new member to the union, `value` will not be narrowed to `never` in default, resulting in a compile-time type mismatch error!"
      }
    ],
    exercise: {
      instruction: "Write a type guard `isNonNullObject(val: unknown): val is Record<string, unknown>` that returns true only if `val` is typeof 'object', not null, and not an array.",
      starter: `function isNonNullObject(val: unknown): val is Record<string, unknown> {
  // Implement here
}

console.log(isNonNullObject({ a: 1 })); // true
console.log(isNonNullObject(null));     // false
console.log(isNonNullObject([1, 2]));   // false
`,
      solution: `function isNonNullObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

console.log(isNonNullObject({ a: 1 }));
console.log(isNonNullObject(null));
console.log(isNonNullObject([1, 2]));
`,
      hint: "Check: typeof val === 'object' && val !== null && !Array.isArray(val)",
      validate: (code) => {
        return code.includes("typeof val === \"object\"") || code.includes("typeof val === 'object'");
      }
    }
  },
  {
    id: "i6",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "13. Built-in Utility Types Deep Dive",
    estimatedTime: "20 min",
    summary: "Transform, slice, and remodel existing types effortlessly using `Partial`, `Pick`, `Omit`, `Record`, `Readonly`, and `ReturnType`.",
    content: `
      <h2>The Standard Utility Library</h2>
      <p>TypeScript ships with powerful built-in type transformers. You rarely need to write type definitions from scratch when you can derive them!</p>

      <div class="code-table">
        <div class="table-row header"><span>Utility</span><span>Transforms</span><span>Example</span></div>
        <div class="table-row"><code>Partial&lt;T&gt;</code><span>Makes all properties optional (<code>?</code>)</span><span><code>Partial&lt;User&gt;</code></span></div>
        <div class="table-row"><code>Required&lt;T&gt;</code><span>Makes all properties required (removes <code>?</code>)</span><span><code>Required&lt;Config&gt;</code></span></div>
        <div class="table-row"><code>Readonly&lt;T&gt;</code><span>Makes all properties readonly</span><span><code>Readonly&lt;Settings&gt;</code></span></div>
        <div class="table-row"><code>Record&lt;K, V&gt;</code><span>Constructs an object with keys K and values V</span><span><code>Record&lt;string, number&gt;</code></span></div>
        <div class="table-row"><code>Pick&lt;T, K&gt;</code><span>Picks a subset of keys K from T</span><span><code>Pick&lt;User, "id" | "email"&gt;</code></span></div>
        <div class="table-row"><code>Omit&lt;T, K&gt;</code><span>Removes keys K from T</span><span><code>Omit&lt;User, "password"&gt;</code></span></div>
        <div class="table-row"><code>Exclude&lt;T, U&gt;</code><span>Excludes types in U from union T</span><span><code>Exclude&lt;Status, "deleted"&gt;</code></span></div>
        <div class="table-row"><code>Extract&lt;T, U&gt;</code><span>Extracts types present in both T and U</span><span><code>Extract&lt;T, Function&gt;</code></span></div>
        <div class="table-row"><code>NonNullable&lt;T&gt;</code><span>Strips <code>null</code> and <code>undefined</code></span><span><code>NonNullable&lt;string | null&gt;</code></span></div>
        <div class="table-row"><code>ReturnType&lt;T&gt;</code><span>Extracts the return type of a function</span><span><code>ReturnType&lt;typeof fetch&gt;</code></span></div>
      </div>

      <h3>Real-World Example: Update Profile Function</h3>
      <pre><code class="language-typescript">interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
}

// When updating a user, ID & createdAt are immutable, other fields optional:
type UserUpdatePayload = Partial&lt;Omit&lt;User, "id" | "createdAt"&gt;&gt;;

function updateUser(id: string, update: UserUpdatePayload) {
  // update can have name?, email?, avatarUrl? - safe and clean!
}</code></pre>
    `,
    starterCode: `interface Article {
  id: string;
  title: string;
  content: string;
  views: number;
  authorId: string;
}

// 1. Create ArticlePreview (only id, title, views) using Pick:
type ArticlePreview = Pick<Article, "id" | "title" | "views">;

// 2. Create ArticleDraft (everything except id and views) using Omit:
type ArticleDraft = Omit<Article, "id" | "views">;

const draft: ArticleDraft = {
  title: "TypeScript 5.0 Magic",
  content: "Utility types save thousands of lines...",
  authorId: "usr_42"
};

console.log("Draft created:", draft.title);
`,
    solutionCode: `interface Article {
  id: string;
  title: string;
  content: string;
  views: number;
  authorId: string;
}

type ArticlePreview = Pick<Article, "id" | "title" | "views">;
type ArticleDraft = Omit<Article, "id" | "views">;

const draft: ArticleDraft = {
  title: "TypeScript 5.0 Magic",
  content: "Utility types save thousands of lines...",
  authorId: "usr_42"
};

console.log("Draft created:", draft.title);
`,
    quiz: [
      {
        question: "What is the difference between `Pick<T, K>` and `Omit<T, K>`?",
        options: [
          "`Pick` selects specific properties to keep; `Omit` removes specific properties",
          "`Pick` works on functions; `Omit` works on classes",
          "`Pick` is runtime; `Omit` is compile time",
          "There is no difference"
        ],
        answer: 0,
        explanation: "`Pick<T, K>` keeps only keys `K`, whereas `Omit<T, K>` drops keys `K` and retains everything else."
      },
      {
        question: "How do you extract the return type of a function variable `const getUser = () => ({ id: 1 })`?",
        options: [
          "`ReturnType<getUser>`",
          "`ReturnType<typeof getUser>`",
          "`TypeOf<getUser.return>`",
          "`UserReturn(getUser)`"
        ],
        answer: 1,
        explanation: "Because `getUser` is a value, you must use `typeof getUser` to convert it to a type before passing it to `ReturnType<T>`."
      }
    ],
    exercise: {
      instruction: "Given `interface Todo { id: number; title: string; completed: boolean; createdAt: string }`, define a type `TodoCreateInput` that omits `id` and `createdAt`, but makes `completed` optional using utility types.",
      starter: `interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Define TodoCreateInput here:

`,
      solution: `interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

type TodoCreateInput = Omit<Todo, "id" | "createdAt" | "completed"> & {
  completed?: boolean;
};

const newTodo: TodoCreateInput = {
  title: "Learn TypeScript Utility Types"
};

console.log(newTodo);
`,
      hint: "Use Omit<Todo, 'id' | 'createdAt' | 'completed'> & { completed?: boolean }",
      validate: (code) => {
        return code.includes("TodoCreateInput") && code.includes("Omit");
      }
    }
  },
  {
    id: "i7",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "14. DOM & Browser Web API Typing",
    estimatedTime: "12 min",
    summary: "Interact safely with DOM elements, event listeners, canvas, and form inputs using accurate HTML element interfaces and type casting.",
    content: `
      <h2>The DOM Element Hierarchy</h2>
      <p>TypeScript includes built-in types for every standard browser DOM API:</p>
      <div class="diagram-card">
        <code>EventTarget</code> ➔ <code>Node</code> ➔ <code>Element</code> ➔ <code>HTMLElement</code> ➔ <code>HTMLInputElement</code> / <code>HTMLButtonElement</code>
      </div>

      <h3>Element Selection and Nullability</h3>
      <p><code>document.querySelector</code> returns <code>Element | null</code>. TypeScript forces you to check for null!</p>
      <pre><code class="language-typescript">const inputEl = document.querySelector&lt;HTMLInputElement&gt;("#user-email");

if (inputEl) {
  // inputEl is narrowed to HTMLInputElement - .value is available!
  console.log(inputEl.value);
}</code></pre>

      <h3>Typing Event Handlers</h3>
      <p>Always specify the event type for precise properties:</p>
      <pre><code class="language-typescript">const button = document.querySelector&lt;HTMLButtonElement&gt;("#submit-btn");

button?.addEventListener("click", (event: MouseEvent) => {
  console.log("Clicked at coordinates:", event.clientX, event.clientY);
});

const form = document.querySelector&lt;HTMLFormElement&gt;("#signup-form");
form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
});</code></pre>
    `,
    starterCode: `// Type an event handler function that processes a change event on an input element:
function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    console.log("New input value:", target.value);
  }
}

console.log("DOM handler defined successfully!");
`,
    solutionCode: `function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    console.log("New input value:", target.value);
  }
}

console.log("DOM handler defined successfully!");
`,
    quiz: [
      {
        question: "What is the return type of `document.getElementById('app')`?",
        options: [
          "`HTMLElement`",
          "`HTMLElement | null`",
          "`HTMLDivElement`",
          "`Element`"
        ],
        answer: 1,
        explanation: "`getElementById` returns `HTMLElement | null` because the element might not exist in the DOM."
      },
      {
        question: "How do you specify the element type when using `document.querySelector`?",
        options: [
          "`document.querySelector<HTMLInputElement>('input')`",
          "`document.querySelector('input')::HTMLInputElement`",
          "`document.querySelector(HTMLInputElement, 'input')`",
          "`<HTMLInputElement>document.querySelector('input')`"
        ],
        answer: 0,
        explanation: "`document.querySelector` accepts a generic type argument: `document.querySelector<HTMLInputElement>('#my-input')`."
      }
    ],
    exercise: {
      instruction: "Write a function `getInputValue(selector: string): string | null` that finds an `HTMLInputElement` matching `selector` and returns its `.value` if found, or `null` if not found.",
      starter: `function getInputValue(selector: string): string | null {
  // Implement here
}
`,
      solution: `function getInputValue(selector: string): string | null {
  const el = document.querySelector<HTMLInputElement>(selector);
  return el ? el.value : null;
}
`,
      hint: "Use `document.querySelector<HTMLInputElement>(selector)`",
      validate: (code) => {
        return code.includes("querySelector<HTMLInputElement>") || code.includes("as HTMLInputElement");
      }
    }
  },
  {
    id: "i8",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Type Crafting",
    title: "15. tsconfig.json Mastery & Strict Flags",
    estimatedTime: "12 min",
    summary: "Configure enterprise-ready `tsconfig.json` settings, understand strict compiler flags, and eliminate common build performance issues.",
    content: `
      <h2>The Heart of TypeScript: tsconfig.json</h2>
      <p>The configuration file controls how the TypeScript compiler behaves. Enabling <code>strict: true</code> is essential for professional codebases.</p>

      <h3>The Most Critical Strict Flags</h3>
      <div class="code-table">
        <div class="table-row header"><span>Flag</span><span>What It Enforces</span></div>
        <div class="table-row"><code>strictNullChecks</code><span>Variables cannot be <code>null</code> or <code>undefined</code> unless explicitly marked as a union.</span></div>
        <div class="table-row"><code>noImplicitAny</code><span>Throws errors whenever TypeScript cannot infer a type and defaults to <code>any</code>.</span></div>
        <div class="table-row"><code>noImplicitReturns</code><span>Ensures every code branch in a function with a return type returns a value.</span></div>
        <div class="table-row"><code>exactOptionalPropertyTypes</code><span>Distinguishes between a property being omitted vs explicitly assigned <code>undefined</code>.</span></div>
        <div class="table-row"><code>noUncheckedIndexedAccess</code><span>Adds <code>undefined</code> to any index signature lookup to prevent runtime out-of-bounds crashes.</span></div>
      </div>

      <h3>Recommended Modern Production Config (TS 5.x)</h3>
      <pre><code class="language-json">{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}</code></pre>
    `,
    starterCode: `// Example demonstrating 'strictNullChecks':
// With strictNullChecks enabled, this would trigger an error if unhandled:

function getGreeting(name: string | null): string {
  // If you did: return "Hello, " + name.toUpperCase(); -> ERROR! Object is possibly 'null'.
  
  if (name === null) {
    return "Hello, Guest!";
  }
  return "Hello, " + name.toUpperCase() + "!";
}

console.log(getGreeting(null));
console.log(getGreeting("Ada Lovelace"));
`,
    solutionCode: `function getGreeting(name: string | null): string {
  if (name === null) {
    return "Hello, Guest!";
  }
  return "Hello, " + name.toUpperCase() + "!";
}

console.log(getGreeting(null));
console.log(getGreeting("Ada Lovelace"));
`,
    quiz: [
      {
        question: "What does the `strict: true` flag in tsconfig.json do?",
        options: [
          "It enables all strict type checking family options simultaneously",
          "It forces all variables to be marked readonly",
          "It compiles code in JavaScript 'use strict' mode only",
          "It prevents using any external npm packages"
        ],
        answer: 0,
        explanation: "`strict: true` turns on all strict type-checking flags, including `strictNullChecks`, `noImplicitAny`, and more."
      },
      {
        question: "Why is `skipLibCheck: true` standard practice in modern tsconfig files?",
        options: [
          "It dramatically speeds up compilation by skipping type check of all .d.ts files in node_modules",
          "It deletes unused npm packages",
          "It converts all packages to ESM",
          "It skips unit tests"
        ],
        answer: 0,
        explanation: "`skipLibCheck: true` skips type checking of all external declaration files (`.d.ts`), providing massive compile-time performance gains."
      }
    ],
    exercise: {
      instruction: "Write a function `safeHead<T>(arr: T[]): T | undefined` that safely returns the first item of an array, properly handling empty arrays for `noUncheckedIndexedAccess` safety.",
      starter: `function safeHead<T>(arr: T[]): T | undefined {
  // Implement here
}

console.log(safeHead([10, 20, 30])); // 10
console.log(safeHead([]));           // undefined
`,
      solution: `function safeHead<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

console.log(safeHead([10, 20, 30]));
console.log(safeHead([]));
`,
      hint: "Check `arr.length > 0 ? arr[0] : undefined`",
      validate: (code) => {
        return code.includes("safeHead") && (code.includes("undefined") || code.includes("arr[0]"));
      }
    }
  }
];

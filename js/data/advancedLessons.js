export const advancedLessons = [
  {
    id: "a1",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Type Wizardry",
    title: "16. Conditional Types & Distributive Unions",
    estimatedTime: "18 min",
    summary: "Write if/else type logic directly at compile time using `T extends U ? X : Y` and master distributive conditional evaluation.",
    content: `
      <h2>The Ternary Operator of Types</h2>
      <p>Just like JavaScript has <code>condition ? a : b</code>, TypeScript has <strong>Conditional Types</strong>:</p>
      <pre><code class="language-typescript">type IsString&lt;T&gt; = T extends string ? true : false;

type A = IsString&lt;"hello"&gt;; // true
type B = IsString&lt;42&gt;;      // false</code></pre>

      <h2>Distributive Conditional Types</h2>
      <p>When a conditional type acts on a naked generic type parameter that receives a <strong>union</strong>, it distributes across each member of the union automatically!</p>
      <pre><code class="language-typescript">type ToArray&lt;T&gt; = T extends any ? T[] : never;

// Distributes: ToArray&lt;string&gt; | ToArray&lt;number&gt;
type StrOrNumArray = ToArray&lt;string | number&gt;; 
// Result: string[] | number[] (NOT (string | number)[])!</code></pre>

      <h3>How Built-in <code>Exclude</code> is Written Under the Hood</h3>
      <pre><code class="language-typescript">type MyExclude&lt;T, U&gt; = T extends U ? never : T;

type AvailableColors = "red" | "green" | "blue";
type Filtered = MyExclude&lt;AvailableColors, "green"&gt;; // "red" | "blue"!</code></pre>
    `,
    starterCode: `// Implement a conditional type 'NonEmptyString<T>' that returns T if T is a string, or never otherwise:
type NonEmptyString<T> = T extends string ? T : never;

type T1 = NonEmptyString<"hello">; // "hello"
type T2 = NonEmptyString<number>;  // never

// Test function:
function requireString<T>(val: NonEmptyString<T>): string {
  return "Valid string: " + val;
}

console.log(requireString("TypeScript Wizard"));
`,
    solutionCode: `type NonEmptyString<T> = T extends string ? T : never;

type T1 = NonEmptyString<"hello">;
type T2 = NonEmptyString<number>;

function requireString<T>(val: NonEmptyString<T>): string {
  return "Valid string: " + val;
}

console.log(requireString("TypeScript Wizard"));
`,
    quiz: [
      {
        question: "Given `type Check<T> = T extends string ? 'yes' : 'no'`, what does `Check<'hello' | 123>` resolve to?",
        options: [
          "`'yes'`",
          "`'no'`",
          "`'yes' | 'no'`",
          "`never`"
        ],
        answer: 2,
        explanation: "Because naked generic `T` distributes over the union `'hello' | 123`, it evaluates `Check<'hello'> | Check<123>`, giving `'yes' | 'no'`."
      },
      {
        question: "How do you prevent a conditional type from distributing over unions?",
        options: [
          "Wrap the type parameter in square brackets: `[T] extends [U] ? ...`",
          "Add the `static` keyword",
          "Pass `any` as the second type",
          "Use an interface instead"
        ],
        answer: 0,
        explanation: "Wrapping the type parameter in tuples `[T] extends [U]` suppresses distributive union behavior."
      }
    ],
    exercise: {
      instruction: "Write a conditional utility type `IsArray<T>` that returns `true` if `T` extends an array of any kind, and `false` otherwise.",
      starter: `// Define IsArray<T>:


type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>;   // false
`,
      solution: `type IsArray<T> = T extends readonly unknown[] ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>;   // false

console.log("IsArray defined successfully!");
`,
      hint: "type IsArray<T> = T extends readonly unknown[] ? true : false;",
      validate: (code) => {
        return /type\s+IsArray\s*<\s*T\s*>\s*=\s*T\s+extends\s+(any|unknown|readonly\s+any|readonly\s+unknown)\[\s*\]\s*\?\s*true\s*:\s*false/.test(code);
      }
    }
  },
  {
    id: "a2",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Type Wizardry",
    title: "17. The `infer` Keyword: Pattern Matching in Types",
    estimatedTime: "20 min",
    summary: "Extract internal types from promises, functions, tuples, and complex generics using TypeScript's pattern matching variable: `infer`.",
    content: `
      <h2>What is <code>infer</code>?</h2>
      <p>Inside the <code>extends</code> clause of a conditional type, the <code>infer</code> keyword lets you declare a type variable that TypeScript automatically infers by pattern matching against the target type.</p>

      <h3>1. Unwrapping a Promise (How <code>Awaited&lt;T&gt;</code> Works)</h3>
      <pre><code class="language-typescript">type UnwrapPromise&lt;T&gt; = T extends Promise&lt;infer R&gt; ? R : T;

type Result = UnwrapPromise&lt;Promise&lt;string&gt;&gt;; // string!
type Plain = UnwrapPromise&lt;number&gt;;          // number!</code></pre>

      <h3>2. Extracting Function Return Types</h3>
      <pre><code class="language-typescript">type MyReturnType&lt;T&gt; = T extends (...args: any[]) =&gt; infer R ? R : never;

function createProfile() {
  return { id: 101, name: "Ada Lovelace", role: "Mathematician" };
}

type Profile = MyReturnType&lt;typeof createProfile&gt;;
// { id: number; name: string; role: string }</code></pre>

      <h3>3. Extracting Array Element Types</h3>
      <pre><code class="language-typescript">type ElementOf&lt;T&gt; = T extends (infer E)[] ? E : never;

type StringItem = ElementOf&lt;string[]&gt;; // string!</code></pre>
    `,
    starterCode: `// Implement 'FirstElement<T>' using infer to extract the first element of a tuple:
type FirstElement<T> = T extends [infer Head, ...any[]] ? Head : never;

type T1 = FirstElement<[string, number, boolean]>; // string
type T2 = FirstElement<[Date, number]>;             // Date

console.log("Infer pattern matching ready!");
`,
    solutionCode: `type FirstElement<T> = T extends [infer Head, ...any[]] ? Head : never;

type T1 = FirstElement<[string, number, boolean]>;
type T2 = FirstElement<[Date, number]>;

console.log("First element inferred successfully!");
`,
    quiz: [
      {
        question: "Where is the `infer` keyword allowed to be used in TypeScript?",
        options: [
          "Anywhere inside an interface body",
          "Only in the `extends` clause of a conditional type",
          "Inside function signatures as an argument modifier",
          "In class constructors only"
        ],
        answer: 1,
        explanation: "`infer` is exclusively permitted inside the conditional check of a type ternary: `T extends SomePattern<infer R> ? R : fallback`."
      },
      {
        question: "What does `type UnpackArray<T> = T extends Array<infer U> ? U : T` return for `UnpackArray<number[]>`?",
        options: ["`number[]`", "`number`", "`Array<number>`", "`unknown`"],
        answer: 1,
        explanation: "TypeScript pattern-matches `Array<infer U>` against `Array<number>`, binding `U` to `number`."
      }
    ],
    exercise: {
      instruction: "Write a utility type `GetFirstArg<T>` that extracts the type of the first argument of any function using `infer`. If `T` is not a function or has no arguments, return `never`.",
      starter: `// Write GetFirstArg<T>:


type Func = (id: string, count: number) => void;
type Arg1 = GetFirstArg<Func>; // string
`,
      solution: `type GetFirstArg<T> = T extends (first: infer A, ...rest: any[]) => any ? A : never;

type Func = (id: string, count: number) => void;
type Arg1 = GetFirstArg<Func>; // string

console.log("Extracted first arg successfully!");
`,
      hint: "type GetFirstArg<T> = T extends (first: infer A, ...rest: any[]) => any ? A : never;",
      validate: (code) => {
        return /type\s+GetFirstArg\s*<\s*T\s*>\s*=\s*T\s+extends\s*\(\s*\w+\s*:\s*infer\s+[A-Za-z]/.test(code);
      }
    }
  },
  {
    id: "a3",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Type Wizardry",
    title: "18. Template Literal Types: Type-Level Strings",
    estimatedTime: "16 min",
    summary: "Manipulate strings at the type level to enforce design token formats, build event-driven architectures, and validate route parameters.",
    content: `
      <h2>String Concatenation in Types</h2>
      <p>Introduced in TypeScript 4.1, <strong>Template Literal Types</strong> allow you to interpolate literal types into string definitions:</p>
      <pre><code class="language-typescript">type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";

// Generates ALL 4 combinations:
type Alignment = \`\${Vertical}-\${Horizontal}\`;
// "top-left" | "top-right" | "bottom-left" | "bottom-right"</code></pre>

      <h3>Intrinsic String Manipulation Types</h3>
      <p>TypeScript provides four built-in compiler intrinsics for string casing:</p>
      <ul>
        <li><code>Uppercase&lt;StringType&gt;</code>: e.g. <code>"hello"</code> ➔ <code>"HELLO"</code></li>
        <li><code>Lowercase&lt;StringType&gt;</code>: e.g. <code>"HELLO"</code> ➔ <code>"hello"</code></li>
        <li><code>Capitalize&lt;StringType&gt;</code>: e.g. <code>"user"</code> ➔ <code>"User"</code></li>
        <li><code>Uncapitalize&lt;StringType&gt;</code>: e.g. <code>"User"</code> ➔ <code>"user"</code></li>
      </ul>

      <h3>Real-World Power: Generating Event Emitter Names</h3>
      <pre><code class="language-typescript">type Entity = "user" | "order" | "invoice";
type Action = "create" | "update" | "delete";

// Event names: "onUserCreate" | "onUserUpdate" | ...
type EventName = \`on\${Capitalize&lt;Entity&gt;}\${Capitalize&lt;Action&gt;}\`;

function addListener(event: EventName, callback: () => void) {
  console.log("Listening to", event);
}

addListener("onUserCreate", () => {}); // ✅ Autocompleted & checked!
// addListener("onUserMade", () => {}); // ❌ Error!</code></pre>
    `,
    starterCode: `// Create a typed CSS unit validator that only accepts string values ending in 'px' or 'rem':
type CssSize = \`\${number}px\` | \`\${number}rem\`;

function setPadding(size: CssSize) {
  console.log("Padding set to:", size);
}

setPadding("16px");
setPadding("2rem");
// setPadding("100%"); // Uncomment to see the type error!
`,
    solutionCode: `type CssSize = \`\${number}px\` | \`\${number}rem\`;

function setPadding(size: CssSize) {
  console.log("Padding set to:", size);
}

setPadding("16px");
setPadding("2rem");
console.log("CSS size validated!");
`,
    quiz: [
      {
        question: "How many union members does `type Grid = `${1 | 2}x${1 | 2}`;` create?",
        options: ["2", "3", "4", "8"],
        answer: 2,
        explanation: "Template literal types create a Cartesian product of all union members: `'1x1' | '1x2' | '2x1' | '2x2'` (4 members)."
      },
      {
        question: "Which intrinsic type converts `'getUser'` to `'GetUser'`?",
        options: [
          "`Uppercase<'getUser'>`",
          "`Capitalize<'getUser'>`",
          "`TitleCase<'getUser'>`",
          "`PascalCase<'getUser'>`"
        ],
        answer: 1,
        explanation: "`Capitalize<StringType>` converts only the first character of the string to uppercase."
      }
    ],
    exercise: {
      instruction: "Define a type `GetterMethod<T extends string>` that takes a property name (e.g. `'name'`) and transforms it into `'getName'` using `Capitalize`.",
      starter: `// Define GetterMethod<T>:


type NameGetter = GetterMethod<"name">; // "getName"
type AgeGetter = GetterMethod<"age">;   // "getAge"
`,
      solution: `type GetterMethod<T extends string> = \`get\${Capitalize<T>}\`;

type NameGetter = GetterMethod<"name">; // "getName"
type AgeGetter = GetterMethod<"age">;   // "getAge"

console.log("GetterMethod defined successfully!");
`,
      hint: "type GetterMethod<T extends string> = `get${Capitalize<T>}`;",
      validate: (code) => {
        return /type\s+GetterMethod\s*<\s*T\s+extends\s+string\s*>\s*=\s*`get\$\{\s*Capitalize\s*<\s*T\s*>\s*\}`/.test(code);
      }
    }
  },
  {
    id: "a4",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Type Wizardry",
    title: "19. Mapped Types & Key Remapping (`as`)",
    estimatedTime: "20 min",
    summary: "Iterate over object keys, apply modifiers (`+readonly`, `-?`), and transform property names dynamically using key remapping with `as`.",
    content: `
      <h2>What is a Mapped Type?</h2>
      <p>A mapped type acts like a <code>.map()</code> array function, but iterates over keys in an object type at compile time:</p>
      <pre><code class="language-typescript">type StringifyProps&lt;T&gt; = {
  [K in keyof T]: string;
};

interface User {
  id: number;
  isActive: boolean;
}

type StringUser = StringifyProps&lt;User&gt;;
// { id: string; isActive: string; }</code></pre>

      <h3>Adding and Removing Modifiers (<code>+</code>, <code>-</code>)</h3>
      <p>You can selectively remove <code>readonly</code> or make optional properties required:</p>
      <pre><code class="language-typescript">// Remove 'readonly' from all fields:
type Mutable&lt;T&gt; = {
  -readonly [K in keyof T]: T[K];
};

// Remove 'optional' (?) from all fields (creates Required<T>):
type Concrete&lt;T&gt; = {
  [K in keyof T]-?: T[K];
};</code></pre>

      <h2>Key Remapping with <code>as</code></h2>
      <p>Use the <code>as</code> clause to rename keys or filter keys out completely by returning <code>never</code>:</p>
      <pre><code class="language-typescript">// Rename every property 'foo' to 'getFoo':
type Getters&lt;T&gt; = {
  [K in keyof T as \`get\${Capitalize&lt;string &amp; K&gt;}\`]: () =&gt; T[K];
};

interface State {
  count: number;
  isOpen: boolean;
}

type StateGetters = Getters&lt;State&gt;;
// { getCount: () =&gt; number; getIsOpen: () =&gt; boolean; }</code></pre>
    `,
    starterCode: `interface Profile {
  id: string;
  name: string;
  age: number;
}

// Write a mapped type that prefixes all keys with 'user_':
type PrefixedProfile<T> = {
  [K in keyof T as \`user_\${string & K}\`]: T[K];
};

type Result = PrefixedProfile<Profile>;
// Result has: user_id, user_name, user_age

const p: Result = {
  user_id: "u123",
  user_name: "John",
  user_age: 30
};

console.log("Prefixed profile created:", p.user_name);
`,
    solutionCode: `interface Profile {
  id: string;
  name: string;
  age: number;
}

type PrefixedProfile<T> = {
  [K in keyof T as \`user_\${string & K}\`]: T[K];
};

type Result = PrefixedProfile<Profile>;

const p: Result = {
  user_id: "u123",
  user_name: "John",
  user_age: 30
};

console.log("Prefixed profile created:", p.user_name);
`,
    quiz: [
      {
        question: "How do you filter OUT a key during key remapping in a mapped type?",
        options: [
          "Remap it to `never` using `as (K extends 'bad' ? never : K)`",
          "Use the `delete` keyword",
          "Set the value type to `void`",
          "Pass `false` in square brackets"
        ],
        answer: 0,
        explanation: "In key remapping (`[K in keyof T as NewKey]`), if `NewKey` resolves to `never`, that property is stripped from the resulting type."
      },
      {
        question: "What does the `-?` syntax in `[K in keyof T]-?: T[K]` accomplish?",
        options: [
          "It marks all properties as optional",
          "It removes the optional modifier, making every property strictly required",
          "It throws an error if a property is undefined",
          "It checks for negative numbers"
        ],
        answer: 1,
        explanation: "The `-?` modifier removes optionality, transforming optional fields into required fields (this is how the built-in `Required<T>` works)."
      }
    ],
    exercise: {
      instruction: "Create a mapped type `NullableProps<T>` that transforms every property value of `T` into `T[K] | null`.",
      starter: `// Define NullableProps<T>:


interface Settings {
  darkMode: boolean;
  fontSize: number;
}

type NullableSettings = NullableProps<Settings>;
`,
      solution: `type NullableProps<T> = {
  [K in keyof T]: T[K] | null;
};

interface Settings {
  darkMode: boolean;
  fontSize: number;
}

type NullableSettings = NullableProps<Settings>;
console.log("NullableProps ready!");
`,
      hint: "type NullableProps<T> = { [K in keyof T]: T[K] | null; };",
      validate: (code) => {
        return /type\s+NullableProps\s*<\s*T\s*>\s*=\s*\{\s*\[\s*K\s+in\s+keyof\s+T\s*\]\s*:\s*T\s*\[\s*K\s*\]\s*\|\s*null\s*;?\s*\}/.test(code);
      }
    }
  },
  {
    id: "a5",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Type Wizardry",
    title: "20. Recursive Types & Deep Utilities",
    estimatedTime: "22 min",
    summary: "Model infinite tree structures, nested JSON schemas, and construct deeply nested immutable types like `DeepReadonly<T>`.",
    content: `
      <h2>Recursive Types</h2>
      <p>A recursive type references itself in its own definition. This is necessary for trees, file directories, ASTs, and JSON payloads:</p>
      <pre><code class="language-typescript">interface FileNode {
  name: string;
  size: number;
  children?: FileNode[]; // Recursive reference!
}

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };</code></pre>

      <h2>The Holy Grail: <code>DeepReadonly&lt;T&gt;</code></h2>
      <p>Standard <code>Readonly&lt;T&gt;</code> is shallow — nested objects can still be mutated! A recursive mapped type freezes everything at every depth:</p>
      <pre><code class="language-typescript">type DeepReadonly&lt;T&gt; = T extends Function | boolean | number | string | null | undefined
  ? T
  : T extends Array&lt;infer U&gt;
  ? ReadonlyArray&lt;DeepReadonly&lt;U&gt;&gt;
  : { readonly [K in keyof T]: DeepReadonly&lt;T[K]&gt; };

interface AppConfig {
  db: {
    host: string;
    credentials: {
      user: string;
    };
  };
}

const config: DeepReadonly&lt;AppConfig&gt; = {
  db: { host: "localhost", credentials: { user: "admin" } }
};

// config.db.credentials.user = "hacker"; // ❌ Error: Cannot assign to read-only property!</code></pre>
    `,
    starterCode: `// Define a recursive binary tree node type:
interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

const root: TreeNode<number> = {
  value: 10,
  left: { value: 5 },
  right: { value: 15, right: { value: 20 } }
};

console.log("Tree root value:", root.value);
console.log("Tree right-right value:", root.right?.right?.value);
`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

const root: TreeNode<number> = {
  value: 10,
  left: { value: 5 },
  right: { value: 15, right: { value: 20 } }
};

console.log("Tree root value:", root.value);
console.log("Tree right-right value:", root.right?.right?.value);
`,
    quiz: [
      {
        question: "Why does standard `Readonly<{ nested: { count: number } }>` still allow `obj.nested.count = 5`?",
        options: [
          "It is a TypeScript bug",
          "`Readonly<T>` is shallow by design; it only freezes the top-level keys",
          "Nested objects cannot be made readonly in JavaScript",
          "Strict mode is disabled"
        ],
        answer: 1,
        explanation: "Built-in `Readonly<T>` only marks top-level properties readonly. Nested objects remain mutable unless deeply wrapped recursively."
      },
      {
        question: "What is the maximum recursion depth limit for TypeScript type evaluation before the compiler stops?",
        options: [
          "5 levels",
          "50-100 levels (to avoid infinite compilation loops)",
          "Unlimited",
          "Exactly 1024"
        ],
        answer: 1,
        explanation: "TypeScript enforces a recursion depth limit (typically around 50-100 levels) to prevent infinite compile-time loops."
      }
    ],
    exercise: {
      instruction: "Write a recursive type `NestedArray<T>` which is either `T` or an array of `NestedArray<T>`.",
      starter: `// Define NestedArray<T>:


const nested: NestedArray<number> = [1, [2, [3, 4], 5]];
`,
      solution: `type NestedArray<T> = T | NestedArray<T>[];

const nested: NestedArray<number> = [1, [2, [3, 4], 5]];
console.log("Nested array typed!");
`,
      hint: "type NestedArray<T> = T | NestedArray<T>[];",
      validate: (code) => {
        return /type\s+NestedArray\s*<\s*T\s*>\s*=\s*(T\s*\|\s*NestedArray\s*<\s*T\s*>\[\s*\]|NestedArray\s*<\s*T\s*>\[\s*\]\s*\|\s*T)/.test(code);
      }
    }
  },
  {
    id: "a6",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Type Wizardry",
    title: "21. Branded & Nominal Types: Zero Primitive Obsession",
    estimatedTime: "18 min",
    summary: "Prevent mixing up strings and numbers with identical representations (e.g. `UserId` vs `OrderId`) using TypeScript type branding.",
    content: `
      <h2>The Problem: Structural Typing Pitfall</h2>
      <p>TypeScript is <strong>structurally typed</strong>. If two types have the same shape, they are interchangeable:</p>
      <pre><code class="language-typescript">type UserId = string;
type OrderId = string;

function cancelOrder(orderId: OrderId) { ... }

const userId: UserId = "usr_12345";
cancelOrder(userId); // 😱 Compiles cleanly, but is a CRITICAL logic bug!</code></pre>

      <h2>The Solution: Branded / Flavor Types</h2>
      <p>Attach a unique compile-time brand token (symbol or phantom property) that does not exist at runtime:</p>
      <pre><code class="language-typescript">declare const __brand: unique symbol;

type Brand&lt;T, B&gt; = T &amp; { readonly [__brand]: B };

type UserId = Brand&lt;string, "UserId"&gt;;
type OrderId = Brand&lt;string, "OrderId"&gt;;

function makeUserId(id: string): UserId {
  return id as UserId;
}

function makeOrderId(id: string): OrderId {
  return id as OrderId;
}

function cancelOrder(orderId: OrderId) {
  console.log("Cancelled order:", orderId);
}

const user = makeUserId("u_99");
const order = makeOrderId("ord_101");

cancelOrder(order); // ✅ Passes
// cancelOrder(user); // ❌ Error: Type 'UserId' is not assignable to type 'OrderId'!</code></pre>

      <h3>Real-World Use Cases</h3>
      <ul>
        <li>Differentiating <code>USD</code> and <code>EUR</code> currencies.</li>
        <li>Distinguishing raw input vs sanitized HTML strings.</li>
        <li>Enforcing validated emails (<code>ValidatedEmail</code>) vs unvalidated raw strings.</li>
      </ul>
    `,
    starterCode: `declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type ValidatedEmail = Brand<string, "ValidatedEmail">;

function validateEmail(raw: string): ValidatedEmail {
  if (!raw.includes("@") || !raw.includes(".")) {
    throw new Error("Invalid email format");
  }
  return raw as ValidatedEmail;
}

function sendWelcomeNewsletter(email: ValidatedEmail) {
  console.log("Sending email to validated recipient:", email);
}

const safeEmail = validateEmail("engineer@typescript.dev");
sendWelcomeNewsletter(safeEmail);

// Try passing an unvalidated raw string to see the compile error:
// sendWelcomeNewsletter("raw_string@test.com");
`,
    solutionCode: `declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type ValidatedEmail = Brand<string, "ValidatedEmail">;

function validateEmail(raw: string): ValidatedEmail {
  if (!raw.includes("@") || !raw.includes(".")) {
    throw new Error("Invalid email format");
  }
  return raw as ValidatedEmail;
}

function sendWelcomeNewsletter(email: ValidatedEmail) {
  console.log("Sending email to validated recipient:", email);
}

const safeEmail = validateEmail("engineer@typescript.dev");
sendWelcomeNewsletter(safeEmail);
`,
    quiz: [
      {
        question: "Why do branded types work in TypeScript despite being structurally typed?",
        options: [
          "Because they attach an artificial unique property type that other values lack",
          "Because TypeScript checks the variable names",
          "Because they generate native C++ nominal classes",
          "Because the runtime JavaScript engine enforces it"
        ],
        answer: 0,
        explanation: "By intersecting a base type with `{ readonly [__brand]: 'UniqueToken' }`, TypeScript's structural checker recognizes the missing brand property on unbranded values."
      },
      {
        question: "What is the runtime overhead of a TypeScript branded type?",
        options: [
          "Double the memory consumption",
          "Zero runtime overhead (erased at compile time)",
          "A small wrapper object allocation",
          "Slower string concatenation"
        ],
        answer: 1,
        explanation: "Type branding is 100% compile-time type-level trickery. No runtime object or memory overhead exists in the generated JavaScript."
      }
    ],
    exercise: {
      instruction: "Create a branded type `Celsius = Brand<number, 'Celsius'>` and `Fahrenheit = Brand<number, 'Fahrenheit'>`, plus a conversion function `toFahrenheit(c: Celsius): Fahrenheit` that returns `(c * 9/5 + 32) as Fahrenheit`.",
      starter: `declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

// 1. Define Celsius & Fahrenheit branded types:


// 2. Define toFahrenheit function:

`,
      solution: `declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type Celsius = Brand<number, "Celsius">;
type Fahrenheit = Brand<number, "Fahrenheit">;

function toFahrenheit(c: Celsius): Fahrenheit {
  return (c * 9 / 5 + 32) as Fahrenheit;
}

const boilingWater = 100 as Celsius;
console.log("Boiling in Fahrenheit:", toFahrenheit(boilingWater));
`,
      hint: "type Celsius = Brand<number, 'Celsius'>;",
      validate: (code) => {
        return code.includes("Celsius") && code.includes("Fahrenheit") && code.includes("toFahrenheit");
      }
    }
  },
  {
    id: "a7",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Type Wizardry",
    title: "22. Production Architecture & Type-Safe Result Patterns",
    estimatedTime: "25 min",
    summary: "Architect enterprise applications using type-safe Result/Option patterns, schema validation patterns, and bulletproof API contracts.",
    content: `
      <h2>Eliminating Uncaught Exceptions: The Result Pattern</h2>
      <p>In standard JavaScript, functions throw runtime exceptions that may go uncaught. In professional functional architectures, errors are returned as values:</p>
      <pre><code class="language-typescript">type Result&lt;T, E = Error&gt; =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok&lt;T&gt;(value: T): Result&lt;T, never&gt; {
  return { ok: true, value };
}

function err&lt;E&gt;(error: E): Result&lt;never, E&gt; {
  return { ok: false, error };
}

function parseJsonSafe(jsonString: string): Result&lt;unknown, string&gt; {
  try {
    return ok(JSON.parse(jsonString));
  } catch (e) {
    return err((e as Error).message);
  }
}

const res = parseJsonSafe('{"name": "TypeScript Pro"}');
if (res.ok) {
  console.log("Data:", res.value);
} else {
  console.error("Error message:", res.error);
}</code></pre>

      <h2>The Builder Pattern with Fluent Type Transitions</h2>
      <pre><code class="language-typescript">interface RequestConfig {
  url: string;
  method: "GET" | "POST";
  timeout: number;
}

class RequestBuilder&lt;TState extends Partial&lt;RequestConfig&gt;&gt; {
  private config: Partial&lt;RequestConfig&gt; = {};

  setUrl(url: string): RequestBuilder&lt;TState &amp; { url: string }&gt; {
    this.config.url = url;
    return this as any;
  }

  setMethod(method: "GET" | "POST"): RequestBuilder&lt;TState &amp; { method: "GET" | "POST" }&gt; {
    this.config.method = method;
    return this as any;
  }

  // Can only call build() once both 'url' and 'method' are set!
  build(this: RequestBuilder&lt;{ url: string; method: "GET" | "POST" }&gt;): RequestConfig {
    return {
      url: this.config.url!,
      method: this.config.method!,
      timeout: this.config.timeout ?? 5000
    };
  }
}</code></pre>
    `,
    starterCode: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: "ZeroDivisionError" };
  }
  return { ok: true, value: a / b };
}

const good = divide(20, 4);
if (good.ok) {
  console.log("Result:", good.value);
}

const bad = divide(10, 0);
if (!bad.ok) {
  console.log("Handled safely without crashing:", bad.error);
}
`,
    solutionCode: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: "ZeroDivisionError" };
  }
  return { ok: true, value: a / b };
}

const good = divide(20, 4);
if (good.ok) {
  console.log("Result:", good.value);
}

const bad = divide(10, 0);
if (!bad.ok) {
  console.log("Handled safely without crashing:", bad.error);
}
`,
    quiz: [
      {
        question: "What is the primary benefit of returning a `Result<T, E>` union instead of throwing errors with `throw new Error()`?",
        options: [
          "It forces the compiler to require callers to handle both success and error cases explicitly",
          "It runs 10x faster in Node.js",
          "It automatically logs errors to an external server",
          "It works without JavaScript"
        ],
        answer: 0,
        explanation: "Using `Result<T, E>` makes error handling part of the type signature. Callers cannot access `.value` without first narrowing on `.ok === true`."
      },
      {
        question: "How does TypeScript enforce that `build()` can only be called when all required builder fields have been configured?",
        options: [
          "Using a runtime assertion inside `build()`",
          "By constraining `this: RequestBuilder<{ requiredProps }>` in the method signature",
          "Through a custom npm plugin",
          "By locking the constructor"
        ],
        answer: 1,
        explanation: "TypeScript allows methods to type their `this` parameter: `build(this: RequestBuilder<RequiredState>)` guarantees at compile time that all required properties were populated."
      }
    ],
    exercise: {
      instruction: "Write a function `safeParseInt(str: string): Result<number, string>` using the `Result` pattern. If `isNaN(parsed)` returns `{ ok: false, error: 'Invalid integer' }`, otherwise return `{ ok: true, value: parsed }`.",
      starter: `type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function safeParseInt(str: string): Result<number, string> {
  // Implement here
}

console.log(safeParseInt("42"));    // { ok: true, value: 42 }
console.log(safeParseInt("hello")); // { ok: false, error: "Invalid integer" }
`,
      solution: `type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function safeParseInt(str: string): Result<number, string> {
  const num = parseInt(str, 10);
  if (isNaN(num)) {
    return { ok: false, error: "Invalid integer" };
  }
  return { ok: true, value: num };
}

console.log(safeParseInt("42"));
console.log(safeParseInt("hello"));
`,
      hint: "Use parseInt(str, 10) and check isNaN(num).",
      validate: (code) => {
        return code.includes("safeParseInt") && code.includes("isNaN");
      }
    }
  }
];

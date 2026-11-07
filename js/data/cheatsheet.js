export const cheatSheetData = {
  html: [
    {
      category: "Semantic Structure",
      items: [
        { name: "<main>", desc: "Primary unique content container of the document (1 per page)" },
        { name: "<article>", desc: "Self-contained reusable content (post, card, comment)" },
        { name: "<section>", desc: "Thematic grouping with a heading" },
        { name: "<nav>", desc: "Major navigation links block" },
        { name: "<aside>", desc: "Tangentially related sidebar content" },
        { name: "<header> / <footer>", desc: "Introductory header or concluding footer landmarks" }
      ]
    },
    {
      category: "Forms & Inputs",
      items: [
        { name: "<label for='id'>", desc: "Accessible label bound to an input id" },
        { name: "required", desc: "Native client-side required field constraint" },
        { name: "pattern='[A-Z]{3}'", desc: "Regex validation attribute" },
        { name: "loading='lazy'", desc: "Defer image/iframe loading until viewport is near" }
      ]
    }
  ],
  css: [
    {
      category: "Flexbox (1D)",
      items: [
        { name: "display: flex;", desc: "Activates flex container context" },
        { name: "justify-content", desc: "Aligns along main axis (center, space-between, flex-start)" },
        { name: "align-items", desc: "Aligns along cross axis (center, stretch, baseline)" },
        { name: "gap: 16px;", desc: "Sets space between items cleanly" },
        { name: "flex-grow: 1;", desc: "Allows item to expand into available space" },
        { name: "flex-shrink: 0;", desc: "Prevents item from compressing" }
      ]
    },
    {
      category: "Grid (2D)",
      items: [
        { name: "grid-template-columns", desc: "Defines track widths: repeat(auto-fit, minmax(250px, 1fr))" },
        { name: "fr unit", desc: "Fractional unit of free space" },
        { name: "box-sizing: border-box", desc: "Includes padding and border within declared width/height" }
      ]
    },
    {
      category: "Modern CSS",
      items: [
        { name: "var(--custom-prop)", desc: "Runtime dynamic CSS variable accessor" },
        { name: "@container", desc: "Component-driven layout query based on ancestor width" },
        { name: ":has()", desc: "Parent relational selector: card:has(img)" }
      ]
    }
  ],
  javascript: [
    {
      category: "Modern ES6+ Syntax",
      items: [
        { name: "const / let", desc: "Block-scoped variables with Temporal Dead Zone safety" },
        { name: "const [a, b] = arr", desc: "Array destructuring" },
        { name: "const { id, name } = obj", desc: "Object destructuring" },
        { name: "...spread / rest", desc: "Shallow copying, merging, or collecting parameters" }
      ]
    },
    {
      category: "Array Methods",
      items: [
        { name: "arr.map(fn)", desc: "Returns transformed new array" },
        { name: "arr.filter(fn)", desc: "Returns subset array of matching items" },
        { name: "arr.reduce(fn, init)", desc: "Accumulates array down to a single value" },
        { name: "arr.find(fn)", desc: "Returns first element matching predicate" }
      ]
    },
    {
      category: "Async & Event Loop",
      items: [
        { name: "async / await", desc: "Sugar for working synchronously with Promises" },
        { name: "Promise.all([p1, p2])", desc: "Runs promises concurrently; rejects on any error" },
        { name: "queueMicrotask(fn)", desc: "Queues a high-priority microtask" }
      ]
    }
  ],
  typescript: [
    {
      category: "Built-in Utility Types",
      items: [
        { name: "Partial<T>", desc: "Makes all properties optional (?)" },
        { name: "Required<T>", desc: "Makes all properties required (removes ?)" },
        { name: "Readonly<T>", desc: "Marks all properties readonly" },
        { name: "Record<K, V>", desc: "Constructs an object with keys K and values V" },
        { name: "Pick<T, K>", desc: "Selects only keys K from type T" },
        { name: "Omit<T, K>", desc: "Constructs type T without keys K" },
        { name: "ReturnType<T>", desc: "Extracts return type of a function type" },
        { name: "Awaited<T>", desc: "Recursively unwraps Promise results" }
      ]
    },
    {
      category: "Type Operators",
      items: [
        { name: "keyof T", desc: "Produces union of object keys" },
        { name: "typeof val", desc: "Derives type from runtime JS value" },
        { name: "as const", desc: "Const assertion (deep readonly literal)" },
        { name: "T extends U ? X : Y", desc: "Conditional ternary type" },
        { name: "infer R", desc: "Pattern-matches variable inside conditional types" }
      ]
    }
  ],
  sql: [
    {
      category: "DQL - Data Query Language",
      items: [
        { name: "SELECT ... FROM table", desc: "Retrieves specific column projections from a table" },
        { name: "WHERE condition", desc: "Filters rows before aggregation (AND, OR, NOT, IN, BETWEEN)" },
        { name: "ORDER BY col [ASC|DESC]", desc: "Sorts query result set by specified column" },
        { name: "LIMIT n OFFSET m", desc: "Paginates query results starting at offset m" },
        { name: "GROUP BY col", desc: "Aggregates rows sharing identical values into summary rows" },
        { name: "HAVING agg_condition", desc: "Filters aggregated groups after GROUP BY calculation" }
      ]
    },
    {
      category: "Joins & Set Operations",
      items: [
        { name: "INNER JOIN t2 ON cond", desc: "Returns rows when matching key exists in both tables" },
        { name: "LEFT OUTER JOIN t2 ON cond", desc: "Returns all rows from left table and matched rows from right" },
        { name: "UNION / UNION ALL", desc: "Combines result sets of two queries (ALL preserves duplicates)" }
      ]
    },
    {
      category: "DML & DDL",
      items: [
        { name: "INSERT INTO table VALUES", desc: "Inserts new record rows into target table" },
        { name: "UPDATE table SET col = val", desc: "Modifies existing rows conforming to WHERE filter" },
        { name: "DELETE FROM table WHERE", desc: "Deletes rows matching filter condition" },
        { name: "CREATE TABLE (...) PRIMARY KEY", desc: "Defines table schema, datatypes, and integrity constraints" }
      ]
    }
  ],
  postgresql: [
    {
      category: "Modern Postgres SQL",
      items: [
        { name: "WITH cte AS (...) SELECT", desc: "Common Table Expression for clean modular readability" },
        { name: "ROW_NUMBER() OVER (PARTITION BY ...)", desc: "Window function ranking rows inside grouped partitions" },
        { name: "SUM(x) OVER (ORDER BY date)", desc: "Computes cumulative running total without collapsing rows" },
        { name: "COALESCE(a, b, default)", desc: "Returns first non-null argument in list" }
      ]
    },
    {
      category: "Postgres JSONB & Advanced Types",
      items: [
        { name: "data->>'key'", desc: "Extracts JSON field directly as text" },
        { name: "data->'nested'", desc: "Extracts nested JSON sub-object or array" },
        { name: "data @> '{\"tag\": \"pro\"}'", desc: "JSONB containment operator matching nested subsets" },
        { name: "GENERATE_SERIES(1, 10)", desc: "Generates consecutive sequence of set numbers or dates" }
      ]
    },
    {
      category: "Performance & Administration",
      items: [
        { name: "CREATE INDEX idx ON tbl (col)", desc: "B-Tree index drastically speeding up WHERE equality/ranges" },
        { name: "EXPLAIN ANALYZE query", desc: "Executes query and displays exact cost, loop count, and timing" }
      ]
    }
  ]
};

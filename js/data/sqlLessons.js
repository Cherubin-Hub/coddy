/**
 * Exhaustive ANSI SQL & Relational Database Curriculum (18 In-Depth Modules)
 * Tier 1: Beginner (Foundations, SELECT, Filtering, Sorting)
 * Tier 2: Intermediate (Aggregations, Grouping, Joins, DML Operations)
 * Tier 3: Advanced (Subqueries, Set Operations, Transactions, Indexing)
 */

export const sqlLessons = [
  // ==========================================
  // TIER 1: BEGINNER (Foundations & Filtering)
  // ==========================================
  {
    id: "s1",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Relational Foundations",
    track: "sql",
    title: "1. Relational Databases & SQL Mental Model",
    estimatedTime: "12 min",
    summary: "Understand tables, rows, columns, relational schemas, primary keys, and the declarative mental model of Structured Query Language.",
    content: `
      <h2>The Relational Mental Model</h2>
      <p>SQL (Structured Query Language) is a <strong>declarative</strong> language. Unlike procedural programming where you tell the computer <em>how</em> to execute steps, in SQL you tell the database engine <em>what data</em> you want, and the query planner figures out the optimal retrieval algorithm.</p>

      <div class="callout tip">
        <strong>Declarative vs Imperative:</strong> In JavaScript you loop through arrays with <code>for</code> or <code>.filter()</code>. In SQL, you simply describe the desired result set using <code>SELECT</code> and <code>WHERE</code>.
      </div>

      <h3>Anatomy of a Database Table</h3>
      <p>A table is a collection of related data organized in a grid of rows and columns:</p>
      <ul>
        <li><strong>Table:</strong> An entity representing a concept (e.g. <code>employees</code>, <code>products</code>, <code>orders</code>).</li>
        <li><strong>Row (Tuple / Record):</strong> A single instance of an item.</li>
        <li><strong>Column (Attribute / Field):</strong> A typed property shared by all rows (e.g. <code>id</code>, <code>name</code>, <code>salary</code>).</li>
        <li><strong>Primary Key (PK):</strong> A column or group of columns that uniquely identifies every single row in the table.</li>
      </ul>

      <div class="code-table">
        <div class="table-row header"><span>Column</span><span>Data Type</span><span>Description</span></div>
        <div class="table-row"><code>id</code><span>INTEGER</span><span>Unique identifier (Primary Key)</span></div>
        <div class="table-row"><code>name</code><span>VARCHAR(100)</span><span>Employee full name</span></div>
        <div class="table-row"><code>department</code><span>VARCHAR(50)</span><span>Assigned department</span></div>
        <div class="table-row"><code>salary</code><span>NUMERIC(10,2)</span><span>Annual compensation</span></div>
      </div>
    `,
    starterCode: `-- Explore the employees table:
SELECT * FROM employees;`,
    solutionCode: `SELECT * FROM employees;`,
    quiz: [
      {
        question: "Why is SQL referred to as a 'declarative' programming language?",
        options: [
          "Because you declare the desired output result set rather than detailing procedural loop instructions",
          "Because all variables must be declared with let and const",
          "Because it only runs inside web browsers",
          "Because it does not support mathematical calculations"
        ],
        answer: 0,
        explanation: "SQL is declarative: you describe what rows and columns you require, leaving the query optimizer to plan index scans, joins, and memory buffers."
      },
      {
        question: "What is the defining characteristic of a Primary Key in a relational table?",
        options: [
          "It must contain unique, non-null values that distinguish every individual row",
          "It must always be a random string",
          "It can contain duplicate values across multiple rows",
          "It is automatically deleted after 30 days"
        ],
        answer: 0,
        explanation: "A Primary Key strictly enforces uniqueness and non-nullability, acting as the definitive identifier for each record."
      }
    ],
    exercise: {
      instruction: "Write a SQL query to inspect all columns and rows from the <code>employees</code> table using the asterisk wildcard <code>*</code>.",
      starter: `-- Retrieve all columns from employees:
`,
      hint: "Use SELECT * FROM employees;",
      solution: `SELECT * FROM employees;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("SELECT") && clean.includes("*") && clean.includes("FROM") && clean.includes("EMPLOYEES");
      }
    }
  },

  {
    id: "s2",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "SELECT & Aliasing",
    track: "sql",
    title: "2. Querying Specific Columns & Aliasing (AS)",
    estimatedTime: "12 min",
    summary: "Select specific columns, compute projected calculations, and rename output fields using the AS keyword.",
    content: `
      <h2>Selecting Specific Columns</h2>
      <p>In production applications, retrieving every column with <code>SELECT *</code> is an anti-pattern: it transfers unnecessary data over the network and prevents index-only scans. Instead, explicitly list required columns:</p>

      <pre><code class="language-sql">SELECT name, salary, department
FROM employees;</code></pre>

      <h3>Column Aliasing with <code>AS</code></h3>
      <p>You can rename columns in the query output using the <code>AS</code> keyword. This is invaluable when computing new values or presenting clean labels for client applications:</p>

      <pre><code class="language-sql">SELECT 
  name AS employee_name,
  salary * 0.10 AS annual_bonus,
  salary + (salary * 0.10) AS total_compensation
FROM employees;</code></pre>

      <div class="callout tip">
        <strong>Whitespace &amp; Commas:</strong> SQL keywords are case-insensitive by standard conventions, but writing keywords in <code>UPPERCASE</code> and column names in <code>snake_case</code> is the universal industry standard.
      </div>
    `,
    starterCode: `-- Select employee name and salary with an alias:
SELECT name, salary FROM employees;`,
    solutionCode: `SELECT name, salary, salary * 0.15 AS bonus FROM employees;`,
    quiz: [
      {
        question: "Why should production queries avoid using 'SELECT *' when only a few columns are needed?",
        options: [
          "It wastes network bandwidth, increases memory usage, and prevents index-only scans",
          "SELECT * is illegal syntax in ANSI SQL standards",
          "The database engine will crash if tables exceed 100 rows",
          "SELECT * reverses the order of database columns"
        ],
        answer: 0,
        explanation: "Listing specific columns minimizes I/O overhead and allows the optimizer to utilize covering indexes without reading full table pages from disk."
      }
    ],
    exercise: {
      instruction: "Select the <code>name</code> and <code>salary</code> columns from <code>employees</code>, and compute a third column multiplying <code>salary * 0.15</code> aliased as <code>bonus</code>.",
      starter: `-- Write your query here:
`,
      hint: "SELECT name, salary, salary * 0.15 AS bonus FROM employees;",
      solution: `SELECT name, salary, salary * 0.15 AS bonus FROM employees;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("SELECT") && clean.includes("NAME") && clean.includes("SALARY") && clean.includes("0.15") && clean.includes("BONUS") && clean.includes("FROM");
      }
    }
  },

  {
    id: "s3",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "WHERE Filtering",
    track: "sql",
    title: "3. Filtering Rows with the WHERE Clause",
    estimatedTime: "14 min",
    summary: "Filter records based on conditional criteria using equality, inequality, and relational operators.",
    content: `
      <h2>The WHERE Clause</h2>
      <p>The <code>WHERE</code> clause filters rows returned by a query. Only rows where the filter condition evaluates to <code>TRUE</code> are included in the result set:</p>

      <pre><code class="language-sql">SELECT name, department, salary
FROM employees
WHERE department = 'Engineering';</code></pre>

      <h3>Relational Comparison Operators</h3>
      <div class="code-table">
        <div class="table-row header"><span>Operator</span><span>Meaning</span><span>Example</span></div>
        <div class="table-row"><code>=</code><span>Equal to</span><span><code>status = 'active'</code></span></div>
        <div class="table-row"><code>&lt;&gt;</code> or <code>!=</code><span>Not equal to</span><span><code>role != 'intern'</code></span></div>
        <div class="table-row"><code>&gt;</code> / <code>&gt;=</code><span>Greater than / Equal</span><span><code>salary &gt;= 90000</code></span></div>
        <div class="table-row"><code>&lt;</code> / <code>&lt;=</code><span>Less than / Equal</span><span><code>age &lt; 30</code></span></div>
      </div>

      <div class="callout warning">
        <strong>String Quotes in SQL:</strong> In ANSI SQL, string literals MUST be enclosed in single quotes (<code>'Engineering'</code>). Double quotes (<code>"column_name"</code>) are reserved for identifier names in case-sensitive databases!
      </div>
    `,
    starterCode: `-- Filter employees with salary > 80000:
SELECT name, department, salary
FROM employees
WHERE salary > 80000;`,
    solutionCode: `SELECT name, department, salary FROM employees WHERE salary >= 95000;`,
    quiz: [
      {
        question: "In standard SQL, which quote type must be used to enclose string literal values?",
        options: [
          "Single quotes ('text')",
          "Double quotes (\"text\")",
          "Backticks (`text`)",
          "Angle brackets (<text>)"
        ],
        answer: 0,
        explanation: "Standard ANSI SQL strictly uses single quotes ('hello') for string values and text literals. Double quotes are reserved for identifier names."
      }
    ],
    exercise: {
      instruction: "Retrieve the <code>name</code>, <code>department</code>, and <code>salary</code> of all employees whose <code>salary</code> is greater than or equal to <code>95000</code>.",
      starter: `-- Write query:
`,
      hint: "SELECT name, department, salary FROM employees WHERE salary >= 95000;",
      solution: `SELECT name, department, salary FROM employees WHERE salary >= 95000;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("SELECT") && clean.includes("WHERE") && clean.includes("SALARY") && clean.includes("95000");
      }
    }
  },

  {
    id: "s4",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Logical Operators",
    track: "sql",
    title: "4. Compound Logic: AND, OR & NOT",
    estimatedTime: "14 min",
    summary: "Combine multiple filter conditions with boolean operators and master operator precedence using parentheses.",
    content: `
      <h2>Combining Logical Conditions</h2>
      <p>Real-world filtering demands evaluating multiple criteria simultaneously using boolean connectors:</p>

      <pre><code class="language-sql">-- Both conditions must be TRUE:
SELECT name, department, salary
FROM employees
WHERE department = 'Engineering' AND salary &gt;= 100000;

-- At least one condition must be TRUE:
SELECT name, department
FROM employees
WHERE department = 'Sales' OR department = 'Marketing';</code></pre>

      <h3>Operator Precedence Pitfall</h3>
      <p>In SQL, <code>AND</code> has higher precedence than <code>OR</code>! This means conditions joined by <code>AND</code> are evaluated first, which can cause subtle logic bugs unless grouped with parentheses:</p>

      <pre><code class="language-sql">-- POTENTIAL BUG: Evaluates (department = 'Design' AND salary &gt; 90000) OR department = 'Engineering'
SELECT * FROM employees
WHERE department = 'Engineering' OR department = 'Design' AND salary &gt; 90000;

-- CORRECT: Explicit grouping guarantees intended logic
SELECT * FROM employees
WHERE (department = 'Engineering' OR department = 'Design') AND salary &gt; 90000;</code></pre>
    `,
    starterCode: `-- Find engineers earning over 90k:
SELECT name, department, salary
FROM employees;`,
    solutionCode: `SELECT name, department, salary FROM employees WHERE (department = 'Engineering' OR department = 'Product') AND salary > 90000;`,
    quiz: [
      {
        question: "What is the relative operator precedence between AND and OR in SQL queries?",
        options: [
          "AND takes precedence over OR",
          "OR takes precedence over AND",
          "They are strictly evaluated from right to left",
          "They have equal precedence and always evaluate left to right"
        ],
        answer: 0,
        explanation: "AND has higher precedence than OR. Always wrap OR expressions in parentheses when combined with AND to prevent unintended query filtering."
      }
    ],
    exercise: {
      instruction: "Select all employees from either <code>Engineering</code> or <code>Product</code> departments who have a <code>salary &gt; 90000</code>. Use parentheses to group the department checks.",
      starter: `-- Write query with parentheses grouping:
`,
      hint: "SELECT name, department, salary FROM employees WHERE (department = 'Engineering' OR department = 'Product') AND salary > 90000;",
      solution: `SELECT name, department, salary FROM employees WHERE (department = 'Engineering' OR department = 'Product') AND salary > 90000;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("WHERE") && clean.includes("ENGINEERING") && clean.includes("PRODUCT") && clean.includes("90000") && clean.includes("AND");
      }
    }
  },

  {
    id: "s5",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Pattern Matching",
    track: "sql",
    title: "5. Pattern Matching (LIKE) & Set Membership (IN)",
    estimatedTime: "14 min",
    summary: "Match text patterns using wildcards (% and _) and test list membership with the clean IN operator.",
    content: `
      <h2>Pattern Matching with LIKE</h2>
      <p>When searching for text fragments rather than exact matches, use the <code>LIKE</code> operator with wildcards:</p>
      <ul>
        <li><code>%</code>: Matches zero, one, or multiple characters.</li>
        <li><code>_</code>: Matches exactly one character.</li>
      </ul>

      <pre><code class="language-sql">-- Names starting with 'A':
SELECT name FROM employees WHERE name LIKE 'A%';

-- Names ending with 'son':
SELECT name FROM employees WHERE name LIKE '%son';

-- Names containing 'an':
SELECT name FROM employees WHERE name LIKE '%an%';</code></pre>

      <h3>Set Membership with IN</h3>
      <p>Instead of stringing together multiple verbose <code>OR</code> conditions, use <code>IN</code>:</p>

      <pre><code class="language-sql">-- Verbose OR chain:
WHERE department = 'HR' OR department = 'Legal' OR department = 'Finance';

-- Clean, performant IN syntax:
WHERE department IN ('HR', 'Legal', 'Finance');

-- Negative membership with NOT IN:
WHERE department NOT IN ('Contractor', 'Intern');</code></pre>
    `,
    starterCode: `-- Select employees in specific departments:
SELECT name, department
FROM employees
WHERE department IN ('Engineering', 'Analytics');`,
    solutionCode: `SELECT name, department FROM employees WHERE department IN ('Engineering', 'Analytics', 'Design') AND name LIKE 'A%';`,
    quiz: [
      {
        question: "In a SQL LIKE pattern, what does the percentage sign (%) wildcard represent?",
        options: [
          "Zero, one, or any arbitrary number of characters",
          "Exactly one single character",
          "Any numeric digit from 0 to 9",
          "An escaped quotation mark"
        ],
        answer: 0,
        explanation: "% represents any sequence of zero or more characters. The underscore (_) wildcard matches exactly one character."
      }
    ],
    exercise: {
      instruction: "Select <code>name</code> and <code>department</code> for employees whose <code>department</code> is in <code>('Engineering', 'Analytics', 'Design')</code> AND whose <code>name</code> starts with the letter <code>'A%'</code>.",
      starter: `-- Query using IN and LIKE:
`,
      hint: "SELECT name, department FROM employees WHERE department IN ('Engineering', 'Analytics', 'Design') AND name LIKE 'A%';",
      solution: `SELECT name, department FROM employees WHERE department IN ('Engineering', 'Analytics', 'Design') AND name LIKE 'A%';`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("IN") && clean.includes("LIKE") && clean.includes("A%") && clean.includes("ENGINEERING");
      }
    }
  },

  {
    id: "s6",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Sorting & Pagination",
    track: "sql",
    title: "6. Nulls, Sorting (ORDER BY) & Pagination (LIMIT)",
    estimatedTime: "15 min",
    summary: "Handle three-valued logic with IS NULL, order result sets with ORDER BY ASC/DESC, and implement pagination with LIMIT and OFFSET.",
    content: `
      <h2>The Three-Valued Logic of NULL</h2>
      <p>In relational databases, <code>NULL</code> represents the absence of a value or unknown state. It is not zero or an empty string. You cannot compare <code>NULL = NULL</code> (which yields <code>UNKNOWN</code>); you must use <code>IS NULL</code> or <code>IS NOT NULL</code>:</p>

      <pre><code class="language-sql">SELECT name, manager_id
FROM employees
WHERE manager_id IS NULL; -- Finds the CEO or top-level directors</code></pre>

      <h3>Sorting Result Sets with ORDER BY</h3>
      <p>Relational databases do not store rows in any guaranteed order. To enforce deterministic ordering, use <code>ORDER BY</code>:</p>

      <pre><code class="language-sql">-- Highest salary first, then alphabetically by name:
SELECT name, department, salary
FROM employees
ORDER BY salary DESC, name ASC;</code></pre>

      <h3>Pagination with LIMIT and OFFSET</h3>
      <pre><code class="language-sql">-- Page 1: First 5 highest earners
SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5;

-- Page 2: Skip first 5, fetch next 5
SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5 OFFSET 5;</code></pre>
    `,
    starterCode: `-- Top 3 highest-earning employees:
SELECT name, department, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;`,
    solutionCode: `SELECT name, department, salary FROM employees ORDER BY salary DESC LIMIT 5;`,
    quiz: [
      {
        question: "Why does the comparison 'WHERE column_name = NULL' fail to return rows?",
        options: [
          "Because NULL represents unknown, so equality comparison evaluates to UNKNOWN; you must use IS NULL",
          "Because NULL only exists in JavaScript, not SQL",
          "Because = NULL deletes the column from the database",
          "Because SQL requires triple equals (===)"
        ],
        answer: 0,
        explanation: "SQL utilizes three-valued logic (TRUE, FALSE, UNKNOWN). Any comparison with NULL using = evaluates to UNKNOWN. You must explicitly query IS NULL or IS NOT NULL."
      }
    ],
    exercise: {
      instruction: "Select the top 5 highest-earning employees from the <code>employees</code> table, displaying <code>name</code>, <code>department</code>, and <code>salary</code>, sorted by <code>salary DESC</code>.",
      starter: `-- Write top 5 query:
`,
      hint: "SELECT name, department, salary FROM employees ORDER BY salary DESC LIMIT 5;",
      solution: `SELECT name, department, salary FROM employees ORDER BY salary DESC LIMIT 5;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("ORDER BY") && clean.includes("SALARY") && clean.includes("DESC") && clean.includes("LIMIT 5");
      }
    }
  },

  // ==========================================
  // TIER 2: INTERMEDIATE (Aggregates & Joins)
  // ==========================================
  {
    id: "s7",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Aggregations",
    track: "sql",
    title: "7. Aggregate Functions & DISTINCT",
    estimatedTime: "15 min",
    summary: "Compute summary statistics across datasets using COUNT, SUM, AVG, MIN, MAX, and deduplicate values with DISTINCT.",
    content: `
      <h2>SQL Aggregate Functions</h2>
      <p>Aggregate functions perform calculations across a set of row values and return a single summarizing scalar value:</p>

      <div class="code-table">
        <div class="table-row header"><span>Function</span><span>Purpose</span><span>Example</span></div>
        <div class="table-row"><code>COUNT(*)</code><span>Total row count</span><span><code>COUNT(*)</code></span></div>
        <div class="table-row"><code>SUM(col)</code><span>Sum of numeric column</span><span><code>SUM(salary)</code></span></div>
        <div class="table-row"><code>AVG(col)</code><span>Arithmetic mean</span><span><code>AVG(salary)</code></span></div>
        <div class="table-row"><code>MIN(col) / MAX(col)</code><span>Smallest / Largest value</span><span><code>MIN(created_at)</code></span></div>
      </div>

      <pre><code class="language-sql">SELECT 
  COUNT(*) AS total_employees,
  AVG(salary) AS average_salary,
  MIN(salary) AS min_salary,
  MAX(salary) AS max_salary
FROM employees;</code></pre>

      <h3>Deduplicating with DISTINCT</h3>
      <p><code>DISTINCT</code> eliminates duplicate values from the output:</p>
      <pre><code class="language-sql">-- Get unique departments:
SELECT DISTINCT department FROM employees;

-- Count distinct active departments:
SELECT COUNT(DISTINCT department) FROM employees;</code></pre>
    `,
    starterCode: `-- Compute workforce statistics:
SELECT 
  COUNT(*) AS total_staff,
  AVG(salary) AS avg_comp
FROM employees;`,
    solutionCode: `SELECT COUNT(*) AS total_staff, AVG(salary) AS avg_salary, MAX(salary) AS highest_salary FROM employees;`,
    quiz: [
      {
        question: "What is the difference between COUNT(*) and COUNT(column_name)?",
        options: [
          "COUNT(*) counts all rows including nulls; COUNT(column_name) ignores NULL values in that specific column",
          "COUNT(*) only counts primary keys",
          "COUNT(column_name) is twice as fast",
          "There is no difference"
        ],
        answer: 0,
        explanation: "COUNT(*) tallies every record in the table. COUNT(col) only counts rows where that specific column contains a non-null value."
      }
    ],
    exercise: {
      instruction: "Write a query that computes: total number of employees as <code>total_staff</code>, average salary as <code>avg_salary</code>, and maximum salary as <code>highest_salary</code> from <code>employees</code>.",
      starter: `-- Write aggregation query:
`,
      hint: "SELECT COUNT(*) AS total_staff, AVG(salary) AS avg_salary, MAX(salary) AS highest_salary FROM employees;",
      solution: `SELECT COUNT(*) AS total_staff, AVG(salary) AS avg_salary, MAX(salary) AS highest_salary FROM employees;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("COUNT(*)") && clean.includes("AVG(SALARY)") && clean.includes("MAX(SALARY)");
      }
    }
  },

  {
    id: "s8",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "GROUP BY & HAVING",
    track: "sql",
    title: "8. Grouping Data with GROUP BY & HAVING",
    estimatedTime: "16 min",
    summary: "Group rows into summary subsets and filter grouped aggregates using the HAVING clause.",
    content: `
      <h2>The GROUP BY Clause</h2>
      <p><code>GROUP BY</code> collapses rows sharing identical values in specified columns into summary groups. Aggregate functions are then computed per group:</p>

      <pre><code class="language-sql">SELECT department, COUNT(*) AS head_count, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;</code></pre>

      <div class="callout warning">
        <strong>The Grouping Rule:</strong> Every column in your <code>SELECT</code> list that is NOT inside an aggregate function MUST appear in the <code>GROUP BY</code> clause. Failing to do so causes a syntax error.
      </div>

      <h3>Filtering Groups with HAVING (vs WHERE)</h3>
      <p>A classic SQL mistake is trying to filter aggregates with <code>WHERE</code> (e.g. <code>WHERE COUNT(*) &gt; 5</code>). This is illegal because <code>WHERE</code> filters individual rows <em>before</em> grouping happens. To filter <em>after</em> grouping, use <code>HAVING</code>:</p>

      <pre><code class="language-sql">SELECT department, COUNT(*) AS team_size
FROM employees
GROUP BY department
HAVING COUNT(*) &gt;= 3; -- Filters out small teams</code></pre>
    `,
    starterCode: `-- Departmental breakdown:
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;`,
    solutionCode: `SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department HAVING AVG(salary) > 85000;`,
    quiz: [
      {
        question: "Why can't you write 'WHERE COUNT(*) > 5' to filter groups in a SQL query?",
        options: [
          "WHERE executes before grouping occurs; you must use HAVING to filter aggregated results",
          "HAVING is only for string columns",
          "COUNT(*) cannot exceed 5 in relational databases",
          "WHERE is deprecated in SQL:2023"
        ],
        answer: 0,
        explanation: "In SQL logical execution order, WHERE filters source rows first, then GROUP BY forms groups, and finally HAVING evaluates aggregate filters."
      }
    ],
    exercise: {
      instruction: "Select the <code>department</code> and its average salary as <code>avg_sal</code> from <code>employees</code>, grouped by <code>department</code>, but only include departments where the average salary is greater than <code>85000</code>.",
      starter: `-- Group by department with HAVING filter:
`,
      hint: "SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department HAVING AVG(salary) > 85000;",
      solution: `SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department HAVING AVG(salary) > 85000;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("GROUP BY") && clean.includes("HAVING") && clean.includes("AVG(SALARY)") && clean.includes("85000");
      }
    }
  },

  {
    id: "s9",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "INNER JOIN",
    track: "sql",
    title: "9. Relational Joins 1: INNER JOIN",
    estimatedTime: "16 min",
    summary: "Connect related tables using Primary Key to Foreign Key relationships with INNER JOIN and the ON condition.",
    content: `
      <h2>Normalizing Data &amp; Relationships</h2>
      <p>Relational databases avoid data duplication by splitting entities across tables. An <code>employees</code> table stores employee details, while a <code>departments</code> table stores department metadata. They are linked via a <strong>Foreign Key</strong>:</p>

      <pre><code class="language-sql">-- employees: id, name, department_id, salary
-- departments: id, department_name, location</code></pre>

      <h3>The INNER JOIN</h3>
      <p>An <code>INNER JOIN</code> returns rows only when there is a match in <strong>both</strong> tables based on the join predicate (<code>ON</code>):</p>

      <pre><code class="language-sql">SELECT 
  e.name,
  e.salary,
  d.department_name,
  d.location
FROM employees AS e
INNER JOIN departments AS d 
  ON e.department_id = d.id;</code></pre>

      <div class="callout tip">
        <strong>Table Aliasing:</strong> Using short table aliases (<code>employees AS e</code>, <code>departments AS d</code>) keeps multi-table queries readable and unambiguous.
      </div>
    `,
    starterCode: `-- Join employees with departments:
SELECT e.name, d.name AS dept_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;`,
    solutionCode: `SELECT e.name, e.salary, d.name AS department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id;`,
    quiz: [
      {
        question: "What happens to an employee row in an INNER JOIN if their department_id does not exist in the departments table?",
        options: [
          "The row is excluded from the result set because an INNER JOIN requires matching records in both tables",
          "The row is displayed with NULL for all department fields",
          "An unhandled database exception is thrown",
          "The employee row is automatically deleted"
        ],
        answer: 0,
        explanation: "INNER JOIN requires matches in both datasets. If an employee has no corresponding department record, they are omitted from the result."
      }
    ],
    exercise: {
      instruction: "Write an <code>INNER JOIN</code> between <code>employees e</code> and <code>departments d</code> matching <code>e.department_id = d.id</code>, selecting <code>e.name</code>, <code>e.salary</code>, and <code>d.name AS department_name</code>.",
      starter: `-- Write INNER JOIN:
`,
      hint: "SELECT e.name, e.salary, d.name AS department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id;",
      solution: `SELECT e.name, e.salary, d.name AS department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("JOIN") && clean.includes("ON") && clean.includes("DEPARTMENT_ID") && clean.includes("D.ID");
      }
    }
  },

  {
    id: "s10",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "OUTER JOINS",
    track: "sql",
    title: "10. Relational Joins 2: LEFT & FULL OUTER JOIN",
    estimatedTime: "16 min",
    summary: "Preserve unmatched records using LEFT JOIN, RIGHT JOIN, and discover orphaned records with IS NULL filtering.",
    content: `
      <h2>The LEFT OUTER JOIN</h2>
      <p>A <code>LEFT JOIN</code> preserves <strong>all rows</strong> from the left table, regardless of whether a matching row exists in the right table. When no match is found, columns from the right table are filled with <code>NULL</code>:</p>

      <pre><code class="language-sql">-- Include ALL employees, even new hires without an assigned department:
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;</code></pre>

      <h3>Finding Orphaned Records with Anti-Joins</h3>
      <p>A frequent task is finding records that have <em>no</em> associated records in another table (e.g. departments with zero assigned employees):</p>

      <pre><code class="language-sql">SELECT d.department_name
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
WHERE e.id IS NULL; -- Only keep departments with no matching employees!</code></pre>

      <h3>FULL OUTER JOIN</h3>
      <p>A <code>FULL OUTER JOIN</code> preserves all rows from both tables, filling with <code>NULL</code> on either side whenever a match is missing.</p>
    `,
    starterCode: `-- Find all departments and their staff (including empty departments):
SELECT d.name, e.name AS employee_name
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id;`,
    solutionCode: `SELECT d.name, e.name AS employee_name FROM departments d LEFT JOIN employees e ON d.id = e.department_id WHERE e.id IS NULL;`,
    quiz: [
      {
        question: "When performing a 'LEFT JOIN table_b ON table_a.id = table_b.a_id', what values appear for table_b columns when no match exists?",
        options: [
          "NULL",
          "Empty strings (\"\")",
          "Zero (0)",
          "An error is thrown"
        ],
        answer: 0,
        explanation: "LEFT JOIN retains every row from the left table and populates columns from the un-matched right table with NULL."
      }
    ],
    exercise: {
      instruction: "Write an anti-join query using <code>LEFT JOIN</code> between <code>departments d</code> and <code>employees e</code> on <code>d.id = e.department_id</code>, filtering with <code>WHERE e.id IS NULL</code> to find departments with 0 employees.",
      starter: `-- Write LEFT JOIN with IS NULL filter:
`,
      hint: "SELECT d.name FROM departments d LEFT JOIN employees e ON d.id = e.department_id WHERE e.id IS NULL;",
      solution: `SELECT d.name FROM departments d LEFT JOIN employees e ON d.id = e.department_id WHERE e.id IS NULL;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("LEFT JOIN") && clean.includes("ON") && clean.includes("IS NULL");
      }
    }
  },

  {
    id: "s11",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Data Insertion",
    track: "sql",
    title: "11. Data Modification 1: INSERT INTO",
    estimatedTime: "12 min",
    summary: "Add new records to tables, perform multi-row batch inserts, and insert data from subquery results.",
    content: `
      <h2>The INSERT INTO Statement</h2>
      <p>Data is added to tables using the <code>INSERT INTO</code> statement. Always specify the target column list to protect against schema changes:</p>

      <pre><code class="language-sql">INSERT INTO employees (name, department_id, salary)
VALUES ('Sophia Loren', 2, 98000.00);</code></pre>

      <h3>Batch Multi-Row Inserts</h3>
      <p>Inserting multiple records in a single query is significantly faster than executing individual single-row inserts because it requires only a single network round-trip and transaction commit:</p>

      <pre><code class="language-sql">INSERT INTO employees (name, department_id, salary)
VALUES 
  ('David Kim', 1, 105000.00),
  ('Elena Rostova', 3, 92000.00),
  ('Tariq Mansoor', 1, 115000.00);</code></pre>

      <h3>INSERT INTO ... SELECT</h3>
      <p>You can populate a table dynamically from the results of another query:</p>
      <pre><code class="language-sql">INSERT INTO archived_employees (name, salary)
SELECT name, salary FROM employees WHERE status = 'retired';</code></pre>
    `,
    starterCode: `-- Insert a new employee:
INSERT INTO employees (name, department_id, salary)
VALUES ('Lucas Vance', 1, 112000);`,
    solutionCode: `INSERT INTO employees (name, department_id, salary) VALUES ('Lucas Vance', 1, 112000);`,
    quiz: [
      {
        question: "Why is explicit column declaration (INSERT INTO table (col1, col2)) considered best practice?",
        options: [
          "It protects queries from breaking if table column order changes or new columns are added later",
          "It is required by the JavaScript compiler",
          "It automatically encrypts table data",
          "It prevents the use of Primary Keys"
        ],
        answer: 0,
        explanation: "Declaring target columns ensures values map to intended attributes regardless of future table alterations or column reordering."
      }
    ],
    exercise: {
      instruction: "Write an <code>INSERT INTO</code> statement adding a record to <code>employees</code> with <code>name = 'Lucas Vance'</code>, <code>department_id = 1</code>, and <code>salary = 112000</code>.",
      starter: `-- Write INSERT statement:
`,
      hint: "INSERT INTO employees (name, department_id, salary) VALUES ('Lucas Vance', 1, 112000);",
      solution: `INSERT INTO employees (name, department_id, salary) VALUES ('Lucas Vance', 1, 112000);`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("INSERT INTO") && clean.includes("VALUES") && clean.includes("LUCAS VANCE") && clean.includes("112000");
      }
    }
  },

  {
    id: "s12",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "UPDATE & DELETE",
    track: "sql",
    title: "12. Data Modification 2: UPDATE & DELETE Safety",
    estimatedTime: "14 min",
    summary: "Modify existing records with UPDATE, remove records with DELETE, and avoid disaster by always guarding mutations with WHERE.",
    content: `
      <h2>Updating Records: The UPDATE Statement</h2>
      <p>The <code>UPDATE</code> statement modifies existing row values in a table:</p>

      <pre><code class="language-sql">UPDATE employees
SET salary = salary * 1.05,
    updated_at = CURRENT_TIMESTAMP
WHERE department_id = 1;</code></pre>

      <div class="callout warning">
        <strong>THE GOLDEN RULE OF MUTATION:</strong> If you omit the <code>WHERE</code> clause in an <code>UPDATE</code> or <code>DELETE</code> statement, <strong>EVERY SINGLE ROW</strong> in the entire table will be modified or deleted! Always verify your WHERE condition with a SELECT first.
      </div>

      <h3>Deleting Records: The DELETE Statement</h3>
      <pre><code class="language-sql">-- Delete specific inactive accounts:
DELETE FROM users
WHERE last_login &lt; '2023-01-01' AND status = 'inactive';</code></pre>

      <h3>TRUNCATE TABLE vs DELETE</h3>
      <p>While <code>DELETE FROM table</code> removes rows one by one and logs each removal, <code>TRUNCATE TABLE table</code> deallocates table pages instantly, resetting auto-increment sequences.</p>
    `,
    starterCode: `-- Safely increase salary for Engineering department:
UPDATE employees
SET salary = salary + 5000
WHERE department_id = 1;`,
    solutionCode: `UPDATE employees SET salary = salary * 1.10 WHERE department = 'Engineering';`,
    quiz: [
      {
        question: "What happens if you execute 'DELETE FROM employees;' without a WHERE clause?",
        options: [
          "Every single row in the employees table will be deleted",
          "The database throws a syntax error",
          "Only the first row is deleted",
          "Only rows marked as null are deleted"
        ],
        answer: 0,
        explanation: "Without a WHERE clause constraint, DELETE removes all rows from the table."
      }
    ],
    exercise: {
      instruction: "Write an <code>UPDATE</code> query that gives all employees in the <code>'Engineering'</code> department a 10% raise by setting <code>salary = salary * 1.10</code>.",
      starter: `-- Write UPDATE query:
`,
      hint: "UPDATE employees SET salary = salary * 1.10 WHERE department = 'Engineering';",
      solution: `UPDATE employees SET salary = salary * 1.10 WHERE department = 'Engineering';`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("UPDATE") && clean.includes("SET") && clean.includes("SALARY") && clean.includes("WHERE") && clean.includes("ENGINEERING");
      }
    }
  },

  // ==========================================
  // TIER 3: ADVANCED (Architecture & Engine)
  // ==========================================
  {
    id: "s13",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "DDL & Constraints",
    track: "sql",
    title: "13. Schema Definition (DDL) & Table Constraints",
    estimatedTime: "16 min",
    summary: "Define schemas with CREATE TABLE, specify data types, and enforce data integrity with NOT NULL, UNIQUE, and CHECK constraints.",
    content: `
      <h2>Data Definition Language (DDL)</h2>
      <p>DDL statements define, alter, and manage the structure of database objects:</p>

      <pre><code class="language-sql">CREATE TABLE products (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price &gt;= 0),
  stock_quantity INT DEFAULT 0 CHECK (stock_quantity &gt;= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>

      <h3>Integrity Constraints Decoded</h3>
      <ul>
        <li><code>NOT NULL</code>: Prohibits missing or unassigned values.</li>
        <li><code>UNIQUE</code>: Guarantees no two rows have matching values in this column.</li>
        <li><code>CHECK (condition)</code>: Rejects inserts/updates that violate the boolean condition.</li>
        <li><code>DEFAULT value</code>: Automatically provides a fallback value when omitted during insert.</li>
      </ul>
    `,
    starterCode: `-- Define a projects table:
CREATE TABLE projects (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  budget NUMERIC(12, 2) CHECK (budget > 0)
);`,
    solutionCode: `CREATE TABLE projects ( id INT PRIMARY KEY, name VARCHAR(100) NOT NULL, budget NUMERIC(12, 2) CHECK (budget > 0) );`,
    quiz: [
      {
        question: "What does a CHECK constraint do in a table definition?",
        options: [
          "It enforces that values entered in a column must satisfy a specified boolean condition",
          "It checks whether the user is logged in",
          "It converts text to uppercase automatically",
          "It backs up the table to cloud storage"
        ],
        answer: 0,
        explanation: "CHECK constraints validate data integrity at the database engine level (e.g. price > 0, age >= 18), rejecting any violating DML mutations."
      }
    ],
    exercise: {
      instruction: "Write a <code>CREATE TABLE projects</code> statement with: <code>id INT PRIMARY KEY</code>, <code>name VARCHAR(100) NOT NULL</code>, and <code>budget NUMERIC(12, 2) CHECK (budget &gt; 0)</code>.",
      starter: `-- Write CREATE TABLE statement:
`,
      hint: "CREATE TABLE projects ( id INT PRIMARY KEY, name VARCHAR(100) NOT NULL, budget NUMERIC(12, 2) CHECK (budget > 0) );",
      solution: `CREATE TABLE projects ( id INT PRIMARY KEY, name VARCHAR(100) NOT NULL, budget NUMERIC(12, 2) CHECK (budget > 0) );`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE TABLE") && clean.includes("PRIMARY KEY") && clean.includes("NOT NULL") && clean.includes("CHECK");
      }
    }
  },

  {
    id: "s14",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Foreign Keys",
    track: "sql",
    title: "14. Foreign Keys & Referential Integrity",
    estimatedTime: "15 min",
    summary: "Link relational entities using FOREIGN KEY REFERENCES and configure ON DELETE CASCADE / SET NULL behaviors.",
    content: `
      <h2>Referential Integrity</h2>
      <p>A <strong>Foreign Key</strong> establishes a direct relationship between a column in a child table and the Primary Key of a parent table. The database engine prevents 'orphaned' records by rejecting invalid IDs:</p>

      <pre><code class="language-sql">CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_total NUMERIC(10, 2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);</code></pre>

      <h3>Cascade Deletion Rules</h3>
      <div class="code-table">
        <div class="table-row header"><span>Option</span><span>Behavior when Parent Row is Deleted</span></div>
        <div class="table-row"><code>RESTRICT / NO ACTION</code><span>Rejects parent deletion if child records exist (Default)</span></div>
        <div class="table-row"><code>CASCADE</code><span>Automatically deletes all associated child rows</span></div>
        <div class="table-row"><code>SET NULL</code><span>Sets the foreign key column in child rows to NULL</span></div>
      </div>
    `,
    starterCode: `-- Add foreign key relationship:
CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE
);`,
    solutionCode: `CREATE TABLE order_items ( id INT PRIMARY KEY, order_id INT REFERENCES orders(id) ON DELETE CASCADE );`,
    quiz: [
      {
        question: "What happens when you delete a customer row whose orders table has 'ON DELETE CASCADE' configured?",
        options: [
          "All order records belonging to that customer are automatically deleted by the database",
          "The database rejects the customer deletion",
          "The order records have their customer_id set to 0",
          "The customer record is archived to a backup file"
        ],
        answer: 0,
        explanation: "ON DELETE CASCADE propagates parent row deletions down to all dependent child records automatically."
      }
    ],
    exercise: {
      instruction: "Write a <code>CREATE TABLE order_items</code> statement with <code>id INT PRIMARY KEY</code> and <code>order_id INT REFERENCES orders(id) ON DELETE CASCADE</code>.",
      starter: `-- Write CREATE TABLE with Foreign Key:
`,
      hint: "CREATE TABLE order_items ( id INT PRIMARY KEY, order_id INT REFERENCES orders(id) ON DELETE CASCADE );",
      solution: `CREATE TABLE order_items ( id INT PRIMARY KEY, order_id INT REFERENCES orders(id) ON DELETE CASCADE );`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE TABLE") && clean.includes("REFERENCES") && clean.includes("ON DELETE CASCADE");
      }
    }
  },

  {
    id: "s15",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Subqueries & EXISTS",
    track: "sql",
    title: "15. Subqueries: Scalar, Derived & Correlated",
    estimatedTime: "16 min",
    summary: "Nest queries inside SELECT, FROM, and WHERE clauses, and optimize existence checks using the EXISTS operator.",
    content: `
      <h2>Scalar Subqueries</h2>
      <p>A <strong>scalar subquery</strong> returns exactly one value (one row, one column) and can be used anywhere an expression is expected:</p>

      <pre><code class="language-sql">-- Find all employees earning above the company average:
SELECT name, salary
FROM employees
WHERE salary &gt; (SELECT AVG(salary) FROM employees);</code></pre>

      <h3>Derived Tables (FROM Subqueries)</h3>
      <p>A query in the <code>FROM</code> clause acts as a temporary in-memory table. It MUST always have an alias:</p>

      <pre><code class="language-sql">SELECT dept, max_sal
FROM (
  SELECT department AS dept, MAX(salary) AS max_sal
  FROM employees
  GROUP BY department
) AS dept_summary
WHERE max_sal &gt; 110000;</code></pre>

      <h3>Correlated Subqueries &amp; EXISTS</h3>
      <p>The <code>EXISTS</code> operator tests for the presence of rows. It short-circuits as soon as a single matching record is located:</p>

      <pre><code class="language-sql">SELECT c.name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o 
  WHERE o.customer_id = c.id AND o.total &gt; 500
);</code></pre>
    `,
    starterCode: `-- Find employees earning more than the company average:
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`,
    solutionCode: `SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`,
    quiz: [
      {
        question: "Why is 'WHERE EXISTS (SELECT 1 ...)' typically faster than 'WHERE column IN (SELECT ...)' for large datasets?",
        options: [
          "EXISTS short-circuits and stops scanning as soon as the first matching row is found",
          "EXISTS disables all database indexes",
          "IN cannot work with integers",
          "EXISTS runs on the client side"
        ],
        answer: 0,
        explanation: "EXISTS halts evaluation on the very first match found (short-circuiting), making it exceptionally fast for existence checks."
      }
    ],
    exercise: {
      instruction: "Write a query selecting <code>name</code> and <code>salary</code> from <code>employees</code> where <code>salary &gt; (SELECT AVG(salary) FROM employees)</code>.",
      starter: `-- Write subquery:
`,
      hint: "SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
      solution: `SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("SELECT") && clean.includes("WHERE") && clean.includes("AVG(SALARY)");
      }
    }
  },

  {
    id: "s16",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Set Operations",
    track: "sql",
    title: "16. Set Operations: UNION, INTERSECT & EXCEPT",
    estimatedTime: "15 min",
    summary: "Combine and compare independent result sets using mathematical set operations: UNION, UNION ALL, INTERSECT, and EXCEPT.",
    content: `
      <h2>Relational Set Operations</h2>
      <p>Set operations combine rows from two or more queries vertically. Both queries MUST have identical column counts and compatible data types:</p>

      <pre><code class="language-sql">-- UNION combines sets and removes duplicates (expensive distinct sort):
SELECT email FROM active_users
UNION
SELECT email FROM newsletter_subscribers;

-- UNION ALL combines sets WITHOUT deduplicating (substantially faster!):
SELECT user_id, amount FROM online_sales
UNION ALL
SELECT user_id, amount FROM retail_sales;</code></pre>

      <h3>INTERSECT &amp; EXCEPT</h3>
      <ul>
        <li><code>INTERSECT</code>: Returns only rows that exist in <strong>both</strong> queries.</li>
        <li><code>EXCEPT</code> (or <code>MINUS</code>): Returns rows from the first query that do <strong>not</strong> exist in the second query.</li>
      </ul>

      <pre><code class="language-sql">-- Customers who registered but never placed an order:
SELECT id FROM customers
EXCEPT
SELECT customer_id FROM orders;</code></pre>
    `,
    starterCode: `-- Combine customer emails with supplier emails:
SELECT email FROM customers
UNION ALL
SELECT email FROM suppliers;`,
    solutionCode: `SELECT email FROM customers UNION ALL SELECT email FROM suppliers;`,
    quiz: [
      {
        question: "What is the primary operational difference between UNION and UNION ALL?",
        options: [
          "UNION sorts and eliminates duplicate rows, whereas UNION ALL retains all records without deduplication",
          "UNION ALL is slower because it encrypts rows",
          "UNION only works with numbers",
          "UNION ALL requires table foreign keys"
        ],
        answer: 0,
        explanation: "UNION performs an expensive distinct sort to eliminate duplicates. UNION ALL simply concatenates result sets directly, making it significantly faster."
      }
    ],
    exercise: {
      instruction: "Write a query combining the <code>email</code> column from <code>customers</code> and the <code>email</code> column from <code>suppliers</code> using <code>UNION ALL</code>.",
      starter: `-- Write UNION ALL query:
`,
      hint: "SELECT email FROM customers UNION ALL SELECT email FROM suppliers;",
      solution: `SELECT email FROM customers UNION ALL SELECT email FROM suppliers;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("UNION ALL") && clean.includes("CUSTOMERS") && clean.includes("SUPPLIERS");
      }
    }
  },

  {
    id: "s17",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "ACID Transactions",
    track: "sql",
    title: "17. Database Transactions & ACID Properties",
    estimatedTime: "16 min",
    summary: "Ensure bulletproof financial and mission-critical integrity using BEGIN, COMMIT, ROLLBACK, and the ACID principles.",
    content: `
      <h2>The ACID Guarantees</h2>
      <p>Transactions bundle multiple SQL commands into a single atomic unit of work that satisfies the four ACID guarantees:</p>
      <ul>
        <li><strong>Atomicity:</strong> All-or-nothing execution. If any step fails, the entire transaction is rolled back.</li>
        <li><strong>Consistency:</strong> Moves database from one valid state to another, strictly respecting all constraints.</li>
        <li><strong>Isolation:</strong> Concurrent transactions cannot observe each other's uncommitted modifications.</li>
        <li><strong>Durability:</strong> Once committed, data persists permanently, even through power loss or crashes.</li>
      </ul>

      <h3>Transaction Control: A Bank Transfer</h3>
      <pre><code class="language-sql">BEGIN TRANSACTION;

-- Deduct from Alice
UPDATE accounts 
SET balance = balance - 250.00 
WHERE id = 101;

-- Deposit to Bob
UPDATE accounts 
SET balance = balance + 250.00 
WHERE id = 202;

-- If both succeeded:
COMMIT;

-- If an error occurred:
-- ROLLBACK;</code></pre>
    `,
    starterCode: `-- Atomic transaction structure:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
    solutionCode: `BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;`,
    quiz: [
      {
        question: "What does the 'Atomicity' guarantee in ACID transactions mean?",
        options: [
          "All statements in the transaction succeed together, or everything is completely rolled back as if nothing happened",
          "The database splits queries across atomic CPU cores",
          "Every table must have an atomic number",
          "Transactions are converted to JSON"
        ],
        answer: 0,
        explanation: "Atomicity ensures 'all-or-nothing' execution. A failure at any point triggers a rollback, preventing half-completed updates."
      }
    ],
    exercise: {
      instruction: "Write the transaction statements to transfer money: start with <code>BEGIN;</code>, debit account 1 with <code>UPDATE accounts SET balance = balance - 100 WHERE id = 1;</code>, credit account 2, and finalize with <code>COMMIT;</code>.",
      starter: `-- Write complete transaction block:
`,
      hint: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;",
      solution: `BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("BEGIN") && clean.includes("UPDATE") && clean.includes("COMMIT");
      }
    }
  },

  {
    id: "s18",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Indexing & Performance",
    track: "sql",
    title: "18. Indexes & Query Performance Fundamentals",
    estimatedTime: "18 min",
    summary: "Speed up query performance from O(N) sequential scans to O(log N) binary traversals using B-Tree and Composite Indexes.",
    content: `
      <h2>How Database Indexes Work</h2>
      <p>Without an index, finding a row requires a <strong>Sequential Scan (Table Scan)</strong>: reading every single page from disk from start to finish ($O(N)$ complexity). An index is an auxiliary data structure (typically a balanced <strong>B-Tree</strong>) that enables logarithmic lookups ($O(\\log N)$):</p>

      <pre><code class="language-sql">-- Create a single-column B-Tree index:
CREATE INDEX idx_employees_department_id 
ON employees (department_id);

-- Create a composite index for multi-column queries:
CREATE INDEX idx_orders_customer_date 
ON orders (customer_id, order_date DESC);</code></pre>

      <div class="callout warning">
        <strong>The Cost of Indexing:</strong> While indexes dramatically accelerate <code>SELECT</code> queries, they introduce write overhead on every <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> because the index tree must be updated in sync. Only index columns used frequently in <code>WHERE</code>, <code>JOIN</code>, and <code>ORDER BY</code> clauses!
      </div>
    `,
    starterCode: `-- Create an index on email lookups:
CREATE INDEX idx_users_email ON users (email);`,
    solutionCode: `CREATE INDEX idx_users_email ON users (email);`,
    quiz: [
      {
        question: "What is the primary trade-off of adding indexes to a database table?",
        options: [
          "Faster reads (SELECTs) at the expense of slower writes (INSERT/UPDATE/DELETE) and additional disk storage",
          "Faster writes but slower reads",
          "Indexes delete old table records automatically",
          "Indexes can only be used on primary keys"
        ],
        answer: 0,
        explanation: "Indexes speed up read queries by providing pre-sorted lookup structures, but every write operation must update both the table and its associated index trees."
      }
    ],
    exercise: {
      instruction: "Write a SQL statement to create an index named <code>idx_users_email</code> on the <code>email</code> column of the <code>users</code> table.",
      starter: `-- Create index statement:
`,
      hint: "CREATE INDEX idx_users_email ON users (email);",
      solution: `CREATE INDEX idx_users_email ON users (email);`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE INDEX") && clean.includes("ON") && clean.includes("USERS") && clean.includes("EMAIL");
      }
    }
  }
];

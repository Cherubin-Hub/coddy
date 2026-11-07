/**
 * Exhaustive PostgreSQL Enterprise RDBMS Curriculum (18 In-Depth Modules)
 * Tier 1: Beginner (Architecture, Advanced Data Types, RETURNING, ON CONFLICT, Arrays, Dates)
 * Tier 2: Intermediate (Window Functions, CTEs, Recursive CTEs, JSONB, Full-Text Search)
 * Tier 3: Advanced (Advanced Indexing, Materialized Views, Partitioning, MVCC/Locking, PL/pgSQL, EXPLAIN)
 */

export const postgresLessons = [
  // ==========================================
  // TIER 1: BEGINNER (Architecture & Postgres Types)
  // ==========================================
  {
    id: "p1",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Postgres Architecture",
    track: "postgresql",
    title: "1. PostgreSQL Architecture & The Object-Relational Model",
    estimatedTime: "14 min",
    summary: "Discover the multi-process architecture of PostgreSQL, shared memory buffers, schemas, system catalogs, and extensions.",
    content: `
      <h2>The World's Most Advanced Open-Source Database</h2>
      <p>PostgreSQL (or simply Postgres) is an <strong>object-relational database management system (ORDBMS)</strong> renowned for extensibility, standards compliance, and rock-solid ACID reliability.</p>

      <h3>PostgreSQL Process Architecture</h3>
      <p>Unlike databases that use a single multi-threaded process, PostgreSQL employs a <strong>process-based model</strong>:</p>
      <ul>
        <li><strong>Postmaster (Supervisor Process):</strong> Listens on port 5432 and forks a dedicated backend worker process for every connecting client.</li>
        <li><strong>Shared Memory:</strong> Shared buffer pool (caching table &amp; index pages), Write-Ahead Log (WAL) buffers, and lock management.</li>
        <li><strong>Background Workers:</strong> Checkpointer, Background Writer, WAL Writer, Autovacuum daemon, and Statistics Collector.</li>
      </ul>

      <div class="callout tip">
        <strong>Schemas: Namespaces for Tables:</strong> Postgres supports multi-tenancy within a single database through <strong>Schemas</strong>. By default, objects are created in the <code>public</code> schema, searchable via the <code>search_path</code> parameter.
      </div>
    `,
    starterCode: `-- Query PostgreSQL version and current schema:
SELECT version(), current_schema();`,
    solutionCode: `SELECT version(), current_schema();`,
    quiz: [
      {
        question: "How does PostgreSQL handle incoming client connections at the process level?",
        options: [
          "The postmaster process forks an independent backend server process for each client connection",
          "It executes everything inside a single JavaScript event loop",
          "It uses client-side localStorage",
          "It runs all queries in web workers"
        ],
        answer: 0,
        explanation: "Postgres follows a proven process-per-connection architecture where the postmaster process forks a dedicated worker process with its own private memory space for each connection."
      }
    ],
    exercise: {
      instruction: "Write a query retrieving the server version and the active schema using <code>SELECT version(), current_schema();</code>.",
      starter: `-- Query server version:
`,
      hint: "SELECT version(), current_schema();",
      solution: `SELECT version(), current_schema();`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("SELECT") && clean.includes("VERSION()") && clean.includes("CURRENT_SCHEMA()");
      }
    }
  },

  {
    id: "p2",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Rich Data Types",
    track: "postgresql",
    title: "2. Rich Data Types: UUID, Identity & Timestamps",
    estimatedTime: "15 min",
    summary: "Leverage PostgreSQL's rich type system: UUIDs, GENERATED AS IDENTITY (modern SERIAL), BOOLEAN, and TIMESTAMPTZ.",
    content: `
      <h2>Modern Primary Keys: Identity Columns &amp; UUID</h2>
      <p>For auto-incrementing numbers, legacy Postgres used <code>SERIAL</code>. Modern Postgres (v10+) conforms to SQL standard <strong>Identity Columns</strong>:</p>

      <pre><code class="language-sql">-- Standard modern auto-incrementing ID:
id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY;

-- Universally Unique Identifiers (v4 UUIDs):
CREATE TABLE accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);</code></pre>

      <div class="callout warning">
        <strong>TIMESTAMP vs TIMESTAMPTZ:</strong> Always use <code>TIMESTAMPTZ</code> (Timestamp with time zone). It converts all incoming dates to UTC internally and automatically renders in the client's local time zone on retrieval, eliminating time zone bugs.
      </div>
    `,
    starterCode: `-- Table using UUID and TIMESTAMPTZ:
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`,
    solutionCode: `CREATE TABLE users ( id UUID DEFAULT gen_random_uuid() PRIMARY KEY, email VARCHAR(255) NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() );`,
    quiz: [
      {
        question: "Why is TIMESTAMPTZ strongly recommended over plain TIMESTAMP in production databases?",
        options: [
          "TIMESTAMPTZ stores timestamps normalized to UTC and converts to the client's local timezone on display",
          "TIMESTAMP takes 3x more disk space",
          "TIMESTAMP does not support leap years",
          "TIMESTAMPTZ only works on Sundays"
        ],
        answer: 0,
        explanation: "TIMESTAMPTZ stores normalized UTC values and converts dynamically to the session time zone, avoiding date confusion across distributed global users."
      }
    ],
    exercise: {
      instruction: "Write a <code>CREATE TABLE users</code> statement with <code>id UUID DEFAULT gen_random_uuid() PRIMARY KEY</code>, <code>email VARCHAR(255) NOT NULL</code>, and <code>created_at TIMESTAMPTZ DEFAULT NOW()</code>.",
      starter: `-- Create table with UUID and TIMESTAMPTZ:
`,
      hint: "CREATE TABLE users ( id UUID DEFAULT gen_random_uuid() PRIMARY KEY, email VARCHAR(255) NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() );",
      solution: `CREATE TABLE users ( id UUID DEFAULT gen_random_uuid() PRIMARY KEY, email VARCHAR(255) NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() );`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE TABLE") && clean.includes("UUID") && clean.includes("GEN_RANDOM_UUID()") && clean.includes("TIMESTAMPTZ");
      }
    }
  },

  {
    id: "p3",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "RETURNING Clause",
    track: "postgresql",
    title: "3. The PostgreSQL RETURNING Clause",
    estimatedTime: "14 min",
    summary: "Eliminate secondary round-trip SELECT queries by returning generated IDs and computed fields directly from INSERT, UPDATE, and DELETE.",
    content: `
      <h2>Instant Mutation Feedback with RETURNING</h2>
      <p>In other SQL databases, after inserting a row with an auto-generated ID, you must execute a secondary query like <code>SELECT LAST_INSERT_ID()</code>. Postgres completely eliminates this race condition and network overhead using <code>RETURNING</code>:</p>

      <pre><code class="language-sql">-- Return the newly generated ID immediately:
INSERT INTO users (email, username)
VALUES ('maria@dev.io', 'mariadev')
RETURNING id, created_at;

-- Return old vs updated values:
UPDATE products
SET price = price * 1.15
WHERE category = 'electronics'
RETURNING id, title, price AS new_price;

-- Capture deleted rows for archiving or audit logging:
DELETE FROM sessions
WHERE expires_at &lt; NOW()
RETURNING session_token, user_id;</code></pre>
    `,
    starterCode: `-- Insert and immediately return generated values:
INSERT INTO customers (name, email)
VALUES ('Elena Clark', 'elena@example.com')
RETURNING id, created_at;`,
    solutionCode: `INSERT INTO customers (name, email) VALUES ('Elena Clark', 'elena@example.com') RETURNING id, created_at;`,
    quiz: [
      {
        question: "What major performance and architectural advantage does the RETURNING clause provide?",
        options: [
          "It eliminates the need for a secondary SELECT query to retrieve generated keys or updated data",
          "It compresses the database file on disk",
          "It sends an email notification automatically",
          "It disables ACID constraints"
        ],
        answer: 0,
        explanation: "RETURNING allows mutations to return any column or computed expression in the same network round-trip, avoiding race conditions and extra queries."
      }
    ],
    exercise: {
      instruction: "Write an <code>INSERT INTO customers (name, email)</code> query adding <code>'Elena Clark'</code> and <code>'elena@example.com'</code>, ending with <code>RETURNING id, created_at;</code>.",
      starter: `-- Write INSERT with RETURNING:
`,
      hint: "INSERT INTO customers (name, email) VALUES ('Elena Clark', 'elena@example.com') RETURNING id, created_at;",
      solution: `INSERT INTO customers (name, email) VALUES ('Elena Clark', 'elena@example.com') RETURNING id, created_at;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("INSERT INTO") && clean.includes("RETURNING") && clean.includes("ID") && clean.includes("CREATED_AT");
      }
    }
  },

  {
    id: "p4",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Upserts (ON CONFLICT)",
    track: "postgresql",
    title: "4. Upsert Operations: ON CONFLICT DO UPDATE",
    estimatedTime: "15 min",
    summary: "Handle unique constraint collisions gracefully with idempotent Upsert patterns using ON CONFLICT DO UPDATE and DO NOTHING.",
    content: `
      <h2>The Problem with Race Conditions</h2>
      <p>In high-concurrency systems, checking if a record exists before inserting (<code>SELECT then INSERT</code>) suffers from race conditions where two threads try to insert simultaneously. Postgres solves this with native atomic <strong>Upserts</strong>:</p>

      <pre><code class="language-sql">-- Idempotent insert: silently ignore duplicate emails
INSERT INTO subscribers (email)
VALUES ('dev@domain.com')
ON CONFLICT (email) DO NOTHING;

-- Upsert: update existing count if record already exists
INSERT INTO page_views (page_url, view_count)
VALUES ('/docs/postgres', 1)
ON CONFLICT (page_url) DO UPDATE
SET view_count = page_views.view_count + 1,
    last_visited = NOW();</code></pre>

      <div class="callout tip">
        <strong>The EXCLUDED Pseudo-Table:</strong> In the <code>DO UPDATE</code> clause, Postgres provides a virtual table named <code>EXCLUDED</code> representing the values you originally attempted to insert.
      </div>
    `,
    starterCode: `-- Upsert query handling duplicate username:
INSERT INTO users (username, login_count)
VALUES ('johndoe', 1)
ON CONFLICT (username) DO UPDATE
SET login_count = users.login_count + 1;`,
    solutionCode: `INSERT INTO users (username, login_count) VALUES ('johndoe', 1) ON CONFLICT (username) DO UPDATE SET login_count = users.login_count + 1;`,
    quiz: [
      {
        question: "What does the EXCLUDED pseudo-table represent in a Postgres ON CONFLICT DO UPDATE clause?",
        options: [
          "The proposed row values that were rejected by the unique constraint collision",
          "Rows that were permanently deleted",
          "Rows with syntax errors",
          "Uncommitted transactions"
        ],
        answer: 0,
        explanation: "EXCLUDED holds the values submitted in the INSERT statement that triggered the conflict, allowing you to reference them in the update assignment."
      }
    ],
    exercise: {
      instruction: "Write an upsert statement inserting <code>('johndoe', 1)</code> into <code>users (username, login_count)</code> with <code>ON CONFLICT (username) DO UPDATE SET login_count = users.login_count + 1;</code>.",
      starter: `-- Write ON CONFLICT statement:
`,
      hint: "INSERT INTO users (username, login_count) VALUES ('johndoe', 1) ON CONFLICT (username) DO UPDATE SET login_count = users.login_count + 1;",
      solution: `INSERT INTO users (username, login_count) VALUES ('johndoe', 1) ON CONFLICT (username) DO UPDATE SET login_count = users.login_count + 1;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("ON CONFLICT") && clean.includes("DO UPDATE") && clean.includes("LOGIN_COUNT");
      }
    }
  },

  {
    id: "p5",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Postgres Arrays",
    track: "postgresql",
    title: "5. Native Array Types & Aggregation Functions",
    estimatedTime: "15 min",
    summary: "Store lists directly inside columns with TEXT[] and INT[], query elements with ANY, and aggregate rows with array_agg and string_agg.",
    content: `
      <h2>Native Multidimensional Arrays</h2>
      <p>Unlike most SQL dialects, Postgres natively supports storing array data types directly within single columns without needing a separate junction table for small tag collections:</p>

      <pre><code class="language-sql">CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(200),
  tags TEXT[] -- Array of strings!
);

-- Inserting array values:
INSERT INTO articles (id, title, tags)
VALUES (1, 'Postgres Magic', ARRAY['database', 'sql', 'backend']);</code></pre>

      <h3>Querying and Aggregating Arrays</h3>
      <pre><code class="language-sql">-- Check if array contains an element:
SELECT title FROM articles WHERE 'sql' = ANY(tags);

-- Aggregate multiple rows into a single array list:
SELECT department, array_agg(name) AS staff_members
FROM employees
GROUP BY department;

-- String aggregation with custom separator:
SELECT department, string_agg(name, ', ') AS staff_names
FROM employees
GROUP BY department;</code></pre>
    `,
    starterCode: `-- Filter articles containing the 'backend' tag:
SELECT title, tags
FROM articles
WHERE 'backend' = ANY(tags);`,
    solutionCode: `SELECT department, array_agg(name) AS staff_list FROM employees GROUP BY department;`,
    quiz: [
      {
        question: "How do you check if a scalar value exists inside a Postgres array column?",
        options: [
          "Using '= ANY(column_name)' or the containment operator '@>'",
          "Using array.includes()",
          "Using the LIKE operator",
          "Arrays cannot be searched in Postgres"
        ],
        answer: 0,
        explanation: "value = ANY(array_col) or array_col @> ARRAY[value] are the native Postgres operators for checking array element existence."
      }
    ],
    exercise: {
      instruction: "Write a query grouping by <code>department</code> from <code>employees</code> and aggregating employee names into a native array aliased as <code>staff_list</code> using <code>array_agg(name)</code>.",
      starter: `-- Write array_agg query:
`,
      hint: "SELECT department, array_agg(name) AS staff_list FROM employees GROUP BY department;",
      solution: `SELECT department, array_agg(name) AS staff_list FROM employees GROUP BY department;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("ARRAY_AGG(NAME)") && clean.includes("GROUP BY") && clean.includes("STAFF_LIST");
      }
    }
  },

  {
    id: "p6",
    tier: "beginner",
    tierLabel: "Beginner",
    badge: "Date & Interval Math",
    track: "postgresql",
    title: "6. Date, Time & Interval Mathematics",
    estimatedTime: "14 min",
    summary: "Perform rich chronological arithmetic using INTERVAL, compute exact duration with AGE, and truncate timestamps with date_trunc.",
    content: `
      <h2>The INTERVAL Data Type</h2>
      <p>Postgres features the most comprehensive time manipulation engine in the industry via the <code>INTERVAL</code> type:</p>

      <pre><code class="language-sql">-- Relative date arithmetic:
SELECT NOW() + INTERVAL '30 days';
SELECT NOW() - INTERVAL '3 hours 15 minutes';

-- Find active trials:
SELECT user_id FROM subscriptions
WHERE trial_start &gt;= NOW() - INTERVAL '14 days';</code></pre>

      <h3>Temporal Bucketing with date_trunc</h3>
      <p>Grouping timestamps into hourly, daily, or monthly buckets is essential for analytics:</p>

      <pre><code class="language-sql">SELECT 
  date_trunc('month', created_at) AS signup_month,
  COUNT(*) AS new_users
FROM users
GROUP BY date_trunc('month', created_at)
ORDER BY signup_month ASC;</code></pre>

      <h3>Exact Durations with AGE()</h3>
      <pre><code class="language-sql">SELECT name, AGE(NOW(), hire_date) AS tenure FROM employees;</code></pre>
    `,
    starterCode: `-- Query signups from the past 7 days:
SELECT id, email, created_at
FROM users
WHERE created_at >= NOW() - INTERVAL '7 days';`,
    solutionCode: `SELECT id, email, created_at FROM users WHERE created_at >= NOW() - INTERVAL '7 days';`,
    quiz: [
      {
        question: "What is the purpose of the date_trunc('month', timestamp) function in analytics queries?",
        options: [
          "It rounds or truncates the timestamp down to the first day of that month (e.g. 2026-11-01 00:00:00) for group aggregation",
          "It deletes all rows older than one month",
          "It converts the date into a Unix epoch integer",
          "It formats the month as a Spanish string"
        ],
        answer: 0,
        explanation: "date_trunc sets all time components smaller than the specified precision (e.g. day, hour, minute) to zero, allowing clean GROUP BY time buckets."
      }
    ],
    exercise: {
      instruction: "Write a query selecting <code>id</code>, <code>email</code>, and <code>created_at</code> from <code>users</code> for records created in the last 7 days: <code>WHERE created_at &gt;= NOW() - INTERVAL '7 days';</code>.",
      starter: `-- Write INTERVAL query:
`,
      hint: "SELECT id, email, created_at FROM users WHERE created_at >= NOW() - INTERVAL '7 days';",
      solution: `SELECT id, email, created_at FROM users WHERE created_at >= NOW() - INTERVAL '7 days';`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("NOW()") && clean.includes("INTERVAL") && clean.includes("7 DAYS");
      }
    }
  },

  // ==========================================
  // TIER 2: INTERMEDIATE (Window Functions & CTEs)
  // ==========================================
  {
    id: "p7",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Window Functions 1",
    track: "postgresql",
    title: "7. Window Functions: OVER & PARTITION BY",
    estimatedTime: "16 min",
    summary: "Perform calculations across related sets of rows without collapsing records into a single group using the OVER clause.",
    content: `
      <h2>The Superpower of Window Functions</h2>
      <p>A standard <code>GROUP BY</code> collapses individual rows into a single summary record. In contrast, <strong>Window Functions</strong> compute aggregate values while preserving individual row identities:</p>

      <pre><code class="language-sql">SELECT 
  name,
  department,
  salary,
  -- Calculate average salary of the employee's department without collapsing!
  AVG(salary) OVER(PARTITION BY department) AS dept_avg_salary,
  -- Compare employee salary against department average:
  salary - AVG(salary) OVER(PARTITION BY department) AS diff_from_avg
FROM employees;</code></pre>

      <h3>Running Totals &amp; Cumulative Sums</h3>
      <p>Adding an <code>ORDER BY</code> inside the <code>OVER()</code> clause computes running totals:</p>

      <pre><code class="language-sql">SELECT 
  order_date,
  amount,
  SUM(amount) OVER(ORDER BY order_date ASC) AS running_revenue_total
FROM orders;</code></pre>
    `,
    starterCode: `-- Compute department average alongside each employee:
SELECT 
  name, 
  department, 
  salary,
  AVG(salary) OVER(PARTITION BY department) AS dept_avg
FROM employees;`,
    solutionCode: `SELECT name, department, salary, AVG(salary) OVER(PARTITION BY department) AS dept_avg FROM employees;`,
    quiz: [
      {
        question: "How does a Window Function differ fundamentally from a GROUP BY aggregation?",
        options: [
          "Window functions calculate aggregated metrics across row subsets without collapsing rows into a single record",
          "Window functions only run on Windows operating systems",
          "Window functions cannot be used with numbers",
          "Window functions require deleting table indexes"
        ],
        answer: 0,
        explanation: "Window functions preserve row-level detail while calculating partitions and running metrics across designated frames."
      }
    ],
    exercise: {
      instruction: "Select <code>name</code>, <code>department</code>, <code>salary</code>, and the department average salary as <code>dept_avg</code> using <code>AVG(salary) OVER(PARTITION BY department)</code> from <code>employees</code>.",
      starter: `-- Write Window Function query:
`,
      hint: "SELECT name, department, salary, AVG(salary) OVER(PARTITION BY department) AS dept_avg FROM employees;",
      solution: `SELECT name, department, salary, AVG(salary) OVER(PARTITION BY department) AS dept_avg FROM employees;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("OVER") && clean.includes("PARTITION BY") && clean.includes("DEPARTMENT");
      }
    }
  },

  {
    id: "p8",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Ranking & Offset Functions",
    track: "postgresql",
    title: "8. Analytical Functions: ROW_NUMBER, RANK, LEAD & LAG",
    estimatedTime: "16 min",
    summary: "Rank rows within partitions, detect top earners, and compare period-over-period growth with LEAD and LAG.",
    content: `
      <h2>Ranking Window Functions</h2>
      <ul>
        <li><code>ROW_NUMBER()</code>: Assigns a unique sequential integer ($1, 2, 3$) to each row in the partition.</li>
        <li><code>RANK()</code>: Assigns ranks with gaps on ties ($1, 2, 2, 4$).</li>
        <li><code>DENSE_RANK()</code>: Assigns ranks without gaps on ties ($1, 2, 2, 3$).</li>
      </ul>

      <pre><code class="language-sql">-- Find the top 3 highest earners per department:
WITH ranked_employees AS (
  SELECT 
    name, department, salary,
    DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) as rank_in_dept
  FROM employees
)
SELECT * FROM ranked_employees WHERE rank_in_dept &lt;= 3;</code></pre>

      <h3>Offset Functions: LEAD &amp; LAG</h3>
      <p><code>LAG()</code> accesses data from the previous row; <code>LEAD()</code> accesses data from the following row:</p>

      <pre><code class="language-sql">-- Compute month-over-month revenue growth:
SELECT 
  month,
  revenue,
  LAG(revenue, 1) OVER(ORDER BY month) AS prev_month_revenue,
  revenue - LAG(revenue, 1) OVER(ORDER BY month) AS mom_growth
FROM monthly_sales;</code></pre>
    `,
    starterCode: `-- Rank employees by salary within each department:
SELECT 
  name, 
  department, 
  salary,
  DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;`,
    solutionCode: `SELECT name, department, salary, DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_rank FROM employees;`,
    quiz: [
      {
        question: "If two employees tie for 1st place in salary, what will DENSE_RANK assign to the 3rd employee?",
        options: [
          "2",
          "3",
          "0",
          "NULL"
        ],
        answer: 0,
        explanation: "DENSE_RANK never skips ranking numbers: ties result in 1, 1, 2. Regular RANK() would have skipped to 3 (1, 1, 3)."
      }
    ],
    exercise: {
      instruction: "Select <code>name</code>, <code>department</code>, <code>salary</code>, and rank employees by salary within their department as <code>dept_rank</code> using <code>DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC)</code>.",
      starter: `-- Write DENSE_RANK query:
`,
      hint: "SELECT name, department, salary, DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_rank FROM employees;",
      solution: `SELECT name, department, salary, DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_rank FROM employees;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("DENSE_RANK()") && clean.includes("PARTITION BY") && clean.includes("ORDER BY SALARY DESC");
      }
    }
  },

  {
    id: "p9",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Common Table Expressions",
    track: "postgresql",
    title: "9. Common Table Expressions (WITH CTEs)",
    estimatedTime: "15 min",
    summary: "Transform messy nested subqueries into readable, maintainable, modular SQL pipelines using the WITH keyword.",
    content: `
      <h2>Modular SQL with CTEs</h2>
      <p>A <strong>Common Table Expression (CTE)</strong> is a named temporary result set defined at the beginning of a query with <code>WITH</code>. It replaces unreadable deeply-nested subqueries with sequential, readable pipelines:</p>

      <pre><code class="language-sql">WITH dept_metrics AS (
  SELECT 
    department_id,
    COUNT(*) AS total_staff,
    AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department_id
),
high_budget_depts AS (
  SELECT department_id FROM dept_metrics WHERE avg_sal &gt; 90000
)
SELECT d.name, m.total_staff, m.avg_sal
FROM departments d
JOIN dept_metrics m ON d.id = m.department_id
WHERE d.id IN (SELECT department_id FROM high_budget_depts);</code></pre>

      <div class="callout tip">
        <strong>Materialized CTEs in Postgres 12+:</strong> Postgres can automatically inline CTEs for optimizer flexibility or materialize them explicitly with <code>WITH my_cte AS MATERIALIZED (...)</code> when beneficial.
      </div>
    `,
    starterCode: `-- Modular query with WITH:
WITH engineering_staff AS (
  SELECT * FROM employees WHERE department = 'Engineering'
)
SELECT name, salary FROM engineering_staff WHERE salary > 95000;`,
    solutionCode: `WITH high_earners AS ( SELECT * FROM employees WHERE salary > 90000 ) SELECT name, salary, department FROM high_earners ORDER BY salary DESC;`,
    quiz: [
      {
        question: "What is the primary readability and architectural advantage of CTEs (WITH) over nested subqueries?",
        options: [
          "They structure queries sequentially from top to bottom like variables in procedural code, making complex logic easy to read and debug",
          "They automatically convert relational tables into MongoDB collections",
          "They disable all foreign key constraints",
          "They are only allowed in MySQL"
        ],
        answer: 0,
        explanation: "CTEs define named pipeline stages that can be referenced multiple times, dramatically simplifying complex query maintenance."
      }
    ],
    exercise: {
      instruction: "Write a query starting with <code>WITH high_earners AS (SELECT * FROM employees WHERE salary &gt; 90000)</code> and then <code>SELECT name, salary, department FROM high_earners ORDER BY salary DESC;</code>.",
      starter: `-- Write CTE query:
`,
      hint: "WITH high_earners AS ( SELECT * FROM employees WHERE salary > 90000 ) SELECT name, salary, department FROM high_earners ORDER BY salary DESC;",
      solution: `WITH high_earners AS ( SELECT * FROM employees WHERE salary > 90000 ) SELECT name, salary, department FROM high_earners ORDER BY salary DESC;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("WITH HIGH_EARNERS AS") && clean.includes("SELECT") && clean.includes("ORDER BY SALARY DESC");
      }
    }
  },

  {
    id: "p10",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Recursive Queries",
    track: "postgresql",
    title: "10. Recursive CTEs: Trees, Graphs & Hierarchies",
    estimatedTime: "18 min",
    summary: "Traverse organizational charts, bill-of-materials, threaded discussions, and graphs using WITH RECURSIVE.",
    content: `
      <h2>The Mechanics of Recursive CTEs</h2>
      <p>Hierarchical data (e.g. employee manager trees, comment reply threads, folder directories) cannot be traversed with static joins because the depth is unknown. <code>WITH RECURSIVE</code> solves this:</p>

      <pre><code class="language-sql">WITH RECURSIVE org_chart AS (
  -- 1. ANCHOR MEMBER: Find root node (CEO with no manager)
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- 2. RECURSIVE MEMBER: Find direct reports of previous level
  SELECT e.id, e.name, e.manager_id, o.level + 1
  FROM employees e
  INNER JOIN org_chart o ON e.manager_id = o.id
)
SELECT * FROM org_chart ORDER BY level, name;</code></pre>

      <div class="callout warning">
        <strong>Termination Condition:</strong> A recursive CTE keeps executing until the recursive term produces zero new rows. Always verify your join predicates to prevent infinite loops!
      </div>
    `,
    starterCode: `-- Generate a sequence from 1 to 10 recursively:
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT n FROM numbers;`,
    solutionCode: `WITH RECURSIVE numbers AS ( SELECT 1 AS n UNION ALL SELECT n + 1 FROM numbers WHERE n < 10 ) SELECT n FROM numbers;`,
    quiz: [
      {
        question: "What are the two mandatory components that form a PostgreSQL recursive CTE?",
        options: [
          "An Anchor Member (base query) and a Recursive Member combined by UNION ALL",
          "A JavaScript loop and a callback function",
          "A PRIMARY KEY and a FOREIGN KEY",
          "Two separate databases"
        ],
        answer: 0,
        explanation: "A recursive CTE requires an Anchor Member providing the initial seeds and a Recursive Member that repeatedly references the CTE until returning an empty set."
      }
    ],
    exercise: {
      instruction: "Write a recursive query generating numbers 1 through 10: <code>WITH RECURSIVE numbers AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM numbers WHERE n &lt; 10) SELECT n FROM numbers;</code>.",
      starter: `-- Write recursive query:
`,
      hint: "WITH RECURSIVE numbers AS ( SELECT 1 AS n UNION ALL SELECT n + 1 FROM numbers WHERE n < 10 ) SELECT n FROM numbers;",
      solution: `WITH RECURSIVE numbers AS ( SELECT 1 AS n UNION ALL SELECT n + 1 FROM numbers WHERE n < 10 ) SELECT n FROM numbers;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("WITH RECURSIVE") && clean.includes("UNION ALL") && clean.includes("WHERE N < 10");
      }
    }
  },

  {
    id: "p11",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "JSON & JSONB",
    track: "postgresql",
    title: "11. JSON & JSONB: NoSQL Power Inside Relational Tables",
    estimatedTime: "16 min",
    summary: "Query unstructured document data with binary JSONB, extract fields with -> and ->>, and filter with the @> containment operator.",
    content: `
      <h2>JSON vs JSONB in Postgres</h2>
      <ul>
        <li><code>JSON</code>: Stores raw text. Fast ingestion, slow querying (must re-parse text on every lookup).</li>
        <li><code>JSONB</code>: Deconstructed binary format. Slight ingestion overhead, but blazingly fast querying with full GIN indexing support. <strong>Always choose JSONB!</strong></li>
      </ul>

      <h3>Key JSONB Operators</h3>
      <div class="code-table">
        <div class="table-row header"><span>Operator</span><span>Output Type</span><span>Description</span></div>
        <div class="table-row"><code>-&gt;</code><span>JSON / JSONB</span><span>Extracts object field by key (as JSON)</span></div>
        <div class="table-row"><code>-&gt;&gt;</code><span>TEXT</span><span>Extracts object field by key as pure text</span></div>
        <div class="table-row"><code>#&gt;&gt;</code><span>TEXT</span><span>Extracts nested path (e.g. <code>'{address, city}'</code>)</span></div>
        <div class="table-row"><code>@&gt;</code><span>BOOLEAN</span><span>Does left JSONB contain right JSONB?</span></div>
      </div>

      <pre><code class="language-sql">-- Query metadata column stored as JSONB:
SELECT title, metadata-&gt;&gt;'author' AS author
FROM documents
WHERE metadata @&gt; '{"published": true, "tags": ["postgres"]}';</code></pre>
    `,
    starterCode: `-- Query JSONB attributes:
SELECT 
  id,
  metadata->>'role' AS user_role,
  metadata->'settings'->>'theme' AS ui_theme
FROM user_profiles;`,
    solutionCode: `SELECT id, profile->>'email' AS user_email FROM user_profiles WHERE profile @> '{"verified": true}';`,
    quiz: [
      {
        question: "What is the crucial difference between the '->' operator and the '->>' operator in Postgres JSON queries?",
        options: [
          "'->' returns JSONB data, whereas '->>' extracts the value as plain text",
          "'->' is faster than '->>'",
          "'->>' only works on integers",
          "There is no difference"
        ],
        answer: 0,
        explanation: "-> retains the JSON wrapper so you can chain further lookups. ->> unquotes and casts the target value directly to a SQL text string."
      }
    ],
    exercise: {
      instruction: "Write a query selecting <code>id</code> and extracting <code>profile-&gt;&gt;'email' AS user_email</code> from <code>user_profiles</code> where the JSONB profile satisfies <code>profile @&gt; '{\"verified\": true}'</code>.",
      starter: `-- Query JSONB column:
`,
      hint: "SELECT id, profile->>'email' AS user_email FROM user_profiles WHERE profile @> '{\"verified\": true}';",
      solution: `SELECT id, profile->>'email' AS user_email FROM user_profiles WHERE profile @> '{"verified": true}';`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("PROFILE->>'EMAIL'") && clean.includes("@>") && clean.includes("VERIFIED");
      }
    }
  },

  {
    id: "p12",
    tier: "intermediate",
    tierLabel: "Intermediate",
    badge: "Full-Text Search",
    track: "postgresql",
    title: "12. Full-Text Search: tsvector & tsquery",
    estimatedTime: "16 min",
    summary: "Build search engines inside PostgreSQL with stemming, lexemes, stop-word removal, and relevance ranking using to_tsvector.",
    content: `
      <h2>Beyond LIKE '%term%'</h2>
      <p>Using <code>LIKE '%keyword%'</code> forces full table scans and cannot handle stemming (e.g. matching 'running' when searching for 'run'). Postgres includes a dedicated, indexed <strong>Full-Text Search (FTS)</strong> engine:</p>

      <h3>Core FTS Components</h3>
      <ul>
        <li><code>tsvector</code>: A sorted list of distinct normalized words (lexemes) with position weights.</li>
        <li><code>tsquery</code>: Search terms combined with boolean operators (<code>&amp;</code> AND, <code>|</code> OR, <code>!</code> NOT).</li>
        <li><code>@@</code>: The text-search match operator.</li>
      </ul>

      <pre><code class="language-sql">-- Search blog posts for 'postgres' AND 'database':
SELECT title, ts_rank(to_tsvector('english', content), query) AS score
FROM articles, to_tsquery('english', 'postgres &amp; database') query
WHERE to_tsvector('english', content) @@ query
ORDER BY score DESC;</code></pre>
    `,
    starterCode: `-- Execute full text match:
SELECT id, title
FROM posts
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'performance & optimization');`,
    solutionCode: `SELECT id, title FROM posts WHERE to_tsvector('english', body) @@ to_tsquery('english', 'sql & database');`,
    quiz: [
      {
        question: "What does the to_tsvector function do when processing text?",
        options: [
          "It strips stop-words (like 'the', 'a'), stems words to base lexemes ('running' -> 'run'), and indexes positions",
          "It translates the text into French",
          "It encrypts the text with AES-256",
          "It deletes punctuation marks only"
        ],
        answer: 0,
        explanation: "to_tsvector converts raw prose into an indexed vector of normalized lexemes with stop-words removed, ready for fast matching."
      }
    ],
    exercise: {
      instruction: "Write a query selecting <code>id</code> and <code>title</code> from <code>posts</code> matching <code>to_tsvector('english', body) @@ to_tsquery('english', 'sql &amp; database');</code>.",
      starter: `-- Write full-text search query:
`,
      hint: "SELECT id, title FROM posts WHERE to_tsvector('english', body) @@ to_tsquery('english', 'sql & database');",
      solution: `SELECT id, title FROM posts WHERE to_tsvector('english', body) @@ to_tsquery('english', 'sql & database');`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("TO_TSVECTOR") && clean.includes("@@") && clean.includes("TO_TSQUERY");
      }
    }
  },

  // ==========================================
  // TIER 3: ADVANCED (Internal Architecture)
  // ==========================================
  {
    id: "p13",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Advanced Indexing",
    track: "postgresql",
    title: "13. Advanced Indexing: GIN, BRIN & Partial Indexes",
    estimatedTime: "18 min",
    summary: "Select the optimal index algorithm for your workload: GIN for JSONB/arrays, BRIN for massive time-series tables, and Partial Indexes for low storage.",
    content: `
      <h2>Beyond Standard B-Trees</h2>
      <p>Standard B-Trees excel at scalar lookups (<code>=</code>, <code>&lt;</code>, <code>&gt;</code>), but Postgres supports specialized indexing structures for specific data models:</p>

      <h3>1. Generalized Inverted Index (GIN)</h3>
      <p>Ideal for multi-valued fields like <code>JSONB</code>, full-text <code>tsvector</code>, and arrays where one row contains many searchable elements:</p>
      <pre><code class="language-sql">CREATE INDEX idx_products_metadata ON products USING GIN (metadata);</code></pre>

      <h3>2. Block Range Index (BRIN)</h3>
      <p>Ideal for multi-billion row time-series tables ordered physically on disk (e.g. audit logs, IoT data). Stores min/max values per physical block range. <strong>Takes 99% less disk space</strong> than B-Tree!</p>
      <pre><code class="language-sql">CREATE INDEX idx_logs_timestamp ON audit_logs USING BRIN (created_at);</code></pre>

      <h3>3. Partial &amp; Expression Indexes</h3>
      <pre><code class="language-sql">-- Only index active users (saves memory and write penalty):
CREATE INDEX idx_active_users_email ON users (email) WHERE is_active = TRUE;

-- Case-insensitive lookup index:
CREATE INDEX idx_lower_email ON users (LOWER(email));</code></pre>
    `,
    starterCode: `-- Create a GIN index on a JSONB column:
CREATE INDEX idx_orders_payload ON orders USING GIN (payload);`,
    solutionCode: `CREATE INDEX idx_orders_payload ON orders USING GIN (payload);`,
    quiz: [
      {
        question: "When should you prefer a BRIN index over a standard B-Tree index in PostgreSQL?",
        options: [
          "For enormous tables where values correlate strongly with their physical storage order on disk (such as append-only time-series data)",
          "For tables with fewer than 5 rows",
          "For random UUID primary keys",
          "When you want to disable disk caching"
        ],
        answer: 0,
        explanation: "BRIN indexes store only min/max ranges per disk page block. For naturally sorted tables (like chronological logs), they provide fast scanning with microscopic index footprints."
      }
    ],
    exercise: {
      instruction: "Write a SQL statement creating a GIN index named <code>idx_orders_payload</code> on the <code>payload</code> column of the <code>orders</code> table: <code>CREATE INDEX idx_orders_payload ON orders USING GIN (payload);</code>.",
      starter: `-- Create GIN index:
`,
      hint: "CREATE INDEX idx_orders_payload ON orders USING GIN (payload);",
      solution: `CREATE INDEX idx_orders_payload ON orders USING GIN (payload);`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE INDEX") && clean.includes("USING GIN") && clean.includes("PAYLOAD");
      }
    }
  },

  {
    id: "p14",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Materialized Views",
    track: "postgresql",
    title: "14. Views & Materialized Views",
    estimatedTime: "16 min",
    summary: "Precompute heavy reporting queries with Materialized Views and update them without blocking reads using REFRESH CONCURRENTLY.",
    content: `
      <h2>Standard Views vs Materialized Views</h2>
      <ul>
        <li><strong>Standard View (CREATE VIEW):</strong> A saved query shortcut. Every time you query the view, the underlying SQL query re-executes. Zero disk storage, but slow for heavy aggregations.</li>
        <li><strong>Materialized View (CREATE MATERIALIZED VIEW):</strong> Executes the query and <em>physically saves the snapshot of results to disk</em>. Queries against it run instantly!</li>
      </ul>

      <pre><code class="language-sql">CREATE MATERIALIZED VIEW monthly_financial_summary AS
SELECT 
  date_trunc('month', o.order_date) AS order_month,
  d.name AS department,
  COUNT(o.id) AS total_orders,
  SUM(o.total_amount) AS revenue
FROM orders o
JOIN departments d ON o.dept_id = d.id
GROUP BY 1, 2;

-- Refresh the snapshot when data changes:
REFRESH MATERIALIZED VIEW monthly_financial_summary;

-- Non-blocking background refresh (requires a UNIQUE index on the view!):
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_financial_summary;</code></pre>
    `,
    starterCode: `-- Define a materialized view for executive summaries:
CREATE MATERIALIZED VIEW sales_summary AS
SELECT department, SUM(sales) as total_revenue
FROM sales_records
GROUP BY department;`,
    solutionCode: `CREATE MATERIALIZED VIEW sales_summary AS SELECT department, SUM(sales) as total_revenue FROM sales_records GROUP BY department;`,
    quiz: [
      {
        question: "What requirement must be met before executing 'REFRESH MATERIALIZED VIEW CONCURRENTLY'?",
        options: [
          "The materialized view must have at least one UNIQUE index",
          "The database must be restarted in single-user mode",
          "All tables must be converted to unlogged tables",
          "No clients can be connected"
        ],
        answer: 0,
        explanation: "CONCURRENTLY requires a UNIQUE index on the materialized view so Postgres can diff and update rows in place without acquiring exclusive table locks."
      }
    ],
    exercise: {
      instruction: "Write a statement creating a materialized view: <code>CREATE MATERIALIZED VIEW sales_summary AS SELECT department, SUM(sales) as total_revenue FROM sales_records GROUP BY department;</code>.",
      starter: `-- Write CREATE MATERIALIZED VIEW:
`,
      hint: "CREATE MATERIALIZED VIEW sales_summary AS SELECT department, SUM(sales) as total_revenue FROM sales_records GROUP BY department;",
      solution: `CREATE MATERIALIZED VIEW sales_summary AS SELECT department, SUM(sales) as total_revenue FROM sales_records GROUP BY department;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE MATERIALIZED VIEW") && clean.includes("SALES_SUMMARY") && clean.includes("GROUP BY");
      }
    }
  },

  {
    id: "p15",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Table Partitioning",
    track: "postgresql",
    title: "15. Declarative Table Partitioning",
    estimatedTime: "18 min",
    summary: "Split multi-terabyte tables into manageable physical partitions by Range, List, or Hash to boost query performance through partition pruning.",
    content: `
      <h2>Declarative Partitioning</h2>
      <p>When a table grows to tens or hundreds of millions of rows, index sizes exceed available RAM and maintenance operations slow to a crawl. Partitioning breaks one logical table into smaller physical child tables:</p>

      <pre><code class="language-sql">-- 1. Create partitioned parent table
CREATE TABLE sensor_readings (
  sensor_id INT NOT NULL,
  reading_time TIMESTAMPTZ NOT NULL,
  temperature NUMERIC(5, 2)
) PARTITION BY RANGE (reading_time);

-- 2. Create child partition tables for specific ranges
CREATE TABLE sensor_readings_2026_q1 
PARTITION OF sensor_readings
FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2026-04-01 00:00:00+00');

CREATE TABLE sensor_readings_2026_q2 
PARTITION OF sensor_readings
FOR VALUES FROM ('2026-04-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');</code></pre>

      <div class="callout tip">
        <strong>Partition Pruning:</strong> When you query with <code>WHERE reading_time &gt;= '2026-02-01' AND reading_time &lt; '2026-03-01'</code>, the Postgres query planner scans <em>only</em> the Q1 partition and completely ignores all other partitions!
      </div>
    `,
    starterCode: `-- Partition a log table by range:
CREATE TABLE logs (
  id INT,
  log_date DATE NOT NULL
) PARTITION BY RANGE (log_date);`,
    solutionCode: `CREATE TABLE logs ( id INT, log_date DATE NOT NULL ) PARTITION BY RANGE (log_date);`,
    quiz: [
      {
        question: "What is 'partition pruning' in PostgreSQL?",
        options: [
          "The query optimizer dynamically skips reading partition tables whose bounds cannot satisfy the query's WHERE clause",
          "A command that deletes partitions older than 1 year",
          "A tool to compress image columns",
          "A cron job that resets auto-increment keys"
        ],
        answer: 0,
        explanation: "Partition pruning allows the query executor to bypass unneeded child tables entirely based on query conditions, drastically reducing disk I/O."
      }
    ],
    exercise: {
      instruction: "Write a statement creating a partitioned parent table: <code>CREATE TABLE logs ( id INT, log_date DATE NOT NULL ) PARTITION BY RANGE (log_date);</code>.",
      starter: `-- Write partitioned table definition:
`,
      hint: "CREATE TABLE logs ( id INT, log_date DATE NOT NULL ) PARTITION BY RANGE (log_date);",
      solution: `CREATE TABLE logs ( id INT, log_date DATE NOT NULL ) PARTITION BY RANGE (log_date);`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE TABLE LOGS") && clean.includes("PARTITION BY RANGE");
      }
    }
  },

  {
    id: "p16",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "Concurrency & MVCC",
    track: "postgresql",
    title: "16. Concurrency Control, MVCC & Row-Level Locking",
    estimatedTime: "18 min",
    summary: "Master Multi-Version Concurrency Control (MVCC), transaction isolation levels, and explicit pessimistic locking with FOR UPDATE and SKIP LOCKED.",
    content: `
      <h2>How MVCC Eliminates Read/Write Contention</h2>
      <p>In legacy databases, readers block writers and writers block readers. Postgres uses <strong>Multi-Version Concurrency Control (MVCC)</strong>: "Readers never block writers, and writers never block readers."</p>
      <ul>
        <li>When a row is updated, Postgres does not overwrite it on disk. It writes a <em>new row version</em> (tuple) with updated <code>xmin</code> and <code>xmax</code> transaction IDs.</li>
        <li>Active queries read the snapshot corresponding to their transaction start time.</li>
        <li>The <code>VACUUM</code> process cleans up dead tuples that are no longer visible to any active transaction.</li>
      </ul>

      <h3>Pessimistic Row Locking: FOR UPDATE &amp; SKIP LOCKED</h3>
      <p>When implementing concurrent job queues or reservation systems (e.g. reserving ticket seats), use row locking to prevent double-booking:</p>

      <pre><code class="language-sql">-- Atomically claim one pending job without race conditions or thread blocking:
SELECT id, payload
FROM job_queue
WHERE status = 'pending'
ORDER BY priority DESC
LIMIT 1
FOR UPDATE SKIP LOCKED; -- Locks the row, skips rows already locked by peer workers!</code></pre>
    `,
    starterCode: `-- Atomically claim job with FOR UPDATE:
SELECT * FROM jobs 
WHERE status = 'pending' 
LIMIT 1 
FOR UPDATE SKIP LOCKED;`,
    solutionCode: `SELECT * FROM jobs WHERE status = 'pending' LIMIT 1 FOR UPDATE SKIP LOCKED;`,
    quiz: [
      {
        question: "Why is 'FOR UPDATE SKIP LOCKED' the gold standard for high-throughput background queue workers in Postgres?",
        options: [
          "It locks the selected row while allowing concurrent worker threads to bypass it immediately without waiting or throwing lock timeouts",
          "It doubles CPU clock speeds",
          "It stores queue messages directly in Redis",
          "It disables transaction rollbacks"
        ],
        answer: 0,
        explanation: "SKIP LOCKED allows concurrent workers to process queue items in parallel without blocking each other on locked rows."
      }
    ],
    exercise: {
      instruction: "Write a query selecting from <code>jobs</code> with <code>WHERE status = 'pending' LIMIT 1 FOR UPDATE SKIP LOCKED;</code> to atomically lock a job record.",
      starter: `-- Write row-level locking query:
`,
      hint: "SELECT * FROM jobs WHERE status = 'pending' LIMIT 1 FOR UPDATE SKIP LOCKED;",
      solution: `SELECT * FROM jobs WHERE status = 'pending' LIMIT 1 FOR UPDATE SKIP LOCKED;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("FOR UPDATE") && clean.includes("SKIP LOCKED");
      }
    }
  },

  {
    id: "p17",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "PL/pgSQL & Triggers",
    track: "postgresql",
    title: "17. Stored Functions & Triggers (PL/pgSQL)",
    estimatedTime: "18 min",
    summary: "Write server-side procedural logic in PL/pgSQL and automate audit trails, data formatting, and event handlers with database Triggers.",
    content: `
      <h2>Procedural SQL: PL/pgSQL</h2>
      <p><code>PL/pgSQL</code> is PostgreSQL's built-in procedural language supporting control structures, loops, variables, and exception handling:</p>

      <pre><code class="language-sql">CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;</code></pre>

      <h3>Binding Functions to Table Triggers</h3>
      <p>Triggers automatically invoke a function before or after table mutation events (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>):</p>

      <pre><code class="language-sql">CREATE TRIGGER set_timestamp_on_update
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();</code></pre>

      <div class="callout tip">
        <strong>NEW and OLD Records:</strong> Inside a trigger function, <code>NEW</code> represents the row state being inserted/updated, while <code>OLD</code> represents the pre-mutation row state.
      </div>
    `,
    starterCode: `-- Trigger function to auto-update timestamp:
CREATE OR REPLACE FUNCTION sync_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`,
    solutionCode: `CREATE OR REPLACE FUNCTION sync_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;`,
    quiz: [
      {
        question: "What do the special variables NEW and OLD represent inside a PL/pgSQL trigger function?",
        options: [
          "NEW is the proposed state for INSERT/UPDATE; OLD is the existing state before UPDATE/DELETE",
          "NEW is the current timestamp; OLD is the server boot time",
          "NEW and OLD are JavaScript global variables",
          "They refer to primary keys only"
        ],
        answer: 0,
        explanation: "NEW holds the newly supplied row data during INSERT or UPDATE. OLD holds the pre-existing row data during UPDATE or DELETE."
      }
    ],
    exercise: {
      instruction: "Write the PL/pgSQL function: <code>CREATE OR REPLACE FUNCTION sync_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;</code>.",
      starter: `-- Write PL/pgSQL function:
`,
      hint: "CREATE OR REPLACE FUNCTION sync_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;",
      solution: `CREATE OR REPLACE FUNCTION sync_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("CREATE OR REPLACE FUNCTION") && clean.includes("RETURNS TRIGGER") && clean.includes("LANGUAGE PLPGSQL");
      }
    }
  },

  {
    id: "p18",
    tier: "advanced",
    tierLabel: "Advanced",
    badge: "EXPLAIN ANALYZE",
    track: "postgresql",
    title: "18. Performance Optimization & EXPLAIN ANALYZE",
    estimatedTime: "20 min",
    summary: "Inspect query execution plans, diagnose slow sequential scans, evaluate buffer hits, and master EXPLAIN (ANALYZE, BUFFERS).",
    content: `
      <h2>The Cost-Based Query Planner</h2>
      <p>Before executing any query, the Postgres query planner evaluates potential join orders and access paths, choosing the plan with the lowest estimated <strong>cost</strong>:</p>

      <pre><code class="language-sql">-- Estimate plan without running:
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;

-- Actually run query and measure exact millisecond timings & buffer hits:
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT * FROM orders WHERE customer_id = 42;</code></pre>

      <h3>Reading an Execution Plan</h3>
      <ul>
        <li><strong>Seq Scan:</strong> Scanning every table row sequentially on disk. Acceptable for small tables; disaster for multi-million row tables!</li>
        <li><strong>Index Scan:</strong> B-Tree lookup finding row pointers, then fetching table heap pages.</li>
        <li><strong>Index Only Scan:</strong> The Holy Grail! All requested columns reside directly in the index, skipping table heap page reads entirely.</li>
        <li><strong>Shared Hit Blocks:</strong> Pages found in memory buffer cache (fast). <strong>Read Blocks:</strong> Pages read from physical disk (slow).</li>
      </ul>
    `,
    starterCode: `-- Inspect execution plan with exact runtime timings:
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM employees WHERE department = 'Engineering';`,
    solutionCode: `EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM employees WHERE department = 'Engineering';`,
    quiz: [
      {
        question: "What is the critical difference between 'EXPLAIN' and 'EXPLAIN ANALYZE' in PostgreSQL?",
        options: [
          "EXPLAIN only generates theoretical cost estimates without running the query; EXPLAIN ANALYZE actually executes the query and measures true execution timings",
          "EXPLAIN ANALYZE is for MySQL only",
          "EXPLAIN writes data to disk",
          "EXPLAIN ANALYZE deletes table indexes"
        ],
        answer: 0,
        explanation: "EXPLAIN produces optimizer estimates without running. EXPLAIN ANALYZE executes the query, recording actual wall-clock durations and buffer cache stats."
      }
    ],
    exercise: {
      instruction: "Write an execution inspection query: <code>EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM employees WHERE department = 'Engineering';</code>.",
      starter: `-- Write EXPLAIN ANALYZE statement:
`,
      hint: "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM employees WHERE department = 'Engineering';",
      solution: `EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM employees WHERE department = 'Engineering';`,
      validate: (code) => {
        const clean = code.toUpperCase();
        return clean.includes("EXPLAIN") && clean.includes("ANALYZE") && clean.includes("BUFFERS");
      }
    }
  }
];

/**
 * Coddy.tech Style Code Playground, Multi-Test Suite & Live Preview
 */
import { transpileTypeScript, runSandboxedCode, executeSqlQuery } from "./utils/compiler.js";
import { appState } from "./state.js";
import { fireConfetti } from "./utils/helpers.js";

class CoddyEditorEngine {
  constructor() {
    this.monacoLoaded = false;
    this.currentEditor = null;
    this.activeOutputTab = "tests"; // "tests" | "console" | "preview"
    this.initMonaco();
  }

  initMonaco() {
    if (typeof window.monaco !== "undefined") {
      this.monacoLoaded = true;
      return;
    }
    if (window.require && typeof window.require === "function") {
      window.require.config({
        paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs" }
      });
      window.require(["vs/editor/editor.main"], () => {
        this.monacoLoaded = true;
      });
    }
  }

  mountEditor(containerEl, initialCode, language = "typescript", onRunShortcut) {
    if (!containerEl) return null;
    containerEl.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "code-editor-wrapper";

    const textarea = document.createElement("textarea");
    textarea.className = "fallback-code-input";
    textarea.value = initialCode || "";
    textarea.spellcheck = false;
    textarea.autocapitalize = "off";
    textarea.autocomplete = "off";

    textarea.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (onRunShortcut) onRunShortcut();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "  " + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }
    });

    wrapper.appendChild(textarea);
    containerEl.appendChild(wrapper);

    let monacoEditor = null;
    if (window.monaco) {
      try {
        textarea.style.display = "none";
        monacoEditor = window.monaco.editor.create(wrapper, {
          value: initialCode || "",
          language: language === "html" ? "html" : language === "css" ? "css" : language === "javascript" ? "javascript" : "typescript",
          theme: appState.get().theme === "dark" ? "vs-dark" : "vs",
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 12, bottom: 12 }
        });

        monacoEditor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter, () => {
          if (onRunShortcut) onRunShortcut();
        });
      } catch (e) {
        textarea.style.display = "block";
      }
    }

    this.currentEditor = {
      getValue: () => monacoEditor ? monacoEditor.getValue() : textarea.value,
      setValue: (code) => {
        if (monacoEditor) monacoEditor.setValue(code);
        else textarea.value = code;
      }
    };

    return this.currentEditor;
  }

  renderVisualPreview(iframeEl, code, language) {
    let fullHtml = code;
    if (language === "css" && !code.includes("<html") && !code.includes("<body")) {
      fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; color: #1e293b; background: #ffffff; }
            ${code}
          </style>
        </head>
        <body>
          <div class="card">Sample Card Element</div>
          <button class="btn">Sample Button</button>
        </body>
        </html>
      `;
    }
    iframeEl.srcdoc = fullHtml;
  }

  async runTestSuite(lesson, code, onAllTestsPassed) {
    const isVisual = lesson.track === "html" || lesson.track === "css";
    const isSql = lesson.track === "sql" || lesson.track === "postgresql";
    const language = lesson.track || "typescript";

    appState.recordAttempt(lesson.id);

    const testResults = [];
    const startTime = performance.now();
    let logs = [];
    let sqlResult = null;

    if (isSql) {
      // Execute SQL query
      sqlResult = executeSqlQuery(code);
      logs.push({
        level: sqlResult.success ? "info" : "error",
        message: sqlResult.message || (sqlResult.success ? "Query executed" : sqlResult.error),
        time: new Date().toLocaleTimeString()
      });

      // Test 1: Query Execution & Syntax Check
      testResults.push({
        name: "Test 1: SQL statement parses and executes without syntax errors",
        passed: sqlResult.success,
        duration: sqlResult.executionTime,
        expected: "Valid SQL statement",
        received: sqlResult.success ? `Executed successfully (${sqlResult.rowCount} rows)` : sqlResult.error
      });

      // Test 2: Challenge Validation
      let challengePassed = false;
      if (lesson.exercise && lesson.exercise.validate) {
        try {
          challengePassed = lesson.exercise.validate(code);
        } catch (e) {
          challengePassed = false;
        }
      } else {
        challengePassed = true;
      }

      testResults.push({
        name: "Test 2: Meets challenge query requirements & clauses",
        passed: challengePassed,
        duration: "1ms",
        expected: lesson.exercise ? lesson.exercise.hint : "Satisfies challenge constraints",
        received: challengePassed ? "All criteria satisfied ✓" : "Criteria not yet met"
      });
    } else {
      // Transpile if TS
      let executableJs = code;
      let transpileError = null;
      if (language === "typescript") {
        const transpileRes = transpileTypeScript(code);
        if (!transpileRes.success) {
          transpileError = transpileRes.error;
        } else {
          executableJs = transpileRes.jsCode;
        }
      }

      // Run in sandbox console
      const sandboxResult = await runSandboxedCode(executableJs);
      logs = sandboxResult.logs;

      if (transpileError) {
        testResults.push({
          name: "Compilation & Syntax Check",
          passed: false,
          duration: "0ms",
          expected: "Clean TypeScript compilation without errors",
          received: transpileError
        });
      } else {
        // Test 1: Syntax / Runtime Execution
        testResults.push({
          name: "Test 1: Code compiles & executes without uncaught runtime errors",
          passed: sandboxResult.success,
          duration: `${Math.round(performance.now() - startTime)}ms`,
          expected: "No uncaught runtime errors",
          received: sandboxResult.error ? `Runtime Error: ${sandboxResult.error}` : "Executed cleanly"
        });

        // Test 2: Lesson challenge validation rule
        let challengePassed = false;
        if (lesson.exercise && lesson.exercise.validate) {
          try {
            challengePassed = lesson.exercise.validate(code);
          } catch (e) {
            challengePassed = false;
          }
        } else {
          challengePassed = true;
        }

        testResults.push({
          name: "Test 2: Meets all requirements & constraints specified in the challenge",
          passed: challengePassed,
          duration: `${Math.round(performance.now() - startTime + 2)}ms`,
          expected: lesson.exercise ? lesson.exercise.hint : "Satisfies challenge constraints",
          received: challengePassed ? "All criteria satisfied ✓" : "Criteria not yet met"
        });
      }
    }

    const allPassed = testResults.every(t => t.passed);

    if (allPassed) {
      const result = appState.completeLessonChallenge(lesson.id);
      fireConfetti();
      if (onAllTestsPassed) onAllTestsPassed(result);
    }

    return {
      allPassed,
      testResults,
      logs,
      sqlResult,
      code
    };
  }
}

export const coddyEditor = new CoddyEditorEngine();

/**
 * Mount Coddy-style Live Workspace in container
 */
export function mountCoddyWorkspace(lesson, container, onContinueNextLesson) {
  if (!container || !lesson) return;
  const isVisual = lesson.track === "html" || lesson.track === "css";
  const isSql = lesson.track === "sql" || lesson.track === "postgresql";
  const language = lesson.track || "typescript";

  const fileExtensions = {
    html: "index.html",
    css: "styles.css",
    javascript: "main.js",
    typescript: "solution.ts",
    sql: "query.sql",
    postgresql: "database.sql"
  };
  const fileName = fileExtensions[language] || "solution.ts";

  const initialCode = lesson.exercise?.starter || lesson.starterCode || "// Write your code here\n";

  container.innerHTML = `
    <div class="coddy-workspace-root">
      <!-- Top File & Action Bar -->
      <div class="coddy-editor-header">
        <div class="editor-file-tab">
          <span class="file-icon">${language === "html" ? "📄" : language === "css" ? "🎨" : language === "javascript" ? "⚡" : language === "sql" ? "🗄️" : language === "postgresql" ? "🐘" : "🔮"}</span>
          <span class="file-name">${fileName}</span>
        </div>
        <div class="editor-header-actions">
          <button class="btn btn-sm btn-secondary" id="btn-coddy-reset" title="Reset to original code">↺ Reset</button>
          <button class="btn btn-sm btn-secondary" id="btn-coddy-solution" title="Reveal solution (XP penalty)">💡 Solution</button>
          <button class="btn btn-sm btn-primary btn-run-pulse" id="btn-coddy-run" title="Run & Test (Ctrl+Enter)">
            ▶ Run Code &amp; Test
          </button>
        </div>
      </div>

      <!-- Main Code Editor Area -->
      <div class="coddy-editor-pane" id="coddy-editor-mount"></div>

      <!-- Output Drawer (Tabs: Test Cases | Console | Visual Preview | SQL Results) -->
      <div class="coddy-output-panel">
        <div class="output-tabs-bar">
          <button class="output-tab-btn active" data-tab="tests">
            🧪 Test Cases <span class="test-status-pill" id="test-summary-pill">Ready</span>
          </button>
          ${isSql ? `
            <button class="output-tab-btn" data-tab="sql-results">
              📊 Table Results <span class="badge-count" id="sql-rows-count">0 rows</span>
            </button>
          ` : ''}
          <button class="output-tab-btn" data-tab="console">
            💻 Console <span class="badge-count" id="console-logs-count">0</span>
          </button>
          ${isVisual ? `
            <button class="output-tab-btn" data-tab="preview">
              🌐 Visual Preview
            </button>
          ` : ''}
        </div>

        <div class="output-content-area">
          <!-- Tab 1: Test Cases Output -->
          <div class="output-view-tab active" id="view-tests">
            <div class="tests-list" id="tests-list-container">
              <div class="test-empty-notice">
                <span>Click <strong>▶ Run Code &amp; Test</strong> or press <kbd>Ctrl+Enter</kbd> to evaluate your code against the test suite.</span>
              </div>
            </div>
          </div>

          <!-- Tab 2: SQL Tabular Results (for SQL/Postgres) -->
          ${isSql ? `
            <div class="output-view-tab" id="view-sql-results">
              <div class="sql-results-wrapper" id="coddy-sql-results">
                <div class="sql-empty-notice">Click <strong>▶ Run Code &amp; Test</strong> to execute your query and view result tables.</div>
              </div>
            </div>
          ` : ''}

          <!-- Tab 3: Console Output -->
          <div class="output-view-tab" id="view-console">
            <div class="virtual-console-log" id="coddy-console-log">
              <div class="console-empty">Console is ready. Output from execution will appear here.</div>
            </div>
          </div>

          <!-- Tab 4: Visual Preview (for HTML/CSS) -->
          ${isVisual ? `
            <div class="output-view-tab" id="view-preview">
              <iframe id="coddy-preview-frame" sandbox="allow-scripts allow-modals" class="coddy-iframe"></iframe>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  const editorMount = container.querySelector("#coddy-editor-mount");
  const runBtn = container.querySelector("#btn-coddy-run");
  const resetBtn = container.querySelector("#btn-coddy-reset");
  const solutionBtn = container.querySelector("#btn-coddy-solution");
  const testsList = container.querySelector("#tests-list-container");
  const testPill = container.querySelector("#test-summary-pill");
  const consoleLog = container.querySelector("#coddy-console-log");
  const consoleCount = container.querySelector("#console-logs-count");

  // Output Tab switching
  const tabBtns = container.querySelectorAll(".output-tab-btn");
  const tabViews = container.querySelectorAll(".output-view-tab");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.toggle("active", b === btn));
      tabViews.forEach(v => v.classList.toggle("active", v.id === `view-${target}`));
    });
  });

  const editor = coddyEditor.mountEditor(editorMount, initialCode, language, () => runBtn.click());

  // Initial preview for visual tracks
  if (isVisual) {
    const previewIframe = container.querySelector("#coddy-preview-frame");
    if (previewIframe) coddyEditor.renderVisualPreview(previewIframe, initialCode, language);
  }

  // Reset button
  resetBtn?.addEventListener("click", () => {
    editor?.setValue(initialCode);
    if (isVisual) {
      const previewIframe = container.querySelector("#coddy-preview-frame");
      if (previewIframe) coddyEditor.renderVisualPreview(previewIframe, initialCode, language);
    }
  });

  // Solution button
  solutionBtn?.addEventListener("click", () => {
    const sol = lesson.exercise?.solution || lesson.solutionCode;
    if (sol) {
      appState.markSolutionViewed(lesson.id);
      editor?.setValue(sol);
      if (isVisual) {
        const previewIframe = container.querySelector("#coddy-preview-frame");
        if (previewIframe) coddyEditor.renderVisualPreview(previewIframe, sol, language);
      }
    }
  });

  // Run Code & Test Suite
  runBtn?.addEventListener("click", async () => {
    const code = editor ? editor.getValue() : initialCode;
    runBtn.disabled = true;
    runBtn.innerHTML = `⚙️ Evaluating...`;

    // Render visual preview if applicable
    if (isVisual) {
      const previewIframe = container.querySelector("#coddy-preview-frame");
      if (previewIframe) coddyEditor.renderVisualPreview(previewIframe, code, language);
    }

    const res = await coddyEditor.runTestSuite(lesson, code, (reward) => {
      if (onContinueNextLesson) onContinueNextLesson(reward);
    });

    runBtn.disabled = false;
    runBtn.innerHTML = `▶ Run Code &amp; Test`;

    // Render Test Cases
    testPill.textContent = res.allPassed ? "✓ Passed" : "✗ Failed";
    testPill.className = `test-status-pill ${res.allPassed ? 'passed' : 'failed'}`;

    testsList.innerHTML = res.testResults.map((t, idx) => `
      <div class="test-case-card ${t.passed ? 'test-passed' : 'test-failed'}">
        <div class="test-header">
          <span class="test-badge">${t.passed ? '✓ PASSED' : '✗ FAILED'}</span>
          <span class="test-name">${t.name}</span>
          <span class="test-duration">${t.duration}</span>
        </div>
        ${!t.passed ? `
          <div class="test-diff-box">
            <div class="diff-line expected"><span class="diff-label">Expected:</span> ${t.expected}</div>
            <div class="diff-line received"><span class="diff-label">Your Output:</span> ${t.received}</div>
          </div>
        ` : ''}
      </div>
    `).join('');

    // Switch to tests tab automatically
    container.querySelector('.output-tab-btn[data-tab="tests"]')?.click();

    // Render SQL Results if applicable
    if (isSql) {
      const sqlResultsContainer = container.querySelector("#coddy-sql-results");
      const sqlRowsCount = container.querySelector("#sql-rows-count");
      if (sqlResultsContainer && res.sqlResult) {
        if (sqlRowsCount) sqlRowsCount.textContent = `${res.sqlResult.rowCount} row${res.sqlResult.rowCount === 1 ? '' : 's'}`;
        if (res.sqlResult.columns && res.sqlResult.columns.length > 0) {
          sqlResultsContainer.innerHTML = `
            <div class="sql-results-meta">
              <span>⚡ Execution: <strong>${res.sqlResult.executionTime}</strong></span>
              <span>📊 Returned <strong>${res.sqlResult.rowCount}</strong> row${res.sqlResult.rowCount === 1 ? '' : 's'}</span>
            </div>
            <div class="sql-table-scroll">
              <table class="sql-results-table">
                <thead><tr>${res.sqlResult.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
                <tbody>
                  ${res.sqlResult.rows.map(r => `<tr>${r.map(val => `<td>${val !== null && val !== undefined ? val : '<span class="null-val">NULL</span>'}</td>`).join('')}</tr>`).join('')}
                </tbody>
              </table>
            </div>
          `;
        } else {
          sqlResultsContainer.innerHTML = `
            <div class="sql-results-meta">
              <span>⚡ Execution: <strong>${res.sqlResult.executionTime}</strong></span>
              <span>ℹ️ Query executed successfully (0 rows returned or DDL/DML statement)</span>
            </div>
          `;
        }
      }
    }

    // Render Console Logs
    consoleCount.textContent = res.logs.length;
    if (res.logs.length > 0) {
      consoleLog.innerHTML = res.logs.map(l => `
        <div class="console-item ${l.level}">
          <span class="console-badge">${l.level.toUpperCase()}</span>
          <span class="console-time">${l.time}</span>
          <pre class="console-msg">${l.message}</pre>
        </div>
      `).join('');
    } else {
      consoleLog.innerHTML = `<div class="console-empty">Code ran with 0 console logs.</div>`;
    }
  });
}

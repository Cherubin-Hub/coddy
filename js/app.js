/**
 * Coddy.tech Style Interactive Learning Controller
 */

import { htmlLessons } from "./data/htmlLessons.js";
import { cssLessons } from "./data/cssLessons.js";
import { jsLessons } from "./data/jsLessons.js";
import { sqlLessons } from "./data/sqlLessons.js";
import { postgresLessons } from "./data/postgresLessons.js";
import { beginnerLessons } from "./data/beginnerLessons.js";
import { intermediateLessons } from "./data/intermediateLessons.js";
import { advancedLessons } from "./data/advancedLessons.js";
import { cheatSheetData } from "./data/cheatsheet.js";
import { appState } from "./state.js";
import { mountCoddyWorkspace } from "./editor.js";
import { escapeHtml, fireConfetti } from "./utils/helpers.js";

// Combine TypeScript curriculum
const tsLessons = [
  ...beginnerLessons.map(l => ({ ...l, track: "typescript" })),
  ...intermediateLessons.map(l => ({ ...l, track: "typescript" })),
  ...advancedLessons.map(l => ({ ...l, track: "typescript" }))
];

const TRACKS = {
  html: {
    id: "html",
    name: "HTML5",
    fullName: "HTML5 & Web Semantics",
    icon: "📄",
    lessons: htmlLessons,
    defaultLessonId: "h1"
  },
  css: {
    id: "css",
    name: "CSS3",
    fullName: "Modern CSS3 & Layouts",
    icon: "🎨",
    lessons: cssLessons,
    defaultLessonId: "c1"
  },
  javascript: {
    id: "javascript",
    name: "JavaScript",
    fullName: "Modern JavaScript (ES6+)",
    icon: "⚡",
    lessons: jsLessons,
    defaultLessonId: "j1"
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    fullName: "TypeScript Mastery (Zero to Pro)",
    icon: "🔮",
    lessons: tsLessons,
    defaultLessonId: "b1"
  },
  sql: {
    id: "sql",
    name: "SQL",
    fullName: "ANSI SQL & Relational Databases",
    icon: "🗄️",
    lessons: sqlLessons,
    defaultLessonId: "s1"
  },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    fullName: "PostgreSQL Enterprise Engineering",
    icon: "🐘",
    lessons: postgresLessons,
    defaultLessonId: "p1"
  }
};

class CoddyApp {
  constructor() {
    this.currentTrack = null;
    this.lessons = [];
    this.currentLesson = null;
    this.currentStep = 1; // 1: Theory, 2: Quiz, 3: Challenge, 4: Completed

    this.initElements();
    this.bindEvents();

    this.applyTheme(appState.get().theme);
    this.applyFontSize(appState.get().fontSize || "md");

    // Check saved track or prompt
    const savedTrackId = appState.get().activeTrack;
    if (savedTrackId && TRACKS[savedTrackId]) {
      this.switchTrack(savedTrackId, false);
    } else {
      this.openTrackPickerModal();
      this.switchTrack("html", false);
    }

    appState.subscribe(() => {
      this.updateHeaderStats();
    });
  }

  initElements() {
    this.instructionsPane = document.getElementById("coddy-instructions-pane");
    this.editorWorkspace = document.getElementById("coddy-editor-workspace");

    // Header elements
    this.trackSwitchBtn = document.getElementById("btn-switch-track");
    this.activeTrackIcon = document.getElementById("active-track-icon");
    this.activeTrackName = document.getElementById("active-track-name");
    this.streakCounter = document.getElementById("streak-counter");
    this.statsXp = document.getElementById("stats-xp");
    this.statsProgress = document.getElementById("stats-progress");
    this.statsBarFill = document.getElementById("stats-bar-fill");
    this.badgeCount = document.getElementById("header-badge-count");

    // Modals
    this.roadmapModal = document.getElementById("roadmap-modal");
    this.trackPickerModal = document.getElementById("track-picker-modal");
    this.badgesModal = document.getElementById("badges-modal");
    this.certModal = document.getElementById("cert-modal");
    this.cheatDrawer = document.getElementById("cheatsheet-drawer");

    // Controls
    this.themeToggleBtn = document.getElementById("btn-theme-toggle");
    this.fontSizeBtn = document.getElementById("btn-font-size");
  }

  bindEvents() {
    // Theme toggle
    this.themeToggleBtn?.addEventListener("click", () => {
      const nextTheme = appState.get().theme === "dark" ? "light" : "dark";
      this.applyTheme(nextTheme);
    });

    // Font size
    this.fontSizeBtn?.addEventListener("click", () => {
      const current = appState.get().fontSize || "md";
      const next = current === "sm" ? "md" : current === "md" ? "lg" : "sm";
      this.applyFontSize(next);
    });

    // Track switcher button
    this.trackSwitchBtn?.addEventListener("click", () => {
      this.openTrackPickerModal();
    });
    document.getElementById("btn-close-track-picker")?.addEventListener("click", () => {
      this.trackPickerModal.classList.add("hidden");
    });

    // Cards in Track Picker
    document.querySelectorAll(".track-pick-card").forEach(card => {
      card.addEventListener("click", () => {
        const trackId = card.dataset.track;
        if (trackId && TRACKS[trackId]) {
          this.switchTrack(trackId, true);
          this.trackPickerModal.classList.add("hidden");
        }
      });
    });

    // Category Filter Tabs in Track Picker
    document.querySelectorAll(".filter-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const filter = btn.dataset.filter;
        document.querySelectorAll(".filter-tab-btn").forEach(b => b.classList.toggle("active", b === btn));
        document.querySelectorAll(".track-pick-card").forEach(card => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Roadmap button
    document.getElementById("btn-open-roadmap")?.addEventListener("click", () => {
      this.openRoadmapModal();
    });
    document.getElementById("btn-close-roadmap")?.addEventListener("click", () => {
      this.roadmapModal.classList.add("hidden");
    });

    // Cheat Sheet Drawer
    document.getElementById("btn-open-cheatsheet")?.addEventListener("click", () => {
      this.renderCheatSheet();
      this.cheatDrawer.classList.toggle("open");
    });
    document.getElementById("btn-close-cheatsheet")?.addEventListener("click", () => {
      this.cheatDrawer.classList.remove("open");
    });

    // Badges Modal
    document.getElementById("btn-open-badges")?.addEventListener("click", () => {
      this.openBadgesModal();
    });
    document.getElementById("btn-close-badges")?.addEventListener("click", () => {
      this.badgesModal.classList.add("hidden");
    });

    // Certificate Modal
    document.getElementById("btn-open-cert")?.addEventListener("click", () => {
      this.openCertModal();
    });
    document.getElementById("btn-close-cert")?.addEventListener("click", () => {
      this.certModal.classList.add("hidden");
    });

    // Print certificate
    document.getElementById("btn-print-cert")?.addEventListener("click", () => {
      window.print();
    });

    // Close on backdrop click
    window.addEventListener("click", (e) => {
      if (e.target === this.roadmapModal) this.roadmapModal.classList.add("hidden");
      if (e.target === this.trackPickerModal) this.trackPickerModal.classList.add("hidden");
      if (e.target === this.badgesModal) this.badgesModal.classList.add("hidden");
      if (e.target === this.certModal) this.certModal.classList.add("hidden");
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    appState.setTheme(theme);
    const icon = this.themeToggleBtn?.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
    if (window.monaco && window.monaco.editor && window.monaco.editor.setTheme) {
      window.monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs");
    }
  }

  applyFontSize(size) {
    document.documentElement.setAttribute("data-font-size", size);
    appState.setFontSize(size);
    if (this.fontSizeBtn) {
      const label = size === "sm" ? "A-" : size === "lg" ? "A+" : "A";
      const textEl = this.fontSizeBtn.querySelector(".font-size-text");
      if (textEl) textEl.textContent = label;
    }
  }

  openTrackPickerModal() {
    const state = appState.get();
    const currentTrackId = this.currentTrack ? this.currentTrack.id : "html";

    // Update progress bars & counts for each track card
    for (const [key, track] of Object.entries(TRACKS)) {
      const trackLessonIds = track.lessons.map(l => l.id);
      const completed = state.completedLessons.filter(id => trackLessonIds.includes(id)).length;
      const total = track.lessons.length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

      const progressEl = document.getElementById(`card-progress-${key}`);
      const pctEl = document.getElementById(`card-pct-${key}`);
      const barEl = document.getElementById(`card-bar-${key}`);
      if (progressEl) progressEl.textContent = `${completed} / ${total} Modules`;
      if (pctEl) pctEl.textContent = `${pct}%`;
      if (barEl) barEl.style.width = `${pct}%`;

      const card = document.querySelector(`.track-pick-card[data-track="${key}"]`);
      if (card) {
        card.classList.toggle("active-track", key === currentTrackId);
        const ctaBtn = card.querySelector(".track-action-btn");
        if (ctaBtn) {
          ctaBtn.textContent = key === currentTrackId ? "Current Track ✓" : (completed > 0 ? "Continue Learning ➔" : "Start Track ➔");
        }
      }
    }

    this.trackPickerModal?.classList.remove("hidden");
  }

  switchTrack(trackId, triggerFirstLesson = true) {
    const track = TRACKS[trackId];
    if (!track) return;

    this.currentTrack = track;
    this.lessons = track.lessons;

    if (this.activeTrackIcon) this.activeTrackIcon.textContent = track.icon;
    if (this.activeTrackName) this.activeTrackName.textContent = track.name;

    document.querySelectorAll(".track-pick-card").forEach(c => {
      c.classList.toggle("active-track", c.dataset.track === trackId);
    });

    const savedLessonId = appState.get().activeLessonId;
    const lessonToSelect = this.lessons.find(l => l.id === savedLessonId) ? savedLessonId : track.defaultLessonId;

    appState.setTrack(trackId, lessonToSelect);
    this.updateHeaderStats();
    this.selectLesson(lessonToSelect);
  }

  updateHeaderStats() {
    const state = appState.get();
    const trackLessonIds = this.lessons.map(l => l.id);
    const completedInTrack = state.completedLessons.filter(id => trackLessonIds.includes(id)).length;
    const totalCount = this.lessons.length;
    const percent = totalCount > 0 ? Math.round((completedInTrack / totalCount) * 100) : 0;

    if (this.streakCounter) this.streakCounter.textContent = `${state.streak || 1} Day Streak`;
    if (this.statsXp) this.statsXp.textContent = `${state.xp || 100} XP`;
    if (this.statsProgress) this.statsProgress.textContent = `${completedInTrack}/${totalCount}`;
    if (this.statsBarFill) this.statsBarFill.style.width = `${percent}%`;
    if (this.badgeCount) this.badgeCount.textContent = state.badges.length;
  }

  selectLesson(id) {
    const lesson = this.lessons.find(l => l.id === id);
    if (!lesson) return;

    this.currentLesson = lesson;
    this.currentStep = 1; // start at step 1: Theory
    appState.setActiveLesson(id);

    // Render Coddy Left Pane (Guided Stepper)
    this.renderLeftPane();

    // Render Coddy Right Pane (Editor Workspace)
    mountCoddyWorkspace(this.currentLesson, this.editorWorkspace, (reward) => {
      // Called when all test cases pass!
      this.currentStep = 4; // Completed
      this.renderLeftPane();
    });
  }

  renderLeftPane() {
    const lesson = this.currentLesson;
    if (!lesson) return;

    const isCompleted = appState.get().completedLessons.includes(lesson.id);

    let html = `
      <!-- Coddy Step Indicator -->
      <div class="coddy-stepper-header">
        <div class="stepper-track-info">
          <span class="stepper-badge">${escapeHtml(lesson.badge || lesson.tierLabel)}</span>
          <span class="stepper-time">⏱️ ${lesson.estimatedTime}</span>
        </div>

        <div class="coddy-steps-bar">
          <div class="step-node ${this.currentStep === 1 ? 'active' : this.currentStep > 1 ? 'done' : ''}" data-step="1">
            <span class="node-num">${this.currentStep > 1 ? '✓' : '1'}</span>
            <span class="node-label">Theory</span>
          </div>
          <div class="step-connector ${this.currentStep > 1 ? 'active' : ''}"></div>
          <div class="step-node ${this.currentStep === 2 ? 'active' : this.currentStep > 2 ? 'done' : ''}" data-step="2">
            <span class="node-num">${this.currentStep > 2 ? '✓' : '2'}</span>
            <span class="node-label">Quick Quiz</span>
          </div>
          <div class="step-connector ${this.currentStep > 2 ? 'active' : ''}"></div>
          <div class="step-node ${this.currentStep >= 3 ? 'active' : ''}" data-step="3">
            <span class="node-num">${isCompleted || this.currentStep === 4 ? '✓' : '3'}</span>
            <span class="node-label">Challenge</span>
          </div>
        </div>
      </div>

      <div class="coddy-step-body">
    `;

    // STEP 1: THEORY
    if (this.currentStep === 1) {
      html += `
        <div class="step-view step-theory">
          <h1 class="lesson-step-title">${escapeHtml(lesson.title)}</h1>
          <p class="lesson-step-summary">${escapeHtml(lesson.summary)}</p>

          <div class="lesson-html-content">
            ${lesson.content}
          </div>

          <div class="step-footer-actions">
            <button class="btn btn-primary btn-lg" id="btn-next-to-quiz">
              Next: Quick Quiz Check ➔
            </button>
          </div>
        </div>
      `;
    }
    // STEP 2: QUIZ
    else if (this.currentStep === 2) {
      const q = lesson.quiz && lesson.quiz[0] ? lesson.quiz[0] : null;
      if (!q) {
        // Fall straight to challenge if no quiz
        this.currentStep = 3;
        return this.renderLeftPane();
      }

      html += `
        <div class="step-view step-quiz">
          <div class="quiz-step-tag">Active Recall Check</div>
          <h2 class="quiz-step-title">${escapeHtml(q.question)}</h2>

          <div class="quiz-step-options">
            ${q.options.map((opt, idx) => `
              <label class="coddy-quiz-option" data-idx="${idx}">
                <input type="radio" name="step_quiz" value="${idx}" />
                <span class="opt-indicator"></span>
                <span class="opt-text">${escapeHtml(opt)}</span>
              </label>
            `).join('')}
          </div>

          <div class="coddy-quiz-feedback hidden" id="quiz-feedback-box">
            <div class="feedback-status" id="quiz-feedback-status"></div>
            <p class="feedback-explanation" id="quiz-feedback-explanation">${escapeHtml(q.explanation)}</p>
          </div>

          <div class="step-footer-actions">
            <button class="btn btn-secondary" id="btn-back-to-theory">← Back to Theory</button>
            <button class="btn btn-primary" id="btn-check-quiz">Check Answer</button>
            <button class="btn btn-success hidden" id="btn-next-to-challenge">Start Challenge ➔</button>
          </div>
        </div>
      `;
    }
    // STEP 3: CODE CHALLENGE (Active Coding Instructions)
    else if (this.currentStep === 3) {
      const ex = lesson.exercise || {
        instruction: "Review and experiment with the code in the live editor on the right, then run tests.",
        hint: "Follow the requirements described in the lesson."
      };

      html += `
        <div class="step-view step-challenge">
          <div class="challenge-step-badge">Hands-On Practice</div>
          <h2 class="challenge-step-title">Coding Challenge</h2>

          <div class="challenge-task-card">
            <div class="task-card-header">🎯 Objective:</div>
            <div class="task-card-body">${escapeHtml(ex.instruction)}</div>
          </div>

          <div class="challenge-callout-instructions">
            <div class="callout-icon">💡</div>
            <div class="callout-text">
              Write your code in the editor on the right, then click <strong>▶ Run Code &amp; Test</strong> (or press <kbd>Ctrl+Enter</kbd>) to verify your solution.
            </div>
          </div>

          <!-- Progressive Hint Box -->
          <div class="coddy-hint-box">
            <button class="btn btn-link btn-sm" id="btn-toggle-coddy-hint">
              <span>🤖</span> Need a hint? Click here
            </button>
            <div class="hint-body hidden" id="coddy-hint-body">
              ${escapeHtml(ex.hint)}
            </div>
          </div>

          <div class="step-footer-actions">
            <button class="btn btn-secondary btn-sm" id="btn-back-to-theory-from-challenge">
              ← Review Theory
            </button>
          </div>
        </div>
      `;
    }
    // STEP 4: COMPLETED CELEBRATION
    else if (this.currentStep === 4) {
      const nextIndex = this.lessons.findIndex(l => l.id === lesson.id) + 1;
      const nextLesson = nextIndex < this.lessons.length ? this.lessons[nextIndex] : null;

      html += `
        <div class="step-view step-completed">
          <div class="celebration-hero">
            <div class="trophy-bounce">🏆</div>
            <h2>Challenge Mastered!</h2>
            <p>You solved all test cases cleanly.</p>

            <div class="reward-pill-row">
              <div class="reward-tag xp">+50 XP Earned</div>
              <div class="reward-tag streak">🔥 Streak Protected</div>
            </div>
          </div>

          <div class="completed-next-action">
            ${nextLesson ? `
              <div class="next-up-preview">
                <span class="next-label">Next Up:</span>
                <span class="next-title">${escapeHtml(nextLesson.title)}</span>
              </div>
              <button class="btn btn-success btn-lg btn-next-lesson" id="btn-proceed-next-lesson">
                Continue to Next Lesson ➔
              </button>
            ` : `
              <div class="track-completed-banner">
                🎉 Congratulations! You have completed all modules in this track!
              </div>
              <button class="btn btn-primary btn-lg" id="btn-claim-cert">
                🎓 Claim Your Certificate
              </button>
            `}
          </div>
        </div>
      `;
    }

    html += `</div>`; // end step-body

    this.instructionsPane.innerHTML = html;
    this.bindLeftPaneEvents();
  }

  bindLeftPaneEvents() {
    const pane = this.instructionsPane;
    const lesson = this.currentLesson;

    // Step 1 -> Step 2
    pane.querySelector("#btn-next-to-quiz")?.addEventListener("click", () => {
      this.currentStep = 2;
      this.renderLeftPane();
    });

    // Step 2 -> Step 1
    pane.querySelector("#btn-back-to-theory")?.addEventListener("click", () => {
      this.currentStep = 1;
      this.renderLeftPane();
    });

    // Quiz Check
    const checkQuizBtn = pane.querySelector("#btn-check-quiz");
    const nextToChallengeBtn = pane.querySelector("#btn-next-to-challenge");
    const feedbackBox = pane.querySelector("#quiz-feedback-box");
    const statusEl = pane.querySelector("#quiz-feedback-status");

    checkQuizBtn?.addEventListener("click", () => {
      const selected = pane.querySelector('input[name="step_quiz"]:checked');
      if (!selected) return;

      const q = lesson.quiz[0];
      const userChoice = parseInt(selected.value, 10);
      const isCorrect = userChoice === q.answer;

      feedbackBox.classList.remove("hidden");

      if (isCorrect) {
        statusEl.innerHTML = `<span class="badge-success">✓ Correct! Excellent active recall.</span>`;
        checkQuizBtn.classList.add("hidden");
        nextToChallengeBtn.classList.remove("hidden");
        appState.recordQuizScore(lesson.id, 1, 1);
        fireConfetti();
      } else {
        statusEl.innerHTML = `<span class="badge-error">✗ Not quite right. Review the explanation below:</span>`;
      }

      pane.querySelectorAll(".coddy-quiz-option").forEach((opt, idx) => {
        if (idx === q.answer) opt.classList.add("opt-correct");
        else if (idx === userChoice && !isCorrect) opt.classList.add("opt-wrong");
      });
    });

    nextToChallengeBtn?.addEventListener("click", () => {
      this.currentStep = 3; // Challenge
      this.renderLeftPane();
    });

    // Step 3 Back
    pane.querySelector("#btn-back-to-theory-from-challenge")?.addEventListener("click", () => {
      this.currentStep = 1;
      this.renderLeftPane();
    });

    // Hint toggle
    const hintBtn = pane.querySelector("#btn-toggle-coddy-hint");
    const hintBody = pane.querySelector("#coddy-hint-body");
    hintBtn?.addEventListener("click", () => {
      hintBody.classList.toggle("hidden");
    });

    // Step 4 Next Lesson
    pane.querySelector("#btn-proceed-next-lesson")?.addEventListener("click", () => {
      const nextIndex = this.lessons.findIndex(l => l.id === lesson.id) + 1;
      if (nextIndex < this.lessons.length) {
        this.selectLesson(this.lessons[nextIndex].id);
      }
    });

    pane.querySelector("#btn-claim-cert")?.addEventListener("click", () => {
      this.openCertModal();
    });

    // Allow clicking completed stepper nodes
    pane.querySelectorAll(".step-node.done, .step-node.active").forEach(node => {
      node.addEventListener("click", () => {
        const targetStep = parseInt(node.dataset.step, 10);
        if (targetStep && targetStep !== this.currentStep) {
          this.currentStep = targetStep;
          this.renderLeftPane();
        }
      });
    });
  }

  openRoadmapModal() {
    const listContainer = document.getElementById("roadmap-nodes-list");
    const state = appState.get();

    document.getElementById("roadmap-track-icon").textContent = this.currentTrack.icon;
    document.getElementById("roadmap-track-title").textContent = `${this.currentTrack.fullName} Roadmap`;

    listContainer.innerHTML = this.lessons.map((l, idx) => {
      const isCompleted = state.completedLessons.includes(l.id);
      const isCurrent = this.currentLesson?.id === l.id;

      return `
        <div class="roadmap-card ${isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming'}" data-id="${l.id}">
          <div class="roadmap-badge-col">
            <div class="roadmap-node-circle">
              ${isCompleted ? '✓' : isCurrent ? '⚡' : idx + 1}
            </div>
            <div class="roadmap-line"></div>
          </div>
          <div class="roadmap-card-body">
            <div class="roadmap-card-top">
              <span class="roadmap-tier-pill">${l.tierLabel}</span>
              <span class="roadmap-time">⏱️ ${l.estimatedTime}</span>
            </div>
            <h4 class="roadmap-card-title">${escapeHtml(l.title)}</h4>
            <p class="roadmap-card-summary">${escapeHtml(l.summary)}</p>
          </div>
        </div>
      `;
    }).join('');

    listContainer.querySelectorAll(".roadmap-card").forEach(card => {
      card.addEventListener("click", () => {
        this.selectLesson(card.dataset.id);
        this.roadmapModal.classList.add("hidden");
      });
    });

    this.roadmapModal.classList.remove("hidden");
  }

  renderCheatSheet() {
    const listEl = document.getElementById("cheatsheet-content");
    if (!listEl) return;
    const trackKey = this.currentTrack ? this.currentTrack.id : "typescript";
    const data = cheatSheetData[trackKey] || cheatSheetData.typescript;

    let html = `<h2 class="cheat-track-heading">${this.currentTrack.fullName} Cheat Sheet</h2>`;
    data.forEach(sec => {
      html += `
        <div class="cheat-section">
          <h3>⚡ ${escapeHtml(sec.category)}</h3>
          <div class="cheat-grid">
            ${sec.items.map(item => `
              <div class="cheat-card">
                <div class="cheat-name"><code>${escapeHtml(item.name)}</code></div>
                <div class="cheat-desc">${escapeHtml(item.desc)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    listEl.innerHTML = html;
  }

  openBadgesModal() {
    const modalContent = document.getElementById("badges-list-content");
    const state = appState.get();

    const allBadgesDef = [
      { id: "first_step", name: "Code Initiate", desc: "Completed your first lesson", icon: "🌱" },
      { id: "html_master", name: "HTML5 Architect", desc: "Mastered all 18 HTML5 modules", icon: "📄" },
      { id: "css_master", name: "CSS3 Alchemist", desc: "Mastered all 18 CSS3 modules", icon: "🎨" },
      { id: "js_master", name: "JavaScript Guru", desc: "Mastered all 18 JavaScript modules", icon: "⚡" },
      { id: "ts_legend", name: "TypeScript Legend", desc: "Mastered all 22 TypeScript modules", icon: "🔮" },
      { id: "sql_master", name: "SQL Query Master", desc: "Mastered all 18 ANSI SQL modules", icon: "🗄️" },
      { id: "postgres_master", name: "Postgres Titan", desc: "Mastered all 18 PostgreSQL modules", icon: "🐘" },
      { id: "code_warrior", name: "Code Craftsman", desc: "Completed 25 hands-on coding exercises", icon: "⚔️" },
      { id: "fullstack_architect", name: "Full-Stack Web Architect", desc: "Completed all 112 modules across the Academy!", icon: "👑" }
    ];

    modalContent.innerHTML = allBadgesDef.map(b => {
      const unlocked = state.badges.find(ub => ub.id === b.id);
      return `
        <div class="badge-item-card ${unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-info">
            <div class="badge-name">${escapeHtml(b.name)}</div>
            <div class="badge-desc">${escapeHtml(b.desc)}</div>
            ${unlocked ? `<div class="badge-date">Unlocked on ${unlocked.unlockedAt}</div>` : '<div class="badge-date">Locked</div>'}
          </div>
        </div>
      `;
    }).join('');

    this.badgesModal.classList.remove("hidden");
  }

  openCertModal() {
    const state = appState.get();
    const certHolder = document.getElementById("cert-holder-name");
    const certTrackName = document.getElementById("cert-track-name");
    const certDate = document.getElementById("cert-date");
    const certProgress = document.getElementById("cert-progress-stat");
    const inputName = document.getElementById("cert-name-input");
    const updateBtn = document.getElementById("btn-update-cert-name");

    const trackName = this.currentTrack ? this.currentTrack.fullName : "Web Mastery";

    const renderCert = (name) => {
      certHolder.textContent = name || "Web Developer";
      if (certTrackName) certTrackName.textContent = `Certificate of ${trackName} Mastery`;
      certDate.textContent = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      certProgress.textContent = `${state.completedLessons.length} Modules Mastered &bull; ${state.xp || 100} XP &bull; ${state.streak || 1} Day Streak`;
    };

    renderCert(inputName?.value || "Web Developer");

    updateBtn?.addEventListener("click", () => {
      if (inputName?.value.trim()) renderCert(inputName.value.trim());
    });

    this.certModal.classList.remove("hidden");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new CoddyApp());
} else {
  new CoddyApp();
}

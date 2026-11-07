/**
 * Coddy.tech Style State Manager
 * Tracks Daily Streaks, Lesson Steps (Theory -> Quiz -> Challenge), XP Gems, and Badges
 */

const STORAGE_KEY = "coddy_academy_state_v4";

const defaultState = {
  theme: "light",
  activeTrack: null, // "html" | "css" | "javascript" | "typescript"
  activeLessonId: null,
  lessonStep: 1, // 1: Theory, 2: Quiz, 3: Challenge, 4: Completed
  fontSize: "md", // "sm" | "md" | "lg"
  streak: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
  completedLessons: [], // list of completed lesson IDs
  completedExercises: [],
  quizScores: {},
  attemptsPerLesson: {}, // track attempt count for first-try bonus XP
  viewedSolutions: [], // lesson IDs where solution was revealed
  xp: 100, // starting welcome bonus
  badges: []
};

class StateManager {
  constructor() {
    this.state = this.loadState();
    this.checkDailyStreak();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return { ...defaultState };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }

  get() {
    return this.state;
  }

  checkDailyStreak() {
    const today = new Date().toISOString().split("T")[0];
    const lastActive = this.state.lastActiveDate;

    if (!lastActive) {
      this.state.streak = 1;
      this.state.lastActiveDate = today;
      this.saveState();
      return;
    }

    if (lastActive === today) {
      return; // already recorded today
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (lastActive === yesterday) {
      this.state.streak = (this.state.streak || 1) + 1;
    } else {
      // Missed more than 1 day, reset streak to 1
      this.state.streak = 1;
    }

    this.state.lastActiveDate = today;
    this.saveState();
  }

  bumpStreakActivity() {
    const today = new Date().toISOString().split("T")[0];
    this.state.lastActiveDate = today;
    this.saveState();
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.saveState();
  }

  setFontSize(size) {
    this.state.fontSize = size;
    this.saveState();
  }

  setTrack(trackId, defaultLessonId) {
    this.state.activeTrack = trackId;
    this.state.activeLessonId = defaultLessonId;
    this.state.lessonStep = 1;
    this.saveState();
  }

  setActiveLesson(id) {
    this.state.activeLessonId = id;
    this.state.lessonStep = 1;
    this.saveState();
  }

  setLessonStep(step) {
    this.state.lessonStep = step;
    this.saveState();
  }

  recordAttempt(lessonId) {
    this.state.attemptsPerLesson[lessonId] = (this.state.attemptsPerLesson[lessonId] || 0) + 1;
    this.saveState();
  }

  markSolutionViewed(lessonId) {
    if (!this.state.viewedSolutions.includes(lessonId)) {
      this.state.viewedSolutions.push(lessonId);
      this.saveState();
    }
  }

  completeLessonChallenge(lessonId) {
    const isFirstTime = !this.state.completedLessons.includes(lessonId);
    let earnedXP = 0;

    if (isFirstTime) {
      this.state.completedLessons.push(lessonId);
      earnedXP += 50; // Base completion XP

      // Coddy First-Try Bonus
      const attempts = this.state.attemptsPerLesson[lessonId] || 1;
      const viewedSolution = this.state.viewedSolutions.includes(lessonId);

      if (attempts === 1 && !viewedSolution) {
        earnedXP += 25; // First try perfection bonus!
      }

      this.addXP(earnedXP);
      this.bumpStreakActivity();
      this.checkBadgeUnlocks();
      this.saveState();
    }

    return { isFirstTime, earnedXP };
  }

  recordQuizScore(lessonId, score, total) {
    const passed = score >= Math.ceil(total * 0.7);
    const prev = this.state.quizScores[lessonId];
    
    if (!prev?.passed && passed) {
      this.addXP(40);
    }

    this.state.quizScores[lessonId] = { score, total, passed, date: new Date().toISOString() };
    this.saveState();
  }

  addXP(points) {
    this.state.xp = (this.state.xp || 0) + points;
  }

  checkBadgeUnlocks() {
    const { completedLessons, badges } = this.state;
    const newBadges = [...badges];

    const award = (id, name, desc, icon) => {
      if (!newBadges.some(b => b.id === id)) {
        newBadges.push({ id, name, desc, icon, unlockedAt: new Date().toLocaleDateString() });
        return true;
      }
      return false;
    };

    if (completedLessons.length >= 1) {
      award("first_step", "Code Initiate", "Completed your very first interactive lesson", "🌱");
    }

    const htmlIds = Array.from({ length: 18 }, (_, i) => `h${i + 1}`);
    if (htmlIds.every(id => completedLessons.includes(id))) {
      award("html_master", "HTML5 Architect", "Mastered all 18 HTML5 modules", "📄");
    }

    const cssIds = Array.from({ length: 18 }, (_, i) => `c${i + 1}`);
    if (cssIds.every(id => completedLessons.includes(id))) {
      award("css_master", "CSS3 Alchemist", "Mastered all 18 CSS3 modules", "🎨");
    }

    const jsIds = Array.from({ length: 18 }, (_, i) => `j${i + 1}`);
    if (jsIds.every(id => completedLessons.includes(id))) {
      award("js_master", "JavaScript Guru", "Mastered all 18 JavaScript modules", "⚡");
    }

    const tsIds = [
      ...Array.from({ length: 7 }, (_, i) => `b${i + 1}`),
      ...Array.from({ length: 8 }, (_, i) => `i${i + 1}`),
      ...Array.from({ length: 7 }, (_, i) => `a${i + 1}`)
    ];
    if (tsIds.every(id => completedLessons.includes(id))) {
      award("ts_legend", "TypeScript Legend", "Mastered all 22 TypeScript modules", "🔮");
    }

    const sqlIds = Array.from({ length: 18 }, (_, i) => `s${i + 1}`);
    if (sqlIds.every(id => completedLessons.includes(id))) {
      award("sql_master", "SQL Query Master", "Mastered all 18 ANSI SQL modules", "🗄️");
    }

    const postgresIds = Array.from({ length: 18 }, (_, i) => `p${i + 1}`);
    if (postgresIds.every(id => completedLessons.includes(id))) {
      award("postgres_master", "Postgres Titan", "Mastered all 18 PostgreSQL modules", "🐘");
    }

    const all112 = [...htmlIds, ...cssIds, ...jsIds, ...tsIds, ...sqlIds, ...postgresIds];
    if (all112.every(id => completedLessons.includes(id))) {
      award("fullstack_architect", "Full-Stack Web Architect", "Completed all 112 modules in the Academy!", "👑");
    }

    this.state.badges = newBadges;
  }

  resetProgress() {
    this.state.completedLessons = [];
    this.state.completedExercises = [];
    this.state.quizScores = {};
    this.state.attemptsPerLesson = {};
    this.state.viewedSolutions = [];
    this.state.xp = 100;
    this.state.streak = 1;
    this.state.badges = [];
    this.saveState();
  }
}

export const appState = new StateManager();

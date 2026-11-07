/**
 * Interactive Quiz Engine
 */
import { appState } from "./state.js";
import { escapeHtml, fireConfetti } from "./utils/helpers.js";

export function renderQuiz(lesson, container) {
  if (!lesson || !lesson.quiz || lesson.quiz.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>No Quiz For This Topic</h3>
        <p>This reference topic does not require a formal quiz. Head over to the Live Playground to try out the code!</p>
      </div>
    `;
    return;
  }

  const existingScore = appState.get().quizScores[lesson.id];

  let html = `
    <div class="quiz-header">
      <div class="quiz-title-box">
        <h2>${escapeHtml(lesson.title)} &mdash; Knowledge Check</h2>
        <p class="quiz-desc">Test your understanding of the concepts covered in this lesson. Passing requires 70% or higher.</p>
      </div>
      ${existingScore ? `
        <div class="quiz-badge-score ${existingScore.passed ? 'passed' : 'failed'}">
          ${existingScore.passed ? '✓ Passed' : '⚠️ Need Review'}: ${existingScore.score}/${existingScore.total}
        </div>
      ` : ''}
    </div>

    <form id="quiz-form" class="quiz-questions-list">
  `;

  lesson.quiz.forEach((q, qIndex) => {
    html += `
      <div class="quiz-card" data-qindex="${qIndex}">
        <div class="quiz-q-num">Question ${qIndex + 1} of ${lesson.quiz.length}</div>
        <div class="quiz-q-text">${escapeHtml(q.question)}</div>
        
        <div class="quiz-options-group">
          ${q.options.map((opt, optIndex) => `
            <label class="quiz-option-label" data-optindex="${optIndex}">
              <input type="radio" name="q_${qIndex}" value="${optIndex}" required />
              <span class="custom-radio"></span>
              <span class="option-text">${escapeHtml(opt)}</span>
            </label>
          `).join('')}
        </div>

        <div class="quiz-feedback-box hidden" id="feedback_${qIndex}">
          <div class="feedback-status"></div>
          <div class="feedback-explanation">${escapeHtml(q.explanation)}</div>
        </div>
      </div>
    `;
  });

  html += `
    <div class="quiz-actions-bar">
      <button type="submit" class="btn btn-primary" id="btn-submit-quiz">Submit Answers</button>
      <button type="button" class="btn btn-secondary hidden" id="btn-retry-quiz">Retry Quiz</button>
    </div>
  </form>
  `;

  container.innerHTML = html;

  const form = container.querySelector("#quiz-form");
  const submitBtn = container.querySelector("#btn-submit-quiz");
  const retryBtn = container.querySelector("#btn-retry-quiz");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let score = 0;
    const total = lesson.quiz.length;

    lesson.quiz.forEach((q, qIndex) => {
      const selected = form.querySelector(`input[name="q_${qIndex}"]:checked`);
      const card = form.querySelector(`.quiz-card[data-qindex="${qIndex}"]`);
      const feedbackBox = card.querySelector(`#feedback_${qIndex}`);
      const statusEl = feedbackBox.querySelector(".feedback-status");
      const optionLabels = card.querySelectorAll(".quiz-option-label");

      feedbackBox.classList.remove("hidden");

      const userChoice = selected ? parseInt(selected.value, 10) : -1;
      const isCorrect = userChoice === q.answer;

      if (isCorrect) {
        score++;
        card.classList.add("card-correct");
        statusEl.innerHTML = `<span class="badge-success">✓ Correct!</span>`;
      } else {
        card.classList.add("card-incorrect");
        statusEl.innerHTML = `<span class="badge-error">✗ Incorrect</span>`;
      }

      optionLabels.forEach((label, idx) => {
        const input = label.querySelector("input");
        input.disabled = true;

        if (idx === q.answer) {
          label.classList.add("option-correct");
        } else if (idx === userChoice && !isCorrect) {
          label.classList.add("option-wrong");
        }
      });
    });

    submitBtn.classList.add("hidden");
    retryBtn.classList.remove("hidden");

    appState.recordQuizScore(lesson.id, score, total);

    if (score === total) {
      fireConfetti();
    }
  });

  retryBtn.addEventListener("click", () => {
    renderQuiz(lesson, container);
  });
}

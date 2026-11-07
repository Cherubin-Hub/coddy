/**
 * Helper utilities for formatting, animations, and DOM helpers
 */

export function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function highlightCode(code) {
  if (!code) return "";
  // Tokenize keywords, types, strings, comments, numbers
  let escaped = escapeHtml(code);

  // Comments (// ...)
  escaped = escaped.replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>');

  // Strings ("..." or '...' or `...`)
  escaped = escaped.replace(/(&quot;.*?&quot;|&#039;.*?&#039;|`.*?`)/g, '<span class="tok-string">$1</span>');

  // TypeScript Keywords
  const keywords = [
    "function", "const", "let", "var", "return", "if", "else", "switch", "case",
    "default", "interface", "type", "extends", "implements", "class", "abstract",
    "public", "private", "protected", "readonly", "as", "is", "in", "of", "keyof",
    "typeof", "infer", "never", "void", "any", "unknown", "new", "throw", "try",
    "catch", "finally", "import", "export", "satisfies"
  ];

  const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  escaped = escaped.replace(keywordRegex, '<span class="tok-kw">$1</span>');

  // Built-in types
  const types = ["string", "number", "boolean", "bigint", "symbol", "null", "undefined", "Promise", "Array", "Record", "Partial", "Required", "Pick", "Omit", "Exclude", "Extract", "NonNullable", "ReturnType", "Parameters", "Awaited"];
  const typeRegex = new RegExp(`\\b(${types.join("|")})\\b`, "g");
  escaped = escaped.replace(typeRegex, '<span class="tok-type">$1</span>');

  // Numbers
  escaped = escaped.replace(/\b(\d+(?:\.\d+)?(?:n)?)\b/g, '<span class="tok-num">$1</span>');

  return escaped;
}

/**
 * Lightweight canvas confetti particle celebration
 */
export function fireConfetti() {
  const canvas = document.createElement("canvas");
  canvas.id = "confetti-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const particles = [];
  const colors = ["#3178c6", "#61dafb", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const elapsed = Date.now() - startTime;

    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - elapsed / 2200);

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive && elapsed < 2500) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }

  render();
}

// ─── Eco Discovery — Cursor Sparkles ─────────────────────────────────────────
// Spawns the same colored dots used on the "Start Exploring" button
// near the cursor as it moves — subtle quantity, same palette.

(function () {
  // Touch devices have no mouse to follow
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Same 5 colors as the Start Exploring button sparkles
  const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF'];

  // Throttle: only spawn when the mouse has moved MIN_DIST px
  // AND at least MIN_GAP ms have passed — keeps it sparse and tasteful
  const MIN_DIST = 40;  // px of movement required between spawns
  const MIN_GAP  = 90;  // ms required between spawns

  let lastX    = -999;
  let lastY    = -999;
  let lastTime = 0;
  let colorIdx = 0;

  document.addEventListener('mousemove', e => {
    const now = Date.now();

    const dx   = e.clientX - lastX;
    const dy   = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Skip if not moved enough or too soon
    if (dist < MIN_DIST)         return;
    if (now - lastTime < MIN_GAP) return;

    lastX    = e.clientX;
    lastY    = e.clientY;
    lastTime = now;

    spawn(e.clientX, e.clientY);
  }, { passive: true });

  function spawn(x, y) {
    const el    = document.createElement('span');
    const color = COLORS[colorIdx % COLORS.length];
    const size  = 6 + Math.random() * 4;          // 6–10 px
    const offX  = (Math.random() - 0.5) * 16;     // slight random scatter
    const offY  = (Math.random() - 0.5) * 16;

    el.className = 'cs-sparkle';
    el.setAttribute('aria-hidden', 'true');

    el.style.left       = (x + offX) + 'px';
    el.style.top        = (y + offY) + 'px';
    el.style.width      = size + 'px';
    el.style.height     = size + 'px';
    el.style.background = color;

    document.body.appendChild(el);
    colorIdx++;

    // Remove after animation (1.1 s) + small buffer
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => { if (el.parentNode) el.remove(); }, 1400);
  }
}());

// ════════════════════════════════════════════════════════════
//  Froggy Guide + Persistent Companion
//  ─ Guide overlay: 5-step walkthrough on first load
//  ─ Companion:     circular avatar that tracks game state
// ════════════════════════════════════════════════════════════

const PAD = 16; // spotlight padding px

// ── Guide step definitions ────────────────────────────────────

const STEPS = [
  {
    id:     'intro',
    target: null,
    text:   "Hi, I'm Froggy! 🐸<br>I'll be your guide<br>to play this game!",
    btn:    'Next ▶',
  },
  {
    id:     'timer',
    target: '.strip-timer-sticker',
    text:   "You will have <strong>2 minutes</strong><br>to play and guess<br>the correct animal! ⏱️<br><small>♻️ Collect trash to add time!</small>",
    btn:    'Next ▶',
  },
  {
    id:     'card',
    target: '#sb-grid .sb-card',
    text:   "First, pick one of<br>these <strong>mystery cards</strong><br>to get started! 🃏",
    btn:    'Next ▶',
  },
  {
    id:     'hints',
    target: '#sb-feedback',
    text:   "This is your<br><strong>Hint Section</strong> —<br>it will help you guess! 💡",
    btn:    'Next ▶',
  },
  {
    id:     'ready',
    target: null,
    text:   "You're all set!<br>Let the adventure<br>begin! 🎉",
    btn:    "▶ Let's Play!",
    isLast: true,
  },
];

// ── Companion state configuration ────────────────────────────
// Each state defines bubble text + which element to position near

const COMPANION_CFG = {
  'start': {
    text:   "Press ▶ <strong>Start</strong><br>to begin your adventure!",
    target: '#btn-start',
  },
  'pick-card': {
    text:   "Pick a <strong>mystery card</strong><br>to get started! 🃏",
    target: '#sb-grid',
  },
  'find-fish': {
    text:   "Now find the<br>matching <strong>fish</strong><br>in the scene! 🐟",
    target: '.game-scene-container',   // → places frog inside canvas
  },
  'read-hint': {
    text:   "Read the <strong>hint</strong><br>below and try again! 💡",
    target: '#sb-feedback',
  },
  'next-card': {
    text:   "Out of hints!<br>Pick another<br><strong>mystery card</strong>! 🃏",
    target: '#sb-grid',
  },
  'celebrate': {
    text:   "Well done! 🎉<br>Pick another card!",
    target: '#sb-grid',
  },
};

// ── Module state ──────────────────────────────────────────────

let _step        = 0;
let _spotlightEl = null;

// Danger tracking
let _dangerLevel  = 0;    // 0 = normal | 1 = danger <60s | 2 = critical <30s
let _currentState = null; // last game state passed to setCompanionState
let _returnTimer  = null; // timeout to return companion to bottom after click

// Bubble text shown while companion is pinned to bottom during danger/critical
const _DANGER_BUBBLE   = "⏰ Time is low!<br>Drag <strong>trash</strong> into<br>the bin to add time! ♻️";
const _CRITICAL_BUBBLE = "🚨 Almost out!<br>Quick! Drag <strong>trash</strong><br>to the bin! ♻️";

// ══════════════════════════════════════════════════════════════
//  PUBLIC API
// ══════════════════════════════════════════════════════════════

/** Start the 5-step guide overlay when the game page loads */
export function initGameGuide() {
  _step        = 0;
  _spotlightEl = null;

  _scrollToGame();
  _lockScroll();
  _injectGuide();
  _bindGuide();
  _showStep(0);
}

/**
 * Move / create the persistent companion and update its bubble.
 * Called by gameController whenever the game state changes.
 * @param {'start'|'pick-card'|'find-fish'|'read-hint'|'next-card'|'celebrate'} state
 */
export function setCompanionState(state) {
  const cfg = COMPANION_CFG[state];
  if (!cfg) return;

  _currentState = state;  // always track the latest game step

  // Create on first call
  if (!document.getElementById('game-frog-companion')) {
    _createCompanion();
  }

  const companion = document.getElementById('game-frog-companion');
  const speech    = document.getElementById('companion-speech');
  if (!companion || !speech) return;

  // Bounce effect for celebrate
  companion.classList.toggle('companion-celebrate', state === 'celebrate');

  if (_dangerLevel > 0) {
    // In danger/critical mode: update _currentState but stay at bottom.
    // The bubble keeps showing the danger/trash reminder.
    return;
  }

  // Normal mode: update bubble + reposition
  speech.innerHTML = cfg.text;
  _positionCompanion(companion, state, cfg.target);
}

/**
 * Set the danger level of the companion (glow + pulse + pinned-to-bottom behaviour).
 * @param {0|1|2} level  0 = normal | 1 = danger (<60 s) | 2 = critical (<30 s)
 */
export function setCompanionDanger(level) {
  _dangerLevel = level;
  if (_returnTimer) { clearTimeout(_returnTimer); _returnTimer = null; }

  // Create companion if it doesn't exist yet
  if (!document.getElementById('game-frog-companion')) {
    _createCompanion();
  }

  const companion = document.getElementById('game-frog-companion');
  if (!companion) return;

  companion.classList.remove('companion-danger', 'companion-critical');

  if (level >= 1) companion.classList.add('companion-danger');
  if (level >= 2) companion.classList.add('companion-critical');

  if (level === 0) {
    // Return to normal: reposition to current game state
    const cfg = _currentState ? COMPANION_CFG[_currentState] : null;
    if (cfg) {
      const speech = document.getElementById('companion-speech');
      if (speech) speech.innerHTML = cfg.text;
      _positionCompanion(companion, _currentState, cfg.target);
    }
  } else {
    // Pin to bottom with danger bubble
    const speech = document.getElementById('companion-speech');
    if (speech) {
      speech.innerHTML = level >= 2 ? _CRITICAL_BUBBLE : _DANGER_BUBBLE;
    }
    _positionCompanionBottom(companion);
  }
}

// ══════════════════════════════════════════════════════════════
//  SCROLL LOCK
// ══════════════════════════════════════════════════════════════

function _scrollToGame() {
  const el = document.getElementById('game-main')
          || document.getElementById('hero-section');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  else    window.scrollTo({ top: 0, behavior: 'instant' });
}

function _lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow            = 'hidden';
}

function _unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow            = '';
}

// ══════════════════════════════════════════════════════════════
//  GUIDE OVERLAY — inject + bind
// ══════════════════════════════════════════════════════════════

function _injectGuide() {
  document.getElementById('game-guide-overlay')?.remove();

  const wrap = document.createElement('div');
  wrap.id = 'game-guide-overlay';
  wrap.innerHTML = `
    <div class="guide-frame" id="guide-frame-top"></div>
    <div class="guide-frame" id="guide-frame-left"></div>
    <div class="guide-frame" id="guide-frame-right"></div>
    <div class="guide-frame" id="guide-frame-bottom"></div>

    <button id="guide-skip-btn" aria-label="Skip guide">✕ Skip Guide</button>

    <div id="guide-frog-wrap">
      <img
        src="./assets/images/Frog_explorer_1.png"
        id="guide-frog-img"
        alt="Froggy the explorer"
      >
      <div id="guide-frog-bubble" class="bubble-left">
        <span id="guide-bubble-text"></span>
        <div class="guide-bubble-actions">
          <button id="guide-action-btn" class="guide-action-btn guide-action-btn--next">
            Next ▶
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);
}

function _bindGuide() {
  document.getElementById('guide-skip-btn')
    ?.addEventListener('click', _skipGuide);

  document.getElementById('guide-action-btn')
    ?.addEventListener('click', () => {
      if (STEPS[_step].isLast) {
        _letsPlay();
      } else {
        _showStep(++_step);
      }
    });
}

// ══════════════════════════════════════════════════════════════
//  GUIDE STEP RENDERING
// ══════════════════════════════════════════════════════════════

function _showStep(idx) {
  const step = STEPS[idx];

  const textEl = document.getElementById('guide-bubble-text');
  if (textEl) textEl.innerHTML = step.text;

  const btn = document.getElementById('guide-action-btn');
  if (btn) {
    btn.textContent = step.btn;
    btn.className   = `guide-action-btn ${
      step.isLast ? 'guide-action-btn--play' : 'guide-action-btn--next'
    }`;
  }

  // Re-trigger bubble pop-in
  const bubble = document.getElementById('guide-frog-bubble');
  if (bubble) {
    bubble.style.animation = 'none';
    void bubble.offsetWidth;
    bubble.style.animation = '';
  }

  // Clear old spotlight
  if (_spotlightEl) {
    _spotlightEl.classList.remove('guide-spotlight-el');
    _spotlightEl = null;
  }

  const frogWrap = document.getElementById('guide-frog-wrap');
  if (!frogWrap) return;

  if (step.target) {
    const el = document.querySelector(step.target);
    if (!el) { _fullDark(); _guideFrogCenter(); return; }

    _spotlightEl = el;
    el.classList.add('guide-spotlight-el');
    const r = el.getBoundingClientRect();
    _setSpotlight(r);
    _guideFrogNear(r);
  } else {
    _fullDark();
    _guideFrogCenter();
  }
}

// ── Spotlight frames ──────────────────────────────────────────

function _setSpotlight(r) {
  const sl = r.left - PAD,  st = r.top  - PAD;
  const sw = r.width + PAD * 2, sh = r.height + PAD * 2;
  const W = window.innerWidth, H = window.innerHeight;

  _frame('guide-frame-top',
    `left:0; top:0; width:${W}px; height:${Math.max(0, st)}px;`);
  _frame('guide-frame-left',
    `left:0; top:${st}px; width:${Math.max(0, sl)}px; height:${sh}px;`);
  _frame('guide-frame-right',
    `left:${sl + sw}px; top:${st}px; width:${Math.max(0, W - sl - sw)}px; height:${sh}px;`);
  _frame('guide-frame-bottom',
    `left:0; top:${st + sh}px; width:${W}px; height:${Math.max(0, H - st - sh)}px;`);
}

function _fullDark() {
  const W = window.innerWidth, H = window.innerHeight;
  _frame('guide-frame-top',    `left:0; top:0; width:${W}px; height:${H}px;`);
  _frame('guide-frame-left',   'left:0; top:0; width:0; height:0;');
  _frame('guide-frame-right',  'left:0; top:0; width:0; height:0;');
  _frame('guide-frame-bottom', 'left:0; top:0; width:0; height:0;');
}

function _frame(id, css) {
  const el = document.getElementById(id);
  if (el) el.style.cssText = css;
}

// ── Guide frog placement ──────────────────────────────────────

function _guideFrogCenter() {
  const wrap   = document.getElementById('guide-frog-wrap');
  const bubble = document.getElementById('guide-frog-bubble');
  if (!wrap || !bubble) return;
  wrap.style.flexDirection = 'row';
  wrap.style.left          = '50%';
  wrap.style.top           = '50%';
  wrap.style.bottom        = 'auto';
  wrap.style.right         = 'auto';
  wrap.style.transform     = 'translate(-50%, -50%)';
  bubble.className         = 'bubble-left';
}

function _guideFrogNear(rect) {
  const wrap   = document.getElementById('guide-frog-wrap');
  const bubble = document.getElementById('guide-frog-bubble');
  if (!wrap || !bubble) return;

  const totalW = 115 + 10 + 205; // frog + gap + bubble
  const totalH = 180;
  const margin = 20;

  let left = rect.left - PAD - totalW - margin;
  let top  = rect.top + rect.height / 2 - totalH / 2;

  if (left >= margin) {
    _applyGuideFrog(wrap, bubble, left, top, 'row', 'bubble-left');
    return;
  }

  left = rect.right + PAD + margin;
  if (left + totalW <= window.innerWidth - margin) {
    _applyGuideFrog(wrap, bubble, left, top, 'row-reverse', 'bubble-right');
    return;
  }

  left = Math.max(margin, rect.left + rect.width / 2 - totalW / 2);
  top  = rect.bottom + PAD + margin;
  _applyGuideFrog(wrap, bubble, left, top, 'row', 'bubble-top');
}

function _applyGuideFrog(wrap, bubble, left, top, dir, cls) {
  top  = Math.max(16, Math.min(top, window.innerHeight - 210));
  left = Math.max(8, left);
  wrap.style.flexDirection = dir;
  wrap.style.left          = `${left}px`;
  wrap.style.top           = `${top}px`;
  wrap.style.bottom        = 'auto';
  wrap.style.right         = 'auto';
  wrap.style.transform     = '';
  bubble.className         = cls;
}

// ══════════════════════════════════════════════════════════════
//  SKIP GUIDE — remove overlay, spawn companion at 'start'
// ══════════════════════════════════════════════════════════════

function _skipGuide() {
  if (_spotlightEl) {
    _spotlightEl.classList.remove('guide-spotlight-el');
    _spotlightEl = null;
  }
  _unlockScroll();
  _removeOverlay(() => setCompanionState('start'));
}

// ══════════════════════════════════════════════════════════════
//  LET'S PLAY — remove overlay + click Start
//  gameController's attachStartButton will call setCompanionState('pick-card')
// ══════════════════════════════════════════════════════════════

function _letsPlay() {
  if (_spotlightEl) {
    _spotlightEl.classList.remove('guide-spotlight-el');
    _spotlightEl = null;
  }
  _unlockScroll();
  _removeOverlay(() => document.getElementById('btn-start')?.click());
}

function _removeOverlay(onDone) {
  const overlay = document.getElementById('game-guide-overlay');
  if (!overlay) { onDone?.(); return; }
  overlay.classList.add('guide-dismiss');
  overlay.addEventListener('animationend', () => { overlay.remove(); onDone?.(); }, { once: true });
}

// ══════════════════════════════════════════════════════════════
//  COMPANION — circular avatar that follows game state
// ══════════════════════════════════════════════════════════════

function _createCompanion() {
  document.getElementById('game-frog-companion')?.remove();

  const el = document.createElement('div');
  el.id = 'game-frog-companion';
  el.innerHTML = `
    <div class="companion-avatar" id="companion-avatar" title="Click me!">
      <img src="./assets/images/Frog_explorer_1.png" alt="Froggy">
    </div>
    <div class="companion-bubble bubble-left" id="companion-speech"></div>
  `;
  document.body.appendChild(el);

  // Click avatar → in danger mode: temporarily move to current game state;
  //                 in normal mode: toggle bubble visibility
  el.querySelector('.companion-avatar')
    ?.addEventListener('click', () => {
      if (_dangerLevel > 0 && _currentState) {
        const cfg = COMPANION_CFG[_currentState];
        if (!cfg) return;

        if (_returnTimer) { clearTimeout(_returnTimer); _returnTimer = null; }

        // Show game-state bubble and move to game-state position
        const speech = document.getElementById('companion-speech');
        if (speech) speech.innerHTML = cfg.text;
        speech?.classList.remove('bubble-hidden');
        _positionCompanion(el, _currentState, cfg.target);

        // Return to bottom after 3.5 s — only if still in danger mode
        _returnTimer = setTimeout(() => {
          _returnTimer = null;
          if (_dangerLevel === 0) return; // timer recovered above 60s, stay put
          const dangerText = _dangerLevel >= 2 ? _CRITICAL_BUBBLE : _DANGER_BUBBLE;
          const sp = document.getElementById('companion-speech');
          if (sp) sp.innerHTML = dangerText;
          _positionCompanionBottom(el);
        }, 3500);
      } else {
        el.querySelector('.companion-bubble')?.classList.toggle('bubble-hidden');
      }
    });
}

// ── Smooth positioning ────────────────────────────────────────

/** Pin companion just above the trash bin — only valid while in danger mode */
function _positionCompanionBottom(companion) {
  if (_dangerLevel === 0) return; // guard: don't run when timer is healthy

  const scene = document.querySelector('.game-scene-container');
  const bin   = document.getElementById('trash-drop-zone')
             || document.querySelector('.game-trash-bin-wrap');

  if (bin && scene) {
    const br = bin.getBoundingClientRect();
    const sr = scene.getBoundingClientRect();

    // The trash bin has negative left/bottom offsets and is clipped by
    // overflow:hidden on the scene container. Use its center but clamp
    // the result inside the visible scene so the frog stays on the image.
    const centerX = br.left + br.width / 2;
    const clampedX = Math.max(sr.left + 20, Math.min(centerX, sr.right - 20));
    const clampedBinTop = Math.max(sr.top, Math.min(br.top, sr.bottom));

    let left = Math.round(clampedX - 33);
    let top  = Math.round(clampedBinTop - 90);

    // Keep entirely within the game scene image
    left = Math.max(sr.left + 8,        Math.min(left, sr.right  - 90));
    top  = Math.max(sr.top  + 20,       Math.min(top,  sr.bottom - 140));

    companion.style.left      = `${left}px`;
    companion.style.top       = `${top}px`;
    companion.style.transform = '';

  } else if (bin) {
    const r = bin.getBoundingClientRect();
    companion.style.left      = `${Math.round(r.left + r.width / 2 - 33)}px`;
    companion.style.top       = `${Math.max(50, Math.min(r.top - 90, window.innerHeight - 140))}px`;
    companion.style.transform = '';

  } else if (scene) {
    // Fallback: lower-left corner of the game scene image
    const sr = scene.getBoundingClientRect();
    companion.style.left      = `${Math.round(sr.left + sr.width  * 0.08)}px`;
    companion.style.top       = `${Math.round(sr.top  + sr.height * 0.72)}px`;
    companion.style.transform = '';

  } else {
    companion.style.left      = `${Math.round(window.innerWidth / 2 - 33)}px`;
    companion.style.top       = `${window.innerHeight - 96}px`;
    companion.style.transform = '';
  }
}

function _positionCompanion(companion, state, targetSel) {
  const AVT  = 66;   // avatar diameter px
  const BUB  = 175;  // estimated bubble width px
  const TOT  = AVT + 10 + BUB;
  const H_AVT = 66;

  if (state === 'find-fish') {
    // Place inside the game canvas, left side — frog "points" into the scene
    const canvas = document.querySelector('.game-scene-container');
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    companion.style.left      = `${r.left + 18}px`;
    companion.style.top       = `${r.top + r.height * 0.42}px`;
    companion.style.transform = '';
  } else {
    // Default: position LEFT of the target element
    const target = targetSel ? document.querySelector(targetSel) : null;
    if (!target) return;
    const r    = target.getBoundingClientRect();
    let   left = r.left - TOT - 18;
    if (left < 8) left = 8;
    const top = r.top + r.height / 2 - H_AVT / 2;

    companion.style.left      = `${left}px`;
    companion.style.top       = `${Math.max(50, Math.min(top, window.innerHeight - 140))}px`;
    companion.style.transform = '';
  }
}

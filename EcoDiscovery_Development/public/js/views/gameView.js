export function renderGamePage(data) {
  renderHeader(data.header, data.siteName);
  renderHero(data.header.navBarColor, data.game);
  renderFooter(data.footer);
}

function renderHeader(header, siteName) {
  const headerContainer = document.getElementById("site-header");

  headerContainer.innerHTML = `
    <div class="top-bar" style="background-color: ${header.topBarColor};">
      <div class="container top-bar-content">
        <p class="top-bar-text">${header.topBarText}</p>
      </div>
    </div>

    <div class="nav-bar" style="background-color: ${header.navBarColor};">
      <div class="container nav-content">
        <a href="index.html" class="site-brand" aria-label="Go to home page">
          <img src="./assets/images/logo-fish.png" alt="Eco Discovery Logo" class="site-logo-img">
          <span class="site-title">Eco Discovery</span>
        </a>
        <nav class="nav-menu">
          ${header.navLinks
            .map(
              (link) =>
                `<a href="${link.href}" class="nav-link-icon${link.active ? " active" : ""}" aria-label="${link.label}">
                  <img src="${link.icon}" alt="${link.label}" class="nav-icon-img">
                  <span class="nav-icon-label">${link.label}</span>
                </a>`
            )
            .join("")}
        </nav>
      </div>
    </div>
  `;
}

function renderHero(navBarColor, game) {
  const heroSection = document.getElementById("hero-section");

  // ── Spiral binding dots ──────────────────────────────────────────────
  const spiralDotsHTML = Array.from({ length: 14 }, () =>
    `<span class="sb-spiral-dot" aria-hidden="true"></span>`
  ).join("");

  // ── Mystery sticker cards (all locked) ──────────────────────────────
  const stickerCardsHTML = game.stickerBook.animals
    .map(
      (animal) =>
        `<div class="sb-card sb-card-locked"
              style="--card-color: ${animal.color};"
              data-card-index="${animal.id}"
              role="button"
              tabindex="0"
              aria-label="Mystery creature — click for a hint">
          <span class="sb-spark sb-spark-1" aria-hidden="true"></span>
          <span class="sb-spark sb-spark-2" aria-hidden="true"></span>
          <span class="sb-spark sb-spark-3" aria-hidden="true"></span>
          <div class="sb-card-face">
            <span class="sb-card-qmark" aria-hidden="true">?</span>
          </div>
          <span class="sb-card-name">Mystery Fish</span>
          <span class="sb-card-hint-label">Click for a hint!</span>
        </div>`
    )
    .join("");

  heroSection.innerHTML = `
    <div class="game-hero-wrapper">

      <!-- ── Stage 1: Content row ──────────────────── -->
      <div class="game-content-row">

        <!-- Left 70%: game scene + glass title overlay + animated animals -->
        <div class="game-canvas-placeholder">

          <!-- HUD title strip — golden band with globe, title, timer -->
          <div class="game-title-strip">

            <!-- Left: earth + flowers icon -->
            <div class="strip-deco">
              <img src="./assets/images/icon_earth.png" alt="Earth with flowers" class="strip-earth-img">
            </div>

            <!-- Center: title text -->
            <span class="strip-title-text">Play and Save the Planet!</span>

            <!-- Right: countdown timer overlaid on sticker image -->
            <div class="strip-timer-wrap">
              <div class="strip-timer-sticker">
                <span class="timer-bonus-popup" id="timer-bonus-popup" aria-hidden="true"></span>
                <img src="./assets/images/time_sticker.png" alt="Time Left" class="strip-timer-sticker-img">
                <span class="strip-timer-value" id="game-timer">02:00</span>
              </div>
            </div>

          </div>

          <div class="game-scene-container">
            <img src="./assets/images/Game-page-image.png" alt="Game scene" class="game-scene-img">
            <!-- Guide message overlay on game scene -->
            <div class="game-guide-overlay" id="btn-guide" aria-live="polite">
              <i class="fa-solid fa-compass game-guide-icon" aria-hidden="true"></i>
              <span class="sb-guide-message" id="guide-message">Click on a mystery box to start</span>
            </div>

            <img src="./assets/images/Bird-hero.png"  class="game-bird game-bird-1" alt="Flying bird">
            <img src="./assets/images/Bird-hero1.png" class="game-bird game-bird-2" alt="Flying bird">
            <img src="./assets/images/Bird-hero2.png" class="game-bird game-bird-3" alt="Flying bird">
            <img src="./assets/images/crayfish.png"       alt="Crayfish"       class="game-crab   game-creature" data-animal-slug="crayfish">
            <img src="./assets/images/walleye.png"        alt="Walleye"        class="game-fish   game-creature" data-animal-slug="walleye">
            <img src="./assets/images/lake_sturgeon.png"  alt="Lake Sturgeon"  class="game-fish2  game-creature" data-animal-slug="lake-sturgeon">
            <img src="./assets/images/lake_whitefish.png" alt="Lake Whitefish" class="game-fish3  game-creature" data-animal-slug="lake-whitefish">
            <img src="./assets/images/goldeye.png"        alt="Goldeye"        class="game-fish4  game-creature" data-animal-slug="goldeye">
            <img src="./assets/images/northen_pike.png"   alt="Northern Pike"  class="game-fish5  game-creature" data-animal-slug="northern-pike">
            <div class="game-trash-bin-wrap" id="trash-drop-zone">
              <img src="./assets/images/trash_bin.png"   alt="Trash bin"       class="game-trash-img game-trash-normal">
              <img src="./assets/images/trash_happy.png" alt="Happy trash bin" class="game-trash-img game-trash-happy">
            </div>
            <!-- Sinking trash items -->
            <img src="./assets/images/trash_1.png" alt="" class="sinking-trash sinking-trash-1" aria-hidden="true">
            <img src="./assets/images/trash_2.png" alt="" class="sinking-trash sinking-trash-2" aria-hidden="true">
            <img src="./assets/images/trash_3.png" alt="" class="sinking-trash sinking-trash-3" aria-hidden="true">
            <!-- Start overlay — removed by JS when player clicks Start -->
            <div class="game-start-overlay" id="game-start-overlay">
              <div class="game-start-content">
                <p class="game-start-tagline">Can you find all the fish?</p>
                <button class="game-start-btn" id="btn-start">&#9654; Start</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right 30%: sticker book panel -->
        <div class="sticker-book-panel">

          <!-- 3a. Spiral binding -->
          <div class="sb-spiral" aria-hidden="true">${spiralDotsHTML}</div>

          <!-- 3b. Panel header -->
          <div class="sb-header">
            <span class="sb-header-title">Sticker Book!</span>
            <span class="sb-header-deco" aria-hidden="true">🐞</span>
          </div>


          <!-- 3d. Your Collection -->
          <div class="sb-collection">
            <div class="sb-collection-hdr">
              <span class="sb-collection-label">Your Collection</span>
              <span class="sb-collection-count" id="sb-count">0 / ${game.stickerBook.animals.length}</span>
            </div>
            <div class="sb-progress-wrap">
              <div class="sb-progress-bar" id="sb-progress-bar" style="width: 0%"></div>
              <div class="sb-progress-stars" id="sb-stars">
                ${'<span class="sb-star">★</span>'.repeat(game.stickerBook.animals.length - 1)}
              </div>
            </div>
            <div class="sb-sticker-grid" id="sb-grid">
              ${stickerCardsHTML}
            </div>
          </div>

          <!-- 3e. Hint history area -->
          <div class="sb-feedback" id="sb-feedback">
            <p class="sb-feedback-title" id="hint-history-label">Hint History</p>
            <div class="sb-hint-history" id="hint-history-list">

              <div class="hint-pill" data-hint-order="1" style="--pill-color: #f9a8d4;">
                <span class="hint-pill-spark hint-pill-spark-1" aria-hidden="true"></span>
                <span class="hint-pill-spark hint-pill-spark-2" aria-hidden="true"></span>
                <span class="hint-pill-order">Hint 1</span>
                <p class="hint-pill-text"></p>
              </div>

              <div class="hint-pill" data-hint-order="2" style="--pill-color: #93c5fd;">
                <span class="hint-pill-spark hint-pill-spark-1" aria-hidden="true"></span>
                <span class="hint-pill-spark hint-pill-spark-2" aria-hidden="true"></span>
                <span class="hint-pill-order">Hint 2</span>
                <p class="hint-pill-text"></p>
              </div>

              <div class="hint-pill" data-hint-order="3" style="--pill-color: #fcd34d;">
                <span class="hint-pill-spark hint-pill-spark-1" aria-hidden="true"></span>
                <span class="hint-pill-spark hint-pill-spark-2" aria-hidden="true"></span>
                <span class="hint-pill-order">Hint 3</span>
                <p class="hint-pill-text"></p>
              </div>

            </div>
          </div>

          <!-- 3f. Reset button -->
          <button class="sb-reset-btn" id="btn-reset" type="button">Reset Sticker Book</button>

        </div>

      </div>
    </div>
  `;
}

let _timerInterval      = null;
let _timerRemaining     = 0;
let _dangerActivated    = false;
let _criticalActivated  = false;
let _guideAltInterval   = null;
let _guideAltTimeout    = null;

const _fmt = (s) =>
  `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

export function startGameTimer(durationSeconds = 120, onExpire = null) {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
  _dangerActivated = false;

  const timerEl = document.getElementById("game-timer");
  if (!timerEl) return;

  _timerRemaining = durationSeconds;
  timerEl.textContent = _fmt(_timerRemaining);

  _timerInterval = setInterval(() => {
    _timerRemaining--;

    // Trigger danger mode at 60 s remaining
    if (_timerRemaining === 60 && !_dangerActivated) {
      _dangerActivated = true;
      _activateDangerMode();
    }

    // Escalate to critical mode at 30 s remaining
    if (_timerRemaining === 30 && !_criticalActivated) {
      _criticalActivated = true;
      _activateCriticalMode();
    }

    if (_timerRemaining <= 0) {
      _timerRemaining = 0;
      timerEl.textContent = _fmt(_timerRemaining);
      clearInterval(_timerInterval);
      _timerInterval = null;
      if (onExpire) onExpire();
      return;
    }
    timerEl.textContent = _fmt(_timerRemaining);
  }, 1000);
}

export function addTimerSeconds(bonus) {
  if (!_timerInterval) return;
  _timerRemaining += bonus;
  const timerEl = document.getElementById("game-timer");
  if (timerEl) timerEl.textContent = _fmt(_timerRemaining);
}

export function showTimerBonus(label = "+20s") {
  const el = document.getElementById("timer-bonus-popup");
  if (!el) return;
  el.textContent = label;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
}

// ── Danger mode (triggered at 60 s remaining) ─────────────────────────────────
const _URGENT_MSG = "Put trash in the bin for more time! ♻️";

function _activateDangerMode() {
  // 1. Timer heartbeat + red text
  document.querySelector(".strip-timer-sticker")?.classList.add("timer-danger");

  // 3. Guide — urgent fast pulse + red border
  document.getElementById("btn-guide")?.classList.add("guide-urgent");

  // 4. Trash items — breathe glow + shake
  document.querySelectorAll(".sinking-trash").forEach(t => t.classList.add("trash-urgent"));

  // 5. Guide message alternation
  _startGuideAlternation();
}

function _activateCriticalMode() {
  // Upgrade timer to fast heartbeat
  document.querySelector(".strip-timer-sticker")?.classList.add("timer-critical");
  // Upgrade guide to fast pulse + border
  document.getElementById("btn-guide")?.classList.add("guide-critical");
}

function _startGuideAlternation() {
  if (_guideAltInterval) return;

  function cycle() {
    const msgEl = document.getElementById("guide-message");
    if (!msgEl) return;
    const saved = msgEl.textContent;
    msgEl.textContent = _URGENT_MSG;
    _guideAltTimeout = setTimeout(() => {
      const el = document.getElementById("guide-message");
      // Only restore if urgent message is still showing (not overwritten by game logic)
      if (el && el.textContent === _URGENT_MSG) el.textContent = saved;
    }, 4000);
  }

  cycle();
  _guideAltInterval = setInterval(cycle, 5000);
}

export function stopGameTimer() {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
}

export function stopDangerMode() {
  if (_guideAltInterval) { clearInterval(_guideAltInterval); _guideAltInterval = null; }
  if (_guideAltTimeout)  { clearTimeout(_guideAltTimeout);   _guideAltTimeout  = null; }
  _dangerActivated   = false;
  _criticalActivated = false;
  const sticker = document.querySelector(".strip-timer-sticker");
  sticker?.classList.remove("timer-danger", "timer-critical");
  const guide = document.getElementById("btn-guide");
  guide?.classList.remove("guide-urgent", "guide-critical");
  document.querySelectorAll(".sinking-trash").forEach(t => t.classList.remove("trash-urgent"));
}

function renderFooter(footer) {
  const footerContainer = document.getElementById("site-footer");

  footerContainer.innerHTML = `
    <div class="site-footer" style="background-color: ${footer.backgroundColor};">
      <div class="container footer-inner">
        <div class="footer-logo">
          <img src="${footer.logo.image}" alt="${footer.logo.altText}" class="footer-logo-img" />
        </div>
        <nav class="footer-nav" aria-label="Footer links">
          ${footer.links.map(link => `<a href="${link.href}" class="footer-link"${link.label === 'Feedback' ? ' data-action="open-feedback"' : ''}>${link.label}</a>`).join("")}
        </nav>
        <p class="footer-copyright">${footer.copyright}</p>
      </div>
    </div>
  `;
}

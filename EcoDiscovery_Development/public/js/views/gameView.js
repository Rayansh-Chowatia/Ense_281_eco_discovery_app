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
                <img src="./assets/images/time_sticker.png" alt="Time Left" class="strip-timer-sticker-img">
                <span class="strip-timer-value" id="game-timer">05:00</span>
              </div>
            </div>

          </div>

          <div class="game-scene-container">
            <img src="./assets/images/Game-page-image.png" alt="Game scene" class="game-scene-img">
            <!-- Water animation overlays — purely visual, no pointer events -->
            <div class="water-overlay water-shimmer-layer" aria-hidden="true"></div>
            <div class="water-overlay water-caustic-1"     aria-hidden="true"></div>
            <div class="water-overlay water-caustic-2"     aria-hidden="true"></div>
            <div class="water-overlay water-surface-wave"  aria-hidden="true"></div>
            <img src="./assets/images/Bird-hero.png"  class="game-bird game-bird-1" alt="Flying bird">
            <img src="./assets/images/Bird-hero1.png" class="game-bird game-bird-2" alt="Flying bird">
            <img src="./assets/images/Bird-hero2.png" class="game-bird game-bird-3" alt="Flying bird">
            <img src="./assets/images/crayfish.png"       alt="Crayfish"       class="game-crab   game-creature" data-animal-slug="crayfish">
            <img src="./assets/images/walleye.png"        alt="Walleye"        class="game-fish   game-creature" data-animal-slug="walleye">
            <img src="./assets/images/lake_sturgeon.png"  alt="Lake Sturgeon"  class="game-fish2  game-creature" data-animal-slug="lake-sturgeon">
            <img src="./assets/images/lake_whitefish.png" alt="Lake Whitefish" class="game-fish3  game-creature" data-animal-slug="lake-whitefish">
            <img src="./assets/images/goldeye.png"        alt="Goldeye"        class="game-fish4  game-creature" data-animal-slug="goldeye">
            <img src="./assets/images/northen_pike.png"   alt="Northern Pike"  class="game-fish5  game-creature" data-animal-slug="northern-pike">
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

          <!-- 3c. Action buttons -->
          <div class="sb-actions">
            <div class="sb-btn sb-btn-hint" id="btn-guide" aria-live="polite">
              <span class="btn-spark btn-spark-1" aria-hidden="true"></span>
              <span class="btn-spark btn-spark-2" aria-hidden="true"></span>
              <span class="btn-spark btn-spark-3" aria-hidden="true"></span>
              <i class="fa-solid fa-compass sb-btn-icon" aria-hidden="true"></i>
              <div class="sb-btn-body">
                <span class="sb-guide-message" id="guide-message">Pick a mystery sticker</span>
              </div>
            </div>
            <div class="sb-btn sb-btn-facts" id="btn-facts">
              <span class="btn-spark btn-spark-1" aria-hidden="true"></span>
              <span class="btn-spark btn-spark-2" aria-hidden="true"></span>
              <span class="btn-spark btn-spark-3" aria-hidden="true"></span>
              <i class="fa-solid fa-book-open sb-btn-icon" aria-hidden="true"></i>
              <div class="sb-btn-body">
                <span class="sb-btn-title">Fish Facts</span>
                <span class="sb-btn-sub" id="fish-facts-text">Select a card to see a hint!</span>
              </div>
            </div>
          </div>

          <!-- 3d. Your Collection -->
          <div class="sb-collection">
            <div class="sb-collection-hdr">
              <span class="sb-collection-label">Your Collection</span>
              <span class="sb-collection-count" id="sb-count">0 / ${game.stickerBook.animals.length} found</span>
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

let _timerInterval = null;

export function startGameTimer(durationSeconds = 300) {
  // Clear any running timer before starting a new one
  if (_timerInterval) {
    clearInterval(_timerInterval);
    _timerInterval = null;
  }

  const timerEl = document.getElementById("game-timer");
  if (!timerEl) return;

  let remaining = durationSeconds;

  const fmt = (s) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  timerEl.textContent = fmt(remaining);

  _timerInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      remaining = 0;
      clearInterval(_timerInterval);
      _timerInterval = null;
    }
    timerEl.textContent = fmt(remaining);
  }, 1000);
}

function renderFooter(footer) {
  const footerContainer = document.getElementById("site-footer");

  footerContainer.innerHTML = `
    <div class="footer-top" style="background-color: ${footer.topFooterColor};">
      <div class="container footer-top-layout">
        <div class="footer-frog">
          <img
            src="${footer.frog.image}"
            alt="${footer.frog.altText}"
            class="footer-frog-img"
          />
        </div>

        <div class="footer-links-area">
          <nav class="footer-link-row footer-audience-links" aria-label="Audience links">
            ${footer.audienceLinks
              .map(
                (link) =>
                  `<a href="${link.href}" class="footer-link footer-link-highlight">${link.label}</a>`
              )
              .join("")}
          </nav>

          <div class="footer-link-row footer-social-links" aria-label="Social links">
            ${footer.socialLinks
              .map(
                (link) =>
                  `<a href="${link.href}" class="social-circle" aria-label="${link.label}" title="${link.label}">
                    <i class="${link.iconClass}"></i>
                  </a>`
              )
              .join("")}
          </div>

          <nav class="footer-link-row footer-utility-links" aria-label="Utility links">
            ${footer.utilityLinks
              .map(
                (link) =>
                  `<a href="${link.href}" class="footer-link">${link.label}</a>`
              )
              .join("")}
          </nav>
        </div>
      </div>
    </div>

    <div class="footer-bottom" style="background-color: ${footer.bottomFooterColor};">
      <div class="container footer-bottom-content">
        <p class="footer-quote">${footer.quote}</p>
      </div>
    </div>
  `;
}

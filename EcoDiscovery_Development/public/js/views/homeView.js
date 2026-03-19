export function renderHomePage(data) {
  renderHeader(data.header, data.siteName);
  renderHero(data.hero);
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
        <div class="site-brand">
  <img src="./assets/images/logo-fish.png" alt="Eco Discovery Logo" class="site-logo-img">
  <span class="site-title">Eco Discovery</span>
</div>
        <nav class="nav-menu">
          ${header.navLinks
            .map(
              (link) =>
                `<a href="${link.href}" class="nav-link-icon" aria-label="${link.label}">
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

function renderHero(hero) {
  const heroSection = document.getElementById("hero-section");

  const cardsHTML = hero.cards
    .map(
      (card) => `
      <a href="${card.href}" class="hero-card">
        <img src="${card.image}" alt="${card.title}" class="hero-card-img">
      </a>`
    )
    .join("");

  heroSection.innerHTML = `
    <div class="hero-background-wrapper">
      <img
        src="${hero.backgroundImage}"
        alt="${hero.altText}"
        class="hero-background-image"
      />
      <div class="nav-wave" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#2084BE" d="
            M0,0 L1440,0 L1440,35
            C1380,55 1320,15 1260,35
            C1200,55 1140,15 1080,35
            C1020,55  960,15  900,35
            C 840,55  780,15  720,35
            C 660,55  600,15  540,35
            C 480,55  420,15  360,35
            C 300,55  240,15  180,35
            C 120,55   60,15    0,35
            Z
          "/>
        </svg>
      </div>
      <img src="./assets/images/cloud1.png" class="cloud cloud1">
      <img src="./assets/images/cloud2.png" class="cloud cloud2">
      <img src="./assets/images/cloud3.png" class="cloud cloud3">
      <img src="./assets/images/Bird-hero.png" class="hero-bird hero-bird-1" alt="Flying bird">
      <img src="./assets/images/Bird-hero1.png" class="hero-bird hero-bird-2" alt="Flying bird">
      <img src="./assets/images/Bird-hero2.png" class="hero-bird hero-bird-3" alt="Flying bird">
      <div class="hero-overlay"></div>
      <div class="hero-content container">
        <a href="game.html" class="start-exploring-btn">Start Exploring</a>
      </div>
      <div class="hero-cards-wrapper">
        <div class="hero-cards-row">
          ${cardsHTML}
        </div>
      </div>
    </div>
  `;
}

function renderFeatures(cards) {
  const featuresSection = document.getElementById("features-section");

  const cardsHTML = cards
    .map(
      (card) => `
      <a href="${card.href}" class="feature-card">
        <img src="${card.image}" alt="${card.title}" class="feature-card-img">
      </a>`
    )
    .join("");

  featuresSection.innerHTML = `
    <div class="features-inner">
      <h2 class="features-heading">How It Works</h2>
      <div class="features-cards-row">
        ${cardsHTML}
      </div>
    </div>
  `;
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


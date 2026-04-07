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

function renderHero(hero) {
  const heroSection = document.getElementById("hero-section");

  // 5 floating sparkle particles around the CTA button
  const sparklesHTML = Array.from({ length: 5 }, (_, i) =>
    `<span class="sparkle sparkle-${i + 1}" aria-hidden="true"></span>`
  ).join("");

  // How-to-play cards with step badges
  const playCardsHTML = hero.cards
    .map(
      (card) => `
      <a href="${card.href}" class="play-card" style="--card-color: ${card.color};">
        <img src="${card.image}" alt="${card.title}" class="play-card-img">
        <div class="play-card-body">
          <h3 class="play-card-title">${card.title}</h3>
          <p class="play-card-desc">${card.description}</p>
        </div>
      </a>`
    )
    .join("");

  heroSection.innerHTML = `
    <!-- PART 1: Full-viewport hero — background, animals, welcome text, CTA -->
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

      <img src="./assets/images/cloud1.png" class="cloud cloud1" alt="">
      <img src="./assets/images/cloud3.png" class="cloud cloud3" alt="">

      <img src="./assets/images/Bird-hero.png"  class="hero-bird hero-bird-1" alt="Flying bird">
      <img src="./assets/images/Bird-hero1.png" class="hero-bird hero-bird-2" alt="Flying bird">
      <img src="./assets/images/Bird-hero2.png" class="hero-bird hero-bird-3" alt="Flying bird">

      <div class="hero-overlay"></div>

      <div class="hero-content">
        <h1 class="hero-title">${hero.welcomeTitle}</h1>
        <p class="hero-subtitle">${hero.subtitle}</p>
        <div class="hero-cta-wrapper">
          <a href="${hero.ctaHref}" class="start-exploring-btn">
            ${sparklesHTML}
            ${hero.ctaText}
          </a>
        </div>
      </div>
      <!-- How to Play — overlaid on hero image -->
      <section class="how-to-play" aria-labelledby="how-to-play-heading">
        <div class="container">
          <div class="play-cards-row">
            ${playCardsHTML}
          </div>
        </div>
      </section>
    </div>
  `;
}

// Dead code — kept for reference, not called
function renderFeatures(cards) {
  const featuresSection = document.getElementById("features-section");
  if (!featuresSection) return;

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

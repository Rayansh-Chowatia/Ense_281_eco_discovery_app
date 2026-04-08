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

function triggerBubbleBurst(heroEl) {
  const wrap = document.createElement('div');
  wrap.className = 'bubble-burst-wrap';
  heroEl.appendChild(wrap);

  const COUNT = 26;
  for (let i = 0; i < COUNT; i++) {
    const bbl  = document.createElement('div');
    bbl.className = 'bburst';

    const size  = 22 + Math.random() * 66;                          // 22–88px
    const left  = (i / COUNT) * 100 + (Math.random() - 0.5) * 5;  // evenly spread with jitter
    const delay = Math.random() * 0.5;                              // 0–0.5s stagger
    const dur   = 2.6 + Math.random() * 2.0;                       // 2.6–4.6s rise
    const sway  = ((Math.random() - 0.5) * 44).toFixed(1);         // ±22px horizontal sway

    bbl.style.width            = `${size}px`;
    bbl.style.left             = `${Math.max(0.5, Math.min(98.5, left))}%`;
    bbl.style.bottom           = `-${size + 8}px`;
    bbl.style.animationDuration = `${dur}s`;
    bbl.style.animationDelay   = `${delay}s`;
    bbl.style.setProperty('--sway', `${sway}px`);

    const img = document.createElement('img');
    img.src = './assets/images/bubble.png';
    img.className = 'bubble-img';
    img.alt = '';
    bbl.appendChild(img);

    // 2 sparkles per burst bubble (lighter than ambient)
    ['bsp1', 'bsp3'].forEach(cls => {
      const sp = document.createElement('span');
      sp.className = `bsparkle ${cls}`;
      bbl.appendChild(sp);
    });

    wrap.appendChild(bbl);
  }

  // Start fading out the whole burst after the peak density clears
  setTimeout(() => wrap.classList.add('bubble-burst-wrap--fade'), 900);
  // Remove from DOM once fully gone
  setTimeout(() => wrap.remove(), 5200);
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

      <!-- Wooden Slate Panels -->
      <div class="slate-panel slate-left">
        <div class="slate-content">
          <h3 class="slate-title">What You'll Learn</h3>
          <div class="slate-row"><span class="slate-icon">🔍</span><span>Discover Animals</span></div>
          <div class="slate-row"><span class="slate-icon">💡</span><span>Solve Hints</span></div>
          <div class="slate-row"><span class="slate-icon">🏷️</span><span>Collect Stickers</span></div>
        </div>
      </div>
      <div class="slate-panel slate-right">
        <div class="slate-content">
          <h3 class="slate-title">Your Mission</h3>
          <div class="slate-row"><span class="slate-icon">🐸</span><span>Find an Animal</span></div>
          <div class="slate-row"><span class="slate-icon">🌿</span><span>Nature Helper</span></div>
          <div class="slate-row"><span class="slate-icon">🏆</span><span>Eco Explorer</span></div>

        </div>
      </div>

      <!-- Mascots -->
      <div class="mascot-wrap mascot-left">
        <img src="./assets/images/Frog_explorer_1.png" class="mascot-img" alt="Froggy the explorer">
        <div class="mascot-bubble">Hi, I'm Froggy!<br>Do you wanna join the adventure?</div>
      </div>
      <div class="mascot-wrap mascot-right">
        <img src="./assets/images/Frog_explorer_2.png" class="mascot-img" alt="Ducky the explorer">
        <div class="mascot-bubble">Hey, I'm Ducky!<br>Sure, let's go on an adventure!</div>
      </div>

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

      <!-- Ambient bubbles (always present) -->
      <div class="bubble-wrap bubble-1" aria-hidden="true">
        <img src="./assets/images/bubble.png" class="bubble-img" alt="">
        <span class="bsparkle bsp1"></span>
        <span class="bsparkle bsp2"></span>
        <span class="bsparkle bsp3"></span>
        <span class="bsparkle bsp4"></span>
      </div>
      <div class="bubble-wrap bubble-2" aria-hidden="true">
        <img src="./assets/images/bubble.png" class="bubble-img" alt="">
        <span class="bsparkle bsp1"></span>
        <span class="bsparkle bsp2"></span>
        <span class="bsparkle bsp3"></span>
        <span class="bsparkle bsp4"></span>
      </div>
      <div class="bubble-wrap bubble-3" aria-hidden="true">
        <img src="./assets/images/bubble.png" class="bubble-img" alt="">
        <span class="bsparkle bsp1"></span>
        <span class="bsparkle bsp2"></span>
        <span class="bsparkle bsp3"></span>
        <span class="bsparkle bsp4"></span>
      </div>
    </div>
  `;

  // Fire the burst curtain on every page load / reload
  const heroWrapper = heroSection.querySelector('.hero-background-wrapper');
  if (heroWrapper) triggerBubbleBurst(heroWrapper);
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

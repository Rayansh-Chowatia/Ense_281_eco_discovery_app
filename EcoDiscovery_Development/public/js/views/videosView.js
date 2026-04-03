export function renderVideosPage(data) {
  renderHeader(data.header);
  renderHero(data.hero);
  renderFooter(data.footer);
}

function renderHeader(header) {
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

function renderHero(hero) {
  const heroSection = document.getElementById("hero-section");

  const tvRow1 = hero.tvImages.slice(0, 3)
    .map(src => `<img src="${src}" alt="TV" class="videos-tv-img">`)
    .join("");
  const tvRow2 = hero.tvImages.slice(3, 6)
    .map(src => `<img src="${src}" alt="TV" class="videos-tv-img">`)
    .join("");

  heroSection.innerHTML = `
    <div class="videos-hero-wrapper">
      <img
        src="${hero.backgroundImage}"
        alt="${hero.altText}"
        class="videos-hero-image"
      />
      <img src="./assets/images/vid-fish1.png" alt="Swimming fish" class="vid-fish vid-fish-1">
      <img src="./assets/images/vid-fish2.png" alt="Swimming fish" class="vid-fish vid-fish-2">
      <div class="videos-hero-content">
        <div class="videos-hero-card">
          <h1 class="videos-hero-title">
            ${hero.title}
            <img src="${hero.videoIcon}" alt="play" class="videos-hero-icon">
          </h1>
        </div>
        <div class="videos-tv-grid">
          <div class="videos-tv-row">${tvRow1}</div>
          <div class="videos-tv-row">${tvRow2}</div>
        </div>
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

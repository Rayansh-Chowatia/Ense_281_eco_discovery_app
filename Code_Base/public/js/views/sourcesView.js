export function renderSourcesPage(data) {
  renderHeader(data.header);
  renderHero(data.hero, data.fishSources, data.videoSources);
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

function renderHero(hero, fishSources, videoSources) {
  const heroSection = document.getElementById("hero-section");

  const fishCardsHTML = fishSources.map(fish => {
    const sourcesHTML = fish.sources.length > 0
      ? fish.sources.map(s => `
          <a href="${s.url}" class="src-link" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-arrow-up-right-from-square src-link-icon"></i>
            <span>${s.label}</span>
          </a>
        `).join("")
      : `<p class="src-no-sources">Sources coming soon.</p>`;

    return `
      <div class="src-fish-card">
        <div class="src-fish-header" style="background-color: ${fish.color};">
          <img src="${fish.icon}" alt="${fish.name}" class="src-fish-img">
          <h3 class="src-fish-name">${fish.name}</h3>
        </div>
        <div class="src-fish-body">
          ${sourcesHTML}
        </div>
      </div>
    `;
  }).join("");

  const videoCardsHTML = videoSources.map(video => `
    <a href="${video.url}" class="src-video-card" target="_blank" rel="noopener noreferrer">
      <div class="src-video-icon" style="background-color: ${video.color};">
        <i class="${video.iconClass}"></i>
      </div>
      <div class="src-video-body">
        <span class="src-video-category" style="color: ${video.color};">${video.category}</span>
        <p class="src-video-title">${video.title}</p>
        <span class="src-video-yt"><i class="fa-brands fa-youtube"></i> YouTube</span>
      </div>
      <i class="fa-solid fa-arrow-up-right-from-square src-video-arrow"></i>
    </a>
  `).join("");

  heroSection.innerHTML = `
    <div class="sources-hero-wrapper">
      <img src="${hero.backgroundImage}" alt="${hero.altText}" class="sources-hero-image">
      <img src="./assets/images/vid-fish1.png" alt="Swimming fish" class="src-fish src-fish-1">
      <img src="./assets/images/vid-fish2.png" alt="Swimming fish" class="src-fish src-fish-2">

      <div class="sources-overlay-content">

        <div class="sources-title-block">
          <div class="src-hero-card">
            <h1 class="sources-main-title">${hero.title}</h1>
          </div>
          <p class="sources-main-sub">${hero.subtitle}</p>
        </div>

        <div class="src-glass-section">
          <h2 class="src-glass-heading">Fish Information Sources</h2>
          <p class="src-glass-sub">References used for the freshwater animal facts and hints in the game.</p>
          <div class="src-fish-grid">
            ${fishCardsHTML}
          </div>
        </div>

        <div class="src-glass-section">
          <h2 class="src-glass-heading">Video Sources</h2>
          <p class="src-glass-sub">YouTube videos featured on the Videos page.</p>
          <div class="src-video-list">
            ${videoCardsHTML}
          </div>
        </div>

      </div>
    </div>
  `;

  // Clear old content section
  const contentSection = document.getElementById("sources-content");
  if (contentSection) contentSection.innerHTML = "";
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
          ${footer.links.map(link => `<a href="${link.href}" class="footer-link${link.active ? " footer-link-active" : ""}"${link.label === 'Feedback' ? ' data-action="open-feedback"' : ''}>${link.label}</a>`).join("")}
        </nav>
        <p class="footer-copyright">${footer.copyright}</p>
      </div>
    </div>
  `;
}

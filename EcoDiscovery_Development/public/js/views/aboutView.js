export function renderAboutPage(data) {
  renderHeader(data.header);
  renderHero(data.hero, data.mission, data.values, data.team);
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

function renderHero(hero, mission, values, team) {
  const heroSection = document.getElementById("hero-section");

  const valuesHTML = values.map(v => `
    <div class="about-glass-card">
      <div class="about-glass-icon" style="background-color: ${v.color};">
        <i class="${v.icon}"></i>
      </div>
      <h3 class="about-glass-card-title">${v.title}</h3>
      <p class="about-glass-card-desc">${v.description}</p>
    </div>
  `).join("");

  const teamHTML = team.members.map(m => `
    <div class="about-team-glass-card">
      <div class="about-team-avatar">
        <i class="fa-solid fa-user"></i>
      </div>
      <h3 class="about-team-name">${m.name}</h3>
      <p class="about-team-role">${m.role}</p>
    </div>
  `).join("");

  heroSection.innerHTML = `
    <div class="about-hero-wrapper">
      <img src="${hero.backgroundImage}" alt="${hero.altText}" class="about-hero-image">

      <div class="about-hero-overlay-content">

        <div class="about-title-block">
          <h1 class="about-main-title">About Eco Discovery 🌊</h1>
          <p class="about-main-subtitle">Discover. Learn. Protect.</p>
        </div>

        <div class="about-glass-mission">
          <p class="about-mission-text">${mission.body}</p>
        </div>

        <div class="about-glass-values-row">
          ${valuesHTML}
        </div>

        <div class="about-team-glass-section">
          <h2 class="about-team-glass-heading">${team.heading}</h2>
          <div class="about-team-glass-row">
            ${teamHTML}
          </div>
        </div>

      </div>
    </div>
  `;

  // Clear the old content section
  const contentSection = document.getElementById("about-content");
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
          ${footer.links.map(link => `<a href="${link.href}" class="footer-link">${link.label}</a>`).join("")}
        </nav>
        <p class="footer-copyright">${footer.copyright}</p>
      </div>
    </div>
  `;
}

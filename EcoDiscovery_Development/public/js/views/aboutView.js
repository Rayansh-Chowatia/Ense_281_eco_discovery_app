export function renderAboutPage(data) {
  renderHeader(data.header);
  renderHero(data.hero);
  renderContent(data.mission, data.values, data.team);
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

  heroSection.innerHTML = `
    <div class="about-hero-wrapper">
      <img src="${hero.backgroundImage}" alt="${hero.altText}" class="about-hero-image">
    </div>
  `;
}

function renderContent(mission, values, team) {
  const contentSection = document.getElementById("about-content");

  const valuesHTML = values.map(v => `
    <div class="about-value-card">
      <div class="about-value-icon" style="background-color: ${v.color};">
        <i class="${v.icon}"></i>
      </div>
      <h3 class="about-value-title">${v.title}</h3>
      <p class="about-value-desc">${v.description}</p>
    </div>
  `).join("");

  const teamHTML = team.members.map(m => `
    <div class="about-team-card">
      <div class="about-team-avatar">
        <i class="fa-solid fa-user"></i>
      </div>
      <h3 class="about-team-name">${m.name}</h3>
      <p class="about-team-role">${m.role}</p>
    </div>
  `).join("");

  contentSection.innerHTML = `
    <section class="about-mission-section">
      <div class="container">
        <h2 class="about-section-heading">${mission.heading}</h2>
        <p class="about-mission-body">${mission.body}</p>
      </div>
    </section>

    <section class="about-values-section">
      <div class="container">
        <h2 class="about-section-heading">What We Stand For</h2>
        <div class="about-values-row">
          ${valuesHTML}
        </div>
      </div>
    </section>

    <section class="about-team-section">
      <div class="container">
        <h2 class="about-section-heading">${team.heading}</h2>
        <p class="about-team-sub">${team.subtitle}</p>
        <div class="about-team-row">
          ${teamHTML}
        </div>
      </div>
    </section>
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
          ${footer.links.map(link => `<a href="${link.href}" class="footer-link">${link.label}</a>`).join("")}
        </nav>
        <p class="footer-copyright">${footer.copyright}</p>
      </div>
    </div>
  `;
}

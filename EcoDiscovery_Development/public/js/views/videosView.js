export function renderVideosPage(data) {
  renderHeader(data.header);
  renderHero(data.hero, data.videos);
  renderVideoModal();
  initVideoModal();
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

function renderHero(hero, videos) {
  const heroSection = document.getElementById("hero-section");

  function makeTvCard(src, video, tvNum) {
    const id = video ? safeYoutubeId(video.youtubeId) : "";
    const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
    const label = video ? escapeHtml(video.title) : "Video";
    const color = video ? video.color : "#4BA8A9";
    const sparkles = Array.from({length: 5}, (_, i) =>
      `<span class="tv-sparkle tv-sparkle-${i+1}" aria-hidden="true"></span>`
    ).join("");
    return `
      <div class="tv-unit" data-tv="${tvNum}">
        <div class="videos-tv-wrap" data-youtube-id="${id}"
             role="button" tabindex="0" aria-label="Play ${label}">
          <img src="${src}" alt="TV" class="videos-tv-img">
          <div class="videos-tv-screen">
            ${thumb ? `<img src="${thumb}" alt="${label}" class="videos-tv-thumb" loading="lazy">` : ""}
            <div class="videos-tv-play"><i class="fa-solid fa-circle-play"></i></div>
          </div>
        </div>
        <div class="tv-label-card" style="background-color: ${color};">
          ${sparkles}
          <span class="tv-label-title">${label}</span>
        </div>
      </div>`;
  }

  const tvRow1 = hero.tvImages.slice(0, 3)
    .map((src, i) => makeTvCard(src, videos[i], i + 1)).join("");
  const tvRow2 = hero.tvImages.slice(3, 6)
    .map((src, i) => makeTvCard(src, videos[i + 3], i + 4)).join("");

  heroSection.innerHTML = `
    <div class="videos-hero-wrapper">
      <img src="${hero.backgroundImage}" alt="${hero.altText}" class="videos-hero-image"/>
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

// ── Helpers ────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Allow only YouTube-safe characters (11-char alphanumeric + - _)
function safeYoutubeId(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, "");
}

// ── Video Modal ────────────────────────────────────────────────
function renderVideoModal() {
  const modal = document.createElement("div");
  modal.id = "video-modal";
  modal.className = "video-modal-overlay";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Video player");
  modal.innerHTML = `
    <div class="video-modal-box">
      <button class="video-modal-close" aria-label="Close video">&times;</button>
      <div class="video-modal-iframe-wrap">
        <iframe id="video-modal-iframe"
          src=""
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function initVideoModal() {
  const modal  = document.getElementById("video-modal");
  const iframe = document.getElementById("video-modal-iframe");
  const app    = document.getElementById("app");

  function openModal(youtubeId) {
    const id = safeYoutubeId(youtubeId);
    if (!id) return;
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    modal.classList.add("is-open");
    app.classList.add("app-blurred");
    document.body.style.overflow = "hidden";
    modal.querySelector(".video-modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    app.classList.remove("app-blurred");
    iframe.src = "";
    document.body.style.overflow = "";
  }

  // Click any TV in the hero
  document.getElementById("hero-section").addEventListener("click", (e) => {
    const tv = e.target.closest(".videos-tv-wrap");
    if (tv && tv.dataset.youtubeId) openModal(tv.dataset.youtubeId);
  });

  // Keyboard: Enter / Space on a TV
  document.getElementById("hero-section").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const tv = e.target.closest(".videos-tv-wrap");
      if (tv && tv.dataset.youtubeId) { e.preventDefault(); openModal(tv.dataset.youtubeId); }
    }
  });

  // Click backdrop to close
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // Close button
  modal.querySelector(".video-modal-close").addEventListener("click", closeModal);

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}

// ── Footer ─────────────────────────────────────────────────────
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

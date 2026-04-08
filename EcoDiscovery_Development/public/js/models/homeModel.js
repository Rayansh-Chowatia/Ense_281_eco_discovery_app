export const homePageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
      { label: "Home",     href: "index.html",  icon: "./assets/images/home -icon.png",     active: true },
      { label: "Game",     href: "game.html",   icon: "./assets/images/Game-button.png" },
      { label: "Videos",   href: "videos.html", icon: "./assets/images/Videos-button.png" },
      { label: "About Us", href: "about.html",  icon: "./assets/images/About-Us-button.png" }
    ]
  },

  hero: {
    backgroundImage: "./assets/images/lake-ecosystem-bg.png",
    altText: "Freshwater ecosystem background illustration",
    welcomeTitle: "Welcome, Explorer!",
    subtitle: "Discover amazing freshwater creatures in Saskatchewan!",
    ctaText: "Start Exploring",
    ctaHref: "game.html",
    cards: []
  },

  footer: {
    backgroundColor: "#4BA8A9",
    logo: { image: "./assets/images/logo-fish.png", altText: "Eco Discovery fish logo" },
    links: [
      { label: "Sources",    href: "sources.html" },
      { label: "Feedback",   href: "#" }
    ],
    copyright: "Eco Discovery © 2026"
  }
};
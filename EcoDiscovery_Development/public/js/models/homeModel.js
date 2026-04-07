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
    cards: [
      {
        stepNumber: 1,
        title: "Explore Animals",
        description: "Meet 6 amazing freshwater creatures that live in Saskatchewan lakes and rivers.",
        image: "./assets/images/game_interactive.png",
        href: "game.html",
        color: "#2ECC71"
      },
      {
        stepNumber: 2,
        title: "Collect Stickers",
        description: "Earn cool stickers as you learn and fill up your very own sticker book!",
        image: "./assets/images/sticker-icon.png",
        href: "#",
        color: "#F39C12"
      },
      {
        stepNumber: 3,
        title: "Watch Videos",
        description: "Watch fun nature videos and discover the secrets of freshwater ecosystems.",
        image: "./assets/images/card-videos.png",
        href: "#",
        color: "#3498DB"
      }
    ]
  },

  footer: {
    backgroundColor: "#4BA8A9",
    logo: { image: "./assets/images/logo-fish.png", altText: "Eco Discovery fish logo" },
    links: [
      { label: "Credits",    href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Sources",    href: "sources.html" },
      { label: "Feedback",   href: "#" }
    ],
    copyright: "Eco Discovery © 2026"
  }
};
export const gamePageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
      { label: "Home",     href: "index.html",  icon: "./assets/images/home -icon.png" },
      { label: "Game",     href: "game.html",   icon: "./assets/images/Game-button.png",  active: true },
      { label: "Videos",   href: "videos.html", icon: "./assets/images/Videos-button.png" },
      { label: "About Us", href: "about.html",  icon: "./assets/images/About-Us-button.png" }
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
  },

  game: {
    stickerBook: {
      animals: [
        { id: "walleye",        name: "Walleye",        color: "#f9a8d4" },
        { id: "lake-sturgeon",  name: "Lake Sturgeon",  color: "#93c5fd" },
        { id: "crayfish",       name: "Crayfish",       color: "#fcd34d" },
        { id: "lake-whitefish", name: "Lake Whitefish", color: "#86efac" },
        { id: "goldeye",        name: "Goldeye",        color: "#c4b5fd" },
        { id: "northern-pike",  name: "Northern Pike",  color: "#fdba74" }
      ]
    }
  }
};

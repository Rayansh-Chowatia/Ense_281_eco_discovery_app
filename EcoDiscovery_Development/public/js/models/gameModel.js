export const gamePageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
      { label: "Game",      href: "game.html",  icon: "./assets/images/Game-button.png",      active: true },
      { label: "Videos",    href: "#",           icon: "./assets/images/Videos-button.png" },
      { label: "Parents",   href: "#",           icon: "./assets/images/Parents-button.png" },
      { label: "Educators", href: "#",           icon: "./assets/images/Educators-button.png" },
      { label: "About Us",  href: "#",           icon: "./assets/images/About-Us-button.png" }
    ]
  },

  footer: {
    topFooterColor: "#4BA8A9",
    bottomFooterColor: "#296563",

    frog: {
      image: "./assets/images/logo-fish.png",
      altText: "Eco Discovery fish logo"
    },

    audienceLinks: [
      { label: "Kids",       href: "#" },
      { label: "Parents",    href: "#" },
      { label: "Educators",  href: "#" },
      { label: "About",      href: "#" }
    ],

    socialLinks: [
      { label: "YouTube",   href: "#", iconClass: "fa-brands fa-youtube" },
      { label: "Twitter",   href: "#", iconClass: "fa-brands fa-x-twitter" },
      { label: "Facebook",  href: "#", iconClass: "fa-brands fa-facebook-f" },
      { label: "Pinterest", href: "#", iconClass: "fa-brands fa-pinterest-p" }
    ],

    utilityLinks: [
      { label: "Credits",        href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Site Map",       href: "#" },
      { label: "Contact",        href: "#" },
      { label: "Help",           href: "#" }
    ],

    quote: "Discover. Learn. Protect.",
    copyright: "Eco Discovery © 2026"
  },

  game: {
    stickerBook: {
      animals: [
        { id: "sturgeon",  name: "Lake Sturgeon",  color: "#f9a8d4", hint: "Look in the deep river water!" },
        { id: "perch",     name: "Yellow Perch",   color: "#93c5fd", hint: "I swim in groups near the shore!" },
        { id: "duck",      name: "Mallard Duck",   color: "#fcd34d", hint: "Look for my green head near shallow water!" },
        { id: "beaver",    name: "Beaver",         color: "#86efac", hint: "Check near the riverbank!" },
        { id: "dragonfly", name: "Dragonfly",      color: "#c4b5fd", hint: "I zoom above the water surface!" },
        { id: "turtle",    name: "Painted Turtle", color: "#fdba74", hint: "I sunbathe on logs near the water!" }
      ]
    }
  }
};

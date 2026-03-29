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

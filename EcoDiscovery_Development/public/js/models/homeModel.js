export const homePageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
      { label: "Game",      href: "game.html", icon: "./assets/images/Game-button.png" },
      { label: "Videos",    href: "#", icon: "./assets/images/Videos-button.png" },
      { label: "Parents",   href: "#", icon: "./assets/images/Parents-button.png" },
      { label: "Educators", href: "#", icon: "./assets/images/Educators-button.png" },
      { label: "About Us",  href: "#", icon: "./assets/images/About-Us-button.png" }
    ]
  },

  hero: {
    backgroundImage: "./assets/images/lake-ecosystem-bg.png",
    altText: "Freshwater ecosystem background illustration",
    cards: [
      { title: "Explore Animals",   description: "Learn about 6 local freshwater creatures.", image: "./assets/images/card-animals.png",  href: "game.html" },
      { title: "Collect Stickers",  description: "Fill your sticker book as you play.",        image: "./assets/images/card-stickers.png", href: "#" },
      { title: "Explore Videos",   description: "Watch fun and educational videos.",           image: "./assets/images/card-videos.png",   href: "#" }
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
      { label: "Kids", href: "#" },
      { label: "Parents", href: "#" },
      { label: "Educators", href: "#" },
      { label: "About", href: "#" }
    ],

    socialLinks: [
  { label: "YouTube", href: "#", iconClass: "fa-brands fa-youtube" },
  { label: "Twitter", href: "#", iconClass: "fa-brands fa-x-twitter" },
  { label: "Facebook", href: "#", iconClass: "fa-brands fa-facebook-f" },
  { label: "Pinterest", href: "#", iconClass: "fa-brands fa-pinterest-p" }
    ],

    utilityLinks: [
      { label: "Credits", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Site Map", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Help", href: "#" }
    ],

    quote: "Discover. Learn. Protect.",
    copyright: "Eco Discovery © 2026"
  }
};
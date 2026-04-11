export const videosPageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
      { label: "Home",     href: "index.html",  icon: "./assets/images/home -icon.png" },
      { label: "Game",     href: "game.html",   icon: "./assets/images/Game-button.png" },
      { label: "Videos",   href: "videos.html", icon: "./assets/images/Videos-button.png", active: true },
      { label: "About Us", href: "about.html",  icon: "./assets/images/About-Us-button.png" }
    ]
  },

  hero: {
    backgroundImage: "./assets/images/video_hero.png",
    altText: "Freshwater video hero background",
    title: "Watch & Learn!",
    videoIcon: "./assets/images/video_icon.png",
    tvImages: [
      "./assets/images/tv1.png",
      "./assets/images/tv2.png",
      "./assets/images/tv3.png",
      "./assets/images/tv4.png",
      "./assets/images/tv5.png"
    ]
  },

  videos: [
    {
      id: 1,
      title: "Meet the Freshwater Fish!",
      description: "Dive in and discover the amazing fish that live in Saskatchewan's lakes and rivers.",
      category: "Wildlife",
      color: "#2ECC71",
      iconClass: "fa-solid fa-fish",
      videoSrc: "./assets/videos/walleye-vid.mp4"
    },
    {
      id: 2,
      title: "Life in a Saskatchewan Lake",
      description: "A close-up look at the incredible creatures hiding beneath the surface of a prairie lake.",
      category: "Ecosystems",
      color: "#3498DB",
      iconClass: "fa-solid fa-water",
      videoSrc: "./assets/videos/fresheco-vid.mp4"
    },
    {
      id: 3,
      title: "The Amazing Sturgeon",
      description: "Discover the ancient and incredible sturgeon fish that have roamed our waterways for millions of years.",
      category: "Wildlife",
      color: "#9B59B6",
      iconClass: "fa-solid fa-fish",
      videoSrc: "./assets/videos/sturg-vid.mp4",
      thumbnail: "./assets/images/thumbnail1.png"
    },
    {
      id: 4,
      title: "Life of a Crayfish",
      description: "Find out how crayfish survive and thrive in freshwater streams and lakes.",
      category: "Science",
      color: "#F39C12",
      iconClass: "fa-solid fa-flask",
      videoSrc: "./assets/videos/crayfish-vid.mp4"
    },
    {
      id: 5,
      title: "Protecting Our Waterways",
      description: "Discover why clean rivers and lakes matter, and how you can help protect them.",
      category: "Conservation",
      color: "#E74C3C",
      iconClass: "fa-solid fa-leaf",
      videoSrc: "./assets/videos/rivdelta-vid.mp4",
      thumbnail: "./assets/images/thumbnail2.png"
    }
  ],

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

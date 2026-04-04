export const videosPageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
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
      "./assets/images/tv5.png",
      "./assets/images/tv6.png"
    ]
  },

  // youtubeId: paste the 11-character video ID from the YouTube URL
  // e.g. youtube.com/watch?v=dQw4w9WgXcQ  →  youtubeId: "dQw4w9WgXcQ"
  videos: [
    {
      id: 1,
      title: "Meet the Freshwater Fish!",
      description: "Dive in and discover the amazing fish that live in Saskatchewan's lakes and rivers.",
      category: "Wildlife",
      color: "#2ECC71",
      iconClass: "fa-solid fa-fish",
      youtubeId: "EY6o8dz1PZU"
    },
    {
      id: 2,
      title: "Life in a Saskatchewan Lake",
      description: "A close-up look at the incredible creatures hiding beneath the surface of a prairie lake.",
      category: "Ecosystems",
      color: "#3498DB",
      iconClass: "fa-solid fa-water",
      youtubeId: "95O7nocd2N4"
    },
    {
      id: 3,
      title: "The Amazing Dragonfly",
      description: "Learn how dragonflies start life underwater and become incredible aerial hunters.",
      category: "Insects",
      color: "#9B59B6",
      iconClass: "fa-solid fa-bug",
      youtubeId: "UkyAjFD6KcY"
    },
    {
      id: 4,
      title: "How Do Fish Breathe?",
      description: "Find out the science behind gills and how fish get oxygen from the water.",
      category: "Science",
      color: "#F39C12",
      iconClass: "fa-solid fa-flask",
      youtubeId: "VR1XXmOrJME"
    },
    {
      id: 5,
      title: "Protecting Our Waterways",
      description: "Discover why clean rivers and lakes matter, and how you can help protect them.",
      category: "Conservation",
      color: "#E74C3C",
      iconClass: "fa-solid fa-leaf",
      youtubeId: "rwXQilqrFiA"
    },
    {
      id: 6,
      title: "The Water Cycle Adventure",
      description: "Follow a water droplet on its incredible journey from a lake to a cloud and back again.",
      category: "Science",
      color: "#1ABC9C",
      iconClass: "fa-solid fa-cloud-rain",
      youtubeId: "sKJoXdrOT70"
    }
  ],

  footer: {
    backgroundColor: "#4BA8A9",
    logo: { image: "./assets/images/logo-fish.png", altText: "Eco Discovery fish logo" },
    links: [
      { label: "Credits",    href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Sources",    href: "#" },
      { label: "Feedback",   href: "#" }
    ],
    copyright: "Eco Discovery © 2026"
  }
};

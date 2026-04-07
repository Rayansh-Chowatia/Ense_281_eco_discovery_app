export const sourcesPageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
      { label: "Home",     href: "index.html",  icon: "./assets/images/home -icon.png" },
      { label: "Game",     href: "game.html",   icon: "./assets/images/Game-button.png" },
      { label: "Videos",   href: "videos.html", icon: "./assets/images/Videos-button.png" },
      { label: "About Us", href: "about.html",  icon: "./assets/images/About-Us-button.png" }
    ]
  },

  hero: {
    backgroundImage: "./assets/images/about-hero.png",
    altText: "Sources hero background",
    title: "Our Sources",
    subtitle: "References and videos that power Eco Discovery"
  },

  // Sources for each freshwater animal in the game
  fishSources: [
    {
      name: "Lake Sturgeon",
      icon: "./assets/images/lake_sturgeon.png",
      color: "#2084BE",
      sources: [
        {
          label: "Frontenac Arch Biosphere — History of Lake Sturgeons",
          url: "https://frontenacarchbiosphere.ca/history-of-lake-sturgeons/"
        },
        {
          label: "Saskatchewan Polytechnic — Non-Invasive Research on Lake Sturgeon",
          url: "https://saskpolytech.ca/news/posts/2024/non-invasive-research-on-lake-sturgeon.aspx"
        },
        {
          label: "U.S. Fish & Wildlife Service — Juvenile Lake Sturgeon Barbels",
          url: "https://www.fws.gov/media/juvenile-lake-sturgeon-barbels"
        }
      ]
    },
    {
      name: "Goldeye",
      icon: "./assets/images/goldeye.png",
      color: "#F39C12",
      sources: [
        {
          label: "Missouri Department of Conservation — Goldeye Field Guide",
          url: "https://mdc.mo.gov/discover-nature/field-guide/goldeye"
        }
      ]
    },
    {
      name: "Walleye",
      icon: "./assets/images/walleye.png",
      color: "#E74C3C",
      sources: []
    },
    {
      name: "Lake Whitefish",
      icon: "./assets/images/lake_whitefish.png",
      color: "#1ABC9C",
      sources: [
        {
          label: "Yukon Wildlife — Lake Whitefish",
          url: "https://yukon.ca/en/outdoor-recreation-and-wildlife/yukon-wildlife/lake-whitefish"
        },
        {
          label: "Minnesota DNR — Lake Whitefish Species Profile",
          url: "https://www.dnr.state.mn.us/minnaqua/speciesprofile/lake_whitefish.html"
        }
      ]
    },
    {
      name: "Crayfish",
      icon: "./assets/images/crayfish.png",
      color: "#9B59B6",
      sources: [
        {
          label: "Virginia Cooperative Extension — Crayfish Biology and Management",
          url: "https://www.pubs.ext.vt.edu/420/420-524/420-524.html"
        }
      ]
    },
    {
      name: "Northern Pike",
      icon: "./assets/images/northen_pike.png",
      color: "#2ECC71",
      sources: [
        {
          label: "Fisheries and Oceans Canada — Northern Pike Species Profile",
          url: "https://www.dfo-mpo.gc.ca/species-especes/profiles-profils/northernpike-grandbrochet-eng.html"
        }
      ]
    }
  ],

  // YouTube videos featured on the Videos page
  videoSources: [
    {
      title: "Meet the Freshwater Fish!",
      category: "Wildlife",
      color: "#2ECC71",
      iconClass: "fa-solid fa-fish",
      url: "https://www.youtube.com/watch?v=EY6o8dz1PZU"
    },
    {
      title: "Life in a Saskatchewan Lake",
      category: "Ecosystems",
      color: "#3498DB",
      iconClass: "fa-solid fa-water",
      url: "https://www.youtube.com/watch?v=95O7nocd2N4"
    },
    {
      title: "The Amazing Dragonfly",
      category: "Insects",
      color: "#9B59B6",
      iconClass: "fa-solid fa-bug",
      url: "https://www.youtube.com/watch?v=UkyAjFD6KcY"
    },
    {
      title: "How Do Fish Breathe?",
      category: "Science",
      color: "#F39C12",
      iconClass: "fa-solid fa-flask",
      url: "https://www.youtube.com/watch?v=VR1XXmOrJME"
    },
    {
      title: "Protecting Our Waterways",
      category: "Conservation",
      color: "#E74C3C",
      iconClass: "fa-solid fa-leaf",
      url: "https://www.youtube.com/watch?v=rwXQilqrFiA"
    },
    {
      title: "The Water Cycle Adventure",
      category: "Science",
      color: "#1ABC9C",
      iconClass: "fa-solid fa-cloud-rain",
      url: "https://www.youtube.com/watch?v=sKJoXdrOT70"
    }
  ],

  footer: {
    backgroundColor: "#4BA8A9",
    logo: { image: "./assets/images/logo-fish.png", altText: "Eco Discovery fish logo" },
    links: [
      { label: "Credits",    href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Sources",    href: "sources.html", active: true },
      { label: "Feedback",   href: "#" }
    ],
    copyright: "Eco Discovery © 2026"
  }
};

export const aboutPageData = {
  siteName: "Eco Discovery",

  header: {
    topBarText: "Explore nature. Discover ecosystems. Protect our planet.",
    topBarColor: "#4BA8A9",
    navBarColor: "#2084BE",
    navLinks: [
      { label: "Home",     href: "index.html",  icon: "./assets/images/home -icon.png" },
      { label: "Game",     href: "game.html",   icon: "./assets/images/Game-button.png" },
      { label: "Videos",   href: "videos.html", icon: "./assets/images/Videos-button.png" },
      { label: "About Us", href: "about.html",  icon: "./assets/images/About-Us-button.png", active: true }
    ]
  },

  hero: {
    backgroundImage: "./assets/images/about-hero.png",
    altText: "About Us hero background",
    title: "About Us",
    subtitle: "Meet the team behind Eco Discovery"
  },

  mission: {
    heading: "Our Mission",
    body: "Eco Discovery was built to spark curiosity and wonder in young explorers. We believe every child deserves the chance to discover the incredible freshwater ecosystems right here in Saskatchewan — the fish, insects, and creatures that call our lakes and rivers home. Through play, video, and interactive learning, we make nature education fun, memorable, and accessible for everyone."
  },

  values: [
    {
      icon: "fa-solid fa-leaf",
      color: "#2ECC71",
      title: "Conservation",
      description: "We inspire the next generation to value and protect freshwater ecosystems."
    },
    {
      icon: "fa-solid fa-gamepad",
      color: "#3498DB",
      title: "Play-Based Learning",
      description: "Learning sticks when it's fun. Our game-first approach keeps kids engaged and curious."
    },
    {
      icon: "fa-solid fa-people-group",
      color: "#F39C12",
      title: "Community",
      description: "Built by students at the University of Regina for classrooms, families, and communities across Saskatchewan."
    }
  ],

  team: {
    heading: "Meet the Team",
    subtitle: "We are ENSE 281 students at the University of Regina passionate about technology and the environment.",
    members: [
      { name: "Aubin Iradukunda",    role: "Developer & Designer" },
      { name: "Team Member 2",       role: "Developer" },
      { name: "Team Member 3",       role: "Developer" },
      { name: "Team Member 4",       role: "Developer" }
    ]
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

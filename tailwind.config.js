module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
      },
      boxShadow: {
        "all-rounded": "0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
        all: "0 3px 10px rgb(0 0 0 / 0.2)",
      },
      colors: {
        primary: "#188796",
        dark: "#071e34",
        "dark-card": "#20354b",
        light: "#f9f9f9",
        "light-card": "#f6f6f0",
      },
    },
  },
  darkMode: "class",
};

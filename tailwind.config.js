/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        paper: "#F7F3EB",
        forest: "#19382F",
        forestDeep: "#102A23",
        rose: "#C33982",
        copper: "#B76F51",
        ink: "#202820",
        muted: "#777B71",
        line: "#E7E0D5",
        sand: "#E9DDC9",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};


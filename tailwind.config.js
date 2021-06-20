const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  important: true,
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        mobile: { min: "225px", max: "768px" },
        medium: { min: "768px", max: "1024px" },
      },
      colors: {
        primary: {
          50: "#e1f4ed",
          100: "#b3e5d3",
          200: "#80d3b5",
          300: "#4dc197",
          400: "#27b481",
          500: "#01a76b",
          600: "#019f63",
          700: "#019658",
          800: "#018c4e",
          900: "#007c3c",
          accent: '#EBFFF7'
        },
        accent: {
          50: "#e2eee8",
          100: "#b6d4c5",
          200: "#86b89e",
          300: "#559b77",
          400: "#30855a",
          500: "#0c703d",
          600: "#0a6837",
          700: "#085d2f",
          800: "#065327",
          900: "#03411a",
          accent: "#567163"
        },
        "black-shade": {
          50: "#737373",
          100: "#666666",
          200: "#4D4D4D",
          300: "#333333",
          400: "#1A1A1A",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

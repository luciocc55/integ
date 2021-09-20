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
          50 : '#e0eef4',
          100 : '#b3d4e5',
          200 : '#80b8d3',
          300 : '#4d9bc1',
          400 : '#2685b4',
          500 : '#0070a7',
          600 : '#00689f',
          700 : '#005d96',
          800 : '#00538c',
          900 : '#00417c',
          accent: '#e9f8ff'
        },
        accent: {
          50 : '#e9edee',
          100 : '#c8d2d5',
          200 : '#a3b4ba',
          300 : '#7e969e',
          400 : '#628089',
          500 : '#466974',
          600 : '#3f616c',
          700 : '#375661',
          800 : '#2f4c57',
          900 : '#203b44',
          accent: "#536a71"
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
    extend: {
      backgroundColor: ['disabled']
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

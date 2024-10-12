/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './common/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-primary': '#5142FC',
        'custom-secondary': '#9B0AA0',
      },
      backgroundColor: {
        'dark-background': '#141420',
        'custom-primary': '#5142FC',
        'custom-secondary': '#9B0AA0',
        'card-background': '#040F58',
        'dark-secondary': '#2C2C39',
      },
      backgroundImage: {
        'lines-gradient': 'linear-gradient(to bottom, #FFFFFF 0%, transparent 100%)',
        'button-gradient-hover': 'linear-gradient(to right, rgba(227, 164, 127, 0.9) 0%, rgba(202, 66, 140, 0.9) 50%, rgba(103, 65, 232, 0.9) 100%)',
      },
    },
  },
  plugins: [
    require('./common/utils/tailwindPlugins/animations'),
    ({ addBase, theme }) => {
      let allColors = flattenColorPalette(theme("colors"));
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
}

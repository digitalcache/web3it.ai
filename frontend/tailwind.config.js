/** @type {import('tailwindcss').Config} */

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
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [
    require('./common/utils/tailwindPlugins/animations'),
  ],
}

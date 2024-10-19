/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './common/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'violets-are-blue': '#7E5EF2',
        'space-cadet': '#2A2359',
        'yankees-blue': '#211D40',
        'eerie-black': '#181926',
        'manatee': '#979DA6',
      },
    },
    keyframes: {
      ldsLoader: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      ldsLoader: 'ldsLoader 1s cubic-bezier(0.5, 0, 0.5, 1) infinite',
    },
  },
  plugins: [
    require('./common/utils/tailwindPlugins/animations'),
  ],
}

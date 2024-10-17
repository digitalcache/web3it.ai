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
  },
  plugins: [
    require('./common/utils/tailwindPlugins/animations'),
  ],
}

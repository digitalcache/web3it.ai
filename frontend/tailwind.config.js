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
      rotatingGradient: {
        '0%': { background: '#a855f7' },
        '50%': { background: '#6366f1' },
        '100%': { background: '#a855f7' },
      },
      animateIn: {
        'to': {
          opacity: '1',
          transform: 'translateY(0)',
        }
      }
    },
    animation: {
      ldsLoader: 'ldsLoader 1s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      rotatingGradient: 'rotatingGradient 2s cubic-bezier(0.5, 0, 0.5, 1) infinite alternate',
      animateIn: 'animateIn 0.5s ease-in-out forwards',
    },
  },
  plugins: [
    require('./common/utils/tailwindPlugins/animations'),
  ],
}

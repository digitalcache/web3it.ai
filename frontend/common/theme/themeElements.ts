// py classes on elements with border may differ from figma values because figma applies border inside element and browser applies it outside,
// so we need to compensate that difference by reducing horizontal padding
export const themeElements = {
  buttons: {
    primary: {
      style: `flex items-center justify-center text-white rounded-lg outline-none`,
      size: {
        sm: 'px-3 py-2 font-medium text-base',
        md: 'px-4 py-3 font-medium text-base',
        lg: 'px-4 py-3 font-medium text-base',
      },
    },
    secondary: {
      style: `flex items-center justify-center text-white rounded-lg outline-none transition-colors duration-150`,
      size: {
        sm: 'px-4 py-2 font-medium text-base',
        md: 'px-4 py-3 font-medium text-base',
        lg: 'px-4 py-3 font-medium text-base',
      },
    },
  },
}

import lang from './lang'

const {
  generateIdea,
  homePage,
} = lang

export const mobileWidthLimit = 480;
export const tabletWidthLimit = 768;
export const lowResDeskLimit = 1024;

export const ContractFunctions = {
  getIdeas: 'getAllIdeaTokens',
  getIdea: 'getIdeaToken',
  createIdeaToken: 'createIdeaToken',
  buyToken: 'buyIdeaToken',
  calculateCost: 'calculateCost',
}

export const FILE_SIZE_FIVE_MB = 5000000;
export const acceptedImageMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/gif', 'image/apng', 'image/avif'];
export const promptPlaceholders = generateIdea.promptPlaceholders;
export const promptLoadingStates = generateIdea.promptLoadingStates

export const landingPageDescription = `
  Based on the idea name, logo, and description created earlier, provide a landing page svg image with the following criteria:
  1. Maintain a width of 1280px and height of 720px
  2. Provide a navigation bar with logo on left and menu items like about, team, services on the right
  3. Have illustration about the product on the right
  4. Have some intro about the idea and also include the description created earlier
  5. Include a primary and secondary button as well
`
export const heroWords = homePage.heroWords;

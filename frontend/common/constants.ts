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
  Design a landing page SVG image for our crowdfunding blockchain application, ensuring it reflects the essence of our early-stage company support platform. 
  Please adhere to the following criteria for the design:

  1.Dimensions: The image should be 1280px in width and 720px in height to ensure it's optimally displayed across various devices.

  2.Navigation Bar: Incorporate a navigation bar at the top. Place the logo on the left side of the bar which was created earlier. 
  Place menu items such as 'About', 'Team', and 'Services' on the right side, ensuring easy navigation for visitors.

  3.Product Illustration: Feature a creative and engaging illustration of our crowdfunding blockchain application on the right side of 
  the page to visually communicate our product's functionality and benefits.
  
  4.Introduction and Description: On the left side, provide a compelling introduction to our idea, followed by the description crafted earlier. 
  This section should succinctly convey the value proposition and how our platform supports early-stage companies. 
  The description should overflow to the next line and should not be collide with the illustration on the right. 
  Ensure it is having the property text align left.

  5.Call-to-Action Buttons: Include a primary and secondary call-to-action button. The primary button could be for users to 'Get Started' or 'Learn More', and the secondary button could offer additional information, such as 'Request a Demo' or 'Read More About Us'. Ensure these buttons are prominently displayed and encourage user engagement.
  
  This design should encapsulate the innovative spirit of our platform, making it appealing and informative for potential users and investors.
`
export const heroWords = homePage.heroWords;

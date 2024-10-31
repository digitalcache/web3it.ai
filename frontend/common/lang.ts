
const header = {
  connectButton: {
    connectWallet: 'Connect wallet',
    wrongNetwork: 'Wrong network',
  },
  searchIdeas: {
    placeholder: 'Search for Ideas',
    noIdeasFound: 'No Ideas found',
  },
}

const notFound = {
  heading: 'Something went wrong',
  subHeading1: 'Brace yourself till we get the error fixed',
  subHeading2: 'You may also refresh the page or try again later',
  buttonTitle: 'Return Home',
}

const footer = {
  team: 'Team',
  aboutUs: 'About Us',
  privacyPolicy: 'Privacy Policy',
  contactUs: 'Contact us',
  contactUsModal: {
    heading: 'Contact Us',
    submitButton: 'Send',
    youCanContact: 'You can contact us at',
  },
}

const createIdea = {
  categories: {
    noTagsFound: 'No Categories found',
  },
  heading: 'Create Idea',
  subHeading: 'Register your Idea by creating a token and try to give as much details as possible',
  tokenCreationFeeLabel: 'One time fee:',
  maxSupplyLabel: 'Max Supply: ',
  initialMintLabel: 'Initial Mint: ',
  tokensSuffix: ' tokens',
  targetInfoPart1: 'If funding target of ',
  targetInfoPart2: 'is met, a liquidity pool will be created on Uniswap.',
  ideaNotFound: "Idea not found!",
  ideaCreatedMessage: 'Idea successfully created!',
  errorOccured: "Something went wrong. Please try again!",
  validationErrors: {
    nameRequired: 'Please enter a name for your idea',
    nameMinError: 'Please enter more than 2 characters',
    nameMaxError: 'Please enter less than 20 characters',
    tickerRequired: 'Please enter a name for your ticker',
    tickerMinError: 'Please enter more than 2 characters',
    tickerMaxError: 'Please enter less than 20 characters',
    logoRequired: 'Please upload an image',
    descriptionRequired: 'Please provide a description of your idea',
    descriptionMinError: 'Please enter more than 10 characters',
    descriptionMaxError: 'Please enter less than 1000 characters',
    categoriesRequired: 'Please select a category',
    websiteRequired: 'Please provide a valid link to your website',
    twitterInvalid: 'Please provide a valid X link',
  },
  imageUpload: {
    title: 'Logo or image depicting your idea',
    imageSizeError: 'Please upload image less than 5 mb',
    imageType: 'This is a wrong file format. Only image files are allowed.',
    uploadError: 'Could not add file. Please try again.',
    uploading: 'Uploading...',
    uploadLabel: 'Upload here',
  },
  form: {
    name: 'Idea name',
    ticker: 'Ticker name',
    description: 'Description',
    category: 'Select category',
    website: 'Website',
    twitter: 'X (optional)',
    submitLabel: 'Register your idea',
  },
}

const generateIdea = {
  promptPlaceholders: [
    "Create the next Decentralized Social Media Platform",
    "Create an AI-Driven Marketplace for Digital Assets",
    "Create a DAO Management Platform",
    "Create a Blockchain-Based E-Learning Platform",
    "Create a Smart Contract Development Assistant",
  ],
  promptLoadingStates: [
    {
      text: "Idea Conceptualization",
    },
    {
      text: "Planning and Design",
    },
    {
      text: "Choosing the Technology Stack",
    },
    {
      text: "Setting Up the Development Environment",
    },
    {
      text: "Developing the Frontend",
    },
    {
      text: "Developing the Backend",
    },
    {
      text: "Integration and Testing",
    },
    {
      text: "Optimizing and Deploying",
    },
  ],
  greeting: {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
  },
  generateError: 'Something went wrong. Please try again later.',
  poweredBy: 'powered by',
  continue: 'Continue to Create Token',
  proceed: 'Proceed',
  orEnhance: 'Or keep enhancing the idea',
}

const ideas = {
  ideaCard: {
    raised: 'Raised',
  },
  currentIdeas: 'Current Ideas',
  currentIdeasSubHeading: 'Explore how ideas are doing in the market',
}

const homePage = {
  timeline: {
    heading: 'Explore your journey with our app',
    subHeading: 'You can harness the power of AI to transform your ideas into a fully functional application',
  },
  subHeading: 'Explore ideas with Web3It.AI',
  h1: 'Fund your Web3 project with ease.',
  subHeading1: "Launch a new project or secure funding for your Web3 site with our application, guiding you from design through to the development of your application using Claude AI.",
  subHeading2: "Join us in redefining the digital landscape, where your ideas are not just seen but are also invested in and supported through the power of tokenization. Let's build the future of the web, together.",
  heroWords: [
    {
      text: "Effortlessly",
    },
    {
      text: "Fund",
    },
    {
      text: "Your",
    },
    {
      text: "Web3",
      className: "gradientText",
    },
    {
      text: "Ideas",
    },
  ],
  fundButtonLabel: 'Finance Your Venture',
  generateButtonLabel: 'Create Your Concept',
  trendingIdeas: 'Trending Ideas',
  developmentProcess: {
    heading: 'Development Process',
    stepOneTitle: 'Ideation',
    stepOneInfo: 'Conceptualize Your Web3 Idea',
    stepTwoTitle: 'App Development',
    stepTwoInfo: 'Unleash your creativity with your prompts and transform text into functional applications using Claude AI',
    stepThreeTitle: 'Funding',
    stepThreeInfo: "Enhance your project's visibility by issuing a token, allowing others to discover and purchase your tokens",
    stepFourTitle: 'Strategize',
    stepFourInfo: 'Receive guidance on enhancing your networking and marketing to achieve excellence',
  },
}

const ideaPage = {
  createdBy: 'Created by',
  tokenAddress: 'Token address',
  fundingRaised: 'Raised',
  visitWebsite: 'Website',
  stakeholders: 'Stakeholders',
  checkTransHeading: 'Check out ongoing trades on',
  transactionsTable: {
    columnOne: 'Account',
    columnTwo: 'Value',
    columnThree: 'Time',
    columnFour: 'Transaction',
  },
  limitedTokensError: 'Limited tokens. There is only %amount% tokens left.',
  purchaseSuccess: 'Congratulations! You have purchased',
  purchaseError: 'Purchase could not be completed. Please try again!',
  bondingCurveProgress: 'Bonding curve progress',
  buyTokensFor: 'Buy tokens for',
  availableTokens: 'Available tokens',
  purchaseLabel: 'Purchase',
  youNeedToPay: 'You need to pay',
  for: 'for',
  confirmPurchase: 'Confirm purchase',
  ensure: 'Ensure you have enough funds in your account',
  buyNow: 'Buy now',
  bondingCurveInfo: "When the market cap reaches %goal% %currency%, all the liquidity from the bonding curve will be deposited into Uniswap, and the LP tokens will be burned. Progression increases as the price goes up.",
}

export const lang = {
  header,
  createIdea,
  homePage,
  ideas,
  generateIdea,
  footer,
  notFound,
  ideaPage,
};

export default lang;

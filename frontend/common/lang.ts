
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
  heading: 'Create Token',
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
    submitLabel: 'Submit',
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
  h1: 'Generate your Web3 Idea with Claude AI',
}

const ideas = {
  ideaCard: {
    raised: 'Raised',
  },
  currentIdeas: 'Browse Ideas',
  currentIdeasSubHeading: 'Explore how other ideas are doing in the market',
  noIdeasHeading: 'No ideas yet in this category',
  noIdeasSubHeading: 'Be the first to contribute! Share your innovative ideas and help grow this category.',
  registerIdea: 'Fund Existing Idea',
}

const homePage = {
  timeline: {
    heading: 'Explore your journey with our app',
    subHeading: 'You can harness the power of AI to transform your ideas into a fully functional application',
  },
  subHeading: 'Launch Ideas That Matter with Web3It.AI',
  h1: 'Turn Public Good Ideas into Reality',
  subHeading1: "Have a solution that could help communities thrive? Transform your public goods idea into a funded project in minutes.",
  subHeading2: "Our AI-powered platform takes you from spark to launch - whether you're creating free educational resources, building community tools, developing environmental solutions, or launching open infrastructure. With instant funding through fair token launches, your idea can start making an impact today.",
  subHeading3: "A home for ideas to get discovered, funded, and championed by the communities they serve. Time to launch something meaningful.",
  heroWords: [
    {
      text: "Turn",
    },
    {
      text: "Public",
    },
    {
      text: "Good",
      className: "gradientText",
    },
    {
      text: "Ideas",
    },
    {
      text: "Into",
    },
    {
      text: "Reality",
    },
  ],
  fundButtonLabel: 'Fund Existing Idea',
  generateButtonLabel: 'Launch New Idea',
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

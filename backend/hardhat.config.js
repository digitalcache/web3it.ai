require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");
require("@tenderly/hardhat-tenderly");

/** @type import('hardhat/config').HardhatUserConfig */


// const tenderly = require("@tenderly/hardhat-tenderly");

// Setup tenderly configuration
// tenderly.setup({
//   automaticVerifications: true,
//   accessKey: 'EU4BeG775GiDH0wis3AW7',
// });

module.exports = {
  solidity: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    viaIR: true
  },
  tenderly: {
    username: "charlesdoley",
    project: "web3it",
    accessKey: 'EU4BeG775GiDH0wis3AW7',
    automaticVerifications: true,
  },
  networks: {
    tenderly: {
      url: "https://astrochain-sepolia.gateway.tenderly.co/EU4BeG775GiDH0wis3AW7",
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      chainId: 1301,
    },
    // polygon: {
    //   url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    //   chainId: 137,
    // },
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    // }
    // hardhat: {
    //   forking: {
    //     url: process.env.MAINNET_RPC_URL,
    //   },
    //   chainId: 1,
    // }
    // polygonAmoy: {
    //   url: process.env.POLYGON_AMOY_RPC_URL,
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    //   chainId: 80002
    // },
    // buildbear: {
    //   url: 'https://rpc.buildbear.io/sensitive-omegared-16749c8d',
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    //   chainId: 21308
    // },
  },
  etherscan: {
    // customChains: [
    //   {
    //     network: "unichain",
    //     chainId: 1301,
    //     urls: {
    //       apiURL:"https://sepolia.uniscan.xyz",
    //     },
    //   },
    // ],
    // apiKey: {
    //   unichain: 'D5R4NI41ZS6Q9CQMRYYH1Y2QCVHX7QQB4S',
    // },
  //   // customChains: [
  //   //   {
  //   //     network: "unichain",
  //   //     chainId: 1301,
  //   //     urls: {
  //   //       apiURL:"hhttps://sepolia.uniscan.xyz",
  //   //       // browserURL: "hhttps://sepolia.uniscan.xyz",
  //   //     },
  //   //   },
  //   // ],
  //   apiKey: {
  //     // unichain: 'D5R4NI41ZS6Q9CQMRYYH1Y2QCVHX7QQB4S',
  //     // polygon: process.env.POLYGONSCAN_API_KEY,
  //     // polygonAmoy: process.env.POLYGONSCAN_API_KEY,
  //     // buildbear: 'verifyContracts'
  //   },
  //   // customChains: [
  //   //   {
  //   //     network: "buildbear",
  //   //     chainId: 21308,
  //   //     urls: {
  //   //       apiURL:"https://rpc.buildbear.io/verify/etherscan/sensitive-omegared-16749c8d",
  //   //       browserURL: "https://explorer.buildbear.io/node/sensitive-omegared-16749c8d",
  //   //     },
  //   //   },
  //   // ],
  }
};

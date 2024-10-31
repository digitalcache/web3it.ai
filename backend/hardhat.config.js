require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      chainId: 11155111,
    },
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
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
      // polygonAmoy: process.env.POLYGONSCAN_API_KEY,
      // buildbear: 'verifyContracts'
    },
    // customChains: [
    //   {
    //     network: "buildbear",
    //     chainId: 21308,
    //     urls: {
    //       apiURL:"https://rpc.buildbear.io/verify/etherscan/sensitive-omegared-16749c8d",
    //       browserURL: "https://explorer.buildbear.io/node/sensitive-omegared-16749c8d",
    //     },
    //   },
    // ],
  }
};

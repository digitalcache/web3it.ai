require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    // polygonAmoy: {
    //   url: process.env.POLYGON_AMOY_RPC_URL,
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    //   chainId: 80002
    // },
    buildbear: {
      url: 'https://rpc.buildbear.io/sensitive-omegared-16749c8d',
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      chainId: 21308
    },
  },
  etherscan: {
    apiKey: {
      // polygonAmoy: process.env.POLYGONSCAN_API_KEY,
      buildbear: 'verifyContracts'
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 21308,
        urls: {
          apiURL:"https://rpc.buildbear.io/verify/etherscan/sensitive-omegared-16749c8d",
          browserURL: "https://explorer.buildbear.io/node/sensitive-omegared-16749c8d",
        },
      },
    ],
  }
};

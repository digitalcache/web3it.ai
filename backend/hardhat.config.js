require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: 'https://site1.moralis-nodes.com/sepolia/3445899ba34247dab22e887096372638',
      },
      chainId: 1,
    }
  }
};
const { ethers } = require("hardhat");

async function main() {
  // Grab the contract factory
  const CrowdFactory = await ethers.getContractFactory("IdeaFactory");

  // Start deployment, returning a promise that resolves to a contract object
  const crowd = await CrowdFactory.deploy(); // Instance of the contract
  await crowd.waitForDeployment();
  const address = await crowd.getAddress();
  console.log("Contract deployed to address:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

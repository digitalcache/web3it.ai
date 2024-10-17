const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0xD4f1246CB8D88f6dd6476E90F7A9786Bf49E852D') //line 6
  await contract.createIdeaToken(
  "Razer",
  "$HeadPhone$",
  "https://i.imgur.com/VltLWGZ.jpeg",
  "An apple a day keeps the doctor away",) //line 13
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

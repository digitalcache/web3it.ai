const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9') //line 6
 const res =  await contract.calculateCost(
    0, 1
 ) //line 13
 console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

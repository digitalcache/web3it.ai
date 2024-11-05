const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0x37eaB2C62ddd87301DD698685E4cDa4127CB2984') //line 6
 const res =  await contract.calculateCost(
    0, 800000
 ) //line 13
 console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

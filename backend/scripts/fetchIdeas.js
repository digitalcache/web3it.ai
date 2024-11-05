const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0xD660440dB1EBe416af090Fbc1d73c3496e9E2fcF') //line 6
 const res =  await contract.getAllIdeaTokens() //line 13
 console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

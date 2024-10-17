const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0xD4f1246CB8D88f6dd6476E90F7A9786Bf49E852D') //line 6
 const res =  await contract.getIdeaToken(
  '0x04Ce9f8175c239c5e2a722af699cF27cc8001aF0'
 ) //line 13
 console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

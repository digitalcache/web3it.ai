const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0xD4f1246CB8D88f6dd6476E90F7A9786Bf49E852D') //line 6
  const res = await contract.buyIdeaToken(
  "0x4DD9291Efc26fDAd0F870155f0886c1a8d2f3666",
  1) //line 13
  console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

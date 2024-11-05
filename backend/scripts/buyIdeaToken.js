const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0x17AfB7ddbd2ee3369C102722baBb058aA99209b8') //line 6
  const res = await contract.buyIdeaToken(
  "0xF602Ae7B20c43f786a02d8e934791f4782E6b347",
  800000, {
    value: 24072124158000000n
  }) //line 13
  console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

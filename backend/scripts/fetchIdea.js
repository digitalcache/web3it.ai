const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1') //line 6
 const res =  await contract.getIdeaToken(
  '0x56639dB16Ac50A89228026e42a316B30179A5376'
 ) //line 13
 console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

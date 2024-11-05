const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512') //line 6
 const res =  await contract.getIdeaToken(
  '0xCafac3dD18aC6c6e92c921884f9E4176737C052c'
 ) //line 13
 console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

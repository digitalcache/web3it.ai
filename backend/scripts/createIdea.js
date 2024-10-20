const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0x610178dA211FEF7D417bC0e6FeD39F05609AD788') //line 6
  const res = await contract.createIdeaToken(
    "Boat2",
    "BOAT2",
    "https://bronze-deep-gazelle-81.mypinata.cloud/ipfs/QmSMVGFJEoTYdNV6wM81aKxN9JVe4kqS5kLzK53FpH7LBv",
    "It's someone who loves to groove, is always on the move, and crazy about reaching their goals!",
    "https://www.boat-lifestyle.com/",
    "",
  )
  console.log("here",res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

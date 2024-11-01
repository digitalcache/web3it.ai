const { run } = require("hardhat");

async function main() {
//add the contract address that you deployed in the prev steps
  const contractAddress = '0x8f5ad6b2d9EaAcF2f463B3538Bc4e6993FDAfFBf'; //line 5

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
      contract: "contracts/IdeaFactory.sol:IdeaFactory",
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { run } = require("hardhat");

async function main() {
//add the contract address that you deployed in the prev steps
  const contractAddress = '0xb9bDa1510663cD82E6249Ed291Ad2916bFD209fa'; //line 5

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

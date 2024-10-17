const { run, ethers } = require("hardhat");

async function main() {
  //replace contractAddress with the one we saved above querying the 0th publishedProj
  const contractAddress = "0x59B7CDA8b9E61cca735df3Dca5F7685d5435879A"; //line5
  const args = [
    "first title", ethers.parseUnits("0.1", 18), "description",
//Insert you wallet's public address here
  process.env.WALLET_PUBLIC_KEY,  //line 9
  ];

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: "contracts/Crowdfunding.sol:CrowdfundingProject",
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

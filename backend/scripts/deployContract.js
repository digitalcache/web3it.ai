const hre = require("hardhat");

async function main() {
  try {
    // Get network information
    const network = await ethers.provider.getNetwork();
    console.log(`Deploying to network: ${network.name} (${network.chainId})`);

    // Deploy Idea contract factory first
    console.log("Deploying Idea contract factory...");
    const Idea = await ethers.getContractFactory("Idea");
    console.log("Idea contract factory deployed successfully.");

    // Deploy IdeaFactory contract
    console.log("Deploying IdeaFactory contract...");
    const IdeaFactory = await ethers.getContractFactory("IdeaFactory");
    const deploymentTx = await IdeaFactory.deploy();
    
    // Wait for deployment
    console.log("Waiting for deployment transaction...");
    const ideaFactory = await deploymentTx.waitForDeployment();
    const ideaFactoryAddress = await ideaFactory.getAddress();
    
    // Get deployment transaction receipt
    const receipt = await deploymentTx.deploymentTransaction().wait();
    
    console.log(`IdeaFactory deployed to: ${ideaFactoryAddress}`);
    console.log(`Transaction hash: ${deploymentTx.deploymentTransaction().hash}`);
    console.log(`Block number: ${receipt.blockNumber}`);
 
    // Verify contract on Etherscan if not on localhost
    console.log("Verifying contract on PolygonScan...");
    try {
      await hre.run("verify:verify", {
        address: ideaFactoryAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Error verifying contract:", error.message);
    }


  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
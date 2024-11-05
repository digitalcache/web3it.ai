const hre = require("hardhat");

async function main() {
  // Get the contract factories
  const UniswapV3Manager = await hre.ethers.getContractFactory("UniswapV3Manager");
  const IdeaFactory = await hre.ethers.getContractFactory("IdeaFactory");

  // Uniswap V3 addresses for Polygon Mainnet
  const UNISWAP_V3_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const UNISWAP_V3_POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  const UNISWAP_V3_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const WMATIC = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // WMATIC on Polygon

  console.log("\nStarting deployment to Polygon Mainnet...");
  console.log("=========================================");

  try {
    // Deploy UniswapV3Manager
    console.log("\nDeploying UniswapV3Manager...");
    const uniswapManager = await UniswapV3Manager.deploy(
      UNISWAP_V3_FACTORY,
      UNISWAP_V3_POSITION_MANAGER,
      WMATIC
    );
    
    console.log("Waiting for UniswapV3Manager deployment...");
    await uniswapManager.waitForDeployment();
    const uniswapManagerAddress = await uniswapManager.getAddress();
    console.log("UniswapV3Manager deployed to:", uniswapManagerAddress);

    // Deploy IdeaFactory
    console.log("\nDeploying IdeaFactory...");
    const ideaFactory = await IdeaFactory.deploy(
      uniswapManagerAddress,
      UNISWAP_V3_FACTORY,
      UNISWAP_V3_POSITION_MANAGER,
      UNISWAP_V3_ROUTER,
      WMATIC
    );

    console.log("Waiting for IdeaFactory deployment...");
    await ideaFactory.waitForDeployment();
    const ideaFactoryAddress = await ideaFactory.getAddress();
    console.log("IdeaFactory deployed to:", ideaFactoryAddress);

    // Log deployment summary
    console.log("\nDeployment Summary");
    console.log("==================");
    console.log("Network: Polygon Mainnet");
    console.log("UniswapV3Manager:", uniswapManagerAddress);
    console.log("IdeaFactory:", ideaFactoryAddress);
    console.log("\nUniswap V3 Addresses Used:");
    console.log("Factory:", UNISWAP_V3_FACTORY);
    console.log("Position Manager:", UNISWAP_V3_POSITION_MANAGER);
    console.log("Router:", UNISWAP_V3_ROUTER);
    console.log("WMATIC:", WMATIC);

    // Add delay before verification
    console.log("\nWaiting before verification...");
    await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds delay

    // Verify contracts on Polygonscan
    console.log("\nVerifying contracts on Polygonscan...");
    try {
      await hre.run("verify:verify", {
        address: uniswapManagerAddress,
        constructorArguments: [
          UNISWAP_V3_FACTORY,
          UNISWAP_V3_POSITION_MANAGER,
          WMATIC
        ],
      });
      console.log("UniswapV3Manager verified successfully");

      await hre.run("verify:verify", {
        address: ideaFactoryAddress,
        constructorArguments: [
          uniswapManagerAddress,
          UNISWAP_V3_FACTORY,
          UNISWAP_V3_POSITION_MANAGER,
          UNISWAP_V3_ROUTER,
          WMATIC
        ],
      });
      console.log("IdeaFactory verified successfully");
    } catch (error) {
      console.log("Verification error:", error.message);
      console.log("You may need to verify contracts manually");
    }

  } catch (error) {
    console.error("\nDeployment Error:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("\nDeployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\nDeployment failed:", error.message);
    process.exit(1);
  });
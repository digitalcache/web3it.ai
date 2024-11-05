const hre = require("hardhat");
const { formatEther } = require("ethers");

async function main() {
    try {
        // Replace with your deployed contract address
        const IDEA_FACTORY_ADDRESS = "0xA57923Fcb0A33f6d33299A68eef8Be830b8C3a5D";
        const ideaFactory = await hre.ethers.getContractAt("IdeaFactory", IDEA_FACTORY_ADDRESS);

        console.log("\nChecking balances for all tokens...");
        console.log("Contract address:", IDEA_FACTORY_ADDRESS);

        const allTokens = await ideaFactory.getAllIdeaTokens();
        console.log(`Found ${allTokens.length} tokens\n`);
        
        for (const token of allTokens) {
            console.log("=========================");
            console.log("Token Name:", token.name);
            console.log("Token Address:", token.tokenAddress);
            
            // Get token contract
            const tokenContract = await hre.ethers.getContractAt("Idea", token.tokenAddress);
            
            // Get basic token info
            const [totalSupply, factoryBalance] = await Promise.all([
                tokenContract.totalSupply(),
                tokenContract.balanceOf(IDEA_FACTORY_ADDRESS)
            ]);
            
            console.log("\nToken Details:");
            console.log("Total Supply:", formatEther(totalSupply));
            console.log("Factory Balance:", formatEther(factoryBalance));
            console.log("Funding Raised:", formatEther(token.fundingRaised), "MATIC");
            
            if (token.poolId.toString() !== "0") {
                console.log("\nPool Details:");
                console.log("Pool ID:", token.poolId.toString());

                // Get UniswapV3 Factory
                const UNISWAP_V3_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
                const WMATIC = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
                const FEE_TIER = 3000; // 0.3%

                const uniswapFactory = await hre.ethers.getContractAt("IUniswapV3Factory", UNISWAP_V3_FACTORY);
                
                // Get pool address
                const poolAddress = await uniswapFactory.getPool(
                    token.tokenAddress,
                    WMATIC,
                    FEE_TIER
                );

                if (poolAddress !== "0x0000000000000000000000000000000000000000") {
                    // Get pool contract
                    const pool = await hre.ethers.getContractAt("IUniswapV3Pool", poolAddress);
                    
                    // Get pool balances
                    const [poolTokenBalance, slot0, liquidity] = await Promise.all([
                        tokenContract.balanceOf(poolAddress),
                        pool.slot0(),
                        pool.liquidity()
                    ]);

                    console.log("Pool Address:", poolAddress);
                    console.log("Pool Token Balance:", formatEther(poolTokenBalance));
                    console.log("Pool Liquidity:", liquidity.toString());
                    console.log("Current Tick:", slot0.tick.toString());

                    // Get WMATIC balance
                    const wmatic = await hre.ethers.getContractAt("IERC20", WMATIC);
                    const poolWMATICBalance = await wmatic.balanceOf(poolAddress);
                    console.log("Pool WMATIC Balance:", formatEther(poolWMATICBalance));
                } else {
                    console.log("Warning: Pool not found on Uniswap V3!");
                }
            } else {
                console.log("\nNo pool created yet");
            }
            
            console.log("=========================\n");
        }

    } catch (error) {
        console.error("\nError checking balances:", error);
        if (error.data) {
            console.error("Error data:", error.data);
        }
        throw error;
    }
}

main()
    .then(() => {
        console.log("Balance check completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Script failed:", error);
        process.exit(1);
    });
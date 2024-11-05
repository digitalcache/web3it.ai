const hre = require("hardhat");
const { formatEther } = require("ethers");

async function main() {
    // Replace with your contract address
    const IDEA_FACTORY_ADDRESS = "0xA57923Fcb0A33f6d33299A68eef8Be830b8C3a5D";
    
    try {
        const ideaFactory = await hre.ethers.getContractAt("IdeaFactory", IDEA_FACTORY_ADDRESS);
        
        // Get all tokens
        const tokens = await ideaFactory.getAllIdeaTokens();
        console.log(`Found ${tokens.length} tokens`);
        
        for (const token of tokens) {
            console.log("\n-------------------");
            console.log("Token Name:", token.name);
            console.log("Token Address:", token.tokenAddress);
            console.log("Funding Raised:", formatEther(token.fundingRaised), "MATIC");
            console.log("Pool ID:", token.poolId.toString());
            
            if (token.poolId.toString() !== "0") {
                console.log("Pool exists! Pool ID:", token.poolId.toString());
            } else {
                console.log("No pool created yet");
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
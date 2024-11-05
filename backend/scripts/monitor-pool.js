const hre = require("hardhat");

// Replace with your contract address
const CONTRACT_ADDRESS = "0x17AfB7ddbd2ee3369C102722baBb058aA99209b8";

async function monitorPool(contractAddress) {
    try {
        if (!contractAddress || contractAddress === "0xYourContractAddressHere") {
            throw new Error("Please provide a valid contract address");
        }

        console.log(`\nStarting to monitor pool at address: ${contractAddress}`);
        console.log("Waiting for LiquidityProvided events...");
        console.log("----------------------------------------");

        // Get contract instance
        const IdeaFactory = await ethers.getContractFactory("IdeaFactory");
        const contract = await IdeaFactory.attach(contractAddress);

        // Listen for LiquidityProvided events
        contract.on("LiquidityProvided", (
            tokenAddress,
            tokenAmount,
            ethAmount,
            tokenId,
            timestamp,
            event
        ) => {
            const date = new Date(Number(timestamp) * 1000).toLocaleString();
            
            console.log('\nNew Liquidity Event Detected!');
            console.log('----------------------------------------');
            console.log('Token Address    :', tokenAddress);
            console.log('Token Amount     :', ethers.formatUnits(tokenAmount, 18));
            console.log('ETH Amount       :', ethers.formatEther(ethAmount));
            console.log('Position Token ID:', tokenId.toString());
            console.log('Time            :', date);
            console.log('Block Number    :', event.blockNumber);
            console.log('Transaction Hash:', event.transactionHash);
            console.log('----------------------------------------');
        });

        // Keep the script running and handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\nStopping pool monitor...');
            contract.removeAllListeners();
            process.exit();
        });

        // Keep the process running
        await new Promise(() => {});

    } catch (error) {
        console.error("\nError monitoring pool:", error.message);
        if (error.message.includes('contract not deployed')) {
            console.log('\nPlease check:');
            console.log('1. The contract address is correct');
            console.log('2. You are connected to the right network');
            console.log('3. The contract is deployed on this network');
        }
        process.exit(1);
    }
}

// Start monitoring if run directly
if (require.main === module) {
    monitorPool(CONTRACT_ADDRESS)
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

// Export for importing in other scripts
module.exports = {
    monitorPool
};
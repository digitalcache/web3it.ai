// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Idea.sol";
import "hardhat/console.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";

contract IdeaFactory {
    struct ideaToken {
        string name;
        string symbol;
        string description;
        string tokenImageUrl;
        string productUrl;
        string twitterUrl;
        uint fundingRaised;
        address tokenAddress;
        address creatorAddress;
        uint tokenCurrentSupply;
    }

    address[] public ideaTokenAddresses;

    mapping(address => ideaToken) public addressToIdeaTokenMapping;

    uint constant IDEATOKEN_CREATION_PLATFORM_FEE = 0.00001 ether;
    uint constant IDEACOIN_FUNDING_DEADLINE_DURATION = 10 days;
    uint constant IDEACOIN_FUNDING_GOAL = 20 ether;

    address constant UNISWAP_V2_FACTORY_ADDRESS = 0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C;
    address constant UNISWAP_V2_ROUTER_ADDRESS = 0xedf6066a2b290C185783862C7F4776A2C8077AD1;


    uint constant DECIMALS = 10 ** 18;
    uint constant MAX_SUPPLY = 1000000 * DECIMALS;
    uint constant INIT_SUPPLY = 20 * MAX_SUPPLY / 100;

    uint256 public constant INITIAL_PRICE = 30000000000000;  // Initial price in wei (P0), 3.00 * 10^13
    uint256 public constant K = 8 * 10**15;  // Growth rate (k), scaled to avoid precision loss (0.01 * 10^18)

    // Function to calculate the cost in wei for purchasing tokensToBuy starting from currentSupply
    function calculateCost(uint256 currentSupply, uint256 tokensToBuy) public pure returns (uint256) {

            // Calculate the exponent parts scaled to avoid precision loss
        uint256 exponent1 = (K * (currentSupply + tokensToBuy)) / 10**18;
        uint256 exponent2 = (K * currentSupply) / 10**18;

        // Calculate e^(kx) using the exp function
        uint256 exp1 = exp(exponent1);
        uint256 exp2 = exp(exponent2);

        // Cost formula: (P0 / k) * (e^(k * (currentSupply + tokensToBuy)) - e^(k * currentSupply))
        // We use (P0 * 10^18) / k to keep the division safe from zero
        uint256 cost = (INITIAL_PRICE * 10**18 * (exp1 - exp2)) / K;  // Adjust for k scaling without dividing by zero
        return cost;
    }

    // Improved helper function to calculate e^x for larger x using a Taylor series approximation
    function exp(uint256 x) internal pure returns (uint256) {
        uint256 sum = 10**18;  // Start with 1 * 10^18 for precision
        uint256 term = 10**18;  // Initial term = 1 * 10^18
        uint256 xPower = x;  // Initial power of x

        for (uint256 i = 1; i <= 20; i++) {  // Increase iterations for better accuracy
            term = (term * xPower) / (i * 10**18);  // x^i / i!
            sum += term;

            // Prevent overflow and unnecessary calculations
            if (term < 1) break;
        }

        return sum;
    }

    function createIdeaToken(
        string memory name, 
        string memory symbol, 
        string memory imageUrl, 
        string memory description,
        string memory productUrl,
        string memory twitterUrl
    ) public payable returns(address) {

        //should deploy the meme token, mint the initial supply to the token factory contract
        // require(msg.value>= MEMETOKEN_CREATION_PLATFORM_FEE, "fee not paid for memetoken creation");
        Idea ct = new Idea(name, symbol, INIT_SUPPLY);
        address ideaTokenAddress = address(ct);
        
        ideaToken memory newlyCreatedToken = ideaToken(name, symbol, description, imageUrl, productUrl, twitterUrl, 0, ideaTokenAddress, msg.sender, 0);
        ideaTokenAddresses.push(ideaTokenAddress);
        addressToIdeaTokenMapping[ideaTokenAddress] = newlyCreatedToken;
        return ideaTokenAddress;
    }

    function buyIdeaToken(address ideaTokenAddress, uint tokenQty) public payable returns(uint) {

        //check if memecoin is listed
        require(addressToIdeaTokenMapping[ideaTokenAddress].tokenAddress!=address(0), "Token is not listed");

        ideaToken storage listedToken = addressToIdeaTokenMapping[ideaTokenAddress];


        Idea ideaTokenCt = Idea(ideaTokenAddress);

        // check to ensure funding goal is not met
        require(listedToken.fundingRaised <= IDEACOIN_FUNDING_GOAL, "Funding has already been raised");


        // check to ensure there is enough supply to facilitate the purchase
        uint currentSupply = ideaTokenCt.totalSupply();
        console.log("Current supply of token is ", currentSupply);
        console.log("Max supply of token is ", MAX_SUPPLY);
        uint available_qty = MAX_SUPPLY - currentSupply;
        console.log("Qty available for purchase ",available_qty);


        uint scaled_available_qty = available_qty / DECIMALS;
        uint tokenQty_scaled = tokenQty * DECIMALS;

        require(tokenQty <= scaled_available_qty, "Not enough available supply");

        // calculate the cost for purchasing tokenQty tokens as per the exponential bonding curve formula
        uint currentSupplyScaled = (currentSupply - INIT_SUPPLY) / DECIMALS;
        uint requiredEth = calculateCost(currentSupplyScaled, tokenQty);

        console.log(requiredEth);


        // check if user has sent correct value of eth to facilitate this purchase
        require(msg.value >= requiredEth, "Incorrect value of ETH sent");

        // Incerement the funding
        listedToken.fundingRaised+= msg.value;

        if(listedToken.fundingRaised >= IDEACOIN_FUNDING_GOAL){
            // create liquidity pool
            address pool = _createLiquidityPool(ideaTokenAddress);
            console.log("Pool address ", pool);

            // provide liquidity
            uint tokenAmount = INIT_SUPPLY;
            uint ethAmount = listedToken.fundingRaised;
            uint liquidity = _provideLiquidity(ideaTokenAddress, tokenAmount, ethAmount);
            console.log("UNiswap provided liquidty ", liquidity);

            // burn lp token
            _burnLpTokens(pool, liquidity);

        }

        // mint the tokens
        ideaTokenCt.mint(tokenQty_scaled, msg.sender);

        console.log("User balance of the tokens is ", ideaTokenCt.balanceOf(msg.sender));

        console.log("New available qty ", MAX_SUPPLY - ideaTokenCt.totalSupply());

        return requiredEth;
    }
    function getAllIdeaTokens() public view returns(ideaToken[] memory) {
        ideaToken[] memory allTokens = new ideaToken[](ideaTokenAddresses.length);
        for (uint i = 0; i < ideaTokenAddresses.length; i++) {
            allTokens[i] = addressToIdeaTokenMapping[ideaTokenAddresses[i]];
        }
        return allTokens;
    }
    function getIdeaToken(address ideaTokenAddress) public returns(ideaToken memory) {
        ideaToken storage listedToken = addressToIdeaTokenMapping[ideaTokenAddress];
        Idea ideaTokenCt = Idea(ideaTokenAddress);
        listedToken.tokenCurrentSupply = ideaTokenCt.totalSupply();
        console.log(ideaTokenCt.totalSupply());
        return addressToIdeaTokenMapping[ideaTokenAddress];
    }
    function _createLiquidityPool(address memeTokenAddress) internal returns(address) {
        IUniswapV2Factory factory = IUniswapV2Factory(UNISWAP_V2_FACTORY_ADDRESS);
        IUniswapV2Router01 router = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
        address pair = factory.createPair(memeTokenAddress, router.WETH());
        return pair;
    }

    function _provideLiquidity(address memeTokenAddress, uint tokenAmount, uint ethAmount) internal returns(uint){
        Idea memeTokenCt = Idea(memeTokenAddress);
        memeTokenCt.approve(UNISWAP_V2_ROUTER_ADDRESS, tokenAmount);
        IUniswapV2Router01 router = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
        (uint amountToken, uint amountETH, uint liquidity) = router.addLiquidityETH{
            value: ethAmount
        }(memeTokenAddress, tokenAmount, tokenAmount, ethAmount, address(this), block.timestamp);
        return liquidity;
    }

    function _burnLpTokens(address pool, uint liquidity) internal returns(uint){
        IUniswapV2Pair uniswapv2pairct = IUniswapV2Pair(pool);
        uniswapv2pairct.transfer(address(0), liquidity);
        console.log("Uni v2 tokens burnt");
        return 1;
    }



}

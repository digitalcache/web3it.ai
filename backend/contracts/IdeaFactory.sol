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
        string categories;
        string productScreenshotUrl;
        string twitterUrl;
        uint fundingRaised;
        address tokenAddress;
        address creatorAddress;
        uint tokenCurrentSupply;
    }

    address[] public ideaTokenAddresses;

    mapping(address => ideaToken) public addressToIdeaTokenMapping;

    uint constant IDEATOKEN_CREATION_PLATFORM_FEE = 0.0001 ether;
    uint constant IDEACOIN_FUNDING_DEADLINE_DURATION = 10 days;
    uint constant IDEACOIN_FUNDING_GOAL = 24048064056000000000 wei;

    address constant UNISWAP_V2_FACTORY_ADDRESS = 0xF62c03E08ada871A0bEb309762E260a7a6a880E6;
    address constant UNISWAP_V2_ROUTER_ADDRESS = 0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3;
    uint constant DECIMALS = 10 ** 18;
    uint constant MAX_SUPPLY = 1000000 * DECIMALS;
    uint constant INIT_SUPPLY = 20 * MAX_SUPPLY / 100;

    uint256 public constant INITIAL_PRICE = 30000000000000;  
    uint256 public constant K = 5 * 10**15;

    function calculateCost(uint256 currentSupply, uint256 tokensToBuy) public pure returns (uint256) {
        uint256 exponent1 = (K * (currentSupply + tokensToBuy)) / 10**12;
        uint256 exponent2 = (K * currentSupply) / 10**12;
        uint256 exp1 = exp(exponent1);
        uint256 exp2 = exp(exponent2); uint256 cost = (INITIAL_PRICE * 10**12 * (exp1 - exp2)) / K;
        return cost/100;
    }

    function exp(uint256 x) internal pure returns (uint256) {
        uint256 sum = 10**12;
        uint256 term = 10**12;
        uint256 xPower = x;
        for (uint256 i = 1; i <= 20; i++) {
            term = (term * xPower) / (i * 10**12);
            sum += term;
            if (term < 1) break;
        }
        return sum;
    }

    function createIdeaToken(
        string memory name, 
        string memory symbol, 
        string memory imageUrl, 
        string memory description,
        string memory categories,
        string memory productScreenshotUrl,
        string memory productUrl,
        string memory twitterUrl
    ) public payable returns(address) {

        require(msg.value >= IDEATOKEN_CREATION_PLATFORM_FEE, "fee not paid for ideatoken creation");
        Idea ct = new Idea(name, symbol, INIT_SUPPLY);
        address ideaTokenAddress = address(ct);
        ideaToken memory newlyCreatedToken = ideaToken(name, symbol, description, imageUrl, productUrl, categories, productScreenshotUrl, twitterUrl, 0, ideaTokenAddress, msg.sender, 0);
        ideaTokenAddresses.push(ideaTokenAddress);
        addressToIdeaTokenMapping[ideaTokenAddress] = newlyCreatedToken;
        return ideaTokenAddress;
    }

    function buyIdeaToken(address ideaTokenAddress, uint tokenQty) public payable returns(uint) {
        require(addressToIdeaTokenMapping[ideaTokenAddress].tokenAddress!=address(0), "Token is not listed");
        
        ideaToken storage listedToken = addressToIdeaTokenMapping[ideaTokenAddress];
        Idea ideaTokenCt = Idea(ideaTokenAddress);
        
        require(listedToken.fundingRaised <= IDEACOIN_FUNDING_GOAL, "Funding has already been raised");
        
        uint currentSupply = ideaTokenCt.totalSupply();
        uint available_qty = MAX_SUPPLY - currentSupply;
        uint scaled_available_qty = available_qty / DECIMALS;
        uint tokenQty_scaled = tokenQty * DECIMALS;

        require(tokenQty <= scaled_available_qty, "Not enough available supply");

        uint currentSupplyScaled = (currentSupply - INIT_SUPPLY) / DECIMALS;
        uint requiredEth = calculateCost(currentSupplyScaled, tokenQty);

        require(msg.value >= requiredEth, "Incorrect value of ETH sent");

        listedToken.fundingRaised+= msg.value;
        
        if(listedToken.fundingRaised >= IDEACOIN_FUNDING_GOAL){
            address pool = _createLiquidityPool(ideaTokenAddress);
            uint tokenAmount = INIT_SUPPLY;
            uint ethAmount = listedToken.fundingRaised;
            uint liquidity = _provideLiquidity(ideaTokenAddress, tokenAmount, ethAmount);
            _burnLpTokens(pool, liquidity);
        }

        ideaTokenCt.mint(tokenQty_scaled, msg.sender);
        return 1;
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
        return addressToIdeaTokenMapping[ideaTokenAddress];
    }
    function _createLiquidityPool(address ideaTokenAddress) internal returns(address) {
        IUniswapV2Factory factory = IUniswapV2Factory(UNISWAP_V2_FACTORY_ADDRESS);
        IUniswapV2Router01 router = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
        address pair = factory.createPair(ideaTokenAddress, router.WETH());
        return pair;
    }
    function _provideLiquidity(address ideaTokenAddress, uint tokenAmount, uint ethAmount) internal returns(uint){
        Idea ideaTokenCt = Idea(ideaTokenAddress);
        ideaTokenCt.approve(UNISWAP_V2_ROUTER_ADDRESS, tokenAmount);
        IUniswapV2Router01 router = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
        (uint amountToken, uint amountETH, uint liquidity) = router.addLiquidityETH{
            value: ethAmount
        }(ideaTokenAddress, tokenAmount, tokenAmount, ethAmount, address(this), block.timestamp);
        return liquidity;
    }
    function _burnLpTokens(address pool, uint liquidity) internal returns(uint){
        IUniswapV2Pair uniswapv2pairct = IUniswapV2Pair(pool);
        uniswapv2pairct.transfer(address(0), liquidity);
        return 1;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Idea.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";

library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0x095ea7b3, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: APPROVE_FAILED"
        );
    }

    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0xa9059cbb, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: TRANSFER_FAILED"
        );
    }
}

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

    address constant UNISWAP_V3_FACTORY_ADDRESS = 0x1F98431c8aD98523631AE4a59f267346ea31F984;
    address constant UNISWAP_V3_POSITION_MANAGER = 0xB7F724d6dDDFd008eFf5cc2834edDE5F9eF0d075;
    address constant WETH9 = 0x4200000000000000000000000000000000000006;

    uint24 public constant poolFee = 3000; // 0.3% fee tier
    uint256 public constant IDEATOKEN_CREATION_FEE = 0.0001 ether;
    // uint256 public constant IDEACOIN_FUNDING_GOAL = 24048064056000000000 wei;
    uint256 public constant IDEACOIN_FUNDING_GOAL = 24048064056000000 wei;
    uint256 public constant DECIMALS = 10 ** 18;
    uint256 public constant MAX_SUPPLY = 1000000 * DECIMALS;
    uint256 public constant INIT_SUPPLY = MAX_SUPPLY / 5; // 20%
    uint256 public constant INITIAL_PRICE = 30000000000000;
    uint256 public constant K = 5 * 10**15;

    address[] public ideaTokenAddresses;
    mapping(address => ideaToken) public addressToIdeaTokenMapping;

    function calculateCost(uint256 currentSupply, uint256 tokensToBuy) public pure returns (uint256) {
        uint256 exponent1 = (K * (currentSupply + tokensToBuy)) / 10**12;
        uint256 exponent2 = (K * currentSupply) / 10**12;
        uint256 exp1 = exp(exponent1);
        uint256 exp2 = exp(exponent2); uint256 cost = (INITIAL_PRICE * 10**12 * (exp1 - exp2)) / K;
        return cost/1000;
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

    function buyIdeaToken(address ideaTokenAddress, uint256 tokenQty)
        public
        payable
        returns (uint)
    {
        require(addressToIdeaTokenMapping[ideaTokenAddress].tokenAddress != address(0), "Token is not listed");

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

        listedToken.fundingRaised += msg.value;

        if(listedToken.fundingRaised >= IDEACOIN_FUNDING_GOAL) {
            _createAndInitializePool(ideaTokenAddress);
            uint tokenAmount = INIT_SUPPLY;
            uint ethAmount = listedToken.fundingRaised;
            _provideLiquidity(ideaTokenAddress, tokenAmount, ethAmount);
        }

        ideaTokenCt.mint(tokenQty_scaled, msg.sender);
        return 1;
    }
    function _createAndInitializePool(address ideaTokenAddress) internal returns (address pool) {
        IUniswapV3Factory factory = IUniswapV3Factory(UNISWAP_V3_FACTORY_ADDRESS);
        pool = factory.createPool(ideaTokenAddress, WETH9, poolFee);
        // For simplicity, we'll use a 1:1 ratio initially
        uint160 sqrtPriceX96 = 79228162514264337593543950336; // 1:1 ratio
        IUniswapV3Pool(pool).initialize(sqrtPriceX96);
        return pool;
    }

    function _provideLiquidity(address ideaTokenAddress, uint tokenAmount, uint ethAmount) internal {
        // Approve the position manager
        TransferHelper.safeApprove(ideaTokenAddress, UNISWAP_V3_POSITION_MANAGER, tokenAmount);

        INonfungiblePositionManager positionManager = INonfungiblePositionManager(UNISWAP_V3_POSITION_MANAGER);

        // Parameters for creating a position
        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
            token0: ideaTokenAddress < WETH9 ? ideaTokenAddress : WETH9,
            token1: ideaTokenAddress < WETH9 ? WETH9 : ideaTokenAddress,
            fee: poolFee,
            tickLower: -887220,  // Represents a price range of +-10%
            tickUpper: 887220,   // from the current price
            amount0Desired: ideaTokenAddress < WETH9 ? tokenAmount : ethAmount,
            amount1Desired: ideaTokenAddress < WETH9 ? ethAmount : tokenAmount,
            amount0Min: 0,        // Protection against slippage
            amount1Min: 0,        // Protection against slippage
            recipient: address(this),
            deadline: block.timestamp
        });

        // create liquidty for the target eth i.e. 24eth
        (uint tokenId, uint128 liquidity, uint amount0, uint amount1) = positionManager.mint{value: ethAmount}(params);
    }

    function createIdeaToken(
        string memory name,
        string memory symbol,
        string memory imageUrl,
        string memory description,
        string memory categories,
        string memory productScreenshotUrl,
        string memory productUrl,
        string memory twitterUrl) public payable returns (address) {
        require(msg.value >= IDEATOKEN_CREATION_FEE, "Insufficient creation fee");

        Idea newToken = new Idea(name, symbol, INIT_SUPPLY);
        address ideaTokenAddress = address(newToken);
        ideaToken memory newlyCreatedToken = ideaToken(name, symbol, description, imageUrl, productUrl, categories, productScreenshotUrl, twitterUrl, 0, ideaTokenAddress, msg.sender, 0);
        ideaTokenAddresses.push(ideaTokenAddress);
        addressToIdeaTokenMapping[ideaTokenAddress] = newlyCreatedToken;
        return ideaTokenAddress;
    }
    function getAllIdeaTokens() public view returns (ideaToken[] memory) {
        ideaToken[] memory allTokens = new ideaToken[](ideaTokenAddresses.length);
        for (uint i = 0; i < ideaTokenAddresses.length; i++) {
            allTokens[i] = addressToIdeaTokenMapping[ideaTokenAddresses[i]];
        }
        return allTokens;
    }
    function getIdeaToken(address ideaTokenAddress) public returns (ideaToken memory) {
        ideaToken storage listedToken = addressToIdeaTokenMapping[ideaTokenAddress];
        Idea ideaTokenCt = Idea(ideaTokenAddress);
        listedToken.tokenCurrentSupply = ideaTokenCt.totalSupply();
        return addressToIdeaTokenMapping[ideaTokenAddress];
    }
}

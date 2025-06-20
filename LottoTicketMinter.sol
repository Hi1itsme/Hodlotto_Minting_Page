// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

/**
 * @title NFTLotteryMintingTierV11
 * @dev Upgradeable ERC721 NFT contract with tiered minting, lottery system, and soulbound tokens.
 *      Allows minting with base blockchain token or ERC20 tokens, with settable prices and weights for tiers.
 *      Includes a decentralized lottery system based on NFT weight.
 */
contract NFTLotteryMintingTierV11 is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    using AddressUpgradeable for address;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIds;
    CountersUpgradeable.Counter private _lottoIdCounter;
    address public paymentToken;
    address public anotherPaymentToken;

    // Struct for storing tier information
    struct Tier {
        uint256 priceInBaseToken;
        uint256 priceInPaymentToken;
        uint256 priceInAnotherPaymentToken;
        uint256 weight;
    }

    // Struct for storing lottery entry information
    struct LottoEntry {
        uint256 lottoID;
        uint256 weight;
    }

    mapping(uint256 => Tier) public tiers;  // Mapping from tier number to tier information
    mapping(uint256 => uint256) private _tokenTiers;  // Mapping from token ID to tier number

    mapping(uint256 => uint256) public lotto;  // Mapping from pointer to lottoID
    mapping(uint256 => address) public lottoIDIndexer;  // Mapping from lottoID to address
    mapping(address => LottoEntry[]) public addressToLottoIDs;  // Mapping from address to list of LottoEntries

    uint256 public lottoPointer;
    uint256 public totalCumulativeWeight;  // Running total of the cumulative weight

    // Events
    event TierPriceSet(uint256 tier, uint256 priceInBaseToken, uint256 priceInPaymentToken, uint256 priceInAnotherPaymentToken);
    event TierWeightSet(uint256 tier, uint256 weight);
    event PaymentTokenSet(address token);
    event AnotherPaymentTokenSet(address token);
    event TokenMinted(address indexed owner, uint256 tokenId, uint256 tier, uint256 lottoID);
    event Withdrawn(address indexed owner, uint256 amount);

    /**
     * @dev Initializes the contract, setting the initial tier weights and prices.
     */
    function initialize() public initializer {
        __ERC721_init("NFTLotteryMintingTierV11", "NFTTV11");
        __Ownable_init();

        // Initialize tier weights and prices
        for (uint256 i = 0; i < 10; i++) {
            tiers[i] = Tier({
                priceInBaseToken: 0,
                priceInPaymentToken: 0,
                priceInAnotherPaymentToken: 0,
                weight: 1 << i // 1, 2, 4, 8, 16, 32, 64, 128, 256, 512
            });
        }
        totalCumulativeWeight = 0;  // Initialize total cumulative weight
    }

    // Modifiers
    modifier onlyValidTier(uint256 tier) {
        require(tier < 10, "Invalid tier");
        _;
    }

    /**
     * @dev Sets the prices for a specific tier.
     * @param tier The tier number.
     * @param priceInBaseToken The price in the base blockchain token.
     * @param priceInPaymentToken The price in the specified payment token.
     * @param priceInAnotherPaymentToken The price in another specified payment token.
     */
    function setTierPrice(uint256 tier, uint256 priceInBaseToken, uint256 priceInPaymentToken, uint256 priceInAnotherPaymentToken) external onlyOwner onlyValidTier(tier) {
        tiers[tier].priceInBaseToken = priceInBaseToken;
        tiers[tier].priceInPaymentToken = priceInPaymentToken;
        tiers[tier].priceInAnotherPaymentToken = priceInAnotherPaymentToken;
        emit TierPriceSet(tier, priceInBaseToken, priceInPaymentToken, priceInAnotherPaymentToken);
    }

    /**
     * @dev Sets the weight for a specific tier.
     * @param tier The tier number.
     * @param weight The weight value.
     */
    function setTierWeight(uint256 tier, uint256 weight) external onlyOwner onlyValidTier(tier) {
        totalCumulativeWeight -= tiers[tier].weight;  // Subtract old weight from total
        tiers[tier].weight = weight;
        totalCumulativeWeight += weight;  // Add new weight to total
        emit TierWeightSet(tier, weight);
    }

    /**
     * @dev Sets the payment token address.
     * @param token The address of the payment token.
     */
    function setPaymentToken(address token) external onlyOwner {
        paymentToken = token;
        emit PaymentTokenSet(token);
    }

    /**
     * @dev Sets another payment token address.
     * @param token The address of another payment token.
     */
    function setAnotherPaymentToken(address token) external onlyOwner {
        anotherPaymentToken = token;
        emit AnotherPaymentTokenSet(token);
    }

    /**
     * @dev Mints an NFT with the base blockchain token.
     * @param tier The tier number.
     */
    function mintWithBaseToken(uint256 tier) external payable onlyValidTier(tier) {
        require(msg.value >= tiers[tier].priceInBaseToken, "Insufficient payment");

        _mintToken(tier);
    }

    /**
     * @dev Mints an NFT with the specified payment token.
     * @param tier The tier number.
     */
    function mintWithPaymentToken(uint256 tier) external onlyValidTier(tier) {
        uint256 price = tiers[tier].priceInPaymentToken;
        require(IERC20Upgradeable(paymentToken).transferFrom(msg.sender, address(this), price), "Payment failed");

        _mintToken(tier);
    }

    /**
     * @dev Mints an NFT with another specified payment token.
     * @param tier The tier number.
     */
    function mintWithAnotherPaymentToken(uint256 tier) external onlyValidTier(tier) {
        uint256 price = tiers[tier].priceInAnotherPaymentToken;
        require(IERC20Upgradeable(anotherPaymentToken).transferFrom(msg.sender, address(this), price), "Payment failed");

        _mintToken(tier);
    }

    /**
     * @dev Internal function to mint a token and update lottery entries.
     * @param tier The tier number.
     */
    function _mintToken(uint256 tier) internal {
        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();
        _tokenTiers[newTokenId] = tier;

        _mint(msg.sender, newTokenId);

        // Register address with LottoID indexer
        uint256 lottoID = _lottoIdCounter.current();
        _lottoIdCounter.increment();
        lottoIDIndexer[lottoID] = msg.sender;

        // Update address to LottoIDs mapping with LottoEntry struct
        addressToLottoIDs[msg.sender].push(LottoEntry({lottoID: lottoID, weight: tiers[tier].weight}));

        // Update lottery entries based on tier weight
        uint256 weight = tiers[tier].weight;
        totalCumulativeWeight += weight;  // Add weight to total cumulative weight
        for (uint256 i = 0; i < weight; i++) {
            lotto[lottoPointer] = lottoID;
            lottoPointer++;
        }

        emit TokenMinted(msg.sender, newTokenId, tier, lottoID);
    }

    /**
     * @dev Returns the tier of a token.
     * @param tokenId The ID of the token.
     * @return The tier number.
     */
    function tokenTier(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenTiers[tokenId];
    }

    /**
     * @dev Returns the weight of a tier.
     * @param tier The tier number.
     * @return The weight value.
     */
    function tierWeight(uint256 tier) external view returns (uint256) {
        require(tier < 10, "Invalid tier");
        return tiers[tier].weight;
    }

    /**
     * @dev Returns the LottoEntries associated with an address.
     * @param user The address of the user.
     * @return An array of LottoEntry structs.
     */
    function getLottoIDsByAddress(address user) external view returns (LottoEntry[] memory) {
        return addressToLottoIDs[user];
    }

    /**
     * @dev Withdraws the contract balance to the owner.
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
        emit Withdrawn(owner(), balance);

        if (paymentToken != address(0)) {
            uint256 tokenBalance = IERC20Upgradeable(paymentToken).balanceOf(address(this));
            if (tokenBalance > 0) {
                IERC20Upgradeable(paymentToken).transfer(owner(), tokenBalance);
                emit Withdrawn(owner(), tokenBalance);
            }
        }

        if (anotherPaymentToken != address(0)) {
            uint256 tokenBalance = IERC20Upgradeable(anotherPaymentToken).balanceOf(address(this));
            if (tokenBalance > 0) {
                IERC20Upgradeable(anotherPaymentToken).transfer(owner(), tokenBalance);
                emit Withdrawn(owner(), tokenBalance);
            }
        }
    }

    // Override _beforeTokenTransfer to prevent transfers (soulbound tokens)
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        require(from == address(0) || to == address(0), "Transfers are disabled");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // Burn function to allow burning of NFTs
    function burn(uint256 tokenId) external {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved");
        _burn(tokenId);
    }
}
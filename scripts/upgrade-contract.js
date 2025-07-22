const { ethers, upgrades } = require("hardhat");

async function main() {
    console.log("Upgrading NFT Lottery Contract...");

    // The proxy address (this should be the address of your deployed proxy)
    const proxyAddress = "YOUR_PROXY_ADDRESS_HERE"; // Replace with your actual proxy address

    // Get the new implementation contract factory
    const NFTLotteryMintingTierV11 = await ethers.getContractFactory("NFTLotteryMintingTierV11");

    console.log("Upgrading proxy at:", proxyAddress);

    // Upgrade the proxy to the new implementation
    const upgraded = await upgrades.upgradeProxy(proxyAddress, NFTLotteryMintingTierV11);

    console.log("Contract upgraded successfully!");
    console.log("New implementation address:", await upgrades.erc1967.getImplementationAddress(upgraded.address));
    console.log("Proxy address (unchanged):", upgraded.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 
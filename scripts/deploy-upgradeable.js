const { ethers, upgrades } = require("hardhat");

async function main() {
    console.log("Deploying NFT Lottery Contract (Upgradeable)...");

    // Get the contract factory
    const NFTLotteryMintingTierV11 = await ethers.getContractFactory("NFTLotteryMintingTierV11");

    // Deploy the implementation contract
    console.log("Deploying implementation contract...");
    const nftLottery = await upgrades.deployProxy(NFTLotteryMintingTierV11, [], {
        initializer: 'initialize',
        kind: 'uups'
    });

    await nftLottery.deployed();
    console.log("NFT Lottery Contract deployed to:", nftLottery.address);

    // Get the implementation address
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(nftLottery.address);
    console.log("Implementation address:", implementationAddress);

    // Get the admin address
    const adminAddress = await upgrades.erc1967.getAdminAddress(nftLottery.address);
    console.log("Admin address:", adminAddress);

    console.log("Deployment completed successfully!");
    console.log("Proxy address:", nftLottery.address);
    console.log("Implementation address:", implementationAddress);
    console.log("Admin address:", adminAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 
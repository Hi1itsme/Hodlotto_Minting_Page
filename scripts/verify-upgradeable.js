const { ethers, upgrades } = require("hardhat");

async function main() {
    console.log("Verifying NFT Lottery Contract (Upgradeable)...");

    // The proxy address (this should be the address of your deployed proxy)
    const proxyAddress = "YOUR_PROXY_ADDRESS_HERE"; // Replace with your actual proxy address

    // Get the implementation address
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
    console.log("Implementation address:", implementationAddress);

    // Get the admin address
    const adminAddress = await upgrades.erc1967.getAdminAddress(proxyAddress);
    console.log("Admin address:", adminAddress);

    console.log("Verification addresses:");
    console.log("Proxy:", proxyAddress);
    console.log("Implementation:", implementationAddress);
    console.log("Admin:", adminAddress);

    // You can now verify these contracts on Etherscan:
    // 1. Verify the implementation contract at implementationAddress
    // 2. Verify the proxy contract at proxyAddress
    // 3. Verify the admin contract at adminAddress (if using TransparentProxy)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 
# NFT Lottery System - Upgradeable Implementation

## 🚀 Overview

This project implements an **upgradeable NFT Lottery System** using OpenZeppelin's UUPS (Universal Upgradeable Proxy Standard) pattern. The system allows for seamless contract upgrades while preserving all state and user data.

## 🔧 Upgradeable Architecture

### **UUPS Proxy Pattern**
- **Proxy Contract**: Delegates all calls to the implementation contract
- **Implementation Contract**: Contains the actual logic and state
- **Admin Contract**: Manages upgrades (only for TransparentProxy)

### **Key Benefits**
- ✅ **State Preservation**: All user data and contract state preserved during upgrades
- ✅ **Gas Efficiency**: UUPS pattern is more gas-efficient than TransparentProxy
- ✅ **Security**: Only the owner can upgrade the contract
- ✅ **Flexibility**: Can add new features without affecting existing functionality

## 📁 File Structure

```
├── LottoTicketMinter.sol              # Main upgradeable contract
├── contracts/
│   └── NFTLotteryProxy.sol            # Proxy contract (optional)
├── scripts/
│   ├── deploy-upgradeable.js          # Deployment script
│   ├── upgrade-contract.js            # Upgrade script
│   └── verify-upgradeable.js          # Verification script
├── hardhat.config.js                  # Hardhat configuration
└── package.json                       # Dependencies
```

## 🛠️ Installation & Setup

### **1. Install Dependencies**
```bash
npm install
```

### **2. Compile Contracts**
```bash
npm run compile
```

### **3. Start Local Network**
```bash
npm run node
```

## 🚀 Deployment

### **Local Deployment**
```bash
npm run deploy
```

### **Mainnet Deployment**
```bash
npm run deploy:mainnet
```

## 🔄 Contract Upgrades

### **Upgrade Process**
1. **Deploy New Implementation**: New contract with updated logic
2. **Call Upgrade Function**: Proxy points to new implementation
3. **Verify Upgrade**: Test new functionality

### **Upgrade Commands**
```bash
# Local upgrade
npm run upgrade

# Mainnet upgrade
npm run upgrade:mainnet
```

## 🔍 Verification

### **Verify on Etherscan**
```bash
npm run verify
```

### **Addresses to Verify**
- **Proxy Address**: Main contract address users interact with
- **Implementation Address**: Contains the actual logic
- **Admin Address**: Manages upgrades (UUPS doesn't use separate admin)

## 📋 Contract Features

### **Upgradeable Components**
- ✅ **ERC721Upgradeable**: Upgradeable NFT standard
- ✅ **OwnableUpgradeable**: Upgradeable access control
- ✅ **UUPSUpgradeable**: Universal upgradeable proxy standard
- ✅ **Initializable**: Proper initialization pattern

### **State Variables Preserved**
- `_tokenIds`: Token ID counter
- `_lottoIdCounter`: Lottery ID counter
- `tiers`: Tier configuration mapping
- `_tokenTiers`: Token to tier mapping
- `lotto`: Lottery entries mapping
- `lottoIDIndexer`: Lottery ID to address mapping
- `addressToLottoIDs`: Address to lottery entries mapping
- `lottoPointer`: Current lottery pointer
- `totalCumulativeWeight`: Total weight for lottery

## 🔐 Security Features

### **Upgrade Authorization**
```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
```

### **Access Control**
- Only contract owner can upgrade
- Only contract owner can set tier prices/weights
- Only contract owner can withdraw funds

### **State Protection**
- All user data preserved during upgrades
- Lottery entries remain intact
- Token ownership unchanged

## 🧪 Testing Upgrades

### **1. Deploy Initial Contract**
```bash
npm run deploy
```

### **2. Make Changes to Contract**
- Modify the contract logic
- Add new functions
- Update existing functions

### **3. Deploy Upgrade**
```bash
npm run upgrade
```

### **4. Verify Functionality**
- Test new features
- Verify state preservation
- Check user data integrity

## 📊 Upgrade Best Practices

### **Before Upgrading**
1. **Test Thoroughly**: Test on testnet first
2. **Backup State**: Document current state
3. **Plan Rollback**: Have rollback strategy ready
4. **Notify Users**: Inform users of upcoming changes

### **During Upgrade**
1. **Pause Operations**: Temporarily pause critical functions
2. **Execute Upgrade**: Deploy new implementation
3. **Verify State**: Ensure all data preserved
4. **Resume Operations**: Re-enable functions

### **After Upgrade**
1. **Monitor Performance**: Watch for issues
2. **Test Functionality**: Verify all features work
3. **Update Documentation**: Update any relevant docs
4. **User Communication**: Inform users of changes

## 🔧 Configuration

### **Environment Variables**
```bash
# .env file
PRIVATE_KEY=your_private_key_here
MAINNET_URL=your_mainnet_rpc_url
SEPOLIA_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### **Network Configuration**
```javascript
// hardhat.config.js
networks: {
  mainnet: {
    url: process.env.MAINNET_URL,
    accounts: [process.env.PRIVATE_KEY]
  },
  sepolia: {
    url: process.env.SEPOLIA_URL,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

## 🚨 Important Notes

### **Upgrade Limitations**
- **Storage Layout**: Cannot change storage layout
- **Function Signatures**: Cannot remove functions users depend on
- **State Variables**: Cannot remove state variables

### **Best Practices**
- **Test Extensively**: Always test upgrades on testnet
- **Document Changes**: Keep detailed upgrade logs
- **Monitor Closely**: Watch for issues after upgrades
- **Have Rollback Plan**: Be prepared to rollback if needed

## 📞 Support

For questions or issues with the upgradeable implementation:
- Check the OpenZeppelin documentation
- Review the upgrade patterns guide
- Test thoroughly before mainnet deployment

---

**🎯 The upgradeable implementation is now ready for deployment and future upgrades!** 
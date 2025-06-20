# HODLotto Frontend

A modern React-based frontend for the HODLotto NFT minting platform. This application provides a beautiful and intuitive interface for users to mint lottery tickets across different tiers with various payment options.

## Features

- **10 Tier System**: Each tier has different weights and prices
- **Multiple Payment Options**: Support for ETH, payment tokens, and alternative tokens
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Wallet Integration**: Ready for Web3 wallet connections
- **Soulbound NFTs**: Information about non-transferable tokens

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Heroicons** for icons
- **Web3.js/Ethers.js** ready for blockchain integration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HODLottoFinal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── MintingTier.tsx      # Individual tier panel component
│   └── MintingPage.tsx      # Main minting page layout
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main application component
├── index.tsx                # React entry point
└── index.css               # Global styles and Tailwind imports
```

## Contract Integration

The frontend is designed to work with the `NFTLotteryMintingTierV11` smart contract. Currently using mock data, but ready for integration with:

- **Contract Address**: To be configured
- **ABI**: To be imported
- **Web3 Provider**: MetaMask or other wallet providers

### Integration Points

1. **Wallet Connection**: Replace mock wallet connection with actual Web3 provider
2. **Contract Calls**: Replace mock data loading with actual contract calls
3. **Minting Functions**: Implement actual minting transactions
4. **Event Listening**: Listen for contract events and update UI

## Tier System

The application supports 10 tiers (0-9) with the following characteristics:

- **Tier 0-2**: Common (1-4 weight)
- **Tier 3-5**: Rare (8-32 weight)  
- **Tier 6-7**: Epic (64-128 weight)
- **Tier 8-9**: Legendary (256-512 weight)

Each tier can have different prices for:
- Base token (ETH)
- Payment token (ERC20)
- Another payment token (ERC20)

## Styling

The application uses Tailwind CSS with custom components:

- `.tier-card`: Glassmorphism effect for tier panels
- `.mint-button`: Gradient buttons with hover effects
- Custom color palette with primary and secondary gradients

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 
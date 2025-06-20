// Contract ABI for NFTLotteryMintingTierV11
// This is a simplified version - you'll need to generate the full ABI from your compiled contract

export const CONTRACT_ABI = [
  // Tier management
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceInBaseToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceInPaymentToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceInAnotherPaymentToken",
        "type": "uint256"
      }
    ],
    "name": "setTierPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      }
    ],
    "name": "setTierWeight",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  
  // Minting functions
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      }
    ],
    "name": "mintWithBaseToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      }
    ],
    "name": "mintWithPaymentToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      }
    ],
    "name": "mintWithAnotherPaymentToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  
  // View functions
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tiers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "priceInBaseToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceInPaymentToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceInAnotherPaymentToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paymentToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "anotherPaymentToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalCumulativeWeight",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenTier",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      }
    ],
    "name": "tierWeight",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getLottoIDsByAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "lottoID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "weight",
            "type": "uint256"
          }
        ],
        "internalType": "struct NFTLotteryMintingTierV11.LottoEntry[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  
  // Events
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "priceInBaseToken",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "priceInPaymentToken",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "priceInAnotherPaymentToken",
        "type": "uint256"
      }
    ],
    "name": "TierPriceSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      }
    ],
    "name": "TierWeightSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tier",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lottoID",
        "type": "uint256"
      }
    ],
    "name": "TokenMinted",
    "type": "event"
  }
];

// Contract configuration
export const CONTRACT_CONFIG = {
  // Replace with your deployed contract address
  address: "0x0000000000000000000000000000000000000000",
  abi: CONTRACT_ABI,
}; 
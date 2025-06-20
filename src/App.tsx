import React, { useState, useEffect } from 'react';
import MintingPage from './components/MintingPage';
import { ContractData, Tier } from './types';

// Mock data for development - replace with actual contract calls
const mockContractData: ContractData = {
  tiers: [
    {
      priceInBaseToken: "0.0001", // Very cheap entry tier
      priceInPaymentToken: "1",   // 1 token
      priceInAnotherPaymentToken: "0.1", // 0.1 alt token
      weight: "1"
    },
    {
      priceInBaseToken: "0.0005", // Cheap tier
      priceInPaymentToken: "5",   // 5 tokens
      priceInAnotherPaymentToken: "0.5", // 0.5 alt token
      weight: "2"
    },
    {
      priceInBaseToken: "0.001",  // Low tier
      priceInPaymentToken: "10",  // 10 tokens
      priceInAnotherPaymentToken: "1",   // 1 alt token
      weight: "4"
    },
    {
      priceInBaseToken: "0.002",  // Mid-low tier
      priceInPaymentToken: "20",  // 20 tokens
      priceInAnotherPaymentToken: "2",   // 2 alt tokens
      weight: "8"
    },
    {
      priceInBaseToken: "0.005",  // Mid tier
      priceInPaymentToken: "50",  // 50 tokens
      priceInAnotherPaymentToken: "5",   // 5 alt tokens
      weight: "16"
    },
    {
      priceInBaseToken: "0.01",   // Mid-high tier
      priceInPaymentToken: "100", // 100 tokens
      priceInAnotherPaymentToken: "10",  // 10 alt tokens
      weight: "32"
    },
    {
      priceInBaseToken: "0.02",   // High tier
      priceInPaymentToken: "200", // 200 tokens
      priceInAnotherPaymentToken: "20",  // 20 alt tokens
      weight: "64"
    },
    {
      priceInBaseToken: "0.05",   // Very high tier
      priceInPaymentToken: "500", // 500 tokens
      priceInAnotherPaymentToken: "50",  // 50 alt tokens
      weight: "128"
    },
    {
      priceInBaseToken: "0.1",    // Premium tier
      priceInPaymentToken: "1000", // 1000 tokens
      priceInAnotherPaymentToken: "100", // 100 alt tokens
      weight: "256"
    },
    {
      priceInBaseToken: "0.2",    // Legendary tier
      priceInPaymentToken: "2000", // 2000 tokens
      priceInAnotherPaymentToken: "200", // 200 alt tokens
      weight: "512"
    }
  ],
  paymentToken: "0x1234567890123456789012345678901234567890",
  anotherPaymentToken: "0x0987654321098765432109876543210987654321",
  totalCumulativeWeight: "1023"
};

function App() {
  const [contractData, setContractData] = useState<ContractData>(mockContractData);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Mock function to load contract data - replace with actual Web3 calls
  const loadContractData = async () => {
    try {
      // TODO: Replace with actual contract calls
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // const tiers = await contract.methods.getTiers().call();
      // setContractData(tiers);
      console.log('Loading contract data...');
    } catch (error) {
      console.error('Error loading contract data:', error);
    }
  };

  // Mock minting function - replace with actual contract interactions
  const handleMint = async (tierNumber: number, paymentMethod: 'base' | 'payment' | 'another') => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Minting tier ${tierNumber} with ${paymentMethod} payment method`);
      
      // TODO: Replace with actual minting logic
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // let transaction;
      // 
      // switch (paymentMethod) {
      //   case 'base':
      //     transaction = await contract.methods.mintWithBaseToken(tierNumber).send({
      //       from: account,
      //       value: contractData.tiers[tierNumber].priceInBaseToken
      //     });
      //     break;
      //   case 'payment':
      //     // Approve token first
      //     await paymentTokenContract.methods.approve(CONTRACT_ADDRESS, contractData.tiers[tierNumber].priceInPaymentToken).send({ from: account });
      //     transaction = await contract.methods.mintWithPaymentToken(tierNumber).send({ from: account });
      //     break;
      //   case 'another':
      //     // Approve token first
      //     await anotherPaymentTokenContract.methods.approve(CONTRACT_ADDRESS, contractData.tiers[tierNumber].priceInAnotherPaymentToken).send({ from: account });
      //     transaction = await contract.methods.mintWithAnotherPaymentToken(tierNumber).send({ from: account });
      //     break;
      // }
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Successfully minted Tier ${tierNumber} NFT!`);
      
      // Reload contract data to update any state changes
      await loadContractData();
      
    } catch (error) {
      console.error('Minting error:', error);
      alert('Minting failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock wallet connection - replace with actual Web3 wallet connection
  const connectWallet = async () => {
    try {
      // TODO: Replace with actual wallet connection logic
      // if (typeof window.ethereum !== 'undefined') {
      //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      //   setIsConnected(true);
      //   setAccount(accounts[0]);
      // }
      console.log('Connecting wallet...');
      setIsConnected(true);
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet');
    }
  };

  useEffect(() => {
    loadContractData();
  }, []);

  return (
    <div className="App">
      {/* Header with wallet connection */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">HODLotto</span>
            </div>
            
            <button
              onClick={connectWallet}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isConnected 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}
            >
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <MintingPage
        contractData={contractData}
        onMint={handleMint}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App; 
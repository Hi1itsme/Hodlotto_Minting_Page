import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MintingTier from './components/MintingTier';
import { ContractData } from './types';

// Mock data for development - replace with actual contract calls
const mockContractData: ContractData = {
  tiers: [
    {
      priceInBaseToken: "0.0001", // Moon - Entry level
      priceInPaymentToken: "1",   // 1 token
      priceInAnotherPaymentToken: "0.1", // 0.1 alt token
      weight: "1"
    },
    {
      priceInBaseToken: "0.0003", // Mercury - Smallest planet
      priceInPaymentToken: "3",   // 3 tokens
      priceInAnotherPaymentToken: "0.3", // 0.3 alt token
      weight: "2"
    },
    {
      priceInBaseToken: "0.0005", // Venus - Earth's twin
      priceInPaymentToken: "5",   // 5 tokens
      priceInAnotherPaymentToken: "0.5", // 0.5 alt token
      weight: "4"
    },
    {
      priceInBaseToken: "0.001",  // Earth - Our home
      priceInPaymentToken: "10",  // 10 tokens
      priceInAnotherPaymentToken: "1",   // 1 alt token
      weight: "8"
    },
    {
      priceInBaseToken: "0.002",  // Mars - Red planet
      priceInPaymentToken: "20",  // 20 tokens
      priceInAnotherPaymentToken: "2",   // 2 alt tokens
      weight: "16"
    },
    {
      priceInBaseToken: "0.005",  // Jupiter - Gas giant
      priceInPaymentToken: "50",  // 50 tokens
      priceInAnotherPaymentToken: "5",   // 5 alt tokens
      weight: "32"
    },
    {
      priceInBaseToken: "0.01",   // Saturn - Ringed planet
      priceInPaymentToken: "100", // 100 tokens
      priceInAnotherPaymentToken: "10",  // 10 alt tokens
      weight: "64"
    },
    {
      priceInBaseToken: "0.02",   // Uranus - Ice giant
      priceInPaymentToken: "200", // 200 tokens
      priceInAnotherPaymentToken: "20",  // 20 alt tokens
      weight: "128"
    },
    {
      priceInBaseToken: "0.05",   // Neptune - Blue giant
      priceInPaymentToken: "500", // 500 tokens
      priceInAnotherPaymentToken: "50",  // 50 alt tokens
      weight: "256"
    },
    {
      priceInBaseToken: "0.1",    // Pluto - Dwarf planet
      priceInPaymentToken: "1000", // 1000 tokens
      priceInAnotherPaymentToken: "100", // 100 alt tokens
      weight: "512"
    }
  ],
  paymentToken: "0x1234567890123456789012345678901234567890",
  anotherPaymentToken: "0x0987654321098765432109876543210987654321",
  totalCumulativeWeight: "1023"
};

function App() {
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mintingTier, setMintingTier] = useState<number | null>(null);

  useEffect(() => {
    // Simulate contract data loading
    setTimeout(() => {
      setContractData(mockContractData);
    }, 1000);
  }, []);

  const handleMint = async (tierNumber: number, paymentType: 'base' | 'payment' | 'another') => {
    setIsLoading(true);
    setMintingTier(tierNumber);
    
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Minting tier ${tierNumber} with ${paymentType} payment`);
    
    setIsLoading(false);
    setMintingTier(null);
  };

  if (!contractData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Cosmic Lottery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/4 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-white/80 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-80 left-1/2 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-96 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-2500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cosmic Lottery
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Mint celestial NFTs and enter the cosmic lottery. Each celestial body has its own gravitational pull in the lottery system.
          </p>
          
          {/* Lottery Info */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">🌌 Cosmic Lottery System</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {contractData.totalCumulativeWeight}
                </div>
                <div className="text-gray-300">Total Gravitational Force</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  10
                </div>
                <div className="text-gray-300">Celestial Bodies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  ∞
                </div>
                <div className="text-gray-300">Cosmic Possibilities</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
              <p className="text-gray-300 text-sm">
                <strong>How it works:</strong> Each NFT's weight represents its gravitational pull in the lottery. 
                Higher tiers have exponentially more weight, giving you better odds in the cosmic draw. 
                The Moon starts with weight 1, while Pluto (the rarest) has weight 512!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tiers Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {contractData.tiers.map((tier, index) => (
            <MintingTier
              key={index}
              tierNumber={index}
              tier={tier}
              onMint={handleMint}
              isLoading={isLoading && mintingTier === index}
            />
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm">
            🌟 Explore the cosmos, mint celestial NFTs, and may the gravitational forces be ever in your favor! 🌟
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App; 
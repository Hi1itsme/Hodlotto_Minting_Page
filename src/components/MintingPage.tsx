import React from 'react';
import { motion } from 'framer-motion';
import { Tier } from '../types';

interface MintingPageProps {
  tier: Tier;
  contractData: {
    totalSupply: number;
    maxSupply: number;
    mintPrice: number;
    isPaused: boolean;
  };
  lottoEntries: Array<{
    id: number;
    address: string;
    amount: number;
    timestamp: number;
  }>;
  onMint: () => void;
}

const MintingPage: React.FC<MintingPageProps> = ({ tier, contractData, lottoEntries, onMint }) => {
  const getRarityColor = (weight: number) => {
    if (weight <= 3) return 'text-green-400';
    if (weight <= 6) return 'text-yellow-400';
    return 'text-purple-400';
  };

  const getRarityText = (weight: number) => {
    if (weight <= 3) return 'Common';
    if (weight <= 6) return 'Rare';
    return 'Legendary';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 lg:p-8 shadow-2xl"
      >
        {/* NFT Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <img
                src={`/${tier.name}_Icon.png`}
                alt={tier.name}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{tier.name}</h2>
              <div className="flex gap-2 mb-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                  Tier {tier.id}
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                  Weight: {tier.weight}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30 mb-2">
              Cosmic Collection
            </div>
            <div className="text-white/70 text-sm">NFT #{String(tier.id).padStart(3, '0')}</div>
          </div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4 border border-white/20">
            <p className="text-white/70 text-xs mb-1">Base Price</p>
            <p className="text-purple-400 font-bold text-lg">{tier.basePrice} ETH</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4 border border-white/20">
            <p className="text-white/70 text-xs mb-1">Payment Price</p>
            <p className="text-pink-400 font-bold text-lg">{tier.paymentPrice} ETH</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4 border border-white/20">
            <p className="text-white/70 text-xs mb-1">Another Price</p>
            <p className="text-blue-400 font-bold text-lg">{tier.anotherPrice} ETH</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4 border border-white/20">
            <p className="text-white/70 text-xs mb-1">Rarity</p>
            <p className={`font-bold text-lg ${getRarityColor(tier.weight)}`}>{getRarityText(tier.weight)}</p>
          </div>
        </div>

        {/* NFT Description */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">NFT Description</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            The {tier.name} NFT represents a unique celestial body in our cosmic lottery ecosystem.
            Each {tier.name} NFT carries special weight and rarity characteristics that influence
            the lottery outcomes. Collectors can mint these NFTs using different payment methods,
            each offering unique advantages and potential rewards within the cosmic collection.
          </p>
        </div>

        {/* Minting Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            onClick={onMint}
          >
            + Mint with Base
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
            onClick={onMint}
          >
            Mint with Payment
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            onClick={onMint}
          >
            Mint with Another
          </motion.button>
        </div>

        {/* Recent Entries */}
        {lottoEntries.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <h3 className="text-white font-semibold mb-3">Recent Entries</h3>
            <div className="space-y-2">
              {lottoEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{entry.address}</span>
                  <span className="text-white">{entry.amount} entries</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MintingPage; 
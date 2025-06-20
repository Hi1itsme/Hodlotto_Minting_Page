import React from 'react';
import { motion } from 'framer-motion';
import { MintingPageProps } from '../types';
import MintingTier from './MintingTier';

// Inline SVG icons to avoid import issues
const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const InformationCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MintingPage: React.FC<MintingPageProps> = ({ 
  contractData, 
  onMint, 
  isLoading 
}) => {
  const totalWeight = contractData.totalCumulativeWeight;
  const activeTiers = contractData.tiers.filter(tier => 
    parseFloat(tier.priceInBaseToken) > 0 || 
    parseFloat(tier.priceInPaymentToken) > 0 || 
    parseFloat(tier.priceInAnotherPaymentToken) > 0
  ).length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrophyIcon className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              HODLotto
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Mint your lottery tickets and increase your chances of winning!
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">{activeTiers}</div>
              <div className="text-sm text-gray-400">Active Tiers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">{totalWeight}</div>
              <div className="text-sm text-gray-400">Total Weight</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">10</div>
              <div className="text-sm text-gray-400">Max Tiers</div>
            </div>
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center space-x-3">
              <InformationCircleIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-300 mb-1">How it works</h3>
                <p className="text-sm text-gray-300">
                  Each tier has different weights that determine your lottery odds. 
                  Higher tiers = better chances to win! NFTs are soulbound and cannot be transferred.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tiers Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {contractData.tiers.map((tier, index) => (
            <MintingTier
              key={index}
              tierNumber={index}
              tier={tier}
              onMint={onMint}
              isLoading={isLoading}
            />
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ChartBarIcon className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Lottery System</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Weight System</h4>
                <p className="text-gray-300">
                  Each NFT has a weight based on its tier. Higher weights mean better lottery odds.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Soulbound Tokens</h4>
                <p className="text-gray-300">
                  NFTs cannot be transferred or sold. They are permanently bound to your wallet.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Multiple Payment Options</h4>
                <p className="text-gray-300">
                  Mint with ETH, payment tokens, or alternative tokens depending on tier availability.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MintingPage; 
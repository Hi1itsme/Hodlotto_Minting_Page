import React from 'react';
import { motion } from 'framer-motion';
import { Tier } from '../types';
import EarthBackground from './SpacemanBackground';

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
  const planetIcons = [
    '/Mercury_icon.png',
    '/Venus_icon.png',
    '/Earth_Icon.png',
    '/Mars_Icon.png',
    '/Jupiter_Icon.png',
    '/Saturn Icon.png',
    '/Uranus_Icon.png',
    '/Neptune_Icon.png',
    '/Pluto_Icon.png',
    '/Moon_Icon.png'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <EarthBackground className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
        {/* NFT Card Header */}
        <div className="p-8">
          {/* NFT Badge and Tier Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <motion.img
                src={planetIcons[tier.id - 1] || planetIcons[0]}
                alt={`Planet ${tier.id}`}
                className="w-20 h-20 object-contain"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              />
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{tier.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold">
                    Tier {tier.id}
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold">
                    Weight: {tier.weight}
                  </div>
                </div>
              </div>
            </div>

            {/* NFT Collection Badge */}
            <div className="text-right">
              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-semibold mb-2">
                Cosmic Collection
              </div>
              <div className="text-white/70 text-sm">NFT #{tier.id.toString().padStart(3, '0')}</div>
            </div>
          </div>

          {/* NFT Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="text-sm font-semibold text-white/70 mb-1">Base Price</h3>
              <p className="text-2xl font-bold text-purple-400">{tier.basePrice} ETH</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="text-sm font-semibold text-white/70 mb-1">Payment Price</h3>
              <p className="text-2xl font-bold text-pink-400">{tier.paymentPrice} ETH</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="text-sm font-semibold text-white/70 mb-1">Another Price</h3>
              <p className="text-2xl font-bold text-blue-400">{tier.anotherPrice} ETH</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="text-sm font-semibold text-white/70 mb-1">Rarity</h3>
              <p className="text-2xl font-bold text-green-400">{tier.weight > 5 ? 'Legendary' : tier.weight > 3 ? 'Rare' : 'Common'}</p>
            </div>
          </div>

          {/* NFT Description */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">NFT Description</h3>
            <p className="text-white/80 leading-relaxed">
              The {tier.name} NFT represents one of the most prestigious celestial bodies in our cosmic collection.
              This unique digital asset grants you exclusive access to our lottery system with enhanced weight
              for better odds. Each NFT is soulbound and cannot be transferred, ensuring the integrity of our
              cosmic lottery ecosystem.
            </p>
          </div>

          {/* Minting Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.button
              onClick={onMint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Mint with Base
            </motion.button>
            <motion.button
              onClick={onMint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl text-white font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Mint with Payment
            </motion.button>
            <motion.button
              onClick={onMint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Mint with Another
            </motion.button>
          </div>
        </div>
      </EarthBackground>
    </div>
  );
};

export default MintingPage; 
import React from 'react';
import { motion } from 'framer-motion';
import { Tier } from '../types';

interface MintingTierProps {
  tierNumber: number;
  tier: Tier;
  onMint: (tierNumber: number, paymentMethod: 'base' | 'payment' | 'another') => void;
  isLoading: boolean;
}

const MintingTier: React.FC<MintingTierProps> = ({ tierNumber, tier, onMint, isLoading }) => {
  const planetIcons = [
    '/Moon_Icon_2.png', '/Mercury_Icon_2.png', '/Venus_Icon_2.png', '/Earth_Icon_2.png', '/Mars_Icon_2.png',
    '/Jupiter_Icon_2.png', '/Saturn_Icon_2.png', '/Uranus_Icon.png', '/Neptune_Icon_2.png', '/Pluto_Icon.png'
  ];

  const planetNames = [
    'Moon', 'Mercury', 'Venus', 'Earth', 'Mars',
    'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
  ];

  const getTierColor = (tierNumber: number) => {
    const colors = [
      'from-blue-400 to-cyan-400', // Moon
      'from-gray-400 to-slate-400', // Mercury
      'from-orange-400 to-yellow-400', // Venus
      'from-green-400 to-blue-400', // Earth
      'from-red-400 to-orange-400', // Mars
      'from-yellow-400 to-orange-400', // Jupiter
      'from-yellow-300 to-orange-300', // Saturn
      'from-cyan-400 to-blue-400', // Uranus
      'from-blue-500 to-indigo-500', // Neptune
      'from-purple-400 to-pink-400' // Pluto
    ];
    return colors[tierNumber] || colors[0];
  };

  const getTierGlow = (tierNumber: number) => {
    const glows = [
      'shadow-blue-500/30', // Moon
      'shadow-gray-500/30', // Mercury
      'shadow-orange-500/30', // Venus
      'shadow-green-500/30', // Earth
      'shadow-red-500/30', // Mars
      'shadow-yellow-500/30', // Jupiter
      'shadow-yellow-400/30', // Saturn
      'shadow-cyan-500/30', // Uranus
      'shadow-blue-600/30', // Neptune
      'shadow-purple-500/30' // Pluto
    ];
    return glows[tierNumber] || glows[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
      }}
      className="relative group"
    >
      {/* Main Card Container */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 border border-white/20 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
      >
        {/* Video Background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) contrast(1.3)' }}
            onLoadedData={() => console.log('NFT Card video loaded successfully')}
            onError={(e) => console.error('NFT Card video error:', e)}
          >
            <source src="/Horizon_Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video overlay for better glass effect */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 100%)',
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)'
            }}
          />
        </div>

        {/* Glass overlay */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        />

        {/* Animated border glow */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px rgba(99, 102, 241, 0.3)`,
              `0 0 40px rgba(168, 85, 247, 0.3)`,
              `0 0 20px rgba(236, 72, 153, 0.3)`,
              `0 0 20px rgba(99, 102, 241, 0.3)`
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`
              }}
            />
          ))}
        </div>

        {/* Glass reflection */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 rounded-t-3xl opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
            transform: 'translateY(-1px)'
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with Planet Icon */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="relative mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px rgba(99, 102, 241, 0.4)`,
                      `0 0 40px rgba(168, 85, 247, 0.4)`,
                      `0 0 20px rgba(236, 72, 153, 0.4)`,
                      `0 0 20px rgba(99, 102, 241, 0.4)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full"
                />
                <img
                  src={planetIcons[tierNumber]}
                  alt={planetNames[tierNumber]}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-white/30 shadow-lg"
                />
              </div>
            </motion.div>

            <motion.h3
              className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {planetNames[tierNumber]}
            </motion.h3>

            <motion.div
              className={`w-16 h-1 bg-gradient-to-r ${getTierColor(tierNumber)} mx-auto rounded-full mb-4`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-gray-300 mb-1">Weight</div>
              <div className="text-xl font-bold text-purple-400">{tier.weight}</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 backdrop-blur-lg rounded-xl p-4 border border-indigo-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-gray-300 mb-1">Price (Base)</div>
              <div className="text-xl font-bold text-indigo-400">{tier.basePrice} ETH</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 backdrop-blur-lg rounded-xl p-4 border border-pink-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-gray-300 mb-1">Price (Payment)</div>
              <div className="text-xl font-bold text-pink-400">{tier.paymentPrice} ETH</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-gray-300 mb-1">Price (Another)</div>
              <div className="text-xl font-bold text-cyan-400">{tier.anotherPrice} ETH</div>
            </motion.div>
          </motion.div>

          {/* Mint Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="space-y-3"
          >
            {/* Base Token Button */}
            <motion.button
              onClick={() => onMint(tierNumber, 'base')}
              disabled={isLoading}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 px-6 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${getTierColor(tierNumber)} text-white hover:shadow-lg ${getTierGlow(tierNumber)}`
                }`}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                    />
                    Minting...
                  </>
                ) : (
                  `Mint with Base Token`
                )}
              </span>
            </motion.button>

            {/* Payment Token Button */}
            <motion.button
              onClick={() => onMint(tierNumber, 'payment')}
              disabled={isLoading}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 px-6 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${getTierColor(tierNumber)} text-white hover:shadow-lg ${getTierGlow(tierNumber)}`
                }`}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                    />
                    Minting...
                  </>
                ) : (
                  `Mint with Payment Token`
                )}
              </span>
            </motion.button>

            {/* Another Payment Token Button */}
            <motion.button
              onClick={() => onMint(tierNumber, 'another')}
              disabled={isLoading}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 px-6 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${getTierColor(tierNumber)} text-white hover:shadow-lg ${getTierGlow(tierNumber)}`
                }`}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                    />
                    Minting...
                  </>
                ) : (
                  `Mint with Another Token`
                )}
              </span>
            </motion.button>
          </motion.div>

          {/* Tier Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute top-4 right-4"
          >
            <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getTierColor(tierNumber)} text-white shadow-lg`}>
              Tier {tierNumber + 1}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MintingTier; 
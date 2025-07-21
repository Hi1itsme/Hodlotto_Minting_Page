import React from 'react';
import { motion } from 'framer-motion';
import { Tier } from '../types';
import EarthBackground from './SpacemanBackground';

interface NFTShowcaseProps {
    tiers: Tier[];
    onEnterMinting: () => void;
    onSelectNFT: (tierId: number) => void;
}

const NFTShowcase: React.FC<NFTShowcaseProps> = ({ tiers, onEnterMinting, onSelectNFT }) => {
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

    const handleNFTClick = (tierId: number) => {
        onSelectNFT(tierId);
        onEnterMinting();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    {/* Spectacular Title Container */}
                    <div className="relative">
                        {/* Animated Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-3xl animate-pulse" />

                        {/* Floating Particles Around Title */}
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-white/60 rounded-full"
                                    style={{
                                        left: `${20 + (i * 60)}%`,
                                        top: `${30 + (i % 3) * 20}%`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.3, 1, 0.3],
                                        scale: [0.5, 1.5, 0.5],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Main Title */}
                        <motion.h1
                            className="text-7xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent relative z-10 mb-4"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{
                                backgroundSize: '200% 200%',
                                textShadow: '0 0 30px rgba(147, 51, 234, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), 0 0 90px rgba(59, 130, 246, 0.2)',
                            }}
                        >
                            Cosmic NFT Collection
                        </motion.h1>

                        {/* Animated Underline */}
                        <motion.div
                            className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full mx-auto mb-4"
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            style={{
                                boxShadow: '0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)',
                            }}
                        />

                        {/* Cosmic Subtitle */}
                        <motion.p
                            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                                Explore the mystical planets
                            </span>
                            {' '}of our solar system through unique NFT tiers with{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                                cosmic powers
                            </span>
                        </motion.p>

                        {/* Animated Stars */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute text-yellow-300 text-2xl"
                                    style={{
                                        left: `${10 + (i * 10)}%`,
                                        top: `${20 + (i % 2) * 30}%`,
                                    }}
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [0.5, 1.2, 0.5],
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 4 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                    }}
                                >
                                    ⭐
                                </motion.div>
                            ))}
                        </div>

                        {/* Cosmic Energy Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                                    style={{
                                        left: `${15 + (i * 12)}%`,
                                        top: `${25 + (i % 3) * 15}%`,
                                        width: '60px',
                                    }}
                                    animate={{
                                        scaleX: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.4,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Giant SpacemanBackground encompassing all NFTs */}
                <EarthBackground className="rounded-3xl p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                    {/* NFT Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                className="group cursor-pointer"
                                onClick={() => handleNFTClick(tier.id)}
                            >
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Planet Icon */}
                                        <div className="flex justify-center mb-4">
                                            <motion.img
                                                src={planetIcons[tier.id - 1] || planetIcons[0]}
                                                alt={`Planet ${tier.id}`}
                                                className="w-20 h-20 object-contain"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.8 }}
                                            />
                                        </div>

                                        {/* Tier Info */}
                                        <div className="text-center">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {tier.name}
                                            </h3>
                                            <p className="text-white/70 mb-4">
                                                Weight: {tier.weight} | Base Price: {tier.basePrice}
                                            </p>

                                            {/* Tier Badge */}
                                            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-sm mb-4">
                                                Tier {tier.id}
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent rounded-3xl flex items-center justify-center"
                                        >
                                            <div className="text-center">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileHover={{ scale: 1 }}
                                                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4"
                                                >
                                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </motion.div>
                                                <p className="text-white font-semibold">View NFT Details</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Enter Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <motion.button
                            onClick={onEnterMinting}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                        >
                            Enter Minting Experience
                        </motion.button>
                    </motion.div>
                </EarthBackground>
            </div>
        </div>
    );
};

export default NFTShowcase; 
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MintingPage from './components/MintingPage';
import NFTShowcase from './components/NFTShowcase';
import EarthBackground from './components/SpacemanBackground';
import { HoleBackground } from './components/animate-ui/backgrounds/hole';
import { Tier } from './types';

function App() {
  const [isShowcase, setIsShowcase] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for NFT tiers
  const tiers: Tier[] = [
    { id: 1, name: "Mercury", weight: 1, basePrice: 0.01, paymentPrice: 0.015, anotherPrice: 0.02 },
    { id: 2, name: "Venus", weight: 2, basePrice: 0.02, paymentPrice: 0.03, anotherPrice: 0.04 },
    { id: 3, name: "Earth", weight: 3, basePrice: 0.03, paymentPrice: 0.045, anotherPrice: 0.06 },
    { id: 4, name: "Mars", weight: 4, basePrice: 0.04, paymentPrice: 0.06, anotherPrice: 0.08 },
    { id: 5, name: "Jupiter", weight: 5, basePrice: 0.05, paymentPrice: 0.075, anotherPrice: 0.1 },
    { id: 6, name: "Saturn", weight: 6, basePrice: 0.06, paymentPrice: 0.09, anotherPrice: 0.12 },
    { id: 7, name: "Uranus", weight: 7, basePrice: 0.07, paymentPrice: 0.105, anotherPrice: 0.14 },
    { id: 8, name: "Neptune", weight: 8, basePrice: 0.08, paymentPrice: 0.12, anotherPrice: 0.16 },
    { id: 9, name: "Pluto", weight: 9, basePrice: 0.09, paymentPrice: 0.135, anotherPrice: 0.18 },
    { id: 10, name: "Moon", weight: 10, basePrice: 0.1, paymentPrice: 0.15, anotherPrice: 0.2 }
  ];

  // Mock contract data
  const contractData = {
    totalSupply: 1000,
    maxSupply: 10000,
    mintPrice: 0.01,
    isPaused: false
  };

  // Mock lotto entries
  const lottoEntries = [
    { id: 1, address: "0x1234...5678", amount: 5, timestamp: Date.now() },
    { id: 2, address: "0x8765...4321", amount: 3, timestamp: Date.now() - 3600000 },
    { id: 3, address: "0xabcd...efgh", amount: 7, timestamp: Date.now() - 7200000 }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % tiers.length);
  }, [tiers.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + tiers.length) % tiers.length);
  }, [tiers.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleEnterMinting = () => {
    setIsShowcase(false);
  };

  const handleBackToShowcase = () => {
    setIsShowcase(true);
  };

  const handleSelectNFT = (tierId: number) => {
    setSelectedNFT(tierId);
    setCurrentIndex(tierId - 1); // Set carousel to the selected NFT
  };

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, prevSlide, nextSlide]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">Loading Cosmic Experience...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isShowcase ? (
        <motion.div
          key="showcase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NFTShowcase tiers={tiers} onEnterMinting={handleEnterMinting} onSelectNFT={handleSelectNFT} />
        </motion.div>
      ) : (
        <motion.div
          key="minting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HoleBackground
            strokeColor="#ffffff"
            numberOfLines={60}
            numberOfDiscs={60}
            particleRGBColor={[255, 255, 255]}
            className="min-h-screen"
          >
            <div className="relative z-10 container mx-auto px-4 py-8">
              {/* Back to Showcase Button */}
              <motion.button
                onClick={handleBackToShowcase}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Showcase
              </motion.button>

              {/* Main Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <EarthBackground className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                  {/* Animated background glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse" />

                  {/* Floating particles inside card */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 4 + Math.random() * 3,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 animate-pulse opacity-30" />

                  {/* Glass reflection effect */}
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                      transform: 'rotate(45deg)',
                    }}
                  />

                  {/* Content with proper z-index */}
                  <div className="relative z-10 p-8">
                    {/* Header Section */}
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-center mb-8"
                    >
                      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        Cosmic Lottery System
                      </h1>
                      <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse" />
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-2">Total Supply</h3>
                        <p className="text-3xl font-bold text-purple-400">{contractData.totalSupply.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-2">Max Supply</h3>
                        <p className="text-3xl font-bold text-pink-400">{contractData.maxSupply.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-2">Mint Price</h3>
                        <p className="text-3xl font-bold text-blue-400">{contractData.mintPrice} ETH</p>
                      </div>
                    </motion.div>

                    {/* Horizontal Carousel */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="relative"
                    >
                      {/* Navigation Arrows */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Carousel Container */}
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                          {tiers.map((tier) => (
                            <div key={tier.id} className="w-full flex-shrink-0 px-4">
                              <MintingPage
                                tier={tier}
                                contractData={contractData}
                                lottoEntries={lottoEntries}
                                onMint={() => console.log('Minting...')}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dot Indicators */}
                      <div className="flex justify-center mt-6 space-x-2">
                        {tiers.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                              : 'bg-white/30 hover:bg-white/50'
                              }`}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="text-center mt-8 pt-8 border-t border-white/20"
                    >
                      <p className="text-white/70">
                        Experience the magic of cosmic NFT minting
                      </p>
                    </motion.div>
                  </div>
                </EarthBackground>
              </motion.div>
            </div>
          </HoleBackground>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App; 
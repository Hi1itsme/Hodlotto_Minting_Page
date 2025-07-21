import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import MintingPage from './components/MintingPage';
import EarthBackground from './components/SpacemanBackground';
import { HoleBackground } from './components/animate-ui/backgrounds/hole';
import { Tier } from './types';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedNFT, setSelectedNFT] = useState(0);

  // Mock data for NFT tiers (now includes Moon)
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
    mintPrice: 0.1,
    isPaused: false
  };

  // Mock lottery entries
  const lottoEntries = [
    { id: 1, address: "0x1234...5678", amount: 5, timestamp: Date.now() - 120000 },
    { id: 2, address: "0x8765...4321", amount: 3, timestamp: Date.now() - 180000 },
    { id: 3, address: "0xabcd...efgh", amount: 7, timestamp: Date.now() - 240000 }
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Cosmic NFT Collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Main Layout */}
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-48 bg-black/20 backdrop-blur-xl border-r border-white/10 hidden md:block">
          <div className="p-4">
            {/* Logo */}
            <div className="mb-6">
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cosmic NFT
              </h1>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">MARKETPLACE</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm ${activeSection === 'dashboard'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveSection('market')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm ${activeSection === 'market'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Market
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">PROFILE</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm text-white/70 hover:text-white hover:bg-white/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Wallet
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm text-white/70 hover:text-white hover:bg-white/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    My NFTs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="h-12 bg-black/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <svg className="w-4 h-4 absolute left-3 top-2.5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <div className="text-right hidden sm:block">
                <p className="text-white font-medium text-sm">Jem Patel</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex min-h-0">
            {/* NFT Gallery */}
            <div className="flex-1 p-4 overflow-y-auto">
              <HoleBackground strokeColor="#ffffff" numberOfLines={60} numberOfDiscs={60} particleRGBColor={[255, 255, 255]} className="h-full">
                <div className="relative z-10 h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Cosmic NFT Collection
                    </h1>
                    <p className="text-white/70 text-base">Discover celestial NFTs</p>
                  </div>

                  {/* NFT Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {tiers.map((tier, index) => (
                      <motion.div
                        key={tier.id}
                        onClick={() => setSelectedNFT(index)}
                        className={`bg-gray-800 rounded-xl p-4 border border-gray-600 cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:scale-105 ${selectedNFT === index ? 'ring-2 ring-purple-500 bg-gray-700' : ''
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* NFT Image Placeholder */}
                        <div className="w-full h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2`}></div>
                            <p className="text-white font-semibold text-sm">{tier.name}</p>
                          </div>
                        </div>

                        {/* NFT Info */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Price</span>
                            <span className="text-white font-semibold">{tier.basePrice} ETH</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Weight</span>
                            <span className="text-white">{tier.weight}</span>
                          </div>
                          <button className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-semibold hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
                            Mint
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </HoleBackground>
            </div>

            {/* Right Sidebar - Selected NFT Details with Earth Background */}
            <div className="w-80 hidden lg:block">
              <EarthBackground className="h-full">
                <div className="relative z-10 h-full p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Selected NFT</h3>

                    {selectedNFT !== null && (
                      <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
                        {/* NFT Image */}
                        <div className="w-full h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2"></div>
                            <p className="text-white font-semibold text-lg">{tiers[selectedNFT].name}</p>
                            <p className="text-white/70 text-sm">Cosmic Collection</p>
                          </div>
                        </div>

                        {/* NFT Details */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Base Price</span>
                            <span className="text-white font-semibold">{tiers[selectedNFT].basePrice} ETH</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Payment Price</span>
                            <span className="text-white font-semibold">{tiers[selectedNFT].paymentPrice} ETH</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Weight</span>
                            <span className="text-white">{tiers[selectedNFT].weight}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Rarity</span>
                            <span className="text-white">{tiers[selectedNFT].weight > 5 ? 'Rare' : 'Common'}</span>
                          </div>

                          {/* Mint Button */}
                          <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-base font-semibold hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
                            Mint NFT
                          </button>

                          {/* Stats */}
                          <div className="pt-4 border-t border-gray-600">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="text-center">
                                <p className="text-white/70">Total Supply</p>
                                <p className="text-white font-semibold">{contractData.totalSupply}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-white/70">Max Supply</p>
                                <p className="text-white font-semibold">{contractData.maxSupply}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </EarthBackground>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 
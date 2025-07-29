import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import MintingPage from './components/MintingPage';
import EarthBackground from './components/SpacemanBackground';
import { HoleBackground } from './components/animate-ui/backgrounds/hole';
import BasicThreeScene from './components/BasicThreeScene';
import EarthParticleSystem from './components/EarthParticleSystem';
import ThreeDEarth from './components/ThreeDEarth';
import { Tier } from './types';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedNFT, setSelectedNFT] = useState(0);

  // Updated NFT tiers with planet themes and lottery system data (Original icons)
  const tiers: Tier[] = [
    { id: 0, name: "Mercury", weight: 1, basePrice: 0.01, paymentPrice: 0.015, anotherPrice: 0.02, icon: "/Mercury_icon.png" },
    { id: 1, name: "Venus", weight: 2, basePrice: 0.02, paymentPrice: 0.03, anotherPrice: 0.04, icon: "/Venus_icon.png" },
    { id: 2, name: "Earth", weight: 4, basePrice: 0.04, paymentPrice: 0.06, anotherPrice: 0.08, icon: "/Earth_Icon.png" },
    { id: 3, name: "Mars", weight: 8, basePrice: 0.08, paymentPrice: 0.12, anotherPrice: 0.16, icon: "/Mars_Icon.png" },
    { id: 4, name: "Jupiter", weight: 16, basePrice: 0.16, paymentPrice: 0.24, anotherPrice: 0.32, icon: "/Jupiter_Icon.png" },
    { id: 5, name: "Saturn", weight: 32, basePrice: 0.32, paymentPrice: 0.48, anotherPrice: 0.64, icon: "/Saturn Icon.png" },
    { id: 6, name: "Neptune", weight: 64, basePrice: 0.64, paymentPrice: 0.96, anotherPrice: 1.28, icon: "/Neptune_Icon.png" },
    { id: 7, name: "Uranus", weight: 128, basePrice: 1.28, paymentPrice: 1.92, anotherPrice: 2.56, icon: "/Uranus_Icon.png" },
    { id: 8, name: "Pluto", weight: 256, basePrice: 2.56, paymentPrice: 3.84, anotherPrice: 5.12, icon: "/Pluto_Icon.png" },
    { id: 9, name: "Moon", weight: 512, basePrice: 5.12, paymentPrice: 7.68, anotherPrice: 10.24, icon: "/Moon_Icon.png" }
  ];

  // Mock contract data
  const contractData = {
    totalSupply: 1000,
    maxSupply: 10000,
    mintPrice: 0.1,
    isPaused: false,
    totalCumulativeWeight: 1023, // Sum of all tier weights
    lotteryEntries: 1500
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
          <p className="text-white text-lg">Loading NFT Lottery System...</p>
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
                NFT Lottery
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
                  <button
                    onClick={() => setActiveSection('demo')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm ${activeSection === 'demo'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Three.js Demo
                  </button>
                  <button
                    onClick={() => setActiveSection('earth')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm ${activeSection === 'earth'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Earth Particles
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
                <p className="text-white font-medium text-sm">Nikhil Prakash</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex min-h-0">
            {activeSection === 'demo' ? (
              <>
                {/* Three.js Demo Section */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="h-full">
                    {/* Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Three.js Demo Scene
                      </h1>
                      <p className="text-white/70 text-base">Basic Three.js scene with camera, renderer, orbit controls, and lighting</p>
                    </div>

                    {/* Three.js Scene */}
                    <div className="bg-gray-900 rounded-xl border border-gray-600 overflow-hidden">
                      <BasicThreeScene className="w-full h-96" />
                    </div>

                    {/* Scene Info */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-white font-semibold mb-2">Camera</h3>
                        <p className="text-white/70 text-sm">Perspective camera with orbit controls for interactive viewing</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-white font-semibold mb-2">Lighting</h3>
                        <p className="text-white/70 text-sm">Ambient light for overall illumination and point light for shadows</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-white font-semibold mb-2">Renderer</h3>
                        <p className="text-white/70 text-sm">WebGL renderer with antialiasing and shadow mapping enabled</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : activeSection === 'earth' ? (
              <>
                {/* Earth Particle System Section */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="h-full">
                    {/* Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Earth Particle System
                      </h1>
                      <p className="text-white/70 text-base">100,000 particles positioned on a sphere with Earth texture sampling</p>
                    </div>

                    {/* Earth Particle Scene */}
                    <div className="bg-gray-900 rounded-xl border border-gray-600 overflow-hidden">
                      <EarthParticleSystem className="w-full h-96" />
                    </div>

                    {/* Particle System Info */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-white font-semibold mb-2">Particles</h3>
                        <p className="text-white/70 text-sm">100,000 particles positioned on sphere surface using spherical coordinates</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-white font-semibold mb-2">Texture Sampling</h3>
                        <p className="text-white/70 text-sm">UV coordinates computed from spherical coordinates to sample Earth texture</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-white font-semibold mb-2">Buffer Geometry</h3>
                        <p className="text-white/70 text-sm">Efficient BufferGeometry with position, color, and size attributes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* NFT Gallery with 3D Earth Background */}
                <div className="flex-1 relative">
                  <ThreeDEarth className="absolute inset-0">
                    <div className="absolute inset-0 z-10 p-4 overflow-y-auto">
                      {/* Header */}
                      <div className="mb-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                          NFT Lottery System
                        </h1>
                        <p className="text-white/70 text-base">Mint NFTs and enter the weighted lottery</p>
                      </div>

                      {/* NFT Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {tiers.map((tier, index) => (
                          <motion.div
                            key={tier.id}
                            onClick={() => setSelectedNFT(index)}
                            className={`bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50 cursor-pointer transition-all duration-200 hover:bg-gray-700/90 hover:scale-105 ${selectedNFT === index ? 'ring-2 ring-purple-500 bg-gray-700/90' : ''
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {/* Planet Icon */}
                            <div className="w-full h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-3 flex items-center justify-center">
                              <div className="text-center">
                                <img
                                  src={tier.icon}
                                  alt={tier.name}
                                  className="w-12 h-12 mx-auto mb-2 object-contain"
                                  onError={(e) => {
                                    // Fallback to a colored circle if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                                <div className={`w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 hidden`}></div>
                                <p className="text-white font-semibold text-sm">{tier.name}</p>
                              </div>
                            </div>

                            {/* NFT Info */}
                            <div className="space-y-2">
                              {/* Lottery Weight */}
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Lottery Weight</span>
                                <span className="text-white font-semibold">{tier.weight}x</span>
                              </div>

                              {/* Pricing Options */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-white/70">ETH</span>
                                  <span className="text-white">{tier.basePrice}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-white/70">Token 1</span>
                                  <span className="text-white">{tier.paymentPrice}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-white/70">Token 2</span>
                                  <span className="text-white">{tier.anotherPrice}</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="space-y-2">
                                <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-base font-semibold hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
                                  Mint NFT
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </ThreeDEarth>
                </div>

                {/* Right Sidebar - Selected NFT Details */}
                <div className="w-80 hidden lg:block bg-gray-900/80 backdrop-blur-xl border-l border-white/10">
                  <div className="h-full p-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Selected NFT</h3>

                      {selectedNFT !== null && (
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
                          {/* Planet Icon */}
                          <div className="w-full h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                            <div className="text-center">
                              <img
                                src={tiers[selectedNFT].icon}
                                alt={tiers[selectedNFT].name}
                                className="w-16 h-16 mx-auto mb-2 object-contain"
                                onError={(e) => {
                                  // Fallback to a colored circle if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 hidden"></div>
                              <p className="text-white font-semibold text-lg">{tiers[selectedNFT].name}</p>
                              <p className="text-white/70 text-sm">Planet NFT Collection</p>
                            </div>
                          </div>

                          {/* NFT Details */}
                          <div className="space-y-3">
                            {/* Lottery Weight */}
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Lottery Weight</span>
                              <span className="text-white font-semibold">{tiers[selectedNFT].weight}x</span>
                            </div>

                            {/* Pricing Options */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">ETH Price</span>
                                <span className="text-white font-semibold">{tiers[selectedNFT].basePrice} ETH</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Token 1 Price</span>
                                <span className="text-white font-semibold">{tiers[selectedNFT].paymentPrice}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Token 2 Price</span>
                                <span className="text-white font-semibold">{tiers[selectedNFT].anotherPrice}</span>
                              </div>
                            </div>

                            {/* NFT Properties */}
                            <div className="pt-2 border-t border-gray-600">
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="text-center">
                                  <p className="text-white/70">Soulbound</p>
                                  <p className="text-white">Yes</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-white/70">Burnable</p>
                                  <p className="text-white">Yes</p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-base font-semibold hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
                                Mint NFT
                              </button>
                            </div>

                            {/* Lottery Stats */}
                            <div className="pt-4 border-t border-gray-600">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center">
                                  <p className="text-white/70">Total Weight</p>
                                  <p className="text-white font-semibold">{contractData.totalCumulativeWeight}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-white/70">Entries</p>
                                  <p className="text-white font-semibold">{contractData.lotteryEntries}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 
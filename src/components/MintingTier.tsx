import React from 'react';
import { motion } from 'framer-motion';
import { MintingTierProps } from '../types';

// Planet SVG icons
const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    {/* Colored circle background */}
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
  </svg>
);

const MercuryIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
    <circle cx="8" cy="8" r="1" opacity="0.7"/>
    <circle cx="16" cy="10" r="0.8" opacity="0.6"/>
  </svg>
);

const VenusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const EarthIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const MarsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
    <circle cx="12" cy="12" r="1.5"/>
    <circle cx="9" cy="9" r="0.8" opacity="0.7"/>
    <circle cx="15" cy="10" r="1" opacity="0.6"/>
  </svg>
);

const JupiterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <ellipse cx="12" cy="12" rx="10" ry="8" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
    <ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

const SaturnIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8"/>
    <ellipse cx="12" cy="12" rx="12" ry="3" fill="none" stroke="currentColor" strokeWidth="1"/>
    <ellipse cx="12" cy="12" rx="10" ry="2" fill="none" stroke="currentColor" strokeWidth="0.5"/>
  </svg>
);

const UranusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <ellipse cx="12" cy="12" rx="12" ry="2" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(90 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(90 12 12)"/>
  </svg>
);

const NeptuneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <ellipse cx="12" cy="12" rx="10" ry="6" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
    <ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

const PlutoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.3"/>
    <circle cx="12" cy="12" r="1.5"/>
  </svg>
);

const StarIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const MoonSilhouette = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={className} style={style}>
    <img 
      src="/moon-svg.svg" 
      alt="Moon silhouette" 
      className="w-full h-full object-contain"
      style={{
        filter: 'brightness(1.3) contrast(1.2)',
        opacity: 0.95
      }}
    />
  </div>
);

const MintingTier: React.FC<MintingTierProps> = ({ 
  tierNumber, 
  tier, 
  onMint, 
  isLoading 
}) => {
  const getCelestialBody = (tier: number) => {
    const bodies = [
      { name: 'Moon', type: 'satellite', description: 'Earth\'s natural satellite' },
      { name: 'Mercury', type: 'planet', description: 'Smallest planet, closest to Sun' },
      { name: 'Venus', type: 'planet', description: 'Earth\'s twin, hottest planet' },
      { name: 'Earth', type: 'planet', description: 'Our home, the blue planet' },
      { name: 'Mars', type: 'planet', description: 'Red planet, future home' },
      { name: 'Jupiter', type: 'gas-giant', description: 'Largest planet, gas giant' },
      { name: 'Saturn', type: 'ringed', description: 'Ringed planet, most beautiful' },
      { name: 'Uranus', type: 'ice-giant', description: 'Ice giant, tilted on its side' },
      { name: 'Neptune', type: 'ice-giant', description: 'Blue giant, windiest planet' },
      { name: 'Pluto', type: 'dwarf', description: 'Dwarf planet, mysterious world' }
    ];
    return bodies[tier] || bodies[0];
  };

  const getTierIcon = (tier: number) => {
    switch (tier) {
      case 0: return <MoonIcon className="w-8 h-8" />;
      case 1: return <MercuryIcon className="w-8 h-8" />;
      case 2: return <VenusIcon className="w-8 h-8" />;
      case 3: return <EarthIcon className="w-8 h-8" />;
      case 4: return <MarsIcon className="w-8 h-8" />;
      case 5: return <JupiterIcon className="w-8 h-8" />;
      case 6: return <SaturnIcon className="w-8 h-8" />;
      case 7: return <UranusIcon className="w-8 h-8" />;
      case 8: return <NeptuneIcon className="w-8 h-8" />;
      case 9: return <PlutoIcon className="w-8 h-8" />;
      default: return <MoonIcon className="w-8 h-8" />;
    }
  };

  const getTierRarity = (tier: number) => {
    if (tier === 0) return 'Satellite';
    if (tier <= 4) return 'Terrestrial';
    if (tier <= 6) return 'Gas Giant';
    if (tier <= 8) return 'Ice Giant';
    return 'Dwarf Planet';
  };

  const getPlanetColors = (tier: number) => {
    const colors = [
      { primary: '#9CA3AF', secondary: '#6B7280', accent: '#374151' }, // Moon - Gray
      { primary: '#F59E0B', secondary: '#D97706', accent: '#B45309' }, // Mercury - Orange
      { primary: '#EAB308', secondary: '#CA8A04', accent: '#A16207' }, // Venus - Yellow
      { primary: '#3B82F6', secondary: '#2563EB', accent: '#1D4ED8' }, // Earth - Blue
      { primary: '#EF4444', secondary: '#DC2626', accent: '#B91C1C' }, // Mars - Red
      { primary: '#F59E0B', secondary: '#D97706', accent: '#B45309' }, // Jupiter - Amber
      { primary: '#FCD34D', secondary: '#F59E0B', accent: '#D97706' }, // Saturn - Gold
      { primary: '#06B6D4', secondary: '#0891B2', accent: '#0E7490' }, // Uranus - Cyan
      { primary: '#3B82F6', secondary: '#2563EB', accent: '#1D4ED8' }, // Neptune - Blue
      { primary: '#A855F7', secondary: '#9333EA', accent: '#7C3AED' }, // Pluto - Purple
    ];
    return colors[tier] || colors[0];
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice === 0) return 'Free';
    if (numPrice < 0.001) return `${numPrice.toFixed(6)} ETH`;
    if (numPrice < 1) return `${numPrice.toFixed(4)} ETH`;
    return `${numPrice.toFixed(2)} ETH`;
  };

  const formatTokenPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice === 0) return 'Free';
    if (numPrice < 1) return `${numPrice.toFixed(1)} tokens`;
    return `${numPrice.toFixed(0)} tokens`;
  };

  const formatWeight = (weight: string) => {
    const numWeight = parseInt(weight);
    return numWeight.toString();
  };

  const celestialBody = getCelestialBody(tierNumber);
  const planetColors = getPlanetColors(tierNumber);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: tierNumber * 0.1 }}
      className="tier-card group relative overflow-hidden"
      style={{
        borderColor: planetColors.primary,
        background: `linear-gradient(135deg, 
          ${planetColors.primary}10, 
          ${planetColors.secondary}05)`
      }}
    >
      {/* Planet-themed background glow */}
      <div className="absolute inset-0 opacity-20"
           style={{
             background: `radial-gradient(circle at 30% 30%, ${planetColors.primary}30, transparent 70%)`
           }}>
      </div>
      
      {/* Tier Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-full shadow-lg"
               style={{
                 background: `linear-gradient(135deg, ${planetColors.primary}, ${planetColors.secondary})`
               }}>
            {getTierIcon(tierNumber)}
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-xl font-bold text-white">{celestialBody.name}</h3>
            <p className="text-sm text-gray-300">{getTierRarity(tierNumber)}</p>
          </div>
        </div>
        <div className="text-right flex flex-col space-y-1">
          <div className="text-2xl font-bold text-white">
            {formatWeight(tier.weight)}
          </div>
          <div className="text-xs text-gray-400">Gravity</div>
        </div>
      </div>

      {/* Planet Description */}
      <div className="bg-white/5 rounded-lg p-4 mb-8 border border-white/10"
           style={{ borderColor: `${planetColors.primary}30` }}>
        <p className="text-sm text-gray-300 leading-relaxed">{celestialBody.description}</p>
      </div>

      {/* Price Information */}
      <div className="space-y-4 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20"
             style={{ borderColor: `${planetColors.primary}40` }}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Stellar Credits</span>
            <span className="font-semibold text-white">
              {formatPrice(tier.priceInBaseToken)}
            </span>
          </div>
        </div>
        
        {parseFloat(tier.priceInPaymentToken) > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20"
               style={{ borderColor: `${planetColors.secondary}40` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Cosmic Tokens</span>
              <span className="font-semibold text-white">
                {formatTokenPrice(tier.priceInPaymentToken)}
              </span>
            </div>
          </div>
        )}
        
        {parseFloat(tier.priceInAnotherPaymentToken) > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20"
               style={{ borderColor: `${planetColors.accent}40` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Nebula Coins</span>
              <span className="font-semibold text-white">
                {formatTokenPrice(tier.priceInAnotherPaymentToken)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Minting Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => onMint(tierNumber, 'base')}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            background: `linear-gradient(135deg, ${planetColors.primary}, ${planetColors.secondary})`
          }}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <StarIcon className="w-5 h-5" style={{ color: planetColors.primary }} />
              <span>{parseFloat(tier.priceInBaseToken) === 0 ? 'Claim Free' : 'Mint with Credits'}</span>
            </>
          )}
        </button>

        {parseFloat(tier.priceInPaymentToken) > 0 && (
          <button
            onClick={() => onMint(tierNumber, 'payment')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{
              background: `linear-gradient(135deg, ${planetColors.secondary}, ${planetColors.accent})`
            }}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {getTierIcon(tierNumber)}
                <span>Mint with Tokens</span>
              </>
            )}
          </button>
        )}

        {parseFloat(tier.priceInAnotherPaymentToken) > 0 && (
          <button
            onClick={() => onMint(tierNumber, 'another')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{
              background: `linear-gradient(135deg, ${planetColors.accent}, ${planetColors.primary})`
            }}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" />
                <span>Mint with Coins</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-white/10"
           style={{ borderColor: `${planetColors.primary}30` }}>
        <div className="text-center space-y-3">
          <p className="text-xs text-gray-400">
            Orbital Weight: {formatWeight(tier.weight)}
          </p>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: Math.min(Math.floor(tierNumber / 2) + 1, 5) }).map((_, i) => (
              <StarIcon key={i} className="w-4 h-4" style={{ color: planetColors.primary }} />
            ))}
          </div>
          <p className="text-xs text-gray-500"
             style={{ color: `${planetColors.primary}80` }}>
            {tierNumber === 0 ? 'Lunar Odds' : 
             tierNumber <= 4 ? 'Terrestrial Odds' : 
             tierNumber <= 6 ? 'Gas Giant Odds' : 
             tierNumber <= 8 ? 'Ice Giant Odds' : 'Dwarf Planet Odds'}
          </p>
        </div>
      </div>

      {/* Cosmic particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cosmic-particle" 
             style={{ 
               top: '5%', 
               right: '8%', 
               width: '4px', 
               height: '4px', 
               animationDelay: '0s',
               background: `radial-gradient(circle, ${planetColors.primary}80 0%, ${planetColors.primary}20 70%, transparent 100%)`
             }}></div>
        <div className="cosmic-particle" 
             style={{ 
               bottom: '15%', 
               left: '12%', 
               width: '2px', 
               height: '2px', 
               animationDelay: '1s',
               background: `radial-gradient(circle, ${planetColors.secondary}80 0%, ${planetColors.secondary}20 70%, transparent 100%)`
             }}></div>
        <div className="cosmic-particle" 
             style={{ 
               top: '50%', 
               right: '15%', 
               width: '3px', 
               height: '3px', 
               animationDelay: '2s',
               background: `radial-gradient(circle, ${planetColors.accent}80 0%, ${planetColors.accent}20 70%, transparent 100%)`
             }}></div>
      </div>

      {/* Moon Silhouette - Only for Moon tier */}
      {tierNumber === 0 && (
        <div className="absolute top-0 right-4 opacity-50 pointer-events-none" style={{ height: '280px' }}>
          <MoonSilhouette className="w-full h-full" style={{ color: planetColors.primary }} />
        </div>
      )}
    </motion.div>
  );
};

export default MintingTier; 
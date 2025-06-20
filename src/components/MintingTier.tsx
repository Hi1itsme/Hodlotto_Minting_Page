import React from 'react';
import { motion } from 'framer-motion';
import { MintingTierProps } from '../types';

// Inline SVG icons to avoid import issues
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CurrencyDollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8 12.967 17.256a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2 11.033 2.744A1 1 0 0112 2z" clipRule="evenodd" />
  </svg>
);

const FireIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
);

const MintingTier: React.FC<MintingTierProps> = ({ 
  tierNumber, 
  tier, 
  onMint, 
  isLoading 
}) => {
  const getTierColor = (tier: number) => {
    const colors = [
      'from-gray-300 to-gray-500', // Tier 0 - Common
      'from-green-300 to-green-500', // Tier 1 - Common
      'from-blue-300 to-blue-500', // Tier 2 - Common
      'from-purple-300 to-purple-500', // Tier 3 - Rare
      'from-pink-300 to-pink-500', // Tier 4 - Rare
      'from-yellow-300 to-yellow-500', // Tier 5 - Rare
      'from-red-300 to-red-500', // Tier 6 - Epic
      'from-indigo-300 to-indigo-500', // Tier 7 - Epic
      'from-orange-300 to-orange-500', // Tier 8 - Legendary
      'from-emerald-300 to-emerald-500', // Tier 9 - Legendary
    ];
    return colors[tier] || colors[0];
  };

  const getTierIcon = (tier: number) => {
    if (tier <= 2) return <StarIcon className="w-6 h-6" />;
    if (tier <= 5) return <SparklesIcon className="w-6 h-6" />;
    if (tier <= 7) return <FireIcon className="w-6 h-6" />;
    return <CurrencyDollarIcon className="w-6 h-6" />;
  };

  const getTierRarity = (tier: number) => {
    if (tier <= 2) return 'Common';
    if (tier <= 5) return 'Rare';
    if (tier <= 7) return 'Epic';
    return 'Legendary';
  };

  const getTierName = (tier: number) => {
    const names = [
      'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond',
      'Ruby', 'Sapphire', 'Emerald', 'Obsidian', 'Mythic'
    ];
    return names[tier] || `Tier ${tier}`;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: tierNumber * 0.1 }}
      className="tier-card group"
    >
      {/* Tier Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-gradient-to-r ${getTierColor(tierNumber)}`}>
            {getTierIcon(tierNumber)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{getTierName(tierNumber)}</h3>
            <p className="text-sm text-gray-300">{getTierRarity(tierNumber)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {formatWeight(tier.weight)}
          </div>
          <div className="text-xs text-gray-400">Weight</div>
        </div>
      </div>

      {/* Price Information */}
      <div className="space-y-3 mb-6">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Base Token</span>
            <span className="font-semibold text-white">
              {formatPrice(tier.priceInBaseToken)}
            </span>
          </div>
        </div>
        
        {parseFloat(tier.priceInPaymentToken) > 0 && (
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Payment Token</span>
              <span className="font-semibold text-white">
                {formatTokenPrice(tier.priceInPaymentToken)}
              </span>
            </div>
          </div>
        )}
        
        {parseFloat(tier.priceInAnotherPaymentToken) > 0 && (
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Alt Token</span>
              <span className="font-semibold text-white">
                {formatTokenPrice(tier.priceInAnotherPaymentToken)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Minting Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => onMint(tierNumber, 'base')}
          disabled={isLoading}
          className="mint-button w-full flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <CurrencyDollarIcon className="w-5 h-5" />
              <span>{parseFloat(tier.priceInBaseToken) === 0 ? 'Mint Free' : 'Mint with ETH'}</span>
            </>
          )}
        </button>

        {parseFloat(tier.priceInPaymentToken) > 0 && (
          <button
            onClick={() => onMint(tierNumber, 'payment')}
            disabled={isLoading}
            className="mint-button w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Mint with Token</span>
              </>
            )}
          </button>
        )}

        {parseFloat(tier.priceInAnotherPaymentToken) > 0 && (
          <button
            onClick={() => onMint(tierNumber, 'another')}
            disabled={isLoading}
            className="mint-button w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FireIcon className="w-5 h-5" />
                <span>Mint with Alt Token</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Lottery Info */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-2">
            Lottery Weight: {formatWeight(tier.weight)}
          </p>
          <div className="flex justify-center space-x-1">
            {Array.from({ length: Math.min(Math.floor(tierNumber / 2) + 1, 5) }).map((_, i) => (
              <StarIcon key={i} className="w-3 h-3 text-yellow-400" />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {tierNumber <= 2 ? 'Common Odds' : 
             tierNumber <= 5 ? 'Rare Odds' : 
             tierNumber <= 7 ? 'Epic Odds' : 'Legendary Odds'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MintingTier; 
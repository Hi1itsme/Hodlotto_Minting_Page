export interface Tier {
  priceInBaseToken: string;
  priceInPaymentToken: string;
  priceInAnotherPaymentToken: string;
  weight: string;
}

export interface LottoEntry {
  lottoID: string;
  weight: string;
}

export interface ContractData {
  tiers: Tier[];
  paymentToken: string;
  anotherPaymentToken: string;
  totalCumulativeWeight: string;
}

export interface MintingTierProps {
  tierNumber: number;
  tier: Tier;
  onMint: (tierNumber: number, paymentMethod: 'base' | 'payment' | 'another') => void;
  isLoading: boolean;
}

export interface MintingPageProps {
  contractData: ContractData;
  onMint: (tierNumber: number, paymentMethod: 'base' | 'payment' | 'another') => void;
  isLoading: boolean;
} 
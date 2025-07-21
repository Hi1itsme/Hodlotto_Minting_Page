export interface Tier {
  id: number;
  name: string;
  weight: number;
  basePrice: number;
  paymentPrice: number;
  anotherPrice: number;
}

export interface LottoEntry {
  id: number;
  address: string;
  amount: number;
  timestamp: number;
}

export interface ContractData {
  totalSupply: number;
  maxSupply: number;
  mintPrice: number;
  isPaused: boolean;
}

export interface MintingTierProps {
  tierNumber: number;
  tier: Tier;
  onMint: (tierNumber: number, paymentMethod: 'base' | 'payment' | 'another') => void;
  isLoading: boolean;
}

export interface MintingPageProps {
  tier: Tier;
  contractData: ContractData;
  lottoEntries: LottoEntry[];
  onMint: () => void;
} 
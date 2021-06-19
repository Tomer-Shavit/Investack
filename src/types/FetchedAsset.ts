export interface FetchedAsset {
  symbol: string;
  id?: string;
  name?: string;
  price: number;
  change: number;
  amount: number;
  value: number;
  balance: number;
  profitPercentage?: number;
  portfolioPercentage?: number;
  color: string;
}

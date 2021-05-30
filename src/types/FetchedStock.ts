export interface FetchedStock {
  symbol: string;
  name?: string;
  shares: number;
  price: number;
  change: number;
  balance: number;
}

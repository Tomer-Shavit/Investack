import { StocksInput } from "../generated/graphql";

export const stocksToString = (stocks: StocksInput[]) => {
  const newList = stocks.map((stock) => stock.symbol);
  return newList.toString();
};

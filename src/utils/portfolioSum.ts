import { FetchedStock } from "../types/FetchedStock";

export const portfolioSum = (portfolio: Record<string, FetchedStock>) => {
  let sum = 0;
  Object.keys(portfolio).forEach((symbol) => {
    sum += portfolio[symbol].balance;
  });
  return sum;
};

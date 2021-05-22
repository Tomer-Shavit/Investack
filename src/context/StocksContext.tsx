import { createContext, useState } from "react";
import { ALL_STOCKS } from "../constants/Stocks 27-04-21";

interface StocksContextTypes {
  allStocks: Record<string, string>;
}

export const contextDefaultValues: StocksContextTypes = {
  allStocks: ALL_STOCKS,
};

export const StocksContext =
  createContext<StocksContextTypes>(contextDefaultValues);

export const StocksProvider = ({ children }) => {
  const allStocks = ALL_STOCKS;

  return (
    <StocksContext.Provider value={{ allStocks }}>
      {children}
    </StocksContext.Provider>
  );
};

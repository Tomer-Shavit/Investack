import { createContext, useState } from "react";
import { ALL_STOCKS } from "../constants/Stocks 27-04-21";

interface StocksContextTypes {
  allStocks: Record<string, string>;
  addedStocks: Record<string, string>[];
  addToAddedStocks: (stock) => void;
}

export const contextDefaultValues: StocksContextTypes = {
  allStocks: ALL_STOCKS,
  addedStocks: [],
  addToAddedStocks: () => {},
};

export const StocksContext =
  createContext<StocksContextTypes>(contextDefaultValues);

export const StocksProvider = ({ children }) => {
  const [addedStocks, setAddedStocks] = useState<Record<string, string>[]>([]);
  const allStocks = ALL_STOCKS;

  const addToAddedStocks = (stocks) => {
    setAddedStocks((prev) => [...prev, ...stocks]);
  };

  return (
    <StocksContext.Provider
      value={{ allStocks, addedStocks, addToAddedStocks }}
    >
      {children}
    </StocksContext.Provider>
  );
};

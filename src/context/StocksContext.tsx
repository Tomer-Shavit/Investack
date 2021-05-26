import { createContext, useState } from "react";
import { ALL_STOCKS } from "../constants/Stocks 27-04-21";
import { StocksInput } from "../generated/graphql";

interface StocksContextTypes {
  allStocks: Record<string, string>;
  addedStocks: StocksInput[];
  addToAddedStocks: (symbol, shares, pricePerShare) => void;
  stocksValue: number;
  resetAddedStocks: () => void;
}

export const contextDefaultValues: StocksContextTypes = {
  allStocks: ALL_STOCKS,
  addedStocks: [],
  addToAddedStocks: () => {},
  stocksValue: 0,

  resetAddedStocks: () => {},
};

export const StocksContext =
  createContext<StocksContextTypes>(contextDefaultValues);

export const StocksProvider = ({ children }) => {
  const [addedStocks, setAddedStocks] = useState([]);
  const [stocksValue, setStocksValue] = useState(0);
  const allStocks = ALL_STOCKS;

  const resetAddedStocks = () => {
    setAddedStocks([]);
    setStocksValue(0);
  };

  const calcValue = (shares, pricePerShare) => {
    setStocksValue((prev) => prev + shares * pricePerShare);
  };

  const addToAddedStocks = (symbol, shares, pricePerShare) => {
    setAddedStocks((prev) => [...prev, { symbol: symbol, shares: shares }]);
    calcValue(shares, pricePerShare);
  };

  return (
    <StocksContext.Provider
      value={{
        allStocks,
        addedStocks,
        addToAddedStocks,
        stocksValue,
        resetAddedStocks,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

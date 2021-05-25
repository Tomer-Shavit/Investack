import { createContext, useState } from "react";
import { ALL_STOCKS } from "../constants/Stocks 27-04-21";

interface StocksContextTypes {
  allStocks: Record<string, string>;
  addedStocks: {};
  addToAddedStocks: (symbol, shares, pricePerShare) => void;
  stocksValue: number;
  calcValue: (stocks) => void;
  resetAddedStocks: () => void;
}

export const contextDefaultValues: StocksContextTypes = {
  allStocks: ALL_STOCKS,
  addedStocks: [],
  addToAddedStocks: () => {},
  stocksValue: 0,
  calcValue: () => {},
  resetAddedStocks: () => {},
};

export const StocksContext =
  createContext<StocksContextTypes>(contextDefaultValues);

export const StocksProvider = ({ children }) => {
  const [addedStocks, setAddedStocks] = useState({});
  const [stocksValue, setStocksValue] = useState(0);
  const allStocks = ALL_STOCKS;

  const resetAddedStocks = () => {
    setAddedStocks({});
    setStocksValue(0);
  };

  const calcValue = (stocks: {}) => {
    let sum = 0;
    Object.keys(stocks).forEach((key) => {
      sum += stocks[key].shares * stocks[key].pricePerShare;
    });
    setStocksValue(sum);
    return stocksValue;
  };

  const addToAddedStocks = (symbol, shares, pricePerShare) => {
    setAddedStocks((prev) => ({
      ...prev,
      [symbol]: {
        shares,
        pricePerShare,
      },
    }));
  };

  return (
    <StocksContext.Provider
      value={{
        allStocks,
        addedStocks,
        addToAddedStocks,
        stocksValue,
        calcValue,
        resetAddedStocks,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

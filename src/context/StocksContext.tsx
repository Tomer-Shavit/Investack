import { createContext, useState } from "react";
import { COLOR_LIST } from "../constants/colorList";
import { ALL_STOCKS } from "../constants/Stocks 03-06-2021";
import { Stock, StocksInput } from "../generated/graphql";
import { FetchedStock } from "../types/FetchedStock";

interface StocksContextTypes {
  allStocks: Record<string, string>;
  addedStocks: StocksInput[];
  addToAddedStocks: (symbol, shares, pricePerShare) => void;
  stocksValue: number;
  resetAddedStocks: () => void;
  myStocksPortfolio: Record<string, FetchedStock>;
  createStocksPortfolio: (fetchedStocks, dbStocks) => void;
  loadingStocks: boolean;
}

export const contextDefaultValues: StocksContextTypes = {
  allStocks: ALL_STOCKS,
  addedStocks: [],
  addToAddedStocks: () => {},
  stocksValue: 0,
  myStocksPortfolio: {},
  resetAddedStocks: () => {},
  createStocksPortfolio: () => {},
  loadingStocks: true,
};

export const StocksContext =
  createContext<StocksContextTypes>(contextDefaultValues);

export const StocksProvider = ({ children }) => {
  const [addedStocks, setAddedStocks] = useState([]);
  const [stocksValue, setStocksValue] = useState(0);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const [myStocksPortfolio, setMyStocksPortfolio] = useState<
    Record<string, FetchedStock>
  >({});
  const allStocks = ALL_STOCKS;

  const calcValue = (shares, pricePerShare) => {
    setStocksValue((prev) => prev + shares * pricePerShare);
  };

  const createStocksPortfolio = (fetchedStocks, dbStocks: Stock[]) => {
    if (Object.keys(fetchedStocks).length === 0 || dbStocks.length === 0) {
      //doNothing
      return;
    }
    console.log("fetchedStocks: ", fetchedStocks);

    dbStocks.forEach((stock, i) => {
      if (!(stock.symbol in myStocksPortfolio)) {
        setMyStocksPortfolio((myStocksPortfolio) => ({
          ...myStocksPortfolio,
          [stock.symbol]: {
            symbol: stock.symbol,
            name: fetchedStocks[stock.symbol].name,
            shares: stock.shares,
            price: fetchedStocks[stock.symbol].close,
            change: fetchedStocks[stock.symbol].percent_change,
            balance: stock.shares * fetchedStocks[stock.symbol].close,
            color: COLOR_LIST[i],
          },
        }));
        calcValue(stock.shares, fetchedStocks[stock.symbol].close);
      } else {
        setMyStocksPortfolio((myStocksPortfolio) => ({
          ...myStocksPortfolio,
          [stock.symbol]: {
            ...myStocksPortfolio[stock.symbol],
            shares: stock.shares,
            price: fetchedStocks[stock.symbol].close,
            change: fetchedStocks[stock.symbol].percent_change,
            balance: stock.shares * fetchedStocks[stock.symbol].close,
          },
        }));
        calcValue(stock.shares, fetchedStocks[stock.symbol].close);
      }
    });
    setLoadingStocks(!loadingStocks);
  };

  const resetAddedStocks = () => {
    setAddedStocks([]);
    setStocksValue(0);
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
        myStocksPortfolio,
        createStocksPortfolio,
        loadingStocks,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

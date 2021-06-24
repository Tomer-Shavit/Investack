import { createContext, useState } from "react";
import { STOCKS_COLOR_LIST } from "../constants/colorList";
import { ALL_STOCKS } from "../constants/Stocks 05-06-2021";
import { Stock, StocksInput } from "../generated/graphql";
import { FetchedAsset } from "../types/FetchedAsset";
import { calcProfitPercentage } from "../utils/calcProfitPercentage";

interface StocksContextTypes {
  allStocks: Record<string, Record<string, string>>;
  addedStocks: StocksInput[];
  addToAddedStocks: (symbol, amount, pricePerShare) => void;

  stocksValue: number;
  resetAddedStocks: () => void;
  myStocksPortfolio: Record<string, FetchedAsset>;
  createStocksPortfolio: (fetchedStocks, dbStocks, totalValue) => void;
  loadingStocks: boolean;
}

export const contextDefaultValues: StocksContextTypes = {
  allStocks: ALL_STOCKS,
  addedStocks: [],
  addToAddedStocks: () => {},
  stocksValue: 0,
  resetAddedStocks: () => {},
  myStocksPortfolio: {},
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
    Record<string, FetchedAsset>
  >({});
  const allStocks = ALL_STOCKS;

  const calcValue = (amount, pricePerShare) => {
    setStocksValue((prev) => prev + amount * pricePerShare);
  };

  const createStocksPortfolio = (
    fetchedStocks,
    dbStocks: Stock[],
    totalValue: number
  ) => {
    if (Object.keys(fetchedStocks).length === 0 || dbStocks.length === 0) {
      //doNothing
      return;
    }
    setLoadingStocks(true);
    dbStocks.forEach((stock, i) => {
      if (!(stock.symbol in myStocksPortfolio)) {
        setMyStocksPortfolio((myStocksPortfolio) => ({
          ...myStocksPortfolio,
          [stock.symbol]: {
            symbol: stock.symbol,
            name: fetchedStocks[stock.symbol].name,
            amount: stock.amount,
            value: stock.value,
            price: fetchedStocks[stock.symbol].close,
            change: fetchedStocks[stock.symbol].percent_change,
            balance: stock.amount * fetchedStocks[stock.symbol].close,
            profitPercentage: calcProfitPercentage(
              fetchedStocks[stock.symbol].close,
              stock.value,
              stock.amount
            ),
            color: STOCKS_COLOR_LIST[i],
          },
        }));
        calcValue(stock.amount, fetchedStocks[stock.symbol].close);
      } else {
        setMyStocksPortfolio((myStocksPortfolio) => ({
          ...myStocksPortfolio,
          [stock.symbol]: {
            ...myStocksPortfolio[stock.symbol],
            amount: stock.amount,
            price: fetchedStocks[stock.symbol].close,
            value: stock.value,
            change: fetchedStocks[stock.symbol].percent_change,
            profitPercentage: calcProfitPercentage(
              fetchedStocks[stock.symbol].close,
              stock.value,
              stock.amount
            ),
            balance: stock.amount * fetchedStocks[stock.symbol].close,
          },
        }));
        calcValue(stock.amount, fetchedStocks[stock.symbol].close);
      }
    });
    setLoadingStocks(false);
  };

  const resetAddedStocks = () => {
    setAddedStocks([]);
    setStocksValue(0);
  };

  const addToAddedStocks = (symbol, amount, purchasePrice) => {
    setAddedStocks((prev) => [
      ...prev,
      { symbol: symbol, amount: amount, value: amount * purchasePrice },
    ]);
    calcValue(amount, purchasePrice);
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

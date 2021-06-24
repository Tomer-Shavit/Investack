import { createContext, useState } from "react";
import { CRYPTO_COLOR_LIST } from "../constants/colorList";
import { ALL_CRYPTO } from "../constants/Crypto 05-06-2021";
import { CryptoInput } from "../generated/graphql";
import { FetchedAsset } from "../types/FetchedAsset";
import { calcProfitPercentage } from "../utils/calcProfitPercentage";

interface CryptoContextTypes {
  allCrypto: {};
  addedCrypto: CryptoInput[];
  addToAddedCrypto: (symbol, amount, purchasePrice) => void;
  resetAddedCrypto: () => void;
  cryptoValue: number;
  loadingCrypto: boolean;
  myCryptoPortfolio: Record<string, FetchedAsset>;
  createCryptoPortfolio: (fetchedCrypto, dbCrypto, totalValue) => void;
}

const cryptoDefaultValues = {
  allCrypto: {},
  addedCrypto: [],
  addToAddedCrypto: () => {},
  resetAddedCrypto: () => {},
  cryptoValue: 0,
  myCryptoPortfolio: {},
  createCryptoPortfolio: () => {},
  loadingCrypto: true,
};

export const CryptoContext =
  createContext<CryptoContextTypes>(cryptoDefaultValues);

export const CryptoProvider = ({ children }) => {
  const allCrypto = ALL_CRYPTO;
  const [addedCrypto, setAddedCrypto] = useState([]);
  const [cryptoValue, setCryptoValue] = useState(0);
  const [loadingCrypto, setLoadingCrypto] = useState(true);
  const [myCryptoPortfolio, setMyCryptoPortfolio] = useState<
    Record<string, FetchedAsset>
  >({});

  const createCryptoPortfolio = (
    fetchedCrypto,
    dbCrypto: CryptoInput[],
    totalValue
  ) => {
    if (Object.keys(fetchedCrypto).length === 0 || dbCrypto.length === 0) {
      //doNothing
      return;
    }
    setLoadingCrypto(true);
    dbCrypto.forEach((crypto, i) => {
      if (!(crypto.symbol in myCryptoPortfolio)) {
        setMyCryptoPortfolio((myCryptoPortfolio) => ({
          ...myCryptoPortfolio,
          [crypto.symbol]: {
            id: fetchedCrypto[crypto.symbol].id,
            symbol: crypto.symbol,
            name: fetchedCrypto[crypto.symbol].name,
            amount: crypto.amount,
            value: crypto.value,
            price: fetchedCrypto[crypto.symbol].price,
            change: fetchedCrypto[crypto.symbol].change,
            balance: crypto.amount * fetchedCrypto[crypto.symbol].price,
            profitPercentage: calcProfitPercentage(
              fetchedCrypto[crypto.symbol].price,
              crypto.value,
              crypto.amount
            ),
            color: CRYPTO_COLOR_LIST[i],
          },
        }));
        calcValue(crypto.amount, fetchedCrypto[crypto.symbol].price);
      } else {
        setMyCryptoPortfolio((myCryptoPortfolio) => ({
          ...myCryptoPortfolio,
          [crypto.symbol]: {
            ...myCryptoPortfolio[crypto.symbol],
            amount: crypto.amount,
            price: fetchedCrypto[crypto.symbol].price,
            value: crypto.value,
            change: fetchedCrypto[crypto.symbol].change,
            profitPercentage: calcProfitPercentage(
              fetchedCrypto[crypto.symbol].price,
              crypto.value,
              crypto.amount
            ),
            balance: crypto.amount * fetchedCrypto[crypto.symbol].price,
          },
        }));
        calcValue(crypto.amount, fetchedCrypto[crypto.symbol].price);
      }
    });
    setLoadingCrypto(false);
  };

  const calcValue = (amount, purchasePrice) => {
    setCryptoValue((prev) => prev + amount * purchasePrice);
  };

  const resetAddedCrypto = () => {
    setAddedCrypto([]);
    setCryptoValue(0);
  };

  const addToAddedCrypto = (symbol, amount, purchasePrice) => {
    setAddedCrypto((prev) => [
      ...prev,
      { symbol: symbol, amount: amount, value: amount * purchasePrice },
    ]);
    calcValue(amount, purchasePrice);
  };
  return (
    <CryptoContext.Provider
      value={{
        allCrypto,
        addedCrypto,
        addToAddedCrypto,
        resetAddedCrypto,
        cryptoValue,
        loadingCrypto,
        createCryptoPortfolio,
        myCryptoPortfolio,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

import { createContext, useState } from "react";
import { ALL_CRYPTO } from "../constants/Crypto 05-06-2021";
import { CryptoInput } from "../generated/graphql";

interface CryptoContextTypes {
  allCrypto: {};
  addedCrypto: CryptoInput[];
  addToAddedCrypto: (symbol, amount, purchasePrice) => void;
  resetAddedCrypto: () => void;
  cryptoValue: number;
  loadingCrypto: boolean;
}

const cryptoDefaultValues = {
  allCrypto: {},
  addedCrypto: [],
  addToAddedCrypto: () => {},
  resetAddedCrypto: () => {},
  cryptoValue: 0,
  loadingCrypto: true,
};

export const CryptoContext =
  createContext<CryptoContextTypes>(cryptoDefaultValues);

export const CryptoProvider = ({ children }) => {
  const allCrypto = ALL_CRYPTO;
  const [addedCrypto, setAddedCrypto] = useState([]);
  const [cryptoValue, setCryptoValue] = useState(0);
  const [loadingCrypto, setLoadingCrypto] = useState();

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
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

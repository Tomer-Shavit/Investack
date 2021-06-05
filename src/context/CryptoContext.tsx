import { createContext } from "react";
import { ALL_CRYPTO } from "../constants/Crypto 05-06-2021";

interface CryptoContextTypes {
  allCrypto: {};
}

const cryptoDefaultValues = {
  allCrypto: {},
};

export const CryptoContext =
  createContext<CryptoContextTypes>(cryptoDefaultValues);

export const CryptoProvider = ({ children }) => {
  const allCrypto = ALL_CRYPTO;
  return (
    <CryptoContext.Provider value={{ allCrypto }}>
      {children}
    </CryptoContext.Provider>
  );
};

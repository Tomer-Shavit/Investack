import axios from "axios";
import { useContext, useEffect } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import { assetsToString } from "../assetsToString";

export const useFetchCrypto = (data, loading, totalValue) => {
  const { createCryptoPortfolio } = useContext(CryptoContext);
  useEffect(() => {
    const fetchCrypto = async () => {
      if (!loading && data?.me?.user?.portfolio?.crypto) {
        const myCrypto = assetsToString(
          data.me.user.portfolio.crypto,
          "crypto"
        );
        const fetchCrypto = await axios.get(`/api/crypto?myCrypto=${myCrypto}`);
        createCryptoPortfolio(
          fetchCrypto.data,
          data?.me?.user?.portfolio?.crypto,
          totalValue
        );
      }
    };
    fetchCrypto();
  }, [loading]);
};

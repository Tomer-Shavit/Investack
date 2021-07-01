import axios from "axios";
import { useContext, useEffect } from "react";
import { StocksContext } from "../../context/StocksContext";
import { assetsToString } from "../assetsToString";

export const useFetchStocks = (data, loading, totalValue) => {
  const { createStocksPortfolio } = useContext(StocksContext);
  useEffect(() => {
    const fetchStocks = async () => {
      if (!loading && data?.me?.user?.portfolio?.stocks.length > 0) {
        const myStocks = assetsToString(
          data?.me?.user?.portfolio?.stocks,
          "stocks"
        );

        const fetchedStocks = await axios.get(
          `/api/stocks?myStocks=${myStocks}`
        );
        createStocksPortfolio(
          fetchedStocks.data,
          data?.me?.user?.portfolio?.stocks,
          totalValue
        );
      }
    };
    fetchStocks();
  }, [loading]);
};

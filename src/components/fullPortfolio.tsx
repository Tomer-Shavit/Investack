import { Flex, Button } from "@chakra-ui/react";
import router from "next/router";
import React, { useEffect } from "react";
import { useContext } from "react";
import { STOCKS_COLOR_LIST } from "../constants/colorList";
import { CryptoContext } from "../context/CryptoContext";
import { StocksContext } from "../context/StocksContext";
import { useFetchCrypto } from "../utils/hooks/useFetchCrypto";
import { useFetchStocks } from "../utils/hooks/useFetchStocks";
import { AssetsList } from "./AssetsList";
import { DoughNut } from "./doughNut";

interface fullPortfolioProps {
  data: {};
  loading: boolean;
}

export const FullPortfolio: React.FC<fullPortfolioProps> = ({
  data,
  loading,
}) => {
  const { myStocksPortfolio, stocksValue, loadingStocks } =
    useContext(StocksContext);
  const { myCryptoPortfolio, cryptoValue, loadingCrypto } =
    useContext(CryptoContext);
  useFetchStocks(data, loading);
  useFetchCrypto(data, loading, cryptoValue);

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between"
      width="100%"
    >
      <Flex width="85%" marginBottom={3} alignItems="center">
        <Flex flex={1}></Flex>
        <DoughNut
          myPortfolio={{ ...myStocksPortfolio, ...myCryptoPortfolio }}
        ></DoughNut>
        <Flex flex={1} height="100%"></Flex>
      </Flex>
      <AssetsList
        assetsPortfolio={{ ...myStocksPortfolio, ...myCryptoPortfolio }}
        loadingCrypto={loadingCrypto}
        loadingStocks={loadingStocks}
        portfolioValue={stocksValue + cryptoValue}
        width="85%"
      ></AssetsList>
      ;
    </Flex>
  );
};

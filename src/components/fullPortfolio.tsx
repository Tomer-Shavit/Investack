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
  const { myStocksPortfolio, stocksValue, doneLoadingStocks } =
    useContext(StocksContext);
  const { myCryptoPortfolio, cryptoValue, doneLoadingCrypto } =
    useContext(CryptoContext);
  useFetchStocks(data, doneLoadingStocks, stocksValue);
  useFetchCrypto(data, loading, cryptoValue);

  let portfolioType = "both";

  if (doneLoadingCrypto && !Object.keys(myStocksPortfolio).length) {
    portfolioType = "crypto";
  } else if (doneLoadingStocks && !Object.keys(myCryptoPortfolio.length)) {
    portfolioType = "stocks";
  }

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      width="100%"
      paddingTop={0}
      p={5}
    >
      <Flex
        height="380px"
        width="85%"
        alignItems="center"
        justifyContent="flex-end"
        marginBottom={3}
      >
        <Flex flex={1}></Flex>
        <DoughNut
          myPortfolio={{ ...myStocksPortfolio, ...myCryptoPortfolio }}
        ></DoughNut>
        <Flex flex={1} height="100%"></Flex>
      </Flex>
      <AssetsList
        assetsPortfolio={{ ...myStocksPortfolio, ...myCryptoPortfolio }}
        doneLoadingCrypto={doneLoadingCrypto}
        doneLoadingStocks={doneLoadingStocks}
        portfolioValue={stocksValue + cryptoValue}
        width="85%"
        type={portfolioType}
      ></AssetsList>
    </Flex>
  );
};

import { Flex, Button } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useContext } from "react";
import { STOCKS_COLOR_LIST } from "../constants/colorList";
import { CryptoContext } from "../context/CryptoContext";
import { StocksContext } from "../context/StocksContext";
import { AssetsList } from "./AssetsList";
import { DoughNut } from "./doughNut";

interface fullPortfolioProps {}

export const FullPortfolio: React.FC<fullPortfolioProps> = ({}) => {
  const { myStocksPortfolio, stocksValue } = useContext(StocksContext);
  const { myCryptoPortfolio, cryptoValue } = useContext(CryptoContext);
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
          colorList={STOCKS_COLOR_LIST}
        ></DoughNut>
        <Flex flex={1} height="100%">
          <Button
            alignSelf="flex-end"
            onClick={() => router.push("/stocks/add")}
            backgroundColor="accentDark"
            width="6rem"
            color="textDark"
            marginLeft="auto"
          >
            Add Stocks
          </Button>
        </Flex>
      </Flex>
      <AssetsList
        assetsPortfolio={{ ...myStocksPortfolio, ...myCryptoPortfolio }}
        portfolioValue={stocksValue + cryptoValue}
        width="85%"
      ></AssetsList>
      ;
    </Flex>
  );
};

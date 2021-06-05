import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Loader } from "../components/loader/Loader";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import { useMeQuery } from "../generated/graphql";
import axios from "axios";
import { stocksToString } from "../utils/stocksToString";
import { AssetsList } from "../components/AssetsList";
import { StocksContext } from "../context/StocksContext";
import { DoughNut } from "../components/doughNut";

interface StocksProps {}

const stocks: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const { createStocksPortfolio } = useContext(StocksContext);

  let body;

  useEffect(() => {
    const fetchStocks = async () => {
      if (!loading && data?.me?.user?.portfolio?.stocks) {
        console.log(
          "data?.me?.user?.portfolio?.stocks",
          data?.me?.user?.portfolio?.stocks
        );
        const myStocks = stocksToString(data?.me?.user?.portfolio?.stocks);
        console.log("myStocks: ", myStocks);
        const fetchedStocks = await axios.get(
          `/api/stocks?myStocks=${myStocks}`
        );
        createStocksPortfolio(
          fetchedStocks.data,
          data?.me?.user?.portfolio?.stocks
        );
      }
    };
    fetchStocks();
  }, [loading]);

  if (loading) {
    body = <Loader></Loader>;
  } else if (!loading && data?.me?.user?.portfolio?.stocks.length === 0) {
    body = (
      <Flex flexDirection="column" alignItems="center" marginTop="120px">
        <Text color="textDark2" fontSize="lg">
          On this page you can track all of your stocks, click on the button
          below to add stocks to your portfolio.
        </Text>
        <Button
          marginTop={4}
          color="textDark"
          bgColor="accentDark"
          onClick={() => router.push("stocks/add")}
        >
          Add Stocks
        </Button>
      </Flex>
    );
  } else if (!loading && data?.me?.user?.portfolio?.stocks) {
    body = (
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex width="85%" marginTop={3} marginBottom={3} alignItems="center">
          <Flex flex={1}></Flex>
          <DoughNut></DoughNut>
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
        <AssetsList width="85%"></AssetsList>;
      </Flex>
    );
  }
  return (
    <PageLayout>
      <LockedContentContainer>
        <Flex flexDirection="column" p={5}>
          <Heading color="textDark">My Stocks</Heading>
          {body}
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default stocks;

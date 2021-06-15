import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "../components/loader/Loader";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import {
  useAddStocksToPortfolioMutation,
  useMeQuery,
} from "../generated/graphql";
import axios from "axios";
import { assetsToString } from "../utils/assetsToString";
import { AssetsList } from "../components/AssetsList";
import { StocksContext } from "../context/StocksContext";
import { DoughNut } from "../components/doughNut";
import { STOCKS_COLOR_LIST } from "../constants/colorList";

interface StocksProps {}

const stocks: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  const [addStocks] = useAddStocksToPortfolioMutation();
  const { data, loading } = useMeQuery();
  const [editMode, setEditMode] = useState(false);
  const {
    createStocksPortfolio,
    loadingStocks,
    myStocksPortfolio,
    stocksValue,
    addToAddedStocks,
    addedStocks,
    resetAddedStocks,
  } = useContext(StocksContext);

  let body;

  useEffect(() => {
    const fetchStocks = async () => {
      if (!loading && data?.me?.user?.portfolio?.stocks) {
        const myStocks = assetsToString(
          data?.me?.user?.portfolio?.stocks,
          "stocks"
        );
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
  } else if (!loading && loadingStocks) {
    body = <Loader></Loader>;
  } else if (!loading && data?.me?.user?.portfolio?.stocks) {
    body = (
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex width="85%" marginBottom={3} alignItems="center">
          <Flex flex={1}></Flex>
          <DoughNut
            myPortfolio={myStocksPortfolio}
            colorList={STOCKS_COLOR_LIST}
          ></DoughNut>
          <Flex flex={1} height="100%" justifyContent="flex-end">
            <Button
              display={editMode ? "none" : undefined}
              alignSelf="flex-end"
              onClick={() => router.push("/stocks/add")}
              backgroundColor="accentDark"
              color="textDark"
              paddingLeft={2}
              paddingRight={2}
            >
              Add Stocks
            </Button>
            <Button
              display={editMode ? undefined : "none"}
              color="textDark"
              alignSelf="flex-end"
              variant="ghost"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Cancel
            </Button>
            <Button
              alignSelf="flex-end"
              backgroundColor="accentDark"
              color="textDark"
              paddingLeft={2}
              paddingRight={2}
              onClick={async () => {
                if (addedStocks.length > 0 && editMode) {
                  await addStocks({ variables: { stocksInput: addedStocks } });
                  resetAddedStocks();
                  router.reload();
                }
                setEditMode(!editMode);
              }}
              marginLeft="1.5rem"
            >
              {editMode ? "Save Changes" : "Edit Stocks"}
            </Button>
          </Flex>
        </Flex>
        <AssetsList
          addFunc={addToAddedStocks}
          assetsPortfolio={myStocksPortfolio}
          portfolioValue={stocksValue}
          editMode={editMode}
          width="85%"
        ></AssetsList>
      </Flex>
    );
  }
  return (
    <PageLayout>
      <LockedContentContainer>
        <Flex flexDirection="column" p={3}>
          {body}
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default stocks;

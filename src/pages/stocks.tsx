import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Loader } from "../components/loader/Loader";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import { useMyPortfolioQuery } from "../generated/graphql";
import axios from "axios";
import { stocksToString } from "../utils/stocksToString";
import { AssetsList } from "../components/AssetsList";
import { Doughnut } from "react-chartjs-2";
import { StocksContext } from "../context/StocksContext";
import { CHART_DATA } from "../constants/chart.config";

interface StocksProps {}

const stocks: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMyPortfolioQuery();
  const { createStocksPortfolio } = useContext(StocksContext);

  let body;

  useEffect(() => {
    const fetchStocks = async () => {
      if (!loading && data?.myPortfolio?.stocks) {
        const myStocks = stocksToString(data?.myPortfolio?.stocks);
        const fetchedStocks = await axios.get(
          `/api/stocks?myStocks=${myStocks}`
        );
        createStocksPortfolio(fetchedStocks.data, data?.myPortfolio?.stocks);
      }
    };
    fetchStocks();
  }, [data]);

  if (loading) {
    body = <Loader></Loader>;
  } else if (!loading && data.myPortfolio?.stocks.length === 0) {
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
  } else if (!loading && data.myPortfolio?.stocks) {
    body = (
      <Flex alignItems="center" flexDirection="column">
        <Box width="400px" overflow="visible">
          <Doughnut type="doughnut" data={CHART_DATA} />
        </Box>
        <Flex width="85%" marginTop={3} marginBottom={3}>
          <Button
            onClick={() => router.push("/stocks/add")}
            backgroundColor="accentDark"
            width="6rem"
            color="textDark"
            marginLeft="auto"
          >
            Add Stocks
          </Button>
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

// export async function getSeverSideProps() {
//   console.log(process.env.API);
// }
export default stocks;

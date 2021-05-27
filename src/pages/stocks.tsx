import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Loader } from "../components/loader/Loader";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import { useMyPortfolioQuery } from "../generated/graphql";
import axios from "axios";
import { stocksToString } from "../utils/stocksToString";

interface StocksProps {}

const stocks: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMyPortfolioQuery();
  let body;

  useEffect(() => {
    const foo = async () => {
      if (!loading && data.myPortfolio?.stocks) {
        const myStocks = stocksToString(data?.myPortfolio?.stocks);
        const a = await axios.get(`/api/stocks?myStocks=${myStocks}`);
        console.log("res: ", a);
      }
    };
    foo();
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
      <Flex flexDirection="column" justifyContent="center" width="100%">
        {data.myPortfolio.stocks.map((stock, i) => (
          <Flex width="100%" justifyContent="space-between" p={5} key={i}>
            <Box color="white">{stock.symbol}</Box>
            <Box color="white">{stock.shares}</Box>
          </Flex>
        ))}
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

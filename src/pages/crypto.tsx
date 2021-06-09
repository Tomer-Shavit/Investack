import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Loader } from "../components/loader/Loader";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import { useMeQuery } from "../generated/graphql";
import axios from "axios";
import { assetsToString } from "../utils/assetsToString";
import { AssetsList } from "../components/AssetsList";
import { StocksContext } from "../context/StocksContext";
import { DoughNut } from "../components/doughNut";

interface StocksProps {}

const crypto: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  let body;
  useEffect(() => {
    const fetchCrypto = async () => {
      if (!loading && data?.me?.user?.portfolio?.crypto) {
        const myCrypto = assetsToString(
          data.me.user.portfolio.crypto,
          "crypto"
        );

        const fetchCrypto = await axios.get(`/api/crypto?myCrypto=${myCrypto}`);
        console.log("fetchCrypto: ", fetchCrypto);
        //TODO context crypto portfolio maker function
      }
    };
    fetchCrypto();
  }, [loading]);
  // useEffect(() => {
  //   const fetchStocks = async () => {
  //   if (!loading && data?.me?.user?.portfolio?.stocks) {
  //     console.log(
  //       "data?.me?.user?.portfolio?.stocks",
  //       data?.me?.user?.portfolio?.stocks
  //     );
  //     const myStocks = stocksToString(data?.me?.user?.portfolio?.stocks);
  //     console.log("myStocks: ", myStocks);
  //     const fetchedStocks = await axios.get(
  //       `/api/stocks?myStocks=${myStocks}`
  //     );
  //     createStocksPortfolio(
  //       fetchedStocks.data,
  //       data?.me?.user?.portfolio?.stocks
  //     );
  //   }
  // };
  // fetchStocks();
  // }, []);

  if (loading) {
    body = <Loader></Loader>;
  } else if (!loading && data?.me?.user?.portfolio.crypto.length === 0) {
    body = (
      <Flex flexDirection="column" alignItems="center" marginTop="120px">
        <Text color="textDark2" fontSize="lg">
          On this page you can track all of your crypto, click on the button
          below to add crypto to your portfolio.
        </Text>
        <Button
          marginTop={4}
          color="textDark"
          bgColor="accentDark"
          onClick={() => router.push("crypto/add")}
        >
          Add Crypto
        </Button>
      </Flex>
    );
  } else if (!loading && data?.me?.user?.portfolio?.crypto.length > 0) {
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
              onClick={() => router.push("/crypto/add")}
              backgroundColor="accentDark"
              width="6rem"
              color="textDark"
              marginLeft="auto"
            >
              Add Crypto
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
          {body}
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default crypto;

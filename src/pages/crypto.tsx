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
import { DoughNut } from "../components/doughNut";
import { CryptoContext } from "../context/CryptoContext";
import { CRYPTO_COLOR_LIST } from "../constants/colorList";

interface StocksProps {}

const crypto: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const {
    createCryptoPortfolio,
    myCryptoPortfolio,
    loadingCrypto,
    cryptoValue,
  } = useContext(CryptoContext);
  let body;
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
          data?.me?.user?.portfolio?.crypto
        );
      }
    };
    fetchCrypto();
  }, [loading]);

  if (loading && loadingCrypto) {
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
          <DoughNut
            myCryptoPortfolio={myCryptoPortfolio}
            colorList={CRYPTO_COLOR_LIST}
          ></DoughNut>
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
        <AssetsList
          assetsPortfolio={myCryptoPortfolio}
          portfolioValue={cryptoValue}
          width="85%"
        ></AssetsList>
        ;
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

export default crypto;

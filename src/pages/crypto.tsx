import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AssetsList } from "../components/AssetsList";
import { ChartLoader } from "../components/chartLoader/chartLoader";
import { DoughNut } from "../components/doughNut";
import { Loader } from "../components/loader/Loader";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import { CryptoContext } from "../context/CryptoContext";
import {
  useAddCryptoToPortfolioMutation,
  useMeQuery,
} from "../generated/graphql";
import { useFetchCrypto } from "../utils/hooks/useFetchCrypto";

interface StocksProps {}

const crypto: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [editMode, setEditMode] = useState(false);
  const [addCrypto] = useAddCryptoToPortfolioMutation();
  const {
    myCryptoPortfolio,
    loadingCrypto,
    cryptoValue,
    addedCrypto,
    addToAddedCrypto,
    resetAddedCrypto,
  } = useContext(CryptoContext);
  let body;

  useFetchCrypto(data, loading, data?.me?.user?.portfolio?.cryptoValue);

  if (loading || loadingCrypto) {
    body = <ChartLoader></ChartLoader>;
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
          <DoughNut myPortfolio={myCryptoPortfolio}></DoughNut>
          <Flex flex={1} height="100%" justifyContent="flex-end">
            <Button
              display={editMode ? "none" : undefined}
              alignSelf="flex-end"
              onClick={() => router.push("/crypto/add")}
              backgroundColor="accentDark"
              color="textDark"
              paddingLeft={2}
              paddingRight={2}
            >
              Add Crypto
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
                if (addedCrypto.length > 0 && editMode) {
                  await addCrypto({ variables: { cryptoInput: addedCrypto } });
                  resetAddedCrypto();
                  router.reload();
                }
                setEditMode(!editMode);
              }}
              marginLeft="1.5rem"
            >
              {editMode ? "Save Changes" : "Edit Crypto"}
            </Button>
          </Flex>
        </Flex>
        <AssetsList
          assetsPortfolio={myCryptoPortfolio}
          portfolioValue={cryptoValue}
          addFunc={addToAddedCrypto}
          editMode={editMode}
          width="85%"
          loadingCrypto={loadingCrypto}
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

export default crypto;

import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { InputField } from "../../components/inputField";
import { LockedContentContainer } from "../../components/LockedContentContainer";
import { PageLayout } from "../../components/PageLayout";
import { AssetsBoxesContainer as AssetsBoxesContainer } from "../../components/AssetsBoxesContainer";
import { CryptoContext } from "../../context/CryptoContext";
import { StocksContext } from "../../context/StocksContext";
import {
  MeDocument,
  useAddCryptoToPortfolioMutation,
  useEditCryptoValueMutation,
} from "../../generated/graphql";

interface sGettingStartedProps {}

const add: React.FC<sGettingStartedProps> = ({}) => {
  const router = useRouter();
  const [addCrypto] = useAddCryptoToPortfolioMutation();
  const [editCryptoValue] = useEditCryptoValueMutation();
  const { addedCrypto, allCrypto, cryptoValue, resetAddedCrypto } =
    useContext(CryptoContext);

  const [cryptoSearch, setCryptoSearch] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCryptoSearch(e.target.value);
  };

  return (
    <PageLayout>
      <LockedContentContainer>
        <Flex flexDirection="column" p={8} alignItems="center">
          <Heading marginBottom={5} color="textDark">
            Add Crypto to Portfolio
          </Heading>
          <Text
            color="textDark2"
            marginBottom={8}
            fontSize="lg"
            whiteSpace="pre-wrap"
            textAlign="center"
          >
            To add crypto to your portfolio, search the coin's symbol, click on
            the plus and fill in the details.{"\n"}When you're done adding all
            your coins, click Save.
          </Text>
          <Flex width="80%" marginBottom={5} alignItems="center">
            <Box width="40%" marginRight="auto">
              <InputField
                color="textDark"
                onChange={handleChange}
                placeholder="E.g. BTC"
                type="text"
              ></InputField>
            </Box>
            <Button
              bgColor="accentDark"
              color="textDark"
              p={4}
              width="6rem"
              onClick={async () => {
                try {
                  await addCrypto({
                    variables: { cryptoInput: addedCrypto },
                    refetchQueries: [{ query: MeDocument }],
                  });
                  await editCryptoValue({ variables: { amount: cryptoValue } });
                  resetAddedCrypto();
                  router.push("/crypto");
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Save
            </Button>
          </Flex>
          <Flex flexDir="column" width="80%">
            <AssetsBoxesContainer
              type="crypto"
              assetDict={allCrypto}
              search={cryptoSearch}
            ></AssetsBoxesContainer>
          </Flex>
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default add;

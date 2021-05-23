import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/inputField";
import { LockedContentContainer } from "../../components/LockedContentContainer";
import { PageLayout } from "../../components/PageLayout";
import { StockBoxesContainer } from "../../components/StockBoxesContainer";

interface sGettingStartedProps {}

const add: React.FC<sGettingStartedProps> = ({}) => {
  const router = useRouter();
  const [stockSearch, setStockSearch] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockSearch(e.target.value);
  };

  return (
    <PageLayout>
      <LockedContentContainer>
        <Flex flexDirection="column" p={8} alignItems="center">
          <Heading marginBottom={5} color="textDark">
            Add Stocks to Portfolio
          </Heading>
          <Text
            color="textDark2"
            marginBottom={8}
            fontSize="lg"
            whiteSpace="pre-wrap"
            textAlign="center"
          >
            To add stocks to your portfolio, search the stock symbol/name, click
            on the plus and fill in the details.{"\n"}When you're done adding
            all your stocks, click Save.
          </Text>
          <Flex width="80%" marginBottom={5} alignItems="center">
            <Box width="40%" marginRight="auto">
              <InputField
                color="textDark"
                onChange={handleChange}
                placeholder="E.g. AAPL"
                type="text"
              ></InputField>
            </Box>
            <Button
              bgColor="accentDark"
              color="textDark"
              p={4}
              width="6rem"
              onClick={() => {
                //Need to save all stocks in the database
                router.push("/stocks");
              }}
            >
              Save
            </Button>
          </Flex>
          <Flex flexDir="column" width="80%">
            <StockBoxesContainer search={stockSearch}></StockBoxesContainer>
          </Flex>
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default add;

import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import { useMeQuery } from "../generated/graphql";

interface StocksProps {}

const stocks: React.FC<StocksProps> = ({}) => {
  return (
    <PageLayout>
      <LockedContentContainer>
        <Flex flexDirection="column" p={7}>
          <Heading fontSize="2xl" color="textDark">
            Stocks
          </Heading>
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default stocks;

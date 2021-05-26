import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";

interface StocksProps {}

const stocks: React.FC<StocksProps> = ({}) => {
  const router = useRouter();
  return (
    <PageLayout>
      <LockedContentContainer>
        <Flex flexDirection="column" p={7}>
          <Heading fontSize="2xl" color="textDark">
            Stocks
          </Heading>
          <Button onClick={() => router.push("stocks/add")}>Add Stocks</Button>
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default stocks;

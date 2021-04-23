import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { PageLayout } from "../components/PageLayout";

interface StocksProps {}

const crypto: React.FC<StocksProps> = ({}) => {
  return (
    <PageLayout>
      <Flex flexDirection="column" p={7}>
        <Heading fontSize="2xl" color="textDark">
          Crypto
        </Heading>
      </Flex>
    </PageLayout>
  );
};

export default crypto;

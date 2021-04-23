import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { PageLayout } from "../components/PageLayout";

interface StocksProps {}

const news: React.FC<StocksProps> = ({}) => {
  return (
    <PageLayout>
      <Flex flexDirection="column" p={7}>
        <Heading fontSize="2xl" color="textDark">
          News
        </Heading>
      </Flex>
    </PageLayout>
  );
};

export default news;

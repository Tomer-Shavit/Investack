import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { PageLayout } from "../components/PageLayout";

interface historyProps {}

const History: React.FC<historyProps> = ({}) => {
  return (
    <PageLayout>
      <Flex flexDirection="column" p={7}>
        <Heading fontSize="2xl" color="textDark">
          History
        </Heading>
      </Flex>
    </PageLayout>
  );
};

export default History;

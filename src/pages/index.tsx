import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PageLayout } from "../components/PageLayout";

const Index = () => {
  return (
    <Box>
      <PageLayout>
        <Flex flexDirection="column" bgColor="bgDark1" padding={5}>
          <Heading color="textDark">My Portfolio</Heading>
        </Flex>
      </PageLayout>
    </Box>
  );
};

export default Index;

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PageLayout } from "../components/PageLayout";

const Index = () => {
  return (
    <Box>
      <PageLayout>
        <Flex
          flexDirection="column"
          bgColor="bgDark1"
          height="calc(100vh-64px)"
          padding={5}
        >
          <Heading color="textDark">My Portfolio</Heading>
        </Flex>
      </PageLayout>
    </Box>
  );
};

export default Index;

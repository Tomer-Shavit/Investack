import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";
import { PageLayout } from "../components/PageLayout";

const Index = () => {
  return (
    <Box>
      <PageLayout>
        <Flex width="100%">
          <Text fontSize="3xl">Home</Text>
        </Flex>
      </PageLayout>
    </Box>
  );
};

export default Index;

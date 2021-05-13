import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { PageLayout } from "../components/PageLayout";
import { useMeQuery } from "../generated/graphql";
import { ICONS_TO_CLASSES } from "../constants/icons";

const Index = () => {
  const { data, loading } = useMeQuery();
  let body;

  if (loading) {
    //page loading
    body = null;
  } else if (
    // No portfolios
    !data.me?.user?.portfolio?.stocks.length &&
    !data.me?.user?.portfolio?.crypto.length &&
    !loading
  ) {
    body = (
      <Flex flexDirection="column" alignItems="center" width="100%" p={8}>
        <Heading color="textDark" marginBottom={8}>
          Lets Get Started
        </Heading>
        <Flex width="70%" justifyContent="space-around" alignItems="center">
          <Card pointer>
            <Flex
              flexDirection="column"
              height="180px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={ICONS_TO_CLASSES["crypto"]}
                color="#f0d738"
                fontSize="4xl"
              ></Icon>
              <Heading color="textDark">Crypto</Heading>
            </Flex>
          </Card>
          <Card pointer>
            <Flex
              flexDirection="column"
              height="180px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={ICONS_TO_CLASSES["stocks"]}
                color="#55f360"
                fontSize="4xl"
              ></Icon>
              <Heading color="textDark">Stocks</Heading>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    );
  } else if (
    // User have portfolio
    data.me?.user?.portfolio?.stocks.length ||
    data.me?.user?.portfolio?.crypto.length
  ) {
    body = (
      <Flex>
        <Heading color="textDark">Show Portfolio Here</Heading>
      </Flex>
    );
  }

  return (
    <Box>
      <PageLayout>{body}</PageLayout>
    </Box>
  );
};

export default Index;

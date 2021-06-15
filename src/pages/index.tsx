import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Card } from "../components/Card";
import { PageLayout } from "../components/PageLayout";
import { useMeQuery } from "../generated/graphql";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { useRouter } from "next/router";
import { FullPortfolio } from "../components/fullPortfolio";

// אני לא מעשן עד ה28.5.21

const Index = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

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
          <Card
            pointer
            onClick={() => {
              data?.me?.user ? router.push("/crypto") : router.push("/login");
            }}
          >
            <Flex
              flexDirection="column"
              height="180px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={ICONS_TO_CLASSES["crypto"]}
                color="#f1db4c"
                fontSize="4xl"
              ></Icon>
              <Heading color="textDark">Crypto</Heading>
            </Flex>
          </Card>
          <Card
            pointer
            onClick={() => {
              data?.me?.user
                ? router.push("/stocks/add")
                : router.push("/login");
            }}
          >
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
    body = <FullPortfolio></FullPortfolio>;
  }

  return (
    <Box>
      <PageLayout>{body}</PageLayout>
    </Box>
  );
};

export default Index;

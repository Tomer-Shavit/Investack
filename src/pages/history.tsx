import { Accordion, Button, Flex, Heading, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { ChartLoader } from "../components/chartLoader/chartLoader";
import { HistoryBox } from "../components/historyBox";
import { LockedContentContainer } from "../components/LockedContentContainer";
import { PageLayout } from "../components/PageLayout";
import { Transaction, useMeQuery } from "../generated/graphql";

interface historyProps {}

const History: React.FC<historyProps> = ({}) => {
  const { data, loading } = useMeQuery();
  let day;
  let body;
  if (loading) {
    body = <ChartLoader></ChartLoader>;
  } else if (!loading && data?.me?.user?.portfolio?.transactions?.length == 0) {
    body = (
      <Flex flexDirection="column" alignItems="center" marginTop="120px">
        <Text color="textDark2" fontSize="lg">
          On this page you can track all of your transactions once you'll add
          crypto/stocks to your profile.
        </Text>
      </Flex>
    );
  } else if (!loading && data?.me?.user?.portfolio?.transactions?.length > 0) {
    body = (
      <Flex flexDirection="column" p={7}>
        <Heading fontSize="2xl" color="textDark">
          History
        </Heading>
        <Flex flexDirection="column" width="100%">
          {data?.me?.user?.portfolio?.transactions.map(
            (trans: Transaction, i) => {
              day = new Date(parseInt(trans.createdAt) * 1000);
              return <Flex color="#fff">{day.toString()}</Flex>;
            }
          )}
        </Flex>
        {/* <Accordion defaultIndex={[0]} allowMultiple></Accordion> */}
      </Flex>
    );
  }
  return (
    <PageLayout>
      <LockedContentContainer>
        <Flex flexDirection="column" p={3}>
          {body}
        </Flex>
      </LockedContentContainer>
    </PageLayout>
  );
};

export default History;

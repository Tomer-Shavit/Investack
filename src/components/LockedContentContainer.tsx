import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { ChartLoader } from "./chartLoader/chartLoader";
import { Loader } from "./loader/Loader";
import { LockedContent } from "./LockedContent";

interface LockedContentContainerProps {}

export const LockedContentContainer: React.FC<LockedContentContainerProps> = ({
  children,
}) => {
  const { data, loading } = useMeQuery();
  let body;
  useEffect(() => {
    console.log("data", data);
  }, [loading]);
  if (loading) {
    body = <ChartLoader></ChartLoader>;
  } else if (!data?.me?.user && !loading) {
    body = <LockedContent></LockedContent>;
  } else if (data.me) {
    body = children;
  }

  return (
    <Flex flexDirection="column" width="100%">
      {body}
    </Flex>
  );
};

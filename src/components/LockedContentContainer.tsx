import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { Loader } from "./loader/Loader";
import { LockedContent } from "./LockedContent";

interface LockedContentContainerProps {}

export const LockedContentContainer: React.FC<LockedContentContainerProps> = ({
  children,
}) => {
  const { data, loading } = useMeQuery();
  let body;

  if (loading) {
    body = <Loader></Loader>;
  } else if (!data.me && !loading) {
    body = <LockedContent></LockedContent>;
  } else if (data.me) {
    body = { children };
  }

  return <Flex flexDirection="column">{body}</Flex>;
};

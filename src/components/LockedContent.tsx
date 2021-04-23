import Icon from "@chakra-ui/icon";
import { Flex, Text, Link } from "@chakra-ui/layout";
import NextLink from "next/link";

import React from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";

interface LockedContentProps {}

export const LockedContent: React.FC<LockedContentProps> = ({}) => {
  return (
    <Flex flexDirection="column" justifyContent="center" p={5}>
      <Icon
        as={ICONS_TO_CLASSES["locked"]}
        color="mainDark"
        fontSize="2xl"
      ></Icon>
      <Text color="textDark">Locked Content</Text>
      <Text color="textDark">
        To unlock this content create a new profile{" "}
        <NextLink href="/register">
          <Link>here.</Link>
        </NextLink>
      </Text>
    </Flex>
  );
};

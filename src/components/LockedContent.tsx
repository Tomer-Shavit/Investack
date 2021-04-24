import Icon from "@chakra-ui/icon";
import { Flex, Text, Link } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import NextLink from "next/link";

import React from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";

interface LockedContentProps {}

export const LockedContent: React.FC<LockedContentProps> = ({}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      p={5}
      height="40%"
    >
      <Icon
        as={ICONS_TO_CLASSES["locked"]}
        color="mainDark"
        fontSize="2xl"
        w={10}
        h={10}
      ></Icon>
      <Text color="textDark" fontSize="3xl" marginTop={1}>
        Locked Content
      </Text>
      <Box>
        <Text color="textDark" fontSize="xl">
          To unlock this page create a new profile{" "}
          <NextLink href="/register">
            <Link color="accentDark" fontSize="xl">
              here.
            </Link>
          </NextLink>
        </Text>
      </Box>
    </Flex>
  );
};

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import NextLink from "next/link";

interface SideBoxProps {
  name: string;
  hasMore?: boolean;
}

export const SideBox: React.FC<SideBoxProps> = ({ name, hasMore }) => {
  return (
    <NextLink href={`/${name}`}>
      <Flex
        paddingLeft={5}
        paddingRight={5}
        alignItems="center"
        cursor="pointer"
        _hover={{ backgroundColor: "hoverDark" }}
        style={{ transition: "background-color 0.1s ease-in" }}
        height="48px"
        width="100%"
      >
        <Flex alignItems="center">
          <Icon
            as={ICONS_TO_CLASSES[name]}
            color="mainDark2"
            marginRight={2}
            fontSize="xl"
          ></Icon>
          <Text color="mainDark2" fontSize="xl">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </Flex>
        {hasMore ? (
          <Box marginLeft="auto">
            <Icon
              as={ICONS_TO_CLASSES["down"]}
              color="mainDark2"
              fontSize="sm"
            ></Icon>
          </Box>
        ) : null}
      </Flex>
    </NextLink>
  );
};

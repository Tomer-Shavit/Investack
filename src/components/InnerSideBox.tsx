import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
interface InnerSideBoxProps {
  name: string;
}

export const InnerSideBox: React.FC<InnerSideBoxProps> = ({ name }) => {
  const router = useRouter();
  return (
    <NextLink href={`/${name}`}>
      <Flex
        paddingLeft={7}
        paddingRight={7}
        alignItems="center"
        cursor="pointer"
        _hover={{ backgroundColor: "hoverDark" }}
        style={{ transition: "background-color 0.1s ease-in" }}
        backgroundColor="bgDark1"
        height="48px"
        width="100%"
        boxShadow={
          name === router.pathname.slice(1)
            ? `#1FC7D4 4px 0px 0px inset`
            : undefined
        }
      >
        <Flex alignItems="center">
          <Icon
            as={ICONS_TO_CLASSES[name]}
            color="mainDark2"
            marginRight={3}
            fontSize="lg"
          ></Icon>
          <Text color="mainDark2" fontSize="lg">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </Flex>
      </Flex>
    </NextLink>
  );
};

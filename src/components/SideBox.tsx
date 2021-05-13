import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface SideBoxProps {
  name: string;
}

export const SideBox: React.FC<SideBoxProps> = ({ name }) => {
  const router = useRouter();
  const isHome = name === "home" && router.pathname === "/";

  return (
    <NextLink href={name !== "home" ? `/${name}` : "/"}>
      <Flex
        paddingLeft={5}
        paddingRight={5}
        alignItems="center"
        cursor="pointer"
        _hover={{ backgroundColor: "hoverDark" }}
        style={{ transition: "background-color 0.05s ease-in" }}
        boxShadow={
          name === router.pathname.slice(1) || isHome
            ? `#1FC7D4 4px 0px 0px inset`
            : undefined
        }
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
      </Flex>
    </NextLink>
  );
};

import { Flex } from "@chakra-ui/react";
import React from "react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex backgroundColor="bgDark2" justifyContent="center" h="64px">
      <Flex alignItems="center" justifyContent="space-between" width="80%">
        <Flex p={3}>LOGO</Flex>
        <Flex>user</Flex>
      </Flex>
    </Flex>
  );
};

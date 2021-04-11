import { Flex } from "@chakra-ui/layout";
import React from "react";
import { NavBar } from "./NavBar";
import { SidePanel } from "./SidePanel";

interface PageContainerProps {}

export const PageLayout: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Flex flexDir="column">
      <NavBar></NavBar>
      <Flex>
        <SidePanel />
        <Flex
          marginLeft="240px"
          backgroundColor="pink"
          width="calc(100% - 240px)"
          overflow="hidden"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

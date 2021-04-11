import { Flex } from "@chakra-ui/layout";
import React from "react";

interface SidePanelProps {}

export const SidePanel: React.FC<SidePanelProps> = ({}) => {
  return (
    <Flex
      flexDir="column"
      position="fixed"
      backgroundColor="bgDark2"
      width="240px"
      height="100vh"
      paddingTop="80px"
      border="2px"
      borderLeft="none"
      borderColor="borderDark"
    ></Flex>
  );
};

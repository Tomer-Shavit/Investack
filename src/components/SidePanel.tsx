import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { OpenSideBox } from "./OpenSideBox";
import { SideBox } from "./SideBox";

interface SidePanelProps {}

export const SidePanel: React.FC<SidePanelProps> = ({}) => {
  return (
    <Flex
      flexDir="column"
      position="fixed"
      backgroundColor="bgDark2"
      width="240px"
      height="100%"
      paddingTop="16px"
      marginTop="64px"
      border="2px"
      borderLeft="none"
      borderColor="borderDark"
      justifyContent="space-between"
    >
      <Box>
        <SideBox name="home"></SideBox>
        <OpenSideBox name="portfolio"></OpenSideBox>
        <SideBox name="history"></SideBox>
      </Box>
      <Box paddingBottom="64px">
        <SideBox name="account"></SideBox>
      </Box>
    </Flex>
  );
};

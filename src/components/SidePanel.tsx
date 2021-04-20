import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
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
      border="2px"
      borderLeft="none"
      borderColor="borderDark"
      justifyContent="space-between"
    >
      <Box>
        <SideBox name="portfolio" hasMore></SideBox>
        <SideBox name="news"></SideBox>
        <SideBox name="notes"></SideBox>
      </Box>
      <Box paddingBottom="64px">
        <SideBox name="settings"></SideBox>
      </Box>
    </Flex>
  );
};

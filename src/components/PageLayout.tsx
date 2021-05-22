import { Flex } from "@chakra-ui/layout";
import React from "react";
import { NavBar } from "./NavBar";
import { SidePanel } from "./SidePanel";

interface PageContainerProps {}

export const PageLayout: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Flex flexDir="column" height="100%">
      <NavBar></NavBar>
      <Flex height="100%">
        <SidePanel />
        <Flex
          marginLeft="240px"
          bgGradient="linear(to-b, #2f2d33, #1B1A1E)"
          width="calc(100% - 240px)"
          overflow="hidden"
          marginTop="64px"
          height="calc(100vh - 64px)"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#27262C",

              borderRadius: "15px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundImage:
                "linear-gradient(to bottom,  #5469D4 0%, #6172c7 100%)",
              borderRadius: "15px",
            },
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

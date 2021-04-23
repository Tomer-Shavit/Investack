import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { DisplayContext } from "../context/DisplayContext";
import { InnerSideBox } from "./InnerSideBox";

interface OpenSideBoxProps {
  name: string;
}

export const OpenSideBox: React.FC<OpenSideBoxProps> = ({ name }) => {
  const { isSideBoxOpen, setIsSideBoxOpen } = useContext(DisplayContext);
  return (
    <Box>
      <Flex
        paddingLeft={5}
        paddingRight={5}
        alignItems="center"
        cursor="pointer"
        _hover={{ backgroundColor: "hoverDark" }}
        style={{ transition: "background-color 0.1s ease-in" }}
        height="48px"
        width="100%"
        onClick={() => setIsSideBoxOpen(!isSideBoxOpen)}
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

        <Box marginLeft="auto">
          <Icon
            as={ICONS_TO_CLASSES[isSideBoxOpen ? "up" : "down"]}
            color="mainDark2"
            fontSize="sm"
          ></Icon>
        </Box>
      </Flex>

      <Flex
        flexDirection="column"
        height={`${isSideBoxOpen ? "96px" : "0px"}`}
        bgColor="transparent"
        style={{ transition: "height 0.1s ease-in-out" }}
        overflow="hidden"
      >
        <InnerSideBox name="stocks"></InnerSideBox>
        <InnerSideBox name="crypto"></InnerSideBox>
      </Flex>
    </Box>
  );
};

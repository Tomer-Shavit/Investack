import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Icon,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";

interface StockBoxProps {
  symbol: string;
  fullName: string;
  bgColor: string;
}

export const StockBox: React.FC<StockBoxProps> = (props) => {
  return (
    <AccordionItem backgroundColor={props.bgColor} borderColor="borderDark2">
      <AccordionButton>
        <Flex alignItems="center" p={2} width="100%">
          <Icon
            as={ICONS_TO_CLASSES["plus"]}
            color="mainDark"
            marginRight={3}
          ></Icon>
          <Text color="accentDark">{props.symbol}</Text>
          <Text color="textDark">{`\xa0-\xa0` + props.fullName}</Text>
        </Flex>
      </AccordionButton>
      <AccordionPanel pb={4} color="textDark">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  );
};

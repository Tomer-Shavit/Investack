import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";

interface historyBoxProps {
  symbol: string;
  value: number;
  amount: number;
  time: string;
}

export const HistoryBox: React.FC<historyBoxProps> = (props) => {
  const { symbol, value, amount, time } = props;
  return (
    <AccordionItem color="textDark">
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Section 1 title
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  );
};

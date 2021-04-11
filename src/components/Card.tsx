import { Flex } from "@chakra-ui/layout";
import React from "react";

interface CardProps {
  size?: string;
}

export const Card: React.FC<CardProps> = ({ children, size }) => {
  return (
    <Flex
      flexDir="column"
      bgColor="bgDark2"
      borderRadius="16px"
      width={size === "xl" ? "100%" : "30%"}
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      {children}
    </Flex>
  );
};

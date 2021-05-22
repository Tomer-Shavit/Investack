import { Flex } from "@chakra-ui/layout";
import React from "react";

interface CardProps {
  size?: string;
  pointer?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  size,
  pointer,
  onClick,
}) => {
  return (
    <Flex
      flexDir="column"
      bgColor="bgDark2"
      borderRadius="16px"
      width={size === "xl" ? "100%" : "30%"}
      justifyContent="center"
      alignItems="center"
      cursor={pointer ? "pointer" : undefined}
      p={4}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};

import { Flex } from "@chakra-ui/layout";
import { transform } from "lodash";
import React from "react";

interface CardProps {
  pointer?: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
  color?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hover,
  width,
  color,
  height,
  pointer,
  onClick,
}) => {
  return (
    <Flex
      transition={hover ? "all .25s ease-out" : undefined}
      _hover={
        hover
          ? {
              transform: "scale(1.02)",
              boxShadow: "0 0 15px 3px rgb(84, 105, 212, 0.5)",
            }
          : undefined
      }
      height={height}
      minWidth={hover ? undefined : "340px"}
      flexDir="column"
      bgColor={color ? color : "bgDark2"}
      borderRadius="16px"
      width={width}
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

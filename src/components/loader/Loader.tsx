import { Flex } from "@chakra-ui/layout";
import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <Flex
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="50%"
    >
      <div className={styles.loader}></div>
    </Flex>
  );
};

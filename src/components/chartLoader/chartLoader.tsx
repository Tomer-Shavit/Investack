import { Flex } from "@chakra-ui/react";
import React from "react";
import styles from "./chartLoader.module.css";

interface chartLoaderProps {}

export const ChartLoader: React.FC<chartLoaderProps> = ({}) => {
  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <div className={styles.loader}>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__ball}></div>
      </div>
    </Flex>
  );
};

import { useToast } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

interface useValidationToastInterface {
  err: boolean;
  add: number;
  symbol: string;
}

export const useValidationToast = (props: useValidationToastInterface) => {
  const { err, add } = props;
  const isInitialMount = useRef(true);
  const toast = useToast();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setTimeout(() => {
        if (err && add > 0) {
          toast({
            title: "Something went wrong.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else if (!err && add === 0) {
          toast({
            title: `${props.symbol} was added to your portfolio.`,
            description: `Don't forget to save.`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      }, 500);
    }
  }, [add]);
};

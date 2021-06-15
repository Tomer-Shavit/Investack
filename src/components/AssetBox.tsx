import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Icon,
  Text,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { CryptoContext } from "../context/CryptoContext";
import { StocksContext } from "../context/StocksContext";
import { useValidationToast } from "../utils/hooks/useValidationToast";

import { InputFormField } from "./InputFormField";

interface AssetBoxProps {
  symbol: string;
  fullName: string;
  bgColor: string;
  type: "stocks" | "crypto";
}

export const AssetBox: React.FC<AssetBoxProps> = (props) => {
  const { addToAddedStocks } = useContext(StocksContext);
  const { addToAddedCrypto } = useContext(CryptoContext);
  const priceName = "price" + `${props.symbol}`;
  const sharesOrAmountName = "sharesOrAmount" + `${props.symbol}`;

  const [add, setAdd] = useState(0);
  let err = false;
  useValidationToast({ add, err, symbol: props.symbol });

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
        <Formik
          initialValues={{ [sharesOrAmountName]: 0, [priceName]: 0 }}
          onSubmit={(values, { setErrors }) => {
            if (
              !String(values[sharesOrAmountName]).match(
                /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
              ) ||
              !values[sharesOrAmountName]
            ) {
              err = true;
              setErrors({
                [sharesOrAmountName]: "Invalid input.",
              });
            } else if (
              !String(values[priceName]).match(
                /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
              ) ||
              !values[priceName]
            ) {
              err = true;
              setErrors({
                [priceName]: "Invalid input.",
              });
            } else {
              err = false;
              setAdd(0);
              if (props.type == "stocks") {
                addToAddedStocks(
                  props.symbol,
                  values[sharesOrAmountName],
                  values[priceName]
                );
              } else {
                addToAddedCrypto(
                  props.symbol,
                  values[sharesOrAmountName],
                  values[priceName]
                );
              }
            }
          }}
        >
          {() => (
            <Form>
              <Flex
                alignItems="stretch"
                justifyContent="space-between"
                width="100%"
              >
                <Flex
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="85%"
                >
                  <InputFormField
                    name={sharesOrAmountName}
                    placeholder={
                      props.type === "stocks"
                        ? "Number of Shares"
                        : "Amount of Coins"
                    }
                    label={props.type === "stocks" ? "Shares" : "Tokens"}
                    type="number"
                  ></InputFormField>
                  <InputFormField
                    name={priceName}
                    placeholder="Purchase Price"
                    label="Price"
                    type="number"
                  ></InputFormField>
                </Flex>
                <Flex justifyContent="center" width="15%" alignItems="center">
                  <Button
                    bgColor="accentDark"
                    type="submit"
                    color="textDark"
                    width="60%"
                    onClick={() => setAdd(add + 1)}
                  >
                    Add
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </AccordionPanel>
    </AccordionItem>
  );
};
